### Chapitre 7 : Optimum de Pareto

Ce chapitre est l'aboutissement de la théorie de l'échange. Après avoir compris comment deux individus troquent dans une boîte d'Edgeworth, nous généralisons l'analyse à toute une économie (plusieurs agents, plusieurs biens) pour définir formellement ce qu'est une allocation "efficace". Le héros de ce chapitre est Vilfredo Pareto.

---

#### Sous-partie 7.1 : Économie d'échange générale

**1. Idée centrale**
L'objectif est de poser le cadre mathématique général d'une économie d'échange pur, en passant de 2 agents/2 biens à $I$ consommateurs et $L$ biens. Cela sert à définir rigoureusement ce qu'est une "allocation" et, surtout, ce qu'est une "allocation réalisable". Le sens logique est de borner le champ des possibles : on ne peut pas distribuer plus de ressources que ce qui existe dans l'économie.

**2. Intuition / vulgarisation**
Imaginez un grand banquet. Il y a un certain nombre total de parts de pizza, de verres de jus, etc. (les dotations initiales). Une "allocation", c'est simplement le fait de dire "qui a quoi dans son assiette" à un instant donné. Une allocation est dite "réalisable" si la somme de toutes les parts de pizza dans les assiettes ne dépasse pas le nombre total de parts de pizza disponibles dans la cuisine. C'est la règle anti-magie : on ne crée rien, on ne fait que répartir.

**3. Définition / résultat formel**
Soit une économie avec $L$ biens et $I$ consommateurs.
La dotation totale est le vecteur $\mathbf{\omega} = (\omega_1, ..., \omega_L) \in \mathbb{R}^L_+$.
Une **allocation** est une matrice $\mathbf{x} = (\mathbf{x}_1, ..., \mathbf{x}_I)$ représentant les paniers de biens de chaque consommateur.
Une **allocation réalisable** est une allocation telle que, pour chaque bien $\ell$, la somme des consommations n'excède pas la ressource totale : $\sum_{i=1}^I x_{i\ell} \le \omega_\ell$. En l'absence de gaspillage, c'est une égalité.

**4. Formules à connaître**
*   **Contrainte de faisabilité** : $\forall \ell \in \{1, ..., L\}, \sum_{i=1}^I x_{i\ell} = \omega_\ell$ (en supposant que les biens sont désirables et donc totalement consommés).

**5. Moyen mnémotechnique**
"Rien ne se perd, tout se répartit". Une allocation n'est réalisable que si la somme des parts (les $x$) égale le gâteau total ($\omega$).

**6. Résumé ultra condensé**
Dans une économie d'échange générale, on décrit l'état du système par une allocation (la liste des paniers de tous les agents). Pour que cette allocation ait un sens physique, elle doit être réalisable : la quantité consommée de chaque bien par l'ensemble des agents doit être inférieure ou égale à la dotation totale de l'économie.

**7. Pièges classiques**
*   **Oublier de vérifier la faisabilité :** Proposer ou analyser une solution d'échange où la somme des biens finaux dépasse la dotation initiale. C'est une erreur fatale.
*   **Confondre le panier individuel et l'allocation globale :** $\mathbf{x}_i$ est un vecteur (ce que mange l'individu $i$), tandis que $\mathbf{x}$ est une matrice (le plan de table complet).

**8. Lien avec les exercices**
Toutes les annales d'équilibre général commencent par cette contrainte. Dans l'**Annale MIP 2020 Ex 1** ou **MIP 2022 Ex 2**, il faut systématiquement écrire $x_A + x_B = \omega_x$ pour relier les consommations des deux agents et construire la boîte d'Edgeworth.

**9. Méthode de résolution associée**
Pour vérifier si une allocation est réalisable :
1. Calculer la dotation totale initiale pour le bien 1 : $\omega_1 = \omega_{A1} + \omega_{B1} + ...$
2. Additionner les quantités du bien 1 proposées dans la nouvelle allocation : $X_1 = x_{A1} + x_{B1} + ...$
3. Vérifier que $X_1 \le \omega_1$. Répéter pour tous les biens.

**10. Mini checklist d’examen**
*   [ ] Ai-je bien vérifié que la somme des biens consommés par tous les agents correspond exactement à la dotation totale de l'énoncé ?

---

#### Sous-partie 7.2 : Optimum (ou efficacité) au sens de Pareto

**1. Idée centrale**
L'objectif est de définir un critère d'efficacité économique absolu qui se passe de jugement moral sur les inégalités. Il sert à identifier les situations où "le gâteau ne peut plus être agrandi ni mieux découpé" sans faire de perdant. Le sens profond est qu'un optimum de Pareto est une situation où toutes les opportunités d'échanges mutuellement avantageux ont été épuisées.

**2. Intuition / vulgarisation**
Une situation est optimale au sens de Pareto si la seule façon de rendre quelqu'un plus heureux est de rendre quelqu'un d'autre plus triste. Si vous pouvez encore échanger une pomme contre une banane et que les deux personnes sont plus contentes (ou l'une plus contente et l'autre indifférente), c'est que vous n'étiez pas à l'optimum : vous gâchiez du potentiel de bonheur !

**3. Définition / résultat formel**
Une allocation réalisable $\mathbf{x}$ est **optimale au sens de Pareto** s'il n'existe pas d'autre allocation réalisable $\mathbf{\tilde{x}}$ telle que :
*   $\forall i, U_i(\mathbf{\tilde{x}}_i) \ge U_i(\mathbf{x}_i)$ (Personne n'y perd)
*   et pour au moins un $j, U_j(\mathbf{\tilde{x}}_j) > U_j(\mathbf{x}_j)$ (Au moins un y gagne strictement).
*L'ensemble des optima de Pareto dans une économie à deux agents forme la Courbe des contrats.*

**4. Formules à connaître**
*Ce concept repose sur une définition logique (inégalités d'utilités) plutôt que sur une formule de calcul directe.*

**5. Moyen mnémotechnique**
"Pareto : pas d'amélioration gratuite." Si on veut monter l'utilité d'A, on est obligé de descendre celle de B.

**6. Résumé ultra condensé**
L'optimalité de Pareto est le juge de paix de l'efficacité en microéconomie. Une allocation est Pareto-optimale si on ne peut plus améliorer la situation d'un individu sans détériorer celle d'un autre. C'est un concept d'efficacité pure (absence de gaspillage) qui ne dit absolument rien sur l'équité de la répartition (une allocation où un agent possède tout est souvent Pareto-optimale).

**7. Pièges classiques**
*   **Confondre Pareto-optimal et Équitable :** L'allocation où le dictateur possède tout et les autres n'ont rien est Pareto-optimale ! (Car pour donner aux pauvres, il faudrait prendre au dictateur, ce qui baisse son utilité).
*   **Oublier la condition "réalisable" :** On ne compare une allocation qu'à d'autres allocations *réalisables* (on ne fait pas apparaître des biens magiquement pour rendre tout le monde heureux).

**8. Lien avec les exercices**
C'est la question incontournable des annales. Dans l'**Annale MIP 2022 (Q2, Q3, Q4)**, on demande de prouver si l'allocation donnant tout à B est Pareto-optimale. La réponse est "oui" car B a une utilité strictement monotone : si on prend un peu pour donner à A, B y perd strictement.

**9. Méthode de résolution associée**
Pour prouver qu'une allocation N'EST PAS Pareto-optimale :
1. Trouver un petit transfert d'un bien de A vers B, et d'un autre de B vers A.
2. Montrer que ce transfert augmente (ou maintient) l'utilité de A et de B.
Pour prouver qu'une allocation (aux bords) EST Pareto-optimale :
1. Montrer que la seule réallocation possible implique de prendre un bien à l'agent qui le valorise strictement.

**10. Mini checklist d’examen**
*   [ ] Ai-je bien compris que "Pareto-optimal" ne veut pas dire "juste" ou "au milieu" de la boîte ?
*   [ ] Si on me demande si une allocation est Pareto-optimale, ai-je bien vérifié les "coins" (solutions où l'un n'a rien) ?

---

#### Sous-partie 7.3 : Caractérisation

**1. Idée centrale**
Comment trouver ces fameux optima mathématiquement ? L'objectif est de transformer la définition philosophique de Pareto en un programme d'optimisation classique (Lagrangien) conduisant à l'égalité des Taux Marginaux de Substitution (TMS). Le sens logique profond est : pour être à la frontière de l'efficacité, il faut que l'échange s'arrête. Et l'échange s'arrête précisément quand tout le monde attribue la même valeur relative aux biens (quand les TMS s'égalisent).

**2. Intuition / vulgarisation**
Imaginez un jeu où l'arbitre fige le bonheur de Bob à un niveau précis (disons, "niveau 10 de satisfaction"). L'arbitre donne tout le reste des biens à Alice de la façon la plus intelligente possible pour maximiser le bonheur d'Alice. Le point trouvé est forcément un optimum de Pareto (on ne peut pas améliorer Alice sans que Bob ne chute sous les 10). À ce point précis, l'arbitre remarque que les "taux de change psychologiques" d'Alice et de Bob (leurs TMS) sont parfaitement identiques.

**3. Définition / résultat formel**
Pour caractériser analytiquement les optima de Pareto, on résout le programme sous contrainte suivant (pour un agent $i$) :
$\max_{\mathbf{x}} U_i(\mathbf{x}_i)$ sous contrainte $\forall j \neq i, U_j(\mathbf{x}_j) \ge U_j^0$ et $\mathbf{x}$ réalisable.
De manière équivalente, on peut maximiser la somme pondérée des utilités $\sum \mu_i U_i(\mathbf{x}_i)$ (avec $\mu_i \ge 0$).
Ces programmes aboutissent (pour des solutions intérieures avec fonctions différentiables) à la condition fondamentale d'optimalité parétienne : **l'égalité des TMS entre tout couple de biens pour tous les consommateurs**.

**4. Formules à connaître**
*   **Caractérisation différentiable** : $TMS_{i \ell/k} = TMS_{j \ell/k}$ pour tout agent $i, j$ et tout bien $\ell, k$.
*   **Somme pondérée (artifice mathématique)** : $\max_{\mathbf{x}} \sum_{i=1}^I \mu_i U_i(\mathbf{x}_i)$ sous contrainte de ressources.

**5. Moyen mnémotechnique**
"Mêmes TMS, plus de business." Quand les pentes des courbes d'indifférence sont égales (tangence), on est sur la courbe des contrats.

**6. Résumé ultra condensé**
Les optima de Pareto se caractérisent mathématiquement par l'égalité des Taux Marginaux de Substitution (TMS) de tous les agents. Cela peut se démontrer en posant un Lagrangien où l'on maximise l'utilité d'un agent sous la contrainte que les autres gardent une utilité fixe. Attention, la méthode de maximisation de la "somme pondérée" des utilités n'est qu'une astuce de calcul et n'a aucune signification sociale (les utilités ordinales ne s'additionnent pas).

**7. Pièges classiques**
*   **Sommer des utilités comme du Welfare :** Le concept de Pareto repose sur l'utilité ordinale. L'expression $\sum \mu_i U_i$ dans le Lagrangien n'est qu'une astuce mathématique. Elle ne signifie pas qu'on a le droit de dire "le bonheur social global est de 100".
*   **Forcer l'égalité des TMS partout :** Si les fonctions ne sont pas dérivables (ex: Leontief) ou si la solution est en coin (bords de la boîte d'Edgeworth), les TMS ne s'égalisent pas forcément.

**8. Lien avec les exercices**
C'est le cœur de la dérivation de l'équation analytique de la Courbe des Contrats, vu dans le **TD 6**. L'exemple du cours (Section 7.3) montre comment on utilise $\max \mu_1 \ln(xy) + \mu_2(\ln(x)+\ln(y))$ pour retrouver exactement la courbe des contrats (qui ici se révèle être $y_1 = \bar{y} \frac{x_1}{\bar{x}}$ en éliminant les $\mu$).

**9. Méthode de résolution associée**
Pour caractériser la courbe des optima de Pareto :
1. Calculer le TMS de chaque agent.
2. Poser $TMS_1 = TMS_2 = ... = TMS_I$.
3. Utiliser les contraintes de faisabilité $\sum x_{i\ell} = \omega_\ell$ pour substituer les variables et isoler l'équation reliant les biens d'un seul agent (l'équation de la courbe).

**10. Mini checklist d’examen**
*   [ ] Mes fonctions d'utilités sont-elles bien différentiables et strictement convexes avant que j'applique machinalement $TMS_1 = TMS_2$ ?
*   [ ] Ai-je bien pensé à intégrer les "poids" $\mu$ si j'utilise la technique de la somme pondérée, puis à les éliminer à la fin par substitution ?

---

#### Sous-partie 7.4 : Frontière

**1. Idée centrale**
L'objectif est de changer de perspective : au lieu de regarder les allocations dans l'espace physique des biens (la boîte d'Edgeworth), on les projette dans l'espace purement abstrait des utilités (le bonheur de A vs le bonheur de B). La "Frontière" de Pareto sert à visualiser l'arbitrage fondamental de l'économie : combien d'utilité on doit sacrifier chez B pour donner une unité d'utilité de plus à A.

**2. Intuition / vulgarisation**
Tracez un graphique avec le "Bonheur d'Agnès" en bas (axe des x) et le "Bonheur de Bruno" à gauche (axe des y). Si vous prenez toutes les répartitions de biens possibles dans le monde et que vous les placez sur ce graphique, vous obtiendrez une grosse tache. Le bord extérieur droit et supérieur de cette tache, c'est la Frontière de Pareto. C'est la limite absolue du bonheur qu'ils peuvent atteindre ensemble. Si vous êtes sur cette ligne, pour aller plus à droite (rendre Agnès plus heureuse), vous devez obligatoirement descendre (rendre Bruno moins heureux).

**3. Définition / résultat formel**
Soit $\mathcal{U}$ l'ensemble des valeurs possibles pour les utilités à partir d'allocations réalisables.
La **Frontière de Pareto** (PF) est l'ensemble des vecteurs d'utilité $\mathbf{u} \in \mathcal{U}$ tels qu'il n'existe aucun autre vecteur $\mathbf{u}' \in \mathcal{U}$ tel que $\forall i, u'_i \ge u_i$ et pour un $j, u'_j > u_j$.
C'est la projection mathématique de la courbe des contrats dans l'espace des utilités.

**4. Formules à connaître**
*   *Pas de formule générique*. La frontière s'obtient en prenant les équations de la courbe des contrats $(x_1^*(u), x_2^*(u))$ et en les injectant dans les fonctions d'utilité pour obtenir $U_B$ en fonction de $U_A$.
*   *Exemple du cours (Symétrique Cobb-Douglas)* : $U_2 = \left(-\sqrt{U_1} + \sqrt{\bar{x}\bar{y}}\right)^2$.

**5. Moyen mnémotechnique**
"La boîte d'Edgeworth parle en kilos de pommes, la Frontière de Pareto parle en points de bonheur."

**6. Résumé ultra condensé**
La Frontière de Pareto représente géométriquement les optima de Pareto dans l'espace des utilités des agents. Sur cette frontière, la courbe est toujours strictement décroissante, illustrant l'arbitrage inévitable entre le bien-être d'un agent et celui d'un autre lorsqu'on est à l'optimum. 

**7. Pièges classiques**
*   **Croire que la Frontière de Pareto est invariante :** Contrairement à la Courbe des contrats qui ne bouge pas si on applique une transformation croissante aux utilités (logarithme, carré), la Frontière de Pareto, elle, va changer de forme ! (Le cours le montre : si on prend la racine carrée des utilités, la courbe convexe se transforme en droite stricte $U_2 = \sqrt{\bar{x}\bar{y}} - U_1$). L'utilité étant ordinale, la forme exacte de cette frontière n'a pas d'interprétation cardinale absolue.

**8. Lien avec les exercices**
C'est l'objet de la question de compréhension de la fin du chapitre 7 et de l'**Exercice 7.2 du TD**, où l'on demande de déterminer la Frontière de Pareto dans le plan $(U, \Pi)$ pour l'acheteur et le vendeur canoniques (on trouve une droite de pente -1 représentant $U + \Pi = Welfare$).

**9. Méthode de résolution associée**
Pour trouver l'équation de la Frontière de Pareto :
1. Trouver la courbe des contrats dans la boîte (ex: $y_1 = f(x_1)$, $x_2 = \omega_1 - x_1$, $y_2 = \omega_2 - f(x_1)$).
2. Remplacer ces expressions dans les fonctions d'utilités $U_1(x_1, y_1)$ et $U_2(x_2, y_2)$.
3. Exprimer $x_1$ en fonction de $U_1$.
4. Injecter ce $x_1$ dans l'équation de $U_2$ pour obtenir $U_2$ uniquement en fonction de $U_1$ et des dotations initiales. 

**10. Mini checklist d’examen**
*   [ ] Mon graphique de frontière de Pareto a-t-il bien les Utilités ($U_1, U_2$) sur les axes et non les quantités physiques ?
*   [ ] La courbe obtenue est-elle bien décroissante (traduisant l'arbitrage fondamental) ?