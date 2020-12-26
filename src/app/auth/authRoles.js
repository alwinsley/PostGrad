/**
 * Authorization Roles
 */
const authRoles = {
	onlyAdmin: ['ADMIN'],
	onlyCoach: ['COACH'],
	onlyPlayer: ['PLAYER'],
	admin: ['COACH', 'ADMIN'], 
	user: ['COACH', 'PLAYER'],
	notGuest: ['ADMIN', 'COACH', 'PLAYER'],
	onlyGuest: []
};

export default authRoles;
