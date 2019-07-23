import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Test reducers set default expense state, empty array', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual([]);
});

test('Test reducers remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    // return expenses array without expense[1]
    expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('Test reducers remove expense for id not found, expect nothing to be removed', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };
    const state = expensesReducer(expenses, action);
    // return expenses array
    expect(state).toEqual(expenses);
});

test('Test reducers add expense', () => {
    const expense = {
            id: '111',
            description: 'test',
            note: 'test',
            amount: 10000,
            createdAt: 30000
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    // return expenses array with added expense
    expect(state).toEqual([ ...expenses, expense ]);
});

test('Test reducers edit expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[2].id,
        updates: {
            note: 'Test note',
            amount: '9999',
            description: 'test desc' 
        }
    };
    const state = expensesReducer(expenses, action);
    // return edited expense
    expect(state[2]).toEqual({...state[2], ...action.updates});
});

test('Test reducers edit expense for id not found, expect nothing to be edited', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-33',
        updates: {
            note: 'Test note',
            amount: '9999',
            description: 'test desc' 
        }
    };
    const state = expensesReducer(expenses, action);
    // no changes to expenses array
    expect(state).toEqual(expenses);
});

test('Test reducers set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);

    expect(state).toEqual([expenses[1]]);
});