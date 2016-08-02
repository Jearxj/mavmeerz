import Axios from 'axios'

export const REQUEST_EXPENSES = 'REQUEST_EXPENSES';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const REQUEST_FAIL = 'REQUEST_FAIL';

const ROOT_URL = 'http://localhost:8080/'

//ACTION CREATORS FOR FETCHING AND RECEIVING EXPENSES FROM SERVER

/*
Action creator
@returns object with action type
*/
function requestExpenses(){
  const request = Axios.get("/")
  return {
    type: REQUEST_EXPENSES,
    payload: request
  }
}

/*
@returns object with action type & array of
The return value of expenses needs to be reformatted to look like this:
  expenses: {
    1: {
      ...
    }
  }
*/

function receiveExpenses(json){
  return {
    type: RECEIVE_EXPENSES,
    expenses: json.data.children.map(child => child.data)
  }
}

//thunk action creator
export function fetchExpenses(){
  return function(dispatch){
    //first dispatch:
      //app state is updated to inform that the API call is starting
    dispatch(requestExpenses())
    return fetch('/')
      .then(res => res.json())
      .then(json => dispatch(receiveExpenses(json)))
      .catch(err => console.error("Error sending request to server: ", err))
  }
}
