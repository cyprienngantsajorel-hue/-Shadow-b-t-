module.exports = async (sock, jid) => {
await sock.sendMessage(jid, {
text: "MENU",
buttons: [
{ buttonId: ".menu", buttonText: { displayText: "MENU" }, type: 1 }
]
})
}
