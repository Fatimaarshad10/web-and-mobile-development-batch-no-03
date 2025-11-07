import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, '../uploads/');

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const validateFile = (fileData) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(fileData.type)) {
        throw new Error('Only image files (JPEG, PNG, GIF) are allowed!');
    }
    
    // Check file size (5MB limit)
    const sizeInMB = fileData.data.length * 0.75 / 1024 / 1024; // Approximate size in MB
    if (sizeInMB > 5) {
        throw new Error('File size must be less than 5MB');
    }
};

export const handleFileUpload = async (fileData) => {
    try {
        validateFile(fileData);
        
        // Extract the base64 data (remove the data:image/xxx;base64, prefix)
        const base64Data = fileData.data.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        
        // Create a unique filename
        const filename = `${Date.now()}-${fileData.name}`;
        const filePath = path.join(uploadDir, filename);
        
        // Save the file
        fs.writeFileSync(filePath, base64Data, 'base64');
        
        return {
            filename,
            originalname: fileData.name
        };
    } catch (error) {
        throw new Error('Error saving file: ' + error.message);
    }
};