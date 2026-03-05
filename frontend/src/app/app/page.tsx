"use client";

import React, { useState, useEffect } from "react";
import ExposomeMap from "@/components/ExposomeMap";
import RiskPanel from "@/components/RiskPanel";

interface ActionPlanItem {
    title: string;
    description: string;
    action_text: string;
    action_type: string;
    link: string;
}

interface TrendData {
    year: string;
    radon: number;
    pm25: number;
    metals: number;
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

    // Initialize Santa Cruz onload
    useEffect(() => {
        fetchRiskData(36.9741, -122.0308);
    }, []);

    const fetchRiskData = async (lat: number, lng: number) => {
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://exposomeradar.onrender.com";
            const response = await fetch(`${apiUrl}/api/exposome-risk?lat=${lat}&lng=${lng}`);
            const data = await response.json();
            // Artificial delay for better UX scanning effect in mockup
            setTimeout(() => {
                setRiskData(data);
                setLoading(false);
            }, 1000);
        } catch (error) {
            console.error("Failed to fetch exposome risk data", error);
            setLoading(false);
        }
    };

    const handleLocationSelect = (lat: number, lng: number) => {
        fetchRiskData(lat, lng);
    };

    return (
        <main className="flex w-full h-screen bg-black text-slate-100 overflow-hidden font-sans selection:bg-cyan-900 selection:text-white">
            {/* Section A: Map (70%) */}
            <section className="w-[70%] h-full relative border-r border-slate-700/60 bg-[#020617] flex flex-col shadow-2xl z-10">
                <header className="absolute top-0 left-0 w-full p-6 z-20 pointer-events-none flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-sm uppercase">Exposome Radar</h1>
                        <p className="text-slate-400 text-sm font-medium tracking-wide mt-1">Cancer Genomics Intersection Engine</p>
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
