import moment from 'moment';

// dummy test data
export default [{
    id: '1',
    description: 'voda',
    note: '',
    amount: 100,
    createdAt: 0
}, {
    id: '2',
    description: 'plin',
    note: '',
    amount: 134500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'struja',
    note: '',
    amount: 345100,
    createdAt: moment(0).add(4, 'days').valueOf()
}];
