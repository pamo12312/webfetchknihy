const booksContainer = document.querySelector(".books");
const apiEndpoint = "https://wjs-api.vercel.app/api/books";

const fetchData = async (endpoint) => {
    const response = await fetch(endpoint);
    return await response.json();
};

const createHTMLElement = (tag, text, className) => {
    const element = document.createElement(tag);
    if (text) element.innerText = text;
    if (className) element.classList.add(className);
    return element;
};

const createButtonElement = (text, onClick) => {
    const button = createHTMLElement("button", text);
    button.addEventListener("click", onClick);
    return button;
};

const loadBooks = async (endpoint) => {
    const data = await fetchData(endpoint);

    data.forEach(item => {
        const singleBookDiv = createHTMLElement("div", null, "singleBook");

        singleBookDiv.append(
            createHTMLElement("span", item.title),
            createHTMLElement("span", `ID ${item._id}`),
            createButtonElement("Click me for details!", () => loadBookDetail(`${apiEndpoint}/${item._id}`))
        );

        booksContainer.append(singleBookDiv);
    });
};

const loadBookDetail = async (endpoint) => {
    const book = await fetchData(endpoint);

    const singleBookDiv = createHTMLElement("div", null, "singleBook");

    singleBookDiv.append(
        createHTMLElement("span", book.title),
        createHTMLElement("span", `ID: ${book._id}`),
        createHTMLElement("span", `Page Count: ${book.pageCount}`),
        createHTMLElement("span", `Status: ${book.status}`),
        createButtonElement("Go Back", () => loadBooks(apiEndpoint))
    );


    booksContainer.innerHTML = "";
    booksContainer.append(singleBookDiv);
};

const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
        booksContainer.innerHTML = "";
        loadBooks(`${apiEndpoint}?search=${searchInput.value}`);
    }
};

const searchInput = document.querySelector(".search");
searchInput.addEventListener("keypress", handleSearchEnter);

loadBooks(apiEndpoint);
