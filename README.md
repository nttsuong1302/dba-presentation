# Le Métier de DBA 🐘

Présentation interactive du métier d'**Administrateur de Bases de Données (DBA)**, conçue pour un public débutant (lycée), avec un focus sur l'**automatisation** et l'**industrialisation** (scripts, Ansible).

Par **Thu Tuyet Suong NGUYEN** — Squad SGBD, CDC Informatique.

## 🌐 Les pages en ligne (GitHub Pages)

| Page | Lien | Description |
|------|------|-------------|
| 🎤 Présentation | [presentation.html](https://nttsuong1302.github.io/dba-presentation/presentation.html) | La présentation complète (38 slides reveal.js) : données, BDD, SQL, missions du DBA, cloud, scripts, Ansible, industrialisation — avec quiz interactifs |
| 🎮 Mission DBA (jeu) | [missiondba.html](https://nttsuong1302.github.io/dba-presentation/missiondba.html) | Jeu de simulation : un terminal simulé pour installer PostgreSQL, créer une base, gérer un utilisateur, requêter, sauvegarder, écrire un script dans vi et un playbook Ansible. Avec score et badges ! |
| 🏠 Accueil du projet | [index.html](https://nttsuong1302.github.io/dba-presentation/) | La page d'accueil : description du projet et liens vers la présentation et le jeu |

## 📂 Contenu du dépôt

- `presentation.html` — la présentation web (reveal.js, autonome)
- `missiondba.html` — le jeu interactif « Mission DBA » (HTML/CSS/JS, sans dépendance)
- `index.html` — la page d'accueil du projet
- `make_pptx.js` — script Node.js (pptxgenjs) qui génère la version PowerPoint
- `dba_presentation.pptx` — la présentation au format PowerPoint

## 🛠️ Régénérer le PowerPoint

```bash
npm install -g pptxgenjs
NODE_PATH=$(npm root -g) node make_pptx.js
```

## 🎮 Jouer à plusieurs

Le jeu est une simple page web statique : chaque participant·e ouvre le lien sur son propre appareil (ordinateur ou téléphone) et joue à son rythme. Aucune installation, aucun compte.
