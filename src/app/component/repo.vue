<script setup lang="ts">
import { defineProps, type PropType } from 'vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	lastUpdated: {
		type: Date,
		required: true,
	},
	moreThanTwoWeeks: {
		type: Boolean,
		required: true,
	},
	moreThanFourWeeks: {
		type: Boolean,
		required: true,
	},
	pullRequests: {
		type: Number,
		required: true,
	},
	branches: {
		type: Array as PropType<ReadonlyArray<string>>,
		required: true,
	},
});
</script>

<template>
	<div class="bg-gray-100 py-2 px-4 rounded-md flex flex-col space-y-4">
		<h1 class="text-2xl font-bold">{{ props.name }}</h1>
		<p>Last updated: {{ props.lastUpdated.toLocaleString() }}</p>
		<p
			:class="{
				'font-bold italic': props.moreThanTwoWeeks,
			}"
		>
			> 2 weeks: {{ props.moreThanTwoWeeks }}
		</p>
		<p
			:class="{
				'font-bold italic': props.moreThanFourWeeks,
			}"
		>
			> 4 weeks: {{ props.moreThanFourWeeks }}
		</p>
		<p>Pull Requests: {{ props.pullRequests }}</p>
		<p>Branches: {{ props.branches }}</p>
	</div>
</template>
