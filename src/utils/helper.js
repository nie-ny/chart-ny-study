/**
 * 科里化
 */
export function curry(fn) {
  const arity = fn.length
  return function curried(...args) {
    // 如果没有传入参数就把参数列表设置为 [undefined]
    const newArgs = args.length === 0 ? [undefined] : args
    if (newArgs.length >= arity) return fn(...newArgs)
    return curried.bind(null, ...newArgs)
  }
}

/**
 * 默认函数 不做操作
 * @param {*} x
 * @returns
 */
export function identity(x) {
  return x
}

/**
 * 组合函数
 * @param {*} fn
 * @param  {...any} rest
 * @returns
 */
export function compose(...fns) {
  return fns.reduce((total, cur) => (x) => cur(total(x)), identity)
}

/**
 * 通过传入函数 修改对象 对应属性的值
 * @param {*} object
 * @param {*} transform 变换函数
 * @returns
 */
export function map(object, transform = identity) {
  return Object.entries(object).reduce((obj, [key, value]) => {
    obj[key] = transform(value, key)
    return obj
  }, {})
}

/**
 * 复制 source 对象中的值
 * target 存在属性 替换 属性值
 * @param {*} target
 * @param {*} source
 */
export function assignDefined(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (value !== undefined) target[key] = value
  }
}

/**
 * 是否为 NaN
 * @param {*} d
 * @returns
 */
export function defined(d) {
  return d !== undefined && !Number.isNaN(d)
}
