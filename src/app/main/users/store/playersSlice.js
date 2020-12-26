import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPlayers = createAsyncThunk('UsersPage/players/getPlayers', async () => {
	const response = await axios.get('/api/profiles?role=PLAYER');
	const data = await response.data;

	return data;
});

export const removePlayers = createAsyncThunk(
	'UsersPage/players/removePlayers',
	async (playerIds, { dispatch, getState }) => {
		const response = await axios.post('/api/remove_players', { playerIds });
		const data = await response.data;

		dispatch(getPlayers());

		return data;
	}
);

const playersAdapter = createEntityAdapter({});

export const { selectAll: selectPlayers, selectById: selectPlayerById } = playersAdapter.getSelectors(
	state => state.UsersPage.players
);

const playersSlice = createSlice({
	name: 'UsersPage/players',
	initialState: playersAdapter.getInitialState({
		searchText: ''
	}),
	reducers: {
		setPlayersSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		}
	},
	extraReducers: {
		[getPlayers.fulfilled]: playersAdapter.setAll
	}
});

export const { setPlayersSearchText } = playersSlice.actions;

export default playersSlice.reducer;
