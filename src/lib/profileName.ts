export const PROFILE_NAME_STORAGE_KEY = 'fundon.profile.name';
export const PROFILE_NAME_UPDATED_EVENT = 'fundon:profile-name-updated';

export function getStoredProfileName() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(PROFILE_NAME_STORAGE_KEY);
}

export function setStoredProfileName(value: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    window.localStorage.removeItem(PROFILE_NAME_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(PROFILE_NAME_UPDATED_EVENT, { detail: null }));
    return;
  }

  window.localStorage.setItem(PROFILE_NAME_STORAGE_KEY, normalizedValue);
  window.dispatchEvent(new CustomEvent(PROFILE_NAME_UPDATED_EVENT, { detail: normalizedValue }));
}
