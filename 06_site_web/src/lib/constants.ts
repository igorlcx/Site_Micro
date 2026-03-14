/**
 * @file constants.ts
 * @description Global constants - navigation, levels, rewards, defaults
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
  QCM_PARFAIT:        150,
  QCM_EXCELLENT:      110,
  QCM_BON:            80,
  QCM_MOYEN:          50,
  QCM_TENTE:          20,
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
  facile:    { label: 'Facile',    className: 'text-green-400 bg-green-400/10 border border-green-400/20' },
  moyen:     { label: 'Moyen',     className: 'text-orange-400 bg-orange-400/10 border border-orange-400/20' },
  difficile: { label: 'Difficile', className: 'text-red-400 bg-red-400/10 border border-red-400/20' },
} as const;

export const RARETE_STYLES = {
  commun:     { label: 'Commun',     className: 'text-slate-400',  border: 'border-slate-400/30' },
  rare:       { label: 'Rare',       className: 'text-blue-400',   border: 'border-blue-400/40' },
  'épique':   { label: 'Épique',     className: 'text-purple-400', border: 'border-purple-400/50' },
  'légendaire': { label: 'Légendaire', className: 'text-amber-400',  border: 'border-amber-400/60' },
} as const;

export const WELCOME_MESSAGES = [
  'Prêt à dominer la micro, Capitaine ?',
  "Les marchés n'attendent pas. En avant !",
  'Chaque flashcard est une pièce d\'or gagnée.',
  'Ton adversaire révise en ce moment. Et toi ?',
  "L'équilibre de Nash ne se trouvera pas tout seul.",
  'Le Welfare maximum t\'attend au prochain QCM.',
] as const;

export const CHAPITRE_LABELS: Record<string, string> = {
  chapitre_01: 'Ch.1 — Négociation',
  chapitre_02: 'Ch.2 — A-compétition',
  chapitre_03: 'Ch.3 — V-compétition',
  chapitre_04: 'Ch.4 — Concurrence imparfaite',
  chapitre_05: 'Ch.5 — Préférences',
  chapitre_06: 'Ch.6 — Échange',
  chapitre_07: 'Ch.7 — Optimum de Pareto',
  chapitre_08: 'Ch.8 — Méthodes transversales',
  methodes:    'Méthodes générales',
};
