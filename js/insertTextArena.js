const $storyAreaRead = document.querySelector('.area-read')

const insertTextArena = (message) =>
{
    console.log('ok')
    getPost().then(response => {
        if(response.message)
        {
            console.log(response.message)
            $storyAreaRead.innerHTML = response.message
        }


    })

}
insertTextArena()
