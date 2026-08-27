interface MapPlaceholderProps {
  className?: string;
}

// Static placeholder matching the map's visual footprint in the design (a
// muted block with a location pin). No existing map implementation was
// found in the project — wiring an interactive embed (Google Maps, Mapbox,
// etc.) is a provider/API-key decision, not made here.
export function MapPlaceholder({ className = "" }: MapPlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center bg-border ${className}`.trim()}
    >
      <span aria-hidden="true" className="text-3xl">
        📍
      </span>
    </div>
  );
}
