import React from 'react';
import { Icon } from '@material-ui/core';
import { RedIconBtn } from '../ColorBtns';

import { asset_path } from 'app/helpers/resource';

const SponsorshipCard = ({data, control, onTriggeredAction, ...props}) => {
    
	return (
        <div className="relative m-10 w-full sm:w-auto">
            <div className="sm:h-200">
                <a href={data.description} target="_blank">
                    <img className="w-full h-auto sm:h-full sm:w-auto" src={asset_path(data.image)}/>
                </a>
            </div>
            
            {control && 
                <div className="absolute top-0 right-0">
                    <RedIconBtn onClick={() => onTriggeredAction('delete')}><Icon>delete</Icon></RedIconBtn>
                </div>
            }
        </div>
	);
}

export default SponsorshipCard;
