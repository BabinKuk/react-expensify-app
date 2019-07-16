import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        //console.log('editExpense onSubmit');
        // sync with store
        //this.props.dispatch(editExpense(this.props.expense.id, expense));
        // sync with store THIS WAY!!!!!
        this.props.editExpense(this.props.expense.id, expense);
        // redirect page
        this.props.history.push('/');
    };

    onRemove = () => {
        console.log('remove');
        // sync with store
        this.props.removeExpense({ id: this.props.expense.id });
        // redirect page
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Edit Expense</h1>
                <ExpenseForm 
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button onClick={this.onRemove}>Remove</button>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    // get expense with given id
    expense: state.expenses.find((expense) => {
        return expense.id === props.match.params.id;
    })
});

// abstract away dispatch from the component
const mapDispatchToProps = (dispatch, props) => ({
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    removeExpense: (data) => dispatch(removeExpense({ data }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);