document.addEventListener('DOMContentLoaded', () => {
    const startDateInput = document.getElementById('start-date');
    const today = new Date().toISOString().split('T')[0];
    startDateInput.value = today;
    
    loadWeek();
});
// === Настройки кастомизации ===
function loadCustomSettings() {
    const savedTitle = localStorage.getItem('churchTitle');
    const savedBg = localStorage.getItem('backgroundUrl');

    if (savedTitle) {
        document.getElementById('church-title').textContent = savedTitle;
    }
    if (savedBg) {
        document.body.style.backgroundImage = `url('${savedBg}')`;
    }
}

function saveSettings() {
    const newTitle = document.getElementById('church-name-input').value.trim();
    const newBg = document.getElementById('bg-input').value.trim();

    if (newTitle) {
        localStorage.setItem('churchTitle', newTitle);
        document.getElementById('church-title').textContent = newTitle;
    }

    if (newBg) {
        localStorage.setItem('backgroundUrl', newBg);
        document.body.style.backgroundImage = `url('${newBg}')`;
    } else {
        localStorage.removeItem('backgroundUrl');
        // Можно вернуть стандартный фон, если нужно
    }

    closeSettings();
}

function openSettings() {
    document.getElementById('settings-modal').style.display = 'flex';
    
    // Заполняем текущие значения
    document.getElementById('church-name-input').value = 
        localStorage.getItem('churchTitle') || 'Свято-Александро-Невский храм';
    
    document.getElementById('bg-input').value = 
        localStorage.getItem('backgroundUrl') || '';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // ... твой текущий код
    loadCustomSettings();
});
// Кастомизация — только фон
function loadSettings() {
    const bgUrl = localStorage.getItem('backgroundUrl');
    if (bgUrl) {
        document.body.style.backgroundImage = `url('${bgUrl}')`;
    }
}

function saveSettings() {
    const bgUrl = document.getElementById('bg-input').value.trim();

    if (bgUrl) {
        localStorage.setItem('backgroundUrl', bgUrl);
        document.body.style.backgroundImage = `url('${bgUrl}')`;
    } else {
        localStorage.removeItem('backgroundUrl');
    }

    closeSettings();
}

function openSettings() {
    document.getElementById('settings-modal').style.display = 'flex';
    document.getElementById('bg-input').value = localStorage.getItem('backgroundUrl') || '';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // ... твой существующий код
    loadSettings();
});
// Настройки экспорта
let exportSettings = {
    fontSize: 18,
    fontStyle: "italic",
    fontWeight: 400,
    headerSize: 32
};

function loadExportSettings() {
    const saved = localStorage.getItem('exportSettings');
    if (saved) {
        exportSettings = JSON.parse(saved);
    }
}

function saveExportSettings() {
    exportSettings.fontSize = parseInt(document.getElementById('font-size').value);
    exportSettings.fontStyle = document.getElementById('font-style').value;
    exportSettings.fontWeight = parseInt(document.getElementById('font-weight').value);
    exportSettings.headerSize = parseInt(document.getElementById('header-size').value);

    localStorage.setItem('exportSettings', JSON.stringify(exportSettings));
    closeSettings();
    alert("Настройки экспорта сохранены!");
}

function openSettings() {
    document.getElementById('settings-modal').style.display = 'flex';
    
    document.getElementById('font-size').value = exportSettings.fontSize;
    document.getElementById('font-size-value').textContent = exportSettings.fontSize + "px";
    
    document.getElementById('font-style').value = exportSettings.fontStyle;
    document.getElementById('font-weight').value = exportSettings.fontWeight;
    
    document.getElementById('header-size').value = exportSettings.headerSize;
    document.getElementById('header-size-value').textContent = exportSettings.headerSize + "px";
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

// Обновление значений при движении ползунка
document.addEventListener('DOMContentLoaded', () => {
    loadExportSettings();
    
    const fontSlider = document.getElementById('font-size');
    const headerSlider = document.getElementById('header-size');
    
    fontSlider.addEventListener('input', () => {
        document.getElementById('font-size-value').textContent = fontSlider.value + "px";
    });
    
    headerSlider.addEventListener('input', () => {
        document.getElementById('header-size-value').textContent = headerSlider.value + "px";
    });
});