document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculateBtn");
    const dateInput = document.getElementById('date')
    const timeInInput = document.getElementById("timeIn");
    const timeOffInput = document.getElementById("timeOff");
    const timeAppInput = document.getElementById('timeApp')
    const salaryInput = document.getElementById('hourSalary')
    const appSalaryInput = document.getElementById('appSalary')
    const result = document.getElementById("result");

    calculateBtn.addEventListener("click", function () {
        const timeIn = new Date(`${dateInput.value}T${timeInInput.value}:00`);
        const timeOff = new Date(`${dateInput.value}T${timeOffInput.value}:00`);
        const timeApp = new Date(`${dateInput.value}T${timeAppInput.value}:00`);
        const hourlyRate = parseFloat(salaryInput.value);
        const appSalary = parseFloat(appSalaryInput.value);

        if (isNaN(timeIn.getTime()) || isNaN(timeOff.getTime()) || isNaN(hourlyRate) || isNaN(timeApp.getTime()) || isNaN(appSalary) || (timeIn.getTime() > timeOff.getTime())) {
            result.textContent = "Invalid time input";
        } else {
            const timeBeforeApp = Math.abs(timeApp - timeIn);
            const timeAfterApp = Math.abs(timeOff - timeApp);
            const hoursBeforeApp = Math.abs(timeBeforeApp / (1000 * 60 * 60));
            const hoursAfterApp = Math.abs(timeAfterApp / (1000 * 60 * 60));
            const hourlypayBeforeApp = Math.abs(hoursBeforeApp * hourlyRate);
            const hourlypayAfterApp = Math.abs(hoursAfterApp * (hourlyRate + appSalary));
            const allPay = Math.abs(hourlypayBeforeApp + hourlypayAfterApp);


            result.textContent = `You have made ${allPay} before taxes for the day`;

        }
    });
});
