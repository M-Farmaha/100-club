import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import { useStateContext } from "../../state/stateContext";
import { getAdminBaselineData, setPendingAvatar, getPendingAvatar, removePendingAvatar } from "./adminHelpers";
import { useAdminToast } from "./AdminToast";
import { optionsByType } from "../../constants/constants";
import { optionsByForhand, optionsByBackhand, optionsBySex } from "../../constants/constants";
import sprite from "../../sprite.svg";
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
} from "./AdminPanel.styled";

const fieldStyle = {
  width: "100%",
  padding: "10px 10px",
  borderRadius: 8,
  border: "1px solid rgba(0,0,0,0.12)",
  fontSize: 14,
  fontFamily: "var(--main-font)",
  outline: "none",
  boxSizing: "border-box",
  background: "var(--secondary-white-color)",
  color: "var(--primary-black-color)",
  transition: "var(--main-transition)",
};

const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: 8,
    borderColor: state.isFocused ? "var(--accent-hover-color)" : "rgba(0,0,0,0.12)",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(105, 150, 0, 0.1)" : "none",
    fontFamily: "var(--main-font)",
    fontSize: 14,
    minHeight: 40,
    backgroundColor: state.isFocused ? "var(--primary-white-color)" : "var(--secondary-white-color)",
    cursor: "pointer",
    "&:hover": { borderColor: "var(--accent-hover-color)" },
  }),
  singleValue: (base) => ({
    ...base,
    color: "var(--primary-black-color)",
    fontFamily: "var(--main-font)",
    fontSize: 14,
  }),
  option: (base, state) => ({
    ...base,
    fontFamily: "var(--main-font)",
    fontSize: 14,
    cursor: "pointer",
    padding: "8px 10px",
    backgroundColor: "var(--primary-white-color)",
    color: state.isFocused
      ? "var(--accent-hover-color)"
      : state.isSelected
      ? "var(--primary-black-color)"
      : "var(--primary-grey-color)",
  }),
  menu: (base) => ({
    ...base,
    border: "1px solid var(--accent-hover-color)",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px",
    borderRadius: 12,
    overflow: "hidden",
    padding: "4px 0",
    zIndex: 100,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "::-webkit-scrollbar": { display: "none" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "var(--accent-hover-color)" : "var(--primary-grey-color)",
    transition: "var(--main-transition)",
    "&:hover": { color: "var(--accent-hover-color)" },
  }),
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 600,
  color: "var(--secondary-grey-color)",
  marginBottom: 4,
  paddingLeft: 10,
  display: "block",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const fieldGroupStyle = {};

const AVATAR_BASE_URL = "https://raw.githubusercontent.com/M-Farmaha/100-club/refs/heads/main/public/avatars/";

const emptyMember = {
  id: "",
  name: "",
  birthDate: "",
  avatar: "",
  sex: "male",
  hometown: "",
  type: "amateur",
  category: null,
  forhand: "right",
  backhand: "twohand",
  joinTennisYear: new Date().getFullYear(),
};

export const AdminMemberEditor = () => {
  const { memberId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isNew = location.state?.isNew === true;
  const { globalState, setGlobalState } = useStateContext();
  const { members, tournaments } = globalState;

  const existingMember = useMemo(
    () => members?.find((m) => m.id === memberId),
    [members, memberId]
  );

  const [form, setForm] = useState(() => {
    if (isNew) {
      return { ...emptyMember, id: memberId, avatar: `${AVATAR_BASE_URL}${memberId}.jpg` };
    }
    return existingMember ? { ...existingMember } : null;
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [showAvatarDeleteModal, setShowAvatarDeleteModal] = useState(false);
  const [localAvatarPreview, setLocalAvatarPreview] = useState(() => getPendingAvatar(memberId));
  const [avatarRemoved, setAvatarRemoved] = useState(false);
  const [avatarLoadFailed, setAvatarLoadFailed] = useState(false);
  const originalAvatarFailedRef = useRef(null); // null = not yet determined, true/false = initial load result
  const showMsg = useAdminToast();
  const savedRef = useRef(false);

  const handleBack = () => {
    if (isNew && !savedRef.current) {
      const initial = { ...emptyMember, id: memberId, avatar: `${AVATAR_BASE_URL}${memberId}.jpg` };
      const hasNewData = JSON.stringify(form) !== JSON.stringify(initial) || !!localAvatarPreview;
      if (hasNewData) {
        setShowLeaveModal(true);
        return;
      }
      removePendingAvatar(memberId);
    }
    navigate("/admin/members");
  };

  const handleConfirmLeave = () => {
    removePendingAvatar(memberId);
    setShowLeaveModal(false);
    navigate("/admin/members");
  };

  useEffect(() => {
    if (!form && !isNew) {
      navigate("/admin/members");
    }
  }, [form, isNew, navigate]);

  // Auto-sync form changes to globalState for existing members
  useEffect(() => {
    if (isNew || !form || !memberId) return;
    const current = members?.find((m) => m.id === memberId);
    if (current && JSON.stringify(current) !== JSON.stringify(form)) {
      const updatedMembers = members.map((m) =>
        m.id === memberId ? { ...form } : m
      );
      setGlobalState((prev) => ({ ...prev, members: updatedMembers }));
    }
  }, [form, isNew, memberId, members, setGlobalState]);

  if (!form) return null;

  // Baseline for restore
  const baselineData = getAdminBaselineData();
  const originalMember = baselineData?.members?.find(
    (m) => m.id === memberId
  );
  
  // Compare form with original, excluding avatar field (avatar changes tracked separately)
  const formWithoutAvatar = { ...form };
  delete formWithoutAvatar.avatar;
  const originalWithoutAvatar = originalMember ? { ...originalMember } : null;
  if (originalWithoutAvatar) delete originalWithoutAvatar.avatar;
  
  const hasFormChanges = originalWithoutAvatar && 
    JSON.stringify(formWithoutAvatar) !== JSON.stringify(originalWithoutAvatar);
  
  // Avatar is considered changed only if:
  // - there's a new pending avatar, OR
  // - avatar was explicitly removed AND original avatar was actually loadable
  const originalHadAvatar = originalAvatarFailedRef.current === false;
  const hasAvatarChanges = !!localAvatarPreview || (avatarRemoved && originalHadAvatar);
  
  const hasChanges = !isNew && originalMember && (hasFormChanges || hasAvatarChanges);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      showMsg("Прізвище та ім'я обов'язкові", "error");
      return;
    }

    // Only used for new members
    if (members.some((m) => m.id === form.id)) {
      showMsg("Учасник з таким ID вже існує", "error");
      return;
    }
    const updatedMembers = [...members, form];
    updatedMembers.sort((a, b) => a.name.localeCompare(b.name));
    setGlobalState((prev) => ({ ...prev, members: updatedMembers }));
    savedRef.current = true;
    showMsg("Учасника додано", "add");
    setTimeout(() => navigate("/admin/members"), 1000);
  };

  const handleDelete = () => {
    const updatedMembers = members.filter((m) => m.id !== memberId);
    setGlobalState((prev) => ({ ...prev, members: updatedMembers }));
    navigate("/admin/members");
  };

  const handleDeleteClick = () => {
    // Check if member participated in any tournament
    const hasParticipated = tournaments?.some((t) =>
      t.seasons?.some((s) =>
        s.stages?.some((st) =>
          st.players?.some((p) => p.member_id?.includes(memberId))
        )
      )
    );
    if (hasParticipated) {
      showMsg("Неможливо видалити учасника, який брав участь у турнірах", "error");
      return;
    }
    setShowDeleteModal(true);
  };

  const handleRestore = () => {
    if (!originalMember) return;
    setForm({ ...originalMember });
    removePendingAvatar(memberId);
    setLocalAvatarPreview(null);
    setAvatarRemoved(false);
    setAvatarLoadFailed(false);
    // Also update in global state
    const updatedMembers = members.map((m) =>
      m.id === memberId ? { ...originalMember } : m
    );
    setGlobalState((prev) => ({ ...prev, members: updatedMembers }));
    setShowRestoreModal(false);
    showMsg("Дані відновлено", "restore");
  };

  return (
    <AdminContainer>
      <BackLink onClick={handleBack}>
        <svg>
          <use href={`${sprite}#icon-undo`} />
        </svg>
        Назад
      </BackLink>

      <DashboardHeader>
        <DashboardTitle>
          {isNew ? (
            <>
              <svg width="20" height="20" style={{ fill: "currentColor" }}>
                <use href={`${sprite}#icon-plus`} />
              </svg>
              Новий учасник
            </>
          ) : (
            <>
              {form.name || "Учасник"}
            </>
          )}
        </DashboardTitle>
        <ButtonGroup>
          {!isNew && (
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
          )}
          {isNew && (
            <ActionButton
              onClick={handleSave}
            >
              <svg width="12" height="12" style={{ fill: "currentColor" }}>
                <use href={`${sprite}#icon-save`} />
              </svg>
              <ButtonText>Зберегти</ButtonText>
            </ActionButton>
          )}
          {!isNew && (
            <ActionButton
              $variant="danger"
              onClick={handleDeleteClick}
            >
              <svg width="16" height="16" style={{ fill: "currentColor" }}>
                <use href={`${sprite}#icon-trash`} />
              </svg>
              <ButtonText>Видалити</ButtonText>
            </ActionButton>
          )}
        </ButtonGroup>
      </DashboardHeader>

      <EditorSection>
        <EditorSectionTitle>Основна інформація</EditorSectionTitle>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Id</label>
            <input
              style={{ ...fieldStyle, background: "#f0f0f0", color: "#999" }}
              value={form.id}
              disabled
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Прізвище та ім'я *</label>
            <input
              style={fieldStyle}
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Введіть прізвище та ім'я"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-color)";
                e.target.style.boxShadow = "0 0 0 3px rgba(105, 150, 0, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.12)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Дата народження</label>
            <input
              style={fieldStyle}
              type="date"
              value={form.birthDate}
              onChange={(e) => updateField("birthDate", e.target.value)}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-color)";
                e.target.style.boxShadow = "0 0 0 3px rgba(105, 150, 0, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.12)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Стать</label>
            <Select
              styles={selectStyles}
              isSearchable={false}
              value={{ value: form.sex, label: form.sex === "male" ? "Чоловік" : "Жінка" }}
              onChange={(opt) => updateField("sex", opt.value)}
              options={[
                { value: "male", label: "Чоловік" },
                { value: "female", label: "Жінка" },
              ]}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Родом з</label>
            <input
              style={fieldStyle}
              value={form.hometown}
              onChange={(e) => updateField("hometown", e.target.value)}
              placeholder="Введіть населений пункт"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-color)";
                e.target.style.boxShadow = "0 0 0 3px rgba(105, 150, 0, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.12)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Категорія</label>
            <Select
              styles={selectStyles}
              isSearchable={false}
              value={{ value: form.type, label: optionsByType[form.type]?.title }}
              onChange={(opt) => updateField("type", opt.value)}
              options={Object.entries(optionsByType).map(([key, opt]) => ({
                value: key,
                label: opt.title,
              }))}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Спортивний розряд</label>
            <input
              style={fieldStyle}
              value={form.category || ""}
              onChange={(e) =>
                updateField("category", e.target.value || null)
              }
              placeholder="Введіть спортивний розряд"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-color)";
                e.target.style.boxShadow = "0 0 0 3px rgba(105, 150, 0, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.12)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle} title="Рік початку занять тенісом">Рік початку тенісу</label>
            <input
              style={fieldStyle}
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={form.joinTennisYear || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                updateField("joinTennisYear", val ? parseInt(val) : null);
              }}
              placeholder="Введіть рік"
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-color)";
                e.target.style.boxShadow = "0 0 0 3px rgba(105, 150, 0, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(0,0,0,0.12)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Форхенд</label>
            <Select
              styles={selectStyles}
              isSearchable={false}
              value={{ value: form.forhand, label: optionsByForhand[form.forhand]?.title }}
              onChange={(opt) => updateField("forhand", opt.value)}
              options={[
                { value: "null", label: optionsByForhand["null"].title },
                ...Object.entries(optionsByForhand)
                  .filter(([k]) => k !== "null")
                  .map(([key, opt]) => ({
                    value: key,
                    label: opt.title,
                  }))
              ]}
            />
          </div>

          <div style={fieldGroupStyle}>
            <label style={labelStyle}>Бекхенд</label>
            <Select
              styles={selectStyles}
              isSearchable={false}
              value={{ value: form.backhand, label: optionsByBackhand[form.backhand]?.title }}
              onChange={(opt) => updateField("backhand", opt.value)}
              options={[
                { value: "null", label: optionsByBackhand["null"].title },
                ...Object.entries(optionsByBackhand)
                  .filter(([k]) => k !== "null")
                  .map(([key, opt]) => ({
                    value: key,
                    label: opt.title,
                  }))
              ]}
            />
          </div>

          <div style={{ ...fieldGroupStyle, gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Url аватара</label>
            <input
              style={{ ...fieldStyle, background: "#f0f0f0", color: "#999" }}
              value={form.avatar}
              disabled
            />
          </div>
        </div>

        {(() => {
          const avatarSrc = localAvatarPreview
            ? `data:image/jpeg;base64,${localAvatarPreview}`
            : (!avatarRemoved && !avatarLoadFailed && form.avatar) || null;

          const handleUpload = () => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/jpeg,image/png,image/webp";
            input.onchange = (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const base64 = reader.result.split(",")[1];
                setPendingAvatar(form.id, base64);
                setLocalAvatarPreview(base64);
                setAvatarRemoved(false);
                setAvatarLoadFailed(false);
                showMsg("Аватар додано", "add");
              };
              reader.readAsDataURL(file);
            };
            input.click();
          };

          const handleAvatarDelete = () => {
            setShowAvatarDeleteModal(true);
          };

          const avatarBtnStyle = {
            width: 36,
            height: 36,
            borderRadius: 8,
            border: "none",
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "var(--main-transition)",
            padding: 0,
            backdropFilter: "blur(4px)",
          };

          return (
            <div
              style={{
                width: "100%",
                minHeight: 240,
                background: "linear-gradient(to top right, var(--primary-black-color), var(--primary-white-color))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                marginTop: 16,
                overflow: "hidden",
                borderRadius: 10,
              }}
            >
              {avatarSrc ? (
                <>
                  <img
                    src={avatarSrc}
                    alt="Avatar"
                    style={{
                      width: "100%",
                      height: 240,
                      objectFit: "contain",
                    }}
                    onError={() => {
                      setAvatarLoadFailed(true);
                      // Record original avatar state only on first load (not for uploaded previews)
                      if (originalAvatarFailedRef.current === null && !localAvatarPreview) {
                        originalAvatarFailedRef.current = true;
                      }
                    }}
                    onLoad={() => {
                      // Record that original avatar loaded successfully
                      if (originalAvatarFailedRef.current === null && !localAvatarPreview) {
                        originalAvatarFailedRef.current = false;
                      }
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <button
                      type="button"
                      onClick={handleUpload}
                      style={avatarBtnStyle}
                      title="Змінити аватар"
                    >
                      <svg width="16" height="16" style={{ fill: "#fff" }}>
                        <use href={`${sprite}#icon-restore`} />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleAvatarDelete}
                      style={avatarBtnStyle}
                      title="Видалити аватар"
                    >
                      <svg width="16" height="16" style={{ fill: "#fff" }}>
                        <use href={`${sprite}#icon-trash`} />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleUpload}
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    border: "2px dashed rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "var(--main-transition)",
                    padding: 0,
                  }}
                  title="Додати аватар"
                >
                  <svg width="24" height="24" style={{ fill: "rgba(255,255,255,0.6)" }}>
                    <use href={`${sprite}#icon-plus`} />
                  </svg>
                </button>
              )}
            </div>
          );
        })()}
      </EditorSection>

      <ConfirmModal
        isOpen={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        title="Видалити учасника?"
        message={`Ви впевнені, що хочете видалити ${form.name}?`}
        confirmText="Видалити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />

      <ConfirmModal
        isOpen={showRestoreModal}
        onConfirm={handleRestore}
        onCancel={() => setShowRestoreModal(false)}
        title="Відновити дані?"
        message={`Повернути дані ${form.name} до останнього опублікованого стану?`}
        confirmText="Відновити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />

      <ConfirmModal
        isOpen={showLeaveModal}
        onConfirm={handleConfirmLeave}
        onCancel={() => setShowLeaveModal(false)}
        title="Незбережені зміни"
        message="У вас є незбережені дані нового учасника. Якщо ви покинете сторінку, всі зміни будуть втрачені."
        confirmText="Покинути"
        cancelText="Залишитись"
        requirePassword={false}
        variant="danger"
      />

      <ConfirmModal
        isOpen={showAvatarDeleteModal}
        onConfirm={() => {
          removePendingAvatar(form.id);
          setLocalAvatarPreview(null);
          setAvatarRemoved(true);
          setAvatarLoadFailed(true);
          updateField("avatar", "");
          setShowAvatarDeleteModal(false);
          showMsg("Аватар видалено", "delete");
        }}
        onCancel={() => setShowAvatarDeleteModal(false)}
        title="Видалити аватар?"
        message="Ви впевнені, що хочете видалити аватар?"
        confirmText="Видалити"
        cancelText="Скасувати"
        requirePassword={false}
        variant="danger"
      />
    </AdminContainer>
  );
};
