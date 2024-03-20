package com.emotionoui.oui.music.service;

import com.emotionoui.oui.music.MusicException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import se.michaelthelin.spotify.SpotifyApi;

import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService{
    private final SpotifyApi spotifyApi;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    @Qualifier("englishFinderPattern")
    private final Pattern englishFinderPattern;

    @Qualifier("artistNameFilterPattern")
    private final Pattern artistNameFilterPattern;

    private final int RESPONSE_NUM = 5;
    private final String SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search?locale=ko-KR,ko&type=track&market=KR&limit=5&offset=0&q=";
    private final String ITUNES_SEARCH_URL = "https://itunes.apple.com/search?limit=1&media=music&term=";


    public String searchMusicURI(String artistName, String songName){
        ResponseEntity<String> responseEntity = requestMusicURIToSpotifyAPI(artistName, songName);

        int statusCode = responseEntity.getStatusCode().value();
        if(statusCode/100!=2){
            log.error("[MusicServiceImpl/searchMusicURI] SpotifyAPI 에러: {}", responseEntity.getBody());
            throw new MusicException(String.format("SpotifyAPI 에러 %s", responseEntity.getBody()));
        }

        for(int i=0; i<RESPONSE_NUM; ++i){
            try{
                JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
                JsonNode trackRoot = jsonNode.get("tracks").get("items").get(i);
                Set<String> artistNamefound = trackRoot.get("artists")
                        .findValuesAsText("name")
                        .stream().collect(Collectors.toSet());
                String songNamefound = trackRoot.get("name").asText();
                String spotifyURI = trackRoot.get("uri").asText();

                if (!songNamefound.contains(songName) && !artistNamefound.stream().anyMatch((anf->artistName.contains(anf)))){
                    continue;
                }
                return spotifyURI;
            } catch(JsonProcessingException je){
                log.error("[MusicServiceImpl/searchMusicURI] json parsing 에러: {}", je.getMessage());
                throw new MusicException(String.format("json parsing 에러: %s", je.getMessage()));
            }
        }
        throw new MusicException("노래명과 가수명에 해당하는 spotify uri가 존재하지 않습니다.");
    }

    private String getEngSongName(String artistName, String songName){
        ResponseEntity<String> responseEntity = requestEngSongNameToiTunesAPI(artistName, songName);

        try{
            JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
            JsonNode trackRoot = jsonNode.get("results").get(0);
            String songNamefound = trackRoot.get("trackName").asText();
            return songNamefound;
        } catch(JsonProcessingException je){
            log.error("[MusicServiceImpl/getEngSongName] json parsing 에러: {}", je.getMessage());
            throw new MusicException(String.format("json parsing 에러: %s", je.getMessage()));
        }
    }

    private ResponseEntity<String> requestEngSongNameToiTunesAPI(String artistName, String songName){
        HttpHeaders headers = new HttpHeaders();
        //headers.add("Content-type", "application/json");
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder();
        String artistNameEncoded = artistName.replace(" ", "+");
        String songNameEncoded = songName.replace(" ", "+");

        urlBuilder.append(ITUNES_SEARCH_URL)
                .append(artistNameEncoded)
                .append("+")
                .append(songNameEncoded);
        String url = urlBuilder.toString();

        log.info("[MusicServiceImpl/requestEngSongNameToiTunesAPI] request url: {}", url);

        try{
            ResponseEntity<String> responseEntity
                    = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
            //log.info("[MusicServiceImpl/requestEngSongNameToiTunesAPI] response: {}", responseEntity.getBody());
            return responseEntity;
        } catch(HttpClientErrorException e){
            log.error("[MusicServiceImpl/getEngSongName] iTunesAPI 에러: {}", e.getMessage());
            throw new MusicException("[MusicServiceImpl/getEngSongName] iTunesAPI 에러");
        }

    }

    private ResponseEntity<String> requestMusicURIToSpotifyAPI(String artistName, String songName){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + spotifyApi.getAccessToken());
        headers.add("Host", "api.spotify.com");
        headers.add("Content-type", "application/json");
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder();


        String songNameEncoded = songName.substring(0);
        try{
            songNameEncoded = getEngSongName(artistName, songName);
        } catch(MusicException e){
            log.info("[MusicServieImpl/getEngSongName] {}", e.getMessage());
        } finally {
            songNameEncoded = songNameEncoded.replace(" ", "%20");
        }
        String songNameKorEncoded = songName.replace(" ", "%20");

        // TWS (투어스) -> TWS, 임창정 -> 임창정, 비비 (BIBI) -> BIBI
        String artistNameEncoded = artistName.substring(0);
        if(englishFinderPattern.matcher(artistNameEncoded).find()){
            artistNameEncoded = artistNameFilterPattern.matcher(artistNameEncoded).replaceAll("").trim();
        }
        artistNameEncoded = artistNameEncoded.replace(" ", "%20");
        urlBuilder.append(SPOTIFY_SEARCH_URL)
                .append(songNameEncoded)
                .append("%20track:")
                .append(songNameKorEncoded)
                .append("%20artist:")
                .append(artistNameEncoded);
        String url = urlBuilder.toString();
        log.info("[MusicServiceImpl/requestMusicURIToSpotifyAPI] request url: {}", url);

        ResponseEntity<String> responseEntity
                = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        //log.info("[MusicServiceImpl/requestMusicURIToSpotifyAPI] response: {}", responseEntity.getBody());
        return responseEntity;
    }
}
