import { applyTransform, createSVGElement, mount } from './utils'

/**
 * 坐标系变换 添加到 挂载元素g 上，子图形元素继承变化
 * @param {*} type
 * @param {*} context
 * @param  {...any} params
 */
export function transform(type, context, ...params) {
  // type 是希望的变换种类：scale，translate，rotate 等
  const { group } = context
  applyTransform(group, `${type}(${params.join(', ')})`)
}

// 位移
export function translate(context, tx, ty) {
  transform('translate', context, tx, ty)
}

// 旋转
export function rotate(context, theta) {
  transform('rotate', context, theta)
}

// 缩放
export function scale(context, sx, sy) {
  transform('scale', context, sx, sy)
}

/**
 * 创建 g 元素 挂载在 父级 g元素
 * 修改后续 group 指向 新建的g 元素 --后续绘图都在新建元素上
 * @param {*} context
 */
export function save(context) {
  const { group } = context
  const newGroup = createSVGElement('g')
  mount(group, newGroup)
  context.group = newGroup
}

/**
 * 让后面的操作 都回到 父级 g元素 --后续绘图都在 父级g元素上
 * @param {*} context
 */
export function restore(context) {
  const { group } = context
  const { parentNode } = group
  context.group = parentNode
}
