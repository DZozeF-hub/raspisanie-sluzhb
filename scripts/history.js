// scripts/history.js
let historyData = [];

function loadHistory() {
    const saved = localStorage.getItem('scheduleHistory');
    if (saved) {
        historyData = JSON.parse(saved);
    } else {
        historyData = [];
    }
}

function saveToHistory(scheduleData, period) {
    if (!scheduleData || scheduleData.length === 0) return;

    const entry = {
        id: Date.now(),
        dateCreated: new Date().toLocaleString('ru-RU'),
        period: period,
        schedule: scheduleData
    };

    historyData.unshift(entry); // новые сверху

    if (historyData.length > 30) historyData.pop();

    localStorage.setItem('scheduleHistory', JSON.stringify(historyData));
}