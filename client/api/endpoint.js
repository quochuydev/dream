export const api = "/api";
export const APIv1 = `/v1`;

export const API = {
  BLOGS: {
    LIST: `${api}/blogs`,
    DETAIL: `${api}/blogs/{id}`,
  },
  USERS: {
    LIST: `${api}/users`,
    DETAIL: `${api}/users/{id}`,
  },
};

export const V1 = {
  BLOGS: {
    LIST: `${APIv1}/blogs`,
    CREATE: `${APIv1}/blogs`,
    DETAIL: `${APIv1}/blogs/{id}`,
    UPDATE: `${APIv1}/blogs/{id}`,
    DELETE: `${APIv1}/blogs/{id}`,
  },
  USERS: {
    LIST: `${APIv1}/users`,
    CREATE: `${APIv1}/users`,
    DETAIL: `${APIv1}/users/{id}`,
    UPDATE: `${APIv1}/users/{id}`,
    DELETE: `${APIv1}/users/{id}`,
  },
};
