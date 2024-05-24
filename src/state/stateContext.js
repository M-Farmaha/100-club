import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const storedData = localStorage.getItem("globalState");
  const parsedData = JSON.parse(storedData);
  const [globalState, setGlobalState] = useState({
    members: parsedData?.members || [],
    photos: parsedData?.photos || [],
    tournaments: parsedData?.tournaments || [],
  });
  useEffect(() => {
    localStorage.setItem("globalState", JSON.stringify(globalState));
  }, [globalState]);

  return (
    <StateContext.Provider
      value={{
        globalState,
        setGlobalState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
