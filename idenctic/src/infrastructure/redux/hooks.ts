// Redux Hooks with TypeScript support

import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

// Type-safe hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => useSelector(selector, equalityFn);
export const useAppStore = () => useStore<AppStore>();
