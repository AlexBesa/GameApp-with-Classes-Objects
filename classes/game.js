function GameModel(id, title, imageUrl,description,apiInstance) {
    this._id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.apiInstance = apiInstance;
}
GameModel.prototype.createDomElement = function()  {
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");

    gameELement.innerHTML = `
        <div id="${this._id}">
            <h1>${this.title}</h1> 
            <img src="${this.imageUrl}" />
            <p>${this.description}</p> 
            <button id="delete-${this._id}" class="delete-btn">Delete Game</button>
            <button id="edit-${this._id}" class="edit-btn">Edit Game</button>
        </div>`;    

    container1.appendChild(gameELement);

    document
        .getElementById(`delete-${this._id}`)
        .addEventListener("click", (event) =>{
            this.apiInstance.deleteGame(event.target.parentElement.getAttribute("id"));
            this.removeDeletedElementFromDOM(event.target.parentElement);      
    });
    document
        .getElementById(`edit-${this._id}`)
        .addEventListener("click",(event)=>{
            this.createUpdateDivElement(event.target.parentElement);
    })
}


GameModel.prototype.removeDeletedElementFromDOM = function(domElement)  {
    // var domElement = document.getElementById(this._id);
    domElement.remove();
}


GameModel.prototype.createUpdateDivElement = function(){
    gameContainer = document.getElementById(this._id);
    const updateElement = document.createElement("div");
    updateElement.classList.add("updateFormDiv");
    updateElement.innerHTML = `
        <div class ="updateForm", id ="edit-div${this._id}">
            <label for="gameTitle">Here you can update the Title</label>
            <input type="text" value="${this.title}" name="gameTitle" id="updateGameTitle" />
            
            <label for="updateGameDescription">Here you can modify the description</label>
            <input type="text" name="updateGameDescription" value = "${this.description}" id="updateGameDescription" />

            <label for="gameImageUrl">Put a new URL image</label>
            <input type="text" value = "${this.imageUrl}" name="updateGameImageUrl" id="updateGameImageUrl" />

            <button id="update-btn${this._id}" class="updateBtn">Save Changes</button>
            <button id="cancel-btn${this._id}" class="cancelBtn">Cancel</button>
        </div>`;
    gameContainer.appendChild(updateElement);
    console.log('gameContainer is: ', gameContainer);
    console.log('updated game object is: ', this);

    document
        .getElementById(`cancel-btn${this._id}`)
        .addEventListener("click", (event) => {
            this.removeDeletedElementFromDOM(event.target.parentElement) 
        });
    document
        .getElementById(`update-btn${this._id}`)
        .addEventListener("click",(event) => {
            const updateGameTitleInputValue = updateElement.querySelector('#updateGameTitle').value;
            const updateGameDescriptionInputValue = updateElement.querySelector('#updateGameDescription').value;
            const updateGameImageUrlInputValue = updateElement.querySelector('#updateGameImageUrl').value;
            
            gameContainer.querySelector('h1').innerHTML = updateGameTitleInputValue;
            gameContainer.querySelector('p').innerHTML = updateGameDescriptionInputValue;
            gameContainer.querySelector('img').src = updateGameImageUrlInputValue;

            this.title=updateGameTitleInputValue;
            this.description=updateGameDescriptionInputValue;
            this.imageUrl=updateGameImageUrlInputValue;
            
            this.apiInstance.updateGameRequest(this);
            this.removeDeletedElementFromDOM(event.target.parentElement);
        })
}
