import noData from "./noData";
import { load } from "./localStorage";

let loadData = load();

if (!loadData) {
	loadData = noData;
}

export { loadData };
