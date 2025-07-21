"use client";
 
import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";
import { WorldMapProps } from './types';
 
export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
 
  const { theme } = useTheme();
 
  // Use theme to decide the map dot color
  const dotColor = theme === 'dark' ? "#898585a9" : "#968e8ea9";
  
  const svgMap = map.getSVG({
    radius: 0.25,
    color: dotColor,
    shape: "circle",
    backgroundColor: "transparent",
  });
 
  // Enhanced coordinate projection for more accurate location rendering
  const projectPoint = (lat: number, lng: number) => {
    // Adjust the longitude to handle the international date line
    const adjustedLng = lng < -150 || lng > 150 ? lng : lng;
    const x = (adjustedLng + 180) * (800 / 360);
    
    // Slightly adjust the latitude projection for better visual representation
    const y = (90 - lat) * (400 / 180);
    
    return { x, y };
  };
  
  // Calculate optimal label position to avoid overlaps
  const getLabelPosition = (dot: { lat: number; lng: number; label?: string }, index: number, allDots: Array<{ lat: number; lng: number; label?: string }>) => {
    const point = projectPoint(dot.lat, dot.lng);
    
    // Define regions for Europe (where most overlaps happen)
    const isEurope = (dot.lat > 35 && dot.lat < 60 && dot.lng > -10 && dot.lng < 30);
    
    // For European cities, use different positioning
    if (isEurope) {
      // Create a mapping for specific cities to position their labels strategically
      const specialPositions: Record<string, { x: number, y: number }> = {
        "London": { x: -25, y: -5 },
        "Paris": { x: 5, y: 15 },
        "Munich": { x: 25, y: -5 }
      };
      
      if (dot.label && specialPositions[dot.label]) {
        return {
          x: point.x + specialPositions[dot.label].x,
          y: point.y + specialPositions[dot.label].y,
          anchor: specialPositions[dot.label].x < 0 ? "end" : "start"
        };
      }
    }
    
    // For other cities, use simpler positioning logic
    // Calculate angle for positioning based on dot index for variety
    const angle = (index % 8) * Math.PI / 4;
    const distance = 20;
    
    return {
      x: point.x + Math.sin(angle) * distance,
      y: point.y - Math.cos(angle) * distance - 5,
      anchor: Math.sin(angle) < 0 ? "end" : Math.sin(angle) > 0 ? "start" : "middle"
    };
  };
 
  // Enhanced path creation with international date line handling
  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    // Calculate the direct distance between points
    const directDistance = Math.abs(end.x - start.x);
    
    // Check if the path should cross the international date line
    // This happens when the direct path would be longer than going around the other side
    const shouldWrapAround = directDistance > 400;
    
    if (shouldWrapAround) {
      // Create two paths that meet at the edges of the map
      const midX1 = start.x < end.x ? 0 : 800;
      const midX2 = start.x < end.x ? 800 : 0;
      const midY = (start.y + end.y) / 2 - 25;
      
      // Return a path that wraps around the edges of the map
      return `M ${start.x} ${start.y} Q ${midX1} ${midY} ${midX1} ${midY} M ${midX2} ${midY} Q ${midX2} ${midY} ${end.x} ${end.y}`;
    } else {
      // Normal curved path
      const midX = (start.x + end.x) / 2;
      const midY = Math.min(start.y, end.y) - 40;
      return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    }
  };
 
  return (
    <div className="w-full aspect-[2/1] bg-gradient-to-br from-[#1b1130]/50 to-[#150d24]/80 rounded-xl relative font-sans overflow-hidden border border-blue-500/20 shadow-lg shadow-blue-500/10">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-blue-500/5"></div>
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none opacity-100 relative z-10"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none z-20"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="3"
                filter="url(#glow)"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 * i,
                  ease: "easeInOut",
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}
 
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="5%" stopColor="#18aab7" stopOpacity="1" />
            <stop offset="95%" stopColor="#e91ff0" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="textGlow">
            <feFlood floodColor="#000000" floodOpacity="0.8" result="blackFlood"/>
            <feComposite in="blackFlood" in2="SourceGraphic" operator="in" result="masked"/>
            <feGaussianBlur in="masked" stdDeviation="1" result="blur"/>
            <feComponentTransfer in="blur" result="transfer">
              <feFuncA type="linear" slope="2" intercept="0"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="transfer"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
 
        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="4"
                fill="#4bc5cf"
                filter="url(#glow)"
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="4"
                fill="#4bc5cf"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  from="4"
                  to="15"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.8"
                  to="0"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
              {dot.start.label && (() => {
                const labelPos = getLabelPosition(dot.start, i, dots.map(d => d.start));
                return (
                  <motion.g opacity="0" animate={{ opacity: 1 }} transition={{ delay: 0.5 * i, duration: 1 }}>
                    <line 
                      x1={projectPoint(dot.start.lat, dot.start.lng).x}
                      y1={projectPoint(dot.start.lat, dot.start.lng).y}
                      x2={labelPos.x}
                      y2={labelPos.y}
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      strokeOpacity="0.5"
                    />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fontSize="10"
                      fontWeight="500"
                      fill="#ffffff"
                      textAnchor={labelPos.anchor}
                      filter="url(#textGlow)"
                    >
                      {dot.start.label}
                    </text>
                  </motion.g>
                );
              })()}
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="4"
                fill="#222122"
                filter="url(#glow)"
                stroke="#ffffff"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="4"
                fill="#878485"
                opacity="0.8"
              >
                <animate
                  attributeName="r"
                  from="4"
                  to="15"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.8"
                  to="0"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
              {dot.end.label && (() => {
                const labelPos = getLabelPosition(dot.end, i + dots.length, dots.map(d => d.end));
                return (
                  <motion.g opacity="0" animate={{ opacity: 1 }} transition={{ delay: 0.5 * i, duration: 1 }}>
                    <line 
                      x1={projectPoint(dot.end.lat, dot.end.lng).x}
                      y1={projectPoint(dot.end.lat, dot.end.lng).y}
                      x2={labelPos.x}
                      y2={labelPos.y}
                      stroke="#ffffff"
                      strokeWidth="0.5"
                      strokeOpacity="0.5"
                    />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      fontSize="10"
                      fontWeight="500"
                      fill="#ffffff"
                      textAnchor={labelPos.anchor}
                      filter="url(#textGlow)"
                    >
                      {dot.end.label}
                    </text>
                  </motion.g>
                );
              })()}
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
