# CLAUDE CODE — Instructions complètes pour Micro Quest
# Version senior-dev team — remplace GEMINI_INSTRUCTIONS.md et CLAUDE_CODE_PROMPT.md

---

## 0. COMMENT UTILISER CES INSTRUCTIONS

Ce fichier est le **seul point de vérité** pour construire Micro Quest. Il a été écrit pour être collé en entier dans une session Claude Code. Il est **auto-suffisant** : tu n'as besoin d'aucun autre fichier d'instructions.

**Approche de travail** :
1. Lis ces instructions en entier avant d'écrire la première ligne de code
2. Suis l'**ordre de construction** à la fin (Étape 1 → 15)
3. Après chaque étape : liste les fichiers créés + erreurs potentielles, attends confirmation
4. En cas de doute sur une formule ou un concept : lis les sources dans `01_notebooklm_exports/`
5. Exécute toutes les commandes `npm`/`npx` via le terminal — ne les simule pas

---

## 1. CONTEXTE ET MISSION

Tu construis **Micro Quest** : un site de révision de microéconomie inspiré de Duolingo (gamification) + Linear (densité) + Raycast (micro-animations). Le site est destiné à un étudiant qui révise seul et veut une expérience engageante, pas un simple recueil de fiches.

**Dossier de travail** : `06_site_web/` (à créer dans `C:/Users/dizzy/Site_Micro/`)

**Données déjà présentes** dans `04_bases_donnees_site/` :
- `qcm.json` — 170 QCM, chapitres 01→07 + "methodes"
- `flashcards.json` — 200 flashcards, chapitres 01→08
- `fiches.json` — 8 fiches pédagogiques
- `exercices.json` — 16 exercices TD structurés
- `mindmap.json` — 55+ nœuds de la mindmap interactive
- `shop.json` — 9 items boutique pirate

**PDF du cours** dans `02_cours_structures/Cours_Micro_Latex.pdf`

**Toutes les données JSON** sont à copier dans `06_site_web/public/data/`.

---

## 2. STACK TECHNIQUE — VERSION EXACTE

| Outil | Version | Rôle | ⚠️ Piège |
|-------|---------|------|---------|
| Next.js | 15 (App Router) | Framework | Pas Pages Router |
| React | 19 | UI | Nouvelles APIs concurrent |
| TypeScript | 5.x strict | Typage | `noImplicitAny: true` |
| Tailwind CSS | **v4** | Styling | PAS de `tailwind.config.ts` |
| shadcn/ui | latest | Composants base | Compatible Tailwind v4 |
| Framer Motion | 11.x | Animations | `motion` API, pas `motion.div` legacy |
| Recharts | 2.x | Graphiques | LineChart, RadarChart |
| @xyflow/react | **12.x** | Mindmap | PAS reactflow v11 |
| react-pdf | 9.x | Viewer PDF | Worker séparé obligatoire |
| KaTeX | 0.16.x | Formules LaTeX | CSS à importer dans layout.tsx |
| Zod | 3.x | Validation JSON | Schemas dans `validators/` |
| Lucide React | latest | Icônes | Tree-shakeable |

### Commandes d'installation

```bash
# Dans 06_site_web/ — NE PAS mettre --tailwind (Tailwind v4 s'installe manuellement)
npx create-next-app@latest . --typescript --app --src-dir --import-alias "@/*" --no-tailwind --eslint

# Tailwind CSS v4
npm install tailwindcss@^4 @tailwindcss/postcss@^4

# shadcn/ui (choisir style "default", baseColor "zinc", CSS variables: yes)
npx shadcn@latest init

# Dépendances
npm install framer-motion recharts @xyflow/react react-pdf katex zod lucide-react
npm install --save-dev @types/katex
```

---

## 3. RÈGLES ABSOLUES — VIOLATION = REFUS DE LIVRAISON

1. **Zero `any` TypeScript** — toutes les interfaces dans `src/types/index.ts`
2. **Zero donnée hardcodée** — 100% des données depuis les JSON dans `/public/data/`
3. **Zero TODO / placeholder** — chaque composant livré est fonctionnel à 100%
4. **Chargement JSON côté client** via `fetch('/data/fichier.json')` dans un `useEffect` — jamais via `import` statique (pour permettre la mise à jour sans rebuild)
5. **Zod** sur tous les JSON au premier chargement — afficher un `toast.error` si validation échoue
6. **Skeleton loaders** sur tout composant qui attend des données réseau ou localStorage
7. **En-tête JSDoc** sur chaque fichier :
   ```typescript
   /**
    * @file NomFichier.tsx
    * @description Rôle en 1-2 phrases
    * @dependencies katex, framer-motion, ...
    */
   ```
8. **Pas de `console.log`** en prod — utiliser `if (process.env.NODE_ENV === 'development') console.log(...)`
9. **`"use client"`** sur tout composant qui utilise `useState`, `useEffect`, `localStorage`, Framer Motion, ou des event handlers
10. **Mobile-first** — tester mentalement chaque layout sur 375px

---

## 4. ARBORESCENCE CIBLE COMPLÈTE

```
06_site_web/
├── public/
│   ├── data/
│   │   ├── qcm.json
│   │   ├── flashcards.json
│   │   ├── fiches.json
│   │   ├── exercices.json
│   │   ├── mindmap.json
│   │   └── shop.json
│   ├── cours/
│   │   └── cours_micro_complet.pdf
│   ├── avatars/
│   │   ├── pirate_base.svg
│   │   ├── bandana_rouge.svg
│   │   ├── chapeau_tricorne.svg
│   │   ├── chapeau_capitaine.svg
│   │   ├── lunette_navigateur.svg
│   │   ├── veste_galonnee.svg
│   │   ├── manteau_capitaine.svg
│   │   ├── perroquet.svg
│   │   └── carte_tresor.svg
│   └── pdf.worker.min.js    ← copier depuis node_modules/pdfjs-dist/build/
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← imports KaTeX CSS + globals.css
│   │   ├── page.tsx            ← Dashboard
│   │   ├── globals.css         ← Tailwind v4 + thème + KaTeX dark mode
│   │   ├── cours/page.tsx
│   │   ├── fiches/
│   │   │   ├── page.tsx
│   │   │   └── [chapitreId]/page.tsx
│   │   ├── exercices/
│   │   │   ├── page.tsx
│   │   │   └── [exerciceId]/page.tsx
│   │   ├── flashcards/
│   │   │   ├── page.tsx
│   │   │   └── session/page.tsx
│   │   ├── qcm/
│   │   │   ├── page.tsx
│   │   │   ├── session/page.tsx
│   │   │   └── resultats/page.tsx
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
│   │   │   ├── MathRenderer.tsx   ← CRITIQUE
│   │   │   └── [fichiers shadcn auto-générés]
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
│   │   │   └── ChapterSelector.tsx
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
│       ├── mindmap.schema.ts
│       └── shop.schema.ts
│
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── components.json
```

---

## 5. FICHIERS DE CONFIGURATION

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
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### tsconfig.json — s'assurer que ces options sont présentes
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## 6. DESIGN SYSTEM — globals.css COMPLET

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* ─── Variables CSS (utilisées directement via var()) ───────────────────── */
:root {
  --bg-primary:   #0a0a0b;
  --bg-secondary: #111113;
  --bg-card:      #18181b;
  --bg-card-hover:#1f1f23;
  --accent-gold:  #f59e0b;
  --accent-gold-light: #fbbf24;
  --accent-blue:  #3b82f6;
  --accent-blue-light: #60a5fa;
  --accent-green: #10b981;
  --accent-red:   #ef4444;
  --accent-purple:#8b5cf6;
  --accent-orange:#f97316;
  --text-primary: #fafafa;
  --text-secondary:#a1a1aa;
  --text-muted:   #52525b;
  --border-subtle: rgba(255,255,255,0.06);
  --border-default:rgba(255,255,255,0.10);
  --border-strong: rgba(255,255,255,0.20);
  --sidebar-width: 240px;
}

/* ─── Tailwind v4 @theme — expose les variables aux classes utilitaires ─── */
@theme {
  --color-bg-primary:    #0a0a0b;
  --color-bg-secondary:  #111113;
  --color-bg-card:       #18181b;
  --color-bg-card-hover: #1f1f23;
  --color-accent-gold:   #f59e0b;
  --color-accent-blue:   #3b82f6;
  --color-accent-green:  #10b981;
  --color-accent-red:    #ef4444;
  --color-accent-purple: #8b5cf6;
  --color-accent-orange: #f97316;
  --color-border-subtle: rgba(255,255,255,0.06);
  --color-border-default:rgba(255,255,255,0.10);
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
  50%  { background-color: rgba(16,185,129,0.2); }
  100% { background-color: transparent; }
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-default); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--border-strong); }

/* Sélection */
::selection { background: rgba(59,130,246,0.3); color: var(--text-primary); }

/* ─── KaTeX dark mode — CRITIQUE — sans ça les formules sont invisibles ── */
.katex { color: var(--text-primary) !important; }
.katex .mord, .katex .mbin, .katex .mrel,
.katex .mopen, .katex .mclose, .katex .mpunct,
.katex .minner { color: inherit !important; }
.katex { font-size: 1.05em; }
.katex-display {
  margin: 0.8em 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.2em 0;
}
.katex .frac-line { border-color: var(--text-primary) !important; }
.katex-display > .katex { max-width: 100%; overflow-x: auto; }

/* Layout principal */
.main-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  flex-shrink: 0;
}
.main-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.page-wrapper {
  padding: 1.5rem 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .sidebar { display: none; }
  .page-wrapper { padding: 1rem; }
}
```

---

## 7. src/app/layout.tsx — IMPORTS OBLIGATOIRES

```typescript
/**
 * @file layout.tsx
 * @description Layout racine — sidebar + topbar + AnimatePresence
 * @dependencies framer-motion, katex
 */
import 'katex/dist/katex.min.css';   // ← DOIT être en premier
import './globals.css';

import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

export const metadata: Metadata = {
  title: 'Micro Quest — Révision de Microéconomie',
  description: 'Site de révision gamifié pour la microéconomie',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body>
        <div className="main-layout">
          <Sidebar />
          <div className="main-content">
            <Topbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
```

---

## 8. TYPES TYPESCRIPT — src/types/index.ts COMPLET

```typescript
/**
 * @file index.ts
 * @description Toutes les interfaces TypeScript du projet Micro Quest
 */

// ─── Données JSON ─────────────────────────────────────────────────────────────

export interface Question {
  id: string;
  chapitre_id: string;
  question: string;
  options: [string, string, string, string];
  bonne_reponse: string;
  explication: string;
  difficulte: 'facile' | 'moyen' | 'difficile';
}

export interface Flashcard {
  id: string;
  chapitre_id: string;
  recto: string;
  verso: string;
  categorie: 'définition' | 'formule' | 'méthode' | 'piège' | 'exemple';
  difficulte: 'facile' | 'moyen' | 'difficile';
}

export interface Etape {
  numero: number;
  question: string;
  indice?: string;
  reponse: string;
  explication_logique: string;
  moyen_mnemo?: string;
}

export interface MethodeFiche {
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
  methodes: MethodeFiche[];
  concepts_cles: string[];
  exercices_lies: string[];
}

export interface Exercice {
  id: string;
  chapitre_id: string;
  titre: string;
  resume: string;
  difficulte: 'facile' | 'moyen' | 'difficile';
  duree_estimee: number;
  etapes: Etape[];
}

export interface MindmapNode {
  id: string;
  label: string;
  type: 'root' | 'chapitre' | 'concept' | 'formule';
  formule?: string;
  position: { x: number; y: number };
  couleur?: string;
}

export interface MindmapEdge {
  id: string;
  source: string;
  target: string;
}

export interface MindmapData {
  nodes: MindmapNode[];
  edges: MindmapEdge[];
}

export interface SkinItem {
  id: string;
  nom: string;
  description: string;
  prix: number;
  categorie: 'chapeau' | 'veste' | 'accessoire' | 'fond';
  rarete: 'commun' | 'rare' | 'épique' | 'légendaire';
  svg_preview: string;
  svg_equipped: string;
}

// ─── localStorage (Joueur) ────────────────────────────────────────────────────

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

// ─── UI ───────────────────────────────────────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  color: string;
}

export interface Niveau {
  niveau: number;
  xp_requis: number;
  titre: string;
  emoji: string;
}

export type DifficulteLevel = 'facile' | 'moyen' | 'difficile';

export interface DifficulteStyle {
  label: string;
  className: string;
}
```

---

## 9. src/lib/constants.ts COMPLET

```typescript
/**
 * @file constants.ts
 * @description Constantes globales : navigation, niveaux, récompenses, valeurs par défaut
 */
import type { NavItem, Niveau, PlayerData } from '@/types';

export const STORAGE_KEYS = {
  PLAYER_DATA:        'micro_quest_player',
  FLASHCARD_PROGRESS: 'micro_quest_flashcards',
  QCM_HISTORY:        'micro_quest_qcm_history',
  EXERCICES_PROGRESS: 'micro_quest_exercices',
  COURS_POSITION:     'micro_quest_cours_position',
} as const;

export const NAV_ITEMS: NavItem[] = [
  { href: '/',           label: 'Accueil',           icon: 'Home',        color: '#3b82f6' },
  { href: '/cours',      label: 'Cours complet',      icon: 'BookOpen',    color: '#8b5cf6' },
  { href: '/fiches',     label: 'Fiches & méthodes',  icon: 'FileText',    color: '#06b6d4' },
  { href: '/exercices',  label: 'Exercices TD',        icon: 'Dumbbell',    color: '#10b981' },
  { href: '/flashcards', label: 'Flashcards',          icon: 'Layers',      color: '#8b5cf6' },
  { href: '/qcm',        label: 'QCM',                icon: 'HelpCircle',  color: '#f97316' },
  { href: '/mindmap',    label: 'Mindmap',             icon: 'Network',     color: '#06b6d4' },
  { href: '/shop',       label: 'Shop pirate',         icon: 'ShoppingBag', color: '#f59e0b' },
];

export const NIVEAUX: Niveau[] = [
  { niveau: 1, xp_requis: 0,    titre: 'Mousse',             emoji: '🪝' },
  { niveau: 2, xp_requis: 100,  titre: 'Matelot',            emoji: '⚓' },
  { niveau: 3, xp_requis: 300,  titre: 'Quartier-maître',    emoji: '🗺️' },
  { niveau: 4, xp_requis: 600,  titre: 'Second',             emoji: '⚔️' },
  { niveau: 5, xp_requis: 1000, titre: 'Capitaine',          emoji: '🏴‍☠️' },
  { niveau: 6, xp_requis: 1500, titre: 'Capitaine émérite',  emoji: '👑' },
  { niveau: 7, xp_requis: 2500, titre: 'Amiral de la micro', emoji: '🌊' },
];

export const RECOMPENSES = {
  FLASHCARD_MAITRISE: 10,
  FLASHCARD_A_REVOIR: 5,
  QCM_PARFAIT:        150,   // >= 93%
  QCM_EXCELLENT:      110,   // >= 80%
  QCM_BON:            80,    // >= 60%
  QCM_MOYEN:          50,    // >= 40%
  QCM_TENTE:          20,    // < 40%
  EXERCICE_COMPLETE:  30,
  BONUS_PREMIER_QCM:  25,
  BONUS_STREAK_7:     100,
} as const;

export const DEFAULT_PLAYER_DATA: PlayerData = {
  nom: 'Capitaine',
  pieces: 0,
  niveau: 1,
  xp: 0,
  xp_pour_prochain_niveau: 100,
  streak: 0,
  derniere_visite: new Date().toISOString(),
  skin_actuel: 'pirate_base',
  skins_debloquees: ['pirate_base'],
  stats: {
    qcm_total: 0,
    qcm_scores: [],
    flashcards_maitrisees: 0,
    exercices_completes: [],
  },
};

export const DIFFICULTE_STYLES = {
  facile:    { label: 'Facile',    className: 'text-green-400 bg-green-400/10 border-green-400/20' },
  moyen:     { label: 'Moyen',     className: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  difficile: { label: 'Difficile', className: 'text-red-400 bg-red-400/10 border-red-400/20' },
};

export const RARETE_STYLES = {
  commun:    { label: 'Commun',    className: 'text-slate-400',   border: 'border-slate-400/30' },
  rare:      { label: 'Rare',      className: 'text-blue-400',    border: 'border-blue-400/40' },
  épique:    { label: 'Épique',    className: 'text-purple-400',  border: 'border-purple-400/50' },
  légendaire:{ label: 'Légendaire',className: 'text-amber-400',   border: 'border-amber-400/60' },
};

export const WELCOME_MESSAGES = [
  'Prêt à dominer la micro, Capitaine ?',
  'Les marchés n\'attendent pas. En avant !',
  'Chaque flashcard est une pièce d\'or gagnée.',
  'Ton adversaire révise en ce moment. Et toi ?',
  'L\'équilibre de Nash ne se trouvera pas tout seul.',
  'Le Welfare maximum t\'attend au prochain QCM.',
];

export const CHAPITRE_LABELS: Record<string, string> = {
  chapitre_01: 'Chapitre 1 — Négociation',
  chapitre_02: 'Chapitre 2 — A-compétition',
  chapitre_03: 'Chapitre 3 — V-compétition',
  chapitre_04: 'Chapitre 4 — Concurrence imparfaite',
  chapitre_05: 'Chapitre 5 — Préférences',
  chapitre_06: 'Chapitre 6 — Échange',
  chapitre_07: 'Chapitre 7 — Optimum de Pareto',
  chapitre_08: 'Chapitre 8 — Méthodes transversales',
  methodes:    'Méthodes générales',
};
```

---

## 10. src/lib/utils.ts

```typescript
/**
 * @file utils.ts
 * @description Fonctions utilitaires partagées
 */
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

export function getDaysDiff(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return Math.round(Math.abs(d1.getTime() - d2.getTime()) / 86400000);
}

export function isSameDay(date1: string, date2: string): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getFullYear() === d2.getFullYear()
      && d1.getMonth() === d2.getMonth()
      && d1.getDate() === d2.getDate();
}

export function average(arr: number[]): number {
  if (arr.length === 0) return 0;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

export function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

---

## 11. HOOKS localStorage — IMPLÉMENTATIONS COMPLÈTES

### hooks/useLocalStorage.ts
```typescript
/**
 * @file useLocalStorage.ts
 * @description Hook générique pour la persistance localStorage avec SSR safety
 */
'use client';
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(defaultValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setValue(JSON.parse(item) as T);
      }
    } catch {
      // localStorage non disponible (SSR, mode privé strict)
    }
    setHydrated(true);
  }, [key]);

  const setStoredValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setValue(prev => {
      const resolved = typeof newValue === 'function'
        ? (newValue as (prev: T) => T)(prev)
        : newValue;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch { /* silent */ }
      return resolved;
    });
  }, [key]);

  return [hydrated ? value : defaultValue, setStoredValue];
}
```

### hooks/usePlayerData.ts
```typescript
/**
 * @file usePlayerData.ts
 * @description Gestion des données joueur — XP, pièces, streak, niveaux
 */
'use client';
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS, DEFAULT_PLAYER_DATA, NIVEAUX } from '@/lib/constants';
import { getDaysDiff, isSameDay } from '@/lib/utils';
import type { PlayerData } from '@/types';

export function usePlayerData() {
  const [playerData, setPlayerData] = useLocalStorage<PlayerData>(
    STORAGE_KEYS.PLAYER_DATA,
    DEFAULT_PLAYER_DATA
  );

  const addPieces = useCallback((amount: number) => {
    setPlayerData(prev => {
      const newPieces = prev.pieces + amount;
      const newXP = prev.xp + amount;

      // Calcul niveau
      let nouveauNiveau = prev.niveau;
      let xpPourProchain = prev.xp_pour_prochain_niveau;
      for (const n of NIVEAUX) {
        if (newXP >= n.xp_requis) {
          nouveauNiveau = n.niveau;
          const prochainNiveau = NIVEAUX.find(nl => nl.niveau === n.niveau + 1);
          xpPourProchain = prochainNiveau?.xp_requis ?? n.xp_requis;
        }
      }

      return {
        ...prev,
        pieces: newPieces,
        xp: newXP,
        niveau: nouveauNiveau,
        xp_pour_prochain_niveau: xpPourProchain,
      };
    });
  }, [setPlayerData]);

  const updateStreak = useCallback(() => {
    setPlayerData(prev => {
      const today = new Date().toISOString();
      const lastVisit = prev.derniere_visite;

      if (isSameDay(today, lastVisit)) {
        return prev; // Déjà visité aujourd'hui
      }

      const diff = getDaysDiff(today, lastVisit);
      const newStreak = diff === 1 ? prev.streak + 1 : 1;

      return {
        ...prev,
        streak: newStreak,
        derniere_visite: today,
      };
    });
  }, [setPlayerData]);

  const equipSkin = useCallback((skinId: string) => {
    setPlayerData(prev => {
      if (!prev.skins_debloquees.includes(skinId)) return prev;
      return { ...prev, skin_actuel: skinId };
    });
  }, [setPlayerData]);

  const buySkin = useCallback((skinId: string, prix: number) => {
    setPlayerData(prev => {
      if (prev.pieces < prix || prev.skins_debloquees.includes(skinId)) return prev;
      return {
        ...prev,
        pieces: prev.pieces - prix,
        skins_debloquees: [...prev.skins_debloquees, skinId],
        skin_actuel: skinId,
      };
    });
  }, [setPlayerData]);

  const addQCMScore = useCallback((score: number, total: number) => {
    setPlayerData(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        qcm_total: prev.stats.qcm_total + 1,
        qcm_scores: [...prev.stats.qcm_scores.slice(-9), Math.round((score / total) * 100)],
      },
    }));
  }, [setPlayerData]);

  const addExerciceComplete = useCallback((exerciceId: string) => {
    setPlayerData(prev => {
      if (prev.stats.exercices_completes.includes(exerciceId)) return prev;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          exercices_completes: [...prev.stats.exercices_completes, exerciceId],
        },
      };
    });
  }, [setPlayerData]);

  return {
    playerData,
    addPieces,
    updateStreak,
    equipSkin,
    buySkin,
    addQCMScore,
    addExerciceComplete,
  };
}
```

### hooks/useFlashcardProgress.ts
```typescript
/**
 * @file useFlashcardProgress.ts
 * @description Suivi de progression des flashcards — mastered / struggling / seen
 */
'use client';
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import type { FlashcardProgress } from '@/types';

const DEFAULT_PROGRESS: FlashcardProgress = { mastered: [], struggling: [], seen: [] };

export function useFlashcardProgress() {
  const [progress, setProgress] = useLocalStorage<FlashcardProgress>(
    STORAGE_KEYS.FLASHCARD_PROGRESS,
    DEFAULT_PROGRESS
  );

  const markMastered = useCallback((id: string) => {
    setProgress(prev => ({
      mastered: prev.mastered.includes(id) ? prev.mastered : [...prev.mastered, id],
      struggling: prev.struggling.filter(x => x !== id),
      seen: prev.seen.includes(id) ? prev.seen : [...prev.seen, id],
    }));
  }, [setProgress]);

  const markStruggling = useCallback((id: string) => {
    setProgress(prev => ({
      mastered: prev.mastered.filter(x => x !== id),
      struggling: prev.struggling.includes(id) ? prev.struggling : [...prev.struggling, id],
      seen: prev.seen.includes(id) ? prev.seen : [...prev.seen, id],
    }));
  }, [setProgress]);

  const markSeen = useCallback((id: string) => {
    setProgress(prev => ({
      ...prev,
      seen: prev.seen.includes(id) ? prev.seen : [...prev.seen, id],
    }));
  }, [setProgress]);

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, [setProgress]);

  return { progress, markMastered, markStruggling, markSeen, resetProgress };
}
```

### hooks/useQCMHistory.ts
```typescript
/**
 * @file useQCMHistory.ts
 * @description Historique des sessions QCM
 */
'use client';
import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '@/lib/constants';
import type { QCMSession } from '@/types';

export function useQCMHistory() {
  const [history, setHistory] = useLocalStorage<QCMSession[]>(
    STORAGE_KEYS.QCM_HISTORY,
    []
  );

  const addSession = useCallback((session: QCMSession) => {
    setHistory(prev => [...prev.slice(-49), session]); // garder max 50
  }, [setHistory]);

  const getAvgScore = useCallback((last = 5): number => {
    const recent = history.slice(-last);
    if (recent.length === 0) return 0;
    const scores = recent.map(s => Math.round((s.score / s.total) * 100));
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [history]);

  return { history, addSession, getAvgScore };
}
```

### hooks/useGoldReward.ts
```typescript
/**
 * @file useGoldReward.ts
 * @description Distribue des pièces + déclenche l'animation gold
 * @dependencies usePlayerData
 */
'use client';
import { useCallback, useState } from 'react';
import { usePlayerData } from './usePlayerData';

interface GoldEvent {
  id: number;
  amount: number;
  label: string;
}

export function useGoldReward() {
  const { addPieces } = usePlayerData();
  const [events, setEvents] = useState<GoldEvent[]>([]);

  const reward = useCallback((amount: number, label = '') => {
    addPieces(amount);
    const id = Date.now();
    setEvents(prev => [...prev, { id, amount, label }]);
    setTimeout(() => {
      setEvents(prev => prev.filter(e => e.id !== id));
    }, 2000);
  }, [addPieces]);

  return { reward, events };
}
```

### hooks/useDataLoader.ts
```typescript
/**
 * @file useDataLoader.ts
 * @description Hook générique pour charger un JSON depuis /public/data/
 */
'use client';
import { useState, useEffect } from 'react';

interface DataLoaderState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useDataLoader<T>(filename: string): DataLoaderState<T> {
  const [state, setState] = useState<DataLoaderState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });

    fetch(`/data/${filename}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then(data => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(err => {
        if (!cancelled) setState({ data: null, loading: false, error: (err as Error).message });
      });

    return () => { cancelled = true; };
  }, [filename]);

  return state;
}
```

---

## 12. src/lib/qcm.ts — LOGIQUE MÉTIER QCM

```typescript
/**
 * @file qcm.ts
 * @description Logique métier QCM : filtre chapitres, génération session, calcul récompenses
 * @dependencies constants
 */
import { RECOMPENSES } from './constants';
import { shuffle } from './utils';
import type { Question } from '@/types';

// ⚠️ chapitre_08 absent intentionnellement (n'existe pas dans qcm.json)
export const QCM_CHAPITRES = [
  { id: 'all',          label: 'Tous les chapitres' },
  { id: 'chapitre_01',  label: 'Chapitre 1 — Négociation' },
  { id: 'chapitre_02',  label: 'Chapitre 2 — A-compétition' },
  { id: 'chapitre_03',  label: 'Chapitre 3 — V-compétition' },
  { id: 'chapitre_04',  label: 'Chapitre 4 — Concurrence imparfaite' },
  { id: 'chapitre_05',  label: 'Chapitre 5 — Préférences' },
  { id: 'chapitre_06',  label: 'Chapitre 6 — Échange' },
  { id: 'chapitre_07',  label: 'Chapitre 7 — Optimum de Pareto' },
  { id: 'methodes',     label: 'Méthodes générales' },
];

export function generateQCMSession(
  allQuestions: Question[],
  chapitreFilter?: string,
  targetCount = 15
): Question[] {
  const pool = chapitreFilter && chapitreFilter !== 'all'
    ? allQuestions.filter(q => q.chapitre_id === chapitreFilter)
    : allQuestions;

  if (pool.length === 0) return [];

  const faciles    = shuffle(pool.filter(q => q.difficulte === 'facile')).slice(0, 5);
  const moyens     = shuffle(pool.filter(q => q.difficulte === 'moyen')).slice(0, 7);
  const difficiles = shuffle(pool.filter(q => q.difficulte === 'difficile')).slice(0, 3);

  const selected = [...faciles, ...moyens, ...difficiles];

  if (selected.length < targetCount) {
    const usedIds = new Set(selected.map(q => q.id));
    const remaining = shuffle(pool.filter(q => !usedIds.has(q.id)))
      .slice(0, targetCount - selected.length);
    return shuffle([...selected, ...remaining]);
  }

  return shuffle(selected).slice(0, targetCount);
}

export function calculateQCMReward(score: number, total: number): number {
  const pct = score / total;
  if (pct >= 0.93) return RECOMPENSES.QCM_PARFAIT;
  if (pct >= 0.80) return RECOMPENSES.QCM_EXCELLENT;
  if (pct >= 0.60) return RECOMPENSES.QCM_BON;
  if (pct >= 0.40) return RECOMPENSES.QCM_MOYEN;
  return RECOMPENSES.QCM_TENTE;
}
```

---

## 13. src/lib/flashcards.ts — ALGORITHME DE SÉLECTION

```typescript
/**
 * @file flashcards.ts
 * @description Algorithme intelligent de sélection de flashcards — priorité aux non-vues et difficiles
 */
import { shuffle } from './utils';
import type { Flashcard, FlashcardProgress } from '@/types';

// Chapitres flashcards : 01→08 (chapitre_08 inclus ici — 45 cartes)
export const FLASHCARD_CHAPITRES = [
  { id: 'all',         label: '🎲 Salade (tous chapitres)' },
  { id: 'chapitre_01', label: 'Chapitre 1 — Négociation' },
  { id: 'chapitre_02', label: 'Chapitre 2 — A-compétition' },
  { id: 'chapitre_03', label: 'Chapitre 3 — V-compétition' },
  { id: 'chapitre_04', label: 'Chapitre 4 — Concurrence imparfaite' },
  { id: 'chapitre_05', label: 'Chapitre 5 — Préférences' },
  { id: 'chapitre_06', label: 'Chapitre 6 — Échange' },
  { id: 'chapitre_07', label: 'Chapitre 7 — Optimum de Pareto' },
  { id: 'chapitre_08', label: 'Chapitre 8 — Méthodes transversales' },
];

export function getSessionCards(
  allCards: Flashcard[],
  progress: FlashcardProgress,
  chapitreId: string,
  count = 20
): Flashcard[] {
  const pool = chapitreId === 'all'
    ? allCards
    : allCards.filter(f => f.chapitre_id === chapitreId);

  const mastered   = pool.filter(f => progress.mastered.includes(f.id));
  const struggling = pool.filter(f => progress.struggling.includes(f.id));
  const unseen     = pool.filter(f => !progress.seen.includes(f.id));

  // 50% non-vues, 30% difficiles, 20% maîtrisées
  const nUnseen     = Math.min(unseen.length,     Math.floor(count * 0.50));
  const nStruggling = Math.min(struggling.length, Math.floor(count * 0.30));
  const nMastered   = Math.min(mastered.length,   Math.floor(count * 0.20));

  const selected = shuffle([
    ...shuffle(unseen).slice(0, nUnseen),
    ...shuffle(struggling).slice(0, nStruggling),
    ...shuffle(mastered).slice(0, nMastered),
  ]);

  // Compléter si pas assez
  if (selected.length < count) {
    const usedIds = new Set(selected.map(f => f.id));
    const extra = shuffle(pool.filter(f => !usedIds.has(f.id)))
      .slice(0, count - selected.length);
    return shuffle([...selected, ...extra]).slice(0, count);
  }

  return shuffle(selected).slice(0, count);
}
```

---

## 14. COMPOSANT CRITIQUE — src/components/ui/MathRenderer.tsx

Ce composant est **le seul endroit** où KaTeX est appelé. Tous les autres composants qui affichent des formules l'utilisent.

```typescript
/**
 * @file MathRenderer.tsx
 * @description Rendu de texte mixte (texte + formules LaTeX $...$ et $$...$$)
 * @dependencies katex
 */
'use client';
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
      display: isDisplay,
    });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return segments.length > 0 ? segments : [{ type: 'text', content: text }];
}

export function MathRenderer({
  text,
  className = '',
  displayMode = false,
  errorColor = '#ef4444',
}: MathRendererProps) {
  if (!text) return null;

  const segments = parseTextWithMath(text);

  return (
    <span className={className}>
      {segments.map((segment, index) => {
        if (segment.type === 'text') {
          return <span key={index}>{segment.content}</span>;
        }
        try {
          const html = katex.renderToString(segment.content, {
            displayMode: segment.display ?? displayMode,
            throwOnError: false,
            errorColor,
            strict: false,
            trust: false,
            macros: {
              '\\R': '\\mathbb{R}',
              '\\E': '\\mathbb{E}',
              '\\N': '\\mathbb{N}',
            },
          });
          return (
            <span
              key={index}
              dangerouslySetInnerHTML={{ __html: html }}
              className={segment.display ? 'block my-2 overflow-x-auto' : 'inline'}
            />
          );
        } catch {
          return (
            <code key={index} className="text-red-400 text-sm px-1 font-mono">
              {segment.content}
            </code>
          );
        }
      })}
    </span>
  );
}
```

---

## 15. LAYOUT SIDEBAR — Spécifications visuelles

```
┌─────────────────────────────┐
│  🏴‍☠️  MICRO QUEST            │  ← logo cliquable → /
│  ─────────────────────────  │
│  [SVG avatar pirate, 64px]  │
│  Capitaine [nom]            │  ← editable au clic
│  🪝 Mousse  ▒▒▒▓▓○ Niv.3    │  ← XPBar animée
│  🪙 247 pièces               │  ← compteur animé au gain
│  ─────────────────────────  │
│  ■ Accueil         [blue]   │  ← item actif : bg-white/8 + barre gauche colorée
│    Cours complet   [purple] │
│    Fiches          [cyan]   │
│    Exercices TD    [green]  │
│    Flashcards      [purple] │
│    QCM             [orange] │
│    Mindmap         [cyan]   │
│    Shop pirate     [gold]   │
└─────────────────────────────┘
```

**Topbar** (56px) :
- Gauche : fil d'Ariane (ex: "Accueil / QCM / Session")
- Droite : `🪙 247` compteur pièces + `[Niv. 3 Mousse]` badge + icône settings

**Zone contenu** : `px-8 py-6` desktop, `px-4 py-4` mobile, `max-w-[1200px] mx-auto`

---

## 16. PATTERNS DE COMPOSANTS

### Pattern page standard
```typescript
'use client';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function SectionPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="page-wrapper"
    >
      {/* contenu */}
    </motion.div>
  );
}
```

### Pattern card standard
```typescript
// Classes CSS pour toutes les cards
const cardClass = cn(
  'bg-[var(--bg-card)]',
  'border border-[var(--border-subtle)]',
  'rounded-xl p-6',
  'hover:border-[var(--border-default)]',
  'hover:bg-[var(--bg-card-hover)]',
  'transition-all duration-200 cursor-pointer'
);
```

### Pattern liste animée (stagger)
```typescript
const containerVariants = {
  animate: { transition: { staggerChildren: 0.05 } }
};
const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 }
};

// Usage:
<motion.div variants={containerVariants} initial="initial" animate="animate">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* card */}
    </motion.div>
  ))}
</motion.div>
```

### Pattern loading skeleton
```typescript
import { Skeleton } from '@/components/ui/skeleton';

if (loading) {
  return (
    <div className="page-wrapper space-y-4">
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
```

---

## 17. SPÉCIFICATIONS DES SECTIONS

### 17.1 Dashboard (/page.tsx)
Bento grid responsive. Données depuis localStorage :
```
┌──────────────────┬──────────────┐
│ WelcomeCard      │ StreakCard    │  ← message aléatoire + streak jours
│ (col-span-2)     │              │
├────────┬─────────┴──────────────┤
│ Stats  │ ScoreChart             │  ← LineChart Recharts, 5 dernières sessions
│ Cards  │ (score QCM en %)       │
│ × 4    │                        │
├────────┴────────────────────────┤
│ ProgressCard (chapitres 1→8)   │  ← barres de progression par chapitre
└─────────────────────────────────┘
```
StatsCard × 4 : pièces totales, flashcards maîtrisées, QCM complétés, moyenne score.

### 17.2 Cours PDF (/cours)
```typescript
// Utiliser react-pdf, workerSrc depuis node_modules
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
```
- Sidebar gauche : chapitres numérotés (1→7) pour navigation rapide
- Contrôles : zoom (50%-200%), plein écran, page courante / total
- Mémorisation page dans localStorage `STORAGE_KEYS.COURS_POSITION`
- Fallback élégant si PDF absent (message + lien pour placer le PDF)

### 17.3 Fiches & méthodes (/fiches et /fiches/[chapitreId])
- Page liste : 8 cards par chapitre (titre + nb méthodes + nb concepts clés)
- Barre de recherche sur `concepts_cles` et `titre`
- Page détail : intuition + résumé condensé (liste à puces) + méthodes dépliables + concepts clés (badges)
- Tout le texte passe par `<MathRenderer />`

### 17.4 Exercices TD (/exercices et /exercices/[exerciceId])
- Page liste : cards avec titre, chapitre, difficulté, durée estimée
- Filtres : par chapitre + par difficulté
- Page exercice :
  - Énoncé de l'exercice (résumé)
  - Barre de progression (Étape X/N)
  - Question de l'étape active
  - Bouton "💡 Voir un indice" → révèle `indice` avec animation slide-down
  - Bouton "✅ Voir la correction" → révèle `reponse` + `explication_logique` + `moyen_mnemo`
  - Bouton "Étape suivante" → passe à l'étape N+1
  - À complétion : +30 pièces + confettis

### 17.5 Flashcards (/flashcards et /flashcards/session)
- Page sélection : sélecteur de chapitre (01→08 + Salade)
- Session :
  - Flip 3D obligatoire via Framer Motion (`rotateY 0→180`, `backfaceVisibility: 'hidden'`)
  - Container : `style={{ perspective: '1000px' }}`
  - Après flip : 3 boutons animés — 😰 Raté (+0) | 🤔 À revoir (+5) | ✅ Maîtrisé (+10)
  - Progress bar : X/20 cartes
- Recto et verso : `<MathRenderer />`

```typescript
// Pattern flip 3D Framer Motion
<motion.div style={{ perspective: '1000px' }}>
  <motion.div
    animate={{ rotateY: flipped ? 180 : 0 }}
    transition={{ duration: 0.4, ease: 'easeInOut' }}
    style={{ transformStyle: 'preserve-3d', position: 'relative' }}
  >
    {/* Recto */}
    <div style={{ backfaceVisibility: 'hidden' }}>
      <MathRenderer text={card.recto} />
    </div>
    {/* Verso */}
    <div style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0 }}>
      <MathRenderer text={card.verso} />
    </div>
  </motion.div>
</motion.div>
```

### 17.6 QCM (/qcm, /qcm/session, /qcm/resultats)
**⚠️ Asymétrie données** : `qcm.json` a chapitres 01→07 + "methodes". Pas de chapitre_08 dans le QCM.

Config page :
- Sélecteur chapitre (liste `QCM_CHAPITRES`)
- Niveau de difficulté (tout / facile / moyen / difficile)
- Bouton "Commencer" → navigate vers `/qcm/session` avec params en sessionStorage

Session page :
- 1 question à la fois (pas de défilement)
- 4 boutons options (`OptionButton`)
- Au clic :
  - Bonne réponse → animation `pulseGreen` + badge ✅ sur le bouton
  - Mauvaise réponse → `shake` rouge + badge ❌ + badge ✅ sur la bonne réponse
  - Explication slide-down automatique (même sur bonne réponse)
  - Bouton "Suivante" apparaît après 0.8s
- Barre de progression en haut
- Question et options : `<MathRenderer />`

Résultats page :
- Score animé (compteur de 0 → X)
- Badge de récompense pièces avec animation
- RadarChart Recharts par chapitre (score par chapitre)
- Liste déroulante : chaque question avec réponse donnée vs bonne réponse
- Bouton "Rejouer" + "Retour"

### 17.7 Mindmap (/mindmap)
```typescript
import ReactFlow, { Background, Controls, MiniMap, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Convertir les MindmapNode (format JSON) en Node (@xyflow/react)
const flowNodes = nodes.map(n => ({
  id: n.id,
  type: 'custom',
  position: n.position,
  data: { label: n.label, type: n.type, formule: n.formule, couleur: n.couleur },
}));
```
- `CustomNode` : affiche label + formule via `<MathRenderer />`, couleur de bordure selon `couleur`
- Clic sur nœud → `NodeDetailPanel` (panneau latéral droit, slide-in)
- Zoom molette, drag nœuds, minimap
- Bouton "Reset vue" + bouton "Centrer"

### 17.8 Shop pirate (/shop)
- Grille : 3 colonnes, items triés par prix
- `ShopItem` :
  - Badge de rareté (couleur selon `RARETE_STYLES`)
  - Prix (grisé si déjà acheté, barré si pas assez de pièces)
  - État : "Équipé" / "Acheter X🪙" / "Équiper" / "Insuffisant"
- Clic "Acheter" → `BuyConfirmModal` (confirmer, montrer le solde restant)
- `PiratePreview` en haut à droite : SVG du skin actuel, animé avec Framer Motion

---

## 18. GAMIFICATION — LOGIQUE COMPLÈTE

### Pièces d'or
```typescript
// À chaque gain, déclencher en séquence :
// 1. Particules dorées (GoldAnimation — AnimatePresence + motion.div)
// 2. Compteur sidebar qui s'incrémente (useSpring de framer-motion)
// 3. Toast "+X 🪙" (GoldToast — fixed bottom-right, 2s)
// 4. Mise à jour localStorage
```

### GoldAnimation.tsx
```typescript
// Particules qui flottent vers le haut, se dispersent, disparaissent
// 8 particules, position aléatoire ±40px, animation goldFloat
```

### LevelUpModal.tsx
```typescript
// Déclenché quand niveau change dans usePlayerData
// Plein écran semi-transparent + confettis canvas-confetti
// Affiche nouveau titre + emoji + nombre de pièces débloquées
// Auto-fermeture après 4s ou clic
```

### Streak
```typescript
// Vérifier lastVisit à chaque chargement via updateStreak()
// Streak 7+ jours → toast spécial + RECOMPENSES.BONUS_STREAK_7
```

---

## 19. VALIDATORS ZOD — src/validators/

### qcm.schema.ts
```typescript
import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.string(),
  chapitre_id: z.string(),
  question: z.string(),
  options: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  bonne_reponse: z.string(),
  explication: z.string(),
  difficulte: z.enum(['facile', 'moyen', 'difficile']),
});

export const QCMDataSchema = z.array(QuestionSchema);
export type QuestionSchemaType = z.infer<typeof QuestionSchema>;
```

_(Créer des schemas similaires pour flashcards, fiches, exercices, shop)_

---

## 20. GÉNÉRATION DES SVG AVATARS PIRATES

Créer 9 SVGs dans `public/avatars/`. Chaque SVG doit être un vrai pirate simple mais reconnaissable (viewBox 100x100). Les formes peuvent être simples (cercles, rectangles, chemins basiques). Voici les specs :

- **pirate_base.svg** : tête ronde, corps, chemise rayée, pas de chapeau spécial
- **bandana_rouge.svg** : pirate_base + bandana rouge sur la tête
- **chapeau_tricorne.svg** : pirate_base + tricorne noir à 3 pointes
- **chapeau_capitaine.svg** : pirate_base + grand chapeau de capitaine avec plume
- **lunette_navigateur.svg** : pirate_base + longue-vue dans la main
- **veste_galonnee.svg** : corps avec veste dorée galonnée
- **manteau_capitaine.svg** : long manteau noir tombant jusqu'aux pieds
- **perroquet.svg** : pirate_base + perroquet coloré sur l'épaule
- **carte_tresor.svg** : pirate_base + carte au trésor déroulée dans les mains

Générer ces SVGs directement avec du code SVG valide. Utiliser les couleurs de la palette (#f59e0b, #3b82f6, etc.).

---

## 21. CHECKS AVANT LIVRAISON DE CHAQUE SECTION

Tester mentalement chaque section avant de déclarer "terminé" :

**Données** :
- [ ] Le fetch gère-t-il le cas 404 (fichier absent) ?
- [ ] La validation Zod affiche-t-elle une erreur claire si le JSON est malformé ?
- [ ] Le skeleton s'affiche-t-il pendant le loading ?

**localStorage** :
- [ ] Sur première visite (localStorage vide), les defaults s'appliquent-ils ?
- [ ] Une corruption de localStorage fait-elle crasher l'app ou est-elle gracieusement gérée ?

**Formules LaTeX** :
- [ ] Les formules $...$ et $$...$$ s'affichent-elles correctement (pas de texte rouge, pas de code brut) ?
- [ ] Le dark mode KaTeX est-il appliqué (texte blanc sur fond sombre) ?

**Gamification** :
- [ ] Les pièces sont-elles créditées au bon moment ?
- [ ] L'animation gold se déclenche-t-elle visuellement ?
- [ ] Le niveau se met-il à jour si le seuil est atteint ?

**Mobile** :
- [ ] La sidebar est-elle masquée sur mobile (<768px) ?
- [ ] Les grilles passent-elles en 1 colonne sur mobile ?
- [ ] Les formules LaTeX sont-elles lisibles sur écran étroit ?

**Test KaTeX rapide** — créer une page `/test-math` temporaire :
```typescript
<MathRenderer text="$U_A = v - p$" />
<MathRenderer text="$\frac{p - c}{p} = \frac{1}{\epsilon}$" />
<MathRenderer text="$$S(p) = \int_p^\infty D(v) \, dv$$" />
<MathRenderer text="Le prix optimal est $p^m = c + \frac{1-F(p)}{f(p)}$" />
```

---

## 22. ORDRE DE CONSTRUCTION — SUIVRE EXACTEMENT

**Après chaque étape : afficher les fichiers créés + résultat de `npm run dev`, attendre confirmation avant de passer à la suivante.**

### Étape 1 — Setup projet
1. `cd C:/Users/dizzy/Site_Micro && mkdir 06_site_web && cd 06_site_web`
2. `npx create-next-app@latest . --typescript --app --src-dir --import-alias "@/*" --no-tailwind --eslint`
3. `npm install tailwindcss@^4 @tailwindcss/postcss@^4`
4. `npx shadcn@latest init` (style: default, baseColor: zinc, CSS variables: yes)
5. `npm install framer-motion recharts @xyflow/react react-pdf katex zod lucide-react clsx tailwind-merge`
6. `npm install --save-dev @types/katex`
7. Créer `postcss.config.mjs`, `next.config.ts`, `src/app/globals.css`

### Étape 2 — Données & types
1. Créer `public/data/` → copier les 6 JSON depuis `../04_bases_donnees_site/`
2. Créer `public/cours/` → copier le PDF depuis `../02_cours_structures/Cours_Micro_Latex.pdf`
3. Copier `pdf.worker.min.js` depuis `node_modules/pdfjs-dist/build/`
4. Créer `src/types/index.ts`
5. Créer `src/lib/constants.ts`, `src/lib/utils.ts`
6. Créer tous les hooks dans `src/hooks/`
7. Créer `src/lib/qcm.ts`, `src/lib/flashcards.ts`
8. Créer tous les validators Zod dans `src/validators/`

### Étape 3 — Layout global
1. Créer `src/app/layout.tsx` (avec imports KaTeX + globals)
2. Créer `src/components/layout/Sidebar.tsx` + `SidebarItem.tsx`
3. Créer `src/components/layout/GoldCounter.tsx` + `XPBar.tsx` + `PirateAvatar.tsx`
4. Créer `src/components/layout/Topbar.tsx`
5. Vérifier navigation entre pages

### Étape 4 — MathRenderer + test
1. Créer `src/components/ui/MathRenderer.tsx`
2. Créer page `/test-math` temporaire pour valider les 4 formules test

### Étape 5 — Dashboard
1. Créer composants `dashboard/`
2. Créer `src/app/page.tsx`
3. Vérifier que les stats localStorage s'affichent correctement au premier lancement

### Étape 6 — QCM (section principale)
1. Créer composants `qcm/`
2. Créer les 3 pages (`/qcm`, `/qcm/session`, `/qcm/resultats`)
3. Tester une session complète avec attribution des pièces

### Étape 7 — Flashcards
1. Créer composants `flashcards/`
2. Créer les 2 pages (`/flashcards`, `/flashcards/session`)
3. Tester le flip 3D sur mobile + desktop

### Étape 8 — Cours PDF
1. Créer composants `cours/`
2. Créer page `/cours`
3. Tester la navigation chapitres + mémorisation position

### Étape 9 — Exercices TD
1. Créer composants `exercices/`
2. Créer les 2 pages (`/exercices`, `/exercices/[exerciceId]`)
3. Tester une session complète + attribution des pièces à la fin

### Étape 10 — Fiches & méthodes
1. Créer composants `fiches/`
2. Créer les 2 pages (`/fiches`, `/fiches/[chapitreId]`)
3. Tester la recherche par concepts_cles

### Étape 11 — Mindmap
1. Créer composants `mindmap/`
2. Créer page `/mindmap`
3. Tester le drag des nœuds + panneau détail au clic

### Étape 12 — Shop pirate
1. Générer les 9 SVGs dans `public/avatars/`
2. Créer composants `shop/`
3. Créer page `/shop`
4. Tester achat + équipement

### Étape 13 — Gamification complète
1. Créer composants `gamification/`
2. Intégrer `GoldAnimation` dans `useGoldReward`
3. Intégrer `LevelUpModal` dans `usePlayerData`
4. Intégrer `StreakBonus` dans le layout

### Étape 14 — Responsive mobile
1. Sidebar → drawer (Sheet shadcn/ui) sur mobile
2. Grilles → 1 colonne
3. Topbar mobile : hamburger menu
4. Tester sur 375px (iPhone SE)

### Étape 15 — Polish final
1. Vérifier toutes les animations (entrée de page, listes stagger, boutons whileTap)
2. Accessibilité : aria-labels, focus visible, contraste couleurs
3. `npm run build` → corriger toutes les erreurs TypeScript et ESLint
4. Supprimer la page `/test-math` temporaire
5. `npm run start` → test de production

---

**Prêt ? Commence par l'Étape 1. Lance `npx create-next-app@latest` dans le bon dossier et montre-moi ce que tu obtiens.**
