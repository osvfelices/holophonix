import RotaryKnob from "./Knob/RotaryKnob";
import { useTestStore } from "./useTestStore";
import "./App.css";

export default function App() {
  const knobValue = useTestStore(({ state }) => state.sliderValue);
  const setKnobValue = useTestStore(({ setSliderValue }) => setSliderValue);

  return (
    <div className="App">
      <RotaryKnob {...{ knobValue, setKnobValue }} />
      <div className="knobValue">Rotary knob value: {Math.floor(knobValue)}</div>
    </div>
  );
}
