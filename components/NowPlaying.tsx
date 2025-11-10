import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS } from '@/lib/Constants/Colors';
import {Entypo, FontAwesome6} from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NowPlaying() {

  const router = useRouter();

  const handleAPI = () => {
    router.replace('/playlist');
  };

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View
      className="p-4 border-t flex-row items-center justify-between"
      style={{ backgroundColor: COLORS.card, borderTopColor: COLORS.background }}
    >
      <View className="flex-row items-center flex-1">
        <View
          className="w-12 h-12 rounded mr-3 items-center justify-center"
          style={{ backgroundColor: COLORS.primary }}
        >
          <FontAwesome6 className="text-6xl mb-8" name="music" size={20} color={COLORS.secondary} />
        </View>
        <View className="flex-1">
          <Text className="font-bold" style={{ color: COLORS.text }}>
            Nombre de Canción
          </Text>
          <Text className="text-sm" style={{ color: COLORS.textSecondary }}>
            Artista
          </Text>
        </View>
      </View>
      
      <View className="flex-row items-center">
        <TouchableOpacity className="p-2 active:opacity-70" onPress={handleAPI}>
        <Entypo name="heart" size={24} color={COLORS.accent} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 active:opacity-70"
          onPress={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Entypo name="controller-paus" size={24} color={COLORS.accent} />
          ) : (
            <Entypo name="controller-play" size={24} color={COLORS.accent} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}