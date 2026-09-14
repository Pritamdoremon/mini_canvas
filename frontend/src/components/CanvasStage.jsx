import { useEffect, useRef } from "react";
import { Circle, Layer, Rect, Stage, Text, Transformer } from "react-konva";

export default function CanvasStage({ elements, selectedId, onSelect, onChange }) {
  const transformerRef = useRef(null);
  const nodeRefs = useRef({});

  useEffect(() => {
    const transformer = transformerRef.current;
    const selectedNode = nodeRefs.current[selectedId];
    transformer.nodes(selectedNode ? [selectedNode] : []);
    transformer.getLayer().batchDraw();
  }, [selectedId, elements]);

  const finishTransform = (element, node) => {
    // Konva stores resize changes in scale, so save normal dimensions in React state.
    const changes = { x: node.x(), y: node.y(), rotation: node.rotation() };
    if (element.type === "circle") {
      changes.radius = Math.max(10, element.radius * Math.max(node.scaleX(), node.scaleY()));
    } else {
      changes.width = Math.max(20, node.width() * node.scaleX());
      changes.height = Math.max(20, node.height() * node.scaleY());
    }
    node.scaleX(1);
    node.scaleY(1);
    onChange(element.id, changes);
  };

  const commonProps = (element) => ({
    ref: (node) => { nodeRefs.current[element.id] = node; },
    x: element.x, y: element.y, fill: element.fill, rotation: element.rotation,
    draggable: true,
    onClick: (event) => { event.cancelBubble = true; onSelect(element.id); },
    onTap: (event) => { event.cancelBubble = true; onSelect(element.id); },
    onDragEnd: (event) => onChange(element.id, { x: event.target.x(), y: event.target.y() }),
    onTransformEnd: (event) => finishTransform(element, event.target)
  });

  return (
    <div className="stage-wrap">
      <Stage width={820} height={600} onMouseDown={(e) => e.target === e.target.getStage() && onSelect(null)}>
        <Layer>
          {elements.map((element) => {
            const props = commonProps(element);
            if (element.type === "rectangle") return <Rect key={element.id} {...props} width={element.width} height={element.height} />;
            if (element.type === "circle") return <Circle key={element.id} {...props} radius={element.radius} />;
            return <Text key={element.id} {...props} text={element.text} fontSize={element.fontSize} width={element.width} height={element.height} />;
          })}
          <Transformer ref={transformerRef} rotateEnabled enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]} />
        </Layer>
      </Stage>
    </div>
  );
}
