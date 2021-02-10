import React from 'react';

const styles = {
    container: {
        width: '100%',
        display: 'flex',
        position: 'relative'
    },
    ratio: {
        width: '100%',
        marginBottom: 'calc(100%*0.75)'
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    innerImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
}

const RatioImage = (props) => {
    return (
        <div style={styles.container}>
            <div style={styles.ratio}></div>
            <div style={styles.image}>
                <img  style={styles.innerImage} {...props}></img>
            </div>
        </div>
    )
}

export default RatioImage;