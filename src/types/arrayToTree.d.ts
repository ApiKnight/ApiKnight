import { ReactNode } from "react";

interface ArrayItem {
    key: number;
    title: {
        key: number;
        title: string;
        pid: number;
        type: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "PATCH" | "FILE";
    };
    pid: number;
    type: "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "PATCH" | "FILE";
    isLeaf?: boolean | undefined;
}

interface ArrayNode {
    key: number;
    title: ReactNode;
    pid: number;
    type: string;
    isLeaf?: boolean | undefined;
}

interface TreeNode {
    key: number;
    title: ReactNode;
    type: string;
    pid: number;
    children?: TreeNode[];
    isLeaf?: boolean
}

export type { TreeNode , ArrayItem , ArrayNode };
