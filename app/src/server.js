import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigin = process.env.ALLOWED_ORIGIN;

app.use(helmet());

app.use(cors({
  origin: allowedOrigin
}));

app.use(express.json());

app.get("/status", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "lacrei-devops-api",
    timestamp: new Date().toISOString()
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Lacrei Saúde DevOps Challenge"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
