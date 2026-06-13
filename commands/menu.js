module.exports = {
  name: "menu",

  execute: async () => {
    return `
📋 MENU BOT

🔧 COMMANDES GÉNÉRALES
- .url
- .uptime
- .tag
- .ping
- .img
- .pp
- .save
- .groupe

🛡️ MODÉRATION
- .kick @user → expulser un membre
- .warn @user → avertissement
- .mute @user → bloquer messages
- .unmute @user → débloquer messages
- .blacklist → bloquer un utilisateur du bot

🚨 PROTECTION AUTOMATIQUE
- .antispam ON/OFF → anti-spam automatique
- détection flood (messages rapides)
- suppression messages suspects
- expulsion automatique après abus

🔒 FILTRE CONTENU
- suppression liens suspects
- blocage mots dangereux
- suppression messages inappropriés (selon liste définie)

ℹ️ INFO
- .menu
`;
  }
};