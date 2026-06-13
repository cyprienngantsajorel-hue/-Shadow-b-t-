module.exports = {
  name: "security-alert",

  execute: async (msg, client) => {
    if (!msg.isGroup) return;

    const text = (msg.body || "").toLowerCase();

    let riskLevel = 0;

    // ⚠️ mots à risque
    const riskyWords = ["spam", "hack", "scam", "nude", "leak", "fake", "fraud"];

    riskyWords.forEach(word => {
      if (text.includes(word)) riskLevel++;
    });

    // ⚠️ lien suspect
    if (text.includes("http") || text.includes("bit.ly") || text.includes("grabify")) {
      riskLevel += 2;
    }

    // ⚠️ spam massif (mentions)
    if (msg.mentionedJid && msg.mentionedJid.length > 5) {
      riskLevel += 2;
    }

    // 🚨 ALERTE BOT OWNER
    if (riskLevel >= 3) {
      await client.sendMessage(msg.chat, {
        text: `🚨 Alerte sécurité :
Activité suspecte détectée dans ce groupe.
Risque de signalement élevé.`
      });
    }
  }
};