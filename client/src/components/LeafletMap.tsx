// LeafletMap - OpenStreetMap integration with Mentee attribution
// Uses react-leaflet for seamless React integration
// Centered on Ontario, Canada

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  height?: string;
  className?: string;
  center?: [number, number];
  zoom?: number;
}

export default function LeafletMap({
  height = "400px",
  className = "",
  center = [50.5, -85.0], // Ontario center
  zoom = 5,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom,
      minZoom: 4,
      maxZoom: 18,
      dragging: true,
      scrollWheelZoom: true,
      attributionControl: false,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Custom attribution with Mentee logo linked to mentee.ca
    L.control
      .attribution({
        prefix: '<a href="https://mentee.ca" target="_blank" rel="noopener noreferrer">Mentee</a>',
      })
      .addTo(map);

    mapInstance.current = map;

    // Force a resize after mount to fix any rendering issues
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className={className}
      style={{
        height,
        width: "100%",
        borderRadius: 4,
        overflow: "hidden",
      }}
    />
  );
}
