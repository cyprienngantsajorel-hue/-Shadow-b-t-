const pendingUsers = new Set();
const authorizedUsers = new Set();

// 🔑 TON CODE SECRET
const SECRET_CODE = "Jorelart2011";

module.exports = {
  name: "access-control",

  // 📩 demande d’accès
  requestAccess: async (msg) => {
    const user = msg.sender;

    pendingUsers.add(user);

    return `📩 Demande envoyée au propriétaire.
Attends la validation pour utiliser le bot.`;
  },

  // 👑 validation avec code secret
  validate: async (msg, args) => {
    const user = msg.sender;
    const code = args[0];

    if (!pendingUsers.has(user)) {
      return "❌ Aucune demande en attente.";
    }

    if (code === SECRET_CODE) {
      authorizedUsers.add(user);
      pendingUsers.delete(user);

      return "🟢 Accès autorisé ! Tu peux maintenant utiliser le bot.";
    }

    return "🔴 Code incorrect. Accès refusé.";
  },

  // 🔒 vérification globale
  checkAccess: (msg) => {
    return authorizedUsers.has(msg.sender);
  }
};