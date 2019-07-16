class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options : props.options //['option 1', 'option 2', 'option 4']
        };
    }

    // lifecycle methods (accessible only in class components)
    componentDidMount() {
        try {
            console.log('comp did mount, fetch data');
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            //console.log(options);
            // display on screen
            if (options) {
                this.setState(() => ({options : options}));
            }
        } catch (error) {
            // do nothing at all
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            console.log('comp did update, save data');
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    componentWillUnmount() {
        console.log('comp will unmount');
    }

    handleDeleteOptions() {
        this.setState(() => ({ options : [] }));
    }

    handleDeleteOption(optionToRemove) {
        console.log('delete option ', option);
        this.setState((prevState) => {
            options : prevState.options.filter((option) => {
                return optionToRemove !== option; // remove from array
            })
        });
    }

    handlePick() {
        //alert('handle pick');
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    handleAddOption(option) {
        console.log(option);
        
        if (!option) {
            return 'Enter valid option';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({
            options : prevState.options.concat(option)
        }));
    }
    
    render() {
        const title = "Indecision App";
        const subtitle = "Put your life in the hands of computer";
        //const options = ['option 1', 'option 2', 'option 3'];
        
        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action 
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options 
                    options={this.state.options}
                    handleDeleteOptions = {this.handleDeleteOptions}
                    handleDeleteOption = {this.handleDeleteOption}
                />
                <AddOption 
                    handleAddOption={this.handleAddOption}
                />
            </div>
        );
    };
}

// default props values
IndecisionApp.defaultProps = {
    options : []
};

// converted into stateless functional component
// class Header extends React.Component {
//     render() {
//         //console.log(this.props);
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }
const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

// default prop values
Header.defaultProps = {
    title : 'Indecision'
};

// converted into stateless functional component
// class Action extends React.Component {
//     // handlePick() {
//     //     console.log('handle');
//     // }

//     render() {
//         return  (
//             <div>
//                 <button 
//                     onClick={this.props.handlePick}
//                     disabled={!this.props.hasOptions}
//                 >
//                     What should I do?
//                 </button>
//             </div>
//         );
//     }
// }
const Action = (props) => {
    return  (
        <div>
            <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
            >
                What should I do?
            </button>
        </div>
    );
};

// converted into stateless functional component
// class Options extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.onRemoveAll = this.onRemoveAll.bind(this); // set this
//     // }
    
//     // onRemoveAll() {
//     //     console.log('onRemoveAll', this.props.options);
//     // }

//     render() {
//         return  (
//             <div>
//                 <button onClick={this.props.handleDeleteOptions}>Remove All</button>
//                 <ol>
//                     {this.props.options.map((option) => <Option key={option} optionText={option} />)}
//                 </ol>
//             </div>
//         );
//     }
// }
const Options = (props) => {
    return  (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length && <p>Please add an option to get started</p>}
            {
                props.options.map((option) => (
                    <Option 
                        key={option} 
                        optionText={option} 
                        handleDeleteOption={props.handleDeleteOption}
                    />
                ))
            }
        </div>
    );
};

// converted into stateless functional component
// class Option extends React.Component {
//     render() {
//         return  (
//             <div>
//                 <li>Option: {this.props.optionText}</li>
//             </div>
//         );
//     }
// }
const Option = (props) => {
    return  (
        <div>
            <li>
                {props.optionText}
                <button 
                    onClick={(e) => {
                        props.handleDeleteOption(props.optionText)
                    }}
                >
                    Remove
                </button>
            </li>
        </div>
    );
};

class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error : undefined
        };
    }

    handleAddOption(e) {
        console.log('onFormSubmit');
        e.preventDefault();

        // field value
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        
        this.setState(() => ({ error : error }));

        // clear input if there was no error
        if (!error) {
            e.target.elements.option.value = '';
        }
    }

    render() {
        return  (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add option</button>
                </form>
            </div>
        );
    }
}

// stateless functional component
const User = () => {
    return (
        <div>
            <p>Name : </p>
            <p>Age : </p>
        </div>
    );
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));