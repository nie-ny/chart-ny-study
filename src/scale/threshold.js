/**
 * 按段 分布比例尺
 * @param {*} param
 * @returns
 */
export function createThreshold({ domain, range }) {
  const n = Math.min(domain.length, range.length - 1)
  return (x) => {
    // 符合条件的下标
    const index = domain.findIndex((v) => x < v)
    return range[index === -1 ? n : index]
  }
}
