import React from 'react';

const getYoutubeEmbeded = (url) => {
    let _url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(_url[2] !== undefined) {
      let _ID = _url[2].split(/[^0-9a-z_\-]/i);
      return 'https://www.youtube.com/embed/' + _ID[0];
    }

    return null;
}

const VideoPlayer = ({url, style}) => {
    
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

export default VideoPlayer;