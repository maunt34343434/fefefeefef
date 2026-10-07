document.addEventListener('DOMContentLoaded', () => {
    // Получаем элементы формы из DOM
    const targetHoursElem = document.getElementById('targetHours');
    const theoryInput = document.getElementById('theoryHours');
    const practiceInput = document.getElementById('practiceHours');
    const selfInput = document.getElementById('selfHours');
    
    const totalDistributedElem = document.getElementById('totalDistributed');
    const balanceTextElem = document.getElementById('balanceText');
    const alertBox = document.getElementById('alertBox');

    const targetHours = parseInt(targetHoursElem.textContent, 10);

    function calculateHours() {
        // Считываем значения, если поле пустое — считаем за 0
        const theory = parseInt(theoryInput.value, 10) || 0;
        const practice = parseInt(practiceInput.value, 10) || 0;
        const self = parseInt(selfInput.value, 10) || 0;

        // Общая сумма распределенных часов
        const total = theory + practice + self;
        totalDistributedElem.textContent = total;

        const diff = targetHours - total;

        // Логика проверки и вывода предупреждений согласно ТЗ
        if (diff > 0) {
            balanceTextElem.textContent = `Осталось распределить: ${diff} ч.`;
            alertBox.textContent = `⚠️ Сумма часов меньше установленного количества на ${diff} ч.`;
            alertBox.className = 'alert-box alert-warning';
        } else if (diff < 0) {
            const overflow = Math.abs(diff);
            balanceTextElem.textContent = `Превышение нормы на: ${overflow} ч.`;
            alertBox.className = 'alert-box alert-error';
            alertBox.textContent = `❌ Превышен лимит часов! Лишних: ${overflow} ч.`;
        } else {
            balanceTextElem.textContent = 'Баланс соблюден идеально!';
            alertBox.className = 'alert-box alert-success';
            alertBox.textContent = '✅ Все часы распределены корректно.';
        }
    }

    // Слушаем изменения в любых полях ввода
    theoryInput.addEventListener('input', calculateHours);
    practiceInput.addEventListener('input', calculateHours);
    selfInput.addEventListener('input', calculateHours);

    // Первичный запуск расчёта при загрузке страницы
    calculateHours();
});