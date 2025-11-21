<script lang="ts">
	import type { PageData } from './$types';
	import { Card } from '$lib/components/ui';
	import { resolve } from '$app/paths';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<!-- Hero Section -->
<div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
	<div class="text-center">
		<h1 class="text-7xl font-light tracking-tight text-white sm:text-8xl lg:text-9xl">
			OpenStreetlifting
		</h1>
		<p class="mt-8 text-xl leading-8 font-light text-zinc-500 sm:text-2xl">
			Open and permanent database of streetlifting
		</p>
	</div>
</div>

<!-- Cards Section -->
<div class="mx-auto max-w-7xl px-6 pb-24">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		<!-- Global Ranking Card -->
		<a
			href={resolve('/rankings')}
			class="group block transition-all duration-200 hover:scale-[1.01]"
		>
			<Card
				class="relative h-full overflow-hidden border-zinc-800/60 p-8 backdrop-blur-sm transition-all duration-200 hover:border-zinc-700/60 hover:shadow-lg hover:shadow-zinc-800/50"
			>
				<div class="flex flex-col items-start gap-6">
					<!-- Small foreground icon -->
					<div
						class="rounded-xl bg-zinc-800/60 p-3 transition-all duration-200 group-hover:bg-zinc-700/60"
					>
						<svg
							class="h-8 w-8 text-zinc-400 transition-colors group-hover:text-white"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M5 3h4v18H5V3zm7 4h4v14h-4V7zm7 7h4v7h-4v-7z" />
						</svg>
					</div>
					<div class="space-y-2">
						<h2 class="text-2xl font-medium text-white">Global Ranking</h2>
						<p class="leading-relaxed font-light text-zinc-500">
							View worldwide rankings and compare performances across all athletes
						</p>
						<div
							class="flex items-center gap-2 pt-2 text-sm font-medium text-zinc-400 transition-colors group-hover:text-white"
						>
							<span>Explore rankings</span>
							<svg
								class="h-4 w-4 transition-transform group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</div>
					</div>
				</div>
			</Card>
		</a>

		<!-- Competitions Card -->
		<a
			href={resolve('/competitions')}
			class="group block transition-all duration-200 hover:scale-[1.01]"
		>
			<Card
				class="relative h-full overflow-hidden border-zinc-800/60 p-8 backdrop-blur-sm transition-all duration-200 hover:border-zinc-700/60 hover:shadow-lg hover:shadow-zinc-800/50"
			>
				<div class="flex flex-col items-start gap-6">
					<!-- Small foreground icon -->
					<div
						class="rounded-xl bg-zinc-800/60 p-3 transition-all duration-200 group-hover:bg-zinc-700/60"
					>
						<svg
							class="h-8 w-8 text-zinc-400 transition-colors group-hover:text-white"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"
							/>
						</svg>
					</div>
					<div class="space-y-2">
						<h2 class="text-2xl font-medium text-white">Competitions</h2>
						<p class="leading-relaxed font-light text-zinc-500">
							Explore upcoming and past competitions from around the world
						</p>
						<div
							class="flex items-center gap-2 pt-2 text-sm font-medium text-zinc-400 transition-colors group-hover:text-white"
						>
							<span>Browse competitions</span>
							<svg
								class="h-4 w-4 transition-transform group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
						</div>
					</div>
				</div>
			</Card>
		</a>
	</div>
</div>
