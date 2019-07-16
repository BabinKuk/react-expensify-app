import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters} from '../../components/ExpenseListFilters';
import { filters, altFilters} from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    // spies
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    // render component
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('Test render ExpenseListFilters', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Test ExpenseListFilters with alt data', () => {
    // change filters
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('Test ExpenseListFilters handle text change', () => {
    const value = 'struja';
    // simulate event
    wrapper.find('input').simulate('change', {
        target: { value }
    });

    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('Test ExpenseListFilters handle sort by date', () => {
    const value = 'date';
    // change filters from date to amount
    wrapper.setProps({
        filters: altFilters
    });
    // simulate event and change
    wrapper.find('select').simulate('change', {
        target: { value }
    });

    expect(sortByDate).toHaveBeenCalled();
});

test('Test ExpenseListFilters handle sort by amount', () => {
    const value = 'amount';
    
    // simulate event and change
    wrapper.find('select').simulate('change', {
        target: { value }
    });

    expect(sortByAmount).toHaveBeenCalled();
});

test('Test ExpenseListFilters handle date changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    
    // simulate event and change
    wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate, endDate });

    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('Test ExpenseListFilters handle date focus change', () => {
    const calendarFocused = 'endDate';
    
    // simulate event and change
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);

    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
