// ibex.js
// Connexion WhatsApp pour bot (Baileys)

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const Pino = require("pino");

async function startIbex() {
  const { state, saveCreds } = await useMultiFileAuthState("./ibex_auth");

  const sock = makeWASocket({
    printQRInTerminal: true, // affiche le QR code
    auth: state,
    logger: Pino({ level: "silent" }),
    browser: ["IbexBot", "Chrome", "1.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      console.log("❌ Connexion fermée. Reconnexion :", shouldReconnect);
      if (shouldReconnect) startIbex();
    } else if (connection === "open") {
      console.log("✅ Ibex Bot connecté à WhatsApp avec succès !");
    }
  });

  // Réception