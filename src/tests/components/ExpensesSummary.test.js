import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Test ExpensesSummary with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={12345} />);
    expect(wrapper).toMatchSnapshot();
});

test('Test ExpensesSummary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={3} expensesTotal={1234567890} />);
    expect(wrapper).toMatchSnapshot();
});