<script lang="ts">
	import type { PageData } from './$types';
	import type { Participant, RankingScope } from '$lib/types/competition';
	import { Card, Breadcrumb } from '$lib/components/ui';
	import { SortIcon } from '$lib/components/icons';
	import { resolve } from '$app/paths';
	import { SvelteMap } from 'svelte/reactivity';
	import { competitionsService } from '$lib/api';

	let { data }: { data: PageData } = $props();

	// Ranking scope state
	let rankingScope = $state<RankingScope>('group');
	let competitionData = $state(data.competition);
	let isLoading = $state(false);

	// Fetch competition data when ranking scope changes
	async function updateRankingScope(newScope: RankingScope) {
		if (newScope === rankingScope) return;
		rankingScope = newScope;
		isLoading = true;
		try {
			competitionData = await competitionsService.getById(data.competition.slug, rankingScope);
		} catch (err) {
			console.error('Failed to fetch competition with new ranking scope:', err);
		} finally {
			isLoading = false;
		}
	}

	type SortKey = 'total' | 'ris_score' | 'bodyweight' | string;
	type SortDirection = 'asc' | 'desc';

	// Store sort state per category (SvelteMap is already reactive)
	let categorySortState = new SvelteMap<string, { key: SortKey; direction: SortDirection }>();

	// Active category tab - allow manual override, but default to first category
	let selectedCategoryId = $state<string | null>(null);
	let activeCategory = $derived(
		selectedCategoryId || competitionData.categories?.[0]?.category.category_id || ''
	);

	function getRankDisplay(participant: Participant): string {
		if (participant.is_disqualified) return 'DQ';

		let rank = participant.rank; // default to group rank
		if (rankingScope === 'category' && participant.category_rank != null) {
			rank = participant.category_rank;
		} else if (rankingScope === 'competition' && participant.competition_rank != null) {
			rank = participant.competition_rank;
		}

		return rank?.toString() || '-';
	}

	function getRankBadge(participant: Participant): string {
		const rankStr = getRankDisplay(participant);
		const rank = parseInt(rankStr);
		if (isNaN(rank)) return '';

		if (rank === 1) return '🥇';
		if (rank === 2) return '🥈';
		if (rank === 3) return '🥉';
		return '';
	}

	function formatWeight(weight: string | null): string {
		if (!weight) return '-';
		return `${weight} kg`;
	}

	function formatDate(dateString: string): string {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function getSortState(categoryId: string): { key: SortKey; direction: SortDirection } {
		return categorySortState.get(categoryId) ?? { key: 'total', direction: 'desc' };
	}

	function toggleSort(categoryId: string, key: SortKey) {
		const current = { ...getSortState(categoryId) };

		if (current.key === key) {
			current.direction = current.direction === 'desc' ? 'asc' : 'desc';
		} else {
			current.direction = 'desc';
		}

		current.key = key;
		categorySortState.set(categoryId, current);
		categorySortState = categorySortState;
	}

	function sortParticipants(participants: Participant[], categoryId: string) {
		const { key, direction } = getSortState(categoryId);

		return [...participants].sort((a, b) => {
			let valueA: number;
			let valueB: number;

			if (key === 'total') {
				valueA = parseFloat(a.total) || 0;
				valueB = parseFloat(b.total) || 0;
			} else if (key === 'ris_score') {
				valueA = parseFloat(a.ris_score || '0') || 0;
				valueB = parseFloat(b.ris_score || '0') || 0;
			} else if (key === 'bodyweight') {
				valueA = parseFloat(a.bodyweight || '0') || 0;
				valueB = parseFloat(b.bodyweight || '0') || 0;
			} else {
				// Sort by movement name (key is the movement name)
				const liftA = a.lifts.find((l) => l.movement_name === key);
				const liftB = b.lifts.find((l) => l.movement_name === key);
				valueA = parseFloat(liftA?.best_weight || '0');
				valueB = parseFloat(liftB?.best_weight || '0');
			}

			return direction === 'desc' ? valueB - valueA : valueA - valueB;
		});
	}

	function getSortDirection(categoryId: string, key: SortKey): 'none' | 'asc' | 'desc' {
		const { key: currentKey, direction } = getSortState(categoryId);
		if (currentKey !== key) return 'none';
		return direction;
	}
</script>

<svelte:head>
	<title>{competitionData.name} - OpenStreetlifting</title>
	<meta name="description" content="Results and details for {competitionData.name}" />
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-12">
	<Breadcrumb
		items={[
			{ label: 'Home', href: '/' },
			{ label: 'Competitions', href: '/competitions' },
			{ label: competitionData.name }
		]}
	/>

	<!-- Ranking Scope Selector -->
	<div class="mb-6 flex items-center gap-4">
		<label class="text-sm font-medium text-zinc-400">View Rankings By:</label>
		<div class="flex gap-2">
			<button
				onclick={() => updateRankingScope('group')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {rankingScope ===
				'group'
					? 'bg-white text-zinc-900'
					: 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}"
				disabled={isLoading}
			>
				Group
			</button>
			<button
				onclick={() => updateRankingScope('category')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {rankingScope ===
				'category'
					? 'bg-white text-zinc-900'
					: 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}"
				disabled={isLoading}
			>
				Category
			</button>
			<button
				onclick={() => updateRankingScope('competition')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {rankingScope ===
				'competition'
					? 'bg-white text-zinc-900'
					: 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}"
				disabled={isLoading}
			>
				Competition (RIS)
			</button>
		</div>
		{#if isLoading}
			<span class="text-sm text-zinc-500">Loading...</span>
		{/if}
	</div>

	<!-- Competition Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-5xl font-light text-white">{competitionData.name}</h1>

		<div class="flex flex-wrap gap-x-6 gap-y-3 text-base text-zinc-400">
			<div class="flex items-center gap-2">
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<span>
					{#if competitionData.start_date}
						{formatDate(competitionData.start_date)}
						{#if competitionData.end_date && competitionData.start_date !== competitionData.end_date}
							- {formatDate(competitionData.end_date)}
						{/if}
					{/if}
				</span>
			</div>

			<div class="flex items-center gap-2">
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				<span>{competitionData.venue}, {competitionData.city}, {competitionData.country}</span>
			</div>

			<div class="flex items-center gap-2">
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
					/>
				</svg>
				<span
					>{competitionData.federation.name} ({competitionData.federation.abbreviation})</span
				>
			</div>
		</div>
	</div>

	<!-- Categories -->
	{#if competitionData.categories && competitionData.categories.length > 0}
		<!-- Category Tabs -->
		{#if competitionData.categories.length > 1}
			<div class="mb-6 border-b border-zinc-800">
				<nav class="-mb-px flex gap-2 overflow-x-auto" aria-label="Category tabs">
					{#each competitionData.categories as categoryDetail (categoryDetail.category.category_id)}
						<button
							onclick={() => (selectedCategoryId = categoryDetail.category.category_id)}
							class="border-b-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:outline-none
								{activeCategory === categoryDetail.category.category_id
								? 'border-white text-white'
								: 'border-transparent text-zinc-400 hover:border-zinc-600 hover:text-zinc-300'}"
						>
							{categoryDetail.category.name}
						</button>
					{/each}
				</nav>
			</div>
		{/if}

		<!-- Category Content -->
		<div>
			{#each competitionData.categories as categoryDetail (categoryDetail.category.category_id)}
				{#if activeCategory === categoryDetail.category.category_id}
					<Card class="p-6">
						<!-- Category Header -->
						<div class="mb-6">
							<h2 class="mb-2 text-2xl font-medium text-white">{categoryDetail.category.name}</h2>
							<div class="flex flex-wrap gap-4 text-sm text-zinc-400">
								<span>Gender: {categoryDetail.category.gender}</span>
								{#if categoryDetail.category.weight_class_min || categoryDetail.category.weight_class_max}
									<span>
										Weight Class:
										{categoryDetail.category.weight_class_min || '0'}kg -
										{categoryDetail.category.weight_class_max || '∞'}kg
									</span>
								{/if}
							</div>
						</div>

						<!-- Participants -->
						{#if categoryDetail.participants && categoryDetail.participants.length > 0}
							<div class="overflow-x-auto">
								<table class="w-full text-sm">
									<thead class="sticky top-0 z-10">
										<tr class="border-b border-zinc-800 bg-zinc-900 shadow-lg shadow-zinc-950/50">
											<th class="px-4 py-3 text-left font-medium text-zinc-400">Rank</th>
											<th class="px-4 py-3 text-left font-medium text-zinc-400">Athlete</th>
											<th class="px-4 py-3 text-left font-medium text-zinc-400">Country</th>
											<th
												class="cursor-pointer px-4 py-3 text-left font-medium text-zinc-400 transition-colors select-none hover:text-white"
												onclick={() =>
													toggleSort(categoryDetail.category.category_id, 'bodyweight')}
											>
												Bodyweight
												<SortIcon
													direction={getSortDirection(
														categoryDetail.category.category_id,
														'bodyweight'
													)}
													class="ml-1"
												/>
											</th>
											{#each categoryDetail.participants[0]?.lifts || [] as lift (lift.movement_name)}
												<th
													class="cursor-pointer px-4 py-3 text-center font-medium text-zinc-400 transition-colors select-none hover:text-white"
													onclick={() =>
														toggleSort(categoryDetail.category.category_id, lift.movement_name)}
												>
													{lift.movement_name}
													<SortIcon
														direction={getSortDirection(
															categoryDetail.category.category_id,
															lift.movement_name
														)}
														class="ml-1"
													/>
												</th>
											{/each}
											<th
												class="cursor-pointer px-4 py-3 text-left font-medium text-zinc-400 transition-colors select-none hover:text-white"
												onclick={() => toggleSort(categoryDetail.category.category_id, 'total')}
											>
												Total
												<SortIcon
													direction={getSortDirection(categoryDetail.category.category_id, 'total')}
													class="ml-1"
												/>
											</th>
											<th
												class="cursor-pointer px-4 py-3 text-left font-medium text-zinc-400 transition-colors select-none hover:text-white"
												onclick={() => toggleSort(categoryDetail.category.category_id, 'ris_score')}
											>
												RIS Score
												<SortIcon
													direction={getSortDirection(
														categoryDetail.category.category_id,
														'ris_score'
													)}
													class="ml-1"
												/>
											</th>
										</tr>
									</thead>
									<tbody>
										{#each sortParticipants(categoryDetail.participants, categoryDetail.category.category_id) as participant (participant.athlete.athlete_id)}
											<tr
												class="border-b border-zinc-800/50 transition-colors hover:bg-zinc-900/30
												{participant.is_disqualified
													? 'opacity-50'
													: participant.rank === 1
														? 'bg-gradient-to-r from-yellow-500/5 via-transparent to-transparent shadow-lg shadow-yellow-900/20'
														: participant.rank === 2
															? 'bg-gradient-to-r from-zinc-400/5 via-transparent to-transparent'
															: participant.rank === 3
																? 'bg-gradient-to-r from-orange-700/5 via-transparent to-transparent'
																: ''}"
											>
												<td class="px-4 py-3 text-white">
													{#if participant.is_disqualified}
														<span class="text-red-400">DQ</span>
													{:else}
														{@const rankStr = getRankDisplay(participant)}
														{@const rank = parseInt(rankStr)}
														{@const badge = getRankBadge(participant)}
														{#if badge && rank <= 3}
															<span
																class="font-semibold {rank === 1
																	? 'text-yellow-400'
																	: rank === 2
																		? 'text-zinc-300'
																		: 'text-orange-400'}"
															>
																{badge}
																{rankStr}
															</span>
														{:else}
															{rankStr}
														{/if}
													{/if}
												</td>
												<td class="px-4 py-3 text-white">
													<a
														href={resolve(`/athletes/${participant.athlete.slug}`)}
														class="hover:text-zinc-300 hover:underline"
													>
														{participant.athlete.first_name}
														{participant.athlete.last_name}
													</a>
													{#if participant.is_disqualified && participant.disqualified_reason}
														<span class="ml-2 text-xs text-red-400"
															>({participant.disqualified_reason})</span
														>
													{/if}
												</td>
												<td class="px-4 py-3 text-zinc-400">{participant.athlete.country}</td>
												<td class="px-4 py-3 text-zinc-400"
													>{formatWeight(participant.bodyweight)}</td
												>
												{#each participant.lifts as lift (lift.movement_name)}
													<td class="px-4 py-3">
														<div class="flex flex-col items-center gap-1">
															<div class="font-medium text-white">
																{formatWeight(lift.best_weight)}
															</div>
															<div class="flex gap-1">
																{#each lift.attempts as attempt (attempt.attempt_number)}
																	<span
																		class="flex h-5 w-5 items-center justify-center rounded text-xs {attempt.is_successful
																			? 'bg-emerald-500/20 text-emerald-400'
																			: 'bg-red-500/20 text-red-400'}"
																		title="{attempt.weight}kg - {attempt.is_successful
																			? 'Success'
																			: attempt.no_rep_reason || 'Failed'}"
																	>
																		{attempt.attempt_number}
																	</span>
																{/each}
															</div>
														</div>
													</td>
												{/each}
												<td class="px-4 py-3 font-medium text-white">
													{formatWeight(participant.total)}
												</td>
												<td class="px-4 py-3 text-zinc-400">
													{participant.ris_score || '-'}
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{:else}
							<p class="text-center text-zinc-500">No participants in this category</p>
						{/if}
					</Card>
				{/if}
			{/each}
		</div>
	{:else}
		<Card class="p-8">
			<p class="text-center text-zinc-400">
				No categories or results available for this competition
			</p>
		</Card>
	{/if}
</div>
