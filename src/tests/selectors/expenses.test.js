import getVisibleExpenses, {} from '../../selectors/expenses';
import moment from 'moment';
import expenses from '../fixtures/expenses';

test('Test expenses selector, filter by text', () => {
    const filters = {
        text: 'a',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const result = getVisibleExpenses(expenses, filters);

    expect(result).toEqual([ expenses[2], expenses[0] ]);
});

test('Test expenses selector, filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };

    const result = getVisibleExpenses(expenses, filters);

    expect(result).toEqual([ expenses[2], expenses[0] ]);
});

test('Test expenses selector, filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    };

    const result = getVisibleExpenses(expenses, filters);

    expect(result).toEqual([ expenses[0], expenses[1] ]);
});

test('Test expenses selector, sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };

    const result = getVisibleExpenses(expenses, filters);

    expect(result).toEqual([ expenses[2], expenses[0], expenses[1] ]);
});

test('Test expenses selector, sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };

    const result = getVisibleExpenses(expenses, filters);

    expect(result).toEqual([ expenses[2], expenses[1], expenses[0] ]);
});