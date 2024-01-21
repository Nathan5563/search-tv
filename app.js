const form = document.querySelector(".form");
const cont = document.querySelector(".container");
const row = document.querySelector("#row");

form.addEventListener("submit", e => {
    e.preventDefault();
    while (row.firstChild) {
        row.removeChild(row.lastChild);
    }
    const searchTerm = document.querySelector("#query").value;
    axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    .then(res => {
        try {
            for (let i = 0; i < res.data.length; i++) {
                const searchResult = document.createElement("span");
                const searchResultText = document.createElement("div");
                const searchResultImage = document.createElement("img")

                searchResultText.innerHTML = res.data[i].show.name;

                if (res.data[i].show.image) {
                    searchResultImage.src = res.data[i].show.image.medium;
                } else {
                    searchResultImage.src = "https://placehold.co/210x295";
                }

                searchResult.append(searchResultImage);
                searchResult.append(searchResultText);

                searchResult.classList.add("m-3")
                searchResult.setAttribute("id", "item")

                row.append(searchResult);
            } 
        } catch (e) {
            console.log(e)
        }
    })
})

