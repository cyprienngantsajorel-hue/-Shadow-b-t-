module.exports = {
  name: "save",
  execute: async (msg, args) => {
    return `💾 Données sauvegardées: ${args.join(" ")}`;
  }
};