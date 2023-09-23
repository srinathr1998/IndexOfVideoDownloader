package com.srinath;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.concurrent.CompletableFuture;

public class IndexOfVideoDownloader {
    public static void main(String[] args) {
        // pass url as first argument
        String url = args[0];
        String str = HtmlString.retrieveHtmlString(url);
        ArrayList<String> links = IdentifyLinks.retrieveLinks(str, new String[]{"mkv", "avi", "mp4"}, url);
        for (String link : links) {
            CompletableFuture<InputStream> futureInputStream = DownloadVideo.returnFuture(link);
            FileManipulation.createDirectory();
            FileManipulation.handleInputStream(link, futureInputStream);
        }
    }
}

