### Chapitre 4 : Concurrence imparfaite

Ce chapitre fait la transition entre le modèle du monopole isolé et la concurrence parfaite. Il analyse les marchés oligopolistiques où un petit nombre d'entreprises rivalisent. Dans ce cadre, chaque firme a conscience que ses décisions influencent le marché et celles de ses concurrentes (interactions stratégiques). Le choix de la variable d'action — les quantités (Cournot) ou les prix (Bertrand) — modifie radicalement l'issue de cette concurrence.

---

#### Sous-partie 4.1 : Choix de prix ou de quantités

**1. Idée centrale**
L'objectif est de montrer que la manière de modéliser l'action d'une entreprise (choisir le prix auquel elle vend ou choisir la quantité qu'elle produit) est neutre pour un monopole, mais devient déterminante dès qu'il y a des concurrents. Cela sert à introduire les deux grands paradigmes de la concurrence imparfaite et à poser les bases du calcul de maximisation en quantités (avec la fonction inverse de demande).

**2. Intuition / vulgarisation**
Si vous êtes le seul vendeur de glaces sur une plage (monopole), afficher un prix de 3€ fixe automatiquement le nombre de glaces que vous vendrez. Inversement, décider de préparer exactement 100 glaces dicte le prix auquel vous devrez les vendre pour tout écouler. Mais si vous avez un concurrent, choisir de fabriquer 100 glaces laisse le prix final dépendre de ce que l'autre va produire. Fixer ou produire, le choix change les règles du jeu.

**3. Définition / résultat formel**
Le profit d'un monopole s'écrit de manière équivalente en prix : $\Pi(p) = (p-c)D(p)$, ou en quantité : $\Pi(q) = (P(q)-c)q$, où $P(q) = D^{-1}(q)$ est la fonction inverse de demande. 
La maximisation en quantité s'obtient en égalisant le Revenu Marginal (MR) au Coût Marginal (c). 
En revanche, en duopole, l'écriture du profit en quantités $\Pi_i(q_1, q_2) = (P(q_1+q_2)-c_i)q_i$ suppose un prix de marché unique, ce qui diffère fondamentalement de l'approche en prix où chaque firme fixe son propre prix.

**4. Formules à connaître**
*   **Revenu Marginal :** $MR(q) = P(q) + qP'(q)$. *C'est la recette supplémentaire liée à la vente d'une unité de plus (prix $P(q)$), diminuée de la perte de revenus sur toutes les unités précédentes due à la baisse du prix ($qP'(q)$).*
*   **Condition du Premier Ordre (CPO) du monopole en quantité :** $MR(q) = c$. 

**5. Moyen mnémotechnique**
"Monopole : Prix ou Quantité, c'est la même monnaie. Duopole : Prix ou Quantité, les règles sont changées."

**6. Résumé ultra condensé**
Le monopole peut maximiser son profit indistinctement en choisissant son prix ou sa quantité. En quantité, l'optimum est atteint lorsque le revenu marginal égalise le coût marginal. En situation d'oligopole, en revanche, l'écriture du profit dépend fondamentalement du choix de la variable stratégique (prix vs quantités), conduisant à deux modèles distincts : Cournot et Bertrand.

**7. Pièges classiques**
*   **Confondre Demande et Demande inverse :** En maximisant par rapport aux quantités, il faut impérativement utiliser $P(q)$ (qui est le prix en fonction de la quantité) et non $D(p)$.
*   **Oublier le terme de dépréciation dans le revenu marginal :** Le revenu marginal n'est pas égal au prix. Parce que la demande est décroissante ($P'(q)<0$), le revenu marginal est toujours strictement inférieur au prix : $P(q) + qP'(q) < P(q)$.

**8. Lien avec les exercices**
Cette introduction est le préalable conceptuel à l'**Exercice 2 du TD 4**, où l'on manipule une famille de fonctions inverses de demande $P(q;\alpha)$ pour ensuite modéliser la concurrence en quantités. Le monopole sert de "point de repère" ($n=1$) pour évaluer l'impact de la concurrence.

**9. Méthode de résolution associée**
Pour maximiser un profit en quantité :
1. Prendre la fonction de demande $q = D(p)$ et l'inverser pour isoler $p$ : $p = P(q)$.
2. Écrire le revenu $R(q) = P(q) \times q$ et le dériver pour obtenir le $MR(q)$.
3. Égaliser $MR(q)$ au coût marginal $c$ pour trouver la quantité optimale $q^*$.
4. Réinjecter $q^*$ dans $P(q)$ pour trouver le prix d'équilibre $p^*$.

**10. Mini checklist d’examen**
*   [ ] Ai-je bien inversé la fonction de demande avant de multiplier par $q$ ?
*   [ ] Ai-je bien appliqué la règle de dérivation du produit $(uv)' = u'v + uv'$ pour trouver mon revenu marginal ?

---

#### Sous-partie 4.2 : Concurrence à la Cournot

**1. Idée centrale**
Le modèle d'Antoine Augustin Cournot illustre la concurrence par les quantités entre $n$ entreprises produisant un bien homogène. Il sert à démontrer que l'oligopole constitue un état intermédiaire entre le monopole et la concurrence parfaite : la présence de concurrents pousse le prix à la baisse, mais l'interaction stratégique fait que le prix reste supérieur au coût marginal. Le sens logique profond est qu'une entreprise "s'adapte" à la production des autres (meilleure réponse) pour fixer son propre volume.

**2. Intuition / vulgarisation**
Imaginez des agriculteurs décidant du nombre de tonnes de tomates à récolter. Ils prennent cette décision avant d'arriver au marché. Une fois sur le marché, le prix s'ajuste automatiquement selon l'abondance totale de tomates. Plus les autres en produisent, plus le prix va s'effondrer. Chaque agriculteur doit donc deviner ce que les autres vont produire pour calibrer sa récolte sans détruire le prix du marché.

**3. Définition / résultat formel**
Dans un jeu de Cournot-Nash à $n$ entreprises avec des coûts marginaux constants $c_i$, la firme $i$ choisit $q_i$ pour maximiser $\Pi_i = (P(Q) - c_i)q_i$, où $Q = \sum q_j$.
La quantité totale d'équilibre $Q^C$ est déterminée par la somme des $n$ conditions du premier ordre. L'équilibre possède trois caractéristiques : $Q^C$ ne dépend que de la moyenne des coûts $\bar{c}$ ; l'équilibre est sous-optimal (quantité globale trop faible) ; l'allocation de la production est inefficace car les firmes les moins rentables produisent encore au lieu de laisser les plus rentables tout faire.

**4. Formules à connaître**
*   **CPO individuelle :** $P(Q) + P'(Q)q_i = c_i$.
*   **Équation d'agrégation (à savoir refaire) :** $nP(Q) + P'(Q)Q = n\bar{c}$ (avec $\bar{c} = \frac{\sum c_i}{n}$). *Permet de trouver la quantité totale $Q^C$.*
*   **Quantité individuelle :** $q_i^C = \frac{Q^C}{n} + \frac{\bar{c} - c_i}{-P'(Q^C)}$. *La production est la moyenne, corrigée par l'avantage de coût de la firme.*
*   **Profit d'équilibre :** $\Pi_i^C = -P'(Q^C)(q_i^C)^2$. *Le profit est proportionnel au carré de la part de marché ou de la quantité.*
*   **Welfare :** $W^C = \int_0^{Q^C} (P(x) - c)dx + \frac{n\text{Var}(c)}{-P'(Q^C)}$. *Le bien-être dépend d'une composante moyenne et d'un bonus dû à l'hétérogénéité des firmes (la variance des coûts).*

**5. Moyen mnémotechnique**
La "Méthode de la Somme" : À Cournot, on ne résout pas, on Somme les CPO ! Et "Celui qui a le Coût le plus Court, produit la part la plus Courte... pardon, la plus grande" (Effet d'hétérogénéité : si $c_i < \bar{c}$, alors $q_i$ est plus grand que la moyenne).

**6. Résumé ultra condensé**
Dans le modèle de Cournot, les firmes choisissent des quantités. Pour trouver l'équilibre avec $n$ firmes hétérogènes, il faut sommer les Conditions du Premier Ordre individuelles. La production totale dépend du coût marginal moyen. À l'équilibre, le prix est supérieur au coût concurrentiel, mais il s'en rapproche lorsque $n$ tend vers l'infini. Une firme produit d'autant plus, et fait d'autant plus de profit, que son coût marginal est faible par rapport à celui de ses concurrents.

**7. Pièges classiques**
*   **Substituer les fonctions de meilleure réponse :** Essayer d'exprimer $q_1$ en fonction de $q_2$, puis $q_2$ en fonction de $q_3$, etc. C'est le mur algébrique assuré dès que $n>2$. Il faut *additionner* les équations.
*   **Ignorer la viabilité des firmes :** Les formules s'appliquent si et seulement si toutes les entreprises produisent une quantité positive ($q_i > 0$). Si une firme a un coût $c_i$ beaucoup trop élevé par rapport aux autres, la formule lui donnera un $q_i$ négatif. Il faut alors l'exclure du marché et refaire les calculs avec $n-1$.

**8. Lien avec les exercices**
Méthode cœur de l'**Exercice 2 du TD 4**. Il applique la démarche d'agrégation de Cournot sur une famille générique de fonctions de demande $P(Q;\alpha)$. Les questions demandent explicitement d'écrire la CPO, de déduire la quantité totale $Q^*$, puis la quantité individuelle, et enfin d'étudier la statique comparative lorsque $n \to \infty$ (convergence vers la concurrence parfaite).

**9. Méthode de résolution associée**
Pour résoudre un équilibre de Cournot à $n$ firmes asymétriques :
1. Poser $Q = \sum q_j$.
2. Écrire le profit de la firme $i$ : $\Pi_i = (P(Q) - c_i)q_i$.
3. Dériver par rapport à $q_i$ pour obtenir la CPO : $P(Q) + P'(Q)q_i = c_i$.
4. Additionner les $n$ CPO : $nP(Q) + P'(Q)Q = \sum c_i = n\bar{c}$.
5. Résoudre cette équation à une seule inconnue pour trouver $Q^C$.
6. Réinjecter $Q^C$ dans la CPO de l'étape 3 pour isoler $q_i^C$ individuellement.

**10. Mini checklist d’examen**
*   [ ] Ai-je bien sommé les $n$ CPO pour trouver l'équation en $Q$ global ?
*   [ ] Mes $q_i$ individuels sont-ils tous positifs avec les coûts marginaux donnés dans l'énoncé ?
*   [ ] La somme de mes $q_i^*$ retombe-t-elle bien sur mon $Q^*$ global ?

---

#### Sous-partie 4.3 : Concurrence à la Bertrand

**1. Idée centrale**
La concurrence de Bertrand modélise un marché où la variable stratégique choisie par les firmes est le prix, les consommateurs achetant systématiquement au moins cher. L'objectif est de démontrer une rupture radicale (le "paradoxe de Bertrand") : l'introduction d'un seul concurrent suffit à faire basculer le marché du monopole à la tarification parfaitement concurrentielle, détruisant toutes les rentes si les produits sont homogènes et les coûts symétriques.

**2. Intuition / vulgarisation**
Imaginez deux stations-service identiques l'une en face de l'autre. Si l'une affiche 1,50€/L et l'autre 1,51€/L, tous les conducteurs iront chez la première. Pour récupérer les clients, la seconde va baisser à 1,49€, et ainsi de suite. La guerre des prix ne s'arrête que lorsqu'aucune ne peut plus baisser son prix sans vendre à perte (donc quand le prix égale le coût).

**3. Définition / résultat formel**
En duopole avec des biens homogènes et des coûts constants et symétriques ($c_1 = c_2 = c$), l'unique équilibre de Nash en prix est $p_1 = p_2 = c$ (tarification au coût marginal). Les profits sont nuls.
En présence de coûts asymétriques ($c_1 < c_2$), la firme 1, plus efficace, remporte tout le marché en fixant un prix $p_1 = c_2$ (ou marginalement en dessous $c_2 - \epsilon$). Son profit est alors strictement positif et vaut $(c_2 - c_1)D(c_2)$.

**4. Formules à connaître**
*   **Fonction de demande discontinue (biens homogènes) :** $D_i(p_i, p_j) = D(p_i)$ si $p_i < p_j$ ; $D(p_i)/2$ si $p_i = p_j$ ; $0$ si $p_i > p_j$.
*   **Prix d'équilibre asymétrique :** $p_1 = c_2$ (ou $c_2 - \epsilon$). *Le prix plafond est dicté par le concurrent le plus féroce éliminé.*
*   **Surplus du consommateur (cas asymétrique $w_1 > w_2$) :** $S = w_2 = v_2 - c_2$.

**5. Moyen mnémotechnique**
"L'enchère descendante de Bertrand : Le premier perdant (le moins efficace) dicte le prix final du gagnant". 

**6. Résumé ultra condensé**
Dans le modèle de Bertrand, la rivalité en prix est destructrice pour les profits. Avec des coûts symétriques et des produits identiques, le prix chute au coût marginal (Paradoxe de Bertrand). Cependant, ce paradoxe est fragile : si les entreprises ont des coûts asymétriques ou si elles différencient leurs produits (qualité, image), elles restaurent un pouvoir de marché et génèrent des profits strictement positifs.

**7. Pièges classiques**
*   **Appliquer le "profit nul" aveuglément :** Le paradoxe de Bertrand requiert des biens *identiques* ET des coûts *identiques*. Si une firme a un coût plus faible ($c_1 < c_2$), elle fait un profit positif ($p=c_2$, donc $\Pi = c_2-c_1 > 0$).
*   **Chercher des dérivées avec des biens homogènes :** La demande $D_i(p_i, p_j)$ est une fonction en escalier (discontinue). On ne peut pas résoudre ce jeu par des CPO classiques de dérivées nulles, on résout par la logique (sous-cotation marginale).

**8. Lien avec les exercices**
Traitement intensif dans le **TD 4, Exercice 1**. L'exercice force à dépasser le paradoxe de Bertrand en introduisant d'abord l'asymétrie de coûts ($c_1 < c_2$), puis la différenciation par la qualité (surplus $w_i = v_i - c_i$), et enfin l'hétérogénéité des consommateurs qui "lisse" la demande et permet de trouver l'équilibre en croisant des fonctions de meilleure réponse continues $p_1^*(p_2)$ et $p_2^*(p_1)$.

**9. Méthode de résolution associée**
*   *Cas des biens homogènes / Qualités asymétriques :* Raisonner sans dérivation. Calculer le surplus net maximal que chaque firme peut offrir : $w_1 = v_1 - c_1$ et $w_2 = v_2 - c_2$. La firme avec le plus grand $w$ (ex: firme 1) rafle le marché. Le prix est fixé pour que le surplus laissé aux consommateurs égale exactement la meilleure offre de la firme perdante : $v_1 - p_1 = w_2$, soit $p_1 = v_1 - w_2$.
*   *Cas de la demande lissée (différenciation des consommateurs) :* Construire les fonctions de demande $D_1(p_1, p_2)$ et $D_2(p_1, p_2)$. Écrire les profits. Dériver $\Pi_i$ par rapport à $p_i$ pour obtenir les fonctions de meilleure réponse. Résoudre le système croisé pour trouver le point d'intersection.

**10. Mini checklist d’examen**
*   [ ] Ai-je bien vérifié si les coûts étaient symétriques avant d'écrire $p_1 = p_2 = c$ ?
*   [ ] Dans un cas de différenciation par la qualité, la firme qui l'emporte est-elle bien celle qui a le plus grand "surplus social potentiel" ($v-c$) et non pas juste la plus haute qualité $v$ ?
*   [ ] Dans un jeu avec fonctions de meilleure réponse, ai-je vérifié que mon prix d'équilibre n'était pas inférieur au coût marginal (contrainte de participation) ?