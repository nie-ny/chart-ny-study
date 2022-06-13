export function identity(x) {
  return x
}

export function rotationOf(center, [x, y]) {
  const tickRotation = angle(sub([x, y], center))
  const textRotation = tickRotation < 0 ? Math.PI : 0
  return { tickRotation: tickRotation - Math.PI / 2, textRotation }
}

/**
 * X轴正半轴的夹角大小
 * @param {*} param
 * @returns
 */
export function angle([x, y]) {
  // 计算二维坐标系中任意一个点（x, y）和原点（0, 0）的连线与X轴正半轴的夹角大小
  const theta = Math.atan2(y, x)
  return theta
}

/**
 *
 * @param {*} radian
 * @returns
 */
export function degree(radian) {
  return (radian * 180) / Math.PI
}

export function unique(points, x = (d) => d[0], y = (d) => d[1]) {
  const overlap = (a, b) => closeTo(x(a), x(b)) && closeTo(y(a), y(b))
  return points.filter((d, index) => points.findIndex((p) => overlap(d, p)) === index)
}

/**
 * 判断两数 是否接近
 * @param {*} x
 * @param {*} y
 * @param {*} tol 1e-5: 0.00001
 * @returns
 */
export function closeTo(x, y, tol = 1e-5) {
  return Math.abs(x - y) < tol
}

/**
 * 坐标 相减
 * @param {*} param
 * @param {*} param
 * @returns
 */
export function sub([x1, y1], [x0, y0]) {
  return [x1 - x0, y1 - y0]
}

/**
 *
 * @param {*} param
 * @param {*} param
 * @returns
 */
export function dist([x0, y0], [x1 = 0, y1 = 0] = []) {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2)
}
