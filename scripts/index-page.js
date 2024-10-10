

const commentsArray = [
    { title: "Victor Pinto", date: "11/02/2023", comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains." },
    { title: "Christina Cabrera", date: "10/28/2023", comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day." },
    { title: "Isaac Tadesse", date: "10/20/2023", comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough." },

];

console.log(commentsArray)


let conversationForm = document.querySelector(".conversation__form");
console.log(conversationForm)

let conversationList = document.querySelector(".conversation-list");
console.log(conversationList)



conversationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("form submitted");

    if (!event.target.name.value) {
        alert("Please enter your name.");
        return;
    }

    const newComment = {
        title: event.target.name.value,
        date: new Date().toLocaleDateString(),
        comment: event.target.comment.value,
    };
    console.log(newComment);

    commentsArray.unshift(newComment);

    loopAndAppendComments(commentsArray);

    event.target.name.value = "";
    event.target.comment.value = "";
});



function loopAndAppendComments(listArray) {
    conversationList.innerText = ""
    for (i = 0; i < listArray.length; i++) {

        let listItem = document.createElement("li")
        listItem.classList.add("list__item")
        conversationList.appendChild(listItem)

        let photoDiv = document.createElement("div")
        photoDiv.classList.add("list__photo")
        listItem.appendChild(photoDiv)

        let contentDiv = document.createElement("div");
        contentDiv.classList.add("list__content");
        listItem.appendChild(contentDiv)

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("list__info");
        contentDiv.appendChild(infoDiv);

        let title = document.createElement("p");
        title.classList.add("list__title");
        title.textContent = listArray[i].title;
        infoDiv.appendChild(title);

        let date = document.createElement("p");
        date.classList.add("list__date");
        date.textContent = listArray[i].date;
        infoDiv.appendChild(date);

        let commentDiv = document.createElement("div");
        commentDiv.classList.add("list__comment");
        commentDiv.textContent = listArray[i].comment;
        contentDiv.appendChild(commentDiv);

    }
}

loopAndAppendComments(commentsArray);

