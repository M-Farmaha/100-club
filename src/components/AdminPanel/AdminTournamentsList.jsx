import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { tournamentsApi } from "../../Api/ApiRequest";
import {
  exportToJsonFile,
  importJsonFile,
  getAdminBaselineData,
} from "./adminHelpers";
import { TournamentLogo } from "../Logo/Logo";
import sprite from "../../sprite.svg";
import {
  AdminContainer,
  DashboardHeader,
  DashboardTitle,
  ActionButton,
  ButtonText,
  ButtonGroup,
  TournamentCard,
  TournamentCardInfo,
  TournamentCardName,
  TournamentCardMeta,
  BackLink,
} from "./AdminPanel.styled";
import { useAdminToast } from "./AdminToast";
import { ConfirmModal } from "./ConfirmModal";

export const AdminTournamentsList = () => {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useStateContext();
  const { tournaments } = globalState;
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const showMessage = useAdminToast();

  const handleExport = () => {
    exportToJsonFile(tournaments, "tournaments.json");
    showMessage("Файл tournaments.json завантажено");
  };

  const handleImport = async () => {
    try {
      const data = await importJsonFile();
      if (Array.isArray(data)) {
        setGlobalState((prev) => ({ ...prev, tournaments: data }));
        showMessage("Дані турнірів успішно імпортовано");
      } else {
        showMessage(
          "Невірний формат файлу — очікується масив турнірів",
          "error"
        );
      }
    } catch (err) {
      showMessage(`${err.message}`, "error");
    }
  };

  const handleRestoreAll = () => {
    const baselineData = getAdminBaselineData();
    const freshData =
      baselineData?.tournaments ||
      JSON.parse(JSON.stringify(tournamentsApi()));
    setGlobalState((prev) => ({ ...prev, tournaments: freshData }));
    setShowRestoreModal(false);
    showMessage("Дані турнірів відновлено", "restore");
  };

  const getTotalStages = (tournament) => {
    return (
      tournament.seasons?.reduce(
        (acc, season) => acc + (season.stages?.length || 0),
        0
      ) || 0
    );
  };

  const sortedTournaments = [...(tournaments || [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Check if tournaments changed from baseline
  const baselineData = getAdminBaselineData();
  const hasChanges = baselineData
    ? JSON.stringify(tournaments) !== JSON.stringify(baselineData.tournaments)
    : false;

  return (
    <AdminContainer>
      <BackLink onClick={() => navigate("/admin")}>
        <svg>
          <use href={`${sprite}#icon-undo`} />
        </svg>
        Назад
      </BackLink>

      <DashboardHeader>
        <DashboardTitle>
          <svg width="24" height="24" style={{ fill: "var(--primary-black-color)" }}>
            <use href={`${sprite}#icon-cup`} />
          </svg>
          Турніри
        </DashboardTitle>
        <ButtonGroup>
          <ActionButton
            $variant="secondary"
            onClick={() => setShowRestoreModal(true)}
            disabled={!hasChanges}
            style={{
              opacity: hasChanges ? 1 : 0.5,
              cursor: hasChanges ? "pointer" : "not-allowed",
            }}
          >
            <svg width="16" height="16" style={{ fill: "currentColor" }}>
              <use href={`${sprite}#icon-restore`} />
            </svg>
            <ButtonText>Відновити</ButtonText>
          </ActionButton>
          <ActionButton onClick={handleImport} $variant="secondary">
            <svg width="12" height="12" style={{ fill: "currentColor", transform: "rotate(180deg)" }}>
              <use href={`${sprite}#icon-arrow-bold`} />
            </svg>
            <ButtonText>Імпорт</ButtonText>
          </ActionButton>
          <ActionButton onClick={handleExport} $variant="secondary">
            <svg width="12" height="12" style={{ fill: "currentColor" }}>
              <use href={`${sprite}#icon-arrow-bold`} />
            </svg>
            <ButtonText>Експорт</ButtonText>
          </ActionButton>
        </ButtonGroup>
      </DashboardHeader>

      <div>
        {sortedTournaments.map((tournament) => (
          <TournamentCard
            key={tournament.tournament_id}
            onClick={() =>
              navigate(`/admin/tournaments/${tournament.tournament_id}`)
            }
          >
            <TournamentLogo path={tournament.logo} />
            <TournamentCardInfo>
              <TournamentCardName>{tournament.name}</TournamentCardName>
              <TournamentCardMeta>
                Сезонів: {tournament.seasons?.length || 0} • Турнірів:{" "}
                {getTotalStages(tournament)}
              </TournamentCardMeta>
            </TournamentCardInfo>
            <svg width="16" height="16" style={{ fill: "var(--primary-black-color)", flexShrink: 0 }}>
              <use href={`${sprite}#icon-arrow-right`} />
            </svg>
          </TournamentCard>
        ))}
      </div>

      <ConfirmModal
        isOpen={showRestoreModal}
        onConfirm={handleRestoreAll}
        onCancel={() => setShowRestoreModal(false)}
        title="Відновити турніри?"
        message="Ця дія поверне всі турніри до останнього опублікованого стану. Всі поточні зміни турнірів будуть втрачені."
        confirmText="Відновити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />
    </AdminContainer>
  );
};
