const blacklistedGroups = [];

module.exports = {
  name: "group-blacklist",

  addGroup: (groupId) => {
    if (!blacklistedGroups.includes(groupId)) {
      blacklistedGroups.push(groupId);
    }
  },

  removeGroup: (groupId) => {
    const index = blacklistedGroups.indexOf(groupId);
    if (index !== -1) blacklistedGroups.splice(index, 1);
  },

  isBlacklisted: (groupId) => {
    return blacklistedGroups.includes(groupId);
  },

  execute: async (msg, client) => {
    if (!msg.isGroup) return;

    const groupId = msg.chat;

    // 🚫 si groupe blacklisté → bot ignore tout
    if (blacklistedGroups.includes(groupId)) {
      return;
    }

    const text = (msg.body || "").toLowerCase();

    // 🔒 détection contenu interdit (basique)
    const badWords = ["nude", "xxx", "porn", "leak", "explicit"];

    const isBad = badWords.some(w => text.includes(w));

    if (isBad) {
      try {
        // ❌ supprimer message
        await client.sendMessage(msg.chat, {
          delete: msg.key
        });

        // 🚫 option forte : expulser utilisateur
        await client.groupParticipantsUpdate(
          msg.chat,
          [msg.sender],
          "remove"
        );

        // 📌 option : blacklist groupe si abus répété
        this.addGroup(groupId);

        await client.sendMessage(msg.chat, {
          text: "🚫 Groupe mis en quarantaine pour contenu interdit."
        });

      } catch (e) {
        console.log("Group blacklist error:", e);
      }
    }
  }
};