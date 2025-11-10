import { View, Text } from 'react-native';
import { COLORS } from '@/lib/Constants/Colors';

export default function Info() {
  return (
    <View className="p-4 rounded-lg mb-4" style={{ backgroundColor: COLORS.card }}>
      <Text className="text-xl font-bold mb-2" style={{ color: COLORS.text }}>
        Bienvenido a MiniSpotify
      </Text>
      <Text style={{ color: COLORS.textSecondary }}>
        Descubre millones de canciones y podcasts
      </Text>
    </View>
  );
}