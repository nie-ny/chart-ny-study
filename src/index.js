import { createRenderer } from './renderer/index'
import { createLinear } from './scale'
import { createCoordinate, transpose, cartesian } from './coordinate'
import { point } from './geometry'

// // 创建渲染器
const renderer = createRenderer(600, 400)

// // 绘制基本图形
// renderer.rect({
//   x: 10,
//   y: 10,
//   width: 50,
//   height: 50,
//   fill: 'red'
// })

// document.body.appendChild(renderer.svgDom())

// const tem = createLinear({ domain: [0, 10], range: [50, 100] })

//
const data = [
  { height: 0, width: 100 },
  { height: 163, width: 94 },
  { height: 173, width: 130 }
]

// 将对应的值提取出来
const H = data.map((d) => d.height)
const W = data.map((d) => d.width)
const I = data.map((_, index) => index)
// const extent = (d) => [Math.min(...d), Math.max(...d)]

// 将数据的 height 映射为点的 x 属性（这里注意 range 是 [0, 1]）
const scaleX = createLinear({
  domain: [0, 400],
  range: [0, 1]
})

const scaleY = createLinear({
  domain: [0, 600],
  range: [0, 1]
})

// 创建一个坐标系
const coordinate = createCoordinate({
  // 指定画布的起点和宽高
  x: 0,
  y: 0,
  width: 600,
  height: 400,
  // 一系列坐标系变换
  transforms: [transpose(), cartesian()]
})

// 使用比例尺映射数据
const values = {
  x: H.map(scaleX),
  y: W.map(scaleY)
}

const scales = {
  x: scaleX,
  y: scaleY
}

// 设置样式
const styles = {
  fill: 'none',
  stroke: 'steelblue'
}

// 绘制点
point(renderer, I, scales, values, styles, coordinate)

document.body.appendChild(renderer.svgDom())
