/*
  # Create expenses table

  1. New Tables
    - `expenses`
      - `id` (uuid, primary key) - Unique identifier for each expense
      - `amount` (decimal) - The expense amount
      - `description` (text) - Description of the expense
      - `category` (text) - Category of the expense (e.g., Food, Transport, Entertainment)
      - `date` (date) - Date of the expense
      - `created_at` (timestamptz) - Timestamp when the record was created

  2. Security
    - Enable RLS on `expenses` table
    - Add policies for public access to allow all CRUD operations
    
  3. Notes
    - Amounts are stored as decimal for precise financial calculations
    - Default date is set to current date for convenience
    - Policies currently allow public access; can be updated to require authentication later
*/

CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount decimal(10, 2) NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view expenses"
  ON expenses
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public to insert expenses"
  ON expenses
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public to update expenses"
  ON expenses
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public to delete expenses"
  ON expenses
  FOR DELETE
  TO public
  USING (true);