import { useReducer, useEffect } from 'react';
// import axios from 'axios';

import suggestions from '../static/suggestions';

const USER_IS_TYPING = "USER_IS_TYPING";
// const USER_LEFT_INPUT_BOX = "USER_LEFT_INPUT_BOX";
const SEARCH_START = 'SEARCH_START';
const SEARCH_FINISH = "SEARCH_FINISH";
const USER_USED_SEARCHED_TOPIC = "CHOOSE_SEARCHED_TOPIC";
const RESET = "RESET";

const returnPromise = (input) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const lowerCase = input.toLowerCase();
      const response = suggestions.filter(item => item.toLowerCase().startsWith(lowerCase));
      resolve(response);
    }, 5000);
  });

  return promise;
};

const initState = {
  searchResults: null,
  searching: false,
  enteredValue: "",
  searchFinished: false,
};

const searchReducer = (state, action) => {
  switch (action.type) {

    case USER_IS_TYPING:
      return {
        ...state,
        searchFinished: false,
        enteredValue: action.payload,
      };

    case SEARCH_START:
      return {
        ...state,
        searching: true
      };

    case SEARCH_FINISH:
      return {
        ...state,
        searchResults: action.payload,
        searching: false,
        searchFinished: true,
      };

    // case USER_LEFT_INPUT_BOX:
    //   return {
    //     ...initState,
    //     enteredValue: state.enteredValue,
    //   }

    case USER_USED_SEARCHED_TOPIC:
      return {
        ...initState,
        searchFinished: true,
        enteredValue: state.searchResults[action.payload],
      };

    case RESET:
      return initState;

    default:
      return state;
  }
};

const useSearch = (arr) => {
  const [state, dispatch] = useReducer(searchReducer, initState);
  const { enteredValue, searchFinished } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: SEARCH_START });
      const data = await returnPromise(enteredValue);
      dispatch({ type: SEARCH_FINISH, payload: data })
    };
    const timeout = setTimeout(() => {
      if (enteredValue && !searchFinished) {
        fetchData();

        // async code here
        // const lowerCase = enteredValue.toLowerCase();
        // const results = suggestions.filter(item => item.toLowerCase().startsWith(lowerCase));
        // dispatch({ type: SEARCH_FINISH, payload: results })
      }
    }, 1500);

    return () => {
      console.log('Cleaned!');
      clearTimeout(timeout);
    };

  }, [enteredValue, searchFinished])

  const onChangeHandler = (e) => dispatch({ type: USER_IS_TYPING, payload: e.target.value });
  const onSelectHandler = (id) => dispatch({ type: USER_USED_SEARCHED_TOPIC, payload: id });
  // const onBlurHandler = () => dispatch({ type: USER_LEFT_INPUT_BOX });

  return {
    searchResults: state.searchResults,
    enteredValue: enteredValue,
    searching: state.searching,
    // onBlurHandler,
    onChangeHandler,
    onSelectHandler,
  }
};

export default useSearch;