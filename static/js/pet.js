const path = window.location.pathname
const pathParts = path.split("/")
const petPageID = pathParts[pathParts.length - 1]
var oldUnderNavScroll = 0
var petsDict = {}
var listingsScrollSpeed = 6

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

window.addEventListener("DOMContentLoaded", event => {

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
            loadListingsInto(data[key], container)
            sortAllListings(petPageID, defaultSort, neonSort, megaSort)
            scrollListings(container.children[0], "right", 0, 1)
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
            loadHistoryInto(data[key], container)
            div.appendChild(container)
            allHistory.appendChild(div)
            sortAllHistory(petPageID, defaultSort, neonSort, megaSort)
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

function loadListingsInto(listings, target) {
    target.innerHTML = ""
    Object.values(listings).forEach(listing => {
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


function loadHistoryInto(listings, target) {
    target.innerHTML = ""
    Object.values(listings).forEach(listing => {
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
    }
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

