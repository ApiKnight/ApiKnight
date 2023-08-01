import React, { memo, useState, useRef } from "react";
import { Button, Input, Select, Space } from "antd";
import "./index.less";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "HEAD" | "PATCH";
type ReqOptType = { label: string; value: Method; color: string };

// const colors: string[] = [
//   "#49AA19",
//   "#D87A16",
//   "#176DDC",
//   "#D84A1E",
//   "#176DDC",
//   "#176DDC",
//   "#CF2F86",
// ];
const methodOptions: ReqOptType[] = [
  { label: "GET", value: "GET", color: "#49AA19" },
  { label: "POST", value: "POST", color: "#D87A16" },
  { label: "PUT", value: "PUT", color: "#176DDC" },
  { label: "DELETE", value: "DELETE", color: "#D84A1E" },
  { label: "OPTIONS", value: "OPTIONS", color: "#176DDC" },
  { label: "HEAD", value: "HEAD", color: "#176DDC" },
  { label: "PATCH", value: "PATCH", color: "#CF2F86" },
];

const DocOperator: React.FunctionComponent = memo(() => {
  const [method, setMethod] = useState(methodOptions[0]);
  const [selectVisible, setSelectVisible] = useState(false);
  const selectRef = useRef(null);

  // 手动渲染请求方式下拉列表
  function getDropDownEle(): React.ReactElement {
    return (
      <ul className="method-select">
        {methodOptions.map((item, index) => (
          <li
            className="method-item"
            style={{ color: item.color }}
            onClick={() => methodChooseHandle(item)}
            key={index}
          >
            {item.label}
          </li>
        ))}
      </ul>
    );
  }

  // 选择请求方式点击事件
  function methodChooseHandle(req: ReqOptType): void {
    console.log(req);
    setSelectVisible(false);
    setMethod(req);
    console.log(selectRef.current);
  }

  return (
    <div className="doc-operator">
      <div className="left-info">
        <Space.Compact block>
          <Select
            ref={selectRef}
            open={selectVisible}
            onDropdownVisibleChange={(visible) => setSelectVisible(visible)}
            // options={methodOptions}
            optionLabelProp="value"
            defaultValue={method}
            value={method}
            options={methodOptions}
            popupMatchSelectWidth={100}
            dropdownRender={getDropDownEle}
            onSelect={(e) => console.log(e)}
          />
          <Input defaultValue="/v2/getGoodsList" />
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
  );
});

export default DocOperator;
