const fs = require('fs');
const path = require('path');

// Define the root folder
const rootFolder = './12_sep_thumbnails';

// Initialize the result object
const result = {};

// Function to recursively traverse the folder structure
function traverseFolder(folderPath) {
    // List all subdirectories in the current folder
    const items = fs.readdirSync(folderPath);

    items.forEach((item) => {
        const itemPath = path.join(folderPath, item);

        // Check if the current item is a directory
        if (fs.statSync(itemPath).isDirectory()) {
            // Get the productID from the folder name
            const productID = item;

            // Initialize an object for the productID
            result[productID] = {};

            // List all subdirectories in the color folder
            const colors = fs.readdirSync(itemPath);

            colors.forEach((color) => {
                const colorPath = path.join(itemPath, color);
                const newPath = colorPath.replace('12_sep_thumbnails\\', '')
                const finalPath = newPath.replace('\\', '/')
                // newPath.replace('\\', '/')
                // Check if the current item is a directory
                if (fs.statSync(colorPath).isDirectory()) {
                    try {
                        // List all .jpg files in the color folder
                        const images = fs.readdirSync(colorPath)
                            .filter((file) => file.toLowerCase().match(/\.(jpg|jpeg|png)$/i));

                        // Add the array of images to the color object
                        const imagesWithPath = images.map((image) => `${finalPath}/${image}`);

                        result[productID][color] = imagesWithPath;

                    } catch (error) {
                        console.error(`Error reading files in ${colorPath}: ${error.message}`);
                    }
                }
            });
        }
    });
}

// Start the traversal from the root folder
traverseFolder(rootFolder);

// Convert the result object to JSON
const jsonData = JSON.stringify(result, null, 2);

// Define the output file path
const outputPath = './12_sep_thumbnails.json';

// Write the JSON data to the output file
fs.writeFileSync(outputPath, jsonData);

console.log(`JSON data has been written to ${outputPath}`);
