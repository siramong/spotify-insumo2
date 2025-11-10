import React, { useEffect, useState } from "react";
import { View, Button, Text } from "react-native";
import * as AuthSession from "expo-auth-session";

const CLIENT_ID = "94dd4d9775e842a9a21edb79960125ae";
const SCOPES = ["user-read-private", "playlist-read-private"];
const REDIRECT_URI = AuthSession.makeRedirectUri({
    scheme: "insumo2",
  });
  
console.log(REDIRECT_URI)
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function SpotifyAuthScreen() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: SCOPES,
      redirectUri: REDIRECT_URI,
      responseType: "token", // Para Implicit Grant
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setAccessToken(access_token);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {accessToken ? (
        <Text>Token obtenido: {accessToken}</Text>
      ) : (
        <Button
          disabled={!request}
          title="Login with Spotify"
          onPress={() => promptAsync()}
        />
      )}
    </View>
  );
}