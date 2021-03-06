console.log('app.js running');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

// addExpenses dummy test data
//store.dispatch(addExpense({ description: 'Racun Voda', amount: 300, createdAt: 300 }));
//store.dispatch(addExpense({ description: 'Racun Benzin', createdAt: -1000 }));
//store.dispatch(addExpense({ description: 'Racun Stanarina', amount: 150000 }));

// setFilterText
// store.dispatch(setTextFilter('voda'));

// test, rerender page after 3s with fresh new data in the store
// setTimeout(() => {
//     store.dispatch(setTextFilter('benz'));
// }, 3000);

const state = store.getState();
console.log('state', state);

// dummy test data
// visibleExpenses
//const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//console.log('visibleExpenses', visibleExpenses);

const jsx = (
    // provide store to all of the components
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// render app only once
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('logged in', user);
        
        // dispatch login action
        store.dispatch(login(user.uid));

        // fetch data from db and render app 
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            // redirect if on login page only!!
            if (history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
        
    } else {
        console.log('logged out');
        // dispatch logout action
        store.dispatch(logout());

        // render app
        renderApp();
        
        // redirect to login page
        history.push('/');
    }
});