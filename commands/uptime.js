module.exports = {
  name: "uptime",
  execute: async (msg, args, startTime) => {
    const uptime = Date.now() - startTime;
    return `Uptime: ${Math.floor(uptime / 1000)} secondes`;
  }
};