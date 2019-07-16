console.log('redux-expensify');

import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

// Actions
// ADD_EXPENSE
const addExpense = ({ description = '', note = '', amount = 0, createdAt = 0 } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// EDIT_EXPENSE
const editExpense = ((id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
}));

// SET_TEXT_FILTER
const setTextFilter = ((text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
}));

// SORT_BY_DATE
const sortByDate = (() => ({
    type: 'SORT_BY_DATE'
}));

// SORT_BY_AMOUNT
const sortByAmount = (() => ({
    type: 'SORT_BY_AMOUNT'
}));

// SET_START_DATE
const setStartDate = ((startDate) => ({
    type: 'SET_START_DATE',
    startDate
}));

// SET_END_DATE
const setEndDate = ((endDate) => ({
    type: 'SET_END_DATE',
    endDate
}));

// expenses reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            // spread array, add new expense
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            // remove from array
            return state.filter(({ id }) => {
                return id !== action.id; 
            });
        case 'EDIT_EXPENSE':
            // loop array and change the match
            return state.map((expense) => {
                if (expense.id === action.id) {
                    // change
                    // spread object with existing and new properties
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    // no change
                    return expense;
                }
            });
        default:
            return state;
    }
};

// filters reducer
const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        // new filters obj: spread existing filter with new properties
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        // check if dates are valid
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
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

// Store creation
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    // all expenses
    const state = store.getState();
    console.log('state', state);
    // visible expenses
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log('visibleExpenses', visibleExpenses);

});

const expenseOne = store.dispatch(addExpense({ description : 'Rezije', note: '1', amount : 1000, createdAt: -10000 }));
console.log('expenseOne', expenseOne);
const expenseTwo = store.dispatch(addExpense({ description : 'Vecera', note: '2', amount : 50000, createdAt: -1000 }));
console.log('expenseTwo', expenseTwo);

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 200 }));

// store.dispatch(setTextFilter('Vecera'));
// store.dispatch(setTextFilter(''));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(300));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(-4320));
// store.dispatch(setEndDate());

const demoState = {
    expenses: [{
        id: '123456',
        description: 'Stanarina 01/2019',
        note: 'Zadnja uplata',
        amount: 3000,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', // amount or date
        startDate: undefined,
        endDate: undefined
    }
};

const user = {
    name: 'Zlata',
    age: 7
};

// spread object
console.log({
    ...user,
    location: 'vinkuran',
    //override age
    age: 8
});