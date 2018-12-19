/*
** submit name and story to sendPost()
*/
const $ButtonSubmit = document.querySelector('.button-submit')

$ButtonSubmit.addEventListener('click', _event => 
{
    _event.preventDefault()
    userName = document.querySelector('.name').value
    userStory = document.querySelector('.story-area').value

    sendPost({
            user_name: userName,
            user_story: userStory
    })
})


