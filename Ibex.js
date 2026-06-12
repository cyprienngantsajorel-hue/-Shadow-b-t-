const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
const Pino = require("pino")
const fs = require("fs")
const config = require("./config.json")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session")

    const sock = makeWASocket({
        logger: Pino({ level: "silent" }),
        printQRInTerminal: true,
        auth: state
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            ""

        if (text === ".menu") {
            await sock.sendMessage(msg.key.remoteJid, {
                text: `
🌑🎭 *Shadow bøt* 🥷🌹🪽

📌 Commandes :
.menu
.ping
.owner
            `
            })
        }

        if (text === ".ping") {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "🥷 Shadow bøt est actif ✔️"
            })
        }

        if (text === ".owner") {
            await sock.sendMessage(msg.key.remoteJid, {
                text: "👑 Créateur : Joerl Art Tech"
            })
        }
    })
}

startBot()