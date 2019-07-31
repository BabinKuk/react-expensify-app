import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import '../locales/hr';
import { getVisibleExpenses } from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({ expensesCount, expensesTotal, hiddenExpensesCount }) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('0,0.00 $');
    const hiddenWord = hiddenExpensesCount === 1 ? 'expense' : 'expenses';
    
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{formattedExpensesTotal}</span></h1>
                {/* display hidden counter only if >0 */}
                {hiddenExpensesCount > 0 && (
                    <p className="page-header__title">Clear search filters to view <span>{hiddenExpensesCount}</span> additional {hiddenWord}</p>
                )}
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add Expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    const hiddenCount = state.expenses.length - visibleExpenses.length;
    
    return {
        expensesCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses),
        hiddenExpensesCount: hiddenCount
    };
};

export default connect(mapStateToProps)(ExpensesSummary);