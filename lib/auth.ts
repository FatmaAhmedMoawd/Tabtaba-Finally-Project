'use client';

export function isUserLoggedIn() {
  if (typeof window === 'undefined') return false;
  return Boolean(window.localStorage.getItem('profile_email'));
}
