const path = window.location.pathname;
const pathParts = path.split("/");
const profileID = pathParts[pathParts.length - 1];
var userData = {};
loggedIn = false;
var petsDict = {}
var categorySelected = ""
var supplyCount = 20
var addPetType = "inventory"
var displayPetsFirstTime = 0
var fly = 0
var ride = 0
var regular = 1
var neon = 0
var mega = 0
var lastFilter = "all"
var maxPets = 18
var tradePart1 = []
var tradePart2 = []
var petsAdded = ""
var importantMessageEvent = ""
var preventClosing = 0


var formData = new FormData();

var calculateWithValue = "shark";
var frostValue = 105

var contentLoaded = 0

var fetchUserData = false
var fetchProfileData = false
var fetchUserListings = false
var fetchUserHistory = false
var profileData = {};
var userListings = []
var userHistory = []
var userPending = []

function getData() {
    var dataLoaded = 0
    formData = new FormData();
    formData.append('action', "getYourUserData");

    fetchUserData = fetch('/api', {
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
            dataLoaded += 1
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    formData = new FormData();
    formData.append('user', profileID);
    formData.append('action', "getUserData");
        
    fetchProfileData = fetch('/api', {
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
                dataLoaded += 1
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        
    formData = new FormData();
    formData.append('action', "getPets");
    
    fetchPetData = fetch('/api', {
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
            petsDict = data
            dataLoaded += 1
        } else {
            displayError("ERROR")
        }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    }); 

    formData = new FormData();
    formData.append('ID', profileID);
    formData.append('action', "getUserListings");
    
    fetchUserListings = fetch('/api', {
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
                userListings = data;
                dataLoaded += 1
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    
    formData = new FormData();
    formData.append('ID', profileID);
    formData.append('action', "getUserHistory");
    
    fetchUserHistory = fetch('/api', {
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
                userHistory = data;
                dataLoaded += 1
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    if (profileID == userData["id"]) {
        formData = new FormData();
        formData.append('action', "getPendingListings");
        
        fetchPending = fetch('/api', {
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
                    userPending = data;
                    dataLoaded += 1
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    } else {
        fetchPending = true
    }


    Promise.all([fetchUserData, fetchProfileData, fetchPetData, fetchUserListings, fetchUserHistory, fetchPending]).then(() => {
        if (dataLoaded == 5 + (profileID == userData["id"])) {
            contentLoaded += 1
            if (contentLoaded == 2) {
                main()
            }
        } else {
            getData()
        }
    });
}


getData()

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
    middleSection.children[0].style.backgroundImage = "url('/static/images/profile/" + profileData["profilePicture"] + "')";
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

        if (userData["id"] == profileID) {
            document.querySelectorAll(".infoBox").forEach(box => {
                box.style.opacity = "1"
            })
        }
    }

    selectCategory("Listings")

    loadCategories()

    editInventory(false)
    editWishlist(false)


    window.addEventListener("scroll", event => {
        scrollEventFinished = false
        if (contentLoaded == 2) {
            supplyContent(0)
            var div = null
            if (categorySelected == "Listings") {
                div = document.getElementById("userListings").children[1]
            } else if (categorySelected == "Inbox") {
                div = document.getElementById("userInbox").children[1]
            } else if (categorySelected == "Pending") {
                div = document.getElementById("userPending").children[1]
            } else if (categorySelected == "History") {
                div = document.getElementById("userHistory").children[1]
            }
            if (div != null) {
                for (let i = div.children.length - 1; i >= 0 && div.children.length > 20; i--) {
                    child = div.children[i]
                    rect = child.getBoundingClientRect()
                    if (rect.y - window.innerHeight > window.scrollY) {
                        div.removeChild(child)
                        child = null
                        div.setAttribute("listingsLoaded", (parseInt(div.getAttribute("listingsLoaded")) - 1).toString())
                    }
                }
            }
        }
    })
    
    supplyContent(0)

    var all = document.getElementById("all")
    var pets = document.getElementById("pets")
    var common = document.getElementById("common")
    var eggs = document.getElementById("eggs")
    var legendary = document.getElementById("legendary")
    var other = document.getElementById("other")
    var petWear = document.getElementById("petWear")
    var rare = document.getElementById("rare")
    var ultraRare = document.getElementById("ultraRare")
    var uncommon = document.getElementById("uncommon")
    var vehicles = document.getElementById("vehicles")

}

function supplyContent(recursions) {
    if (document.body.scrollHeight < window.scrollY + window.innerHeight * 2.5 && recursions < 20) {
        if (categorySelected == "Listings") {
            var listingsLoaded = parseInt(document.getElementById("userListings").children[1].getAttribute("listingsLoaded"))
            if (listingsLoaded != undefined && listingsLoaded != NaN) {
                loadListingsInto(userListings, document.getElementById("userListings").children[1], listingsLoaded, listingsLoaded + supplyCount)
            }
        } else if (categorySelected == "Inbox") {
            var listingsLoaded = parseInt(document.getElementById("userInbox").children[1].getAttribute("listingsLoaded"))
            if (listingsLoaded != undefined && listingsLoaded != NaN) {
                loadInboxInto(userListings, document.getElementById("userInbox").children[1], listingsLoaded, listingsLoaded + supplyCount)
            }
        } else if (categorySelected == "Pending") {
            var listingsLoaded = parseInt(document.getElementById("userPending").children[1].getAttribute("listingsLoaded"))
            if (listingsLoaded != undefined && listingsLoaded != NaN) {
                loadPendingInto(userListings, document.getElementById("userPending").children[1], listingsLoaded, listingsLoaded + supplyCount)
            }
        } else if (categorySelected == "History") {
            var listingsLoaded = parseInt(document.getElementById("userHistory").children[1].getAttribute("listingsLoaded"))
            if (listingsLoaded != undefined && listingsLoaded != NaN) {
                loadHistoryInto(userHistory, document.getElementById("userHistory").children[1], listingsLoaded, listingsLoaded + supplyCount)
            }
        }
        setTimeout(supplyContent(recursions + 1), 100)
    }
}

function editInventory(bool) {
    var inv = document.getElementById("userInventory")
    if (bool) {
        inv.children[0].children[0].style.display = "none"
        inv.children[0].children[1].style.display = "flex"
        if (inv.children[1].children[0] != undefined) {
            inv.children[1].children[0].style.display = "flex"
        }
        [...inv.children[1].children].forEach(pet => {
            pet.classList.add("enabled")
            pet.disabled = false
        })


    } else {
        inv.children[0].children[0].style.display = "flex"
        inv.children[0].children[1].style.display = "none"
        if (inv.children[1].children[0] != undefined) {
            inv.children[1].children[0].style.display = "none"
        }
        [...inv.children[1].children].forEach(pet => {
            pet.classList.remove("enabled")
            pet.disabled = true
        })
    }
}

function editWishlist(bool) {
    var wl = document.getElementById("userWishlist")
    if (bool) {
        wl.children[0].children[0].style.display = "none"
        wl.children[0].children[1].style.display = "flex"
        if (wl.children[1].children[0] != undefined) {
            wl.children[1].children[0].style.display = "flex"
        }
        [...wl.children[1].children].forEach(pet => {
            pet.classList.add("enabled")
            pet.disabled = false
        })
    } else {
        wl.children[0].children[0].style.display = "flex"
        wl.children[0].children[1].style.display = "none"
        if (wl.children[1].children[0] != undefined) {
            wl.children[1].children[0].style.display = "none"
        }
        [...wl.children[1].children].forEach(pet => {
            pet.classList.remove("enabled")
            pet.disabled = true
        })
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
    updateAllListingsWithNewValues()
    insertValuesIntoCreateListingInterface()
}

function updateAllListingsWithNewValues() {
    document.getElementById("userInventory")
    document.getElementById("userListings")
    document.getElementById("userWishlist")
    document.getElementById("userInbox")
    document.getElementById("userPending")
    document.getElementById("userHistory")

    userListingsDiv = document.getElementById("userInventory").children[1]

    var checkList = [document.getElementById("userListings").children[1], document.getElementById("userInbox").children[1], 
                     document.getElementById("userPending").children[1], document.getElementById("userHistory").children[1]]

    for (let j = 0; j < checkList.length; j++) {
        var mainDiv = checkList[j]
        if (mainDiv != undefined) {            
            for (let i = 0; i < mainDiv.children.length; i++) {
                var div = mainDiv.children[i]
                if (div.classList.contains("listingWrapper")) {
                    div = div.children[0]
                }
                value = parseFloat(div.getAttribute("sharkvalue"))
                if (div.getAttribute("sharkvalue") != null) {
                    if (calculateWithValue == "frost") {
                        value /= frostValue
                        if (Math.abs(Math.round(value) - value) < 0.02 || value > 100) {
                            value = Math.round(value)
                        }
                        value = value.toFixed(2)
                    } 
                
                    div.children[1].children[0].children[1].innerText = value
                }
            }}
     }
}

function selectCategoryOld(event) {
    var categoryButtons = document.querySelectorAll(".categoryButton")
    if (event.target == undefined) {
        category = event
    } else {
        category = event.target.textContent
    }
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

function selectCategory(event) {
    var oldCategorySelected = categorySelected + "|Category"
    oldCategorySelected = oldCategorySelected.split("|")[0]
    var categoryButtons = document.querySelectorAll(".categoryButton")
    if (event.target == undefined) {
        category = event
        categorySelected = event
    } else {
        category = event.target.textContent
        categorySelected = event.target.textContent
    }
    document.getElementById("userInventory").style.display = "flex"
    document.getElementById("userListings").style.display = "flex"
    document.getElementById("userWishlist").style.display = "flex"
    document.getElementById("userInbox").style.display = "flex"
    document.getElementById("userPending").style.display = "flex"
    document.getElementById("userHistory").style.display = "flex"
    if (category == "Listings") {
        document.getElementById("allCategoryDivs").style.transform = "translateX(0%)"
    } else if (category == "Inventory") {
        document.getElementById("allCategoryDivs").style.transform = "translateX(-100vw)"
    } else if (category == "Wishlist") {
        document.getElementById("allCategoryDivs").style.transform = "translateX(-200vw)"
    } else if (category == "Inbox") {
        document.getElementById("allCategoryDivs").style.transform = "translateX(-300vw)"
    } else if (category == "Pending") {
        document.getElementById("allCategoryDivs").style.transform = "translateX(-400vw)"
    } else if (category == "History") {
        document.getElementById("allCategoryDivs").style.transform = "translateX(-500vw)"
    }
    categoryButtons.forEach(button => {
        if (button.innerText == category) {
            button.classList.add("selected")
        } else {
            button.classList.remove("selected")
        }
    })

    if (oldCategorySelected == "Listings") {
        deleteUntil20Children(document.getElementById("userListings").children[1])
        document.getElementById("userListings").children[1].setAttribute("listingsLoaded", "20")
    } else if (oldCategorySelected == "Inbox") {
        deleteUntil20Children(document.getElementById("userInbox").children[1])
        document.getElementById("userInbox").children[1].setAttribute("listingsLoaded", "20")
    } else if (oldCategorySelected == "Pending") {
        deleteUntil20Children(document.getElementById("userPending").children[1])
        document.getElementById("userPending").children[1].setAttribute("listingsLoaded", "20")
    } else if (oldCategorySelected == "History") {
        deleteUntil20Children(document.getElementById("userHistory").children[1])
        document.getElementById("userHistory").children[1].setAttribute("listingsLoaded", "20")
    }

}


function deleteUntil20Children(parent) {
    while (parent.children.length > 20 ) {
        child = parent.children[parent.children.length - 1]
        parent.removeChild(child)
        child = null
    }
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
        updateRightMenu()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

async function loadCategories() {
    Promise.all([fetchUserListings, fetchUserHistory]).then(() => {
        if (userListings.length == 0) {
            document.getElementById("userListings").children[1].classList.remove("notEmpty")
            const p = document.createElement("p")
            if (userData["id"] == profileID) {
                p.innerHTML = "You have no current Listings, click <a>here</a> for information."
            } else {
                p.innerText = "This user has no public listings right now."
            }
            document.getElementById("userListings").children[1].appendChild(p)
        } else {
            document.getElementById("userListings").children[1].classList.add("notEmpty")
            document.getElementById("userListings").children[1].setAttribute("listingsLoaded", "0")
            loadListingsInto(userListings, document.getElementById("userListings").children[1], 0, 20)
        }

        if (profileData["inventory"].length == 0) {
            document.getElementById("userInventory").children[1].classList.remove("notEmpty")
            const p = document.createElement("p")
            if (userData["id"] == profileID) {
                p.innerHTML = "You have not added anything to your inventory, click <a>here</a> for information."
            } else {
                p.innerText = "This user has not added their inventory yet."
            }
            document.getElementById("userInventory").children[1].appendChild(p)
        } else {
            document.getElementById("userInventory").children[1].classList.add("notEmpty")
            displayPetsInCategory(convertDictsToSets(profileData["inventory"]), document.getElementById("userInventory").children[1], "inventory")
        }

        if (profileData["wishlist"].length == 0) {
            document.getElementById("userWishlist").children[1].classList.remove("notEmpty")
            const p = document.createElement("p")
            if (userData["id"] == profileID) {
                p.innerHTML = "You have not added anything to your wishlist, click <a>here</a> for information."
            } else {
                p.innerText = "This user has not added their wishlist yet."
            }
            document.getElementById("userWishlist").children[1].appendChild(p)
        } else {
            document.getElementById("userWishlist").children[1].classList.add("notEmpty")
            displayPetsInCategory(convertDictsToSets(profileData["wishlist"]), document.getElementById("userWishlist").children[1], "wishlist")
        }

        if (userListings.length == 0) {
            document.getElementById("userInbox").children[1].classList.remove("notEmpty")
            const p = document.createElement("p")
            if (userData["id"] == profileID) {
                p.innerHTML = "Your inbox is empty, click <a>here</a> for information."
            } else {
                p.innerText = "You can't see this person's inbox!"
            }
            document.getElementById("userInbox").children[1].appendChild(p)
        } else {
            if (userData["id"] == profileID) {
                document.getElementById("userInbox").children[1].classList.add("notEmpty")
                document.getElementById("userInbox").children[1].setAttribute("listingsLoaded", "0")
                loadInboxInto(userListings, document.getElementById("userInbox").children[1], 0, 20)
            }

            if (document.getElementById("userInbox").children[1].children.length == 0) {
                document.getElementById("userInbox").children[1].classList.remove("notEmpty")
                const p = document.createElement("p")
                if (userData["id"] == profileID) {
                    p.innerHTML = "Your inbox is empty, click <a>here</a> for information."
                } else {
                    p.innerText = "You can't see this person's inbox!"
                }
                document.getElementById("userInbox").children[1].appendChild(p)
            }
        }

        if (userPending.length == 0) {
            document.getElementById("userPending").children[1].classList.remove("notEmpty")
            const p = document.createElement("p")
            if (userData["id"] == profileID) {
                p.innerHTML = "You have no active trades ongoing, click <a>here</a> for information."
            } else {
                p.innerText = "You can't see this person's pending trades!"
            }
            document.getElementById("userPending").children[1].appendChild(p)
        } else {
            if (userData["id"] == profileID) {
                document.getElementById("userPending").children[1].classList.add("notEmpty")
                document.getElementById("userPending").children[1].setAttribute("listingsLoaded", "0")
                loadPendingInto(userPending, document.getElementById("userPending").children[1], 0, 20)
            }

            if (document.getElementById("userPending").children[1].children.length == 0) {
                document.getElementById("userPending").children[1].classList.remove("notEmpty")
                const p = document.createElement("p")
                if (userData["id"] == profileID) {
                    p.innerHTML = "You have no active trades ongoing, click <a>here</a> for information."
                } else {
                    p.innerText = "You can't see this person's pending trades!"
                }
                document.getElementById("userPending").children[1].appendChild(p)
            }
        }

        if (userHistory.length == 0) {
            document.getElementById("userHistory").children[1].classList.remove("notEmpty")
            const p = document.createElement("p")
            if (userData["id"] == profileID) {
                p.innerHTML = "You have not trades in your history, click <a>here</a> for information."
            } else {
                p.innerText = "This person has not completed any trades yet."
            }
            document.getElementById("userHistory").children[1].appendChild(p)
        } else {
            document.getElementById("userHistory").children[1].classList.add("notEmpty")
            document.getElementById("userHistory").children[1].setAttribute("listingsLoaded", "0")
            loadHistoryInto(userHistory, document.getElementById("userHistory").children[1], 0, 20)
        }
    });


}

function createInventoryPet(pet, type, disabled) {
    const img = document.createElement("img")
    if (typeof pet == "object") {
        var div = document.createElement("button")
        div.classList.add("inventoryPetDiv")
        img.src = petsDict[pet["id"]]["image"]
        const p = document.createElement("p")
        p.innerText = pet["amount"]
        div.appendChild(img)
        div.appendChild(p)
        if (pet["amount"] == 1) {
            p.style.display = "none"
        }
        const div2 = document.createElement("div")
        const fly  = document.createElement("div");  fly.innerText = "F";  fly.classList.add("flyDiv");  if (pet["fly"] == 0)  { fly.style.display = "none"}; div2.appendChild(fly)
        const ride = document.createElement("div"); ride.innerText = "R"; ride.classList.add("rideDiv"); if (pet["ride"] == 0) {ride.style.display = "none"}; div2.appendChild(ride)
        const neon = document.createElement("div"); neon.innerText = "N"; neon.classList.add("neonDiv"); if (pet["neon"] == 0) {neon.style.display = "none"}; div2.appendChild(neon)
        const mega = document.createElement("div"); mega.innerText = "M"; mega.classList.add("megaDiv"); if (pet["mega"] == 0) {mega.style.display = "none"}; div2.appendChild(mega)


        div.appendChild(div2)
        div.setAttribute("pet-id", pet["id"].toString())

        delete pet["amount"]
        div.setAttribute("pet-data", JSON.stringify(pet))

        div.setAttribute("onclick", `removePet(event, "${type}")`)
        div.disabled = disabled

        if (disabled == false) {
            div.classList.add("enabled")
        }

    } else if (typeof pet == "string") {
        var div = document.createElement("div")
        div.classList.add("inventoryPetDiv")
        img.src = "/static/images/misc/add.png"
        div.appendChild(img)
        div.style.display = "none"
        div.style.border = "none"
        div.style.filter = "brightness(0.4)"
        div.setAttribute("add", "true")
        div.setAttribute("onclick", `setAddPetTypeTo("${pet.toString()}");openInventory();`)
    }
    return div

}

function displayPetsInCategory(set, target, type) {
    target.appendChild(createInventoryPet(type, type, true))
    set.forEach(pet => {
        target.appendChild(createInventoryPet(pet, type, true))
    })
}

function convertDictsToSets(list) {
    const counts = new Map();
    
    list.forEach(item => {
        const existingEntry = Array.from(counts.keys()).find(obj => 
            Object.keys(obj).every(key => obj[key] === item[key])
        );

        if (existingEntry) {
            counts.set(existingEntry, counts.get(existingEntry) + 1);
        } else {
            counts.set(item, 1);
        }
    });

    const uniqueList = [];
    counts.forEach((amount, item) => {
        const newItem = { ...item, amount };
        uniqueList.push(newItem);
    });

    return uniqueList;
}



function createListingTemplate() {
    const listing = document.createElement('div');
    listing.classList.add('listing');
    const figure1 = document.createElement('figure');
    const mainDiv = document.createElement('div');
    const offerDiv = document.createElement('div');
    const yourOffer = document.createElement('p');
    yourOffer.textContent = 'Your Offer';
    const dash = document.createElement('p');
    dash.textContent = '-';
    const theirOffer = document.createElement('p');
    theirOffer.textContent = 'Their Offer';
    offerDiv.appendChild(yourOffer);
    offerDiv.appendChild(dash);
    offerDiv.appendChild(theirOffer);
    const boxesDiv = document.createElement('div');
    const box1 = document.createElement('div');
    const box2 = document.createElement('div');
    const box3 = document.createElement('div');
    boxesDiv.appendChild(box1);
    boxesDiv.appendChild(box2);
    boxesDiv.appendChild(box3);
    mainDiv.appendChild(offerDiv);
    mainDiv.appendChild(boxesDiv);
    const figure2 = document.createElement('figure');
    listing.appendChild(figure1);
    listing.appendChild(mainDiv);
    listing.appendChild(figure2);
    return listing;
}

function loadListingsInto(listings, target, startAmount = 0, endAmount = 999) {
    target.setAttribute("listingsLoaded", (parseInt(target.getAttribute("listingsLoaded")) + (endAmount - startAmount)).toString())
    var listing = ""
    for (let i = startAmount; i < Object.values(listings).length && i < endAmount; i++) {
        listing = Object.values(listings)[i]
        let listingTemplate = createListingTemplate()
        let value1 = calculateValue(listing["offer"]["give"]) + listing["extraSharkValueRequested"]
        let value2 = calculateValue(listing["offer"]["take"])

        var combinedValue = parseFloat(Math.abs(value1 - value2).toFixed(2))
        if (Math.abs(Math.round(combinedValue) - combinedValue) < 0.02 || combinedValue > 100) {
            combinedValue = Math.round(combinedValue)
        }
        listingTemplate.setAttribute("sharkvalue", combinedValue.toString())
        listingTemplate.children[1].children[0].children[1].textContent = combinedValue.toString()
        if (value1 > value2) {
            listingTemplate.children[1].children[0].children[0].style.color = "rgb(255, 102, 102)"
            listingTemplate.children[1].children[0].children[1].style.color = "rgb(255, 102, 102)"
            listingTemplate.children[1].children[1].children[1].style.background = "linear-gradient(0deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%)"
            listingTemplate.style.background = "linear-gradient(180deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%)"
        } else if (value1 < value2) {
            listingTemplate.children[1].children[0].children[2].style.color = "rgb(255, 102, 102)"
        }
        
        for (let i = 0; i < listing["offer"]["give"].length && i < 8; i++) {
            listingTemplate.children[1].children[1].children[0].appendChild(createPetDiv(listing["offer"]["give"][i]))
        }

        if (listing["offer"]["give"].length == 9) {
            listingTemplate.children[1].children[1].children[0].appendChild(createPetDiv(listing["offer"]["give"][8]))
        } else if (listing["offer"]["give"].length > 9) {
            const p = document.createElement("p")
            p.textContent = "+" + (listing["offer"]["give"].length - 8).toString()
            listingTemplate.children[1].children[1].children[0].appendChild(p)
        }

        for (let i = 0; i < listing["offer"]["take"].length && i < 8; i++) {
            listingTemplate.children[1].children[1].children[2].appendChild(createPetDiv(listing["offer"]["take"][i]))
        }

        if (listing["offer"]["take"].length == 9) {
            listingTemplate.children[1].children[1].children[2].appendChild(createPetDiv(listing["offer"]["take"][8]))
        } else if (listing["offer"]["take"].length > 9) {
            const p = document.createElement("p")
            p.textContent = "+" + (listing["offer"]["take"].length - 8).toString()
            listingTemplate.children[1].children[1].children[2].appendChild(p)
        }

        target.appendChild(listingTemplate)
        const figures = listingTemplate.querySelectorAll("figure")
        listingTemplate.setAttribute("onclick", `showUserListings2(${JSON.stringify(listing)})`)
        listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
        figures.forEach(figure => {
            figure.style.display = "none"
        })

    }
}

function loadInboxInto(listings, target, startAmount = 0, endAmount = 999) {
    target.setAttribute("listingsLoaded", (parseInt(target.getAttribute("listingsLoaded")) + (endAmount - startAmount)).toString())
    var counter = 0
    var listing = ""
    for (let c = 0; c < Object.values(listings).length && counter < endAmount; c++) {
        listing = Object.values(listings)[c]
        for (let j = 0; j < listing["customOffers"].length && counter < endAmount; j++) {
            if (listing["customOffers"][j]["status"] == "Pending") {
                if (startAmount <= counter) {
                    const wrapper = document.createElement("div")

                    var yourOffer = listing["offer"]["give"]
                    var theirOffer = listing["offer"]["take"]
                    if (listing["customOffers"][j]["type"] == "give") {
                        yourOffer = yourOffer.concat(listing["customOffers"][j]["pets"])
                    } else {
                        theirOffer = theirOffer.concat(listing["customOffers"][j]["pets"])
                    }
        
                    let listingTemplate = createListingTemplate()
                    let value1 = calculateValue(yourOffer)
                    let value2 = calculateValue(theirOffer)
                    var combinedValue = parseFloat(Math.abs(value1 - value2).toFixed(2))
                    if (Math.abs(Math.round(combinedValue) - combinedValue) < 0.02 || combinedValue > 100) {
                        combinedValue = Math.round(combinedValue)
                    }
                    listingTemplate.setAttribute("sharkvalue", combinedValue.toString())
                    listingTemplate.children[1].children[0].children[1].textContent = combinedValue.toString()
                    if (value1 > value2) {
                        listingTemplate.children[1].children[0].children[0].style.color = "rgb(255, 102, 102)"
                        listingTemplate.children[1].children[0].children[1].style.color = "rgb(255, 102, 102)"
                        listingTemplate.children[1].children[1].children[1].style.background = "linear-gradient(0deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%)"
                        listingTemplate.style.background = "linear-gradient(180deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%)"
                    } else if (value1 < value2) {
                        listingTemplate.children[1].children[0].children[2].style.color = "rgb(255, 102, 102)"
                    }
                    
                    for (let i = 0; i < yourOffer.length && i < 8; i++) {
                        listingTemplate.children[1].children[1].children[0].appendChild(createPetDiv(yourOffer[i]))
                    }
            
                    if (yourOffer.length == 9) {
                        listingTemplate.children[1].children[1].children[0].appendChild(createPetDiv(yourOffer[8]))
                    } else if (yourOffer.length > 9) {
                        const p = document.createElement("p")
                        p.textContent = "+" + (yourOffer.length - 8).toString()
                        listingTemplate.children[1].children[1].children[0].appendChild(p)
                    }
            
                    for (let i = 0; i < theirOffer.length && i < 8; i++) {
                        listingTemplate.children[1].children[1].children[2].appendChild(createPetDiv(theirOffer[i]))
                    }
            
                    if (theirOffer.length == 9) {
                        listingTemplate.children[1].children[1].children[2].appendChild(createPetDiv(theirOffer[8]))
                    } else if (theirOffer.length > 9) {
                        const p = document.createElement("p")
                        p.textContent = "+" + (theirOffer.length - 8).toString()
                        listingTemplate.children[1].children[1].children[2].appendChild(p)
                    }
            
                    const sideMenu = document.createElement("div")
                    const b1 = document.createElement("button")
                    b1.className = "profileButton"
                    b1.innerText = "Accept"
                    b1.setAttribute("onclick", `acceptOffer(event, ${Object.values(listings)[c]["id"]}, ${j})`)
                    const b2 = document.createElement("button")
                    b2.className = "profileButton"
                    b2.innerText = "Decline"
                    b2.setAttribute("onclick", `declineOffer(event, ${Object.values(listings)[c]["id"]}, ${j})`)
                    const robloxNameDiv = document.createElement("div")
                    const robloxImg = document.createElement("img")
                    robloxImg.src = "/static/images/misc/robloxLogo.png"
                    const robloxName = document.createElement("a")
                    robloxName.href = "/user/" + listing["customOffers"][j]["owner"]
                    if (listing["customOffers"][j]["ownerRobloxUsername"] != "") {
                        robloxName.innerText = listing["customOffers"][j]["ownerRobloxUsername"]
                    } else {
                        robloxName.innerText = listing["customOffers"][j]["ownerUsername"]
                    }
                    const time = document.createElement("p")
                    time.innerText = timeSince(listing["createdAt"])
            
                    sideMenu.appendChild(b1)
                    sideMenu.appendChild(b2)
                    robloxNameDiv.appendChild(robloxImg)
                    robloxNameDiv.appendChild(robloxName)
                    sideMenu.appendChild(robloxNameDiv)
                    sideMenu.appendChild(time)
            
        
                    wrapper.appendChild(listingTemplate)
                    const figures = listingTemplate.querySelectorAll("figure")
                    listingTemplate.setAttribute("onclick", `showUserListings2(${JSON.stringify(listing)})`)
                    listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
                    figures.forEach(figure => {
                        figure.style.display = "none"
                    })
                    wrapper.appendChild(sideMenu)
                    wrapper.className = "listingWrapper"
                    target.appendChild(wrapper)
                }   
                counter++
            }
        }
    }
}

function loadPendingInto(listings, target, startAmount = 0, endAmount = 999) {
    var listing = ""
    target.setAttribute("listingsLoaded", (parseInt(target.getAttribute("listingsLoaded")) + (endAmount - startAmount)).toString())
    var counter = 0
    for (let c = 0; c < Object.values(listings).length && counter < endAmount; c++) {
        listing = Object.values(listings)[c]
        for (let j = 0; j < listing["customOffers"].length && counter < endAmount; j++) {
            if (listing["customOffers"][j]["status"] == "Accepted" && counter >= startAmount) {
                const wrapper = document.createElement("div")

                var yourOffer = listing["offer"]["give"]
                var theirOffer = listing["offer"]["take"]
                if (listing["customOffers"][j]["type"] == "give") {
                    yourOffer = yourOffer.concat(listing["customOffers"][j]["pets"])
                } else {
                    theirOffer = theirOffer.concat(listing["customOffers"][j]["pets"])
                }
    
                let listingTemplate = createListingTemplate()
                let value1 = calculateValue(yourOffer)
                let value2 = calculateValue(theirOffer)
                var combinedValue = parseFloat(Math.abs(value1 - value2).toFixed(2))
                if (Math.abs(Math.round(combinedValue) - combinedValue) < 0.02 || combinedValue > 100) {
                    combinedValue = Math.round(combinedValue)
                }
                listingTemplate.setAttribute("sharkvalue", combinedValue.toString())
                listingTemplate.children[1].children[0].children[1].textContent = combinedValue.toString()
                if (value1 > value2) {
                    listingTemplate.children[1].children[0].children[0].style.color = "rgb(255, 102, 102)"
                    listingTemplate.children[1].children[0].children[1].style.color = "rgb(255, 102, 102)"
                    listingTemplate.children[1].children[1].children[1].style.background = "linear-gradient(0deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%)"
                    listingTemplate.style.background = "linear-gradient(180deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%)"
                } else if (value1 < value2) {
                    listingTemplate.children[1].children[0].children[2].style.color = "rgb(255, 102, 102)"
                }
                
                for (let i = 0; i < yourOffer.length && i < 8; i++) {
                    listingTemplate.children[1].children[1].children[0].appendChild(createPetDiv(yourOffer[i]))
                }
        
                if (yourOffer.length == 9) {
                    listingTemplate.children[1].children[1].children[0].appendChild(createPetDiv(yourOffer[8]))
                } else if (yourOffer.length > 9) {
                    const p = document.createElement("p")
                    p.textContent = "+" + (yourOffer.length - 8).toString()
                    listingTemplate.children[1].children[1].children[0].appendChild(p)
                }
        
                for (let i = 0; i < theirOffer.length && i < 8; i++) {
                    listingTemplate.children[1].children[1].children[2].appendChild(createPetDiv(theirOffer[i]))
                }
        
                if (theirOffer.length == 9) {
                    listingTemplate.children[1].children[1].children[2].appendChild(createPetDiv(theirOffer[8]))
                } else if (theirOffer.length > 9) {
                    const p = document.createElement("p")
                    p.textContent = "+" + (theirOffer.length - 8).toString()
                    listingTemplate.children[1].children[1].children[2].appendChild(p)
                }
        
                const sideMenu = document.createElement("div")
                const b1 = document.createElement("button")
                b1.className = "profileButton"
                b1.innerText = "Complete"
                if (listing["markedAsCompletedBy"].includes(userData["id"])) {
                    b1.disabled = true
                } else {
                    console.log(listing["markedAsCompletedBy"])
                    b1.setAttribute("onclick", `displayImportantMessage(event, "Complete Trade", "Are you sure you want to <a>complete</a> the trade? If both you and your trading partner says yes, the trade will be successful!", "Go Back", "exitImportantMessage()", "Complete", "completeTradeWithKey(['${listing["id"]}', '${j}'], ${c})")`)
                }
                const b2 = document.createElement("button")
                b2.className = "profileButton"
                b2.innerText = "Cancel"
                b2.setAttribute("onclick", "")
                const robloxNameDiv = document.createElement("div")
                const robloxImg = document.createElement("img")
                robloxImg.src = "/static/images/misc/robloxLogo.png"
                const robloxName = document.createElement("a")
                robloxName.href = "/user/" + listing["customOffers"][j]["owner"]
                if (listing["customOffers"][j]["ownerRobloxUsername"] != "") {
                    robloxName.innerText = listing["customOffers"][j]["ownerRobloxUsername"]
                } else {
                    robloxName.innerText = listing["customOffers"][j]["ownerUsername"]
                }
                const time = document.createElement("p")
                time.innerText = timeSince(listing["createdAt"])
        
                sideMenu.appendChild(b1)
                sideMenu.appendChild(b2)
                robloxNameDiv.appendChild(robloxImg)
                robloxNameDiv.appendChild(robloxName)
                sideMenu.appendChild(robloxNameDiv)
                sideMenu.appendChild(time)
        
    
                wrapper.appendChild(listingTemplate)
                const figures = listingTemplate.querySelectorAll("figure")
                listingTemplate.setAttribute("onclick", `showUserListings2(${JSON.stringify(listing)})`)
                listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
                figures.forEach(figure => {
                    figure.style.display = "none"
                })
                wrapper.appendChild(sideMenu)
                wrapper.className = "listingWrapper"
                target.appendChild(wrapper)
                counter++
            }
        }
    }
}

function loadHistoryInto(listings, target, startAmount = 0, endAmount = 999) {
    var listing = ""
    target.setAttribute("listingsLoaded", (parseInt(target.getAttribute("listingsLoaded")) + (endAmount - startAmount)).toString())
    for (let c = startAmount; c < Object.values(listings).length && c < endAmount; c++) {
        listing = Object.values(listings)[c]
        const wrapper = document.createElement("div")
        var j = listing["acceptedOfferID"]

        var yourOffer = listing["offer"]["give"]
        var theirOffer = listing["offer"]["take"]
        if (listing["customOffers"][j]["type"] == "give") {
            yourOffer = yourOffer.concat(listing["customOffers"][j]["pets"])
        } else {
            theirOffer = theirOffer.concat(listing["customOffers"][j]["pets"])
        }

        let listingTemplate = createListingTemplate()
        let value1 = calculateValue(yourOffer)
        let value2 = calculateValue(theirOffer)
        var combinedValue = parseFloat(Math.abs(value1 - value2).toFixed(2))
        if (Math.abs(Math.round(combinedValue) - combinedValue) < 0.02 || combinedValue > 100) {
            combinedValue = Math.round(combinedValue)
        }
        listingTemplate.setAttribute("sharkvalue", combinedValue.toString())
        listingTemplate.children[1].children[0].children[1].textContent = combinedValue.toString()
        if (value1 > value2) {
            listingTemplate.children[1].children[0].children[0].style.color = "rgb(255, 102, 102)"
            listingTemplate.children[1].children[0].children[1].style.color = "rgb(255, 102, 102)"
            listingTemplate.children[1].children[1].children[1].style.background = "linear-gradient(0deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%)"
            listingTemplate.style.background = "linear-gradient(180deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%)"
        } else if (value1 < value2) {
            listingTemplate.children[1].children[0].children[2].style.color = "rgb(255, 102, 102)"
        }
        
        for (let i = 0; i < yourOffer.length && i < 8; i++) {
            listingTemplate.children[1].children[1].children[0].appendChild(createPetDiv(yourOffer[i]))
        }

        if (yourOffer.length == 9) {
            listingTemplate.children[1].children[1].children[0].appendChild(createPetDiv(yourOffer[8]))
        } else if (yourOffer.length > 9) {
            const p = document.createElement("p")
            p.textContent = "+" + (yourOffer.length - 8).toString()
            listingTemplate.children[1].children[1].children[0].appendChild(p)
        }

        for (let i = 0; i < theirOffer.length && i < 8; i++) {
            listingTemplate.children[1].children[1].children[2].appendChild(createPetDiv(theirOffer[i]))
        }

        if (theirOffer.length == 9) {
            listingTemplate.children[1].children[1].children[2].appendChild(createPetDiv(theirOffer[8]))
        } else if (theirOffer.length > 9) {
            const p = document.createElement("p")
            p.textContent = "+" + (theirOffer.length - 8).toString()
            listingTemplate.children[1].children[1].children[2].appendChild(p)
        }

        const sideMenu = document.createElement("div")
        sideMenu.classList.add("history")
        const robloxNameDiv = document.createElement("div")
        const robloxImg = document.createElement("img")
        robloxImg.src = "/static/images/misc/robloxLogo.png"
        const robloxName = document.createElement("a")
        robloxName.href = "/user/" + listing["customOffers"][j]["owner"]
        if (listing["customOffers"][j]["ownerRobloxUsername"] != "") {
            robloxName.innerText = listing["customOffers"][j]["ownerRobloxUsername"]
        } else {
            robloxName.innerText = listing["customOffers"][j]["ownerUsername"]
        }
        const time = document.createElement("p")
        time.innerText = timeSince(listing["createdAt"])

        robloxNameDiv.appendChild(robloxImg)
        robloxNameDiv.appendChild(robloxName)
        sideMenu.appendChild(robloxNameDiv)
        sideMenu.appendChild(time)


        wrapper.appendChild(listingTemplate)
        const figures = listingTemplate.querySelectorAll("figure")
        listingTemplate.setAttribute("onclick", `showUserListings2(${JSON.stringify(listing)})`)
        listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
        figures.forEach(figure => {
            figure.style.display = "none"
        })
        wrapper.appendChild(sideMenu)
        wrapper.className = "listingWrapper"
        target.appendChild(wrapper)
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function checkOutOfBoundsListing(element, xOffset = 0) {
    const position = element.getBoundingClientRect();
    const outOfBounds = [];
    let x = position.x
    let y = position.y
    var listings = element
    while (listings.classList.contains("listings") == false && listings != document.body)
        listings = listings.parentElement
    x += xOffset
    if (x + position.width > window.innerWidth) {
        outOfBounds.push('right');
    }
    if (x < 0) {
        outOfBounds.push('left');
    }
    if (y + position.height > window.innerHeight) {
        outOfBounds.push('bottom');
    }
    if (y < 0) {
        outOfBounds.push('top');
    }

    return outOfBounds;
}

function scrollListings(event, direction, amount = -1, targetSelected = 0) {
    if (amount == -1) {
        amount = listingsScrollSpeed
    }
    let element = 0
    if (targetSelected == 0) {
        element = event.target
    } else {
        element = event
    }
    
    while (element.classList.contains("listing") == false && element != document.body)
        element = element.parentElement
    let listing = element
    while (element.classList.contains("listings") == false && element != document.body)
        element = element.parentElement
    if (element != document.body) {
        
        const elementStyle = window.getComputedStyle(element)
        let left = parseFloat(elementStyle.marginLeft.split("px")[0])
        var offset = 0
        if (direction == "left") {
            offset = listing.getBoundingClientRect().width * amount + parseFloat(window.getComputedStyle(element).gap.split("px")[0]) * 0.75 * (amount - 1)
        } else {
            offset = (listing.getBoundingClientRect().width * amount + parseFloat(window.getComputedStyle(element).gap.split("px")[0]) * 0.75 * (amount - 1)) * -1
        }
        if (amount == 0) {
            offset = 0
        }
        left += offset
        element.style.marginLeft = (left / window.innerWidth * 100).toString() + "vw"
        for (let i = 0; i < element.children.length; i++) {
            const outOfBounds = checkOutOfBoundsListing(element.children[i], offset)
            const figures = element.children[i].querySelectorAll("figure")
            if (outOfBounds.includes("left")) {
                element.children[i].setAttribute("onclick", 'scrollListings(event, "left")')
                element.children[i].classList.add("listingsFilter")
                figures.forEach(figure => {
                    figure.style.display = "flex"
                })
            } else if (outOfBounds.includes("right")) {
                element.children[i].setAttribute("onclick", 'scrollListings(event, "right")')
                element.children[i].classList.add("listingsFilter")
                figures.forEach(figure => {
                    figure.style.display = "flex"
                })
            } else {
                element.children[i].setAttribute("onclick", element.children[i].getAttribute("data-onclick"))
                element.children[i].classList.remove("listingsFilter")
                figures.forEach(figure => {
                    figure.style.display = "none"
                })
            }
        }
    }
}

function calculateValue(listOfPets) {
    let value = 0
    let keyword = ""
    for (const i in listOfPets) {
        keyword = ""
        if (listOfPets[i]["regular"] == 1) {
            keyword += "rvalue"
        } else if (listOfPets[i]["neon"] == 1) {
            keyword += "nvalue"
        } else if (listOfPets[i]["mega"] == 1) {
            keyword += "mvalue"
        } else {
            keyword += "rvalue"
        }

        if (listOfPets[i]["fly"] == 1 && listOfPets[i]["ride"] == 1) {
            keyword += " - fly&ride"
        } else if (listOfPets[i]["fly"] == 1) {
            keyword += " - fly"
        } else if (listOfPets[i]["ride"] == 1) {
            keyword += " - ride"
        } 

        pet = petsDict[listOfPets[i]["id"]]
        if (pet != undefined) {
            if (keyword in pet) {
                value += pet[keyword]
            } else {
                if (pet["value"] != undefined) {
                    value += parseFloat(pet["value"])
                }
            }
        }
    }
    if (calculateWithValue == "shark") {
        return value
    } else {
        return parseFloat((value / frostValue).toFixed(4))
    }
}

function createPetDiv(pet) {
    const div = document.createElement("div")
    const img = document.createElement("img")
    img.src = petsDict[pet["id"]]["image"]
    div.appendChild(img)
    const div2 = document.createElement("div")
    if (pet["fly"]) {
        const div3 = document.createElement("div")
        const p = document.createElement("p")
        p.textContent = "F"
        div3.appendChild(p)
        div3.className = "flyDiv"
        div2.appendChild(div3)
    }
    if (pet["ride"]) {
        const div3 = document.createElement("div")
        const p = document.createElement("p")
        p.textContent = "R"
        div3.appendChild(p)
        div3.className = "rideDiv"
        div2.appendChild(div3)
    }
    if (pet["neon"]) {
        const div3 = document.createElement("div")
        const p = document.createElement("p")
        p.textContent = "N"
        div3.appendChild(p)
        div3.className = "neonDiv"
        div2.appendChild(div3)
    }
    if (pet["mega"]) {
        const div3 = document.createElement("div")
        const p = document.createElement("p")
        p.textContent = "M"
        div3.appendChild(p)
        div3.className = "megaDiv"
        div2.appendChild(div3)
    }
    div.appendChild(div2)
    return div
}

function timeSince(timestamp) {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    const timeAgoInSeconds = nowInSeconds - timestamp;

    const seconds = timeAgoInSeconds.toFixed(0);
    const minutes = Math.floor(seconds / 60).toFixed(0);
    const hours = Math.floor(minutes / 60).toFixed(0);
    const days = Math.floor(hours / 24).toFixed(0);
    const months = Math.floor(days / 30).toFixed(0);
    const years = Math.floor(months / 12).toFixed(0);

    if (seconds < 100) {
        return `${seconds} Seconds Ago`;
    } else if (minutes < 100) {
        return `${minutes} Minutes Ago`;
    } else if (hours < 100) {
        return `${hours} Hours Ago`;
    } else if (days < 100) {
        return `${days} Days Ago`;
    } else if (years < 2) {
        return `${months} Months Ago`;
    } else {
        return `${years} Years Ago`;
    }
}

function disableScroll(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
}


function openCreateListingInterface() {
    var createListingInterface = document.getElementById("createListingInterface")
    var createListingInterfaceBackground = document.getElementById("createListingInterfaceBackground")
    createListingInterface.style.display = "flex"
    createListingInterfaceBackground.style.display = "flex"
    disableScrolling()
    interfacesOpen += 1
}

function closeCreateListingInterface(event) {

    var createListingInterface = document.getElementById("createListingInterface")
    var createListingInterfaceBackground = document.getElementById("createListingInterfaceBackground")
    if (event != undefined) {
        var x = event.clientX
        var y = event.clientY
    } else {
        var x = -1000000
        var y = -1000000
    }
    
    if (isMouseOverElement(x, y, createListingInterface) == false || event == undefined) {
        createListingInterface.style.display = "none"
        createListingInterfaceBackground.style.display = "none"
        var grid1 = createListingInterface.children[1].children[0].children[0]
        var grid2 = createListingInterface.children[1].children[0].children[2]
        for (let i = grid1.children.length - 1; i > 0; i--) {
            grid1.removeChild(grid1.children[i])
        }
        for (let i = grid2.children.length - 1; i > 0; i--) {
            grid2.removeChild(grid2.children[i])
        }
        
        for (let i = 0; i < 8; i++) {
            let div = document.createElement("div")
            div.className = "first"
            grid1.appendChild(div)
            div = document.createElement("div")
            div.className = "first"
            grid2.appendChild(div)
        }
        enableScrolling()
        interfacesOpen -= 1
    }
}

window.addEventListener("input", event => {
    var createListingInterface = document.getElementById("createListingInterface")
    var input1 = createListingInterface.children[1].children[1].children[0].children[0]
    var input2 = createListingInterface.children[1].children[1].children[2].children[0]
    if (event.target == input1) {
        input2.value = ""
        input2.setAttribute("placeholder", "-")
        input2.setAttribute("data-placeholder", "")
        if (isValidFloat(input1.value) == false) {
            input1.value = input1.value.slice(0, -1)
        }
    } else if (event.target == input2) {
        input1.value = ""
        input1.setAttribute("placeholder", "-")
        input1.setAttribute("data-placeholder", "")
        if (isValidFloat(input2.value) == false) {
            input2.value = input2.value.slice(0, -1)
        }
    }
})

function isValidFloat(value) {
    const parsedValue = parseFloat(value);
    return value.toString() == parsedValue.toString() || (value.split(".").length == 2 && value.charAt(value.length - 1) == ".") || (parsedValue.toString().length != value.length && parsedValue - value == 0);
}

function setAddPetTypeTo(type) {
    addPetType = type
}

function openInventory() {
    displayPets()
    document.getElementById("addInventory").style.display = "block"
    document.getElementById("addInventoryBackground").style.display = "block"
    interfacesOpen += 1
}

function closeInventory() {
    document.getElementById("addInventory").style.display = "none"
    document.getElementById("addInventoryBackground").style.display = "none"
    interfacesOpen -= 1
}

function displayPets() {
    var petImages = document.getElementById("petImages")
    if (loggedIn && displayPetsFirstTime == 0) {
        displayPetsFirstTime = 1
        petImages.innerHTML = ""
        Object.keys(petsDict).forEach(key => {
            pet = petsDict[key]
            if (pet["image"] !== "") {
                const div = document.createElement("div")
                div.className = "petImage"
                div.setAttribute("data-petname", pet["name"])
                div.setAttribute("data-name", pet["type"])
                div.setAttribute("data-value", pet["rarity"])
                div.setAttribute("onclick", "addPetToInventory(" + key.toString() + ")")
                const img = document.createElement("img")
                img.style.height = "max(3.5vw, 7vh)"
                img.style.aspectRatio = "1/1"
                img.setAttribute("onerror", "handleImageError(this)")
                img.src = pet["image"]
                div.appendChild(img)
                petImages.appendChild(div)
            }
        })
    }
}

function addPetToInventory(pet) {
    var petAdded = document.getElementById("petAdded")
    var petAddedText = document.getElementById("petAddedText")
    if (addPetType == "inventory") {
        formData = new FormData();
        formData.append('pet', pet)
        formData.append('fly', fly)
        formData.append('ride', ride)
        formData.append('regular', regular)
        formData.append('neon', neon)
        formData.append('mega', mega)
        formData.append('action', "addPetToInventory");

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
            var petData = {
                "id":pet,
                "fly":fly,
                "ride":ride,
                "regular":regular,
                "neon":neon,
                "mega":mega
            }
            userData["inventory"].push(petData)
            petsAdded += 1
            petAdded.style.bottom = "10%"
            petAdded.style.backgroundColor = "rgb(0, 255, 0)"
            petAddedText.innerHTML = "You added " + petsDict[pet]["name"] + " to your inventory!"
            document.getElementById("inventoryAmount").innerHTML = parseInt(document.getElementById("inventoryAmount").innerHTML) + 1
            var oldPetsAdded = petsAdded
            setTimeout((event) => {
                if (oldPetsAdded == petsAdded) {
                    petAdded.style.bottom = "-100%"
                }
            }, 1750)

            var added = false
            for (let i = 0; i < document.getElementById("userInventory").children[1].children.length; i++) {
                var child = document.getElementById("userInventory").children[1].children[i]
                var petInfo = JSON.parse(child.getAttribute("pet-data"))
                if (petInfo != null) {
                    if (petInfo["id"] == petData["id"] && petInfo["regular"] == petData["regular"] && petInfo["fly"] == petData["fly"] &&
                        petInfo["ride"] == petData["ride"] && petInfo["neon"] == petData["neon"] && petInfo["mega"] == petData["mega"]
                    ) {
                        child.children[1].textContent = parseInt(child.children[1].textContent) + 1
                        child.children[1].style.display = ""
                        added = true
                        break
                    }
                }
            }

            if (added == false) {
                petData["amount"] = 1
                document.getElementById("userInventory").children[1].appendChild(createInventoryPet(petData, "inventory", false))
            }
            

        }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
    } else if (addPetType == "trade1") {
        tradePart1.push({
                "id":pet,
                "fly":fly,
                "ride":ride,
                "regular":regular,
                "neon":neon,
                "mega":mega
            })
        showTradePets()
        calculateTradeValue()
    } else if (addPetType == "trade2") {
        tradePart2.push({
                "id":pet,
                "fly":fly,
                "ride":ride,
                "regular":regular,
                "neon":neon,
                "mega":mega
            })
        showTradePets()
        calculateTradeValue()
    } else if (addPetType == "wishlist") {
        formData = new FormData();
        formData.append('pet', pet)
        formData.append('fly', fly)
        formData.append('ride', ride)
        formData.append('regular', regular)
        formData.append('neon', neon)
        formData.append('mega', mega)
        formData.append('action', "addPetToWishlist");

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
            var petData = {
                "id":pet,
                "fly":fly,
                "ride":ride,
                "regular":regular,
                "neon":neon,
                "mega":mega
            }
            userData.wishlist.push(petData)
            petsAdded += 1
            petAdded.style.bottom = "10%"
            petAdded.style.backgroundColor = "rgb(0, 255, 0)"
            petAddedText.innerHTML = "You added " + petsDict[pet]["name"] + " to your wishlist!"
            var oldPetsAdded = petsAdded
            setTimeout((event) => {
                if (oldPetsAdded == petsAdded) {
                    petAdded.style.bottom = "-100%"
                }
            }, 1750)

            var added = false
            for (let i = 0; i < document.getElementById("userWishlist").children[1].children.length; i++) {
                var child = document.getElementById("userWishlist").children[1].children[i]
                var petInfo = JSON.parse(child.getAttribute("pet-data"))
                if (petInfo != null) {
                    if (petInfo["id"] == petData["id"] && petInfo["regular"] == petData["regular"] && petInfo["fly"] == petData["fly"] &&
                        petInfo["ride"] == petData["ride"] && petInfo["neon"] == petData["neon"] && petInfo["mega"] == petData["mega"]
                    ) {
                        child.children[1].textContent = parseInt(child.children[1].textContent) + 1
                        child.children[1].style.display = ""
                        added = true
                        break
                    }
                }
            }

            if (added == false) {
                petData["amount"] = 1
                document.getElementById("userWishlist").children[1].appendChild(createInventoryPet(petData, "wishlist", false))
            }
        }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
    } else if (addPetType == "listing1") {
        listingPart1Dict.push({
            "id":pet,
            "fly":fly,
            "ride":ride,
            "regular":regular,
            "neon":neon,
            "mega":mega
        })
        updateListingInterface2()
    } else if (addPetType == "listing2") {
        listingPart2Dict.push({
            "id":pet,
            "fly":fly,
            "ride":ride,
            "regular":regular,
            "neon":neon,
            "mega":mega
        })
        updateListingInterface2()
    } else if (addPetType == "createListingInterfaceYourOffer" || addPetType == "createListingInterfaceTheirOffer") {
        var createListingInterface = document.getElementById("createListingInterface")
        if (addPetType == "createListingInterfaceYourOffer") {
            var grid = createListingInterface.children[1].children[0].children[0]
        } else {
            var grid = createListingInterface.children[1].children[0].children[2]
        }
        const div = document.createElement("div")
        div.setAttribute("data-dict", JSON.stringify({
            "id":pet,
            "fly":fly,
            "ride":ride,
            "regular":regular,
            "neon":neon,
            "mega":mega
        }))
        const img = document.createElement("img")
        img.src = petsDict[pet]["image"]
        div.appendChild(img)
        if (window.getComputedStyle(grid.children[0]).display != "none" && grid.children.length <= maxPets) {
            grid.appendChild(div)
            if (grid.children.length > 9) {
                for (let i = 1; i < grid.children.length; i++) {
                    if (grid.children[i].innerHTML == "") {
                        grid.removeChild(grid.children[i])
                    }
                    if (grid.children.length == 9) {
                        break
                    }
                }
            }
            if (grid.children.length > 9) {
                if (Math.ceil(grid.children.length / 3) * 3 > maxPets) {
                    for (let i = 1; i < grid.children.length; i++) {
                        if (grid.children[i].innerHTML == "") {
                            grid.removeChild(grid.children[i])
                        }
                        if (Math.ceil(grid.children.length / 3) * 3 - grid.children.length == 0) {
                            break
                        }
                    }
                }
                if (Math.ceil(grid.children.length / 3) * 3 - grid.children.length != 0) {
                    let loopAmount = parseInt(Math.ceil(grid.children.length / 3) * 3 - grid.children.length)
                    for (let i = 0; i < loopAmount; i++) {
                        let div = document.createElement("div")
                        div.className = "first"
                        if (grid.children.length <= maxPets) {
                            grid.appendChild(div)
                        }
                    }
                }
            }
        }
        if (grid.children.length > maxPets) {
            grid.children[0].style.display = "none"
        } else {
            grid.children[0].style.display = "flex"
        }
        div.setAttribute("onclick", "removePetFromInventory('" + addPetType.toString() + "', '" + Array.from(grid.children).indexOf(div).toString() + "')")
        insertValuesIntoCreateListingInterface()
        
    } else if (addPetType == "createListingInterfaceTheirOffer") {
        var createListingInterface = document.getElementById("createListingInterface")
        var grid = createListingInterface.children[1].children[0].children[2]
        const div = document.createElement("div")
        div.setAttribute("data-dict", JSON.stringify({
            "id":pet,
            "fly":fly,
            "ride":ride,
            "regular":regular,
            "neon":neon,
            "mega":mega
        }))
        const img = document.createElement("img")
        img.src = petsDict[pet]["image"]
        div.appendChild(img)
        if (window.getComputedStyle(grid.children[0]).display != "none" && grid.children.length <= maxPets) {
            grid.appendChild(div)
            if (grid.children.length > 9) {
                for (let i = 1; i < grid.children.length; i++) {
                    if (grid.children[i].innerHTML == "") {
                        grid.removeChild(grid.children[i])
                    }
                    if (grid.children.length == 9) {
                        break
                    }
                }
            }
            if (grid.children.length > 9) {
                if (Math.ceil(grid.children.length / 3) * 3 > maxPets) {
                    for (let i = 1; i < grid.children.length; i++) {
                        if (grid.children[i].innerHTML == "") {
                            grid.removeChild(grid.children[i])
                        }
                        if (Math.ceil(grid.children.length / 3) * 3 - grid.children.length == 0) {
                            break
                        }
                    }
                }
                if (Math.ceil(grid.children.length / 3) * 3 - grid.children.length != 0) {
                    let loopAmount = parseInt(Math.ceil(grid.children.length / 3) * 3 - grid.children.length)
                    for (let i = 0; i < loopAmount; i++) {
                        let div = document.createElement("div")
                        div.className = "first"
                        if (grid.children.length <= maxPets) {
                            grid.appendChild(div)
                        }
                    }
                }
            }
        }
        if (grid.children.length > maxPets) {
            grid.children[0].style.display = "none"
        } else {
            grid.children[0].style.display = "flex"
        }
        div.setAttribute("onclick", "removePetFromInventory('createListingInterfaceTheirOffer', " + Array.from(grid.children).indexOf(div).toString() + ")")

    } else if (addPetType == "listingInterface2") {
        if (currentListing["extraSharkValueRequested"] > 0 || currentListing["extraSharkValueRequested"] == 0) {
            if (currentListing["offer"]["give"].length + yourOfferExtraPets.length < 18) {
                yourOfferExtraPets.push({
                "id":pet,
                "fly":fly,
                "ride":ride,
                "regular":regular,
                "neon":neon,
                "mega":mega
                })
            } else {
                displayError("Can't add more than 18 pets!")
            }
        } else if (currentListing["extraSharkValueRequested"] < 0) {
            if (currentListing["offer"]["take"].length + theirOfferExtraPets.length < 18) {
                theirOfferExtraPets.push({
                "id":pet,
                "fly":fly,
                "ride":ride,
                "regular":regular,
                "neon":neon,
                "mega":mega
                })
            } else {
                displayError("Can't add more than 18 pets!") 
            }
        }
        updateListingInterface2()
    } 
};

function filter(filter, preventLoop) {
    var petImage = document.querySelectorAll(".petImage")
    lastFilter = filter
    if (filter == "all") {
        petImage.forEach(pet => {
            pet.style.display = "flex";
        });
        resetFilterButtonBrightness()
        all.style.filter = "brightness(1.2)"
    } else if (filter == "pets") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-name") == "pets") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        pets.style.filter = "brightness(1.2)"
    } else if (filter == "common") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-value") == "common") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        common.style.filter = "brightness(1.2)"
    } else if (filter == "eggs") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-name") == "eggs") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        eggs.style.filter = "brightness(1.2)"
    } else if (filter == "legendary") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-value") == "legendary") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        legendary.style.filter = "brightness(1.2)"
    } else if (filter == "other") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-name") == "other") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        other.style.filter = "brightness(1.2)"
    } else if (filter == "pet wear") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-value") == "") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        petWear.style.filter = "brightness(1.2)"
    } else if (filter == "rare") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-value") == "rare") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        rare.style.filter = "brightness(1.2)"
    } else if (filter == "ultra rare") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-value") == "ultra rare") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        ultraRare.style.filter = "brightness(1.2)"
    } else if (filter == "uncommon") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-value") == "uncommon") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        uncommon.style.filter = "brightness(1.2)"
    } else if (filter == "vehicles") {
        petImage.forEach(pet => {
            if (pet.getAttribute("data-name") == "vehicles") {
                pet.style.display = "flex";
            } else {
                pet.style.display = "none";
                filteredPets += 1
            }
        });
        resetFilterButtonBrightness()
        vehicles.style.filter = "brightness(1.2)"
    }
    if (preventLoop == 0) {
        searchUpPets()
    }
}

function searchUpPets() {
    filteredPets = 0
    filter(lastFilter, 1)
    var petImage = document.querySelectorAll(".petImage")
    var length = 0
    petImage.forEach(pet => {
        if (pet.getAttribute("data-petname").toLowerCase().includes(petSearch.value) == false && pet.getAttribute("data-name").toLowerCase().includes(petSearch.value) == false && pet.getAttribute("data-value").toLowerCase().includes(petSearch.value) == false) {
            pet.style.display = "none"
        } else {
            length += 1
        };
    });
};

function resetFilterButtonBrightness() {
    all.style.filter = "brightness(1)"
    pets.style.filter = "brightness(1)"
    common.style.filter = "brightness(1)"
    eggs.style.filter = "brightness(1)"
    legendary.style.filter = "brightness(1)"
    other.style.filter = "brightness(1)"
    petWear.style.filter = "brightness(1)"
    rare.style.filter = "brightness(1)"
    ultraRare.style.filter = "brightness(1)"
    uncommon.style.filter = "brightness(1)"
    vehicles.style.filter = "brightness(1)"
}

function insertValuesIntoCreateListingInterface() {
    var createListingInterface = document.getElementById("createListingInterface")
    var grid1 = createListingInterface.children[1].children[0].children[0]
    var grid2 = createListingInterface.children[1].children[0].children[2]
    var value1 = calculateTotalValue(grid1).toFixed(2)
    var value2 = calculateTotalValue(grid2).toFixed(2)
    if (value1 != 0 && value2 != 0) {
        createListingInterface.children[1].children[1].children[1].children[1].disabled = false
    } else {
        createListingInterface.children[1].children[1].children[1].children[1].disabled = true
    }
    if (Math.abs(Math.round(value1) - value1) < 0.02) {
        value1 = Math.round(value1)
    }
    if (Math.abs(Math.round(value2) - value2) < 0.02) {
        value2 = Math.round(value2)
    }
    var child1 = createListingInterface.children[0].children[0].children[0].children[0]
    var child2 = createListingInterface.children[0].children[4].children[0].children[0]
    child1.innerText = value1
    child1.style.fontSize = (100 / ((child1.innerText.length + 1.5) / 2.5)).toString() + "%"
    child2.innerText = value2
    child2.style.fontSize = (100 / ((child2.innerText.length + 1.5) / 2.5)).toString() + "%"
    var child3 = createListingInterface.children[1].children[0].children[1].children[0]
    var value3 = Math.abs(value1 - value2).toFixed(2)
    if (Math.abs(Math.round(value3) - value3) < 0.02) {
        value3 = Math.round(value3)
    }
    child3.style.transition = "font-size 0.3s ease" // Transition på sum av values (den i midten)
    child3.innerText = value3
    child3.style.fontSize = (100 / ((child3.innerText.length + 2) / 3)).toString() + "%"
    var child3Div = createListingInterface.children[1].children[0].children[1]
    child3Div.classList.remove("upAnimation")
    child3Div.classList.remove("downAnimation")
    if (value1 > value2) {
        child3Div.classList.add("downAnimation")
        child1.style.color = "rgb(255, 102, 102)"
        child2.style.color = "rgb(109, 107, 112)"
        child3.style.color = "rgb(255, 102, 102)"
    } else if (value1 < value2) {
        child3Div.classList.add("upAnimation")
        child1.style.color = "rgb(109, 107, 112)"
        child2.style.color = "rgb(255, 102, 102)"
        child3.style.color = "rgb(54, 53, 55)"
    } else {
        child1.style.color = "rgb(109, 107, 112)"
        child2.style.color = "rgb(109, 107, 112)"
        child3.style.color = "rgb(54, 53, 55)"
    }
    var bar = createListingInterface.children[0].children[3].children[0]
    var width = (parseFloat(value1) / (parseFloat(value1) + parseFloat(value2)) * 100).toFixed(0).toString()
    if (width == "Infinity") {
        width = "100"
    }
    if (value1 == 0 && value2 == 0) {
        width = "50"
    }
    bar.style.width = width + "%"
    var winFairLose = createListingInterface.children[0].children[1].children[0].children[0]
    let linearGradientValue = "linear-gradient(135deg, rgba(182, 170, 153, 0.5) 0%, "
    if (width > 85) {
        width = 85
    } else if (width < 20) {
        width = 20
    }
    if (width > 40) {
        linearGradientValue += "rgba(182, 170, 153, 0.4) 20%, "
    }
    linearGradientValue += `rgba(253, 249, 234, 0) ${width}%, `
    if (width < 65) {
        linearGradientValue += "rgba(182, 170, 153, 0.4) 85%, "
    }
    linearGradientValue += "rgba(182, 170, 153, 0.5) 100%)"
    winFairLose.style.background = linearGradientValue
}

function calculateTradeValue() {
    var tradeValue = document.getElementById("differenceInValueText")
    var tradeArrow = document.getElementById("differenceInValue")
    var totalValue = 0
    var value = ""
    var trade1Value = 0
    var trade2Value = 0
    for (const i in tradePart1) {
        value = ""
        if (tradePart1[i].regular == "1") {
            value += "rvalue"
        } else if (tradePart1[i].neon == "1") {
            value += "nvalue"
        } else {
            value += "mvalue"
        }
        if (tradePart1[i].fly == "1" && tradePart1[i].ride == "1") {
            value += " - fly&ride"
        } else if (tradePart1[i].fly == "1") {
            value += " - fly"
        } else if (tradePart1[i].ride == "1") {
            value += " - ride"
        }
        trade1Value += petsDict[tradePart1[i].id][value]
    }
    for (const i in tradePart2) {
        value = ""
        if (tradePart2[i].regular == "1") {
            value += "rvalue"
        } else if (tradePart2[i].neon == "1") {
            value += "nvalue"
        } else {
            value += "mvalue"
        }
        if (tradePart2[i].fly == "1" && tradePart2[i].ride == "1") {
            value += " - fly&ride"
        } else if (tradePart2[i].fly == "1") {
            value += " - fly"
        } else if (tradePart2[i].ride == "1") {
            value += " - ride"
        }
        trade2Value += petsDict[tradePart2[i].id][value]
    }

    const oldTrade1Value = trade1Value
    const oldTrade2Value = trade2Value

    if (trade2Value !== 0 && trade1Value !== 0) {
        tradeBar.style.width = ((100 / ((trade1Value / trade2Value) + 1)) * (trade1Value / trade2Value)).toString() + "%"
    } else {
        tradeBar.style.width = "0%"
    }

    if (calculateWithValue == "frost") {
        trade1Value /= 105
        trade2Value /= 105
    }

    trade1Value = trade1Value.toFixed(2)
    trade2Value = trade2Value.toFixed(2)

    if (oldTrade1Value > 0 && trade1Value == 0) {
        trade1Value = 0.01
    }
    if (oldTrade2Value > 0 && trade2Value == 0) {
        trade2Value = 0.01
    }

    yourScore.innerText = trade1Value
    yourScore2.innerText = trade1Value
    theirScore.innerText = trade2Value
    theirScore2.innerText = trade2Value

    const finalValue = (trade1Value - trade2Value).toFixed(2)
    if (finalValue > 0) {
        tradeArrow.style.transform = "rotate(180deg)"
        tradeValue.innerText = finalValue.toString()
        tradeValue.style.color = "red";
    } else {
        tradeArrow.style.transform = "rotate(0deg)"
        tradeValue.innerText = Math.abs(finalValue).toString()
        tradeValue.style.color = "black";
    }

    var rect = tradeArrow.getBoundingClientRect()
    var rect2 = listingInterface.getBoundingClientRect()
    var posY = rect.top - rect2.top
    var posX = rect.left - rect2.left

    posY += tradeArrow.offsetHeight / 2
    posX += tradeArrow.offsetWidth / 2

    tradeValue.style.top = posY + "px"
    tradeValue.style.left = posX + "px"

    tradeValue.style.fontSize = (150 / finalValue.length).toString() + "px"

    if (finalValue == 0.00) {
        tradeValue.style.opacity = 0
        tradeArrow.style.opacity = 0

    } else {
        tradeValue.style.opacity = 1
        tradeArrow.style.opacity = 1
    }
}

function calculateTotalValue(grid) {
    let value = 0
    for (let i = 1; i < grid.children.length; i++) {
        if (grid.children[i].innerHTML != "") {
            let dict = JSON.parse(grid.children[i].getAttribute("data-dict"))
            let keyword = ""
            if ("value" in dict) {
                keyword = "value"
            } else {
                if (dict["mega"] == 1) {
                    keyword += "m"
                } else if (dict["neon"] == 1) {
                    keyword += "n"
                } else {
                    keyword += "r"
                } 
                keyword += "value"
                if (dict["fly"] == 1 && dict["ride"] == 1) {
                    keyword += " - fly&ride"
                } else if (dict["fly"] == 1) {
                    keyword += " - fly"
                } else if (dict["ride"] == 1) {
                    keyword += " - ride"
                }
                petValue = parseFloat(petsDict[dict["id"]][keyword])
                if (calculateWithValue == "frost") {
                    petValue /= frostValue
                }
                if (petValue > 0) {
                    value += petValue
                }
            }
        }
    }
    return value
}

async function removePet(event, type) {
    if (type == "inventory") {
        var inventoryLength = document.getElementById("inventoryAmount")
        var petAdded = document.getElementById("petAdded")
        var petAddedText = document.getElementById("petAddedText")


        var target = event.target
        var petData = target.getAttribute("pet-data")
        if (petData == null) {
            target = target.parentElement
            petData = target.getAttribute("pet-data")
        }

        petData = JSON.parse(petData)

        formData = new FormData();
        formData.append('pet', JSON.stringify(petData))
        formData.append('action', "removePetFromInventory");

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
            petAdded.style.bottom = "5vh"
            petAdded.style.backgroundColor = "rgb(255, 0, 0)"
            petAddedText.innerHTML = "You removed " + (petsDict[petData["id"]]["name"]).toString() + " from your inventory!"
            inventoryLength.innerHTML = parseInt(inventoryLength.innerHTML) - 1
            var oldPetsAdded = petsAdded
            setTimeout((event) => {
                if (oldPetsAdded == petsAdded) {
                    petAdded.style.bottom = "-10vh"
                }
            }, 1750)

            for (let i = 0; i < document.getElementById("userInventory").children[1].children.length; i++) {
                var child = document.getElementById("userInventory").children[1].children[i]
                var petInfo = JSON.parse(child.getAttribute("pet-data"))
                if (petInfo != null) {
                    if (petInfo["id"] == petData["id"] && petInfo["regular"] == petData["regular"] && petInfo["fly"] == petData["fly"] &&
                        petInfo["ride"] == petData["ride"] && petInfo["neon"] == petData["neon"] && petInfo["mega"] == petData["mega"]
                    ) {
                        console.log(parseInt(child.children[1].textContent))
                        if (parseInt(child.children[1].textContent) > 2) {
                            child.children[1].textContent = parseInt(child.children[1].textContent) - 1
                        } else if (parseInt(child.children[1].textContent) == 2) {
                            child.children[1].textContent = "1"
                            child.children[1].style.display = "none"
                        } else {
                            document.getElementById("userInventory").children[1].removeChild(child)
                        }
                        break
                    }
                }
            }
        }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
    } else if (type == "wishlist") {
        var petAdded = document.getElementById("petAdded")
        var petAddedText = document.getElementById("petAddedText")


        var target = event.target
        var petData = target.getAttribute("pet-data")
        if (petData == null) {
            target = target.parentElement
            petData = target.getAttribute("pet-data")
        }

        console

        petData = JSON.parse(petData)

        formData = new FormData();
        formData.append('pet', JSON.stringify(petData))
        formData.append('action', "removePetFromWishlist");

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
            petAdded.style.bottom = "5vh"
            petAdded.style.backgroundColor = "rgb(255, 0, 0)"
            petAddedText.innerHTML = "You removed " + (petsDict[petData["id"]]["name"]).toString() + " from your wishlist!"
            var oldPetsAdded = petsAdded
            setTimeout((event) => {
                if (oldPetsAdded == petsAdded) {
                    petAdded.style.bottom = "-10vh"
                }
            }, 1750)

            for (let i = 0; i < document.getElementById("userWishlist").children[1].children.length; i++) {
                var child = document.getElementById("userWishlist").children[1].children[i]
                var petInfo = JSON.parse(child.getAttribute("pet-data"))
                if (petInfo != null) {
                    if (petInfo["id"] == petData["id"] && petInfo["regular"] == petData["regular"] && petInfo["fly"] == petData["fly"] &&
                        petInfo["ride"] == petData["ride"] && petInfo["neon"] == petData["neon"] && petInfo["mega"] == petData["mega"]
                    ) {
                        console.log(parseInt(child.children[1].textContent))
                        if (parseInt(child.children[1].textContent) > 2) {
                            child.children[1].textContent = parseInt(child.children[1].textContent) - 1
                        } else if (parseInt(child.children[1].textContent) == 2) {
                            child.children[1].textContent = "1"
                            child.children[1].style.display = "none"
                        } else {
                            document.getElementById("userWishlist").children[1].removeChild(child)
                        }
                        break
                    }
                }
            }
        }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
    }
}

function removePetFromInventory(type, pet) {
    if (type == "inventory") {
        var inventoryLength = document.getElementById("inventoryAmount")
        var petAdded = document.getElementById("petAdded")
        var petAddedText = document.getElementById("petAddedText")

        const id = userData["inventory"].indexOf(JSON.parse(pet))

        console.log(id)
        

        formData = new FormData();
        formData.append('pet', (pet).toString())
        formData.append('action', "removePetFromInventory");

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
            
            petAdded.style.bottom = "5vh"
            petAdded.style.backgroundColor = "rgb(255, 0, 0)"
            petAddedText.innerHTML = "You removed " + (petsDict[id["id"]]["name"]).toString() + " from your inventory!"
            inventoryLength.innerHTML = parseInt(inventoryLength.innerHTML) - 1
            var oldPetsAdded = petsAdded
            setTimeout((event) => {
                if (oldPetsAdded == petsAdded) {
                    petAdded.style.bottom = "-10vh"
                }
            }, 1750)
        }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
    } else if (type == "trade1") {
        tradePart1.splice(pet, 1)
        showTradePets()
        calculateTradeValue()
    } else if (type == "trade2") {
        tradePart2.splice(pet, 1)
        showTradePets()
        calculateTradeValue()
    } else if (type == "wishlist") {
        formData = new FormData();
        formData.append('pet', (pet).toString())
        formData.append('action', "removePetFromWishlist");

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
            const id = userData.wishlist[pet].id
            userData.wishlist.splice(pet, 1)

            showWishlistPets()
            
            petsAdded -= 1
            petAdded.style.bottom = "5vh"
            petAdded.style.backgroundColor = "rgb(255, 0, 0)"
            petAddedText.innerHTML = "You removed " + (petsDict[id]["name"]).toString() + " from your wishlist!"
            var oldPetsAdded = petsAdded
            setTimeout((event) => {
                if (oldPetsAdded == petsAdded) {
                    petAdded.style.bottom = "-10vh"
                }
            }, 1750)
        }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
    } else if (type == "listing1") {
        listingPart1Dict.splice(pet, 1)
        updateListingInterface2()
    } else if (type == "listing2") {
        listingPart2Dict.splice(pet, 1)
        updateListingInterface2()
    } else if (type == "createListingInterfaceYourOffer" || type == "createListingInterfaceTheirOffer") {
        var createListingInterface = document.getElementById("createListingInterface")
        if (type == "createListingInterfaceYourOffer") {
            var grid = createListingInterface.children[1].children[0].children[0]
        } else {
            var grid = createListingInterface.children[1].children[0].children[2]
        }
        grid.removeChild(grid.children[parseInt(pet)])
        for (let i = 1; i < grid.children.length; i++) {
            if (grid.children[i].innerHTML != "") {
                grid.children[i].setAttribute("onclick", `removePetFromInventory('${type}', '${i.toString()}')`)
            }
        }
        if (grid.children.length < 9) {
            for (let i = parseInt(grid.children.length); i < 9; i++) {
                const div = document.createElement("div")
                div.className = "first"
                grid.appendChild(div)
            }
        } else {
            for (let i = grid.children.length - 1; i >= 0; i--) {
                if (grid.children[i].innerHTML == "") {
                    grid.removeChild(grid.children[i])
                }
            }
            let loopAmount = parseInt(Math.ceil(grid.children.length / 3) * 3 - grid.children.length)
            for (let i = 0; i < loopAmount; i++) {
                const div = document.createElement("div")
                div.className = "first"
                grid.appendChild(div)
            }
        }
        if (grid.children.length <= maxPets) {
            grid.children[0].style.display = "flex"
        }
        insertValuesIntoCreateListingInterface()
    }
}

function completeListing() {
    var createListingInterface = document.getElementById("createListingInterface")
    var grid1 = createListingInterface.children[1].children[0].children[0]
    var grid2 = createListingInterface.children[1].children[0].children[2]
    var input1 = createListingInterface.children[1].children[1].children[0].children[0]
    var input2 = createListingInterface.children[1].children[1].children[2].children[0]
    var extraSharkValueRequested = 0
    if (input1.value != "") {
        extraSharkValueRequested = parseFloat(input1.value) * -1
    } else if (input2.value != "") {
        extraSharkValueRequested = parseFloat(input2.value)
    }
    var yourOffer = []
    for (let i = 0; i < grid1.children.length; i++) {
        let dict = grid1.children[i].getAttribute("data-dict")
        if (dict != null) {
            yourOffer.push(JSON.parse(dict))
        }   
    }
    var theirOffer = []
    for (let i = 0; i < grid2.children.length; i++) {
        let dict = grid2.children[i].getAttribute("data-dict")
        if (dict != null) {
            theirOffer.push(JSON.parse(dict))
        }   
    }

    formData = new FormData();
    formData.append('trade1', JSON.stringify(yourOffer))
    formData.append('trade2', JSON.stringify(theirOffer))
    formData.append('extraSharkValueRequested', extraSharkValueRequested.toString())
    formData.append('action', "createListing");

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
        closeCreateListingInterface()
        displayMessage("You created a listing!")
        userListings.push(data)
        document.getElementById("userListings").children[1].setAttribute("listingsLoaded", "0")
        document.getElementById("userListings").children[1].innerHTML = ""
        supplyContent(0)
    } else {
        displayError(data)
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });  
}

function openListingInterface2(listing) {
    document.getElementById("listingInterface2Background").style.display = ""
    showUserListings2(listing)
}
function closeListingInterface2() {
    document.getElementById("listingInterface2Background").style.display = "none"
    document.querySelector("html").style.overflowY = "auto";
}

function adjustGradientHeight() {

    let existingStyle = document.querySelector('#gradientHeightStyle');
    if (!existingStyle) {
        existingStyle = document.createElement('style');
        existingStyle.id = 'gradientHeightStyle';
        document.head.appendChild(existingStyle);
    }

    existingStyle.textContent = `
        #listingInterface2::before {
            height: 0px;
        }
    `;

    const contentHeight = listingInterface2.scrollHeight;

    existingStyle.textContent = `
        #listingInterface2::before {
            height: ${contentHeight}px;
        }
    `;
}

function showPreferences(listing) {
    formData = new FormData();
    formData.append('user', listing["owner"])
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
    if (data !== "ERROR") {
        const userData = data
        completedTradesByUser.innerText = userData["completedTrades"].length
        if (userData["preferences"]["highTiers"] == 1) {
            listingInterface2Preferences.children[0].style.fontWeight = "bold"
        } else {
            listingInterface2Preferences.children[0].style.fontWeight = "200"
        }
        if (userData["preferences"]["megaLegendaryPets"] == 1) {
            listingInterface2Preferences.children[2].style.fontWeight = "bold"
        } else {
            listingInterface2Preferences.children[2].style.fontWeight = "200"
        }
        if (userData["preferences"]["neonLegendaryPets"] == 1) {
            listingInterface2Preferences.children[4].style.fontWeight = "bold"
        } else {
            listingInterface2Preferences.children[4].style.fontWeight = "200"
        }
        if (userData["preferences"]["defaultLegendaryPets"] == 1) {
            listingInterface2Preferences.children[6].style.fontWeight = "bold"
        } else {
            listingInterface2Preferences.children[6].style.fontWeight = "200"
        }
        if (userData["preferences"]["preppyPets"] == 1) {
            listingInterface2Preferences.children[8].style.fontWeight = "bold"
        } else {
            listingInterface2Preferences.children[8].style.fontWeight = "200"
        }
        if (userData["preferences"]["randoms"] == 1) {
            listingInterface2Preferences.children[10].style.fontWeight = "bold"
        } else {
            listingInterface2Preferences.children[10].style.fontWeight = "200"
        }
        if (userData["preferences"]["items"] == 1) {
            listingInterface2Preferences.children[12].style.fontWeight = "bold"
        } else {
            listingInterface2Preferences.children[12].style.fontWeight = "200"
        }
        if (userData["preferences"]["allowUnderpays"] == 1) {
            listingInterface2Preferences.children[14].style.fontWeight = "bold"
        } else {
            listingInterface2Preferences.children[14].style.fontWeight = "200"
        }
    } else {
        
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    }); 
}


function showUserListings2(listing) {
    document.querySelector("html").style.overflowY = "hidden";
    currentListing = listing
    yourOfferExtraPets = []
    theirOfferExtraPets = []
    listingInterface2.style.display = "flex"
    listingInterface2Background = document.getElementById("listingInterface2Background")
    listingInterface2Background.style.display = "flex"
    showOffers(listing)
    showPreferences(listing)
    preventClosing = 1

    const listingInterface2Value = document.getElementById("listingInterface2Value")

    var giveValue = listing["offer"]["giveValue"].toFixed(2)
    var takeValue = listing["offer"]["takeValue"].toFixed(2)

    if (calculateWithValue == "frost") {
        giveValue = (giveValue / frostValue).toFixed(2)
        takeValue = (takeValue / frostValue).toFixed(2)
    }

    if (listing["extraSharkValueRequested"] == 0 || listing["extraSharkValueRequested"] == undefined) {
        yourOfferValue.innerText = giveValue
        theirOfferValue.innerText = takeValue
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
        listingCombinedValue = parseFloat((giveValue - takeValue + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets)).toFixed(2))
    } else if (listing["extraSharkValueRequested"] > 0) {
        yourOfferValue.innerText = giveValue.toString() + " + " + listing["extraSharkValueRequested"].toString()
        theirOfferValue.innerText = takeValue
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = listing["extraSharkValueRequested"].toFixed(2)
        youAddTheyAdd.innerText = "YOU ADD:"
        listingCombinedValue = parseFloat((giveValue - listing["offer"]["takeValue"] + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets) + (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets))).toFixed(2))
    } else if (listing["extraSharkValueRequested"] < 0) {
        yourOfferValue.innerText = giveValue
        theirOfferValue.innerText = takeValue.toString() + " + " + Math.abs(listing["extraSharkValueRequested"]).toString()
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = Math.abs(listing["extraSharkValueRequested"]).toFixed(2)
        youAddTheyAdd.innerText = "THEY ADD:"
        listingCombinedValue = parseFloat((giveValue - takeValue + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets) - (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets))).toFixed(2))
    }


    if (listingCombinedValue < 0) {
        listingCombinedValue = Math.abs(listingCombinedValue)
        listingInterface2Value.style.color = "rgb(253, 249, 234)"
    } else if (listingCombinedValue > 0) {
        listingInterface2Value.style.color = "rgb(255, 102, 102)"
    }
    if (listingCombinedValue >= 100) {
        listingCombinedValue = listingCombinedValue.toFixed(0)
    } else if (listingCombinedValue >= 10) {
        listingCombinedValue = listingCombinedValue.toFixed(1)
    }
    if (Math.abs(Math.round(listingCombinedValue) - listingCombinedValue) < 0.02) {
        listingInterface2Value.textContent = Math.round(listingCombinedValue)
    } else {
        listingInterface2Value.textContent = listingCombinedValue
    }

    if (loggedIn == "False") {
        finishButton.disabled = true
    }

    if (userData["id"] == listing["owner"]) {
        finishButton.disabled = true
    }

    timeAgoListed.innerText = timeSince(listing["createdAt"])
    totalOffers.innerText = listing["customOffers"].length

    listingInterface2YourOfferPets.innerHTML = ""
    for (const i in listing["offer"]["give"]) {
        const div = document.createElement("div")
        const img = document.createElement("img")
        img.src = petsDict[listing["offer"]["give"][i]["id"]]["image"]
        const div2 = document.createElement("div")
        if (listing["offer"]["give"][i]["fly"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["give"][i]["ride"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
            const p = document.createElement("p")
            p.innerText = "R"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["give"][i]["neon"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
            const p = document.createElement("p")
            p.innerText = "N"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["give"][i]["mega"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
            const p = document.createElement("p")
            p.innerText = "M"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        div.appendChild(img)
        div.appendChild(div2)

        listingInterface2YourOfferPets.appendChild(div)
    }

    listingInterface2TheirOfferPets.innerHTML = ""
    for (const i in listing["offer"]["take"]) {
        const div = document.createElement("div")
        const img = document.createElement("img")
        img.src = petsDict[listing["offer"]["take"][i]["id"]]["image"]
        const div2 = document.createElement("div")
        if (listing["offer"]["take"][i]["fly"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["take"][i]["ride"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
            const p = document.createElement("p")
            p.innerText = "R"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["take"][i]["neon"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
            const p = document.createElement("p")
            p.innerText = "N"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["take"][i]["mega"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
            const p = document.createElement("p")
            p.innerText = "M"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        div.appendChild(img)
        div.appendChild(div2)

        listingInterface2TheirOfferPets.appendChild(div)
    }

    adjustGradientHeight()

}

function showOffers(listing) {
    offers.innerHTML = ""
    for (const i in listing["customOffers"]) {
        const div = document.createElement("div")
        div.className = "offer"
        const div2 = document.createElement("div")

        for (const j in listing["offer"][listing["customOffers"][i]["type"]]) {
            const img = document.createElement("img")
            img.src = petsDict[listing["offer"][listing["customOffers"][i]["type"]][j]["id"]]["image"]
            const div4 = document.createElement("div")
            div4.appendChild(img)
            const div5 = document.createElement("div")
            if (listing["offer"][listing["customOffers"][i]["type"]][j]["fly"] == 1) {
                const div6 = document.createElement("div")
                div6.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
                const p = document.createElement("p")
                p.innerText = "F"
                div6.appendChild(p)
                div5.appendChild(div6)
            }
            if (listing["offer"][listing["customOffers"][i]["type"]][j]["ride"] == 1) {
                const div6 = document.createElement("div")
                div6.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
                const p = document.createElement("p")
                p.innerText = "R"
                div6.appendChild(p)
                div5.appendChild(div6)
            }
            if (listing["offer"][listing["customOffers"][i]["type"]][j]["neon"] == 1) {
                const div6 = document.createElement("div")
                div6.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
                const p = document.createElement("p")
                p.innerText = "N"
                div6.appendChild(p)
                div5.appendChild(div6)
            }
            if (listing["offer"][listing["customOffers"][i]["type"]][j]["mega"] == 1) {
                const div6 = document.createElement("div")
                const div5 = document.createElement("div")
                div5.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
                const p = document.createElement("p")
                p.innerText = "M"
                div6.appendChild(p)
                div5.appendChild(div6)
            }
            div4.appendChild(div5)
            div2.appendChild(div4)
        }

        for (const j in listing["customOffers"][i]["pets"]) {
            const img = document.createElement("img")
            img.src = petsDict[listing["customOffers"][i]["pets"][j]["id"]]["image"]
            const div4 = document.createElement("div")
            div4.appendChild(img)
            const div5 = document.createElement("div")
            if (listing["customOffers"][i]["pets"][j]["fly"] == 1) {
                const div6 = document.createElement("div")
                div6.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
                const p = document.createElement("p")
                p.innerText = "F"
                div6.appendChild(p)
                div5.appendChild(div6)
            }
            if (listing["customOffers"][i]["pets"][j]["ride"] == 1) {
                const div6 = document.createElement("div")
                div6.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
                const p = document.createElement("p")
                p.innerText = "R"
                div6.appendChild(p)
                div5.appendChild(div6)
            }
            if (listing["customOffers"][i]["pets"][j]["neon"] == 1) {
                const div6 = document.createElement("div")
                div6.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
                const p = document.createElement("p")
                p.innerText = "N"
                div6.appendChild(p)
                div5.appendChild(div6)
            }
            if (listing["customOffers"][i]["pets"][j]["mega"] == 1) {
                const div5 = document.createElement("div")
                div5.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
                const p = document.createElement("p")
                p.innerText = "M"
                div6.appendChild(p)
                div5.appendChild(div6)
            }
            div4.appendChild(div5)
            div2.appendChild(div4)
        }

        div.appendChild(div2)
        const div3 = document.createElement("div")

        const div7 = document.createElement("div")
        const p2 = document.createElement("p")
        p2.innerText = "SHARK VALUE"
        const p3 = document.createElement("p")
        p3.innerText = (parseInt(listing["customOffers"][i]["value"]).toFixed(1)).toString()
        div7.appendChild(p2)
        div7.appendChild(p3)
        div3.appendChild(div7)

        const div8 = document.createElement("div")
        const p4 = document.createElement("p")
        if (listing["customOffers"][i]["ownerUsername"] != "") {
            p4.innerText = listing["customOffers"][i]["ownerUsername"]
        } else {
            p4.innerText = listing["customOffers"][i]["ownerUsername"]
        }       
        const img2 = document.createElement("img")
        img2.src = "/static/images/profile/" + listing["customOffers"][i]["ownerProfilePicture"]
        div8.appendChild(p4)
        div8.appendChild(img2)
        div3.appendChild(div8)

        const div9 = document.createElement("div")
        const p5 = document.createElement("p")
        p5.innerText = timeSince(listing["customOffers"][i]["createdAt"])
        div9.appendChild(p5)
        div3.appendChild(div9)
    
        const div10 = document.createElement("div")
        const p6 = document.createElement("p")
        p6.innerText = listing["customOffers"][i]["status"]
        if (listing["customOffers"][i]["status"] == "Accepted") {
            p6.style.color = "rgb(0, 220, 0)"
        } else if (listing["customOffers"][i]["status"] == "Declined") {
            p6.style.color = "rgb(220, 0, 0)"
        }
        div10.appendChild(p6)
        div3.appendChild(div10)

        div.appendChild(div3)

        offers.appendChild(div)
        const line = document.createElement("div")
        line.className = "offerLine"
        if (i - 1 <= listing["customOffers"].length) {
            offers.appendChild(line)
        }


        if (listing["ownerUsername"] == userData["username"] && listing["acceptedAt"] == -1 && listing["customOffers"][i]["status"] == "Pending") {
            const div11 = document.createElement("div")
            const button1 = document.createElement("button")
            button1.setAttribute("onclick", "declineOffer(" + i.toString() + ")")
            const button2 = document.createElement("button")
            button2.setAttribute("onclick", "acceptOffer(" + i.toString() + ")")
            const p7 = document.createElement("p")
            p7.innerText = "Decline"
            const p8 = document.createElement("p")
            p8.innerText = "Accept"
            button1.appendChild(p7)
            button2.appendChild(p8)
            div11.appendChild(button1)
            div11.appendChild(button2)
            div.appendChild(div11)
        }

    }

    if (listing["customOffers"] == 0) {
        const div = document.createElement("div")
        const text = document.createElement("p")
        text.style.fontSize = "40rem"
        text.style.fontWeight = "700"
        text.style.margin = "0px"
        text.style.color = "rgb(109, 107, 112)"
        text.innerText = "There Are No Current Offers"
        div.appendChild(text)
        div.style.display = "flex"
        div.style.width = "100%"
        div.style.height = "200rem"
        div.style.justifyContent = "center"
        div.style.alignItems = "center"
        offers.appendChild(div)

    }

}

function updateListingInterface2() {
    showOffers(currentListing)
    var listing = currentListing
    listingInterface2YourOfferPets.innerHTML = ""
    for (const i in listing["offer"]["give"]) {
        const div = document.createElement("div")
        const img = document.createElement("img")
        img.src = petsDict[listing["offer"]["give"][i]["id"]]["image"]
        const div2 = document.createElement("div")
        if (listing["offer"]["give"][i]["fly"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["give"][i]["ride"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["give"][i]["neon"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["give"][i]["mega"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        div.appendChild(img)
        div.appendChild(div2)

        listingInterface2YourOfferPets.appendChild(div)
    }

    for (const i in yourOfferExtraPets) {
        const div = document.createElement("div")
        div.setAttribute("onclick", "removePetFromInventory('listingInterface2', " + i.toString() + ")")
        div.style.cursor = "pointer"
        div.style.border = "1px solid white"
        div.style.borderRadius = "1vw"
        const img = document.createElement("img")
        img.src = petsDict[yourOfferExtraPets[i]["id"]]["image"]
        const div2 = document.createElement("div")
        if (yourOfferExtraPets[i]["fly"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (yourOfferExtraPets[i]["ride"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (yourOfferExtraPets[i]["neon"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (yourOfferExtraPets[i]["mega"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        div.appendChild(img)
        div.appendChild(div2)

        listingInterface2YourOfferPets.appendChild(div)
    }

    listingInterface2TheirOfferPets.innerHTML = ""
    for (const i in listing["offer"]["take"]) {
        const div = document.createElement("div")
        const img = document.createElement("img")
        img.src = petsDict[listing["offer"]["take"][i]["id"]]["image"]
        const div2 = document.createElement("div")
        if (listing["offer"]["take"][i]["fly"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["take"][i]["ride"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["take"][i]["neon"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (listing["offer"]["take"][i]["mega"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        div.appendChild(img)
        div.appendChild(div2)

        listingInterface2TheirOfferPets.appendChild(div)
    }

    for (const i in theirOfferExtraPets) {
        const div = document.createElement("div")
        div.setAttribute("onclick", "removePetFromInventory('listingInterface2', " + i.toString() + ")")
        div.style.cursor = "pointer"
        div.style.border = "1px solid white"
        div.style.borderRadius = "1vw"
        const img = document.createElement("img")
        img.src = petsDict[theirOfferExtraPets[i]["id"]]["image"]
        const div2 = document.createElement("div")
        if (theirOfferExtraPets[i]["fly"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (theirOfferExtraPets[i]["ride"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (theirOfferExtraPets[i]["neon"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        if (theirOfferExtraPets[i]["mega"] == 1) {
            const div3 = document.createElement("div")
            div3.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
            const p = document.createElement("p")
            p.innerText = "F"
            div3.appendChild(p)
            div2.appendChild(div3)
        }
        div.appendChild(img)
        div.appendChild(div2)

        listingInterface2TheirOfferPets.appendChild(div)
    }

    const listingInterface2Value = document.getElementById("listingInterface2Value")
    var listingCombinedValue = 0

    var giveValue = listing["offer"]["giveValue"].toFixed(2)
    var takeValue = listing["offer"]["takeValue"].toFixed(2)

    if (calculateWithValue == "frost") {
        giveValue = (giveValue / frostValue).toFixed(2)
        takeValue = (takeValue / frostValue).toFixed(2)
    }

    if (listing["extraSharkValueRequested"] == 0 || listing["extraSharkValueRequested"] == undefined) {
        yourOfferValue.innerText = parseFloat(giveValue + calculateValue(yourOfferExtraPets)).toFixed(2)
        theirOfferValue.innerText = parseFloat(takeValue + calculateValue(theirOfferExtraPets)).toFixed(2)
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
        listingCombinedValue = parseFloat((giveValue - takeValue + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets)).toFixed(2))
    } else if (listing["extraSharkValueRequested"] > 0 && calculateValue(yourOfferExtraPets) < listing["extraSharkValueRequested"]) {
        yourOfferValue.innerText = parseFloat(giveValue + calculateValue(yourOfferExtraPets)).toFixed(2).toString() + " + " + (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets)).toFixed(2).toString()
        theirOfferValue.innerText = takeValue
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets)).toFixed(2)
        listingCombinedValue = parseFloat((giveValue - takeValue + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets) + (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets))).toFixed(2))
    } else if (listing["extraSharkValueRequested"] < 0 && calculateValue(theirOfferExtraPets) < Math.abs(listing["extraSharkValueRequested"])) {
        yourOfferValue.innerText = giveValue
        theirOfferValue.innerText = parseFloat(takeValue + calculateValue(theirOfferExtraPets)).toFixed(2).toString() + " + " + (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets)).toFixed(2).toString()
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets)).toFixed(2)
        listingCombinedValue = parseFloat((giveValue - takeValue + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets) - (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets))).toFixed(2))
    } else {
        yourOfferValue.innerText = parseFloat(giveValue + calculateValue(yourOfferExtraPets)).toFixed(2)
        theirOfferValue.innerText = parseFloat(takeValue + calculateValue(theirOfferExtraPets)).toFixed(2)
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
        listingCombinedValue = parseFloat((giveValue - takeValue + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets)).toFixed(2))
    }

    if (listingCombinedValue < 0) {
        listingCombinedValue = Math.abs(listingCombinedValue)
        listingInterface2Value.style.color = "rgb(253, 249, 234)"
    } else if (listingCombinedValue > 0) {
        listingInterface2Value.style.color = "rgb(255, 102, 102)"
    }
    if (listingCombinedValue >= 100) {
        listingCombinedValue = listingCombinedValue.toFixed(0)
    } else if (listingCombinedValue >= 10) {
        listingCombinedValue = listingCombinedValue.toFixed(1)
    }
    if (calculateWithValue == "shark") {
        if (Math.abs(Math.round(listingCombinedValue) - listingCombinedValue) < 0.02) {
            listingInterface2Value.textContent = Math.round(listingCombinedValue)
        } else {
            listingInterface2Value.textContent = listingCombinedValue
        }
    } else {
        if (Math.abs(Math.round(listingCombinedValue / frostValue) - listingCombinedValue / frostValue) < 0.02) {
            listingInterface2Value.textContent = Math.round(listingCombinedValue / frostValue)
        } else {
            listingInterface2Value.textContent = (listingCombinedValue / frostValue).toFixed(2)
        }
    }

    if (userData["id"] == listing["owner"]) {
        finishButton.disabled = true
    }

    if (loggedIn == "False") {
        finishButton.disabled = true
    }

}

function sendOffer() {
    formData = new FormData();
    formData.append('id', currentListing["id"])
    formData.append('action', "sendOffer");
    if (currentListing["extraSharkValueRequested"] == 0 || currentListing["extraSharkValueRequested"] > 0) {
        var pets = currentListing["offer"]["give"]
        var type = "give"
        formData.append('pets', JSON.stringify(yourOfferExtraPets));
    } else {
        var pets = currentListing["offer"]["take"]
        var type = "take"
        formData.append('pets', JSON.stringify(theirOfferExtraPets));
    }
    

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
        displayMessage("You successfully sent an offer!")
        const listingDiv = document.querySelector(`div.userListingsListing[data-key="${currentListing["id"]}"]`)
        if (listingDiv) {
            const onClick = listingDiv.getAttribute('onclick');
            var extractedValue = onClick.slice(18, -1).trim();
            if (type == "give") {
                pets = yourOfferExtraPets
            } else {
                pets = theirOfferExtraPets
            }
            extractedValue = JSON.parse(extractedValue)
            extractedValue["customOffers"].push({
                "id":parseInt(extractedValue["customOffers"].length),
                "pets":pets,
                "type":type,
                "value":calculateValue(pets),
                "owner":userData["id"],
                "ownerProfilePicture":userData["profilePicture"],
                "ownerUsername":userData["username"],
                "ownerRobloxUsername":userData["robloxUsername"],
                "createdAt":Math.floor(Date.now() / 1000),
                "status":"Pending"
            })
            listingDiv.setAttribute("onclick", "showUserListings2(" + JSON.stringify(extractedValue) + ")")
            currentListing = extractedValue




        }
    } else {
        displayError("Something went wrong with your offer!")
    }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function declineOffer(event, listingID, offerID) {
    formData = new FormData();
    formData.append('id', listingID)
    formData.append('offerID', offerID)
    formData.append('action', "declineOffer");  

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
        displayMessage("You successfully declined an offer!")

        var userListingID = 0

        for (let i = 0; i < userListings.length; i++) {
            if (userListings[i]["id"] == listingID) {
                userListingID = i
                break
            }
        }

        var listing = userListings[userListingID]
        var offer = listing["customOffers"][offerID]
        offer["status"] = "Declined"

        var listingDiv = event.target.parentElement.parentElement
        var userInboxDiv = listingDiv.parentElement
        userInboxDiv.removeChild(listingDiv)
    } else {
        displayError("Something went wrong!")
    }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function acceptOffer(event, listingID, offerID) {
    formData = new FormData();
    formData.append('id', listingID)
    formData.append('offerID', offerID)
    formData.append('action', "acceptOffer");   

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
        displayMessage("You successfully accepted an offer!")

        var userListingID = 0

        for (let i = 0; i < userPending.length; i++) {
            if (userPending[i]["id"] == listingID) {
                userListingID = i
                break
            }
        }

        var listing = userPending[userListingID]
        var offer = listing["customOffers"][offerID]
        offer["status"] = "Accepted"
        listing["acceptedUser"] = offer["owner"]
        listing["acceptedUserUsername"] = offer["ownerUsername"]
        listing["acceptedUserRobloxUsername"] = offer["ownerRobloxUsername"]
        listing["acceptedAt"] = Date.now()
        listing["acceptedOfferID"] = offerID
        userData["pending"].push([listingID, offerID])

        var listingDiv = event.target.parentElement.parentElement
        var userInboxDiv = listingDiv.parentElement
        userInboxDiv.removeChild(listingDiv)

        document.getElementById("userPending").children[1].classList.add("notEmpty")
        document.getElementById("userPending").children[1].innerHTML = ""
        document.getElementById("userPending").children[1].setAttribute("listingsLoaded", "0")
        loadPendingInto(userPending, document.getElementById("userPending").children[1], 0, 20)


    } else {
        displayError("Something went wrong!")
    }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}





window.addEventListener("click", event => {
    const rect = listingInterface2.getBoundingClientRect()
    if (rect.width > 0 && preventClosing == 0) {
        if ((rect.x < event.clientX && event.clientX < rect.x + rect.width && rect.y < event.clientY && event.clientY < rect.y + rect.height) == false) {
            closeListingInterface2()
        }
    } else {
        preventClosing = 0
    }
})

function enableScrolling() {
    document.body.style.overflow = '';
    document.removeEventListener('wheel', preventBodyScroll, { passive: false });
}

function disableScrolling() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('wheel', preventBodyScroll, { passive: false });
}

function preventBodyScroll(event) {
    const target = event.target;
    const petImagesElement = document.getElementById('petImages');

    const isInsidePetImages = petImagesElement && (petImagesElement.contains(target) || target === petImagesElement);
    const isInsideListingInterface2 = listingInterface2 && (listingInterface2.contains(target) || target === listingInterface2);

    if (!isInsidePetImages && !isInsideListingInterface2) {
        event.preventDefault();
        event.stopPropagation();
    }
}   


function block() {
    formData = new FormData();
    formData.append('ID', (profileID).toString())
    formData.append('action', "block");

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
        if (blockButton !== undefined) {
            blockButton.innerText = "User blocked!"
        }
        displayMessage("You blocked " + profileData["username"] + "!")
        userData["blocked"].push(profileID)
        userData["friendRequests"]["sent"] = userData["friendRequests"]["sent"].filter(item => item != profileID.toString())
        userData["friends"] = userData["friends"].filter(item => item != profileID)
        updateRightMenu()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function unblock() {
    formData = new FormData();
    formData.append('ID', (profileID).toString())
    formData.append('action', "unblock");

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
        if (blockButton !== undefined) {
            blockButton.innerText = "User unblocked!"
        }
        displayMessage("You unblocked " + profileData["username"] + "!")
        userData["blocked"] = userData["blocked"].filter(item => item != profileID.toString())
        updateRightMenu()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function exitImportantMessage() {
    var importantMessage = document.getElementById("importantMessage")
    var closeImportantMessageBackground = document.getElementById("closeImportantMessage")
    if (closeImportantMessageBackground != undefined) {
        importantMessage.style.display = "none"
        closeImportantMessageBackground.style.display = "none"
    }
    console.log("Hi")
}


function displayImportantMessage(event, title, text, button1Name, button1Function, button2Name, button2Function) {
    var importantMessage = document.getElementById("importantMessage")
    var closeImportantMessageBackground = document.getElementById("closeImportantMessage")
    importantMessage.style.display = "flex"
    closeImportantMessageBackground.style.display = "flex"
    importantMessage.children[0].children[0].children[1].innerHTML = title
    importantMessage.children[0].children[1].children[0].innerHTML = text
    importantMessage.children[1].children[0].children[0].innerHTML = button1Name
    importantMessage.children[1].children[0].children[0].setAttribute("onclick", `exitImportantMessage();${button1Function}`)
    importantMessage.children[1].children[0].children[1].innerHTML = button2Name
    importantMessage.children[1].children[0].children[1].setAttribute("onclick", `exitImportantMessage();${button2Function}`)
    importantMessageEvent = event
}

function completeTradeWithKey(key, i) {


    formData = new FormData();
    formData.append('key', JSON.stringify(key))
    formData.append('action', "completeTradeWithKey");

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
        const button = importantMessageEvent.target
        button.innerText = "Complete"
        button.disabled = true
        button.setAttribute("onclick", "")

        if (1 == 2) {

        }
    }
    console.log(data)
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

window.addEventListener("load", () => {
    if (sessionStorage.getItem("createListing") == "true") {
        sessionStorage.removeItem("createListing")
        displayMessage("You created a listing!")
    }
})