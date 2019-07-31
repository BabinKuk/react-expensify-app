import moment from 'moment';

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        // check if dates are valid
        //const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        //const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        // check dates using moment.js
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;

        // figure out if description has the text variable string inside of it
        // using includes and tolowercase
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        //display if all three match
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            // recent date first
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            // greater amount first
            return a.amount < b.amount ? 1 : -1;
        }
    });
};


export { getVisibleExpenses };