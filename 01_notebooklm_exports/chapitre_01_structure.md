### Chapitre 1 : Négociation

Ce chapitre explore les situations d'échange bilatéral où un acheteur et un vendeur interagissent de manière isolée pour échanger un bien. L'enjeu est de comprendre sous quelles conditions l'échange a lieu, et comment les gains liés à cet échange sont répartis.

---

#### Sous-partie 1.1 : Échange d'un bien

**1. Idée centrale**
L'objectif est de modéliser la situation d'échange la plus élémentaire : un acheteur potentiel (Anne) et un vendeur (Vincent) négocient l'échange d'une unité indivisible d'un bien contre de la monnaie. Cela sert à introduire les concepts fondamentaux de surplus individuel, de bien-être social (Welfare) et d'efficacité de l'échange. Le sens logique profond est de démontrer que l'existence d'un échange dépend uniquement de l'efficacité (la valeur dépasse le coût), tandis que le prix ne sert qu'à répartir le gâteau.

**2. Intuition / vulgarisation**
Si j'accorde une valeur de 100€ à un vélo et que cela te coûte 40€ de t'en séparer, nous avons tout intérêt à faire affaire. N'importe quel prix entre 40€ et 100€ nous rendra tous les deux plus heureux que si nous ne faisions rien. L'échange crée de la valeur, le prix décide simplement qui en profite le plus.

**3. Définition / résultat formel**
En information complète (les valuations $v$ et coûts $c$ sont connus de tous), l'échange a lieu si et seulement s'il est **efficace**, c'est-à-dire si et seulement si $v \ge c$. Le prix $p \in [c, v]$ est a priori indéterminé par ce simple modèle. 

**4. Formules à connaître**
*   **Surplus de l'acheteur ($U_A$) :** $U_A = v - p$ (si échange), 0 sinon. *Différence entre disposition à payer et prix payé.*
*   **Profit du vendeur ($U_V$) :** $U_V = p - c$ (si échange), 0 sinon. *Différence entre prix reçu et coût d'opportunité.*
*   **Surplus Total / Welfare ($W$) :** $W = U_A + U_V = v - c$. *Mesure du gain global généré par l'échange dans l'économie.*

**5. Moyen mnémotechnique**
La règle du **V-P-C** : Pour qu'il y ait échange, il faut que la **V**aleur soit supérieure au **P**rix, lui-même supérieur au **C**oût ($v \ge p \ge c$).

**6. Résumé ultra condensé**
Un échange volontaire d'un bien contre de la monnaie est créateur de valeur si $v \ge c$. Le prix $p$ n'influence pas la taille du surplus total ($v-c$), il ne fait que définir le partage de ce surplus entre l'acheteur et le vendeur, illustrant la différence entre efficacité (taille du gâteau) et équité (part des parts).

**7. Pièges classiques**
*   **Confusion entre prix et coût :** Penser que le vendeur perd $p$ ; il perd $c$ (son coût d'opportunité) et gagne $p$.
*   **Confusion efficacité / équité :** Penser qu'un prix de $p = v$ est "inefficace". Il est parfaitement efficace (l'échange a lieu), mais il est très inéquitable (l'acheteur a un surplus nul).

**8. Lien avec les exercices**
Cette sous-partie est conceptuelle et sert de fondation théorique pour la modélisation des utilités quasi-linéaires. Elle est le point de départ de l'exercice 2 du TD 1 sur la Négociation de Nash (Bargaining), où la question est de déterminer mathématiquement ce fameux prix indéterminé.

**9. Méthode de résolution associée**
Pour évaluer un échange :
1. Identifier la valuation de l'acheteur ($v$) et le coût du vendeur ($c$).
2. Vérifier la condition d'efficacité : $v \ge c$.
3. Déduire l'intervalle des prix possibles : $[c, v]$.
4. Calculer le Welfare ($v - c$) pour prouver la création de valeur.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien vérifié que $v \ge c$ avant de valider l'échange ?
*   [ ] Le prix proposé est-il bien compris dans l'intervalle $[c, v]$ ?
*   [ ] La somme des surplus de l'acheteur et du vendeur retombe-t-elle bien sur $v-c$ ?

---

#### Sous-partie 1.2 : Offre et demande concurrentielles

**1. Idée centrale**
L'objectif est d'utiliser les outils classiques de l'offre et de la demande, mais appliqués à un marché composé d'un seul acheteur et d'un seul vendeur. Cela sert à montrer que même dans ce cadre hyper-réduit, le modèle de l'équilibre concurrentiel prédit correctement que l'échange aura lieu (intersection des courbes). 

**2. Intuition / vulgarisation**
Si on demande à l'acheteur "combien tu en veux à ce prix ?" et au vendeur "combien tu en vends à ce prix ?", on peut tracer deux droites (en forme d'escalier). L'endroit où elles se croisent nous donne l'équilibre du marché, sans même que les deux agents n'aient eu à discuter directement.

**3. Définition / résultat formel**
Pour un prix $p$ donné (considéré comme exogène par les agents) :
*   L'**offre concurrentielle** $O(p)$ vaut $1$ si $p \ge c$, et $0$ sinon.
*   La **demande concurrentielle** $D(p)$ vaut $1$ si $p \le v$, et $0$ sinon.
L'équilibre concurrentiel se situe à l'intersection de ces deux courbes, soit pour la quantité $q=1$ et n'importe quel prix $p \in [c, v]$.

**4. Formules à connaître**
*   **Condition d'équilibre :** $O(p) = D(p)$. *Le prix s'ajuste pour que la quantité offerte égale la quantité demandée.*

**5. Moyen mnémotechnique**
"La demande descend (du plafond $v$), l'offre monte (du plancher $c$)". Le croisement forme un segment vertical représentant tous les prix possibles.

**6. Résumé ultra condensé**
Les courbes d'offre et de demande concurrentielles pour un agent unique sont des fonctions "en escalier" (valant 0 ou 1). Leur intersection confirme que l'échange s'opère de manière efficace ($q=1$), mais maintient l'indétermination du prix dans l'intervalle $[c, v]$.

**7. Pièges classiques**
*   **Tracer des droites diagonales :** Avec un seul bien indivisible et un seul agent de chaque côté, la demande et l'offre ne sont pas continues ni strictement décroissantes/croissantes, ce sont des fonctions constantes par morceaux (0 ou 1).

**8. Lien avec les exercices**
Cette logique d'intersection est la matrice de toute la suite du cours (A-compétition et V-compétition) et prépare aux analyses d'équilibres avec demande continue vus dans le TD 2 (Surplus et Ristournes).

**9. Méthode de résolution associée**
Si on demande de tracer l'équilibre :
1. Placer le prix en ordonnée et la quantité (0 ou 1) en abscisse.
2. Tracer la demande : trait horizontal à la hauteur $v$ jusqu'à $q=1$, puis plonge à 0.
3. Tracer l'offre : trait horizontal à la hauteur $c$ à partir de $q=1$.
4. Hachurer le segment vertical entre $c$ et $v$ pour $q=1$ : c'est l'ensemble des équilibres possibles.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien mis le Prix en ordonnée (axe des y) et la Quantité en abscisse (axe des x) comme l'exige la tradition ?
*   [ ] Mes courbes sont-elles bien des paliers (0 ou 1) ?

---

#### Sous-partie 1.3 : Ultimatum Game

**1. Idée centrale**
Ce concept étudie ce qui se passe si l'un des agents détient le pouvoir absolu de faire une offre "à prendre ou à laisser". Il sert à introduire les concepts de la théorie des jeux (Équilibre de Nash, Équilibre parfait en sous-jeux) et à montrer comment la rationalité pure influence le partage du surplus.

**2. Intuition / vulgarisation**
J'ai 100€. Je te propose de t'en donner 1€. Si tu dis oui, tu as 1€ et moi 99€. Si tu dis non, on a tous les deux 0€. Tu pourrais être vexé et dire non par fierté, mais un agent purement "rationnel" préférera toujours 1€ à 0€. Donc, sachant cela, je ne te proposerai jamais plus de 1€.

**3. Définition / résultat formel**
Dans le Jeu de l'Ultimatum pour un surplus de 100 :
*   Le Joueur 1 fait une offre $x \in \{0,...,100\}$ pour lui-même (et $100-x$ pour le Joueur 2).
*   Il existe un **unique équilibre de Nash parfait en sous-jeux** : $x^* = 100$ (le joueur 1 garde tout, le joueur 2 accepte tout gain $\ge 0$).
*   Il existe une **multiplicité d'équilibres de Nash** basés sur des menaces non-crédibles (ex: J2 menace de refuser tout ce qui lui donne moins de 50).

**4. Formules à connaître**
*   **Paiement si acceptation :** $(x, 100-x)$.
*   **Paiement si rejet :** $(0, 0)$ (Statu quo).

**5. Moyen mnémotechnique**
"L'Ultimatum donne tout à l'offreur". Celui qui parle en premier rafle la mise (s'il face à un agent rationnel).

**6. Résumé ultra condensé**
Le jeu de l'ultimatum modélise une négociation extrême. La résolution par anticipation (rationalité parfaite) prédit que le joueur 1 accapare l'intégralité du surplus. Cependant, il existe de nombreux équilibres de Nash si le joueur 2 formule des menaces (bien que non crédibles).

**7. Pièges classiques**
*   **Ignorer les menaces non-crédibles :** Penser qu'il n'y a qu'un seul équilibre de Nash. Non, il y a une infinité d'équilibres de Nash, mais un seul est *parfait en sous-jeux* (celui qui élimine les menaces absurdes).
*   **Oublier la réalité empirique :** Confondre la prédiction mathématique ($x^* = 100$) avec le comportement humain réel (les offres $\ge 70$ pour le J1 sont souvent rejetées en laboratoire).

**8. Lien avec les exercices**
Ce concept prépare mentalement au modèle de monopole (Chapitre 2), où le vendeur aura la capacité de fixer un prix unique "à prendre ou à laisser", s'accaparant ainsi une large part du surplus s'il connaît les valuations.

**9. Méthode de résolution associée**
Pour résoudre ce type de jeu séquentiel :
1. Commencer par la fin du jeu (backward induction) : que fait J2 face à une offre $x$ ? Il accepte si $100-x \ge 0$.
2. Remonter à J1 : sachant que J2 accepte tout $x \le 100$, J1 maximise son profit en choisissant $x=100$.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien distingué l'équilibre *parfait en sous-jeux* des *équilibres de Nash* ordinaires ?
*   [ ] Ai-je identifié correctement la menace non-crédible ?

---

#### Sous-partie 1.4 : Modèle de négociation de Nash

**1. Idée centrale**
L'objectif est de proposer une résolution axiomatique et mathématique pour déterminer *exactement* où le prix va se fixer dans l'intervalle $[c, v]$. Ce modèle sert à formaliser comment le pouvoir de négociation ($\alpha$) et les "options de sortie" (statu quo / point de désaccord) de chaque agent influencent le partage final du gâteau. 

**2. Intuition / vulgarisation**
Au lieu de se battre à l'aveugle, Anne et Bernard font deux choses : 1) ils se mettent d'accord pour créer le plus grand gâteau possible (efficacité). 2) Ils coupent ce gâteau en fonction du "pouvoir" de chacun ($\alpha$) et de ce que chacun aurait eu si la négociation avait échoué (leur filet de sécurité). 

**3. Définition / résultat formel**
Le problème de "Bargaining" de Nash est défini par un ensemble de choix $X$, un point de désaccord $d = (d_1, d_2)$ et des préférences. La solution s'obtient en maximisant le produit des gains nets d'utilité pondérés par le pouvoir de marché $\alpha \in$ du joueur 1 :
$$ \max_{x \in X} (u_1(x) - d_1)^\alpha (u_2(x) - d_2)^{1-\alpha} $$

**4. Formules à connaître**
*   **Programme de Nash (avec utilité et transfert $t$) :** $\max_{x, t} (u(x) - t - u_0)^\alpha (v(x) + t - v_0)^{1-\alpha}$.
*   **Règle de séparation (Maximiser le gâteau puis partager) :** 
    1. Trouver $x^*$ qui maximise le gâteau total $W = u(x) + v(x)$.
    2. Utilité finale Anne : $U_A = u_0 + \alpha(W - W_0)$.
    3. Utilité finale Bernard : $U_B = v_0 + (1-\alpha)(W - W_0)$.
    *(Avec $W_0 = u_0 + v_0$ la somme des utilités de statu quo).*

**5. Moyen mnémotechnique**
"On grossit le gâteau ensemble, on partage l'excédent selon $\alpha$."

**6. Résumé ultra condensé**
Le modèle de Nash résout l'indétermination du prix. Par la maximisation d'un objectif conjoint (le produit des surplus nets), il prouve que la négociation conduit toujours à maximiser le surplus total (efficacité). Le transfert monétaire permet ensuite de distribuer cette richesse additionnelle selon le pouvoir de négociation de chacun et leurs utilités de réserve.

**7. Pièges classiques**
*   **Oublier le Statu Quo :** Calculer le partage sur la valeur totale $W$ au lieu de le faire sur la *valeur nette* générée par l'accord ($W - W_0$).
*   **S'empêtrer dans les dérivées :** Essayer de dériver la fonction avec les puissances $\alpha$ et $1-\alpha$ directement. C'est un enfer algébrique. Il faut utiliser une transformation logarithmique.

**8. Lien avec les exercices**
C'est le cœur de l'**Exercice 2 du TD 1 (Nash bargaining avec transfert et Hold-up)**. L'exercice démontre la mécanique de séparation (optimisation conjointe de la quantité $x$, puis calcul du transfert $t$). Il applique ensuite cela au problème de "Hold-up" où un agent doit investir *avant* la négociation, causant un sous-investissement car le coût n'est pas partagé.

**9. Méthode de résolution associée**
Pour résoudre un programme de Nash avec transfert (cf. Correction TD1 Ex2) :
1. **Passer au Logarithme :** Poser $\phi(t) = \ln(f(t)) = \alpha \ln(u - t - u_0) + (1-\alpha)\ln(v + t - v_0)$.
2. **Trouver le transfert :** Dériver $\phi(t)$ par rapport à $t$, égaliser à 0 pour isoler $t^*$ en fonction de $x$.
3. **Trouver la variable économique :** Réinjecter $t^*$ dans l'objectif, montrer que cela revient simplement à $\max_x (u(x) + v(x))$. Dériver pour trouver $x^*$.
4. **Calculer les gains finaux :** Utiliser les formules directes de partage des utilités avec $\alpha$.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien pris le logarithme de la fonction objectif avant de dériver par rapport à $t$ ?
*   [ ] Ai-je bien soustrait les utilités de désaccord ($d_1, d_2$ ou $u_0, v_0$) dans les parenthèses initiales ?
*   [ ] Dans le cas d'un problème de "Hold-up" (investissement ex-ante par un joueur), ai-je bien identifié que le joueur ne récupère qu'une fraction de la valeur marginale de son investissement lors de la négociation ?