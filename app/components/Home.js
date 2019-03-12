// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
import script from '../assets/script.json';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;
  render() {
    let introVideo = script.path + script.videos[script.intro].video;
    return (
      <div className={styles.container}>
        <video autoPlay loop className={styles.screen} src={introVideo}></video>
        <div className={styles.content}>
          <Link className={styles.btn} to={routes.VIDEO}>시 작 하 기</Link>
        </div>
      </div>
    );
  }
}