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
    const Description = document.querySelector("#description"); 
    let image64;
    toDataURL(document.querySelector('input[type=file]').files[0].name)
    .then(dataUrl => {

        let index = dataUrl.indexOf(',');
        image64 = dataUrl.substring(index + 1);
        console.log(image64);
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