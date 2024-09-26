<template>
	<div class="loader-wrapper">
		<div
			class="loader"
			:style="{ borderTop: `8px solid ${borderTopColor}` }"
		></div>
	</div>
</template>

<script>
import { loadData } from "../../utils/loadData.js";

export default {
	data() {
		return {
			borderTopColor: loadData.backgroundColor,
		};
	},
};
</script>

<style lang="scss" scoped>
@import "./TrelloLoader.scss";
</style>
