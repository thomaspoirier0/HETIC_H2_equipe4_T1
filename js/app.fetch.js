/*
** for get story from mysql
*/

const getPost = async function(data) 
{
    try 
    {
        addLoaderPost()
        let response = await fetch ('../api/index.php?action=read')
        if(response.ok)
        {
            let responseData = await response.json()
            return responseData
        
        }
        else 
        {
            console.error('Retour du serveur  : ', response.status)
        }
    } 
    catch (e) 
    {
        console.error(e)
    }    
} 
/*
** for send story and name to mysql
*/

const sendPost = async function (data) 
{
    try 
    {
        let response = await fetch ('../api/index.php?action=send', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(response.ok) 
        {   
            popUpInsert(response.status)
            let responseData = await response.json()
        } 
        else 
        {
            popUpInsert(response.status)
            console.error('Retour du serveur  : ', response.status)
        }
    } 
    catch (e) 
    {
        console.error(e)
    }
}
