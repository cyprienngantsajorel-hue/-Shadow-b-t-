          `${cœurs}\n` +
          ⚠️ *Avertissement${avertit}/3*\n` +
          `❌ _Encore${restant}privilège(s) = expulsion !_\n\n` +
          `_Propulsé par 🌑🎭 shadow 🥷🌹🪽`,
        mentions:[expéditeur],
      }).attraper(() => {});
    }
    retour;
  }
}
    
 
    // ✅ menuSessions global — déclaré ici directement !
si (!mondial.menuSéances) mondial.menuSéances = nouveau Carte();
const menuSéances = mondial.menuSéances;
// ✅ Gère réponse liste interactive !
const identifiant sélectionné = message.message?.listResponseMessage?.réponse à sélection unique?.identifiant de ligne sélectionnée;
si (identifiant sélectionné?.commence par("chat_") && mondial.menuSéances.a(depuis)) {
  const catKey = identifiant sélectionné.remplacer("chat_", "");
  const session = mondial.menuSéances.obtenir(depuis);
  const catégories = session?.catégories || {};
  mondial.menuSéances.supprimer(depuis);
  const chat = {
    groupe:{ emoji:"👥", nom:"GROUPE" },
    "médias":{ emoji:"🎬", nom:"MÉDIAS" },
    "téléchargement":{ emoji:"📥", nom:"TÉLÉCHARGEMENTS" },
    amusant:{ emoji:"🎮", nom:"FUN & JEUX" },
    propriétaire:{ emoji:"👑", nom:"PROPRIÉTAIRE" },
    "général":{ emoji:"🔧", nom:"GÉNÉRAL" },
  }[catKey];
  const commandes = catégories[catKey] || [];
  laisser texte =
    `╔═════════════════════════════╗\n` +
    `║  ${chat?.emoji}*${chat?.nom}*\n` +
    `╚═════════════════════════════╝\n\n`;
  pour (const c de commandes) {
    texte += `├ *${configuration.préfixe}${c.cmd}*\n`;
    texte += `│ _${c.desc}_\n\n`;
  }
  texte += `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
  texte += `_Tape${configuration.préfixe}menu pour revenir_ 🔙`;
  attendre chaussette.envoyerMessage(depuis, {texte}, { cité:message });
  retour;
}
const isMenuRéponse = FAUX;
// ✅ Quiz — rejoignez-nous, nouveaux et ABCD !
const isQuizAction =
  corps.garniture().en minuscules() === "rejoindre" ||
  corps.garniture().en minuscules() === "nouveau" ||
  (["UN","B","C","D"].comprend(corps.garniture().en majuscules()) &&
  mondial.salles de quiz?.a(depuis));
si (isQuizAction) {
  si (plugins.a("questionnaire")) {
    essayer {
      attendre plugins.obtenir("questionnaire").exécuter({
        chaussette,message,depuis, arguments:[],
        corps,expéditeur,numéro de l'expéditeur,
        estPropriétaire,isGroup,Métadonnées du groupe,
        l'expéditeur est administrateur,paramètres,plugins,
        menuSéances,
      });
    } attraper (se tromper) {
      console.erreur("❌ quiz :", se tromper.message);
    }
  }
  retour;
}
      si (paramètres.mode === "privé" && !estPropriétaire && !estCréateur) retour;
      
    si (!corps.commence par(configuration.préfixe)) retour;
    const arguments = corps.tranche(configuration.préfixe.longueur).garniture().diviser(/\s+/);
    const commande = arguments.changement().en minuscules();
    console.enregistrer(`📩 [${numéro de l'expéditeur}] →${configuration.préfixe}${commande}${isGroup?" (groupe)":" (privé)"}`);
    si (plugins.a(commande)) {
      essayer {
        attendre plugins.obtenir(commande).exécuter({
          chaussette,message,depuis,arguments,corps,
          expéditeur,numéro de l'expéditeur,
          estPropriétaire,estCréateur,isGroup,
          Métadonnées du groupe,l'expéditeur est administrateur,
          paramètres,plugins,
            menuSéances,
        });
      } attraper (se tromper) {
        console.erreur(`❌ Plugin [${commande}] :`, se tromper.message);
        attendre chaussette.envoyerMessage(depuis, {
          texte:`❌ Erreur dans *${configuration.préfixe}${commande}*`,
        }, { cité:message });
      }
    } autre {
      attendre chaussette.envoyerMessage(depuis, {
        texte:`❓ *${configuration.préfixe}${commande}* Inconnu.\nBande *${configuration.préfixe}menu* pour les commandes.`,
      }, { cité:message });
    }
  });
}
démarrerBot().attraper(se tromper => {
  console.erreur("❌ Erreur fatale :", se tromper.message);
  processus.sortie(1);
});
