import { createBand } from './band'

/**
 * 点 序数比例尺
 * @param {*} options
 * @returns
 */
export function createPoint(options) {
  return createBand({ ...options, padding: 1 })
}
