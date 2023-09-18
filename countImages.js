const fs = require('fs');

// Define the path to the JSON file
const outputPath = './12_sep_thumbnails.json';

// Read the JSON file
fs.readFile(outputPath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading JSON file: ${err}`);
        return;
    }

    try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Initialize a variable to store the count
        let fileCount = 0;

        // Iterate through the JSON data
        for (const productID in jsonData) {
            const colors = jsonData[productID];
            for (const color in colors) {
                const images = colors[color];
                if (Array.isArray(images)) {
                    // Count the number of image files that do not end with '.jpg' or '.jpeg'
                    fileCount += images.filter((image) =>
                        (image.toLowerCase().endsWith('.jpg') || image.toLowerCase().endsWith('.jpeg'))
                    ).length;
                }
            }
        }

        // Log the total count of image files
        console.log(`Total image files: ${fileCount}`);
    } catch (parseError) {
        console.error(`Error parsing JSON data: ${parseError}`);
    }
});
