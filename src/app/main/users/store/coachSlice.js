import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoach = createAsyncThunk('UsersPage/coach/getCoach', async params => {
	const response = await axios.get('/api/user', { params });
	const data = await response.data;

	return data === undefined ? null : data;
});

export const saveCoach = createAsyncThunk('UsersPage/coach/saveCoach', async payload => {
	const response = await axios.post('/api/user', payload);
	const data = await response.data;

	return data;
});

const coachSlice = createSlice({
	name: 'UsersPage/coach',
	initialState: null,
	reducers: {
		resetCoach: () => null
	},
	extraReducers: {
		[getCoach.fulfilled]: (state, action) => action.payload,
		[saveCoach.fulfilled]: (state, action) => action.payload
	}
});

export const { resetCoach } = coachSlice.actions;

export default coachSlice.reducer;
