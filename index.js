const highlightText = (text) => {
  return `\x1b[47m\x1b[30m${text}\x1b[0m`;
};

const formatDateOutput = (date, currentNumericalDate) => {
  const output = date.toString().length > 1 ? `${date}` : ` ${date}`;

  return date === currentNumericalDate ? highlightText(output) : output;
};

const daysOfTheWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getCalendarTitle = (totalCharacter, title) => {
  const spacers = (totalCharacter - title.length) / 2;

  return `${" ".repeat(Math.floor(spacers))}${title}`;
};

const generateCalendarData = (
  lastDateInCurrentMonth,
  currentYear,
  currentMonth
) => {
  // Create array of all dates in the month their corresponding index of the day of the week
  // eg Sunday would be index 0, Monday index 1 etc
  const datesInMonth = Array.from(
    { length: lastDateInCurrentMonth },
    (_, i) => i + 1
  ).map((date) => {
    return {
      weekdayIndex: new Date(currentYear, currentMonth, date).getDay(),
      date,
    };
  });

  // Create data structure with days of the week structured into individual arrays

  const calendar = [[...daysOfTheWeek]];
  for (let i = 1; i < lastDateInCurrentMonth; i++) {
    // get day of the week for each date in the month
    const weekIndex = new Date(currentYear, currentMonth, i).getDay();
    const currentWeek = calendar[calendar.length - 1];
    // If currently week has been populated by dates, push week to calendar
    if (currentWeek[6] !== " ") {
      calendar.push(Array(7).fill(" "));
    }
    // Populate week array with dates in correct index for day of week
    calendar[calendar.length - 1][weekIndex] = i;
  }
  return calendar;
};

// Funtion to print calendar to the console based on current date

(function printCalendarToConsole() {
  // Get current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("en-GB", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const currentNumericalDate = currentDate.getDate();

  // Get total number of days in current month
  const lastDateInCurrentMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  // Get calendar data
  const calendar = generateCalendarData(
    lastDateInCurrentMonth,
    currentYear,
    currentMonth
  );

  // Format calendar title
  const totalCharactersInRow = calendar[0].join(" ").length;
  const title = getCalendarTitle(
    totalCharactersInRow,
    `${monthName} ${currentYear}`
  );

  // Print calendar to the console
  console.log(title);
  calendar.forEach((week) =>
    console.log(
      week.map((d) => formatDateOutput(d, currentNumericalDate)).join(" ")
    )
  );
})();
