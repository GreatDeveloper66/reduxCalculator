/*global Redux*/
/*global combineReducers*/
/*global document*/
/*global setTimeout*/
/*global window*/
/*jshint esversion:6*/
/*global console*/
/*global stringMath*/

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
  document.querySelector(".equals").addEventListener("click", function () {
    store.dispatch(equals(this.innerText));
  });

  function buttonPressed(state, action) {
    const over = state.bottomDisplay.length >= 36 || state.topDisplay.length >= 14;
    const overbottom = state.bottomDisplay.length >= 36;
    
    if (typeof state === 'undefined') {
      return 0;
    }
    switch (action.type) {
      case 'ADD':
        return over ? state: state.topDisplay === '0' ? Object.assign({}, state, {
          topDisplay: action.keyPressed,
          bottomDisplay: (state.bottomDisplay === '0' ? action.keyPressed : [...state.bottomDisplay, action.keyPressed].join('')),
          expression: (state.bottomDisplay === '0' ? action.keyPressed : [...state.bottomDisplay, action.keyPressed].join(''))
        }) : Object.assign({}, state, {
          topDisplay: [...state.topDisplay, action.keyPressed].join(''),
          bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
          expression: [...state.expression, action.keyPressed].join('')
        });
      case 'ADDZERO':
        return over ? state : state.topDisplay === '0' ? state : Object.assign({}, state, {
          topDisplay: [...state.topDisplay, action.keyPressed].join(''),
          bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
          expression: [...state.expression, action.keyPressed].join('')
        });
      case 'ERASE':
        return initialState;
      case 'BSPACE':
        return state.topDisplay.length === 1 ? state.bottomDisplay.length > 1 ?
          Object.assign({}, state, {
            topDisplay: '0',
            bottomDisplay: state.bottomDisplay.slice(0, -1),
            expression: state.bottomDisplay.slice(0, -2)
          }) :
          Object.assign({}, state, {
            topDisplay: '0',
            bottomDisplay: '0',
            expression: '0'
          }) :
          Object.assign({}, state, {
            topDisplay: state.topDisplay.slice(0, -1),
            bottomDisplay: state.bottomDisplay.slice(0, -1),
            expression: state.bottomDisplay.slice(0,-1)
          });
      case 'PERIOD':
        return over ? state: state.topDisplay.includes('.') ? state : state.bottomDisplay === '0' ?
          Object.assign({}, state, {
            topDisplay: '0.',
            bottomDisplay: '0.',
            expression: '0'
          }) :
          Object.assign({}, state, {
            topDisplay: [...state.topDisplay, action.keyPressed].join(''),
            bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
            expression: state.expression
          });
      case 'ADDOPERATOR':
        return overbottom ? state : ['+', '-', 'X', '/', '('].includes(state.bottomDisplay.slice(-1)) ?
          state :
          Object.assign({}, state, {
            topDisplay: '0',
            bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
            expression: state.expression
          });
      case 'ALP':
        return overbottom ? state : ['X', '/', '+', '-', '('].includes(state.bottomDisplay.slice(-1)) ?
          Object.assign({}, state, {
            topDisplay: '0',
            bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
            expression: [...state.bottomDisplay, action.keyPressed].join('')
          }) :
          state;
      case 'ARP':
        return overbottom ? state : ['X', '/', '+', '-', '(', ')'].includes(state.bottomDisplay.slice(-1)) ?
          state :
          Object.assign({}, state, {
            topDisplay: '0',
            bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
            expression: [...state.bottomDisplay, action.keyPressed].join('')
          });
      case 'EQUALS':
        let answer = stringMath(state.expression.replace("X","*")).toString();
        
        if(parseInt(answer) > 9999999999999){
          answer = "-E-"
        } 
        else if(answer.length >= 14){
          answer = answer.slice(0,14);
        }
        else {
    
        }
        return Object.assign({}, state, {
          topDisplay: answer,
          bottomDisplay: answer,
          expression: answer
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

  function equals(key) {
    return {
      type: 'EQUALS',
      keyPressed: key
    };
  }

  function render() {
    document.getElementById("topNum").innerHTML = store.getState().topDisplay;
    document.getElementById("bottomNum").innerHTML = store.getState().bottomDisplay;
  }

  const initialState = {
    keysPressed: [],
    currentNumber: '',
    topDisplay: '0',
    bottomDisplay: '0',
    expression: ''
  };
  const store = Redux.createStore(buttonPressed, initialState);
  store.subscribe(render);

};
