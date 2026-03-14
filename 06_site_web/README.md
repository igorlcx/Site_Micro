# Micro Quest — Site de révision de Microéconomie

Site de révision gamifié pour la microéconomie, inspiré de Duolingo (gamification), Linear (densité) et Raycast (micro-animations). Thème pirate, mode sombre intégral.

---

## Lancer le site

### Prérequis
- Node.js 18+ installé
- Se placer dans le dossier `06_site_web/`

### Commandes

```bash
# Installer les dépendances (seulement la première fois)
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir ensuite **http://localhost:3000** dans le navigateur.

Le site fonctionne entièrement en local — aucune connexion internet nécessaire (sauf pour les polices Google Fonts).

---

## Fonctionnalités

### Dashboard (`/`)
- Message de bienvenue personnalisé (rotation aléatoire de 6 messages)
- Compteur de streak de jours consécutifs
- 4 stats en temps réel : pièces d'or, flashcards maîtrisées, QCM complétés, score moyen
- Graphique d'évolution du score QCM (8 dernières sessions)
- Accès rapide aux 4 sections principales
- Barre de progression des exercices

### Cours complet (`/cours`)
- Viewer PDF du cours de microéconomie intégré dans la page
- Navigation page par page (Précédent / Suivant)
- Zoom de 50% à 200% par paliers de 10%
- La dernière page lue est mémorisée automatiquement entre les sessions
- Fallback propre si le PDF est introuvable

### Fiches & méthodes (`/fiches`)
- 8 fiches synthétiques, une par chapitre
- Filtre par chapitre (tabs horizontaux)
- Chaque fiche contient :
  - **Intuition** : explication vulgarisée avec analogie
  - **Moyen mémo** : astuce mémorielle originale
  - **Résumé condensé** : 4 à 6 points clés
  - **Méthodes** : accordéons "situation → étapes"
  - **Concepts clés** : badges
- Toutes les formules LaTeX sont rendues avec KaTeX

### Exercices TD (`/exercices`)
- 16 exercices répartis sur 7 chapitres
- Filtres par chapitre et par difficulté (Facile / Moyen / Difficile)
- Badge vert sur les exercices déjà complétés
- Mode résolution pas à pas :
  - Chaque étape peut révéler un **indice** (optionnel)
  - Puis la **correction complète** avec explication logique et moyen mémo
  - Bouton "Exercice terminé" → récompense **+30 pièces d'or**
  - Exercices complétés enregistrés en localStorage

### Flashcards (`/flashcards`)
- 200 flashcards réparties sur 8 chapitres (ch.01 à ch.08)
- Sélecteur de chapitre avec barre de progression par chapitre
- Mode "Salade" : mélange de tous les chapitres
- Algorithme intelligent de sélection :
  - 50% de cartes non vues
  - 30% de cartes "à revoir"
  - 20% de cartes maîtrisées (révision espacée légère)
- Flip 3D animé au clic
- 3 boutons après avoir retourné la carte :
  - Raté : marqué à revoir, 0 pièce
  - À revoir : +5 pièces d'or
  - Maîtrisé : +10 pièces d'or
- Résumé en fin de session (maîtrisées / à revoir / ratées)
- Formules LaTeX rendues sur recto et verso

### QCM (`/qcm`)
- 170 questions réparties sur 7 chapitres + "Méthodes générales"
- Filtre par chapitre et par difficulté avant de lancer
- Session de 15 questions max (équilibre automatique facile/moyen/difficile)
- Feedback immédiat à chaque réponse :
  - Bonne réponse → surlignage vert
  - Mauvaise réponse → animation shake rouge + bonne réponse révélée en vert
  - Explication qui s'affiche en slide-down
- Page de résultats avec score animé, pièces gagnées et révision détaillée de toutes les réponses

### Mindmap (`/mindmap`)
- Carte mentale interactive avec 55+ nœuds
- Nœuds draggables, zoom à la molette
- Clic sur un nœud → panneau latéral avec label, type et formule KaTeX
- Styles visuels par type de nœud (root, chapitre, concept, formule)

### Shop pirate (`/shop`)
- 9 skins pirate achetables avec les pièces d'or gagnées
- Aperçu de l'avatar actuel en haut de page
- 4 niveaux de rareté : Commun / Rare / Épique / Légendaire
- 3 états par item : Acheter / Équiper / Équipé
- Modal de confirmation avant tout achat
- Pièces déduites instantanément, skin visible dans la sidebar

---

## Système de gamification

### Pièces d'or

| Action | Récompense |
|---|---|
| Flashcard maîtrisée | +10 |
| Flashcard à revoir | +5 |
| Exercice complété | +30 |
| QCM < 40% | +20 |
| QCM >= 40% | +50 |
| QCM >= 60% | +80 |
| QCM >= 80% | +110 |
| QCM >= 93% (parfait) | +150 |
| Streak 7 jours | +100 bonus |

### Niveaux

| Niveau | Titre | XP requis |
|---|---|---|
| 1 | Mousse | 0 |
| 2 | Matelot | 100 |
| 3 | Quartier-maître | 300 |
| 4 | Second | 600 |
| 5 | Capitaine | 1 000 |
| 6 | Capitaine émérite | 1 500 |
| 7 | Amiral de la micro | 2 500 |

1 pièce d'or = 1 XP. Le niveau monte automatiquement dans la sidebar.

### Streak
Le streak compte les jours de visite consécutifs. Si plus de 24h sans connexion, il est remis à zéro. Un streak de 7 jours déclenche un bonus de +100 pièces.

---

## Données et persistance

Toutes les données utilisateur sont stockées dans le **localStorage** du navigateur — aucun compte, aucun serveur. Les données sont conservées entre les sessions sur la même machine.

Les données pédagogiques (QCM, flashcards, fiches, exercices, mindmap, shop) sont dans `public/data/` en JSON et ne sont jamais modifiées.

---

## Stack technique

- **Next.js 16** — App Router
- **React 19** + **TypeScript strict**
- **Tailwind CSS v4** — thème dark intégral
- **Framer Motion** — animations de page et interactions
- **KaTeX** — rendu des formules LaTeX
- **@xyflow/react v12** — mindmap interactive
- **react-pdf v10** — viewer PDF intégré
- **Recharts** — graphique d'évolution des scores
