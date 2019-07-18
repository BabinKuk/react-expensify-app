import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('Test render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);

    expect(wrapper).toMatchSnapshot();
});

test('Test render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);

    expect(wrapper).toMatchSnapshot();
});

test('Test render ExpenseForm invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    // simulate event
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {} // empty function
    });

    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('Test render ExpenseForm set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    // simulate event, description is the 2nd input field [0]
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });

    expect(wrapper.state('description')).toBe(value);
});

test('Test render ExpenseForm set note on textarea change', () => {
    const value = 'New textarea note';
    const wrapper = shallow(<ExpenseForm />);
    // simulate event, textarea
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });

    expect(wrapper.state('note')).toBe(value);
});

test('Test render ExpenseForm set valid amount', () => {
    const value = '22.50';
    const wrapper = shallow(<ExpenseForm />);
    // simulate event, input [1]
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });

    expect(wrapper.state('amount')).toBe(value);
});

test('Test render ExpenseForm set invalid amount', () => {
    const value = '22.133';
    const wrapper = shallow(<ExpenseForm />);
    // simulate event, input [1]
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });

    expect(wrapper.state('amount')).toBe('');
});

test('Test ExpenseForm onSubmit prop for valid from submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    // simulate event
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {} // empty function
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('Test expenseForm set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('Test expenseForm to set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});