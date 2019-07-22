import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let startAddExpense, history, wrapper;

// from jest docs, executed before each test
beforeEach(() => {
    // spies functions
    startAddExpense = jest.fn();
    history = { push: jest.fn() };

    wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history} />);
});

test('Test render AddExpense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Test AddExpense handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
