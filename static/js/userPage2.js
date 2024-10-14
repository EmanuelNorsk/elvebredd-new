const path = window.location.pathname;
const pathParts = path.split("/");
const profileID = pathParts[pathParts.length - 1];
var userData = {};
loggedIn = false;
var petsDict = {}

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

var formData = new FormData();
formData.append('action', "getPets");

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
        petsDict = data
    } else {
        displayError("ERROR")
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
        })


    } else {
        inv.children[0].children[0].style.display = "flex"
        inv.children[0].children[1].style.display = "none"
        if (inv.children[1].children[0] != undefined) {
            inv.children[1].children[0].style.display = "none"
        }
        [...inv.children[1].children].forEach(pet => {
            pet.classList.remove("enabled")
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
        })
    } else {
        wl.children[0].children[0].style.display = "flex"
        wl.children[0].children[1].style.display = "none"
        if (wl.children[1].children[0] != undefined) {
            wl.children[1].children[0].style.display = "none"
        }
        [...wl.children[1].children].forEach(pet => {
            pet.classList.remove("enabled")
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
    var categoryButtons = document.querySelectorAll(".categoryButton")
    if (event.target == undefined) {
        category = event
    } else {
        category = event.target.textContent
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
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

async function loadCategories() {

    var userListings = []

    var userHistory = []

    formData = new FormData();
    formData.append('ID', profileID);
    formData.append('action', "getUserListings");

    const fetchUserListings = fetch('/api', {
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
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    formData = new FormData();
    formData.append('ID', profileID);
    formData.append('action', "getUserHistory");

    const fetchUserHistory = fetch('/api', {
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
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    
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
            loadListingsInto(userListings, document.getElementById("userListings").children[1])
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
            displayPets(convertDictsToSets(profileData["inventory"]), document.getElementById("userInventory").children[1], "inventory")
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
            displayPets(convertDictsToSets(profileData["wishlist"]), document.getElementById("userWishlist").children[1], "wishlist")
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
            document.getElementById("userInbox").children[1].classList.add("notEmpty")
            loadInboxInto(userListings, document.getElementById("userInbox").children[1])
        }

        if (userListings.length == 0) {
            document.getElementById("userPending").children[1].classList.remove("notEmpty")
            const p = document.createElement("p")
            if (userData["id"] == profileID) {
                p.innerHTML = "You have no active trades ongoing, click <a>here</a> for information."
            } else {
                p.innerText = "You can't see this person's pending trades!"
            }
            document.getElementById("userPending").children[1].appendChild(p)
        } else {
            document.getElementById("userPending").children[1].classList.add("notEmpty")
            loadPendingInto(userListings, document.getElementById("userPending").children[1])
        }

        if (userHistory.length == 0) {
            document.getElementById("userHistory").children[1].classList.remove("notEmpty")
            const p = document.createElement("p")
            if (userData["id"] == profileID) {
                p.innerHTML = "You have not trades in your history, click <a>here</a> for information."
            } else {
                p.innerText = "This person has no completed any trades yet."
            }
            document.getElementById("userHistory").children[1].appendChild(p)
        } else {
            document.getElementById("userHistory").children[1].classList.add("notEmpty")
            loadHistoryInto(userHistory, document.getElementById("userHistory").children[1])
        }
    });


}

function createInventoryPet(pet) {
    const div = document.createElement("div")
    div.classList.add("inventoryPetDiv")
    const img = document.createElement("img")
    if (typeof pet == "object") {
        img.src = petsDict[pet["id"]]["image"]
        const p = document.createElement("p")
        p.innerText = pet["amount"]
        div.appendChild(img)
        if (pet["amount"] > 1) {
            div.appendChild(p)
        }
        const div2 = document.createElement("div")
        const fly  = document.createElement("div");  fly.innerText = "F";  fly.classList.add("flyDiv");  if (pet["fly"] == 0)  { fly.style.display = "none"}; div2.appendChild(fly)
        const ride = document.createElement("div"); ride.innerText = "R"; ride.classList.add("rideDiv"); if (pet["ride"] == 0) {ride.style.display = "none"}; div2.appendChild(ride)
        const neon = document.createElement("div"); neon.innerText = "N"; neon.classList.add("neonDiv"); if (pet["neon"] == 0) {neon.style.display = "none"}; div2.appendChild(neon)
        const mega = document.createElement("div"); mega.innerText = "M"; mega.classList.add("megaDiv"); if (pet["mega"] == 0) {mega.style.display = "none"}; div2.appendChild(mega)


        div.appendChild(div2)

    } else if (typeof pet == "string") {
        img.src = "/static/images/misc/add.png"
        div.appendChild(img)
        div.style.display = "none"
        div.style.border = "none"
        div.style.filter = "brightness(0.4)"
        div.setAttribute("add", "true")
    }
    return div

}

function displayPets(set, target, type) {
    target.appendChild(createInventoryPet(type))
    set.forEach(pet => {
        target.appendChild(createInventoryPet(pet))
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

async function loadListingsInto(listings, target) {
    target.innerHTML = ""
    var listing = ""
    for (let i = 0; i < Object.values(listings).length; i++) {
        listing = Object.values(listings)[i]
        let listingTemplate = createListingTemplate()
        let value1 = calculateValue(listing["offer"]["give"]) + listing["extraSharkValueRequested"]
        let value2 = calculateValue(listing["offer"]["take"])
        var combinedValue = parseFloat(Math.abs(value1 - value2).toFixed(2))
        if (Math.abs(Math.round(combinedValue) - combinedValue) < 0.02 || combinedValue > 100) {
            combinedValue = Math.round(combinedValue)
        }
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
        const outOfBounds = checkOutOfBoundsListing(listingTemplate)
        const figures = listingTemplate.querySelectorAll("figure")
        if (outOfBounds.includes("left")) {
            listingTemplate.classList.add("listingsFilter")
            listingTemplate.setAttribute("onclick", 'scrollListings(event, "left")')
            listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
            figures.forEach(figure => {
                figure.style.display = "flex"
            })
        } else if (outOfBounds.includes("right")) {
            listingTemplate.classList.add("listingsFilter")
            listingTemplate.setAttribute("onclick", 'scrollListings(event, "right")')
            listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
            figures.forEach(figure => {
                figure.style.display = "flex"
            })
        } else {
            listingTemplate.setAttribute("onclick", `showUserListings2(${JSON.stringify(listing)})`)
            listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
            figures.forEach(figure => {
                figure.style.display = "none"
            })
        }

        await delay(0.1)
    }
}

async function loadInboxInto(listings, target) {
    target.innerHTML = ""
    var listing = ""
    for (let c = 0; c < Object.values(listings).length; c++) {
        listing = Object.values(listings)[c]
        for (let j = 0; j < listing["customOffers"].length; j++) {
            if (listing["customOffers"][j]["status"] == "Pending") {
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
                b1.setAttribute("onclick", "")
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
                wrapper.appendChild(sideMenu)
                wrapper.className = "listingWrapper"
                target.appendChild(wrapper)
                
            }
        }
        await delay(0.1)
    }
}

async function loadPendingInto(listings, target) {
    target.innerHTML = ""
    var listing = ""
    for (let c = 0; c < Object.values(listings).length; c++) {
        listing = Object.values(listings)[c]
        for (let j = 0; j < listing["customOffers"].length; j++) {
            if (listing["customOffers"][j]["status"] == "Accepted") {
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
                b1.setAttribute("onclick", "")
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
                wrapper.appendChild(sideMenu)
                wrapper.className = "listingWrapper"
                target.appendChild(wrapper)
            }
        }
        await delay(0.1)
    }
}

async function loadHistoryInto(listings, target) {
    target.innerHTML = ""
    var listing = ""
    for (let c = 0; c < Object.values(listings).length; c++) {
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
        wrapper.appendChild(sideMenu)
        wrapper.className = "listingWrapper"
        target.appendChild(wrapper)
        await delay(0.1)
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

        if (petsDict[listOfPets[i]["id"]][keyword] == undefined) {
            if (petsDict[listOfPets[i]["id"]]["value"] != null) {
                value += petsDict[listOfPets[i]["id"]]["value"]
            }
        } else {
            value += petsDict[listOfPets[i]["id"]][keyword]
        }
    }
    return value
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