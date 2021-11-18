import { Telegraf } from "telegraf";

const tg = new Telegraf(process.env.TG_BOT_TOKEN!)

tg.start((ctx) => ctx.reply("Добро пожаловать!!!"))

tg.launch()