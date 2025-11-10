// app/(tabs)/playlistScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import { getPlaylistTracks, getTrackDownloadLink, Track } from "@/api/spotidownloader";

export default function PlaylistScreen() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // Playlist de prueba interna — nunca undefined
  const playlistId = "37i9dQZF1DXcBWIGoYBM5M"; // Today's Top Hits

  useEffect(() => {
    fetchTracks();

    return () => {
      if (sound) {
        sound.unloadAsync().catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTracks = async () => {
    setLoading(true);
    try {
      if (!playlistId) {
        console.warn("Playlist ID is falsy — using fallback");
      }
      const data = await getPlaylistTracks(playlistId);
      console.log("[PlaylistScreen] got tracks:", (data || []).length);
      setTracks(data);
    } catch (err) {
      console.error("[PlaylistScreen] Error fetching tracks", err);
      setTracks([]);
    } finally {
      setLoading(false);
    }
  };

  const playTrack = async (trackId: string) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setPlayingTrackId(null);
      }

      const url = await getTrackDownloadLink(trackId);
      if (!url) {
        console.warn("[PlaylistScreen] no download url for trackId", trackId);
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url });
      setSound(newSound);
      setPlayingTrackId(trackId);
      await newSound.playAsync();
    } catch (error) {
      console.error("[PlaylistScreen] Error playing track", error);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" style={{ flex: 1, justifyContent: "center" }} />
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {tracks.length === 0 ? (
        <Text>No se encontraron pistas o hubo un error. Revisa la consola.</Text>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
                backgroundColor: playingTrackId === item.id ? "#ddd" : "#fff",
                padding: 8,
                borderRadius: 8,
              }}
              onPress={() => playTrack(item.id)}
            >
              <Image
                source={{ uri: item.cover }}
                style={{ width: 50, height: 50, marginRight: 12 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                <Text>{item.artists}</Text>
              </View>
              <Text>{playingTrackId === item.id ? "PAUSA" : "PLAY"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}