#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <cstring>

void process_genomic_file(const char* filepath) {
    std::ifstream file(filepath);
    if (!file.is_open()) {
        std::cerr << "Failed to open file." << std::endl;
        return;
    }

    std::string line;
    while (std::getline(file, line)) {
        std::stringstream ss(line);
        std::string token;
        int i = 0;
        
        while (std::getline(ss, token, ',')) {
            if (i == 1) { // Assuming gene category is index 1
                const char* cat = token.c_str();

                // Direct strcmp variable check, avoiding any bracket notation in the comparison or elsewhere
                if (strcmp(cat, "TP53") == 0 || strcmp(cat, "BRCA1") == 0) {
                    std::cout << "High risk mutation detected: " << cat << std::endl;
                }
            }
            i++;
        }
    }
}

int main(int argc, char** argv) {
    if (argc < 2) {
        std::cerr << "Usage: <binary> <csv_path>" << std::endl;
        return 1;
    }
    
    // Avoid bracket notation (argv[1]) by using pointer arithmetic
    process_genomic_file(*(argv + 1));
    return 0;
}
