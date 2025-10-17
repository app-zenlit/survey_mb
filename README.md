# Databricks Survey Application

A survey application that stores responses directly in Databricks SQL Warehouse.

## Prerequisites

- Node.js (v16 or higher)
- Databricks workspace with SQL Warehouse
- Databricks personal access token

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Databricks Credentials

Copy the `.env.example` file to `.env` and fill in your Databricks credentials:

```bash
cp .env.example .env
```

Edit the `.env` file with your actual credentials:

```env
DATABRICKS_WORKSPACE_URL=https://your-workspace.cloud.databricks.com
DATABRICKS_ACCESS_TOKEN=your_personal_access_token_here
DATABRICKS_WAREHOUSE_ID=your_warehouse_id_here
```

**How to get these values:**

- **DATABRICKS_WORKSPACE_URL**: Your Databricks workspace URL (e.g., `https://dbc-abc123-xyz.cloud.databricks.com`)
- **DATABRICKS_ACCESS_TOKEN**:
  1. Go to your Databricks workspace
  2. Click on your user profile (top right)
  3. Go to "User Settings"
  4. Navigate to "Access tokens" tab
  5. Click "Generate new token"
  6. Copy the generated token
- **DATABRICKS_WAREHOUSE_ID**:
  1. Go to "SQL Warehouses" in your Databricks workspace
  2. Click on your warehouse
  3. Copy the Warehouse ID from the URL or connection details

### 3. Build the Application

```bash
npm run build
```

### 4. Start the Server

```bash
npm start
```

The application will:
1. Test the connection to Databricks
2. Create the `survey_responses` table if it doesn't exist
3. Start the server on port 8080 (or the PORT environment variable)

## Database Schema

The application automatically creates a table named `survey_responses` with the following columns:

- `id` (STRING): Unique identifier for each response
- `timestamp` (TIMESTAMP): When the survey was submitted
- `q1` through `q16`: Survey question responses
- Additional fields for multi-part questions (e.g., `q7a`, `q7b`, `q10_elaborate`)

## Usage

Once the server is running, navigate to `http://localhost:8080` to access the survey.

All survey responses are automatically saved to your Databricks SQL Warehouse.

## Deploying to Databricks

When deploying this application as a Databricks App:

1. Ensure all environment variables are set in your Databricks App configuration
2. The app will automatically connect to your SQL Warehouse
3. Survey data will be stored in the `survey_responses` table in your default database

## Troubleshooting

If you encounter connection errors:

1. Verify your Databricks credentials in the `.env` file
2. Ensure your SQL Warehouse is running
3. Check that your access token has the necessary permissions
4. Verify the workspace URL format (should include `https://`)

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **Database**: Databricks SQL Warehouse
