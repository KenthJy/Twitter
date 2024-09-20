import { tweetsData } from "./data.js";


document.addEventListener('click', function(e){
    if (e.target.dataset.like){
        handleLikeClick(e.target.dataset.like)
    }
})

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
function getFeedHtml(){
    let htmlFeed = ``
    console.log(htmlFeed)

    tweetsData.forEach(function(tweet){
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
                    <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots"
                        data-reply="${tweet.uuid}"
                        ></i>
                    ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart" 
                        data-like="${tweet.uuid}"
                        ></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet"
                        data-retweet="${tweet.uuid}"
                        ></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div> 
        `
    })

return htmlFeed

}
function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()