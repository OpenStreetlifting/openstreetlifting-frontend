import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: 'OpenStreetlifting',
		description: 'OpenStreetlifting is the Open and Permanent database of Streetlifting',
		timestamp: new Date().toISOString()
	};
};
