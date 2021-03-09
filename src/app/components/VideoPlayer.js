import React from 'react';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        position: 'relative'
    },
    ratio: {
        width: '100%',
        marginBottom: 'calc(100%*0.5625)'
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        background: 'transparent'
    }
}
const checkHudleEmbeded = (url) => {
    const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    if(!matches) return false;

    if(matches[1] === 'www.hudl.com' || matches[1] === 'hudl.com') return true;
    return false;
}

const getYoutubeEmbeded = (url) => {
    let _url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(_url[2] !== undefined) {
      let _ID = _url[2].split(/[^0-9a-z_\-]/i);
      return 'https://www.youtube.com/embed/' + _ID[0];
    }

    return null;
}

const Video = ({url, style}) => {
    if(checkHudleEmbeded(url)){
        return (
            <iframe
                style={style}
                src={url}
                frameborder="0"
                allowFullscreen>
            </iframe>
        )
    }

    const youtubeUrl = getYoutubeEmbeded(url);
    if(youtubeUrl){
        return (
            <iframe
                style={style}
                src={youtubeUrl}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        )
    }

    return (
        <video src={url} controls style={style}></video>
    )
}

const VideoPlayer = ({ fullScreen, onClick, ...props}) => {
    return (
        <div style={styles.container}>
            <div style={styles.ratio}></div>
            <div style={styles.video}>
                <Video {...props}></Video>
            </div>
            {!fullScreen && 
                <div style={styles.overlay} onClick={onClick}></div>
            }
        </div>
    )
}

export default VideoPlayer;