console.log('build it visible');

const app = {
    title : 'Visibility Toggle App',
    subtitle : 'Hi! How you\'re doin\'?',
    buttonHide : 'Hide Details',
    buttonShow : 'Show Details'
};

class VisibilityToggle extends React.Component {

    constructor(props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.state = {
            visibility : false
        };
    }

    toggleVisibility() {
        console.log('toggle');
        this.setState((prevState) => {
            return {
                visibility : !prevState.visibility
            };
        });
    };
    render() {
        return (
            <div>
                <h1>{app.title ? app.title : 'Unknown'}</h1>
                <button onClick={this.toggleVisibility}>
                    {this.state.visibility ? app.buttonHide : app.buttonShow}
                </button>
                {this.state.visibility && (
                    <div>
                        <p>{app.subtitle}</p>
                    </div>
                )}
            </div>
        );
    }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));

// const app = {
//     title : 'Visibility Toggle App',
//     subtitle : 'Hi! How you\'re doin\'?',
//     buttonHide : 'Hide Details',
//     buttonShow : 'Show Details'
// };

// let visible = false;

// const appRoot = document.getElementById('appOne');

// const toggleVisibility = () => {
//     visible = !visible;
//     initApp();
// };

// const initApp = () => {
//     const template = (
//         <div>
//             <h1>{app.title ? app.title : 'Unknown'}</h1>
//             <button onClick={toggleVisibility}>
//                 {visible ? app.buttonHide : app.buttonShow}
//             </button>
//             {visible && (
//                 <div>
//                     <p>{app.subtitle}</p>
//                 </div>
//             )}
//         </div>
//     );

//     ReactDOM.render(template, appRoot);
// };

// initApp();
