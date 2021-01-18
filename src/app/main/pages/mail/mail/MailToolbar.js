import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';

const pathToRegexp = require('path-to-regexp');

function MailToolbar(props) {
	const dispatch = useDispatch();
	const theme = useTheme();

	const toPath = pathToRegexp.compile(props.match.path);

	const routeParams = useParams();
	const matchParams = { ...routeParams };
	delete matchParams.id;
	const deselectUrl = toPath(matchParams);

	return (
		<div className="flex flex-1 items-center justify-between overflow-hidden sm:px-16">
			<IconButton onClick={() => props.history.push(deselectUrl)}>
				<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
			</IconButton>
		</div>
	);
}

export default withRouter(MailToolbar);
