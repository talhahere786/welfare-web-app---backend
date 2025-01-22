import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const predictDonation = (req, res) => {
  const { city, year, month } = req.body;

  // Absolute path to the predict.py file
  const pythonScriptPath = path.join(__dirname, "../predict.py");

  // Spawn the Python process with arguments
  const python = spawn("python", [pythonScriptPath, city, year, month]);

  let result = "";
  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(`Error: ${data}`);
  });

  python.on("close", (code) => {
    if (code === 0) {
      res.json({ predictedDonation: parseFloat(result.trim()) });
    } else {
      res
        .status(500)
        .json({ error: "Prediction failed. Check logs for details." });
    }
  });
};
