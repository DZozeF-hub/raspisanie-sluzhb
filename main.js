const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 900,
        minHeight: 650,
        
        icon: path.join(__dirname, 'icon.ico'),        // Рекомендую иконку в корне
        // icon: path.join(__dirname, 'assets/icons/icon.ico'), // или так
        
        show: false,                                   // Чтобы не было мерцания
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    // Открываем окно развёрнутым на весь экран (с рамкой и кнопками)
    win.maximize();

    win.loadFile('index.html');

    // Показываем окно после загрузки
    win.once('ready-to-show', () => {
        win.show();
    });

    // win.setMenu(null); // Раскомментируй, если хочешь убрать верхнее меню Windows
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});