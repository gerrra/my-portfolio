import { create } from 'zustand';

type State = {
    loading: boolean;
    isAuthorized: boolean;
};

export const useStore = create<State>(() => ({
    loading: false,
    isAuthorized: false,
}));
