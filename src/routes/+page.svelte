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
		<p class="mt-8 text-xl leading-8 font-extralight text-zinc-400 sm:text-2xl">
			Open and permanent database of streetlifting
		</p>
	</div>
</div>

<!-- Cards Section -->
<div class="mx-auto max-w-7xl px-6 pb-24">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- Global Ranking Card -->
		<a href={resolve('/rankings')} class="group block">
			<Card
				class="h-full cursor-pointer p-8 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80"
			>
				<div class="flex flex-col items-start gap-6">
					<div class="rounded-lg bg-zinc-800/50 p-4">
						<svg
							class="h-12 w-12 text-zinc-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
							/>
						</svg>
					</div>
					<div>
						<h2 class="mb-2 text-2xl font-semibold text-white">Global Ranking</h2>
						<p class="leading-relaxed text-zinc-400">
							View worldwide rankings and compare performances across all athletes
						</p>
					</div>
				</div>
			</Card>
		</a>

		<!-- Competitions Card -->
		<a href={resolve('/competitions')} class="group block">
			<Card
				class="h-full cursor-pointer p-8 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80"
			>
				<div class="flex flex-col items-start gap-6">
					<div class="rounded-lg bg-zinc-800/50 p-4">
						<svg
							class="h-12 w-12 text-zinc-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
							/>
						</svg>
					</div>
					<div>
						<h2 class="mb-2 text-2xl font-semibold text-white">Competitions</h2>
						<p class="leading-relaxed text-zinc-400">
							Explore upcoming and past competitions from around the world
						</p>
					</div>
				</div>
			</Card>
		</a>
	</div>
</div>
