package com.srinath;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HtmlString {
    public static String retrieveHtmlString(String url) {
        try {
            HttpRequest getRequest = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .build();
            HttpClient httpClient = HttpClient.newHttpClient();
            return httpClient.send(getRequest, HttpResponse.BodyHandlers.ofString()).body();
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
