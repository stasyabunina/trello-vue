<template>
	<li class="column__card">
		<ul class="column__tags">
			<CardTag
				v-for="(cardTag, index) of card.tags"
				:key="index"
				:columnIndex="columnIndex"
				:cardIndex="cardIndex"
				:cardTag="cardTag"
				:cardTagIndex="index"
			/>
		</ul>
		<p v-if="!isEditMode" class="column__text">{{ card.text }}</p>
		<form
			v-if="isEditMode"
			class="column__edit-card-form"
			@submit="handleEditCard"
		>
			<label class="column__edit-card-label">
				<textarea
					v-model="editValue"
					:class="
						!isEditValueValid
							? 'column__edit-card-input column__edit-card-input--error'
							: 'column__edit-card-input'
					"
					placeholder="Напиши что-нибудь..."
				></textarea>
			</label>
			<div class="column__edit-card-btns">
				<button class="column__edit-card-btn">Сохранить изменения</button>
				<button
					class="column__edit-card-cancel"
					type="button"
					aria-label="Закрыть меню"
					@click="toggleEditMode"
				>
					+
				</button>
			</div>
		</form>
		<button
			ref="cardBtn"
			class="column__menu-btn"
			type="button"
			aria-label="Открыть меню"
			@click="toggleMenu"
		>
			<svg
				width="800px"
				height="800px"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M2.25 6C2.25 5.58579 2.58579 5.25 3 5.25H21C21.4142 5.25 21.75 5.58579 21.75 6C21.75 6.41421 21.4142 6.75 21 6.75H3C2.58579 6.75 2.25 6.41421 2.25 6Z"
					fill="#000000"
				></path>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8.25 12C8.25 11.5858 8.58579 11.25 9 11.25L21 11.25C21.4142 11.25 21.75 11.5858 21.75 12C21.75 12.4142 21.4142 12.75 21 12.75L9 12.75C8.58579 12.75 8.25 12.4142 8.25 12Z"
					fill="#000000"
				></path>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M2.25 18C2.25 17.5858 2.58579 17.25 3 17.25H21C21.4142 17.25 21.75 17.5858 21.75 18C21.75 18.4142 21.4142 18.75 21 18.75H3C2.58579 18.75 2.25 18.4142 2.25 18Z"
					fill="#000000"
				></path>
			</svg>
		</button>
		<ul
			ref="cardMenu"
			:class="isMenuOpen ? 'column__menu column__menu--shown' : 'column__menu'"
		>
			<li class="column__menu-item">
				<button
					type="button"
					class="column__menu-edit-btn column__menu-item-btn"
					@click="toggleEditMode"
				>
					Редактировать...
				</button>
			</li>
			<li class="column__menu-item">
				<button
					type="button"
					class="column__menu-delete-btn column__menu-item-btn"
					@click="handleRemoveCard"
				>
					Удалить
				</button>
			</li>
		</ul>
	</li>
</template>

<script>
import { mapMutations } from "vuex";
import CardTag from "../CardTag/CardTag.vue";

export default {
	components: {
		CardTag,
	},
	props: {
		card: {
			type: Object,
			required: true,
		},
		cardIndex: {
			type: Number,
			required: true,
		},
		columnIndex: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			isEditMode: false,
			isEditValueValid: true,
			editValue: this.card.text,
			isMenuOpen: false,
			menuPosition: { left: 0, top: 0 },
		};
	},
	methods: {
		...mapMutations(["removeCard", "updateMasonry", "editCard"]),
		toggleMenu(e) {
			this.isMenuOpen = !this.isMenuOpen;

			if (this.isMenuOpen) {
				const coords = e.currentTarget.getBoundingClientRect();
				this.menuPosition = {
					top: `${coords.bottom + 10}px`,
					left: `${coords.left}px`,
				};
				document.addEventListener("click", this.handleDocumentClick);
			} else {
				document.removeEventListener("click", this.handleDocumentClick);
			}
		},
		handleDocumentClick(e) {
			const button = this.$refs.cardBtn;
			const menu = this.$refs.cardMenu;

			if (this.isMenuOpen) {
				if (!button.contains(e.target) && !menu.contains(e.target)) {
					this.isMenuOpen = false;
					document.removeEventListener("click", this.handleDocumentClick);
				}
			}
		},
		handleRemoveCard() {
			this.isMenuOpen = false;
			this.removeCard({
				columnIndex: this.columnIndex,
				cardIndex: this.cardIndex,
			});
			this.updateMasonry();
		},
		handleEditCard(e) {
			e.preventDefault();

			if (this.editValue.trim() === "") {
				this.isEditValueValid = false;
				return;
			}

			this.isEditValueValid = true;

			this.editCard({
				columnIndex: this.columnIndex,
				cardIndex: this.cardIndex,
				editValue: this.editValue,
			});

			this.isEditMode = false;

			this.updateMasonry();
		},
		toggleEditMode() {
			this.isMenuOpen = false;
			this.isEditMode = !this.isEditMode;

			this.updateMasonry();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./TrelloCard.scss";
</style>
