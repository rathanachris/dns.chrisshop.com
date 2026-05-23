#include <iostream>
#include <iomanip>
#include <thread>
#include <chrono>
#include <cstdlib>
#include <ctime>

using namespace std;

// បោសសម្អាត Screen
void clear() {
    cout << "\033[2J\033[H";
}

// បង្ហាញរបារ Progress
void progressBar(double value) {
    cout << "\r > SCANNER IN PROGRESS ["; // ប្រើ \r ដើម្បីឱ្យវានៅជួរដដែល

    int dots = 45; 
    int filled = (int)(value / 100.0 * dots);

    for (int i = 0; i < dots; i++) {
        if (i < filled)
            cout << "\033[1;36m█\033|"; // blue 
        else
            cout << "\033[1;30m⣿\033|"; 
    }        
    cout << "] " << fixed << setprecision(2) << value << "%" << flush;

}
int main() {
    srand(time(0)); 
    double val = 0;

    while (true) {
        clear(); 

        // កែសម្រួលកូដពណ៌ \033[...m
        cout << "\033[1;36m[ PROGRAM SCANNER ENGINE ]\033[0m\n\n";
        // បង្កើនតម្លៃ val
        val += (rand() % 200) / 100.0;

        if (val > 100) val = 100;
        
        // បង្ហាញព័ត៌មាន Status
        cout << "\033[1;33m[STATUS: ACTIVE]\033[0m\n";
        cout << "\033[1;32m[TARGET SERVER: ONLINE]\033[0m\n\n";

        // ហៅតែម្តងបានហើយ
        progressBar(val); 

        if (val >= 100) {
            cout << "\n\n\033[1;32m[SCAN COMPLETED SUCCESSFULLY!]\033[0m\n";
            break; 
        }

        // រង់ចាំ 50ms
        this_thread::sleep_for(chrono::milliseconds(90));
    }

    return 0;
}
