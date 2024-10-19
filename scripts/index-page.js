
import BandSiteApi from "./band-site-api.js";
const API_KEY = "abca44eb-2c0a-4a19-bf5f-46261299965e";
const bandApi = new BandSiteApi(API_KEY);

let conversationForm = document.querySelector(".conversation__form");
let conversationList = document.querySelector(".list");


async function fetchComments() {
    try {
        const comments = await bandApi.getComments();
        renderComments(comments);
    } catch (error) {
        console.error(error);
    }
}
fetchComments();

conversationForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    event.target.name.classList.remove("error");
    event.target.comment.classList.remove("error");

    if (!event.target.name.value && !event.target.comment.value) {
        alert("Please enter your name and comment.");
        event.target.name.classList.add("error");
        event.target.comment.classList.add("error");
        return;
    } else if (!event.target.name.value) {
        alert("Please enter your name.");
        event.target.name.classList.add("error");
        return;
    } else if (!event.target.comment.value) {
        alert("Please enter your comment.");
        event.target.comment.classList.add("error");
        return;
    }

    let newComment = {
        name: event.target.name.value,
        comment: event.target.comment.value,
    };

    try {
        await bandApi.postComment(newComment);
        await fetchComments();
        event.target.reset();

    } catch (error) {
        console.error(error);
        alert('Failed to post. Please try again.');
    }
});


async function removeComment(commentId) {
    try {
        await bandApi.deleteComment(commentId);
        await fetchComments();
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment. Please try again.');
    }
}


function renderComments(listArray) {
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
        deleteLink.classList.add("delete");
        deleteLink.href = "";
        deleteLink.onclick = (e) => {
            e.preventDefault();
            removeComment(comment.id);
        };
        contentDiv.appendChild(deleteLink);

        let likeContainer = document.createElement("div");
        likeContainer.classList.add("like");

        let likeButton = document.createElement("a");
        likeButton.classList.add("like__icon");
        likeButton.href = "";

        let likeCount = document.createElement("span");
        likeCount.classList.add("like__count");
        likeCount.textContent = `(${comment.likes || 0})`;

        likeContainer.appendChild(likeButton);
        likeContainer.appendChild(likeCount);

        likeButton.onclick = async (e) => {
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
