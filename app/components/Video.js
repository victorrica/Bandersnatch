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
      delay: 0,
      showContent: false,
    }
  }
  renderContent(){
    if(this.props.video.button && this.state.showContent) {
      return (
        <div className={styles.content}>
            <div className={styles.progressBar} 
              style={{transition: 'width ' + this.state.delay + 's ease-in', width: this.state.percentage + '%'}}
              >
              <div className={styles.filler}></div>
            </div>
            {this.renderButtons()}
        </div>
      );
    }
  }

  nextVideo(video){
    if(video) {
      this.props.nextVideo(video);
    } else{
      this.props.nextVideo();
    }
    this.setState({
      percentage: 0,
      delay: 5,
      showContent: false,
    });
  }

  renderButtons(){
    if(this.props.video.button) {
      const buttons = this.props.video.button.map((item, index) => 
        <div key={index} className={styles.btn} onClick={ () => this.nextVideo(item[Object.keys(item)[0]])}>
          <span>{Object.keys(item)[0]}</span>
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
      
      if(duration <= currentTime) {
        if(noSelection) {
          this.nextVideo(noSelection);
        }
      } else if(duration - timeout <= currentTime) {
        this.setState({
          delay: 5,
          showContent: true
        });
        this.state.percentage+=100;
      }
      this.setState({interval: interval});

    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.backButton}>
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-2x" />
          </Link>
        </div>
        <video autoPlay ref="video" className={styles.screen} src={this.props.video.video}></video>
        {this.renderContent()}
      </div>
    );
  }
}
