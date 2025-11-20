import { PUBLIC_OPENSTREETLIFTING_API_URL } from '$env/static/public';

export const config = {
	apiUrl: PUBLIC_OPENSTREETLIFTING_API_URL || 'http://localhost:8080'
} as const;
