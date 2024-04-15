<script setup lang="ts">
import { ref, reactive } from 'vue';

import Repository from './component/repo.vue';

import { type Repos, getRepos } from '../logic/get-repos';

const state = reactive({
	repos: [] as Repos,
});

const option = ref('none' as number | string);

const updateRepos = () => {
	state.repos = [];

	getRepos().then((repos) => {
		state.repos = repos;
	});
};

updateRepos();
</script>

<template>
	<div class="p-4 flex-row space-y-8">
		<div class="flex-row content-center space-x-8">
			<button
				@click="updateRepos"
				class="bg-blue-500 py-2 px-3 rounded-md hover:bg-blue-600 text-white"
			>
				Update
			</button>
			<select class="bg-blue-500 py-2 px-2 rounded-md" v-model="option">
				<option :value="'none'">None</option>
				<option :value="2">> 2</option>
				<option :value="4">> 4</option>
			</select>
		</div>
		<div v-if="!state.repos.length">Loading...</div>
		<div v-else>
			<div class="grid grid-cols-3 gap-4">
				<template v-for="repo in state.repos">
					<Repository
						v-if="
							option === 'none' ||
							(option === 2 && repo.moreThanTwoWeeks) ||
							(option === 4 && repo.moreThanFourWeeks)
						"
						:name="repo.name"
						:lastUpdated="repo.lastUpdated"
						:pullRequests="repo.pullRequests"
						:branches="repo.branches"
						:moreThanTwoWeeks="repo.moreThanTwoWeeks"
						:moreThanFourWeeks="repo.moreThanFourWeeks"
					/>
				</template>
			</div>
		</div>
	</div>
</template>
