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
// ADD_EXPENSE - changes redux store
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense: expense
});

// saving data to db - async action
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

// REMOVE_EXPENSEc
export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// removing expense from db - async action
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch) => {
        // remove data
        return database.ref(`expenses/${id}`).remove().then(() => {
            // dispatch data
            dispatch(removeExpense({ id }));
        });
    };
};

// EDIT_EXPENSE - changes redux store
export const editExpense = ((id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
}));

// SET_EXPENSES - expenses array from db
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// Fetch the data from db and dispatch - async action
export const startSetExpenses  = (expenseData = {}) => {
    return (dispatch) => {
        // 1. fetching data arrays once
        return database.ref('expenses').once('value').then((snapshot) => {
            const expenses = [];
            console.log(snapshot.val());
            
            // 2. parse data into array
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            console.log(expenses);
            // 3. dispatch set_expenses
            dispatch(setExpenses(expenses));
        });
    };
};
