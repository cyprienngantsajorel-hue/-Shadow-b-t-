module.exports = {
  name: "img",
  execute: async (msg, args) => {
    const query = args.join(" ");
    return `🖼️ Recherche image pour: ${query}`;
  }
};