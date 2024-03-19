package com.emotionoui.oui.music.service;

import com.emotionoui.oui.music.MusicException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.bson.json.JsonObject;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import se.michaelthelin.spotify.SpotifyApi;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MusicServiceImpl implements MusicService{
    private final SpotifyApi spotifyApi;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;
    private final String SEARCH_URL =  "https://api.spotify.com/v1/search?locale=ko-KR,ko&type=track&market=KR&limit=1&offset=0&q=";

    public String searchMusicByArtistNameAndSongName(String artistName, String songName){
        ResponseEntity<String> responseEntity = requestMusicURIToSpotifyAPI(artistName, songName);
        int statusCode = responseEntity.getStatusCode().value();
        if(statusCode/100!=2){
            log.error("[MusicServiceImpl/searchMusicByArtistNameAndSongName] SpotifyAPI 에러: {}", responseEntity.getBody());
            throw new MusicException(String.format("SpotifyAPI 에러 %s", responseEntity.getBody()));
        }

        try{
            JsonNode jsonNode = objectMapper.readTree(responseEntity.getBody());
            JsonNode trackRoot = jsonNode.get("tracks").get("items");
            Set<String> artistNamefound = trackRoot.findValuesAsText("artists")
                    .stream().map((artistStr)-> {
                        try {
                            JsonNode artistRootNode = objectMapper.readTree(artistStr);
                            return artistRootNode.get("name").asText();
                        } catch (JsonProcessingException je) {
                            log.error("[MusicServiceImpl/searchMusicByArtistNameAndSongName] json parsing 에러: {}", je.getMessage());
                            throw new MusicException(String.format("json parsing 에러: %s", je.getMessage()));
                        }
                    }).collect(Collectors.toSet());
            String songNamefound = trackRoot.get("name").asText();
            String spotifyURI = trackRoot.get("uri").asText();

            if (!songNamefound.contains(songName) && !artistNamefound.stream().anyMatch((anf->anf.contains(artistName)))){
                log.error("[MusicServiceImpl/searchMusicByArtistNameAndSongName] 노래명과 가수명에 해당하는 spotify uri가 존재하지 않습니다.");
                throw new MusicException("노래명과 가수명에 해당하는 spotify uri가 존재하지 않습니다.");
            }
            return spotifyURI;
        } catch(JsonProcessingException je){
            log.error("[MusicServiceImpl/searchMusicByArtistNameAndSongName] json parsing 에러: {}", je.getMessage());
            throw new MusicException(String.format("json parsing 에러: %s", je.getMessage()));
        }
    }

    private ResponseEntity<String> requestMusicURIToSpotifyAPI(String artistName, String songName){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + spotifyApi.getAccessToken());
        headers.add("Host", "api.spotify.com");
        headers.add("Content-type", "application/json");
        HttpEntity<String> requestEntity = new HttpEntity<>(headers);

        StringBuilder urlBuilder = new StringBuilder();
        urlBuilder.append(SEARCH_URL)
                .append(songName)
                .append("%20track:")
                .append(songName)
                .append("%20artist:")
                .append(artistName);
        String url = urlBuilder.toString();
        log.info("[MusicServiceImpl/searchMusicByArtistNameAndSongName] request url: {}", url);

        ResponseEntity<String> responseEntity
                = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        return responseEntity;
    }
}
