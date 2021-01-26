import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";

import "antd/dist/antd.css";

export default function SearchSelect({}) {
  const [tags, setTags] = React.useState([]);

  const Menu = (props) => {
    const { innerRef, innerProps, children, selectProps } = props;
    return (
      <div ref={innerRef} {...innerProps}>
        <div>ADD {selectProps.inputValue}</div>
        {children}
        <div>-+</div>
      </div>
    );
  };
  const idTag = `react-select-tags`;

  return (
    <Select
      inputId={idTag}
      options={[
        { value: 1, label: "1" },
        { value: 2, label: "2" },
      ]}
      value={tags}
      isMulti={true}
      components={{ Menu }}
      onChange={(value) => {
        if (!value) {
          value = [];
        }
        setTags(value);
      }}
      onInputChange={(e) => {
        if (e) {
          console.log(e);
        }
      }}
    />
  );
}
