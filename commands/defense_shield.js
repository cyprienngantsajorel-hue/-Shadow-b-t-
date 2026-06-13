const blacklist = new Set();
const alerts = {};

module.exports = {
  name: "defense-shield",

  // 🚫 ban interne
  ban: (user) => {
    blacklist.add(user);
  },

  isBanned: (user) => {
    return blacklist.has(user);
  },

  // 🛡️ protection automatique
  protect: async (msg, client) => {
    if (!msg.isGroup) return;

    const user = msg.sender;
    const text = (msg.body || "").toLowerCase();

    // 🚫 ignorer utilisateurs bannis
    if (blacklist.has(user)) return;

    // ⚠️ mots suspects
    const risky = ["hack", "scam", "nude", "porn", "virus", "attack"];

    let risk = 0;
    risky.forEach(w => {
      if (text.includes(w)) risk++;
    });

    if (risk >= 2) {
      alerts[user] = (alerts[user] || 0) + 1;

      // ❌ suppression message
      try {
        await client.sendMessage(msg.chat, { delete: msg.key });
      } catch (e) {}

      // 🚫 sanction progressive
      if (alerts[user] >= 3) {
        blacklist.add(user);

        try {
          await client.groupParticipantsUpdate(
            msg.chat,
            [user],
            "remove"
          );
        } catch (e) {}

        await client.sendMessage(msg.chat, {
          text: "🛡️ Utilisateur bloqué pour sécurité du groupe."
        });
      }
    }
  }
};