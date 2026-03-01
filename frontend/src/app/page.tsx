"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldAlert, Map, UserCircle, HeartPulse, ArrowRight, Info, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from "recharts";

const mockToxinData = [
    { name: "Radon", value: 12, safeLimit: 4, fill: "#f43f5e" },
    { name: "PM2.5", value: 65, safeLimit: 50, fill: "#eab308" },
    { name: "Lead", value: 3, safeLimit: 10, fill: "#06b6d4" },
];

const mockRiskData = [
    { name: "Healthy", risk: 10 },
    { name: "BRCA1+", risk: 85 },
    { name: "TP53+", risk: 95 },
];

export default function LandingPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-900 selection:text-white overflow-hidden flex flex-col items-center">

            {/* Header / Hero Section */}
            <div className="w-full max-w-6xl px-6 py-24 flex flex-col md:flex-row items-center justify-between gap-12 mt-8 relative z-10">
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-900/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="flex-1 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
                        <Activity className="w-4 h-4" />
                        Live Interactive Data
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 uppercase mb-6 drop-shadow-lg leading-tight">
                        Exposome Radar
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light mb-10 leading-relaxed">
                        Cancer doesn't just come from your genes. It comes from your environment.
                        See exactly how the air you breathe and the water you drink interact dynamically with your specific DNA.
                    </p>

                    <Link href="/dashboard" className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                        Launch Interactive Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Hero Visual Graph */}
                <div className="flex-1 w-full max-w-md bg-[#0f172a]/80 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-2xl relative">
                    <div className="absolute -top-3 -right-3 w-20 h-20 bg-amber-500/20 blur-2xl rounded-full" />
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                        DNA Risk Multipliers
                    </h3>
                    <p className="text-xs text-slate-500 mb-6">Visualizing how local toxins multiply danger for specific genetic profiles.</p>
                    {mounted && (
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={mockRiskData}>
                                    <XAxis dataKey="name" stroke="#64748b" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        cursor={{ fill: "rgba(30, 41, 59, 0.5)" }}
                                        contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#f8fafc" }}
                                    />
                                    <Bar dataKey="risk" radius={[6, 6, 0, 0]} barSize={40}>
                                        {mockRiskData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.risk > 50 ? "#f43f5e" : "#06b6d4"} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

            {/* Explanation Section (For Normal People) */}
            <div className="w-full max-w-[1400px] px-8 py-24 z-10 flex-col flex items-center">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">We translate extremely complex medical data into beautiful, simple, and actionable insights that anyone can understand.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
                    {/* Feature 1 */}
                    <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] border border-blue-900/30 p-10 rounded-3xl shadow-xl hover:border-blue-500/50 transition-all hover:-translate-y-2 relative overflow-hidden group flex flex-col">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
                        <div className="w-20 h-20 rounded-full bg-blue-950 flex items-center justify-center mb-8 border border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <Map className="w-10 h-10 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-5">1. Explore Invisible Toxins</h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8 flex-1">
                            We scan the geographic United States for invisible local dangers. Click anywhere on our interactive map to discover
                            the exact levels of <span className="text-rose-400 font-medium whitespace-nowrap">Radon</span>, <span className="text-amber-400 font-medium whitespace-nowrap">PM2.5</span>, and <span className="text-cyan-400 font-medium whitespace-nowrap">Heavy Metals</span>.
                        </p>
                        {mounted && (
                            <div className="h-40 w-full mt-auto opacity-80 pl-2">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mockToxinData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" stroke="#475569" tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                                            {mockToxinData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] border border-amber-900/30 p-10 rounded-3xl shadow-xl hover:border-amber-500/50 transition-all hover:-translate-y-2 relative overflow-hidden group flex flex-col">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-colors" />
                        <div className="w-20 h-20 rounded-full bg-amber-950 flex items-center justify-center mb-8 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                            <UserCircle className="w-10 h-10 text-amber-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-5">2. Choose a Patient Profile</h3>
                        <p className="text-slate-400 text-lg leading-relaxed flex-1">
                            Pollution affects everyone differently. High Lead levels might just be an annoyance to a healthy person,
                            but they are <strong className="text-amber-300 font-medium">extremely dangerous</strong> to a patient with a "BRCA1" breast-cancer gene.
                            Choose a patient persona to see personalized danger alerts.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-gradient-to-b from-[#0f172a] to-[#020617] border border-emerald-900/30 p-10 rounded-3xl shadow-xl hover:border-emerald-500/50 transition-all hover:-translate-y-2 relative overflow-hidden group flex flex-col">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors" />
                        <div className="w-20 h-20 rounded-full bg-emerald-950 flex items-center justify-center mb-8 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            <HeartPulse className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-5">3. Medical Action Plans</h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8 flex-1">
                            We don't just scare you with data. Based on the patient's genes and the local environment, our system automatically
                            generates a <strong className="text-emerald-300 font-medium">Clinical Action Plan</strong>, recommending specific medical tests and preventative steps.
                        </p>
                        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-5 text-sm text-emerald-200 mt-auto shadow-inner">
                            <div className="flex gap-3 items-start">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                <span className="leading-relaxed">Diagnostic: Schedule low-dose CT scan screening every 6 months.</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Glossary */}
            <div className="w-full max-w-6xl px-8 py-16 mb-24 z-10">
                <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 shadow-2xl rounded-3xl p-10 flex flex-col md:flex-row items-start gap-8">
                    <div className="p-4 bg-slate-800 rounded-2xl border border-slate-600 shadow-md">
                        <Info className="w-10 h-10 text-cyan-400" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-3xl mb-8">Technical Terms, Explained</h4>
                        <ul className="text-lg md:text-xl text-slate-400 space-y-8">
                            <li className="flex flex-col"><span className="text-cyan-300 font-bold mb-2 text-2xl">Exposome (Ex-po-zome)</span> The total sum of every environmental thing you've been exposed to in your life (diet, air, stress, chemicals).</li>
                            <li className="flex flex-col"><span className="text-cyan-300 font-bold mb-2 text-2xl">Genomics</span> The study of your DNA and genes.</li>
                            <li className="flex flex-col"><span className="text-cyan-300 font-bold mb-2 text-2xl">Intersection Engine</span> Our custom-built tool that calculates exactly what happens when an environmental toxin (Exposome) meets a specific DNA mutation (Genomics).</li>
                        </ul>
                    </div>
                </div>
            </div>

        </main>
    );
}
