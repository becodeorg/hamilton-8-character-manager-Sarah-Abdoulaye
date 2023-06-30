//Initialisation des variables
const main = document.querySelector("main");
const sectionCharacter = document.createElement("section");
sectionCharacter.setAttribute("class", "section");
main.appendChild(sectionCharacter);
/*fetch("https://character-database.becode.xyz/characters")
.then(response => response.json())
.then(data=>{
    console.log("Vous avez reussi a récupérer les apis.");
    //Boucle permettant de créer des articles
    data.forEach(ligne => {
        let articleCharacter = document.createElement("article");
        sectionCharacter.innerText = ligne;
        sectionCharacter.appendChild(articleCharacter);
        console.log(articleCharacter);

        //aller rechercher les noms

    });
})
.catch(error => console.log("Une erreur c'est produite lors du chargement de la page"))*/
