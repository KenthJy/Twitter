import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// gets the dataset values and pass that value to the function it is calling
document.addEventListener('click', function(e){
    if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    } else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    } else if (e.target.id === 'post'){
        handleClickButton()
    }
})


//unshift the value to the tweetsData array
function handleClickButton(){
    const inputValue = document.getElementById('tweet-input')

    if (inputValue.value){
        tweetsData.unshift({
            handle: `@Kentzy`,  
            profilePic: `images/profile-pic.jpg`,
            likes: 0,
            retweets: 0,    
            tweetText: inputValue.value,
            replies: [],
            isLiked: false,
            isRetweeted: false, 
            uuid: uuidv4(),
        })
        render();
        inputValue.value = ""
    }
}

//replyId = uuid, this function toggles the hidden class in css on a div element
function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

// iterate thorugh the tweetsData array and return a obj, check if the targetObj = true then increment/decrement
function handleRetweetClick(tweetId){
    const targetRetweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets--;

    }else{
        targetRetweetObj.retweets++
    }

    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted
    render()
}

// iterate thorugh the tweetsData array and return a obj, check if the targetObj = true then increment/decrement
function handleLikeClick(tweetId){
    const targetLikeObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId;
    })[0]

    console.log(targetLikeObj)
    if (targetLikeObj.isLiked){
        targetLikeObj.likes--
    } else {
        targetLikeObj.likes++
    }

    targetLikeObj.isLiked = !targetLikeObj.isLiked
    render()
}

// iterate the tweetsData obj and create a html dom
function getFeedHtml(){
    let htmlFeed = ``
    console.log(htmlFeed)

    tweetsData.forEach(function(tweet){
        let likedIconClass = '' 

        if (tweet.isLiked){
            likedIconClass = 'liked'
        }

        let retweetIconClass= ''

        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

// iterate the tweetsData obj replies and create a html dom
        let repliesHtml = ``
        if (tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                
                repliesHtml += 
                `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div class="widthhh">
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                           ${reply.tweetGif ? `<img src="${reply.tweetGif}" class="tweet-gif">` : ''}
                        </div>
                    </div>
                </div>
    
                `
            })
        }

        htmlFeed += 
        `
        <div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                ${tweet.tweetImage ? `
                    <a href="${tweet.tweetImageLink}" target="_blank">
                        <img src="${tweet.tweetImage}" class="tweet-image">
                    </a>` : ''}
                    ${tweet.tweetVideo ? `
                        <video controls class="tweet-video">
                            <source src="${tweet.tweetVideo}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>` : ''}
                <div class="tweet-details">
                    <span class="tweet-detail reply">
                        <i class="fa-regular fa-comment-dots"
                        data-reply="${tweet.uuid}"
                        ></i>
                    ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail like">
                        <i class="fa-solid fa-heart ${likedIconClass}" 
                        data-like="${tweet.uuid}"
                        ></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail retweet ${retweetIconClass}" >
                        <i class="fa-solid fa-retweet"
                        data-retweet="${tweet.uuid}"
                        ></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div> 
        
                <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
                </div>`;
    })

return htmlFeed;
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()