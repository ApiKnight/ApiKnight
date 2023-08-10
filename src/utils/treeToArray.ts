import { TreeNode } from '@/types/arrayToTree'

export function treeToArray(data: TreeNode[], pid: string | null = null) {
    const result = [];
    data.forEach((node) => {
        if (node.pid === pid) {
            const { key, title, type, pid } = node;
            result.push({
                key,
                title: title.key,
                type,
                pid,
            });
            const children = treeToArray(data, node.key);
            if (children.length > 0) {
                result.push(...children);
            }
        }
    });
    return result;
}
