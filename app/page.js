'use client';
import { useEffect, useState } from 'react';
import { Card, Text, Metric, Grid, BadgeDelta } from '@tremor/react';

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
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-mono">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-cyan-500">HOLO_EARTH</h1>
        <p className="text-zinc-400 mt-2 text-sm">INSTITUTIONAL INTELLIGENCE GRID :: ACTIVE</p>
      </div>

      <Grid numItemsSm={1} numItemsLg={3} className="gap-6">
        <Card className="bg-zinc-900 border-zinc-800 ring-0">
          <Text className="text-zinc-400">Node: RICH</Text>
          <Metric className="text-white mt-2">Market Pulse</Metric>

          <div className="mt-6 space-y-4">
            {macroData.map((asset) => (
              <div key={asset.entity_id} className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <span className="font-bold text-cyan-400">{asset.entity_id}</span>
                <span className="text-zinc-300">${asset.close_price}</span>
                <BadgeDelta deltaType={asset.rsi_14d > 70 ? "decrease" : asset.rsi_14d < 30 ? "increase" : "unchanged"}>
                  RSI: {asset.rsi_14d}
                </BadgeDelta>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 ring-0 flex items-center justify-center p-8">
          <Text className="text-zinc-600 animate-pulse">[ AWAITING AEGIS TELEMETRY ]</Text>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 ring-0 flex items-center justify-center p-8">
          <Text className="text-zinc-600 animate-pulse">[ AWAITING KRAKEN TELEMETRY ]</Text>
        </Card>
      </Grid>
    </main>
  );
}
