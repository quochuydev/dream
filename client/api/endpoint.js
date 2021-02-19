export const API = '/api';
export const APIv1 = `${API}/v1`;

export const BLOGS =  {
LIST: `${API}/blogs`,
CREATE: `${API}/blogs`,
DETAIL: `${API}/blogs/{id}`,
UPDATE: `${API}/blogs/{id}`,
DELETE: `${API}/blogs/{id}`,
}

export const USERS =  {
LIST: `${API}/users`,
CREATE: `${API}/users`,
DETAIL: `${API}/users/{id}`,
UPDATE: `${API}/users/{id}`,
DELETE: `${API}/users/{id}`,
}

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
}