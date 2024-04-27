import { create } from "zustand";

type AppState = {
    selected3D: string;

    actions: {
        setSelected3D: (selected3D: string) => void;
    };
};

export const useAppStore = create<AppState>((set) => ({
    selected3D: "3D3",

    actions: {
        setSelected3D(selected3D) {
            set({ selected3D });
        },
    }
}));

export function useAppAction() {
    return useAppStore((state) => state.actions);
}
