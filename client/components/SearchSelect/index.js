import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";

import { message, Drawer, PageHeader, Button } from "antd";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import "./style.css";
import "antd/dist/antd.css";

export default function SearchSelect({ values, ...props }) {
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (values) {
      const newOptions = values.map((e) =>
        Object({ value: e._id, label: e.title })
      );
      setOptions(newOptions);
    }
  }, [values]);

  useEffect(() => {
    if (props.selected) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  return (
    <>
      <Select
        {...props}
        inputId={`react-select-${props.id}`}
        options={options}
        value={selected}
        isMulti={true}
        components={{ Menu }}
        onChange={(value) => {
          if (!value) {
            value = [];
          }
          props.handleValue(value);
        }}
        onInputChange={(q) => {
          props.search({ q });
        }}
      />
    </>
  );
}

function Menu(props) {
  const { innerRef, innerProps, children, selectProps } = props;
  const totalPage = Math.ceil(selectProps.total / selectProps.limit);

  return (
    <div ref={innerRef} {...innerProps}>
      <div>
        ADD {selectProps.inputValue} {selectProps.total}
      </div>
      {!selectProps.total && <div>ADD</div>}
      {children}
      <div>
        <Button
          onClick={() => {
            if (props.selectProps.search && props.selectProps.page - 1 >= 1) {
              props.selectProps.search({
                page: props.selectProps.page - 1,
              });
            }
          }}
        >
          <LeftCircleOutlined />
        </Button>
        <span>
          {props.selectProps.page}/{totalPage}
        </span>
        <Button
          onClick={() => {
            if (
              props.selectProps.search &&
              props.selectProps.page < totalPage
            ) {
              props.selectProps.search({
                page: props.selectProps.page + 1,
              });
            }
          }}
        >
          <RightCircleOutlined className="cursor-pointer" />
        </Button>
      </div>
    </div>
  );
}
