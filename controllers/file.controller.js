import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3"; // Import the S3Client and GetObjectCommand
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/aws.js";

dotenv.config();
// Initialize S3 client (V3)
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ==============================
// Upload Files
// ==============================
// Set up Multer-S3 storage engine
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME, // Your bucket name
   // acl: "public-read", // Permissions for uploaded files (public-read for public files)
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = Date.now() + "-" + file.originalname;
      cb(null, fileName); // The file will be saved in the S3 bucket with this key
    },
  }),
});

export const uploadFile = upload.single("file"); // Use 'file' for the file field name

export const uploadFileController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // The file is uploaded to S3 and the S3 URL is available in req.file.location
    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: req.file.location, // URL of the uploaded file on S3
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};


// ==============================
// List All The Files
// ==============================
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

export const listFiles = async (req, res) => {
  const params = {
	Bucket: BUCKET_NAME,
  };

  try {
	const command = new ListObjectsV2Command(params);
	const data = await s3Client.send(command);
	const files = data.Contents.map((file) => file.Key); // Get the file names

	res.status(200).json({
	  files: files, // Return the list of files
	});
  } catch (error) {
	console.error("Error listing files:", error);
	res.status(500).send("Error retrieving file list");
  }
};

// ==============================
// View a single file
// ==============================
export const getFile = async (req, res) => {
  const fileName = req.params.fileName;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };

  try {
    const command = new GetObjectCommand(params); // Create GetObjectCommand
    const data = await s3Client.send(command); // Send the command using the S3 client

    res.attachment(fileName); // Set the response to prompt a file download
    data.Body.pipe(res); // Stream the file content directly to the response
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send("Error retrieving file");
  }
};
