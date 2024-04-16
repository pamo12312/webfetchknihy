const booksDiv = document.querySelector(".books");
const fetchAddress = "https://wjs-api.vercel.app/api/books";

const getInfo = async (fetchAddress) => {
    const response = await fetch(fetchAddress);
    return await response.json();
};

const createElement = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text) element.innerText = text;
    if (className) element.classList.add(className);
    return element;
};

const createButton = (text, onClick) => {
    const button = createElement("button", text);
    button.addEventListener("click", onClick);
    return button;
};

const loadSite = async (fetchAddress) => {
    const data = await getInfo(fetchAddress);

    data.forEach(item => {
        const singleBookDiv = createElement("div", null, "singleBook");

        singleBookDiv.append(
            createElement("span", item.title),
            createElement("span", `ID ${item._id}`),
            createButton("Click me for details!", () => loadDetail(`https://wjs-api.vercel.app/api/books/${item._id}`))
        );

        booksDiv.append(singleBookDiv);
    });
};

const loadDetail = async (fetchAddress) => {
    const book = await getInfo(fetchAddress);

    const singleBookDiv = createElement("div", null, "singleBook");

    singleBookDiv.append(
        createElement("span", book.title),
        createElement("span", `ID: ${book._id}`),
        createElement("span", `Page Count: ${book.pageCount}`),
        createElement("span", `Status: ${book.status}`),
        createButton("Go Back", () => loadSite("https://wjs-api.vercel.app/api/books"))
    );

    booksDiv.innerHTML = "";
    booksDiv.append(singleBookDiv);
};

const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
        booksDiv.innerHTML = "";
        loadSite(`https://wjs-api.vercel.app/api/books?search=${searchInput.value}`);
    }
};

const searchInput = document.querySelector(".search");
searchInput.addEventListener("keypress", handleSearchKeyPress);

loadSite(fetchAddress);
