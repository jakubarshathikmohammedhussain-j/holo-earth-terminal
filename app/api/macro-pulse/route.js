import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

export async function GET() {
  try {
    if (!process.env.GOOGLE_CREDENTIALS) {
      throw new Error("GOOGLE_CREDENTIALS environment variable is missing.");
    }

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    
    // Fix common Vercel newline formatting in private keys
    const privateKey = credentials.private_key.includes('\\n')
      ? credentials.private_key.replace(/\\n/g, '\n')
      : credentials.private_key;

    const bigquery = new BigQuery({
      projectId: credentials.project_id,
      credentials: {
        client_email: credentials.client_email,
        private_key: privateKey,
      }
    });

    // 1. Pull market signals (RICH)
    const richQuery = `
      SELECT entity_id, close_price, percent_change, rsi_14d, timestamp
      FROM \`${credentials.project_id}.telemetry_bronze.market_signals\`
      ORDER BY timestamp DESC
      LIMIT 6
    `;

    // 2. Pull procurement signals (AEGIS)
    const aegisQuery = `
      SELECT entity_id, award_amount, awarding_agency, date_signed
      FROM \`${credentials.project_id}.telemetry_bronze.aegis_procurement\`
      ORDER BY date_signed DESC
      LIMIT 4
    `;

    // 3. Pull SEC filings (KRAKEN)
    const krakenQuery = `
      SELECT entity_id, form_type, filing_date
      FROM \`${credentials.project_id}.telemetry_bronze.kraken_filings\`
      ORDER BY filing_date DESC
      LIMIT 4
    `;

    const [[richRows], [aegisRows], [krakenRows]] = await Promise.all([
      bigquery.query({ query: richQuery }),
      bigquery.query({ query: aegisQuery }).catch(() => [[]]),
      bigquery.query({ query: krakenQuery }).catch(() => [[]])
    ]);

    return NextResponse.json({
      success: true,
      rich: richRows || [],
      aegis: aegisRows || [],
      kraken: krakenRows || []
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
