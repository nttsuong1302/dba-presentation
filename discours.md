# 🎤 Texte de présentation — Les Métiers de DBA

> Guide oral slide par slide. Les phrases en *italique* sont des suggestions de mots exacts à dire ; le reste est un pense-bête. Durée cible : 30-40 minutes + 15-20 minutes de jeu.

---

## Slide 1 — Titre « Les Métiers de DBA »

*« Bonjour ! Aujourd'hui je vais vous faire découvrir mon métier. Trois lettres mystérieuses : D-B-A. Ne cherchez pas tout de suite sur votre téléphone — justement, gardez-le en main, vous allez en avoir besoin ! »*

- Se présenter très brièvement (prénom seulement, le détail vient à la slide 5).
- Créer le suspense sur les 3 lettres : ne PAS les expliquer maintenant.

## Slide 2 — QR Code & liens

*« Avant de commencer, sortez vos téléphones et scannez ce QR code : vous y trouverez cette présentation et surtout un jeu auquel on jouera à la fin. Gardez l'onglet ouvert ! »*

- Laisser 30 secondes pour scanner. Vérifier que quelques personnes ont réussi.
- Préciser : pas de compte à créer, ça marche sur téléphone.

## Slide 3 — Question : que signifie DBA ?

*« Alors, à votre avis, que veulent dire ces 3 lettres ? Lancez vos idées, il n'y a pas de mauvaise réponse ! »*

- Laisser 1-2 minutes de discussion. Relancer avec les pistes affichées si silence.
- Valoriser toute réponse approchante (« données », « administrateur », « base »...).

## Slide 4 — Réponse : D-B-A

*« DBA, c'est DataBase Administrator : Administrateur ou Administratrice de Bases de Données. D comme Data, les données. B comme Base, l'endroit où on les range. Et A comme la personne qui s'en occupe : moi ! »*

- Pointer chaque lettre en la disant.

## Slide 5 — Qui suis-je ?

*« Je suis DBA : je veille chaque jour à ce que les bases de données fonctionnent, soient sécurisées et rapides. Je travaille dans une équipe qu'on appelle la squad SGBD, et ma spécialité, c'est l'automatisation — on va voir ensemble ce que ça veut dire. »*

- Ajouter une anecdote personnelle si possible (depuis combien de temps, ce que tu préfères).

## Slide 6 — Au programme

*« Deux parties aujourd'hui : d'abord on découvre le métier ensemble, avec des questions tout au long — participez ! Ensuite, c'est vous qui jouerez : vous deviendrez DBA dans un jeu de simulation. »*

- Insister : on peut interrompre pour poser des questions à tout moment.

## Slide 7 — C'est quoi une donnée ?

*« Tout part de là : une donnée, c'est une information brute qu'un ordinateur peut enregistrer. Un nombre, un texte, une date. Regardez le schéma : à chaque fois que vous utilisez votre téléphone, l'information voyage et finit stockée quelque part — c'est devenu une donnée. »*

- Lire le fun fact : 90 % des données mondiales créées ces 2 dernières années. Marquer une pause d'effet.

## Slide 8 — Question : tes données au quotidien

*« À vous : quelles données générez-vous, vous, dans une journée normale ? »*

- Attendre des exemples : messages, photos, likes, historique YouTube, notes au lycée, carte de cantine...
- Conclure : *« Tout ça doit être rangé quelque part... mais où ? »*

## Slide 9 — C'est quoi une base de données ?

*« Une base de données, c'est un endroit organisé pour stocker et retrouver des informations très vite. Imaginez une fiche, rangée dans une étagère, dans une grande bibliothèque : c'est exactement ça. La preuve de la puissance : retrouver 1 information parmi 10 millions prend moins d'une milliseconde. »*

- Montrer la table « Élèves » : lignes et colonnes, comme un tableau.
- Lire le fun fact YouTube.

## Slide 10 — Le moteur (SGBD)

*« Mais une bibliothèque sans bibliothécaire, ce ne sont que des étagères muettes. Le moteur — on dit SGBD — c'est le bibliothécaire : c'est lui qui range, retrouve et protège les données. »*

*« Et il existe plusieurs "bibliothécaires" : les distributions. Tous savent gérer la bibliothèque de la même façon — PostgreSQL — mais chacun a sa spécialité : la sécurité, les très grandes bibliothèques, le cloud. »*

- Citer les 3 distributions affichées sans trop détailler.

## Slide 11 — La structure d'une BDD

*« Comment c'est organisé à l'intérieur ? Comme la bibliothèque du lycée : des étages par matière (les schémas), des étagères (les tables), des casiers étiquetés (les colonnes), un catalogue pour trouver vite (les index)... »*

- Passer les 6 cartes rapidement, insister sur table/colonne/index (les 3 essentiels).
- Conclure avec le bandeau : sans organisation = chercher un livre dans un tas en vrac.

## Slide 12 — La BDD au cœur de l'informatique

*« La base de données ne vit pas seule. Suivez le chemin : une application pose une question, la demande voyage sur le réseau, le serveur la reçoit, et la base de données répond — puis la réponse refait le chemin inverse. Tout ça en quelques millisecondes. »*

- Suivre le schéma du doigt, étape par étape, dans l'ordre.
- Fun fact du message qui traverse une dizaine de machines.

## Slide 13 — SQL

*« Comment parle-t-on à une base de données ? Dans sa langue : le SQL. C'est comme poser une question au bibliothécaire. Quatre verbes à retenir : SELECT pour lire, INSERT pour ajouter, UPDATE pour modifier, DELETE pour supprimer. »*

- Lire la requête exemple à voix haute en la traduisant : *« Donne-moi le nom et la note des élèves de 2nde A, classés de la meilleure à la moins bonne note. »*
- Montrer le résultat : Clara 18, Alice 17.

## Slide 14 — Quiz : à quoi sert une BDD ?

- Faire voter à main levée pour A, B, C, D avant de cliquer.
- Cliquer sur la réponse votée majoritairement, puis révéler la bonne (B).

## Slide 15 — Le DBA, gardien des données

*« Maintenant que vous savez ce qu'est une base de données, voici mon métier : Administrateur ou Administratrice des données. Quatre casquettes : la technique, la sécurité, la performance et la disponibilité — il faut que ça marche 24h/24. »*

## Slide 16 — Les compétences

*« Qu'est-ce qu'il faut savoir faire ? Côté technique : le SQL bien sûr, Linux et Windows, du développement pour automatiser, et comprendre l'ensemble du système d'information. Mais surtout, côté humain : de la rigueur — une erreur peut coûter très cher — du sang-froid quand tout tombe en panne, et de la curiosité, parce que la technologie change tout le temps. »*

- Insister : pas besoin d'être « un génie des maths », la rigueur et la curiosité comptent plus.

## Slide 17 — Quiz : rôle principal du DBA

- Même rituel : vote à main levée puis révélation (réponse C).

## Slide 18 — Où est la BDD dans le système d'information ?

*« Avant de voir mes missions, situons mon terrain de jeu. Suivez la chaîne : les utilisateurs, les applications, le réseau, les serveurs... et tout au fond, la base de données. C'est la couche la plus profonde : si elle tombe, TOUT tombe. C'est pour ça que mon métier existe. »*

- Mentionner les « voisins » : développeurs, administrateurs réseau et système — on travaille ensemble.

## Slides 19 à 24 — Les 6 missions (une par slide)

Pour chaque mission, même rituel en 3 temps : la métaphore (bibliothèque), le schéma (4 étapes), puis 1 ou 2 actions concrètes.

1. **Installation & Configuration** — *« Comme aménager une nouvelle bibliothèque avant l'ouverture. »* Suivre le schéma : installer → configurer → tester → prêt.
2. **Sauvegarde & Restauration** — *« LA règle d'or du métier : toujours une copie de secours. Et on TESTE les restaurations — une sauvegarde jamais testée, c'est comme un parachute jamais plié. »*
3. **Accès & Sécurité** — *« Chacun son badge, chacun ses portes. La réserve des livres précieux reste fermée. »*
4. **Optimisation** — *« Une requête lente, c'est un livre introuvable. On analyse, on crée un index, et hop : 100 fois plus rapide. »*
5. **Supervision** — *« Le gardien fait sa ronde : des capteurs surveillent tout, une alerte sonne, le DBA intervient — parfois la nuit ! »*
6. **Migration** — *« Déménager la bibliothèque sans fermer un seul jour et sans perdre un seul livre. »*

## Slide 25 — Quiz : pourquoi les sauvegardes ?

- Vote puis révélation (réponse B). Rappeler la métaphore du parachute.

## Slide 26 — 🔥 Vendredi, 17h59... le problème

*« Imaginez : vendredi, 17h59, une faille de sécurité critique est découverte. Il faut mettre à jour 200 bases de données avant lundi. À la main, ça fait 20 minutes par serveur : 66 heures sans dormir. Mission impossible ! Mais automatisé : 30 minutes, avec un rapport complet. »*

- C'est LE pivot de la présentation : prendre son temps, jouer la dramatisation.

## Slide 27 — Pourquoi automatiser ?

*« Ce scénario n'est pas exceptionnel. Hier un DBA gérait 5 bases, aujourd'hui des centaines. Les applications ne s'arrêtent jamais. Et l'erreur humaine ne pardonne pas. L'automatisation n'est pas un luxe : c'est une question de survie. »*

## Slide 28 — Les vagues informatiques

*« D'où vient ce changement d'échelle ? Remontons le temps : les gros ordinateurs des années 60, le PC, la virtualisation, le cloud, et maintenant Kubernetes et les conteneurs, et l'IA qui arrive. À chaque vague, le DBA a dû apprendre de nouveaux outils — c'est ça qui rend ce métier vivant. »*

- Passer vite sur chaque colonne, insister sur les 2 dernières (2020+ et 2025+).

## Slide 29 — Les tâches répétitives

*« Concrètement, qu'est-ce qu'on automatise ? Regardez ce tableau : des sauvegardes chaque nuit sur 50 serveurs, des vérifications chaque heure sur 100 serveurs... Tout ce qui se répète à l'identique est un candidat parfait pour l'automatisation. »*

## Slide 30 — Quiz : quelle tâche automatiser ?

- Vote puis révélation (réponse B). Souligner le critère : répétitif + nocturne + nombreux serveurs.

## Slide 31 — La méthode des scripts

*« Première façon d'automatiser : écrire un script. Regardez ce petit script de sauvegarde : quelques lignes, et la sauvegarde se fait toute seule. C'est simple, gratuit, flexible. Mais il y a des pièges... »*

- Lire les inconvénients, et expliquer le mot **idempotent** avec l'encadré jaune : *« exécuter 1 fois ou 10 fois doit donner le même résultat — un script Bash, lui, plante si on le relance. »*

## Slide 32 — Les scripts en images

*« Trois images pour bien comprendre : le script, c'est un pense-bête écrit pour TA bibliothèque — ailleurs il échoue. C'est un stagiaire qui obéit aveuglément — il ajoute un exemplaire même s'il y en a déjà dix. Et c'est prévenir 100 bibliothèques par courrier, une par une. »*

- Finir sur la question : *« Et s'il existait un outil qui vérifie avant d'agir et parle à 1000 serveurs en même temps ? »*

## Slide 33 — Quiz : le problème des scripts

- Vote puis révélation (réponse B).

## Slide 34 — Ansible

*« Cet outil existe : Ansible. La grande différence : un script dit "exécute ces commandes", Ansible dit "voilà l'état que je veux : PostgreSQL doit être installé et démarré" — et il vérifie, et ne corrige que si nécessaire. C'est l'idempotence. En plus : un seul playbook pour 1000 serveurs, et c'est lisible par toute l'équipe. »*

- Montrer le playbook : faire remarquer qu'on comprend presque tout même sans être informaticien.

## Slide 35 — Ansible vs Script : cas concrets

*« Comparons sur de vrais cas. Sauvegarder 50 bases chaque nuit : avec des scripts, 50 copies à maintenir ; avec Ansible, un playbook et un rapport clair. Un patch de sécurité urgent — rappelez-vous le vendredi 17h59 ! — : des heures à la main, quelques minutes avec Ansible, et tout est tracé. »*

## Slide 36 — Quiz : Ansible vs Bash

- Vote puis révélation (réponse B). C'est la notion la plus importante de la fin de présentation.

## Slide 37 — L'industrialisation

*« Dernière étape : l'industrialisation. Imaginez un grand réseau de bibliothèques toutes organisées exactement pareil : un lecteur retrouve ses repères partout. En informatique c'est pareil : standardiser, reproduire, mettre la configuration en code, déployer en continu. »*

- Suivre le schéma des 4 piliers avec le doigt.

## Slides 38-39 — L'industrialisation en détail

- Pour chaque pilier : lire la définition, puis raconter l'exemple en italique comme une mini-histoire.
- Le plus parlant pour le public : la **reproductibilité** (*« fini le "ça marche chez moi !" »*) et le **déploiement continu** (*« changement à 14h00, 200 serveurs à jour à 14h10 »*).

## Slide 40 — Quiz : l'industrialisation

- Vote puis révélation (réponse B).

## Slide 41 — Conclusion

*« Récapitulons : une donnée, une base de données, le DBA qui les gère et les protège, et l'automatisation devenue indispensable — des scripts à Ansible jusqu'à l'industrialisation. »*

*« Et maintenant... à vous de jouer ! Reprenez le lien du QR code et lancez Mission DBA : le lycée s'est fait hacker, et c'est VOUS la DBA qui allez tout sauver. Bonne chance ! »*

- Lancer le jeu, circuler pour aider, comparer les scores à la fin. 🏆

---

## 💡 Conseils généraux

- **Rythme** : ~45 secondes par slide de contenu, 1-2 minutes par question ouverte et par quiz.
- **Quiz** : toujours faire voter à main levée AVANT de cliquer — c'est ce qui rend la salle vivante.
- **Métaphore fil rouge** : la bibliothèque. Si quelqu'un décroche, toujours ramener à la bibliothèque, au bibliothécaire, aux badges.
- **Le pivot émotionnel** : la slide « Vendredi 17h59 » — c'est là que le public doit ressentir POURQUOI l'automatisation existe.
- **Si une question dépasse** : noter la question, promettre d'y répondre à la fin, ne pas casser le rythme.
