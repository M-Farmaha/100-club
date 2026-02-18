import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { getAdminBaselineData } from "./adminHelpers";
import { useAdminToast } from "./AdminToast";
import { getUkrLocaleDate } from "../../helpers/getUkrLocaleDate";
import { ConfirmModal } from "./ConfirmModal";
import {
  AdminContainer,
  DashboardHeader,
  DashboardTitle,
  ActionButton,
  ButtonText,
  ButtonGroup,
  BackLink,
  EditorSection,
  EditorSectionTitle,
  StageRow,
  StageRowRight,
  StageDate,
  StagePlayers,
  SeasonTab,
  SeasonTabs,
  EmptyState,
  NumberInput,
} from "./AdminPanel.styled";
import sprite from "../../sprite.svg";

export const AdminTournamentEditor = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useStateContext();
  const { tournaments } = globalState;

  const tournament = useMemo(
    () => tournaments?.find((t) => t.tournament_id === tournamentId),
    [tournaments, tournamentId]
  );

  const [selectedYear, setSelectedYear] = useState(null);
  const [isNewSeason, setIsNewSeason] = useState(false);
  const [newSeasonYear, setNewSeasonYear] = useState(() => String(new Date().getFullYear()));
  const showMessage = useAdminToast();
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    requirePassword: false,
    onConfirm: null,
  });
  const [showRestoreModal, setShowRestoreModal] = useState(false);



  if (!tournament) {
    return (
      <AdminContainer>
        <EmptyState>Турнір не знайдено</EmptyState>
      </AdminContainer>
    );
  }

  const seasons = tournament.seasons || [];
  const activeYear = selectedYear || (seasons.length > 0 ? seasons[seasons.length - 1].year : null);
  const activeSeason = seasons.find((s) => s.year === activeYear);
  const stages = activeSeason?.stages || [];

  // Get original published season from baseline (fetched from GitHub)
  const baselineTournaments = getAdminBaselineData()?.tournaments;
  const originalTournament = baselineTournaments?.find((t) => t.tournament_id === tournamentId);
  const originalSeason = originalTournament?.seasons?.find((s) => s.year === activeYear) || null;

  // Check if current season differs from original published data
  const hasSeasonChanges = activeSeason && originalSeason
    ? JSON.stringify(activeSeason) !== JSON.stringify(originalSeason)
    : false;

  const handleRestoreSeason = () => {
    if (!originalSeason) return;
    const updatedTournaments = tournaments.map((t) => {
      if (t.tournament_id !== tournamentId) return t;
      return {
        ...t,
        seasons: t.seasons.map((s) => {
          if (s.year !== activeYear) return s;
          return { ...originalSeason };
        }),
      };
    });
    setGlobalState((prev) => ({ ...prev, tournaments: updatedTournaments }));
    setShowRestoreModal(false);
    showMessage(`Сезон ${activeYear} відновлено`, "restore");
  };

  const handleAddSeason = () => {
    if (!newSeasonYear || isNaN(parseInt(newSeasonYear))) return;

    const year = parseInt(newSeasonYear);
    if (seasons.find((s) => s.year === year)) {
      showMessage("Такий сезон вже існує", "error");
      return;
    }

    const updatedTournaments = tournaments.map((t) => {
      if (t.tournament_id !== tournamentId) return t;
      return {
        ...t,
        seasons: [...(t.seasons || []), { year, stages: [] }].sort(
          (a, b) => a.year - b.year
        ),
      };
    });

    setGlobalState((prev) => ({ ...prev, tournaments: updatedTournaments }));
    setSelectedYear(year);
    setIsNewSeason(false);
    setNewSeasonYear(String(new Date().getFullYear()));
    showMessage(`Сезон ${year} додано`, "add");
  };

  const handleDeleteSeason = () => {
    if (!activeYear) return;
    
    setConfirmModal({
      isOpen: true,
      title: "Видалити сезон?",
      message: `Ви збираєтесь видалити сезон ${activeYear} з усіма турнірами.`,
      requirePassword: false,
      onConfirm: () => {
        const updatedTournaments = tournaments.map((t) => {
          if (t.tournament_id !== tournamentId) return t;
          return {
            ...t,
            seasons: t.seasons.filter((s) => s.year !== activeYear),
          };
        });
        setGlobalState((prev) => ({ ...prev, tournaments: updatedTournaments }));
        setSelectedYear(null);
        showMessage(`Сезон ${activeYear} видалено`, "delete");
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return (
    <AdminContainer>
      <BackLink onClick={() => navigate("/admin/tournaments")}>
        <svg>
          <use href={`${sprite}#icon-undo`} />
        </svg>
        Назад
      </BackLink>

      <DashboardHeader>
        <DashboardTitle>
          {tournament.name}
        </DashboardTitle>
      </DashboardHeader>

      {/* Season tabs */}
      <SeasonTabs>
        {seasons.map((season) => (
          <SeasonTab
            key={season.year}
            $active={season.year === activeYear}
            onClick={() => setSelectedYear(season.year)}
          >
            {season.year}
          </SeasonTab>
        ))}
        {isNewSeason ? (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <NumberInput
              type="number"
              placeholder="Рік"
              value={newSeasonYear}
              onChange={(e) => setNewSeasonYear(e.target.value)}
              style={{ width: 80 }}
              autoFocus
            />
            <ActionButton onClick={handleAddSeason}>✓</ActionButton>
            <ActionButton
              $variant="secondary"
              onClick={() => {
                setIsNewSeason(false);
                setNewSeasonYear(String(new Date().getFullYear()));
              }}
            >
              ✕
            </ActionButton>
          </div>
        ) : (
          <SeasonTab onClick={() => setIsNewSeason(true)}>+ Сезон</SeasonTab>
        )}
      </SeasonTabs>

      {/* Stages list */}
      {activeYear && (
        <EditorSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 10 }}>
            <EditorSectionTitle style={{ margin: 0 }}>
              Турніри сезону {activeYear}
            </EditorSectionTitle>
            <ButtonGroup>
              {originalSeason && (
                <ActionButton
                  $variant="secondary"
                  onClick={() => setShowRestoreModal(true)}
                  disabled={!hasSeasonChanges}
                  style={{
                    opacity: hasSeasonChanges ? 1 : 0.5,
                    cursor: hasSeasonChanges ? 'pointer' : 'not-allowed',
                  }}
                >
                  <svg width="16" height="16" style={{ fill: 'currentColor' }}>
                    <use href={`${sprite}#icon-restore`} />
                  </svg>
                  <ButtonText>Відновити</ButtonText>
                </ActionButton>
              )}
              <ActionButton onClick={() => navigate(`/admin/tournaments/${tournamentId}/${activeYear}/new`)}>
                <svg width="16" height="16" style={{ fill: 'currentColor' }}>
                  <use href={`${sprite}#icon-plus`} />
                </svg>
                <ButtonText>Додати турнір</ButtonText>
              </ActionButton>
              <ActionButton
                $variant="danger"
                onClick={handleDeleteSeason}
              >
                <svg width="16" height="16" style={{ fill: 'currentColor' }}>
                  <use href={`${sprite}#icon-trash`} />
                </svg>
                <ButtonText>Видалити сезон</ButtonText>
              </ActionButton>
            </ButtonGroup>
          </div>

          {stages.length === 0 && (
            <EmptyState>Ще немає турнірів у цьому сезоні</EmptyState>
          )}

          {stages.map((stage) => (
            <StageRow
              key={stage.date}
              onClick={() => navigate(`/admin/tournaments/${tournamentId}/${activeYear}/${stage.date}`)}
            >
              <StageDate>{getUkrLocaleDate(stage.date)}</StageDate>
              <StageRowRight>
                <StagePlayers>Гравців: {stage.players?.length || 0}</StagePlayers>
                <svg width="16" height="16" style={{ fill: "var(--primary-black-color)", flexShrink: 0 }}>
                  <use href={`${sprite}#icon-arrow-right`} />
                </svg>
              </StageRowRight>
            </StageRow>
          ))}
        </EditorSection>
      )}

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText="Видалити"
        cancelText="Скасувати"
        requirePassword={confirmModal.requirePassword}
      />

      <ConfirmModal
        isOpen={showRestoreModal}
        onConfirm={handleRestoreSeason}
        onCancel={() => setShowRestoreModal(false)}
        title="Відновити сезон?"
        message={`Ця дія поверне сезон ${activeYear} до останнього опублікованого стану. Всі поточні зміни будуть втрачені.`}
        confirmText="Відновити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />
    </AdminContainer>
  );
};
