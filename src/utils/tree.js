/**
 * 获取所有后代
 * @param {*} root
 * @returns
 */
export function descendants(root) {
  const nodes = []
  const push = (d) => nodes.push(d)
  bfs(root, push)
  return nodes
}

/**
 * 使用宽度优先搜索遍历这棵树
 * @param {*} root
 * @param {*} callback
 */
export function bfs(root, callback) {
  const discovered = [root]
  while (discovered.length) {
    const node = discovered.pop()
    callback(node)
    discovered.push(...(node.children || []))
  }
}
