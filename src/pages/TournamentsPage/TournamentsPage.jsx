import { useEffect, useState } from "react";
import { TournamentsList } from "../../components/TournamentsList/TournamentsList";
import { tournamentsApi } from "../../Api/ApiRequest";

const TournamentsPage = () => {
  const [tournamentsArray, setTournamentsArray] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const tournaments = tournamentsApi();
    tournaments?.sort((a, b) => a.name.localeCompare(b.name));
    setTournamentsArray(tournaments);
  }, []);

  return (
    <>
      <TournamentsList tournamentsArray={tournamentsArray} />
    </>
  );
};

export default TournamentsPage;