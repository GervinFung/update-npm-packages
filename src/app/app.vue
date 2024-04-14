<script setup lang="ts">
import { reactive } from 'vue';

import Repository from './component/repo.vue';

import { type Repos, getRepos } from '../logic/get-repos';

const state = reactive({
	repos: [] as Repos,
});

const updateRepos = () => {
	getRepos().then((repos) => {
		state.repos = repos;
	});
};

updateRepos();
</script>

<template>
	<div class="p-4 flex-row space-y-8">
		<div>
			<button
				@click="updateRepos"
				class="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white"
			>
				Update
			</button>
		</div>
		<div v-if="state.length">Loading...</div>
		<div v-else>
			<div class="grid grid-cols-3 gap-4">
				<Repository
					v-for="repo in state.repos"
					:name="repo.name"
					:lastUpdated="repo.lastUpdated"
					:pullRequests="repo.pullRequests"
					:branches="repo.branches"
				/>
			</div>
		</div>
	</div>
</template>
