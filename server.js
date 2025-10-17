import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabricksService } from './src/lib/databricks.ts';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

const databricksConfig = {
  workspaceUrl: process.env.DATABRICKS_WORKSPACE_URL,
  accessToken: process.env.DATABRICKS_ACCESS_TOKEN,
  warehouseId: process.env.DATABRICKS_WAREHOUSE_ID,
};

if (!databricksConfig.workspaceUrl || !databricksConfig.accessToken || !databricksConfig.warehouseId) {
  console.error('ERROR: Missing Databricks configuration. Please set DATABRICKS_WORKSPACE_URL, DATABRICKS_ACCESS_TOKEN, and DATABRICKS_WAREHOUSE_ID in .env file');
  process.exit(1);
}

const databricks = new DatabricksService(databricksConfig);

app.use(cors());
app.use(express.json());

app.post('/api/submit-survey', async (req, res) => {
  try {
    const surveyData = req.body;

    await databricks.insertSurveyResponse(surveyData);

    res.json({ success: true, message: 'Survey response saved successfully to Databricks' });
  } catch (error) {
    console.error('Error saving survey to Databricks:', error);
    res.status(500).json({ success: false, message: 'Error saving survey response to database' });
  }
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

async function initializeServer() {
  try {
    console.log('Testing Databricks connection...');
    const isConnected = await databricks.testConnection();

    if (!isConnected) {
      console.error('Failed to connect to Databricks. Please check your credentials.');
      process.exit(1);
    }

    console.log('Databricks connection successful!');
    console.log('Creating survey_responses table if it does not exist...');

    await databricks.createTableIfNotExists();

    console.log('Table initialization complete.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Survey app is ready to accept responses!');
    });
  } catch (error) {
    console.error('Failed to initialize server:', error);
    process.exit(1);
  }
}

initializeServer();
