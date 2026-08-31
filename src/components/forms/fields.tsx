interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

const fieldClasses =
  "mt-1 w-full border border-border px-4 py-3 text-sm focus:border-lime focus:outline-none focus:ring-1 focus:ring-lime";
// Focus styling is included as a baseline accessibility requirement even
// though no focus state is shown in the source design — hover/hover-only
// effects elsewhere are NOT added on that same basis (see CLAUDE.md /
// Figma spec: focus visibility is a WCAG requirement, not a design guess).

export function TextField({ label, name, type = "text", required, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={fieldClasses}
      />
    </div>
  );
}

export function TextareaField({
  label,
  name,
  required,
  placeholder,
  helperText,
}: FieldProps & { helperText?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        rows={5}
        className={fieldClasses}
      />
      {helperText && <p className="mt-1 text-xs text-muted">{helperText}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  /** Controlled usage (e.g. GroupEventForm's referral-source select needs
   * to react to the chosen value to conditionally show a "please
   * specify" field, matching the live Tripleseat form's own behavior).
   * Omit both for a plain uncontrolled select — every other existing
   * call site is unaffected. */
  value?: string;
  onChange?: (value: string) => void;
}

export function SelectField({ label, name, required, options, value, onChange }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className={`${fieldClasses} bg-white`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
