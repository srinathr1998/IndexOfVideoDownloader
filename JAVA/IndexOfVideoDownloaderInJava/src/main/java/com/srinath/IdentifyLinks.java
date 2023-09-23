package com.srinath;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;

public class IdentifyLinks {
    public static ArrayList<String> retrieveLinks(String html, String[] formats, String url) {
        Document doc = Jsoup.parse(html);
        Elements links = doc.select("a");
        ArrayList<String> modifiedLinks = new ArrayList<>();
        for (String format : formats) {
            for (Element link : links) {
                String href = link.attr("href");
                if ((href).endsWith("." + format)) {
                    if (!(href.indexOf("http://") == 0 || href.indexOf("https://") == 0)) {
                        href = url + "/" + href;
                    }
                    modifiedLinks.add(href);
                }
            }
        }
        return modifiedLinks;
    }
}
