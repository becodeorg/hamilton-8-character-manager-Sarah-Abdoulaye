let postID =(new URLSearchParams(window.location.search)).get('id');
if (postID!=null)
{
    function renderOneCharacter(data)
{
   
    document.querySelector('#name').value = data.name
    document.querySelector('#description').value = data.description;
}

if(postID!=null){
    fetch("https://character-database.becode.xyz/characters/"+postID)
    .then(response => response.json())
    .then(data => renderOneCharacter(data));

   

    let fullName =  document.querySelector('#nameHeroes').value;
    let shortDescription =document.querySelector('#shortDescription').value;
   
}

(async () => {

    const rawResponse = await fetch("https://character-database.becode.xyz/characters/" + postID, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name: Firstname,
            description :  Description,
            image : image64
        }) 
    });
    
    const content = await rawResponse.json();

    })();

}else{
let image64;
document.querySelector("#enregistrer").onclick = function(e){
    e.preventDefault();
    
    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
    }))
    const Firstname = document.querySelector("#name").value;
    const Description = document.querySelector("#descritpion").value; 
  

    toDataURL(document.querySelector('input[type=file]').files[0].name)
    .then(dataUrl => {
        console.log(dataUrl);
        let index = dataUrl.indexOf(',');
        image64 = dataUrl.substring(index + 1);
        
      
    (async () => {

        const rawResponse = await fetch("https://character-database.becode.xyz/" + "characters", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name: Firstname,
                description :  Description,
                image : image64
            }) 
        });
        
        const content = await rawResponse.json();

        })();
    })
}
}