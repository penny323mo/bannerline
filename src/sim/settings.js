export const MUTE_KEY = 'bannerline.mute';

export function isMutedValue(stored) {
  return stored === '1';
}

export function muteStoreValue(muted) {
  return muted ? '1' : '0';
}
