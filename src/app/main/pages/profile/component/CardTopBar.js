import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
	GridListTileBar,
	Icon,
	IconButton,
	Menu,
	MenuItem
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
	icon: {
	  color: 'white',
	},
}));

const CardTopBar = ({title, onEdit, onDelete, disabled}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        onEdit();
    };

    const handleDelete = () => {
        setAnchorEl(null);
        onDelete();
    };
    
    return (
        <GridListTileBar
            title={title}
            titlePosition="top"
            actionIcon={
                disabled ? null :
                <>
                    <IconButton
                        className={classes.icon}
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <Icon>more_vert</Icon>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {width: '80px'},
                        }}
                    >
                        <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                </>
            }
            actionPosition="left"
        />
    )
}

export default CardTopBar;