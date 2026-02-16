import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Select from "react-select";
import { ConfirmModal } from "./ConfirmModal";
import { getUkrLocaleDate } from "../../helpers/getUkrLocaleDate";
import {
  EditorSection,
  EditorSectionTitle,
  ActionButton,
  ButtonText,
  IconButton,
  ButtonGroup,
  PlayerRow,
  PlayerField,
  PlayerNumberFields,
  NumberInput,
  DateInput,
  Divider,
} from "./AdminPanel.styled";
import sprite from "../../sprite.svg";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minWidth: 220,
    borderRadius: 8,
    borderColor: state.isFocused ? "var(--accent-color)" : "rgba(0,0,0,0.12)",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(105, 150, 0, 0.1)" : "none",
    fontFamily: "var(--main-font)",
    fontSize: 14,
    "&:hover": { borderColor: "var(--accent-color)" },
  }),
  valueContainer: (base, state) => ({
    ...base,
    flexWrap: "wrap",
    gap: 4,
    padding: "4px 8px",
    // Hide the input row when 2 values selected
    ...(state.hasValue && state.selectProps.isMulti && state.selectProps.value?.length >= 2 
      ? { 
          "& > input": { display: "none" },
          "& > div:last-child:not([class*='multiValue'])": { display: "none" },
        } 
      : {}),
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgba(105, 150, 0, 0.12)",
    borderRadius: 6,
    margin: 0,
    maxWidth: "100%",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "var(--primary-black-color)",
    fontFamily: "var(--main-font)",
    fontSize: 13,
    fontWeight: 500,
    padding: "4px 6px",
    paddingRight: 4,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "var(--secondary-grey-color)",
    cursor: "pointer",
    borderRadius: "0 6px 6px 0",
    paddingLeft: 2,
    paddingRight: 4,
    flexShrink: 0,
    "&:hover": {
      backgroundColor: "rgba(255, 68, 0, 0.15)",
      color: "#ff4400",
    },
  }),
  input: (base, state) => ({
    ...base,
    margin: 0,
    padding: 0,
    // Hide input when 2 values selected in multi-select
    ...(state.hasValue && state.selectProps.isMulti && state.selectProps.value?.length >= 2 
      ? { position: "absolute", opacity: 0, width: 0, height: 0 } 
      : {}),
  }),
  option: (base, state) => ({
    ...base,
    fontFamily: "var(--main-font)",
    fontSize: 14,
    backgroundColor: state.isSelected
      ? "var(--accent-color)"
      : state.isFocused
      ? "rgba(105, 150, 0, 0.08)"
      : "transparent",
    color: state.isSelected ? "#fff" : "var(--primary-black-color)",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 8,
    overflow: "hidden",
    zIndex: 100,
  }),
};

export const AdminStageEditor = ({ stage, members, tournamentId, onSave, onCancel, onDelete, isNew, originalStage }) => {
  // Check if this is a team tournament (multiple players allowed)
  const isTeamTournament = tournamentId === "mad-mix";
  const maxTeamSize = 2; // Maximum players per team for mad-mix

  // Store initial values in refs to preserve them across re-renders
  const initialDataRef = useRef(null);
  if (initialDataRef.current === null) {
    initialDataRef.current = {
      date: stage.date || "",
      players: stage.players?.map((p) => ({
        member_id: p.member_id || [],
        win: p.win ?? 0,
        defeat: p.defeat ?? 0,
        position: p.position ?? 1,
      })) || [],
    };
  }

  const [date, setDate] = useState(initialDataRef.current.date);
  const [players, setPlayers] = useState(initialDataRef.current.players);
  const selectRefs = useRef({});
  const [deletePlayerIndex, setDeletePlayerIndex] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showDeleteStageModal, setShowDeleteStageModal] = useState(false);
  const isFirstRender = useRef(true);

  // Check if current data differs from original published data
  const hasChangesFromPublished = useMemo(() => {
    if (!originalStage) return false;
    
    // Compare dates
    if (date !== originalStage.date) return true;
    
    // Compare players
    const originalPlayers = originalStage.players || [];
    if (players.length !== originalPlayers.length) return true;
    
    for (let i = 0; i < players.length; i++) {
      const current = players[i];
      const original = originalPlayers[i];
      if (!original) return true;
      
      // Compare member_id arrays
      const currentIds = [...(current.member_id || [])].sort();
      const originalIds = [...(original.member_id || [])].sort();
      if (currentIds.length !== originalIds.length) return true;
      if (currentIds.some((id, idx) => id !== originalIds[idx])) return true;
      
      // Compare scores
      if (current.win !== (original.win ?? 0)) return true;
      if (current.defeat !== (original.defeat ?? 0)) return true;
      if (current.position !== (original.position ?? 1)) return true;
    }
    
    return false;
  }, [date, players, originalStage]);

  const memberOptions = useMemo(() => {
    return members
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((m) => ({
        value: m.id,
        label: `${m.name} (ID: ${m.id})`,
      }));
  }, [members]);

  // Auto-save when date or players change (only for existing stages)
  const autoSave = useCallback(() => {
    if (isNew || !date) return;
    
    const validPlayers = players.filter((p) => p.member_id.length > 0);
    if (validPlayers.length === 0) return;

    onSave({
      date,
      players: validPlayers.map((p) => ({
        member_id: p.member_id,
        win: parseInt(p.win, 10) || 0,
        defeat: parseInt(p.defeat, 10) || 0,
        position: parseInt(p.position, 10) || 1,
      })),
    });
  }, [date, players, isNew, onSave]);

  useEffect(() => {
    // Skip first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    // Debounce auto-save
    const timeout = setTimeout(autoSave, 500);
    return () => clearTimeout(timeout);
  }, [date, players, autoSave]);

  const handleRestore = () => {
    if (!originalStage) return;
    setDate(originalStage.date || "");
    setPlayers(
      originalStage.players?.map((p) => ({
        member_id: p.member_id || [],
        win: p.win ?? 0,
        defeat: p.defeat ?? 0,
        position: p.position ?? 1,
      })) || []
    );
    setShowRestoreModal(false);
  };

  const addPlayer = () => {
    const newIndex = players.length;
    setPlayers([
      ...players,
      { member_id: [], win: 0, defeat: 0, position: players.length + 1 },
    ]);
    // Focus on new player's Select after render
    requestAnimationFrame(() => {
      selectRefs.current[newIndex]?.focus();
    });
  };

  const removePlayer = (index) => {
    setDeletePlayerIndex(index);
  };

  const confirmRemovePlayer = () => {
    if (deletePlayerIndex !== null) {
      setPlayers(players.filter((_, i) => i !== deletePlayerIndex));
      setDeletePlayerIndex(null);
    }
  };

  const getPlayerName = (index) => {
    const player = players[index];
    if (!player || player.member_id.length === 0) {
      return isTeamTournament ? `Пара #${index + 1}` : `Гравець #${index + 1}`;
    }
    const names = player.member_id.map((id) => {
      const member = members.find((m) => m.id === id);
      return member?.name || `ID: ${id}`;
    });
    return names.join(", ");
  };

  const updatePlayer = (index, field, value) => {
    setPlayers(
      players.map((p, i) => {
        if (i !== index) return p;
        return { ...p, [field]: value };
      })
    );
  };

  const handleMemberSelect = (index, selectedOptions) => {
    if (isTeamTournament) {
      // For mad-mix: allow multiple but limit to maxTeamSize
      const ids = selectedOptions
        ? selectedOptions.slice(0, maxTeamSize).map((opt) => opt.value)
        : [];
      updatePlayer(index, "member_id", ids);
      
      // Blur select when max team size reached
      if (ids.length >= maxTeamSize) {
        selectRefs.current[index]?.blur();
      }
    } else {
      // For other tournaments: single selection (replace previous)
      const ids = selectedOptions ? [selectedOptions.value] : [];
      updatePlayer(index, "member_id", ids);
    }
  };

  const handleSave = () => {
    if (!date) {
      alert("Вкажіть дату етапу");
      return;
    }

    const validPlayers = players.filter((p) => p.member_id.length > 0);

    onSave({
      date,
      players: validPlayers.map((p) => ({
        member_id: p.member_id,
        win: parseInt(p.win, 10) || 0,
        defeat: parseInt(p.defeat, 10) || 0,
        position: parseInt(p.position, 10) || 1,
      })),
    });
  };

  return (
    <EditorSection>
      <EditorSectionTitle>
        {isNew ? "Створити новий етап" : `✏️ Редагування: ${stage.date}`}
      </EditorSectionTitle>

      <PlayerField style={{ marginBottom: 16 }}>
        <label>Дата етапу</label>
        <DateInput
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </PlayerField>

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <EditorSectionTitle style={{ margin: 0, fontSize: 15 }}>
          {isTeamTournament ? "Пари" : "Гравці"} ({players.length})
        </EditorSectionTitle>
        <ButtonGroup>
          {!isNew && originalStage && (
            <ActionButton 
              $variant="secondary" 
              onClick={() => setShowRestoreModal(true)}
              disabled={!hasChangesFromPublished}
              style={{ 
                opacity: hasChangesFromPublished ? 1 : 0.5, 
                cursor: hasChangesFromPublished ? 'pointer' : 'not-allowed',
              }}
            >
              <svg width="16" height="16" style={{ fill: 'currentColor' }}>
                <use href={`${sprite}#icon-restore`} />
              </svg>
              <ButtonText>Відновити</ButtonText>
            </ActionButton>
          )}
          <ActionButton onClick={addPlayer}>
            <svg width="16" height="16" style={{ fill: 'currentColor' }}>
              <use href={`${sprite}#icon-plus`} />
            </svg>
            <ButtonText>{isTeamTournament ? "Додати пару" : "Додати гравця"}</ButtonText>
          </ActionButton>
          {onDelete && (
            <ActionButton $variant="danger" onClick={() => setShowDeleteStageModal(true)}>
              <svg width="16" height="16" style={{ fill: 'currentColor' }}>
                <use href={`${sprite}#icon-trash`} />
              </svg>
              <ButtonText>Видалити етап</ButtonText>
            </ActionButton>
          )}
        </ButtonGroup>
      </div>

      {players.map((player, index) => (
        <PlayerRow key={index}>
          <PlayerField style={{ flex: 1, minWidth: 200 }}>
            <label>{isTeamTournament ? "Гравці" : "Гравець"}</label>
            <Select
              ref={(el) => (selectRefs.current[index] = el)}
              isMulti={isTeamTournament}
              options={memberOptions}
              value={
                isTeamTournament
                  ? memberOptions.filter((opt) =>
                      player.member_id.includes(opt.value)
                    )
                  : memberOptions.find((opt) => opt.value === player.member_id[0]) || null
              }
              onChange={(selected) => handleMemberSelect(index, selected)}
              placeholder={isTeamTournament ? "Вибрати гравців..." : "Вибрати гравця..."}
              styles={selectStyles}
              noOptionsMessage={() => "Не знайдено"}
              hideSelectedOptions={isTeamTournament}
              isSearchable={!isTeamTournament || player.member_id.length < maxTeamSize}
              menuIsOpen={isTeamTournament && player.member_id.length >= maxTeamSize ? false : undefined}
            />
          </PlayerField>

          <PlayerNumberFields>
            <PlayerField>
              <label>Перемоги</label>
              <NumberInput
                type="number"
                min="0"
                value={player.win}
                onChange={(e) => updatePlayer(index, "win", e.target.value)}
              />
            </PlayerField>

            <PlayerField>
              <label>Поразки</label>
              <NumberInput
                type="number"
                min="0"
                value={player.defeat}
                onChange={(e) => updatePlayer(index, "defeat", e.target.value)}
              />
            </PlayerField>

            <PlayerField>
              <label>Позиція</label>
              <NumberInput
                type="number"
                min="1"
                value={player.position}
                onChange={(e) => updatePlayer(index, "position", e.target.value)}
              />
            </PlayerField>

            <IconButton
              $variant="danger"
              onClick={() => removePlayer(index)}
              title={isTeamTournament ? "Видалити пару" : "Видалити гравця"}
            >
              <svg width="16" height="16" style={{ fill: 'currentColor' }}>
                <use href={`${sprite}#icon-trash`} />
              </svg>
            </IconButton>
          </PlayerNumberFields>
        </PlayerRow>
      ))}

      {players.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "var(--secondary-grey-color)",
            padding: "20px 0",
          }}
        >
          Натисніть "{isTeamTournament ? "Додати пару" : "Додати гравця"}" щоб почати
        </p>
      )}

      {isNew && (
        <>
          <Divider />
          <ButtonGroup style={{ justifyContent: "flex-end" }}>
            <ActionButton $variant="secondary" onClick={onCancel}>
              Скасувати
            </ActionButton>
            <ActionButton
              onClick={handleSave}
              disabled={players.length === 0 || players.every((p) => p.member_id.length === 0)}
              style={{
                opacity: players.length === 0 || players.every((p) => p.member_id.length === 0) ? 0.5 : 1,
                cursor: players.length === 0 || players.every((p) => p.member_id.length === 0) ? 'not-allowed' : 'pointer',
              }}
            >
              <svg width="16" height="16" style={{ fill: 'currentColor' }}>
                <use href={`${sprite}#icon-plus`} />
              </svg>
              <ButtonText>Створити етап</ButtonText>
            </ActionButton>
          </ButtonGroup>
        </>
      )}

      <ConfirmModal
        isOpen={deletePlayerIndex !== null}
        onConfirm={confirmRemovePlayer}
        onCancel={() => setDeletePlayerIndex(null)}
        title={isTeamTournament ? "Видалити пару?" : "Видалити гравця?"}
        message={`Ви збираєтесь видалити ${isTeamTournament ? "пару" : "гравця"}: ${deletePlayerIndex !== null ? getPlayerName(deletePlayerIndex) : ""}.`}
        confirmText="Видалити"
        cancelText="Скасувати"
        requirePassword={false}
      />

      <ConfirmModal
        isOpen={showRestoreModal}
        onConfirm={handleRestore}
        onCancel={() => setShowRestoreModal(false)}
        title="Відновити етап?"
        message="Ця дія поверне етап до останнього опублікованого стану. Всі поточні зміни будуть втрачені."
        confirmText="Відновити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />

      {onDelete && (
        <ConfirmModal
          isOpen={showDeleteStageModal}
          onConfirm={() => {
            setShowDeleteStageModal(false);
            onDelete();
          }}
          onCancel={() => setShowDeleteStageModal(false)}
          title="Видалити етап?"
          message={`Ви збираєтесь видалити етап${getUkrLocaleDate(stage.date)} з усіма учасниками.`}
          confirmText="Видалити"
          cancelText="Скасувати"
          requirePassword={false}
        />
      )}
    </EditorSection>
  );
};
