import { degree, rotationOf, unique } from './utils'

/**
 * 底部绘制 刻度 文本
 * @param {*} renderer 渲染器
 * @param {*} ticks 刻度坐标 文本
 * @param {*} param
 */
export function ticksBottom(renderer, ticks, { tickLength, fontSize }) {
  for (const { x, y, text } of ticks) {
    const x2 = x
    const y2 = y + tickLength
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' })
    renderer.text({ text, fontSize, x, y: y2, textAnchor: 'middle', dy: '1em', class: 'text' })
  }
}

/**
 * 顶部绘制 刻度 文本
 * @param {*} renderer 渲染器
 * @param {*} ticks 刻度坐标 文本
 * @param {*} param
 */
export function ticksTop(renderer, ticks, { tickLength, fontSize }) {
  for (const { x, y, text } of ticks) {
    const x2 = x
    const y2 = y - tickLength
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' })
    renderer.text({ text, fontSize, x, y: y2, textAnchor: 'middle', dy: '-0.3em', class: 'text' })
  }
}

/**
 * 左边绘制 刻度 文本
 * @param {*} renderer 渲染器
 * @param {*} ticks 刻度坐标 文本
 * @param {*} param
 */
export function ticksLeft(renderer, ticks, { tickLength, fontSize }) {
  for (const { x, y, text } of ticks) {
    const x2 = x - tickLength
    const y2 = y
    renderer.line({ x1: x, y1: y, x2, y2, stroke: 'currentColor', class: 'tick' })
    renderer.text({ text, fontSize, x: x2, y, textAnchor: 'end', dy: '0.5em', dx: '-0.5em', class: 'text' })
  }
}

// TODO 没太明白
/**
 * 绘制 极坐标 的刻度
 * @param {*} renderer
 * @param {*} ticks
 * @param {*} param2
 */
export function ticksCircular(renderer, ticks, { tickLength, fontSize, center }) {
  for (const { x, y, text } of unique(ticks)) {
    // 计算刻度和刻度文本的旋转角度
    const { tickRotation, textRotation } = rotationOf(center, [x, y])
    const [x2, y2] = [0, tickLength]
    const dy = textRotation === 0 ? '1.2em' : '-0.5em'

    // 旋转刻度
    renderer.save()
    renderer.translate(x, y)
    renderer.rotate(degree(tickRotation))

    renderer.line({
      x1: 0,
      y1: 0,
      x2,
      y2,
      stroke: 'currentColor',
      fill: 'currentColor',
      class: 'tick'
    })

    // 在旋转刻度的基础上旋转文本
    renderer.save()
    renderer.translate(x2, y2)
    renderer.rotate(degree(textRotation))

    renderer.text({
      text: `${text}`,
      x: 0,
      y: 0,
      textAnchor: 'middle',
      fontSize,
      fill: 'currentColor',
      dy,
      class: 'text'
    })
    renderer.restore()
    renderer.restore()
  }
}
