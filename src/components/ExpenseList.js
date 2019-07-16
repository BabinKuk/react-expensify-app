import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses found</p>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />
                })
            )
        }
    </div>
);

const mapStateToProps = (state) => {
    // display selected data
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

// HOC with props from the store
export default connect(mapStateToProps)(ExpenseList);
