var fly = 0
var ride = 0
var regular = 1
var neon = 0
var mega = 0
var lastFilter = "all"
var petsAdded = 0
var calculateWithValue = "shark"
var frostWorth = 1 / 105
var filteredPets = 0
var addPetType = "inventory"
var tradePart1 = []
var tradePart2 = []
var offerAccepted = false
var mYO = 0
var mTO = 0
var currentListing = 0
let mouseX = 0;
let mouseY = 0;
var more = 0
var friendData = ""
var currentFriendSelected = ""
var pendingData = ""
var displayPetsFirstTime = 0
var loggedIn = false
var userID = "0"
var profileID = "0"
var maxPets = 18
var body = document.createElement("div")
var remainingScroll = 0.00


var tradePart1Element = document.createElement("div")
var tradePart2Element = document.createElement("div")



var userData = {}
var petsDict = {}
var profileDataDict = {}
var tradeArrow = document.createElement("div")
var tradeValue = document.createElement("div")

var flyButton = document.createElement("div")
var rideButton = document.createElement("div")
var regularButton = document.createElement("div")
var neonButton = document.createElement("div")
var megaButton = document.createElement("div")

var petImage = document.createElement("div")

window.addEventListener("DOMContentLoaded", function() {
    var loggedInElement = document.getElementById("loggedIn-data")
    loggedIn = loggedInElement.textContent.toString()
    var userIDElement = document.getElementById("userID-data")
    userID = userIDElement.textContent.toString()
    var profileIDElement = document.getElementById("profileID-data")
    profileID = profileIDElement.textContent.toString()

    var friendsBackground = document.getElementById("friendsBackground")
    var friendsMenu = document.getElementById("friendsMenu")
    var helpBackground = document.getElementById("helpBackground")
    var helpMenu = document.getElementById("helpMenu")

    var petsDictElement = document.getElementById("petsDict-data")
    petsDict = JSON.parse(petsDictElement.textContent)

    var profileListingsElement = document.getElementById("profileListings-data")
    var profileListings = JSON.parse(profileListingsElement.textContent)
    var userListings = document.getElementById("userListings")
    var userWishlist = document.getElementById("userWishlist")
    var userInbox = document.getElementById("userInbox")
    var userPending = document.getElementById("userPending")
    var userHistory = document.getElementById("userHistory")

    var userDataElement = document.getElementById("userData-data")
    userData = JSON.parse(userDataElement.textContent)
    
    var profileDataDictElement = document.getElementById("profileDataDict-data")
    profileDataDict = JSON.parse(profileDataDictElement.textContent)

    petImage = document.querySelectorAll(".petImage")

    flyButton = document.getElementById("flyButton")
    rideButton = document.getElementById("rideButton")
    regularButton = document.getElementById("regularButton")
    neonButton = document.getElementById("neonButton")
    megaButton = document.getElementById("megaButton")

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

    var petSearch = document.getElementById("petSearch")

    var addInventory = document.getElementById("addInventory")
    var addInventoryBackground = document.getElementById("addInventoryBackground")

    var filterElement = document.getElementById("filter")
    var petImages = document.getElementById("petImages")
    var filterButtons = document.getElementById("filterButtons")

    var petAdded = document.getElementById("petAdded")
    var petAddedText = document.getElementById("petAddedText")

    var friendButton = document.getElementById("friendButton")

    var inventoryLength = document.getElementById("inventoryLength")

    var userInventory = document.getElementById("userInventory")

    var sharkFrostButtonSelected = document.querySelectorAll(".buttonSelected")
    tradePart1Element = document.getElementById("tradePart1")
    tradePart2Element = document.getElementById("tradePart2")

    var listingInterface = document.getElementById("listingInterface")
    var listingInterfaceBackground = document.getElementById("listingInterfaceBackground")

    tradeValue = document.getElementById("differenceInValueText")
    tradeArrow = document.getElementById("differenceInValue")

    var yourScore = document.getElementById("yourScore")
    var yourScore2 = document.getElementById("yourScore2")
    var theirScore = document.getElementById("theirScore")
    var theirScore2 = document.getElementById("theirScore2")

    var listingAmount = document.getElementById("listingAmount")

    var errorDiv = document.getElementById("errorDiv")
    var errorText = document.getElementById("errorText")

    var tradeBar = document.getElementById("tradeBar")

    var listingsButton = document.getElementById("listingsButton")
    var inventoryButton = document.getElementById("inventoryButton")
    var wishlistButton = document.getElementById("wishlistButton")
    var historyButton = document.getElementById("historyButton")

    var modifyTrade = -1
    var modifyListing = document.getElementById("modifyListing")
    var noModifyListing = document.getElementById("noModifyListing")

    var listingInterface2 = document.getElementById("listingInterface2")
    var listingInterface2Background = document.getElementById("listingInterface2Background")

    var listingPart1 = document.getElementById("listingPart1")
    var listingPart2 = document.getElementById("listingPart2")

    var owner = document.getElementById("owner")

    var listingValue = document.getElementById("listingValue")

    var modifyTheirOfferElement = document.getElementById("modifyTheirOffer")
    var modifyYourOfferElement = document.getElementById("modifyYourOffer")

    var listingAcceptButton = document.getElementById("listingAcceptButton")
    var listingCustomOfferButton = document.getElementById("listingCustomOfferButton")

    var friendsDiv = document.getElementById("friendsDiv")
    var pendingDiv = document.getElementById("pendingDiv")
    var blockedDiv = document.getElementById("blockedDiv")


    var friendMoreOptions = document.getElementById("friendMoreOptions")

    var blockButton = document.getElementById("blockButton")

    var verified = document.getElementById("verified")
    body = document.body

    listingInterface2Background.addEventListener("wheel", event => {
        if (remainingScroll * event.deltaY < 0) {
            remainingScroll = 0
        }
        remainingScroll += event.deltaY * scrollStrength
        if (scrolling == false) {
            scroll()
        }
    })

    document.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    if (userID == profileID) {
        var inboxButton = document.getElementById("inboxButton")
        var pendingButton = document.getElementById("pendingButton")
    }

    window.addEventListener("resize", (event) => {
        sharkFrostButtonSelected.forEach((button) => {
            button.style.transition = "0s ease"
        })
        setTimeout((event) => {
            sharkFrostButtonSelected.forEach((button) => {
                button.style.transition = "0.33s ease-in-out"
            })
        }, 100)
    })

    showTradePets()
    showWishlistPets()
    showUserListings(profileListings, userListings)
    selectCategoryUser("inventory")

    calculateTradeValue()

    showInventoryPets()

    closeFriends()
    closeHelp()
    showFriends()
    displayPending()
    displayBlocked()
    showInbox()
    //showPendingDiv()
    showHistoryDiv()

});

function enableScrolling() {
    body.style.overflow = '';
    document.removeEventListener('wheel', preventBodyScroll, { passive: false });
}

function disableScrolling() {
    body.style.overflow = 'hidden';
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

function modifyYourOffer() {
    if ( mYO == 0) {
        mYO = 1
        modifyYourOfferElement.style.border = "1px solid white"
        showUserListings2(currentListing, "left")
    } else {
        mYO = 0
        modifyYourOfferElement.style.border = "1px solid black"
        showUserListings2(currentListing, "left")
    }
}

function modifyTheirOffer() {
    if ( mTO == 0) {
        mTO = 1
        modifyTheirOfferElement.style.border = "1px solid white"
        showUserListings2(currentListing, "right")
    } else {
        mTO = 0
        modifyTheirOfferElement.style.border = "1px solid black"
        showUserListings2(currentListing, "right")
    }
}

function selectSharkButton() {
    sharkFrostButtonSelected.forEach((button) => {
        button.style.left = "0%"
    })
    calculateWithValue = "shark"
    calculateTradeValue()
    showUserListings(profileListings, userListings)
}

function selectFrostButton() {
    sharkFrostButtonSelected.forEach((button) => {
        button.style.left = "47%"
    })
    calculateWithValue = "frost"
    calculateTradeValue()
    showUserListings(profileListings, userListings)
}

function updateButtons() {
    flyButton.style.filter = "saturate(" + fly.toString() +")"
    rideButton.style.filter = "saturate(" + ride.toString() +")"
    regularButton.style.filter = "saturate(" + regular.toString() +")"
    neonButton.style.filter = "saturate(" + neon.toString() +")"
    megaButton.style.filter = "saturate(" + mega.toString() +")"
}

updateButtons()

function openFriends() {
    friendsMenu.style.display = "flex";
    friendsBackground.style.display = "block"
    document.getElementById("profileMenu").style.display = "none"
};

function closeFriends() {
    friendsMenu.style.display = "none";
    friendsBackground.style.display = "none"
}

function openHelp() {
    helpMenu.style.display = "flex";
    helpBackground.style.display = "block"
    document.getElementById("profileMenu").style.display = "none"
};

function closeHelp() {
    helpMenu.style.display = "none";
    helpBackground.style.display = "none"
}

function handleImageError(image) {
    image.style.display = 'none';
}

function setAddPetTypeTo(type) {
    addPetType = type
}

function showTradePets() {
    tradePart1Element.innerHTML = ""
    tradePart2Element.innerHTML = ""
    for (const i in tradePart1) {
        const div = document.createElement("div")
        div.className = 'tradePet trade1'
        div.setAttribute('onclick', 'removePetFromInventory("trade1", ' + i.toString() + ')')
        div.style.position = "relative";
        div.style.cursor = "pointer"
        div.style.display = "flex"
        div.style.justifyContent = "center"
        div.style.alignItems = "center"
        const img = document.createElement("img")
        img.src = petsDict[tradePart1[i].id].image
        img.style.height = "max(3.8vw, 7.6vh)"
        img.style.width = "max(3.8vw, 7.6vh)"
        div.appendChild(img)

        const attributesDiv = document.createElement("div")
            attributesDiv.style.padding = "0px"
            attributesDiv.style.position = "absolute"
            attributesDiv.style.display = "flex"
            attributesDiv.style.alignItems = "center"
            attributesDiv.style.bottom = "4px"
            attributesDiv.style.left = "4px"
            attributesDiv.style.gap = "2px"

            var attribute = ""

        if (tradePart1[i]["fly"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "flyButton")
                attribute.style.height = "max(1vw, 2vh)"
                attribute.style.width = "max(1vw, 2vh)"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "4px"
                text = document.createElement("b")
                text.innerHTML = "F"
                text.style.color = "white"
                text.style.fontSize = "max(0.6vw, 1.2vh)"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (tradePart1[i]["ride"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "rideButton")
                attribute.style.height = "max(1vw, 2vh)"
                attribute.style.width = "max(1vw, 2vh)"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "4px"
                text = document.createElement("b")
                text.innerHTML = "R"
                text.style.color = "white"
                text.style.fontSize = "max(0.6vw, 1.2vh)"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (tradePart1[i]["neon"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "neonButton")
                attribute.style.height = "max(1vw, 2vh)"
                attribute.style.width = "max(1vw, 2vh)"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "4px"
                text = document.createElement("b")
                text.innerHTML = "N"
                text.style.color = "white"
                text.style.fontSize = "max(0.6vw, 1.2vh)"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (tradePart1[i]["mega"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "megaButton")
                attribute.style.height = "max(1vw, 2vh)"
                attribute.style.width = "max(1vw, 2vh)"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "4px"
                text = document.createElement("b")
                text.innerHTML = "M"
                text.style.color = "white"
                text.style.fontSize = "max(0.6vw, 1.2vh)"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            div.appendChild(img)
            div.appendChild(attributesDiv)
            tradePart1Element.appendChild(div)
    }
    for (const i in tradePart2) {
        const div = document.createElement("div")
        div.className = 'tradePet trade2'
        div.setAttribute('onclick', 'removePetFromInventory("trade2", ' + i.toString() + ')')
        div.style.position = "relative";
        div.style.cursor = "pointer"
        div.style.display = "flex"
        div.style.justifyContent = "center"
        div.style.alignItems = "center"
        const img = document.createElement("img")
        img.src = petsDict[tradePart2[i].id].image
        img.style.height = "max(3.8vw, 7.6vh)"
        img.style.width = "max(3.8vw, 7.6vh)"
        div.appendChild(img)

        const attributesDiv = document.createElement("div")
            attributesDiv.style.padding = "0px"
            attributesDiv.style.position = "absolute"
            attributesDiv.style.display = "flex"
            attributesDiv.style.alignItems = "center"
            attributesDiv.style.bottom = "4px"
            attributesDiv.style.left = "4px"
            attributesDiv.style.gap = "2px"

            var attribute = ""

        if (tradePart2[i]["fly"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "flyButton")
                attribute.style.height = "max(1vw, 2vh)"
                attribute.style.width = "max(1vw, 2vh)"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "4px"
                text = document.createElement("b")
                text.innerHTML = "F"
                text.style.color = "white"
                text.style.fontSize = "max(0.6vw, 1.2vh)"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (tradePart2[i]["ride"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "rideButton")
                attribute.style.height = "max(1vw, 2vh)"
                attribute.style.width = "max(1vw, 2vh)"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "4px"
                text = document.createElement("b")
                text.innerHTML = "R"
                text.style.color = "white"
                text.style.fontSize = "max(0.6vw, 1.2vh)"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (tradePart2[i]["neon"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "neonButton")
                attribute.style.height = "max(1vw, 2vh)"
                attribute.style.width = "max(1vw, 2vh)"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "4px"
                text = document.createElement("b")
                text.innerHTML = "N"
                text.style.color = "white"
                text.style.fontSize = "max(0.6vw, 1.2vh)"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (tradePart2[i]["mega"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "megaButton")
                attribute.style.height = "max(1vw, 2vh)"
                attribute.style.width = "max(1vw, 2vh)"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "4px"
                text = document.createElement("b")
                text.innerHTML = "M"
                text.style.color = "white"
                text.style.fontSize = "max(0.6vw, 1.2vh)"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            div.appendChild(img)
            div.appendChild(attributesDiv)
            tradePart2Element.appendChild(div)
    }

    const addPet = document.createElement("div")
    addPet.className = 'tradePet trade1'
    addPet.setAttribute('onclick', 'setAddPetTypeTo("trade1"); openInventory();')
    addPet.style.position = "relative";
    addPet.style.display = "flex"
    addPet.style.justifyContent = "center"
    addPet.style.alignItems = "center"
    addPet.style.cursor = "pointer"
    const petimg = document.createElement("img")
    petimg.src = "../static/images/misc/add.png"
    petimg.style.height = "max(3.2vw, 6.4vh)"
    petimg.style.width = "max(3.2vw, 6.4vh)"
    addPet.appendChild(petimg)
    tradePart1Element.appendChild(addPet)

    const addPet2 = document.createElement("div")
    addPet2.className = 'tradePet trade2'
    addPet2.setAttribute('onclick', 'setAddPetTypeTo("trade2"); openInventory();')
    addPet2.style.position = "relative";
    addPet2.style.display = "flex"
    addPet2.style.justifyContent = "center"
    addPet2.style.alignItems = "center"
    addPet2.style.cursor = "pointer"
    const petimg2 = document.createElement("img")
    petimg2.src = "../static/images/misc/add.png"
    petimg2.style.height = "max(3.2vw, 6.4vh)"
    petimg2.style.width = "max(3.2vw, 6.4vh)"
    addPet2.appendChild(petimg2)
    tradePart2Element.appendChild(addPet2)


    trade1 = document.querySelectorAll(".trade1")
    trade2 = document.querySelectorAll(".trade2")

    for (i = trade1.length; i < 9 || i % 3 !== 0; i++) {
        const div = document.createElement("div")
        div.className = 'tradePet trade1'
        div.setAttribute('onclick', 'openInventory()')
        tradePart1Element.appendChild(div)
    }

    for (i = trade2.length; i < 9 || i % 3 !== 0; i++) {
        const div = document.createElement("div")
        div.className = 'tradePet trade2'
        div.setAttribute('onclick', 'openInventory()')
        tradePart2Element.appendChild(div)
    }

}

function removePetFromInventory(type, pet) {
    if (type == "inventory") {
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
            const id = userData.inventory[pet].id
            userData.inventory.splice(pet, 1)

            showInventoryPets()
            
            petsAdded -= 1
            petAdded.style.bottom = "5vh"
            petAdded.style.backgroundColor = "rgb(255, 0, 0)"
            petAddedText.innerHTML = "You removed " + (petsDict[id]["name"]).toString() + " from your inventory!"
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

function showWishlistPets() {
    userWishlist.innerHTML = '';
    if (profileID == userID) {
        const div = document.createElement("div")
        div.className = 'userInventoryPetImage'
        div.setAttribute('onclick', 'openInventory(); setAddPetTypeTo("wishlist")')
        const img = document.createElement("img")
        img.src = "../static/images/misc/add.png"
        img.style.height = "80px"
        img.style.width = "80px"
        img.style.filter = "brightness(0.5)"
        div.appendChild(img)
        userWishlist.appendChild(div)

        for (const i in userData.wishlist) {
            const pet = userData.wishlist[i]
            const div = document.createElement("div")
            div.className = 'userInventoryPetImage'
            div.setAttribute('data-id', pet["id"])
            div.setAttribute('data-petName', petsDict[pet["id"]].name)
            div.setAttribute('data-name', petsDict[pet["id"]].type)
            div.setAttribute('data-value', petsDict[pet["id"]].rarity)
            div.setAttribute('onclick', "removePetFromInventory('wishlist', " + i.toString() + ")")

            const img = document.createElement("img")
            img.style.height = "90px"
            img.style.width = "90px"
            img.setAttribute("onerror", 'handleImageError(error)')
            img.src = petsDict[pet["id"]].image

            const attributesDiv = document.createElement("div")
            attributesDiv.style.padding = "0px"
            attributesDiv.style.position = "absolute"
            attributesDiv.style.display = "flex"
            attributesDiv.style.alignItems = "center"
            attributesDiv.style.bottom = "8px"
            attributesDiv.style.left = "8px"
            attributesDiv.style.gap = "2px"

            var attribute = ""

            if (userData.wishlist[i]["fly"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "flyButton")
                attribute.style.height = "20px"
                attribute.style.width = "20px"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "5px"
                text = document.createElement("b")
                text.innerHTML = "F"
                text.style.color = "white"
                text.style.fontSize = "12px"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (userData.wishlist[i]["ride"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "rideButton")
                attribute.style.height = "20px"
                attribute.style.width = "20px"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "5px"
                text = document.createElement("b")
                text.innerHTML = "R"
                text.style.color = "white"
                text.style.fontSize = "12px"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (userData.wishlist[i]["neon"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "neonButton")
                attribute.style.height = "20px"
                attribute.style.width = "20px"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "5px"
                text = document.createElement("b")
                text.innerHTML = "N"
                text.style.color = "white"
                text.style.fontSize = "12px"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (userData.wishlist[i]["mega"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "megaButton")
                attribute.style.height = "20px"
                attribute.style.width = "20px"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "5px"
                text = document.createElement("b")
                text.innerHTML = "M"
                text.style.color = "white"
                text.style.fontSize = "12px"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            div.appendChild(img)
            div.appendChild(attributesDiv)
            userWishlist.append(div)
        }
    } else {
        for (const i in profileDataDict.wishlist) {
            const pet = profileDataDict.wishlist[i]
            const div = document.createElement("div")
            div.className = 'userInventoryPetImage'
            div.setAttribute('data-id', pet["id"])
            div.setAttribute('data-petName', petsDict[pet["id"]].name)
            div.setAttribute('data-name', petsDict[pet["id"]].type)
            div.setAttribute('data-value', petsDict[pet["id"]].rarity)

            const img = document.createElement("img")
            img.style.height = "90px"
            img.style.width = "90px"
            img.setAttribute("onerror", 'handleImageError(error)')
            img.src = petsDict[pet["id"]].image

            div.appendChild(img)
            userWishlist.append(div)
        } 
        if (userWishlist.childElementCount == 0) {
            userWishlist.innerHTML = "<p style='margin:0px;position:absolute;transform:translate(-50%, -50%);left:50%;top:300%;font-size:25px;text-align:center;margin-top:50px;'>This user has not put anything in their wishlist</p>"
        }   
    }
}

function sendFriendRequest(ID) {
    formData = new FormData();
    formData.append('ID', (ID).toString())
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
        if (friendButton !== undefined) {
            friendButton.disabled = "true"
            if (friendButton.innerText == "Add as friend") {
                friendButton.innerText = "You are now friends!"
            } else {
                friendButton.innerText = "Friend request sent!"
            }
        }
        displayMessage("Friend request sent to " + profileDataDict["username"] + "!")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function removeFriend(ID) {
    formData = new FormData();
    formData.append('ID', (ID).toString())
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
        if (friendButton !== undefined) {
            friendButton.disabled = "true"
            friendButton.innerText = "Friend removed!"
        }
        displayMessage("You removed " + profileDataDict["username"] + " as a friend!")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}


function showInventoryPets() {
    userInventory.innerHTML = '';
    if (profileID == userID) {
        const div = document.createElement("div")
        div.className = 'userInventoryPetImage'
        div.setAttribute('onclick', 'openInventory(); setAddPetTypeTo("inventory")')
        const img = document.createElement("img")
        img.src = "../static/images/misc/add.png"
        img.style.height = "80px"
        img.style.width = "80px"
        img.style.filter = "brightness(0.5)"
        div.appendChild(img)
        userInventory.appendChild(div)

        for (const i in userData.inventory) {
            const pet = userData.inventory[i]
            const div = document.createElement("div")
            div.className = 'userInventoryPetImage'
            div.setAttribute('data-id', pet["id"])
            div.setAttribute('data-petName', petsDict[pet["id"]].name)
            div.setAttribute('data-name', petsDict[pet["id"]].type)
            div.setAttribute('data-value', petsDict[pet["id"]].rarity)
            div.setAttribute('onclick', "removePetFromInventory('inventory', " + i.toString() + ")")

            const img = document.createElement("img")
            img.style.height = "90px"
            img.style.width = "90px"
            img.setAttribute("onerror", 'handleImageError(error)')
            img.src = petsDict[pet["id"]].image

            const attributesDiv = document.createElement("div")
            attributesDiv.style.padding = "0px"
            attributesDiv.style.position = "absolute"
            attributesDiv.style.display = "flex"
            attributesDiv.style.alignItems = "center"
            attributesDiv.style.bottom = "8px"
            attributesDiv.style.left = "8px"
            attributesDiv.style.gap = "2px"

            var attribute = ""

            if (userData.inventory[i]["fly"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "flyButton")
                attribute.style.height = "20px"
                attribute.style.width = "20px"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "5px"
                text = document.createElement("b")
                text.innerHTML = "F"
                text.style.color = "white"
                text.style.fontSize = "12px"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (userData.inventory[i]["ride"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "rideButton")
                attribute.style.height = "20px"
                attribute.style.width = "20px"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "5px"
                text = document.createElement("b")
                text.innerHTML = "R"
                text.style.color = "white"
                text.style.fontSize = "12px"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (userData.inventory[i]["neon"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "neonButton")
                attribute.style.height = "20px"
                attribute.style.width = "20px"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "5px"
                text = document.createElement("b")
                text.innerHTML = "N"
                text.style.color = "white"
                text.style.fontSize = "12px"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            if (userData.inventory[i]["mega"] == 1) {
                attribute = document.createElement("div")
                attribute.setAttribute("id", "megaButton")
                attribute.style.height = "20px"
                attribute.style.width = "20px"
                attribute.style.padding = "0px"
                attribute.style.borderRadius = "5px"
                text = document.createElement("b")
                text.innerHTML = "M"
                text.style.color = "white"
                text.style.fontSize = "12px"
                attribute.appendChild(text)
                attributesDiv.appendChild(attribute)
            }

            div.appendChild(img)
            div.appendChild(attributesDiv)
            userInventory.append(div)
        }
    } else {
        for (const i in profileDataDict.inventory) {
            const pet = profileDataDict.inventory[i]
            const div = document.createElement("div")
            div.className = 'userInventoryPetImage'
            div.setAttribute('data-id', pet["id"])
            div.setAttribute('data-petName', petsDict[pet["id"]].name)
            div.setAttribute('data-name', petsDict[pet["id"]].type)
            div.setAttribute('data-value', petsDict[pet["id"]].rarity)

            const img = document.createElement("img")
            img.style.height = "90px"
            img.style.width = "90px"
            img.setAttribute("onerror", 'handleImageError(error)')
            img.src = petsDict[pet["id"]].image

            div.appendChild(img)
            userInventory.append(div)
        }
        if (userInventory.childElementCount == 0) {
            userInventory.innerHTML = "<p style='margin:0px;position:absolute;transform:translate(-50%, -50%);left:50%;top:300%;font-size:25px;text-align:center;margin-top:50px;'>This user has not put anything in their inventory</p>"
        }  
    }
}

function createListingPetDiv(counter1, counter2, tradePart) {
    const petDiv = document.createElement("div")
    petDiv.className = "petDiv"
    const img = document.createElement("img")
    img.src = petsDict[profileListings[counter1.toString()]["offer"][tradePart][counter2.toString()]["id"]]["image"]
    img.style.maxWidth = "25px"
    img.style.maxHeight = "25px"
    petDiv.appendChild(img)

    const attributeDiv = document.createElement("div")
    attributeDiv.className = "attributeDiv"

    if (profileListings[counter1.toString()]["offer"][tradePart][counter2.toString()]["fly"] == "1") {
        const flyDiv = document.createElement("div")
        flyDiv.className = "listingPetAttribute"
        flyDiv.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
        const txt1 = document.createElement("b")
        txt1.innerText = "F"
        flyDiv.appendChild(txt1)
        attributeDiv.appendChild(flyDiv)
    }

    if (profileListings[counter1.toString()]["offer"][tradePart][counter2.toString()]["ride"] == "1") {
        const rideDiv = document.createElement("div")
        rideDiv.className = "listingPetAttribute"
        rideDiv.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
        const txt2 = document.createElement("b")
        txt2.innerText = "R"
        rideDiv.appendChild(txt2)
        attributeDiv.appendChild(rideDiv)
    }

    if (profileListings[counter1.toString()]["offer"][tradePart][counter2.toString()]["neon"] == "1") {
        const neonDiv = document.createElement("div")
        neonDiv.className = "listingPetAttribute"
        neonDiv.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
        const txt3 = document.createElement("b")
        txt3.innerText = "N"
        neonDiv.appendChild(txt3)
        attributeDiv.appendChild(neonDiv)
    }

    if (profileListings[counter1.toString()]["offer"][tradePart][counter2.toString()]["mega"] == "1") {
        const megaDiv = document.createElement("div")
        megaDiv.className = "listingPetAttribute"
        megaDiv.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
        const txt4 = document.createElement("b")
        txt4.innerText = "M"
        megaDiv.appendChild(txt4)
        attributeDiv.appendChild(megaDiv)
    }

    petDiv.appendChild(attributeDiv)

    return petDiv
}

function showUserListings(listings, target) {
    target.innerHTML = ""
    var id = 0
    Object.keys(listings).forEach(key => {
        const div = document.createElement("div")
        div.className = "userListingsListing"
        div.style.position = "relative"
        div.setAttribute("id", id)

        div.setAttribute("data-key", key)

        const div2 = document.createElement("div")
        div2.className = "userListingUpper"

        const div5 = document.createElement("div")
        div5.className = "userListingLine"

        const txt1 = document.createElement("b")
        txt1.innerText = "Your Offer"
        txt1.style.color = "red"

        const txt2 = document.createElement("b")
        var text = (listings[key]["offer"]["giveValue"] - listings[key]["offer"]["takeValue"] + listings[key]["extraSharkValueRequested"]).toFixed(1)
        if (parseFloat(text) <= 0) {
            txt2.style.color = "black"
            text = (Math.abs(parseFloat(text))).toString()
        } else {
            txt2.style.color = "red"
            div5.style.backgroundColor = "red"
        }
        if (text.length > 3) {
            txt2.style.fontSize = (32 / (text.length / 3)).toString() + "px"
        } else {
            txt2.style.fontSize = "32px"
        }
        txt2.innerText = text
        txt2.className = "userListingValue"

        const txt3 = document.createElement("b")
        txt3.innerText = "Their Offer"

        div2.appendChild(txt1)
        div2.appendChild(txt2)
        div2.appendChild(txt3)

        const div3 = document.createElement("div")
        div3.className = "listingInfo"

        const div4 = document.createElement("div")

        div4.className = "Grid3x3Listing"

        var counter = 0
    
        while (counter < 9) {
            if (listings[key]["offer"]["give"][counter] == undefined) {
                const petDiv = document.createElement("div")
                petDiv.className = "petDiv"
                div4.appendChild(petDiv)
            } else {
                if (counter == 8 && listings[key]["offer"]["give"].length > 9) {
                    const petDiv = document.createElement("div")
                    petDiv.className = "petDiv"
                    const txt4 = document.createElement("b")
                    txt4.innerText = "+" + (listings[key]["offer"]["give"].length - 8).toString()
                    txt4.style.fontSize = "16px"
                    petDiv.appendChild(txt4)
                    div4.appendChild(petDiv)
                } else {
                    const petDiv = document.createElement("div")
                    petDiv.className = "petDiv"
                    const img = document.createElement("img")
                    img.src = petsDict[listings[key]["offer"]["give"][counter]["id"]]["image"]
                    petDiv.appendChild(img)

                    const attributeDiv = document.createElement("div")
                    attributeDiv.className = "attributeDiv"

                    if (listings[key]["offer"]["give"][counter]["fly"] == "1") {
                        const flyDiv = document.createElement("div")
                        flyDiv.className = "listingPetAttribute flyDiv"
                        const txt1 = document.createElement("b")
                        txt1.innerText = "F"
                        flyDiv.appendChild(txt1)
                        attributeDiv.appendChild(flyDiv)
                    }

                    if (listings[key]["offer"]["give"][counter]["ride"] == "1") {
                        const rideDiv = document.createElement("div")
                        rideDiv.className = "listingPetAttribute rideDiv"
                        const txt2 = document.createElement("b")
                        txt2.innerText = "R"
                        rideDiv.appendChild(txt2)
                        attributeDiv.appendChild(rideDiv)
                    }

                    if (listings[key]["offer"]["give"][counter]["neon"] == "1") {
                        const neonDiv = document.createElement("div")
                        neonDiv.className = "listingPetAttribute neonDiv"
                        const txt3 = document.createElement("b")
                        txt3.innerText = "N"
                        neonDiv.appendChild(txt3)
                        attributeDiv.appendChild(neonDiv)
                    }

                    if (listings[key]["offer"]["give"][counter]["mega"] == "1") {
                        const megaDiv = document.createElement("div")
                        megaDiv.className = "listingPetAttribute"
                        const txt4 = document.createElement("b")
                        txt4.innerText = "M"
                        megaDiv.appendChild(txt4)
                        attributeDiv.appendChild(megaDiv)
                    }

                    petDiv.appendChild(attributeDiv)
                    div4.appendChild(petDiv)
                }
            }
            counter += 1
        }

        const div6 = document.createElement("div")
        div6.className = "Grid3x3Listing"

        counter = 0

        while (counter < 9) {
            if (listings[key]["offer"]["take"][counter] == undefined) {
                const petDiv = document.createElement("div")
                petDiv.className = "petDiv"
                div6.appendChild(petDiv)
            } else {
                if (counter == 8 && listings[key]["offer"]["take"].length > 9) {
                    const petDiv = document.createElement("div")
                    petDiv.className = "petDiv"
                    const txt4 = document.createElement("b")
                    txt4.innerText = "+" + (listings[key]["offer"]["take"].length - 8).toString()
                    txt4.style.fontSize = "16px"
                    petDiv.appendChild(txt4)
                    div6.appendChild(petDiv)
                } else {
                    const petDiv = document.createElement("div")
                    petDiv.className = "petDiv"
                    const img = document.createElement("img")
                    img.src = petsDict[listings[key]["offer"]["take"][counter]["id"]]["image"]
                    petDiv.appendChild(img)

                    const attributeDiv = document.createElement("div")
                    attributeDiv.className = "attributeDiv"

                    if (listings[key]["offer"]["take"][counter]["fly"] == "1") {
                        const flyDiv = document.createElement("div")
                        flyDiv.className = "listingPetAttribute flyDiv"
                        const txt1 = document.createElement("b")
                        txt1.innerText = "F"
                        flyDiv.appendChild(txt1)
                        attributeDiv.appendChild(flyDiv)
                    }

                    if (listings[key]["offer"]["take"][counter]["ride"] == "1") {
                        const rideDiv = document.createElement("div")
                        rideDiv.className = "listingPetAttribute rideDiv"
                        const txt2 = document.createElement("b")
                        txt2.innerText = "R"
                        rideDiv.appendChild(txt2)
                        attributeDiv.appendChild(rideDiv)
                    }

                    if (listings[key]["offer"]["take"][counter]["neon"] == "1") {
                        const neonDiv = document.createElement("div")
                        neonDiv.className = "listingPetAttribute neonDiv"
                        const txt3 = document.createElement("b")
                        txt3.innerText = "N"
                        neonDiv.appendChild(txt3)
                        attributeDiv.appendChild(neonDiv)
                    }

                    if (listings[key]["offer"]["take"][counter]["mega"] == "1") {
                        const megaDiv = document.createElement("div")
                        megaDiv.className = "listingPetAttribute"
                        const txt4 = document.createElement("b")
                        txt4.innerText = "M"
                        megaDiv.appendChild(txt4)
                        attributeDiv.appendChild(megaDiv)
                    }

                    petDiv.appendChild(attributeDiv)
                    div6.appendChild(petDiv)
                }
            }
            counter += 1
        }

        div3.appendChild(div4)
        div3.appendChild(div5)
        div3.appendChild(div6)

        div.appendChild(div2)
        div.appendChild(div3)
        if ( loggedIn.includes("True") ) {
            div.setAttribute("onclick", "showUserListings2(" + JSON.stringify(listings[key]) + ")");
        }
        target.appendChild(div)
        id += 1
    })
}

function updateListingInterface2() {
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

    if (listing["extraSharkValueRequested"] == 0 || listing["extraSharkValueRequested"] == undefined) {
        yourOfferValue.innerText = (listing["offer"]["giveValue"] + calculateValue(yourOfferExtraPets)).toFixed(2)
        theirOfferValue.innerText = (listing["offer"]["takeValue"] + calculateValue(theirOfferExtraPets)).toFixed(2)
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
    } else if (listing["extraSharkValueRequested"] > 0 && calculateValue(yourOfferExtraPets) < listing["extraSharkValueRequested"]) {
        yourOfferValue.innerText = (listing["offer"]["giveValue"] + calculateValue(yourOfferExtraPets)).toFixed(2).toString() + " + " + (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets)).toFixed(2).toString()
        theirOfferValue.innerText = listing["offer"]["takeValue"].toFixed(2)
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets)).toFixed(2)
    } else if (listing["extraSharkValueRequested"] < 0 && calculateValue(theirOfferExtraPets) < Math.abs(listing["extraSharkValueRequested"])) {
        yourOfferValue.innerText = listing["offer"]["giveValue"].toFixed(2)
        theirOfferValue.innerText = (listing["offer"]["takeValue"] + calculateValue(theirOfferExtraPets)).toFixed(2).toString() + " + " + (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets)).toFixed(2).toString()
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets)).toFixed(2)
    } else {
        yourOfferValue.innerText = (listing["offer"]["giveValue"] + calculateValue(yourOfferExtraPets)).toFixed(2)
        theirOfferValue.innerText = (listing["offer"]["takeValue"] + calculateValue(theirOfferExtraPets)).toFixed(2)
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
    }

    if (userData["id"] == listing["owner"]) {
        finishButton.disabled = true
    }

}

function setTradeTo(index) {
    if (index == -1) {
        modifyTrade = -1
    } else {
        modifyTrade = index
        tradePart1 = JSON.parse(JSON.stringify(profileListings[index]["offer"]["give"]))
        tradePart2 = JSON.parse(JSON.stringify(profileListings[index]["offer"]["take"]))

    }
    showTradePets()

}

function removeListing() {
    formData = new FormData();
    formData.append('index', (modifyTrade).toString())
    formData.append('action', "removeListing");

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
        profileListings.splice(modifyTrade, 1)
        listingAmount.innerText = (parseInt(listingAmount.innerText) - 1).toString()
        showUserListings(profileListings, userListings)
        closeListingInterface()
        displayError("You remove a listing!")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });


    
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
    disableScrolling()
    currentListing = listing
    yourOfferExtraPets = []
    theirOfferExtraPets = []
    listingInterface2.style.display = "flex"
    listingInterface2Background.style.display = "flex"
    showOffers(listing)
    showPreferences(listing)

    if (listing["extraSharkValueRequested"] == 0 || listing["extraSharkValueRequested"] == undefined) {
        yourOfferValue.innerText = listing["offer"]["giveValue"].toFixed(2)
        theirOfferValue.innerText = listing["offer"]["takeValue"].toFixed(2)
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
    } else if (listing["extraSharkValueRequested"] > 0) {
        yourOfferValue.innerText = listing["offer"]["giveValue"].toFixed(2).toString() + " + " + listing["extraSharkValueRequested"].toString()
        theirOfferValue.innerText = listing["offer"]["takeValue"].toFixed(2)
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = listing["extraSharkValueRequested"].toFixed(2)
        youAddTheyAdd.innerText = "YOU ADD:"
    } else if (listing["extraSharkValueRequested"] < 0) {
        yourOfferValue.innerText = listing["offer"]["giveValue"].toFixed(2)
        theirOfferValue.innerText = listing["offer"]["takeValue"].toFixed(2).toString() + " + " + Math.abs(listing["extraSharkValueRequested"]).toString()
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = Math.abs(listing["extraSharkValueRequested"]).toFixed(2)
        youAddTheyAdd.innerText = "THEY ADD:"
    }

    if (userData["id"] == listing["owner"]) {
        finishButton.disabled = true
        changeButton.disabled = true
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
        if (listing["customOffers"][i]["ownerRobloxUsername"] != "") {
            p4.innerText = listing["customOffers"][i]["ownerRobloxUsername"]
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

function acceptOffer() {
    if (offerAccepted == false) {
        formData = new FormData();
        formData.append('listing', JSON.stringify(currentListing))
        formData.append('user', profileID)
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
            displayMessage("You accepted the offer!")
            profileListings[currentListing]["acceptedBy"] = userID
            closeListingInterface2()
        } else {
            displayError(data)
        }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });  
    }
}

function sendCustomOffer() {
    formData = new FormData();
    formData.append('trade1', JSON.stringify(listingPart1Dict))
    formData.append('trade2', JSON.stringify(listingPart2Dict))
    formData.append('user', profileID)
    formData.append('action', "sendCustomOffer");

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
        displayMessage("You sent a custom offer!")
        closeListingInterface2()
    } else {
        displayError(data)
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    }); 
}


function createListing() {
    formData = new FormData();
    formData.append('trade1', JSON.stringify(tradePart1))
    formData.append('trade2', JSON.stringify(tradePart2))
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
    if (data == "SUCCESS") {
        listingAmount.innerText = (parseInt(listingAmount.innerText) + 1).toString()
        displayMessage("You created a listing!")
        profileListings.push({
            "owner":userID,
            "offer":{
                "give":tradePart1,
                "take":tradePart2
            },
            "completed":false,
            "acceptedBy":null,
            "customOffers":{}
        })
        showUserListings(profileListings, userListings)
    } else {
        displayError(data)
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });  
}

function saveListing() {
    formData = new FormData();
    formData.append('trade1', JSON.stringify(tradePart1))
    formData.append('trade2', JSON.stringify(tradePart2))
    formData.append('index', JSON.stringify(modifyTrade))
    formData.append('action', "saveListing");

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
        displayMessage("The listing has been updated!")
        profileListings[modifyTrade]["offer"]["give"] = JSON.parse(JSON.stringify(tradePart1))
        profileListings[modifyTrade]["offer"]["take"] = JSON.parse(JSON.stringify(tradePart2))
        showUserListings(profileListings, userListings)
    } else {
        displayError(data)
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

function calculateTradeValue() {
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

function calculateTradeValueWithInput(trade1, trade2) {
    var totalValue = 0
    var value = ""
    var trade1Value = 0
    var trade2Value = 0
    for (const i in trade1) {
        value = ""
        if (trade1[i].regular == "1") {
            value += "rvalue"
        } else if (trade1[i].neon == "1") {
            value += "nvalue"
        } else {
            value += "mvalue"
        }
        if (trade1[i].fly == "1" && trade1[i].ride == "1") {
            value += " - fly&ride"
        } else if (trade1[i].fly == "1") {
            value += " - fly"
        } else if (trade1[i].ride == "1") {
            value += " - ride"
        }
        trade1Value += petsDict[trade1[i].id][value]
    }
    for (const i in trade2) {
        value = ""
        if (trade2[i].regular == "1") {
            value += "rvalue"
        } else if (trade2[i].neon == "1") {
            value += "nvalue"
        } else {
            value += "mvalue"
        }
        if (trade2[i].fly == "1" && trade2[i].ride == "1") {
            value += " - fly&ride"
        } else if (trade2[i].fly == "1") {
            value += " - fly"
        } else if (trade2[i].ride == "1") {
            value += " - ride"
        }
        trade2Value += petsDict[trade2[i].id][value]
    }

    const oldTrade1Value = trade1Value
    const oldTrade2Value = trade2Value

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

    const finalValue = (trade1Value - trade2Value).toFixed(2)

    return finalValue
}

function selectCategoryUser(category) {
    if (category == "inventory") {
        userInventory.style.display = "grid"
        inventoryButton.style.color = "red"
    } else {
        userInventory.style.display = "none"
        inventoryButton.style.color = "black"
    }
    if (category == "listings") {
        userListings.style.display = "grid"
        listingsButton.style.color = "red"
    } else {
        userListings.style.display = "none"
        listingsButton.style.color = "black"
    }
    if (category == "wishlist") {
        userWishlist.style.display = "grid"
        wishlistButton.style.color = "red"
    } else {
        userWishlist.style.display = "none"
        wishlistButton.style.color = "black"
    }
    if (userID == profileID) {
        if (category == "inbox") {
            userInbox.style.display = "grid"
            inboxButton.style.color = "red"
        } else {
            userInbox.style.display = "none"
            inboxButton.style.color = "black"
        }
        if (category == "pending") {
            userPending.style.display = "grid"
            pendingButton.style.color = "red"
        } else {
            userPending.style.display = "none"
            pendingButton.style.color = "black"
        }
    }
    if (category == "history") {
        userHistory.style.display = "grid"
        historyButton.style.color = "red"
    } else {
        userHistory.style.display = "none"
        historyButton.style.color = "black"
    }
}

function enableFly() {
    if (fly == 0) {
        fly = 1
    } else {
        fly = 0
    }
    updateButtons()
}

function enableRide() {
    if (ride == 0) {
        ride = 1
    } else {
        ride = 0
    }
    updateButtons()
}

function enableRegular() {
    regular = 1
    neon = 0
    mega = 0
    updateButtons()
}

function enableNeon() {
    regular = 0
    neon = 1
    mega = 0
    updateButtons()
}

function enableMega() {
    regular = 0
    neon = 0
    mega = 1
    updateButtons()
}

function addPetToInventory(pet) {
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
            userData.inventory.push({
                "innerID":userData.inventory.length,
                "id":pet,
                "fly":fly,
                "ride":ride,
                "regular":regular,
                "neon":neon,
                "mega":mega
            })
            showInventoryPets()
            petsAdded += 1
            petAdded.style.bottom = "10%"
            petAdded.style.backgroundColor = "rgb(0, 255, 0)"
            petAddedText.innerHTML = "You added " + petsDict[pet]["name"] + " to your inventory!"
            inventoryLength.innerHTML = parseInt(inventoryLength.innerHTML) + 1
            var oldPetsAdded = petsAdded
            setTimeout((event) => {
                if (oldPetsAdded == petsAdded) {
                    petAdded.style.bottom = "-100%"
                }
            }, 1750)
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
            userData.wishlist.push({
                "innerID":userData.inventory.length,
                "id":pet,
                "fly":fly,
                "ride":ride,
                "regular":regular,
                "neon":neon,
                "mega":mega
            })
            showWishlistPets()
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
    petImage = document.querySelectorAll(".petImage")
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

function openInventory() {
    displayPets()
    addInventory.style.display = "block"
    addInventoryBackground.style.display = "block"
}

function closeInventory() {
    addInventory.style.display = "none"
    addInventoryBackground.style.display = "none"
    calculateTradeValue()
}

function openListingInterface() {
    listingInterfaceBackground.style.display = "block"
    listingInterface.style.display = "flex"
    if (modifyTrade !== -1) {
        modifyListing.style.display = "flex"
        noModifyListing.style.display = "none"
    } else {
        modifyListing.style.display = "none"
        noModifyListing.style.display = "flex"
    }
    calculateTradeValue()
}

function openListingInterface2(listing) {
    listingInterface2Background.style.display = "block"
    listingInterface2.style.display = "flex"
    showUserListings2(listing)
}

function closeListingInterface() {
    listingInterfaceBackground.style.display = "none"
    listingInterface.style.display = "none"
}

function closeListingInterface2() {
    listingInterface2Background.style.display = "none"
    listingInterface2.style.display = "none"
}

function showFriends() {
    friendsDiv.style.display = "flex"
    pendingDiv.style.display = "none"
    blockedDiv.style.display = "none"
    displayFriends()
}

function showPending() {
    friendsDiv.style.display = "none"
    pendingDiv.style.display = "flex"
    blockedDiv.style.display = "none"
}

function showBlocked() {
    friendsDiv.style.display = "none"
    pendingDiv.style.display = "none"
    blockedDiv.style.display = "flex"
    displayBlocked()
}

function displayFriends() {
    friendsDiv.innerHTML = ""
    formData = new FormData();
    formData.append('action', "getFriendsDetails");

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
        friendData = data
        Object.keys(data).forEach(key => {
                const div = document.createElement("div")
                div.className = "friendDiv"
                const img = document.createElement("img")
                img.src = "../static/images/profile/" + data[key]["profilePicture"]
                img.style.height = "max(2.5vw, 5vh)"
                img.style.aspectRatio = "1/1"
                div.appendChild(img)

                const div2 = document.createElement("div")
                div2.className = "friendInfo"
                const txt1 = document.createElement("p")
                txt1.innerText = data[key]["username"]
                txt1.style.fontSize = "max(1vw, 2vh)"
                txt1.style.margin = "0px"
                div2.appendChild(txt1)
                if (data[key]["robloxUsername"] != "") {
                    const div3 = document.createElement("div")
                    div3.className = "robloxUsername"
                    const img3 = document.createElement("img")
                    img3.src = "../static/images/misc/robloxLogo.png"
                    img3.style.height = "max(0.7vw, 1.4vh)"
                    img3.style.aspectRatio = "1/1"
                    div3.appendChild(img3)
                    const txt2 = document.createElement("p")
                    txt2.innerText = data[key]["robloxUsername"]
                    txt2.style.fontSize = "max(0.6vw, 1.2vh)"
                    txt2.style.margin = "0px"
                    div3.appendChild(txt2)


                    div2.appendChild(div3)
                }
                div.appendChild(div2)
                const img2 = document.createElement("img")
                img2.src = "../static/images/misc/more.png"
                img2.style.transform = "rotate(90deg)"
                img2.style.height = "max(0.35vw, 0.7vh)"
                img2.style.width = "max(1.2vw, 2.4vh)"
                img2.className = "more"
                img2.setAttribute("onclick", "moreFriendOptions(" + key.toString() + ")")
                div.appendChild(img2)
                friendsDiv.appendChild(div)
        })
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });

}


function moreFriendOptions(id) {
    currentFriendSelected = id
    friendMoreOptions.style.display = "flex"
    friendMoreOptions.style.left = mouseX.toString() + "px"
    friendMoreOptions.style.top = mouseY.toString() + "px"
    more = 1
}


window.addEventListener("click", (event) => {
    if (more == 0) {
        if (event.target !== friendMoreOptions) {
            friendMoreOptions.style.display = "none"
        }
    } else {
        more = 0
    }
})

function removeFriendMore() {
    removeFriend(currentFriendSelected.toString())
}

function block(ID) {
    formData = new FormData();
    formData.append('ID', (ID).toString())
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
        displayMessage("You blocked " + profileDataDict["username"] + "!")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function unblock(ID) {
    formData = new FormData();
    formData.append('ID', (ID).toString())
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
        displayMessage("You unblocked " + profileDataDict["username"] + "!")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function displayPending() {
    pendingDiv.innerHTML = ""
    formData = new FormData();
    formData.append('action', "getPendingDetails");


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
        pendingData = data
        Object.keys(data).forEach(key => {
                const div = document.createElement("div")
                div.className = "friendDiv"
                const img = document.createElement("img")
                img.src = "../static/images/profile/" + data[key]["profilePicture"]
                img.style.height = "max(2.5vw, 5vh)"
                img.style.aspectRatio = "1/1"
                div.appendChild(img)

                const div2 = document.createElement("div")
                div2.className = "friendInfo"
                const txt1 = document.createElement("p")
                txt1.innerText = data[key]["username"]
                txt1.style.fontSize = "max(1vw, 2vh)"
                txt1.style.margin = "0px"
                div2.appendChild(txt1)
                if (data[key]["robloxUsername"] != "") {
                    const div3 = document.createElement("div")
                    div3.className = "robloxUsername"
                    const img3 = document.createElement("img")
                    img3.src = "../static/images/misc/robloxLogo.png"
                    img3.style.height = "max(0.7vw, 1.4vh)"
                    img3.style.aspectRatio = "1/1"
                    div3.appendChild(img3)
                    const txt2 = document.createElement("p")
                    txt2.innerText = data[key]["robloxUsername"]
                    txt2.style.fontSize = "max(0.6vw, 1.2vh)"
                    txt2.style.margin = "0px"
                    div3.appendChild(txt2)


                    div2.appendChild(div3)
                }
                div.appendChild(div2)
                const img2 = document.createElement("img")
                img2.src = "../static/images/misc/more.png"
                img2.style.transform = "rotate(90deg)"
                img2.style.height = "max(0.35vw, 0.7vh)"
                img2.style.width = "max(1.2vw, 2.4vh)"
                img2.className = "more"
                img2.setAttribute("onclick", "moreFriendOptions(" + key.toString() + ")")
                div.appendChild(img2)
                pendingDiv.appendChild(div)
        })
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function displayBlocked() {
    blockedDiv.innerHTML = ""
    formData = new FormData();
    formData.append('action', "getBlockedDetails");

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
        pendingData = data
        Object.keys(data).forEach(key => {
                const div = document.createElement("div")
                div.className = "friendDiv"
                const img = document.createElement("img")
                img.src = "../static/images/profile/" + data[key]["profilePicture"]
                img.style.height = "max(2.5vw, 5vh)"
                img.style.aspectRatio = "1/1"
                div.appendChild(img)

                const div2 = document.createElement("div")
                div2.className = "friendInfo"
                const txt1 = document.createElement("p")
                txt1.innerText = data[key]["username"]
                txt1.style.fontSize = "max(1vw, 2vh)"
                txt1.style.margin = "0px"
                div2.appendChild(txt1)
                if (data[key]["robloxUsername"] != "") {
                    const div3 = document.createElement("div")
                    div3.className = "robloxUsername"
                    const img3 = document.createElement("img")
                    img3.src = "../static/images/misc/robloxLogo.png"
                    img3.style.height = "max(0.7vw, 1.4vh)"
                    img3.style.aspectRatio = "1/1"
                    div3.appendChild(img3)
                    const txt2 = document.createElement("p")
                    txt2.innerText = data[key]["robloxUsername"]
                    txt2.style.fontSize = "max(0.6vw, 1.2vh)"
                    txt2.style.margin = "0px"
                    div3.appendChild(txt2)


                    div2.appendChild(div3)
                }
                div.appendChild(div2)
                const img2 = document.createElement("img")
                img2.src = "../static/images/misc/more.png"
                img2.style.transform = "rotate(90deg)"
                img2.style.height = "max(0.35vw, 0.7vh)"
                img2.style.width = "max(1.2vw, 2.4vh)"
                img2.className = "more"
                img2.setAttribute("onclick", "moreFriendOptions(" + key.toString() + ")")
                div.appendChild(img2)
                blockedDiv.appendChild(div)
        })
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function selectMoreOption(type) {
    if (type == "friends") {
        friendMoreOptions.innerHTML = ""

        const button1 = document.createElement("button")
        button1.className = "blank button"
        button1.id = "removeFriend"
        button1.setAttribute("onclick", "removeFriendMore()")
        const txt1 = document.createElement("p")
        txt1.innerText = "Remove Friend"
        button1.appendChild(txt1)

        const button2 = document.createElement("button")
        button2.className = "blank button"
        button2.id = "blockFriend"
        button2.setAttribute("onclick", "blockMore()")
        const txt2 = document.createElement("p")
        txt2.innerText = "Block Friend"
        button2.appendChild(txt2)

        friendMoreOptions.appendChild(button1)
        friendMoreOptions.appendChild(button2)

    } else if (type == "pending") {
        friendMoreOptions.innerHTML = ""

        const button1 = document.createElement("button")
        button1.className = "blank button"
        button1.id = "acceptRequest"
        button1.setAttribute("onclick", "acceptRequestMore()")
        const txt1 = document.createElement("p")
        txt1.innerText = "Accept"
        button1.appendChild(txt1)

        const button2 = document.createElement("button")
        button2.className = "blank button"
        button2.id = "rejectRequest"
        button2.setAttribute("onclick", "rejectRequestMore()")
        const txt2 = document.createElement("p")
        txt2.innerText = "Reject"
        button2.appendChild(txt2)

        friendMoreOptions.appendChild(button1)
        friendMoreOptions.appendChild(button2)

    } else if (type == "blocked") {
        friendMoreOptions.innerHTML = ""

        const button1 = document.createElement("button")
        button1.className = "blank button"
        button1.id = "unblock"
        button1.setAttribute("onclick", "unblockMore()")
        const txt1 = document.createElement("p")
        txt1.innerText = "Unblock"
        button1.appendChild(txt1)

        friendMoreOptions.appendChild(button1)

    }

}

function acceptRequestMore() {
    formData = new FormData();
    formData.append('ID', (currentFriendSelected).toString())
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
        displayMessage("You are now friends with this user!")
        displayPending()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function rejectRequestMore() {
    formData = new FormData();
    formData.append('ID', (currentFriendSelected).toString())
    formData.append('action', "rejectFriendRequest");

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
        displayMessage("You rejected this user!")
        displayPending()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function displayPets() {
    if (loggedIn.includes("True") && displayPetsFirstTime == 0) {
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

function unblockMore() {
    formData = new FormData();
    formData.append('ID', (currentFriendSelected).toString())
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
        displayMessage("You unblocked this user!")
        displayBlocked()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function ban() {
    formData = new FormData();
    formData.append('user', profileID)
    formData.append('action', "ban");

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
        displayMessage("You banned this user!")
    }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function makeContentCreator() {
    formData = new FormData();
    formData.append('user', profileID)
    formData.append('action', "makeContentCreator");

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
        displayMessage("This user has been marked as a content creator!")
    }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function blockMore() {
    formData = new FormData();
    formData.append('ID', (currentFriendSelected).toString())
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
        displayMessage("You blocked this user!")
        displayFriends()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function createListingPetDiv2(data, key, counter2, tradePart) {
    const petDiv = document.createElement("div")
    petDiv.className = "petDiv"
    const img = document.createElement("img")
    img.src = petsDict[data[key]["offer"][tradePart][counter2.toString()]["id"]]["image"]
    img.style.maxWidth = "25px"
    img.style.maxHeight = "25px"
    petDiv.appendChild(img)

    const attributeDiv = document.createElement("div")
    attributeDiv.className = "attributeDiv"

    if (data[key]["offer"][tradePart][counter2.toString()]["fly"] == "1") {
        const flyDiv = document.createElement("div")
        flyDiv.className = "listingPetAttribute"
        flyDiv.style.background = "linear-gradient(135deg, rgb(142, 202, 232) 0%, rgb(47, 152, 204) 50%, rgb(0, 134, 200) 100%)"
        const txt1 = document.createElement("b")
        txt1.innerText = "F"
        flyDiv.appendChild(txt1)
        attributeDiv.appendChild(flyDiv)
    }

    if (data[key]["offer"][tradePart][counter2.toString()]["ride"] == "1") {
        const rideDiv = document.createElement("div")
        rideDiv.className = "listingPetAttribute"
        rideDiv.style.background = "linear-gradient(135deg, rgb(255, 197, 220) 0%, rgb(237, 44, 121) 50%, rgb(255, 0, 101) 100%)"
        const txt2 = document.createElement("b")
        txt2.innerText = "R"
        rideDiv.appendChild(txt2)
        attributeDiv.appendChild(rideDiv)
    }

    if (data[key]["offer"][tradePart][counter2.toString()]["neon"] == "1") {
        const neonDiv = document.createElement("div")
        neonDiv.className = "listingPetAttribute"
        neonDiv.style.background = "linear-gradient(135deg, rgb(193, 255, 110) 0%, rgb(140, 198, 63) 50%, rgb(19, 114, 11) 100%)"
        const txt3 = document.createElement("b")
        txt3.innerText = "N"
        neonDiv.appendChild(txt3)
        attributeDiv.appendChild(neonDiv)
    }

    if (data[key]["offer"][tradePart][counter2.toString()]["mega"] == "1") {
        const megaDiv = document.createElement("div")
        megaDiv.className = "listingPetAttribute"
        megaDiv.style.background = "linear-gradient(135deg, rgb(187, 80, 253) 0%, rgb(69, 3, 198) 50%, rgb(81, 28, 182) 100%)"
        const txt4 = document.createElement("b")
        txt4.innerText = "M"
        megaDiv.appendChild(txt4)
        attributeDiv.appendChild(megaDiv)
    }

    petDiv.appendChild(attributeDiv)

    return petDiv
}

function showInbox() {
    if (userID == profileID) {
        formData = new FormData();
        formData.append('action', "getInbox");

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
                userInbox.innerHTML = ""
                Object.keys(data).forEach(key => {
                    const container = document.createElement("div")
                    container.className = "inboxListing"
                    const div = document.createElement("div")
                    div.className = "inboxListingMain"
                    div.style.display = "flex"
                    div.style.flexDirection = "column"
                    div.style.justifyContent = "space-between"

                    const div2 = document.createElement("div")
                    div2.style.display = "flex"
                    div2.style.justifyContent = "space-between"
                    div2.style.alignItems = "center"

                    const txt1 = document.createElement("b")
                    txt1.innerText = "Your Offer"
                    txt1.style.color = "red"
                    txt1.style.fontSize = "10px"

                    const txt2 = document.createElement("b")
                    var text = calculateTradeValueWithInput(data[key]["offer"]["give"], data[key]["offer"]["take"])
                    if (parseFloat(text) <= 0) {
                        txt2.style.color = "black"
                        text = (Math.abs(parseFloat(text))).toString()
                    } else {
                        txt2.style.color = "red"
                    }
                    txt2.innerText = text
                    txt2.style.fontSize = "25px"

                    const txt3 = document.createElement("b")
                    txt3.innerText = "Their Offer"
                    txt3.style.fontSize = "10px"

                    div2.appendChild(txt1)
                    div2.appendChild(txt2)
                    div2.appendChild(txt3)

                    const div3 = document.createElement("div")
                    div3.className = "listingInfo"

                    const div4 = document.createElement("div")

                    div4.className = "Grid3x3Listing"

                    var counter = 0
                    for (const j in data[key]["offer"]["give"]) {
                        if (j > 7) {
                            if (data[key]["offer"]["give"].length - 8 > 1) {
                                counter += 1
                                const petDiv = document.createElement("div")
                                petDiv.className = "petDiv"
                                const txt4 = document.createElement("b")
                                txt4.innerText = "+" + (data[key]["offer"]["give"].length - 8).toString()
                                txt4.style.fontSize = (25 / ("+" + (data[key]["offer"]["give"].length - 8).toString()).length).toString() + "px"
                                petDiv.appendChild(txt4)
                                div4.appendChild(petDiv)
                            } else {
                                counter += 1
                                div4.appendChild(createListingPetDiv2(data, key, j, "give"))
                            }
                            break
                        } else {
                            counter += 1
                            div4.appendChild(createListingPetDiv2(data, key, j, "give"))
                        }
                    }
                
                    while (counter < 9) {
                        const petDiv = document.createElement("div")
                        petDiv.className = "petDiv"
                        div4.appendChild(petDiv)
                        counter += 1
                    }

                    const div5 = document.createElement("div")
                    div5.style.height = "100%"
                    div5.style.width = "2px"
                    div5.style.backgroundColor = "black"

                    const div6 = document.createElement("div")
                    div6.className = "Grid3x3Listing"

                    counter = 0
                    for (const j in data[key]["offer"]["take"]) {
                        if (j > 7) {
                            if (data[key]["offer"]["take"].length - 8 > 1) {
                                counter += 1
                                const petDiv = document.createElement("div")
                                petDiv.className = "petDiv"
                                const txt4 = document.createElement("b")
                                txt4.innerText = "+" + (data[key]["offer"]["take"].length - 8).toString()
                                txt4.style.fontSize = (25 / ("+" + (data[key]["offer"]["take"].length - 8).toString()).length).toString() + "px"
                                petDiv.appendChild(txt4)
                                div4.appendChild(petDiv)
                            } else {
                                counter += 1
                                div6.appendChild(createListingPetDiv2(data, key, j, "take"))
                            }
                            break
                        } else {
                            counter += 1
                            div6.appendChild(createListingPetDiv2(data, key, j, "take"))

                        }
                    }

                    while (counter < 9) {
                        const petDiv = document.createElement("div")
                        petDiv.className = "petDiv"
                        div6.appendChild(petDiv)
                        counter += 1
                    }



                    div3.appendChild(div4)
                    div3.appendChild(div5)
                    div3.appendChild(div6)



                    div.appendChild(div2)
                    div.appendChild(div3)

                    container.appendChild(div)

                    const div7 = document.createElement("div")
                    div7.className = "inboxListingOptions"

                    const button1 = document.createElement("button")
                    button1.className = "inboxButton"
                    const txt5 = document.createElement("b")
                    txt5.innerText = "Accept"
                    button1.setAttribute("onclick", "acceptTradeWithKey(" + key + ")")
                    button1.style.cursor = "pointer"
                    button1.appendChild(txt5)

                    const button2 = document.createElement("button")
                    button2.className = "inboxButton"
                    const txt6 = document.createElement("b")
                    txt6.innerText = "Reject"
                    button2.setAttribute("onclick", "rejectTradeWithKey(" + key + ")")
                    button2.style.cursor = "pointer"
                    button2.appendChild(txt6)

                    div7.appendChild(button1)
                    div7.appendChild(button2)

                    const div8 = document.createElement("div")
                    div8.className = "inboxNameInfo"

                    const name = document.createElement("b")
                    name.innerText = data[key]["ownerUsername"]

                    div8.appendChild(name)

                    if (data[key]["ownerRobloxUsername"] !== "") {
                            const div9 = document.createElement("div")
                            div9.style.display = "flex"
                            div9.style.flexDirection = "row"
                            div9.style.alignItems = "center"
                            div9.style.justifyContent = "center"
                            div9.style.gap = "5px"

                            const img = document.createElement("img")
                            img.src = "../static/images/misc/robloxLogo.png"
                            img.style.height = "10px"
                            img.style.aspectRatio = "1/1"

                            const txt7 = document.createElement("p")
                            txt7.style.margin = "0px"

                            txt7.innerText = data[key]["ownerRobloxUsername"]

                            div9.appendChild(img)
                            div9.appendChild(txt7)

                            div8.appendChild(div9)
                        }

                    div7.appendChild(div8)

                    container.appendChild(div7)

                    userInbox.appendChild(container)
                })
                if (userInbox.childElementCount == 0) {
                    userInbox.innerHTML = "<p style='margin:0px;position:absolute;transform:translate(-50%, -50%);left:50%;top:300%;font-size:16rem;text-align:center;margin-top:30px;color:#6D6B70'>Your inbox is empty.</p>"
                }
            }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        }); 
    }
}


function acceptTradeWithKey(key) {
    formData = new FormData();
    formData.append('key', key)
    formData.append('action', "acceptTradeWithKey");

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
        showInbox()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });    
}

function rejectTradeWithKey(key) {
    formData = new FormData();
    formData.append('key', key)
    formData.append('action', "rejectTradeWithKey");

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
        showInbox()
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function showPendingDiv() {
    if (userID == profileID) {
        formData = new FormData();
        formData.append('action', "getPending");

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
                userPending.innerHTML = ""
                data.forEach(key => {
                    const container = document.createElement("div")
                    container.className = "pendingListing"
                    const div = document.createElement("div")
                    div.className = "inboxListingMain"
                    div.style.display = "flex"
                    div.style.flexDirection = "column"
                    div.style.justifyContent = "space-between"

                    const div2 = document.createElement("div")
                    div2.style.display = "flex"
                    div2.style.justifyContent = "space-between"
                    div2.style.alignItems = "center"

                    const txt1 = document.createElement("b")
                    txt1.innerText = "Your Offer"
                    txt1.style.color = "red"
                    txt1.style.fontSize = "10px"

                    const txt2 = document.createElement("b")
                    var text = calculateTradeValueWithInput(data[key]["offer"]["give"], data[key]["offer"]["take"])
                    if (parseFloat(text) <= 0) {
                        txt2.style.color = "black"
                        text = (Math.abs(parseFloat(text))).toString()
                    } else {
                        txt2.style.color = "red"
                    }
                    txt2.innerText = text
                    txt2.style.fontSize = "25px"

                    const txt3 = document.createElement("b")
                    txt3.innerText = "Their Offer"
                    txt3.style.fontSize = "10px"

                    div2.appendChild(txt1)
                    div2.appendChild(txt2)
                    div2.appendChild(txt3)

                    const div3 = document.createElement("div")
                    div3.className = "listingInfo"

                    const div4 = document.createElement("div")

                    div4.className = "Grid3x3Listing"

                    var counter = 0
                    for (const j in data[key]["offer"]["give"]) {
                        if (j > 7) {
                            if (data[key]["offer"]["give"].length - 8 > 1) {
                                counter += 1
                                const petDiv = document.createElement("div")
                                petDiv.className = "petDiv"
                                const txt4 = document.createElement("b")
                                txt4.innerText = "+" + (data[key]["offer"]["give"].length - 8).toString()
                                txt4.style.fontSize = (25 / ("+" + (data[key]["offer"]["give"].length - 8).toString()).length).toString() + "px"
                                petDiv.appendChild(txt4)
                                div4.appendChild(petDiv)
                            } else {
                                counter += 1
                                div4.appendChild(createListingPetDiv2(data, key, j, "give"))
                            }
                            break
                        } else {
                            counter += 1
                            div4.appendChild(createListingPetDiv2(data, key, j, "give"))
                        }
                    }
                
                    while (counter < 9) {
                        const petDiv = document.createElement("div")
                        petDiv.className = "petDiv"
                        div4.appendChild(petDiv)
                        counter += 1
                    }

                    const div5 = document.createElement("div")
                    div5.style.height = "100%"
                    div5.style.width = "2px"
                    div5.style.backgroundColor = "black"

                    const div6 = document.createElement("div")
                    div6.className = "Grid3x3Listing"

                    counter = 0
                    for (const j in data[key]["offer"]["take"]) {
                        if (j > 7) {
                            if (data[key]["offer"]["take"].length - 8 > 1) {
                                counter += 1
                                const petDiv = document.createElement("div")
                                petDiv.className = "petDiv"
                                const txt4 = document.createElement("b")
                                txt4.innerText = "+" + (data[key]["offer"]["take"].length - 8).toString()
                                txt4.style.fontSize = (25 / ("+" + (data[key]["offer"]["take"].length - 8).toString()).length).toString() + "px"
                                petDiv.appendChild(txt4)
                                div4.appendChild(petDiv)
                            } else {
                                counter += 1
                                div6.appendChild(createListingPetDiv2(data, key, j, "take"))
                            }
                            break
                        } else {
                            counter += 1
                            div6.appendChild(createListingPetDiv2(data, key, j, "take"))

                        }
                    }

                    while (counter < 9) {
                        const petDiv = document.createElement("div")
                        petDiv.className = "petDiv"
                        div6.appendChild(petDiv)
                        counter += 1
                    }



                    div3.appendChild(div4)
                    div3.appendChild(div5)
                    div3.appendChild(div6)



                    div.appendChild(div2)
                    div.appendChild(div3)

                    container.appendChild(div)

                    const div7 = document.createElement("div")
                    div7.className = "inboxListingOptions"
                    div7.style.width = "220px"

                    const button1 = document.createElement("button")
                    button1.className = "inboxButton"
                    const txt5 = document.createElement("b")
                    if (userID.toString() in data[key]["markedAsCompletedBy"]) {
                        txt5.innerText = "You marked as Completed!"
                        button1.disabled = true
                        button1.id = "completeButton" + key
                        button1.appendChild(txt5)
                    } else {
                        txt5.innerText = "Mark as Complete"
                        button1.setAttribute("onclick", "completeTradeWithKey(" + key + ")")
                        button1.id = "completeButton" + key
                        button1.style.cursor = "pointer"
                        button1.appendChild(txt5)
                    }
                    
                    const txt6 = document.createElement("p")
                    txt6.innerText = "Make sure to contact eachother on roblox!"
                    txt6.style.textAlign = "center"
                    txt6.style.width = "80%"
                    txt6.style.margin = "0px"

                    div7.appendChild(txt6)

                    const div8 = document.createElement("div")
                    div8.className = "inboxNameInfo"

                    const name = document.createElement("b")
                    name.innerText = data[key]["ownerUsername"]

                    div8.appendChild(name)

                    if (data[key]["ownerRobloxUsername"] !== "") {
                            const div9 = document.createElement("div")
                            div9.style.display = "flex"
                            div9.style.flexDirection = "row"
                            div9.style.alignItems = "center"
                            div9.style.justifyContent = "center"
                            div9.style.gap = "5px"

                            const img = document.createElement("img")
                            img.src = "../static/images/misc/robloxLogo.png"
                            img.style.height = "10px"
                            img.style.aspectRatio = "1/1"

                            const txt7 = document.createElement("p")
                            txt7.style.margin = "0px"

                            txt7.innerText = data[key]["ownerRobloxUsername"]

                            div9.appendChild(img)
                            div9.appendChild(txt7)

                            div8.appendChild(div9)
                        }

                    div7.appendChild(div8)
                    div7.appendChild(button1)

                    container.appendChild(div7)

                    userPending.appendChild(container)
                })
                if (userPending.childElementCount == 0) {
                    userPending.innerHTML = "<p style='margin:0px;position:absolute;transform:translate(-50%, -50%);left:50%;top:300%;font-size:16rem;text-align:center;margin-top:30px;color:#6D6B70;'>You have no ongoing trades.</p>"
                }
            }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        }); 
    }
}

function completeTradeWithKey(key) {

    formData = new FormData();
    formData.append('key', key)
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
        const button = document.getElementById("completeButton" + key)
        button.innerText = "You marked as Completed!"
        button.disabled = true
        button.setAttribute("onclick", "")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function showHistoryDiv() {
    formData = new FormData();
    formData.append('action', "getHistory");

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
            userHistory.innerHTML = ""
            Object.keys(data).forEach(key => {
                const container = document.createElement("div")
                container.className = "pendingListing"
                const div = document.createElement("div")
                div.className = "inboxListingMain"
                div.style.display = "flex"
                div.style.flexDirection = "column"
                div.style.justifyContent = "space-between"

                const div2 = document.createElement("div")
                div2.style.display = "flex"
                div2.style.justifyContent = "space-between"
                div2.style.alignItems = "center"

                const txt1 = document.createElement("b")
                txt1.innerText = "Your Offer"
                txt1.style.color = "red"
                txt1.style.fontSize = "10px"

                const txt2 = document.createElement("b")
                var text = calculateTradeValueWithInput(data[key]["offer"]["give"], data[key]["offer"]["take"])
                if (parseFloat(text) <= 0) {
                    txt2.style.color = "black"
                    text = (Math.abs(parseFloat(text))).toString()
                } else {
                    txt2.style.color = "red"
                }
                txt2.innerText = text
                txt2.style.fontSize = "25px"

                const txt3 = document.createElement("b")
                txt3.innerText = "Their Offer"
                txt3.style.fontSize = "10px"

                div2.appendChild(txt1)
                div2.appendChild(txt2)
                div2.appendChild(txt3)

                const div3 = document.createElement("div")
                div3.className = "listingInfo"

                const div4 = document.createElement("div")

                div4.className = "Grid3x3Listing"

                var counter = 0
                for (const j in data[key]["offer"]["give"]) {
                    if (j > 7) {
                        if (data[key]["offer"]["give"].length - 8 > 1) {
                            counter += 1
                            const petDiv = document.createElement("div")
                            petDiv.className = "petDiv"
                            const txt4 = document.createElement("b")
                            txt4.innerText = "+" + (data[key]["offer"]["give"].length - 8).toString()
                            txt4.style.fontSize = (25 / ("+" + (data[key]["offer"]["give"].length - 8).toString()).length).toString() + "px"
                            petDiv.appendChild(txt4)
                            div4.appendChild(petDiv)
                        } else {
                            counter += 1
                            div4.appendChild(createListingPetDiv2(data, key, j, "give"))
                        }
                        break
                    } else {
                        counter += 1
                        div4.appendChild(createListingPetDiv2(data, key, j, "give"))
                    }
                }
            
                while (counter < 9) {
                    const petDiv = document.createElement("div")
                    petDiv.className = "petDiv"
                    div4.appendChild(petDiv)
                    counter += 1
                }

                const div5 = document.createElement("div")
                div5.style.height = "100%"
                div5.style.width = "2px"
                div5.style.backgroundColor = "black"

                const div6 = document.createElement("div")
                div6.className = "Grid3x3Listing"

                counter = 0
                for (const j in data[key]["offer"]["take"]) {
                    if (j > 7) {
                        if (data[key]["offer"]["take"].length - 8 > 1) {
                            counter += 1
                            const petDiv = document.createElement("div")
                            petDiv.className = "petDiv"
                            const txt4 = document.createElement("b")
                            txt4.innerText = "+" + (data[key]["offer"]["take"].length - 8).toString()
                            txt4.style.fontSize = (25 / ("+" + (data[key]["offer"]["take"].length - 8).toString()).length).toString() + "px"
                            petDiv.appendChild(txt4)
                            div4.appendChild(petDiv)
                        } else {
                            counter += 1
                            div6.appendChild(createListingPetDiv2(data, key, j, "take"))
                        }
                        break
                    } else {
                        counter += 1
                        div6.appendChild(createListingPetDiv2(data, key, j, "take"))

                    }
                }

                while (counter < 9) {
                    const petDiv = document.createElement("div")
                    petDiv.className = "petDiv"
                    div6.appendChild(petDiv)
                    counter += 1
                }



                div3.appendChild(div4)
                div3.appendChild(div5)
                div3.appendChild(div6)



                div.appendChild(div2)
                div.appendChild(div3)

                container.appendChild(div)

                const div7 = document.createElement("div")
                div7.className = "inboxListingOptions"
                div7.style.width = "220px"

                
                const txt6 = document.createElement("p")
                if (profileID == data[key]["owner"]) {
                    txt6.innerText = "Trade done with: " + data[key]["acceptedByUsername"]
                } else {
                    txt6.innerText = "Trade done with: " + data[key]["ownerUsername"]
                }
                txt6.style.textAlign = "center"
                txt6.style.width = "80%"
                txt6.style.margin = "0px"

                div7.appendChild(txt6)

                container.appendChild(div7)

                userHistory.appendChild(container)
            })
            if (userHistory.childElementCount == 0) {
                if (userID == profileID) {
                    userHistory.innerHTML = "<p style='margin:0px;position:absolute;transform:translate(-50%, -50%);left:50%;top:300%;font-size:16rem;text-align:center;margin-top:30px;color:#6D6B70;'>You have not completed any trades, yet.</p>"
                } else {
                    userHistory.innerHTML = "<p style='margin:0px;position:absolute;transform:translate(-50%, -50%);left:50%;top:300%;font-size:25px;text-align:center;margin-top:50px;'>This user has not completed any trades</p>"
                }
                
            }
        }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    }); 
}

function editProfile() {
    window.location.href = window.location.href + "/edit"
}

function updateViews(index) {
    formData = new FormData();
    formData.append('user2ID', (profileID).toString())
    formData.append('index', index)
    formData.append('action', "updateViewsOnTrade");

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
        
    }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function setCalculationValue(type) {
    var chooseValueButtons = document.querySelectorAll(".chooseValueButton")
    calculateWithValue = type
    chooseValueButtons.forEach(div => {
        const children = div.children

        for (let i = 0; i < children.length; i++) {
            if (type == "shark") {
                children[i].style.left = "0%"
            } else if (type == "frost") {
                children[i].style.left = "50%"
            }
        }
    })
    insertValuesIntoCreateListingInterface()

}

function openCreateListingInterface() {
    var createListingInterface = document.getElementById("createListingInterface")
    var createListingInterfaceBackground = document.getElementById("createListingInterfaceBackground")
    createListingInterface.style.display = "flex"
    createListingInterfaceBackground.style.display = "flex"
}

function closeCreateListingInterface() {
    var createListingInterface = document.getElementById("createListingInterface")
    var createListingInterfaceBackground = document.getElementById("createListingInterfaceBackground")
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
                    petValue *= frostWorth
                }
                if (petValue > 0) {
                    value += petValue
                }
            }
        }
    }
    return value
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

window.addEventListener("resize", event => {
    var createListingInterface = document.getElementById("createListingInterface")
    var child3 = createListingInterface.children[1].children[0].children[1].children[0]
    child3.style.transition = "none"
})

function isValidFloat(value) {
    const parsedValue = parseFloat(value);
    return value.toString() == parsedValue.toString() || (value.split(".").length == 2 && value.charAt(value.length - 1) == ".") || (parsedValue.toString().length != value.length && parsedValue - value == 0);
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
    console.log(extraSharkValueRequested)
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
    if (data == "SUCCESS") {
        closeCreateListingInterface()
        displayMessage("You created a listing!")
        
    } else {
        displayError(data)
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });  
}