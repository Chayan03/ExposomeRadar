"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ExposomeMap from "@/components/ExposomeMap";
import RiskPanel from "@/components/RiskPanel";

interface TrendData {
  year: string;
  radon: number;
  pm25: number;
  metals: number;
}

interface ActionPlanItem {
  title: string;
  description: string;
  action_text: string;
  action_type: string;
  link: string;
}

interface RiskData {
  radon_level: number;
  pm25_level: number;
  heavy_metals_level: number;
  alerts: string[];
  historical_trends: TrendData[];
  action_plan: ActionPlanItem[];
  regional_stats: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  const [patientProfile, setPatientProfile] = useState("healthy");
  const [isEjMode, setIsEjMode] = useState(false);
  const [lastCoords, setLastCoords] = useState<{ lat: number, lng: number } | null>(null);

  // Initialize Santa Cruz onload
  useEffect(() => {
    handleLocationSelect(36.9741, -122.0308);
  }, []);

  // Soft refresh when patient profile or EJ mode changes
  useEffect(() => {
    if (lastCoords) {
      fetchRiskData(lastCoords.lat, lastCoords.lng, patientProfile, isEjMode);
    }
  }, [patientProfile, isEjMode]);

  const fetchRiskData = async (lat: number, lng: number, profile: string, ej: boolean) => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://exposomeradar.onrender.com";
      const response = await fetch(`${apiUrl}/api/exposome-risk?lat=${lat}&lng=${lng}&patient_profile=${profile}&is_ej_mode=${ej}`);
      const data = await response.json();
      setTimeout(() => {
        setRiskData(data);
        setLoading(false);
      }, 700);
    } catch (error) {
      console.error("Failed to fetch exposome risk data", error);
      setLoading(false);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLastCoords({ lat, lng });
    fetchRiskData(lat, lng, patientProfile, isEjMode);
  };

  return (
    <main className="flex w-full h-screen bg-black text-slate-100 overflow-hidden font-sans selection:bg-cyan-900 selection:text-white">
      {/* Section A: Map (70%) */}
      <section className="w-[70%] h-full relative border-r border-slate-700/60 bg-[#020617] flex flex-col shadow-2xl z-10">
        <header className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-start pointer-events-none">
          <div className="pointer-events-auto">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-sm uppercase cursor-pointer">
                Exposome Radar
              </h1>
            </Link>
            <p className="text-slate-400 text-sm font-medium tracking-wide mt-1">Cancer Genomics Intersection Engine</p>
          </div>
          <div className="flex flex-col gap-3 pointer-events-auto">
            <div className="bg-black/80 p-3 rounded-lg border border-slate-700 backdrop-blur-md">
              <label className="block text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">Target Patient Persona</label>
              <select
                className="bg-slate-900 text-slate-200 border border-slate-700 rounded p-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors w-64"
                value={patientProfile}
                onChange={(e) => setPatientProfile(e.target.value)}
              >
                <option value="healthy">Healthy Baseline</option>
                <option value="brca1">BRCA1 Positive (Breast/Ovarian Risk)</option>
                <option value="tp53">TP53 Germline Carrier</option>
                <option value="egfr">EGFR Exon 19 Deletion</option>
              </select>
            </div>

            <div
              className={`p-3 rounded-lg border backdrop-blur-md transition-all flex items-center justify-between cursor-pointer ${isEjMode ? 'bg-indigo-950/80 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-black/80 border-slate-700 hover:border-slate-500'}`}
              onClick={() => setIsEjMode(!isEjMode)}
            >
              <div>
                <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isEjMode ? 'text-indigo-400' : 'text-slate-400'}`}>Socio-Economic Risk Stratification (SERS)</div>
                <div className="text-[10px] text-slate-500">Socio-economic policy mode</div>
              </div>
              <div className={`w-10 h-5 rounded-full relative transition-colors ${isEjMode ? 'bg-indigo-500' : 'bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all`} style={{ left: isEjMode ? '22px' : '2px' }} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 w-full h-full relative">
          <ExposomeMap onLocationSelect={handleLocationSelect} />
        </div>
      </section>

      {/* Section B: Risk Panel (30%) */}
      <section className="w-[30%] h-full bg-[#0b1120] relative shadow-[inset_10px_0_30px_rgba(0,0,0,0.5)] z-0">
        <RiskPanel loading={loading} data={riskData} />
      </section>
    </main>
  );
}
