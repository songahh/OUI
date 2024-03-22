package com.emotionoui.oui;

import com.emotionoui.oui.music.config.SpotifyCredential;
import com.emotionoui.oui.music.service.MusicService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@RequiredArgsConstructor
@PropertySource("/env/env.yml")
@Slf4j
public class OuiApplication {

    public static void main(String[] args) {
        SpringApplication.run(OuiApplication.class, args);
    }

    private final SpotifyCredential spotifyCredential;
    private final MusicService musicService;

    @PostConstruct
    public void getSpotifyCredential(){
        log.info("[OuiApplication/getSpotifyCredential] request access token");
        spotifyCredential.clientCredentials_sync();
    }

}
