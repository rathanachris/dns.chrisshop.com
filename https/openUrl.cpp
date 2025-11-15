#include <iostream>
#include <cstring>

void openUrl(const char *url)
{
    // Check if URL starts with "https://"
    if (strncmp(url, "https://", 8) != 0)
    {
        std::cerr << "WARNING: Insecure URL! Use HTTPS instead of HTTP.\n";
        return; // Stop to prevent insecure connection
    }

    // Proceed with opening the URL
    std::cout << "Opening secure URL: " << url << std::endl;

    // TODO: Add actual network code here (using HTTPS library)
}

int main()
{
    openUrl("http://example.com");   // ⚠️ Warning: insecure
    openUrl("https://example.com");  // ✅ Secure
    return 0;
}
