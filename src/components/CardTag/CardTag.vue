<template>
	<li
		:class="isMouseOver ? 'column__tag column__tag--opened' : 'column__tag'"
		:style="{ backgroundColor: tagColor(cardTag) }"
		@mouseenter="handleMouseEvent"
		@mouseleave="handleMouseEvent"
	>
		<div v-if="isMouseOver" class="column__tag-content hidden">
			<span class="column__tag-name">{{ cardTag }}</span>
			<button
				class="column__tag-btn"
				type="button"
				aria-label="Удалить метку"
				@click="handleRemoveCardTag"
			>
				+
			</button>
		</div>
	</li>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
	props: {
		cardTag: {
			type: String,
			required: true,
		},
		cardTagIndex: {
			type: Number,
			required: true,
		},
		columnIndex: {
			type: Number,
			required: true,
		},
		cardIndex: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			isMouseOver: false,
		};
	},
	computed: {
		...mapState(["tags"]),
	},
	methods: {
		...mapMutations(["updateMasonry", "removeCardTag"]),
		tagColor(tagName) {
			return this.tags.find((tag) => tag.name === tagName).color;
		},
		handleMouseEvent() {
			this.isMouseOver = !this.isMouseOver;
			this.updateMasonry();
		},
		handleRemoveCardTag() {
			this.removeCardTag({
				columnIndex: this.columnIndex,
				cardIndex: this.cardIndex,
				cardTagIndex: this.cardTagIndex,
			});
			this.updateMasonry();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./CardTag.scss";
</style>
