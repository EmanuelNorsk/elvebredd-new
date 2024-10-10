const path = window.location.pathname;
const pathParts = path.split("/");
const profileID = pathParts[pathParts.length - 1];
var userData = {};
loggedIn = false;
var formData = new FormData();
formData.append('action', "getYourUserData");

var calculateWithValue = "shark";

var contentLoaded = 0

const fetchUserData = fetch('/api', {
    method: 'POST',
    body: formData
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data != "ERROR") {
            userData = data;
            loggedIn = true;
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });


var profileData = {};
formData = new FormData();
formData.append('user', profileID);
formData.append('action', "getUserData");

const fetchProfileData = fetch('/api', {
    method: 'POST',
    body: formData
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data != "ERROR") {
            profileData = data;
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

Promise.all([fetchUserData, fetchProfileData]).then(() => {
    contentLoaded += 1
    if (contentLoaded == 2) {
        main()
    }
});

window.addEventListener("DOMContentLoaded", event => {
    contentLoaded += 1
    if (contentLoaded == 2) {
        main()
    }
})

function main() {
    var robloxUsernameDiv = document.querySelector(".RobloxUser1");
    if (profileData["robloxUsername"] != "") {
        robloxUsernameDiv.children[0].style.display = "flex";
        robloxUsernameDiv.children[1].style.display = "flex";
        robloxUsernameDiv.children[1].innerText = profileData["robloxUsername"];
    }
    var middleSection = document.getElementById("middleSection");
    middleSection.children[0].src = "/static/images/profile/" + profileData["profilePicture"];
    var usernameDiv = document.getElementById("Username1");
    usernameDiv.children[0].innerText = profileData["username"];
    var listingAmount = document.getElementById("listingAmount");
    listingAmount.innerText = profileData["trades"].length;
    var completedTradesAmount = document.getElementById("completedTradesAmount");
    completedTradesAmount.innerText = profileData["completedTrades"].length;
    var inventoryAmount = document.getElementById("inventoryAmount");
    inventoryAmount.innerText = profileData["inventory"].length;
    var dailyStreakDiv = document.getElementById("dailyStreakDiv");
    dailyStreakDiv.children[1].textContent = profileData["dailyStreak"];

    var sharkFrostButtons = document.querySelectorAll(".sharkFrostButton");
    sharkFrostButtons.forEach(button => {
        button.classList.add(calculateWithValue);
    });

    var mainButtons = document.getElementById("mainButtons");
    if (loggedIn) {
        updateRightMenu();
        updateLeftMenu();
    }
    
}


function updateRightMenu() {
    if (profileID == userData["id"]) {
        mainButtons.children[0].classList.remove("noDisplay")
        mainButtons.children[1].classList.remove("noDisplay")
        if (userData["moderator"]) {
            mainButtons.children[9].classList.remove("noDisplay")
            mainButtons.children[10].classList.remove("noDisplay")
        }
    } else {
        if (userData["friends"].includes(profileID)) {
            mainButtons.children[4].classList.add("noDisplay")
            mainButtons.children[5].classList.remove("noDisplay")
            mainButtons.children[6].classList.add("noDisplay")
        } else if (userData["friendRequests"]["sent"].includes(profileID)) {
            mainButtons.children[6].classList.add("noDisplay")
            mainButtons.children[3].classList.remove("noDisplay")
        } else if (userData["friendRequests"]["received"].includes(profileID)) {
            mainButtons.children[4].classList.remove("noDisplay")
        } else {
            mainButtons.children[6].classList.remove("noDisplay")
            mainButtons.children[5].classList.add("noDisplay")
        }

        if (userData["blocked"].includes(profileID)) {
            mainButtons.children[3].classList.add("noDisplay")
            mainButtons.children[4].classList.add("noDisplay")
            mainButtons.children[5].classList.add("noDisplay")
            mainButtons.children[6].classList.add("noDisplay")
            mainButtons.children[7].classList.add("noDisplay")
            mainButtons.children[8].classList.remove("noDisplay")
        } else {
            mainButtons.children[7].classList.remove("noDisplay")
            mainButtons.children[8].classList.add("noDisplay")
        }

        if (profileData["blocked"].includes(userData["id"])) {
            mainButtons.children[3].classList.add("noDisplay")
            mainButtons.children[4].classList.add("noDisplay")
            mainButtons.children[5].classList.add("noDisplay")
            mainButtons.children[6].classList.add("noDisplay")
        }

        if (profileID != userData["id"]) {
            mainButtons.children[4].classList.add("noDisplay")
            mainButtons.children[5].classList.add("noDisplay")
        }

        if (userData["moderator"]) {
            mainButtons.children[9].classList.remove("noDisplay")
            mainButtons.children[10].classList.remove("noDisplay")
        }
    }
}

function updateLeftMenu() {
    console.log("HI")
    var leftMenu = document.getElementById("upperUserPage").children[0]
    if (profileID != userData["id"]) {
        leftMenu.children[0].style.display = "none"
        leftMenu.children[1].style.display = "none"
        if (userData["friendRequests"]["received"].includes(profileID)) {
            leftMenu.children[2].classList.remove("noDisplay")
            leftMenu.children[3].style.display = "flex"
        } else {
            leftMenu.children[2].classList.add("noDisplay")
            leftMenu.children[3].style.display = "none"
        }
        console.log(userData["friends"])
        if (userData["friends"].includes(profileID)) {
            leftMenu.children[2].classList.add("noDisplay")
            leftMenu.children[3].style.display = "none"
            leftMenu.children[4].classList.remove("noDisplay")
        }
    } else {
        leftMenu.children[0].style.display = "flex"
        leftMenu.children[1].style.display = "flex"
    }
}

function selectValue(value) {
    var sharkFrostButtons = document.querySelectorAll(".sharkFrostButton")
    calculateWithValue = value
    sharkFrostButtons.forEach(button => {
        button.classList.remove("shark")
        button.classList.remove("frost")
        button.classList.add(calculateWithValue)
    })
}

function selectCategory(event) {
    var categoryButtons = document.querySelectorAll(".categoryButton")
    category = event.target.textContent
    document.getElementById("userInventory").style.display = "none"
    document.getElementById("userListings").style.display = "none"
    document.getElementById("userWishlist").style.display = "none"
    document.getElementById("userInbox").style.display = "none"
    document.getElementById("userPending").style.display = "none"
    document.getElementById("userHistory").style.display = "none"
    if (category == "Listings") {
        document.getElementById("userListings").style.display = "flex"
    } else if (category == "Inventory") {
        document.getElementById("userInventory").style.display = "flex"
    } else if (category == "Wishlist") {
        document.getElementById("userWishlist").style.display = "flex"
    } else if (category == "Inbox") {
        document.getElementById("userInbox").style.display = "flex"
    } else if (category == "Pending") {
        document.getElementById("userPending").style.display = "flex"
    } else if (category == "History") {
        document.getElementById("userHistory").style.display = "flex"
    }
    categoryButtons.forEach(button => {
        if (button.innerText == category) {
            button.classList.add("selected")
        } else {
            button.classList.remove("selected")
        }
    })
}

function removeFriend() {
    formData = new FormData();
    formData.append('ID', (profileID).toString())
    formData.append('action', "removeFriend");

    fetch('/api', {
    method: 'POST',
    body: formData
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
        console.log(data)
        if (data == "SUCCESS") {

            userData["friends"].splice(userData["friends"].indexOf(profileID.toString()), 1)
            profileData["friends"].splice(profileData["friends"].indexOf(userData["id"].toString()), 1)

            updateRightMenu()
            updateLeftMenu()
            displayMessage("You removed " + profileData["username"] + " as a friend!")
        } else {
            displayError("Message from the developer: " + data)
        }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}



function displayError(error) {
    errorDiv.style.bottom = "10%"
    errorText.innerText = error
    setTimeout((event) => {
        errorDiv.style.bottom = "-100%"
    }, 2000)
}

function displayMessage(message) {
    messageDiv.style.bottom = "10%"
    messageText.innerText = message
    setTimeout((event) => {
        messageDiv.style.bottom = "-100%"
    }, 2000)
}


function sendFriendRequest() {
    formData = new FormData();
    formData.append('ID', (profileID).toString())
    formData.append('action', "sendFriendRequest");

    fetch('/api', {
    method: 'POST',
    body: formData
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    if (data == "SUCCESS") {
        displayMessage("Friend request sent to " + profileData["username"] + "!")
        userData["friendRequests"]["sent"].push(profileID.toString())
        profileData["friendRequests"]["received"].push(userData["id"].toString())
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}