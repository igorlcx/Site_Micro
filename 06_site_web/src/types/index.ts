/**
 * @file index.ts
 * @description All TypeScript interfaces for Micro Quest
 */

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
