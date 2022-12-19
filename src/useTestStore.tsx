import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

interface ITestStore {
  state: {
    sliderValue: number;
  };
  setSliderValue: (value: number) => void;
}

const useTestStore = create<ITestStore>()(
  immer(
    subscribeWithSelector((set) => ({
      state: {
        sliderValue: 0
      },
      setSliderValue: (value) =>
        set(({ state }) => {
          state.sliderValue = value;
        })
    }))
  )
);

export { useTestStore };
