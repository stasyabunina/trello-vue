<template>
	<TrelloHeader v-if="isHeaderVisible" :title="title" />
	<main v-if="isHeaderVisible" class="manager">
		<div class="container">
			<div class="manager__wrapper">
				<span
					v-if="$store.state.columns.length === 0 && !$store.state.newColumn"
					class="no-columns-text"
					>У вас отсутствуют колонки для задач. Вы можете создать колонку, нажав
					на кнопку "+" топ справа.</span
				>
				<TrelloColumns
					v-if="
						($store.state.columns.length === 0 && $store.state.newColumn) ||
						$store.state.columns.length !== 0
					"
				/>
			</div>
		</div>
	</main>
	<TrelloLoader v-else />
</template>

<script>
import TrelloHeader from "./components/TrelloHeader/TrelloHeader.vue";
import TrelloLoader from "./components/TrelloLoader/TrelloLoader.vue";
import TrelloColumns from "./components/TrelloColumns/TrelloColumns.vue";
import { loadData } from "./utils/loadData.js";
import { load } from "./utils/localStorage.js";

export default {
	components: {
		TrelloHeader,
		TrelloLoader,
		TrelloColumns,
	},
	data() {
		return {
			isHeaderVisible: false,
		};
	},
	computed: {
		title() {
			const loadedData = load();
			if (loadedData) {
				return "С возвращением!";
			} else {
				return "Менеджер задач";
			}
		},
	},
	methods: {
		handleLoad() {
			document.body.style.backgroundColor = loadData.backgroundColor;
			this.isHeaderVisible = true;
		},
	},
	beforeUnmount() {
		window.removeEventListener("load", this.handleLoad);
	},
	mounted() {
		window.addEventListener("load", this.handleLoad);
	},
};
</script>

<style scoped></style>
