<template>
	<li ref="column" class="manager__column column">
		<article class="column__wrapper">
			<div class="column__title-remove-wrapper">
				<h2 class="column__title">{{ column.name }}</h2>
				<button
					type="button"
					class="column__remove-btn"
					title="Удалить колонку"
					aria-label="Удалить колонку"
					@click="handleRemove"
				>
					<svg
						width="800px"
						height="800px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M10 11V17"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M14 11V17"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M4 7H20"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			</div>
			<ul class="column__cards">
				<TrelloCard
					v-for="(card, index) of column.cards"
					:key="index"
					:card="card"
					:cardIndex="index"
					:columnIndex="columnIndex"
				/>
			</ul>
			<span v-if="columns[columnIndex].cards.length === 0" class="no-cards-text"
				>У этой колонки отсутствуют задачи. Вы можете создать карточку, нажав на
				кнопку "Добавить карточку" ниже.</span
			>
			<form v-if="isCardForm" class="column__form" @submit="handleAddCard">
				<textarea
					v-model="cardValue"
					:class="
						!isCardValueValid
							? 'column__form-input column__form-input--error'
							: 'column__form-input'
					"
					placeholder="Напиши что-нибудь..."
				></textarea>
				<ul class="column__form-tags">
					<li
						v-for="(tag, index) of tags"
						:key="index"
						class="column__form-tag"
						:style="{
							backgroundColor: cardTags.find((cardTag) => cardTag === tag.name)
								? tag.color
								: 'lightgray',
						}"
					>
						<label class="column__form-tag-content">
							<input
								type="checkbox"
								class="column__tag-checkbox visually-hidden"
								@change="toggleCardTag(tag.name, $event)"
							/>
							<span class="column__form-tag-name">{{ tag.name }}</span>
						</label>
					</li>
				</ul>
				<div class="column__add-card-btns">
					<button class="column__add-card-btn">Добавить</button>
					<button
						class="column__cancel-card-btn"
						aria-label="Отменить"
						type="button"
						@click="toggleCardForm"
					>
						+
					</button>
				</div>
			</form>
			<button
				v-if="!isCardForm"
				class="column__btn"
				type="button"
				@click="toggleCardForm"
			>
				<span class="plus">+</span
				><span class="column__btn-text">Добавить карточку</span>
			</button>
		</article>
	</li>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import TrelloCard from "../TrelloCard/TrelloCard.vue";

export default {
	components: {
		TrelloCard,
	},
	props: {
		column: {
			type: Object,
			required: true,
		},
		columnIndex: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			isCardValueValid: true,
			isCardForm: false,
			cardValue: "",
			cardTags: [],
		};
	},
	computed: {
		...mapState(["columns", "tags"]),
	},
	methods: {
		...mapMutations([
			"removeColumn",
			"updateMasonry",
			"appendMasonry",
			"addCard",
		]),
		handleRemove() {
			this.removeColumn(this.columnIndex);
			this.updateMasonry();
		},
		toggleCardForm() {
			if (this.isCardForm) {
				this.cardTags = [];
				this.cardValue = "";
			}
			this.isCardForm = !this.isCardForm;
			this.updateMasonry();
		},
		handleAddCard(e) {
			e.preventDefault();

			if (this.cardValue.trim() === "") {
				this.isCardValueValid = false;
				return;
			}

			this.isCardValueValid = true;

			this.isCardForm = false;
			const newCard = {
				text: this.cardValue.trim(),
				tags: this.cardTags,
			};
			this.addCard({ columnIndex: this.columnIndex, card: newCard });

			this.cardValue = "";
			this.cardTags = [];

			this.updateMasonry();
		},
		toggleCardTag(tagName, e) {
			if (this.cardTags.find((cardTag) => cardTag === tagName)) {
				e.currentTarget.checked = false;
				this.cardTags = this.cardTags.filter((cardTag) => cardTag !== tagName);
			} else {
				e.currentTarget.checked = true;
				this.cardTags.push(tagName);
			}

			this.updateMasonry();
		},
	},
	mounted() {
		this.appendMasonry(this.$refs.column);
		this.updateMasonry();
	},
};
</script>

<style lang="scss" scoped>
@import "./TrelloColumn.scss";
</style>
