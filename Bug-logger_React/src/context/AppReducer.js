const AppReducer = (state, action) => {
  switch (action.type) {
    case "DELETE_LOG":
      return {
        ...state,
        logs: state.logs.filter((log) => log.id !== action.payload),
      };
    case "ADD_LOG":
      return {
        ...state,
        logs: [action.payload, ...state.logs],
      };
    case "FETCH_LOG":
      return {
        ...state,
        logs: action.payload,
      };
    case "FETCH_USER":
      return {
        ...state,
        users: action.payload,
      };
    //   case "EDIT_LOG":
    //     return {
    //       ...state,
    //       logs: state.logs.map((logs) =>
    //       logs.id === action.payload_id
    //           ? { ...logs, amount: action.payload_amount }
    //           : { ...logs }
    //       ),
    //     };
    default:
      return state;
  }
};

export default AppReducer;
