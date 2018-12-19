const $storyAreaRead = document.querySelector('.area-read p')
const $labelAuthor = document.querySelector('.label-author p')

/*
** insert story, name and color mood
** manage loader
*/
const insertTextArena = (message) =>
{
    getPost().then(response => 
        {
        if(response.message)
        {
            removeLoaderPost()
            $storyAreaRead.innerHTML = response.message
            $labelAuthor.innerHTML = response.author
            console.log(moodInterpreter.dominantMood)
            const newColorMood = new colorMood(moodInterpreter.dominantMood)
            timeLeft(response.readtime)
        }
        else
        {
            insertTextArena()   
        }

    })

}
insertTextArena()
