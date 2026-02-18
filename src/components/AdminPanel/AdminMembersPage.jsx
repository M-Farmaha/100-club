import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../state/stateContext";
import { membersApi } from "../../Api/ApiRequest";
import {
  exportToJsonFile,
  importJsonFile,
  getAdminBaselineData,
  getNextMemberId,
  getPendingAvatar,
  hasPendingAvatars,
  clearPendingAvatars,
} from "./adminHelpers";
import { filterOptionsByType } from "../../constants/constants";
import { optionsBySex } from "../../constants/constants";
import sprite from "../../sprite.svg";
import MaleDefaultImg from "../MembersList/img/male-dafault.svg";
import FemaleDefaultImg from "../MembersList/img/female-dafault.svg";
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

export const AdminMembersPage = () => {
  const navigate = useNavigate();
  const { globalState, setGlobalState } = useStateContext();
  const { members } = globalState;
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const showMessage = useAdminToast();
  const [search, setSearch] = useState("");



  const handleExport = () => {
    exportToJsonFile(members, "members.json");
    showMessage("Файл members.json завантажено");
  };

  const handleImport = async () => {
    try {
      const data = await importJsonFile();
      if (Array.isArray(data)) {
        setGlobalState((prev) => ({ ...prev, members: data }));
        showMessage("Дані учасників успішно імпортовано");
      } else {
        showMessage(
          "Невірний формат файлу — очікується масив учасників",
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
      baselineData?.members || JSON.parse(JSON.stringify(membersApi()));
    setGlobalState((prev) => ({ ...prev, members: freshData }));
    clearPendingAvatars();
    setShowRestoreModal(false);
    showMessage("Дані учасників відновлено", "restore");
  };

  const handleAddMember = () => {
    const newId = getNextMemberId(members);
    navigate(`/admin/members/${newId}`, { state: { isNew: true } });
  };

  const sortedMembers = useMemo(() => {
    const sorted = [...(members || [])].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    if (!search.trim()) return sorted;
    const q = search.toLowerCase();
    return sorted.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.id === q
    );
  }, [members, search]);

  // Check if members changed from baseline
  const baselineData = getAdminBaselineData();
  const hasChanges = baselineData
    ? JSON.stringify(members) !== JSON.stringify(baselineData.members) || hasPendingAvatars()
    : hasPendingAvatars();

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
            <use href={`${sprite}#icon-users`} />
          </svg>
          Учасники
        </DashboardTitle>
        <ButtonGroup>
          <ActionButton
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
          <ActionButton onClick={handleAddMember}>
            <svg width="16" height="16" style={{ fill: "currentColor" }}>
              <use href={`${sprite}#icon-plus`} />
            </svg>
            <ButtonText>Додати</ButtonText>
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

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Пошук за ім'ям або ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.12)",
            fontSize: 14,
            fontFamily: "var(--main-font)",
            outline: "none",
            boxSizing: "border-box",
            background: "var(--secondary-white-color)",
            color: "var(--primary-black-color)",
            transition: "var(--main-transition)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--accent-color)";
            e.target.style.boxShadow = "0 0 0 3px rgba(105, 150, 0, 0.1)";
            e.target.style.backgroundColor = "var(--primary-white-color)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(0,0,0,0.12)";
            e.target.style.boxShadow = "none";
            e.target.style.backgroundColor = "var(--secondary-white-color)";
          }}
        />
      </div>

      <div>
        {sortedMembers.map((member) => {
          const pendingAvatar = getPendingAvatar(member.id);
          const avatarSrc = pendingAvatar
            ? `data:image/jpeg;base64,${pendingAvatar}`
            : (member.avatar || null);
          return (
            <TournamentCard
              key={member.id}
              onClick={() => navigate(`/admin/members/${member.id}`)}
            >
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={member.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                    flexShrink: 0,
                    background: "linear-gradient(to bottom right, #ccc, #eee)",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "linear-gradient(to bottom right, #ccc, #eee)",
                  display: avatarSrc ? "none" : "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" style={{ fill: "#fff" }}>
                  <use href={`${sprite}#icon-user`} />
                </svg>
              </div>
              <TournamentCardInfo>
                <TournamentCardName>{member.name}</TournamentCardName>
                <TournamentCardMeta>
                  {filterOptionsByType[member.type]?.title || member.type} • ID: {member.id}
                </TournamentCardMeta>
              </TournamentCardInfo>
              <svg width="16" height="16" style={{ fill: "var(--primary-black-color)", flexShrink: 0 }}>
                <use href={`${sprite}#icon-arrow-right`} />
              </svg>
            </TournamentCard>
          );
        })}
        {sortedMembers.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--secondary-grey-color)",
              padding: 40,
            }}
          >
            {search ? "Нічого не знайдено" : "Учасників ще немає"}
          </p>
        )}
      </div>

      <ConfirmModal
        isOpen={showRestoreModal}
        onConfirm={handleRestoreAll}
        onCancel={() => setShowRestoreModal(false)}
        title="Відновити учасників?"
        message="Ця дія поверне всіх учасників до останнього опублікованого стану. Всі поточні зміни учасників будуть втрачені."
        confirmText="Відновити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />
    </AdminContainer>
  );
};
