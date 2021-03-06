import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Test expenses total selector, should return 0 if no expenses', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('Test expenses total selector, add a single expense', () => {
    const res = selectExpensesTotal([expenses[0]]);
    expect(res).toBe(100); // expense amount
});

test('Test expenses total selector, add multiple expenses', () => {
    const res = selectExpensesTotal(expenses);
    expect(res).toBe(479700); // sum of individual amounts
});