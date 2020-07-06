const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.querySelector('#line');
const clearButton = document.querySelector('#clear');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = 'none';
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 5;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let isTouchDevice = "ontouchstart" in document.documentElement;

function draw(e) {
    if (isTouchDevice) {

        x = e.touches[0].clientX;
        y = e.touches[0].clientY;

    } else {

        if (!isDrawing) {
            return;
        }

        x = e.offsetX;
        y = e.offsetY;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
}

if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
    }

    canvas.ontouchmove = (e) => {
        draw(e);
    }
} else {
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
}

function changeColor(e) {
    ctx.strokeStyle = e.target.value;
    //ctx.strokeStyle = this.value;
}

colorPicker.addEventListener('change', changeColor);

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

clearButton.addEventListener('click', clear);
