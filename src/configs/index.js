import dotenv from "dotenv";

dotenv.config();

export default {
  openaiKey: process.env.OPENAI_API_KEY,
  telegramKey: process.env.TELEGRAM_API_KEY
};
