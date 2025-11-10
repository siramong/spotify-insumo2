import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { COLORS } from '@/lib/Constants/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function DashboardContent() {
  const [musicType, setMusicType] = useState('Rock');
  
  const genres = ['Rock', 'Pop', 'Jazz', 'Hip Hop', 'Electrónica', 'Clásica'];
  const playlists = [
    { id: 1, name: 'Mix Diario', songs: 50 },
    { id: 2, name: 'Descubrimiento Semanal', songs: 30 },
    { id: 3, name: 'Tus Favoritas', songs: 120 },
    { id: 4, name: 'Rock Clásico', songs: 80 },
  ];

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="p-4">
        <Text className="text-2xl font-bold mb-2" style={{ color: COLORS.text }}>
          Tipo de Música
        </Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre}
              className="mr-3 px-6 py-3 rounded-full active:opacity-80"
              style={{
                backgroundColor: musicType === genre ? COLORS.primary : COLORS.card,
              }}
              onPress={() => setMusicType(genre)}
            >
              <Text className="font-bold" style={{ color: COLORS.text }}>
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text className="text-2xl font-bold mb-4" style={{ color: COLORS.text }}>
          Playlists para ti
        </Text>
        
        {playlists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            className="flex-row items-center p-4 mb-3 rounded-lg active:opacity-70"
            style={{ backgroundColor: COLORS.card }}
          >
            <View
              className="w-16 h-16 rounded mr-4 items-center justify-center"
              style={{ backgroundColor: COLORS.primary }}
            >
              <FontAwesome6 className="text-6xl mb-8" name="music" size={20} color={COLORS.secondary} />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold" style={{ color: COLORS.text }}>
                {playlist.name}
              </Text>
              <Text style={{ color: COLORS.textSecondary }}>
                {playlist.songs} canciones
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}