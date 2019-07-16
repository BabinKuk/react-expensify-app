import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let addExpense, history, wrapper;

// from jest docs, executed before each test
beforeEach(() => {
    // spies functions
    addExpense = jest.fn();
    history = { push: jest.fn() };

    wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history} />);
});

test('Test render AddExpense page', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Test AddExpense handle onSubmit', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
    
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});
