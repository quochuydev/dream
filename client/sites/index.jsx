import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, message, Avatar, Card, List, Row, Col } from "antd";

import { Layout } from "../components";
import { BlogService } from "../services";

import "antd/dist/antd.css";

const { Meta } = Card;

export default function Blogs({ initBlogs, ...props }) {
  return (
    <Layout>
      {/* <Button
        onClick={() => {
            // 
        }}
      >
        Apply filter
      </Button>
      <Link href={`/`}>Link</Link> */}
    </Layout>
  );
}
