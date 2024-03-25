package com.emotionoui.oui.music.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

@PropertySource("classpath:application.yml")
@Configuration
public class SpotifyConfig {

    @Value("${spotify.client-id}")
    private String clientId;

    @Value("${spotify.client-secret}")
    private String clientSecret;


    @Bean
    public SpotifyApi spotifyApi() {
        return new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .build();
    }

    @Bean
    public ClientCredentialsRequest clientCredentialsRequest(SpotifyApi spotifyApi){
        return spotifyApi
                .clientCredentials()
                .build();
    }
}