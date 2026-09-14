export default function CanvasList({ canvases, selectedId, onSelect, onCreate, onDelete }) {
  return (
    <aside className="sidebar">
      <div className="panel-heading"><h2>Canvases</h2><button onClick={onCreate}>+ New</button></div>
      {canvases.length === 0 && <p className="empty">Create a canvas to begin.</p>}
      {canvases.map((canvas) => (
        <div className={`canvas-row ${canvas._id === selectedId ? "active" : ""}`} key={canvas._id}>
          <button className="canvas-name" onClick={() => onSelect(canvas._id)}>{canvas.name}</button>
          <button className="icon-button" title="Delete canvas" onClick={() => onDelete(canvas._id)}>×</button>
        </div>
      ))}
    </aside>
  );
}
