import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Video from '../components/Video';
import * as videoActions from '../actions/video';

function mapStateToProps(state) {
  return {
    video: state.video,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(videoActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Video);
