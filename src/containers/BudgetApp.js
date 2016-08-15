import React, { Component } from 'react'
import { connect } from 'react-redux'
import BudgetTable from '../components/BudgetTable'
import Total from '../components/Total'
import '../css/BudgetTable.css'

export default class BudgetApp extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.fetchBudgetItems()
  }

  render(){
    return (
      <div>
        <div className='budget-table'>
          <BudgetTable
            budgetItems={this.props.budgetItems}
          />
        </div>
        <Total
            total={this.props.total}
        />
      </div>
    )
  }

}

function mapStateToProps(state){
  const { total } = state.expensesReducer
  const { budgetItems, fetchingBudget } = state.budget
  console.log('BUDGET ITEMS: ', budgetItems);
  return {
    total: total,
    budgetItems: budgetItems,
    fetchingBudget: fetchingBudget
  }
}

export default connect(
  mapStateToProps,
  {
    fetchBudgetItems: fetchBudgetItems
  }
)(BudgetApp)
