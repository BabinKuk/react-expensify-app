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

export default expensesReducer;