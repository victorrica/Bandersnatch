import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type videoStateType = {
  +video: number
};

export type Action = {
  +type: string
};

export type GetState = () => videoStateType;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<GetState, Action>;
