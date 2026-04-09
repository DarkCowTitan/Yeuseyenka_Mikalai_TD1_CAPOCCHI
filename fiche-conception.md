# Fiche de conception — Respire

## 1 — Intention
Plonger le spectateur dans un état de flux.
Il observe, respire, et oublie le monde autour de lui.
L'interaction est une invitation, pas une obligation.

**3 mots :** fluide · hypnotique · vivant

**Référence visuelle :** Mer Égée — cercles qui se balancent
sur l'eau, poteries grecques, pierre chaude et bleu profond.

## 2 — Canvas
Plein écran · fond `#0d1b2a` (bleu nuit profond)

## 3 — Éléments visuels
| Élément | Fixe ou varié | Ce qui varie | Plage |
|---|---|---|---|
| Bulle (cercle) | varié | position, taille, couleur | 6 bulles, r: 30→80px |
| Mouvement Y | varié | offset sinusoïdal | amplitude: 40→100px |
| Couleur | varié | sближение détecté via dist() | palette grecque |
| Opacité | varié | 3 couches par bulle | 40 / 120 / 200 |

## 4 — Couleur
Palette : `#1B4F72` `#2E86C1` `#AED6F1` `#E8D5B7` `#C0392B`
Couleur de contact : `#E8D5B7` (beige chaud)
Transition via `lerpColor()` — jamais instantanée

## 5 — Mouvement
Animée en boucle · chaque bulle oscille via `sin(angle)`
Trail via rectangle semi-transparent au lieu de background() plein

## 6 — Interaction
**Souris sur canvas** → les bulles forment une colonne
qui suit le curseur (première bulle → curseur, suivantes
→ bulle précédente)
**Souris hors canvas** → retour au mouvement naturel via lerp()

**Ce que l'utilisateur croit contrôler :** toutes les bulles
**Ce qu'il contrôle vraiment :** seulement la première —
les autres suivent par propagation

## 7 — Hasard
Fixe : nombre de bulles (6), palette
Aléatoire : taille, vitesse, amplitude, phase initiale de chaque bulle
Ne jamais produire : toutes les bulles identiques

## 8 — Pseudo-code
**Au démarrage :** créer 6 bulles avec paramètres aléatoires
**À chaque frame :** trail → vérifier sближения → mettre à jour
positions → lerpColor → dessiner 3 couches + reflet
**Souris active :** bulle[0] → curseur, bulle[i] → bulle[i-1]
**Souris inactive :** chaque bulle → homeX/homeY via lerp()