package com.emotionoui.oui.music;

import com.emotionoui.oui.music.service.MusicServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import se.michaelthelin.spotify.SpotifyApi;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.startsWith;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MusicServiceTest {


    @Autowired
    private MusicServiceImpl musicService;


    @DisplayName("노래명, 가수명으로 Spotify URI를 반환한다.")
    @Test
    void getSpotifyURI() throws Exception{
        String uri = musicService.searchMusicURI("TWS (투어스)", "첫 만남은 계획대로 되지 않아");
        assertEquals("spotify:track:0aZG8KWrpRnsGL0loUkfSj", uri);
    }
}
