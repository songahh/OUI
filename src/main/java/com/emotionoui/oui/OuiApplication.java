package com.emotionoui.oui;

import com.emotionoui.oui.music.config.SpotifyCredential;
import com.emotionoui.oui.music.service.MusicService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
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
        musicService.searchMusicURI("TWS (투어스)", "첫 만남은 계획대로 되지 않아");
    }

}
