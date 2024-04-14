<script setup lang="ts">
import { getRepos } from '../logic/get-repos';
</script>

<template>
	<h1 class="text-3xl font-bold underline">Hello world!</h1>
	{{ JSON.stringify(getRepos()) }}
</template>
