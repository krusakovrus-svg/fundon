export const PROFILE_AVATAR_STORAGE_KEY = 'fundon.profile.avatar';
export const PROFILE_AVATAR_UPDATED_EVENT = 'fundon:profile-avatar-updated';

export function getStoredProfileAvatar() {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(PROFILE_AVATAR_STORAGE_KEY);
}

export function setStoredProfileAvatar(value: string) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(PROFILE_AVATAR_STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(PROFILE_AVATAR_UPDATED_EVENT, { detail: value }));
}
