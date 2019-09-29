/*global Redux*/
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
  
  document.querySelector(".erase").addEventListener("click",function(){
    store.dispatch(erase(this.innerText));
  });
  
  document.querySelector(".bspace").addEventListener("click",function(){
    store.dispatch(bspace(this.innerText));
  });
                                                    
                                                    

  function buttonPressed(state, action) {
    if (typeof state === 'undefined') {
      return 0;
    }
    switch (action.type) {
      case 'ADD':
        return Object.assign({}, state, {
          keyPressed: action.keyPressed,
          keysPressed: [...state.keysPressed, action.keyPressed],
          topDisplay: [...state.keysPressed, action.keyPressed].join(''),
          bottomDisplay: [...state.keysPressed, action.keyPressed].join('')
        });
      case 'ERASE':
        return Object.assign({}, state, {
          keyPressed: action.keyPressed,
          keysPressed: [...state.keysPressed, action.keyPressed],
          topDisplay: '0',
          bottomDisplay: '0'
        });
      case 'BSPACE':
        return Object.assign({}, state, {
          keyPressed: action.keyPressed,
          keysPressed: [...state.keysPressed, action.keyPressed],
          topDisplay: state.topDisplay.slice(0,-1),
          bottomDisplay: state.bottomDisplay.slice(0,-1)
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

  function erase(key){
    return {
      type: 'ERASE',
      keyPressed: key
    };
  }
  
  function bspace(key){
    return {
      type: 'BSPACE',
      keyPressed: key
    };
  }

  function render() {
    document.getElementById("topNum").innerHTML = store.getState().topDisplay;
    document.getElementById("bottomNum").innerHTML = store.getState().bottomDisplay;
  }

  let initialState = {
    keyPressed: '0',
    keysPressed: [],
    topDisplay: '0',
    bottomDisplay: '0'
  };

  let store = Redux.createStore(buttonPressed, initialState);
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
