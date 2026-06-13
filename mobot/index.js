// ===============================
// 🌑🎭 SHADOW BOT 🥷🌹🪽
// Bot WhatsApp avec Baileys
// Créé par Jorel
// ===============================

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const Pino = require("pino");

// 🔥 INFOS DU BOT
const BOT_INFO = {
  name: "🌑🎭 shadow bøt 🥷🌹🪽",
  owner: "Jorel",
  version: "1.0.0",
  prefix: "."
};

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    logger: Pino({ level: "silent" }),
    auth: state,
    printQRInTerminal: true, // QR code dans le terminal
    browser: ["Shadow Bot", "Chrome", "1.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
      console.log(`✅ ${BOT_INFO.name} est connecté`);
    }

    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;

      if (reason !== DisconnectReason.loggedOut) {
        console.log("🔄 Reconnexion...");
        startBot();
      } else {
        console.log("❌ Déconnecté (logout WhatsApp)");
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const jid = msg.key.remoteJid;
    const text =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text;

    if (!text) return;

    // 📌 COMMANDE .info
    if (text === `${BOT_INFO.prefix}info`) {
      await sock.sendMessage(jid, {
        text:
`🤖 ${BOT_INFO.name}

👤 Créateur : ${BOT_INFO.owner}
📦 Version : ${BOT_INFO.version}
⚙️ Préfixe : ${BOT_INFO.prefix}

✅ Bot actif et opérationnel`
      });
    }
  });
}

// 🚀 Démarrage
startBot();