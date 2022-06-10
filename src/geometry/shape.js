/**
 * 绘制圆点
 * 绘制不同坐标系下面的圆
 * 绘制圆的函数和渲染器里面绘制圆的区别在于 这里需要考虑坐标系
 * @param {*} renderer 渲染器
 * @param {*} coordinate 坐标系变化
 * @param {*} param 圆点绘制信息
 * @returns
 */
export function circle(renderer, coordinate, { cx, cy, r, ...styles }) {
  // 对圆心进行坐标系变换
  const [px, py] = coordinate([cx, cy])
  return renderer.circle({ cx: px, cy: py, r, ...styles })
}

/**
 * 绘制文本
 * @param {*} renderer
 * @param {*} coordinate
 * @param {*} param
 * @returns
 */
export function text(renderer, coordinate, { x, y, rotate, text, ...styles }) {
  const [px, py] = coordinate([x, y])
  renderer.save()
  // 将词旋转
  renderer.translate(px, py)
  renderer.rotate(rotate)
  const textElement = renderer.text({ text, x: 0, y: 0, ...styles })
  renderer.restore()
  return textElement
}
