document.addEventListener("DOMContentLoaded", function () {
    // Variáveis para o calendário
    const arrowWeekLeft = document.getElementById("prevButton");
    const arrowWeekRight = document.getElementById("nextButton");
    const datePicker = document.getElementById("datePicker");
    const datePickerText = document.getElementById("datePickerText");

    const cancelBtnDate = document.getElementById("cancelButtonDatePicker");
    const saveBtnDate = document.getElementById("saveButtonDatePicker");

    let daysInInterval = [];

    // Variáveis para o calendário
    let selectedDay = null;
    const calendar = document.getElementById("calendar");
    const arrowMonthLeft = document.getElementById("prevButtonMonth");
    const arrowMonthRight = document.getElementById("nextButtonMonth");
    const monthPicker = document.getElementById("monthPicker");
    const monthPickerText = document.getElementById("monthPickerText");
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    let weekDay = today.getDay();

    let daysInPopUp = document.querySelectorAll('[data-PopUpDay]');

    // Função para obter o número de dias no mês
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    let daysInMonth = getDaysInMonth(currentMonth, currentYear);

    // Array para definir os dias da semana
    const weekDays = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

    // Renderizar calendário
    const renderCalendar = () => {
        // Atualiza o cabeçalho do calendário com mês e ano
        monthPickerText.textContent = `${months[currentMonth]} / ${currentYear}`;

        // Limpa os dias do calendário
        const daysGrid = document.getElementById("daysGrid");
        daysGrid.innerHTML = "";

        // Calcula o primeiro dia da semana do mês atual
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();

        // Número total de dias no mês
        let daysInMonth = getDaysInMonth(currentMonth, currentYear);

        // Preenche os dias vazios antes do início do mês
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement("p");
            daysGrid.appendChild(emptyDay);
        }

        // Preenche os dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("p");
            dayElement.classList.add("day", "text-center", "rounded-md", "hover:bg-hoverColor");
            dayElement.textContent = day;

            // Destaca o dia atual
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayElement.classList.add("today", "bg-pinkPrimary");
            }

            daysGrid.appendChild(dayElement);

            dayElement.addEventListener("click", () => {
                const previouslySelected = document.querySelector(".selected");
                if (previouslySelected) {
                    previouslySelected.classList.remove("selected");
                }

                // Adiciona a classe de selecionado no dia clicado
                dayElement.classList.add("selected");

                // Atualiza o selectedDay
                selectedDay = {
                    day: day,
                    month: currentMonth + 1, // +1 porque os meses são baseados em zero
                    year: currentYear,
                };

                // Lógica para selecionar o dia e o intervalo da semana correspondente
                let countDay = day;
                let dayNextWeek = day + 7;
                let nextMonth = currentMonth + 1;
                let displayMonth = 0;
                function defineWeekInterval() {
                    let endDay = day + 6; // Fim da semana (7 dias)
                    let endMonth = currentMonth;
                    let endYear = currentYear;

                    // Avança os dias para o próximo mês se ultrapassar os limites
                    while (endDay > daysInMonth) {
                        endDay -= daysInMonth; // Subtrai os dias do mês atual
                        endMonth++; // Avança para o próximo mês

                        // Se o mês ultrapassar dezembro, avança o ano
                        if (endMonth > 11) {
                            endMonth = 0; // Janeiro
                            endYear++;
                        }

                        // Atualiza os dias do próximo mês
                        daysInMonth = getDaysInMonth(endMonth, endYear);
                    }

                    console.log(`${day}/${currentMonth + 1}/${currentYear} - ${endDay}/${endMonth + 1}/${endYear}`);
                    return `${day}/${currentMonth + 1} - ${endDay}/${endMonth + 1}`;
                };

                let intervalText = defineWeekInterval();
                datePickerText.innerText = intervalText;
            });
        }
    };

    renderCalendar();

    arrowMonthLeft.addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11; // Volta para dezembro do ano anterior
            currentYear--;
        }
        renderCalendar();
    });

    arrowMonthRight.addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0; // Vai para janeiro do próximo ano
            currentYear++;
        }
        renderCalendar();
    });

    // Exibir/ocultar o calendário
    let isVisible = false;
    datePicker.addEventListener("click", () => {
        if (!isVisible) {
            calendar.classList.add("flex");
            calendar.classList.remove("hidden");
        } else {
            calendar.classList.remove("flex");
            calendar.classList.add("hidden");
        }

        isVisible = !isVisible;
    });

    // Lógica para salvar a data
    saveBtnDate.addEventListener("click", () => {
        if (selectedDay) {
            console.log(`Dia salvo: ${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`);

            // Atualiza os dias da semana
            printWeek();

            // Atualiza os campos de tarefa
            const firstDayinTasks = document.getElementById("firstDayinTasks");
            firstDayinTasks.innerText = `${selectedDay.day}/${selectedDay.month}`;

            // Atualiza os dias e os nomes da semana no DOM
            const dayForTask = document.querySelectorAll('[data-taskDays]');
            const taskWeekDay = document.querySelectorAll('[data-taskWeekDay]');

            dayForTask.forEach((taskDayElement, index) => {
                if (daysInInterval[index]) {
                    const { day, month } = daysInInterval[index];
                    taskDayElement.textContent = `${day}/${month}`;
                } else {
                    taskDayElement.textContent = ''; // Limpa elementos extras
                }
            });

            taskWeekDay.forEach((weekDayElement, index) => {
                if (daysInInterval[index]) {
                    const { day, month, year } = daysInInterval[index];
                    const date = new Date(year, month - 1, day); // Cria um objeto Date
                    const weekDayName = weekDays[date.getDay()]; // Obtém o nome do dia
                    weekDayElement.textContent = weekDayName;
                } else {
                    weekDayElement.textContent = ''; // Limpa elementos extras
                }
            });

            selectedDay = null; // Redefine o dia selecionado após salvar
        } else {
            console.log("Nenhum dia foi selecionado.");
        }
    });

    function printWeek() {
        daysInInterval.length = 0; // Reinicia o array de dias da semana

        let currentDay = selectedDay.day;
        let currentMonth = selectedDay.month - 1; // Ajuste porque os meses no JS começam do 0
        let currentYear = selectedDay.year;

        for (let i = 0; i < 7; i++) {
            daysInInterval.push({ day: currentDay, month: currentMonth + 1, year: currentYear });

            // Avançar para o próximo dia
            currentDay++;
            if (currentDay > getDaysInMonth(currentMonth, currentYear)) {
                currentDay = 1; // Primeiro dia do próximo mês
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0; // Janeiro do próximo ano
                    currentYear++;
                }
            }
        }

        return daysInInterval;
    }
});
