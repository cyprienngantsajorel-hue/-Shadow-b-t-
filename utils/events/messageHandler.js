const menu = require("./digixv")
const fancy = require("./fancy")
const style = require("./messageStyle")
const tools = require("./digixNew")
const creator = require("./digixCreator")
const config = require("../config.json")

module.exports = async (sock, msg) => {
    try {
        if (!msg.message) return

        const jid = msg.key.remoteJid
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            ""

        if (!text.startsWith(config.prefix)) return

        const command = text.slice(1).trim().toLowerCase()

        switch (command) {
            case "menu":
                await sock.sendMessage(jid, {
                    text: style.header(config.botName) + menu() + style.footer
                })
                break

            case "ping":
                await sock.sendMessage(jid, {
                    text: tools.ping()
                })
                break

            case "owner":
                await sock.sendMessage(jid, {
                    text: tools.owner(creator.name)
                })
                break

            case "stylish":
                await sock.sendMessage(jid, {
                    text: fancy("Shadow bøt est actif")
                })
                break
        }

    } catch (err) {
        console.log("MessageHandler Error:", err)
    }
}