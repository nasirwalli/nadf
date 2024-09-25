// Select canvas and buttons using your class names
const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const saveButton = document.getElementById('save-button');

// Set up canvas for drawing and responsiveness
let drawing = false;

// Set canvas size based on the container's size
function resizeCanvas() {
    const canvasWrapper = document.querySelector('.signature-pad');
    canvas.width = canvasWrapper.offsetWidth;
    canvas.height = canvasWrapper.offsetHeight;
}

// Maintain aspect ratio and resize canvas
window.addEventListener('resize', resizeCanvas);
resizeCanvas();  // Initial call to set the correct size

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function getTouchPos(touchEvent) {
    const rect = canvas.getBoundingClientRect();
    const touch = touchEvent.touches[0];
    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
    };
}

// Start drawing (mouse)
canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    const pos = getMousePos(event);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});

// Continue drawing (mouse)
canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;
    const pos = getMousePos(event);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
});

// Stop drawing (mouse)
canvas.addEventListener('mouseup', () => {
    drawing = false;
});

canvas.addEventListener('mouseleave', () => {
    drawing = false;
});

// Start drawing (touch)
canvas.addEventListener('touchstart', (touchEvent) => {
    touchEvent.preventDefault();
    drawing = true;
    const pos = getTouchPos(touchEvent);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
});

// Continue drawing (touch)
canvas.addEventListener('touchmove', (touchEvent) => {
    if (!drawing) return;
    touchEvent.preventDefault();
    const pos = getTouchPos(touchEvent);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.stroke();
});

// Stop drawing (touch)
canvas.addEventListener('touchend', () => {
    drawing = false;
});

// Clear the canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the signature as an image
saveButton.addEventListener('click', () => {
    const dataURL = canvas.toDataURL();
    console.log('Signature Saved:', dataURL);
    // You can send this dataURL to the server to save the signature
});