import { Tabs } from 'expo-router';
import { COLORS } from '@/lib/Constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopColor: COLORS.card,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: () => <Entypo name="home" size={24} color={COLORS.accent} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuración',
          tabBarIcon: () => <Entypo name="cog" size={24} color={COLORS.accent} />
        }}
      />
    </Tabs>
  );
}