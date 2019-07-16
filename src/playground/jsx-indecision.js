console.log('React app is runnong...');

// JSX - Javascript XML
const templateOne = (
    <div>
        <h1>This is JSX from app.js changed</h1>
        <p>This is some info.</p>
        <p></p>
        <ul>
            <li>item 1</li>
            <li>item 2</li>
        </ul>
    </div>
);

const userName = 'Bimba R.I.P.';
const userAge = 7;
const userLocation = 'Vinkuran, Pula, Croatia';

const user = {
    name : 'Bimba R.I.P.',
    age : 7,
    location : 'Vinkuran, Pula, Croatia'
};

const templateTwo = (
    <div>
        <h1>{user.name.toUpperCase()}</h1>
        {(user.age && user.age >= 6) && <p>Age: {user.age}</p>}
        <p>Location: {user.location}</p>
    </div>
);

function getLocation(location) {
    if (location) {
        return <p>Location {location}</p>;
    }
}

const app = {
    title : 'Indecision App',
    subtitle : 'Put your life in the hands of the computer',
    options : []
};

const onFormSubmit = (e) => {
    e.preventDefault();

    // field value
    const option = e.target.elements.option.value;

    if (option) {
        //console.log('form submit');
        app.options.push(option);
        e.target.elements.option.value = '';
        initializeApp();
    }
};

let count = 0;
const plusId = "plusId";
const minusId = "minusId";
const resetId = "resetId";

const addOne = () => {
    count++;
    console.log('addOne ', count);
    renderCounterApp();
};
const minusOne = () => {
    count--;
    console.log('minusOne ', count);
    renderCounterApp();
};
const reset = () => {
    count = 0;
    console.log('reset ', count);
    renderCounterApp();
};

const appRootOne = document.getElementById('appOne');
const appRootTwo = document.getElementById('appTwo');
const appRootThree = document.getElementById('appThree');
const appRootFour = document.getElementById('appFour');

ReactDOM.render(templateOne, appRootOne);
ReactDOM.render(templateTwo, appRootTwo);

const onRemoveAllOptions = () => {
    app.options = [];
    console.log('delete options ', app.options.length);
    initializeApp();
};

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    console.log(randomNum, option);
};

const initializeApp = () => {
    const templateThree = (
        <div>
            <h1>{app.title ? app.title : 'unknown'}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            {getLocation(user.location)}
            <p>{app.options.length > 0 ? 'Your options : ' + app.options.length : 'No options available'}</p>
            <button disabled={app.options.length === 0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAllOptions}>Remove All</button>
            <ol>
                {
                    /* map over options array and display as lit itmes*/
                    app.options.map((option) => {
                        return <li key={option}>{option}</li>;
                    })
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add option</button>
            </form>
        </div>
    );

    ReactDOM.render(templateThree, appRootThree);
};

const renderCounterApp = () => {
    const templateFour = (
        <div>
            <h1>Count : {count}</h1>
            <button id={plusId} className="button" onClick={addOne}>+ 1</button>
            <button id={minusId} className="button" onClick={minusOne}>- 1</button>
            <button id={resetId} className="button" onClick={reset}>Reset</button>
        </div>
    );
    //console.log(templateFour);
    ReactDOM.render(templateFour, appRootFour);
};

initializeApp();
renderCounterApp();