import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('Test setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});

    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Test setup sortBy amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('Test setup sortBy date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount '
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);

    expect(state.sortBy).toBe('date');
});

test('Test setup text filter', () => {
    const text = 'Text filter';
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    };
    const state = filtersReducer(undefined, action);

    expect(state.text).toBe(text);
});

test('Test setup startDate filter', () => {
    const startDate= moment();
    const action = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filtersReducer(undefined, action);

    expect(state.startDate).toEqual(startDate);
});

test('Test setup endDate filter', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filtersReducer(undefined, action);

    expect(state.endDate).toEqual(endDate);
});