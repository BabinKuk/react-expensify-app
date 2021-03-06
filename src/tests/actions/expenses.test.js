import configureMockStore from 'redux-mock-store';
import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

// test uid
const uid = 'testuid';

const defaultAuthState = {
    auth: { uid }
};

// A mock store for testing Redux async actions
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, amount, note, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done());
});

test('Test actions remove expense', () => {
    const action = removeExpense({ id: '123abc' });

    // for test objects/arrays use toEqual
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('Test actions remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[2].id;
    
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        
        // test dispatch
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        // test if data is removed from db
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(null);
        done();
    });
});

test('Test actions edit expense', () => {
    const action = editExpense('123abc', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('Test actions edit expense in firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {
        amount: 5555
    };

    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        
        // test dispatch
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        // test if data is updated in db
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

test('Test actions add expense with provided data', () => {
    const expenseData = expenses[2];
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenseData
    });
});

// not used with firebase
// test('Test actions add expense (default values)', () => {
//     const action = addExpense({});
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             amount: 0,
//             createdAt: 0,
//             note: ''
//         }
//     });
// });

test('Test actions add expense to firebase and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'Novo',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        
        // test dispatch
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        // test if data is stored into db
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('Test actions add expense to firebase and store defaults', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefault = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense(expenseDefault)).then(() => {
        const actions = store.getActions();
        
        // test dispatch
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });
        // test if data is stored into db
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
    });
});

test('Test actions setup set expense action object with data ', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('Test actions fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();

        // test dispatch
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});