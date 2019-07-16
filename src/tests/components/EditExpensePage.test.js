import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let editExpense, removeExpense, history, wrapper;

// from jest docs, executed before each test
beforeEach(() => {
    // spies functions
    editExpense = jest.fn();
    removeExpense = jest.fn();
    history = { push: jest.fn() };
    // render component
    wrapper = shallow(
        <EditExpensePage 
            editExpense={editExpense} 
            removeExpense={removeExpense}
            history={history} 
            expense={expenses[2]}
        />
    );
});

test('Test render EditExpense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Test EditExpense page handle edit expense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    
    expect(history.push).toHaveBeenLastCalledWith('/');

    expect(editExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('Test EditExpense page handle remove expense', () => {
    wrapper.find('button').simulate('click');
    
    expect(history.push).toHaveBeenLastCalledWith('/');

    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});
