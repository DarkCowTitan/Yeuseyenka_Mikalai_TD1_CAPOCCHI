TD1 — R4.DWeb-DI.05

Dispositif interactif génératif en p5.js.

## Interaction
- **Souris sur l'écran** — les bulles forment une colonne
  et suivent le curseur
- **Souris hors écran** — elles reprennent leur mouvement
  naturel (oscillation sinusoïdale)

| Idéation | Concevoir | "J'ai ces envies : hypnotique, flux, méditation. Propose une idée en p5.js" | Transformer une émotion en règle visuelle |
| Code | Corriger | "Comment faire suivre un cercle la souris de façon fluide ?" | lerp() — interpolation linéaire entre deux valeurs |
| Code | Concevoir | "Comment faire suivre chaque bulle la précédente ?" | Logique serpent — bulle[i] suit bulle[i-1] |
| Code | Corriger | "mouseOut ne fonctionne pas, comment détecter si la souris est dans le canvas ?" | Vérifier mouseX/mouseY dans draw() plutôt qu'un événement |
| Code | Concevoir | "Comment faire une transition de couleur progressive ?" | lerpColor() — même logique que lerp() mais pour les couleurs |
| Critique | Critiquer | "Évalue mon dispositif — points forts et limites" | Le dispositif était trop binaire et les formes trop géométriques |
| Expérimentation | Auto-formation | Suite à la critique — j'ai demandé comment implémenter Perlin noise et l'attraction progressive | noise() pour déformer organiquement, map() + dist() pour attraction variable selon distance |


## Critique IA
J'ai demandé à Claude d'évaluer le dispositif final.

**Points forts identifiés :**
- Intention claire et cohérente du début à la fin
- lerp() et lerpColor() utilisés de façon pertinente
- Le comportement colonne/serpent est original

**Limites identifiées :**
- L'interaction est binaire (souris dedans/dehors) — 
  une attraction progressive selon la distance au centre
  serait plus subtile
- Les formes restent géométriques pures, l'aspect 
  organique/marin de l'intention n'est pas totalement
  traduit visuellement
- Pas d'évolution dans le temps sans interaction —
  le dispositif est identique à t=0 et t=5min

**Ce que j'aurais fait différemment :**
Ajouter noise() de Perlin pour déformer légèrement
les contours des bulles — elles deviendraient vraiment
organiques et non plus des cercles parfaits.

## Ce que j'ai compris au-delà du TD

En travaillant avec l'IA sur les améliorations, j'ai appris
des concepts non vus en cours :

- **beginShape() / curveVertex() / endShape()** — dessiner
  des formes libres point par point au lieu de formes
  prédéfinies (rect, ellipse)

- **noise()** — bruit de Perlin, valeurs pseudo-aléatoires
  lisses qui évoluent dans le temps. Différent de random()
  qui produit des sauts brusques

- **map() + dist()** combinés — traduire une distance
  physique en comportement visuel (plus loin = plus faible)

Ces concepts dépassent le TD1 mais s'inscrivent directement
dans le programme annoncé par Cappochi (bruit, interpolation,
transformations géométriques).