import { createStore } from 'redux';

console.log('redux101');

// Action generators - functions that return action objects

// set default incrementBy/decrementBy if not provided 
const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy: decrementBy
});

const setCount = ({ count }) => ({
    type: 'SET',
    count: count
});

const resetCount = () => ({
    type: 'RESET'
});

// reducer functions
// 1. reducers are pure functions
// 2. never change state or action
const countReducer = (state = {count:0}, action) => {
    console.log('store');
    switch (action.type) {
        case 'INCREMENT':
            // ne treba const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return {
                count: state.count + action.incrementBy
            }
        case 'DECREMENT':
            // ne treba const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return {
                count: state.count - action.decrementBy
            }
        case 'RESET':
            return {
                count: 0
            }
        case 'SET':
            return {
                count: action.count
            } 
        default:
            return state;
    }
};

// with default state
const store = createStore(countReducer());

console.log(store.getState());

// listener for store changes
const unsubscribe = store.subscribe(() => {
    console.log('unsubscribe', store.getState());
});

// actions: change redux store values
// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });
store.dispatch(incrementCount({ incrementBy: 5 }));

console.log(store.getState()); // 5

store.dispatch(incrementCount());

// store.dispatch({
//     type: 'DECREMENT'
// });
store.dispatch(decrementCount());

console.log(store.getState()); // 4

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });
store.dispatch(decrementCount({ decrementBy: 10 }));

console.log(store.getState()); // -10

// store.dispatch({
//     type: 'RESET'
// });
store.dispatch(resetCount());

console.log(store.getState()); // 0

// store.dispatch({
//     type: 'SET',
//     count: 100
// });
store.dispatch(setCount({ count: 100 }));