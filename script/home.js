//initialisation des variables

const body = document.querySelector("body");
const main = document.createElement("main");
const footer = document.querySelector("footer");
body.append(main);

body.insertBefore(main, footer);

fetch("https://character-database.becode.xyz/characters")
.then(response => response.json())
.then((data) =>{
    console.log("Vous avez reussi a récupérer les apis.");
    //Boucle permettant de créer des articles
    data.forEach(ligne  => {
        let articleCharacter = document.createElement("article");
        main.append(articleCharacter);
        articleCharacter.innerText = ligne.name;
        //articleCharacter.innerText = ligne.descritpion
        //aller rechercher les noms
        console.log(ligne);
    });
})
.catch(error => console.log("Une erreur c'est produite lors du chargement de la page"))