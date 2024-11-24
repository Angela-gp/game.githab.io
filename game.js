// Получаем ссылку на canvas и его контекст для рисования
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Устанавливаем размер canvas на весь экран
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rings = []; // Массив для хранения кольцевых волн
let animationRunning = true; // Флаг для включения/выключения анимации

// Получаем элементы управления
const sizeControl = document.getElementById('sizeControl');
const frequencyControl = document.getElementById('frequencyControl');
const speedControl = document.getElementById('speedControl');
const opacityControl = document.getElementById('opacityControl');
const sizeValue = document.getElementById('sizeValue');
const frequencyValue = document.getElementById('frequencyValue');
const speedValue = document.getElementById('speedValue');
const opacityValue = document.getElementById('opacityValue');
const toggleAnimationButton = document.getElementById('toggleAnimation');

// Функция для обновления значения и сохранения в localStorage
function updateSetting(control, valueSpan, key) {
    control.addEventListener('input', () => {
        valueSpan.textContent = control.value;
        localStorage.setItem(key, control.value); // Сохраняем в localStorage
    });
}

// Восстановление значений из localStorage при загрузке страницы
function loadSettings() {
    if (localStorage.getItem('waveSize')) {
        sizeControl.value = localStorage.getItem('waveSize');
        sizeValue.textContent = sizeControl.value;
    }
    if (localStorage.getItem('waveFrequency')) {
        frequencyControl.value = localStorage.getItem('waveFrequency');
        frequencyValue.textContent = frequencyControl.value;
    }
    if (localStorage.getItem('waveSpeed')) {
        speedControl.value = localStorage.getItem('waveSpeed');
        speedValue.textContent = speedControl.value;
    }
    if (localStorage.getItem('waveOpacity')) {
        opacityControl.value = localStorage.getItem('waveOpacity');
        opacityValue.textContent = opacityControl.value;
    }
}

// Восстановим настройки при загрузке
loadSettings();

// Обработчики для всех ползунков
updateSetting(sizeControl, sizeValue, 'waveSize');
updateSetting(frequencyControl, frequencyValue, 'waveFrequency');
updateSetting(speedControl, speedValue, 'waveSpeed');
updateSetting(opacityControl, opacityValue, 'waveOpacity');

// Класс для кольца воды
class WaterRing {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = parseInt(sizeControl.value); // Размер кольца (из ползунка)
        this.alpha = parseFloat(opacityControl.value); // Прозрачность кольца
        this.speed = parseInt(speedControl.value); // Скорость распространения
        this.frequency = parseInt(frequencyControl.value); // Частота колебаний
        this.frameCount = 0; // Счётчик кадров
    }

    // Обновляем состояние кольца
    update() {
        this.frameCount++;

        // Увеличиваем радиус в зависимости от скорости и частоты
        if (this.frameCount % this.speed === 0) {
            this.radius += 5;
        }

        // Уменьшаем прозрачность
        this.alpha -= 0.01;

        // Если прозрачность стала 0, удаляем кольцо
        if (this.alpha <= 0) {
            return false;
        }
        return true;
    }

    // Рисуем кольцо
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = `rgba(0, 255, 255, ${this.alpha})`; // Голубой цвет с прозрачностью
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }
}

// Обработчик события для отслеживания мыши
canvas.addEventListener('mousemove', (event) => {
    if (animationRunning) { // Если анимация включена
        let ring = new WaterRing(event.x, event.y);
        rings.push(ring); // Добавляем новое кольцо в массив
    }
});

// Функция для обновления анимации
function animate() {
    if (!animationRunning) return; // Если анимация выключена, выходим

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas

    // Обновляем и рисуем каждое кольцо
    for (let i = rings.length - 1; i >= 0; i--) {
        if (!rings[i].update()) {
            rings.splice(i, 1); // Удаляем кольца, которые больше не видны
        } else {
            rings[i].draw(); // Рисуем кольцо
        }
    }

    requestAnimationFrame(animate); // Рекурсивный вызов для плавной анимации
}

// Запуск анимации
animate();

// Обработчик для кнопки включения/выключения анимации
toggleAnimationButton.addEventListener('click', () => {
    animationRunning = !animationRunning; // Переключаем флаг анимации
    toggleAnimationButton.textContent = animationRunning ? 'Disable Animation' : 'Enable Animation'; // Меняем текст на кнопке
    
    if (animationRunning) {
        // Если анимация включена, запускаем ее снова
        animate();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем стрелку
    const arrow = document.querySelector('.arrow');
    if (arrow) {
        // Применяем анимацию или другие изменения
        arrow.style.animation = 'moveArrow 2s infinite'; // Пример анимации
    }
});
