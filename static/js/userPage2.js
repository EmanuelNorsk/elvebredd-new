const path = window.location.pathname
const pathParts = path.split("/")
const profileID = pathParts[pathParts.length - 1]
var userData = {}
loggedIn = false
var formData = new FormData();
formData.append('action', "getYourUserData");

var calculateWithValue = "shark"

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
        if (data != "ERROR") {
            userData = data
            loggedIn = true
        }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
}); 

var profileData = {}
formData = new FormData();
formData.append('user', profileID);
formData.append('action', "getUserData");

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
        if (data != "ERROR") {
            profileData = data
            window.addEventListener("DOMContentLoaded", event => {
                var robloxUsernameDiv = document.querySelector(".RobloxUser1")
                if (profileData["robloxUsername"] != "") {
                    robloxUsernameDiv.children[0].style.display = "flex"
                    robloxUsernameDiv.children[1].style.display = "flex"
                    robloxUsernameDiv.children[1].innerText = profileData["robloxUsername"]   
                }
                var middleSection = document.getElementById("middleSection")
                middleSection.children[0].src = "/static/images/profile/" + profileData["profilePicture"]
                var usernameDiv = document.getElementById("Username1")
                usernameDiv.children[0].innerText = profileData["username"]
                var listingAmount = document.getElementById("listingAmount")
                listingAmount.innerText = profileData["trades"].length
                var completedTradesAmount = document.getElementById("completedTradesAmount")
                completedTradesAmount.innerText = profileData["completedTrades"].length
                var inventoryAmount = document.getElementById("inventoryAmount")
                inventoryAmount.innerText = profileData["inventory"].length     
                var dailyStreakDiv = document.getElementById("dailyStreakDiv")
                dailyStreakDiv.children[1].textContent = profileData["dailyStreak"]   
            })
        }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
}); 


window.addEventListener("DOMContentLoaded", event => {
    var sharkFrostButtons = document.querySelectorAll(".sharkFrostButton")
    sharkFrostButtons.forEach(button => {
        button.classList.add(calculateWithValue)
    })

})

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

function displayMainButtons() {

}