import React from "react";
import SearchSelect from "../../../components/SearchSelect";
import { TagService } from "../../../services";

import "antd/dist/antd.css";

export default function TagSelect({ ...props }) {
  const initQuery = { page: 1, limit: 20 };

  const [query, setQuery] = React.useState(initQuery);
  const [tags, setTags] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [selected, setSelected] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, [query]);

  async function fetchData() {
    const result = await TagService.list(query);
    setTags(result.items);
    setTotal(result.total);
  }

  async function createTag(data) {
    const result = await TagService.create(data);
    console.log(result);
  }

  return (
    <SearchSelect
      id={"tags"}
      limit={query.limit}
      page={query.page}
      selected={props.selected}
      total={total}
      values={tags}
      handleValue={props.setSelected}
      search={(value) => {
        setQuery({ ...query, ...value });
      }}
      add={async (name) => {
        await createTag({ name });
      }}
    />
  );
}
