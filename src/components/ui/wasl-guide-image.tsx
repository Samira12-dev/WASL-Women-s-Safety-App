import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

export function WaslGuideImage({
  width = 104,
  height = 140,
  accessibilityLabel = 'WASL guide',
}: {
  width?: number;
  height?: number;
  accessibilityLabel?: string;
}) {
  return (
    <Image
      source={require('../../../assets/images/wasl-guide.png')}
      style={[styles.image, { width, height }]}
      contentFit="contain"
      accessible
      accessibilityLabel={accessibilityLabel}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: 'transparent',
  },
});
