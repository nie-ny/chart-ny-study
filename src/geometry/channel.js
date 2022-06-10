/**
 * 基础通道
 * @param {*} param
 * @returns
 */
export function createChannel({ name, optional = true, ...rest }) {
  return { name, optional, ...rest }
}

/**
 * 几何元素 通道
 * @param {*} options
 * @returns
 */
export function createChannels(options = {}) {
  return {
    x: createChannel({ name: 'x', optional: false }), // x 坐标
    y: createChannel({ name: 'y', optional: false }), // y 坐标
    stroke: createChannel({ name: 'stroke' }), // 边框颜色
    fill: createChannel({ name: 'fill' }), // 填充颜色
    ...options
  }
}
