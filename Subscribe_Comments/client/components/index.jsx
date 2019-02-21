import Main from './main.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import { getVideoData } from '../clientHelpers.js';
import { isUserSubscribed } from '../clientHelpers.js';

class VideoDetailsAndComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      videoData: null,
      subscribed: null
    });
  }

  componentDidMount() {
    var query = window.location.search || '?v=1';
    var queryStart = query.indexOf('=') + 1;
    var videoId = queryStart === 0 ? query.substring(1) : query.substring(queryStart);
    if (isNaN(Number(videoId)) || Number(videoId) < 1 || Number(videoId) > 100) {
      videoId = '1';
    }
    getVideoData(videoId, 'http://localhost:3002/watch/details', (data) => {
      console.log(data);
      this.setState({
        videoData: data,
        subscribed: isUserSubscribed(data.videoDetails.channel, data.userSubscribes)
      });
    }, (err, errDesc) => {
      console.log('err: ', err, 'errDesc: ', errDesc);
    });
  }

  render() {
    if (!this.state.videoData) {
      return (
        <div></div>
      );
    } else {
      return (
        <Main videoData={this.state.videoData} subscribed={this.state.subscribed} />
      );
    }
  }
  
}

export default VideoDetailsAndComments;

// ReactDOM.render(<VideoDetailsAndComments />, document.getElementById('root'));