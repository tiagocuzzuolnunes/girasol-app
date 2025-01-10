// document.addEventListener("DOMContentLoaded", function () {

//     // variables for date picker
//     const arrowWeekLeft = document.getElementById("prevButton");
//     const arrowWeekRight = document.getElementById("nextButton");
//     const datePicker = document.getElementById("datePicker");
//     const datePickerText = document.getElementById("datePickerText");

//     const cancelBtnDate = document.getElementById("cancelButtonDatePicker");
//     const saveBtnDate = document.getElementById("saveButtonDatePicker");

//     let daysInInterval = [];

//     function updateDropdownDays() {
//         const dayOptions = document.querySelectorAll(".dayPopUp li");
    
//         // Limpa as opções antigas
//         dayOptions.forEach(option => {
//             option.textContent = ''; // Limpa o conteúdo de cada link
//         });
    
//         // Se uma data foi selecionada, preenche os dias no dropdown
//         if (selectedDay) {
//             let daysInDropdown = [];
//             const daysInMonth = getDaysInMonth(selectedDay.month - 1, selectedDay.year); // Ajuste para o mês correto
    
//             // Preenche os dias do mês atual para o dropdown (7 dias, ajustável)
//             for (let i = 0; i < 7; i++) {
//                 let day = selectedDay.day + i;
//                 if (day > daysInMonth) {
//                     day -= daysInMonth; // Ajuste para o próximo mês
//                 }
//                 daysInDropdown.push(day);
//             }
    
//             // Atualiza os dias no dropdown
//             dayOptions.forEach((option, index) => {
//                 if (daysInDropdown[index]) {
//                     option.textContent = daysInDropdown[index];
//                 }
//             });
//         }
//     }

//     // variables for calendar
//     let selectedDay = null;
//     const calendar = document.getElementById("calendar");
//     const arrowMonthLeft = document.getElementById("prevButtonMonth");
//     const arrowMonthRight = document.getElementById("nextButtonMonth");
//     const monthPicker = document.getElementById("monthPicker");
//     const monthPickerText = document.getElementById("monthPickerText");
//     const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
//     let today = new Date();
//     let currentYear = today.getFullYear();
//     let currentMonth = today.getMonth();
//     let weekDay = today.getDay();

//     let daysInPopUp = document.querySelectorAll('[data-PopUpDay]')

//     // function for getting number of days in a month
//     const getDaysInMonth = (month, year) => {
//         return new Date(year, month + 1, 0).getDate();
//     };

//     let daysInMonth = getDaysInMonth(currentMonth, currentYear);

//     console.log(daysInMonth);
//     console.log(today, currentYear, currentMonth, weekDay)

//     // array for defining weekday's names
//     const weekDays = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

//     // render calendar
//     const renderCalendar = () => {
//         // refresh calendar header with month and year
//         monthPickerText.textContent = `${months[currentMonth]} / ${currentYear}`;

//         // clean calendar days
//         daysGrid.innerHTML = "";

//         // calculate which day of the week is the first day of current month
//         const firstDay = new Date(currentYear, currentMonth, 1).getDay();

//         // total number of days in current month
//         let daysInMonth = getDaysInMonth(currentMonth, currentYear);

//         // fill the empty days before month begins
//         for (let i = 0; i < firstDay; i++) {
//             const emptyDay = document.createElement("p");
//             daysGrid.appendChild(emptyDay);
//         }
//         // fill days of the month
//         for (let day = 1; day <= daysInMonth; day++) {
//             const dayElement = document.createElement("p");
//             dayElement.classList.add("day", "text-center", "rounded-md", "hover:bg-hoverColor");
//             dayElement.textContent = day;

//             // highlight for current day
//             if (
//                 day === today.getDate() &&
//                 currentMonth === today.getMonth() &&
//                 currentYear === today.getFullYear()
//             ) {
//                 dayElement.classList.add("today", "bg-pinkPrimary");
//             }

//             daysGrid.appendChild(dayElement);

//             dayElement.addEventListener("click", () => {
//                 const previouslySelected = document.querySelector(".selected");
//                 if (previouslySelected) {
//                     previouslySelected.classList.remove("selected");
//                 }
            
//                 // Adiciona a classe "selected" ao dia clicado
//                 dayElement.classList.add("selected");
            
//                 // Atualiza a data selecionada
//                 selectedDay = {
//                     day: day,
//                     month: currentMonth + 1, // +1 porque os meses são baseados em zero
//                     year: currentYear,
//                 };
            
//                 // Atualiza o texto no Date Picker (na parte superior)
//                 const intervalText = defineWeekInterval();
//                 datePickerText.innerText = intervalText;
            
//                 // Após a seleção, atualiza o dropdown
//                 updateDropdownDays();
//             });

//                 // logic for selecting day and corresponding week interval
//                 let countDay = day;
//                 let dayNextWeek = day + 7;
//                 let nextMonth = currentMonth + 1;
//                 let displayMonth = 0;
//                 function defineWeekInterval() {
//                     let endDay = day + 6; // Fim da semana (7 dias)
//                     let endMonth = currentMonth;
//                     let endYear = currentYear;

//                     // Avança os dias para o próximo mês se ultrapassar os limites
//                     while (endDay > daysInMonth) {
//                         endDay -= daysInMonth; // Subtraímos os dias do mês atual
//                         endMonth++; // Avançamos para o próximo mês

//                         // Se o mês ultrapassar dezembro, avança o ano
//                         if (endMonth > 11) {
//                             endMonth = 0; // Janeiro
//                             endYear++;
//                         }

//                         // Atualiza os dias do próximo mês
//                         daysInMonth = getDaysInMonth(endMonth, endYear);
//                     }

//                     console.log(`${day}/${currentMonth + 1}/${currentYear} - ${endDay}/${endMonth + 1}/${endYear}`);
//                     return `${day}/${currentMonth + 1} - ${endDay}/${endMonth + 1}`;
//                 };


//                 let intervalText = defineWeekInterval();
//                 datePickerText.innerText = intervalText;
//             }
//         function printWeek() {
//             daysInInterval.length = 0; // Reinicia o array de dias da semana

//             let currentDay = selectedDay.day;
//             let currentMonth = selectedDay.month - 1; // Ajuste porque os meses no JS começam do 0
//             let currentYear = selectedDay.year;

//             for (let i = 0; i < 7; i++) {
//                 daysInInterval.push({ day: currentDay, month: currentMonth + 1, year: currentYear });

//                 // Avançar para o próximo dia
//                 currentDay++;
//                 if (currentDay > getDaysInMonth(currentMonth, currentYear)) {
//                     currentDay = 1; // Primeiro dia do próximo mês
//                     currentMonth++;
//                     if (currentMonth > 11) {
//                         currentMonth = 0; // Janeiro do próximo ano
//                         currentYear++;
//                     }
//                 }
//             }

//             return daysInInterval;
//         }

//         cancelBtnDate.addEventListener("click", () => {
//             calendar.classList.toggle("hidden");
//         });

//         saveBtnDate.addEventListener("click", () => {
//             if (selectedDay) {
//                 console.log(`Dia salvo: ${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`);
//                 printWeek(); // Atualiza os dias da semana
//                 // Atualiza o primeiro dia das tarefas
//                 refreshFirstDayTasks(); // Chama a função que atualiza a data das tarefas
//             } else {
//                 console.log("Nenhum dia foi selecionado.");
//             }

//             calendar.classList.toggle("hidden");

//             // Atualiza os dias e os nomes da semana no DOM
//             const dayForTask = document.querySelectorAll('[data-taskDays]');
//             const taskWeekDay = document.querySelectorAll('[data-taskWeekDay]');

//             dayForTask.forEach((taskDayElement, index) => {
//                 if (daysInInterval[index]) {
//                     const { day, month } = daysInInterval[index];
//                     taskDayElement.textContent = `${day}/${month}`;
//                 } else {
//                     taskDayElement.textContent = ''; // Limpa elementos extras
//                 }
//             });

//             taskWeekDay.forEach((weekDayElement, index) => {
//                 if (daysInInterval[index]) {
//                     const { day, month, year } = daysInInterval[index];
//                     const date = new Date(year, month - 1, day); // Cria um objeto Date
//                     const weekDayName = weekDays[date.getDay()]; // Obtém o nome do dia
//                     weekDayElement.textContent = weekDayName;
//                 } else {
//                     weekDayElement.textContent = ''; // Limpa elementos extras
//                 }
//             });

//             selectedDay = null; // Redefine o dia selecionado após salvar
//         });



//     };

//     renderCalendar();


//     arrowMonthLeft.addEventListener("click", () => {
//         currentMonth--;
//         if (currentMonth < 0) {
//             currentMonth = 11; // go to december of previous year
//             currentYear--;
//         }
//         renderCalendar();
//     });

//     arrowMonthRight.addEventListener("click", () => {
//         currentMonth++;
//         if (currentMonth > 11) {
//             currentMonth = 0; // go to january of next year
//             currentYear++;
//         }
//         renderCalendar();
//     });

//     // logic for cancelling or confirming selecting new date

//     saveBtnDate.addEventListener("click", () => {
//         if (selectedDay) {
//             console.log(`Dia salvo: ${selectedDay.day}/${selectedDay.month}/${selectedDay.year}`)
//                 ;
//         } else {
//             console.log("Nenhum dia foi selecionado.");
//         }
//     });


//     let isVisible = false;

//     datePicker.addEventListener("click", () => {
//         if (!isVisible) {
//             calendar.classList.add("flex");
//             calendar.classList.remove("hidden");
//         } else {
//             calendar.classList.remove("flex");
//             calendar.classList.add("hidden");
//         }

//         isVisible = !isVisible;
//     }
//     )


//     // const newTaskPopUp = document.getElementById("newTaskPopUp");
//     // const newTaskBtn = document.getElementById("task-button");
//     // const saveTaskBtn = document.getElementById("saveTaskBtn");
//     // const cancelTaskBtn = document.getElementById("cancelTaskBtn");
//     // const dayPopUp = document.querySelector(".dayPopUp");

//     // const downDateBtn = document.querySelector("#downDateBtn");
//     // const downHourBtn = document.querySelector("#downHourBtn");
//     // const dropdownDateMenu = document.querySelector("#dropdownDateMenu");
//     // const dropdownHourMenu = document.querySelector("#dropdownHourMenu");

//     // newTaskBtn.addEventListener("click", () => {
//     //     newTaskPopUp.classList.toggle("hidden");
//     // });

//     // cancelTaskBtn.addEventListener("click", () => {
//     //     newTaskPopUp.classList.add("hidden");
//     // });

//     // saveTaskBtn.addEventListener("click", () => {
//     //     newTaskPopUp.classList.add("hidden");
//     // });

//     // downDateBtn.addEventListener("click", () => {
//     //     dropdownDateMenu.classList.toggle("hidden")
//     // });


//     const newTaskPopUp = document.getElementById("newTaskPopUp");
//     const newTaskBtn = document.getElementById("task-button");
//     const saveTaskBtn = document.getElementById("saveTaskBtn");
//     const cancelTaskBtn = document.getElementById("cancelTaskBtn");
//     const downDateBtn = document.querySelector("#downDateBtn");
//     const dropdownDateMenu = document.querySelector("#dropdownDateMenu");

//     // Variáveis para armazenar a data selecionada
//     let selectedDate = null;
//     let currentTask = null; // Para armazenar a tarefa sendo editada

    

//     // Mostrar/ocultar popup
//     // newTaskBtn.addEventListener("click", () => {
//     //     newTaskPopUp.classList.toggle("hidden");
//     // });

//     newTaskBtn.addEventListener("click", () => {
//         newTaskPopUp.classList.toggle("hidden");
    
//         // Se uma data foi selecionada no calendário, mostra essa data no botão de data do popup
//         if (selectedDay) {
//             downDateBtn.querySelector("button").textContent = `${selectedDay.day}/${selectedDay.month}`;
//         }
    
//         // Atualiza os dias no dropdown com base na data selecionada
//         updateDropdownDays();
//     });

//     // Cancelar a criação ou edição da tarefa
//     cancelTaskBtn.addEventListener("click", () => {
//         newTaskPopUp.classList.add("hidden");
//         resetPopup();
//     });

//     document.querySelectorAll(".dayPopUp a").forEach((dateOption) => {
//         dateOption.addEventListener("click", (e) => {
//             e.preventDefault();
//             selectedDate = e.target.textContent; // Atualiza a data selecionada
//             downDateBtn.querySelector("button").textContent = selectedDate; // Atualiza o botão com a data selecionada
//             dropdownDateMenu.classList.add("hidden"); // Fecha o menu de datas
//         });
//     });

//     // Salvar a tarefa
//     saveTaskBtn.addEventListener("click", () => {
//         const taskName = document.getElementById("name").value;

//         // Verificar se todos os campos foram preenchidos
//         if (!taskName || !selectedDate) {
//             alert("Por favor, preencha todos os campos antes de salvar a tarefa.");
//             return;
//         }

//         // Se houver uma tarefa sendo editada, atualize seu nome
//         if (currentTask) {
//             currentTask.querySelector(".task-name").textContent = `${taskName} - ${selectedDate}`;
//             currentTask = null; // Reseta a tarefa sendo editada
//         } else {
//             // Caso contrário, crie uma nova tarefa
//             const taskItem = document.createElement("button");
//             taskItem.classList.add("task-btn", "mt-8");
//             const taskDiv = document.createElement("div");
//             taskDiv.classList.add("w-full", "h-full");
//             const taskContent = document.createElement("div");
//             taskContent.classList.add("flex", "w-full", "h-[32px]", "bg-lime", "rounded-md", "font-openSans", "text-2xl", "pl-3", "font-bold");
//             taskContent.classList.add("task-name");
//             taskContent.textContent = `${taskName} - ${selectedDate}`;
//             taskItem.appendChild(taskDiv);
//             taskDiv.appendChild(taskContent);
//             taskItem.setAttribute("data-tarefa", "true");
//             taskItem.addEventListener("click", editTask);

//             // Adiciona a tarefa à lista
//             document.querySelector(".flex.flex-col.items-center").appendChild(taskItem);
//         }

//         // Fechar o popup e resetar os campos
//         newTaskPopUp.classList.add("hidden");
//         resetPopup();
//     });

//     // Mostrar/ocultar menu de data
//     downDateBtn.addEventListener("click", () => {
//         dropdownDateMenu.classList.toggle("hidden");
//     });

//     // Selecionar data
//     document.querySelectorAll(".dayPopUp a").forEach((dateOption) => {
//         dateOption.addEventListener("click", (e) => {
//             e.preventDefault();
//             selectedDate = e.target.textContent; // Atualiza a data selecionada
//             downDateBtn.querySelector("button").textContent = selectedDate; // Atualiza o botão
//             dropdownDateMenu.classList.add("hidden"); // Fecha o menu de datas
//         });
//     });

//     // Função resetPopup ajustada
//     function resetPopup() {
//         // Verificando se o elemento existe
//         const nameInput = document.getElementById("name");
//         if (nameInput) {
//             nameInput.value = ""; // Resetando o valor do input
//         } else {
//             console.warn("Elemento 'name' não encontrado.");
//         }

//         const taskList = document.getElementById("taskItems");
//         if (taskList) {
//             taskList.textContent = ""; // Resetando as tarefas
//         } else {
//             console.warn("Elemento 'taskItems' não encontrado.");
//         }

//         // Certifique-se de que todos os outros elementos e interações também são validados antes de manipulá-los
//     }

//     // Adicionando o evento de clique ao botão de salvar
//     document.addEventListener("DOMContentLoaded", () => {
//         const saveTaskBtn = document.getElementById("saveTaskBtn");
//         if (saveTaskBtn) {
//             saveTaskBtn.addEventListener("click", function () {
//                 resetPopup(); // Chama o resetPopup
//             });
//         } else {
//             console.warn("Botão 'saveTaskBtn' não encontrado.");
//         }

//         // Se você estiver tratando do botão 'cancelTaskBtn', pode seguir um processo semelhante
//         const cancelTaskBtn = document.getElementById("cancelTaskBtn");
//         if (cancelTaskBtn) {
//             cancelTaskBtn.addEventListener("click", function () {
//                 resetPopup(); // Chama o resetPopup
//             });
//         } else {
//             console.warn("Botão 'cancelTaskBtn' não encontrado.");
//         }
//     });


//     // Função para editar uma tarefa existente
//     function editTask(e) {
//         const taskItem = e.target.closest("button"); // Pegue o item de tarefa do botão
//         const taskName = taskItem.querySelector(".task-name").textContent.split(" - ")[0]; // Extrai o nome da tarefa
//         const taskDate = taskItem.querySelector(".task-name").textContent.split(" - ")[1]; // Extrai a data da tarefa

//         // Preenche o popup com o nome e data da tarefa
//         document.getElementById("name").value = taskName;
//         selectedDate = taskDate;
//         downDateBtn.querySelector("button").textContent = taskDate;

//         // Marca a tarefa como sendo editada
//         currentTask = taskItem;
//         newTaskPopUp.classList.remove("hidden");
//     }
// });

document.addEventListener("DOMContentLoaded", function () {

    // Definir variáveis para o calendário e o popup
    const arrowWeekLeft = document.getElementById("prevButton");
    const arrowWeekRight = document.getElementById("nextButton");
    const datePicker = document.getElementById("datePicker");
    const datePickerText = document.getElementById("datePickerText");

    const cancelBtnDate = document.getElementById("cancelButtonDatePicker");
    const saveBtnDate = document.getElementById("saveButtonDatePicker");

    let daysInInterval = [];

    // Definir e atualizar as datas no dropdown de dias
    function updateDropdownDays() {
        const dayOptions = document.querySelectorAll(".dayPopUp li");
        dayOptions.forEach(option => {
            option.textContent = ''; // Limpa as opções anteriores
        });

        if (selectedDay) {
            let daysInDropdown = [];
            const daysInMonth = getDaysInMonth(selectedDay.month - 1, selectedDay.year); // Ajuste para o mês correto

            // Preenche os dias do mês atual para o dropdown (ajustável para 7 dias)
            for (let i = 0; i < 7; i++) {
                let day = selectedDay.day + i;
                if (day > daysInMonth) {
                    day -= daysInMonth; // Ajuste para o próximo mês
                }
                daysInDropdown.push(day);
            }

            // Atualiza os dias no dropdown
            dayOptions.forEach((option, index) => {
                if (daysInDropdown[index]) {
                    option.textContent = daysInDropdown[index];
                }
            });
        }
    }

    // Função para pegar o número de dias no mês
    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Variáveis principais
    let selectedDay = null; // Guarda o dia selecionado
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    const weekDays = ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."];

    const renderCalendar = () => {
        const monthPickerText = document.getElementById("monthPickerText");
        const daysGrid = document.getElementById("daysGrid"); // Suponho que a grid de dias esteja dentro de um elemento com id daysGrid

        // Atualiza o texto do mês e ano
        monthPickerText.textContent = `${months[currentMonth]} / ${currentYear}`;

        // Limpa a grid de dias
        daysGrid.innerHTML = "";

        // Calcula o primeiro dia da semana do mês atual
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
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

            // Marca o dia atual com uma classe especial
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayElement.classList.add("today", "bg-pinkPrimary");
            }

            daysGrid.appendChild(dayElement);

            // Quando um dia for clicado, armazena a data selecionada
            dayElement.addEventListener("click", () => {
                const previouslySelected = document.querySelector(".selected");
                if (previouslySelected) {
                    previouslySelected.classList.remove("selected");
                }
                dayElement.classList.add("selected");

                selectedDay = {
                    day: day,
                    month: currentMonth + 1, // +1 porque os meses começam de 0
                    year: currentYear,
                };

                const intervalText = defineWeekInterval();
                datePickerText.innerText = intervalText;

                // Atualiza os dias no dropdown
                updateDropdownDays();
            });
        }
    };

    // Função para definir o intervalo de uma semana a partir do dia selecionado
    function defineWeekInterval() {
        let endDay = selectedDay.day + 6; // Fim da semana (7 dias)
        let endMonth = currentMonth;
        let endYear = currentYear;

        while (endDay > getDaysInMonth(currentMonth, currentYear)) {
            endDay -= getDaysInMonth(currentMonth, currentYear); // Subtrai os dias do mês
            endMonth++; // Avança para o próximo mês

            if (endMonth > 11) {
                endMonth = 0;
                endYear++;
            }
        }

        return `${selectedDay.day}/${currentMonth + 1} - ${endDay}/${endMonth + 1}`;
    }

    renderCalendar(); // Chama a função de renderização do calendário

    // Lógica para avançar e retroceder o mês
    document.getElementById("prevButtonMonth").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    document.getElementById("nextButtonMonth").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Funcionalidade do popup de tarefa
    const newTaskPopUp = document.getElementById("newTaskPopUp");
    const newTaskBtn = document.getElementById("task-button");
    const saveTaskBtn = document.getElementById("saveTaskBtn");
    const cancelTaskBtn = document.getElementById("cancelTaskBtn");
    const downDateBtn = document.querySelector("#downDateBtn");
    const dropdownDateMenu = document.querySelector("#dropdownDateMenu");

    // Exibe o popup e preenche o campo de data
    newTaskBtn.addEventListener("click", () => {
        newTaskPopUp.classList.toggle("hidden");

        // Se uma data foi selecionada no calendário, mostra essa data no botão de data do popup
        if (selectedDay) {
            downDateBtn.querySelector("button").textContent = `${selectedDay.day}/${selectedDay.month}`;
        }

        // Atualiza os dias no dropdown com base na data selecionada
        updateDropdownDays();
    });

    // Atualiza a data no botão de data do popup
    document.querySelectorAll(".dayPopUp a").forEach((dateOption) => {
        dateOption.addEventListener("click", (e) => {
            e.preventDefault();
            selectedDate = e.target.textContent; // Atualiza a data selecionada
            downDateBtn.querySelector("button").textContent = selectedDate; // Atualiza o botão
            dropdownDateMenu.classList.add("hidden"); // Fecha o menu de datas
        });
    });

    // Lógica para salvar a tarefa
    saveTaskBtn.addEventListener("click", () => {
        const taskName = document.getElementById("name").value;

        // Verifica se todos os campos estão preenchidos
        if (!taskName || !selectedDate) {
            alert("Por favor, preencha todos os campos antes de salvar a tarefa.");
            return;
        }

        const taskItem = document.createElement("button");
        taskItem.classList.add("task-btn", "mt-8");
        const taskContent = document.createElement("div");
        taskContent.classList.add("task-name");
        taskContent.textContent = `${taskName} - ${selectedDate}`;
        taskItem.appendChild(taskContent);
        taskItem.addEventListener("click", () => editTask(taskItem));

        // Adiciona a tarefa à lista
        document.querySelector(".flex.flex-col.items-center").appendChild(taskItem);

        newTaskPopUp.classList.add("hidden");
        resetPopup();
    });

    // Função de reset do popup
    function resetPopup() {
        document.getElementById("name").value = ""; // Reseta o input de nome da tarefa
    }

    // Função de edição de tarefa
    function editTask(taskElement) {
        const taskName = taskElement.querySelector(".task-name").textContent;
        document.getElementById("name").value = taskName;
        newTaskPopUp.classList.remove("hidden");
    }

});

