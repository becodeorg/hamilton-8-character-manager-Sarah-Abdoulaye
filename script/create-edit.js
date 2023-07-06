// Récupérer l'ID du post à partir des paramètres de l'URL
let postID = new URLSearchParams(window.location.search).get('id');

// Condition : si l'ID récupéré n'est pas null (il possède un ID), alors on récupère les données pour éditer
if (postID !== null) {
    // Fonction permettant de récupérer les données à partir de leur ID
    function renderOneCharacter(data) {   
        document.querySelector('#name').value = data.name;
        document.querySelector('#description').value = data.description;
        document.querySelector('img')
    }

    // Récupérer les données du personnage à partir de son ID
    fetch(`https://character-database.becode.xyz/characters/${postID}`)
        .then(response => response.json())
        .then(data => renderOneCharacter(data))
        .catch(error => console.log(error));

    // Récupérer les valeurs des champs de texte pour le nom et la description du personnage
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description');

    (async () => {
        const rawResponse = await fetch(`https://character-database.becode.xyz/characters/${postID}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                image: image64
            }) 
        });
        
        const content = await rawResponse.json();
    })();
}

// Suite de la condition : si l'ID est null (n'existe pas), alors on crée un nouveau personnage
else {
    let image64;

    // Fonction qui permet d'enregistrer les données apportées par l'utilisateur
    document.querySelector("#enregistrer").onclick = function(e) {
        e.preventDefault();
        
        // Convertir l'image en une URL de données (base64)
        const toDataURL = url => fetch(url)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));

        // Récupérer le nom et la description du personnage à partir des champs de texte
        const name = document.querySelector("#name").value;
        const description = document.querySelector("#description").value; 

        // Convertir l'image en URL de données (base64) et enregistrer la partie codée en base64
        toDataURL(document.querySelector('input[type=file]').files[0].name)
            .then(dataUrl => {
                console.log(dataUrl);
                let index = dataUrl.indexOf(',');
                image64 = dataUrl.substring(index + 1);
                
                // Envoyer les données du personnage au serveur pour créer un nouveau personnage
                fetch("https://character-database.becode.xyz/characters", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        description: description,
                        image: image64
                    }) 
                })
                .then(response => response.json())
                .catch(error => console.log(error));
            });
    }
}

