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

export interface Athlete {
	athlete_id: string;
	first_name: string;
	last_name: string;
	gender: string;
	country: string;
	nationality: string;
	slug: string;
}

export interface Attempt {
	attempt_number: number;
	weight: string;
	is_successful: boolean;
	passing_judges: number;
	no_rep_reason: string | null;
}

export interface Lift {
	movement_name: string;
	best_weight: string;
	attempts: Attempt[];
}

export interface Participant {
	athlete: Athlete;
	bodyweight: string | null;
	rank: number | null;
	category_rank: number | null;
	competition_rank: number | null;
	total: string;
	ris_score: string | null;
	is_disqualified: boolean;
	disqualified_reason: string | null;
	lifts: Lift[];
}

export type RankingScope = 'group' | 'category' | 'competition';

export interface Category {
	category_id: string;
	name: string;
	gender: string;
	weight_class_min: string | null;
	weight_class_max: string | null;
}

export interface CategoryDetail {
	category: Category;
	participants: Participant[];
}

export interface CompetitionDetail {
	competition_id: string;
	name: string;
	slug: string;
	status: string;
	venue: string | null;
	city: string | null;
	country: string | null;
	start_date: string | null;
	end_date: string | null;
	federation: Federation;
	categories: CategoryDetail[];
}
