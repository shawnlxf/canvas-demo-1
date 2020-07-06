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

function draw(e) {
  if (!isDrawing) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false );
canvas.addEventListener('mouseout', () => isDrawing = false );


function changeColor(e) {
  ctx.strokeStyle = e.target.value;
  //ctx.strokeStyle = this.value;
}

colorPicker.addEventListener('change', changeColor);

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

clearButton.addEventListener('click', clear);
