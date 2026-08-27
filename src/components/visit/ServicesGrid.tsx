interface ServiceItem {
  label: string;
}

// Literal service list transcribed from the Visit Us Figma export (not
// invented).
// TODO: SCHEMA GAP — `siteSettings.services` doesn't exist yet; this
// default list is used until that field is added (see CLAUDE.md).
const DEFAULT_SERVICES: ServiceItem[] = [
  { label: "Dining" },
  { label: "Bars" },
  { label: "Salon" },
  { label: "Shopping" },
  { label: "ATM" },
  { label: "Restroom" },
  { label: "Children's Tree House & Play Zone" },
];

export function ServicesGrid({ services = DEFAULT_SERVICES }: { services?: ServiceItem[] }) {
  return (
    <div className="mt-8">
      <h3 className="font-display text-xl uppercase">Services</h3>
      <p className="mt-2 text-muted">
        The Downtown Container Park provides the following services and amenities:
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <li
            key={service.label}
            className="flex items-center gap-3 border border-border px-4 py-3 text-sm font-medium uppercase"
          >
            {service.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
