import { S3Client } from "@aws-sdk/client-s3"; // Import the v3 S3Client
import dotenv from "dotenv";

dotenv.config();

// Initialize S3Client instance with credentials and region
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3;
