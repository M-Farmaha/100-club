export const ADMIN_PASSWORD_HASH =
  "6edd750c8429279409d64d68c16284b5f71ab0c372aebdcb3c17a85e231484e5";

export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

export const exportToJsonFile = (data, filename) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importJsonFile = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (!file) {
        reject(new Error("Файл не вибрано"));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          resolve(data);
        } catch (err) {
          reject(new Error("Невірний формат JSON файлу"));
        }
      };
      reader.onerror = () => reject(new Error("Помилка читання файлу"));
      reader.readAsText(file);
    };
    input.click();
  });
};

export const getNextMemberId = (members) => {
  const maxId = members.reduce(
    (max, m) => Math.max(max, parseInt(m.id, 10)),
    0
  );
  return String(maxId + 1);
};

// --- Normalize tournaments data for deep comparison ---

export const normalizeForComparison = (data) => {
  const sortArray = (arr, key) => {
    if (!Array.isArray(arr)) return arr;
    return [...arr].sort((a, b) => {
      const aVal = a[key] || '';
      const bVal = b[key] || '';
      return String(aVal).localeCompare(String(bVal));
    });
  };

  return JSON.stringify(
    sortArray(data, 'tournament_id').map(t => ({
      ...t,
      seasons: sortArray(t.seasons || [], 'year').map(s => ({
        ...s,
        stages: sortArray(s.stages || [], 'date').map(st => ({
          ...st,
          players: sortArray(st.players || [], 'id')
        }))
      }))
    })),
    (key, value) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(value).sort().reduce((sorted, k) => {
          sorted[k] = value[k];
          return sorted;
        }, {});
      }
      return value;
    }
  );
};

// --- Normalize members data for deep comparison ---

export const normalizeMembersForComparison = (data) => {
  if (!Array.isArray(data)) return JSON.stringify(data);
  const sorted = [...data].sort((a, b) => String(a.id).localeCompare(String(b.id)));
  return JSON.stringify(sorted, (key, value) => {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return Object.keys(value).sort().reduce((sorted, k) => {
        sorted[k] = value[k];
        return sorted;
      }, {});
    }
    return value;
  });
};

// --- Admin baseline management (module-level) ---

let _adminBaselineTournaments = null;
let _adminBaselineMembers = null;
let _adminBaselineDataTournaments = null;
let _adminBaselineDataMembers = null;

export const setAdminBaseline = (tournaments, members) => {
  _adminBaselineDataTournaments = JSON.parse(JSON.stringify(tournaments));
  _adminBaselineTournaments = normalizeForComparison(tournaments);
  if (members) {
    _adminBaselineDataMembers = JSON.parse(JSON.stringify(members));
    _adminBaselineMembers = normalizeMembersForComparison(members);
  }
};

export const getAdminBaselineData = () => {
  if (!_adminBaselineDataTournaments && !_adminBaselineDataMembers) return null;
  return {
    tournaments: _adminBaselineDataTournaments
      ? JSON.parse(JSON.stringify(_adminBaselineDataTournaments))
      : null,
    members: _adminBaselineDataMembers
      ? JSON.parse(JSON.stringify(_adminBaselineDataMembers))
      : null,
  };
};

export const clearAdminBaseline = () => {
  _adminBaselineTournaments = null;
  _adminBaselineMembers = null;
  _adminBaselineDataTournaments = null;
  _adminBaselineDataMembers = null;
};

export const hasTournamentsChanged = (currentTournaments) => {
  if (!_adminBaselineTournaments) return false;
  return normalizeForComparison(currentTournaments) !== _adminBaselineTournaments;
};

export const hasMembersChanged = (currentMembers) => {
  if (!_adminBaselineMembers || !currentMembers) return false;
  return normalizeMembersForComparison(currentMembers) !== _adminBaselineMembers;
};

export const hasAdminUnsavedChanges = (currentTournaments, currentMembers) => {
  if (!_adminBaselineTournaments) return false;
  if (hasTournamentsChanged(currentTournaments)) return true;
  if (hasMembersChanged(currentMembers)) return true;
  if (hasPendingAvatars()) return true;
  return false;
};

// --- Pending avatars (persisted to sessionStorage) ---

const PENDING_AVATARS_KEY = "admin_pending_avatars";

const _loadPendingAvatars = () => {
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_AVATARS_KEY)) || {};
  } catch {
    return {};
  }
};

const _savePendingAvatars = (data) => {
  sessionStorage.setItem(PENDING_AVATARS_KEY, JSON.stringify(data));
};

export const setPendingAvatar = (memberId, base64) => {
  const avatars = _loadPendingAvatars();
  avatars[memberId] = base64;
  _savePendingAvatars(avatars);
};

export const getPendingAvatar = (memberId) => {
  return _loadPendingAvatars()[memberId] || null;
};

export const removePendingAvatar = (memberId) => {
  const avatars = _loadPendingAvatars();
  delete avatars[memberId];
  _savePendingAvatars(avatars);
};

export const getPendingAvatars = () => ({ ..._loadPendingAvatars() });

export const hasPendingAvatars = () => Object.keys(_loadPendingAvatars()).length > 0;

export const clearPendingAvatars = () => {
  sessionStorage.removeItem(PENDING_AVATARS_KEY);
};

// GitHub API integration

const GITHUB_OWNER = "M-Farmaha";
const GITHUB_REPO = "100-club";
const GITHUB_BRANCH = "main";

export const getGitHubToken = () => localStorage.getItem("github_pat") || "";
export const setGitHubToken = (token) => localStorage.setItem("github_pat", token);
export const removeGitHubToken = () => localStorage.removeItem("github_pat");

export const fetchTournamentsFromGitHub = async () => {
  const res = await fetch(
    `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/src/Api/tournaments.json`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
  return await res.json();
};

export const fetchMembersFromGitHub = async () => {
  const res = await fetch(
    `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/src/Api/members.json`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`GitHub fetch failed: ${res.status}`);
  return await res.json();
};

const getFileSha = async (token, path) => {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`GitHub API помилка: ${res.status}`);
  }
  const data = await res.json();
  return data.sha;
};

export const pushToGitHub = async (token, data, filePath, commitMessage) => {
  if (!token) throw new Error("GitHub токен не налаштовано");

  const sha = await getFileSha(token, filePath);

  const content = btoa(
    unescape(encodeURIComponent(JSON.stringify(data, null, 2) + "\n"))
  );

  const body = {
    message: commitMessage || `Update ${filePath}`,
    content,
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API помилка: ${res.status}`);
  }

  return await res.json();
};

export const pushImageToGitHub = async (token, base64Content, filePath, commitMessage) => {
  if (!token) throw new Error("GitHub токен не налаштовано");

  const sha = await getFileSha(token, filePath);

  const body = {
    message: commitMessage || `Update ${filePath}`,
    content: base64Content,
    branch: GITHUB_BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API помилка: ${res.status}`);
  }

  return await res.json();
};
