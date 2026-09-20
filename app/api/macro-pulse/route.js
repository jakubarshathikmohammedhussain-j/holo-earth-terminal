import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

export async function GET() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const bigquery = new BigQuery({
      projectId: credentials.project_id,
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key,
      }
    });

    const query = `
      SELECT entity_id, close_price, rsi_14d, timestamp
      FROM \`${credentials.project_id}.telemetry_bronze.market_signals\`
      WHERE signal_type = 'EQUITY_EOD'
      ORDER BY timestamp DESC
      LIMIT 5
    `;

    const [rows] = await bigquery.query({ query });
    return NextResponse.json({ success: true, data: rows });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

