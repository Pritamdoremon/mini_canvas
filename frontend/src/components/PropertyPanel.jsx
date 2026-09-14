const fields = ["x", "y", "width", "height", "radius", "rotation", "fontSize"];

export default function PropertyPanel({ element, onChange }) {
  if (!element) return <aside className="properties"><h2>Properties</h2><p className="empty">Select an element.</p></aside>;

  return (
    <aside className="properties">
      <h2>Properties</h2>
      <label>Fill<input type="color" value={element.fill} onChange={(e) => onChange("fill", e.target.value)} /></label>
      {fields.filter((field) => element[field] !== undefined).map((field) => (
        <label key={field}>{field}<input type="number" value={element[field]} onChange={(e) => onChange(field, Number(e.target.value))} /></label>
      ))}
      {element.type === "text" && <label>Text<input value={element.text} onChange={(e) => onChange("text", e.target.value)} /></label>}
    </aside>
  );
}
