import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { getAdminBaselineData } from "./adminHelpers";
import { AdminStageEditor } from "./AdminStageEditor";
import { findStageBySlug, getStageSlug } from "../../helpers/stageSlug";
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
  const originalStageSnapshotRef = useRef(null);

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

  const stageMatch = useMemo(() => {
    if (isNew || !season?.stages) {
      return { stage: null, index: -1 };
    }

    return findStageBySlug(season.stages, stageDate);
  }, [isNew, season, stageDate]);

  const stageIndex = stageMatch.index;

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
    return stageMatch.stage;
  }, [stageMatch, isNew]);

  const getStageFingerprint = useCallback((stageData) => {
    if (!stageData) return "";

    return JSON.stringify({
      date: stageData.date || "",
      players: (stageData.players || []).map((player) => ({
        member_id: [...(player.member_id || [])].sort(),
        win: player.win ?? 0,
        defeat: player.defeat ?? 0,
        position: player.position ?? 0,
      })),
    });
  }, []);

  // Helper to get/set original date mapping in sessionStorage
  const getStorageKey = (slug) => `admin_stage_original_${tournamentId}_${year}_${slug}`;
  const getFingerprintStorageKey = () => `admin_stage_original_fp_${tournamentId}_${year}`;

  const getFingerprintMappings = useCallback(() => {
    try {
      return JSON.parse(sessionStorage.getItem(getFingerprintStorageKey())) || {};
    } catch {
      return {};
    }
  }, [tournamentId, year]);

  const setFingerprintMappings = useCallback((mappings) => {
    sessionStorage.setItem(getFingerprintStorageKey(), JSON.stringify(mappings));
  }, [tournamentId, year]);

  const getFingerprintMapping = useCallback((stageData) => {
    const fingerprint = getStageFingerprint(stageData);
    if (!fingerprint) return null;

    return getFingerprintMappings()[fingerprint] || null;
  }, [getStageFingerprint, getFingerprintMappings]);

  const upsertFingerprintMapping = useCallback((stageData, mapping) => {
    const fingerprint = getStageFingerprint(stageData);
    if (!fingerprint) return;

    const mappings = getFingerprintMappings();
    mappings[fingerprint] = mapping;
    setFingerprintMappings(mappings);
  }, [getStageFingerprint, getFingerprintMappings, setFingerprintMappings]);

  const removeFingerprintMapping = useCallback((stageData) => {
    const fingerprint = getStageFingerprint(stageData);
    if (!fingerprint) return;

    const mappings = getFingerprintMappings();
    if (!mappings[fingerprint]) return;

    delete mappings[fingerprint];
    setFingerprintMappings(mappings);
  }, [getStageFingerprint, getFingerprintMappings, setFingerprintMappings]);
  
  const originalSlug = useMemo(() => {
    if (isNew) return null;

    if (location.state?.originalSlug) {
      return location.state.originalSlug;
    }

    const fingerprintMapping = getFingerprintMapping(stage);
    if (fingerprintMapping?.originalSlug) {
      return fingerprintMapping.originalSlug;
    }

    const savedMapping = sessionStorage.getItem(getStorageKey(stageDate));
    if (!savedMapping) {
      return stageDate;
    }

    try {
      const parsedMapping = JSON.parse(savedMapping);
      if (!parsedMapping?.originalSlug || !parsedMapping?.fingerprint) {
        sessionStorage.removeItem(getStorageKey(stageDate));
        return stageDate;
      }

      if (!stage) {
        return parsedMapping.originalSlug;
      }

      const currentFingerprint = getStageFingerprint(stage);
      if (parsedMapping.fingerprint === currentFingerprint) {
        return parsedMapping.originalSlug;
      }

      sessionStorage.removeItem(getStorageKey(stageDate));
      return stageDate;
    } catch {
      sessionStorage.removeItem(getStorageKey(stageDate));
      return stageDate;
    }
  }, [isNew, location.state, stageDate, stage, getStageFingerprint, getFingerprintMapping]);

  // Get original published stage from baseline for restore functionality
  const originalStage = useMemo(() => {
    if (isNew || !originalSlug) return null;

    if (location.state?.originalStage) {
      return location.state.originalStage;
    }

    const fingerprintMapping = getFingerprintMapping(stage);
    if (fingerprintMapping?.originalStage) {
      return fingerprintMapping.originalStage;
    }

    const savedMapping = sessionStorage.getItem(getStorageKey(stageDate));
    if (savedMapping) {
      try {
        const parsedMapping = JSON.parse(savedMapping);
        if (parsedMapping?.originalStage) {
          return parsedMapping.originalStage;
        }
      } catch {
        sessionStorage.removeItem(getStorageKey(stageDate));
      }
    }

    const baselineTournaments = getAdminBaselineData()?.tournaments;
    const originalTournament = baselineTournaments?.find((t) => t.tournament_id === tournamentId);
    const originalSeason = originalTournament?.seasons?.find((s) => s.year === yearNum);
    if (!originalSeason?.stages) return null;

    const matchedBySlug = findStageBySlug(originalSeason.stages, originalSlug).stage;
    if (matchedBySlug) {
      return matchedBySlug;
    }

    if (!stage) {
      return null;
    }

    const currentFingerprint = getStageFingerprint(stage);
    const matchedByFingerprint = originalSeason.stages.find(
      (baselineStage) => getStageFingerprint(baselineStage) === currentFingerprint
    );

    return matchedByFingerprint || null;
  }, [tournamentId, yearNum, isNew, originalSlug, location.state, stageDate, stage, getStageFingerprint, getFingerprintMapping]);

  useEffect(() => {
    if (!isNew && originalStage) {
      originalStageSnapshotRef.current = JSON.parse(JSON.stringify(originalStage));
    }
  }, [isNew, originalStage]);

  const resolvedOriginalStage = originalStage || originalStageSnapshotRef.current;





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
    let nextStageSlug = stageDate;
    const previousStageSnapshot = stage ? JSON.parse(JSON.stringify(stage)) : null;

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
            updatedStages = s.stages.map((st, index) =>
              index === stageIndex ? updatedStage : st
            );
          }

          updatedStages.sort((a, b) => a.date.localeCompare(b.date));

          if (!isNew) {
            const updatedIndex = updatedStages.findIndex((st) => st === updatedStage);
            nextStageSlug = updatedIndex >= 0 ? getStageSlug(updatedStages, updatedIndex) : stageDate;
          }

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
    } else {
      if (previousStageSnapshot) {
        removeFingerprintMapping(previousStageSnapshot);
      }

      if (originalSlug && resolvedOriginalStage) {
        upsertFingerprintMapping(updatedStage, {
          originalSlug,
          originalStage: resolvedOriginalStage,
        });
      }

      if (nextStageSlug !== stageDate) {
      // Stage slug changed - save mapping so restore keeps pointing to the original published stage.
      // Remove old mapping
        sessionStorage.removeItem(getStorageKey(stageDate));
        if (originalSlug) {
          sessionStorage.setItem(
            getStorageKey(nextStageSlug),
            JSON.stringify({
              originalSlug,
              fingerprint: getStageFingerprint(updatedStage),
              originalStage: resolvedOriginalStage,
            })
          );
        }
        
        // Navigate to new URL to prevent "Stage not found"
        navigate(`/admin/tournaments/${tournamentId}/${year}/${nextStageSlug}`, {
          replace: true,
          state: { originalSlug, originalStage: resolvedOriginalStage }
        });
      }
    }
  };

  const handleDeleteStage = () => {
    sessionStorage.removeItem(getStorageKey(stageDate));
    removeFingerprintMapping(stage);

    const updatedTournaments = tournaments.map((t) => {
      if (t.tournament_id !== tournamentId) return t;
      return {
        ...t,
        seasons: t.seasons.map((s) => {
          if (s.year !== yearNum) return s;
          return {
            ...s,
            stages: s.stages.filter((_, index) => index !== stageIndex),
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
        originalStage={resolvedOriginalStage}
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
