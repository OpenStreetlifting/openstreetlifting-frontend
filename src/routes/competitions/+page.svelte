<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from '$lib/components/ui';
	import { resolve } from '$app/paths';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Competitions - OpenStreetlifting</title>
	<meta name="description" content="Browse all streetlifting competitions worldwide" />
</svelte:head>

<div class="mx-auto max-w-7xl px-6 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-5xl font-light text-white">Competitions</h1>
		<p class="text-lg font-extralight text-zinc-400">
			Browse all streetlifting competitions from around the world
		</p>
	</div>

	{#if data.error}
		<Card class="p-8">
			<div class="text-center">
				<p class="text-red-400">{data.error}</p>
			</div>
		</Card>
	{:else if data.competitions.length === 0}
		<Card class="p-8">
			<div class="text-center">
				<p class="text-zinc-400">No competitions found</p>
			</div>
		</Card>
	{:else}
		<!-- Competitions Grid -->
		<div class="grid grid-cols-1 gap-3">
			{#each data.competitions as competition (competition.slug)}
				<a href={resolve(`/competitions/${competition.slug}`)} class="group block">
					<Card
						class="cursor-pointer p-5 transition-all duration-150 hover:border-zinc-700/60 hover:bg-zinc-900/60"
					>
						<div class="flex items-center justify-between gap-6">
							<div class="min-w-0 flex-1">
								<h2
									class="mb-2 text-base font-medium text-white transition-colors group-hover:text-zinc-100"
								>
									{competition.name}
								</h2>
								<div class="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-zinc-500">
									<div class="flex items-center gap-1.5">
										<svg
											class="h-3.5 w-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
											/>
										</svg>
										<span class="text-xs"
											>{new Date(competition.start_date).toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												year: 'numeric'
											})}</span
										>
										{#if competition.start_date !== competition.end_date}
											<span class="text-xs"
												>- {new Date(competition.end_date).toLocaleDateString('en-US', {
													month: 'short',
													day: 'numeric'
												})}</span
											>
										{/if}
									</div>
									<div class="flex items-center gap-1.5">
										<svg
											class="h-3.5 w-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											stroke-width="2"
										>
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
										<span class="truncate text-xs"
											>{competition.venue}, {competition.city}, {competition.country}</span
										>
									</div>
									<div class="flex items-center gap-1.5">
										<svg
											class="h-3.5 w-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
											/>
										</svg>
										<span class="text-xs"
											>{competition.federation.name} ({competition.federation.abbreviation})</span
										>
									</div>
									<div class="flex items-center gap-1.5">
										<svg
											class="h-3.5 w-3.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											stroke-width="2"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M13 10V3L4 14h7v7l9-11h-7z"
											/>
										</svg>
										<span class="text-xs"
											>{competition.movements.map((m) => m.movement_name).join(', ')}</span
										>
									</div>
								</div>
							</div>
							<div class="flex flex-shrink-0 items-center">
								{#if competition.status === 'upcoming'}
									<span
										class="inline-flex items-center gap-1.5 rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400"
									>
										<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
											<circle cx="4" cy="4" r="3" />
										</svg>
										Planned
									</span>
								{:else if competition.status === 'ongoing'}
									<span
										class="inline-flex items-center gap-1.5 rounded-md border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400"
									>
										<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
											<circle cx="4" cy="4" r="3" />
										</svg>
										Ongoing
									</span>
								{:else if competition.status === 'completed'}
									<span
										class="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400"
									>
										<svg class="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
											<circle cx="4" cy="4" r="3" />
										</svg>
										Completed
									</span>
								{/if}
							</div>
						</div>
					</Card>
				</a>
			{/each}
		</div>

		<!-- Total Count -->
		{#if data.competitions.length > 0}
			<div class="mt-8 text-center text-sm text-zinc-500">
				Showing {data.competitions.length} competitions
			</div>
		{/if}
	{/if}
</div>
