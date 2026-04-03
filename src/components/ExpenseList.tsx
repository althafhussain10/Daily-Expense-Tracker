import { Trash2 } from 'lucide-react';
import { Expense } from '../lib/supabase';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  selectedCategory: string;
}

const categoryColors: Record<string, string> = {
  Food: 'bg-orange-100 text-orange-800',
  Transport: 'bg-blue-100 text-blue-800',
  Entertainment: 'bg-pink-100 text-pink-800',
  Shopping: 'bg-green-100 text-green-800',
  Bills: 'bg-red-100 text-red-800',
  Health: 'bg-teal-100 text-teal-800',
  Other: 'bg-gray-100 text-gray-800',
};

export function ExpenseList({ expenses, onDelete, selectedCategory }: ExpenseListProps) {
  const filteredExpenses = selectedCategory === 'All'
    ? expenses
    : expenses.filter(exp => exp.category === selectedCategory);

  const total = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount.toString()), 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Expenses</h2>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</p>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>No expenses yet. Start tracking your spending!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category]}`}>
                    {expense.category}
                  </span>
                  <span className="text-sm text-gray-500">{new Date(expense.date).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-900 font-medium">{expense.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-gray-900">${parseFloat(expense.amount.toString()).toFixed(2)}</span>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete expense"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
