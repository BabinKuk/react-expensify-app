import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

// expense list item takes in the expense and renders it 
test('Test render ExpenseListItem with expense.id=1', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});