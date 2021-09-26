const ListReducer = (state, action) => {
  switch (action.type) {
    case "GET_LISTS":
      return {
        lists: action.payload,
      };
    case "DELETE_LISTS":
      return {
        lists: state.lists.filter((list) => list._id !== action.payload),
      };

    case "CREATE_LIST":
      return {
        lists: [...state.lists, action.payload],
      };
    case "UPDATE_LIST":
      return {
        lists: [
          ...state.lists,
          state.lists.find((list) => list._id === action.payload.id) &&
            action.payload.list,
        ],
      };
    default:
      return { ...state };
  }
};

export default ListReducer;
