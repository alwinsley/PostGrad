import React, {useState} from 'react';

import { 
	Card,
    CardHeader,
    CardContent,
    IconButton,
    Button,
    Icon
} from '@material-ui/core';
import { RedIconBtn } from '../ColorBtns';
import { makeStyles } from '@material-ui/core/styles';

import { asset_path } from 'app/helpers/resource';

const useStyles = makeStyles((theme) => ({
    link: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '12px 10px',
        display: 'flex',
        justifyContent: 'center',
        '& a': {
           borderRadius: '50px',
           padding: '6px 32px',
           opacity: 0.7
        },
        '&:hover a': {
            opacity: 1
        }
    },
}));

const GameCard = ({game, control, onTriggeredAction, ...props}) => {
    const classes = useStyles();
    
	return (
		<Card className="w-full rounded-xl shadow-lg sm:max-w-lg ">
            <CardHeader
                className={classes.header}
                title={game.title}
                action={
                    control ?
                        <div>
                            <IconButton color="info" onClick={() => onTriggeredAction('Edit')}><Icon>edit</Icon></IconButton>
                            <RedIconBtn onClick={() => onTriggeredAction('Delete')}><Icon>delete</Icon></RedIconBtn>
                        </div>
                    : null
                }
            />
            
            <CardContent style={{padding: 0}}>
                <div className="relative h-auto sm:h-256 xl:h-320">
                    <img className="h-full w-full object-cover" src={asset_path(game.image)} alt={game.title}/>

                    <div className={classes.link}>
                        <Button variant="contained" color="primary" className="m-12" href={ game.link || '#'} target="blank">View</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
	);
}

export default GameCard;
