var addPetType = ""
var calculateWithValue = "shark"
var displayPetsFirstTime = 0
var dataLoaded = 0

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
var filteredPets = 0
var frostValue = 105

var formData = new FormData();
formData.append('action', "getPets");
var petsDict = {}

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

window.addEventListener("DOMContentLoaded", event => {
    dataLoaded += 1
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
    if (displayPetsFirstTime == 0 && dataLoaded == 2) {
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

function selectValue(value) {
    var sharkFrostButtons = document.querySelectorAll(".sharkFrostButton")
    calculateWithValue = value
    sharkFrostButtons.forEach(button => {
        button.classList.remove("shark")
        button.classList.remove("frost")
        button.classList.add(calculateWithValue)
    })
    insertValuesIntoCreateListingInterface()
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
                if (parseFloat(petValue) != null && parseFloat(petValue) != undefined) {
                    value += petValue
                }
            }
        }
    }
    return value
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
        displayMessage("You created a listing!")
        window.location.href = document.referrer;
        sessionStorage.setItem("createListing", "true")

    } else {
        displayError(data)
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });  
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

function cancel() {
    history.back();
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
