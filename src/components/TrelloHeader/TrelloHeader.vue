<template>
	<header class="header">
		<div class="container">
			<div class="header__wrapper">
				<div
					ref="backgroundList"
					:class="
						isMenuOpen.background
							? 'header__background-list header__background-list--shown'
							: 'header__background-list'
					"
					:style="{
						top: menuPosition.background.top,
						left: menuPosition.background.left,
					}"
				>
					<label class="header__background-color-label">
						<span>Выбрать цвет...</span>
						<input
							v-model="colorValue"
							type="color"
							class="header__background-color"
							@input="updateBackgroundColor"
						/>
					</label>
				</div>
				<ul
					ref="tagList"
					:class="
						isMenuOpen.tag
							? 'header__tag-menu header__tag-menu--shown'
							: 'header__tag-menu'
					"
					:style="{ top: menuPosition.tag.top, left: menuPosition.tag.left }"
				>
					<div class="header__tag-form-wrapper">
						<form class="header__tag-form" @submit="handleAddTag">
							<input
								v-model="tagValue"
								type="text"
								:class="
									!isTagValueValid
										? 'header__tag-name-input header__tag-name-input--error'
										: 'header__tag-name-input'
								"
							/>
							<label class="header__header-tag-label">
								<input
									v-model="tagColorValue"
									type="color"
									class="header__tag-color-input"
								/>
							</label>
							<div class="header__tag-btns">
								<button class="header__tag-form-btn" aria-label="Добавить">
									<span></span>
								</button>
								<button
									class="header__tag-form-cancel"
									type="button"
									aria-label="Отменить"
									@click="resetTagForm"
								>
									+
								</button>
							</div>
						</form>
					</div>
					<ul class="header__tag-list">
						<li
							v-for="(tag, index) of tags"
							:key="index"
							class="header__tag-item"
							:style="{ backgroundColor: tag.color }"
						>
							<span class="header__tag-name">#{{ tag.name }}</span>
							<button
								class="header__tag-remove"
								type="button"
								aria-label="Удалить тег"
								@click="handleRemoveTag(tag.name, $event)"
							>
								+
							</button>
						</li>
					</ul>
				</ul>
				<div class="header__left">
					<button
						ref="backgroundButton"
						class="header__change-background-btn header__btn"
						title="Сменить фон"
						type="button"
						aria-label="Сменить фон"
						@click="toggleMenu('background', $event)"
					>
						<svg
							width="800px"
							height="800px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								id="Vector"
								d="M3.00005 18.0001C3 17.9355 3 17.8689 3 17.8002V6.2002C3 5.08009 3 4.51962 3.21799 4.0918C3.40973 3.71547 3.71547 3.40973 4.0918 3.21799C4.51962 3 5.08009 3 6.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21 4.5192 21 5.07899 21 6.19691V17.8031C21 18.2881 21 18.6679 20.9822 18.9774M3.00005 18.0001C3.00082 18.9884 3.01337 19.5058 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H17.8036C18.9215 21 19.4805 21 19.9079 20.7822C20.2842 20.5905 20.5905 20.2837 20.7822 19.9074C20.9055 19.6654 20.959 19.3813 20.9822 18.9774M3.00005 18.0001L7.76798 12.4375L7.76939 12.436C8.19227 11.9426 8.40406 11.6955 8.65527 11.6064C8.87594 11.5282 9.11686 11.53 9.33643 11.6113C9.58664 11.704 9.79506 11.9539 10.2119 12.4541L12.8831 15.6595C13.269 16.1226 13.463 16.3554 13.6986 16.4489C13.9065 16.5313 14.1357 16.5406 14.3501 16.4773C14.5942 16.4053 14.8091 16.1904 15.2388 15.7607L15.7358 15.2637C16.1733 14.8262 16.3921 14.6076 16.6397 14.5361C16.8571 14.4734 17.0896 14.4869 17.2988 14.5732C17.537 14.6716 17.7302 14.9124 18.1167 15.3955L20.9822 18.9774M20.9822 18.9774L21 18.9996M15 9C14.4477 9 14 8.55228 14 8C14 7.44772 14.4477 7 15 7C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9Z"
								stroke="#121212"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<svg
							:class="
								isMenuOpen.background
									? 'header__arrow-svg header__arrow-svg--flipped'
									: 'header__arrow-svg'
							"
							width="800px"
							height="800px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 8L12 16L20 8"
								stroke="#121212"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<span class="header__name">{{ title }}</span>
				</div>
				<div class="header__right">
					<button
						ref="tagButton"
						:class="
							isMenuOpen.tag
								? 'header__add-tag-btn header__btn header__add-tag-btn--flipped'
								: 'header__add-tag-btn header__btn'
						"
						title="Добавить метку"
						type="button"
						aria-label="Добавить метку"
						@click="toggleMenu('tag', $event)"
					>
						<svg
							width="800px"
							height="800px"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19.2933 9.95137L16.96 7.15137C16.6073 6.72814 16.43 6.51639 16.2139 6.36426C16.0223 6.22946 15.8084 6.12953 15.5822 6.06868C15.327 6 15.0523 6 14.5014 6H7.2002C6.08009 6 5.51962 6 5.0918 6.21799C4.71547 6.40973 4.40973 6.71547 4.21799 7.0918C4 7.51962 4 8.08009 4 9.2002V14.8002C4 15.9203 4 16.4801 4.21799 16.9079C4.40973 17.2842 4.71547 17.5905 5.0918 17.7822C5.5192 18 6.07899 18 7.19691 18H14.5014C15.0523 18 15.327 17.9998 15.5822 17.9312C15.8084 17.8703 16.0223 17.7702 16.2139 17.6354C16.43 17.4833 16.6073 17.2721 16.96 16.8488L19.2933 14.0488C19.9006 13.32 20.2036 12.9556 20.3197 12.5488C20.422 12.1902 20.422 11.8095 20.3197 11.4509C20.2036 11.0441 19.9006 10.6801 19.2933 9.95137Z"
								stroke="#121212"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</button>
					<button
						class="header__add-column-btn header__btn"
						title="Добавить колонку"
						type="button"
						@click="handleAddNewColumn"
					>
						<span>+</span>
					</button>
					<button
						class="header__clear-btn header__btn"
						title="Удалить данные"
						type="button"
						aria-label="Удалить данные"
						@click="handleClearAll"
					>
						<svg
							fill="#121212"
							width="15px"
							height="15px"
							viewBox="0 0 1024 1024"
							t="1569683368540"
							class="icon"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							p-id="9723"
							xmlns:xlink="http://www.w3.org/1999/xlink"
						>
							<path
								d="M899.1 869.6l-53-305.6H864c14.4 0 26-11.6 26-26V346c0-14.4-11.6-26-26-26H618V138c0-14.4-11.6-26-26-26H432c-14.4 0-26 11.6-26 26v182H160c-14.4 0-26 11.6-26 26v192c0 14.4 11.6 26 26 26h17.9l-53 305.6c-0.3 1.5-0.4 3-0.4 4.4 0 14.4 11.6 26 26 26h723c1.5 0 3-0.1 4.4-0.4 14.2-2.4 23.7-15.9 21.2-30zM204 390h272V182h72v208h272v104H204V390z m468 440V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H416V674c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v156H202.8l45.1-260H776l45.1 260H672z"
								p-id="9724"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { loadData } from "../../utils/loadData.js";
import { save } from "../../utils/localStorage.js";

export default {
	props: {
		title: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			colorValue: loadData.backgroundColor,
			tagColorValue: "#ece345",
			tagValue: "",
			isTagValueValid: true,
			isMenuOpen: {
				background: false,
				tag: false,
			},
			menuPosition: {
				background: { left: 0, top: 0 },
				tag: { left: 0, top: 0 },
			},
		};
	},
	computed: {
		...mapState(["tags"]),
	},
	methods: {
		...mapMutations([
			"updateMasonry",
			"clearAll",
			"addTag",
			"removeTag",
			"addNewColumn",
		]),
		toggleMenu(menuType, e) {
			this.isMenuOpen[menuType] = !this.isMenuOpen[menuType];

			if (this.isMenuOpen[menuType]) {
				const coords = e.currentTarget.getBoundingClientRect();
				this.menuPosition[menuType] = {
					top: `${coords.bottom + 10}px`,
					left: this.isMenuOpen.background
						? `${coords.left}px`
						: `${coords.left - this.$refs[`${menuType}List`].clientWidth / 2}px`,
				};
				document.addEventListener("click", this.handleDocumentClick);
			} else {
				document.removeEventListener("click", this.handleDocumentClick);
			}
		},
		handleDocumentClick(e) {
			const menuTypes = ["background", "tag"];
			menuTypes.forEach((type) => {
				const button = this.$refs[`${type}Button`];
				const menu = this.$refs[`${type}List`];

				if (this.isMenuOpen[type]) {
					if (!button.contains(e.target) && !menu.contains(e.target)) {
						this.isMenuOpen[type] = false;
						if (type === "tag" && this.tagValue.trim().length === 0) {
							this.isTagValueValid = true;
						}
						document.removeEventListener("click", this.handleDocumentClick);
					}
				}
			});
		},
		updateBackgroundColor(e) {
			this.colorValue = e.target.value;
			document.body.style.backgroundColor = e.target.value;

			loadData.backgroundColor = e.target.value;
			save({ ...loadData, backgroundColor: e.target.value });
		},
		handleClearAll() {
			this.clearAll();
			this.updateMasonry();
		},
		handleAddTag(e) {
			e.preventDefault();

			if (this.tagValue.trim() === "" || this.tagValue.trim().length > 18) {
				this.isTagValueValid = false;
				return;
			}

			this.isTagValueValid = true;

			const newTag = {
				name: this.tagValue.trim(),
				color: this.tagColorValue,
			};

			this.addTag(newTag);
			this.tagValue = "";
		},
		resetTagForm() {
			this.tagValue = "";
			this.tagColorValue = "#ece345";
		},
		handleRemoveTag(tagName, e) {
			e.stopPropagation();

			this.removeTag(tagName);
		},
		handleAddNewColumn() {
			this.addNewColumn();
		},
	},
};
</script>

<style lang="scss" scoped>
@import "./TrelloHeader.scss";
</style>
