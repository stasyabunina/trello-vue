<template>
	<li ref="columnNew" class="manager__column column column--new">
		<article class="column__wrapper">
			<form class="column__add-column-form" @submit="handleAddColumn">
				<label class="column__add-column-label">
					<input
						v-model="name"
						:class="
							!isNameValid
								? 'column__add-column-input column__add-column-input--error'
								: 'column__add-column-input'
						"
						placeholder="Название колонки..."
					/>
				</label>
				<button class="column__add-column-btn" aria-label="Добавить">
					<span></span>
				</button>
				<button
					class="column__cancel-column-btn"
					type="button"
					aria-label="Отменить"
					@click="handleCancelNewColumn"
				>
					+
				</button>
			</form>
		</article>
	</li>
</template>

<script>
import { mapMutations } from "vuex";

export default {
	props: {
		newColumn: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			isNameValid: true,
			name: this.newColumn.name,
		};
	},
	methods: {
		...mapMutations([
			"appendMasonry",
			"updateMasonry",
			"cancelNewColumn",
			"addColumn",
		]),
		handleCancelNewColumn() {
			this.cancelNewColumn();
		},
		handleAddColumn(e) {
			e.preventDefault();

			if (this.name.trim() === "") {
				this.isNameValid = false;
				return;
			}

			this.isNameValid = true;

			this.addColumn(this.name.trim());
			this.cancelNewColumn();
		},
	},
	mounted() {
		this.appendMasonry(this.$refs.columnNew);
		this.updateMasonry();
		window.scrollTo(0, document.body.scrollHeight);
	},
};
</script>

<style lang="scss" scoped>
@import "./NewColumn.scss";
</style>
