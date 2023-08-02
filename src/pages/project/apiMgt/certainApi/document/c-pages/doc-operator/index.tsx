import React, { memo, useState } from "react"
import { Button, Input, Select, Space } from "antd"

import type { ReqOptType } from "./type"
import "./index.less"

// 请求类型信息
const methodOptions: ReqOptType[] = [
    { label: "GET", value: "GET", colorClassName: "color-get" },
    {
        label: "POST",
        value: "POST",
        colorClassName: "color-post"
    },
    { label: "PUT", value: "PUT", colorClassName: "color-put" },
    { label: "DELETE", value: "DELETE", colorClassName: "color-delete" },
    { label: "OPTIONS", value: "OPTIONS", colorClassName: "color-options" },
    { label: "HEAD", value: "HEAD", colorClassName: "color-head" },
    { label: "PATCH", value: "PATCH", colorClassName: "color-patch" }
]

const DocOperator: React.FunctionComponent = memo(() => {
    const [method, setMethod] = useState(methodOptions[0])
    const [selectVisible, setSelectVisible] = useState(false)
    const [docUrl, setDocUrl] = useState("")

    // 手动渲染请求方式下拉列表
    function getDropDownEle(): React.ReactElement {
        return (
            <ul className="method-select">
                {methodOptions.map((item, index) => (
                    <li
                        className={["method-item", item.colorClassName].join(
                            " "
                        )}
                        onClick={() => methodChooseHandle(item)}
                        key={index}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>
        )
    }

    // 选择请求方式点击事件
    function methodChooseHandle(req: ReqOptType): void {
        console.log(req)
        setSelectVisible(false)
        setMethod(req)
    }

    // 输入框改变事件
    function urlInputChangeHandle(
        e: React.ChangeEvent<HTMLInputElement>
    ): void {
        setDocUrl(e.target.value)
        // TODO:加上防抖与节流
    }

    return (
        <div className="doc-operator">
            <div className={["left-info", method.colorClassName].join(" ")}>
                <Space.Compact block>
                    <Select
                        open={selectVisible}
                        onDropdownVisibleChange={(visible) =>
                            setSelectVisible(visible)
                        }
                        // options={methodOptions}
                        optionLabelProp="value"
                        defaultValue={method}
                        value={method}
                        options={methodOptions}
                        popupMatchSelectWidth={100}
                        dropdownRender={getDropDownEle}
                        onSelect={(e) => console.log(e)}
                    />
                    <Input
                        value={docUrl}
                        onChange={(e) => urlInputChangeHandle(e)}
                    />
                </Space.Compact>
            </div>
            <div className="right-warp">
                <Button className="btn" type="primary">
                    保存
                </Button>
                <Button className="btn">运行</Button>
                <Button className="btn">删除</Button>
            </div>
        </div>
    )
})

export default DocOperator
