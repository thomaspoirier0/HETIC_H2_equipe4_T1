const $formStory = document.querySelector('.form-story')
const $submit = $formStory.querySelector('.button-submit')
const $buttonPop = $formStory.querySelector('.button-pop')
const $popUpname = $formStory.querySelector('.popup-name')
const $storyArea = $formStory.querySelector('.story-area')
const $returnButton = $formStory.querySelector('.button-return')

let userName, userStory, errorRequest

$submit.addEventListener('click', _event => 
{
    _event.preventDefault()

    userName = document.querySelector('.name').value
    userStory = document.querySelector('.story-area').value
    
    sendPost().then((response) => 
    {
        return (!response ? errorRequest=true :     
            sendPost({
            user_name: userName,
            user_story: userStory
    }))
    })
})

$buttonPop.addEventListener('click', (_event) => 
{
    _event.preventDefault()
    $popUpname.classList.toggle('popup-name--display')
    $formStory.classList.toggle('form-story--none')
    $storyArea.setAttribute('disabled', 'none')
})
if(errorRequest)
{
    console.log(erruer)
}
$returnButton.addEventListener('click', (_event) => 
{
    _event.preventDefault()
    $popUpname.classList.toggle('popup-name--display')
    $formStory.classList.toggle('form-story--none')
    $storyArea.removeAttribute('disabled', 'none')
})
