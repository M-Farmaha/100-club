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

// --- Admin baseline management (module-level) ---

let _adminBaseline = null;
let _adminBaselineData = null;

export const setAdminBaseline = (tournaments) => {
  _adminBaselineData = JSON.parse(JSON.stringify(tournaments));
  _adminBaseline = normalizeForComparison(tournaments);
};

export const getAdminBaseline = () => _adminBaseline;

export const getAdminBaselineData = () =>
  _adminBaselineData ? JSON.parse(JSON.stringify(_adminBaselineData)) : null;

export const clearAdminBaseline = () => {
  _adminBaseline = null;
  _adminBaselineData = null;
};

export const hasAdminUnsavedChanges = (currentTournaments) => {
  if (!_adminBaseline) return false;
  return normalizeForComparison(currentTournaments) !== _adminBaseline;
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
