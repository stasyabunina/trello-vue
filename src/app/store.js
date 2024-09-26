import { createStore } from "vuex";
import { save } from "../utils/localStorage.js";
import { loadData } from "../utils/loadData.js";

const store = createStore({
	state() {
		return {
			msnry: null,
			columns: loadData.columns,
			tags: loadData.tags,
			newColumn: null,
		};
	},
	mutations: {
		initializeMasonry(state) {
			if (window.matchMedia("(max-width: 668px)").matches) {
				state.msnry = new Masonry(".manager__columns", {
					itemSelector: ".column",
					gutter: 10,
					cols: 1,
					resize: true,
				});
			} else if (window.matchMedia("(max-width: 968px)").matches) {
				state.msnry = new Masonry(".manager__columns", {
					itemSelector: ".column",
					gutter: 10,
					cols: 2,
					resize: true,
				});
			} else {
				state.msnry = new Masonry(".manager__columns", {
					itemSelector: ".column",
					gutter: 10,
					cols: 3,
					resize: true,
				});
			}
		},
		updateMasonry(state) {
			if (state.msnry) {
				state.msnry.layout();
			}
		},
		appendMasonry(state, columnRef) {
			if (state.msnry) {
				state.msnry.appended(columnRef);
			}
		},
		addNewColumn(state) {
			const newColumn = {
				name: "",
				cards: [],
			};

			state.newColumn = newColumn;
		},
		addColumn(state, columnName) {
			state.columns = [
				...state.columns,
				{ ...state.newColumn, name: columnName },
			];
			save({ ...loadData, columns: state.columns });
		},
		removeColumn(state, index) {
			state.columns = state.columns.filter((_, i) => i !== index);
			save({ ...loadData, columns: state.columns });
		},
		addCard(state, { columnIndex, card }) {
			state.columns[columnIndex].cards = [
				...state.columns[columnIndex].cards,
				card,
			];
			save({ ...loadData, columns: state.columns });
		},
		removeCard(state, { columnIndex, cardIndex }) {
			state.columns[columnIndex].cards = state.columns[
				columnIndex
			].cards.filter((_, i) => i !== cardIndex);
			save({ ...loadData, columns: state.columns });
		},
		editCard(state, { columnIndex, cardIndex, editValue }) {
			state.columns[columnIndex].cards[cardIndex] = {
				...state.columns[columnIndex].cards[cardIndex],
				text: editValue,
			};
			save({ ...loadData, columns: state.columns });
		},
		removeCardTag(state, { columnIndex, cardIndex, cardTagIndex }) {
			state.columns[columnIndex].cards[cardIndex].tags = state.columns[
				columnIndex
			].cards[cardIndex].tags.filter((_, i) => i !== cardTagIndex);
			save({ ...loadData, columns: state.columns });
		},
		clearAll(state) {
			state.columns = [];
			save({ ...loadData, columns: state.columns });
		},
		addTag(state, tag) {
			state.tags = [...state.tags, tag];
			save({ ...loadData, tags: state.tags });
		},
		removeTag(state, tagName) {
			state.tags = state.tags.filter((tag) => tag.name !== tagName);
			state.columns.forEach((column) => {
				column.cards.forEach((card) => {
					if (card.tags) {
						card.tags = card.tags.filter((tag) => tag !== tagName);
					}
				});
			});
			save({ ...loadData, tags: state.tags });
		},
		cancelNewColumn(state) {
			state.newColumn = null;
		},
	},
});

export default store;
