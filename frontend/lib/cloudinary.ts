import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

let configured = false;

function ensureCloudinaryConfig(): void {
  if (configured) {
    return;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary environment variables are not fully configured.",
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  configured = true;
}

function uploadBuffer(
  buffer: Buffer,
  folder: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed."));
          return;
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });
}

export async function uploadImageToCloudinary(
  buffer: Buffer,
  folder = "sarthi/uploads",
): Promise<string> {
  ensureCloudinaryConfig();
  const result = await uploadBuffer(buffer, folder);

  return cloudinary.url(result.public_id, {
    secure: true,
    fetch_format: "auto",
    quality: "auto",
  });
}
