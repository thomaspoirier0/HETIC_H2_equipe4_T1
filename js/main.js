const $container = document.querySelector('.container')
const $formStory = $container.querySelector('.form-story')
const $submit = $formStory.querySelector('.button-submit')
const $buttonPop = $formStory.querySelector('.button-pop')
const $popUpname = $formStory.querySelector('.popup-name')
const $storyArea = $formStory.querySelector('.story-area')
const $buttonReturn = document.querySelector('.button-return')

let userName, userStory, errorRequest

const popUpInsert = (status) =>
{
    let popUp = document.createElement('div')
    popUp.classList.add('popup--display')
    let textPopUp = document.createElement('p')
    let buttonReturn = document.createElement('button')
    buttonReturn.innerHTML = 'Retour'
    buttonReturn.classList.add('test')
    switch (status) {
        case 200:
            textPopUp.innerHTML = 'Histoire envoyé'
            break;
        case 404:
            textPopUp.innerHTML = 'Le serveur à un problème, nos techniciens travaillent dessus'
            break;
        case 405:
            textPopUp.innerHTML = 'Vous avez un problème de connexion'
            break;
        case 400:
            textPopUp.innerHTML = 'Le texte est trop court'
            break;
        default:
            textPopUp.innerHTML = 'Erreur, nous travaillons activement dessus'

    }
    $popUpname.classList.remove('popup--display')
    popUp.appendChild(textPopUp)
    popUp.appendChild(buttonReturn)
    $formStory.insertBefore(popUp, $popUpname);

    let buttonReturn1 = document.querySelector('.test')

    buttonReturn1.addEventListener('click', (_event) => 
    {
        _event.preventDefault()
        $popUpname.classList.remove('popup--display')
        $storyArea.classList.remove('story-area--none')
        $storyArea.removeAttribute('disabled', 'none')
        popUp.remove()
        
    })

}

$buttonReturn.addEventListener('click', (_event) => 
{
        _event.preventDefault()
        $popUpname.classList.remove('popup--display')
        $storyArea.classList.remove('story-area--none')
        $storyArea.removeAttribute('disabled', 'none')
    
})



$submit.addEventListener('click', _event => 
{
    _event.preventDefault()

    userName = document.querySelector('.name').value
    userStory = document.querySelector('.story-area').value

    sendPost({
            user_name: userName,
            user_story: userStory
    })
})


$buttonPop.addEventListener('click', (_event) => 
{
    _event.preventDefault()
    $popUpname.classList.add('popup--display')
    $storyArea.classList.add('story-area--none')
    $storyArea.setAttribute('disabled', 'none')

})
