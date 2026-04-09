let bubbles = [];
let palette = ['#1B4F72', '#2E86C1', '#AED6F1', '#E8D5B7', '#C0392B'];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 6; i++) {
    bubbles.push({
      homeX: (width / 6) * i + width / 12,
      homeY: height / 2,
      drawX: (width / 6) * i + width / 12,
      drawY: height / 2,
      r: random(30, 80),
      angle: random(TWO_PI),
      speed: random(0.005, 0.02),
      amplitude: random(40, 100),
      baseCol: color(palette[i % palette.length]),
      closeCol: color('#E8D5B7'),
      currentCol: color(palette[i % palette.length]),
      isClose: false
    });
  }
}

function draw() {
  
  background('#0d1b2a');
  fill(13, 27, 42, 25);
  noStroke();
  rect(0, 0, width, height);

  let mouseOnCanvas = mouseX > 0 && mouseX < width && 
     mouseY > 0 && mouseY < height;

  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].isClose = false;
    for (let j = 0; j < bubbles.length; j++) {
      if (i === j) continue;
      let d = dist(
        bubbles[i].drawX, bubbles[i].drawY,
        bubbles[j].drawX, bubbles[j].drawY
      );
      if (d < bubbles[i].r + bubbles[j].r + 20) {
        bubbles[i].isClose = true;
      }
    }
  }
  
  for (let i = 0; i < bubbles.length; i++) {
    let b = bubbles[i];
    b.angle += b.speed;
    let naturalY = b.homeY + sin(b.angle) * b.amplitude;
    
    // If the mouse is on the canvas, the first bubble follows the mouse, and the others follow the one in front of them with a slight delay. If the mouse is off the canvas, all bubbles return to their home positions.
    if (mouseOnCanvas) {
      if (i === 0) {
        b.drawX = lerp(b.drawX, mouseX, 0.1);
        b.drawY = lerp(b.drawY, mouseY, 0.1);

        
      } else {
        let speed = 0.1 - i * 0.01;
        b.drawX = lerp(b.drawX, bubbles[i - 1].drawX, speed);
        b.drawY = lerp(b.drawY, bubbles[i - 1].drawY, speed);

        // Add a slight vertical oscillation to the following bubbles for a more dynamic look
        b.drawY += sin(b.angle * 2) * 5;
      }
    } else {
      b.drawX = lerp(b.drawX, b.homeX, 0.03);
      b.drawY = lerp(b.drawY, naturalY, 0.03);
    }
    
    if (b.isClose) {
      b.currentCol = lerpColor(b.currentCol, b.closeCol, 0.05);
    } else {
      b.currentCol = lerpColor(b.currentCol, b.baseCol, 0.05);
    }

    // outer glow — very transparent and larger than the bubble for a soft halo effect
    let glowCol = color(red(b.currentCol), green(b.currentCol), blue(b.currentCol), 40);
    fill(glowCol);
    noStroke();
    ellipse(b.drawX, b.drawY, b.r * 3);

    // middle circle — lots of transparency for a soft look
    let midCol = color(red(b.currentCol), green(b.currentCol), blue(b.currentCol), 120);
    fill(midCol);
    ellipse(b.drawX, b.drawY, b.r * 2);

    // middle circle — main color with some transparency
    let mainCol = color(red(b.currentCol), green(b.currentCol), blue(b.currentCol), 200);
    fill(mainCol);
    ellipse(b.drawX, b.drawY, b.r * 1.4);

    // highlight — small white circle at the top-left of the bubble
    fill(255, 255, 255, 60);
    ellipse(b.drawX - b.r * 0.25, b.drawY - b.r * 0.25, b.r * 0.4);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].homeX = (width / 6) * i + width / 12;
    bubbles[i].homeY = height / 2;
  }
}