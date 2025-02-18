import {
  getFile,
  uploadFile,
  uploadFileController,
  listFiles,
} from "../controllers/file.controller.js";
import express from "express";
const router = express.Router();

// File upload endpoint
router.post("/upload", uploadFile, uploadFileController);
// Route to list all files in the S3 bucket
router.get('/files', listFiles);
// File retrieval endpoint
router.get('/file/:fileName', getFile);

export default router;