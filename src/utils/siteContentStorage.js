import { siteContentDefaults } from '../data/siteContentDefaults';

const STORAGE_KEY = 'shivanand_portfolio_cms_v1';

export function loadSiteContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return siteContentDefaults;
    const parsed = JSON.parse(raw);
    return {
      ...siteContentDefaults,
      ...parsed,
      profile: {
        ...siteContentDefaults.profile,
        ...(parsed.profile || {}),
      },
      projects: Array.isArray(parsed.projects)
        ? parsed.projects
        : siteContentDefaults.projects,
    };
  } catch {
    return siteContentDefaults;
  }
}

export function saveSiteContent(newContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    return true;
  } catch {
    return false;
  }
}

export function resetSiteContent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return siteContentDefaults;
  } catch {
    return siteContentDefaults;
  }
}