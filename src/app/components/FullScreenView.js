import React, { useEffect, useRef, useState } from 'react';
import {
    Modal,
    Fab,
    Icon
} from '@material-ui/core';
import { asset_path } from 'app/helpers/resource';
import VideoPlayer from 'app/components/VideoPlayer';

import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
}

const FullScreenView = ({open, onClose, list}) => {
    if(!open) return null;

	return (
        <Modal open={open} onClose={onClose} className="w-full h-full">
            <div className="relative h-full w-full bg-white p-16">
                <Slider {...sliderSettings}>
                    {list.map((item, index) => 
                        <div key={index} className="h-screen--60 w-full">
                            {item.type === 'VIDEO' ? 
                                <div className="h-full flex items-center justify-center">
                                    <div style={{width: '100%', maxWidth: 'calc(177vh - 106.2px)'}}>
                                        <VideoPlayer url={asset_path(item.url)} style={{height: '100%', width: '100%'}}/>
                                    </div>
                                </div>
                                :
                                <img className="w-full h-full object-contain" src={asset_path(item.url)} />
                            }
                        </div>
                    )}
                </Slider>
                <Fab
                    color="secondary"
                    aria-label="add"
                    className="absolute bottom-24 right-12 sm:right-24"
                    onClick={onClose}
                >
                    <FullscreenExitIcon />
                </Fab>
            </div>
        </Modal>
	);
}

export default FullScreenView;
