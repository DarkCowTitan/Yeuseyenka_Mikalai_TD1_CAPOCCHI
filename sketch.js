
let bubbles = [];
let palette = ['#1B4F72', '#2E86C1', '#AED6F1', '#E8D5B7', '#C0392B'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Création des 6 bulles avec paramètres aléatoires
  for (let i = 0; i < 6; i++) {
    bubbles.push({
      // Position de repos — là où la bulle revient sans interaction
      homeX: (width / 6) * i + width / 12,
      homeY: height / 2,
      
            // Position courante pour le dessin
            drawX: (width / 6) * i + width / 12,
            drawY: height / 2,
      
                    r: random(30, 80),          
                    angle: random(TWO_PI),      // phase initiale pour l'oscillation
                    speed: random(0.005, 0.02), // vitesse d'oscillation
                    amplitude: random(40, 100), 
      
                            // Couleurs — base et contact
                            baseCol: color(palette[i % palette.length]),
                            closeCol: color('#E8D5B7'),
                            currentCol: color(palette[i % palette.length]),
                            
                            isClose: false,
      
      // Seed unique pour le bruit de Perlin de chaque bulle
      noiseOffset: random(1000)
    });
  }
}

function draw() {
  background('#0d1b2a');
  
                            // Trail — rectangle semi-transparent pour laisser une traînée
                            fill(13, 27, 42, 25);
                            noStroke();
                            rect(0, 0, width, height);

  // Détection souris dans le canvas
  let mouseOnCanvas = mouseX > 0 && mouseX < width && 
                      mouseY > 0 && mouseY < height;

                            // Attraction progressive — plus faible quand la souris est loin du centre
                            let distFromCenter = dist(mouseX, mouseY, width / 2, height / 2);
                            let distNorm = constrain(distFromCenter / (width / 2), 0, 1);
                            let attractStrength = map(distNorm, 0, 1, 0.12, 0.02);

  // Détection de proximité entre les bulles
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].isClose = false;
    for (let j = 0; j < bubbles.length; j++) {
      if (i === j) continue;
      let d = dist(
        bubbles[i].drawX, bubbles[i].drawY,
        bubbles[j].drawX, bubbles[j].drawY
      );
                            // Collision si distance < somme des rayons + marge
                            if (d < bubbles[i].r + bubbles[j].r + 20) {
                                bubbles[i].isClose = true;
                            }
    }
  }
  
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    
    // Oscillation sinusoïdale — mouvement naturel de la bulle
    b.angle += b.speed;
    let naturalY = b.homeY + sin(b.angle) * b.amplitude;
    
                if (mouseOnCanvas) {
                if (i === 0) {
                    // Première bulle — suit directement le curseur
                    b.drawX = lerp(b.drawX, mouseX, attractStrength);
                    b.drawY = lerp(b.drawY, mouseY, attractStrength);
                } else {
                            // Bulles suivantes — effet serpent, chacune suit la précédente
                            let speed = attractStrength - i * 0.01;
                            b.drawX = lerp(b.drawX, bubbles[i - 1].drawX, max(speed, 0.01));
                            b.drawY = lerp(b.drawY, bubbles[i - 1].drawY, max(speed, 0.01));
      }
    } else {
      // Vitesse de Retour à la position de repos quand la souris quitte le canvas
      b.drawX = lerp(b.drawX, b.homeX, 0.03);
      b.drawY = lerp(b.drawY, naturalY, 0.03);
    }
    
    // Transition de couleur progressive selon la proximité
    if (b.isClose) {
      b.currentCol = lerpColor(b.currentCol, b.closeCol, 0.05);
    } else {
      b.currentCol = lerpColor(b.currentCol, b.baseCol, 0.05);
    }

                            // Extraction des composantes RGB pour gérer l'opacité
                            let glowCol = color(red(b.currentCol), green(b.currentCol), blue(b.currentCol), 40);
                            let midCol  = color(red(b.currentCol), green(b.currentCol), blue(b.currentCol), 120);
                            let mainCol = color(red(b.currentCol), green(b.currentCol), blue(b.currentCol), 200);

    // Dessin en 3 couches — halo, corps, centre
    drawOrganic(b.drawX, b.drawY, b.r * 1.5, glowCol, b.noiseOffset);
    drawOrganic(b.drawX, b.drawY, b.r * 1.0, midCol,  b.noiseOffset + 100);
    drawOrganic(b.drawX, b.drawY, b.r * 0.7, mainCol, b.noiseOffset + 200);

                                // Reflet — simule un effet de sphère en verre
                                fill(255, 255, 255, 60);
                                noStroke();
                                ellipse(b.drawX - b.r * 0.25, b.drawY - b.r * 0.25, b.r * 0.4);

    // Évolution lente du bruit — la forme respire dans le temps
    b.noiseOffset += 0.005;
  }
}

// Forme via bruit de Perlin
// une forme déformée
function drawOrganic(x, y, r, col, noiseOff) {
  fill(col);
  noStroke();
  beginShape();
  let detail = 24; //plus = plus lisse
  for (let a = 0; a < TWO_PI; a += TWO_PI / detail) {



                            // noise, déformation du rayon
                            let offset = map(noise(cos(a) + noiseOff, sin(a) + noiseOff), 0, 1, -r * 0.2, r * 0.2);
                            let px = x + cos(a) * (r + offset);
                            let py = y + sin(a) * (r + offset);
                            curveVertex(px, py);
                        }
                        endShape(CLOSE);
                        }

// recalcul des positions de repos
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].homeX = (width / 6) * i + width / 12;
    bubbles[i].homeY = height / 2;
  }
}