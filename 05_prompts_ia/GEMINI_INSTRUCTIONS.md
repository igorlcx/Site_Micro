# GEMINI_INSTRUCTIONS.md
# Brief maître — Site de révision de microéconomie
# À lire intégralement avant d'écrire la moindre ligne de code

---

## 0. TON RÔLE ET TA MENTALITÉ

Tu n'es pas un assistant qui génère du code à la demande. Tu es une **équipe complète de développeurs senior** qui prend en charge la construction d'un produit de A à Z. Cela signifie :

- **Tu anticipes** les problèmes avant qu'ils surviennent.
- **Tu proposes** des améliorations si tu vois une meilleure façon de faire.
- **Tu ne hardcodes jamais** de données : toute donnée provient d'un fichier JSON local.
- **Tu penses en système** : chaque composant communique avec les autres proprement.
- **Tu documentes** chaque fichier que tu crées avec un commentaire d'en-tête expliquant son rôle.
- **Tu testes mentalement** chaque feature avant de la livrer : "Est-ce que ça marcherait si je lançais ça maintenant ?"
- **Tu valides l'architecture** avant de coder : structure de dossiers, imports, types TypeScript, d'abord.
- **Tu ne laisses jamais de placeholder** du type `// TODO` ou `/* données à compléter */`. Chaque composant est fonctionnel à 100% à sa livraison.

Stack technique imposée :
- **Next.js 15** (App Router)
- **TypeScript** strict
- **Tailwind CSS v4** — thème déclaré via `@theme {}` dans globals.css, **pas de tailwind.config.ts**
- **shadcn/ui** pour les composants de base
- **Framer Motion** pour toutes les animations
- **Recharts** pour les graphiques de progression
- **@xyflow/react v12** pour la mindmap (pas l'ancien `reactflow` v11)
- **localStorage** pour la persistance des données utilisateur (pièces d'or, progression, skin)
- **Pas de backend, pas de base de données distante** — tout fonctionne en local

---

## 1. CONTEXTE ET OBJECTIF DU PROJET

### Ce qu'on construit
Un site web **local** de révision de microéconomie pour préparer un partiel universitaire. Le site doit être **aussi engageant qu'une application commerciale**, pas un site scolaire basique. L'utilisateur doit avoir envie d'y revenir chaque jour.

### Les fichiers de données disponibles (déjà générés, ne jamais les modifier)
```
06_site_web/
└── public/
    └── data/
        ├── qcm.json           ← base de questions QCM
        └── flashcards.json    ← base de flashcards
    └── cours/
        └── cours_micro_complet.pdf   ← cours LaTeX compilé
```

### Structure du fichier qcm.json (schéma TypeScript attendu)
```typescript
interface Question {
  id: string;                    // ex: "qcm_001"
  chapitre_id: string;           // ex: "chapitre_03"
  question: string;
  options: [string, string, string, string];
  bonne_reponse: string;         // identique mot pour mot à l'une des options
  explication: string;
  difficulte: "facile" | "moyen" | "difficile";
}
```

### Structure du fichier flashcards.json (schéma TypeScript attendu)
```typescript
interface Flashcard {
  id: string;                    // ex: "fc_001"
  chapitre_id: string;
  recto: string;
  verso: string;
  categorie: "définition" | "formule" | "méthode" | "piège" | "exemple";
  difficulte: "facile" | "moyen" | "difficile";
}
```

---

## 2. DESIGN SYSTEM — RÈGLES ABSOLUES

### Philosophie visuelle
Le site doit ressembler à un **dashboard SaaS premium de 2025**, pas à un site éducatif classique. Les références visuelles à suivre sont :
- **Linear.app** pour la densité et la propreté de l'interface
- **Vercel Dashboard** pour les cartes de statistiques
- **Notion** pour la navigation latérale
- **Duolingo** pour l'aspect gamification et progression
- **Raycast** pour les micro-animations et la fluidité

### Palette de couleurs
```css
/* Variables CSS globales — à définir dans globals.css */
:root {
  /* Fond principal */
  --bg-primary: #0a0a0b;
  --bg-secondary: #111113;
  --bg-card: #18181b;
  --bg-card-hover: #1f1f23;

  /* Accents */
  --accent-gold: #f59e0b;        /* pièces d'or, récompenses */
  --accent-gold-light: #fbbf24;
  --accent-blue: #3b82f6;        /* actions primaires, liens */
  --accent-blue-light: #60a5fa;
  --accent-green: #10b981;       /* succès, bonnes réponses */
  --accent-red: #ef4444;         /* erreurs, mauvaises réponses */
  --accent-purple: #8b5cf6;      /* flashcards */
  --accent-orange: #f97316;      /* QCM */

  /* Texte */
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #52525b;

  /* Bordures */
  --border-subtle: rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.1);
  --border-strong: rgba(255,255,255,0.2);
}
```

### Typographie
- **Police principale** : `Inter` (Google Fonts)
- **Police monospace** (formules, code) : `JetBrains Mono`
- **Tailles** : suivre l'échelle Tailwind : text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px), text-3xl (30px), text-4xl (36px)
- **Poids** : font-normal (400), font-medium (500), font-semibold (600), font-bold (700)
- **Jamais de text-xs pour du contenu principal** — réservé aux labels et badges uniquement

### Règles de composants
1. **Cards** : `bg-card`, `border border-[var(--border-subtle)]`, `rounded-xl`, `p-6`, hover avec `transition-all duration-200` et légère élévation via `hover:border-[var(--border-default)]`
2. **Boutons primaires** : fond `accent-blue`, texte blanc, `rounded-lg`, `px-4 py-2`, hover avec léger éclaircissement
3. **Boutons secondaires** : fond transparent, `border border-[var(--border-default)]`, hover avec `bg-white/5`
4. **Badges** : `rounded-full`, `px-2.5 py-0.5`, `text-xs font-medium`
5. **Inputs** : `bg-bg-secondary`, `border border-[var(--border-default)]`, `rounded-lg`, focus ring en `accent-blue`

### Animations obligatoires (Framer Motion)
```typescript
// Entrée de page standard
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -8 }
}

// Entrée de liste avec stagger
const containerVariants = {
  animate: { transition: { staggerChildren: 0.05 } }
}
const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 }
}

// Hover de carte
const cardHover = {
  whileHover: { scale: 1.01, transition: { duration: 0.15 } }
}
```

Chaque changement de page doit utiliser `AnimatePresence` avec `pageVariants`.
Chaque liste de cartes doit utiliser `containerVariants` + `itemVariants`.
Les transitions de réponse (bonne/mauvaise) doivent utiliser des animations de couleur fluides.

### Micro-interactions obligatoires
- Boutons : légère compression au click (`whileTap: { scale: 0.97 }`)
- Flashcard : flip 3D via `rotateY` sur l'axe Y (voir section Flashcards)
- Pièces d'or gagnées : animation de particules dorées qui explosent et se dispersent
- Bonne réponse : fond qui pulse en vert pendant 0.5s
- Mauvaise réponse : shake horizontal de la carte (3 oscillations en 0.3s)
- Progress bar : remplissage animé avec `ease-out`
- Navigation sidebar : indicateur actif avec sliding underline animé

---

## 3. LAYOUT GLOBAL

### Sidebar (navigation latérale)
```
Largeur : 240px (desktop) / drawer sur mobile
Position : fixe à gauche, full-height

Structure :
┌─────────────────────┐
│  🏴‍☠️  MICRO QUEST     │  ← Logo + nom (cliquable → accueil)
│                     │
│  ───────────────    │
│                     │
│  [avatar pirate]    │  ← skin actuel du pirate (SVG animé)
│  Capitaine [nom]    │
│  ●●●○○ Niveau 3     │  ← XP bar
│  🪙 247 pièces       │  ← compteur or (animé à chaque gain)
│                     │
│  ───────────────    │
│                     │
│  🏠 Accueil          │
│  📚 Cours complet    │
│  📋 Fiches & méthodes│
│  🏋️ Exercices TD     │
│  🃏 Flashcards       │
│  ❓ QCM              │
│  🗺️ Mindmap          │
│  🛒 Shop pirate      │
│                     │
│  ───────────────    │
│                     │
│  📊 Mes stats        │  ← progression globale
│                     │
└─────────────────────┘
```

L'item actif est mis en évidence avec un fond `bg-white/8` et une barre verticale colorée sur la gauche (`accent-blue` par défaut, couleur propre à chaque section).

### Topbar
```
Height : 56px
Contenu : 
- Gauche : breadcrumb de la page actuelle
- Droite : compteur de pièces animé + niveau + bouton settings
```

### Zone de contenu
```
Padding : px-8 py-6 (desktop) / px-4 py-4 (mobile)
Max-width : 1200px centré
```

---

## 4. PAGE D'ACCUEIL (Dashboard)

### Layout
Grille de cards en bento layout :
```
┌─────────────────┬─────────────────┬─────────────┐
│  Bienvenue 👋   │  Streak 🔥      │  Pièces 🪙  │
│  [message]      │  X jours         │  XXX or     │
├────────┬────────┴─────────────────┴─────────────┤
│ Cours  │   Progression globale (barre + %)       │
│ PDF 📚 ├─────────────────────────────────────────┤
│        │   Dernière session : chapitre X          │
├────────┴─────────────────────────────────────────┤
│  QCM ❓  │  Flashcards 🃏  │  Exercices 🏋️        │
│ score    │  X maîtrisées  │  Y complétés          │
│ moyen    │                │                       │
└──────────┴────────────────┴───────────────────────┘
```

### Données affichées (toutes depuis localStorage)
- Streak de jours consécutifs d'utilisation
- Nombre total de pièces d'or
- Score moyen au QCM sur les 5 dernières sessions
- Nombre de flashcards marquées "maîtrisées"
- Progression par chapitre (% de QCM réussis par chapitre)
- Graphique Recharts : évolution du score QCM dans le temps (LineChart)

### Message de bienvenue dynamique
```typescript
const messages = [
  "Prêt à dominer la micro, Capitaine ?",
  "Les marchés n'attendent pas. En avant !",
  "Chaque flashcard est une pièce d'or gagnée.",
  "Ton adversaire révise en ce moment. Et toi ?"
]
// Sélection aléatoire à chaque visite
```

---

## 5. SECTION COURS COMPLET

### Objectif
Afficher le PDF du cours LaTeX compilé dans un viewer intégré fluide, avec navigation latérale par chapitre.

### Implémentation
```typescript
// Utiliser react-pdf (pdfjs-dist) pour le rendu du PDF
// Import : import { Document, Page, pdfjs } from 'react-pdf'
// Worker : pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'
```

### Layout
```
┌──────────────────────┬─────────────────────────────────┐
│  Navigation chapitres│  Viewer PDF                      │
│  (sticky, scrollable)│  ┌───────────────────────────┐   │
│                      │  │                           │   │
│  Chapitre 1 ✓       │  │   [Page PDF rendue]        │   │
│  Chapitre 2 ✓       │  │                           │   │
│  Chapitre 3 ●       │  │                           │   │
│  Chapitre 4          │  └───────────────────────────┘   │
│  ...                 │  [ < Précédent ] [ Page 3/47 ] [ Suivant > ] │
│                      │  [Zoom -] [100%] [Zoom +] [Plein écran]      │
└──────────────────────┴─────────────────────────────────┘
```

### Features
- Navigation par chapitre (jump to page)
- Zoom in/out
- Mode plein écran
- Mémorisation de la dernière page lue (localStorage)
- Indicateur visuel de progression (% du PDF lu)
- Bouton "Reprendre" qui repart de la dernière page

---

## 6. SECTION FICHES & MÉTHODES

### Objectif
Afficher des fiches synthétiques riches par chapitre. **Il n'existe pas de fichier de fiches pré-généré** — tu dois créer `public/data/fiches.json` en générant toi-même le contenu à partir de ta connaissance de la microéconomie, en t'appuyant sur les titres/thèmes visibles dans `flashcards.json` et `qcm.json` pour identifier les chapitres et leurs concepts clés.

### ⚠️ Données à générer — fiches.json

Tu dois créer `public/data/fiches.json` avec cette structure. **Ne jamais laisser un champ vide ou placeholder** — chaque fiche doit être rédigée avec du vrai contenu pédagogique :

```typescript
interface Methode {
  situation: string;          // "Quand tu as une fonction de demande P(Q) et un monopoleur..."
  etapes: string[];           // ["1. Écrire la recette totale RT = P(Q)·Q", "2. Dériver pour obtenir Rm..."]
}

interface Fiche {
  id: string;                 // "fiche_01"
  chapitre_id: string;        // "chapitre_01" à "chapitre_08"
  titre: string;              // "Surplus du consommateur et du producteur"
  intuition: string;          // Explication vulgarisée en 2-3 phrases, sans jargon
  moyen_mnemo: string;        // Astuce mémorielle concrète et originale
  resume_condense: string[];  // 4-6 bullet points — les points clés incontournables
  methodes: Methode[];        // 2-4 méthodes de résolution typiques du chapitre
  concepts_cles: string[];    // Mots-clés du chapitre (pour la recherche)
  exercices_lies: string[];   // IDs d'exercices associés, ex: ["ex_001", "ex_002"]
}
```

### Contenu attendu — une fiche par chapitre (8 fiches minimum)

Générer une fiche complète pour chacun des chapitres présents dans `flashcards.json` :
`chapitre_01`, `chapitre_02`, `chapitre_03`, `chapitre_04`, `chapitre_05`, `chapitre_06`, `chapitre_07`, `chapitre_08`.

Pour chaque fiche :
- **`intuition`** : expliquer le concept central comme à un étudiant qui n'a jamais vu le sujet — une analogie concrète est fortement recommandée
- **`moyen_mnemo`** : une astuce mémorielle originale et efficace (acronyme, histoire, analogie courte)
- **`resume_condense`** : les 4-6 points absolument incontournables pour l'examen, formulés comme des règles actionnables
- **`methodes`** : les procédures de résolution les plus fréquentes en TD/examen pour ce chapitre (2 à 4 méthodes)
- **`concepts_cles`** : les termes du chapitre qui permettent la recherche textuelle

### Layout — Page liste

```
┌──────────────────────────────────────────────────────┐
│  Fiches de révision                                  │
│  [Filtre: Tous | Chapitre 1 | ... | Chapitre 8]      │
│  [Barre de recherche sur titre + concepts_cles]      │
├──────────────┬───────────────┬──────────────────────┤
│ Chapitre 1   │ Chapitre 2    │ Chapitre 3            │
│ [titre]      │ [titre]       │ [titre]               │
│ X méthodes  │ Y méthodes    │ Z méthodes            │
│ [Voir →]     │ [Voir →]      │ [Voir →]             │
└──────────────┴───────────────┴──────────────────────┘
```

### Layout — Page détail d'un chapitre

```
┌──────────────────────────────────────────────────────┐
│  ← Retour   |   Chapitre 3 : [fiche.titre]           │
├──────────────────────────────────────────────────────┤
│  📌 Intuition                                        │
│  [fiche.intuition]                                   │
├──────────────────────────────────────────────────────┤
│  🧠 Moyen mnémotechnique                             │
│  [fiche.moyen_mnemo]                                 │
├──────────────────────────────────────────────────────┤
│  ⚡ Résumé condensé                                   │
│  • [fiche.resume_condense[0]]                        │
│  • [fiche.resume_condense[1]]  ...                   │
├──────────────────────────────────────────────────────┤
│  🔧 Méthodes de résolution                           │
│  ┌──────────────────────────────────────────────┐   │
│  │  Situation : [methode.situation]             │   │
│  │  1. [methode.etapes[0]]                      │   │
│  │  2. [methode.etapes[1]]  ...                 │   │
│  └──────────────────────────────────────────────┘   │
│  [répété pour chaque méthode]                        │
├──────────────────────────────────────────────────────┤
│  🔗 Exercices associés                               │
│  [liens vers les exercices de fiche.exercices_lies]  │
└──────────────────────────────────────────────────────┘
```

### Rendu des formules dans les fiches

Tous les champs texte d'une `Fiche` peuvent contenir des formules LaTeX avec le délimiteur `$...$`. Utiliser `MathRenderer` pour afficher `intuition`, `resume_condense`, et les `etapes` des méthodes :

```typescript
// src/components/fiches/FicheDetail.tsx
import { MathRenderer } from '@/components/ui/MathRenderer';

// Intuition
<MathRenderer text={fiche.intuition} className="text-base leading-relaxed" />

// Chaque bullet du résumé
{fiche.resume_condense.map((point, i) => (
  <li key={i}><MathRenderer text={point} /></li>
))}

// Chaque étape de méthode
{methode.etapes.map((etape, i) => (
  <p key={i}><MathRenderer text={etape} /></p>
))}
```

---

## 7. SECTION EXERCICES TD

### Objectif
Permettre à l'utilisateur de sélectionner un chapitre, voir les exercices disponibles, puis les résoudre **pas à pas** avec correction étape par étape.

### Données
Les exercices sont stockés dans un fichier `public/data/exercices.json` que tu génères avec cette structure :
```typescript
interface Exercice {
  id: string;                    // ex: "ex_001"
  chapitre_id: string;
  titre: string;
  resume: string;                // max 60 mots — ce qui est travaillé
  difficulte: "facile" | "moyen" | "difficile";
  duree_estimee: number;         // en minutes
  etapes: Etape[];
}

interface Etape {
  numero: number;
  question: string;
  indice?: string;               // optionnel : hint si l'utilisateur est bloqué
  reponse: string;               // correction complète
  explication_logique: string;   // "pourquoi ce raisonnement ?"
  moyen_mnemo?: string;          // optionnel : astuce pour retenir
}
```

### Layout — Page sélection
```
┌──────────────────────────────────────────────────────┐
│  Exercices TD                                        │
│  [Filtre par chapitre]  [Filtre par difficulté]      │
├──────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────┐  │
│  │ TD 1 — Offre et demande                        │  │
│  │ Chapitre 1 · Moyen · ~20 min                   │  │
│  │ Calcul d'équilibre partiel, effets d'une taxe  │  │
│  │ [Commencer →]          [🪙 +30 pièces]         │  │
│  └────────────────────────────────────────────────┘  │
│  [Répété pour chaque exercice]                       │
└──────────────────────────────────────────────────────┘
```

### Layout — Mode résolution pas à pas
```
┌──────────────────────────────────────────────────────┐
│  ← Retour   |   TD 1 — Offre et demande              │
│  [Progress bar : Étape 2 / 5]                        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ÉTAPE 2                                             │
│  ─────────────────────────────────────────────────   │
│  [Texte de la question]                              │
│                                                      │
│  💡 [Bouton "Voir un indice"] ← révèle l'indice      │
│                                                      │
│  [Textarea pour la réponse de l'utilisateur]         │
│                                                      │
│  [Bouton "Voir la correction"]                       │
│       ↓ (après clic, animation de révélation)        │
│  ┌──────────────────────────────────────────────┐   │
│  │  ✅ Correction                               │   │
│  │  [Réponse complète]                          │   │
│  │                                              │   │
│  │  💡 Logique : [explication_logique]          │   │
│  │  🧠 Astuce : [moyen_mnemo si présent]        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [← Étape précédente]           [Étape suivante →]  │
└──────────────────────────────────────────────────────┘
```

### Récompenses
- Compléter un exercice entier : +30 pièces d'or
- Animation de pièces qui explosent à la complétion
- Marquage de l'exercice comme "Complété" en localStorage

---

## 8. SECTION FLASHCARDS

### Objectif
Interface de révision style Anki, avec sélection de chapitre ou mode "Salade" (toutes les cartes mélangées).

### Algorithme de sélection
```typescript
function getSessionCards(chapitreId: string | "all", count: number = 20): Flashcard[] {
  const pool = chapitreId === "all" 
    ? allFlashcards 
    : allFlashcards.filter(f => f.chapitre_id === chapitreId);
  
  // Priorité aux cartes non vues ou mal maîtrisées
  const unseen = pool.filter(f => !seenCards.includes(f.id));
  const struggling = pool.filter(f => strugglingCards.includes(f.id));
  const mastered = pool.filter(f => masteredCards.includes(f.id));
  
  // Mix : 50% non vues, 30% à retravailler, 20% maîtrisées (pour renforcement)
  return shuffle([
    ...unseen.slice(0, Math.floor(count * 0.5)),
    ...struggling.slice(0, Math.floor(count * 0.3)),
    ...mastered.slice(0, Math.floor(count * 0.2))
  ]).slice(0, count);
}
```

### Layout — Sélection
```
┌──────────────────────────────────────────────────────┐
│  Flashcards                                          │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ 🎲 Salade│  │ Chap. 1  │  │ Chap. 2  │  ...    │
│  │ Tout mél.│  │ 45 cartes│  │ 38 cartes│          │
│  │ [Jouer]  │  │ [Jouer]  │  │ [Jouer]  │          │
│  └──────────┘  └──────────┘  └──────────┘          │
│                                                      │
│  Mes stats :                                         │
│  ✅ 67 maîtrisées  |  🔄 23 à retravailler  |  ⬜ 45 non vues │
└──────────────────────────────────────────────────────┘
```

### Layout — Session de flashcards
```
┌──────────────────────────────────────────────────────┐
│  Carte 7 / 20   [████████░░░░░░░░░░░] 35%           │
│  🃏 Définitions · Chapitre 2                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │                                              │   │
│  │   [RECTO visible au départ]                  │   │
│  │   Quelle est la formule de l'élasticité      │   │
│  │   prix de la demande ?                       │   │
│  │                                              │   │
│  │         [Cliquer pour retourner]             │   │
│  │               ↑↑↑ (icône flip)               │   │
│  └──────────────────────────────────────────────┘   │
│       Animation flip 3D sur l'axe Y → révèle VERSO  │
│                                                      │
│  (Après flip, 3 boutons apparaissent en bas :)       │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ 😰 Raté  │  │ 🤔 À revoir  │  │ ✅ Maîtrisé   │  │
│  │ -0 pièce │  │ +5 pièces    │  │ +10 pièces    │  │
│  └──────────┘  └──────────────┘  └───────────────┘  │
└──────────────────────────────────────────────────────┘
```

### Animation flip 3D obligatoire
```typescript
// Utiliser Framer Motion avec perspective
const cardVariants = {
  front: { rotateY: 0 },
  back: { rotateY: 180 }
}
// Container avec style={{ perspective: "1000px" }}
// Recto avec style={{ backfaceVisibility: "hidden" }}
// Verso avec style={{ backfaceVisibility: "hidden", rotateY: 180 }} par défaut
```

### Persistance localStorage
```typescript
interface FlashcardProgress {
  mastered: string[];    // IDs des cartes maîtrisées
  struggling: string[];  // IDs à retravailler
  seen: string[];        // IDs déjà vus
}
// Clé localStorage : "micro_quest_flashcards"  ← identique à STORAGE_KEYS
```

---

## 9. SECTION QCM

### Objectif
Générer une session de 15 questions aléatoires depuis `qcm.json`, avec un scoring final et des explications détaillées.

### ⚠️ Note importante sur les chapitres

Les données ne sont **pas parfaitement symétriques** entre les deux fichiers :

| Fichier | Chapitres disponibles |
|---------|----------------------|
| `qcm.json` | chapitre_01 à chapitre_07 + `methodes` |
| `flashcards.json` | chapitre_01 à chapitre_07 + `chapitre_08` |

**`chapitre_08`** existe dans les flashcards (45 cartes) mais **pas dans le QCM**. Conséquences à gérer :
- Le sélecteur de chapitres dans le QCM **ne doit pas afficher `chapitre_08`** comme option filtrable (0 questions disponibles)
- Le sélecteur de chapitres dans les Flashcards **doit afficher `chapitre_08`** normalement
- La clé `methodes` dans qcm.json correspond à un chapitre de méthodes transversales — l'afficher dans le filtre QCM avec le label "Méthodes générales"

```typescript
// Dans lib/qcm.ts — chapitres disponibles pour le filtre QCM
export const QCM_CHAPITRES = [
  { id: "chapitre_01", label: "Chapitre 1" },
  { id: "chapitre_02", label: "Chapitre 2" },
  { id: "chapitre_03", label: "Chapitre 3" },
  { id: "chapitre_04", label: "Chapitre 4" },
  { id: "chapitre_05", label: "Chapitre 5" },
  { id: "chapitre_06", label: "Chapitre 6" },
  { id: "chapitre_07", label: "Chapitre 7" },
  { id: "methodes",    label: "Méthodes générales" },
  // chapitre_08 intentionnellement absent — pas de QCM pour ce chapitre
];
```

### Algorithme de sélection
```typescript
function generateQCMSession(chapitreFilter?: string): Question[] {
  const pool = chapitreFilter 
    ? questions.filter(q => q.chapitre_id === chapitreFilter)
    : questions;
  
  // Distribution équilibrée par difficulté
  const faciles = shuffle(pool.filter(q => q.difficulte === "facile")).slice(0, 5);
  const moyens = shuffle(pool.filter(q => q.difficulte === "moyen")).slice(0, 7);
  const difficiles = shuffle(pool.filter(q => q.difficulte === "difficile")).slice(0, 3);
  
  // Si filtre par chapitre avec peu de questions, compléter avec les disponibles
  const total = faciles.length + moyens.length + difficiles.length;
  if (total < 15) {
    const remaining = shuffle(pool).filter(
      q => ![...faciles, ...moyens, ...difficiles].find(x => x.id === q.id)
    ).slice(0, 15 - total);
    return shuffle([...faciles, ...moyens, ...difficiles, ...remaining]);
  }
  
  return shuffle([...faciles, ...moyens, ...difficiles]);
}
```

### Layout — Configuration
```
┌──────────────────────────────────────────────────────┐
│  QCM de révision                                     │
│  [Mode : Tous chapitres] ou [Sélectionner chapitre]  │
│                                                      │
│  15 questions · ~10 minutes                          │
│  Distribution : 5 faciles · 7 moyennes · 3 difficiles│
│                                                      │
│  Ton historique :                                    │
│  Dernière session : 11/15 (73%)                      │
│  Meilleur score : 14/15 (93%)                        │
│  Moyenne : 68%                                       │
│                                                      │
│  [🎯 Lancer le QCM]                                  │
└──────────────────────────────────────────────────────┘
```

### Layout — Question en cours
```
┌──────────────────────────────────────────────────────┐
│  Question 8 / 15   [████████████░░░] 53%             │
│  🔴 Difficile · Chapitre 4                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Texte de la question]                              │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │  A  Réponse option A                         │   │  ← hover : léger fond
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  B  Réponse option B                         │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  C  Réponse option C                         │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │  D  Réponse option D                         │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ⏱️ Pas de timer — prends le temps de réfléchir     │
└──────────────────────────────────────────────────────┘
```

### Feedback immédiat après sélection
- **Bonne réponse** : fond de la carte → vert, animation pulse, sons (optionnel)
- **Mauvaise réponse** : fond rouge sur la mauvaise, fond vert sur la bonne, animation shake
- Dans les deux cas : explication qui apparaît par slide-down en dessous des options
- Bouton "Question suivante" qui apparaît après 0.8s

### Layout — Résultats finaux
```
┌──────────────────────────────────────────────────────┐
│  🎉 Session terminée !                               │
│                                                      │
│        [Grand score animé]                           │
│             11 / 15                                  │
│            73% ★★★☆☆                               │
│                                                      │
│  🪙 +110 pièces gagnées !  ← animation explosion or │
│                                                      │
│  [Graphique radar] des performances par chapitre     │
│                                                      │
│  Détail des réponses :                               │
│  [Liste scrollable : ✅ ou ❌ + explication]         │
│                                                      │
│  [🔄 Rejouer]  [📊 Voir mes stats]  [🏠 Accueil]   │
└──────────────────────────────────────────────────────┘
```

### Récompenses QCM
```typescript
function calculateQCMReward(score: number, total: number): number {
  const percentage = score / total;
  if (percentage >= 0.93) return 150;  // Parfait ou quasi
  if (percentage >= 0.8)  return 110;
  if (percentage >= 0.6)  return 80;
  if (percentage >= 0.4)  return 50;
  return 20;                           // Effort récompensé même en cas d'échec
}
```

---

## 10. SECTION MINDMAP

### Objectif
Afficher une mindmap interactive de tous les concepts du cours, avec formules en KaTeX.

### Implémentation technique
```typescript
// Utiliser React Flow v12 (@xyflow/react) pour la mindmap interactive
// Import : import { ReactFlow, Node, Edge } from '@xyflow/react'
// Formules : utiliser KaTeX directement via 'katex' (MathRenderer component — voir section 14)
// Données : public/data/mindmap.json (à générer avec la structure ci-dessous)
```

### Structure mindmap.json
```typescript
interface MindmapNode {
  id: string;
  label: string;
  type: "root" | "chapitre" | "concept" | "formule";
  formule?: string;         // LaTeX si type === "formule"
  position: { x: number, y: number };
  couleur?: string;
}

interface MindmapEdge {
  id: string;
  source: string;
  target: string;
}
```

### Layout
```
┌──────────────────────────────────────────────────────┐
│  Mindmap · Microéconomie   [🔍 Rechercher] [Reset]   │
│  [Zoom +] [Zoom -] [Centrer]                         │
├──────────────────────────────────────────────────────┤
│                                                      │
│         [Mindmap interactive React Flow]              │
│         - Nœuds draggables                           │
│         - Zoom molette                               │
│         - Click sur nœud → sidebar détail            │
│         - Formules KaTeX rendues dans les nœuds      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 11. GAMIFICATION COMPLÈTE

### Système de pièces d'or
Toutes les pièces sont stockées en localStorage. Le compteur dans la sidebar se met à jour en temps réel avec une animation de +X qui monte et disparaît.

```typescript
// Clé localStorage : "micro_quest_player"  ← identique à STORAGE_KEYS
interface PlayerData {
  nom: string;             // "Capitaine" par défaut
  pieces: number;
  niveau: number;
  xp: number;
  xp_pour_prochain_niveau: number;
  streak: number;          // jours consécutifs
  derniere_visite: string; // ISO date
  skin_actuel: string;     // ID du skin équipé
  skins_debloquees: string[];
  stats: {
    qcm_total: number;
    qcm_scores: number[];
    flashcards_maitrisees: number;
    exercices_completes: string[];   // IDs des exercices complétés
  }
}
```

### Tableau des récompenses
| Action | Pièces |
|--------|--------|
| Flashcard "Maîtrisée" | +10 |
| Flashcard "À revoir" | +5 |
| QCM complet (score ≥ 93%) | +150 |
| QCM complet (score ≥ 80%) | +110 |
| QCM complet (score ≥ 60%) | +80 |
| QCM complet (score ≥ 40%) | +50 |
| QCM complet (score < 40%) | +20 |
| Exercice TD complété | +30 |
| Premier QCM du jour | +25 (bonus streak) |
| Streak 7 jours | +100 (bonus) |

Ces valeurs sont déclarées dans `src/lib/constants.ts` comme `RECOMPENSES` — utiliser ces constantes partout, jamais de chiffres hardcodés :

```typescript
// Rappel : déclaré dans src/lib/constants.ts (voir SITE_ARCHITECTURE.md)
// RECOMPENSES.FLASHCARD_MAITRISE = 10
// RECOMPENSES.FLASHCARD_A_REVOIR = 5
// RECOMPENSES.QCM_PARFAIT = 150  // score >= 93%
// RECOMPENSES.QCM_EXCELLENT = 110 // score >= 80%
// RECOMPENSES.QCM_BON = 80        // score >= 60%
// RECOMPENSES.QCM_MOYEN = 50      // score >= 40%
// RECOMPENSES.QCM_TENTE = 20      // score < 40%
// RECOMPENSES.EXERCICE_COMPLETE = 30
// RECOMPENSES.BONUS_PREMIER_QCM = 25
// RECOMPENSES.BONUS_STREAK_7 = 100
```

### Animation de gain de pièces
À chaque gain, une animation se déclenche :
1. Des particules dorées apparaissent autour du compteur dans la sidebar
2. Le compteur augmente avec une animation de chiffres qui défilent
3. Un toast `+X 🪙` apparaît en bas à droite pendant 2s

Implémentation via Framer Motion avec `AnimatePresence` pour les particules.

### Système de niveaux
```typescript
const NIVEAUX = [
  { niveau: 1, xp_requis: 0,    titre: "Mousse" },
  { niveau: 2, xp_requis: 100,  titre: "Matelot" },
  { niveau: 3, xp_requis: 300,  titre: "Quartier-maître" },
  { niveau: 4, xp_requis: 600,  titre: "Second" },
  { niveau: 5, xp_requis: 1000, titre: "Capitaine" },
  { niveau: 6, xp_requis: 1500, titre: "Capitaine émérite" },
  { niveau: 7, xp_requis: 2500, titre: "Amiral de la micro" }
]
// L'XP est égal aux pièces d'or gagnées (1 pièce = 1 XP)
```

---

## 12. SECTION SHOP PIRATE

### Concept
Le joueur dépense ses pièces d'or pour améliorer l'apparence de son avatar pirate affiché dans la sidebar. Le pirate est un SVG animé qui change selon le skin équipé.

### Catalogue de skins (structure JSON)
```typescript
// public/data/shop.json
interface SkinItem {
  id: string;
  nom: string;
  description: string;
  prix: number;
  categorie: "chapeau" | "veste" | "accessoire" | "fond";
  svg_preview: string;      // chemin vers SVG preview
  svg_equipped: string;     // chemin vers SVG version équipée
  rarete: "commun" | "rare" | "épique" | "légendaire";
}
```

### Catalogue minimum à créer (SVG simples)
```
Chapeau de base (gratuit, départ)
Chapeau tricorne — 200 pièces — Commun
Chapeau capitaine rouge — 500 pièces — Rare
Bandana rouge — 150 pièces — Commun
Veste de base (gratuite, départ)  
Veste galonnée or — 400 pièces — Rare
Manteau de capitaine — 800 pièces — Épique
Lunette de navigateur — 300 pièces — Rare
Perroquet sur l'épaule — 600 pièces — Épique
Carte au trésor dans la main — 1000 pièces — Légendaire
```

### Layout — Shop
```
┌──────────────────────────────────────────────────────┐
│  Shop du Capitaine         🪙 247 pièces disponibles │
├──────────────────────────────────────────────────────┤
│                                                      │
│  [Aperçu pirate actuel — SVG grande taille]          │
│  "Capitaine niveau 3 — Quartier-maître"              │
│                                                      │
│  [Filtre : Tous | Chapeau | Veste | Accessoire | Fond]│
├──────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌────────────┐  ┌────────────┐     │
│  │ [SVG item] │  │ [SVG item] │  │ 🔒 [SVG]  │     │
│  │ Tricorne   │  │ Bandana 🔴 │  │ Manteau   │     │
│  │ 200 🪙     │  │ 150 🪙     │  │ 800 🪙    │     │
│  │ [Acheter]  │  │ ✅ Équipé  │  │ [Acheter] │     │
│  └────────────┘  └────────────┘  └────────────┘     │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Logique d'achat
```typescript
function buyItem(itemId: string): boolean {
  const item = shopItems.find(i => i.id === itemId);
  if (!item) return false;
  if (playerData.pieces < item.prix) return false;
  if (playerData.skins_debloquees.includes(itemId)) return false;
  
  playerData.pieces -= item.prix;
  playerData.skins_debloquees.push(itemId);
  savePlayerData(playerData);
  triggerPurchaseAnimation();  // confettis + son
  return true;
}
```

---

## 13. SYSTÈME DE PERSISTANCE LOCALE

### Architecture localStorage
```typescript
const STORAGE_KEYS = {
  PLAYER_DATA: "micro_quest_player",
  FLASHCARD_PROGRESS: "micro_quest_flashcards",
  QCM_HISTORY: "micro_quest_qcm_history",
  EXERCICES_PROGRESS: "micro_quest_exercices",
  COURS_POSITION: "micro_quest_cours_position",
}

// Hook custom pour abstraire localStorage
function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch { return defaultValue; }
  });
  
  const setAndPersist = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  
  return [value, setAndPersist] as const;
}
```

---

## 14. RENDU DES FORMULES MATHÉMATIQUES — RÈGLES CRITIQUES

Cette section est **non négociable**. 142 flashcards et de nombreuses questions contiennent des formules LaTeX. Un rendu raté = le site est inutilisable pour réviser. Tu dois tout lire et tout appliquer.

### Librairie imposée : KaTeX (pas MathJax)

KaTeX est obligatoire pour deux raisons : il est **synchrone** (pas de flash de contenu non rendu) et **ultra-rapide**. MathJax est trop lent pour un affichage de 20 flashcards à la suite.

```bash
npm install katex
npm install --save-dev @types/katex
```

```typescript
// Dans src/app/layout.tsx — importer le CSS KaTeX en JS (pas dans globals.css)
import 'katex/dist/katex.min.css'  // ← OBLIGATOIRE, en haut de layout.tsx
```

### Format des données dans les JSON

Les formules dans `flashcards.json` et `qcm.json` utilisent **exclusivement** le délimiteur `$...$` pour les formules inline. Les backslashes LaTeX sont stockés **doublés** dans le JSON (`\\frac`, `\\alpha`, etc.) ce qui donne des backslashes simples en JavaScript (`\frac`, `\alpha`) — c'est exactement ce qu'attend KaTeX.

```json
// Dans le JSON (stockage)
"verso": "$\\frac{p - c}{p} = \\frac{1}{\\epsilon}$"

// En JavaScript après JSON.parse() — ce que reçoit KaTeX
"$\\frac{p - c}{p} = \\frac{1}{\\epsilon}$"
// → KaTeX reçoit : \frac{p - c}{p} = \frac{1}{\\epsilon}  ✅
```

### Composant MathRenderer — à créer obligatoirement

Ce composant est le **seul** endroit dans tout le projet où KaTeX est appelé. Tous les autres composants l'utilisent, aucun n'appelle KaTeX directement.

```typescript
// src/components/ui/MathRenderer.tsx
/**
 * @file MathRenderer.tsx
 * @description Rendu de texte mixte (texte + formules LaTeX $...$)
 * Gère les cas : texte pur, formule pure, texte avec formules intercalées
 */
"use client";
import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  text: string;
  className?: string;
  displayMode?: boolean; // true pour formules centrées ($$...$$), false par défaut
  errorColor?: string;   // couleur d'erreur si formule invalide
}

export function MathRenderer({ 
  text, 
  className = '', 
  displayMode = false,
  errorColor = '#ef4444'
}: MathRendererProps) {
  if (!text) return null;

  // Séparer le texte en segments : texte pur et formules $...$
  const segments = parseTextWithMath(text);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.content}</span>;
        }
        
        // Segment mathématique
        try {
          const html = katex.renderToString(segment.content, {
            displayMode: segment.display || displayMode,
            throwOnError: false,
            errorColor,
            strict: false,
            trust: false,
            // Macros utiles pour la microéconomie
            macros: {
              "\\R": "\\mathbb{R}",
              "\\E": "\\mathbb{E}",
              "\\Prob": "\\mathbb{P}",
            }
          });
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
              className={segment.display ? 'block my-2 text-center' : 'inline'}
            />
          );
        } catch (err) {
          // Fallback : afficher la formule brute si KaTeX échoue
          return (
            <code key={index} className="text-red-400 text-sm px-1">
              {segment.content}
            </code>
          );
        }
      })}
    </span>
  );
}

// ─── Parser texte + formules ──────────────────────────────────────────────────
interface Segment {
  type: 'text' | 'math';
  content: string;
  display?: boolean;
}

function parseTextWithMath(text: string): Segment[] {
  const segments: Segment[] = [];
  // Regex : $$ d'abord (display), puis $ (inline)
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Texte avant la formule
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: text.slice(lastIndex, match.index)
      });
    }

    const raw = match[0];
    const isDisplay = raw.startsWith('$$');
    const content = isDisplay
      ? raw.slice(2, -2).trim()
      : raw.slice(1, -1).trim();

    segments.push({
      type: 'math',
      content,
      display: isDisplay
    });

    lastIndex = regex.lastIndex;
  }

  // Texte restant après la dernière formule
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      content: text.slice(lastIndex)
    });
  }

  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
}
```

### Utilisation dans chaque composant

**Dans les flashcards (recto et verso) :**
```typescript
// src/components/flashcards/FlashcardCard.tsx
import { MathRenderer } from '@/components/ui/MathRenderer';

// Recto de la carte
<MathRenderer 
  text={flashcard.recto} 
  className="text-lg font-medium text-center leading-relaxed"
/>

// Verso de la carte (après flip)
<MathRenderer 
  text={flashcard.verso}
  className="text-base text-center leading-relaxed"
/>
```

**Dans le QCM (question + options + explication) :**
```typescript
// src/components/qcm/QuestionCard.tsx
import { MathRenderer } from '@/components/ui/MathRenderer';

// Texte de la question
<MathRenderer 
  text={question.question}
  className="text-lg font-medium leading-relaxed mb-6"
/>

// Chaque option
{question.options.map((option, i) => (
  <button key={i} onClick={() => handleAnswer(option)} className={optionClass}>
    <span className="font-medium text-[var(--accent-blue)] mr-3">
      {['A', 'B', 'C', 'D'][i]}
    </span>
    <MathRenderer text={option} className="flex-1 text-left" />
  </button>
))}

// Explication après réponse
<MathRenderer 
  text={question.explication}
  className="text-sm text-[var(--text-secondary)] leading-relaxed"
/>
```

**Dans les fiches et méthodes :**
```typescript
// Partout où un texte peut contenir une formule
<MathRenderer text={fiche.contenu} className="text-base leading-relaxed" />
```

### Styling KaTeX — surcharges CSS obligatoires

KaTeX injecte ses propres styles. Il faut les harmoniser avec le design dark mode du site. Ajouter dans `globals.css` :

```css
/* ─── KaTeX dark mode overrides ───────────────────────────────────────────── */

/* Couleur du texte mathématique adapté au dark mode */
.katex { color: var(--text-primary); }
.katex .mord, .katex .mbin, .katex .mrel,
.katex .mopen, .katex .mclose, .katex .mpunct,
.katex .minner { color: inherit; }

/* Taille harmonisée avec Inter */
.katex { font-size: 1.05em; }

/* Formules display (centrées) */
.katex-display {
  margin: 0.8em 0;
  overflow-x: auto;    /* scroll horizontal si formule trop large */
  overflow-y: hidden;
  padding: 0.2em 0;
}

/* Fractions et exposants lisibles */
.katex .frac-line { border-color: var(--text-primary); }

/* Scroll horizontal pour les très longues formules sur mobile */
.katex-display > .katex {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
```

### Tester le rendu — checklist avant livraison

Avant de livrer la section Flashcards et QCM, tester manuellement ces formules représentatives :

```typescript
// Coller ce composant de test dans une page /test-math temporaire
const TEST_FORMULAS = [
  "$U_A = v - p$",                                          // inline simple
  "$\\frac{p - c}{p} = \\frac{1}{\\epsilon}$",             // fraction
  "$\\int_p^\\infty D(v) \\, dv$",                         // intégrale
  "$\\max_{x, t} (u(x) - t - u_0)^\\alpha$",               // max avec indice
  "$nP(Q) + P'(Q)Q = n\\bar{c}$",                          // barre
  "$U(\\mathbf{x}) = \\left(\\sum \\alpha_\\ell x_\\ell^\\rho\\right)^{1/\\rho}$", // complexe
  "Le prix est $p = c + \\frac{1}{\\epsilon}$ au monopole", // inline dans texte
];

// Afficher chaque formule avec MathRenderer et vérifier visuellement
// Si une formule affiche du texte rouge → la formule brute s'est affichée → debug nécessaire
```

**Critères de validation :**
- ✅ Aucune formule n'affiche son code brut (ex: `$\frac{p-c}{p}$` visible tel quel)
- ✅ Aucune formule n'affiche de texte rouge (erreur KaTeX)
- ✅ Les fractions sont bien rendues verticalement
- ✅ Les indices et exposants sont bien positionnés
- ✅ Le texte mixte (texte + formule inline) s'affiche sur une seule ligne
- ✅ Sur mobile, les longues formules scrollent horizontalement sans casser le layout

---

## 15. PERFORMANCE ET QUALITÉ

### Règles absolues
1. **Pas de layout shift** au chargement — toutes les dimensions sont définies avant le render
2. **Loading states** sur tous les composants qui lisent des données (Skeleton loaders shadcn)
3. **Error boundaries** sur chaque section
4. **Lazy loading** de chaque section via `next/dynamic`
5. **Images optimisées** via `next/image`
6. **Accessibilité** : aria-labels sur tous les boutons icon-only, focus visible, rôles ARIA corrects

### Pattern de chargement des données JSON
```typescript
// Toujours via fetch côté client pour les JSON statiques
// Exemple :
const [questions, setQuestions] = useState<Question[]>([]);
useEffect(() => {
  fetch('/data/qcm.json')
    .then(res => res.json())
    .then(setQuestions)
    .catch(console.error);
}, []);
```

### TypeScript strict
- Aucun `any` autorisé
- Toutes les interfaces définies dans `src/types/index.ts`
- Zod pour valider les données JSON au chargement

---

## 16. ORDRE DE CONSTRUCTION

Construire dans cet ordre exact, livrer chaque étape complète avant de passer à la suivante :

1. **Setup initial** : Next.js, TypeScript, Tailwind, shadcn/ui, Framer Motion, configuration globals.css
2. **Layout global** : Sidebar, Topbar, système de routing, AnimatePresence entre pages
3. **Système de données** : hooks localStorage, types TypeScript, chargement JSON
4. **Page d'accueil** : dashboard avec stats, bento layout
5. **Section QCM** : la plus importante fonctionnellement
6. **Section Flashcards** : avec flip 3D
7. **Section Cours** : PDF viewer
8. **Section Exercices TD** : pas à pas
9. **Section Fiches & Méthodes**
10. **Section Mindmap**
11. **Gamification complète** : animations pièces, niveaux, streak
12. **Section Shop** : avatar SVG + catalogue
13. **Polish final** : micro-animations, responsive mobile, dark mode parfait

---

## 17. LIVRAISON

À la fin de chaque étape, fais une récapitulatif de :
- Ce qui a été créé (liste des fichiers)
- Ce qui fonctionne
- Ce qui nécessite les étapes suivantes
- Les dépendances npm à installer

Et demande confirmation avant de passer à l'étape suivante.
