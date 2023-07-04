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
        
        let nom = document.createElement("p");
        nom.className = "nom";
        articleCharacter.append(nom);
        nom.innerText = ligne.name;

        
        let shortdescription = document.createElement("div");
        shortdescription.className = "shortdescription";
        articleCharacter.append(shortdescription);
        shortdescription.innerText = ligne.shortDescription;


        let description = document.createElement("div");
        description.className = "description";
        articleCharacter.append(description);
        description.innerHTML = ligne.description;

        let img = document.createElement("img");
        articleCharacter.append(img);

        //articleCharacter.innerHTML = ligne.image


        // début test 

        let create = document.createElement("button");
        create.className = "create";
        create.innerText = "create";
        articleCharacter.append(create);
        create.innerHTML = ligne.create;

        console.log(create);

        // fin de test

        console.log(ligne);
        console.log(articleCharacter);
    });
})
.catch(error => console.log("Une erreur c'est produite lors du chargement de la page"))