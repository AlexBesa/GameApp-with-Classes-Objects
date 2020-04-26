function FetchApi(url){
    this.url = url;
}


FetchApi.prototype.getGamesList = async function() {
    try {
        const response = await fetch(`${this.url}/games`, {
            method: "GET",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
        console.log("response from server is here: ", response);
        return response.json();
        // throw new Error("eroarea mea!") 
    }
    catch (error) {
        console.log("There is an error: ", error);
    }
}

FetchApi.prototype.deleteGame = async function (gameID){
    try {
        const response = await fetch(`${this.url}/games/${gameID}`,{
            method: "DELETE"  
        });
        const apiResponse = await response.text();
        console.log("api resp", apiResponse);
    }
    catch (error) {
        console.log("The api cannot be deleted: ", error);
    }
}
FetchApi.prototype.createGameRequest = async function (gameObject){
    try {
        const response = await fetch(`${this.url}/games`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: gameObject
        });
        return response.json();
    }
    catch (error) {
        console.log("The game cannot be created: ", error);
    }
}

FetchApi.prototype.updateGameRequest = async function (updatedGameObj){
    try {
        const response = await fetch(`${this.url}/games/${updatedGameObj._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "title=" + updatedGameObj.title
                + "&description=" + updatedGameObj.description
                + "&imageUrl=" + updatedGameObj.imageUrl
        });
        const updatedGame = await response.json();
        console.log("Status update: Success !!! ", updatedGame);
    }
    catch (error) {
        console.log("The game cannot be updated: ", error);
    }
}

// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare2