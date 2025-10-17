interface DatabricksConfig {
  workspaceUrl: string;
  accessToken: string;
  warehouseId: string;
}

interface StatementResponse {
  statement_id: string;
  status: {
    state: string;
  };
  manifest?: {
    schema?: {
      columns: Array<{ name: string; type_text: string }>;
    };
  };
  result?: {
    data_array?: any[][];
  };
}

export class DatabricksService {
  private config: DatabricksConfig;
  private baseUrl: string;

  constructor(config: DatabricksConfig) {
    this.config = config;
    this.baseUrl = `${config.workspaceUrl}/api/2.0/sql/statements`;
  }

  private async executeStatement(sql: string): Promise<StatementResponse> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        warehouse_id: this.config.warehouseId,
        statement: sql,
        wait_timeout: '30s',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Databricks API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  }

  async createTableIfNotExists(): Promise<void> {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS survey_responses (
        id STRING,
        timestamp TIMESTAMP,
        q1 STRING,
        q2 STRING,
        q3 STRING,
        q4 STRING,
        q5 STRING,
        q6 STRING,
        q7a STRING,
        q7b INT,
        q8 STRING,
        q9 STRING,
        q10 STRING,
        q10_elaborate STRING,
        q11 STRING,
        q12 STRING,
        q13 STRING,
        q14 STRING,
        q15 STRING,
        q16 STRING
      )
    `;

    await this.executeStatement(createTableSql);
  }

  async insertSurveyResponse(data: any): Promise<void> {
    const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString().replace('T', ' ').replace('Z', '');

    const values = [
      this.escapeString(id),
      `'${timestamp}'`,
      this.escapeString(data.q1),
      this.escapeString(data.q2),
      this.escapeString(data.q3),
      this.escapeString(data.q4),
      this.escapeString(data.q5),
      this.escapeString(Array.isArray(data.q6) ? data.q6.join(', ') : data.q6),
      this.escapeString(data.q7a),
      data.q7b || 'NULL',
      this.escapeString(data.q8),
      this.escapeString(data.q9),
      this.escapeString(Array.isArray(data.q10) ? data.q10.join(', ') : data.q10),
      this.escapeString(data.q10_elaborate),
      this.escapeString(data.q11),
      this.escapeString(data.q12),
      this.escapeString(Array.isArray(data.q13) ? data.q13.join(', ') : data.q13),
      this.escapeString(data.q14),
      this.escapeString(data.q15),
      this.escapeString(Array.isArray(data.q16) ? data.q16.join(', ') : data.q16),
    ];

    const insertSql = `
      INSERT INTO survey_responses VALUES (${values.join(', ')})
    `;

    await this.executeStatement(insertSql);
  }

  private escapeString(value: any): string {
    if (value === null || value === undefined || value === '') {
      return 'NULL';
    }
    const stringValue = String(value).replace(/'/g, "''");
    return `'${stringValue}'`;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.executeStatement('SELECT 1');
      return true;
    } catch (error) {
      console.error('Databricks connection test failed:', error);
      return false;
    }
  }
}
