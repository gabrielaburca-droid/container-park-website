// Literal rule text transcribed from the Visit Us Figma export.
const PARK_RULES = [
  "No outside food or beverages.",
  "Strollers are not permitted in the Tree House Play Area for safety.",
  "Pets not permitted (except llamas and service animals).",
  "Juveniles under 18 not permitted without legal guardian.",
  "Juveniles under the age of 18 are welcome until 10:00 pm with a valid high school ID.",
  "Adults 21+ only after 10 pm.",
  "Any person disrupting the harmony or operations of the park will be removed.",
  "No firearms, knives or weapons of any kind are allowed in the park.",
  "Minors unaccompanied by adults may be allowed to enter the Container Park with a valid high school or government issued identification for high school age minors.",
];

export function ParkRulesList({ directionsUrl }: { directionsUrl?: string }) {
  return (
    <div>
      <h3 className="font-display text-xl uppercase lg:text-[28px]">Park Rules</h3>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
        {PARK_RULES.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
      {directionsUrl && (
        <div className="mt-4">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="font-display text-sm uppercase tracking-wide underline underline-offset-2"
          >
            Get Directions
          </a>
        </div>
      )}
    </div>
  );
}
