import OpenAI from "openai";
import configs from "../configs/index.js";

const openai = new OpenAI({
  apiKey: configs.openaiKey,
});

export default openai;
