import { createChannel, createChannels } from './channel'
import { createGeometry } from './geometry'
import { text as shapeText } from './shape'
import { channelStyles } from './style'

const channels = createChannels({
  rotate: createChannel({ name: 'rotate' }),
  fontSize: createChannel({ name: 'fontSize' }),
  text: createChannel({ name: 'text', optional: false })
})

/**
 * 绘制 文本图
 * @param {*} renderer
 * @param {*} I
 * @param {*} scales
 * @param {*} values
 * @param {*} directStyles
 * @param {*} coordinate
 * @returns
 */
function render(renderer, I, scales, values, directStyles, coordinate) {
  const defaults = {
    rotate: 0,
    fontSize: 14
  }
  const { x: X, y: Y, text: T, rotate: R = [], fontSize: FS = [] } = values
  return Array.from(I, (i) =>
    shapeText(renderer, coordinate, {
      ...directStyles,
      ...channelStyles(i, values),
      x: X[i],
      y: Y[i],
      rotate: R[i] || defaults.rotate,
      fontSize: FS[i] || defaults.fontSize,
      text: T[i]
    })
  )
}

export const text = createGeometry(channels, render)
