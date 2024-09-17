import fetchUrl from '../helpers/fetchUrl'

//FUNCTION TO START A CHAT WITH A USER, IF THE CHAT EXISTS THEN THE SERVER 
// RETURNS A MESSAGE WITH 'already_exists', SO THAT WILL BE HANDLED ON TH-
// E COMPONENT. too easy, huh? ;P
// AND OBVIOUSLY USER_ID MEANS THE ID OF USER THAT YOU WANT TO START THE CHAT WITH 
export async function startChat(user_id) {
 const response = await fetchUrl(process.env.VUE_APP_API_URL + '/api/sofi/chat', {
   user_id: user_id
 }, 'POST') // if you are confused with this function, go check it at the helpers directory.

 const data = await response.json()
 if(response.ok) {
    return data
 } else {
    throw new Error('Something Went Wrong')
 }
}