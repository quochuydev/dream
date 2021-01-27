import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";

import { Button, Tag } from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";

import "./style.css";
import "antd/dist/antd.css";

export default function SearchSelect({ values, ...props }) {
  const valueKey = props.valueKey || "_id";
  const labelKey = props.labelKey || "name";

  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (values) {
      const newOptions = values.map((e) =>
        Object({ value: e[valueKey], label: e[labelKey] })
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
          if (props.search) {
            props.search({ q });
          }
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
      {!selectProps.total && !!selectProps.inputValue && (
        <div>
          <Button
            onClick={() => {
              if (selectProps.add) {
                selectProps.add(selectProps.inputValue);
              }
            }}
          >
            ADD
          </Button>
          <Tag color="cyan" style={{ fontSize: 15, marginLeft: 5 }}>
            {selectProps.inputValue}
          </Tag>
        </div>
      )}
      {!!selectProps.total && (
        <div>
          {children}
          <Button
            onClick={() => {
              if (selectProps.search && selectProps.page - 1 >= 1) {
                selectProps.search({
                  page: selectProps.page - 1,
                });
              }
            }}
          >
            <LeftCircleOutlined />
          </Button>
          <span>
            {selectProps.page}/{totalPage}
          </span>
          <Button
            onClick={() => {
              if (selectProps.search && selectProps.page < totalPage) {
                selectProps.search({
                  page: selectProps.page + 1,
                });
              }
            }}
          >
            <RightCircleOutlined className="cursor-pointer" />
          </Button>
        </div>
      )}
    </div>
  );
}
