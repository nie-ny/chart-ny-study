/**
 * 创建 SVG画布 元素
 * @param {*} type 元素类型
 * @returns
 */
export function createSVGElement(type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type)
}

/**
 * 将 child 节点 挂载到 parent 节点 上面
 * @param {*} parentDOM
 * @param {*} childDOM
 */
export function mount(parentDOM, childDOM) {
  if (parentDOM) {
    parentDOM.appendChild(childDOM)
  }
}

/**
 * 给元素添加 属性
 * @param {*} element SVG 元素
 * @param {*} attributes 属性
 */
export function applyAttributes(element, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    // 这里需要把类似 strokeWidth 的属性转换成 stroke-width 的形式
    const kebabCaseKey = key.replace(/[A-Z]/g, (d) => `-${d.toLocaleLowerCase()}`)
    element.setAttribute(kebabCaseKey, value)
  }
}

/**
 * 对同一个元素的变换 进行拼接  这里需要字符串拼接
 * @param {*} element
 * @param {*} transform
 */
export function applyTransform(element, transform) {
  const oldTransform = element.getAttribute('transform') || ''
  // 获取 元素已设置的 变换
  const prefix = oldTransform ? `${oldTransform} ` : ''
  // 拼接 变换
  element.setAttribute('transform', `${prefix}${transform}`)
}
