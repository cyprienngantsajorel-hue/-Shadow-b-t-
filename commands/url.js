module.exports = {
  name: "url",
  description: "Gère les liens URL",
  execute: async (msg, args) => {
    const url = args.join(" ");
    return `🔗 URL reçue: ${url}`;
  }
};