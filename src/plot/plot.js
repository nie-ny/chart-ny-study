import { createViews } from '../view'
import { createRenderer } from '../renderer'
import { createCoordinate } from '../coordinate'
import { create } from './create'
import { inferScales, applyScales } from './scale'
import { initialize } from './geometry'
import { inferGuides } from './guide'
import { bfs, identity, map, assignDefined } from '../utils'

export function plot(root) {
  // 创建渲染引擎
  const { width = 640, height = 480, renderer: plugin } = root
  const renderer = createRenderer(width, height, plugin)

  // 将配置从容器节点流向视图节点
  flow(root)

  // 将视图树转换成视图树组
  const views = createViews(root)

  for (const [view, nodes] of views) {
    const { transform = identity, ...dimensions } = view

    const geometries = []
    const scales = {}
    const guides = {}
    let coordinates = []

    // 合并同一区域的所拥有视图的配置
    const chartNodes = nodes.filter(({ type }) => isChartNode(type))

    for (const options of chartNodes) {
      const {
        scales: s = {},
        guides: g = {},
        coordinates: c = [],
        transforms = [],
        paddingLeft,
        paddingRight,
        paddingBottom,
        paddingTop,
        ...geometry
      } = options

      // 合并 配置
      assignDefined(scales, s)
      assignDefined(guides, g)
      assignDefined(dimensions, { paddingLeft, paddingRight, paddingBottom, paddingTop })
      if (c) coordinates = c
      geometries.push({ ...geometry, transforms: [transform, ...transforms] })
    }

    // 绘制每一个区域
    plotView({ renderer, scales, guides, geometries, coordinates, ...dimensions })
  }
  return renderer.svgDom()
}

/**
 * 绘制每一个区域
 * @param {*} param
 */
function plotView({
  renderer,
  scales: scalesOptions,
  guides: guidesOptions,
  coordinates: coordinateOptions,
  geometries: geometriesOptions,
  width,
  height,
  x,
  y,
  paddingLeft = 45,
  paddingRight = 45,
  paddingBottom = 45,
  paddingTop = 65
}) {
  // 获得每个通道的值
  const geometries = geometriesOptions.map(initialize)
  const channels = geometries.map((d) => d.channels)

  // 推断 scales 和 guides
  const scaleDescriptors = inferScales(channels, scalesOptions)
  const guidesDescriptors = inferGuides(scaleDescriptors, { x, y, paddingLeft }, guidesOptions)

  // 生成 scales 和 guides 方法
  const scales = map(scaleDescriptors, create)
  const guides = map(guidesDescriptors, create)

  // 生成坐标系
  const transforms = inferCoordinates(coordinateOptions).map(create)
  const coordinate = createCoordinate({
    x: x + paddingLeft,
    y: y + paddingTop,
    width: width - paddingLeft - paddingRight,
    height: height - paddingTop - paddingBottom,
    transforms
  })

  // 绘制辅助组件
  for (const [key, guide] of Object.entries(guides)) {
    const scale = scales[key]
    guide(renderer, scale, coordinate)
  }

  // 绘制几何元素
  for (const { index, geometry, channels, styles } of geometries) {
    // 执行比例尺 获取 对应数据
    const values = applyScales(channels, scales)
    geometry(renderer, index, scales, values, styles, coordinate)
  }
}

/**
 *
 * @param {*} type
 * @returns
 */
function isChartNode(type) {
  switch (type) {
    case 'layer':
    case 'col':
    case 'row':
      return false
    default:
      return true
  }
}

/**
 * 遍历子节点  获取父节点 的参数值
 * 如子节点配置 子节点不替换
 * @param {*} root
 */
function flow(root) {
  bfs(root, ({ type, children, ...options }) => {
    if (isChartNode(type)) return
    if (!children || children.length === 0) return
    const keyDescriptors = [
      'o:encodings',
      'o:scales',
      'o:guides',
      'o:styles',
      'a:coordinates',
      'a:statistics',
      'a:transforms',
      'a:data'
    ]
    for (const child of children) {
      for (const descriptor of keyDescriptors) {
        const [type, key] = descriptor.split(':')
        if (type === 'o') {
          child[key] = { ...options[key], ...child[key] }
        } else {
          child[key] = child[key] || options[key]
        }
      }
    }
  })
}

function inferCoordinates(coordinates) {
  return [...coordinates, { type: 'cartesian' }]
}
