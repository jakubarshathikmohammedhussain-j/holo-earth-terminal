'use client';
import { useEffect, useState } from 'react';

export default function HoloEarthTerminal() {
  const [data, setData] = useState({ rich: [], aegis: [], kraken: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/macro-pulse')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setData(json);
        } else {
          setError(json.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#090a0f',
      backgroundImage: 'radial-gradient(circle at 50% 0%, #111827 0%, #090a0f 75%)',
      color: '#e2e8f0',
      padding: '2rem 1.5rem',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
    }}>
      {/* Top Header & Status Bar */}
      <header style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 12px #10b981'
            }} />
            <h1 style={{
              fontSize: '1.75rem',
              fontWeight: '800',
              letterSpacing: '0.15em',
              color: '#f8fafc',
              margin: 0
            }}>
              HOLO<span style={{ color: '#06b6d4' }}>_EARTH</span>
            </h1>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.35rem', letterSpacing: '0.05em' }}>
            CROSS-DOMAIN GLOBAL MACRO INTELLIGENCE GRID • TIER 1 UNIVERSE
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>TOTAL BACKFILLED TELEMETRY</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#38bdf8' }}>1.75M+ ROWS</div>
          </div>
          <div style={{
            backgroundColor: '#0f172a',
            border: '1px solid #1e293b',
            padding: '0.4rem 0.8rem',
            borderRadius: '6px',
            textAlign: 'right'
          }}>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>SYSTEM HEALTH</div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#10b981' }}>OPERATIONAL</div>
          </div>
        </div>
      </header>

      {error && (
        <div style={{
          backgroundColor: '#450a0a',
          border: '1px solid #dc2626',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '2rem',
          fontSize: '0.8rem',
          color: '#fca5a5'
        }}>
          <strong>BigQuery Connection Notice:</strong> {error}
        </div>
      )}

      {/* Grid Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        
        {/* Node 1: RICH */}
        <div style={{
          backgroundColor: '#0f172a80',
          backdropFilter: 'blur(12px)',
          border: '1px solid #1e293b',
          borderRadius: '10px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: '700', letterSpacing: '0.1em' }}>NODE 01 // RICH</span>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>EQUITIES & MACRO</span>
          </div>
          <h2 style={{ fontSize: '1.15rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>Market Momentum</h2>

          {loading ? (
            <p style={{ color: '#475569', fontSize: '0.8rem' }}>Querying BigQuery cluster...</p>
          ) : data.rich.length === 0 ? (
            <p style={{ color: '#475569', fontSize: '0.8rem' }}>No recent equity records found.</p>
          ) : (
            <table style={{ width: '100%', fontSize: '0.8rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ color: '#64748b', textAlign: 'left', borderBottom: '1px solid #1e293b' }}>
                  <th style={{ paddingBottom: '0.5rem' }}>ASSET</th>
                  <th style={{ paddingBottom: '0.5rem' }}>CLOSE</th>
                  <th style={{ paddingBottom: '0.5rem', textAlign: 'right' }}>14D RSI</th>
                </tr>
              </thead>
              <tbody>
                {data.rich.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #1e293b50' }}>
                    <td style={{ padding: '0.55rem 0', fontWeight: '700', color: '#38bdf8' }}>{row.entity_id}</td>
                    <td style={{ padding: '0.55rem 0', color: '#cbd5e1' }}>${row.close_price}</td>
                    <td style={{ padding: '0.55rem 0', textAlign: 'right' }}>
                      <span style={{
                        padding: '0.15rem 0.4rem',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        backgroundColor: row.rsi_14d >= 70 ? '#7f1d1d' : row.rsi_14d <= 30 ? '#14532d' : '#1e293b',
                        color: row.rsi_14d >= 70 ? '#fca5a5' : row.rsi_14d <= 30 ? '#86efac' : '#94a3b8'
                      }}>
                        {row.rsi_14d}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Node 2: AEGIS */}
        <div style={{
          backgroundColor: '#0f172a80',
          backdropFilter: 'blur(12px)',
          border: '1px solid #1e293b',
          borderRadius: '10px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: '700', letterSpacing: '0.1em' }}>NODE 02 // AEGIS</span>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>46,941 RECORDS</span>
          </div>
          <h2 style={{ fontSize: '1.15rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>Federal Procurement</h2>

          {loading ? (
            <p style={{ color: '#475569', fontSize: '0.8rem' }}>Streaming telemetry...</p>
          ) : data.aegis.length === 0 ? (
            <p style={{ color: '#475569', fontSize: '0.8rem' }}>No recent procurement awards found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {data.aegis.map((award, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #1e293b50', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: '700', color: '#f59e0b' }}>{award.entity_id}</span>
                    <span style={{ color: '#10b981', fontWeight: '600' }}>
                      ${(Number(award.award_amount) / 1e6).toFixed(2)}M
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>
                    {award.awarding_agency} • {award.date_signed}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Node 3: KRAKEN */}
        <div style={{
          backgroundColor: '#0f172a80',
          backdropFilter: 'blur(12px)',
          border: '1px solid #1e293b',
          borderRadius: '10px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.7rem', color: '#a855f7', fontWeight: '700', letterSpacing: '0.1em' }}>NODE 03 // KRAKEN</span>
            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>348K FILINGS</span>
          </div>
          <h2 style={{ fontSize: '1.15rem', color: '#f8fafc', margin: '0 0 1rem 0' }}>SEC Disclosures</h2>

          {loading ? (
            <p style={{ color: '#475569', fontSize: '0.8rem' }}>Connecting to EDGAR feed...</p>
          ) : data.kraken.length === 0 ? (
            <p style={{ color: '#475569', fontSize: '0.8rem' }}>No recent SEC disclosures found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {data.kraken.map((filing, idx) => (
                <div key={idx} style={{ borderBottom: '1px solid #1e293b50', paddingBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ fontWeight: '700', color: '#c084fc' }}>{filing.entity_id}</span>
                    <span style={{
                      backgroundColor: '#1e1b4b',
                      color: '#a855f7',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: '700'
                    }}>
                      FORM {filing.form_type}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Filed: {filing.filing_date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
            }
            
