import { Octokit } from 'octokit';

import { Defined, equalTo, type Return } from '@poolofdeath20/util';

type Repos = Return<typeof getRepos>;

const getRepos = async () => {
	const octokit = new Octokit({
		auth: import.meta.env.VITE_TOKEN,
	});

	const repos = [
		'ts-add-js-extension',
		'gen-env-type-def',
		'npm-package-starter',
		'react-starter',
		'nextjs-starter',
		'npm-tools',
		'node-package-helper',
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

						return {
							name: repo.name,
							lastUpdated: Defined.parse(repo.pushed_at)
								.map((date) => {
									return new Date(date);
								})
								.orThrow('Could not parse date'),
							pullRequests: pullRequests.data.length,
							branches: branches.data.map((branch) => {
								return branch.name;
							}),
						};
					});
			})
	);

	return results;
};

export type { Repos };

export { getRepos };
