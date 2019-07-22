import uuid from 'uuid';
import database from '../firebase/firebase';

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// with firebase and async redux actions
// component calls action generator
// action generator returns function
// component dispatches function
// function runs (has the ability to dispatch other functions amd do other things)

// Actions
// ADD_EXPENSE
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense: expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        // destructure data and set default
        const { description = '', note = '', amount = 0, createdAt = 0 } = expenseData;
        const expense = { description, note, amount, createdAt };

        // access firebase and save data
        return database.ref('expenses').push(expense).then((ref) => {
            // dispatch data
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
export const editExpense = ((id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
}));