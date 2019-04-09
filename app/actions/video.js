// @flow
import type { GetState, Dispatch } from '../reducers/types';
import script from '../assets/script.json';


export const LOAD_VIDEO = 'LOAD_VIDEO';
export const LOAD_ENDING_VIDEO = 'LOAD_ENDING_VIDEO';

export function loadVideo(video) {
  return {
    type: 'LOAD_VIDEO',
    video: script.path + video.video,
    button: video.button,
    hiddenButton: video.hiddenButton,
    noSelection: video.noSelection,
    timeout: video.timeout?video.timeout:script.timeout,
    ending: video.ending
  }
}

export function nextVideo(video = script.init) {
  return(dispatch: Dispatch, getState: getState) => {
    let videoPath = script.videos[video];
    dispatch(loadVideo(videoPath));
  }
}