import { Telegraf } from "telegraf";

const tg = new Telegraf("2140755676:AAFBxSGQdLhpzgki8kFjRYQISBAuECW0OZo")

tg.start((ctx) => ctx.reply("Добро пожаловать!"))

tg.launch()