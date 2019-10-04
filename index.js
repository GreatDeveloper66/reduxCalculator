/*global Redux*/
/*global combineReducers*/
/*global document*/
/*global setTimeout*/
/*global window*/
/*jshint esversion:6*/
/*global console*/

window.onload = () => {
  Array.from(document.querySelectorAll('.numeral')).forEach(function (elem) {
    elem.addEventListener("click", function () {
      store.dispatch(addKey(this.innerText));
    });
  });
  document.querySelector(".erase").addEventListener("click", function () {
    store.dispatch(erase(this.innerText));
  });
  document.querySelector(".bspace").addEventListener("click", function () {
    store.dispatch(bspace(this.innerText));
  });
  document.querySelector(".zero").addEventListener("click", function () {
    store.dispatch(addZero(this.innerText));
  });
  document.querySelector(".period").addEventListener("click", function () {
    store.dispatch(addPeriod(this.innerText));
  });
  Array.from(document.querySelectorAll(".operator")).forEach(function (elem) {
    elem.addEventListener("click", function () {
      store.dispatch(addOperator(this.innerText));
    });
  });
  document.querySelector(".open").addEventListener("click", function () {
    store.dispatch(addLeftParenthesis(this.innerText));
  });
  
  document.querySelector(".close").addEventListener("click", function () {
    store.dispatch(addRightParenthesis(this.innerText));
  });
 
  function buttonPressed(state, action) {
    if (typeof state === 'undefined') {
      return 0;
    }
    switch (action.type) {
      case 'ADD':
        return state.topDisplay === '0' ? Object.assign({}, state, {
          keyPressed: action.keyPressed,
          keysPressed: [...state.keysPressed, action.keyPressed].join(''),
          currentNumber: action.keyPressed,
          topDisplay: action.keyPressed,
          bottomDisplay: [...state.keysPressed, action.keyPressed].join(''),
          expression: [...state.keysPressed, action.keyPressed].join('')
        }) : Object.assign({}, state, {
          keyPressed: action.keyPressed,
          keysPressed: [...state.keysPressed, action.keyPressed],
          currentNumber: [...state.currentNumber, action.keyPressed].join(''),
          topDisplay: [...state.currentNumber, action.keyPressed].join(''),
          bottomDisplay: [...state.keysPressed, action.keyPressed].join(''),
          expression: [...state.keysPressed, action.keyPressed].join('')
        });
      case 'ADDZERO':
        return state.topDisplay === '0' ? state : Object.assign({}, state, {
          keyPressed: action.keyPressed,
          keysPressed: [...state.keysPressed, action.keyPressed],
          currentNumber: [...state.currentNumber, action.keyPressed].join(''),
          topDisplay: [...state.keysPressed, action.keyPressed].join(''),
          bottomDisplay: [...state.keysPressed, action.keyPressed].join(''),
          expression: [...state.keysPressed, action.keyPressed].join('')
        });
      case 'ERASE':
        return initialState;
      case 'BSPACE':
        return state.topDisplay.length === 1 ? state.bottomDisplay.length > 1 ?
          Object.assign({}, state, {
            keyPressed: action.keyPressed,
            currentNumber: '0',
            keysPressed: [...state.bottomDisplay.slice(0, -1)],
            topDisplay: '0',
            bottomDisplay: state.bottomDisplay.slice(0, -1),
            expression: state.bottomDisplay.slice(0, -2)
          }) :
          Object.assign({}, state, {
            keyPressed: action.keyPressed,
            currentNumber: '0',
            keysPressed: [],
            topDisplay: '0',
            bottomDisplay: '0',
            expression: '0'
          }) :
          Object.assign({}, state, {
            keyPressed: action.keyPressed,
            keysPressed: [...state.keysPressed.slice(0, -1)],
            currentNumber: [...state.currentNumber.slice(0, -1)],
            topDisplay: state.topDisplay.slice(0, -1),
            bottomDisplay: state.bottomDisplay.slice(0, -1),
            expression: state.bottomDisplay
          });
      case 'PERIOD':
        return state.topDisplay.includes('.') ? state : state.bottomDisplay === '0' ?
          Object.assign({}, state, {
            keyPressed: action.keyPressed,
            keysPressed: ['0', '.'],
            currentNumber: '0.',
            topDisplay: '0.',
            bottomDisplay: '0.',
            expression: '0'
          }) :
          Object.assign({}, state, {
            keyPressed: action.keyPressed,
            keysPressed: [...state.keysPressed, action.keyPressed],
            currentNumber: [...state.currentNumber, action.keyPressed].join(''),
            topDisplay: [...state.topDisplay, action.keyPressed].join(''),
            bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
            expression: state.currentNumber
          });
      case 'ADDOPERATOR':
        return ['+', '-', 'X', '/', '('].includes(state.bottomDisplay.slice(-1)) ?
          state :
          Object.assign({}, state, {
            keyPressed: action.keyPressed,
            keysPressed: [...state.keysPressed, action.keyPressed].join(''),
            currentNumber: '0',
            topDisplay: '0',
            bottomDisplay: [...state.keysPressed, action.keyPressed].join(''),
            expression: state.expression
          });
      case 'ALP':
        return ['X', '/', '+', '-', '('].includes(state.bottomDisplay.slice(-1)) ?
          Object.assign({}, state, {
            keyPressed: action.keyPressed,
            keysPressed: [...state.keysPressed, action.keyPressed].join(''),
            currentNumber: '0',
            topDisplay: '0',
            bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
            expression: [...state.bottomDisplay, action.keyPressed].join('')
          }) :
          state;
      case 'ARP':
        return ['X', '/', '+', '-', '(', ')'].includes(state.bottomDisplay.slice(-1)) ?
          state :
          Object.assign({}, state, {
            keyPressed: action.keyPressed,
            keysPressed: [...state.keysPressed, action.keyPressed].join(''),
            currentNumber: '0',
            topDisplay: '0',
            bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
            expression: [...state.bottomDisplay, action.keyPressed].join('')
          });
      default:
        return state;
    }
  }


  function addKey(key) {
    return {
      type: 'ADD',
      keyPressed: key
    };
  }

  function erase(key) {
    return {
      type: 'ERASE',
      keyPressed: key
    };
  }

  function bspace(key) {
    return {
      type: 'BSPACE',
      keyPressed: key
    };
  }

  function addZero(key) {
    return {
      type: 'ADDZERO',
      keyPressed: key
    };
  }

  function addPeriod(key) {
    return {
      type: 'PERIOD',
      keyPressed: key
    };
  }

  function addOperator(key) {
    return {
      type: 'ADDOPERATOR',
      keyPressed: key
    };
  }

  function addLeftParenthesis(key) {
    return {
      type: 'ALP',
      keyPressed: key
    };
  }

  function addRightParenthesis(key) {
    return {
      type: 'ARP',
      keyPressed: key
    };
  }


  function render() {
    document.getElementById("topNum").innerHTML = store.getState().topDisplay;
    document.getElementById("bottomNum").innerHTML = store.getState().bottomDisplay;
  }

  const initialState = {
    keyPressed: '',
    keysPressed: [],
    currentNumber: '',
    topDisplay: '0',
    bottomDisplay: '0',
    expression: ''
  };
  const store = Redux.createStore(buttonPressed, initialState);
  store.subscribe(render);

};

/*
window.onload = () => {

  function counter(state, action) {
    if (typeof state === 'undefined') {
      return 0;
    }

    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }

  var store = Redux.createStore(counter);
  var valueEl = document.getElementById('value');

  function render() {
    valueEl.innerHTML = store.getState().toString();
  }

  render();
  store.subscribe(render);

  document.getElementById('increment')
    .addEventListener('click', function () {
      store.dispatch({
        type: 'INCREMENT'
      });
    });

  document.getElementById('decrement')
    .addEventListener('click', function () {
      store.dispatch({
        type: 'DECREMENT'
      });
    });

  document.getElementById('incrementIfOdd')
    .addEventListener('click', function () {
      if (store.getState() % 2 !== 0) {
        store.dispatch({
          type: 'INCREMENT'
        });
      }
    });

  document.getElementById('incrementAsync')
    .addEventListener('click', function () {
      setTimeout(function () {
        store.dispatch({
          type: 'INCREMENT'
        });
      }, 1000);
    });






};
*/
