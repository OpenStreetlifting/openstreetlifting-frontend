export interface RankingAthlete {
	athlete_id: string;
	first_name: string;
	last_name: string;
	slug: string;
	country: string;
	gender: string;
}

export interface RankingCompetition {
	competition_id: string;
	name: string;
	date: string;
}

export interface RankingEntry {
	rank: number;
	athlete: RankingAthlete;
	total: number;
	muscleup: number;
	pullup: number;
	dips: number;
	squat: number;
	competition: RankingCompetition;
}

export interface PaginationInfo {
	page: number;
	page_size: number;
	total_items: number;
	total_pages: number;
}

export interface RankingsResponse {
	data: RankingEntry[];
	pagination: PaginationInfo;
}

export interface RankingFilters {
	pagination: number;
	gender?: string | null;
	country?: string | null;
	movement?: string;
}
