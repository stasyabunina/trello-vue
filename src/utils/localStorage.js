function save(data) {
	localStorage.setItem("data", JSON.stringify(data));
}

function load() {
	try {
		return JSON.parse(localStorage.getItem("data"));
	} catch (e) {
		throw new Error(e);
	}
}

function remove() {
	localStorage.removeItem("data");
}

export { save, load, remove };
