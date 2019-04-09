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
        hiddenButton: action.hiddenButton,
        noSelection: action.noSelection,
        timeout: action.timeout,
        percentage: 0,
        ending: action.ending
      }
    default:
      return state;
  }
}
