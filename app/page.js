'use client';
import { useEffect, useState } from 'react';

export default function HoloEarthTerminal() {
  const [macroData, setMacroData] = useState([]);

  useEffect(() => {
    fetch('/api/macro-pulse')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setMacroData(json.data);
      });
  }, []);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white', padding: '2rem 1.5rem', fontFamily: 'monospace' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '0.1em', color: '#06b6d4', margin: 0 }}>HOLO_EARTH</h1>
        <p style={{ color: '#a1a1aa', marginTop: '0.5rem', fontSize: '0.75rem' }}>INSTITUTIONAL INTELLIGENCE GRID :: ACTIVE</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        
        {/* RICH Node Widget */}
        <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '0.5rem', padding: '1.5rem' }}>
          <p style={{ color: '#a1a1aa', margin: 0, fontSize: '0.875rem' }}>Node: RICH</p>
          <p style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginTop: '0.25rem', marginBottom: '1.5rem' }}>Market Pulse</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {macroData.length === 0 ? (
              <p style={{ color: '#52525b', fontSize: '0.875rem' }}>Establishing secure connection...</p>
            ) : (
              macroData.map((asset) => (
                <div key={asset.entity_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', color: '#22d3ee' }}>{asset.entity_id}</span>
                  <span style={{ color: '#d4d4d8' }}>${asset.close_price}</span>
                  <span style={{ 
                    backgroundColor: asset.rsi_14d > 70 ? '#7f1d1d' : asset.rsi_14d < 30 ? '#14532d' : '#27272a', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '0.25rem', 
                    fontSize: '0.75rem',
                    color: 'white'
                  }}>
                    RSI: {asset.rsi_14d}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Placeholder Widgets */}
        <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '0.5rem', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <p style={{ color: '#52525b', fontSize: '0.875rem' }}>[ AWAITING AEGIS TELEMETRY ]</p>
        </div>
        <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '0.5rem', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <p style={{ color: '#52525b', fontSize: '0.875rem' }}>[ AWAITING KRAKEN TELEMETRY ]</p>
        </div>

      </div>
    </main>
  );
}
