// @flow
import { LOAD_VIDEO, LOAD_ENDING_VIDEO } from '../actions/video';
import type { Action } from './types';

export default function video(state: number = 0, action: Action) {
  switch (action.type) {
    case LOAD_VIDEO:
      return {
        ...state,
        video: action.video,
        button: action.button,
        noSelection: action.noSelection,
        timeout: action.timeout,
        percentage: 0
      }
    case LOAD_ENDING_VIDEO:
      return {
        ...state,
        video: action.video,
        timeout: action.timeout,
        button: null,
        noSelection: null,
        percentage: 0
      }
    default:
      return state;
  }
}
