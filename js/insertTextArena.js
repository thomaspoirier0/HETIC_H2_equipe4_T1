const $storyAreaRead = document.querySelector('.area-read p')
const $labelAuthor = document.querySelector('.label-author p')

const insertTextArena = (message) =>
{
    console.log('ok')
    getPost().then(response => {
        if(response.message)
        {
            console.log(response.message)
            console.log(response.author)
            loaderPost()
            $storyAreaRead.innerHTML = response.message
            $labelAuthor.innerHTML = response.author 
            timeLeft(response.readtime)
        }




    })

}
insertTextArena()
