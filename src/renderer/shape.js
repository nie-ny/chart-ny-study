import { applyAttributes, createSVGElement, mount } from './utils'

/**
 * 创建元素 挂在到 父级 g 元素上
 * @param {*} type 元素类型
 * @param {*} context SVG 上下文
 * @param {*} attributes 元素属性
 * @returns
 */
export function shape(type, context, attributes) {
  // 获取上下文 挂载的 g元素
  const { group } = context
  // 创建对应的元素
  const el = createSVGElement(type)
  // 设置属性
  applyAttributes(el, attributes)
  // 挂载到 g元素
  mount(group, el)
  return el // 返回该元素
}

// 线
export function line(context, attributes) {
  return shape('line', context, attributes)
}

// rect 不支持 width 和 height 是负数，下面这种情况将绘制不出来
// <rect width="-60" height="-60" x="100" y="100" /> ❌
// 为了使其支持负数的 width 和 height，我们转换成如下的形式
// <rect width="60" height="60" x="40" y="40" /> ✅
export function rect(context, attributes) {
  const { width, height, x, y } = attributes

  return shape('rect', context, {
    ...attributes,
    width: Math.abs(width),
    height: Math.abs(height),
    x: width > 0 ? x : x + width,
    y: height > 0 ? y : y + height
  })
}

// 圆
export function circle(context, attributes) {
  return shape('circle', context, attributes)
}

// text 元素是将展示内容放在标签内部，而不是作为标签的属性
// <text text='content' /> ❌
// <text>content</text> ✅
export function text(context, attributes) {
  const { text, ...rest } = attributes
  const textElement = shape('text', context, rest)
  textElement.textContent = text // 通过 textContent 设置标签内的内容
  return textElement
}

// path 的属性 d （路径）是一个字符串，拼接起来比较麻烦，这里我们通过数组去生成
// [
//  ['M', 10, 10],
//  ['L', 100, 100],
//  ['L', 100, 10],
//  ['Z'],
// ];
// 上面的二维数组会被转换成如下的字符串
// 'M 10 10 L 100 100 L 100 10 Z'
export function path(context, attributes) {
  const { d } = attributes
  return shape('path', context, { ...attributes, d: d.flat().join(' ') })
}
