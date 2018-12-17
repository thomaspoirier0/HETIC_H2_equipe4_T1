const $container = document.querySelector('.container')
const $formStory = $container.querySelector('.form-story')
const $submit = $formStory.querySelector('.button-submit')

const $buttonNext = $formStory.querySelector('.button-next')
const $buttonPop = $buttonNext.querySelector('.button-pop')

const $popUpname = $formStory.querySelector('.popup-name')
const $storyArea = $formStory.querySelector('.story-area')
const $buttonReturn = document.querySelector('.button-return')


let userName, userStory, errorRequest

const popUpInsert = () =>
{

    let popUp = document.createElement('div')
    popUp.classList.add('popup--display')
    popUp.setAttribute('display', 'flex')
    popUp.setAttribute('justify-content', 'center')
    popUp.setAttribute('align-items', 'center')

    let imagePopUp = document.createElement('img')
    let textPopUp = document.createElement('p')
    let buttonReturn = document.createElement('div')
    let arrowReturn = document.createElement('div')

    buttonReturn.classList.add('round-return')
    buttonReturn.classList.add('button-return')

    arrowReturn.classList.add('arrow-return')


    let status = 200
    switch (status) {
        case 200:
            textPopUp.innerHTML = 'Histoire envoyé'

            break;
        case 404:
            textPopUp.innerHTML = 'Le serveur à un problème, nos techniciens travaillent dessus'
            imagePopUp.setAttribute('src', '../images/pop-up/settings.svg')

            break;
        case 405:
            textPopUp.innerHTML = 'Vous avez un problème de connexion'
            imagePopUp.setAttribute('src', '../images/pop-up/wifi.svg')

            break;
        case 400:
            textPopUp.innerHTML = 'Le texte est trop court'
            imagePopUp.setAttribute('src', '../images/pop-up/cross.svg')

            break;
        default:
            textPopUp.innerHTML = 'Erreur, nous travaillons activement dessus'

    }

    imagePopUp.setAttribute('width', '10' + '%')
    $popUpname.classList.remove('popup--display')


    popUp.appendChild(imagePopUp)
    popUp.appendChild(textPopUp)
    popUp.appendChild(buttonReturn)
    buttonReturn.appendChild(arrowReturn)
    
    $formStory.insertBefore(popUp, $popUpname);

    let buttonReturn1 = document.querySelector('.button-return')

    buttonReturn1.addEventListener('click', (_event) => 
    {
        _event.preventDefault()
        $popUpname.classList.remove('popup--display')
        $storyArea.classList.remove('story-area--none')
        $buttonNext.classList.remove('button-next--none')
        $storyArea.removeAttribute('disabled', 'none')
        popUp.remove()
        
    })

}

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


$buttonReturn.addEventListener('click', (_event) => 
{
        _event.preventDefault()
        $popUpname.classList.remove('popup--display')
        $storyArea.classList.remove('story-area--none')
        $buttonNext.classList.remove('button-next--none')

        $storyArea.removeAttribute('disabled', 'none')
    
})

$buttonNext.addEventListener('click', (_event) => 
{
    _event.preventDefault()
    $popUpname.classList.add('popup--display')
    $storyArea.classList.add('story-area--none')
    $buttonNext.classList.add('button-next--none')
    $storyArea.setAttribute('disabled', 'none')
})












