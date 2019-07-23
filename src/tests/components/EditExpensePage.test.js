import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

// from jest docs, executed before each test
beforeEach(() => {
    // spies functions
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    // render component
    wrapper = shallow(
        <EditExpensePage 
            startEditExpense={startEditExpense} 
            startRemoveExpense={startRemoveExpense}
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

    expect(startEditExpense).toHaveBeenLastCalledWith(expenses[2].id, expenses[2]);
});

test('Test EditExpense page handle remove expense', () => {
    wrapper.find('button').simulate('click');
    
    expect(history.push).toHaveBeenLastCalledWith('/');

    expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[2].id });
});
