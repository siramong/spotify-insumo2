import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS } from '@/lib/Constants/Colors';

export default function Settings() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <ScrollView className="flex-1 p-4">
        {['Cuenta', 'Notificaciones', 'Calidad de audio', 'Privacidad'].map((item) => (
          <TouchableOpacity
            key={item}
            className="p-4 mb-2 rounded-lg active:opacity-70"
            style={{ backgroundColor: COLORS.card }}
          >
            <Text style={{ color: COLORS.text }}>{item}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          className="p-4 mt-4 rounded-lg active:opacity-80"
          style={{ backgroundColor: COLORS.error }}
          onPress={handleLogout}
        >
          <Text className="text-center font-bold" style={{ color: COLORS.text }}>
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}