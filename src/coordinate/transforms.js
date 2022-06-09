/**
 * 绑定 类型
 * @param {*} type
 * @param {*} transformer
 * @returns
 */
export function transform(type, transformer) {
  transformer.type = () => type
  return transformer
}

/**
 * 位移
 * @param {*} tx
 * @param {*} ty
 * @returns
 */
export function translate(tx = 0, ty = 0) {
  /**
   * px: x轴位移
   * py: y轴位移
   */
  return transform('translate', ([px, py]) => [px + tx, py + ty])
}

/**
 * 缩放
 * @param {*} sx
 * @param {*} sy
 * @returns
 */
export function scale(sx = 1, sy = 1) {
  /**
   * px: x轴缩放
   * py: y轴缩放
   */
  return transform('scale', ([px, py]) => [px * sx, py * sy])
}

/**
 * 反射
 * @returns
 */
export function reflect() {
  return transform('reflect', scale(-1, -1))
}

export function reflectX() {
  return transform('reflectX', scale(-1, 1))
}

export function reflectY() {
  return transform('reflectY', scale(1, -1))
}

/**
 * 转置
 * @returns
 */
export function transpose() {
  return transform('transpose', ([px, py]) => [py, px])
}

/**
 * 极坐标
 */
export function polar() {
  // 这里我们把点的第一个维度作为 theta
  // 第二个维度作为 radius
  return transform('polar', ([theta, radius]) => {
    const x = radius * Math.cos(theta)
    const y = radius * Math.sin(theta)
    return [x, y]
  })
}
