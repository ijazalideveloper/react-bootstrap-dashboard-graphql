const initialState = {
  classes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GETALLCLASSES":
      return { ...state, classes: action.classes };

    default:
      return state;
  }
};

export default reducer;
