export interface Federation {
	federation_id: string;
	name: string;
	abbreviation: string;
	country: string;
}

export interface Movement {
	movement_name: string;
	is_required: boolean;
	display_order: number;
}

export interface Competition {
	competition_id: string;
	name: string;
	created_at: string;
	slug: string;
	status: 'upcoming' | 'ongoing' | 'completed';
	venue: string;
	city: string;
	country: string;
	start_date: string;
	end_date: string;
	federation: Federation;
	movements: Movement[];
}

export interface CompetitionFilters {
	status?: 'upcoming' | 'ongoing' | 'completed';
	country?: string;
	search?: string;
}
