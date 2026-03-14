# Prompt Claude Code — Site Micro Quest
# Coller ce prompt entier dans Claude Code au lancement de la session

---

## CONTEXTE ET MISSION

Tu es en charge de construire **de A à Z** un site web local de révision de microéconomie appelé **Micro Quest**. Tu travailles dans le dossier `06_site_web/` de ce projet.

Deux fichiers de données sont **déjà présents** dans `04_bases_donnees_site/` et devront être copiés dans `06_site_web/public/data/` :
- `qcm.json` — 170 questions QCM réparties sur 8 chapitres
- `flashcards.json` — 200 flashcards avec formules LaTeX

**Tu dois générer toi-même** les 4 fichiers JSON manquants (`fiches.json`, `exercices.json`, `mindmap.json`, `shop.json`) avec du vrai contenu pédagogique de microéconomie — aucun placeholder, aucun TODO.

**Comment travailler** : construis étape par étape en suivant l'ordre de construction défini à la fin de ce prompt. Après chaque étape, liste les fichiers créés et attends confirmation avant de passer à la suivante. Exécute les commandes npm toi-même via le terminal.

---

## STACK TECHNIQUE IMPOSÉE

| Outil | Version | Rôle |
|-------|---------|------|
| Next.js | 15 (App Router) | Framework |
| React | 19 | UI |
| TypeScript | 5.x strict | Typage |
| Tailwind CSS | **v4** (pas v3) | Styling |
| shadcn/ui | latest | Composants de base |
| Framer Motion | 11.x | Animations |
| Recharts | 2.x | Graphiques |
| @xyflow/react | **12.x** (pas reactflow v11) | Mindmap |
| react-pdf | 9.x | Viewer PDF |
| KaTeX | 0.16.x | Formules LaTeX |
| Zod | 3.x | Validation JSON |
| Lucide React | latest | Icônes |

### Commandes d'installation (dans `06_site_web/`)

```bash
# Création du projet (sans --tailwind car Tailwind v4 s'installe séparément)
npx create-next-app@latest . --typescript --app --src-dir --import-alias "@/*"

# Tailwind v4 — PAS de tailwind.config.ts en v4 (thème dans globals.css via @theme {})
npm install tailwindcss@^4 @tailwindcss/postcss@^4

# shadcn/ui
npx shadcn@latest init

# Dépendances
npm install framer-motion recharts @xyflow/react react-pdf katex zod lucide-react
npm install --save-dev @types/katex
```

---

## RÈGLES ABSOLUES

1. **Aucun `any` TypeScript** — toutes les interfaces dans `src/types/index.ts`
2. **Aucune donnée hardcodée** — tout vient des JSON dans `/public/data/`
3. **Aucun `// TODO` ou placeholder** — chaque composant est fonctionnel à 100%
4. **Chargement JSON toujours côté client** via `fetch('/data/fichier.json')` (jamais en import statique)
5. **Zod** pour valider les données JSON au premier chargement
6. **Skeleton loaders** sur tous les composants qui attendent des données
7. **Commentaire d'en-tête** sur chaque fichier créé :
   ```typescript
   /**
    * @file NomDuFichier.tsx
    * @description Rôle du composant en 1-2 phrases
    * @dependencies Liste des dépendances clés
    */
   ```
8. **Tailwind v4** : le fichier `postcss.config.mjs` doit contenir `{ '@tailwindcss/postcss': {} }`. Pas de `tailwind.config.ts`.

---

## DESIGN SYSTEM

### Palette de couleurs (variables CSS dans `:root`)

```css
--bg-primary: #0a0a0b;
--bg-secondary: #111113;
--bg-card: #18181b;
--bg-card-hover: #1f1f23;
--accent-gold: #f59e0b;
--accent-gold-light: #fbbf24;
--accent-blue: #3b82f6;
--accent-blue-light: #60a5fa;
--accent-green: #10b981;
--accent-red: #ef4444;
--accent-purple: #8b5cf6;
--accent-orange: #f97316;
--text-primary: #fafafa;
--text-secondary: #a1a1aa;
--text-muted: #52525b;
--border-subtle: rgba(255,255,255,0.06);
--border-default: rgba(255,255,255,0.1);
--border-strong: rgba(255,255,255,0.2);
--sidebar-width: 240px;
```

### globals.css complet

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --bg-primary: #0a0a0b;
  --bg-secondary: #111113;
  --bg-card: #18181b;
  --bg-card-hover: #1f1f23;
  --accent-gold: #f59e0b;
  --accent-gold-light: #fbbf24;
  --accent-blue: #3b82f6;
  --accent-blue-light: #60a5fa;
  --accent-green: #10b981;
  --accent-red: #ef4444;
  --accent-purple: #8b5cf6;
  --accent-orange: #f97316;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #52525b;
  --border-subtle: rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.1);
  --border-strong: rgba(255,255,255,0.2);
  --sidebar-width: 240px;
}

@theme {
  --color-bg-primary:    #0a0a0b;
  --color-bg-secondary:  #111113;
  --color-bg-card:       #18181b;
  --color-accent-gold:   #f59e0b;
  --color-accent-blue:   #3b82f6;
  --color-accent-green:  #10b981;
  --color-accent-red:    #ef4444;
  --color-accent-purple: #8b5cf6;
  --color-accent-orange: #f97316;
  --font-family-sans: 'Inter', sans-serif;
  --font-family-mono: 'JetBrains Mono', monospace;
  --animate-gold-float:  goldFloat 0.8s ease-out forwards;
  --animate-shake:       shake 0.3s ease-in-out;
  --animate-pulse-green: pulseGreen 0.5s ease-out;
}

@keyframes goldFloat {
  0%   { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-40px) scale(0.8); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25%       { transform: translateX(-6px); }
  75%       { transform: translateX(6px); }
}
@keyframes pulseGreen {
  0%   { background-color: transparent; }
  50%  { background-color: rgba(16, 185, 129, 0.2); }
  100% { background-color: transparent; }
}

* { box-sizing: border-box; }
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-default); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--border-strong); }
::selection { background: rgba(59, 130, 246, 0.3); color: var(--text-primary); }

/* ─── KaTeX dark mode — OBLIGATOIRE ─────────────────────────────────────── */
.katex { color: var(--text-primary); }
.katex .mord, .katex .mbin, .katex .mrel,
.katex .mopen, .katex .mclose, .katex .mpunct,
.katex .minner { color: inherit; }
.katex { font-size: 1.05em; }
.katex-display { margin: 0.8em 0; overflow-x: auto; overflow-y: hidden; padding: 0.2em 0; }
.katex .frac-line { border-color: var(--text-primary); }
.katex-display > .katex { max-width: 100%; overflow-x: auto; overflow-y: hidden; }
```

### Animations Framer Motion (à utiliser sur chaque page et liste)

```typescript
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -8 }
}
const containerVariants = {
  animate: { transition: { staggerChildren: 0.05 } }
}
const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 }
}
// Boutons : whileTap={{ scale: 0.97 }}
// Cards : whileHover={{ scale: 1.01 }}
```

### Références visuelles
Linear.app (densité), Vercel Dashboard (stats cards), Notion (sidebar), Duolingo (gamification), Raycast (micro-animations).

---

## ARBORESCENCE CIBLE

```
06_site_web/
├── public/
│   ├── data/
│   │   ├── qcm.json             ← copier depuis 04_bases_donnees_site/
│   │   ├── flashcards.json      ← copier depuis 04_bases_donnees_site/
│   │   ├── fiches.json          ← À GÉNÉRER (voir section Fiches)
│   │   ├── exercices.json       ← À GÉNÉRER (voir section Exercices)
│   │   ├── mindmap.json         ← À GÉNÉRER (voir section Mindmap)
│   │   └── shop.json            ← À GÉNÉRER (voir section Shop)
│   ├── cours/
│   │   └── cours_micro_complet.pdf  ← copier depuis 02_cours_structures/
│   ├── avatars/
│   │   ├── pirate_base.svg
│   │   ├── pirate_tricorne.svg
│   │   ├── pirate_bandana.svg
│   │   ├── pirate_capitaine.svg
│   │   ├── pirate_manteau.svg
│   │   └── pirate_amiral.svg
│   └── pdf.worker.min.js
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← import 'katex/dist/katex.min.css' + './globals.css'
│   │   ├── page.tsx             ← Dashboard
│   │   ├── globals.css
│   │   ├── cours/page.tsx
│   │   ├── fiches/page.tsx
│   │   ├── fiches/[chapitreId]/page.tsx
│   │   ├── exercices/page.tsx
│   │   ├── exercices/[exerciceId]/page.tsx
│   │   ├── flashcards/page.tsx
│   │   ├── flashcards/session/page.tsx
│   │   ├── qcm/page.tsx
│   │   ├── qcm/session/page.tsx
│   │   ├── qcm/resultats/page.tsx
│   │   ├── mindmap/page.tsx
│   │   └── shop/page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SidebarItem.tsx
│   │   │   ├── PirateAvatar.tsx
│   │   │   ├── GoldCounter.tsx
│   │   │   ├── XPBar.tsx
│   │   │   └── Topbar.tsx
│   │   ├── ui/
│   │   │   ├── MathRenderer.tsx   ← CRITIQUE (voir section KaTeX)
│   │   │   └── [composants shadcn]
│   │   ├── dashboard/
│   │   │   ├── WelcomeCard.tsx
│   │   │   ├── StreakCard.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   ├── ProgressCard.tsx
│   │   │   └── ScoreChart.tsx
│   │   ├── cours/
│   │   │   ├── PDFViewer.tsx
│   │   │   ├── ChapterNav.tsx
│   │   │   └── ViewerControls.tsx
│   │   ├── fiches/
│   │   │   ├── FicheCard.tsx
│   │   │   ├── FicheDetail.tsx
│   │   │   ├── MethodeBlock.tsx
│   │   │   └── FicheSearch.tsx
│   │   ├── flashcards/
│   │   │   ├── FlashcardCard.tsx
│   │   │   ├── FlashcardSession.tsx
│   │   │   ├── FlashcardProgress.tsx
│   │   │   ├── FlashcardResult.tsx
│   │   │   └── ChapterSelector.tsx  ← inclure chapitre_08
│   │   ├── qcm/
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── OptionButton.tsx
│   │   │   ├── ExplicationReveal.tsx
│   │   │   ├── QCMProgress.tsx
│   │   │   ├── QCMConfig.tsx
│   │   │   └── QCMResults.tsx
│   │   ├── exercices/
│   │   │   ├── ExerciceCard.tsx
│   │   │   ├── EtapeView.tsx
│   │   │   ├── CorrectionReveal.tsx
│   │   │   ├── IndiceButton.tsx
│   │   │   └── ExerciceProgress.tsx
│   │   ├── mindmap/
│   │   │   ├── MindmapCanvas.tsx
│   │   │   ├── CustomNode.tsx
│   │   │   └── NodeDetailPanel.tsx
│   │   ├── shop/
│   │   │   ├── ShopGrid.tsx
│   │   │   ├── ShopItem.tsx
│   │   │   ├── BuyConfirmModal.tsx
│   │   │   └── PiratePreview.tsx
│   │   └── gamification/
│   │       ├── GoldAnimation.tsx
│   │       ├── GoldToast.tsx
│   │       ├── LevelUpModal.tsx
│   │       └── StreakBonus.tsx
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   ├── usePlayerData.ts
│   │   ├── useFlashcardProgress.ts
│   │   ├── useQCMHistory.ts
│   │   ├── useExercicesProgress.ts
│   │   ├── useGoldReward.ts
│   │   └── useDataLoader.ts
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── qcm.ts
│   │   ├── flashcards.ts
│   │   └── gamification.ts
│   │
│   ├── types/index.ts
│   │
│   └── validators/
│       ├── qcm.schema.ts
│       ├── flashcards.schema.ts
│       ├── fiches.schema.ts
│       ├── exercices.schema.ts
│       └── shop.schema.ts
│
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── components.json
```

---

## FICHIERS CLÉS À CRÉER EXACTEMENT

### next.config.ts
```typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};
export default nextConfig;
```

### postcss.config.mjs
```javascript
export default {
  plugins: { '@tailwindcss/postcss': {} },
};
```

### src/app/layout.tsx — imports obligatoires en tête de fichier
```typescript
import 'katex/dist/katex.min.css'; // ← TOUJOURS en premier
import './globals.css';
```

---

## INTERFACES TYPESCRIPT — src/types/index.ts

```typescript
// ─── Données JSON ─────────────────────────────────────────────────────────

export interface Question {
  id: string;
  chapitre_id: string;
  question: string;
  options: [string, string, string, string];
  bonne_reponse: string;
  explication: string;
  difficulte: "facile" | "moyen" | "difficile";
}

export interface Flashcard {
  id: string;
  chapitre_id: string;
  recto: string;
  verso: string;
  categorie: "définition" | "formule" | "méthode" | "piège" | "exemple";
  difficulte: "facile" | "moyen" | "difficile";
}

export interface Etape {
  numero: number;
  question: string;
  indice?: string;
  reponse: string;
  explication_logique: string;
  moyen_mnemo?: string;
}

export interface Methode {
  situation: string;
  etapes: string[];
}

export interface Fiche {
  id: string;
  chapitre_id: string;
  titre: string;
  intuition: string;
  moyen_mnemo: string;
  resume_condense: string[];
  methodes: Methode[];
  concepts_cles: string[];
  exercices_lies: string[];
}

export interface Exercice {
  id: string;
  chapitre_id: string;
  titre: string;
  resume: string;
  difficulte: "facile" | "moyen" | "difficile";
  duree_estimee: number;
  etapes: Etape[];
}

export interface MindmapNode {
  id: string;
  label: string;
  type: "root" | "chapitre" | "concept" | "formule";
  formule?: string;
  position: { x: number; y: number };
  couleur?: string;
}

export interface MindmapEdge {
  id: string;
  source: string;
  target: string;
}

export interface SkinItem {
  id: string;
  nom: string;
  description: string;
  prix: number;
  categorie: "chapeau" | "veste" | "accessoire" | "fond";
  svg_preview: string;
  svg_equipped: string;
  rarete: "commun" | "rare" | "épique" | "légendaire";
}

// ─── localStorage ──────────────────────────────────────────────────────────

export interface PlayerStats {
  qcm_total: number;
  qcm_scores: number[];
  flashcards_maitrisees: number;
  exercices_completes: string[];
}

export interface PlayerData {
  nom: string;
  pieces: number;
  niveau: number;
  xp: number;
  xp_pour_prochain_niveau: number;
  streak: number;
  derniere_visite: string;
  skin_actuel: string;
  skins_debloquees: string[];
  stats: PlayerStats;
}

export interface FlashcardProgress {
  mastered: string[];
  struggling: string[];
  seen: string[];
}

export interface QCMSession {
  date: string;
  score: number;
  total: number;
  chapitre_filter?: string;
}

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  color: string;
}
```

---

## src/lib/constants.ts

```typescript
import { NavItem } from "@/types";

export const STORAGE_KEYS = {
  PLAYER_DATA:        "micro_quest_player",
  FLASHCARD_PROGRESS: "micro_quest_flashcards",
  QCM_HISTORY:        "micro_quest_qcm_history",
  EXERCICES_PROGRESS: "micro_quest_exercices",
  COURS_POSITION:     "micro_quest_cours_position",
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/",           label: "Accueil",           icon: "Home",        color: "#3b82f6" },
  { href: "/cours",      label: "Cours complet",      icon: "BookOpen",    color: "#8b5cf6" },
  { href: "/fiches",     label: "Fiches & méthodes",  icon: "FileText",    color: "#06b6d4" },
  { href: "/exercices",  label: "Exercices TD",        icon: "Dumbbell",    color: "#10b981" },
  { href: "/flashcards", label: "Flashcards",          icon: "Layers",      color: "#8b5cf6" },
  { href: "/qcm",        label: "QCM",                icon: "HelpCircle",  color: "#f97316" },
  { href: "/mindmap",    label: "Mindmap",             icon: "Network",     color: "#06b6d4" },
  { href: "/shop",       label: "Shop pirate",         icon: "ShoppingBag", color: "#f59e0b" },
];

export const NIVEAUX = [
  { niveau: 1, xp_requis: 0,    titre: "Mousse",            emoji: "🪝" },
  { niveau: 2, xp_requis: 100,  titre: "Matelot",           emoji: "⚓" },
  { niveau: 3, xp_requis: 300,  titre: "Quartier-maître",   emoji: "🗺️" },
  { niveau: 4, xp_requis: 600,  titre: "Second",            emoji: "⚔️" },
  { niveau: 5, xp_requis: 1000, titre: "Capitaine",         emoji: "🏴‍☠️" },
  { niveau: 6, xp_requis: 1500, titre: "Capitaine émérite", emoji: "👑" },
  { niveau: 7, xp_requis: 2500, titre: "Amiral de la micro",emoji: "🌊" },
];

export const RECOMPENSES = {
  FLASHCARD_MAITRISE:  10,
  FLASHCARD_A_REVOIR:  5,
  QCM_PARFAIT:         150,  // score >= 93%
  QCM_EXCELLENT:       110,  // score >= 80%
  QCM_BON:             80,   // score >= 60%
  QCM_MOYEN:           50,   // score >= 40%
  QCM_TENTE:           20,   // score < 40%
  EXERCICE_COMPLETE:   30,
  BONUS_PREMIER_QCM:   25,
  BONUS_STREAK_7:      100,
};

export const DEFAULT_PLAYER_DATA = {
  nom: "Capitaine",
  pieces: 0,
  niveau: 1,
  xp: 0,
  xp_pour_prochain_niveau: 100,
  streak: 0,
  derniere_visite: new Date().toISOString(),
  skin_actuel: "pirate_base",
  skins_debloquees: ["pirate_base"],
  stats: {
    qcm_total: 0,
    qcm_scores: [],
    flashcards_maitrisees: 0,
    exercices_completes: [],
  }
};
```

---

## COMPOSANT CRITIQUE — src/components/ui/MathRenderer.tsx

Ce composant est **le seul endroit** où KaTeX est appelé. Tous les autres composants l'importent, aucun n'appelle KaTeX directement.

```typescript
/**
 * @file MathRenderer.tsx
 * @description Rendu de texte mixte (texte brut + formules LaTeX $...$ et $$...$$)
 * @dependencies katex
 */
"use client";
import React from 'react';
import katex from 'katex';

interface MathRendererProps {
  text: string;
  className?: string;
  displayMode?: boolean;
  errorColor?: string;
}

interface Segment {
  type: 'text' | 'math';
  content: string;
  display?: boolean;
}

function parseTextWithMath(text: string): Segment[] {
  const segments: Segment[] = [];
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    const isDisplay = raw.startsWith('$$');
    segments.push({
      type: 'math',
      content: isDisplay ? raw.slice(2, -2).trim() : raw.slice(1, -1).trim(),
      display: isDisplay
    });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }
  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
}

export function MathRenderer({ text, className = '', displayMode = false, errorColor = '#ef4444' }: MathRendererProps) {
  if (!text) return null;
  const segments = parseTextWithMath(text);
  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') return <span key={index}>{segment.content}</span>;
        try {
          const html = katex.renderToString(segment.content, {
            displayMode: segment.display || displayMode,
            throwOnError: false,
            errorColor,
            strict: false,
            trust: false,
            macros: { "\\R": "\\mathbb{R}", "\\E": "\\mathbb{E}" }
          });
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
              className={segment.display ? 'block my-2 text-center' : 'inline'}
            />
          );
        } catch {
          return <code key={index} className="text-red-400 text-sm px-1">{segment.content}</code>;
        }
      })}
    </span>
  );
}
```

---

## LAYOUT GLOBAL

### Sidebar (240px, fixe gauche)

```
┌─────────────────────┐
│  🏴‍☠️  MICRO QUEST     │  ← cliquable → /
│                     │
│  [avatar pirate SVG]│
│  Capitaine [nom]    │
│  ●●●○○ Niveau 3     │  ← XP bar
│  🪙 247 pièces       │  ← compteur animé
│                     │
│  🏠 Accueil          │
│  📚 Cours complet    │
│  📋 Fiches & méthodes│
│  🏋️ Exercices TD     │
│  🃏 Flashcards       │
│  ❓ QCM              │
│  🗺️ Mindmap          │
│  🛒 Shop pirate      │
└─────────────────────┘
```

Item actif : fond `bg-white/8` + barre verticale colorée à gauche (couleur propre à chaque section définie dans `NAV_ITEMS`).

### Topbar (56px)
- Gauche : breadcrumb
- Droite : compteur pièces + niveau + bouton settings

### Zone de contenu
- `px-8 py-6` desktop, `px-4 py-4` mobile
- `max-w-[1200px] mx-auto`

---

## SOURCES À LIRE AVANT DE GÉNÉRER LES JSON

⚠️ **Étape obligatoire avant toute génération de `fiches.json`, `exercices.json`, `mindmap.json`.**

Le contenu des JSON doit être tiré du **cours réel**, pas de connaissances génériques en microéconomie. Tous les fichiers sources sont déjà dans le dépôt. Lire dans cet ordre :

### 1. Exports NotebookLM — structure de chaque chapitre
```
../01_notebooklm_exports/chapitre_01_structure.md
../01_notebooklm_exports/chapitre_02_structure.md
../01_notebooklm_exports/chapitre_03_structure.md
../01_notebooklm_exports/chapitre_04_structure.md
../01_notebooklm_exports/chapitre_05_structure.md
../01_notebooklm_exports/chapitre_06_structure.md
../01_notebooklm_exports/chapitre_07_structure.md
```
Ces fichiers contiennent la structure détaillée de chaque chapitre : concepts, définitions, formules, méthodes. C'est **la source principale** pour `fiches.json` et `mindmap.json`.

### 2. Cours LaTeX — texte intégral du cours
```
../02_cours_structures/Cours latex format txt.txt
```
Utiliser pour extraire :
- Les formules exactes du cours → `fiches.json` et `mindmap.json`
- Les applications numériques et énoncés d'exercices → `exercices.json`
- Les définitions précises → vérification cohérence avec `flashcards.json`

### 3. Sources brutes — TD et annales
```
../00_sources_brutes/
```
Explorer ce dossier pour trouver des exercices réels (TD, annales, corrigés) à intégrer dans `exercices.json`.

### 4. Données déjà générées — pour la cohérence terminologique
```
public/data/qcm.json
public/data/flashcards.json
```
Les `concepts_cles` des fiches et les labels de la mindmap doivent utiliser **exactement le même vocabulaire** que ces deux fichiers.

### Tableau de correspondance sources → JSON à produire

| Fichier à générer | Sources principales | Contenu attendu |
|-------------------|---------------------|-----------------|
| `fiches.json` | `chapitre_0X_structure.md` + cours LaTeX | 8 fiches ch01-ch08, formules réelles du cours |
| `exercices.json` | `00_sources_brutes/` + cours LaTeX | 14+ exercices, énoncés tirés du cours |
| `mindmap.json` | `chapitre_0X_structure.md` | 50+ nœuds, formules exactes du cours |
| `shop.json` | (génération libre) | Catalogue items pirate |

**Ne jamais inventer un concept ou une formule qui n'est pas dans le cours.** Si un chapitre manque dans les exports NotebookLM (ex: chapitre_08), utiliser directement le cours LaTeX pour ce chapitre.

---

## SECTIONS DU SITE

### 1. Dashboard (page.tsx)

Bento grid de cards, toutes les données depuis localStorage :
- Streak de jours consécutifs
- Total pièces d'or
- Score moyen QCM (5 dernières sessions)
- Flashcards maîtrisées
- LineChart Recharts : évolution score QCM dans le temps
- Message aléatoire parmi `["Prêt à dominer la micro, Capitaine ?", "Les marchés n'attendent pas. En avant !", "Chaque flashcard est une pièce d'or gagnée.", "Ton adversaire révise en ce moment. Et toi ?"]`

---

### 2. Cours complet (/cours)

- `react-pdf` pour le viewer, worker via `pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'`
- Navigation chapitres (sidebar gauche du viewer)
- Zoom in/out, plein écran
- Mémorisation de la dernière page (localStorage clé `STORAGE_KEYS.COURS_POSITION`)
- Fallback propre si PDF absent

---

### 3. Fiches & méthodes (/fiches et /fiches/[chapitreId])

**⚠️ Il n'existe PAS de fichier fiches pré-généré.** Tu dois créer `public/data/fiches.json` avec du vrai contenu pédagogique de microéconomie — 8 fiches minimum, une par chapitre (chapitre_01 à chapitre_08).

Structure de chaque fiche :
```typescript
{
  id: "fiche_01",
  chapitre_id: "chapitre_01",
  titre: "...",
  intuition: "Explication vulgarisée avec analogie concrète",
  moyen_mnemo: "Astuce mémorielle originale",
  resume_condense: ["Point clé 1", "Point clé 2", ...],  // 4-6 items
  methodes: [
    { situation: "Quand...", etapes: ["1. ...", "2. ...", ...] },
    ...  // 2-4 méthodes
  ],
  concepts_cles: ["mot-clé1", "mot-clé2", ...],
  exercices_lies: ["ex_001", "ex_002"]
}
```

Les champs `intuition`, `resume_condense[i]` et `methodes[i].etapes[j]` peuvent contenir des formules `$...$`. Les afficher avec `<MathRenderer />`.

---

### 4. Exercices TD (/exercices et /exercices/[exerciceId])

**⚠️ Tu dois générer `public/data/exercices.json`** — au moins 2 exercices par chapitre (14 minimum), avec des données réelles de microéconomie.

Structure :
```typescript
{
  id: "ex_001",
  chapitre_id: "chapitre_01",
  titre: "Titre de l'exercice",
  resume: "Ce qui est travaillé (max 60 mots)",
  difficulte: "moyen",
  duree_estimee: 20,
  etapes: [
    {
      numero: 1,
      question: "Énoncé de l'étape",
      indice: "Hint optionnel",
      reponse: "Correction complète",
      explication_logique: "Pourquoi ce raisonnement",
      moyen_mnemo: "Astuce mémorielle optionnelle"
    }
  ]
}
```

Mode résolution : pas à pas, bouton "Voir un indice" (révèle `indice`), bouton "Voir la correction" (révèle `reponse` + `explication_logique` + `moyen_mnemo`).
Récompense : +30 pièces à la complétion (via `RECOMPENSES.EXERCICE_COMPLETE`).

---

### 5. Flashcards (/flashcards et /flashcards/session)

**Sélecteur de chapitres** : afficher chapitre_01 à chapitre_08 (⚠️ chapitre_08 existe dans flashcards mais PAS dans le QCM — l'inclure ici) + mode "🎲 Salade" (toutes chapitres).

**Algorithme de sélection** (dans `lib/flashcards.ts`) :
```typescript
function getSessionCards(chapitreId: string | "all", count = 20): Flashcard[] {
  const pool = chapitreId === "all" ? all : all.filter(f => f.chapitre_id === chapitreId);
  const unseen    = pool.filter(f => !seen.includes(f.id));
  const struggling = pool.filter(f => struggling.includes(f.id));
  const mastered  = pool.filter(f => mastered.includes(f.id));
  return shuffle([
    ...unseen.slice(0, Math.floor(count * 0.5)),
    ...struggling.slice(0, Math.floor(count * 0.3)),
    ...mastered.slice(0, Math.floor(count * 0.2))
  ]).slice(0, count);
}
```

**Animation flip 3D obligatoire** :
```typescript
// Container : style={{ perspective: "1000px" }}
// Framer Motion : rotateY 0→180
// backfaceVisibility: "hidden" sur recto et verso
```

**3 boutons après flip** : 😰 Raté (+0) | 🤔 À revoir (+5) | ✅ Maîtrisé (+10)

**Persistance** : clé `STORAGE_KEYS.FLASHCARD_PROGRESS` → `{ mastered: string[], struggling: string[], seen: string[] }`

Afficher recto et verso avec `<MathRenderer />`.

---

### 6. QCM (/qcm, /qcm/session, /qcm/resultats)

**⚠️ Asymétrie des données** :
- `qcm.json` : chapitre_01 à chapitre_07 + `methodes`
- `flashcards.json` : chapitre_01 à chapitre_07 + chapitre_08

`chapitre_08` **n'existe pas dans qcm.json** → ne pas l'afficher dans le filtre QCM.
La clé `methodes` → afficher avec le label "Méthodes générales".

```typescript
// lib/qcm.ts
export const QCM_CHAPITRES = [
  { id: "chapitre_01", label: "Chapitre 1" },
  { id: "chapitre_02", label: "Chapitre 2" },
  { id: "chapitre_03", label: "Chapitre 3" },
  { id: "chapitre_04", label: "Chapitre 4" },
  { id: "chapitre_05", label: "Chapitre 5" },
  { id: "chapitre_06", label: "Chapitre 6" },
  { id: "chapitre_07", label: "Chapitre 7" },
  { id: "methodes",    label: "Méthodes générales" },
  // chapitre_08 absent intentionnellement
];

export function generateQCMSession(chapitreFilter?: string): Question[] {
  const pool = chapitreFilter ? questions.filter(q => q.chapitre_id === chapitreFilter) : questions;
  const faciles   = shuffle(pool.filter(q => q.difficulte === "facile")).slice(0, 5);
  const moyens    = shuffle(pool.filter(q => q.difficulte === "moyen")).slice(0, 7);
  const difficiles = shuffle(pool.filter(q => q.difficulte === "difficile")).slice(0, 3);
  const total = faciles.length + moyens.length + difficiles.length;
  if (total < 15) {
    const used = [...faciles, ...moyens, ...difficiles];
    const remaining = shuffle(pool).filter(q => !used.find(x => x.id === q.id)).slice(0, 15 - total);
    return shuffle([...used, ...remaining]);
  }
  return shuffle([...faciles, ...moyens, ...difficiles]);
}

export function calculateQCMReward(score: number, total: number): number {
  const pct = score / total;
  if (pct >= 0.93) return RECOMPENSES.QCM_PARFAIT;
  if (pct >= 0.8)  return RECOMPENSES.QCM_EXCELLENT;
  if (pct >= 0.6)  return RECOMPENSES.QCM_BON;
  if (pct >= 0.4)  return RECOMPENSES.QCM_MOYEN;
  return RECOMPENSES.QCM_TENTE;
}
```

**Feedback immédiat** : bonne réponse → pulse vert, mauvaise → shake rouge + vert sur la bonne. Explication slide-down. Bouton "Suivante" après 0.8s.

**Résultats** : score animé + RadarChart Recharts par chapitre + liste détail réponses.

Afficher question, options et explication avec `<MathRenderer />`.

---

### 7. Mindmap (/mindmap)

**⚠️ Tu dois générer `public/data/mindmap.json`** avec tous les concepts du cours de microéconomie (50 nœuds minimum).

Structure :
```typescript
{
  nodes: MindmapNode[],  // position: { x, y } pour chaque nœud
  edges: MindmapEdge[]
}
```

Nœud central `root` → nœuds `chapitre` → nœuds `concept` et `formule`.

Implémentation : `@xyflow/react` v12 — nœuds draggables, zoom molette, click sur nœud → panneau latéral avec détail. Formules dans `CustomNode` rendues avec `<MathRenderer />`.

---

### 8. Shop pirate (/shop)

**⚠️ Tu dois générer `public/data/shop.json`** avec le catalogue d'items.

Catalogue minimum :
```
pirate_base         — gratuit, débloqué dès le départ
chapeau_tricorne    — 200 🪙 — Commun
chapeau_capitaine   — 500 🪙 — Rare
bandana_rouge       — 150 🪙 — Commun
veste_galonnee      — 400 🪙 — Rare
manteau_capitaine   — 800 🪙 — Épique
lunette_navigateur  — 300 🪙 — Rare
perroquet           — 600 🪙 — Épique
carte_tresor        — 1000 🪙 — Légendaire
```

Générer les SVGs pirates dans `public/avatars/` (illustrations simples mais reconnaissables).

Logique d'achat : déduire les pièces, ajouter à `skins_debloquees`, sauvegarder en localStorage. Modal de confirmation avant achat.

---

## GAMIFICATION

### Pièces d'or

À chaque gain, déclencher simultanément :
1. Particules dorées (`GoldAnimation`) via Framer Motion + AnimatePresence
2. Le compteur de la sidebar qui s'incrémente avec animation de défilement
3. Un toast `+X 🪙` (`GoldToast`) en bas à droite pendant 2s
4. Mise à jour localStorage clé `STORAGE_KEYS.PLAYER_DATA`

### Niveaux

Au passage de niveau → `LevelUpModal` avec animation confettis + affichage du nouveau titre.
`1 pièce = 1 XP`. Vérifier le niveau à chaque mise à jour de pièces.

### Streak

Vérifier la date de `derniere_visite` à chaque chargement. Si > 1 jour d'écart → streak remis à 0. Si visite du jour → streak maintenu. Si streak atteint 7 jours → `RECOMPENSES.BONUS_STREAK_7` en bonus + notification `StreakBonus`.

---

## SYSTÈME HOOKS localStorage

```typescript
// hooks/useLocalStorage.ts — hook générique typé
function useLocalStorage<T>(key: string, defaultValue: T): [T, (v: T) => void]

// hooks/usePlayerData.ts — wrapper autour de useLocalStorage
// initialise avec DEFAULT_PLAYER_DATA si première visite
// expose: playerData, addPieces(amount), equipSkin(id), updateStreak()

// hooks/useFlashcardProgress.ts — wrapper autour de useLocalStorage
// clé STORAGE_KEYS.FLASHCARD_PROGRESS
// expose: markMastered(id), markStruggling(id), markSeen(id), resetProgress()

// hooks/useGoldReward.ts
// expose: reward(amount, label) — déclenche l'animation ET met à jour playerData
```

---

## CHECKS AVANT LIVRAISON DE CHAQUE SECTION

Avant de considérer une section comme terminée, tester mentalement :
- "Si le JSON est vide / absent, est-ce que ça crash ?"
- "Si localStorage est vide au premier lancement, les defaults s'appliquent-ils ?"
- "Les formules LaTeX s'affichent-elles correctement (pas de texte rouge, pas de code brut) ?"
- "Sur mobile, le layout est-il utilisable ?"
- "Les animations sont-elles présentes sur entrée de page, liste de cards, et transitions de réponse ?"

Test KaTeX — créer une page `/test-math` temporaire avec ces formules :
```typescript
"$U_A = v - p$"
"$\\frac{p - c}{p} = \\frac{1}{\\epsilon}$"
"$\\int_p^\\infty D(v) \\, dv$"
"Le prix est $p = c + \\frac{1}{\\epsilon}$ au monopole"
```

---

## ORDRE DE CONSTRUCTION — SUIVRE CET ORDRE EXACT

**Après chaque étape : lister les fichiers créés, ce qui fonctionne, et attendre confirmation.**

1. **Setup** — `create-next-app`, installer toutes les dépendances, créer `postcss.config.mjs`, `next.config.ts`, `globals.css`, `layout.tsx` (avec imports KaTeX et globals)
2. **Données** — copier `qcm.json` et `flashcards.json` dans `public/data/`, créer `src/types/index.ts`, `src/lib/constants.ts`, hooks localStorage
3. **Layout global** — `Sidebar`, `Topbar`, `SidebarItem`, `GoldCounter`, `XPBar`, routing avec `AnimatePresence`
4. **Générer les JSON manquants** — lire les fichiers sources du cours (voir section "SOURCES À LIRE AVANT DE GÉNÉRER LES JSON" ci-dessous), puis créer `fiches.json`, `exercices.json`, `mindmap.json`, `shop.json` avec le contenu exact de CE cours
5. **MathRenderer** — créer et tester le composant KaTeX
6. **Dashboard** — page d'accueil avec bento grid
7. **QCM** — section la plus importante fonctionnellement
8. **Flashcards** — avec flip 3D
9. **Cours** — PDF viewer
10. **Exercices TD** — pas à pas
11. **Fiches & méthodes**
12. **Mindmap**
13. **Gamification complète** — animations pièces, niveaux, streak
14. **Shop pirate** — SVGs + catalogue
15. **Polish final** — responsive mobile, micro-animations, accessibilité

---

**Commence par l'étape 1. Lance les commandes npm nécessaires, crée les fichiers de base, et récapitule ce qui est prêt avant de passer à l'étape 2.**
