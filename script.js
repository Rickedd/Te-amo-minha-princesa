const canvas = document.getElementById('loveMatrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let matrixText = document.getElementById('matrixText').value || 'Te Amo, My Love';
let matrixColor = document.getElementById('matrixColor').value || '#FF007F';
let matrixSpeed = parseInt(document.getElementById('matrixSpeed').value) || 30;
const fontSize = 16;

const columns = Math.floor(canvas.width / fontSize);
const drops = Array.from({ length: columns }).fill(1);

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = matrixColor;
    ctx.font = `${fontSize}"px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const char = matrixText.charAt(Math.floor(Math.random() * matrixText.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

let animationInterval;

function startAnimation() {
    clearInterval(animationInterval);
    animationInterval = setInterval(draw, matrixSpeed);
}

startAnimation();

document.getElementById('matrixText').addEventListener('input', function() {
    matrixText = this.value || 'Te Amo, My Love';
});

document.getElementById('matrixColor').addEventListener('input', function() {
    matrixColor = this.value;
});

document.getElementById('matrixSpeed').addEventListener('input', function() {
    matrixSpeed = parseInt(this.value);
    startAnimation();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    drops.length = 0;
    for(let i = 0; i < columns; i++) {
        drops.push(1);
    }
});