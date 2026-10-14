function FormField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  multiline = false,
  rows = 3,
}) {
  const Field = multiline ? "textarea" : "input";

  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <Field
        id={id}
        name={id}
        type={multiline ? undefined : type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        rows={multiline ? rows : undefined}
      />
    </div>
  );
}

export default FormField;
