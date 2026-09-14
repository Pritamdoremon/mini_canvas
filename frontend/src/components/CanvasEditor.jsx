import { useState } from "react";
import CanvasStage from "./CanvasStage.jsx";
import PropertyPanel from "./PropertyPanel.jsx";
import Toolbar from "./Toolbar.jsx";

const createElement = (type) => {
  const base = { id: crypto.randomUUID(), type, x: 120, y: 100, fill: "#3b82f6", rotation: 0 };
  if (type === "rectangle") return { ...base, width: 150, height: 100 };
  if (type === "circle") return { ...base, radius: 60, fill: "#ef4444" };
  return { ...base, text: "Double click not needed—edit me here", fontSize: 22, width: 260, height: 60, fill: "#111827" };
};

export default function CanvasEditor({ canvas, onSave }) {
  const [selectedId, setSelectedId] = useState(null);
  const selectedElement = canvas.elements.find((element) => element.id === selectedId);

  const updateElement = (id, changes) => onSave({
    ...canvas,
    elements: canvas.elements.map((element) => element.id === id ? { ...element, ...changes } : element)
  });

  const addElement = (type) => {
    const element = createElement(type);
    onSave({ ...canvas, elements: [...canvas.elements, element] });
    setSelectedId(element.id);
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    onSave({ ...canvas, elements: canvas.elements.filter((element) => element.id !== selectedId) });
    setSelectedId(null);
  };

  return (
    <main className="editor">
      <div className="editor-header"><input value={canvas.name} onChange={(e) => onSave({ ...canvas, name: e.target.value })} /><span>Changes save automatically</span></div>
      <Toolbar onAdd={addElement} onDelete={deleteSelected} canDelete={Boolean(selectedId)} />
      <div className="workspace"><CanvasStage elements={canvas.elements} selectedId={selectedId} onSelect={setSelectedId} onChange={updateElement} /><PropertyPanel element={selectedElement} onChange={(field, value) => updateElement(selectedId, { [field]: value })} /></div>
    </main>
  );
}
