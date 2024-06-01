const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let atoms = [];

canvas.addEventListener('mousemove' ,(event) => {
    for( i = 0; i < 20; i++) {
        atoms.push(new Atom(event.x, event.y))
    }
})


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
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.restore();
    requestAnimationFrame(animate);
}

animate();

class Atom {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.color =  '#' + (0x1000000 + Math.floor(Math.random() * 0x1000000)).toString(16).substring(1);
        this.radius = Math.random() * 8 + 2;
        this.speedX = Math.random() * 4 - 2;
        this.speedY = Math.random() * 4 - 2;
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.radius -= 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}