// Export a stateless functional component
// description, amount, createdAt

import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import '../locales/hr';
import numeral from 'numeral';

numeral.locale('hr');

export const ExpenseListItem = ({ dispatch, id, description, amount, createdAt}) => (
    <div>
        <Link to={`/edit/${id}`}>
            <h3>{description}</h3>
        </Link>
        <p>
            {numeral(amount / 100).format()} 
             - 
            {moment(createdAt).format('DD.MM.YYYY.')}
        </p>
    </div>
);

export default ExpenseListItem;
