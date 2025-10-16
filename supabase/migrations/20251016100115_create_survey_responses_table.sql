/*
  # Create Survey Responses Table

  ## Overview
  Creates a table to store AI & Digitalization Survey responses with all 17 questions.

  ## New Tables
  - `survey_responses`
    - `id` (uuid, primary key) - Unique identifier for each response
    - `q1` (text) - Frequency of AI/digital tool usage
    - `q2` (text) - How user discovers new tech tools
    - `q3` (text) - Experience with task automation
    - `q4` (text) - Comfort level with new tools
    - `q5` (text) - Problem-solving approach
    - `q6` (text[]) - Work areas that could benefit from AI
    - `q7a` (text) - Product-related problem statements
    - `q7b` (integer) - Impact rating (1-10)
    - `q8` (text) - Feelings about QMS tracker
    - `q9` (text) - Security awareness practices
    - `q10` (text[]) - Most time-consuming repetitive tasks
    - `q10_elaborate` (text) - Additional details on repetitive tasks
    - `q11` (text) - Tasks to automate
    - `q12` (text) - Confidence in using new tools
    - `q13` (text[]) - Learning methods for digital tools
    - `q14` (text) - Excitement about future technologies
    - `q15` (text) - Interest in learning digitalization
    - `q16` (text[]) - Feelings about AI in work
    - `submitted_at` (timestamptz) - Timestamp of submission

  ## Security
  - Enable RLS on `survey_responses` table
  - Add policy for anyone to insert survey responses (public survey)
  - Add policy for authenticated users to read all responses (for analysis)
*/

CREATE TABLE IF NOT EXISTS survey_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  q1 text,
  q2 text,
  q3 text,
  q4 text,
  q5 text,
  q6 text[] DEFAULT '{}',
  q7a text,
  q7b integer,
  q8 text,
  q9 text,
  q10 text[] DEFAULT '{}',
  q10_elaborate text,
  q11 text,
  q12 text,
  q13 text[] DEFAULT '{}',
  q14 text,
  q15 text,
  q16 text[] DEFAULT '{}',
  submitted_at timestamptz DEFAULT now()
);

ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit survey responses (public survey)
CREATE POLICY "Anyone can submit survey responses"
  ON survey_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all survey responses (for analysis/reporting)
CREATE POLICY "Authenticated users can read all responses"
  ON survey_responses
  FOR SELECT
  TO authenticated
  USING (true);