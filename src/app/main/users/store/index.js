import { combineReducers } from '@reduxjs/toolkit';
import coach from './coachSlice';
import coachs from './coachsSlice';
import player from './playerSlice';
import players from './playersSlice';

const reducer = combineReducers({
	coach,
	coachs,
	player,
	players
});

export default reducer;
