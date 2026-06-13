module.exports = {
  name: "ping",
  execute: async () => {
    const latency = Math.floor(Math.random() * 100);
    return `🏓 Pong! ${latency}ms`;
  }
};