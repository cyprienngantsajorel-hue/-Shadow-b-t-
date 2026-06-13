module.exports = async (sock, jid) => {
await sock.sendMessage(jid, { text: "❄️ FREEZE ACTIVE" })
}
