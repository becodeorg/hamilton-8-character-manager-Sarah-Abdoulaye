const body = document.querySelector("body");
const main = document.createElement("main");
const footer = document.querySelector("footer");
const search = document.querySelector("#search");
body.append(main);
body.insertBefore(main, footer);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Fonction pour supprimer le personnage choisi
const deleteButton = (ligne, buttondelete) => {
    buttondelete.addEventListener("click", async (e) => {
        e.preventDefault();
        if (confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) {
            try {
                const response = await fetch(`https://character-database.becode.xyz/characters/${ligne}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    console.log("Personnage supprimé avec succès.");
                } else {
                    console.error("Erreur lors de la suppression du personnage.");
                }
            } catch (error) {
                console.error("Une erreur s'est produite lors de la suppression du personnage.", error);
            }
        }
    });
};
//------------------------------------------------------------------------------------------------------------------------------------------------------

// Gestionnaire d'événement pour la barre de recherche
search.addEventListener("click", async (e) => {
    const valeur = document.querySelector("#search-bar").value;
    try {
        const response = await fetch(`https://character-database.becode.xyz/characters?name=${valeur}`);
        if (response.ok) {
            const data = await response.json();
            console.table(data);
            e.preventDefault();
            main.innerHTML = "";
            data.forEach(createArticle);
        } else {
            console.error("Erreur lors de la recherche des personnages.");
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la recherche des personnages.", error);
    }
});

//--------------------------------------------------------------------------------------------------------------
//fetch permettant d'aller rechercher les données sur l'api
fetch("https://character-database.becode.xyz/characters")
    .then(response => response.json())
    .then((data) => {
        console.log("Vous avez réussi à récupérer les données deAPI.");
        data.forEach(createArticle);
    })
    .catch(error => console.log("Une erreur s'est produite lors du chargement de la page", error));

// Fonction pour créer un article
const createArticle = (data) => {
    const articleCharacter = document.createElement("article");
    main.append(articleCharacter);

    const img = document.createElement("img");
    articleCharacter.append(img);
    img.src = `data:image/png;base64,${data.image}`;

    const nom = document.createElement("p");
    nom.className = "nom";
    articleCharacter.append(nom);
    nom.innerText = data.name;

    const shortdescription = document.createElement("div");
    shortdescription.className = "shortdescription";
    articleCharacter.append(shortdescription);
    shortdescription.innerText = data.shortDescription;

    const description = document.createElement("div");
    description.className = "description";
    articleCharacter.append(description);
    description.innerHTML = data.description;

    const buttondelete = document.createElement("button");
    articleCharacter.appendChild(buttondelete);
    buttondelete.className = "buttondelete";
    buttondelete.innerHTML = "Delete";
    deleteButton(data.id, buttondelete);

    const buttonedit = document.createElement("a");
    articleCharacter.appendChild(buttonedit);
    buttonedit.href = `create.html?id=${data.id}`;
    buttonedit.className = "buttonedit";
    buttonedit.innerHTML = "Edit";
};
