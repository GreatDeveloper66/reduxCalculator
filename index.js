/*global Redux*/
/*global document*/
/*global setTimeout*/
/*global window*/
/*jshint esversion:6*/
window.onload = () => {

  Array.from(document.querySelector(".keys")).addEventListener("click", function () {
    const newKey = this.querySelector("p").innerHTML;
    store.dispatch(addKey(newKey));
  });

  function buttonPressed(state, action) {
    if (typeof state === 'undefined') {
      return 0;
    }
    switch (action.type) {
      case 'ADD':
        return Object.assign({}, state, {
          keysPressed: action.keyPressed
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
  
  function render() {
    document.getElementById("topNum").innerHTML = store.getState().keyPressed;
    document.getElementById("bottomNum").innerHTML = store.getState().keyPressed;
  }

  let store = Redux.createStore(buttonPressed);
  store.subscribe(render);
};


/*
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
        store.dispatch({ type: 'INCREMENT' });
      });

    document.getElementById('decrement')
      .addEventListener('click', function () {
        store.dispatch({ type: 'DECREMENT' });
      });

    document.getElementById('incrementIfOdd')
      .addEventListener('click', function () {
        if (store.getState() % 2 !== 0) {
          store.dispatch({ type: 'INCREMENT' });
        }
      });

    document.getElementById('incrementAsync')
      .addEventListener('click', function () {
        setTimeout(function () {
          store.dispatch({ type: 'INCREMENT' });
        }, 1000);
      });
      */
