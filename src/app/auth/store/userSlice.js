import { createSlice } from '@reduxjs/toolkit';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';

export const setUserData = user => async (dispatch, getState) => {
	/* You can redirect the logged-in user to a specific route depending on his role */
	// history.location.state = {
	// 	redirectUrl: '/'
	// };

	history.push({
		pathname: '/'
	});

	dispatch(setUser(user));
};

export const updateUserSettings = settings => async (dispatch, getState) => {
	const oldUser = getState().auth.user;
	const user = _.merge({}, oldUser, { data: { settings } });

	dispatch(updateUserData(user));

	return dispatch(setUserData(user));
};

export const updateUserShortcuts = shortcuts => async (dispatch, getState) => {
	const { user } = getState().auth;
	const newUser = {
		...user,
		shortcuts
	};

	dispatch(updateUserData(user));

	return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
	const { user } = getState().auth;

	if (!user.role || user.role.length === 0) {
		// is guest
		return null;
	}

	history.push({
		pathname: '/'
	});

	jwtService.logout();

	dispatch(setInitialSettings());

	return dispatch(userLoggedOut());
};

export const updateUserData = user => async (dispatch, getState) => {
	if (!user.role || user.role.length === 0) return;
	
	jwtService.updateUserData(user)
		.then((res) => {
			dispatch(setUser(res.data.user));
		})
		.catch(error => {
			dispatch(showMessage({ message: error.message }));
		});
};

export const updateUserAvatar = payload => async (dispatch, getState) => {
	jwtService.updateUserAvatar(payload)
		.then((res) => {
			dispatch(setUser(res.data.user));
		})
		.catch(error => {
			dispatch(showMessage({ message: error.message }));
		});
};

const initialState = {
	role: [], // guest
	name: 'John Doe',
	avatar: 'assets/images/avatars/Velazquez.jpg',
	email: 'johndoe@withinpixels.com',
	shortcuts: ['myprofile', 'calendar', 'mail'],
	noti: 0
};

const userSlice = createSlice({
	name: 'auth/user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			return {...state, ...action.payload}
		},
		userLoggedOut: (state, action) => initialState,
		setUnReadMessage: (state, action) => {
			console.log(action, state.noti);
			return {...state, noti: action.payload}
		}
	},
	extraReducers: {}
});

export const { setUser, userLoggedOut, setUnReadMessage } = userSlice.actions;

export default userSlice.reducer;
