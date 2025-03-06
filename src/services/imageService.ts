// Image service for handling token image uploads

// In production, this would connect to a cloud storage service like Firebase Storage or AWS S3
// For this demo, we'll use a simulated approach with local storage

/**
 * Uploads an image and returns a URL to access it
 * @param file The image file to upload
 * @param tokenSymbol The token symbol to use in the filename
 */
export async function uploadTokenImage(
  file: File,
  tokenSymbol: string
): Promise<string> {
  if (!file) {
    throw new Error("No file provided");
  }

  // Generate a unique filename based on the token symbol and timestamp
  const timestamp = Date.now();
  const safeSymbol = tokenSymbol.toLowerCase().replace(/[^a-z0-9]/g, "");
  const fileName = `${safeSymbol}-${timestamp}`;

  // In a real implementation, this would upload to a cloud service
  // For demo purposes, we'll create a URL and simulate storage

  // Convert the file to a data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // In a real app, we would make an API call here to store the file
      // and get back a URL. For the demo, we'll simulate this by storing
      // the data in localStorage and returning a fake URL path.

      if (typeof reader.result === "string") {
        // Make sure we're in a browser environment
        if (typeof window !== "undefined") {
          // Store in localStorage for demo purposes
          try {
            localStorage.setItem(`token-image-${fileName}`, reader.result);
          } catch (error) {
            console.error("Error storing image in localStorage:", error);
            // If localStorage fails, just return the data URL directly
            resolve(reader.result);
            return;
          }
        }

        // Return a simulated URL that our app can recognize
        resolve(`/api/images/tokens/${fileName}`);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Gets an image URL from our storage
 * In a real app, this would be a direct URL to the cloud storage
 * For this demo, we'll retrieve from localStorage
 */
export function getTokenImageUrl(url: string): string {
  // Make sure we're in a browser environment
  if (typeof window === "undefined") {
    return "/placeholder.png";
  }

  if (!url || !url.startsWith("/api/images/tokens/")) {
    // Return a default image if the URL is invalid
    return "/placeholder.png";
  }

  const fileName = url.split("/").pop();
  if (!fileName) return "/placeholder.png";

  try {
    const storedImage = localStorage.getItem(`token-image-${fileName}`);
    return storedImage || "/placeholder.png";
  } catch (error) {
    console.error("Error retrieving image from localStorage:", error);
    return "/placeholder.png";
  }
}
