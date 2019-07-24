import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <p><NavLink activeClassName="is-active" to="/dashboard" exact={true}>Dashboard</NavLink></p>
        <p><NavLink activeClassName="is-active" to="/create">Create</NavLink></p>
        <p><NavLink activeClassName="is-active" to="/help">Help</NavLink></p>
        <button onClick={startLogout}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
