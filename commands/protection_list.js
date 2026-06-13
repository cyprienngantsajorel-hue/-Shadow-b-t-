const protectedNumbers = new Set();

module.exports = {
  name: "protect",

  // ➕ ajouter un numéro protégé
  add: (msg, args) => {
    const number = args[0];

    if (!number) return "❌ Donne un numéro (ex: 242xxxxxxx)";

    protectedNumbers.add(number);

    return `🛡️ ${number} ajouté à la liste protégée.`;
  },

  // ➖ retirer protection
  remove: (msg, args) => {
    const number = args[0];

    protectedNumbers.delete(number);

    return `🚫 ${number} retiré de la liste protégée.`;
  },

  // 🔍 vérifier protection
  isProtected: (number) => {
    return protectedNumbers.has(number);
  }
};