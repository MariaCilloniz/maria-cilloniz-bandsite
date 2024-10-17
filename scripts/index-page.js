
const bandApi = new BandSiteApi(API_KEY);

let conversationForm = document.querySelector(".conversation__form");
let conversationList = document.querySelector(".conversation-list");


async function fetchComments() {
    try {
        const comments = await bandApi.getComments();
        loopAndAppendComments(comments);
    } catch (error) {
        console.error(error);
    }
}
fetchComments();

conversationForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("form submitted");


    event.target.name.classList.remove("error");
    event.target.comment.classList.remove("error");

    if (!event.target.name.value) {
        alert("Please enter your name.");
        event.target.name.classList.add("error");
        return;
    }

    if (!event.target.comment.value) {
        alert("Please enter your comment.");
        event.target.comment.classList.add("error");
        return;
    }
    const timestamp = Date.now();

    const newComment = {
        name: event.target.name.value,
        comment: event.target.comment.value,

    };

    try {
        console.log(newComment);
        await bandApi.postComment(newComment);
        console.log('Posted successfully');

        await fetchComments();

        event.target.name.value = "";
        event.target.comment.value = "";

    } catch (error) {
        console.error(error);
        alert('Failed to post. Please try again.');
    }
});


async function removeComment(commentId) {
    try {
        await bandApi.deleteComment(commentId);
        console.log('Comment deleted successfully');
        await fetchComments();
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment. Please try again.');
    }
}


function loopAndAppendComments(listArray) {
    conversationList.innerText = "";

    listArray.forEach(comment => {
        let listItem = document.createElement("li");
        listItem.classList.add("list__item");
        conversationList.appendChild(listItem);

        let photoDiv = document.createElement("div");
        photoDiv.classList.add("list__photo");
        listItem.appendChild(photoDiv);

        let contentDiv = document.createElement("div");
        contentDiv.classList.add("list__content");
        listItem.appendChild(contentDiv);

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("list__info");
        contentDiv.appendChild(infoDiv);

        let title = document.createElement("p");
        title.classList.add("list__title");
        title.textContent = comment.name;
        infoDiv.appendChild(title);

        let date = document.createElement("p");
        date.classList.add("list__date");
        date.textContent = new Date(comment.timestamp).toLocaleDateString();
        infoDiv.appendChild(date);

        let commentDiv = document.createElement("div");
        commentDiv.classList.add("list__comment");
        commentDiv.textContent = comment.comment;
        contentDiv.appendChild(commentDiv);

        let deleteLink = document.createElement("a");
        deleteLink.classList.add("delete-icon");
        deleteLink.href = "";
        deleteLink.onclick = (e) => {
            e.preventDefault();
            removeComment(comment.id);
        };
        contentDiv.appendChild(deleteLink);

        let likeContainer = document.createElement("div");
        likeContainer.classList.add("like-container");

        let likeEmoji = document.createElement("a");
        likeEmoji.classList.add("like-icon");
        likeEmoji.href = "";

        let likeCount = document.createElement("span");
        likeCount.classList.add("like-count");
        likeCount.textContent = `(${comment.likes || 0})`;

        likeContainer.appendChild(likeEmoji);
        likeContainer.appendChild(likeCount);
        
        likeEmoji.onclick = async (e) => {
            e.preventDefault();
            try {
                const updatedComment = await bandApi.likeComment(comment.id);
                likeCount.textContent = updatedComment.likes;
            } catch (error) {
                console.error('Error liking comment:', error);
            }
        };
        contentDiv.appendChild(likeContainer);
    });
}
