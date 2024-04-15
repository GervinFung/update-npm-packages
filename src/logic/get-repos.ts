import { Octokit } from 'octokit';

import { Defined, equalTo, type Return } from '@poolofdeath20/util';

type Repos = Return<typeof getRepos>;

const getRepos = async () => {
	const octokit = new Octokit({
		auth: import.meta.env.VITE_TOKEN,
	});

	const repos = [
		// npm packages
		'ts-add-js-extension',
		'gen-env-type-def',
		'npm-package-starter',
		'npm-tools',
		'node-package-helper',
		// starter templates
		'react-starter',
		'nextjs-starter',
		// websites
		'personal-website',
		'gitignored',
		'periotable',
	] as const;

	const results = await Promise.all(
		await octokit.rest.repos
			.listForAuthenticatedUser({
				per_page: 200,
			})
			.then((result) => {
				return result.data
					.filter((repo) => {
						return repos.find(equalTo(repo.name));
					})
					.map(async (repo) => {
						const props = {
							owner: repo.owner.login,
							repo: repo.name,
						};

						const branches =
							await octokit.rest.repos.listBranches(props);

						const pullRequests =
							await octokit.rest.pulls.list(props);

						const lastUpdated = Defined.parse(repo.pushed_at)
							.map((date) => {
								return new Date(date);
							})
							.orThrow('Could not parse date');

						return {
							name: repo.name,
							lastUpdated,
							moreThanTwoWeeks:
								Date.now() - lastUpdated.getTime() >
								1000 * 60 * 60 * 24 * 14,
							moreThanFourWeeks:
								Date.now() - lastUpdated.getTime() >
								1000 * 60 * 60 * 24 * 28,
							pullRequests: pullRequests.data.length,
							branches: branches.data.map((branch) => {
								return branch.name;
							}),
						};
					});
			})
	);

	return results.toSorted((a, b) => {
		return b.lastUpdated.getTime() - a.lastUpdated.getTime();
	});
};

export type { Repos };

export { getRepos };
