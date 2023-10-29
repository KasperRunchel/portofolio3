// Det øverste felt bruger jeg til at indsætte alt mit DOMContent.
// Altså er det her jeg henter ting fra min html og giver dem en const navn, så det er at jeg
// bruge dem til at programmere i javascript.
document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculateBtn");
    const timeYInput = document.getElementById("timeY");
    const timeOInput = document.getElementById("timeO");
    const dateYInput = document.getElementById("dateY");
    const dateOInput = document.getElementById("dateO");
    const result = document.getElementById("result");


    // Her bliver linjerne med information sat sammen til en const hver for sig.
    // String format for date i javascript er: YYYY-MM-DDTHH:mm:ss.sssZ
    // 1. YYYY-MM-DD – is the date: year-month-day.
    // 2. The character "T" is used as the delimiter.
    // 3. HH:mm:ss.sss – is the time: hours, minutes, seconds and milliseconds.
    // 4. The optional 'Z' part denotes the time zone in the format +-hh:mm
    calculateBtn.addEventListener("click", function () {
        const timeY = new Date(`${dateYInput.value}T${timeYInput.value}:00`);
        const timeO = new Date(`${dateOInput.value}T${timeOInput.value}:00`);


        //Her bliver der lavet et if statement hvoraf den første består af at hvis der bliver
        //indtastet ugyldig information (isNaN = is Not a Number) skal calculateren fortælle at
        // det er invalid input.
        if (isNaN(timeY.getTime()) || isNaN(timeO.getTime())) {
            result.textContent = "Invalid time input";


            //Her vil der blive beskrevet hvordan tidsregningen foregår.
            // ** Der vil forekomme et eksempel, hvor timediff er = 200.000.000 som er markeret med '**'

        } else {
            // Her trækker man den ene tid fra den anden for at få en tidsforskel.
            // Math.abs = The math. abs() function is used to return the absolute value in JavaScript.
            // It negates the native sign of a number and returns the relevant positive value
            const timeDiff = Math.abs(timeO - timeY);

            // math.floor runder altid ned til hele tal.
            // her dividere vi tidsforskellen i milisekunder med en formel som giver os hvor mange milisekunder
            //der går på et år:
            const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365.25));

            // math.floor runder altid ned til hele tal.
            // Her laver man først en timediff % hvor '%' dividere det med formlen ved siden af i hele tal og
            // efterlader os resten.
            // ** 200.000.000 / (1000ms til s * 60s til m * 60m til h * 24h til d)
            // ** 200.000.000 / (86.400.000 ms på en dag) = 2,31 + math.floor = 2 dage.
            const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));


            // ** 200.000.000 % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)
            // ** 200.000.000 % (86.400.000) / (3.600.000)
            // ** (200.000.000 / 86.400.000 = 2,31) så runder vi resultatet til nederste hele tal = 2:
            // ** (200.000.000 - (86.400.000 * 2)) / (3.600.000)
            // ** (200.000.000 - 172.800.000) / 3.600.000
            // ** 27.200.000 / 3.600.000 = 7,55 så runder vi ned pga math.floor = 7 timer.
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

            // Her gør vi det hele igen, bare med timer istedet for dage og efterfølgende
            // med tager vi de resterende minutter.
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

            result.textContent = `Time difference: ${years} year, ${days} days, ${hours} hours, and ${minutes} minutes`;
        }
    });
});
