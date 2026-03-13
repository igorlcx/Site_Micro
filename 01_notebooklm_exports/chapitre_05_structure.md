### Chapitre 5 : Préférences

Ce chapitre introduit le socle de la théorie du consommateur. Avant même de parler de budget ou de prix, il est indispensable de comprendre comment un agent économique classe et évalue les différentes options (paniers de biens) qui s'offrent à lui. 

---

#### Sous-partie 5.1 : Choisir (Le cœur de la microéconomie)

**1. Idée centrale**
L'objectif est de formaliser la capacité d'un consommateur à comparer et classer différents "paniers de biens" de manière cohérente, sans faire appel à la monnaie. Le sens logique profond est de s'affranchir de l'utilité cardinale (mesurable) pour asseoir toute la théorie microéconomique sur l'utilité ordinale (le simple classement).

**2. Intuition / vulgarisation**
Avant de savoir ce que vous pouvez acheter, vous devez savoir ce que vous aimez. Imaginez qu'on vous propose deux caddies de supermarché remplis différemment. Vous n'avez pas besoin de donner une "note sur 10" à chaque caddie pour faire un choix : il vous suffit de dire "je préfère le caddie A au caddie B" ou "les deux me satisfont autant". La microéconomie part de cette capacité basique de classement pour construire tout le reste.

**3. Définition / résultat formel**
Un panier de biens est un vecteur $\mathbf{x} = (x_1, ..., x_L) \in \mathbf{X} \subset \mathbb{R}^L_+$.
La consommatrice est dotée d'une **relation d'ordre $\succeq$** ("est préféré ou indifférent à") qui satisfait les axiomes suivants :
*   **Complète** : Pour tout $\mathbf{x}, \mathbf{y}$, on a $\mathbf{x} \succeq \mathbf{y}$ ou $\mathbf{y} \succeq \mathbf{x}$.
*   **Réflexive** : Pour tout $\mathbf{x}$, $\mathbf{x} \succeq \mathbf{x}$.
*   **Transitive** : Si $\mathbf{x} \succeq \mathbf{y}$ et $\mathbf{y} \succeq \mathbf{z}$, alors $\mathbf{x} \succeq \mathbf{z}$.
*   **Monotone (stricte)** : Si un panier contient au moins autant de chaque bien et strictement plus d'un bien, il est strictement préféré.
La **courbe d'indifférence** de niveau $\mathbf{x_0}$ est l'ensemble des paniers $\mathbf{x}$ tels que le consommateur y est indifférent : $C_{x_0} = \{\mathbf{x} \in \mathbf{X} | \mathbf{x} \sim \mathbf{x_0}\}$. Une hypothèse clé supplémentaire est la **convexité** des préférences (le goût pour la diversité) : toute combinaison linéaire de deux paniers indifférents est préférée ou indifférente à ces paniers.

**4. Formules à connaître**
*   **Relation d'équivalence (indifférence)** : $\mathbf{x} \sim \mathbf{y} \iff \mathbf{x} \succeq \mathbf{y}$ et $\mathbf{y} \succeq \mathbf{x}$.
*   **Relation stricte** : $\mathbf{x} \succ \mathbf{y} \iff \mathbf{x} \succeq \mathbf{y}$ et non $(\mathbf{y} \succeq \mathbf{x})$.
*   **Convexité** : Si $\mathbf{x} \succeq \mathbf{z}$ et $\mathbf{y} \succeq \mathbf{z}$, alors $\lambda\mathbf{x} + (1-\lambda)\mathbf{y} \succeq \mathbf{z}$ pour $\lambda \in$.

**5. Moyen mnémotechnique**
Pour se souvenir des propriétés d'une relation d'ordre rationnelle : le sigle **CRTM** (Complète, Réflexive, Transitive, Monotone). 
Pour les courbes d'indifférence : "Elles descendent (Monotonie) et elles sourient (Convexité)".

**6. Résumé ultra condensé**
Le consommateur fait des choix basés sur une relation de préférence ordinale, complète et transitive. Ces préférences sont représentées géométriquement par des courbes d'indifférence décroissantes (car les biens sont désirables) et ne se coupant jamais. La convexité des préférences traduit le fait que "les mélanges sont préférés aux extrêmes".

**7. Pièges classiques**
*   **Faire se croiser deux courbes d'indifférence** : C'est mathématiquement impossible car cela violerait l'axiome de transitivité et de monotonie.
*   **Oublier l'axiome de monotonie** : Si une courbe "remonte", cela signifierait que pour compenser la perte d'un bien, il faut *enlever* de l'autre bien, ce qui implique qu'un des biens est un "mal" (pollution, déchets).

**8. Lien avec les exercices**
L'**Exercice 5.1 du TD 5 (Préférences lexicographiques)** illustre la limite de cette modélisation : il explore des préférences qui ne satisfont pas l'axiome de continuité (acheter toujours plus de bien 1 avant de regarder le bien 2), empêchant ainsi la représentation par une courbe classique.

**9. Méthode de résolution associée**
Pour démontrer des propriétés sur les préférences :
1.  Tracer un repère $(x_1, x_2)$.
2.  Placer les points comparés et tracer le segment qui les relie pour étudier la convexité.
3.  Pour prouver que les courbes ne se coupent pas : raisonner par l'absurde en utilisant un point d'intersection et l'axiome de transitivité.

**10. Mini checklist d’examen**
*   [ ] Ai-je bien vérifié que plus loin de l'origine = utilité plus élevée (monotonie) ?
*   [ ] Ai-je bien tracé des courbes convexes (tournant le dos à l'origine) pour montrer le goût de la diversité ?

---

#### Sous-partie 5.2 : Fonctions d'utilité

**1. Idée centrale**
L'objectif est de remplacer la relation d'ordre géométrique (les courbes) par une fonction mathématique continue $U(x)$. Cela sert à rendre les problèmes de choix du consommateur solubles à l'aide d'outils d'optimisation classiques (dérivées, lagrangiens). Le sens profond est que cette fonction est purement *ordinale* : sa valeur absolue n'a aucun sens, seul le fait qu'elle soit plus ou moins élevée importe.

**2. Intuition / vulgarisation**
Pensez à l'utilité comme à un classement de championnat. Arriver 1er est mieux qu'arriver 2ème, qui est mieux que 3ème. Si l'on change les points attribués (par exemple 100 points pour le 1er au lieu de 10 points, 50 au lieu de 5 pour le 2ème), l'ordre du podium reste exactement le même. Une fonction d'utilité fait exactement cela : elle attribue une "note" à un panier, mais toute modification mathématique qui conserve le classement (transformation croissante) décrit la même personne.

**3. Définition / résultat formel**
Si la relation d'ordre $\succeq$ est complète, réflexive, transitive, monotone et *continue*, il existe une fonction continue $U(.)$ qui représente $\succeq$.
C'est-à-dire : $\mathbf{x} \succeq \mathbf{y} \iff U(\mathbf{x}) \ge U(\mathbf{y})$.
**Absence d'unicité** : Toute fonction $V(\mathbf{x}) = f(U(\mathbf{x}))$ avec $f(.)$ strictement croissante représente exactement les mêmes préférences.
La convexité des préférences implique la quasi-concavité de la fonction $U(.)$.

**4. Formules à connaître (Les grandes familles de fonctions)**
*   **Substituts parfaits (Linéaire)** : $U(\mathbf{x}) = \sum \alpha_\ell x_\ell$. Biens perçus comme identiques à un facteur d'échelle près.
*   **Compléments parfaits (Leontief)** : $U(\mathbf{x}) = \min_\ell \{\alpha_\ell x_\ell\}$. Biens consommés dans des proportions fixes strictes (ex: chaussures gauche/droite).
*   **Cobb-Douglas** : $U(\mathbf{x}) = \prod x_\ell^{\alpha_\ell}$. Le consommateur veut toujours un peu de tous les biens, jamais 0.
*   **CES (Constant Elasticity of Substitution)** : $U(\mathbf{x}) = (\sum \alpha_\ell x_\ell^\rho)^{1/\rho}$. Famille générale englobant les autres selon la valeur de $\rho$.

**5. Moyen mnémotechnique**
"Linéaire = Parallèles, Leontief = Angle Droit (L), Cobb-Douglas = Courbes douces".
Règle de la transformation : "Le log ou l'exponentielle ne changent pas la personne".

**6. Résumé ultra condensé**
La fonction d'utilité traduit les préférences en une équation mathématique ordinale. Ce qui importe est l'ordre des valeurs, pas leur ampleur. Les quatre fonctions canoniques (Leontief, Linéaire, Cobb-Douglas, CES) modélisent différentes intensités de substituabilité entre les biens. Appliquer une fonction logarithme ou exponentielle à une utilité ne change pas le comportement de l'agent économique.

**7. Pièges classiques**
*   **Additionner les utilités cardinales** : Croire que si $U_A(x) = 100$ et $U_B(x) = 2$, alors l'agent A est "50 fois plus heureux" que B. C'est faux, on ne peut pas comparer cardinalement ni interpersonnellement.
*   **Tenter de dériver une Leontief** : La fonction $\min()$ n'est pas dérivable au "coude" (l'angle droit). Utiliser un Lagrangien sur une Leontief mène droit dans le mur.

**8. Lien avec les exercices**
Absolument tout le **TD 5 (Ex 1)** repose sur l'identification et la manipulation de ces fonctions (tracer les courbes, voir les effets de transformation). Dans le TD 6 sur l'échange, utiliser la transformation logarithmique d'une Cobb-Douglas ($U = x_1^{\alpha_1} x_2^{\alpha_2} \rightarrow \ln(U) = \alpha_1 \ln(x_1) + \alpha_2 \ln(x_2)$) simplifie massivement les calculs de dérivées. 

**9. Méthode de résolution associée**
Pour prouver que deux fonctions $U(x)$ et $V(x)$ représentent les mêmes préférences (ex: TD 5 Ex 1) :
1. Trouver la fonction $f$ telle que $V(x) = f(U(x))$. (Souvent $f = \ln$, $f = \exp$, ou $f = ()^2$).
2. Prouver que $f$ est strictement croissante en calculant sa dérivée ($f' > 0$).

**10. Mini checklist d’examen**
*   [ ] Ai-je bien reconnu la forme fonctionnelle (Cobb-Douglas, Leontief, Linéaire) avant de me lancer dans les calculs ?
*   [ ] Ai-je pensé à passer la Cobb-Douglas au logarithme pour éviter un enfer calculatoire avec les puissances ?

---

#### Sous-partie 5.3 : Taux Marginal de Substitution (TMS)

**1. Idée centrale**
L'objectif du TMS est de mesurer l'intensité de la volonté d'échange d'un consommateur. Il sert à quantifier techniquement la substituabilité locale entre deux biens. Le sens logique profond est d'établir le "taux de change psychologique" de la consommatrice (combien de bien 2 elle exige pour lâcher une unité de bien 1) indépendamment des prix du marché.

**2. Intuition / vulgarisation**
Imaginez que vous avez 10 cafés et 1 part de gâteau. Si je vous demande un café, vous me le donnerez contre presque rien, car vous en avez plein. Mais si vous n'avez plus que 1 café et 10 gâteaux, vous exigerez peut-être 3 gâteaux en échange de ce dernier café. Le TMS, c'est exactement cette valeur : il varie selon votre stock actuel et reflète la pente de votre courbe d'indifférence à cet instant précis.

**3. Définition / résultat formel**
Le Taux Marginal de Substitution du bien $\ell$ par le bien $k$ au point $\mathbf{x}$, noté $TMS_{\ell/k}$, est la valeur absolue de la pente de la courbe d'indifférence en ce point.
Le long d'une courbe d'indifférence $U(x_1, x_2) = U_0$, on a via le théorème des fonctions implicites :
$dU = \frac{\partial U}{\partial x_1} dx_1 + \frac{\partial U}{\partial x_2} dx_2 = 0$.

**4. Formules à connaître**
*   **Formule générale du TMS** : $TMS_{\ell/k} = \frac{\partial U / \partial x_\ell}{\partial U / \partial x_k}$.
*   **TMS d'une Cobb-Douglas $U = x_1^{\alpha_1} x_2^{\alpha_2}$** : $TMS_{1/2} = \frac{\alpha_1}{\alpha_2} \times \frac{x_2}{x_1}$.
*   **Équation de substitution** : $dx_2 = - TMS_{1/2} dx_1$.

**5. Moyen mnémotechnique**
"Le TMS 1 par rapport à 2, c'est l'utilité marginale du 1 SUR l'utilité marginale du 2" ($\frac{U'_1}{U'_2}$). Attention, sur un graphique $(x_1, x_2)$, la pente est $-TMS_{1/2}$.

**6. Résumé ultra condensé**
Le TMS est le ratio des utilités marginales. Il indique la quantité de bien 2 nécessaire pour compenser la perte d'une unité de bien 1 infinitésimale. Il est indépendant de la fonction d'utilité choisie pour représenter les préférences. Pour des préférences convexes, le TMS est décroissant le long de la courbe d'indifférence.

**7. Pièges classiques**
*   **Inverser le ratio** : Écrire $TMS_{1/2} = \frac{\partial U / \partial x_2}{\partial U / \partial x_1}$. Grosse erreur de notation. C'est toujours la dérivée du bien en abscisse sur la dérivée du bien en ordonnée.
*   **Calculer le TMS d'une Leontief** : Une fonction $\min()$ n'étant pas différentiable au coude, le TMS n'y est pas défini. Ne surtout pas essayer d'y appliquer des dérivées partielles.
*   **Croire qu'une transformation croissante modifie le TMS** : Si on prend $V(x) = \ln(U(x))$, le TMS de $V$ est strictement égal au TMS de $U$. C'est un invariant analytique.

**8. Lien avec les exercices**
Le calcul du TMS est l'outil principal de la caractérisation des optima de Pareto dans la Boîte d'Edgeworth (Chapitre 6 / Chapitre 7). Par exemple, dans le **TD 6 (Échange)**, l'égalité des $TMS_A = TMS_B$ est la méthode algébrique systématique utilisée pour trouver l'équation de la Courbe des Contrats pour les Cobb-Douglas et les CES. 

**9. Méthode de résolution associée**
Procédure mécanique pour calculer le TMS :
1. Calculer la dérivée partielle par rapport à $x_1$ : $\frac{\partial U}{\partial x_1}$.
2. Calculer la dérivée partielle par rapport à $x_2$ : $\frac{\partial U}{\partial x_2}$.
3. Écrire le ratio des deux.
4. Simplifier au maximum la fraction (les puissances s'annulent souvent proprement dans les Cobb-Douglas) pour l'exprimer en fonction de $\frac{x_2}{x_1}$.

**10. Mini checklist d’examen**
*   [ ] Ai-je bien mis $\frac{\partial U}{\partial x_1}$ au numérateur et non au dénominateur ?
*   [ ] Mon TMS est-il bien une valeur positive (la valeur absolue de la pente) ?
*   [ ] Si la fonction est Leontief, ai-je bien renoncé à calculer le TMS par des dérivées pour faire un raisonnement graphique ?