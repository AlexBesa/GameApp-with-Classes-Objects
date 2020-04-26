var apiURL = new FetchApi('https://games-app-siit.herokuapp.com');

async function startingApplication() {
    const arrayOfGames = await apiURL.getGamesList();
    for (let i = 0; i < arrayOfGames.length; i++){
        const currentArrayElement = arrayOfGames[i];
        const currentGameModel = new GameModel(
            currentArrayElement._id,
            currentArrayElement.title,
            currentArrayElement.imageUrl,
            currentArrayElement.description,
            apiURL,
        );
        currentGameModel.createDomElement();
    }
    console.log("all data is here: ", arrayOfGames);
}
startingApplication();

























// async function startingApplication() {
//     const arrayOfGames = await apiURL.getGamesList();
//     const list = [];
//     for (let i = 0; i < arrayOfGames.length; i++){
//         const game = new GamesPosts(arrayOfGames[i]._id,
//                                     arrayOfGames[i].title,
//                                     arrayOfGames[i].imageUrl,
//                                     arrayOfGames[i].description,
//         );
//         list.push(game)

//         for(let i=0; i< list.length;i++){
//             const node = list[i].createDomElement();
//             const container = document.querySelector('.container');
//             container.append(node)
//         }        
//     }
//     console.log("all data is here: ", arrayOfGames);
// }
// startingApplication();