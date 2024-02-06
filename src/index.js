import express from "express";
import cors from "cors";
import openai from "./libs/openai.js";
import bot from "./libs/bot.js";

const app = express();
const port = 9000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const params = {
      messages: [{ role: "user", content: req.query.msg }],
      model: "gpt-3.5-turbo",
    };

    const chatCompletion = await openai.chat.completions.create(params);

    return res.send({
      data: {
        message: chatCompletion.choices[0].message.content,
      },
    });
  } catch (error) {
    return res.json({
      errors: {
        message: error.error.message,
      },
    });
  }
});

bot.onText(/\/tanya (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const command = match[1];

  try {
    const params = {
      messages: [{ role: "user", content: command }],
      model: "gpt-3.5-turbo",
    };

    const chatCompletion = await openai.chat.completions.create(params);

    bot.sendMessage(chatId, chatCompletion.choices[0].message.content);
  } catch (error) {
    bot.sendMessage(chatId, error.error.type);
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.startsWith("/tanya")) {
    return;
  }

  const defaultResponse =
    "Selamat datang di Tanyakanai Bot, anda bisa bertanya apa saja dengan menggunakan perintah /tanya pertanyaanmu";

  bot.sendMessage(chatId, defaultResponse);
});

app.listen(port, () => console.log(`Tanyakan AI listening on port ${port}!`));
