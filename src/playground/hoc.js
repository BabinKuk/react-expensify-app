// Higher Order Component (HOC) Pattern 
// A component that renders another component:
// 1. Reusing Code
// 2. Props manipulation
// 3. Abstract state

console.log('hoc');

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    // return HOC
    return (props) => (
        <div>
            {props.isAdmin && <p>This is Private Info. Don't share!!</p>}
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    // HOC
    return (props) => (
        <div>
            {props.isAuthenticated ? (
                <div>
                    <p>This is Private Info. Don't share!!</p>
                    <WrappedComponent {...props}/>
                </div>
            ) : (
                <div>
                    <p>Please log in to see the data!!</p>
                </div>
            )}
        </div>
    );
};

// requireAuthentication
const AuthInfo = requireAuthentication(Info); 

// new component
const AdminInfo = withAdminWarning(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info='My details' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info='My details' />, document.getElementById('app'));
