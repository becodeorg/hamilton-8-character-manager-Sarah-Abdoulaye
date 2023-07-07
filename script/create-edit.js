// Fonction pour afficher les données du personnage sur la page
const renderOneCharacter = (data) => {
    document.querySelector('#name').value = data.name;
    document.querySelector('#description').value = data.description;
    document.querySelector('img');
};
//-----------------------------------------------------------------------------------------------------------------
// Fonction pour récupérer les données du personnage à partir de son ID
const fetchCharacterData = (postID) => {
    fetch(`https://character-database.becode.xyz/characters/${postID}`)
        .then(response => response.json())
        .then(data => renderOneCharacter(data))
        .catch(error => console.log(error));
    };

//-----------------------------------------------------------------------------------------------------------------
// Fonction pour mettre à jour les données du personnage sur le serveur
const updateCharacterData = async (postID, name, description, image64) => {
    const rawResponse = await fetch(`https://character-database.becode.xyz/characters/${postID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            description,
            image: image64
        }) 
    });

    const content = await rawResponse.json();
};

//--------------------------------------------------------------------------------------------------------------
// Fonction pour enregistrer les données du nouveau personnage
document.querySelector("#enregistrer").onclick = async function(e) {
    e.preventDefault();

    // Convertir l'image en une URL de données (base64)
    /* const toDataURL = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };*/

    const toDataURL = (src) => {
        if (src) {
            const reader = new FileReader()
            reader.onloadend = () => {
                console.log(reader.result)
            }
            return reader.readAsDataURL(src)
        }
    }

    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;

    try {
        // Convertir l'image en URL de données (base64)
        const dataUrl = await toDataURL(document.querySelector('#img').files[0]);
        console.log(dataUrl);
        const index = dataUrl.indexOf(',');
        const image64 = dataUrl.substring(index + 1);
    
        // Envoyer les données du personnage au serveur pour créer un nouveau personnage
        const response = await fetch("https://character-database.becode.xyz/characters", {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            name,
            description,
            image: image64
            }) 
        });
    
        const content = await response.json();
        } catch (error) {
        console.log(error);
        }
};

//-----------------------------------------------------------------------------------------------------------
// Récupérer l'ID du post à partir des paramètres de l'URL
const params = new URLSearchParams(window.location.search);
const postID = params.get('id');

// Si l'ID existe, récupérer les données du personnage et les mettre à jour sur le serveur
if (postID !== null) {
    fetchCharacterData(postID);

    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const image = document.querySelector('#img').value;
    updateCharacterData(postID, name, description, image64);
}
