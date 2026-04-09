TD1 — R4.DWeb-DI.05

Dispositif interactif génératif en p5.js.

## Interaction
- **Souris sur l'écran** — les bulles forment une colonne
  et suivent le curseur
- **Souris hors écran** — elles reprennent leur mouvement
  naturel (oscillation sinusoïdale)

## Journal IA
| Moment | Usage | Prompt utilisé |
|---|---|---|
| Idéation | Trouver une intention | "J'ai ces envies : hypnotique, flux, méditation. Propose une idée en p5.js" |
| Code | lerp() pour attraction souris | "Comment faire suivre un cercle la souris en p5.js de façon fluide ?" |
| Code | Colonne / serpent | "Comment faire suivre chaque bulle la précédente ?" |
| Code | lerpColor() | "Comment faire une transition de couleur progressive ?" |
| Debug | mouseOut peu fiable | "mouseOut ne fonctionne pas bien, comment détecter si la souris est dans le canvas ?" |


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