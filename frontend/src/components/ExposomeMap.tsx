"use client";

import React, { useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker
} from "react-simple-maps";

// A minimal US topojson link
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

interface ExposomeMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const ExposomeMap: React.FC<ExposomeMapProps> = ({ onLocationSelect }) => {
  // Default map view centered roughly on the US, zooming out significantly
  const [position, setPosition] = useState({ coordinates: [-97.0, 38.0], zoom: 1.2 });
  const [selectedPoint, setSelectedPoint] = useState<[number, number] | null>([-122.0308, 36.9741]);
  const [selectedStateName, setSelectedStateName] = useState<string>("Santa Cruz (Mock)");
  const [hoveredStateName, setHoveredStateName] = useState<string | null>(null);

  const getHoverColor = (name: string) => {
    if (!name) return "#06b6d4";
    const colors = [
      "#06b6d4", // cyan
      "#f59e0b", // amber
      "#10b981", // emerald
      "#d946ef", // fuchsia
      "#8b5cf6", // violet
      "#ec4899", // pink
      "#3b82f6", // blue
      "#f43f5e", // rose
      "#84cc16", // lime
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleMapClick = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    // In a real robust implementation, we'd use d3-geo projecting the SVG coordinates back to lat/lng.
    // For react-simple-maps zooming, we typically bind clicks to actual Geographies and use their centroid,
    // or calculate based on the current transform. For the scope of a hackathon mockup, 
    // let's simulate lat/lng generation from mouse position if direct d3 inverse isn't immediately available,
    // or we can use the `projection.invert` function. React-Simple-Maps v3 requires a bit of setup for this.
    // To keep it simple and foolproof: 
    // We'll dispatch a slightly randomized coordinate near Santa Cruz on any random click for the sake of presentation,
    // OR if they click a state Geography, we just use its centroid. 

    // Instead of a true inverse projection from SVG to coordinates (which requires projection access),
    // let's do a mock approach where the user clicks anywhere and we drop a pin there.
    // We'll update this in the next pass with proper d3 projection handling, but for now we'll mock.
  };

  // As a better interaction model: user clicks on the globe/map, we trigger an event.
  // Instead of dealing with mouse coordinates, let's just make the markers movable or 
  // we dispatch exact lat/long for demo purposes.
  const handleSimulateClick = (lon: number, lat: number, name: string) => {
    setSelectedPoint([lon, lat]);
    setSelectedStateName(name);
    onLocationSelect(lat, lon);
  };

  return (
    <div className="w-full h-full relative bg-slate-900 overflow-hidden shadow-inner flex items-center justify-center">

      {selectedStateName && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full border border-slate-600/50 flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-slate-200 font-bold tracking-widest uppercase text-sm">Target: {selectedStateName}</span>
        </div>
      )}

      {hoveredStateName && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none bg-[#0f172a]/95 backdrop-blur px-5 py-2 rounded-lg border border-[#334155] shadow-2xl transition-opacity">
          <span className="text-white font-bold tracking-widest text-sm uppercase">{hoveredStateName}</span>
        </div>
      )}

      <ComposableMap projection="geoAlbersUsa" className="w-full h-full max-h-[90vh]">
        <ZoomableGroup zoom={position.zoom} center={position.coordinates as [number, number]}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    // Extract exact visual geometric centroid for the clicked state perfectly
                    const centroid = geoCentroid(geo);
                    const stateName = geo.properties.name || "Unknown Region";
                    handleSimulateClick(centroid[0], centroid[1], stateName);
                  }}
                  onMouseEnter={() => setHoveredStateName(geo.properties.name || "Unknown Region")}
                  onMouseLeave={() => setHoveredStateName(null)}
                  style={{
                    default: {
                      fill: "#1e293b",
                      stroke: "#334155",
                      strokeWidth: 0.75,
                      outline: "none",
                      transition: "all 150ms",
                    },
                    hover: {
                      fill: getHoverColor(geo.properties.name), // vibrant hover color
                      stroke: "#ffffff", // bright white stroke on hover
                      strokeWidth: 2,
                      outline: "none",
                      cursor: "crosshair",
                      transition: "all 150ms",
                    },
                    pressed: {
                      fill: getHoverColor(geo.properties.name),
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>

          {selectedPoint && (
            <Marker coordinates={selectedPoint}>
              <g
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(-12, -24)"
              >
                <circle cx="12" cy="10" r="3" fill="#06b6d4" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                {/* Glowing animation effect */}
                <circle cx="12" cy="15" r="10" fill="none" stroke="#22d3ee" className="animate-ping opacity-75" />
              </g>
            </Marker>
          )}

        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default ExposomeMap;
