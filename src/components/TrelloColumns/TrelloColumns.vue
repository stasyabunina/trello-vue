<template>
	<ul class="manager__columns">
		<TrelloColumn
			v-for="(column, index) of columns"
			:key="index"
			:column="column"
			:columnIndex="index"
		/>
		<NewColumn v-if="newColumn" :newColumn="newColumn" />
	</ul>
</template>

<script>
import { mapState } from "vuex";
import TrelloColumn from "../TrelloColumn/TrelloColumn.vue";
import NewColumn from "../NewColumn/NewColumn.vue";

export default {
	components: {
		TrelloColumn,
		NewColumn,
	},
	computed: {
		...mapState(["columns", "newColumn"]),
	},
	mounted() {
		this.$store.commit("initializeMasonry");
	},
};
</script>

<style lang="scss" scoped></style>
