const path = window.location.pathname
const pathParts = path.split("/")
const petPageID = pathParts[pathParts.length - 1]
var oldUnderNavScroll = 0
var petsDict = {}
var listingsScrollSpeed = 5
var userData = {}
var loggedIn = false

var fly = 0
var ride = 0
var regular = 1
var neon = 0
var mega = 0

var remainingScroll = 0.00
var scrollStrength = 1
var scrolling = false
var scrollSharpness = 1


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
        var main = document.querySelector("main")

        main.children[0].children[0].src = petsDict[petPageID]["image"]
        main.children[0].children[1].children[0].textContent = petsDict[petPageID]["name"]
        if (Object.keys(petsDict[petPageID]).includes("rvalue") == false) {
            main.children[0].children[1].children[2].children[0].style.display = "none"
        }
        if (Object.keys(petsDict[petPageID]).includes("nvalue") == false) {
            main.children[0].children[1].children[2].children[1].style.display = "none"
        }
        if (Object.keys(petsDict[petPageID]).includes("mvalue") == false) {
            main.children[0].children[1].children[2].children[2].style.display = "none"
        }
    } else {
        displayError("ERROR")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
}); 

formData = new FormData();
formData.append('action', "getYourUserData");

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

window.addEventListener("DOMContentLoaded", event => {

    var listingInterface2Background = document.getElementById("listingInterface2Background")

    var allListings = document.getElementById("allListings")
    var allHistory = document.getElementById("allHistory")

    formData = new FormData();
    formData.append('pet', petPageID);
    formData.append('action', "getSuggestedTradesForPetPage");
    
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
        Object.keys(data).forEach(key => {
            const div = document.createElement("div")
            const category = document.createElement("p")
            category.classList.add("categoryTitle")
            category.textContent = key.charAt(0).toUpperCase() + key.slice(1)
            div.appendChild(category)
            const container = document.createElement("div")
            container.classList.add("categoryContainer")
            container.classList.add("listings")
            div.appendChild(container)
            allListings.appendChild(div)
            loadListingsInto(data[key], container, petPageID)
        })
    } else {
        displayError("ERROR")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    }); 

    formData = new FormData();
    formData.append('pet', petPageID);
    formData.append('action', "getHistoryTradesForPetPage");
    
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
        Object.keys(data).forEach(key => {
            const div = document.createElement("div")
            const category = document.createElement("p")
            category.classList.add("categoryTitle")
            category.textContent = key.charAt(0).toUpperCase() + key.slice(1)
            div.appendChild(category)
            const container = document.createElement("div")
            container.classList.add("categoryContainer")
            div.appendChild(container)
            allHistory.appendChild(div)
            loadHistoryInto(data[key], container, petPageID)
        })
    } else {
        displayError("ERROR")
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    }); 



    var selectListing = document.getElementById("selectListing")
    var selectHistory = document.getElementById("selectHistory")

    var defaultSortButton = document.getElementById("defaultSortButton")
    var neonSortButton = document.getElementById("neonSortButton")
    var megaSortButton = document.getElementById("megaSortButton")

    var defaultSort = true
    var neonSort = true
    var megaSort = true

    selectListing.classList.add("permaHover")
    var sectionSelected = "Listings"
    var allListings = document.getElementById("allListings")
    allListings.style.display = "flex"
    allHistory.style.display = "none"


    selectListing.addEventListener("click", event => {
        if (selectListing.classList.contains("permaHover") == false) {
            selectListing.classList.add("permaHover")
            allListings.style.display = "flex"
        }
        if (selectHistory.classList.contains("permaHover") == true) {
            selectHistory.classList.remove("permaHover")
            allHistory.style.display = "none"
        } 
    })

    selectHistory.addEventListener("click", event => {
        if (selectListing.classList.contains("permaHover") == true) {
            selectListing.classList.remove("permaHover")
            allListings.style.display = "none"
        }
        if (selectHistory.classList.contains("permaHover") == false) {
            selectHistory.classList.add("permaHover")
            allHistory.style.display = "flex"
        } 
    })

    defaultSortButton.addEventListener("click", event => {
        if (defaultSort) {
            defaultSort = false
            defaultSortButton.classList.add("unselected")
        } else {
            defaultSort = true
            defaultSortButton.classList.remove("unselected")
        }
        sortAllListings(petPageID, defaultSort, neonSort, megaSort)
        sortAllHistory(petPageID, defaultSort, neonSort, megaSort)
    })

    neonSortButton.addEventListener("click", event => {
        if (neonSort) {
            neonSort = false
            neonSortButton.classList.add("unselected")
        } else {
            neonSort = true
            neonSortButton.classList.remove("unselected")
        }
        sortAllListings(petPageID, defaultSort, neonSort, megaSort)
        sortAllHistory(petPageID, defaultSort, neonSort, megaSort)
    })

    megaSortButton.addEventListener("click", event => {
        if (megaSort) {
            megaSort = false
            megaSortButton.classList.add("unselected")
        } else {
            megaSort = true
            megaSortButton.classList.remove("unselected")
        }
        sortAllListings(petPageID, defaultSort, neonSort, megaSort)
        sortAllHistory(petPageID, defaultSort, neonSort, megaSort)
    })

    listingInterface2Background.addEventListener("wheel", event => {
        if (remainingScroll * event.deltaY < 0) {
            remainingScroll = 0
        }
        remainingScroll += event.deltaY * scrollStrength
        if (scrolling == false) {
            scroll()
        }
    })

})


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

function loadListingsInto(listings, target, petID) {
    target.innerHTML = ""
    Object.values(listings).forEach(listing => {
        if (listingAllowed(listing, petID)) {
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
            if (outOfBounds.includes("left") && target.children.length != 1) {
                listingTemplate.classList.add("listingsFilter")
                listingTemplate.setAttribute("onclick", 'scrollListings(event, "left")')
                listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
                figures.forEach(figure => {
                    figure.style.display = "flex"
                })
            } else if (outOfBounds.includes("right") && target.children.length != 1) {
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
        }
    })
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
    if (x < window.innerWidth * 0.2) {
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
    console.log("hi")
    if (amount == -1) {
        amount = listingsScrollSpeed
    }
    let element = 0
    if (targetSelected == 0) {
        element = event.target
        while (element.classList.contains("listing") == false && element != document.body)
            element = element.parentElement
        while (element.classList.contains("listings") == false && element != document.body)
            element = element.parentElement
    } else {
        element = event
    }
    

    let listing = element.children[0]
    if (element != document.body) {
        
        const elementStyle = window.getComputedStyle(element)
        let left = parseFloat(elementStyle.marginLeft.split("px")[0])
        var offset = 0
        if (direction == "left") {
            offset = listing.getBoundingClientRect().width * amount + parseFloat(elementStyle.gap.split("px")[0]) * 0.75 * (amount - 1)
        } else {
            offset = (listing.getBoundingClientRect().width * amount + parseFloat(elementStyle.gap.split("px")[0]) * 0.75 * (amount - 1)) * -1
        }
        if (amount == 0) {
            offset = 0
        }
        left += offset
        var value = (left / window.innerWidth * 100)
        if (value > 0) {
            element.style.marginLeft = "-0vw"
        } else {
            element.style.marginLeft = value.toString() + "vw"
        }
        for (let i = 0; i < element.children.length; i++) {
            const outOfBounds = checkOutOfBoundsListing(element.children[i], offset)
            const figures = element.children[i].querySelectorAll("figure")
            if (outOfBounds.includes("left") && i != 0 && i < element.children.length - 1) {
                element.children[i].setAttribute("onclick", 'scrollListings(event, "left")')
                element.children[i].classList.add("listingsFilter")
                figures.forEach(figure => {
                    figure.style.display = "flex"
                })
            } else if (outOfBounds.includes("right") && i != 0 && i < element.children.length - 1) {
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


function loadHistoryInto(listings, target, petID) {
    target.innerHTML = ""
    Object.values(listings).forEach(listing => {
        if (listingAllowed(listing, petID)) {
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
    
            const wrapper = document.createElement("div")
            wrapper.classList.add("historyListing")
            wrapper.appendChild(listingTemplate)
            const historyName = document.createElement("p")
            historyName.textContent = listing["ownerUsername"]
            const completedAt = document.createElement("p")
            if (Object.keys(listing).includes("completedAt")) {
                completedAt.textContent = timeSince(listing["completedAt"])
            } else {
                completedAt.textContent = "-1m ago"
            }
            wrapper.appendChild(historyName)
            wrapper.appendChild(completedAt)
            target.appendChild(wrapper)
            
            const figures = listingTemplate.querySelectorAll("figure")
            listingTemplate.setAttribute("onclick", `showUserListings2(${JSON.stringify(listing)})`)
            listingTemplate.setAttribute("data-onclick", `showUserListings2(${JSON.stringify(listing)})`)
            figures.forEach(figure => {
                figure.style.display = "none"
            })
        }
    })
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

function sortAllListings(petID, defaultSort, neonSort, megaSort) {
    var allListings = document.getElementById("allListings")

    for (let i = 0; i < allListings.children.length; i++) {
        for (let j = 0; j < allListings.children[i].children[1].children.length; j++) {
            hideListing = true
            listing = allListings.children[i].children[1].children[j]
            listingDict = JSON.parse(listing.getAttribute("data-onclick").slice(18, -1))
            for (let k = 0; k < listingDict["offer"]["give"].length; k++) {
                if (listingDict["offer"]["give"][k]["id"] == petID) {
                    if ((listingDict["offer"]["give"][k]["regular"] && defaultSort) || (listingDict["offer"]["give"][k]["neon"] && neonSort) || (listingDict["offer"]["give"][k]["mega"] && megaSort)) {
                        hideListing = false
                        break
                    }
                }

            } 

            for (let k = 0; k < listingDict["offer"]["take"].length; k++) {
                if (listingDict["offer"]["take"][k]["id"] == petID) {
                    if ((listingDict["offer"]["take"][k]["regular"] && defaultSort) || (listingDict["offer"]["take"][k]["neon"] && neonSort) || (listingDict["offer"]["take"][k]["mega"] && megaSort)) {
                        hideListing = false
                        break
                    }
                }
            } 

            if (hideListing) {
                listing.style.display = "none"
            } else {
                listing.style.display = "flex"
            }

        }
        scrollListings(allListings.children[i].children[1], "left", 999, 1)
    }
}

function listingAllowed(listing, petID) {
    var containsPet = false
    for (let i = 0; i < listing["offer"]["give"].length; i++) {
        if (listing["offer"]["give"][i]["id"] == petID) {
            containsPet = true
            break
        }
    }
    if (containsPet != true) {
        for (let i = 0; i < listing["offer"]["take"].length; i++) {
            if (listing["offer"]["take"][i]["id"] == petID) {
                containsPet = true
                break
            }
        }
    }
    return containsPet
}

function sortAllHistory(petID, defaultSort, neonSort, megaSort) {
    var allHistory = document.getElementById("allHistory")

    for (let i = 0; i < allHistory.children.length; i++) {
        for (let j = 0; j < allHistory.children[i].children[1].children.length; j++) {
            hideListing = true
            listingParent = allHistory.children[i].children[1].children[j]
            listing = allHistory.children[i].children[1].children[j].children[0]
            listingDict = JSON.parse(listing.getAttribute("onclick").slice(18, -1))
            for (let k = 0; k < listingDict["offer"]["give"].length; k++) {
                if (listingDict["offer"]["give"][k]["id"] == petID) {
                    if ((listingDict["offer"]["give"][k]["regular"] && defaultSort) || (listingDict["offer"]["give"][k]["neon"] && neonSort) || (listingDict["offer"]["give"][k]["mega"] && megaSort)) {
                        hideListing = false
                        break
                    }
                }

            } 

            for (let k = 0; k < listingDict["offer"]["take"].length; k++) {
                if (listingDict["offer"]["take"][k]["id"] == petID) {
                    if ((listingDict["offer"]["take"][k]["regular"] && defaultSort) || (listingDict["offer"]["take"][k]["neon"] && neonSort) || (listingDict["offer"]["take"][k]["mega"] && megaSort)) {
                        hideListing = false
                        break
                    }
                }
            } 

            if (hideListing) {
                listingParent.style.display = "none"
            } else {
                listingParent.style.display = "flex"
            }

        }
    }

}

window.addEventListener("scroll", event => {
    var underNav = document.getElementById("underNav")
    var rect = underNav.getBoundingClientRect()
    if (window.scrollY > window.innerWidth / 100 * 12) {
        underNav.style.position = "fixed"
        underNav.style.top = "0px"
        underNav.style.borderTop = "4px solid white"
        underNav.style.backgroundImage = "linear-gradient(135deg, rgb(243, 231, 214) 0%, rgb(235, 229, 220) 50%, rgb(253, 249, 234) 100%)"
        if (oldUnderNavScroll > window.scrollY) {
            underNav.style.transform = "translate(0%, 96.5%)"
        } else {
            underNav.style.transform = "translate(0%, 0%)"
        }
    } else {
        underNav.style.position = "absolute"
        underNav.style.transform = "translate(0%, 0%)"
        underNav.style.backgroundImage = ""
        underNav.style.top = ""
        underNav.style.borderTop = "0px solid white"
    }

    oldUnderNavScroll = window.scrollY
})

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
    document.querySelector("html").style.overflowY = "auto";
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

    if (loggedIn == "False" || loggedIn == false) {
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
        console.log("HI")
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

function setAddPetTypeTo(type) {
    addPetType = type
}

window.addEventListener("click", event => {
    if (event.target == document.getElementById("listingInterface2Background")) {
        closeListingInterface2()
    }
})

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

function displayMessage(message) {
    messageDiv.style.bottom = "10%"
    messageText.innerText = message
    setTimeout((event) => {
        messageDiv.style.bottom = "-100%"
    }, 2000)
}