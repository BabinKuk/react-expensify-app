class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.addOne = this.addOne.bind(this); // set this
        this.minusOne = this.minusOne.bind(this); // set this
        this.reset = this.reset.bind(this); // set this
        // default object state
        this.state = {
            count : props.count
        }
    }

    // lifecycle methods
    componentDidMount() {
        const stringCount = localStorage.getItem('count');
        const count = parseInt(stringCount, 10);

        if (!isNaN(count)) {
            this.setState(() => ({ count : count }));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('saving data if counter changed');
        if (prevState.count !== this.state.count) {
            // save to localstorage
            localStorage.setItem('count', this.state.count);
        }
    }

    addOne() {
        console.log('plus');
        this.setState((prevState) => {
            return {
                count : prevState.count + 1
            };
        });
    }

    minusOne() {
        console.log('minus');
        this.setState((prevState) => {
            return {
                count : prevState.count - 1
            };
        });
    }

    reset() {
        console.log('reset');
        this.setState(() => {
            return {
                count : 0
            };
        });
    }

    render() {
        return (
            <div>
                <h1>Count : {this.state.count}</h1>
                <button className="button" onClick={this.addOne}>+ 1</button>
                <button className="button" onClick={this.minusOne}>- 1</button>
                <button className="button" onClick={this.reset}>Reset</button>
            </div>
        );
    }
}

// default value
Counter.defaultProps = {
    count : 0
};

ReactDOM.render(<Counter />, document.getElementById('app'));