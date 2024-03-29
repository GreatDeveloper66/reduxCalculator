/*global Redux*/
/*global combineReducers*/
/*global document*/
/*global setTimeout*/
/*global window*/
/*jshint esversion:6*/
/*global console*/
/*global stringMath*/

import { createSlice, configureStore } from '@reduxjs/toolkit';


const initialState = {
  keysPressed: [],
  currentNumber: '',
  topDisplay: '0',
  bottomDisplay: '0',
  expression: ''
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    addKey: (state, action) => {
      const over = state.bottomDisplay.length >= 36 || state.topDisplay.length >= 14;
      const overbottom = state.bottomDisplay.length >= 36;
      return over ? state: state.topDisplay === '0' ? Object.assign({}, state, {
        topDisplay: action.payload,
        bottomDisplay: (state.bottomDisplay === '0' ? action.payload : [...state.bottomDisplay, action.payload].join('')),
        expression: (state.bottomDisplay === '0' ? action.payload : [...state.bottomDisplay, action.payload].join(''))
      }) : Object.assign({}, state, {
        topDisplay: [...state.topDisplay, action.payload].join(''),
        bottomDisplay: [...state.bottomDisplay, action.payload].join(''),
        expression: [...state.expression, action.payload].join('')
      });
    },
    erase: (state, action) => {
      return initialState;
    },
    bspace: (state, action) => {
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
    },
    addZero: (state, action) => {
      return over ? state : state.topDisplay === '0' ? state : Object.assign({}, state, {
        topDisplay: [...state.topDisplay, action.payload].join(''),
        bottomDisplay: [...state.bottomDisplay, action.payload].join(''),
        expression: [...state.expression, action.payload].join('')
      });
    },
    addPeriod: (state, action) => {
      return over ? state: state.topDisplay.includes('.') ? state : state.bottomDisplay === '0' ?
        Object.assign({}, state, {
          topDisplay: '0.',
          bottomDisplay: '0.',
          expression: '0'     
        }) :
        Object.assign({}, state, {
          topDisplay: [...state.topDisplay, action.payload].join(''),
          bottomDisplay: [...state.bottomDisplay, action.payload].join(''),
          expression: state.expression
        });
    },
    addOperator: (state, action) => {
      return overbottom ? state : ['+', '-', 'X', '/', '('].includes(state.bottomDisplay.slice(-1)) ?
        state :
        Object.assign({}, state, {
          topDisplay: '0',
          bottomDisplay: [...state.bottomDisplay, action.payload].join(''),
          expression: state.expression
        });
    },
    addLeftParenthesis: (state, action) => {
      return overbottom ? state : ['X', '/', '+', '-', '('].includes(state.bottomDisplay.slice(-1)) ?
        Object.assign({}, state, {
          topDisplay: '0',
          bottomDisplay: [...state.bottomDisplay, action.payload].join(''),
          expression: [...state.bottomDisplay, action.payload].join('')
        }) :
        state;
    }
  }
});

const store = configureStore({
  reducer: calculatorSlice.reducer
});

store.subscribe(() => {
  document.getElementById("topNum").innerHTML = store.getState().topDisplay;
  document.getElementById("bottomNum").innerHTML = store.getState().bottomDisplay;
});

const setUp = () => { 
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
  document.querySelector(".power").addEventListener("click", function(){
    store.dispatch(power(this.innerText));
  });
  document.querySelector(".squareroot").addEventListener("click", function(){
    store.dispatch(squareroot(this.innerText));
  });
  document.querySelector(".cuberoot").addEventListener("click", function(){
    store.dispatch(cuberoot(this.innerText));
  });
  document.querySelector(".percentage").addEventListener("click", function(){
    store.dispatch(percentage(this.innerText));
  });
  document.querySelector(".sin").addEventListener("click", function(){
    store.dispatch(sin(this.innerText));
  });
  document.querySelector(".cos").addEventListener("click", function(){
    store.dispatch(cos(this.innerText));
  });
  document.querySelector(".tan").addEventListener("click", function(){
    store.dispatch(squareroot(this.innerText));
  });
  document.querySelector(".pi").addEventListener("click", function(){
    store.dispatch(pi(this.innerText));
  });
};


function addKey(key) {
  return {
    type: 'ADD',
    payload: key
  };
} 

function erase(key) {
  return {
    type: 'ERASE',
    payload: key
  };
} 

function bspace(key) {
  return {
    type: 'BSPACE',
    payload: key
  };  
}

function addZero(key) {
  return {
    type: 'ADDZERO',
    payload: key
  };  

}

function addPeriod(key) {
  return {  
    type: 'PERIOD',
    payload: key
  };
}

function addOperator(key) {
  return {
    type: 'ADDOPERATOR',
    payload: key
  };  

}

function addLeftParenthesis(key) {
  return {
    type: 'ALP',
    payload: key
  };
}

function addRightParenthesis(key) {
  return {
    type: 'ARP',
    payload: key
  };  
}

function equals(key) {
  return {
    type: 'EQUALS',
    payload: key
  };  

}

function power(key) {
  return {
    type: 'POWER',
    payload: key
  }
}

function squareroot(key) {
  return {
    type: 'SQUAREROOT',
    payload: key
  } 
}

function cuberoot(key) {
  return {
    type: 'CUBEROOT',
    payload: key
  } 
}

function percentage(key) {
  return {
    type: 'PERCENTAGE',
    payload: key
  }
}

function sin(key) {
  return {
    type: 'SIN',
    payload: key
  }
}

function cos(key) {
  return {
    type: 'COS',
    payload: key
  }
}

function tan(key) {
  return {
    type: 'TAN',
    payload: key
  }
}

function pi
(key) {
  return {
    type: 'PI',
    payload: key
  }
}

function render() {
  document.getElementById("topNum").innerHTML = store.getState().topDisplay;
  document.getElementById("bottomNum").innerHTML = store.getState().bottomDisplay;
}

window.onload = () => {
  setUp();
  store.subscribe(render);
};




// window.onload = () => {
//   Array.from(document.querySelectorAll('.numeral')).forEach(function (elem) {
//     elem.addEventListener("click", function () {
//       store.dispatch(addKey(this.innerText));
//     });
//   });
//   document.querySelector(".erase").addEventListener("click", function () {
//     store.dispatch(erase(this.innerText));
//   });
//   document.querySelector(".bspace").addEventListener("click", function () {
//     store.dispatch(bspace(this.innerText));
//   });
//   document.querySelector(".zero").addEventListener("click", function () {
//     store.dispatch(addZero(this.innerText));
//   });
//   document.querySelector(".period").addEventListener("click", function () {
//     store.dispatch(addPeriod(this.innerText));
//   });
//   Array.from(document.querySelectorAll(".operator")).forEach(function (elem) {
//     elem.addEventListener("click", function () {
//       store.dispatch(addOperator(this.innerText));
//     });
//   });
//   document.querySelector(".open").addEventListener("click", function () {
//     store.dispatch(addLeftParenthesis(this.innerText));
//   });
//   document.querySelector(".close").addEventListener("click", function () {
//     store.dispatch(addRightParenthesis(this.innerText));
//   });
//   document.querySelector(".equals").addEventListener("click", function () {
//     store.dispatch(equals(this.innerText));
//   });
  
//   document.querySelector(".power").addEventListener("click", function(){
// 	  store.dispatch(power(this.innerText));
//   });
//    document.querySelector(".squareroot").addEventListener("click", function(){
// 	  store.dispatch(squareroot(this.innerText));
//   });
//   document.querySelector(".cuberoot").addEventListener("click", function(){
// 	  store.dispatch(cuberoot(this.innerText));
//   });
  
//   document.querySelector(".percentage").addEventListener("click", function(){
// 	  store.dispatch(percentage(this.innerText));
//   });
  
//   document.querySelector(".sin").addEventListener("click", function(){
// 	  store.dispatch(sin(this.innerText));
//   });
  
//   document.querySelector(".cos").addEventListener("click", function(){
// 	  store.dispatch(cos(this.innerText));
//   });
  
//   document.querySelector(".tan").addEventListener("click", function(){
// 	  store.dispatch(squareroot(this.innerText));
//   });
  
//   document.querySelector(".pi").addEventListener("click", function(){
// 	  store.dispatch(pi(this.innerText));
//   });
  

//   function buttonPressed(state, action) {
//     const over = state.bottomDisplay.length >= 36 || state.topDisplay.length >= 14;
//     const overbottom = state.bottomDisplay.length >= 36;
// 	const lastDigit = state.topDisplay.slice(-1);
// 	const lastBDigit = state.bottomDisplay.slice(-1);

//     if (typeof state === 'undefined') {
//       return 0;
//     }
//     switch (action.type) {
//       case 'ADD':
//         return over ? state: state.topDisplay === '0' ? Object.assign({}, state, {
//           topDisplay: action.keyPressed,
//           bottomDisplay: (state.bottomDisplay === '0' ? action.keyPressed : [...state.bottomDisplay, action.keyPressed].join('')),
//           expression: (state.bottomDisplay === '0' ? action.keyPressed : [...state.bottomDisplay, action.keyPressed].join(''))
//         }) : Object.assign({}, state, {
//           topDisplay: [...state.topDisplay, action.keyPressed].join(''),
//           bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
//           expression: [...state.expression, action.keyPressed].join('')
//         });
//       case 'ADDZERO':
//         return over ? state : state.topDisplay === '0' ? state : Object.assign({}, state, {
//           topDisplay: [...state.topDisplay, action.keyPressed].join(''),
//           bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
//           expression: [...state.expression, action.keyPressed].join('')
//         });
//       case 'ERASE':
//         return initialState;
//       case 'BSPACE':
//         return state.topDisplay.length === 1 ? state.bottomDisplay.length > 1 ?
//           Object.assign({}, state, {
//             topDisplay: '0',
//             bottomDisplay: state.bottomDisplay.slice(0, -1),
//             expression: state.bottomDisplay.slice(0, -2)
//           }) :
//           Object.assign({}, state, {
//             topDisplay: '0',
//             bottomDisplay: '0',
//             expression: '0'
//           }) :
//           Object.assign({}, state, {
//             topDisplay: state.topDisplay.slice(0, -1),
//             bottomDisplay: state.bottomDisplay.slice(0, -1),
//             expression: state.bottomDisplay.slice(0,-1)
//           });
//       case 'PERIOD':
//         return over ? state: state.topDisplay.includes('.') ? state : state.bottomDisplay === '0' ?
//           Object.assign({}, state, {
//             topDisplay: '0.',
//             bottomDisplay: '0.',
//             expression: '0'
//           }) :
//           Object.assign({}, state, {
//             topDisplay: [...state.topDisplay, action.keyPressed].join(''),
//             bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
//             expression: state.expression
//           });
//       case 'ADDOPERATOR':
//         return overbottom ? state : ['+', '-', 'X', '/', '('].includes(state.bottomDisplay.slice(-1)) ?
//           state :
//           Object.assign({}, state, {
//             topDisplay: '0',
//             bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
//             expression: state.expression
//           });
//       case 'ALP':
//         return overbottom ? state : ['X', '/', '+', '-', '('].includes(state.bottomDisplay.slice(-1)) ?
//           Object.assign({}, state, {
//             topDisplay: '0',
//             bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
//             expression: [...state.bottomDisplay, action.keyPressed].join('')
//           }) :
//           state;
//       case 'ARP':
//         return overbottom ? state : ['X', '/', '+', '-', '(', ')'].includes(state.bottomDisplay.slice(-1)) ?
//           state :
//           Object.assign({}, state, {
//             topDisplay: '0',
//             bottomDisplay: [...state.bottomDisplay, action.keyPressed].join(''),
//             expression: [...state.bottomDisplay, action.keyPressed].join('')
//           });
//       case 'EQUALS':
//         let answer = stringMath(state.expression.replace("X","*")).toString();

//         answer = parseInt(answer) > 9999999999999 ? "-E-" :
//         answer.length >=14 ? answer.slice(0,14) :
//         answer;

//         return Object.assign({}, state, {
//           topDisplay: answer,
//           bottomDisplay: answer,
//           expression: answer
//         });
//       default:
//         return state;
//     }
//   }


//   function addKey(key) {
//     return {
//       type: 'ADD',
//       keyPressed: key
//     };
//   }

//   function erase(key) {
//     return {
//       type: 'ERASE',
//       keyPressed: key
//     };
//   }

//   function bspace(key) {
//     return {
//       type: 'BSPACE',
//       keyPressed: key
//     };
//   }

//   function addZero(key) {
//     return {
//       type: 'ADDZERO',
//       keyPressed: key
//     };
//   }

//   function addPeriod(key) {
//     return {
//       type: 'PERIOD',
//       keyPressed: key
//     };
//   }

//   function addOperator(key) {
//     return {
//       type: 'ADDOPERATOR',
//       keyPressed: key
//     };
//   }

//   function addLeftParenthesis(key) {
//     return {
//       type: 'ALP',
//       keyPressed: key
//     };
//   }

//   function addRightParenthesis(key) {
//     return {
//       type: 'ARP',
//       keyPressed: key
//     };
//   }

//   function equals(key) {
//     return {
//       type: 'EQUALS',
//       keyPressed: key
//     };
//   }
  
//   function power(key) {
// 	  return {
// 		type: 'POWER',
// 		keyPressed: key
// 	  }
//   }
  
//   function squareroot(key) {
// 	  return {
// 		type: 'SQUAREROOT',
// 		keyPressed: key
// 	  }
//   }
  
//   function cuberoot(key) {
// 	  return {
// 		type: 'CUBEROOT',
// 		keyPressed: key
// 	  }
//   }
  
//   function percentage(key) {
// 	  return {
// 		type: 'PERCENTAGE',
// 		keyPressed: key
// 	  }
//   }
  
//   function sin(key) {
// 	  return {
// 		type: 'SIN',
// 		keyPressed: key
// 	  }
//   }
  
//   function cos(key) {
// 	  return {
// 		type: 'COS',
// 		keyPressed: key
// 	  }
//   }
  
//   function tan(key) {
// 	  return {
// 		type: 'TAN',
// 		keyPressed: key
// 	  }
//   }
  
//   function pi(key) {
// 	  return {
// 		type: 'PI',
// 		keyPressed: key
// 	  }
//   }
  
//   sin,cos,tan,pi

//   function render() {
//     document.getElementById("topNum").innerHTML = store.getState().topDisplay;
//     document.getElementById("bottomNum").innerHTML = store.getState().bottomDisplay;
//   }

//   const initialState = {
//     keysPressed: [],
//     currentNumber: '',
//     topDisplay: '0',
//     bottomDisplay: '0',
//     expression: ''
//   };
//   const store = Redux.createStore(buttonPressed, initialState);
//   store.subscribe(render);

// };
