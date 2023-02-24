const display = document.querySelector('main');
const apiKey = "RYeqgpSb";
const url = "https://www.rijksmuseum.nl/api/nl/collection?key=" + apiKey;

display.textContent = "Even geduld, de kunstobjecten worden geladen.";

// Define an asynchronous function to load the art objects
async function loadArtObjects() {
    try {
        // Use the fetch() method to make an API request to the Rijksmuseum API
        const response = await fetch(url);

        if (response.status >= 200 && response.status <= 299) {
            // Parse the JSON response into a JavaScript object
            const json = await response.json();

            // Extract the art objects from the JSON response
            const data = json.artObjects;

            console.log(data)



            // Loop through each art object
            data.forEach(async function (artObject) {
                const url = "https://www.rijksmuseum.nl/api/nl/collection/" + artObject.objectNumber + "?key=" + apiKey;

                const response = await fetch(url)
                const json = await response.json();

                // Make elements
                const newFigure = document.createElement("article");
                const image = document.createElement("img");
                const title = document.createElement("h2");
                const artist = document.createElement("h3");
                const tagContainer = document.createElement("ul");
                const listItem = document.createElement("li");
                const objectType = document.createElement("p");
                const description = document.createElement("p");

                // Add content to the elements
                image.src = artObject.webImage.url;
                title.textContent = artObject.title;
                artist.textContent = artObject.principalOrFirstMaker;
                objectType.textContent = json.artObject.objectTypes;
                description.textContent = json.artObject.titles;

                // Show the elements
                newFigure.appendChild(image);
                newFigure.appendChild(title);
                newFigure.appendChild(artist);
                listItem.appendChild(objectType);
                tagContainer.appendChild(listItem);
                newFigure.appendChild(tagContainer);
                newFigure.appendChild(description);

                // Append the new figure to the display
                display.appendChild(newFigure);
            });

            // Remove loading state
            display.textContent = "";


        } else {
            throw Error(response.statusText);
        }

    } catch (error) {
        console.log(error);
    }

}



// Call the loadArtObjects() function to display the art objects
loadArtObjects();

