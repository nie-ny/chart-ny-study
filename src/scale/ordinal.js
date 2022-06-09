import { equal } from './utils'

/**
 * 序数比例尺
 * @param {*}
 * @returns
 */
export function createOrdinal({ domain, range }) {
  return (x) => {
    const index = domain.findIndex((d) => equal(d, x))
    // 取模的目的是为了应对 domain.length > range.length 的情况
    return range[index % range.length]
  }
}
