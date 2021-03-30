import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "../../admin/components/Thumbnail/node_modules/lodash";

import { Button, Tag } from "antd";
import { RightCircleOutlined, LeftCircleOutlined } from "@ant-design/icons";

import "./SearchSelect.module.css";
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

  const _search = async (q) => {
    if (props.search) {
      await props.search({ q, page: 1 });
    }
    return;
  };

  const search = _.debounce(_search, 500);

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
        onInputChange={(value) => {
          search(value);
        }}
      />
    </>
  );
}

function Menu(props) {
  const { innerRef, innerProps, children, selectProps } = props;
  const { total, page, limit, inputValue, add, search } = selectProps;
  const totalPage = Math.ceil(total / limit);

  return (
    <div ref={innerRef} {...innerProps}>
      {!total && !!inputValue && (
        <div>
          <Button
            onClick={() => {
              if (add) {
                add(inputValue);
              }
            }}
          >
            ADD
          </Button>
          <Tag color="cyan" style={{ fontSize: 15, marginLeft: 5 }}>
            {inputValue}
          </Tag>
        </div>
      )}
      {!!total && (
        <div>
          {children}
          <Button
            onClick={() => {
              if (search && page - 1 >= 1) {
                search({
                  page: page - 1,
                });
              }
            }}
          >
            <LeftCircleOutlined />
          </Button>
          <span>
            {page}/{totalPage}
          </span>
          <Button
            onClick={() => {
              if (search && page < totalPage) {
                search({
                  page: page + 1,
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
