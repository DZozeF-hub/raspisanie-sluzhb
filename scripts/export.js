// scripts/export.js
function generateSchedule() {
    const data = collectScheduleData();
   
    if (currentWeekDates.length === 0) {
        alert("Сначала выберите неделю!");
        return;
    }

    const grouped = {};
    data.forEach(item => {
        if (!grouped[item.date]) grouped[item.date] = [];
        grouped[item.date].push(item);
    });

    const period = `С ${formatDateShort(currentWeekDates[0])} по ${formatDateShort(currentWeekDates[currentWeekDates.length-1])}`;
    
    // === СОХРАНЕНИЕ В ИСТОРИЮ (защита от ошибки) ===
    if (typeof saveToHistory === 'function') {
        saveToHistory(data, period);
    }

    let html = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title></title>
            <style>
                @page {
                    margin: 5mm 5mm 5mm 5mm;
                    size: A4 portrait;
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 15px;
                    color: #000;
                    line-height: 1.5;
                    font-size: 24px;
                    font-style: italic;
                    font-weight: 400;
                }
                h1 {
                    font-size: 42px;
                    text-align: center;
                    margin: 15px 0 8px 0;
                    font-weight: 400;
                }
                h2 {
                    font-size: 33px;
                    text-align: center;
                    margin: 8px 0 25px 0;
                    font-weight: 400;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 25px 0;
                    border: 1px solid #000;
                }
                th, td {
                    border: 1px solid #000;
                    padding: 12px 12px;
                    vertical-align: top;
                    font-size: 24px;
                    font-style: italic;
                    font-weight: 400;
                }
                .day-name {
                    font-weight: 400;
                    width: 140px;
                }
                .date {
                    width: 95px;
                    text-align: center;
                }
                .time {
                    width: 80px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <h1>Расписание богослужений</h1>
            <h2>В Свято-Александро-Невском храме</h2>
            <h2>${period}</h2>
           
            <table>
                <tbody>
    `;

    currentWeekDates.forEach(date => {
        const dateStr = date.toISOString().split('T')[0];
        const dayName = getDayName(date);
        const formattedDate = formatDatePrint(date);
        
        const services = grouped[dateStr] || [];

        const validServices = services.filter(s => s.service && s.service.trim() !== '');

        if (validServices.length > 0) {
            validServices.forEach((service, index) => {
                html += `
                    <tr>
                        ${index === 0 ? `<td class="day-name" rowspan="${validServices.length}">${dayName}</td>` : ''}
                        ${index === 0 ? `<td class="date" rowspan="${validServices.length}">${formattedDate}</td>` : ''}
                        <td class="time">${service.time || ''}</td>
                        <td>${service.service || ''}</td>
                    </tr>
                `;
            });
        } else {
            html += `
                <tr>
                    <td class="day-name">${dayName}</td>
                    <td class="date">${formattedDate}</td>
                    <td class="time"></td>
                    <td></td>
                </tr>
            `;
        }
    });

    html += `
                </tbody>
            </table>
        </body>
        </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    
    printWindow.onload = () => {
        printWindow.document.title = "";
        setTimeout(() => {
            printWindow.print();
        }, 700);
    };
};

// Форматирование дат
function formatDatePrint(date) {
    const d = new Date(date);
    const day = d.getDate();
    const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    return `${day} ${months[d.getMonth()]}`;
}
function formatDateShort(date) {
    const d = new Date(date);
    const day = d.getDate();
    const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
    return `${day} ${months[d.getMonth()]}`;
}