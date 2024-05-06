import React, { createContext, ReactElement, useContext, useRef } from "react";

interface CanvasContextValue {
  canvasRef: React.RefObject<HTMLCanvasElement> | undefined;
}

const CanvasContext = createContext<CanvasContextValue>({
  canvasRef: undefined,
});

export const CanvasProvider = ({ children }: { children: ReactElement }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <CanvasContext.Provider value={{ canvasRef: canvasRef }}>
      {children}
    </CanvasContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCanvas = () => useContext(CanvasContext);
