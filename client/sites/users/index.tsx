import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, message, Avatar } from "antd";
import TinderCard from 'react-tinder-card'

import { Layout } from "../../components";
import { BlogService } from "../../services";


import Advanced from './demo'
import "antd/dist/antd.css";

export default function Blogs({ initBlogs, ...props }) {
  const initQuery = { page: 1, limit: 20 };
  const [query, setQuery] = useState(initQuery);
  const [blogs, setBlogs] = useState([]);

  function useDidUpdateEffect(fn, inputs) {
    const didMountRef = useRef(false);
    useEffect(() => {
      if (didMountRef.current) fn();
      else didMountRef.current = true;
    }, inputs);
  }

  useEffect(() => {
    setBlogs(initBlogs);
  }, []);

  useDidUpdateEffect(() => {
    fetchBlogs();
  }, [query]);

  async function fetchBlogs() {
    const result = await BlogService.publish.list(query);
    setBlogs(result.items);
  }

  
const onSwipe = (direction) => {
  console.log('You swiped: ' + direction)
}

const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen')
}
  return (
    <Layout>
      <Advanced/>
      <ul className="p-none">
        {blogs.map((e, i) => (
          <li key={e._id}>
            <span>{i + 1}. </span>
              <a>{e._id}</a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
