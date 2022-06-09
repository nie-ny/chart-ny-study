import { createLinear } from './linear'

export function createTime({ domain, ...rest }) {
  const transform = (x) => x.getTime()
  const transformedDomain = domain.map(transform)
  const linear = createLinear({ domain: transformedDomain, ...rest })
  const scale = (x) => linear(transform(x))

  // TODO 后续添加 刻度计算

  return scale
}
