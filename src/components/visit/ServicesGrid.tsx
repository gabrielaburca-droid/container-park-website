import Image from "next/image";

interface ServiceItem {
  label: string;
  icon: string;
}

// Literal service list transcribed from the Visit Us Figma export (not
// invented). Icons are the project's real, pre-colored lime assets
// (public/assets/images/all/) matching each service 1:1 — not generic
// icon-library glyphs.
// TODO: SCHEMA GAP — `siteSettings.services` doesn't exist yet; this
// default list is used until that field is added (see CLAUDE.md).
const DEFAULT_SERVICES: ServiceItem[] = [
  { label: "Dining", icon: "dining-icon" },
  { label: "Bars", icon: "bars-icon" },
  { label: "Salon", icon: "salon-icon" },
  { label: "Shopping", icon: "shopping-icon" },
  { label: "ATM", icon: "atm-icon" },
  { label: "Restroom", icon: "restroom-icon" },
  { label: "Children's Tree House & Play Zone", icon: "children-icon" },
];

export function ServicesGrid({ services = DEFAULT_SERVICES }: { services?: ServiceItem[] }) {
  return (
    <div className="mt-8">
      <h3 className="font-display text-xl uppercase lg:text-[28px]">Services</h3>
      <p className="mt-2 text-muted">
        The Downtown Container Park provides the following services and amenities:
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <li
            key={service.label}
            className="flex items-center gap-3 border border-border px-4 py-3"
          >
            <Image
              src={`/assets/images/all/${service.icon}.svg`}
              alt=""
              width={48}
              height={48}
              className="h-6 w-6 shrink-0"
            />
            <span className="font-display text-sm uppercase lg:text-[20px]">{service.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
