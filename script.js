const patternLock = document.getElementById('patternLock');
const dots = document.querySelectorAll('.dot');
const message = document.getElementById('message');

let pattern = [];
let correctPattern = [7, 2, 1, 3, 5, 9, 8]; // Contoh pola yang benar
let isDrawing = false;

dots.forEach(dot => {
    dot.addEventListener('mousedown', startPattern);
    dot.addEventListener('touchstart', startPattern);
    dot.addEventListener('mouseover', continuePattern);
    dot.addEventListener('touchmove', continuePatternTouch);
    dot.addEventListener('mouseup', endPattern);
    dot.addEventListener('touchend', endPattern);
});

function startPattern(e) {
    e.preventDefault();
    isDrawing = true;
    pattern = [];
    message.textContent = '';
    dots.forEach(dot => dot.classList.remove('active'));
    addToPattern(e.target);
}

function continuePattern(e) {
    if (isDrawing) {
        addToPattern(e.target);
    }
}

function continuePatternTouch(e) {
    const touch = e.touches[0];
    const dot = document.elementFromPoint(touch.clientX, touch.clientY);
    if (dot && dot.classList.contains('dot')) {
        addToPattern(dot);
    }
}

function endPattern() {
    isDrawing = false;
    if (validatePattern()) {
        message.textContent = 'Pattern correct!';
        message.style.color = 'green';
        // Redirect to another website after correct pattern
        window.location.href = 'https://wa.link/3j462q'; // Ganti dengan URL tujuan
    } else {
        message.textContent = '𝗣𝗼𝗹𝗮 𝗺𝘂 𝗦𝗮𝗹𝗮𝗵!❌';
        message.style.color = 'red';
    }
}

function addToPattern(dot) {
    const index = parseInt(dot.getAttribute('data-index'));
    if (!pattern.includes(index)) {
        pattern.push(index);
        dot.classList.add('active');
    }
}

function validatePattern() {
    if (pattern.length !== correctPattern.length) return false;
    for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] !== correctPattern[i]) return false;
    }
    return true;
}
