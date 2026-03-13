### Chapitre 3 : V-compétition

Ce chapitre est l'image miroir parfait du chapitre précédent. Il étudie les marchés où la concurrence se situe du côté des vendeurs ("V-compétition"). Il explore comment la rivalité entre les producteurs influence la formation des prix face à une acheteuse unique. Il passe d'abord par un modèle stratégique discret, puis par le modèle continu du monopsone, et formalise enfin le surplus des producteurs et l'évaluation du Bien-Être Social (Welfare) dans ce cadre.

---

#### Sous-partie 3.1 : Plus d'offre que de demande

**1. Idée centrale**
L'objectif est de démontrer comment l'introduction de la concurrence du côté des vendeurs modifie radicalement le rapport de force en faveur de l'acheteuse. Ce concept sert à prouver que l'acheteuse n'a pas besoin d'un talent de négociation particulier pour s'accaparer le surplus : la simple rivalité entre les vendeurs fait mécaniquement chuter les prix jusqu'à leur coût de production.

**2. Intuition / vulgarisation**
Imaginez que vous êtes le seul habitant d'un village à vouloir faire tondre sa pelouse, et que deux voisins équipés d'une tondeuse cherchent du travail. Vous n'avez pas besoin de négocier durement. Si l'un propose 20€, l'autre proposera 15€ pour obtenir le travail, et ainsi de suite. Comme dans une enchère inversée, le prix baissera tout seul jusqu'à ce que le voisin avec le coût de fonctionnement le plus élevé abandonne.

**3. Définition / résultat formel**
En présence d'une acheteuse (valuation $v$) et de deux vendeurs (coûts $c_1$ et $c_2$, avec $c_1 \le c_2$) :
*   **Cas symétrique ($c_1 = c_2 = c$)** : L'échange est efficace si $v \ge c$. Le prix s'établit exactement à $p = c$. L'acheteuse accapare 100% du surplus total.
*   **Cas asymétrique ($c_1 < c_2$)** : L'échange est efficace si $v \ge c_1$. Le prix est tiré vers le bas par la concurrence jusqu'à $c_2$. Il s'établit dans l'intervalle $p \in [c_1, \min(c_2, v)]$. L'accaparation du surplus par l'acheteuse est donc freinée par l'hétérogénéité des vendeurs (le vendeur le plus efficace garde une rente).

**4. Formules à connaître**
*   **Condition d'équilibre concurrentiel :** $D(p) = O(p)$. *L'intersection entre la demande unitaire et l'offre en escalier.*
*   **Prix en enchère asymétrique :** $p = c_2$ (en négligeant la sous-cotation $\epsilon$). *Le prix plafond correspond au coût d'opportunité du premier vendeur éliminé de la course.*

**5. Moyen mnémotechnique**
"La V-compétition fait chuter le prix jusqu'au coût du premier perdant" ($p \le c_2$). 

**6. Résumé ultra condensé**
Lorsqu'il y a plus d'offre que de demande, la concurrence entre les vendeurs fait baisser le prix, transférant la quasi-totalité du surplus vers l'acheteuse. Si les vendeurs sont identiques, l'acheteuse rafle tout. S'ils sont hétérogènes, le prix chute jusqu'au coût de production du deuxième vendeur le plus compétitif, laissant une rente d'efficacité au vendeur gagnant.

**7. Pièges classiques**
*   **Confondre le pouvoir de monopsone et la force de la concurrence :** Penser que l'acheteuse impose $p=c$ parce qu'elle a un "pouvoir de négociation". Non, même dans une enchère descendante où ce sont les vendeurs qui annoncent les prix, le prix chutera à $c$ par la seule force de leur rivalité.
*   **Croire au "Paradoxe de Bertrand" parfait en cas d'asymétrie :** Oublier que si $c_1 < c_2$, le vendeur 1 n'a pas besoin de baisser son prix jusqu'à $c_1$. Il s'arrête juste en dessous de $c_2$ et dégage un profit strict.

**8. Lien avec les exercices**
C'est le fondement de l'**Exercice 1 du TD 4 (Concurrence à la Bertrand avec asymétries)**. L'exercice formalise exactement cette situation avec des coûts marginaux différents ($c_1 < c_2$) et démontre que le vendeur le plus efficace remporte le marché au prix $c_2$, accaparant un surplus positif ($c_2 - c_1$).

**9. Méthode de résolution associée**
Pour analyser l'issue d'un marché en situation de V-compétition asymétrique :
1. Identifier la valuation de l'acheteuse ($v$).
2. Trier les coûts des vendeurs par ordre croissant ($c_1 < c_2 < ...$).
3. Vérifier la condition d'efficacité $v \ge c_1$.
4. Fixer le prix généré par la concurrence au niveau du premier vendeur exclu (ici $c_2$).

**10. Mini checklist d'examen**
*   [ ] Ai-je bien identifié le vendeur avec le coût le *plus faible* ($c_1$) comme étant le gagnant ?
*   [ ] Ai-je bien utilisé le coût du *second* vendeur ($c_2$) pour déterminer le prix d'arrêt ?

---

#### Sous-partie 3.2 : Modèle du monopsone

**1. Idée centrale**
Ce modèle décrit une acheteuse unique (un monopsone) face à un continuum de vendeurs hétérogènes. L'objectif est de montrer comment le monopsone, qui a le pouvoir de fixer un prix d'achat unique, arbitre entre "acheter bas à peu de producteurs" et "acheter plus cher à beaucoup de producteurs". Le sens profond est de démontrer que le pouvoir de marché côté demande conduit à une réduction des prix d'achat et des quantités échangées.

**2. Intuition / vulgarisation**
Imaginez un grand supermarché qui est le seul à acheter les cerises des agriculteurs d'une région. S'il propose d'acheter les cerises à 10€ le kilo, tous les agriculteurs vendront. S'il propose 2€ le kilo, seuls ceux qui ont des coûts extrêmement bas survivront. Le supermarché cherche le prix optimal : baisser le prix lui fait économiser de l'argent sur chaque kilo acheté, mais cela décourage certains agriculteurs. Il s'arrête de baisser le prix quand l'économie réalisée compense tout juste la perte liée aux kilos non achetés.

**3. Définition / résultat formel**
Soit un continuum de vendeurs de masse $N$ dont les coûts $c$ suivent une fonction de répartition $G(c)$ et une densité $g(c)$. 
L'acheteuse maximise son utilité $U(p) = (v-p) \times N G(p)$.
Sous l'hypothèse de croissance du taux de hasard $\frac{g(p)}{G(p)}$, le prix optimal de monopsone $p^m$ est caractérisé par la Condition du Premier Ordre (CPO).

**4. Formules à connaître**
*   **Offre continue :** $O(p) = N \times G(p)$. *Masse des vendeurs dont le coût $c$ est inférieur ou égal au prix proposé.*
*   **Maximisation (CPO) :** $p = v - \frac{G(p)}{g(p)}$. *Le prix de monopsone est inférieur à la valuation de l'acheteuse, amputé d'une "marge".*
*   **Indice de Lerner au monopsone :** $\frac{v - p}{p} = \frac{1}{\varepsilon_O}$ avec l'élasticité de l'offre $\varepsilon_O = \frac{O'(p)p}{O(p)}$. *La capacité à faire baisser le prix est inversement proportionnelle à la sensibilité des producteurs au prix.*

**5. Moyen mnémotechnique**
"Le Monopsone Solde la valuation". Le prix est tiré vers le bas : $p = v - \text{Marge}$. (C'est l'inverse parfait du monopole où $p = c + \text{Marge}$).

**6. Résumé ultra condensé**
Le monopsone, isolé de la concurrence côté demande, fixe un prix d'achat $p^m < v$ pour maximiser son profit. Ce prix s'obtient en équilibrant le gain marginal lié à la baisse du prix et la perte marginale liée à la réduction des volumes. Son pouvoir dépend de l'élasticité de l'offre : si les vendeurs sont très réactifs au prix, le monopsone ne peut pas imposer une forte démarque.

**7. Pièges classiques**
*   **Écrire l'offre avec $1-G(p)$ :** Contrairement à la demande ($1-F(p)$ car on achète si $v>p$), l'offre est simplement $G(p)$ car un vendeur vend si son coût est *inférieur* au prix ($c \le p$).
*   **Oublier les solutions en coin :** Si la valuation $v$ est très élevée par rapport à la distribution des coûts, le monopsone peut avoir intérêt à acheter à *tous* les producteurs en fixant un prix $p^m = c_{max}$. Il ne restreint alors pas sa demande.

**8. Lien avec les exercices**
Bien que moins fréquent en exercice pur que le monopole, ce modèle est l'ossature pour comprendre les politiques de fixation des salaires (voir question de compréhension "Monopsone et salaire minimum"). Il se résout exactement comme le TD 3 (Monopole), mais en inversant la logique des fonctions de répartition.

**9. Méthode de résolution associée**
Pour trouver le prix de monopsone :
1. Construire la fonction d'offre $O(p)$ à partir de la fonction de répartition $G(p)$.
2. Poser la fonction de profit/utilité de l'acheteur $U(p) = (v-p)O(p)$.
3. Dériver par rapport au prix : $U'(p)$.
4. Égaliser à zéro (CPO) et isoler $p$ pour trouver le candidat $p^m$.
5. Vérifier que $p^m < v$ et qu'il appartient au domaine des coûts possibles.

**10. Mini checklist d'examen**
*   [ ] Mon offre est-elle bien basée sur $G(p)$ et non sur $1-G(p)$ ?
*   [ ] Ai-je bien soustrait $p$ de $v$ dans l'objectif de maximisation $(v-p)$ ?
*   [ ] Mon prix final $p^m$ est-il bien strictement inférieur à $v$ ?

---

#### Sous-partie 3.3 : Surplus (profits) des producteurs

**1. Idée centrale**
L'objectif est de quantifier monétairement les gains nets (profits agrégés) que l'ensemble des vendeurs retirent d'un marché pour un prix donné. Cela sert de pendant parfait au surplus des consommateurs et permet de mesurer l'impact d'un changement de prix sur le bien-être des producteurs. Le concept repose sur le fait que tout vendeur ayant un coût inférieur au prix du marché dégage une rente (une "marge").

**2. Intuition / vulgarisation**
Si vous êtes prêt à travailler (votre coût d'opportunité) pour 10€ de l'heure, et que le marché paie 15€, vous dégagez une "rente" de 5€. Le surplus des producteurs, c'est simplement l'addition des rentes de tous les vendeurs actifs sur le marché. Plus le prix monte, plus ce surplus global s'élargit.

**3. Définition / résultat formel**
Pour une fonction d'offre $O(p)$ générée par une population hétérogène de vendeurs, le surplus agrégé des producteurs $S_p(p)$ (ou $\Pi(p)$) est l'intégrale des différences $(p-c)$ pour tous les types $c \le p$.
Selon le théorème de Dupuit, cela correspond à l'aire située entre la courbe d'offre et la ligne horizontale du prix de marché.

**4. Formules à connaître**
*   **Surplus par intégrale :** $S_p(p) = \int_0^p O(c) dc$. *C'est l'intégrale de la fonction d'offre depuis 0 (ou le coût minimum) jusqu'au prix de marché $p$.*
*   **Théorème de l'enveloppe sur le profit :** $S_p'(p) = O(p)$. *La variation du surplus des vendeurs induite par une hausse infinitésimale du prix est exactement égale au volume de la quantité offerte.*

**5. Moyen mnémotechnique**
"L'aire sous le prix, à gauche de l'offre". Dérivée du profit = l'Offre ($S_p' = O$).

**6. Résumé ultra condensé**
Le surplus (ou profit global) des producteurs mesure le bien-être du côté des vendeurs. Il se calcule visuellement comme la zone située au-dessus de la courbe d'offre et en dessous du prix. Analytiquement, il est la primitive de la fonction d'offre. Logiquement, sa dérivée est strictement positive : une hausse du prix augmente directement le bien-être proportionnellement à la quantité vendue.

**7. Pièges classiques**
*   **Confondre avec le calcul du consommateur :** Intégrer de $p$ à $+\infty$. Pour les vendeurs, on intègre depuis l'origine $0$ jusqu'au prix d'achat $p$.
*   **Rationnement du côté de l'offre :** Si l'acheteuse rationne les quantités (le prix est trop élevé par rapport à la demande), la formule intégrale simple est fausse car tous les producteurs avec $c < p$ ne parviennent pas forcément à vendre ! (Ce piège est symétrique à celui du TD 2 Ex 2).

**8. Lien avec les exercices**
C'est un élément fondamental pour le **TD 2 (Welfare, Taxes, Ristournes)**. Dans l'Exercice 2 et l'Exercice 3, on demande systématiquement de formuler le profit des entreprises (surplus des producteurs) $\Pi(p) = \int_0^{p(p)} O(w)dw$ pour évaluer l'impact des politiques publiques ou du rationnement.

**9. Méthode de résolution associée**
Pour calculer le surplus des producteurs :
*   *Cas linéaire ($O(p) = \alpha p$) :* Faire un dessin. Calculer l'aire du triangle dont la base est la quantité $O(p)$ et la hauteur est $(p - c_{min})$.
*   *Cas général :* Poser l'intégrale $\int_0^p O(x) dx$ et chercher la primitive de la fonction d'offre.

**10. Mini checklist d'examen**
*   [ ] Mes bornes d'intégration sont-elles bien de $0$ (ou $c_{min}$) jusqu'à $p$ ?
*   [ ] Ai-je bien vérifié qu'il n'y a pas de rationnement de l'offre avant d'appliquer la formule directe ?

---

#### Sous-partie 3.4 : Welfare

**1. Idée centrale**
Le Welfare (Surplus Total) évalue l'efficacité globale du marché. Son but est de sommer les gains de l'acheteuse (monopsone) et les profits des producteurs. Il sert à démontrer que la tarification imposée par un monopsone est socialement inefficace car la restriction des quantités détruit des échanges qui auraient été mutuellement profitables (création d'une perte sèche).

**2. Intuition / vulgarisation**
Le Welfare, c'est la taille globale du gâteau. En situation concurrentielle, le gâteau est maximal. Le monopsone, pour obtenir une plus grosse part du gâteau (acheter moins cher), va délibérément en réduire la taille globale en décourageant des producteurs efficaces de produire. La part de gâteau qui s'évapore est la "perte sèche".

**3. Définition / résultat formel**
Le Welfare s'écrit $W(p) = S_p(p) + U_A(p) = \int_0^p O(c) dc + (v-p)O(p)$.
Il atteint son maximum global à l'équilibre concurrentiel, c'est-à-dire lorsque le prix imposé égale la valuation : $p = v$.
Le fait que le monopsone choisisse un prix $p^m < v$ engendre généralement une quantité échangée trop faible $q^m < q^c$, créant un **Dead-weight loss** (Perte sèche) valant $W(v) - W(p^m)$.

**4. Formules à connaître**
*   **Welfare :** $W(p) = S_p(p) + U_A(p)$
*   **Dérivée du Welfare :** $W'(p) = (v-p)O'(p)$. *(Obtenu en sommant $S_p' = O$ et $U_A' = -O + (v-p)O'$).*
*   **Condition de perte sèche :** $DWL > 0 \iff q^m < q^c$.

**5. Moyen mnémotechnique**
"Le sommet de la montagne du Welfare s'atteint quand le prix égale la valuation ($v-p = 0$)". L'écart des volumes génère le triangle d'inefficacité.

**6. Résumé ultra condensé**
L'efficacité d'un marché (Welfare) est maximale quand le prix reflète la valeur réelle du bien ($p=v$). En fixant un prix artificiellement bas, le monopsone restreint l'offre. Cette baisse des volumes détruit de la valeur pour la société, matérialisée par la perte sèche (Dead-weight loss), car des producteurs ayant un coût inférieur à $v$ (mais supérieur à $p^m$) sont exclus du marché.

**7. Pièges classiques**
*   **Perte sèche automatique ?** Non. Comme au chapitre 2, si le monopsone choisit un prix (même très bas) mais qui est suffisant pour que *tous* les producteurs vendent (solution en coin $p^m = c_{max}$), alors $q^m = q^c$. Dans ce cas spécifique, le monopsone rackette les vendeurs, mais ne détruit aucune efficacité. La perte sèche est nulle !

**8. Lien avec les exercices**
Sert de miroir direct aux questions d'analyse du Welfare du **TD 2 (Welfare en fonction du prix)**. Le raisonnement est identique pour prouver que le Welfare global culmine à l'équilibre concurrentiel $p^*$, en montrant que la dérivée du Welfare s'annule exactement à ce point. 

**9. Méthode de résolution associée**
Pour démontrer l'inefficacité d'un monopsone :
1. Calculer le $p^c = v$ concurrentiel et l'offre associée $q^c$.
2. Résoudre le problème du monopsone pour trouver $p^m$ et $q^m$.
3. Comparer : si $q^m < q^c$, justifier qu'il y a inefficacité et perte sèche.
4. Calculer la DWL (souvent l'aire d'un triangle) : $\frac{(v - p^m) \times (q^c - q^m)}{2}$ dans un cadre linéaire.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien vérifié que la dérivée de mon Welfare s'annule pour $p=v$ (et non $p=c$) ?
*   [ ] Ma quantité d'équilibre de monopsone ($q^m$) est-elle bien strictement inférieure à ma quantité concurrentielle ($q^c$) avant de déclarer l'existence d'une perte sèche ?