import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { getAdminBaselineData } from "./adminHelpers";
import { AdminStageEditor } from "./AdminStageEditor";
import {
  AdminContainer,
  DashboardHeader,
  DashboardTitle,
  ActionButton,
  ButtonText,
  ButtonGroup,
  BackLink,
  EmptyState,
} from "./AdminPanel.styled";
import { useAdminToast } from "./AdminToast";
import { ConfirmModal } from "./ConfirmModal";
import sprite from "../../sprite.svg";

export const AdminStagePage = () => {
  const { tournamentId, year, stageDate } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { globalState, setGlobalState } = useStateContext();
  const { tournaments, members } = globalState;
  const showMessage = useAdminToast();

  const isNew = stageDate === "new";
  const yearNum = parseInt(year, 10);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showInvalidLeaveModal, setShowInvalidLeaveModal] = useState(false);
  const stageChangesRef = useRef(false);
  const dataValidRef = useRef(true);
  const editorRef = useRef(null);

  const handleNewStageChanges = useCallback((hasChanges) => {
    stageChangesRef.current = hasChanges;
  }, []);

  const handleValidationError = useCallback((msg) => {
    showMessage(msg, "error");
  }, [showMessage]);

  const handleValidationStatus = useCallback((isValid) => {
    dataValidRef.current = isValid;
  }, []);

  const tournament = useMemo(
    () => tournaments?.find((t) => t.tournament_id === tournamentId),
    [tournaments, tournamentId]
  );

  const season = useMemo(
    () => tournament?.seasons?.find((s) => s.year === yearNum),
    [tournament, yearNum]
  );

  const MIN_PLAYERS = 4;

  const stage = useMemo(() => {
    if (isNew) {
      return {
        date: new Date().toISOString().split("T")[0],
        players: Array.from({ length: MIN_PLAYERS }, (_, i) => ({
          member_id: [],
          win: 0,
          defeat: 0,
          position: i + 1,
        })),
      };
    }
    return season?.stages?.find((st) => st.date === stageDate);
  }, [season, stageDate, isNew]);

  // Helper to get/set original date mapping in sessionStorage
  const getStorageKey = (date) => `admin_stage_original_${tournamentId}_${year}_${date}`;
  
  // Find original published date for this stage
  // Priority: 1) location.state 2) sessionStorage 3) check if date exists in original JSON
  const originalDateRef = useRef(null);
  if (originalDateRef.current === null && !isNew) {
    // Check navigation state first
    if (location.state?.originalDate) {
      originalDateRef.current = location.state.originalDate;
    } else {
      // Check sessionStorage for saved mapping
      const savedOriginalDate = sessionStorage.getItem(getStorageKey(stageDate));
      if (savedOriginalDate) {
        originalDateRef.current = savedOriginalDate;
      } else {
        // Check if current date exists in baseline data
        const baselineTournaments = getAdminBaselineData()?.tournaments;
        const originalTournament = baselineTournaments?.find((t) => t.tournament_id === tournamentId);
        const originalSeason = originalTournament?.seasons?.find((s) => s.year === yearNum);
        const originalStageFromJson = originalSeason?.stages?.find((st) => st.date === stageDate);
        originalDateRef.current = originalStageFromJson?.date || null;
      }
    }
  }

  // Get original published stage from baseline for restore functionality
  const originalStage = useMemo(() => {
    if (isNew || !originalDateRef.current) return null;
    const baselineTournaments = getAdminBaselineData()?.tournaments;
    const originalTournament = baselineTournaments?.find((t) => t.tournament_id === tournamentId);
    const originalSeason = originalTournament?.seasons?.find((s) => s.year === yearNum);
    return originalSeason?.stages?.find((st) => st.date === originalDateRef.current) || null;
  }, [tournamentId, yearNum, isNew]);





  if (!tournament) {
    return (
      <AdminContainer>
        <EmptyState>Турнір не знайдено</EmptyState>
      </AdminContainer>
    );
  }

  if (!season) {
    return (
      <AdminContainer>
        <EmptyState>Сезон не знайдено</EmptyState>
      </AdminContainer>
    );
  }

  if (!stage && !isNew) {
    return (
      <AdminContainer>
        <EmptyState>Турнір не знайдено</EmptyState>
      </AdminContainer>
    );
  }

  const handleSaveStage = (updatedStage) => {
    const updatedTournaments = tournaments.map((t) => {
      if (t.tournament_id !== tournamentId) return t;
      return {
        ...t,
        seasons: t.seasons.map((s) => {
          if (s.year !== yearNum) return s;

          let updatedStages;
          if (isNew) {
            updatedStages = [...s.stages, updatedStage];
          } else {
            updatedStages = s.stages.map((st) =>
              st.date === stageDate ? updatedStage : st
            );
          }

          updatedStages.sort((a, b) => a.date.localeCompare(b.date));

          return { ...s, stages: updatedStages };
        }),
      };
    });

    setGlobalState((prev) => ({ ...prev, tournaments: updatedTournaments }));
    
    // For new stages - show message and navigate back
    // For existing stages - if date changed, update URL
    if (isNew) {
      showMessage("Новий турнір додано", "add");
      setTimeout(() => {
        navigate(`/admin/tournaments/${tournamentId}`);
      }, 1000);
    } else if (updatedStage.date !== stageDate) {
      // Date changed - save mapping to sessionStorage so it persists
      // Remove old mapping
      sessionStorage.removeItem(getStorageKey(stageDate));
      // Save new mapping: newDate -> originalDate
      if (originalDateRef.current) {
        sessionStorage.setItem(getStorageKey(updatedStage.date), originalDateRef.current);
      }
      
      // Navigate to new URL to prevent "Stage not found"
      navigate(`/admin/tournaments/${tournamentId}/${year}/${updatedStage.date}`, { 
        replace: true,
        state: { originalDate: originalDateRef.current }
      });
    }
  };

  const handleDeleteStage = () => {
    const updatedTournaments = tournaments.map((t) => {
      if (t.tournament_id !== tournamentId) return t;
      return {
        ...t,
        seasons: t.seasons.map((s) => {
          if (s.year !== yearNum) return s;
          return {
            ...s,
            stages: s.stages.filter((st) => st.date !== stageDate),
          };
        }),
      };
    });

    setGlobalState((prev) => ({ ...prev, tournaments: updatedTournaments }));
    navigate(`/admin/tournaments/${tournamentId}`);
  };

  const handleCancel = () => {
    if (isNew && stageChangesRef.current) {
      setShowLeaveModal(true);
      return;
    }
    if (!isNew && !dataValidRef.current) {
      setShowInvalidLeaveModal(true);
      return;
    }
    navigate(`/admin/tournaments/${tournamentId}`);
  };

  const handleConfirmLeave = () => {
    setShowLeaveModal(false);
    navigate(`/admin/tournaments/${tournamentId}`);
  };

  const handleConfirmInvalidLeave = () => {
    setShowInvalidLeaveModal(false);
    navigate(`/admin/tournaments/${tournamentId}`);
  };

  return (
    <AdminContainer>
      <BackLink onClick={handleCancel}>
        <svg>
          <use href={`${sprite}#icon-undo`} />
        </svg>
        Назад
      </BackLink>

      {isNew && (
        <DashboardHeader>
          <DashboardTitle>
            <svg width="20" height="20" style={{ fill: "currentColor" }}>
              <use href={`${sprite}#icon-plus`} />
            </svg>
            Новий турнір
          </DashboardTitle>
          <ButtonGroup>
            <ActionButton onClick={() => editorRef.current?.save()}>
              <svg width="12" height="12" style={{ fill: "currentColor" }}>
                <use href={`${sprite}#icon-save`} />
              </svg>
              <ButtonText>Зберегти</ButtonText>
            </ActionButton>
          </ButtonGroup>
        </DashboardHeader>
      )}

      <AdminStageEditor
        ref={editorRef}
        stage={stage}
        members={members || []}
        tournamentId={tournamentId}
        tournamentName={tournament?.name || ""}
        onSave={handleSaveStage}
        onDelete={!isNew ? handleDeleteStage : null}
        isNew={isNew}
        originalStage={originalStage}
        onHasChanges={isNew ? handleNewStageChanges : undefined}
        onValidationError={handleValidationError}
        onValidationStatus={handleValidationStatus}
      />

      {isNew && (
        <ConfirmModal
          isOpen={showLeaveModal}
          onConfirm={handleConfirmLeave}
          onCancel={() => setShowLeaveModal(false)}
          title="Незбережені зміни"
          message="У вас є незбережені дані нового турніру. Якщо ви покинете сторінку, всі зміни будуть втрачені."
          confirmText="Покинути"
          cancelText="Залишитись"
          requirePassword={false}
          variant="danger"
        />
      )}

      {!isNew && (
        <ConfirmModal
          isOpen={showInvalidLeaveModal}
          onConfirm={handleConfirmInvalidLeave}
          onCancel={() => setShowInvalidLeaveModal(false)}
          title="Невалідні дані"
          message="Дані турніру містять помилки (не всі гравці вибрані або сума перемог не дорівнює сумі поразок). Якщо ви покинете сторінку, невалідні зміни не будуть збережені."
          confirmText="Покинути"
          cancelText="Залишитись"
          requirePassword={false}
          variant="danger"
        />
      )}
    </AdminContainer>
  );
};
