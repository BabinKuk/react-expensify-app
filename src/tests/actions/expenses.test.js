import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Testing remove expense', () => {
    const action = removeExpense({ id: '123abc' });

    // for test objects/arrays use toEqual
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('Test edit expense', () => {
    const action = editExpense('123abc', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('Test add expense', () => {
    const expenseData = {
        description: 'Test expense',
        amount: 123456,
        createdAt: 10000,
        note: 'Test note'
    };

    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String) 
        }
    });
});

test('Test add expense (default values)', () => {
    const action = addExpense({});
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            amount: 0,
            createdAt: 0,
            note: ''
        }
    });
});