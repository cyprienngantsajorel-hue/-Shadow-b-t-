module.exports = {
    name: "Shadow Crew",
    owner: "Joerl Art Tech",
    
    members: [
        "👑 Owner",
        "🥷 Admin",
        "🌑 Developer",
        "🎭 Support",
        "🪽 Helper"
    ],

    description: "Crew officiel de 🌑🎭 Shadow bøt 🥷🌹🪽",

    info() {
        return `
🌑🎭 *SHADOW CREW* 🥷🌹🪽

👑 Owner : ${this.owner}

👥 Membres :
${this.members.map(m => "• " + m).join("\n")}

📌 Statut : Actif ✔️
`
    }
}