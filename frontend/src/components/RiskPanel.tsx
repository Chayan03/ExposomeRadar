"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from "recharts";
import { AlertTriangle, Activity, ShieldAlert, FileText, Database, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

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

// Custom tooltip for plain-English explanations of toxins
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        let description = "";

        if (label === "Radon") {
            description = "A naturally occurring radioactive gas. High levels can damage lung cells and significantly multiply cancer risks, especially if you have a genetic predisposition like a TP53 mutation.";
        } else if (label === "PM2.5") {
            description = "Microscopic air pollution particles (dust, dirt, soot, smoke). Inhaling these creates inflammation and oxidative stress, which can accelerate the growth of existing lung mutations like EGFR.";
        } else if (label === "Metals") {
            description = "Toxic heavy metals like Lead and Arsenic in the local environment. These interfere with your body's natural DNA repair mechanisms, causing particular danger to individuals with BRCA1/2 genetic factors.";
        }

        const isHigh = data.value > data.safeLimit;

        return (
            <div className="bg-[#0f172a] border border-[#334155] p-3 rounded-lg shadow-xl max-w-xs z-50">
                <p className="text-[#22d3ee] font-bold mb-1">{label}: {data.value} {data.unit}</p>
                <p className="text-xs text-slate-300 mb-2 leading-relaxed">{description}</p>
                <div className={`text-xs font-semibold px-2 py-1 inline-block rounded ${isHigh ? 'bg-amber-900/50 text-amber-400' : 'bg-emerald-900/50 text-emerald-400'}`}>
                    {isHigh ? "⚠ High Risk Threshold Exceeded" : "✓ Within Safe Limits"}
                </div>
            </div>
        );
    }
    return null;
};

interface RiskPanelProps {
    loading: boolean;
    data: RiskData | null;
}

const RiskPanel: React.FC<RiskPanelProps> = ({ loading, data }) => {
    const [expandedAction, setExpandedAction] = React.useState<number | null>(0);

    const toggleAction = (index: number) => {
        setExpandedAction(expandedAction === index ? null : index);
    };

    if (loading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center animate-pulse">
                <Activity className="w-12 h-12 text-cyan-400 mb-4 animate-spin-slow" />
                <h3 className="text-xl font-bold text-slate-300">Scanning Exposome Profile...</h3>
                <p className="text-slate-500 text-sm mt-2">Cross-referencing geographic multi-omics data.</p>
                <p className="text-amber-500/80 text-xs mt-6 font-medium bg-amber-950/30 px-3 py-2 rounded-md border border-amber-900/50">
                    Note: Please wait ~2 minutes for the initial backend connection to establish (server cold start).
                </p>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <Activity className="w-12 h-12 mb-4 opacity-20" />
                <h3 className="text-xl font-bold">Awaiting Target Selection</h3>
                <p className="text-sm mt-2 max-w-xs">Select a geographic region on the map to begin exposome-genomic risk intersection analysis.</p>
            </div>
        );
    }

    const chartData = [
        { name: "Radon", value: data.radon_level, safeLimit: 4, unit: "pCi/L" },
        { name: "PM2.5", value: data.pm25_level, safeLimit: 50, unit: "AQI" },
        { name: "Metals", value: data.heavy_metals_level, safeLimit: 10, unit: "ug/dL" },
    ];

    return (
        <div className="h-full flex flex-col items-stretch p-6 overflow-y-auto custom-scrollbar">
            <div className="mb-6 border-b border-slate-700 pb-4">
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6 text-cyan-400" />
                    Patient Risk Intel
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                    Evaluating cancer mutation accelerators based on local environmental profiles and patient genomics.
                </p>
            </div>

            {/* Section: Clinical Action Plan */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Clinical Action Plan
                </h3>
                <div className="space-y-3">
                    {data.action_plan?.map((action, i) => {
                        const isExpanded = expandedAction === i;

                        // Select color theme based on action type
                        let badgeColor = "bg-emerald-950/50 text-emerald-400 border-emerald-500/30";
                        if (action.action_type === "diagnostic") badgeColor = "bg-blue-950/50 text-blue-400 border-blue-500/30";
                        if (action.action_type === "therapeutic") badgeColor = "bg-purple-950/50 text-purple-400 border-purple-500/30";

                        return (
                            <div
                                key={i}
                                className={`border ${isExpanded ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-slate-700/50 bg-slate-800/20 hover:border-slate-500/50'} rounded-xl transition-all duration-200 overflow-hidden`}
                            >
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleAction(i)}
                                    className="w-full text-left p-4 flex items-start justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent rounded-xl"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                                                {action.action_type}
                                            </span>
                                        </div>
                                        <h4 className={`font-bold text-base ${isExpanded ? 'text-emerald-300' : 'text-slate-200'}`}>
                                            {action.title}
                                        </h4>
                                    </div>
                                    <div className={`p-1 rounded-full ${isExpanded ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </div>
                                </button>

                                {/* Accordion Body */}
                                <div className={`px-4 pb-4 ${isExpanded ? 'block' : 'hidden'}`}>
                                    <p className="text-sm text-slate-300 leading-relaxed mb-4 border-l-2 border-emerald-500/30 pl-3">
                                        {action.description}
                                    </p>
                                    <button
                                        onClick={() => window.open(action.link, '_blank')}
                                        className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                    >
                                        {action.action_text}
                                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Section: Genomic Alerts */}
            <div className="mb-8">
                <h3 className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-4">Genomic Vulnerability Alerts</h3>
                <div className="space-y-4">
                    {data.alerts?.map((alert, i) => {
                        const isWarning = alert.includes("CRITICAL") || alert.includes("Warning") || alert.includes("High");
                        return (
                            <div
                                key={i}
                                className={`p-4 rounded-xl border ${isWarning ? "bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]" : "bg-cyan-950/20 border-cyan-500/30"} transition-all`}
                            >
                                <div className="flex items-start gap-3">
                                    {isWarning ? <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" /> : <Activity className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />}
                                    <p className={`text-sm leading-relaxed ${isWarning ? "text-amber-100 font-medium" : "text-cyan-100"}`}>
                                        {alert}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Section: Historical Trends Line Chart */}
            <div className="mb-8 min-h-[220px]">
                <h3 className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-4">10-Year Temporal Exposome Trends</h3>
                <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={data.historical_trends || []} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: "#64748b", fontSize: 10 }} />
                        <YAxis stroke="#94a3b8" tick={{ fill: "#64748b", fontSize: 10 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#f8fafc" }}
                            itemStyle={{ fontSize: '12px' }}
                            labelStyle={{ color: '#22d3ee', fontWeight: 'bold', marginBottom: '4px' }}
                        />
                        <Line type="monotone" dataKey="radon" stroke="#f43f5e" strokeWidth={2} dot={false} name="Radon Levels" />
                        <Line type="monotone" dataKey="pm25" stroke="#eab308" strokeWidth={2} dot={false} name="PM2.5 Levels" />
                        <Line type="monotone" dataKey="metals" stroke="#3b82f6" strokeWidth={2} dot={false} name="Heavy Metals" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Section: Toxins Bar Chart */}
            <div className="mb-8 min-h-[220px]">
                <h3 className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-4">Current Local Toxins vs Safety Limit</h3>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fill: "#cbd5e1", fontSize: 12 }} axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(30, 41, 59, 0.5)" }} />
                        <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                            {chartData.map((entry, index) => {
                                const isHigh = entry.value > entry.safeLimit;
                                return <Cell key={`cell-${index}`} fill={isHigh ? "#fbbf24" : "#06b6d4"} />;
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Section: Regional C++ Engine Stats */}
            <div className="mt-auto pt-4 pb-2 border-t border-slate-800">
                <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-mono text-slate-500 tracking-wider">GENOMICS DATABASE ENGINE</span>
                </div>
                <p className="text-xs text-slate-400 font-mono leading-relaxed bg-[#020617] p-3 rounded border border-slate-800">
                    {data.regional_stats}
                </p>
            </div>

            {/* CSS to hide scrollbars cleanly on Windows Chrome/Edge */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #334155;
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
};

export default RiskPanel;
