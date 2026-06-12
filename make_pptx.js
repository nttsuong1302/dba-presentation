const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Le Métier de DBA";

// ── Palette ───────────────────────────────────────────────────
const DARK       = "1E1B4B";
const LIGHT      = "F4F3FF";
const PURPLE     = "6D28D9";
const PURPLE_L   = "EDE9FE";
const PURPLE_MID = "A78BFA";
const PINK       = "DB2777";
const PINK_L     = "FCE7F3";
const YELLOW     = "F59E0B";
const YELLOW_L   = "FEF3C7";
const WHITE      = "FFFFFF";
const MUTED      = "6B7280";
const GREEN      = "059669";
const GREEN_L    = "D1FAE5";
const TEAL       = "0E7490";
const TEAL_L     = "CFFAFE";
const ORANGE     = "EA580C";
const ORANGE_L   = "FFEDD5";
const QCM_BG     = "0F0C29";

const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.10 });

// ── Helpers ───────────────────────────────────────────────────
function slideTitle(slide, text, color) {
  slide.addText(text, {
    x: 0.5, y: 0.18, w: 9.0, h: 0.62,
    fontSize: 27, bold: true, color: color || DARK,
    fontFace: "Calibri", valign: "middle", margin: 0
  });
}

// QCM slide — correct answer marked with ⭐ (présentateur peut pointer)
function addQCM(question, opts, correctIdx) {
  const s = pres.addSlide();
  s.background = { color: QCM_BG };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.52, fill: { color: PINK }, line: { color: PINK } });
  s.addText("❓  QUESTION", { x: 0, y: 0, w: 10, h: 0.52, fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle", charSpacing: 2, margin: 0 });

  s.addText(question, { x: 0.6, y: 0.65, w: 8.8, h: 0.95, fontSize: 17, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });

  const letters = ["A", "B", "C", "D"];
  const bgColors = ["3730A3", "065F46", "92400E", "6B21A8"];
  const positions = [[0.4, 1.75], [5.2, 1.75], [0.4, 3.35], [5.2, 3.35]];

  opts.forEach((opt, i) => {
    const [x, y] = positions[i];
    const isOk = i === correctIdx;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.4, h: 1.3,
      fill: { color: bgColors[i], transparency: isOk ? 0 : 30 },
      line: { color: isOk ? YELLOW : bgColors[i], width: isOk ? 2.5 : 1 },
      shadow: makeShadow()
    });
    s.addShape(pres.shapes.OVAL, { x: x + 0.12, y: y + 0.12, w: 0.68, h: 0.68, fill: { color: WHITE }, line: { color: WHITE } });
    s.addText(letters[i], { x: x + 0.12, y: y + 0.12, w: 0.68, h: 0.68, fontSize: 16, bold: true, color: bgColors[i], align: "center", valign: "middle", margin: 0 });
    s.addText((isOk ? "⭐  " : "") + opt, { x: x + 0.9, y, w: 3.4, h: 1.3, fontSize: 12, color: WHITE, valign: "middle", margin: 0 });
  });

  s.addText("Réfléchis avant de regarder la réponse ⭐", {
    x: 0.5, y: 5.28, w: 9.0, h: 0.25, fontSize: 9.5, color: "6D6A8F", align: "center", margin: 0
  });
  return s;
}

// Question ouverte — discussion avec le public
function addOpenQuestion(question, hints) {
  const s = pres.addSlide();
  s.background = { color: QCM_BG };

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.52, fill: { color: YELLOW }, line: { color: YELLOW } });
  s.addText("💬  À TOI DE RÉPONDRE !", { x: 0, y: 0, w: 10, h: 0.52, fontSize: 11, bold: true, color: DARK, align: "center", valign: "middle", charSpacing: 2, margin: 0 });

  s.addShape(pres.shapes.OVAL, { x: -0.7, y: 3.9, w: 2.5, h: 2.5, fill: { color: PURPLE, transparency: 70 }, line: { color: PURPLE, transparency: 70 } });
  s.addShape(pres.shapes.OVAL, { x: 8.4, y: -0.6, w: 2.3, h: 2.3, fill: { color: PINK, transparency: 70 }, line: { color: PINK, transparency: 70 } });

  s.addText("🤔", { x: 4.1, y: 0.85, w: 1.8, h: 0.9, fontSize: 52, align: "center", valign: "middle", margin: 0 });
  s.addText(question, { x: 1.0, y: 1.9, w: 8.0, h: 1.1, fontSize: 24, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });

  if (hints && hints.length) {
    s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y: 3.3, w: 7.0, h: 0.4 + hints.length * 0.38, fill: { color: WHITE, transparency: 92 }, line: { color: "7C3AED", width: 1 } });
    s.addText("💡 Pistes pour t'aider :", { x: 1.7, y: 3.4, w: 6.6, h: 0.32, fontSize: 11, bold: true, color: YELLOW, margin: 0 });
    hints.forEach((h, i) => {
      s.addText("▸  " + h, { x: 1.7, y: 3.74 + i * 0.38, w: 6.6, h: 0.36, fontSize: 12, color: "C4B5FD", valign: "middle", margin: 0 });
    });
  }
  return s;
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 – Titre
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addShape(pres.shapes.OVAL, { x: -0.8, y: -0.8, w: 3.2, h: 3.2, fill: { color: PURPLE, transparency: 65 }, line: { color: PURPLE, transparency: 65 } });
  s.addShape(pres.shapes.OVAL, { x: 7.8, y: 3.2, w: 3.5, h: 3.5, fill: { color: PINK, transparency: 70 }, line: { color: PINK, transparency: 70 } });
  s.addShape(pres.shapes.OVAL, { x: 4.5, y: -1.0, w: 1.8, h: 1.8, fill: { color: YELLOW, transparency: 75 }, line: { color: YELLOW, transparency: 75 } });

  s.addShape(pres.shapes.RECTANGLE, { x: 3.3, y: 1.35, w: 3.4, h: 0.38, fill: { color: PINK }, line: { color: PINK } });
  s.addText("MÉTIER & TECHNOLOGIES", { x: 3.3, y: 1.35, w: 3.4, h: 0.38, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle", charSpacing: 2, margin: 0 });

  s.addText("Le Métier de", { x: 1, y: 1.85, w: 8, h: 0.6, fontSize: 34, color: "C4B5FD", fontFace: "Calibri", align: "center", margin: 0 });
  s.addText("DBA", { x: 1, y: 2.45, w: 8, h: 1.3, fontSize: 88, bold: true, color: WHITE, fontFace: "Calibri", align: "center", margin: 0 });
  s.addText("Suong NGUYEN  •  2026", { x: 1, y: 5.15, w: 8, h: 0.3, fontSize: 11, color: "C4B5FD", align: "center", margin: 0 });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – Question ouverte : DBA signifie quoi ?
// ═══════════════════════════════════════════════════════════════
addOpenQuestion(
  "À ton avis, que signifient les 3 lettres « DBA » ?",
  ["C'est un métier de l'informatique", "Le « D » et le « B » parlent de là où on range des informations", "Le « A » désigne la personne qui s'en occupe"]
);

// ═══════════════════════════════════════════════════════════════
// SLIDE – Réponse : DBA signifie...
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addShape(pres.shapes.OVAL, { x: -0.7, y: -0.7, w: 2.8, h: 2.8, fill: { color: PURPLE, transparency: 68 }, line: { color: PURPLE, transparency: 68 } });
  s.addShape(pres.shapes.OVAL, { x: 8.3, y: 3.6, w: 2.8, h: 2.8, fill: { color: PINK, transparency: 70 }, line: { color: PINK, transparency: 70 } });

  s.addText("🎉  La réponse !", { x: 0.5, y: 0.4, w: 9.0, h: 0.5, fontSize: 18, bold: true, color: YELLOW, align: "center", margin: 0 });

  // Les 3 lettres
  const letters = [
    { l: "D", word: "Data(base)", fr: "Base de données", color: PURPLE },
    { l: "B", word: "Base",       fr: "L'endroit où sont rangées les données", color: PINK },
    { l: "A", word: "Administrator", fr: "La personne qui administre", color: TEAL },
  ];
  letters.forEach((it, i) => {
    const x = 0.7 + i * 3.0;
    s.addShape(pres.shapes.OVAL, { x: x + 0.85, y: 1.15, w: 1.1, h: 1.1, fill: { color: it.color }, line: { color: it.color }, shadow: makeShadow() });
    s.addText(it.l, { x: x + 0.85, y: 1.15, w: 1.1, h: 1.1, fontSize: 40, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText(it.word, { x, y: 2.38, w: 2.8, h: 0.35, fontSize: 14, bold: true, color: WHITE, align: "center", margin: 0 });
    s.addText(it.fr, { x, y: 2.74, w: 2.8, h: 0.55, fontSize: 10.5, color: "C4B5FD", align: "center", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 1.2, y: 3.6, w: 7.6, h: 0.85, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("DBA = Administrateur de Bases de Données", { x: 1.2, y: 3.6, w: 7.6, h: 0.85, fontSize: 20, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });

  s.addText("Mais qu'est-ce que ça veut dire concrètement ? C'est ce qu'on va découvrir ensemble ! 🚀", {
    x: 0.5, y: 4.75, w: 9.0, h: 0.4, fontSize: 13, italic: true, color: "C4B5FD", align: "center", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – Qui suis-je ?
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Qui suis-je ? 👋");

  // Avatar
  s.addShape(pres.shapes.OVAL, { x: 0.5, y: 1.1, w: 2.3, h: 2.3, fill: { color: PURPLE }, line: { color: PURPLE } });
  s.addText("👩‍💻", { x: 0.5, y: 1.1, w: 2.3, h: 2.3, fontSize: 60, align: "center", valign: "middle", margin: 0 });

  const facts = [
    { icon: "🛡️", title: "DBA — Administratrice de Bases de Données", desc: "Je veille chaque jour sur les bases de données : disponibilité, sécurité, performance.", bg: PURPLE_L, border: PURPLE_MID, tc: PURPLE },
    { icon: "👥", title: "Membre de la squad SGBD", desc: "Je travaille en équipe dans la squad SGBD (Système de Gestion de Bases de Données).", bg: TEAL_L, border: "67E8F9", tc: TEAL },
    { icon: "🤖", title: "Casquette Automatisation", desc: "Ma spécialité : automatiser les tâches répétitives pour gagner du temps et éviter les erreurs.", bg: PINK_L, border: "F9A8D4", tc: PINK },
  ];
  facts.forEach((f, i) => {
    const y = 1.05 + i * 1.18;
    s.addShape(pres.shapes.RECTANGLE, { x: 3.1, y, w: 6.5, h: 1.05, fill: { color: f.bg }, line: { color: f.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(f.icon, { x: 3.18, y, w: 0.85, h: 1.05, fontSize: 26, align: "center", valign: "middle", margin: 0 });
    s.addText(f.title, { x: 4.1, y: y + 0.1, w: 5.4, h: 0.35, fontSize: 13, bold: true, color: f.tc, margin: 0 });
    s.addText(f.desc, { x: 4.1, y: y + 0.48, w: 5.4, h: 0.52, fontSize: 11, color: DARK, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.65, w: 9.1, h: 0.62, fill: { color: DARK }, line: { color: DARK }, shadow: makeShadow() });
  s.addText("🎯  Aujourd'hui, je vais te faire découvrir mon métier et pourquoi l'automatisation est devenue indispensable !", {
    x: 0.65, y: 4.65, w: 8.8, h: 0.62, fontSize: 11.5, color: WHITE, valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – Programme de la présentation
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Au Programme Aujourd'hui 🗺️");

  // Partie 1
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.05, w: 4.4, h: 3.6, fill: { color: PURPLE_L }, line: { color: PURPLE_MID, width: 2 }, shadow: makeShadow() });
  s.addShape(pres.shapes.OVAL, { x: 2.15, y: 1.25, w: 1.1, h: 1.1, fill: { color: PURPLE }, line: { color: PURPLE } });
  s.addText("1", { x: 2.15, y: 1.25, w: 1.1, h: 1.1, fontSize: 36, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
  s.addText("Découverte du métier", { x: 0.6, y: 2.5, w: 4.2, h: 0.4, fontSize: 16, bold: true, color: PURPLE, align: "center", margin: 0 });
  s.addText([
    { text: "▸  Les données, les bases de données, SQL", options: { breakLine: true } },
    { text: "▸  Le métier de DBA et ses missions", options: { breakLine: true } },
    { text: "▸  L'automatisation et l'industrialisation", options: { breakLine: true } },
    { text: "▸  Des questions interactives tout au long ! 💬", options: {} },
  ], { x: 0.85, y: 3.0, w: 3.8, h: 1.5, fontSize: 11.5, color: DARK, paraSpaceAfter: 6, margin: 0 });

  // Partie 2
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.05, w: 4.4, h: 3.6, fill: { color: PINK_L }, line: { color: "F9A8D4", width: 2 }, shadow: makeShadow() });
  s.addShape(pres.shapes.OVAL, { x: 6.8, y: 1.25, w: 1.1, h: 1.1, fill: { color: PINK }, line: { color: PINK } });
  s.addText("2", { x: 6.8, y: 1.25, w: 1.1, h: 1.1, fontSize: 36, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
  s.addText("Jeu de simulation 🎮", { x: 5.25, y: 2.5, w: 4.2, h: 0.4, fontSize: 16, bold: true, color: PINK, align: "center", margin: 0 });
  s.addText([
    { text: "▸  Mets-toi dans la peau d'une DBA !", options: { breakLine: true } },
    { text: "▸  Gère tes bases de données au quotidien", options: { breakLine: true } },
    { text: "▸  Découvre la magie de l'automatisation", options: { breakLine: true } },
    { text: "▸  À toi de jouer ! 🚀", options: {} },
  ], { x: 5.5, y: 3.0, w: 3.8, h: 1.5, fontSize: 11.5, color: DARK, paraSpaceAfter: 6, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.85, w: 9.05, h: 0.5, fill: { color: DARK }, line: { color: DARK }, shadow: makeShadow() });
  s.addText("🙋  N'hésite pas à poser des questions à tout moment — c'est fait pour ça !", {
    x: 0.65, y: 4.85, w: 8.8, h: 0.5, fontSize: 11.5, color: WHITE, valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 – C'est quoi les Données ?
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "C'est quoi une Donnée ?");

  // Définition
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.92, w: 9.0, h: 0.6, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("Une donnée = une information brute, enregistrée et utilisable par un ordinateur.", {
    x: 0.65, y: 0.92, w: 8.7, h: 0.6, fontSize: 13, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  // 3 types de données + exemples du quotidien
  const types = [
    { icon: "🔢", type: "Données numériques",  ex: "Note : 17/20\nPrix : 12,50 €\nÂge : 16 ans",         bg: PURPLE_L, border: PURPLE_MID },
    { icon: "📝", type: "Données textuelles",  ex: "Nom : Alice Dupont\nVille : Paris\nEmail : alice@...", bg: "FEF3C7",   border: YELLOW },
    { icon: "🗓️", type: "Données temporelles", ex: "Date : 11/06/2025\nHeure : 08h30\nDurée : 2h",       bg: GREEN_L,   border: "6EE7B7" },
  ];
  types.forEach((t, i) => {
    const x = 0.4 + i * 3.15;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.65, w: 2.9, h: 2.5, fill: { color: t.bg }, line: { color: t.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(t.icon, { x, y: 1.7, w: 2.9, h: 0.65, fontSize: 30, align: "center", valign: "middle", margin: 0 });
    s.addText(t.type, { x, y: 2.4, w: 2.9, h: 0.38, fontSize: 12, bold: true, color: DARK, align: "center", margin: 0 });
    s.addText(t.ex, { x: x + 0.12, y: 2.82, w: 2.66, h: 1.2, fontSize: 10.5, color: MUTED, margin: 0, fontFace: "Consolas" });
  });

  // Stat + exemples concrets
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.3, w: 4.4, h: 0.75, fill: { color: DARK }, line: { color: DARK }, shadow: makeShadow() });
  s.addText("🌍  2,5 milliards de Go de données sont créées chaque jour dans le monde !", {
    x: 0.55, y: 4.3, w: 4.2, h: 0.75, fontSize: 11, color: WHITE, valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.0, y: 4.3, w: 4.5, h: 0.75, fill: { color: YELLOW_L }, line: { color: YELLOW } });
  s.addText("📱  Chaque like, achat, connexion, message = des données stockées quelque part.", {
    x: 5.12, y: 4.3, w: 4.26, h: 0.75, fontSize: 11, color: DARK, valign: "middle", margin: 0
  });
}

addOpenQuestion(
  "Quelles données génères-tu dans ta vie quotidienne ?",
  ["Pense à ton téléphone : que fais-tu chaque jour avec ?", "Quand tu achètes quelque chose, qu'est-ce qui est enregistré ?", "Et au lycée : quelles informations l'école garde-t-elle sur toi ?"]
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 4 – C'est quoi une Base de Données ?
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "C'est quoi une Base de Données ?");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.58, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("Une BDD = un endroit organisé pour stocker, retrouver et manipuler des données très rapidement.", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.58, fontSize: 12.5, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  // Cards gauche
  const items = [
    { icon: "📦", title: "Un conteneur organisé",   desc: "Les données sont rangées en tableaux (tables) avec des lignes et colonnes" },
    { icon: "🔗", title: "Des tables liées",         desc: "Les tables se parlent entre elles : un élève a plusieurs notes, plusieurs cours..." },
    { icon: "⚡", title: "Recherche ultra-rapide",   desc: "Retrouver 1 info parmi 10 millions en moins d'1 milliseconde" },
  ];
  items.forEach((it, i) => {
    const y = 1.62 + i * 1.02;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 5.5, h: 0.92, fill: { color: WHITE }, line: { color: PURPLE_MID, width: 1.5 }, shadow: makeShadow() });
    s.addText(it.icon, { x: 0.5, y, w: 0.88, h: 0.92, fontSize: 26, align: "center", valign: "middle", margin: 0 });
    s.addText(it.title, { x: 1.42, y: y + 0.07, w: 4.35, h: 0.32, fontSize: 12.5, bold: true, color: PURPLE, margin: 0 });
    s.addText(it.desc,  { x: 1.42, y: y + 0.44, w: 4.35, h: 0.4,  fontSize: 10.5, color: MUTED, margin: 0 });
  });

  // Mini table droite
  s.addShape(pres.shapes.RECTANGLE, { x: 6.3, y: 1.62, w: 3.25, h: 3.04, fill: { color: WHITE }, line: { color: PURPLE_MID, width: 1.5 }, shadow: makeShadow() });
  s.addText("Table : Élèves 🎓", { x: 6.4, y: 1.72, w: 3.05, h: 0.3, fontSize: 10, bold: true, color: PURPLE, align: "center", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.4, y: 2.08, w: 3.05, h: 0.3, fill: { color: PURPLE }, line: { color: PURPLE } });
  s.addText("Nom         Classe  Note", { x: 6.4, y: 2.08, w: 3.05, h: 0.3, fontSize: 9, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
  [["Alice","2nde A","17"],["Bob","2nde B","14"],["Clara","2nde A","18"],["David","2nde C","12"]].forEach((r, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 6.4, y: 2.38 + i * 0.28, w: 3.05, h: 0.28, fill: { color: i % 2 === 0 ? "F5F3FF" : WHITE }, line: { color: "DDD6FE", width: 0.5 } });
    s.addText(`${r[0]}       ${r[1]}  ${r[2]}`, { x: 6.4, y: 2.38 + i * 0.28, w: 3.05, h: 0.28, fontSize: 9, color: DARK, align: "center", valign: "middle", margin: 0 });
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.4, y: 3.55, w: 3.05, h: 0.85, fill: { color: PURPLE_L }, line: { color: PURPLE_MID } });
  s.addText("MySQL · PostgreSQL\nOracle · SQL Server\nMongoDB · Redis", { x: 6.4, y: 3.55, w: 3.05, h: 0.85, fontSize: 10, color: PURPLE, align: "center", valign: "middle", margin: 0 });

  // Bottom note
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.82, w: 5.5, h: 0.55, fill: { color: YELLOW_L }, line: { color: YELLOW } });
  s.addText("📱  Facebook : 100 milliards de requêtes SQL par jour sur ses BDD !", { x: 0.55, y: 4.82, w: 5.2, h: 0.55, fontSize: 10.5, color: DARK, valign: "middle", margin: 0 });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – Le Moteur de Bases de Données
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Le Moteur de Bases de Données (SGBD)");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.62, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("⚙️  Le moteur (SGBD) = le logiciel qui fait vivre la base de données : il stocke, lit, écrit et protège les données.", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.62, fontSize: 12, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  // Métaphore voiture
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.68, w: 4.5, h: 1.7, fill: { color: YELLOW_L }, line: { color: YELLOW }, shadow: makeShadow() });
  s.addText("🚗  Métaphore", { x: 0.55, y: 1.78, w: 4.2, h: 0.32, fontSize: 12, bold: true, color: ORANGE, margin: 0 });
  s.addText("La base de données, c'est la voiture entière. Le moteur (SGBD), c'est ce qui la fait avancer : sans lui, les données sont juste des fichiers immobiles sur un disque.", {
    x: 0.55, y: 2.12, w: 4.2, h: 1.2, fontSize: 11, color: DARK, margin: 0
  });

  // Métaphore distributions
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.5, w: 4.5, h: 1.85, fill: { color: TEAL_L }, line: { color: "67E8F9" }, shadow: makeShadow() });
  s.addText("🍕  Les distributions, c'est comme la pizza !", { x: 0.55, y: 3.6, w: 4.2, h: 0.32, fontSize: 11.5, bold: true, color: TEAL, margin: 0 });
  s.addText("Une recette de base (la pâte = PostgreSQL), et chacun ajoute sa garniture : plus de sécurité, du support 24/7, une version cloud... Même cœur, saveurs différentes !", {
    x: 0.55, y: 3.95, w: 4.2, h: 1.3, fontSize: 11, color: DARK, margin: 0
  });

  // Distributions PostgreSQL
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.68, w: 4.45, h: 3.67, fill: { color: WHITE }, line: { color: PURPLE_MID, width: 1.5 }, shadow: makeShadow() });
  s.addText("🐘  Les distributions PostgreSQL", { x: 5.3, y: 1.8, w: 4.15, h: 0.35, fontSize: 13, bold: true, color: PURPLE, margin: 0 });

  const distros = [
    { name: "PostgreSQL Community", desc: "La version originale, gratuite et open-source" },
    { name: "EDB Postgres Advanced", desc: "Version entreprise : sécurité et support renforcés" },
    { name: "Amazon Aurora / RDS", desc: "Version cloud gérée par Amazon (AWS)" },
    { name: "Azure Database for PostgreSQL", desc: "Version cloud gérée par Microsoft" },
    { name: "Google AlloyDB / Cloud SQL", desc: "Version cloud gérée par Google" },
  ];
  distros.forEach((d, i) => {
    const y = 2.22 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y, w: 4.15, h: 0.56, fill: { color: i % 2 === 0 ? "F5F3FF" : WHITE }, line: { color: "DDD6FE", width: 0.5 } });
    s.addText(d.name, { x: 5.42, y: y + 0.04, w: 3.95, h: 0.26, fontSize: 10.5, bold: true, color: DARK, margin: 0 });
    s.addText(d.desc, { x: 5.42, y: y + 0.3, w: 3.95, h: 0.24, fontSize: 9, color: MUTED, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – La Structure d'une Base de Données
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Comment est Organisée une Base de Données ?");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.58, fill: { color: PINK }, line: { color: PINK }, shadow: makeShadow() });
  s.addText("🏠  Métaphore : une BDD est comme une grande maison bien rangée — chaque élément a un rôle précis !", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.58, fontSize: 12.5, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  const elems = [
    { icon: "🏠", name: "Schéma",    role: "Les étages de la maison : regroupent les tables par thème (ventes, RH...)", color: PURPLE_L, border: PURPLE_MID, tc: PURPLE },
    { icon: "🗄️", name: "Table",     role: "Les armoires : chaque table range un type d'information (élèves, notes...)", color: TEAL_L, border: "67E8F9", tc: TEAL },
    { icon: "📋", name: "Colonne",   role: "Les tiroirs étiquetés : nom, classe, note — chaque colonne a un type précis", color: GREEN_L, border: "6EE7B7", tc: GREEN },
    { icon: "🔖", name: "Index",     role: "L'index d'un livre : trouver une info sans parcourir toutes les pages", color: YELLOW_L, border: "FCD34D", tc: "B45309" },
    { icon: "🤖", name: "Procédure", role: "Le robot ménager : une suite d'actions enregistrée, exécutable à la demande", color: ORANGE_L, border: "FCA5A5", tc: ORANGE },
    { icon: "🧩", name: "Extension", role: "Les modules en plus : ajoutent des super-pouvoirs (cartes, recherche...)", color: PINK_L, border: "F9A8D4", tc: PINK },
  ];
  elems.forEach((e, i) => {
    const x = 0.4 + (i % 2) * 4.85;
    const y = 1.62 + Math.floor(i / 2) * 1.0;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.55, h: 0.9, fill: { color: e.color }, line: { color: e.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(e.icon, { x: x + 0.05, y, w: 0.8, h: 0.9, fontSize: 24, align: "center", valign: "middle", margin: 0 });
    s.addText(e.name, { x: x + 0.9, y: y + 0.08, w: 3.55, h: 0.3, fontSize: 12.5, bold: true, color: e.tc, margin: 0 });
    s.addText(e.role, { x: x + 0.9, y: y + 0.4, w: 3.55, h: 0.48, fontSize: 9.5, color: DARK, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.72, w: 9.2, h: 0.65, fill: { color: DARK }, line: { color: DARK }, shadow: makeShadow() });
  s.addText("🎯  Pourquoi cette structure ? Sans organisation, retrouver une donnée = chercher une chaussette dans une maison en désordre. Avec la structure : tout est rangé, rapide et fiable !", {
    x: 0.55, y: 4.72, w: 9.0, h: 0.65, fontSize: 11, color: WHITE, valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – La BDD au Niveau Système
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Et Sous le Capot ? La BDD Côté Système");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.58, fill: { color: TEAL }, line: { color: TEAL }, shadow: makeShadow() });
  s.addText("🍳  Métaphore : la BDD fonctionne comme une cuisine de restaurant — chaque zone a son rôle !", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.58, fontSize: 12.5, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  // Disque
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.65, w: 4.5, h: 1.7, fill: { color: PURPLE_L }, line: { color: PURPLE_MID, width: 1.5 }, shadow: makeShadow() });
  s.addText("💽  Le disque (file system)", { x: 0.55, y: 1.75, w: 4.2, h: 0.32, fontSize: 13, bold: true, color: PURPLE, margin: 0 });
  s.addText("= Le garde-manger 🥫\nLes données sont stockées dans des fichiers sur le disque : durables, mais lents d'accès. Tout y survit même quand on éteint le serveur.", {
    x: 0.55, y: 2.1, w: 4.2, h: 1.2, fontSize: 10.5, color: DARK, margin: 0
  });

  // Mémoire
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.65, w: 4.45, h: 1.7, fill: { color: PINK_L }, line: { color: "F9A8D4", width: 1.5 }, shadow: makeShadow() });
  s.addText("⚡  La mémoire (RAM)", { x: 5.3, y: 1.75, w: 4.15, h: 0.32, fontSize: 13, bold: true, color: PINK, margin: 0 });
  s.addText("= Le plan de travail du cuisinier 🔪\nUltra-rapide mais limitée : on y garde les données « chaudes » utilisées souvent. Tout disparaît si on éteint !", {
    x: 5.3, y: 2.1, w: 4.15, h: 1.2, fontSize: 10.5, color: DARK, margin: 0
  });

  // Le flux
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 3.5, w: 9.2, h: 1.05, fill: { color: WHITE }, line: { color: "DDD6FE", width: 1.5 }, shadow: makeShadow() });
  s.addText("🔄  Le va-et-vient permanent", { x: 0.55, y: 3.6, w: 8.9, h: 0.3, fontSize: 12, bold: true, color: DARK, margin: 0 });
  s.addText("Quand on demande une donnée : le moteur regarde d'abord en mémoire (le plan de travail). Si elle n'y est pas, il va la chercher sur le disque (le garde-manger) — plus lent ! Le travail du DBA : régler la mémoire pour que les données les plus demandées soient toujours « à portée de main ».", {
    x: 0.55, y: 3.92, w: 8.9, h: 0.6, fontSize: 10.5, color: MUTED, margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.75, w: 9.2, h: 0.55, fill: { color: YELLOW_L }, line: { color: YELLOW } });
  s.addText("💡  RAM = 1000× plus rapide que le disque, mais 10× plus chère — tout l'art est de bien doser les deux !", {
    x: 0.55, y: 4.75, w: 9.0, h: 0.55, fontSize: 11, color: DARK, valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – C'est quoi SQL ?
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "SQL — Parler avec les Données");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.6, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("🗣️  Comment interagir avec une BDD ? On lui parle dans son langage : SQL (Structured Query Language).", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.6, fontSize: 12.5, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  // Analogie
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.65, w: 4.5, h: 1.0, fill: { color: YELLOW_L }, line: { color: YELLOW }, shadow: makeShadow() });
  s.addText("💡  Analogie : SQL est comme une question posée à un bibliothécaire : « Donne-moi tous les livres de science-fiction publiés après 2020. »", {
    x: 0.52, y: 1.65, w: 4.26, h: 1.0, fontSize: 10.5, color: DARK, valign: "middle", margin: 0
  });

  // Les 4 verbes
  const verbs = [
    { kw: "SELECT", action: "Lire des données",      ex: "« Montre-moi les notes d'Alice »", color: TEAL },
    { kw: "INSERT", action: "Ajouter des données",   ex: "« Ajoute le nouvel élève Karim »", color: GREEN },
    { kw: "UPDATE", action: "Modifier des données",  ex: "« Corrige la note de Bob : 15 »",   color: ORANGE },
    { kw: "DELETE", action: "Supprimer des données", ex: "« Retire l'élève parti du lycée »", color: PINK },
  ];
  verbs.forEach((v, i) => {
    const y = 2.8 + i * 0.62;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 4.5, h: 0.55, fill: { color: WHITE }, line: { color: "DDD6FE", width: 1 }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.48, y: y + 0.08, w: 1.05, h: 0.39, fill: { color: v.color }, line: { color: v.color } });
    s.addText(v.kw, { x: 0.48, y: y + 0.08, w: 1.05, h: 0.39, fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle", fontFace: "Consolas", margin: 0 });
    s.addText(v.action, { x: 1.65, y: y + 0.04, w: 3.2, h: 0.26, fontSize: 10.5, bold: true, color: DARK, margin: 0 });
    s.addText(v.ex, { x: 1.65, y: y + 0.3, w: 3.2, h: 0.24, fontSize: 9, color: MUTED, margin: 0 });
  });

  // Exemple de requête à droite
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.65, w: 4.45, h: 2.0, fill: { color: DARK }, line: { color: "374151" }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.65, w: 4.45, h: 0.35, fill: { color: "374151" }, line: { color: "374151" } });
  s.addText("Exemple de requête SQL", { x: 5.27, y: 1.65, w: 4.2, h: 0.35, fontSize: 9.5, color: "9CA3AF", valign: "middle", margin: 0 });
  s.addText("SELECT nom, note\nFROM eleves\nWHERE classe = '2nde A'\nORDER BY note DESC;", {
    x: 5.3, y: 2.1, w: 4.15, h: 1.45, fontSize: 12, color: "86EFAC", fontFace: "Consolas", valign: "top", margin: 0
  });

  // Résultat
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 3.8, w: 4.45, h: 1.45, fill: { color: WHITE }, line: { color: PURPLE_MID, width: 1.5 }, shadow: makeShadow() });
  s.addText("Résultat ⬇️", { x: 5.27, y: 3.88, w: 4.2, h: 0.28, fontSize: 10, bold: true, color: PURPLE, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 4.2, w: 4.15, h: 0.28, fill: { color: PURPLE }, line: { color: PURPLE } });
  s.addText("nom            note", { x: 5.42, y: 4.2, w: 4.0, h: 0.28, fontSize: 9.5, bold: true, color: WHITE, valign: "middle", fontFace: "Consolas", margin: 0 });
  [["Clara", "18"], ["Alice", "17"]].forEach((r, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.3, y: 4.48 + i * 0.28, w: 4.15, h: 0.28, fill: { color: i % 2 === 0 ? "F5F3FF" : WHITE }, line: { color: "DDD6FE", width: 0.5 } });
    s.addText(`${r[0]}          ${r[1]}`, { x: 5.42, y: 4.48 + i * 0.28, w: 4.0, h: 0.28, fontSize: 9.5, color: DARK, valign: "middle", fontFace: "Consolas", margin: 0 });
  });
}

addQCM(
  "À quoi sert une base de données ?",
  ["Envoyer des messages sur les réseaux sociaux", "Stocker, organiser et retrouver des informations rapidement", "Créer des présentations PowerPoint", "Réparer des ordinateurs en panne"],
  1
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 6 – Le DBA
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Le DBA — Gardien des Données");

  s.addShape(pres.shapes.OVAL, { x: 0.4, y: 0.95, w: 1.9, h: 1.9, fill: { color: PURPLE }, line: { color: PURPLE } });
  s.addText("🛡️", { x: 0.4, y: 0.95, w: 1.9, h: 1.9, fontSize: 46, align: "center", valign: "middle", margin: 0 });

  s.addText("Database Administrator", { x: 2.55, y: 0.97, w: 7.1, h: 0.45, fontSize: 22, bold: true, color: DARK, margin: 0, valign: "middle" });
  s.addText("Expert technique dont la mission est de s'assurer que les bases de données\nfonctionnent, sont sécurisées, performantes et disponibles 24h/24.", {
    x: 2.55, y: 1.48, w: 7.1, h: 0.75, fontSize: 12, color: MUTED, margin: 0
  });

  const cards = [
    { bg: PURPLE_L, border: PURPLE_MID, icon: "⚙️", title: "Technique",     desc: "Installe et configure\nles systèmes" },
    { bg: PINK_L,   border: "F9A8D4",   icon: "🔒", title: "Sécurité",      desc: "Protège les données\ndes entreprises" },
    { bg: GREEN_L,  border: "6EE7B7",   icon: "📈", title: "Performance",   desc: "Optimise la rapidité\ndes requêtes" },
    { bg: YELLOW_L, border: "FCD34D",   icon: "🔁", title: "Disponibilité", desc: "Évite les pannes\net pertes de données" },
  ];
  cards.forEach((c, i) => {
    const x = 0.4 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 2.85, w: 2.18, h: 1.75, fill: { color: c.bg }, line: { color: c.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(c.icon, { x, y: 2.9,  w: 2.18, h: 0.62, fontSize: 28, align: "center", valign: "middle", margin: 0 });
    s.addText(c.title, { x, y: 3.54, w: 2.18, h: 0.35, fontSize: 13, bold: true, color: DARK, align: "center", margin: 0 });
    s.addText(c.desc,  { x, y: 3.9,  w: 2.18, h: 0.6,  fontSize: 10, color: MUTED, align: "center", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.75, w: 9.2, h: 0.62, fill: { color: DARK }, line: { color: DARK }, shadow: makeShadow() });
  s.addText("🎯  Le DBA travaille avec des développeurs, des sysadmins, des équipes métier et la direction.", {
    x: 0.55, y: 4.75, w: 9.0, h: 0.62, fontSize: 11.5, color: WHITE, valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – Les Compétences du DBA
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Les Compétences pour Devenir DBA");

  // Compétences techniques
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.0, w: 4.55, h: 0.42, fill: { color: PURPLE }, line: { color: PURPLE } });
  s.addText("🧠  Compétences techniques", { x: 0.52, y: 1.0, w: 4.3, h: 0.42, fontSize: 12.5, bold: true, color: WHITE, valign: "middle", margin: 0 });
  const tech = [
    ["🗄️", "SQL et les moteurs de BDD (PostgreSQL, Oracle...)"],
    ["🐧", "Linux : la plupart des serveurs tournent dessus"],
    ["📜", "Scripting : Bash, Python pour automatiser"],
    ["☁️", "Le Cloud : AWS, Azure, GCP"],
    ["🌐", "Réseaux et sécurité informatique"],
  ];
  tech.forEach((t, i) => {
    const y = 1.5 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 4.55, h: 0.54, fill: { color: WHITE }, line: { color: PURPLE_MID, width: 1 }, shadow: makeShadow() });
    s.addText(t[0], { x: 0.46, y, w: 0.6, h: 0.54, fontSize: 18, align: "center", valign: "middle", margin: 0 });
    s.addText(t[1], { x: 1.1, y, w: 3.8, h: 0.54, fontSize: 10.5, color: DARK, valign: "middle", margin: 0 });
  });

  // Qualités humaines
  s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y: 1.0, w: 4.45, h: 0.42, fill: { color: PINK }, line: { color: PINK } });
  s.addText("💖  Qualités humaines", { x: 5.27, y: 1.0, w: 4.2, h: 0.42, fontSize: 12.5, bold: true, color: WHITE, valign: "middle", margin: 0 });
  const soft = [
    ["🔍", "Rigueur : une erreur peut coûter très cher"],
    ["🧩", "Esprit logique : diagnostiquer les pannes"],
    ["😌", "Sang-froid : gérer les incidents sans paniquer"],
    ["💬", "Communication : expliquer aux équipes"],
    ["📚", "Curiosité : la techno évolue sans cesse !"],
  ];
  soft.forEach((t, i) => {
    const y = 1.5 + i * 0.6;
    s.addShape(pres.shapes.RECTANGLE, { x: 5.15, y, w: 4.45, h: 0.54, fill: { color: WHITE }, line: { color: "F9A8D4", width: 1 }, shadow: makeShadow() });
    s.addText(t[0], { x: 5.21, y, w: 0.6, h: 0.54, fontSize: 18, align: "center", valign: "middle", margin: 0 });
    s.addText(t[1], { x: 5.85, y, w: 3.7, h: 0.54, fontSize: 10.5, color: DARK, valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.6, w: 9.2, h: 0.6, fill: { color: DARK }, line: { color: DARK }, shadow: makeShadow() });
  s.addText("🎓  Parcours type : Bac scientifique ou techno → BTS/BUT/Licence informatique → spécialisation BDD. Et beaucoup de pratique !", {
    x: 0.55, y: 4.6, w: 9.0, h: 0.6, fontSize: 11, color: WHITE, valign: "middle", margin: 0
  });
}

addQCM(
  "Quel est le rôle principal d'un DBA ?",
  ["Concevoir des interfaces et applications mobiles", "Réparer le matériel informatique (ordinateurs, câbles)", "Gérer, sécuriser et optimiser les bases de données", "Gérer les réseaux Wi-Fi de l'entreprise"],
  2
);

// ═══════════════════════════════════════════════════════════════
// SLIDES – Missions DBA (3 slides, 2 missions par slide)
// ═══════════════════════════════════════════════════════════════
const ALL_MISSIONS = [
  {
    icon: "🏗️", title: "Installation & Configuration",
    color: PURPLE_L, border: PURPLE_MID, textColor: PURPLE,
    actions: ["Choisir et installer le SGBD (Oracle, PostgreSQL...)", "Configurer mémoire, disques, paramètres réseau", "Créer les schémas, tablespaces et utilisateurs initiaux", "Valider l'installation via des tests de connexion"]
  },
  {
    icon: "💾", title: "Sauvegarde & Restauration",
    color: GREEN_L, border: "6EE7B7", textColor: GREEN,
    actions: ["Planifier des sauvegardes auto (nuit, hebdo, mensuel)", "Tester les restaurations régulièrement (oui, tester !)", "Surveiller l'espace disque consommé par les backups", "Documenter les procédures de récupération d'urgence"]
  },
  {
    icon: "🔐", title: "Gestion des Accès & Sécurité",
    color: PINK_L, border: "F9A8D4", textColor: PINK,
    actions: ["Créer des comptes utilisateurs avec les bons droits", "Appliquer le principe du moindre privilège", "Auditer les connexions suspectes dans les logs", "Révoquer immédiatement les accès des employés qui partent"]
  },
  {
    icon: "🚀", title: "Optimisation des Performances",
    color: ORANGE_L, border: "FCA5A5", textColor: ORANGE,
    actions: ["Identifier les requêtes SQL lentes avec les plans d'exécution", "Créer des index pour accélérer les recherches fréquentes", "Surveiller l'utilisation CPU, RAM, I/O disque en temps réel", "Proposer des corrections au code SQL si nécessaire"]
  },
  {
    icon: "📊", title: "Supervision & Alertes",
    color: TEAL_L, border: "67E8F9", textColor: TEAL,
    actions: ["Configurer des alertes : espace disque < 10%, CPU > 90%...", "Consulter les logs d'erreurs chaque matin (le café du DBA !)", "Créer des tableaux de bord de monitoring (Grafana, OEM...)", "Répondre aux incidents 24h/24 si la BDD tombe en panne"]
  },
  {
    icon: "🔄", title: "Migration & Mise à Jour",
    color: YELLOW_L, border: "FCD34D", textColor: "B45309",
    actions: ["Auditer l'existant : taille, dépendances, contraintes techniques", "Planifier la migration pour éviter toute interruption de service", "Tester la migration sur un environnement de recette en premier", "Basculer en production avec un plan de rollback en cas d'échec"]
  },
];

for (let part = 0; part < 3; part++) {
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, `Les Missions du DBA — Partie ${part + 1} / 3`);

  ALL_MISSIONS.slice(part * 2, part * 2 + 2).forEach((m, i) => {
    const y = 1.05 + i * 2.15;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 1.95, fill: { color: m.color }, line: { color: m.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(m.icon, { x: 0.5, y, w: 1.0, h: 1.95, fontSize: 38, align: "center", valign: "middle", margin: 0 });
    s.addText(m.title, { x: 1.6, y: y + 0.12, w: 7.8, h: 0.42, fontSize: 16, bold: true, color: m.textColor, margin: 0 });
    m.actions.forEach((a, j) => {
      s.addText([
        { text: "▸ ", options: { bold: true, color: m.textColor } },
        { text: a, options: { color: DARK } }
      ], { x: 1.6, y: y + 0.6 + j * 0.32, w: 7.9, h: 0.32, fontSize: 12, valign: "middle", margin: 0 });
    });
  });
}

addQCM(
  "Si la base de données est lente, que fait en premier le DBA ?",
  ["Il redémarre le serveur et attend que ça passe", "Il analyse les requêtes SQL lentes et crée des index", "Il appelle le service commercial pour un nouveau serveur", "Il supprime les données inutiles au hasard"],
  1
);

// ═══════════════════════════════════════════════════════════════
// SLIDE – Transition : Pourquoi l'Automatisation ?
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addShape(pres.shapes.OVAL, { x: -0.8, y: -0.8, w: 3.0, h: 3.0, fill: { color: PINK, transparency: 70 }, line: { color: PINK, transparency: 70 } });
  s.addShape(pres.shapes.OVAL, { x: 8.2, y: 3.5, w: 3.0, h: 3.0, fill: { color: PURPLE, transparency: 68 }, line: { color: PURPLE, transparency: 68 } });

  slideTitle(s, "Pourquoi Automatiser la Gestion des BDD ?", WHITE);

  // Le problème : explosion d'échelle
  const stats = [
    { num: "×100",  label: "Hier : 5 BDD à gérer.\nAujourd'hui : des centaines !", color: PINK },
    { num: "24/7",  label: "Les applications ne s'arrêtent\njamais — les BDD non plus", color: YELLOW },
    { num: "0",     label: "Erreur humaine tolérée :\nune faute = panne ou perte de données", color: "67E8F9" },
  ];
  stats.forEach((st, i) => {
    const x = 0.5 + i * 3.13;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.05, w: 2.9, h: 1.85, fill: { color: WHITE, transparency: 90 }, line: { color: st.color, width: 1.5 }, shadow: makeShadow() });
    s.addText(st.num, { x, y: 1.18, w: 2.9, h: 0.75, fontSize: 38, bold: true, color: st.color, align: "center", valign: "middle", margin: 0 });
    s.addText(st.label, { x: x + 0.12, y: 2.0, w: 2.66, h: 0.82, fontSize: 10.5, color: WHITE, align: "center", margin: 0 });
  });

  // Le constat
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.15, w: 9.0, h: 0.85, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("⚠️  Impossible de gérer des centaines de BDD à la main ! Le DBA moderne doit automatiser pour suivre le rythme — chaque tâche manuelle répétée est une perte de temps et un risque d'erreur.", {
    x: 0.65, y: 3.15, w: 8.7, h: 0.85, fontSize: 12.5, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  s.addText("Mais d'où vient ce changement d'échelle ? Remontons le temps... ⏪", {
    x: 0.5, y: 4.35, w: 9.0, h: 0.45, fontSize: 14, italic: true, color: "C4B5FD", align: "center", valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 11 – Les Vagues Informatiques
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  slideTitle(s, "Les Vagues Informatiques", WHITE);
  s.addText("À chaque vague, de nouveaux défis — le DBA doit évoluer !", { x: 0.5, y: 0.82, w: 9.0, h: 0.28, fontSize: 12, color: "C4B5FD", margin: 0 });

  const waves = [
    { year: "1960s", name: "Mainframe",      icon: "🖥️", col: "7C3AED" },
    { year: "1980s", name: "PC & Réseau",    icon: "💻", col: "2563EB" },
    { year: "2000s", name: "Virtualisation", icon: "⚙️", col: "059669" },
    { year: "2015",  name: "Cloud",          icon: "☁️", col: "EA580C" },
    { year: "2020+", name: "Automatisation", icon: "🤖", col: PINK },
  ];
  waves.forEach((w, i) => {
    const x = 0.3 + i * 1.9;
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.2, w: 1.7, h: 3.0, fill: { color: w.col, transparency: 15 }, line: { color: w.col } });
    s.addShape(pres.shapes.RECTANGLE, { x, y: 1.2, w: 1.7, h: 0.38, fill: { color: w.col }, line: { color: w.col } });
    s.addText(w.year, { x, y: 1.2, w: 1.7, h: 0.38, fontSize: 10, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
    s.addText(w.icon, { x, y: 1.62, w: 1.7, h: 0.72, fontSize: 30, align: "center", valign: "middle", margin: 0 });
    s.addText(w.name, { x, y: 2.38, w: 1.7, h: 0.55, fontSize: 11, bold: true, color: WHITE, align: "center", margin: 0 });
    if (i < 4) s.addText("→", { x: x + 1.72, y: 2.45, w: 0.16, h: 0.4, fontSize: 14, color: "6D28D9", align: "center", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 1.8, y: 4.35, w: 6.4, h: 0.55, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("🎯  Aujourd'hui : automatiser = survie ! Un DBA gère des centaines de BDD simultanément.", {
    x: 1.8, y: 4.35, w: 6.4, h: 0.55, fontSize: 12, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 5.08, w: 9.0, h: 0.4, fill: { color: YELLOW }, line: { color: YELLOW } });
  s.addText("💬  Question : C'est quoi concrètement le Cloud ?", { x: 0.65, y: 5.08, w: 8.7, h: 0.4, fontSize: 12, color: DARK, valign: "middle", margin: 0 });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 13 – Le Cloud
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Le Cloud : Louer au Lieu d'Acheter");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.65, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("💡  Analogie : Le Cloud c'est comme Netflix — tu utilises des ressources sans posséder l'infrastructure !", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.65, fontSize: 12.5, color: WHITE, valign: "middle", margin: 0
  });

  const before = ["💸 Acheter des serveurs très chers", "🏢 Les stocker dans vos locaux", "👩‍💻 Embaucher personnel 24h/24", "😰 Payer même si inutilisé"];
  const after  = ["🌐 Louer les ressources à la demande", "☁️ Tout chez AWS, Azure, Google...", "🔧 Le fournisseur gère la maintenance", "💰 On paie uniquement ce qu'on utilise"];

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.7, w: 4.4, h: 0.38, fill: { color: "FEE2E2" }, line: { color: "FECACA" } });
  s.addText("❌  AVANT — Serveurs physiques", { x: 0.5, y: 1.7, w: 4.4, h: 0.38, fontSize: 12, bold: true, color: "991B1B", align: "center", valign: "middle", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.7, w: 4.4, h: 0.38, fill: { color: GREEN_L }, line: { color: "6EE7B7" } });
  s.addText("✅  APRÈS — Cloud", { x: 5.1, y: 1.7, w: 4.4, h: 0.38, fontSize: 12, bold: true, color: "065F46", align: "center", valign: "middle", margin: 0 });

  before.forEach((b, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.13 + i * 0.5, w: 4.4, h: 0.46, fill: { color: "FFF1F2" }, line: { color: "FECACA", width: 0.5 } });
    s.addText(b, { x: 0.62, y: 2.13 + i * 0.5, w: 4.2, h: 0.46, fontSize: 11, color: "7F1D1D", valign: "middle", margin: 0 });
  });
  after.forEach((a, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 2.13 + i * 0.5, w: 4.4, h: 0.46, fill: { color: "ECFDF5" }, line: { color: "6EE7B7", width: 0.5 } });
    s.addText(a, { x: 5.22, y: 2.13 + i * 0.5, w: 4.2, h: 0.46, fontSize: 11, color: "064E3B", valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.27, w: 9.0, h: 0.62, fill: { color: TEAL_L }, line: { color: "67E8F9" } });
  s.addText("☁️  AWS RDS, Azure SQL, Google Cloud SQL : des services Cloud spécialement conçus pour les bases de données DBA.", {
    x: 0.65, y: 4.27, w: 8.7, h: 0.62, fontSize: 11, color: TEAL, valign: "middle", margin: 0
  });
}

addQCM(
  "Quel est l'avantage principal du Cloud pour une entreprise ?",
  ["Les données ne peuvent jamais être perdues dans le Cloud", "On paie uniquement les ressources qu'on utilise, à la demande", "Internet n'est pas nécessaire pour accéder au Cloud", "Les serveurs Cloud sont toujours dans le même bâtiment"],
  1
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 15 – Tâches Répétitives du DBA à Automatiser
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Les Tâches Répétitives du DBA");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.58, fill: { color: ORANGE }, line: { color: ORANGE }, shadow: makeShadow() });
  s.addText("Ces tâches reviennent chaque jour, chaque semaine, sur des dizaines de serveurs... Parfaites pour l'automatisation !", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.58, fontSize: 12, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  // Header tableau
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.6, w: 9.2, h: 0.38, fill: { color: DARK }, line: { color: DARK } });
  ["Mission DBA", "Tâche répétitive", "Fréquence", "Serveurs"].forEach((h, i) => {
    const widths = [2.0, 3.5, 1.8, 1.5];
    const xs = [0.5, 2.55, 6.1, 7.95];
    s.addText(h, { x: xs[i], y: 1.6, w: widths[i], h: 0.38, fontSize: 11, bold: true, color: WHITE, valign: "middle", margin: 0 });
  });

  const rows = [
    { mission: "💾  Sauvegarde",   task: "Lancer les backups de toutes les BDD",      freq: "Chaque nuit",    nb: "50+",  bg: GREEN_L,   tc: GREEN },
    { mission: "📊  Supervision",  task: "Vérifier l'espace disque sur les serveurs",  freq: "Chaque heure",  nb: "100+", bg: TEAL_L,    tc: TEAL },
    { mission: "🔐  Accès",        task: "Créer le même profil droits : nouvel employé",freq: "Chaque semaine",nb: "20+",  bg: PINK_L,    tc: PINK },
    { mission: "🏗️  Installation", task: "Déployer une nouvelle BDD (même config)",   freq: "Par projet",    nb: "10+",  bg: PURPLE_L,  tc: PURPLE },
    { mission: "🚀  Optimisation", task: "Analyser les rapports de performance SQL",   freq: "Chaque matin",  nb: "30+",  bg: ORANGE_L,  tc: ORANGE },
    { mission: "🔄  Migration",    task: "Appliquer les patches de sécurité",          freq: "Mensuelle",     nb: "200+", bg: YELLOW_L,  tc: "B45309" },
  ];

  rows.forEach((r, i) => {
    const y = 2.02 + i * 0.52;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.48, fill: { color: r.bg }, line: { color: "E5E7EB", width: 0.5 } });
    s.addText(r.mission, { x: 0.5,  y, w: 2.0, h: 0.48, fontSize: 10.5, bold: true, color: r.tc, valign: "middle", margin: 0 });
    s.addText(r.task,    { x: 2.55, y, w: 3.45, h: 0.48, fontSize: 10,   color: DARK, valign: "middle", margin: 0 });
    s.addText(r.freq,    { x: 6.1,  y, w: 1.75, h: 0.48, fontSize: 10,   color: MUTED, valign: "middle", margin: 0 });
    s.addText(r.nb,      { x: 7.95, y, w: 1.4,  h: 0.48, fontSize: 12,   bold: true, color: r.tc, align: "center", valign: "middle", margin: 0 });
  });
}

addQCM(
  "Laquelle de ces tâches DBA est la plus adaptée à l'automatisation ?",
  ["Décider quelle base de données acheter", "Lancer une sauvegarde chaque nuit à 2h du matin sur 50 serveurs", "Discuter de la stratégie avec la direction", "Choisir le nom d'une nouvelle base de données"],
  1
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 17 – L'ancienne méthode : Scripts Shell / Python
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Automatiser : l'Ancienne Méthode (Scripts)");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.58, fill: { color: "374151" }, line: { color: "374151" }, shadow: makeShadow() });
  s.addText("Avant les outils modernes, les DBA écrivaient des scripts Shell (Bash) ou Python pour automatiser leurs tâches.", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.58, fontSize: 12, color: WHITE, valign: "middle", margin: 0
  });

  // Script exemple gauche
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.58, w: 5.1, h: 2.75, fill: { color: DARK }, line: { color: "374151" }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.58, w: 5.1, h: 0.35, fill: { color: "374151" }, line: { color: "374151" } });
  s.addText("backup_db.sh — Script de sauvegarde", { x: 0.5, y: 1.58, w: 4.9, h: 0.35, fontSize: 9.5, color: "9CA3AF", valign: "middle", margin: 0 });
  s.addText(
    '#!/bin/bash\n# Sauvegarde PostgreSQL\nDATE=$(date +%Y%m%d)\nDB_NAME="production"\n\npg_dump $DB_NAME \\\n  > /backup/db_$DATE.sql\n\necho "Backup terminé : $DATE"',
    { x: 0.5, y: 1.97, w: 4.9, h: 2.3, fontSize: 9, color: "86EFAC", fontFace: "Consolas", valign: "top", margin: 0 }
  );

  // Avantages / Inconvénients
  s.addShape(pres.shapes.RECTANGLE, { x: 5.7, y: 1.58, w: 3.85, h: 1.2, fill: { color: GREEN_L }, line: { color: "6EE7B7" }, shadow: makeShadow() });
  s.addText("✅  Avantages", { x: 5.82, y: 1.62, w: 3.6, h: 0.3, fontSize: 12, bold: true, color: GREEN, margin: 0 });
  s.addText("▸ Simple à écrire rapidement\n▸ Flexible, personnalisable\n▸ Gratuit, aucun outil externe", { x: 5.82, y: 1.95, w: 3.6, h: 0.75, fontSize: 10.5, color: DARK, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.7, y: 2.92, w: 3.85, h: 1.42, fill: { color: "FEE2E2" }, line: { color: "FECACA" }, shadow: makeShadow() });
  s.addText("❌  Inconvénients", { x: 5.82, y: 2.96, w: 3.6, h: 0.3, fontSize: 12, bold: true, color: "991B1B", margin: 0 });
  s.addText("▸ Fragile : casse si l'environnement change\n▸ Pas idempotent (exécuter 2× = problème)\n▸ Un script = un seul serveur à la fois\n▸ Difficile à maintenir avec le temps", { x: 5.82, y: 3.3, w: 3.6, h: 1.0, fontSize: 10, color: DARK, margin: 0 });

  // Notion d'idempotence
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.45, w: 9.2, h: 0.85, fill: { color: YELLOW_L }, line: { color: YELLOW }, shadow: makeShadow() });
  s.addText("💡  Idempotent = ", { x: 0.55, y: 4.45, w: 2.1, h: 0.85, fontSize: 12, bold: true, color: ORANGE, valign: "middle", margin: 0 });
  s.addText('Si tu exécutes le script 1 fois ou 10 fois, le résultat est le même. Un script Bash dit "créer", mais si c\'est déjà créé → ERREUR !', {
    x: 2.65, y: 4.45, w: 6.85, h: 0.85, fontSize: 11, color: DARK, valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – Les Scripts en Métaphores
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Les Scripts, en Images 🎭");

  const metas = [
    {
      icon: "📖", title: "Le script = une recette de cuisine écrite à la main",
      desc: "Elle marche très bien... dans TA cuisine. Mais chez quelqu'un d'autre (four différent, ingrédients manquants), la recette échoue sans prévenir.",
      moral: "Un script dépend de son environnement : changement de serveur = risque de panne.",
      color: YELLOW_L, border: "FCD34D", tc: "B45309"
    },
    {
      icon: "🤖", title: "Le script = un robot qui suit les ordres aveuglément",
      desc: "Tu lui dis « ajoute du sel » : il en ajoute, même si le plat est déjà salé ! Il ne vérifie jamais l'état avant d'agir.",
      moral: "Exécuter 2 fois un script = doublons, erreurs... C'est le problème d'idempotence.",
      color: PINK_L, border: "F9A8D4", tc: PINK
    },
    {
      icon: "✉️", title: "Le script = envoyer 100 lettres une par une",
      desc: "Pour 100 serveurs, il faut se connecter à chacun et lancer le script à la main, l'un après l'autre. Long et épuisant !",
      moral: "Pas de gestion de parc : le script ne connaît qu'une machine à la fois.",
      color: TEAL_L, border: "67E8F9", tc: TEAL
    },
  ];
  metas.forEach((m, i) => {
    const y = 1.0 + i * 1.45;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 1.32, fill: { color: m.color }, line: { color: m.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(m.icon, { x: 0.5, y, w: 0.95, h: 1.32, fontSize: 32, align: "center", valign: "middle", margin: 0 });
    s.addText(m.title, { x: 1.55, y: y + 0.08, w: 7.9, h: 0.32, fontSize: 12.5, bold: true, color: m.tc, margin: 0 });
    s.addText(m.desc, { x: 1.55, y: y + 0.42, w: 7.9, h: 0.52, fontSize: 10.5, color: DARK, margin: 0 });
    s.addText("➜  " + m.moral, { x: 1.55, y: y + 0.96, w: 7.9, h: 0.32, fontSize: 10, italic: true, bold: true, color: m.tc, margin: 0 });
  });

  s.addText("Et si un outil savait vérifier avant d'agir, et parler à 1000 serveurs en même temps ? 🤔", {
    x: 0.5, y: 5.02, w: 9.0, h: 0.4, fontSize: 12.5, italic: true, color: PURPLE, align: "center", valign: "middle", margin: 0
  });
}

addQCM(
  "Quel est le principal problème d'un script Bash pour automatiser sur 100 serveurs ?",
  ["Il est trop lent à écrire", "Il ne s'exécute qu'un serveur à la fois et peut casser si l'environnement change", "Il coûte très cher en licence", "Il ne fonctionne que la nuit"],
  1
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 19 – Ansible
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Ansible — Automatiser en Décrivant l'État Voulu");

  // Définition
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.62, fill: { color: PURPLE }, line: { color: PURPLE }, shadow: makeShadow() });
  s.addText("🤖  Ansible est un outil open-source qui automatise la configuration de serveurs en décrivant l'état qu'on veut obtenir.", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.62, fontSize: 12, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  // Exemple playbook gauche
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.65, w: 4.85, h: 2.62, fill: { color: DARK }, line: { color: "374151" }, shadow: makeShadow() });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.65, w: 4.85, h: 0.35, fill: { color: "374151" }, line: { color: "374151" } });
  s.addText("install_postgres.yml — Playbook Ansible", { x: 0.5, y: 1.65, w: 4.65, h: 0.35, fontSize: 9.5, color: "9CA3AF", valign: "middle", margin: 0 });
  s.addText(
    "- name: Installer PostgreSQL\n  hosts: all  # 100 serveurs d'un coup\n  tasks:\n    - name: Installer le paquet\n      apt:\n        name: postgresql\n        state: present  # doit être installé\n\n    - name: Démarrer le service\n      service:\n        name: postgresql\n        state: started  # doit être démarré",
    { x: 0.52, y: 2.04, w: 4.62, h: 2.18, fontSize: 8.8, color: "C4B5FD", fontFace: "Consolas", valign: "top", margin: 0 }
  );

  // Bénéfices droite
  const benefits = [
    { icon: "🔁", title: "Idempotent", desc: "Exécutable 100 fois : même résultat. Aucune surprise !", color: GREEN_L,  border: "6EE7B7",  tc: GREEN },
    { icon: "🌐", title: "Multi-serveurs", desc: "1 playbook configure 1 ou 1000 serveurs simultanément.", color: PURPLE_L, border: PURPLE_MID, tc: PURPLE },
    { icon: "📖", title: "Lisible", desc: "YAML = langage humain. L'équipe entière peut comprendre.", color: TEAL_L,   border: "67E8F9",  tc: TEAL },
    { icon: "🔌", title: "Sans agent", desc: "Rien à installer sur les serveurs cibles. Juste SSH.", color: YELLOW_L, border: "FCD34D",  tc: ORANGE },
  ];
  benefits.forEach((b, i) => {
    const x = 5.5 + (i % 2) * 2.22;
    const y = 1.65 + Math.floor(i / 2) * 1.32;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 2.05, h: 1.18, fill: { color: b.color }, line: { color: b.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(b.icon, { x, y: y + 0.05, w: 2.05, h: 0.48, fontSize: 22, align: "center", valign: "middle", margin: 0 });
    s.addText(b.title, { x, y: y + 0.55, w: 2.05, h: 0.28, fontSize: 11, bold: true, color: b.tc, align: "center", margin: 0 });
    s.addText(b.desc,  { x, y: y + 0.84, w: 2.05, h: 0.28, fontSize: 9,  color: MUTED, align: "center", margin: 0 });
  });

  // Comparaison
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.38, w: 9.2, h: 0.92, fill: { color: DARK }, line: { color: DARK }, shadow: makeShadow() });
  s.addText("Scripts Bash :", { x: 0.55, y: 4.42, w: 1.6, h: 0.38, fontSize: 11, bold: true, color: "FCA5A5", margin: 0 });
  s.addText('"Exécute ces commandes"', { x: 2.2, y: 4.42, w: 3.0, h: 0.38, fontSize: 11, color: "FCA5A5", fontFace: "Consolas", margin: 0 });
  s.addText("Ansible :", { x: 0.55, y: 4.82, w: 1.6, h: 0.38, fontSize: 11, bold: true, color: "86EFAC", margin: 0 });
  s.addText('"PostgreSQL doit être installé et démarré"', { x: 2.2, y: 4.82, w: 4.5, h: 0.38, fontSize: 11, color: "86EFAC", fontFace: "Consolas", margin: 0 });
  s.addText("→ Ansible vérifie et corrige si nécessaire", { x: 6.8, y: 4.72, w: 2.7, h: 0.58, fontSize: 10, color: YELLOW, valign: "middle", margin: 0 });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE – Cas d'Usage : Ansible vs Script Shell
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Ansible vs Script Shell — Cas Concrets");

  // Header
  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 0.95, w: 2.3, h: 0.45, fill: { color: DARK }, line: { color: DARK } });
  s.addText("Cas d'usage", { x: 0.52, y: 0.95, w: 2.1, h: 0.45, fontSize: 11, bold: true, color: WHITE, valign: "middle", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 2.75, y: 0.95, w: 3.4, h: 0.45, fill: { color: "991B1B" }, line: { color: "991B1B" } });
  s.addText("📜  Avec un script Shell", { x: 2.87, y: 0.95, w: 3.2, h: 0.45, fontSize: 11, bold: true, color: WHITE, valign: "middle", margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y: 0.95, w: 3.4, h: 0.45, fill: { color: GREEN }, line: { color: GREEN } });
  s.addText("🤖  Avec Ansible", { x: 6.32, y: 0.95, w: 3.2, h: 0.45, fontSize: 11, bold: true, color: WHITE, valign: "middle", margin: 0 });

  const cases = [
    {
      title: "💾  Sauvegarder 50 BDD chaque nuit",
      shell: "1 script par serveur, à copier et adapter 50 fois. Si un serveur change de mot de passe → le script casse en silence.",
      ansible: "1 playbook + 1 inventaire de 50 serveurs. Exécution parallèle, rapport clair : 48 OK, 2 en échec.",
    },
    {
      title: "🏗️  Installer PostgreSQL sur 20 serveurs",
      shell: "Se connecter à chaque serveur un par un, lancer le script, vérifier à la main. Relancer = risque d'erreur « déjà installé ».",
      ansible: "1 commande pour les 20 serveurs. Relançable à volonté : Ansible vérifie l'état et ne refait que ce qui manque.",
    },
    {
      title: "🔐  Appliquer un patch de sécurité urgent",
      shell: "Plusieurs heures de connexions manuelles. Aucune trace de qui a patché quoi, ni quand.",
      ansible: "Patch déployé sur tout le parc en quelques minutes, avec un log complet et auditable de chaque action.",
    },
  ];

  cases.forEach((c, i) => {
    const y = 1.5 + i * 1.18;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 2.3, h: 1.08, fill: { color: PURPLE_L }, line: { color: PURPLE_MID, width: 1 } });
    s.addText(c.title, { x: 0.52, y, w: 2.1, h: 1.08, fontSize: 10.5, bold: true, color: PURPLE, valign: "middle", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 2.75, y, w: 3.4, h: 1.08, fill: { color: "FFF1F2" }, line: { color: "FECACA", width: 1 } });
    s.addText(c.shell, { x: 2.87, y, w: 3.18, h: 1.08, fontSize: 9.5, color: "7F1D1D", valign: "middle", margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, { x: 6.2, y, w: 3.4, h: 1.08, fill: { color: "ECFDF5" }, line: { color: "6EE7B7", width: 1 } });
    s.addText(c.ansible, { x: 6.32, y, w: 3.18, h: 1.08, fontSize: 9.5, color: "064E3B", valign: "middle", margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 5.02, w: 9.2, h: 0.42, fill: { color: YELLOW }, line: { color: YELLOW } });
  s.addText("🏆  Bilan : moins d'erreurs, plus de vitesse, et tout est tracé — c'est ça, l'automatisation moderne !", {
    x: 0.55, y: 5.02, w: 9.0, h: 0.42, fontSize: 11.5, bold: true, color: DARK, valign: "middle", margin: 0
  });
}

addQCM(
  "Quelle est la grande différence entre Ansible et un script Bash ?",
  ["Ansible est payant, Bash est gratuit", "Ansible décrit l'état voulu (idempotent) ; Bash exécute des commandes dans l'ordre", "Ansible ne fonctionne que sur Windows", "Bash peut gérer plusieurs serveurs, Ansible non"],
  1
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 21 – Industrialisation
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, "Industrialisation — Produire à Grande Échelle");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.9, w: 9.0, h: 0.62, fill: { color: PINK }, line: { color: PINK }, shadow: makeShadow() });
  s.addText("🏭  Analogie : une usine Toyota produit la même voiture, fiable, 1000 fois par jour. L'industrialisation, c'est ça !", {
    x: 0.65, y: 0.9, w: 8.7, h: 0.62, fontSize: 12, bold: true, color: WHITE, valign: "middle", margin: 0
  });

  // 4 piliers
  const pillars = [
    { icon: "📐", title: "Standardisation", desc: "Tous les serveurs suivent les mêmes règles : mêmes configs, mêmes versions, mêmes noms.", color: PURPLE_L, border: PURPLE_MID, tc: PURPLE },
    { icon: "🔁", title: "Reproductibilité", desc: "Dev, Test, Production = environnements identiques. Fini le \"ça marche chez moi !\"", color: GREEN_L, border: "6EE7B7", tc: GREEN },
    { icon: "📦", title: "Infrastructure as Code", desc: "Les configs sont du code : versionnées dans Git, révisées, auditables.", color: TEAL_L, border: "67E8F9", tc: TEAL },
    { icon: "🚀", title: "Déploiement Continu", desc: "Une nouvelle BDD est toujours déployée de la même façon, en 5 minutes, pas en 5 jours.", color: ORANGE_L, border: "FCA5A5", tc: ORANGE },
  ];
  pillars.forEach((p, i) => {
    const x = 0.4 + (i % 2) * 4.85;
    const y = 1.68 + Math.floor(i / 2) * 1.48;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.55, h: 1.32, fill: { color: p.color }, line: { color: p.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(p.icon, { x: x + 0.08, y, w: 0.85, h: 1.32, fontSize: 28, align: "center", valign: "middle", margin: 0 });
    s.addText(p.title, { x: x + 1.0, y: y + 0.1,  w: 3.45, h: 0.35, fontSize: 13, bold: true, color: p.tc, margin: 0 });
    s.addText(p.desc,  { x: x + 1.0, y: y + 0.5,  w: 3.45, h: 0.72, fontSize: 10.5, color: DARK, margin: 0 });
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.8, w: 9.2, h: 0.58, fill: { color: DARK }, line: { color: DARK }, shadow: makeShadow() });
  s.addText("🎯  Automatisation + Industrialisation = faire en 1 semaine ce qui prenait 3 mois à la main !", {
    x: 0.55, y: 4.8, w: 9.0, h: 0.58, fontSize: 12, bold: true, color: YELLOW, valign: "middle", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDES – Industrialisation en détail (2 slides, 2 rubriques chacune)
// ═══════════════════════════════════════════════════════════════
const INDUS_DETAILS = [
  {
    icon: "📐", title: "Standardisation", color: PURPLE_L, border: PURPLE_MID, tc: PURPLE,
    what: "Définir UNE seule bonne façon de faire, appliquée partout : mêmes versions de PostgreSQL, mêmes conventions de nommage, mêmes paramètres de sécurité.",
    example: "Exemple : toutes les BDD s'appellent « projet_environnement » (ex : vente_prod, vente_test) — n'importe quel DBA s'y retrouve immédiatement.",
    benefit: "Bénéfice : moins de surprises, dépannage plus rapide, nouveaux arrivants opérationnels en quelques jours."
  },
  {
    icon: "🔁", title: "Reproductibilité", color: GREEN_L, border: "6EE7B7", tc: GREEN,
    what: "Pouvoir recréer à l'identique un environnement complet : si la prod et le test sont identiques, ce qui marche en test marchera en prod.",
    example: "Exemple : un bug en production ? On recrée l'environnement exact en 10 minutes pour le reproduire et le corriger sans toucher à la prod.",
    benefit: "Bénéfice : fini le « ça marche chez moi ! » — les tests deviennent fiables à 100 %."
  },
  {
    icon: "📦", title: "Infrastructure as Code (IaC)", color: TEAL_L, border: "67E8F9", tc: TEAL,
    what: "Toute la configuration est écrite sous forme de code (fichiers texte), stockée dans Git comme du code applicatif : versionnée, relue, validée.",
    example: "Exemple : pour savoir qui a changé la taille mémoire d'une BDD et quand → il suffit de regarder l'historique Git, comme un journal de bord.",
    benefit: "Bénéfice : traçabilité totale, retour arrière possible, et la doc est toujours à jour (c'est le code !)."
  },
  {
    icon: "🚀", title: "Déploiement Continu", color: ORANGE_L, border: "FCA5A5", tc: ORANGE,
    what: "Chaque changement validé est déployé automatiquement par un pipeline : tests automatiques → validation → mise en production, sans intervention manuelle.",
    example: "Exemple : le DBA modifie un paramètre dans Git à 14h00 → à 14h10, les 200 serveurs sont à jour, testés et vérifiés automatiquement.",
    benefit: "Bénéfice : des déploiements rapides, fréquents et sans stress — même un vendredi !"
  },
];

for (let part = 0; part < 2; part++) {
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  slideTitle(s, `L'Industrialisation en Détail — ${part + 1} / 2`);

  INDUS_DETAILS.slice(part * 2, part * 2 + 2).forEach((r, i) => {
    const y = 1.05 + i * 2.15;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 1.95, fill: { color: r.color }, line: { color: r.border, width: 1.5 }, shadow: makeShadow() });
    s.addText(r.icon, { x: 0.5, y: y + 0.05, w: 0.95, h: 0.6, fontSize: 30, align: "center", valign: "middle", margin: 0 });
    s.addText(r.title, { x: 1.55, y: y + 0.12, w: 7.9, h: 0.4, fontSize: 15, bold: true, color: r.tc, margin: 0 });
    s.addText(r.what,    { x: 0.62, y: y + 0.6,  w: 8.85, h: 0.45, fontSize: 10.5, color: DARK, margin: 0 });
    s.addText(r.example, { x: 0.62, y: y + 1.08, w: 8.85, h: 0.45, fontSize: 10, italic: true, color: MUTED, margin: 0 });
    s.addText("✅  " + r.benefit, { x: 0.62, y: y + 1.55, w: 8.85, h: 0.35, fontSize: 10.5, bold: true, color: r.tc, margin: 0 });
  });
}

addQCM(
  "Qu'est-ce que l'industrialisation en informatique ?",
  ["Construire des usines physiques pour fabriquer des serveurs", "Standardiser et reproduire les processus à grande échelle, comme une usine", "Supprimer tous les scripts et travailler uniquement à la main", "Utiliser uniquement des logiciels gratuits et open-source"],
  1
);

// ═══════════════════════════════════════════════════════════════
// SLIDE 23 – Conclusion
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: DARK };
  s.addShape(pres.shapes.OVAL, { x: 7.5, y: -0.8, w: 3.5, h: 3.5, fill: { color: PURPLE, transparency: 72 }, line: { color: PURPLE, transparency: 72 } });
  s.addShape(pres.shapes.OVAL, { x: -0.8, y: 3.8, w: 2.8, h: 2.8, fill: { color: PINK, transparency: 72 }, line: { color: PINK, transparency: 72 } });

  slideTitle(s, "Ce qu'on a appris aujourd'hui 🎓", WHITE);

  const summary = [
    { icon: "💡", text: "Une donnée = une information numérique ; une BDD = le conteneur organisé qui la stocke" },
    { icon: "🛡️", text: "Le DBA gère, sécurise et optimise les BDD (installation, backup, accès, perf, migration)" },
    { icon: "☁️", text: "Le Cloud permet de louer des ressources à la demande — le DBA doit s'y adapter" },
    { icon: "🔁", text: "Scripts Bash/Python = 1er pas vers l'automatisation, mais fragiles et non-idempotents" },
    { icon: "🤖", text: "Ansible automatise la config de 1000 serveurs en décrivant l'état voulu (idempotent)" },
    { icon: "🏭", text: "Industrialisation = standardiser + reproduire à grande échelle → des semaines gagnées" },
  ];
  summary.forEach((p, i) => {
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 0.92 + i * 0.73, w: 9.0, h: 0.64, fill: { color: WHITE, transparency: 91 }, line: { color: "7C3AED", width: 1 } });
    s.addText(p.icon, { x: 0.55, y: 0.92 + i * 0.73, w: 0.7, h: 0.64, fontSize: 20, align: "center", valign: "middle", margin: 0 });
    s.addText(p.text,  { x: 1.3,  y: 0.92 + i * 0.73, w: 8.1, h: 0.64, fontSize: 11.5, color: WHITE, valign: "middle", margin: 0 });
  });

  s.addText("Merci — Des questions ? 🙋", {
    x: 0.5, y: 5.22, w: 9.0, h: 0.28, fontSize: 14, bold: true, color: YELLOW, align: "center", margin: 0
  });
}

// ── Écriture ──────────────────────────────────────────────────
pres.writeFile({ fileName: "dba_presentation.pptx" })
  .then(() => console.log("✅  dba_presentation.pptx créée !"))
  .catch(e => { console.error(e); process.exit(1); });
