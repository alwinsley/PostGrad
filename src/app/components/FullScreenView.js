import React, { useEffect, useRef, useState } from 'react';
import {
	AppBar,
	Button,
	Dialog,
	Icon,
	Typography,
	Toolbar,
	TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { asset_path } from 'app/helpers/resource';
import VideoPlayer from 'app/components/VideoPlayer';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = (count, arrowClass) => {
    return {
        dots: false,
        infinite: count > 3 ? true : false,
        speed: 500,
        slidesToShow: 2.4,
        slidesToScroll: 1,
        prevArrow: <a><Icon className={arrowClass}>arrow_back_ios</Icon></a>,
        nextArrow: <a><Icon className={arrowClass}>arrow_forward_ios</Icon></a>,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    infinite: count > 2,
                    slidesToShow: 1.6,
                    arrows: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    infinite: count > 1,
                    slidesToShow: 1,
                    arrows: false,
                }
            },
        ],
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiDialog-paper' : {
            margin: 0,
            borderRadius: 0,
            maxWidth: 'none!important',
            width: '100%',
            overflow: 'hidden'
        },
        '& .slick-list': {
            overflow: 'visible'
        },
        '& .slick-arrow' : {
            width: '4rem',
            height: '4rem',
            zIndex: 999,
        },
        '& .slick-next' : {
            right: 0
        },
        '& .slick-prev' : {
            left: 0
        },
        '& .slick-arrow::before': {
            display: 'none',
        }
    },
    sliderContainer: {
        padding: '0 5px'
    },
    itemWrapper: {
        padding: '0 10px'
    },
	item: {
        width: '100%'
    },
    arrow: {
        fontSize: '4rem',
        color: '#989898'
    }
}));

const FullScreenView = ({open, onClose, list}) => {
    const classes = useStyles();
    const _slidSettings = sliderSettings(list.count, classes.arrow);

	return (
        <Dialog
            open={open}
            onClose={onClose}
            component="form"
            className={classes.root}
        >
            <div className={classes.sliderContainer}>
                <Slider {..._slidSettings}>
                    {list.map((item, index) => {
                        if(item.type === 'VIDEO') {
                            return (
                                <div className={classes.itemWrapper}>
                                    <VideoPlayer url={asset_path(item.url)} style={{height: '100%', width: '100%'}}/>
                                </div>
                            )
                        }else if(item.type === 'IMAGE'){
                            return (
                                <div className={classes.itemWrapper}>
                                    <img key={index} className={classes.item} src={asset_path(item.url)} />
                                </div>
                            )
                        }
                        return null; 
                    })}
                </Slider>
            </div>
        </Dialog>
	);
}

export default FullScreenView;
