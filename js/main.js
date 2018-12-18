const $container = document.querySelector('.container')
const $formStory = $container.querySelector('.form-story')


const $storyArea = $formStory.querySelector('.story-area')
const $popUp = $formStory.querySelector('.popup')
const $popUpfinish = $formStory.querySelector('.popup-finish')


const $buttonNext = $formStory.querySelector('.button-next')
const $buttonReturn = $formStory.querySelector('.button-return')




let userName, userStory


const popUpInsert = (status) =>
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

    console.log(status)
    switch (status) {
        case 200:
            $popUp.classList.remove('popup--display')
            $popUpfinish.classList.add('popup--display')
            console.log('ok')
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
    buttonReturn.appendChild(arrowReturn)
    popUp.appendChild(buttonReturn)
    
    $formStory.insertBefore(popUp, $popUp);

    const buttonReturnPopup = document.querySelector('.button-return')

    buttonReturnPopup.addEventListener('click', (_event) => 
    {

        _event.preventDefault()
        popUp.remove() 
        $storyArea.classList.remove('story-area--none')
        $buttonNext.classList.remove('button-next--none')
        $storyArea.removeAttribute('disabled', 'none')    
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
    $storyArea.removeAttribute('disabled', 'none')    


})

$buttonNext.addEventListener('click', (_event) => 
{
    _event.preventDefault()

    togglePopUp()

})

const darkModeButton = document.querySelector('.dark-mode-toggle')

const root = document.documentElement
const $menu = $menuContainer.querySelector('.menu')

const $bodyBackground = document.querySelector('body')
const $blockTop = $bodyBackground.querySelector('.background-block-top')
const $readZone = $body.querySelector('.story-area')

const newColorTop = '#142A3B'
const newColorBottom = '#132431'
const oldColor = window.getComputedStyle($menuContainer).getPropertyValue('background-color')

let darkModeStatus = false
darkModeButton.addEventListener('click', () =>
{
    if(!darkModeStatus)
    {
        const headerDarkMode = new darkMode([$blockTop, $menuContainer], newColorTop)
        const menuDarkMode = new darkMode([$body], newColorBottom)
        const readZoneMode = new darkMode([$readZone], '#1a2e40')
        root.style.setProperty('--buttons-color', '#FFFFFF')
        root.style.setProperty('--buttons-text-color', '#000000')
        root.style.setProperty('--concept-text', '#FFFFFF')
        root.style.setProperty('--read-paragraph', '#FFFFFF')

        darkModeStatus = true
    }
    else
    {
        const headerDarkMode = new darkMode([$blockTop, $menuContainer], oldColor)
        const menuDarkMode = new darkMode([$body], '#FFFFFF')
        const readZoneMode = new darkMode([$readZone], '#FFFFFF')
        const readParagraphMode = new darkMode([$readParagraph], '#FFFFFF')
        root.style.setProperty('--buttons-color', '#7fb8f5')
        root.style.setProperty('--buttons-text-color', '#FFFFFF')
        root.style.setProperty('--concept-text', '#000000')
        root.style.setProperty('--read-paragraph', '#000000')

        darkModeStatus = false
    }
})