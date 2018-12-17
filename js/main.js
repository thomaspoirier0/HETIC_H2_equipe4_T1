const $container = document.querySelector('.container')
const $formStory = $container.querySelector('.form-story')


const $storyArea = $formStory.querySelector('.story-area')
const $popUp = $formStory.querySelector('.popup')
const $popUpfinish = $formStory.querySelector('.popup-finish')
const $storyAreaRead = $formStory.querySelector('.area-read')


// const $ButtonSubmit = $formStory.querySelector('.button-submit')
const $buttonNext = $formStory.querySelector('.button-next')
const $buttonReturn = $formStory.querySelector('.button-return')



let userName, userStory


const popUpInsert = () =>
{

    const popUp = document.createElement('div')
    popUp.classList.add('popup--display')
    popUp.setAttribute('display', 'flex')
    popUp.setAttribute('justify-content', 'center')
    popUp.setAttribute('align-items', 'center')

    const imagePopUp = document.createElement('img')
    const textPopUp = document.createElement('p')
    const buttonReturn = document.createElement('div')
    const arrowReturn = document.createElement('div')

    buttonReturn.classList.add('round-return')
    buttonReturn.classList.add('button-return')

    arrowReturn.classList.add('arrow-return')


    let status = 200
    switch (status) {
        case 200:
            $popUp.classList.remove('popup--display')
            $popUpfinish.classList.add('popup--display')
            return
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
    $popUp.classList.remove('popup--display')
    popUp.appendChild(imagePopUp)
    popUp.appendChild(textPopUp)
    popUp.appendChild(buttonReturn)
    buttonReturn.appendChild(arrowReturn)
    
    $formStory.insertBefore(popUp, $popUp);

    const buttonReturnPopup = document.querySelector('.button-return')

    buttonReturnPopup.addEventListener('click', (_event) => 
    {

        _event.preventDefault()
        togglePopUp() 
    })
}



const togglePopUp = () =>
{
    $popUp.classList.toggle('popup--display')
    $storyArea.classList.toggle('story-area--none')
    $buttonNext.classList.toggle('button-next--none')
    $storyArea.toggleAttribute('disabled', 'none')
}

$buttonReturn.addEventListener('click', (_event) => 
{
    _event.preventDefault()
    togglePopUp()
})

$buttonNext.addEventListener('click', (_event) => 
{
    _event.preventDefault()
    togglePopUp()
})


const insertTextArena = () =>
{
    let textStory, textName
    getPost().then( response =>
        { 
            textStory = response.message
            textName = response.author
        })
    console.log(textStory)
    $storyAreaRead.innerHTML = textStory
}
insertTextArena()

// $ButtonSubmit.addEventListener('click', _event => 
// {
//     _event.preventDefault()
//     userName = document.querySelector('.name').value
//     userStory = document.querySelector('.story-area').value

//     sendPost({
//             user_name: userName,
//             user_story: userStory
//     })
// })


