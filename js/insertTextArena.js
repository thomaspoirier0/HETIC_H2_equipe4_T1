const $storyAreaRead = document.querySelector('.area-read')
const $labelAuthor = document.querySelector('.label-author')

const insertTextArena = (message) =>
{
    console.log('ok')
    getPost().then(response => {
        if(response.message)
        {
            console.log(response.message)
            console.log(response.author)
            $storyAreaRead.innerHTML = response.message
            $labelAuthor.innerHTML = response.author 

        }




    })

}
insertTextArena()
