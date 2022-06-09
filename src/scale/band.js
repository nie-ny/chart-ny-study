import { createOrdinal } from './ordinal'
import { band } from './utils'

/**
 * 波段 序数比例尺
 * @param {*} options
 * @returns
 */
export function createBand(options) {
  const { bandRange, bandWidth, step } = band(options)
  const scale = createOrdinal({ ...options, range: bandRange })

  scale.bandWidth = () => bandWidth
  scale.step = () => step

  return scale
}
