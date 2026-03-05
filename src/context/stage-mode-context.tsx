"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type StageModeContextType = {
  stageMode: boolean;
  toggleStageMode: () => void;
};

const StageModeContext = createContext<StageModeContextType>({
  stageMode: false,
  toggleStageMode: () => {},
});

export function StageModeProvider({ children }: { children: ReactNode }) {
  const [stageMode, setStageMode] = useState(false);

  const toggleStageMode = () => setStageMode((prev) => !prev);

  return (
    <StageModeContext.Provider value={{ stageMode, toggleStageMode }}>
      {children}
    </StageModeContext.Provider>
  );
}

export const useStageMode = () => useContext(StageModeContext);
