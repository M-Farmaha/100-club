import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../../components/AdminPanel/ConfirmModal";
import { useStateContext } from "../../state/stateContext";
import { tournamentsApi, membersApi } from "../../Api/ApiRequest";
import {
  exportToJsonFile,
  importJsonFile,
  pushToGitHub,
  pushImageToGitHub,
  getGitHubToken,
  setGitHubToken,
  removeGitHubToken,
  hasAdminUnsavedChanges,
  setAdminBaseline,
  getAdminBaselineData,
  getPendingAvatars,
  clearPendingAvatars,
} from "../../components/AdminPanel/adminHelpers";
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
  EditorSection,
  EditorSectionTitle,
  Divider,
} from "../../components/AdminPanel/AdminPanel.styled";
import { useAdminToast } from "../../components/AdminPanel/AdminToast";

const AdminPage = () => {
  const [publishing, setPublishing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [tokenInput, setTokenInput] = useState(() => getGitHubToken());
  const { globalState, setGlobalState } = useStateContext();
  const { tournaments, members } = globalState;
  const navigate = useNavigate();

  const showMessage = useAdminToast();

  const handlePublish = async () => {
    const token = getGitHubToken();
    if (!token) {
      setShowSettings(true);
      showMessage("Спочатку вкажіть GitHub токен у налаштуваннях", "error");
      return;
    }

    setPublishing(true);
    try {
      const now = new Date().toLocaleString("uk-UA");

      // Publish sequentially to avoid SHA conflicts
      // Order: members → avatars → tournaments (tournaments may reference new members)
      await pushToGitHub(
        token,
        members,
        "src/Api/members.json",
        `Update members.json — ${now}`
      );

      // Publish avatars sequentially
      const pendingAvatars = getPendingAvatars();
      for (const [id, base64] of Object.entries(pendingAvatars)) {
        await pushImageToGitHub(
          token,
          base64,
          `public/avatars/${id}.jpg`,
          `Update avatar for ${id} — ${now}`
        );
      }

      await pushToGitHub(
        token,
        tournaments,
        "src/Api/tournaments.json",
        `Update tournaments.json — ${now}`
      );

      clearPendingAvatars();
      showMessage("Опубліковано на GitHub! Сайт оновиться через ~1-2 хвилини");
      setAdminBaseline(tournaments, members);
    } catch (err) {
      showMessage(`Помилка публікації: ${err.message}`, "error");
    } finally {
      setPublishing(false);
    }
  };

  const handleSaveToken = () => {
    if (tokenInput.trim()) {
      setGitHubToken(tokenInput.trim());
      showMessage("GitHub токен збережено");
    } else {
      removeGitHubToken();
      showMessage("GitHub токен видалено", "delete");
    }
  };

  const handleRestoreAll = () => {
    const baselineData = getAdminBaselineData();
    const freshTournaments = baselineData?.tournaments || JSON.parse(JSON.stringify(tournamentsApi()));
    const freshMembers = baselineData?.members || JSON.parse(JSON.stringify(membersApi()));
    setGlobalState((prev) => ({
      ...prev,
      tournaments: freshTournaments,
      members: freshMembers,
    }));
    clearPendingAvatars();
    setShowRestoreModal(false);
    showMessage("Всі дані відновлено", "restore");
  };

  const hasToken = !!getGitHubToken();
  const hasChanges = hasAdminUnsavedChanges(tournaments, members);

  const totalStages = tournaments?.reduce(
    (acc, t) =>
      acc +
      (t.seasons?.reduce((sAcc, s) => sAcc + (s.stages?.length || 0), 0) || 0),
    0
  ) || 0;

  return (
    <AdminContainer>
      <DashboardHeader>
        <DashboardTitle>
            <svg width="22" height="22" style={{ fill: "var(--primary-black-color)" }}>
              <use href={`${sprite}#icon-gear`} />
            </svg>
            Адмін панель
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
          <ActionButton
            onClick={() => setShowPublishModal(true)}
            disabled={publishing || !hasChanges}
            $variant={hasToken && hasChanges && !publishing ? "danger" : undefined}
            style={{
              opacity: hasChanges ? 1 : 0.5,
              cursor: hasChanges && !publishing ? "pointer" : "not-allowed",
            }}
          >
            <svg width="14" height="14" style={{ fill: "currentColor" }}>
              <use href={`${sprite}#icon-arrow-bold`} />
            </svg>
            <ButtonText>
              {publishing ? "Публікація..." : "Опублікувати"}
            </ButtonText>
          </ActionButton>
          <ActionButton
            onClick={() => setShowSettings(!showSettings)}
            $variant="secondary"
          >
            <svg width="16" height="16" style={{ fill: "currentColor" }}>
              <use href={`${sprite}#icon-gear`} />
            </svg>
          </ActionButton>
        </ButtonGroup>
      </DashboardHeader>

      {showSettings && (
        <EditorSection>
          <EditorSectionTitle>🔑 Налаштування GitHub</EditorSectionTitle>
          <p
            style={{
              fontSize: 13,
              color: "var(--secondary-grey-color)",
              marginBottom: 12,
              lineHeight: 1.5,
            }}
          >
            Для автоматичної публікації потрібен{" "}
            <a
              href="https://github.com/settings/tokens/new?scopes=public_repo&description=100-club-admin"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent-color)" }}
            >
              GitHub Personal Access Token
            </a>{" "}
            з правом <strong>public_repo</strong>. Токен зберігається лише в
            localStorage вашого браузера і не передається на жодні сервери.
            <br />
            <span style={{ color: "var(--lose-color)" }}>
              ⚠️ Нікому не показуйте та не передавайте свій токен — він надає
              повний доступ до репозиторію.
            </span>
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: 14,
                fontFamily: "var(--main-font)",
                outline: "none",
              }}
            />
            <ActionButton onClick={handleSaveToken}>
              <svg width="12" height="12" style={{ fill: "currentColor" }}>
                <use href={`${sprite}#icon-save`} />
              </svg>
              <ButtonText>Зберегти</ButtonText>
            </ActionButton>
          </div>
          {hasToken && (
            <p
              style={{
                fontSize: 12,
                color: "var(--accent-color)",
                marginTop: 8,
              }}
            >
              ✓ Токен налаштовано
            </p>
          )}
          <Divider />
        </EditorSection>
      )}

      {/* Navigation cards */}
      <div>
        <TournamentCard onClick={() => navigate("/admin/tournaments")}>
          <svg width="28" height="28" style={{ fill: "var(--primary-black-color)", flexShrink: 0 }}>
            <use href={`${sprite}#icon-cup`} />
          </svg>
          <TournamentCardInfo>
            <TournamentCardName>Турніри</TournamentCardName>
            <TournamentCardMeta>
              Сезонів: {tournaments?.length || 0} • Турнірів: {totalStages}
            </TournamentCardMeta>
          </TournamentCardInfo>
          <svg width="16" height="16" style={{ fill: "var(--primary-black-color)", flexShrink: 0 }}>
            <use href={`${sprite}#icon-arrow-right`} />
          </svg>
        </TournamentCard>

        <TournamentCard onClick={() => navigate("/admin/members")}>
          <svg width="28" height="28" style={{ fill: "var(--primary-black-color)", flexShrink: 0 }}>
            <use href={`${sprite}#icon-users`} />
          </svg>
          <TournamentCardInfo>
            <TournamentCardName>Учасники</TournamentCardName>
            <TournamentCardMeta>
              Учасників: {members?.length || 0}
            </TournamentCardMeta>
          </TournamentCardInfo>
          <svg width="16" height="16" style={{ fill: "var(--primary-black-color)", flexShrink: 0 }}>
            <use href={`${sprite}#icon-arrow-right`} />
          </svg>
        </TournamentCard>
      </div>

      <ConfirmModal
        isOpen={showRestoreModal}
        onConfirm={handleRestoreAll}
        onCancel={() => setShowRestoreModal(false)}
        title="Відновити все?"
        message="Ця дія поверне всі дані до останнього опублікованого стану. Всі поточні зміни будуть втрачені."
        confirmText="Відновити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />

      <ConfirmModal
        isOpen={showPublishModal}
        onConfirm={() => {
          setShowPublishModal(false);
          handlePublish();
        }}
        onCancel={() => setShowPublishModal(false)}
        title="Опублікувати зміни?"
        message="Ця дія завантажить всі зміни на GitHub і оновить публічний сайт. Після публікації зміни будуть доступні всім відвідувачам сайту через 1-2 хвилини. Цю дію неможливо скасувати!"
        confirmText="Опублікувати"
        cancelText="Скасувати"
        requirePassword={true}
        variant="danger"
      />
    </AdminContainer>
  );
};

export default AdminPage;
