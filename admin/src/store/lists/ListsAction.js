export const getLists = (lists) => ({
  type: "GET_LISTS",
  payload: lists,
});

export const deleteList = (id) => ({
  type: "DELETE_LIST",
  payload: id,
});

export const updateList = (id, list) => ({
  type: "UPDATE_LIST",
  payload: {
    id,
    list,
  },
});

export const createList = (list) => ({
  type: "CREATE_LIST",
  payload: list,
});
