### Chapitre 6 : Échange


Ce chapitre marque une étape cruciale : nous passons de l'étude d'un agent isolé à l'interaction entre deux agents (Agnès et Bruno) disposant de dotations initiales de deux biens (1 et 2). L'enjeu est de comprendre l'échange pur, sans production et sans monnaie (le troc), pour déterminer quelles sont les allocations efficaces.

---

#### Sous-partie 6.1 : Boîte d'Edgeworth

**1. Idée centrale**
L'objectif est de représenter graphiquement l'intégralité d'une économie d'échange pur (deux agents, deux biens) sur un seul schéma. Cet outil sert à visualiser simultanément les dotations initiales, les préférences des deux agents et les contraintes de rareté (la taille de l'économie). Son sens logique profond est de montrer comment des échanges volontaires peuvent améliorer la situation des deux parties jusqu'à épuiser toutes les opportunités de gains mutuels.

**2. Intuition / vulgarisation**
Imaginez une table avec un nombre fixe de pommes et de bananes. Agnès est assise d'un côté de la table, Bruno de l'autre. Au lieu de dessiner un graphique pour Agnès et un autre pour Bruno, on prend le graphique de Bruno, on le tourne à l'envers (à 180 degrés) et on le pose sur celui d'Agnès. La taille de ce "rectangle" correspond au nombre total de fruits sur la table. N'importe quel point dans cette boîte décrit exactement la répartition des fruits : ce qu'Agnès possède se lit depuis son coin (en bas à gauche), et ce qu'il reste pour Bruno se lit depuis son coin (en haut à droite).

**3. Définition / résultat formel**
La Boîte d'Edgeworth est un diagramme rectangulaire de dimensions $\omega_1 \times \omega_2$, où $\omega_1$ et $\omega_2$ sont les quantités totales disponibles des deux biens. 
Une allocation réalisable est un point dans la boîte représentant les vecteurs de consommation $\mathbf{x_A} = (x_A^1, x_A^2)$ et $\mathbf{x_B} = (x_B^1, x_B^2)$ tels que les marchés sont à l'équilibre : $x_A^1 + x_B^1 = \omega_1$ et $x_A^2 + x_B^2 = \omega_2$.
L'intersection des courbes d'indifférence initiales d'Agnès et Bruno forme une "lentille" contenant tous les échanges mutuellement profitables. 

**4. Formules à connaître**
*   **Dotation totale de l'économie** : $\mathbf{\omega} = \mathbf{\omega_A} + \mathbf{\omega_B} = (\omega_A^1 + \omega_B^1, \omega_A^2 + \omega_B^2)$.
*   **Contrainte de faisabilité (sans gaspillage)** : $x_B^1 = \omega_1 - x_A^1$ et $x_B^2 = \omega_2 - x_A^2$. 

**5. Moyen mnémotechnique**
"La boîte enferme les ressources, la lentille enferme les accords."
Agnès lit de bas en haut et de gauche à droite ($\nearrow$). Bruno lit de haut en bas et de droite à gauche ($\swarrow$).

**6. Résumé ultra condensé**
La boîte d'Edgeworth superpose les repères de deux consommateurs pour une quantité fixe de deux biens. L'allocation initiale définit les niveaux d'utilité de départ (statu quo). Un échange n'est accepté que s'il se situe dans la zone (la lentille) comprise entre les deux courbes d'indifférence initiales. La courbe des contrats (optima de Pareto) relie toutes les allocations où aucune amélioration mutuelle n'est plus possible.

**7. Pièges classiques**
*   **Inverser les coordonnées de Bruno :** Oublier que le point de vue de Bruno est inversé. Si un point est très proche de l'origine d'Agnès $(0,0)_A$, cela signifie qu'Agnès n'a presque rien, ce qui implique que Bruno possède presque toute la dotation (il est proche de $(\omega_1, \omega_2)_B$).
*   **Confondre faisabilité et efficacité :** Tout point dans la boîte est une allocation *réalisable* (faisable). Mais seuls les points sur la courbe des contrats sont des allocations *efficaces* (Pareto-optimales).

**8. Lien avec les exercices**
Tous les exercices du **TD 6** (Ex 1 à 5) et des **Annales 2020 et 2022** commencent systématiquement par demander de dessiner la boîte d'Edgeworth, d'y placer la dotation initiale et de tracer les courbes d'indifférence passant par ce point pour justifier si l'allocation est Pareto-optimale ou non.

**9. Méthode de résolution associée**
Pour dessiner et analyser la boîte :
1. Calculer les ressources totales $\omega_1$ (abscisse) et $\omega_2$ (ordonnée). Tracer le rectangle.
2. Placer l'origine A en bas à gauche et l'origine B en haut à droite.
3. Placer le point de dotation initiale en lisant les coordonnées d'Agnès depuis son origine (vérifier que ça correspond bien à la dotation de Bruno depuis la sienne).
4. Tracer la courbe d'indifférence de A passant par ce point (convexe vue de A) et celle de B (convexe vue de B, donc creuse vers le haut à droite).
5. Hachurer la lentille d'échange.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien dimensionné la boîte en faisant la *somme* des dotations initiales ($\omega_A + \omega_B$) ?
*   [ ] Mes courbes d'indifférences de l'agent B tournent-elles bien le dos à l'origine de B ?
*   [ ] Ai-je bien vérifié qu'un échange proposé se trouve à l'intérieur de la lentille avant de déclarer qu'il est mutuellement profitable ?

---

#### Sous-partie 6.2 : Dites le avec des équations !

**1. Idée centrale**
L'objectif est de traduire l'analyse graphique de l'échange (la tangence des courbes d'indifférence) en une résolution algébrique systématique. Cela sert à trouver l'équation mathématique exacte de la Courbe des Contrats. Le sens logique profond est que l'échange s'arrête exactement lorsque les deux agents attribuent la même valeur relative aux deux biens, c'est-à-dire quand leurs "taux de change psychologiques" (les Taux Marginaux de Substitution) s'égalisent.

**2. Intuition / vulgarisation**
Imaginez qu'Agnès est prête à donner 3 pommes pour avoir 1 banane. Bruno, lui, se contenterait d'1 pomme pour céder 1 banane. Ils ont un énorme espace pour négocier (Agnès est prête à payer cher, Bruno vend peu cher). Ils vont échanger. Au fur et à mesure de l'échange, Agnès a de moins en moins de pommes (elle les chérit plus) et Bruno a de moins en moins de bananes (il les chérit plus). Leurs envies convergent. L'échange s'arrête net au moment précis où ils exigent tous les deux, par exemple, 2 pommes contre 1 banane. Leurs évaluations marginales sont alors identiques.

**3. Définition / résultat formel**
Dans le cas de préférences représentées par des fonctions d'utilité différentiables, l'ensemble des allocations efficaces (la Courbe des Contrats) est caractérisé par la tangence des courbes d'indifférence, ce qui implique l'égalité des Taux Marginaux de Substitution des deux agents, évalués en l'allocation réalisable correspondante :
$TMS_A(x_A^1, x_A^2) = TMS_B(x_B^1, x_B^2)$

**4. Formules à connaître**
*   **Égalité des TMS** : $\frac{\partial U_A / \partial x_A^1}{\partial U_A / \partial x_A^2} = \frac{\partial U_B / \partial x_B^1}{\partial U_B / \partial x_B^2}$
*   **Changement de variable (Crucial)** : Pour résoudre l'équation dans l'espace d'Agnès, il faut substituer les consommations de Bruno par la contrainte de rareté :
    $TMS_A(x_A^1, x_A^2) = TMS_B(\omega_1 - x_A^1, \omega_2 - x_A^2)$

**5. Moyen mnémotechnique**
"L'accord est scellé quand les TMS sont nivelés." (TMS A = TMS B). 

**6. Résumé ultra condensé**
Pour trouver analytiquement la courbe des contrats, il faut égaliser les TMS des deux consommateurs. Cependant, le TMS de B est fonction de $x_B$ et $y_B$. Il faut impérativement remplacer les quantités de B par le total disponible moins les quantités de A ($\omega - x_A$). On obtient alors une équation à deux inconnues ($x_A^1, x_A^2$) qu'on isole pour trouver l'équation de la courbe. 

**7. Pièges classiques**
*   **Oublier la substitution :** Poser $TMS_A(x_A, y_A) = TMS_B(x_B, y_B)$ et s'arrêter là, ou essayer de résoudre une équation qui a 4 variables. C'est impossible. Il faut utiliser les dotations totales $\omega_1, \omega_2$ pour exprimer $x_B$ et $y_B$ en fonction de $x_A$ et $y_A$.
*   **Vouloir appliquer le TMS à des fonctions non-dérivables :** Le TMS n'est pas défini pour des utilités de type Leontief $\min(x,y)$. Appliquer l'égalité des TMS sur une Leontief est une erreur fondamentale de raisonnement.

**8. Lien avec les exercices**
C'est la mécanique centrale du **TD 6 (Ex 2 sur la Cobb-Douglas et Ex 5 sur la CES)**. Dans l'exercice 2, l'application de l'égalité des TMS avec $U_A = x_1^\alpha x_2^{1-\alpha}$ et $U_B = x_1^\beta x_2^{1-\beta}$ conduit à une équation du premier degré permettant d'isoler analytiquement $x_2$ en fonction de $x_1$, démontrant la forme (convexe, concave ou linéaire) de la courbe des contrats selon le rapport des paramètres $\alpha$ et $\beta$.

**9. Méthode de résolution associée**
Pour trouver l'équation de la courbe des contrats (cas différentiable) :
1. Calculer le $TMS_A$ (en fonction de $x_A^1, x_A^2$).
2. Calculer le $TMS_B$ (en fonction de $x_B^1, x_B^2$).
3. Poser $TMS_A = TMS_B$.
4. Remplacer $x_B^1$ par $\omega_1 - x_A^1$ et $x_B^2$ par $\omega_2 - x_A^2$.
5. Manipuler l'équation algébriquement pour isoler $x_A^2$ d'un côté de l'égalité. L'expression obtenue est l'équation de la courbe des contrats $x_A^2 = C(x_A^1)$.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien calculé mes dérivées partielles sans me tromper dans les exposants ?
*   [ ] Ai-je bien effectué le changement de variables pour éliminer les inconnues de l'agent B de mon équation finale ?
*   [ ] Ma courbe des contrats relie-t-elle bien l'origine de A $(0,0)$ à l'origine de B $(\omega_1, \omega_2)$ (à vérifier mathématiquement en testant les limites) ?

---

#### Sous-partie 6.3 : Formellement

**1. Idée centrale**
La méthode de l'égalité des TMS a des limites (notamment pour les solutions en coin ou les fonctions non-différentiables). L'objectif est ici de poser rigoureusement la recherche d'une allocation efficace comme un programme mathématique de maximisation sous contrainte. Le sens logique profond est de dire : "Pour trouver la frontière d'efficacité, fixons l'utilité de Bruno à un niveau arbitraire $u_B$, et cherchons à maximiser l'utilité d'Agnès avec les ressources restantes".

**2. Intuition / vulgarisation**
Imaginez qu'un arbitre doit répartir les biens. Pour être sûr de ne pas faire de gaspillage, il va voir Bruno et lui dit : "Je te garantis un niveau de bonheur de 10. Pas plus, pas moins". Ensuite, l'arbitre donne tout le reste à Agnès et l'organise de façon à maximiser son bonheur à elle. L'allocation trouvée est forcément efficace (on ne peut plus améliorer Agnès sans baisser Bruno qui est bloqué à 10). En faisant varier la cible de Bruno (10, 20, 30...), l'arbitre trace petit à petit toute la courbe des contrats.

**3. Définition / résultat formel**
La courbe des contrats $(x_1^*(u), x_2^*(u))$ est l'ensemble des solutions paramétrées par $u$ du programme sous contrainte suivant :
$\max_{\mathbf{x}} U_A(\mathbf{x})$
sous contrainte $U_B(\mathbf{\omega} - \mathbf{x}) = u$
pour $u \in [U_B(0), U_B(\mathbf{\omega})]$

**4. Formules à connaître**
*   **Le Lagrangien du problème** : $\mathcal{L}(x_A^1, x_A^2, \lambda) = U_A(x_A^1, x_A^2) - \lambda [U_B(\omega_1 - x_A^1, \omega_2 - x_A^2) - u]$
*   *Note : La résolution de ce Lagrangien pour des solutions intérieures redonne très exactement la condition $TMS_A = TMS_B$.*

**5. Moyen mnémotechnique**
"On bloque B, on pousse A au max." (Pour trouver l'optimum de Pareto, on contraint un agent et on maximise l'autre).

**6. Résumé ultra condensé**
Formellement, un optimum de Pareto se trouve en maximisant l'utilité d'un agent sous la contrainte que l'autre agent maintienne un niveau d'utilité cible. Cette approche par le Lagrangien valide mathématiquement la règle des TMS, mais elle permet surtout de gérer avec rigueur les cas où l'égalité des TMS échoue, typiquement lors des solutions "en coin" (bords de la boîte) ou pour les biens parfaitement substituables/complémentaires.

**7. Pièges classiques**
*   **Vouloir forcer le Lagrangien sur des fonctions Leontief :** La fonction "Min" n'est pas dérivable à son angle droit. On ne peut pas utiliser la dérivée ni le Lagrangien. Il faut utiliser une résolution logique ou graphique.
*   **Vouloir forcer le Lagrangien sur des substituts parfaits :** Si $U_A = \alpha x + y$, la fonction est linéaire. Les dérivées sont constantes, le Lagrangien ne donnera pas d'égalité. L'optimum se trouve sur les "bords" de la boîte d'Edgeworth.

**8. Lien avec les exercices**
C'est indispensable pour résoudre le **TD 6, Ex 3 (Leontief)** et **Ex 4 (Substituts parfaits)**, ainsi que l'**Annale MIP 2020 Ex 1**. Dans ces cas, l'égalité des TMS ne marche pas. 
Pour l'annale 2020 (Agent B a une fonction Leontief $\min(x,y)$), l'approche formelle ou graphique montre que les optima de Pareto sont contraints par les "coudes" de la fonction Leontief : B refusera de dévier de la ligne $x_B = y_B$, la courbe des contrats est donc exactement cette droite (les sommets des angles droits).

**9. Méthode de résolution associée**
Si la fonction n'est pas strictement convexe et différentiable (exit les TMS) :
*   **Cas Leontief $\min(\alpha x, y)$** : Raisonner graphiquement ou logiquement. L'agent Leontief ne veut consommer que dans les proportions $y = \alpha x$. Tout excès de l'un des biens a pour lui une utilité marginale nulle. L'autre agent va donc récupérer tous ces "excès". La courbe des contrats correspond à l'alignement des "coudes" de la fonction Leontief dans la boîte.
*   **Cas Linéaire (Substituts parfaits)** : Comparer les deux TMS qui sont des constantes. Si $TMS_A > TMS_B$, Agnès valorise plus le bien 1 que Bruno. La courbe des contrats sera située sur les bords de la boîte : Agnès récupère tout le bien 1 jusqu'à saturation, puis commence à prendre le bien 2.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien vérifié le type de fonction d'utilité (Cobb-Douglas vs Leontief/Linéaire) avant de me lancer aveuglément dans un calcul de dérivées ou de TMS ?
*   [ ] Si je suis face à une fonction Leontief, ai-je bien tracé la droite reliant les coudes (ex: $x_B = y_B$) dans la boîte pour repérer la courbe des contrats ?
*   [ ] Dans le cas de substituts parfaits, ai-je bien identifié qui valorise le plus quel bien pour déterminer sur quel "bord" de la boîte se trouve la solution ?