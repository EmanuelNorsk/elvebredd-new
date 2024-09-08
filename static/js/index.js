var mouseX = 0
var mouseY = 0
var selectedCategory = 0
var offerAccepted = false  
var lastUsedKey = "-1"
var listingPart1Dict = {}
var listingPart2Dict = {}
var scrollSpeed = 3
var mYO = 0
var mTO = 0
var currentListing = 0
var fly = 0
var ride = 0
var regular = 1
var neon = 0
var mega = 0
var calculateWithValue = "shark" 
var addPetToType = ""
var displayPetsFirstTime = 0
var lastFilter = "all"
var autoScroll = 0
var userInterruptSlideScroll = 0
var yourOfferExtraPets = []
var theirOfferExtraPets = []
var remainingScroll = 0.00
var scrolling = false
var scrollSharpness = 1
var scrollStrength = 1
var lastFilter = "all"
var petsAdded = 0
var listingSize = 300
var body = document.createElement("div")

var petsDict = {}
var userData = {}

var listingsScrollSpeed = 6

var petImage = document.createElement("div")

window.addEventListener("DOMContentLoaded", event => {
    body = document.body
    var tradesDictElement = document.getElementById("tradesDict")
    var trades = JSON.parse(tradesDictElement.textContent)
    var petsDictElement = document.getElementById("petsDict-data")
    petsDict = JSON.parse(petsDictElement.textContent)
    var userDataElement = document.getElementById("userData-data")
    userData = JSON.parse(userDataElement.textContent)
    var listingsCategory1 = document.getElementById("listingsCategory1")
    var listingsCategory2 = document.getElementById("listingsCategory2")
    var listingsCategory3 = document.getElementById("listingsCategory3")
    var petSearch = document.getElementById("petSearch")
    var errorDiv = document.getElementById("errorDiv")
    var errorText = document.getElementById("errorText")
    var addInventory = document.getElementById("addInventory")
    var addInventoryBackground = document.getElementById("addInventoryBackground")
    var filterElement = document.getElementById("filter")
    petImage = document.querySelectorAll(".petImage")
    var flyButton = document.getElementById("flyButton")
    var rideButton = document.getElementById("rideButton")
    var regularButton = document.getElementById("regularButton")
    var neonButton = document.getElementById("neonButton")
    var megaButton = document.getElementById("megaButton")
    var messageDiv = document.getElementById("messageDiv")
    var messageText = document.getElementById("messageText")   
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
    var filterButtons = document.getElementById("filterButtons")
    var petAdded = document.getElementById("petAdded")
    var petAddedText = document.getElementById("petAddedText")
    var listingPart1 = document.getElementById("listingPart1")
    var listingPart2 = document.getElementById("listingPart2")
    var owner = document.getElementById("owner")
    var listingValue = document.getElementById("listingValue")
    var modifyTheirOfferElement = document.getElementById("modifyTheirOffer")
    var modifyYourOfferElement = document.getElementById("modifyYourOffer")
    var listingAcceptButton = document.getElementById("listingAcceptButton")
    var listingCustomOfferButton = document.getElementById("listingCustomOfferButton")
    var listings = document.querySelectorAll(".listings")
    //var leftArrow = document.getElementById("leftArrow")
    //var rightArrow = document.getElementById("rightArrow")
    var offers = document.getElementById("offers")
    var listingInterface2Preferences = document.getElementById("listingInterface2Preferences")
    var listingInterface2Main = document.getElementById("listingInterface2Main")
    var listingInterface2 = document.getElementById("listingInterface2")
    var listingInterface2Background = document.getElementById("listingInterface2Background")
    var listingInterface2YourOfferPets = document.getElementById("listingInterface2YourOfferPets")
    var listingInterface2TheirOfferPets = document.getElementById("listingInterface2TheirOfferPets")
    var yourOfferValue = document.getElementById("yourOfferValue")
    var theirOfferValue = document.getElementById("theirOfferValue")
    var sharkValueRequested = document.getElementById("sharkValueRequested")
    var sharkValueRequestedDiv = document.getElementById("sharkValueRequestedDiv")
    var timeAgoListed = document.getElementById("timeAgoListed")
    var totalOffers = document.getElementById("totalOffers")
    var listingRobloxUsername = document.getElementById("listingRobloxUsername")
    var completedTradesByUser = document.getElementById("completedTradesByUser")
    var changeButton = document.getElementById("changeButton")
    var finishButton = document.getElementById("finishButton")
    var youAddTheyAdd = document.getElementById("youAddTheyAdd")
    var header = document.querySelector("header")
    var nav = document.querySelector("nav")

    header.style.height = (nav.offsetHeight * 1).toString() + "px"

    var slides = document.getElementById("slides")

    initiateSlides()
    updateSlides()

    if (1 == 2) {
        setTimeout(event => {
            if (userInterruptSlideScroll == 0) {
                changeSlideBy(1)
            } else {
                userInterruptSlideScroll = 0
            }
            setInterval(event => {
                if (userInterruptSlideScroll == 0) {
                    changeSlideBy(1)
                } else {
                    userInterruptSlideScroll = 0
                }
            }, 15000)
        }, 7500)
    }

    //showUserListings(trades["Suggested"], listingsCategory1)
    //showUserListings(trades["Recent"], listingsCategory2)
    //showUserListings(trades["Overpay"], listingsCategory3)

    loadListingsInto(trades["Suggested"], document.getElementById("suggestedListings"))
    loadListingsInto(trades["Recent"], document.getElementById("recentListings"))
    loadListingsInto(trades["Overpay"], document.getElementById("overpayListings"))

    listingInterface2Background.addEventListener("wheel", event => {
        if (remainingScroll * event.deltaY < 0) {
            remainingScroll = 0
        }
        remainingScroll += event.deltaY * scrollStrength
        if (scrolling == false) {
            scroll()
        }
    })

    
    document.addEventListener("mousemove", event => {
        var hover = 0
        mouseX = event.clientX
        mouseY = event.clientY
        listings.forEach(element => {
            if (mouseOverElement(element)) {
                selectedCategory = element
                hover = 1
                //updateArrows()
            }
        })
        //if (hover == 0) {
        //    leftArrow.style.display = "none"
        //    rightArrow.style.display = "none"
        //}
    })

    document.addEventListener("scroll", event => {
        var hover = 0
        listings.forEach(element => {
            if (mouseOverElement(element)) {
                selectedCategory = element
                hover = 1
                //updateArrows()
            }
        })
        //if (hover == 0) {
        //    leftArrow.style.display = "none"
        //    rightArrow.style.display = "none"
        //}
    })

    //window.addEventListener("resize", (event) => {
    //    var hover = 0
    //    listings.forEach(element => {
    //        updateUserListings(element, true)
    //        if (mouseOverElement(element)) {
    //            selectedCategory = element
    //            hover = 1
    //            updateArrows()
    //        }
    //    })
    //    if (hover == 0) {
    //        leftArrow.style.display = "none"
    //        rightArrow.style.display = "none"
    //    }
    //})

    window.addEventListener("resize", event => {
        header.style.height = (nav.offsetHeight * 1).toString() + "px"
    })

})

function initiateSlides() {
    for (let i = 0; i < slides.children.length; i++) {
        slides.children[i].setAttribute("slidenumber", i.toString())
        slides.children[i].setAttribute("side", "none")
        slides.setAttribute("onslide", "0")
    }
}

function updateSlides() {
    // 90vw + 1.5vw = 91.5vw
    var slideDots = document.getElementById("slideDots")
    slideDots.innerHTML = ""
    var onSlide = parseInt(slides.getAttribute("onslide"))
    const distance = 1.5 + parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--slide-size').toString().replace("vw", ""))
    for (let i = 0; i < slides.children.length; i++) {
        const slideNumber = parseInt(slides.children[i].getAttribute("slidenumber"))
        if (i > onSlide) {
            posRight = i - onSlide
            posLeft = slides.children.length - (i - onSlide)
        } else if (i == onSlide) {
            posRight = 0
            posLeft = 0
        } else {
            posRight = slides.children.length - (onSlide - i)
            posLeft = onSlide - i
        }
        if (posLeft < posRight) {
            if (slides.children[i].getAttribute("side") == "right" && (posLeft != posRight)) {
                slides.children[i].style.transition = "none"
            }
            slides.children[i].style.left = "-" + (posLeft * distance - 50).toString() + "%"
            setTimeout(event => {
                slides.children[i].style.transition = "left 0.3s ease, filter 0.3s ease, opacity 0.3s ease"
            }, 10)
            if (posLeft == posRight) {
                slides.children[i].setAttribute("side", "middle")
            } else {
                slides.children[i].setAttribute("side", "left")
            }
        } else {
            if (slides.children[i].getAttribute("side") == "left" && (posLeft != posRight)) {
                slides.children[i].style.transition = "none"
            }
            slides.children[i].style.left = (posRight * distance + 50).toString() + "%"
            setTimeout(event => {
                slides.children[i].style.transition = "left 0.3s ease, filter 0.3s ease, opacity 0.3s ease"
            }, 10)
            if (posLeft == posRight) {
                slides.children[i].setAttribute("side", "middle")
            } else {
                slides.children[i].setAttribute("side", "right")
            }
        }
        const div = document.createElement("div")
        div.setAttribute("onclick", "changeSlideTo(" + i.toString() + ")")
        if (posLeft == 0) {
            div.className = "red"
            slides.children[i].style.cursor = "default"
            slides.children[i].setAttribute("onclick", "")
            slides.children[i].querySelectorAll("figure").forEach(figure => {
                figure.style.display = "none"
            })
            slides.children[i].style.filter = "none"
            slides.children[i].style.opacity = "1"
        }  else {
            slides.children[i].setAttribute("onclick", "changeSlideTo(" + i.toString() + ")")
            slides.children[i].style.cursor = "pointer"
            slides.children[i].querySelectorAll("figure").forEach(figure => {
                figure.style.display = "block"
            })
            slides.children[i].style.filter = "grayscale(0.6) brightness(1.05)"
            slides.children[i].style.opacity = "0.3"
        } 
        slideDots.appendChild(div)
        
    }
}

function changeSlideTo(slidenumber) {
    var onSlide = parseInt(slidenumber)
    slides.setAttribute("onslide", onSlide.toString())
    userInterruptSlideScroll = 1
    updateSlides()
}

function changeSlideBy(number) {
    var onSlide = parseInt(slides.getAttribute("onslide"))
    onSlide += parseInt(number)
    while (onSlide < 0 || onSlide > (slides.children.length - 1)) {
        if (onSlide < 0) {
            onSlide += slides.children.length
        } else {
            onSlide -= slides.children.length
        }
    }
    slides.setAttribute("onslide", onSlide.toString())
    updateSlides()
}

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

function scroll() {
    scrolling = true
    listingInterface2.scrollTop += remainingScroll * scrollSharpness
    remainingScroll -= remainingScroll * scrollSharpness
    if (remainingScroll * scrollSharpness > 1) {
        setTimeout(scroll(), (1000 / 60))
    } else {
        listingInterface2.scrollTop += remainingScroll
        remainingScroll = 0
        scrolling = false
    }
}

function setAddPetTypeTo(type) {
    addPetType = type
}

function createListingPetDivWithKey(data, key, counter2, tradePart) {
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

function acceptOfferWithKey(key) {
    if (offerAccepted == false) {
        formData = new FormData();
        formData.append('key', key)
        formData.append('action', "acceptOfferWithKey");

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

function sendCustomOfferWithKey() {
    formData = new FormData();
    formData.append('trade1', JSON.stringify(listingPart1Dict))
    formData.append('trade2', JSON.stringify(listingPart2Dict))
    formData.append('user', currentListing["owner"])
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

function displayMessage(message) {
    messageDiv.style.bottom = "10%"
    messageText.innerText = message
    setTimeout((event) => {
        messageDiv.style.bottom = "-100%"
    }, 2000)
}

function showUserListings(listings, target) {
    var petsDictElement = document.getElementById("petsDict-data")
    var petsDict = JSON.parse(petsDictElement.textContent)
    target.innerHTML = ""
    target.setAttribute("scroll", "0")
    target.setAttribute("firstScroll", "1")
    var id = 0
    Object.keys(listings).forEach(key => {
        const div = document.createElement("div")
        div.className = "userListingsListing"
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
                        megaDiv.appendChild(tx4t4)
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
        if ( loggedIn == "True" ) {
            div.setAttribute("onclick", "showUserListings2(" + JSON.stringify(listings[key]) + ")");
        }
        target.appendChild(div)
        id += 1
    })

    updateUserListings(target, true)
}

function scrollBackward() {
    var scroll = parseInt(selectedCategory.getAttribute("scroll"))
    scroll -= scrollSpeed
    selectedCategory.setAttribute("scroll", scroll.toString())
    updateUserListings(selectedCategory, false)
}

function scrollForward() {
    var scroll = parseInt(selectedCategory.getAttribute("scroll"))
    scroll += scrollSpeed
    selectedCategory.setAttribute("scroll", scroll.toString())
    selectedCategory.setAttribute("firstScroll", "0")
    updateUserListings(selectedCategory, false)
}

function mouseOverElement(element) {
    if (element != undefined) {
        const rect = element.getBoundingClientRect();
        return (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        );
    } else {
        return false
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

function updateArrows() {
    listingSize = window.innerHeight / 100 * 15.625
    const rect = selectedCategory.getBoundingClientRect()
    leftArrow.style.left = (rect.x + parseInt(selectedCategory.getAttribute("scrollOffset"))).toString() + "px"
    leftArrow.style.top = (rect.y + 105).toString() + "px"
    rightArrow.style.left = (rect.width - parseInt(selectedCategory.getAttribute("scrollOffset"))).toString() + "px"
    rightArrow.style.top = (rect.y + 105).toString() + "px"
    rightArrow.style.paddingLeft = (listingSize / 2 - ((listingSize / 2) - selectedCategory.getAttribute("scrollOffset")) / 2).toString() + "px"
    leftArrow.style.paddingRight = (listingSize / 2 - ((listingSize / 2) - selectedCategory.getAttribute("scrollOffset")) / 2).toString() + "px"
    leftArrow.style.display = "flex"
    rightArrow.style.display = "flex"
    if (selectedCategory.getAttribute("firstScroll") == "1") {
        leftArrow.style.display = "none"
    }
}


function updateUserListings(listings, resize) {
    listingSize = window.innerHeight / 100 * 15.625
    var listingsTitles = document.querySelectorAll(".listingsTitles")
    var scroll = parseInt(listings.getAttribute("scroll"))
    var fitFor = parseInt((window.innerWidth - 100) / listingSize)
    scrollSpeed = fitFor
    var offset = ((fitFor / 2) - 0.5)
    var id = 0
    var listingOffset = 0
    var left = 0
    var right = 0
    var posX = 0
    var firstScroll = parseInt(listings.getAttribute("firstScroll"))
    Array.from(listings.children).forEach(listing => {
        id = parseInt(listing.getAttribute("id"))
        left1 = (listingSize * (id - (scroll % listings.children.length) - offset))
        left2 = (listingSize * (id - (scroll % listings.children.length) - (listings.children.length - 1) - offset))
        left3 = (listingSize * (id - (scroll % listings.children.length) + (listings.children.length - 1) - offset))
        leftOffset = Math.min(Math.abs(left1), Math.abs(left2), Math.abs(left3))
        if (Math.abs(left1) == leftOffset) {
            left = left1
        } else if (Math.abs(left2) == leftOffset) {
            left = left2
        } else {
            left = left3
        }

        right1 = (listingSize * ((id - (listings.children.length - 1)) - (scroll % listings.children.length) - offset))
        right2 = (listingSize * ((id - (listings.children.length - 1)) - (scroll % listings.children.length) - (listings.children.length - 1) - offset))
        right3 = (listingSize * ((id - (listings.children.length - 1)) - (scroll % listings.children.length) + (listings.children.length - 1) - offset))
        rightOffset = Math.min(Math.abs(right1), Math.abs(right2), Math.abs(right3))
        if (Math.abs(right1) == rightOffset) {
            right = right1
        } else if (Math.abs(right2) == rightOffset) {
            right = right2
        } else {
            right = right3
        }
    

        listingOffset = Math.min(Math.abs(left), Math.abs(right))
        if (listingOffset == Math.abs(left)) {
            listingOffset = left
        } else {
            listingOffset = right
        }
        posX = ((listings.offsetWidth / 2) + listingOffset).toString()
        if ((Math.abs(listing.getBoundingClientRect().left - posX) > window.innerWidth) || resize == true) {
            listing.style.transition = "none"
        } else {
            listing.style.transition = "1s ease"
        }
        listing.style.left = posX + "px"
        if ((listingSize / 2) < posX && posX < window.innerWidth - (listingSize / 2)) {
            listing.style.opacity = "1"
            listing.style.filter = "brightness(100%)"
            listing.style.cursor = "normal"
        } else {
            listing.style.opacity = "0.5"
            listing.style.filter = "brightness(50%)"
            listing.style.cursor = "pointer"
            if (firstScroll == 1 && posX < window.innerWidth - (listingSize / 2)) {
                listing.style.opacity = "0"
            }
        }
        if (id == (scroll % listings.children.length)) {
            listings.setAttribute("scrollOffset", ((listings.offsetWidth / 2) + listingOffset - listingSize).toString())
            listingsTitles.forEach(element => {
                element.style.marginLeft = (listingSize / 2 + ((listings.offsetWidth / 2) + listingOffset - listingSize)).toString() + "px"
            })
        }

    })

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

    const listingInterface2Value = document.getElementById("listingInterface2Value")

    if (listing["extraSharkValueRequested"] == 0 || listing["extraSharkValueRequested"] == undefined) {
        yourOfferValue.innerText = listing["offer"]["giveValue"].toFixed(2)
        theirOfferValue.innerText = listing["offer"]["takeValue"].toFixed(2)
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
        listingCombinedValue = parseFloat((listing["offer"]["giveValue"] - listing["offer"]["takeValue"] + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets)).toFixed(2))
    } else if (listing["extraSharkValueRequested"] > 0) {
        yourOfferValue.innerText = listing["offer"]["giveValue"].toFixed(2).toString() + " + " + listing["extraSharkValueRequested"].toString()
        theirOfferValue.innerText = listing["offer"]["takeValue"].toFixed(2)
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = listing["extraSharkValueRequested"].toFixed(2)
        youAddTheyAdd.innerText = "YOU ADD:"
        listingCombinedValue = parseFloat((listing["offer"]["giveValue"] - listing["offer"]["takeValue"] + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets) + (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets))).toFixed(2))
    } else if (listing["extraSharkValueRequested"] < 0) {
        yourOfferValue.innerText = listing["offer"]["giveValue"].toFixed(2)
        theirOfferValue.innerText = listing["offer"]["takeValue"].toFixed(2).toString() + " + " + Math.abs(listing["extraSharkValueRequested"]).toString()
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = Math.abs(listing["extraSharkValueRequested"]).toFixed(2)
        youAddTheyAdd.innerText = "THEY ADD:"
        listingCombinedValue = parseFloat((listing["offer"]["giveValue"] - listing["offer"]["takeValue"] + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets) - (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets))).toFixed(2))
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

function closeListingInterface2() {
    listingInterface2.style.display = "none"
    listingInterface2Background.style.display = "none"
    enableScrolling()
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

    const listingInterface2Value = document.getElementById("listingInterface2Value")
    var listingCombinedValue = 0

    if (listing["extraSharkValueRequested"] == 0 || listing["extraSharkValueRequested"] == undefined) {
        yourOfferValue.innerText = (listing["offer"]["giveValue"] + calculateValue(yourOfferExtraPets)).toFixed(2)
        theirOfferValue.innerText = (listing["offer"]["takeValue"] + calculateValue(theirOfferExtraPets)).toFixed(2)
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
        listingCombinedValue = parseFloat((listing["offer"]["giveValue"] - listing["offer"]["takeValue"] + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets)).toFixed(2))
    } else if (listing["extraSharkValueRequested"] > 0 && calculateValue(yourOfferExtraPets) < listing["extraSharkValueRequested"]) {
        yourOfferValue.innerText = (listing["offer"]["giveValue"] + calculateValue(yourOfferExtraPets)).toFixed(2).toString() + " + " + (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets)).toFixed(2).toString()
        theirOfferValue.innerText = listing["offer"]["takeValue"].toFixed(2)
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets)).toFixed(2)
        listingCombinedValue = parseFloat((listing["offer"]["giveValue"] - listing["offer"]["takeValue"] + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets) + (listing["extraSharkValueRequested"] - calculateValue(yourOfferExtraPets))).toFixed(2))
    } else if (listing["extraSharkValueRequested"] < 0 && calculateValue(theirOfferExtraPets) < Math.abs(listing["extraSharkValueRequested"])) {
        yourOfferValue.innerText = listing["offer"]["giveValue"].toFixed(2)
        theirOfferValue.innerText = (listing["offer"]["takeValue"] + calculateValue(theirOfferExtraPets)).toFixed(2).toString() + " + " + (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets)).toFixed(2).toString()
        finishButton.disabled = true
        sharkValueRequestedDiv.style.display = "flex"
        changeButton.disabled = false
        sharkValueRequested.innerText = (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets)).toFixed(2)
        listingCombinedValue = parseFloat((listing["offer"]["giveValue"] - listing["offer"]["takeValue"] + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets) - (Math.abs(listing["extraSharkValueRequested"]) - calculateValue(theirOfferExtraPets))).toFixed(2))
    } else {
        yourOfferValue.innerText = (listing["offer"]["giveValue"] + calculateValue(yourOfferExtraPets)).toFixed(2)
        theirOfferValue.innerText = (listing["offer"]["takeValue"] + calculateValue(theirOfferExtraPets)).toFixed(2)
        finishButton.disabled = false
        sharkValueRequestedDiv.style.display = "none"
        changeButton.disabled = false
        listingCombinedValue = parseFloat((listing["offer"]["giveValue"] - listing["offer"]["takeValue"] + calculateValue(yourOfferExtraPets) - calculateValue(theirOfferExtraPets)).toFixed(2))
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

function declineOffer(offerID) {
    formData = new FormData();
    formData.append('id', currentListing["id"])
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
        const listingDiv = document.querySelector(`div.userListingsListing[data-key="${currentListing["id"]}"]`)
        if (listingDiv) {
            const onClick = listingDiv.getAttribute('onclick');
            var extractedValue = onClick.slice(18, -1).trim();
            extractedValue = JSON.parse(extractedValue)
            extractedValue["customOffers"][offerID]["status"] = "Declined"
            listingDiv.setAttribute("onclick", "showUserListings2(" + JSON.stringify(extractedValue) + ")")
            currentListing = extractedValue
            showOffers(currentListing)
        }
    } else {
        displayError("Something went wrong!")
    }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function acceptOffer(offerID) {
    formData = new FormData();
    formData.append('id', currentListing["id"])
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
        const listingDiv = document.querySelector(`div.userListingsListing[data-key="${currentListing["id"]}"]`)
        if (listingDiv) {
            const onClick = listingDiv.getAttribute('onclick');
            var extractedValue = onClick.slice(18, -1).trim();
            extractedValue = JSON.parse(extractedValue)
            extractedValue["customOffers"][offerID]["status"] = "Accepted"
            extractedValue["acceptedAt"] = Math.floor(Date.now() / 1000)
            extractedValue["acceptedUser"] = userData["id"]
            extractedValue["acceptedUserUsername"] = userData["username"]
            extractedValue["acceptedUserRobloxUsername"] = userData["robloxUsername"]
            listingDiv.setAttribute("onclick", "showUserListings2(" + JSON.stringify(extractedValue) + ")")
            currentListing = extractedValue
            showOffers(currentListing)
        }
    } else {
        displayError("Something went wrong!")
    }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function displayPets() {
    var petImages = document.getElementById("petImages")
    displayPetsFirstTime = 1
    petImages.innerHTML = ""
    Object.keys(petsDict).forEach(key => {
        let pet = petsDict[key]
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
        } else {
            console.log("HI")
        }
    })
}

function openInventory() {
    displayPets()
    addInventory.style.display = "block"
    addInventoryBackground.style.display = "block"
}

function closeInventory() {
    addInventory.style.display = "none"
    addInventoryBackground.style.display = "none"
}

function handleImageError(image) {
    image.style.display = 'none';
}

function addPetToInventory(pet) {
    if (addPetType == "listing1") {
        listingPart1Dict.push({
            "id":pet,
            "fly":fly,
            "ride":ride,
            "regular":regular,
            "neon":neon,
            "mega":mega
        })
        showUserListings2(currentListing, 1)
    } else if (addPetType == "listing2") {
        listingPart2Dict.push({
            "id":pet,
            "fly":fly,
            "ride":ride,
            "regular":regular,
            "neon":neon,
            "mega":mega
        })
        showUserListings2(currentListing, 1)
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
}

function removePetFromInventory(type, pet) {
    if (type == "listing1") {
        listingPart1Dict.splice(pet, 1)
        showUserListings2(currentListing, 1)
    } else if (type == "listing2") {
        listingPart2Dict.splice(pet, 1)
        showUserListings2(currentListing, 1)
    } else if (type == "listingInterface2") {
        if (currentListing["extraSharkValueRequested"] > 0 || currentListing["extraSharkValueRequested"] == 0) {
            yourOfferExtraPets.splice(pet, 1)
        } else {
            theirOfferExtraPets.splice(pet, 1)
        }
        updateListingInterface2()
    }
}

function updateViewsWithKey(key) {
    formData = new FormData();
    formData.append('key', key)
    formData.append('action', "updateViewsOnTradeWithKey");

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

function displayError(error) {
    errorDiv.style.bottom = "10%"
    errorText.innerText = error
    setTimeout((event) => {
        errorDiv.style.bottom = "-100%"
    }, 2000)
}

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

function scrollListings(event, direction) {
    let element = event.target
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
            offset = listing.getBoundingClientRect().width * listingsScrollSpeed - parseFloat(window.getComputedStyle(element).gap.split("px")[0]) * 0.0
        } else {
            offset = (listing.getBoundingClientRect().width * listingsScrollSpeed - parseFloat(window.getComputedStyle(element).gap.split("px")[0]) * 0.0) * -1
        }
        left += offset
        element.style.marginLeft = left.toString() + "px"
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

function loadListingsInto(listings, target) {
    target.innerHTML = ""
    Object.values(listings).forEach(listing => {
        let listingTemplate = createListingTemplate()
        let value1 = calculateValue(listing["offer"]["give"]) + listing["extraSharkValueRequested"]
        let value2 = calculateValue(listing["offer"]["take"])
        var combinedValue = parseFloat(Math.abs(value1 - value2).toFixed(2))
        if (Math.abs(Math.round(combinedValue) - combinedValue) < 0.02) {
            combinedValue = Math.round(combinedValue)
        }
        listingTemplate.children[1].children[0].children[1].textContent = combinedValue.toString()
        if (value1 > value2) {
            listingTemplate.children[1].children[0].children[0].style.color = "rgb(255, 102, 102)"
            listingTemplate.children[1].children[0].children[1].style.color = "rgb(255, 102, 102)"
            listingTemplate.children[1].children[1].children[1].style.background = "linear-gradient(0deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%);"
            listingTemplate.style.background = "linear-gradient(180deg, rgb(253, 249, 234) 0%, rgb(255, 102, 102) 100%);"
        } else if (value1 < value2) {
            listingTemplate.children[1].children[0].children[2].style.color = "rgb(255, 102, 102)"
        }
        
        for (let i = 0; i < listing["offer"]["give"].length && i < 8; i++) {
            const img = document.createElement("img")
            img.src = petsDict[listing["offer"]["give"][i]["id"]]["image"]
            listingTemplate.children[1].children[1].children[0].appendChild(img)
        }

        if (listing["offer"]["give"].length == 9) {
            const img = document.createElement("img")
            img.src = petsDict[listing["offer"]["give"][8]["id"]]["image"]
            listingTemplate.children[1].children[1].children[0].appendChild(img)
        } else if (listing["offer"]["give"].length > 9) {
            const p = document.createElement("p")
            p.textContent = "+" + (listing["offer"]["give"].length - 8).toString()
            listingTemplate.children[1].children[1].children[0].appendChild(p)
        }

        for (let i = 0; i < listing["offer"]["take"].length && i < 8; i++) {
            const img = document.createElement("img")
            img.src = petsDict[listing["offer"]["take"][i]["id"]]["image"]
            listingTemplate.children[1].children[1].children[2].appendChild(img)
        }

        if (listing["offer"]["take"].length == 9) {
            const img = document.createElement("img")
            img.src = petsDict[listing["offer"]["take"][8]["id"]]["image"]
            listingTemplate.children[1].children[1].children[2].appendChild(img)
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
    })
}