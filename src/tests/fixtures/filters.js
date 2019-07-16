import moment from 'moment';

// dummy test data
const filters = {
    test: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const altFilters = {
    test: 'voda',
    sortBy: 'amount',
    startDate: moment(0),
    endDate: moment(0).add(3, 'days')
};

export { filters, altFilters };
