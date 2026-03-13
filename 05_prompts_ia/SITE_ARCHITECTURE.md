# SITE_ARCHITECTURE.md
# Architecture exacte du projet — Site Micro Quest
# Ce fichier décrit l'arborescence complète que Gemini CLI doit produire dans 06_site_web/

---

## STACK TECHNIQUE RÉSUMÉE

| Outil | Version | Rôle |
|-------|---------|------|
| Next.js | 15 (App Router) | Framework principal |
| React | 19 | UI |
| TypeScript | 5.x strict | Typage |
| Tailwind CSS | v4 | Styling |
| shadcn/ui | latest | Composants de base |
| Framer Motion | 11.x | Animations |
| Recharts | 2.x | Graphiques stats |
| React Flow | 12.x (@xyflow/react) | Mindmap interactive |
| react-pdf | 9.x | Viewer PDF |
| KaTeX | 0.16.x | Formules mathématiques |
| Zod | 3.x | Validation données JSON |
| Lucide React | latest | Icônes |

---

## COMMANDES D'INSTALLATION

```bash
# Initialisation du projet (sans --tailwind car on installe Tailwind v4 manuellement)
npx create-next-app@latest . --typescript --app --src-dir --import-alias "@/*"

# Tailwind CSS v4 (PAS v3) + PostCSS plugin v4
npm install tailwindcss@^4 @tailwindcss/postcss@^4

# Créer postcss.config.mjs avec :
# export default { plugins: { '@tailwindcss/postcss': {} } }
# Note : PAS de tailwind.config.ts en v4 — tout le thème est dans globals.css via @theme {}

# shadcn/ui (compatible Tailwind v4)
npx shadcn@latest init

# Dépendances principales
npm install framer-motion recharts @xyflow/react react-pdf katex zod lucide-react

# Types
npm install --save-dev @types/katex
```

---

## ARBORESCENCE COMPLÈTE

```
06_site_web/
│
├── public/                              # Assets statiques (servis par Next.js)
│   ├── data/                            # Bases de données JSON locales
│   │   ├── qcm.json                     ← DÉJÀ GÉNÉRÉ — ne pas modifier
│   │   ├── flashcards.json              ← DÉJÀ GÉNÉRÉ — ne pas modifier
│   │   ├── fiches.json                  ← À générer par Gemini (voir GI §6) — fiches par chapitre
│   │   ├── exercices.json               ← À générer : exercices TD structurés
│   │   ├── mindmap.json                 ← À générer : nœuds et arêtes mindmap
│   │   └── shop.json                    ← À générer : catalogue items pirate
│   │
│   ├── cours/                           # PDF du cours LaTeX compilé
│   │   └── cours_micro_complet.pdf      ← DÉJÀ GÉNÉRÉ — ne pas modifier
│   │
│   ├── avatars/                         # SVGs du pirate (skin system)
│   │   ├── pirate_base.svg              # Pirate de départ (gratuit)
│   │   ├── pirate_tricorne.svg
│   │   ├── pirate_bandana.svg
│   │   ├── pirate_capitaine.svg
│   │   ├── pirate_manteau.svg
│   │   └── pirate_amiral.svg
│   │
│   ├── fonts/                           # Polices locales (optionnel si Google Fonts)
│   └── pdf.worker.min.js                # Worker react-pdf (copier depuis pdfjs-dist)
│
├── src/
│   │
│   ├── app/                             # Next.js App Router
│   │   ├── layout.tsx                   # Layout racine : sidebar + topbar + AnimatePresence
│   │   ├── page.tsx                     # Page d'accueil (dashboard)
│   │   ├── globals.css                  # Variables CSS + reset + font imports
│   │   │
│   │   ├── cours/
│   │   │   └── page.tsx                 # Section cours complet (PDF viewer)
│   │   │
│   │   ├── fiches/
│   │   │   ├── page.tsx                 # Liste des fiches par chapitre
│   │   │   └── [chapitreId]/
│   │   │       └── page.tsx             # Détail d'une fiche
│   │   │
│   │   ├── exercices/
│   │   │   ├── page.tsx                 # Sélection d'exercice
│   │   │   └── [exerciceId]/
│   │   │       └── page.tsx             # Mode résolution pas à pas
│   │   │
│   │   ├── flashcards/
│   │   │   ├── page.tsx                 # Sélection du mode/chapitre
│   │   │   └── session/
│   │   │       └── page.tsx             # Session de révision
│   │   │
│   │   ├── qcm/
│   │   │   ├── page.tsx                 # Configuration + lancement
│   │   │   ├── session/
│   │   │   │   └── page.tsx             # Questions en cours
│   │   │   └── resultats/
│   │   │       └── page.tsx             # Résultats + détail
│   │   │
│   │   ├── mindmap/
│   │   │   └── page.tsx                 # Mindmap interactive React Flow
│   │   │
│   │   └── shop/
│   │       └── page.tsx                 # Shop pirate
│   │
│   ├── components/
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx              # Navigation latérale complète
│   │   │   ├── SidebarItem.tsx          # Item de nav (avec état actif animé)
│   │   │   ├── PirateAvatar.tsx         # Avatar SVG animé dans la sidebar
│   │   │   ├── GoldCounter.tsx          # Compteur de pièces animé
│   │   │   ├── XPBar.tsx                # Barre d'expérience + niveau
│   │   │   └── Topbar.tsx               # Barre du haut (breadcrumb + infos)
│   │   │
│   │   ├── ui/                          # Composants shadcn/ui (auto-générés) + custom
│   │   │   ├── MathRenderer.tsx         # ⚠️ CRITIQUE — rendu KaTeX (voir GI §14, à créer manuellement)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── WelcomeCard.tsx          # Card de bienvenue avec message aléatoire
│   │   │   ├── StreakCard.tsx           # Compteur de streak
│   │   │   ├── StatsCard.tsx           # Card de statistique générique réutilisable
│   │   │   ├── ProgressCard.tsx         # Progression globale par chapitre
│   │   │   └── ScoreChart.tsx           # Graphique Recharts évolution score QCM
│   │   │
│   │   ├── cours/
│   │   │   ├── PDFViewer.tsx            # Composant react-pdf principal
│   │   │   ├── ChapterNav.tsx           # Navigation chapitres (sidebar du viewer)
│   │   │   └── ViewerControls.tsx       # Zoom, plein écran, page courante
│   │   │
│   │   ├── fiches/
│   │   │   ├── FicheCard.tsx            # Card de sélection (titre + nb méthodes)
│   │   │   ├── FicheDetail.tsx          # Page détail complète d'une fiche
│   │   │   ├── MethodeBlock.tsx         # Bloc situation + étapes d'une méthode
│   │   │   └── FicheSearch.tsx          # Barre de recherche sur concepts_cles
│   │   │
│   │   ├── flashcards/
│   │   │   ├── FlashcardCard.tsx        # Carte individuelle avec flip 3D
│   │   │   ├── FlashcardSession.tsx     # Orchestration de la session
│   │   │   ├── FlashcardProgress.tsx    # Barre de progression + compteur
│   │   │   ├── FlashcardResult.tsx      # Boutons Raté / À revoir / Maîtrisé
│   │   │   └── ChapterSelector.tsx      # Sélection chapitre ou mode Salade
│   │   │                                # ⚠️ Inclure chapitre_08 (45 cartes, absent du QCM)
│   │   │
│   │   ├── qcm/
│   │   │   ├── QuestionCard.tsx         # Carte question + 4 options
│   │   │   ├── OptionButton.tsx         # Bouton option (neutre / vert / rouge)
│   │   │   ├── ExplicationReveal.tsx    # Explication qui slide après réponse
│   │   │   ├── QCMProgress.tsx          # Barre de progression + numéro question
│   │   │   ├── QCMConfig.tsx            # Page de configuration avant lancement
│   │   │   └── QCMResults.tsx           # Résultats finaux + graphique radar
│   │   │
│   │   ├── exercices/
│   │   │   ├── ExerciceCard.tsx         # Card de sélection d'un exercice
│   │   │   ├── EtapeView.tsx            # Vue d'une étape (question + réponse)
│   │   │   ├── CorrectionReveal.tsx     # Correction + explication + mnémo
│   │   │   ├── IndiceButton.tsx         # Bouton hint avec animation reveal
│   │   │   └── ExerciceProgress.tsx     # Barre étapes (Étape X / N)
│   │   │
│   │   ├── mindmap/
│   │   │   ├── MindmapCanvas.tsx        # Composant React Flow principal
│   │   │   ├── CustomNode.tsx           # Nœud personnalisé (avec KaTeX si formule)
│   │   │   └── NodeDetailPanel.tsx      # Panneau latéral détail au click
│   │   │
│   │   ├── shop/
│   │   │   ├── ShopGrid.tsx             # Grille des items disponibles
│   │   │   ├── ShopItem.tsx             # Card item (avec rareté, prix, état)
│   │   │   ├── BuyConfirmModal.tsx      # Modal de confirmation d'achat
│   │   │   └── PiratePreview.tsx        # Aperçu du pirate avec skin actif
│   │   │
│   │   └── gamification/
│   │       ├── GoldAnimation.tsx        # Animation particules dorées
│   │       ├── GoldToast.tsx            # Toast "+X 🪙" animé
│   │       ├── LevelUpModal.tsx         # Modal passage de niveau
│   │       └── StreakBonus.tsx          # Notification bonus streak
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.ts           # Hook générique localStorage typé
│   │   ├── usePlayerData.ts             # Lecture/écriture données joueur
│   │   ├── useFlashcardProgress.ts      # Progression flashcards
│   │   ├── useQCMHistory.ts             # Historique QCM + stats
│   │   ├── useExercicesProgress.ts      # Exercices complétés
│   │   ├── useGoldReward.ts             # Distribuer pièces + déclencher animation
│   │   └── useDataLoader.ts             # Charger n'importe quel JSON depuis /public/data/
│   │
│   ├── lib/
│   │   ├── utils.ts                     # Fonctions utilitaires (cn, shuffle, etc.)
│   │   ├── constants.ts                 # Constantes globales (NIVEAUX, RECOMPENSES, etc.)
│   │   ├── qcm.ts                       # Logique métier QCM (generateQCMSession, calculateQCMReward)
│   │   │                                # Exporte aussi QCM_CHAPITRES (liste des chapitres filtrables)
│   │   │                                # ⚠️ chapitre_08 absent de QCM_CHAPITRES (pas de QCM pour ce chapitre)
│   │   ├── flashcards.ts                # Logique métier flashcards (algorithme sélection, getSessionCards)
│   │   └── gamification.ts              # Logique niveaux, XP, streak
│   │
│   ├── types/
│   │   └── index.ts                     # Toutes les interfaces TypeScript du projet
│   │
│   └── validators/
│       ├── qcm.schema.ts                # Schéma Zod pour qcm.json
│       ├── flashcards.schema.ts         # Schéma Zod pour flashcards.json
│       ├── fiches.schema.ts             # Schéma Zod pour fiches.json
│       ├── exercices.schema.ts          # Schéma Zod pour exercices.json
│       └── shop.schema.ts               # Schéma Zod pour shop.json
│
├── next.config.ts                       # Config Next.js
├── postcss.config.mjs                   # PostCSS : { '@tailwindcss/postcss': {} }
├── tsconfig.json                        # TypeScript strict
├── components.json                      # Config shadcn/ui
└── package.json
```

---

## FICHIER globals.css (complet)

> ⚠️ **Tailwind v4** — Le thème se déclare avec `@theme {}` directement dans ce fichier CSS. Il n'y a **pas de `tailwind.config.ts`** en v4. Les variables CSS `--bg-primary`, etc. sont déclarées dans `:root` pour être utilisées par les composants, et référencées dans `@theme` pour Tailwind.

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* ─── Variables CSS (utilisées par les composants directement) ──────────── */
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

/* ─── Tailwind v4 @theme — expose les variables aux classes utilitaires ─── */
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

  /* Animations custom */
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

/* Scrollbar custom */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--border-default); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--border-strong); }

/* Sélection de texte */
::selection { background: rgba(59, 130, 246, 0.3); color: var(--text-primary); }

/* Monospace pour les formules */
.font-mono { font-family: 'JetBrains Mono', monospace; }

/* ─── KaTeX dark mode overrides ─────────────────────────────────────────── */
/* ⚠️ Ces overrides sont OBLIGATOIRES pour que les formules soient lisibles  */
/* en dark mode. Sans eux, KaTeX affiche en noir sur fond noir (invisible).  */
.katex { color: var(--text-primary); }
.katex .mord, .katex .mbin, .katex .mrel,
.katex .mopen, .katex .mclose, .katex .mpunct,
.katex .minner { color: inherit; }
.katex { font-size: 1.05em; }
.katex-display {
  margin: 0.8em 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.2em 0;
}
.katex .frac-line { border-color: var(--text-primary); }
.katex-display > .katex {
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
```

---

## FICHIER src/app/layout.tsx — imports obligatoires

```typescript
// ⚠️ Ces deux imports DOIVENT être présents en haut du fichier layout.tsx
import 'katex/dist/katex.min.css';  // CSS KaTeX — OBLIGATOIRE pour le rendu des formules
import './globals.css';
```

---

## FICHIER postcss.config.mjs

```javascript
// Tailwind v4 utilise @tailwindcss/postcss (pas tailwindcss directement)
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

---

---

## FICHIER types/index.ts (complet)

```typescript
// ─── Données JSON ────────────────────────────────────────────────────────────

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

// ─── Données joueur (localStorage) ───────────────────────────────────────────

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

export type DifficulteColor = {
  facile: "text-green-400 bg-green-400/10";
  moyen: "text-orange-400 bg-orange-400/10";
  difficile: "text-red-400 bg-red-400/10";
}

export type NavItem = {
  href: string;
  label: string;
  icon: string;
  color: string;   // accent color pour cet item actif
}
```

---

## FICHIER lib/constants.ts (complet)

```typescript
import { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { href: "/",           label: "Accueil",          icon: "Home",       color: "#3b82f6" },
  { href: "/cours",      label: "Cours complet",     icon: "BookOpen",   color: "#8b5cf6" },
  { href: "/fiches",     label: "Fiches & méthodes", icon: "FileText",   color: "#06b6d4" },
  { href: "/exercices",  label: "Exercices TD",       icon: "Dumbbell",   color: "#10b981" },
  { href: "/flashcards", label: "Flashcards",         icon: "Layers",     color: "#8b5cf6" },
  { href: "/qcm",        label: "QCM",               icon: "HelpCircle", color: "#f97316" },
  { href: "/mindmap",    label: "Mindmap",            icon: "Network",    color: "#06b6d4" },
  { href: "/shop",       label: "Shop pirate",        icon: "ShoppingBag",color: "#f59e0b" },
];

export const NIVEAUX = [
  { niveau: 1, xp_requis: 0,    titre: "Mousse",           emoji: "🪝" },
  { niveau: 2, xp_requis: 100,  titre: "Matelot",          emoji: "⚓" },
  { niveau: 3, xp_requis: 300,  titre: "Quartier-maître",  emoji: "🗺️" },
  { niveau: 4, xp_requis: 600,  titre: "Second",           emoji: "⚔️" },
  { niveau: 5, xp_requis: 1000, titre: "Capitaine",        emoji: "🏴‍☠️" },
  { niveau: 6, xp_requis: 1500, titre: "Capitaine émérite",emoji: "👑" },
  { niveau: 7, xp_requis: 2500, titre: "Amiral de la micro",emoji: "🌊" },
];

export const RECOMPENSES = {
  FLASHCARD_MAITRISE:    10,
  FLASHCARD_A_REVOIR:    5,
  QCM_PARFAIT:           150,
  QCM_EXCELLENT:         110,
  QCM_BON:               80,
  QCM_MOYEN:             50,
  QCM_TENTE:             20,
  EXERCICE_COMPLETE:     30,
  BONUS_PREMIER_QCM:     25,
  BONUS_STREAK_7:        100,
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

## FICHIER next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Nécessaire pour react-pdf / pdfjs
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
```

---

## COMPOSANT CLÉS — PATTERNS À SUIVRE

### Pattern page standard
```typescript
// src/app/[section]/page.tsx
"use client";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

export default function SectionPage() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-8 py-6 max-w-[1200px] mx-auto"
    >
      {/* Contenu de la section */}
    </motion.div>
  );
}
```

### Pattern card standard
```typescript
// Classe CSS standard pour toutes les cards
const cardClass = `
  bg-[var(--bg-card)] 
  border border-[var(--border-subtle)] 
  rounded-xl p-6 
  hover:border-[var(--border-default)] 
  transition-all duration-200
  hover:bg-[var(--bg-card-hover)]
`;
```

### Pattern loading state
```typescript
// Toujours utiliser Skeleton pendant le chargement des données
import { Skeleton } from "@/components/ui/skeleton";

if (isLoading) {
  return (
    <div className="space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
```

---

## RÈGLES FINALES DE LIVRAISON

1. **Chaque fichier créé** doit avoir un commentaire d'en-tête :
   ```typescript
   /**
    * @file NomDuFichier.tsx
    * @description Rôle précis du composant en 1-2 phrases
    * @dependencies Liste des dépendances clés
    */
   ```

2. **Aucun `console.log`** en production — utiliser un utilitaire de log conditionnel

3. **Chaque section est lazy-loadée** :
   ```typescript
   // dans le layout ou page parent
   const QCMSection = dynamic(() => import("./qcm/page"), { 
     loading: () => <SectionSkeleton />,
     ssr: false 
   });
   ```

4. **Les données JSON** ne sont jamais importées directement en statique — toujours via `fetch('/data/fichier.json')` côté client pour permettre la mise à jour sans rebuild

5. **Responsive** : le site doit fonctionner sur mobile (sidebar → drawer, grilles → stack vertical)

6. **Tester mentalement chaque composant** avant de livrer :
   - "Si qcm.json est vide, est-ce que ça crash ?"
   - "Si localStorage est vide au premier lancement, est-ce que les défaults s'appliquent ?"
   - "Si le PDF est absent, est-ce qu'il y a un fallback propre ?"
