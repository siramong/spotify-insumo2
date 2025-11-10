import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../lib/Constants/Colors';

export default function NotFound() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <View className="flex-1 justify-center items-center">
        <FontAwesome6 className="text-6xl mb-4" name="file-circle-exclamation" size={30} color={COLORS.accent} />
        <Text className="text-3xl font-bold mb-2" style={{ color: COLORS.text }}>
          404: Esta página no existe
        </Text>
        <TouchableOpacity
          className="px-8 py-4 rounded-full mt-8 active:opacity-80"
          style={{ backgroundColor: COLORS.primary }}
          onPress={() => router.replace('/')}
        >
          <Text className="font-bold" style={{ color: COLORS.text }}>
            Volver
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}