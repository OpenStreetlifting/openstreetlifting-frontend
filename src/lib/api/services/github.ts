export const githubService = {
	/**
	 * Fetch star count for a GitHub repository
	 */
	async getStarCount(owner: string, repo: string): Promise<number> {
		try {
			const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
			if (!response.ok) {
				throw new Error('Failed to fetch GitHub data');
			}
			const data = await response.json();
			return data.stargazers_count || 0;
		} catch (error) {
			console.error('Error fetching GitHub stars:', error);
			return 0;
		}
	}
};
