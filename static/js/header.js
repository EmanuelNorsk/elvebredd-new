var inputs = document.createElement("div")
var openDottedNotification = 0
var formData = new FormData();
var notificationsOpen = 0
var checkbox
var notificationCountID
var oldScrollY = 0

var userDataDict = {}
loggedIn = false
var formData = new FormData();
formData.append('action', "getYourUserData");

const fetchUserDataHeader = fetch('/api', {
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
            userDataDict = data
            loggedIn = true
        }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
}); 

Promise.all([fetchUserDataHeader]).then(() => {
    var nav = document.querySelector("nav");
    var menuImage = document.getElementById("menuImage");
    var signUpImage = document.getElementById("signUpImage");
    var headerText = document.querySelectorAll(".headerText");
    var signInButtonHeader = document.getElementById("signInButtonHeader");
    var headerLogo = document.getElementById("headerLogo");
    var profilePicture = document.getElementById("profilePicture");
    var notificationIcon = document.getElementById("notificationIcon");
    var username = document.getElementById("username");
    var profileMenu = document.getElementById("profileMenu");
    var profileNotifications = document.getElementById("profileNotifications");
    var notificationCircle = document.getElementById("notificationCircle");
    var menuTextButton = document.getElementById("menuTextButton");
    var profileClick = 0
    var scrollY = 0

    inputs = document.querySelectorAll('input');

    var main = document.querySelector("main")

    var headerSearchBar = document.getElementById("headerSearchBar")
    var headerSearchBarMain = document.getElementById("headerSearchBarMain")
    var searchIcon = document.getElementById("searchIcon")
    var searchInput = document.getElementById("searchInput")

    var resultsPets = document.getElementById("resultsPets")

    var rem = Math.min(Math.max(Math.max(0.069444444 * window.innerWidth, 0.12345679012 * window.innerHeight), (2/3)), (8/3))
    
    var profilePicture = document.getElementById("profilePicture")
    profilePicture.src = "/static/images/profile/" + userDataDict["profilePicture"]
    var profileLink = document.getElementById("profileLink")
    profileLink.href = "/user/" + userDataDict["id"]
    var username = document.getElementById("username")
    username.textContent = userDataDict["username"]

    notificationCountID = document.getElementById("notificationCount");
    var notificationCircle = document.getElementById("notificationCircle");
    var settingsMenu = document.getElementById("settingsMenu")
    var settingsBackground = document.getElementById("settingsBackground")
    var preferences = document.getElementById("preferences")
    var misc = document.getElementById("misc")
    checkbox = document.querySelectorAll(".checkbox")
    var menuBar = document.getElementById("menuBar")
    if (userDataDict["id"] != undefined) {
        loggedIn = true
    } else {
        loggedIn = false
    }
    var openMiscButtonText = document.getElementById("openMiscButtonText")
    var openPreferencesButtonText = document.getElementById("openPreferencesButtonText")
    var notificationsMenu = document.getElementById("notificationsMenu")
    var infoDiv = document.getElementById("infoDiv")
    var infoText = document.getElementById("infoText")
    var verified = document.getElementById("verified")
    var neonLegendaryPets = document.getElementById("NeonLegendaryPets")
    var defaultLegendaryPets = document.getElementById("defaultLegendaryPets")
    var highTiers = document.getElementById("highTiers")
    var items = document.getElementById("items")
    var megaLegendaryPets = document.getElementById("megaLegendaryPets")
    var preppyPets = document.getElementById("preppyPets")
    var randoms = document.getElementById("randoms")
    var allowUnderpays = document.getElementById("allowUnderpays")
    var receiveEmailNotifications = document.getElementById("receiveEmailNotifications")
    var receiveFriendRequestNotification = document.getElementById("receiveFriendRequestNotification")
    var receiveNotifications = document.getElementById("receiveNotifications")
    var importantDiv = document.getElementById("importantDiv")
    var importantTitle = document.getElementById("importantTitle")
    var importantText = document.getElementById("importantText")
    var importantClose = document.getElementById("importantClose")
    var importantAccept = document.getElementById("importantAccept")
    var importantBackground = document.getElementById("importantBackground")

    var loggedInDivs = document.querySelectorAll(".loggedIn")
    var notLoggedInDivs = document.querySelectorAll(".notLoggedIn")

    function updateHeader() {
        if (window.innerWidth < 500*rem)  {
            headerSearchBar.style.display = "none"
            menuTextButton.style.display = "none"
        } else {
            headerSearchBar.style.display = "flex"
            menuTextButton.style.display = "flex"
        }

        if (window.innerWidth < 200*rem)  {
            headerLogo.style.display = "none"
        } else {
            headerLogo.style.display = "flex"
        }

        if (loggedIn == true) {
            if (window.innerWidth < 400*rem) {
                notificationIcon.style.display = "none";
                username.style.display = "none";
                profileNotifications.style.display = "flex";
                profileNotifications.style.padding = "10px";
                notificationCountID.style.display = "none";
                notificationCircle.style.display = "none";
                username.style.paddingRight = "0px"
            } else {
                notificationIcon.style.display = "flex";
                username.style.display = "flex";
                profileNotifications.style.display = "none";
                profileNotifications.style.padding = "0px";
                notificationCountID.style.display = "flex";
                notificationCircle.style.display = "flex";
                username.style.paddingRight = "3vw"
            };
        }
        

    }
    if (loggedIn == true) {
        profilePicture.addEventListener("click", (event) => {
            if (profileMenu.style.display == "flex") {
                profileMenu.style.display = "none";
            } else {
                profileMenu.style.display = "flex";
                profileClick = 1
                displayNotifications(false)
            }
        });
        profileMenu.addEventListener("click", (event) => {
            profileClick = 1
        })
    };

    if (document.title == "Index" && 1 == 2) {
        window.addEventListener("scroll", (event) => {
            if (loggedIn == true) {
                profileMenu.style.display = "none";
            };
            scrollY = window.scrollY;
            startY = window.innerHeight * 0.25
            endY = window.innerHeight * 0.6
            if (scrollY < startY) {
                headerLogo.style.filter = "invert(100%) contrast(200%)";
                menuImage.style.filter = "invert(100%) contrast(200%)";
                nav.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 0) 0%, rgb(235, 229, 220, 0) 50%, rgb(253, 249, 234, 0) 100%)";
                headerText.forEach(text => {
                    text.style.color = "rgb(255, 255, 255)"
                });
                if (loggedIn == true) {
                    profileMenu.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 0.25) 0%, rgb(235, 229, 220, 0.25) 50%, rgb(253, 249, 234, 0.25) 100%)";
                    notificationIcon.style.filter = "invert(1) contrast(2)";
                };
            } else if (scrollY < endY) {
                headerLogo.style.filter = "invert(" + (100 - ((scrollY - startY) / 2)).toString() + "%) contrast(" + (200 - ((scrollY - startY) / 2)).toString() + "%)";
                menuImage.style.filter = "invert(" + (100 - ((scrollY - startY) / 2)).toString() + "%) contrast(" + (200 - ((scrollY - startY) / 2)).toString() + "%)";
                nav.style.background = "linear-gradient(135deg, rgb(243, 231, 214, " + (((scrollY - startY) / 2.5) / 100).toString() + ") 0%, rgb(235, 229, 220, " + (((scrollY - startY) / 2.5) / 100).toString() + ") 50%, rgb(253, 249, 234, " + (((scrollY - startY) / 2.5) / 100).toString() + ") 100%)";
                headerText.forEach(text => {
                    text.style.color = "rgb(" + (255 - (scrollY - startY) / 2 * 2.55) + ", " + (255 - (scrollY - startY) / 2 * 2.55) + ", " + (255 - (scrollY - startY) / 2 * 2.55) + ")";
                });
                if (loggedIn == true) {
                    notificationIcon.style.filter = "invert(" + (100 - ((scrollY - startY) / 2)).toString() + "%) contrast(" + (200 - ((scrollY - startY) / 2)).toString() + "%)";
                    profileMenu.style.background = "linear-gradient(135deg, rgb(243, 231, 214, " + (0.25 + ((scrollY - startY) / 2) / 100).toString() + ") 0%, rgb(235, 229, 220, " + (0.25 + ((scrollY - startY) / 2) / 100).toString() + ") 50%, rgb(253, 249, 234, " + (0.25 + ((scrollY - startY) / 2) / 100).toString() + ") 100%)";
                };
            } else {
                headerLogo.style.filter = "invert(0%) contrast(100%)"
                menuImage.style.filter = "invert(0%) contrast(100%)"
                nav.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 1) 0%, rgb(235, 229, 220, 1) 50%, rgb(253, 249, 234, 1) 100%)";
                headerText.forEach(text => {
                    text.style.color = "rgb(0, 0, 0)"
                });
                if (loggedIn == true) {
                    profileMenu.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 1) 0%, rgb(235, 229, 220, 1) 50%, rgb(253, 249, 234, 1) 100%)";
                    notificationIcon.style.filter = "invert(0) contrast(1)";
                };
            };
        });
    } else if (1 == 2){
        headerLogo.style.filter = "invert(0%) contrast(100%)"
        menuImage.style.filter = "invert(0%) contrast(100%)"
        //nav.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 1) 0%, rgb(235, 229, 220, 1) 50%, rgb(253, 249, 234, 1) 100%)";
        if ( loggedIn == true) {
            profileMenu.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 1) 0%, rgb(235, 229, 220, 1) 50%, rgb(253, 249, 234, 1) 100%);"
        };
        headerText.forEach(text => {
            text.style.color = "rgb(0, 0, 0)"
        });
        if (loggedIn == true) {
            notificationIcon.style.filter = "invert(0%) contrast(100%)";
        };        
    };

    if (document.title == "Index" && 1 == 2) {
        if (loggedIn == true) {
            profileMenu.style.display = "none";
        };
        scrollY = window.scrollY;
        startY = window.innerWidth * 0.45
        endY = window.innerWidth * 0.5625
        if (scrollY < startY) {
            headerLogo.style.filter = "invert(100%) contrast(200%)";
            menuImage.style.filter = "invert(100%) contrast(200%)";
            nav.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 0) 0%, rgb(235, 229, 220, 0) 50%, rgb(253, 249, 234, 0) 100%)";
            headerText.forEach(text => {
                text.style.color = "rgb(255, 255, 255)"
            });
            if (loggedIn == true) {
                profileMenu.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 0.25) 0%, rgb(235, 229, 220, 0.25) 50%, rgb(253, 249, 234, 0.25) 100%)";
            };
        } else if (scrollY < endY) {
            headerLogo.style.filter = "invert(" + (100 - ((scrollY - startY) / 2)).toString() + "%) contrast(" + (200 - ((scrollY - startY) / 2)).toString() + "%)";
            menuImage.style.filter = "invert(" + (100 - ((scrollY - startY) / 2)).toString() + "%) contrast(" + (200 - ((scrollY - startY) / 2)).toString() + "%)";
            nav.style.background = "linear-gradient(135deg, rgb(243, 231, 214, " + (((scrollY - startY) / 2.5) / 100).toString() + ") 0%, rgb(235, 229, 220, " + (((scrollY - startY) / 2.5) / 100).toString() + ") 50%, rgb(253, 249, 234, " + (((scrollY - startY) / 2.5) / 100).toString() + ") 100%)";
            headerText.forEach(text => {
                text.style.color = "rgb(" + (255 - (scrollY - startY) / 2 * 2.55) + ", " + (255 - (scrollY - startY) / 2 * 2.55) + ", " + (255 - (scrollY - startY) / 2 * 2.55) + ")";
            });
            if (loggedIn == true) {
                profileMenu.style.background = "linear-gradient(135deg, rgb(243, 231, 214, " + (0.25 + ((scrollY - startY) / 2) / 100).toString() + ") 0%, rgb(235, 229, 220, " + (0.25 + ((scrollY - startY) / 2) / 100).toString() + ") 50%, rgb(253, 249, 234, " + (0.25 + ((scrollY - startY) / 2) / 100).toString() + ") 100%)";
            };
        } else {
            headerLogo.style.filter = "invert(0%) contrast(100%)"
            menuImage.style.filter = "invert(0%) contrast(100%)"
            nav.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 1) 0%, rgb(235, 229, 220, 1) 50%, rgb(253, 249, 234, 1) 100%)";
            headerText.forEach(text => {
                text.style.color = "rgb(0, 0, 0)"
            });
            if (loggedIn == true) {
                profileMenu.style.background = "linear-gradient(135deg, rgb(243, 231, 214, 1) 0%, rgb(235, 229, 220, 1) 50%, rgb(253, 249, 234, 1) 100%)";
            };
        };
    };

    window.addEventListener("resize", (event) => {
        updateHeader();
    });

    window.addEventListener("click", (event) => {
        if (loggedIn == true) {
            if (profileMenu.style.display == "flex") {
                if (profileClick == 1) {
                    profileClick = 0
                } else {
                    profileMenu.style.display = "none";
                };
            };
        };
        var notificationsMenu = document.getElementById("notificationsMenu")
        if (notificationsMenu != null) {
            var rect = notificationsMenu.children[0].children[2].getBoundingClientRect();

            var isInsideDiv = (
                event.clientX >= rect.x && event.clientX <= rect.x + rect.width &&
                event.clientY >= rect.y && event.clientY <= rect.y + rect.height
            );
    
    
            if (!isInsideDiv) {
                if (openDottedNotification == 1) {
                    openDottedNotification = 0
                } else {
                    closeDotsNotifications();
                }
            }
        }
    })

    updateHeader();

    function renderSearch(data) {
        resultsPets.innerHTML = ""
        for (const i in data[0]) {
            const a = document.createElement("a")
            a.className = "resultPet"

            const p = document.createElement("p")
            p.innerText = data[0][i]["name"]

            const img = document.createElement("img")
            img.src = data[0][i]["image"]

            img.style.aspectRatio = "1/1"
            a.appendChild(img)
            a.appendChild(p)
            a.href = "/pet/" + data[1][i]
            if (parseInt(i) + 1 == data[0].length) {
                a.style.borderBottom = "0.5px solid lightgray"
            }
            resultsPets.appendChild(a)
        }
        if (data[0].length > 0) {
            headerSearchBar.style.paddingBottom = "0%"
            resultsPets.style.display = "block";
        } else {
            headerSearchBar.style.paddingBottom = "0%"
            resultsPets.style.display = "none";
        }
        
        updateHeader()
    }

    searchInput.addEventListener("input", (event) => {
        formData = new FormData();
        formData.append('input', searchInput.value)
        formData.append('action', "searchPets");

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
            renderSearch(data)
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
    })

    searchInput.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            search()
        }
    })

    window.addEventListener("click", event => {
        if (headerSearchBar.contains(event.target) || event.target == headerSearchBar) {
            
        } else {
            resultsPets.style.display = "none";
            headerSearchBar.style.margin = "0px"
        }
    })

    searchInput.addEventListener("focus", event => {
        if (searchInput.value != "") {
            formData = new FormData();
            formData.append('input', searchInput.value)
            formData.append('action', "searchPets");
    
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
                renderSearch(data)
            })
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            });
        }
    })

    searchIcon.addEventListener("click", (event) => {
        search()
    })

    function search() {
        formData = new FormData();
        formData.append('input', searchInput.value)
        formData.append('action', "search");

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
            if (data == "Nothing Found") {
                window.location.href = "/search/" + searchInput.value
            } else {
                if (data["type"] == "user") {
                    window.location.href = "/user/" + data["id"].toString()
                } else {
                    window.location.href = "/pet/" + data["id"].toString()
                }
            }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
    }


    //<p class="headerText">Notifications</p>
    //<div class="smallLine blackBackground notificationFlex"> &nbsp; </div>
    //{% for user, data in userData["notifications"].items() %}
    //    <div class="center" style="align-items:center;text-align:center;">
    //        {% if "/" in data['image'] %}
    //        <img style="width:15px;height:15px;margin-left:5px;" src="{{ url_for('static', filename=(data['image']))}}">
    //        {% else %}
    //            <img style="width:15px;height:15px;margin-left:5px;" src="{{ url_for('static', filename=('images/notifications/' + data['image']))}}">
    //        {% endif %}
    //        <div class="center smallPadding" style="flex-direction:column;">
    //            <h1 style="font-size:10px;margin:0px;">{{data["head"]}}</h1>
    //            <p style="font-size:8px;margin:0px;">{{data["body"]}}</p>
    //        </div>
    //</img></img>    </div>
    //{% endfor %}
    //<div class="smallLine blackBackground"> &nbsp; </div>
    //</img><p class="headerText lightHover" style="font-size:6px;color:white;"><a href="/notifications" class="bland headerText" style="color:white;">Read All Notifications</a></p>

    function handleFocus() {
        this.setAttribute('data-placeholder', this.getAttribute('placeholder')); // Store the placeholder value
        this.setAttribute('placeholder', ''); // Clear the placeholder
    }
  

    function handleBlur() {
        if (this.value === '') {
            this.setAttribute('placeholder', this.getAttribute('data-placeholder')); // Restore the original placeholder
        }
    }
  

      inputs.forEach(input => {
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
      });

    if (window.scrollY != 0) {
        document.querySelector("nav").style.background = "linear-gradient(135deg, rgb(243, 231, 214, 1) 0%, rgb(235, 229, 220, 1) 50%, rgb(253, 249, 234, 1) 100%)"
    }


    if (loggedIn) {
        loggedInDivs.forEach(div => {
            div.style.display = "flex";
        })
    } else {
        notLoggedInDivs.forEach(div => {
            div.style.display = "flex";
        })
    }

    checkbox.forEach((button) => {
        button.addEventListener("click", (event) => {
            if (button.value == "0") {
                button.value = "1"
                button.style.opacity = 1
            } else {
                button.value = "0"
                button.style.opacity = 0
            }
        })
    })
    
    checkbox.forEach((button) => {
        if (button.value == "0") {
            button.style.opacity = 0
        } else {
            button.style.opacity = 1
        }
    })
    
    updateNotifications()
    
    if (loggedIn == true) {
        notificationsMenu.addEventListener("click", (event) => {
            if (notificationsOpen == 1) {
                notificationsOpen = 2
            }
        });
    }
    
    
    loadPreferences()
    
    loadMisc()
    
    closeSettings()

    window.addEventListener("mousemove", (event) => {
        var verified = document.getElementById("verified")
        var neonLegendaryPets = document.getElementById("NeonLegendaryPets")
        var defaultLegendaryPets = document.getElementById("defaultLegendaryPets")
        var highTiers = document.getElementById("highTiers")
        var items = document.getElementById("items")
        var megaLegendaryPets = document.getElementById("megaLegendaryPets")
        var preppyPets = document.getElementById("preppyPets")
        var randoms = document.getElementById("randoms")
        var allowUnderpays = document.getElementById("allowUnderpays")
        var receiveEmailNotifications = document.getElementById("receiveEmailNotifications")
        var receiveFriendRequestNotification = document.getElementById("receiveFriendRequestNotification")
        var receiveNotifications = document.getElementById("receiveNotifications")
        infoDiv.style.display = "none"
        infoDiv.style.left = event.clientX.toString() + "px"
        infoDiv.style.top = event.clientY.toString() + "px"
        infoDiv.style.width = "max(12vw, 24vh);"
        infoText.style.color = "black"
        if (verified != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, verified)) {
                infoText.innerText = "This user is verified. We have authenticated this person through trusted documentation."
                infoDiv.style.display = "flex"
                infoDiv.style.left = verified.getBoundingClientRect().x + "px"
                infoDiv.style.top = verified.getBoundingClientRect().y + "px"
                infoText.style.color = "grey"
                infoDiv.style.width = "max(18vw, 36vh);"
            }
        }
        if (neonLegendaryPets != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, neonLegendaryPets)) {
                infoText.innerText = "There are 8 High Tiers in Adopt Me:       Crow, Evil Unicorn, Parrot, Owl, Frost Dragon, Giraffe, Bat Dragon and Shadow Dragon"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (neonLegendaryPets.getBoundingClientRect().x - (neonLegendaryPets.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = neonLegendaryPets.getBoundingClientRect().y + "px"
            }
        }
        if (defaultLegendaryPets != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, defaultLegendaryPets)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (defaultLegendaryPets.getBoundingClientRect().x - (defaultLegendaryPets.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = defaultLegendaryPets.getBoundingClientRect().y + "px"
            }
        }
        if (highTiers != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, highTiers)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (highTiers.getBoundingClientRect().x - (highTiers.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = highTiers.getBoundingClientRect().y + "px"
            }
        }
        if (items != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, items)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (items.getBoundingClientRect().x - (items.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = items.getBoundingClientRect().y + "px"
            }
        }
        if (megaLegendaryPets != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, megaLegendaryPets)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (megaLegendaryPets.getBoundingClientRect().x - (megaLegendaryPets.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = megaLegendaryPets.getBoundingClientRect().y + "px"
            }
        }
        if (preppyPets != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, preppyPets)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (preppyPets.getBoundingClientRect().x - (preppyPets.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = preppyPets.getBoundingClientRect().y + "px"
            }
        }
        if (randoms != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, randoms)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (randoms.getBoundingClientRect().x - (randoms.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = randoms.getBoundingClientRect().y + "px"
            }
        }
        if (allowUnderpays != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, allowUnderpays)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (allowUnderpays.getBoundingClientRect().x - (allowUnderpays.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = allowUnderpays.getBoundingClientRect().y + "px"
            }
        }
        if (receiveEmailNotifications != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, receiveEmailNotifications)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (receiveEmailNotifications.getBoundingClientRect().x - (receiveEmailNotifications.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = receiveEmailNotifications.getBoundingClientRect().y + "px"
            }
        }
        if (receiveFriendRequestNotification != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, receiveFriendRequestNotification)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (receiveFriendRequestNotification.getBoundingClientRect().x - (receiveFriendRequestNotification.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = receiveFriendRequestNotification.getBoundingClientRect().y + "px"
            }
        }
        if (receiveNotifications != undefined) {
            if (isMouseOverElement(event.clientX, event.clientY, receiveNotifications)) {
                infoText.innerText = "Coming Soon!"
                infoDiv.style.display = "flex"
                infoDiv.style.left = (receiveNotifications.getBoundingClientRect().x - (receiveNotifications.getBoundingClientRect().width * 12)) + "px"
                infoDiv.style.top = receiveNotifications.getBoundingClientRect().y + "px"
            }
        }
    })

    window.addEventListener("click", (event) => {
        if (notificationsOpen == 1) {
            displayNotifications()
        } else if (notificationsOpen == 2) {
            notificationsOpen = 1
        };
    });

    updateNotifications()

    window.addEventListener("scroll", event => {
        var nav = document.querySelector("nav")
        if (window.scrollY != 0 && nav != undefined) {
            nav.style.background = "linear-gradient(135deg, rgb(243, 231, 214) 0%, rgb(235, 229, 220) 50%, rgb(253, 249, 234) 100%)"
        } else {
            nav.style.background = "transparent"
        }
        if (window.scrollY > oldScrollY) {
            nav.style.transform = "translate(0%, -100%)"
        } else {
            nav.style.transform = "translate(0%, 0%)"
        }
        oldScrollY = window.scrollY
    })

    if (window.scrollY != 0) {
        document.querySelector("nav").style.background = "linear-gradient(135deg, rgb(243, 231, 214, 1) 0%, rgb(235, 229, 220, 1) 50%, rgb(253, 249, 234, 1) 100%)"
    }

    window.addEventListener("resize", event => {
        var notificationsMenu = document.getElementById("notificationsMenu")
        const styles = window.getComputedStyle(notificationsMenu)
        notificationsMenu.setAttribute("data-transition", styles.transition)
        notificationsMenu.style.transition = "none"
        setTimeout((event) => {
            notificationsMenu.style.transition = notificationsMenu.getAttribute("data-transition")
            notificationsMenu.setAttribute("data-transition", "")
        }, 10)
    })
})



function goTo(href) {
    window.location.href = href
}

function closeDotsNotifications() {
    var notificationsMenu = document.getElementById("notificationsMenu")
    notificationsMenu.children[0].children[2].style.display = "none"
}

function openDotsNotifications() {
    var notificationsMenu = document.getElementById("notificationsMenu")
    var style = window.getComputedStyle(notificationsMenu.children[0].children[2])
    if (style.display == "none") {
        notificationsMenu.children[0].children[2].style.display = "flex"
        openDottedNotification = 1
    } else {
        notificationsMenu.children[0].children[2].style.display = "none"
        openDottedNotification = 0
    }
}


function addNotifications() {
    formData = new FormData();
    formData.append('action', "getRecentNotifications");

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
            var notificationsMenu = document.getElementById("notificationsMenu")
            notificationsMenu.children[2].innerHTML = ""
            notificationsMenu.children[4].innerHTML = ""
            for (let i = 0; i < data.length; i++) {
                const div = document.createElement("div")
                const img = document.createElement("img")
                if (data[i]["image"].includes("/static/")) {
                    img.src = data[i]["image"]
                } else if (data[i]["image"].includes("images/")) {
                    img.src = "/static/" + data[i]["image"]
                } else {
                    img.src = "/static/images/notifications/" + data[i]["image"]
                }
                div.appendChild(img)
                const div2 = document.createElement("div")
                const p1 = document.createElement("p")
                p1.textContent = data[i]["head"]
                const p2 = document.createElement("p")
                p2.textContent = data[i]["body"]
                div2.appendChild(p1)
                div2.appendChild(p2)
                div.appendChild(div2)
                const p3 = document.createElement("p")
                p3.textContent = timeSince(data[i]["created"])   
                div.appendChild(p3)  
                if (data[i]["read"] == false) {
                    notificationsMenu.children[2].appendChild(div)
                } else {                       
                    notificationsMenu.children[4].appendChild(div)
                }  
                if (notificationsMenu.children[4].children.length != 0) {
                    const rect = notificationsMenu.children[4].children[notificationsMenu.children[4].children.length - 1].getBoundingClientRect()
                    const rect2 = notificationsMenu.getBoundingClientRect() 
                    if (rect.y + rect.height - rect2.y - (0.44 * window.innerWidth) > -20) {
                        notificationsMenu.children[4].removeChild(notificationsMenu.children[4].children[notificationsMenu.children[4].children.length - 1])
                    }
                } else {
                    const rect = notificationsMenu.children[2].children[notificationsMenu.children[2].children.length - 1].getBoundingClientRect()
                    const rect2 = notificationsMenu.getBoundingClientRect() 
                    if (rect.y + rect.height - rect2.y - (0.44 * window.innerWidth) > -20) {
                        notificationsMenu.children[2].removeChild(notificationsMenu.children[2].children[notificationsMenu.children[2].children.length - 1])
                    }
                }
            }
            readNotifications()
        }
        
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function giveImportantMessage(title, text, closeCommand, acceptCommand) {
    importantDiv.style.display = "flex"
    importantBackground.style.display = "flex"
    importantText.innerText = text
    importantTitle.innerText = title
    importantClose.setAttribute("onclick", "closeImportantMessage(); " + closeCommand)
    importantAccept.setAttribute("onclick", "closeImportantMessage(); " + acceptCommand)
}

function closeImportantMessage() {
    importantDiv.style.display = "none"
    importantBackground.style.display = "none"
}


function isMouseOverElement(mouseX, mouseY, element) {
    const rect = element.getBoundingClientRect();
    return (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
    );
}

function updateNotifications() {
    var notificationsCount = 0;

    for (var id in userDataDict.notifications) {
        if (userDataDict.notifications.hasOwnProperty(id)) {
            if (!userDataDict.notifications[id].read) {
                notificationsCount++;
            };
        };
    };

    if (loggedIn == true) {
        notificationCountID.innerHTML = notificationsCount
        if (notificationCountID.innerHTML == 0) {
            notificationCircle.style.opacity = "0";
        } else {
            notificationCircle.style.opacity = "1";
        };
    };
};

function readNotifications() {
    formData = new FormData();
    formData.append('action', "readNotifications");

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
        notificationCountID.innerHTML = "0";
        notificationCircle.style.opacity = "0";
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
};

function notificationOverflowDisable() {
    notificationsMenu.style.overflow = "visible"
    notificationsMenu.children[0].style.overflow = "visible"
}

function notificationOverflowEnable() {
    notificationsMenu.style.overflow = "hidden"
    notificationsMenu.children[0].style.overflow = "hidden"
}


function displayNotifications(enable = "Vary") {
    if (notificationsOpen == 1 || notificationsOpen == 2 || enable == false) {
        notificationsMenu.style.opacity = "0"
        notificationsMenu.style.height = "0px"
        notificationsMenu.style.borderWidth = "0px"
        setTimeout(notificationOverflowEnable(), 600)
        notificationsOpen = 0
    } else if (notificationsOpen == 0 || enable == true) {
        notificationsMenu.style.opacity = "1"
        notificationsMenu.style.height = "44vw"
        notificationsMenu.style.borderWidth = "1px"
        setTimeout(notificationOverflowDisable(), 600)
        notificationsOpen = 2
        addNotifications()
    }
}

function openPreferences() {
    settingsMenu.style.display = "flex";
    settingsBackground.style.display = "block"
    document.getElementById("profileMenu").style.display = "none"
    misc.style.display = "none"
    preferences.style.display = "flex"
    openPreferencesButtonText.style.color = "red";
    openMiscButtonText.style.color = "black";
};

function openMisc() {
    settingsMenu.style.display = "flex";
    settingsBackground.style.display = "block"
    document.getElementById("profileMenu").style.display = "none"
    misc.style.display = "flex"
    preferences.style.display = "none"
    openPreferencesButtonText.style.color = "black";
    openMiscButtonText.style.color = "red";

};

function closeSettings() {
    settingsMenu.style.display = "none";
    settingsBackground.style.display = "none"
    misc.style.display = "none"
    preferences.style.display = "none"
}

function nameKey(key) {
    let formattedString = key.replace(/([A-Z])/g, ' $1');

    formattedString = formattedString.trim();
    formattedString = formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
    
    return formattedString;
}

function loadPreferences() {
    if (loggedIn == true) {
        preferences.innerHTML = ""
        Object.keys(userDataDict["preferences"]).forEach(key => {
            const div = document.createElement("div")
            div.className = "preferenceDiv"
            const img = document.createElement("img")
            img.className = "infoImg"
            img.value = key.toString()
            img.src = "/static/images/misc/info.png"
            img.id = key.toString()
            const p = document.createElement("p")
            p.className = "noMargin"
            p.style.width = "100%"
            p.style.paddingLeft = "max(1vw, 2vh)"
            p.style.fontSize = "20rem"
            p.innerText = nameKey(key)
            const div2 = document.createElement("div")
            div2.className = "preference"
            const button = document.createElement("button")
            button.className = "blank checkbox noPadding preferenceButton"
            button.name = "checkbox"
            button.setAttribute("onclick", "modifyPreference('" + key + "')")
            button.value = userDataDict["preferences"][key].toString()
            button.id = key.toString()
            const img2 = document.createElement("img")
            img2.className = "preferenceImage"
            img2.id = key.toString() + "Image"
            img2.src = "/static/images/misc/checked.png"
            if (button.value == 0) {
                img2.style.display = "none"
            }

            button.appendChild(img2)
            div2.appendChild(button)

            div.appendChild(img)
            div.appendChild(p)
            div.appendChild(div2)

            preferences.appendChild(div)
        })
    }
}


function loadMisc() {
    if (loggedIn == true) {
        misc.innerHTML = ""
        Object.keys(userDataDict["settings"]).forEach(key => {
            const div = document.createElement("div")
            div.className = "preferenceDiv"
            const img = document.createElement("img")
            img.className = "infoImg"
            img.value = key.toString()
            img.src = "/static/images/misc/info.png"
            img.id = key.toString()
            const p = document.createElement("p")
            p.className = "noMargin"
            p.style.width = "100%"
            p.style.paddingLeft = "max(1vw, 2vh)"
            p.style.fontSize = "max(1.2vw, 2.4vh)"
            p.innerText = nameKey(key)
            const div2 = document.createElement("div")
            div2.className = "preference"
            const button = document.createElement("button")
            button.className = "blank checkbox noPadding preferenceButton"
            button.name = "checkbox"
            button.setAttribute("onclick", "modifyPreference('" + key + "')")
            button.value = userDataDict["settings"][key].toString()
            button.id = key.toString()
            const img2 = document.createElement("img")
            img2.className = "preferenceImage"
            img2.id = key.toString() + "Image"
            img2.src = "/static/images/misc/checked.png"
            if (button.value == 0) {
                img2.style.display = "none"
            }

            button.appendChild(img2)
            div2.appendChild(button)

            div.appendChild(img)
            div.appendChild(p)
            div.appendChild(div2)

            misc.appendChild(div)
        })
    }
}


function modifyPreference(preference) {
    const button = document.getElementById(preference)
    const img = document.getElementById(preference + "Image")
    if (button.value == 0) {
        value = 1
    } else {
        value = 0
    }
    formData = new FormData();
    formData.append('preference', preference)
    formData.append('value', value)
    formData.append('action', "modifyPreference");

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
        if (button.value == 1) {
            button.value = 0
            img.style.display = "none"
        } else {
            button.value = 1
            img.style.display = "flex"
        }
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
}

function logout() {
    formData = new FormData();
    formData.append('href', (window.location.href).toString())
    formData.append('action', "logout");

    fetch('/api', {
    method: 'POST',
    body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json()
    })
    .then(data => {
        if (data == "SUCCESS") {
            window.location.reload()
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
};

function modifyMisc(misc, value) {
    if (value == 0) {
        value = 1
    } else {
        value = 0
    }
    formData = new FormData();
    formData.append('misc', misc)
    formData.append('value', value)
    formData.append('action', "modifyMisc");

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

function openMenuBar() {
    menuBar.style.transform = "translateX(0%)"
}

function closeMenuBar() {
    menuBar.style.transform = "translateX(-125%)"
}

