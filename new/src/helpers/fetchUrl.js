export default async function fetchUrl(url, data, method) {
    const options = {
        method: method,
        credentials: 'include'
    }
    
    if(method == "POST") {
        options.headers = {
            'Content-Type': 'application/json'
        }
        options.body = JSON.stringify(data)
    }
    
    const response = await fetch(url, options)
    return response
}