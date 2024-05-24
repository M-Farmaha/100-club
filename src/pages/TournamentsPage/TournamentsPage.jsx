import { useEffect } from "react";
import { TournamentsList } from "../../components/TournamentsList/TournamentsList";

const TournamentsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <TournamentsList />
    </>
  );
};

export default TournamentsPage;
