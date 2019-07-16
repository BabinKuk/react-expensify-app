import { setStartDate, setEndDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';
import moment from 'moment';

test('Test start date', () => {
    const date = moment(1234567890);
    const action = setStartDate(date);

    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: date
    });
});

test('Test end date', () => {
    const date = moment(1234567890);
    const action = setEndDate(date);

    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: date
    });
});

test('Test text filter', () => {
    const text = 'Test text';
    const action = setTextFilter(text);

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text
    });
});

test('Test text filter (default)', () => {
    //const text = 'Test text';
    const action = setTextFilter();

    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});

test('Test sort by Date', () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('Test sort by Amount', () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});