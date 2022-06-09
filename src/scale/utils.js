/**
 * 归一化 比例
 * @param {*} value 输入值
 * @param {*} start 值域 开始
 * @param {*} stop 值域 结束
 * @returns 值 所在位置的比例
 */
export function normalize(value, start, stop) {
  return (value - start) / (stop - start)
}

/**
 * 间隔值 计算
 * @param {*} min
 * @param {*} max
 * @param {*} count 刻度数
 */
export function tickStep(min, max, count) {
  // step0 是生成指定数量的刻度的间隔
  // step1 是最后生成的刻度的间隔
  // 我们希望 step1 满足两个条件：
  // 1. step1 = 10 ^ n * b (其中 b=1,2,5)
  // 2. step0 和 step1 的误差尽量的小

  const e10 = Math.sqrt(50) // 7.07
  const e5 = Math.sqrt(10) // 3.16
  const e2 = Math.sqrt(2) // 1.41

  // 获得目标间隔 step0
  const step0 = Math.abs(max - min) / Math.max(0, count)
  // 10 ^ n  n 是 满足条件的最大整数
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10)
  // 误差
  const error = step0 / step1

  // 根据当前的误差改变 step1 的值，从而减少误差
  if (error >= e10) step1 *= 10
  else if (error >= e5) step1 *= 5
  else if (error >= e2) step1 *= 2

  return step1
}

/**
 * 计算刻度
 * @param {*} min
 * @param {*} max
 * @param {*} count
 * @returns
 */
export function ticks(min, max, count) {
  const step = tickStep(min, max, count)
  // 让 start 和 stop 都是 step 的整数倍
  // 这样生成的 ticks 都是 step 的整数倍
  // 可以让可读性更强
  const start = Math.ceil(min / step)
  const stop = Math.floor(max / step)
  const n = Math.ceil(stop - start + 1)
  // n 不一定等于 count，所以生成的 ticks 的数量可能和指定的不一样
  const values = new Array(n)
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step)
  }
  return values
}

/**
 * 简单解决 js 精读问题
 * @param {*} n
 * @returns
 */
export function round(n) {
  return Math.round(n * 1e12) / 1e12
}

/**
 * 根据值域 获取 间隔值 对应的 最大值 和 最小值
 * @param {*} domain 值域 最大值 和 最小值
 * @param {*} interval 计算函数
 * @returns
 */
export function nice(domain, interval) {
  const [min, max] = domain
  return [interval.floor(min), interval.ceil(max)]
}

/**
 * 间隔值 向后 一倍的值
 * Math.ceil() 向上取整
 * @param {*} n 值域 最大值
 * @param {*} base 间隔值
 * @returns
 */
export function ceil(n, base) {
  return base * Math.ceil(n / base)
}

/**
 * 间隔值 向前 一倍的值
 * Math.ceil() 向下取整
 * @param {*} n 值域 最小值
 * @param {*} base 间隔值
 * @returns
 */
export function floor(n, base) {
  return base * Math.floor(n / base)
}

/**
 * 通过对象序列化结果简单判断两个对象是否相等
 * @param {*} a
 * @param {*} b
 * @returns
 */
export function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

/**
 * 波段值 计算
 * @param {*}
 * @returns step: 间隔值,bandWidth:取消边框的间隔值,bandRange:每个波段的值
 */
export function band({ domain, range, padding }) {
  const [r0, r1] = range
  const n = domain.length
  // 间隔值
  const step = (r1 - r0) / (n + padding)
  // 取消边框的间隔值
  const bandWidth = step * (1 - padding)
  // 边框值
  const interval = step - bandWidth
  // 每个波段的值
  const x = (_, i) => r0 + interval + step * i
  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x)
  }
}
