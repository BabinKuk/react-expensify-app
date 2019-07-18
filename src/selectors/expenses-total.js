export default (expenses) => {
    // map turns array of objects into array of numbers/amounts
    // reducer function results in total sum of amounts
    return expenses.map((expense) => expense.amount).reduce((sum, value) => sum + value, 0);
};