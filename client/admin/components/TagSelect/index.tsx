import React from "react";

import SearchSelect from "../../../components/SearchSelect";
import { TagService } from "../../../services";

import "antd/dist/antd.css";

export default function TagSelect({ selected, setSelected, ...props }) {
  const initQuery = { page: 1, limit: 20 };

  const [query, setQuery] = React.useState(initQuery);
  const [tags, setTags] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  const tagService = TagService();

  React.useEffect(() => {
    fetchData();
  }, [query]);

  async function fetchData() {
    const result = await tagService.list(query);
    setTags(result.items);
    setTotal(result.total);
  }

  async function createTag(data) {
    await tagService.create(data);
    setQuery({ ...query });
  }

  return (
    <SearchSelect
      {...props}
      id={"tags"}
      limit={query.limit}
      page={query.page}
      selected={selected}
      total={total}
      values={tags}
      handleValue={setSelected}
      search={(value) => {
        setQuery({ ...query, ...value });
      }}
      add={async (name) => {
        await createTag({ name });
      }}
    />
  );
}
