import { normalize, tickStep, nice, floor, ceil, ticks } from './utils'

/**
 * 线性比例尺
 * @param {*} domain: 输入范围 range 输出范围
 * @returns
 */
export function createLinear({ domain: [d0, d1], range: [r0, r1], interpolate = interpolateNumber }) {
  // 比例尺计算
  const scale = (x) => {
    const t = normalize(x, d0, d1)
    // 默认是使用线性的数值插值器
    // 如果是颜色可以使用颜色插入器
    return interpolate(t, r0, r1)
  }

  // 刻度计算
  scale.ticks = (tickCount) => ticks(d0, d1, tickCount)

  // 根据值域 修改 间隔值 对应的 最大值 和 最小值
  scale.nice = (tickCount) => {
    const step = tickStep(d0, d1, tickCount)
    ;[d0, d1] = nice([d0, d1], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step)
    })
  }

  return scale
}

/**
 * 数值插值器
 * @param {*} t 比例
 * @param {*} start 值域 开始
 * @param {*} stop 值域 结束
 * @returns
 */
export function interpolateNumber(t, start, stop) {
  return start * (1 - t) + stop * t
}

/**
 * 颜色插值器
 * @param {*} t
 * @param {*} start
 * @param {*} stop
 * @returns
 */
export function interpolateColor(t, start, stop) {
  const r = interpolateNumber(t, start[0], stop[0])
  const g = interpolateNumber(t, start[1], stop[1])
  const b = interpolateNumber(t, start[2], stop[2])
  return `rgb(${r}, ${g}, ${b})`
}
