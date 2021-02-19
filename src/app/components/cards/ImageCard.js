import React from 'react';
import { IconButton, Icon } from '@material-ui/core';
import { RedIconBtn } from '../ColorBtns';

import { asset_path } from 'app/helpers/resource';

const ImageCard = ({src, description, link = null, onEdit, onDelete}) => {
	return (
        <div className="m-10 w-full sm:w-auto">
            <div className="relative sm:h-200 shadow">
                <a href={link} target="_blank">
                    {description && 
                        <>
                            <div className="w-full p-12 sm:hidden">{description}</div>
                            <div className="w-full p-12 bg-black bg-opacity-60 text-white absolute hidden sm:block text-overflow-hidden hover-show-all">
                                {description}
                            </div>
                        </>
                    }
                    <img className="w-full h-auto sm:h-full sm:w-auto" src={asset_path(src)}/>
                </a>
                <div className="absolute bottom-0 right-0">
                    {onEdit && <IconButton color="info" onClick={onEdit}><Icon>edit</Icon></IconButton>}
                    {onDelete && <RedIconBtn onClick={onDelete}><Icon>delete</Icon></RedIconBtn>}
                </div>
            </div>
        </div>
	);
}

export default ImageCard;
