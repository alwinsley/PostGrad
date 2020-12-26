import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCoachs = createAsyncThunk('UsersPage/coachs/getCoachs', async () => {
	const response = await axios.get('/api/profiles?role=COACH');
	const data = await response.data;

	return data;
});

export const removeCoachs = createAsyncThunk(
	'UsersPage/coachs/removeCoachs',
	async (coachIds, { dispatch, getState }) => {
		const response = await axios.post('/api/remove_coachs', { coachIds });
		const data = await response.data;

		dispatch(getCoachs());

		return data;
	}
);

const coachsAdapter = createEntityAdapter({});

export const { selectAll: selectCoachs, selectById: selectCoachById } = coachsAdapter.getSelectors(
	state => state.UsersPage.coachs
);

const coachsSlice = createSlice({
	name: 'UsersPage/coachs',
	initialState: coachsAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setCoachsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getCoachs.fulfilled]: coachsAdapter.setAll
	}
});

export const { setCoachsSearchText } = coachsSlice.actions;

export default coachsSlice.reducer;
