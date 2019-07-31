import React from 'react';
import { connect} from 'react-redux';
import { startGoogleLogin, startGithubLogin } from '../actions/auth';

export const LoginPage = ({ startGoogleLogin, startGithubLogin }) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify App</h1>
            <p>It's time to get your expenses under control.</p>
            <div className="box-layout__buttons">
                {/*<button onClick={startGoogleLogin} className="button">
                    <img src=""></img>
                </button>
                <button onClick={startGithubLogin} className="button">
                    Login with Git
                </button>*/}
                <img src="./images/google-64x.png" onClick={startGoogleLogin} className="button--login" alt="Login with Google"></img>
                <img src="./images/GitHub-Mark-64px.png" onClick={startGithubLogin} className="button--login" alt="Login with Github"></img>
            </div>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startGoogleLogin: () => dispatch(startGoogleLogin()),
    startGithubLogin: () => dispatch(startGithubLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);

