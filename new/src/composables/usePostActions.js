const like = async (type, datas) => {
    try {
        let data;
        let response;
        
        console.log('like method called !'); // Mover el log de la llamada aquí
        
        switch(type) {
            case "POST":
                response = await fetch('http://localhost:3000/api/sofi/like_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "POST",
                        post_id: datas.post_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function like: ', data);
                break;

            case "VIDEO":
                response = await fetch('http://localhost:3000/api/sofi/like_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "VIDEO",
                        video_id: datas.video_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function like: ', data);
                break;
            
            case "COMMENT":
                response = await fetch('http://localhost:3000/api/sofi/like_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "COMMENT",
                        post_id: datas.post_id,
                        comment_id: datas.comment_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function like: ', data);
                break;
            
            case "AWNSER":
                response = await fetch('http://localhost:3000/api/sofi/like_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "AWNSER",
                        post_id: datas.post_id,
                        comment_id: datas.comment_id,
                        awnser_id: datas.awnser_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function like: ', data);
                break;
            
            case "VIDEO_COMMENT":
                response = await fetch('http://localhost:3000/api/sofi/like_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "VIDEO_COMMENT",
                        video_id: datas.video_id,
                        comment_id: datas.comment_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function like: ', data);
                break;
                
            case "VIDEO_COMMENT_AWNSER":
                response = await fetch('http://localhost:3000/api/sofi/like_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "VIDEO_COMMENT_AWNSER",
                        video_id: datas.video_id,
                        comment_id: datas.comment_id,
                        awnser_id: datas.awnser_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function like: ', data);
                break;
        }
        
    } catch(e) {
        throw e;
    }
}

const dislike = async (type, datas) => {
    try {
        let data;
        let response;
        
        switch(type) {
            
            case "COMMENT":
                response = await fetch('http://localhost:3000/api/sofi/dislike_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "COMMENT",
                        post_id: datas.post_id,
                        comment_id: datas.comment_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function dislike: ', data);
                break;
            
            case "AWNSER":
                response = await fetch('http://localhost:3000/api/sofi/dislike_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "AWNSER",
                        post_id: datas.post_id,
                        comment_id: datas.comment_id,
                        awnser_id: datas.awnser_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function dislike: ', data);
                break;
            
            case "VIDEO_COMMENT":
                response = await fetch('http://localhost:3000/api/sofi/dislike_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "VIDEO_COMMENT",
                        video_id: datas.video_id,
                        comment_id: datas.comment_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function dislike: ', data);
                break;
                
            case "VIDEO_COMMENT_AWNSER":
                response = await fetch('http://localhost:3000/api/sofi/dislike_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "VIDEO_COMMENT_AWNSER",
                        video_id: datas.video_id,
                        comment_id: datas.comment_id,
                        awnser_id: datas.awnser_id
                    }),
                    credentials: 'include'
                });
                
                data = await response.json();
                console.log('server data from function dislike: ', data);
                break;
        }
        
    } catch(e) {
        throw e;
    }
}


const save = async (type, datas) => {
    try {
        
        let response;
        let data; 
        
        switch(type) {
            case "POST":
                 response = await
                fetch('http://localhost:3000/api/sofi/save_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "POST",
                        post_id: datas.post_id
                    }),
                    credentials: 'include'
                })
                
                data = await response.json()
                break;
            
            case "VIDEO":
                
                response = await
                fetch('http://localhost:3000/api/sofi/save_content', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: "VIDEO",
                        video_id: datas.video_id
                    }),
                    credentials: 'include'
                })
                
                data = await response.json()
                break;
                
                
                
        }
        
        
    } catch(e) {
        throw e
    }
}












export { like, dislike }