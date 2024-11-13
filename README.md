# Creative Coding Particles with Vanilla JS and HTML Canvas
This project creates a simple interactive particle effect on an HTML5 Canvas using Vanilla JavaScript. When the user moves their mouse across the canvas, colorful particles (atoms) appear, move in random directions, and slowly fade away, creating a dynamic and visually engaging animation.

## Demo
https://jakeso.github.io/rainbow-explosion

Move your mouse over the canvas to generate animated particles. Each particle will bounce within the canvas boundaries, shrinking and eventually disappearing to maintain performance.

## Code Breakdown
### HTML
Set up a basic HTML file with a <canvas> element:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Creative Coding Particles</title>
</head>
<body>
    <canvas id="my-canvas"></canvas>
    <script src="script.js"></script>
</body>
</html>
```
### JavaScript
The JavaScript file (script.js) contains the core functionality:

1. Canvas Initialization:
Get the canvas element, set its size, and retrieve the drawing context.

```javascript
const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```
2. Particle Interaction:

On mousemove, generate particles near the cursor.
Each particle (an instance of the Atom class) is added to an array for management.
```javascript
let atoms = [];

canvas.addEventListener('mousemove', (event) => {
    for (let i = 0; i < 20; i++) {
        atoms.push(new Atom(event.x, event.y));
    }
});
```
3. Animate Function:

Draw, update, and remove particles based on their properties.
A semi-transparent fill creates a fading trail effect as particles move.
```javascript
const animate = () => {
    atoms.forEach((atom, index) => {
        atom.draw();
        atom.update();

        if (atom.radius < 0.3) {
            atoms.splice(index, 1);
        }
    });

    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    requestAnimationFrame(animate);
};

animate();
```
4. Atom Class:

Each atom has properties like position, color, size, and speed.
draw() renders the atom, and update() manages position, boundary checks, and radius reduction.
```javascript
class Atom {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = '#' + (0x1000000 + Math.floor(Math.random() * 0x1000000)).toString(16).substring(1);
        this.radius = Math.random() * 8 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
    }

    update() {
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
        this.x += this.speedX;
        this.y += this.speedY;
        this.radius -= 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
```
## Getting Started
1. Clone the project:

```bash
git clone https://github.com/your-username/creative-coding.git
cd creative-coding
```
2. Open index.html in your browser to see the particle effect in action.

## Future Improvements
1. Customizable Colors: Add user-selected colors or color palettes.
2. Responsive Resize: Update canvas dimensions on window resize.
3. Mouse Interaction Effects: Implement hover effects or click-based particle bursts.
