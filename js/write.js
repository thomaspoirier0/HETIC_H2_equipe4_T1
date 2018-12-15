
const $formStory = document.querySelector('.form-story')
const $submit = $formStory.querySelector('.submit')
const $get = document.querySelector('.get')

let userName, userStory

$submit.addEventListener('click', _event => {
    _event.preventDefault()

    userName = document.querySelector('.name').value
    userStory = document.querySelector('.story').value
    
    console.log(userName, userStory)
    sendPost({
        user_name: userName,
        user_story: userStory
    })

})

$get.addEventListener('click', _event => {
    _event.preventDefault()
    console.log(getPost())
})
