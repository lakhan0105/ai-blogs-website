import { createContext, useContext } from "react";

const myContext = createContext();

function ContextProvider({ children }) {
  return (
    <myContext.Provider value={"something"}>{children}</myContext.Provider>
  );
}

export function useMyContext() {
  return useContext(myContext);
}

export default ContextProvider;
