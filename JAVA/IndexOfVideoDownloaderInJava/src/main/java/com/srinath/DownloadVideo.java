package com.srinath;

import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.concurrent.CompletableFuture;

public class DownloadVideo {
    public static CompletableFuture<InputStream> returnFuture(String url) {
            URI urlCreated = URI.create(url);
            HttpRequest getRequest = HttpRequest.newBuilder()
                    .uri(urlCreated)
                    .build();
            HttpClient httpClient = HttpClient.newHttpClient();
        return httpClient.sendAsync(getRequest, HttpResponse.BodyHandlers.ofInputStream())
                .thenApply(HttpResponse::body);
    }
}
