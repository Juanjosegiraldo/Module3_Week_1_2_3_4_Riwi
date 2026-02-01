/* USER STORY M3W1
Author: Juan Jose Giraldo Muñoz

Objective: Implement a functional program in Javascript that keeps interact with the user,
request user and age, validate the input and show dinamic messages
according to stablished conditions.
*/

//USER INPUT
//We use const because the values are not reassigned during execution
const nameUser = prompt("Ingrese nombre")
const ageUser = prompt("Ingrese edad")

//We verificate if the user canceled the operation
if(nameUser === null || ageUser === null){
    console.warn("El usuario canceló la operación")
    alert("Has cancelado el proceso. Recarga la página para intentar de nuevo.")
} else if(ageUser.trim() === ""){ //If the input is empty, we inform in console and show an alert for the user undestarnd what was his wrong age validation.
    console.error("Error: No ingresaste ninguna edad.")
    alert("No ingresaste la edad. Recarga la página para intentar de nuevo.")
}else{
    const ageFinalUser = Number(ageUser) //We convert the input to number for validation
    //AGE VERIFICATION
    // For realise operations, we vericate that age is number.
    if (isNaN(ageFinalUser)){
        console.error("Error: Por favor, ingresa una edad válida en números")
    } else{
        //DYNAMIC MESSAGES
        //Segment the response based on the legal age of majority.
        if (ageFinalUser<1){
            alert("Ingrese edad mayor a 0, refresque la página e intente de nuevo.")
        }else if (ageFinalUser>=1 && ageFinalUser<18){
        alert(`Hola ${nameUser}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código`)
        console.log(`Hola ${nameUser}, eres menor de edad. ¡Sigue aprendiendo y disfrutando del código`)
        } else{ //In this point, we guarantee that the user is 18 years.
        alert(`Hola ${nameUser}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación`)
        console.log(`Hola ${nameUser}, eres mayor de edad. ¡Prepárate para grandes oportunidades en el mundo de la programación`)
        }
    }
}



