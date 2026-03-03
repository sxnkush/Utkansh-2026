import { createContext, useState } from "react";
import { eventsData } from "../../data/eventdata";

export const Context = createContext();

const ContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const value = {
    search,
    setSearch,
    eventsData,
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>
};
export default ContextProvider;
