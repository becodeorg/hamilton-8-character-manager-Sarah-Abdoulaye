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
        // Permet de creer l'article en fonction du nombre d'élément dans l'API
        let articleCharacter = document.createElement("article");
        main.append(articleCharacter);
        
        // Permet de creer un paragraphe "nom" pour chaque article
        let nom = document.createElement("p");
        nom.className = "nom";
        articleCharacter.append(nom);
        nom.innerText = ligne.name;

        // Permet de creer une div "short description" pour chaque article
        let shortdescription = document.createElement("div");
        shortdescription.className = "shortdescription";
        articleCharacter.append(shortdescription);
        shortdescription.innerText = ligne.shortDescription;

        // Permet de creer une div "description" pour chaque article
        let description = document.createElement("div");
        description.className = "description";
        articleCharacter.append(description);
        description.innerHTML = ligne.description;

        // Permet de creer une img "img" pour chaque article
        let img = document.createElement("img");
        articleCharacter.append(img);
        const imgBase = ligne.image;
        img.src = 'data:image/png;base64,' + imgBase;

        // Permet d'afficher pour tester. 
        //console.log(imgBase);
        console.log(img);
    });
})
.catch(error => console.log("Une erreur c'est produite lors du chargement de la page"));