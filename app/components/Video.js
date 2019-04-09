// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Video.css';
import routes from '../constants/routes';

type Props = {
};

export default class Video extends Component<Props> {
  props: Props;
  constructor(props) {
    super(props);

    this.state = {
      percentage: 0,
      percentageVisible: 'visible',
      delay: 0,
      showContent: -100,
      buttonChanged: false
    }
  }
  renderContent(){
    if(this.props.video.button) {
      return (
        <div className={styles.content} style={{bottom: this.state.showContent}}>
            <div className={styles.progressBar} 
              style={{transition: 'width ' + this.state.delay + 's ease-in', width: this.state.percentage + '%', visibility: this.state.percentageVisible}}
              >
              <div className={styles.filler}></div>
            </div>
            {this.renderButtons()}
        </div>
      );
    }
  }

  nextVideo(video){
    console.log("NEXT VIDEO / ", video);
    this.setState({
      percentage: 0,
      delay: 0,
      showContent: -100,
      buttonChanged: false,
    });

    if(video) {
      this.props.nextVideo(video);
    } else {
      // INIT VIDEO
      this.props.nextVideo();
    }
    setTimeout(() => {
      this.setState({
        buttonChanged: true
      });
    }, 2000);
  }

  renderButtons(){
    if(this.props.video.button && this.state.buttonChanged) {
      const buttons = this.props.video.button.map((item, index) => 
        <div key={index} className={styles.btn} onClick={ () => this.nextVideo(item.video)}>
          <span>{item.name}</span>
        </div>
      );
      return buttons;
    }
  }

  renderHiddenButtons(){
    if(this.props.video.hiddenButton) {
      const buttons = this.props.video.hiddenButton.map((item, index) =>
        <div key={index} className={styles.hiddenBtn} style={item.style} onClick={ () => this.nextVideo(item.video)}>
        </div>
      );
      return buttons;
    }
  }

  componentDidMount(){
	  this.nextVideo();
    let interval = setInterval(() => {
      let duration = this.refs.video?this.refs.video.duration:null;
      let currentTime = this.refs.video?this.refs.video.currentTime:null;
      let {timeout, noSelection} = this.props.video;

      console.log("DURATION / ", duration);
      console.log("CURRENTTIME / ", currentTime);
      console.log("NOSELECTION / ", noSelection);
      
      // IF DO NOT SELECT BUTTONS
      if(duration <= currentTime) {
        console.log("VIDEO DONE");
        if(noSelection) {
          this.nextVideo(noSelection);
        }
      } 
      // BUTTON SHOWING TIME
      else if(duration - timeout <= currentTime && this.props.video.button) {
        console.log("SHOWING BUTTON");
        this.setState({
          delay: this.props.video.timeout - 1,
          percentage: 100,
          percentageVisible: this.props.video.ending?'hidden':'visible',
          showContent: 0
        });
      }
      this.setState({interval: interval});
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }
  playVideo() {
    this.refs.video.play();
  }

  render() {
    return (
      <div className={styles.container}>
        {this.renderHiddenButtons()}
        <div className={styles.backButton}>
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-2x" />
          </Link>
        </div>
        <video autoPlay ref="video" onClick={this.playVideo.bind(this)} className={styles.screen} src={this.props.video.video}></video>
        {this.renderContent()}
      </div>
    );
  }
}
