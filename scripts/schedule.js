let currentWeekDates = [];
let selectedDays = new Set();

function loadWeek() {
    const startDateInput = document.getElementById('start-date');
    let startDate = startDateInput.value ? new Date(startDateInput.value) : new Date();
    
    currentWeekDates = getWeekDates(startDate);
    
    // Создаём выбор дней (один раз)
    if (selectedDays.size === 0) {
        createDayToggles();
    }

    renderSelectedDays();
}

function createDayToggles() {
    const container = document.getElementById('day-toggles');
    container.innerHTML = '';

    currentWeekDates.forEach((date, index) => {
        const dayName = getDayName(date);
        
        const div = document.createElement('div');
        div.className = 'day-toggle';
        div.innerHTML = `
            <input type="checkbox" id="toggle-${index}" checked 
                   onchange="toggleDay(${index})">
            <label for="toggle-${index}">
                ${dayName}<br>
                <small>${formatDate(date).slice(0,5)}</small>
            </label>
        `;
        container.appendChild(div);
        
        selectedDays.add(index); // по умолчанию все выбраны
    });
}

function toggleDay(index) {
    if (selectedDays.has(index)) {
        selectedDays.delete(index);
    } else {
        selectedDays.add(index);
    }
    renderSelectedDays();
}

function renderSelectedDays() {
    const container = document.getElementById('days-container');
    container.innerHTML = '';

    currentWeekDates.forEach((date, index) => {
        if (!selectedDays.has(index)) return;   // показываем только выбранные дни

        const dateStr = date.toISOString().split('T')[0];
        
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerHTML = `
            <div class="day-header">
                ${getDayName(date)} — ${formatDate(date)}
            </div>
            <div class="services" id="services-${dateStr}"></div>
            <div style="padding: 0 15px 15px;">
                <button onclick="addServiceRow('${dateStr}')" class="btn-add">
                    + Добавить службу
                </button>
            </div>
        `;

        container.appendChild(dayDiv);

        addServiceRow(dateStr, "08:00");
        addServiceRow(dateStr, "15:00");
    });
}

// Добавление службы
function addServiceRow(dateStr, defaultTime = "08:00") {
    const container = document.getElementById(`services-${dateStr}`);
    if (!container) return;

    const row = document.createElement('div');
    row.className = 'service-row';
    row.innerHTML = `
        <input type="time" value="${defaultTime}">
        <input type="text" placeholder="Название службы">
        <button onclick="this.parentElement.remove()" class="btn-remove">✕</button>
    `;
    container.appendChild(row);
}

// Сбор данных
function collectScheduleData() {
    const schedule = [];
    
    document.querySelectorAll('.day').forEach(day => {
        const servicesDiv = day.querySelector('.services');
        if (!servicesDiv) return;
        
        const dateStr = servicesDiv.id.replace('services-', '');

        servicesDiv.querySelectorAll('.service-row').forEach(row => {
            const timeInput = row.querySelector('input[type="time"]');
            const nameInput = row.querySelector('input[type="text"]');
            
            schedule.push({
                date: dateStr,
                time: timeInput ? timeInput.value : '',
                service: nameInput ? nameInput.value.trim() : ''
            });
        });
    });
    
    return schedule;
}