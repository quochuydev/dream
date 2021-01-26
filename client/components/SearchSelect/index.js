import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Select from "react-select";
import _ from "lodash";

import { Input, Button, Modal, Upload } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Form, message } from "antd";

import "antd/dist/antd.css";

export default function SearchSelect({}) {
  const router = useRouter();
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
