import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';
import { supabase, Expense } from './lib/supabase';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { CategoryFilter } from './components/CategoryFilter';

const categories = ['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Health', 'Other'];

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching expenses:', error);
    } else {
      setExpenses(data || []);
    }
    setLoading(false);
  };

  const handleAddExpense = async (newExpense: {
    amount: number;
    description: string;
    category: string;
    date: string;
  }) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert([newExpense])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Error adding expense:', error);
    } else if (data) {
      setExpenses([data, ...expenses]);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting expense:', error);
    } else {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Wallet className="text-white" size={28} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Daily Expense Tracker</h1>
          </div>
          <p className="text-gray-600 ml-16">Track your daily spending and manage your budget</p>
        </header>

        <ExpenseForm onAdd={handleAddExpense} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-400">Loading expenses...</p>
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            onDelete={handleDeleteExpense}
            selectedCategory={selectedCategory}
          />
        )}
      </div>
    </div>
  );
}

export default App;
