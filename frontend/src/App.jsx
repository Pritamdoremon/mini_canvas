import { useEffect, useRef, useState } from "react";
import CanvasEditor from "./components/CanvasEditor.jsx";
import CanvasList from "./components/CanvasList.jsx";
import { canvasApi } from "./services/canvasApi.js";

export default function App() {
  const [canvases, setCanvases] = useState([]);
  const [selectedCanvasId, setSelectedCanvasId] = useState(null);
  const [message, setMessage] = useState("Loading canvases...");
  const saveTimer = useRef(null);

  const selectedCanvas = canvases.find((canvas) => canvas._id === selectedCanvasId);

  useEffect(() => {
    canvasApi.list()
      .then((items) => {
        setCanvases(items);
        setSelectedCanvasId(items[0]?._id || null);
        setMessage(items.length ? "" : "No canvases yet.");
      })
      .catch((error) => setMessage(error.message));
  }, []);

  const createCanvas = async () => {
    try {
      const existingNames = new Set(canvases.map((canvas) => canvas.name));
      let number = 1;
      let name = "Untitled canvas";

      while (existingNames.has(name)) {
        number += 1;
        name = `Untitled canvas ${number}`;
      }

      const canvas = await canvasApi.create({ name, elements: [] });
      setCanvases((current) => [canvas, ...current]);
      setSelectedCanvasId(canvas._id);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const updateCanvas = (updatedCanvas) => {
    setCanvases((current) => current.map((canvas) => canvas._id === updatedCanvas._id ? updatedCanvas : canvas));
    setMessage("Saving...");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        const savedCanvas = await canvasApi.update(updatedCanvas._id, updatedCanvas);
        setCanvases((current) => current.map((canvas) => canvas._id === savedCanvas._id ? savedCanvas : canvas));
        setMessage("Saved");
      } catch (error) {
        setMessage(`Could not save: ${error.message}`);
      }
    }, 500);
  };

  const deleteCanvas = async (id) => {
    if (!window.confirm("Delete this canvas?")) return;
    try {
      await canvasApi.remove(id);
      const remaining = canvases.filter((canvas) => canvas._id !== id);
      setCanvases(remaining);
      setSelectedCanvasId(remaining[0]?._id || null);
      setMessage(remaining.length ? "" : "No canvases yet.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="app-shell">
      <CanvasList canvases={canvases} selectedId={selectedCanvasId} onSelect={setSelectedCanvasId} onCreate={createCanvas} onDelete={deleteCanvas} />
      {selectedCanvas ? <CanvasEditor key={selectedCanvas._id} canvas={selectedCanvas} onSave={updateCanvas} /> : <main className="welcome"><h1>Mini Design Canvas</h1><p>{message}</p><button onClick={createCanvas}>Create your first canvas</button></main>}
      {selectedCanvas && message && <div className="save-status">{message}</div>}
    </div>
  );
}
