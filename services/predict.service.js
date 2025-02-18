import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to run the prediction model
export const runPredictionModel = (city, year, month) => {
  return new Promise((resolve, reject) => {
    // Correct path to predict.py
    const pythonScriptPath = path.join(
      __dirname,
      "../../Prediction_model/predict.py"
    );

    // Spawn the Python process with arguments
    const python = spawn("python", [pythonScriptPath, city, year, month]);

    let result = "";
    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
      reject(data.toString());
    });

    python.on("close", (code) => {
      if (code === 0) {
        resolve(parseFloat(result.trim()));
      } else {
        reject("Prediction failed. Check logs for details.");
      }
    });
  });
};
