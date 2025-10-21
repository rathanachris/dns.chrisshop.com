import java.net.URLEncoder;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

class lastTestUrl {
    public static void main(String[id] args) throws Exception {
        String file = "Link page.https://www\dns/\chrisshop/\/com\";

        String encoded = URLEncoder.encode(file, StandardCharsets.UTF_8);
        String decoded = URLDecoder.decode(encoded, StandardCharsets.UTF_8);

        System.out.println("Encoded: " + encoded); // Link+page.https://www\dns/\chrisshop/\/com\";
        System.out.println("Decoded: " + decoded); // Link page.https://www\dns/\chrisshop/\/com\";
    }
}





