import { useRef } from "react";
import "./RotaryKnob.css";

const emptyImage = new Image(0, 0);

const RotaryKnob = ({
  knobValue,
  setKnobValue,
  knobAngleOffset = -90,
}: {
  knobValue: number;
  setKnobValue: (value: number) => void;
  knobAngleOffset?: number;
}) => {
  const knobRef = useRef<HTMLDivElement>(null);

  // Calculates the degrees of the knob
  const calDeegres = (x: number, y: number) => {
    const radians = Math.atan2(y, x);
    const degrees = radians * (180 / Math.PI) + 90;
    return degrees - knobAngleOffset;
  };

  // Hightlights the dot in the knob
  const dotsHightlightPosition = Math.round(((knobValue * 1.8) / 360) * 11);

  // Handles the drag event of the knob
  const handleDrag: React.DragEventHandler<HTMLDivElement> = (e) => {
    if (knobRef == null) return;
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    if (x === 0 && y === 0) return;
    const knobBox = knobRef.current?.getBoundingClientRect();
    const knobMiddleX = knobBox!.x + knobBox!.width / 2;
    const knobMiddleY = knobBox!.y + knobBox!.height / 2;
    const dx = x - knobMiddleX;
    const dy = y - knobMiddleY;

    const degrees = calDeegres(dx, dy);
    console.log(x, y, degrees);
    setKnobValue(degrees);
  };

  // Handles the drag start event of the knob so the image is not shown
  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.dataTransfer.setDragImage(emptyImage, 0, 0);
  };

  // Creates the dots in the knob
  const Dots = ({ n = 0 }) => {
    let dots = [];
    for (let i = 0; i < n; ++i) {
      dots.push(
        <div
          className="dot"
          key={i}
          style={{
            backgroundColor: i === dotsHightlightPosition ? "red" : "black",
          }}
        ></div>
      );
    }

    return <div className="Dots">{dots}</div>;
  };

  return (
    <>
      <div>{Dots({ n: 11 })}</div>
      <div
        className="slider"
        ref={knobRef}
        draggable={true}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        style={{
          transform: `rotate(${knobValue + knobAngleOffset}deg)`,
        }}
      >
        <div className="knob"></div>
      </div>
      <div className="inicialValue">1</div>
      <div className="finalValue">11</div>
    </>
  );
};

export default RotaryKnob;
