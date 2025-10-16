import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import XLSX from 'xlsx';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const EXCEL_FILE = path.join(__dirname, 'responses.xlsx');

app.use(cors());
app.use(express.json());

app.post('/api/submit-survey', async (req, res) => {
  try {
    const surveyData = req.body;

    surveyData.timestamp = new Date().toISOString();

    let workbook;
    let worksheet;
    let existingData = [];

    if (fs.existsSync(EXCEL_FILE)) {
      workbook = XLSX.readFile(EXCEL_FILE);
      worksheet = workbook.Sheets[workbook.SheetNames[0]];
      existingData = XLSX.utils.sheet_to_json(worksheet);
    } else {
      workbook = XLSX.utils.book_new();
    }

    const flattenedData = {
      timestamp: surveyData.timestamp,
      q1: surveyData.q1,
      q2: surveyData.q2,
      q3: surveyData.q3,
      q4: surveyData.q4,
      q5: surveyData.q5,
      q6: Array.isArray(surveyData.q6) ? surveyData.q6.join(', ') : surveyData.q6,
      q7a: surveyData.q7a,
      q7b: surveyData.q7b,
      q8: surveyData.q8,
      q9: surveyData.q9,
      q10: Array.isArray(surveyData.q10) ? surveyData.q10.join(', ') : surveyData.q10,
      q10_elaborate: surveyData.q10_elaborate,
      q11: surveyData.q11,
      q12: surveyData.q12,
      q13: Array.isArray(surveyData.q13) ? surveyData.q13.join(', ') : surveyData.q13,
      q14: surveyData.q14,
      q15: surveyData.q15,
      q16: Array.isArray(surveyData.q16) ? surveyData.q16.join(', ') : surveyData.q16,
    };

    existingData.push(flattenedData);

    const newWorksheet = XLSX.utils.json_to_sheet(existingData);

    if (workbook.SheetNames.length === 0) {
      XLSX.utils.book_append_sheet(workbook, newWorksheet, 'Survey Responses');
    } else {
      workbook.Sheets[workbook.SheetNames[0]] = newWorksheet;
    }

    XLSX.writeFile(workbook, EXCEL_FILE);

    res.json({ success: true, message: 'Survey response saved successfully' });
  } catch (error) {
    console.error('Error saving survey:', error);
    res.status(500).json({ success: false, message: 'Error saving survey response' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
