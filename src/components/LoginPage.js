import React from 'react';
import { connect} from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify App</h1>
            <p>It's time to get your expenses under control.</p>
            <button onClick={startLogin} className="button">Login with Google</button>
            {/*<button onClick={startGitLogin} className="button">Login with Git</button>*/}
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
    //startGitLogin: () => dispatch(startGitLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

