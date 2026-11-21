import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { Palette } from '@/constants/design';
import type { IconName } from '@/types';

type SymbolName = ComponentProps<typeof SymbolView>['name'];

const ICON_GLYPHS = {
  book: { ios: 'book.fill', android: 'menu_book', web: 'menu_book' },
  chat: { ios: 'bubble.left.and.bubble.right.fill', android: 'chat', web: 'chat' },
  support: { ios: 'hands.sparkles.fill', android: 'volunteer_activism', web: 'volunteer_activism' },
  lock: { ios: 'lock.fill', android: 'lock', web: 'lock' },
  shield: { ios: 'shield.fill', android: 'shield', web: 'shield' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  mic: { ios: 'mic.fill', android: 'mic', web: 'mic' },
  audio: { ios: 'speaker.wave.2.fill', android: 'volume_up', web: 'volume_up' },
  attachment: { ios: 'paperclip', android: 'attach_file', web: 'attach_file' },
  camera: { ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' },
  document: { ios: 'doc.fill', android: 'description', web: 'description' },
  note: { ios: 'note.text', android: 'note', web: 'note' },
  phone: { ios: 'phone.fill', android: 'phone', web: 'phone' },
  globe: { ios: 'globe.americas.fill', android: 'public', web: 'public' },
  contacts: { ios: 'person.2.fill', android: 'groups', web: 'groups' },
  bell: { ios: 'bell.fill', android: 'notifications', web: 'notifications' },
  sos: { ios: 'exclamationmark.triangle.fill', android: 'emergency', web: 'emergency' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  forward: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  check: { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  info: { ios: 'info.circle.fill', android: 'info', web: 'info' },
  close: { ios: 'xmark.circle.fill', android: 'cancel', web: 'cancel' },
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  pin: { ios: 'mappin.and.ellipse', android: 'location_on', web: 'location_on' },
  sparkle: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  send: { ios: 'paperplane.fill', android: 'send', web: 'send' },
  language: { ios: 'globe', android: 'translate', web: 'translate' },
} satisfies Record<IconName, SymbolName>;

type WaslIconProps = {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function WaslIcon({ name, size = 24, color = Palette.primary, style }: WaslIconProps) {
  return (
    <SymbolView
      name={ICON_GLYPHS[name]}
      size={size}
      tintColor={color}
      style={style}
      accessible={false}
    />
  );
}
