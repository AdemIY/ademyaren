import { query, queryAll } from "./dom-helpers.js";

const storageKey = "site-theme";
const lightThemeColor = "#f7f1e8";
const darkThemeColor = "#0f1317";

function getStoredTheme() {
  try {
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : "";
  } catch {
    return "";
  }
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme() {
  return getStoredTheme() || getSystemTheme();
}

function updateThemeColor(theme) {
  const themeColorMeta = query('meta[name="theme-color"]');

  if (!themeColorMeta) {
    return;
  }

  themeColorMeta.setAttribute("content", theme === "dark" ? darkThemeColor : lightThemeColor);
}

function syncToggleButtons(theme) {
  queryAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-checked", theme === "dark" ? "true" : "false");

    const state = button.querySelector("[data-theme-toggle-state]");

    if (state) {
      state.textContent = theme === "dark" ? "Dunkel" : "Hell";
    }
  });
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  updateThemeColor(theme);
  syncToggleButtons(theme);
}

function persistTheme(theme) {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    // Ignore storage failures and still apply the theme for this session.
  }
}

export function initThemeToggle() {
  applyTheme(resolveTheme());

  queryAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      persistTheme(nextTheme);
      applyTheme(nextTheme);
    });
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemThemeChange = () => {
    if (getStoredTheme()) {
      return;
    }

    applyTheme(getSystemTheme());
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleSystemThemeChange);
  } else if (typeof mediaQuery.addListener === "function") {
    mediaQuery.addListener(handleSystemThemeChange);
  }
}
