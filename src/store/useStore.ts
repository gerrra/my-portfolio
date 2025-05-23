import { create } from 'zustand';

type State = {
    loading: boolean;
};

export const useStore = create<State>(() => ({
    loading: true,
}));
