<script setup lang="ts">
import { getRepos } from '../logic/get-repos';
</script>

<template>{{ JSON.stringify(getRepos()) }}</template>
