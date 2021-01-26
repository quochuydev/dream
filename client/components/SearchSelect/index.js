import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";

import { Menu, message, Drawer, PageHeader, Button } from "antd";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  SearchOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import "./style.css";
import "antd/dist/antd.css";

export default function SearchSelect({ total, ...props }) {
  const [selected, setSelected] = React.useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (props.values) {
      const newOptions = props.values.map((e) =>
        Object({ value: e._id, label: e.title })
      );
      setOptions(newOptions);
    }
  }, [props.values]);

  useEffect(() => {
    if (props.selected) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  function search(key) {
    props.search(key);
  }

  const Menu = (props) => {
    const { innerRef, innerProps, children, selectProps } = props;
    return (
      <div ref={innerRef} {...innerProps}>
        <div>
          {total} ADD {selectProps.inputValue}
        </div>
        {children}
        <div>
          <Button>
            <LeftCircleOutlined />
          </Button>
          <Button>
            <RightCircleOutlined />
          </Button>
        </div>
      </div>
    );
  };
  const idTag = `react-select-tags`;

  return (
    <>
      <Select
        inputId={idTag}
        options={options}
        value={selected}
        isMulti={true}
        components={{ Menu }}
        onChange={(value) => {
          console.log(value);
          if (!value) {
            value = [];
          }
          setSelected(value);
        }}
        onInputChange={(e) => {
          console.log(e);
          search(e);
        }}
      />
      {/* {JSON.stringify(options)} */}
    </>
  );
}
