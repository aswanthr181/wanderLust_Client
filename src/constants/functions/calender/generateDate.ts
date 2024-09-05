
interface type {
    month: number
    year: number
}
export const generateDate = ({ month, year }: type) => {
    console.log(month, year, '5252522');

    const firstDateOfMonth = new Date(year, month, 1);
    const lastDateOfMonth = new Date(year, month + 1, 0);

    const arrayOfDate = []
    const firstDayOfWeek = firstDateOfMonth.getDay()
    // create prefix date
    for (let i = 0; i < firstDayOfWeek; i++) {
        const date = new Date(year, month, -i);
        arrayOfDate.unshift({
            currentMonth: false,
            date: date,
        })
    }

    // generate current date
    for (let i = 1; i <= lastDateOfMonth.getDate(); i++) {
        const date = new Date(year, month, i);
        arrayOfDate.push({
            currentMonth: true,
            date: date,
            today: date.toDateString() === new Date().toDateString(),
        });
    }

    const remaining = 42 - arrayOfDate.length;

    for (let i = 1; i <= remaining; i++) {
        const date = new Date(year, month + 1, i);
        arrayOfDate.push({
            currentMonth: false,
            date: date,
        });
    }
    return arrayOfDate;
};

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];