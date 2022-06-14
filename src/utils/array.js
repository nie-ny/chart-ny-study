/**
 * 数据分组
 * @param {*} array
 * @param {*} key
 * @returns
 */
export function group(array, key = (d) => d) {
  const keyGroups = new Map()
  for (const item of array) {
    const k = key(item)
    const g = keyGroups.get(k)
    if (g) {
      g.push(item)
    } else {
      keyGroups.set(k, [item])
    }
  }
  return keyGroups
}

/**
 * 获取数组 下标组
 * @param {*} array
 * @returns
 */
export function indexOf(array) {
  return array.map((_, i) => i)
}

/**
 * 获取数组第一个值
 * @param {*} array
 * @returns
 */
export function firstOf(array) {
  return array[0]
}

/**
 * 获取数组最后一个值
 * @param {*} array
 * @returns
 */
export function lastOf(array) {
  return array[array.length - 1]
}
