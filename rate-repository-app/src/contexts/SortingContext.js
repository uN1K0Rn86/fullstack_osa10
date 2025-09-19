import { createContext, useReducer } from "react";

const sortingReducer = (state, action) => {
  switch (action.type) {
    case "LATEST":
      return "latest";
    case "HIGHEST":
      return "highest";
    case "LOWEST":
      return "lowest";
    default:
      return state;
  }
};

const SortingContext = createContext();

export const SortingContextProvider = (props) => {
  const [sortingPrinciple, dispatch] = useReducer(sortingReducer, "latest");

  return (
    <SortingContext.Provider value={[sortingPrinciple, dispatch]}>
      {props.children}
    </SortingContext.Provider>
  );
};

export default SortingContext;
