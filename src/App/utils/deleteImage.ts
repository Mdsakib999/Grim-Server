import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

// Configure Cloudinary
cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret,
});

export const deleteImageUrl = async (url: string) => {
    try {
        // Extract public_id from the URL
        const public_id = url.split("/").pop()?.split(".")[0];

        if (!public_id) {
            throw new Error("Invalid URL or public ID");
        }

        // Call the Cloudinary API to delete the image
        const result = await cloudinary.api.delete_resources([public_id], {
            type: "upload",
            resource_type: "image",
        });

        console.log("Deletion Result:", result);
        return { result };  // Return the result if needed
    } catch (error) {
        console.error("Error deleting image:", error);
        throw error;  // Rethrow error for higher-level handling if needed
    }
};
