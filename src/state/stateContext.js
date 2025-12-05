import { createContext, useContext, useState, useEffect } from "react";
import { FILTERS } from "../constants/constants";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const storedData = localStorage.getItem("globalState");
  const parsedData = JSON.parse(storedData);
  const [globalState, setGlobalState] = useState({
    members: parsedData?.members || [],
    photos: parsedData?.photos || [],
    tournaments: parsedData?.tournaments || [],

    filters: parsedData?.filters || {
      playersName: FILTERS.playersName.initialValue,
      playersType: FILTERS.playersType.initialValue,
      playersBirth: FILTERS.playersBirth.initialValue,
      playersSex: FILTERS.playersSex.initialValue,
      galleryDate: FILTERS.galleryDate.initialValue,
      mixSex: FILTERS.mixSex.initialValue,
      superStatsSex: FILTERS.superStatsSex.initialValue,
      superStatsTournamentType: FILTERS.superStatsTournamentType.initialValue,
    },
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
