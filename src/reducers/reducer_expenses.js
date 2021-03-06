// const _ = require('lodash');
import * as _ from 'lodash';
import moment from 'moment';

import {
  REQUEST_EXPENSES,
  RECEIVE_EXPENSES,
  UPLOAD_REQUEST,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  PARSING_CSV,
  GET_TOTAL,
  ADD_CATEGORY,
  ADD_ACCOUNT,
  FILTER_DATE
} from '../actions/expensesActions.js';

const INITIAL_STATE = {expenses: [], total: 0, isFetching: false, startDate: null, endDate: null, filteredExpenses: [], allExpenses: []}

export default function expenses(state=INITIAL_STATE, action){
  switch (action.type) {
    case REQUEST_EXPENSES:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
      break;
    case RECEIVE_EXPENSES:
      console.log('tehrehehehe');
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        expenses: action.expenses,
        allExpenses: action.expenses
      })
    case UPLOAD_REQUEST:
      return Object.assign({}, state, {
        isFetching: action.isFetching
      })
      break;
    case UPLOAD_SUCCESS:
    console.log('upload success in expenses reducer', state.expenses, action.expenses)
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        expenses: state.expenses.concat(action.expenses)
      })
      break;
    case PARSING_CSV:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
      })
      break;
    case GET_TOTAL:
      return Object.assign({}, state, {
        total: action.total
      })
      break;
    case ADD_CATEGORY:
      if (action.expenses.data.length) {
        return Object.assign({}, state, {
          expenses: action.expenses.data
        })
      }
      return state;
      break;
    case ADD_ACCOUNT:
      if (action.expenses.length) {
        /////// TEMP ///////
        //add to object for now until backend complete//
        let clonedState = _.cloneDeep(state);
        for (let i = 0; i < action.expenses.length; i++) {
          let expenseID = action.expenses[i];
          for (let j = 0; j < clonedState.expenses.length; j++) {
            let currentExpense = clonedState.expenses[j];
            if (currentExpense.id == expenseID) {
              currentExpense.account = action.account;
              break;
            }
          }
        }
        return Object.assign({}, state, {
          expenses: clonedState.expenses
        });
      }
      return state;
      break;
    case FILTER_DATE:
      let startDate = action.startDate.slice(0, 10);
      let endDate = action.endDate.slice(0, 10);

      if (endDate >= startDate) {
        console.log('=======> state.expenses: ', state.expenses);
        console.log('=====> startDate: ', startDate);
        console.log('=====> endDate: ', endDate);
        var filteredExpenses = state.expenses.filter((expense) => {
          // console.log('=====> expense.date in filter: ', expense.date);

          return expense.date >= startDate && expense.date <= endDate
        })
        console.log('Filter_date filtered expenses are: ', filteredExpenses)
        return Object.assign({}, state, {
          expenses: filteredExpenses,
        });
      }
      return state;
      break;
    default:
      return state;
  }
}
