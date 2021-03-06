import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import ExpenseModal from './ExpenseModal';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    state = {
        deleteSelected: undefined
    };

    onSubmit = (expense) => {
        //console.log('editExpense onSubmit');
        // sync with store
        //this.props.dispatch(editExpense(this.props.expense.id, expense));
        // sync with store THIS WAY!!!!!
        this.props.startEditExpense(this.props.expense.id, expense);
        // redirect page
        this.props.history.push('/');
    };

    onRemove = () => {
        console.log('remove', this.props.expense);
        // sync with store
        this.props.startRemoveExpense({ id: this.props.expense.id });
        // redirect page
        this.props.history.push('/');
    };

    handleRemove = () => {
        //console.log('handleRemove');
        //set state to set deleteSelected
        this.setState(() => ({
            deleteSelected: this.props.expense
        }));
    };

    handleClearSelectedExpense = () => {
        console.log('handleClearSelected');
        this.setState(() => ({
            deleteSelected: undefined
        }));
    }

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit Expense</h1>
                    </div>
                </div>
                <div className="content-container">
                    <ExpenseForm 
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />
                    <button className="button button--secondary" onClick={this.handleRemove}>Remove Expense</button>
                </div>
                <ExpenseModal
                    deleteSelected={this.state.deleteSelected}
                    handleClearSelectedExpense={this.handleClearSelectedExpense}
                    onRemove={this.onRemove}
                />
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
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);