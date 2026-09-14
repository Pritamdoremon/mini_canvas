export default function Toolbar({ onAdd, onDelete, canDelete }) {
  return (
    <div className="toolbar">
      <button onClick={() => onAdd("rectangle")}>Rectangle</button>
      <button onClick={() => onAdd("circle")}>Circle</button>
      <button onClick={() => onAdd("text")}>Text</button>
      <button className="danger" disabled={!canDelete} onClick={onDelete}>Delete selected</button>
    </div>
  );
}
