module.exports = {
  name: "tag",
  execute: async (msg) => {
    return `📌 Tag: ${msg.sender}`;
  }
};