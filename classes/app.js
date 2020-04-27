function CreateAppForm(title,description,genre,publisher,imageUrl,release){
    this.title = title;
    this.description = description;
    this.genre = genre;
    this.publisher = publisher;
    this.imageUrl = imageUrl;
    this.release = release;
}

CreateAppForm.prototype.validateFormElement = function(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            this.buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }   
}

CreateAppForm.prototype.validateReleaseTimestampElement= function(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        this.buildErrorMessage(inputElement, errorMessage);
    }
}

CreateAppForm.prototype.buildErrorMessage = function(inputEl, errosMsg){
    // console.log("=========",inputEl)
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.before(errorMsgElement);
}

const gameTitle = document.getElementById("gameTitle");
const gameDescription = document.getElementById("gameDescription");
const gameGenre = document.getElementById("gameGenre");
const gamePublisher = document.getElementById("gamePublisher");
const gameImageUrl = document.getElementById("gameImageUrl");
const gameRelease = document.getElementById("gameRelease");

document.querySelector(".submitBtn").addEventListener("click", event => {
    event.preventDefault();
    
    const newApp = new CreateAppForm(gameTitle,gameDescription,gameGenre,gamePublisher,gameRelease,gameImageUrl);
    
    newApp.validateFormElement(newApp.title, "The title is required!");
    newApp.validateFormElement(newApp.genre, "The genre is required!");
    newApp.validateFormElement(newApp.imageUrl, "The image URL is required!");
    newApp.validateFormElement(newApp.release, "The release date is required!");

    newApp.validateReleaseTimestampElement(newApp.release, "The release date you provided is not a valid timestamp!");

    if(newApp.title.value !== "" && newApp.genre.value !== "" && newApp.imageUrl.value !== "" && newApp.release.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", newApp.title.value);
        urlencoded.append("releaseDate", newApp.release.value);
        urlencoded.append("genre", newApp.genre.value);
        urlencoded.append("publisher", newApp.publisher.value);
        urlencoded.append("imageUrl", newApp.imageUrl.value);
        urlencoded.append("description", newApp.description.value);
        console.log("aici e urlencoded ", urlencoded)

        async function newGameRelease(){
            const newGame = await apiURL.createGameRequest(urlencoded);
            const createDomGame = new GameModel(
                newGame._id,
                newGame.title,
                newGame.imageUrl,
                newGame.description,
                apiURL,
            )
            createDomGame.createDomElement(newGame)
        console.log("game created successfully in Dom ", newGame);
        }
        newGameRelease();
    }
    gameTitle.value = "";
    gameDescription.value = "";
    gamePublisher.value = "";
    gameImageUrl.value = "";
    gameRelease.value = "";
})
