module.exports = async (sock, msg) => {
    const jid = msg.key.remoteJid
    await sock.sendMessage(jid, { react: { text: "🥷", key: msg.key } })
}