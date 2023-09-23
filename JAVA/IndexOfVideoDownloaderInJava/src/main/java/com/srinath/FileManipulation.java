package com.srinath;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class FileManipulation {
    private static Path outputPath = Path.of(System.getProperty("user.dir") + "/Output");

    public static void createDirectory() {
        try {
            Files.createDirectory(outputPath);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void handleInputStream(String url, CompletableFuture<InputStream> futureInputStream) {
        try {
            String fileName = url.substring(url.lastIndexOf('/') + 1);
            Path fileOutputPath = Path.of(String.valueOf(outputPath), fileName);
            InputStream inputStream = (InputStream) ((CompletableFuture<?>) futureInputStream).get();
            Files.copy(inputStream, Path.of(String.valueOf(fileOutputPath)));
            System.out.println("Video download completed for : " + url);
        } catch (InterruptedException | IOException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
