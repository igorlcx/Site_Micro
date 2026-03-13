Voici une synthèse structurée et exhaustive des méthodes générales de résolution extraites des travaux dirigés (TD) et des annales. 

Chaque type de problème est décortiqué pour fournir une véritable "boîte à outils" algorithmique à destination d'un étudiant.

***

### Méthode 1 : Recherche d'Optima de Pareto (La Boîte d'Edgeworth)
*Cette méthode caractérise les allocations efficaces (la "Courbe des Contrats") dans une économie d'échange pur entre deux agents, en l'absence de système de prix.*

* **Nom de la situation** : Caractérisation de la Courbe des Contrats dans la Boîte d'Edgeworth.
* **Signaux de reconnaissance** : "2 consommateurs, 2 biens", "Dessiner la boîte d'Edgeworth", "L'allocation est-elle Pareto-optimale ?", "Caractériser la courbe des contrats".
* **Étapes générales de résolution** :
  1. **Dimensionner la boîte** : Identifier les dotations totales $\omega_x = \omega_{Ax} + \omega_{Bx}$ et $\omega_y = \omega_{Ay} + \omega_{By}$. Placer l'origine de A en bas à gauche $(0,0)$ et celle de B en haut à droite $(\omega_x, \omega_y)$.
  2. **Exprimer les contraintes de faisabilité** : $x_B = \omega_x - x_A$ et $y_B = \omega_y - y_A$.
  3. **Calculer les Taux Marginaux de Substitution (TMS)** : Pour chaque agent, calculer $TMS = \frac{\partial U / \partial x}{\partial U / \partial y}$.
  4. **Égaliser les TMS (Cas différentiable)** : Poser $TMS_A(x_A, y_A) = TMS_B(x_B, y_B)$.
  5. **Substituer et isoler** : Remplacer $x_B$ et $y_B$ par les contraintes de faisabilité. Isoler $y_A$ en fonction de $x_A$ pour obtenir l'équation de la courbe des contrats $y_A = C(x_A)$.
* **Erreurs classiques à éviter** : Oublier de faire le changement de variable $x_B = \omega_x - x_A$ lors de l'égalisation des TMS, aboutissant à une équation insoluble à 4 inconnues.
* **Variantes fréquentes** : 
  * *Fonctions Leontief $\min(\alpha x, y)$* : L'égalité des TMS est impossible. Les optima se situent là où les "coudes" des courbes d'indifférence se superposent ou s'alignent (résolution graphique et algébrique en posant l'égalité des arguments du min).
  * *Biens parfaits substituts (linéaire)* : Les TMS sont constants. La courbe des contrats longe les bords de la boîte selon que $TMS_A > TMS_B$ ou l'inverse.
* **Chapitres concernés** : 6. Échange, 7. Optimum de Pareto.
* **Exercices précis** : TD6 (Ex 1 à 5) ; Annales Mi-parcours 2020 (Ex 1) ; Annales Mi-parcours 2022 (Ex 2).

---

### Méthode 2 : Détermination de l'Équilibre Concurrentiel et Décentralisation
*Complémentaire à la Méthode 1, on introduit ici la monnaie (les prix) pour trouver à quel point exact de la courbe des contrats le marché va aboutir, ou comment atteindre un point spécifique.*

* **Nom de la situation** : Calcul de l'Équilibre Walrasien et application du Second Théorème du Bien-Être.
* **Signaux de reconnaissance** : "Les agents peuvent échanger à des prix $p_x, p_y$", "Normaliser le prix", "Quelles allocations peut-on décentraliser ?".
* **Étapes générales de résolution** :
  1. **Normalisation (Loi de Walras)** : Poser $p_x = 1$ et $p_y = p$. Le comportement ne dépend que du prix relatif.
  2. **Calcul des revenus** : Évaluer la richesse initiale de chaque agent $R_i = 1 \cdot \omega_{ix} + p \cdot \omega_{iy}$.
  3. **Maximisation sous contrainte budgétaire** : Déterminer les fonctions de demande marshalliennes $x_i(p)$ et $y_i(p)$ en égalisant le TMS au rapport des prix ($TMS = 1/p$) avec saturation du budget.
  4. **Équilibre de marché** : Sommer les demandes pour un des deux biens (Loi de Walras : un suffit) et égaliser à l'offre totale : $x_A(p) + x_B(p) = \omega_x$. Résoudre pour trouver $p^*$.
  5. **Décentralisation (inverser le problème)** : Si l'on cible une allocation $(x_A^*, y_A^*)$, on déduit le prix d'équilibre via $p = 1/TMS_A(x_A^*, y_A^*)$, puis on ajuste la dotation initiale pour que la droite de budget passe par ce point.
* **Erreurs classiques à éviter** : Vouloir équilibrer les deux marchés simultanément : cela amène des calculs redondants et augmente le risque d'erreur (Loi de Walras).
* **Variantes fréquentes** : L'un des agents a une utilité de type Leontief, sa demande devient alors $x_i(p) = y_i(p) = R_i / (1+p)$.
* **Chapitres concernés** : 6. Échange, 7. Optimum de Pareto.
* **Exercices précis** : Annales Mi-parcours 2020 (Questions 4 à 8) ; Annales Mi-parcours 2022 (Questions 6 à 9).

---

### Méthode 3 : Maximisation en Oligopole de Cournot (Concurrence en Quantités)
*Méthode d'agrégation algébrique puissante pour résoudre un marché où $n$ firmes ont des coûts asymétriques et agissent sur les quantités.*

* **Nom de la situation** : Résolution d'un équilibre de Cournot-Nash asymétrique.
* **Signaux de reconnaissance** : "Concurrence en quantité", "$n$ firmes", "Coûts marginaux $c_i$ constants mais différents", Fonction de demande inverse $P(Q)$.
* **Étapes générales de résolution** :
  1. **Profit individuel** : Écrire $\Pi_i = (P(Q) - c_i)q_i$, où $Q = \sum q_j$.
  2. **CPO individuelle** : Dériver par rapport à $q_i$ pour obtenir $P(Q) + P'(Q)q_i = c_i$.
  3. **L'astuce de l'agrégation (Crucial)** : Ne surtout pas résoudre le système par substitution. Sommer les $n$ Conditions du Premier Ordre (CPO) : $n P(Q) + P'(Q)Q = \sum c_i$.
  4. **Résolution globale** : On pose $\bar{c} = \frac{\sum c_i}{n}$. L'équation devient $n P(Q) + P'(Q)Q = n\bar{c}$. Résoudre cette équation à une seule inconnue pour trouver la quantité totale agrégée $Q^*$.
  5. **Déduction individuelle** : Réinjecter $Q^*$ dans la CPO de l'étape 2 pour isoler $q_i^*$.
* **Erreurs classiques à éviter** : Chercher à calculer les fonctions de meilleure réponse $q_1(q_2, q_3...)$ : ingérable dès que $n > 2$.
* **Variantes fréquentes** : Calculer les bornes de viabilité. Une firme ne produit ($q_i > 0$) que si son coût marginal n'est pas trop éloigné de la moyenne des concurrents.
* **Chapitres concernés** : 4. Concurrence imparfaite.
* **Exercices précis** : TD4 (Ex 2).

---

### Méthode 4 : Équilibre en Oligopole de Bertrand (Concurrence en Prix)
*Cette méthode contraste formellement avec Cournot. Elle requiert souvent plus de raisonnement logique ou l'établissement de fonctions de meilleures réponses (Reaction Functions) face à des discontinuités.*

* **Nom de la situation** : Résolution d'un équilibre de Bertrand-Nash.
* **Signaux de reconnaissance** : "Concurrence en prix", "Biens homogènes", "Achat au prix le plus bas", "Biens de qualités différentes ($v_1 \neq v_2$)".
* **Étapes générales de résolution** :
  * **Cas 1 : Biens purs, asymétrie de coûts ($c_1 < c_2$)**. 
    * Raisonner par l'enchère descendante ou la sous-cotation.
    * La firme 1 gagne tout le marché en fixant $p_1 = c_2 - \epsilon$ (ou $p_1 = c_2$ selon les hypothèses d'équilibre limite).
  * **Cas 2 : Différenciation verticale (Qualité $v_i$)**.
    * Raisonner en "surplus offert au consommateur" : $w_i = v_i - c_i$.
    * La firme avec le plus grand $w$ (ex: firme 1) gagne.
    * Elle fixe un prix qui annule l'avantage maximal de la firme 2 : $v_1 - p_1 = v_2 - c_2$, soit $p_1 = v_1 - v_2 + c_2$.
  * **Cas 3 : Préférences hétérogènes (Demandes lissées)**.
    * Écrire la fonction de demande $D_1(p_1, p_2)$ basée sur la distribution des valuations.
    * Écrire les profits et dériver pour obtenir les fonctions de meilleure réponse $p_1^*(p_2)$ et $p_2^*(p_1)$.
    * Résoudre le système d'équations linéaires croisé pour trouver l'intersection.
* **Erreurs classiques à éviter** : Appliquer aveuglément le "Paradoxe de Bertrand" ($p=c, \Pi=0$) dès qu'il y a 2 firmes. Si $c_1 \neq c_2$ ou si les biens diffèrent, la firme dominante fait un profit strictement positif.
* **Variantes fréquentes** : Analyser les cas limites où la contrainte $p_i \ge c_i$ ou $p_i \le v_i$ devient saturée, ce qui "tord" la fonction de meilleure réponse.
* **Chapitres concernés** : 4. Concurrence imparfaite.
* **Exercices précis** : TD4 (Ex 1).

---

### Méthode 5 : Statique Comparative par Dérivation Implicite et Théorème de l'Enveloppe
*Méthode analytique de haut vol pour comprendre l'impact d'un paramètre externe (taxe, subvention, coût) sans avoir à recalculer totalement l'équilibre de A à Z.*

* **Nom de la situation** : Chocs de marché et Théorème de l'Enveloppe.
* **Signaux de reconnaissance** : "Comment varie $x^*$ avec $p$ ou $w$ ?", "Montrer que $p'(\tau) > 0$", "Taxe unitaire", "Ristourne à la pompe".
* **Étapes générales de résolution** :
  1. **Dérivation Implicite (pour la variation des endogènes)** : 
     * Partir de l'équation caractérisant l'optimum (ex: CPO $f'(x^*) = w/p$ ou équilibre $D(p(\tau) - \tau) = O(p(\tau))$).
     * Dériver toute l'équation par rapport au paramètre exogène (ex: $\tau$).
     * Factoriser et isoler la dérivée cherchée (ex: $p'(\tau)$).
     * Déduire le signe grâce aux hypothèses de concavité/décroissance connues.
  2. **Théorème de l'enveloppe (pour la variation de la fonction Valeur/Welfare)** :
     * Soit $M(w) = \max_x f(x) - wx$.
     * Inutile de dériver $x^*(w)$. La dérivée $\frac{\partial M}{\partial w}$ est simplement la dérivée partielle de l'objectif par rapport à $w$, évaluée en $x^*$. (Ex: $-x^*$).
* **Erreurs classiques à éviter** : Tenter d'isoler manuellement $p(\tau)$ avant de dériver. Parfois algébriquement impossible, la dérivation implicite de l'égalité est obligatoire.
* **Variantes fréquentes** : Maximisation du Welfare global du gouvernement $W(\tau) = \alpha S(\tau) + \Pi(\tau) - T(\tau)$. On dérive $W$ en fonction de la taxe pour trouver la taxe optimale $\tau^*$.
* **Chapitres concernés** : 1. Négociation (Outils mathématiques), 2. A-compétition, 3. V-compétition.
* **Exercices précis** : TD1 (Ex 1), TD2 (Ex 3), Annales MIP 2022 (QCM 3).

---

### Méthode 6 : Allocation optimale dans l'Incertain et l'Assurance
*Méthode spécifique à l'économie du risque, consistant à basculer de l'espace monétaire à l'espace des utilités (Espérance d'Utilité).*

* **Nom de la situation** : Modèle de l'Utilité Espérée (Expected Utility) et de l'Assurance.
* **Signaux de reconnaissance** : "Loterie", "Richesse initiale", "Aversion pour le risque", "Probabilité de sinistre", "Prime d'assurance".
* **Étapes générales de résolution** :
  1. **Indices de risque** : Calculer $IA = \frac{-u''(w)}{u'(w)}$ et $IR = w \times IA$.
  2. **Équivalent Certain et Prime de risque** : 
     * Calculer l'espérance mathématique du gain $E(X)$.
     * Calculer l'Espérance d'Utilité $EU = \sum p_i u(w_i)$.
     * Trouver l'Équivalent Certain ($EC$) en résolvant $u(EC) = EU$.
     * Prime de risque = $E(X) - EC$. Le prix maximal pour éviter le risque = Richesse - EC.
  3. **Optimisation de la couverture d'assurance** :
     * Définir la richesse dans chaque état de la nature (ex: Sans sinistre = $W - Prime(R)$ ; Avec sinistre = $W - Sinistre + R - Prime(R)$).
     * Écrire la fonction objectif : $\max_R EU(R)$.
     * Dériver par rapport au niveau de remboursement $R$.
     * Analyser le signe de la prime (si prime actuarielle pure, $R^* = Sinistre$ couverture totale).
* **Erreurs classiques à éviter** : Calculer $u(E(X))$ au lieu de $E(u(X))$. C'est la base de la définition de l'aversion au risque (Inégalité de Jensen).
* **Variantes fréquentes** : Étude du seuil $\alpha$ (surcoût de l'assureur) au-delà duquel l'agent préfère une couverture nulle.
* **Chapitres concernés** : Temps et Incertitude.
* **Exercices précis** : Annales MIP 2021 (Ex 2).

---

### Méthode 7 : Modélisation de la Demande par les Distributions de Probabilités
*Plutôt que de donner une fonction de demande $D(p)$ arbitraire, cette méthode génère la demande à partir des micro-fondements d'une population hétérogène.*

* **Nom de la situation** : Construction de la demande et calculs de Surplus avec rationnement.
* **Signaux de reconnaissance** : "Les consommateurs ont une utilité $v-p$", "$v$ est distribué selon une fonction de répartition $F(v)$ et une densité $f(v)$", "Welfare en fonction du prix".
* **Étapes générales de résolution** :
  1. **Déterminer la cible** : Un consommateur achète si $v \ge p$.
  2. **Agrégation (Loi forte)** : La demande pour une masse $M$ est $D(p) = M \times (1 - F(p))$.
  3. **Surplus par intégrale** : Le surplus des consommateurs se calcule par $\int_p^\infty D(w) dw$ ou $\int_p^{v_{max}} (v-p)f(v)dv$.
  4. **Gestion du Rationnement (Cas de déséquilibre)** : Si le prix $p$ imposé est sous l'équilibre, on calcule le rationnement efficace. L'intégrale de surplus devient $\int_{p(p)}^\infty D(w) dw + (p(p)-p)O(p)$ où $p(p)$ est le prix virtuel égalisant l'offre.
* **Erreurs classiques à éviter** : Confondre la borne d'intégration (qui est le prix de marché $p$) avec la valuation maximale. 
* **Variantes fréquentes** : Monopole face à deux populations. On calcule $D_1(p)$ et $D_2(p)$. La demande globale est la somme *horizontale* (définie par morceaux selon les kinks/coudes). Le monopole doit choisir entre un prix élevé ciblant seulement la population à haute valuation, ou un prix faible mass-market.
* **Chapitres concernés** : 2. A-compétition, 5. Préférences.
* **Exercices précis** : TD2 (Ex 1, Ex 2), TD3 (Ex 1, Ex 3), TD4 (Ex 3).