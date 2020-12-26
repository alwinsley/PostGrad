import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMember = createAsyncThunk('UsersPage/player/getMember', async params => {
	const response = await axios.get('/api/user', { params });
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveMember = createAsyncThunk('UsersPage/player/saveMember', async payload => {
	const response = await axios.post('/api/user', payload);
	const data = await response.data;

	return data;
});

const playerSlice = createSlice({
	name: 'UsersPage/player',
	initialState: null,
	reducers: {
		resetMember: () => null
	},
	extraReducers: {
		[getMember.fulfilled]: (state, action) => action.payload,
		[saveMember.fulfilled]: (state, action) => action.payload
	}
});

export const { resetMember } = playerSlice.actions;

export default playerSlice.reducer;
