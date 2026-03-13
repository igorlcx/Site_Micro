### Chapitre 2 : A-compétition

Ce chapitre étudie les marchés où la concurrence se situe du côté des acheteurs ("A-compétition"). Il explore comment cette concurrence influence la formation des prix, d'abord dans un cadre discret et stratégique, puis dans le cadre continu du modèle canonique du monopole. Enfin, il formalise les outils de mesure du bien-être (Surplus et Welfare) pour évaluer l'efficacité de ces marchés.

---

#### Sous-partie 2.1 : Plus de demande que d'offre

**1. Idée centrale**
L'objectif est d'étudier comment l'introduction de la concurrence du côté des acheteurs (plusieurs acheteuses face à un vendeur d'un bien unique) modifie le rapport de force. Ce concept sert à démontrer que le vendeur n'a pas besoin d'un "pouvoir de négociation" intrinsèque pour s'accaparer le surplus : c'est la structure même du marché (la rivalité entre acheteuses) qui fait monter les prix et détermine la répartition des gains.

**2. Intuition / vulgarisation**
Imaginez que vous vendez une voiture d'occasion. Si une seule personne la veut, vous devez négocier pied à pied pour fixer un prix. Mais si deux personnes veulent ardemment la même voiture, vous n'avez plus rien à faire : elles vont surenchérir l'une sur l'autre (comme dans une vente aux enchères). Le prix montera naturellement jusqu'à ce que l'acheteur le moins motivé abandonne. La concurrence entre les autres travaille pour vous.

**3. Définition / résultat formel**
En présence d'un vendeur (coût $c$) et de deux acheteuses (valuations $v_1$ et $v_2$, avec $v_1 \ge v_2$) :
*   **Cas symétrique ($v_1 = v_2 = v$)** : L'échange est efficace si $v \ge c$. Le prix s'établit exactement à $p = v$. Le vendeur accapare 100% du surplus total.
*   **Cas asymétrique ($v_1 > v_2$)** : L'échange est efficace si $v_1 \ge c$. Le prix est propulsé par la concurrence au moins jusqu'à $v_2$. Il s'établit dans l'intervalle $p \in [\max(c, v_2), v_1]$. L'accaparation du surplus par le vendeur est donc limitée par l'hétérogénéité des acheteuses.

**4. Formules à connaître**
*   **Condition d'équilibre concurrentiel :** $D(p) = O(p)$. *Le prix est tel que la somme des demandes individuelles (en escalier) égale l'offre globale.*
*   **Prix en enchère asymétrique :** $p = v_2$ (en supposant une sous-cotation marginale $\epsilon$ négligeable). *Le prix d'arrêt correspond à la disposition à payer du premier acheteur éliminé.*

**5. Moyen mnémotechnique**
"La compétition élimine le plus faible et fixe le prix plancher au niveau du perdant" ($p \ge v_2$).

**6. Résumé ultra condensé**
Lorsqu'il y a plus de demande que d'offre, la concurrence entre les acheteurs pousse le prix vers le haut, transférant le surplus vers le vendeur. Si les acheteurs sont identiques, le vendeur rafle tout. S'ils sont hétérogènes, le prix grimpe jusqu'à la valuation du deuxième acheteur le plus intéressé, adoucissant ainsi la concurrence.

**7. Pièges classiques**
*   **Confondre pouvoir de marché et effet de la concurrence :** Croire que le vendeur obtient $p=v$ parce qu'il fixe lui-même les règles. Non, même dans une enchère ascendante (où ce sont les acheteurs qui parlent), le résultat sera $p=v$.
*   **Ignorer les asymétries :** Conclure aveuglément que "le vendeur gagne tout". Dès que $v_1 > v_2$, l'acheteuse 1 obtiendra un surplus positif ($v_1 - v_2$).

**8. Lien avec les exercices**
Cette logique sous-tend l'analyse de l'**Exercice 1 du TD 4 (Concurrence à la Bertrand avec asymétries)**. Bien que le TD 4 traite de V-compétition (vendeurs en concurrence), la mécanique d'accaparation de surplus basée sur l'asymétrie des acteurs ($w_1 > w_2$) utilise exactement la même matrice logique que celle décrite ici. 

**9. Méthode de résolution associée**
Pour analyser l'issue d'une vente en situation d'A-compétition :
1. Identifier le coût de réserve du vendeur ($c$).
2. Trier les valuations des acheteurs par ordre décroissant ($v_1 > v_2 > ...$).
3. Fixer le prix généré par la concurrence à la valuation du premier acheteur exclu (ici $v_2$).
4. Vérifier que la transaction s'effectue bien entre l'acheteur 1 et le vendeur.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien repéré qui a la plus forte valuation ($v_1$) et qui a la seconde ($v_2$) ?
*   [ ] Ai-je vérifié que le prix d'équilibre permet un surplus $\ge 0$ pour l'acheteur gagnant ?

---

#### Sous-partie 2.2 : Modèle du monopole

**1. Idée centrale**
Ce modèle décrit le comportement d'une firme unique face à un continuum de consommateurs hétérogènes. L'objectif est de montrer comment le monopole, qui fixe librement un prix unique pour tous, arbitre entre "vendre cher à peu de monde" et "vendre bon marché à beaucoup de monde" pour maximiser son profit. Le sens profond est que l'information incomplète (ne pas connaître le type $v$ exact de chaque client) empêche la discrimination et crée un prix de marché supérieur au coût marginal.

**2. Intuition / vulgarisation**
Si Apple vendait ses iPhone à prix coûtant, ils en vendraient des millions mais ne feraient aucun bénéfice. S'ils les vendaient 10 000 €, ils feraient une marge immense par téléphone, mais n'en vendraient presque aucun. Le monopole cherche le prix exact qui équilibre cette bascule : là où augmenter le prix fait fuir juste assez de clients pour que le gain sur ceux qui restent compense la perte de ceux qui partent.

**3. Définition / résultat formel**
Soit un continuum d'acheteurs de masse $N$ dont les valuations $v$ suivent une fonction de répartition $F(v)$ et une densité $f(v)$. 
Le monopole maximise $\Pi(p) = (p-c) \times N(1-F(p))$.
Sous l'hypothèse de croissance du taux de hasard $\frac{f(p)}{1-F(p)}$, la Condition du Premier Ordre (CPO) caractérise le prix de monopole optimal $p^m$.

**4. Formules à connaître**
*   **Demande continue :** $D(p) = N(1 - F(p))$. *Masse des agents dont la valuation $v$ est supérieure au prix.*
*   **Maximisation (CPO) :** $p = c + \frac{1 - F(p)}{f(p)}$. *Le prix de monopole est égal au coût marginal plus une marge.*
*   **Indice de Lerner :** $\frac{p - c}{p} = \frac{1}{\epsilon}$ avec l'élasticité-prix $\epsilon = -\frac{D'(p)p}{D(p)}$. *Mesure le pouvoir de marché : la marge relative est inversement proportionnelle à l'élasticité de la demande.*

**5. Moyen mnémotechnique**
"L'élasticité dicte la marge". Si les clients sont très élastiques (sensibles au prix, $\epsilon$ grand), le pouvoir de marché se réduit et le prix s'écrase vers $c$. 

**6. Résumé ultra condensé**
Le monopole, protégé de la concurrence, fixe un prix $p^m > c$ pour maximiser son profit. Ce prix s'obtient en égalisant le revenu marginal au coût marginal. La capacité du monopole à imposer une forte marge dépend de la rigidité de la demande (Indice de Lerner) : moins la demande est élastique, plus le monopole peut extraire de la valeur.

**7. Pièges classiques**
*   **Ne regarder que la FOC (Condition du Premier Ordre) :** Il faut toujours vérifier la pertinence de la solution (bornes). Si $c$ est faible, il arrive que le monopole serve tout le marché en posant un prix bas (solution en coin $p^m = v_{min}$).
*   **Confondre profit et revenu :** Ne pas oublier de soustraire le coût unitaire $c$ lors de l'écriture du programme $\max_p (p-c)D(p)$.

**8. Lien avec les exercices**
C'est la base absolue du **TD 3 (Monopole)**. L'exercice 1 étudie le monopole avec une distribution uniforme de $v$. L'exercice 3 modélise un monopole face à deux populations, illustrant la difficulté de choisir un prix unique quand la demande globale présente des "coudes" (kinks) et qu'il faut choisir entre servir tout le monde ou exclure une population.

**9. Méthode de résolution associée**
Pour trouver le prix de monopole :
1. Construire la fonction de demande $D(p)$ à partir de la fonction de répartition $F(p)$ de la population.
2. Poser la fonction de profit $\Pi(p) = (p-c)D(p)$.
3. Dériver par rapport au prix : $\Pi'(p)$.
4. Égaliser à zéro (CPO) et isoler $p$ pour trouver le candidat $p^m$.
5. Vérifier que $p^m$ a un sens économique (ex: appartient à l'intervalle des valuations possibles).

**10. Mini checklist d'examen**
*   [ ] Ai-je bien écrit $(1-F(p))$ et non $F(p)$ pour la demande ?
*   [ ] Ma dérivée de $\Pi(p)$ intègre-t-elle bien la règle du produit $(uv)' = u'v + uv'$ ?
*   [ ] Mon prix final $p^m$ est-il bien strictement supérieur à $c$ ?

---

#### Sous-partie 2.3 : Surplus des consommateurs

**1. Idée centrale**
L'objectif est de quantifier monétairement le "bonheur" ou l'avantage net que les consommateurs retirent de l'existence d'un marché à un prix donné. Il sert d'indicateur principal pour juger si une politique (taxe, subvention, régulation) aide ou lèse les consommateurs. Le sens logique est que toute personne qui achète un bien le fait car sa valuation dépasse le prix payé, dégageant ainsi un bénéfice invisible mais réel.

**2. Intuition / vulgarisation**
Si vous êtes prêt à mettre 50€ pour un concert mais que le billet ne coûte que 30€, vous avez fait une "bonne affaire" de 20€. Le surplus des consommateurs, c'est simplement la somme des bonnes affaires de tous les spectateurs qui ont acheté un billet. Si le prix baisse, le surplus gonfle.

**3. Définition / résultat formel**
Pour une fonction de demande $D(p)$ issue d'une population, le surplus agrégé des consommateurs $S(p)$ est l'intégrale des différences $(v-p)$ pour tous les types $v \ge p$.
Grâce au théorème de Jules Dupuit, il correspond à l'aire sous la courbe de demande et au-dessus de la ligne du prix de marché.

**4. Formules à connaître**
*   **Surplus par intégrale de Dupuit :** $S(p) = \int_p^\infty D(v) dv$. *Intégrale de la demande depuis le prix d'achat $p$ jusqu'à l'infini (ou la valuation maximale).*
*   **Théorème de l'enveloppe sur le surplus :** $S'(p) = -D(p)$. *La variation du surplus induite par une variation du prix est exactement égale à l'opposé de la quantité demandée.*

**5. Moyen mnémotechnique**
"La variation de mon bonheur, c'est moins la quantité que je consomme" ($S' = -D$). L'aire d'un triangle : Base (Quantité) $\times$ Hauteur (Disparité de prix) $/ 2$.

**6. Résumé ultra condensé**
Le surplus des consommateurs mesure le bien-être côté acheteurs. Il se calcule visuellement comme l'aire située entre la courbe de demande et le prix. Analytiquement, il est l'intégrale de la demande. Sa dérivée par rapport au prix est strictement négative : quand le prix monte, le surplus chute proportionnellement au volume acheté.

**7. Pièges classiques**
*   **Se tromper de bornes d'intégration :** Intégrer de $0$ à $p$ au lieu de $p$ à $+\infty$.
*   **Ne pas tenir compte du rationnement :** Si le marché n'est pas à l'équilibre et qu'il y a pénurie, l'intégrale simple $\int_p^\infty D(v) dv$ est fausse car tous ceux qui ont $v>p$ ne réussissent pas à acheter ! (Voir TD2 Ex 2).

**8. Lien avec les exercices**
C'est le thème central du **TD 2 (Surplus, Welfare, Taxes)**. L'exercice 2 du TD 2 modélise avec une extrême rigueur la forme du surplus lorsque le prix s'éloigne de l'équilibre et que le rationnement intervient, en forçant à ajuster l'intégrale de surplus : $\int_{p(p)}^\infty D(w)dw + (p(p)-p)O(p)$.

**9. Méthode de résolution associée**
Pour calculer le surplus :
*   *Cas linéaire ($D(p) = a - bp$) :* Faire un dessin. Calculer l'aire du triangle dont la base est $D(p)$ et la hauteur est $(p_{max} - p)$ où $p_{max} = a/b$.
*   *Cas général :* Poser l'intégrale $\int_p^{v_{max}} D(x) dx$ et chercher la primitive de la fonction de demande.

**10. Mini checklist d'examen**
*   [ ] Ai-je bien dessiné le prix en ordonnée et la quantité en abscisse pour repérer mon aire ?
*   [ ] Si la demande est non-linéaire, ai-je bien primitivé la fonction $D(p)$ pour résoudre l'intégrale ?

---

#### Sous-partie 2.4 : Welfare

**1. Idée centrale**
Le Welfare (ou Bien-Être Social) est la mesure agrégée ultime de l'efficacité d'un marché. Son objectif est d'additionner sans jugement de valeur les gains des consommateurs (surplus) et ceux des producteurs (profits). Son sens profond est d'établir qu'un marché concurrentiel est économiquement efficace, car il maximise la "taille du gâteau", tandis qu'un monopole crée un gaspillage, un gâteau plus petit, pour prendre une part plus grosse.

**2. Intuition / vulgarisation**
Le Welfare, c'est la richesse totale créée par le fait qu'un marché existe. Si le gouvernement s'en mêle via un monopole ou des taxes, il modifie la taille du gâteau. La "perte sèche" (Dead-weight loss), c'est la part du gâteau qui tombe par terre et que personne ne mange : des transactions qui auraient rendu un acheteur et un vendeur heureux mais qui n'ont pas lieu à cause du prix trop élevé.

**3. Définition / résultat formel**
Le Welfare s'écrit $W(p) = S(p) + \Pi(p) = \int_p^\infty D(v) dv + (p-c)D(p)$.
Il atteint son maximum global lorsque $p = c$ (l'équilibre concurrentiel).
Si une tarification non-concurrentielle (monopole $p_m$) induit une quantité $q_m < q_c$, cela génère une **perte sèche sociale** (Dead-weight loss) mesurée par $W(c) - W(p_m)$.

**4. Formules à connaître**
*   **Welfare :** $W(p) = S(p) + \Pi(p)$
*   **Dérivée du Welfare :** $W'(p) = (p-c)D'(p)$. *(Obtenu en sommant $S'=-D$ et $\Pi' = D + (p-c)D'$).*
*   **Perte sèche (Triangle de Harberger) :** $DWL = W_{max} - W_{monopole}$. 

**5. Moyen mnémotechnique**
"La dérivée du bien-être, c'est la marge fois la pente de la demande" ($W' = (p-c)D'$). Si $p=c$, la dérivée s'annule, on est au sommet de la montagne du Welfare.

**6. Résumé ultra condensé**
Le surplus total (Welfare) est maximisé lorsque le prix égale le coût marginal (tarification concurrentielle). La présence d'un monopole engendre généralement un prix plus élevé, ce qui ampute les quantités échangées. Cette chute des volumes détruit définitivement de la valeur, créant une perte sèche pour la société.

**7. Pièges classiques**
*   **Associer systématiquement Monopole et Perte Sèche :** La perte sèche existe *si et seulement si* $q_m < q_c$. Si le monopole trouve rentable de baisser le prix jusqu'à ce que tout le monde achète (par exemple si $c$ est très faible et le prix minimal $v$ est bloqué), $q_m = q_c$ et la perte sèche est nulle ! C'est juste un énorme transfert de richesse vers le vendeur sans destruction d'efficacité.
*   **Oublier les dépenses de l'État :** Si l'exercice inclut des subventions ou taxes, le Welfare devient $W(p) = S(p) + \Pi(p) \pm \text{Gouvernement}$.

**8. Lien avec les exercices**
Absolument décisif pour l'**Exercice 3 du TD 2 (Ristourne à la pompe)** et les **QCM d'annales (MIP 2021 et 2022)**. Ces exercices demandent d'analyser la fonction $W(p)$ lorsqu'on introduit une taxe $\tau$ (le prix endogène devient fonction de la taxe). L'État maximise alors le Welfare en pondérant parfois les consommateurs (Welfare pondéré $W_\beta = \beta S + \Pi - T$). Également le cœur du **TD 3 Ex 2 (Régulation Ramsey-Boiteux)**, où le régulateur maximise le Welfare public sous contrainte budgétaire.

**9. Méthode de résolution associée**
Pour démontrer que le monopole crée une inefficacité ou optimiser une taxe :
1. Calculer le $p^c = c$ concurrentiel et $q^c$.
2. Calculer le $p^m$ du monopole et $q^m$.
3. Si $q^m < q^c$, justifier l'inefficacité.
4. Calculer le DWL via l'aire du triangle hachuré entre $D(p)$, $p=c$ et $q^m$ sur le graphique : Base $(p^m - c) \times$ Hauteur $(q^c - q^m) / 2$. 

**10. Mini checklist d'examen**
*   [ ] Ai-je bien additionné les trois composantes si l'État intervient (Conso + Producteurs + État) ?
*   [ ] La quantité d'équilibre de mon monopole est-elle bien inférieure à ma quantité concurrentielle avant de déclarer l'existence d'un DWL ?