//initialisation des variables
const body = document.querySelector("body");
const main = document.createElement("main");
const footer = document.querySelector("footer");
const search= document.querySelector("#search");
body.append(main);
body.insertBefore(main, footer);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Code pour supprimer le personnage choisi
function deleteButton(ligne, buttondelete){
    buttondelete.onclick= function(e){
        console.log(buttondelete);
        e.preventDefault();
        fetch("https://character-database.becode.xyz/characters/" + ligne, {
            method: "DELETE",
            //Le header défini que les données qu'on envoi seront en format JSON (metadata, complément d'information à destination de l'API)
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------
documet
//searchbar
search.onclick = function(e){
    let valeur = document.querySelector("#search-bar").value;
    fetch('https://character-database.becode.xyz/characters?name='+ valeur)
    .then(response => response.json())
    .then(data => {
        console.table(data);
        e.preventDefault();
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        for ( element of data) {
            
        // Permet de creer l'article en fonction du nombre d'élément dans l'API
            let articleCharacter = document.createElement("article");
            main.append(articleCharacter);
        
            // Permet de creer une img "img" pour chaque article
            let img = document.createElement("img");
            articleCharacter.append(img);
            img.src = 'data:image/png;base64,' + element.image;

            // Permet de creer un paragraphe "nom" pour chaque article
            let nom = document.createElement("p");
            nom.className = "nom";
            articleCharacter.append(nom);
            nom.innerText = element.name;
            
            // Permet de creer une div "short description" pour chaque article
            let shortdescription = document.createElement("div");
            shortdescription.className = "shortdescription";
            articleCharacter.append(shortdescription);
            shortdescription.innerText = element.shortDescription;
        
            // Permet de creer une div "description" pour chaque article
            let description = document.createElement("div");
            description.className = "description";
            articleCharacter.append(description);
            description.innerHTML = element.description;

            //permet de creer un bouton pemettant de supprimer une carte
            let buttondelete = document.createElement("button");
            articleCharacter.appendChild(buttondelete);
            buttondelete.className = "buttondelete";
            buttondelete.innerHTML = "Delete";
            deleteButton(element.id, buttondelete);
            
    
            // bouton permmettant de modifier une carte
            let buttonedit = document.createElement("button");
            articleCharacter.appendChild(buttonedit);
            buttonedit.className = "buttonedit";
            console.log(buttonedit);
            buttonedit.innerHTML = "Edit";
            }
    })
}

fetch("https://character-database.becode.xyz/characters")
.then(response => response.json())
.then((data) =>{
    
    console.log("Vous avez reussi a récupérer les API.");
    //Boucle permettant de créer des articles
    data.forEach(ligne  => {
        
        // Permet de creer l'article en fonction du nombre d'élément dans l'API
        let articleCharacter = document.createElement("article");
        main.append(articleCharacter);
        
        // Permet de creer une img "img" pour chaque article
        let img = document.createElement("img");
        articleCharacter.append(img);
        const imgBase = ligne.image;
        img.src = 'data:image/png;base64,' + imgBase;

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

        //permet de creer un bouton pemettant de supprimer une carte
        let buttondelete = document.createElement("button");
        articleCharacter.appendChild(buttondelete);
        buttondelete.className = "buttondelete";
        console.log(buttondelete);
        buttondelete.innerHTML = "Delete";
        deleteButton(ligne.id, buttondelete);
        
        
        console.log(ligne);
        // bouton permmettant de modifier une carte
        let buttonedit = document.createElement("a");
        articleCharacter.appendChild(buttonedit);
        buttonedit.setAttribute('href','create.html?id='+ligne.id)
        buttonedit.className = "buttonedit";
        buttonedit.innerHTML = "Edit";
                        
        // Permet d'afficher pour tester. 
        //console.log(imgBase);
        console.log(img);
    });
})
.catch(error => console.log("Une erreur c'est produite lors du chargement de la page"));
