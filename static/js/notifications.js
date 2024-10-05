window.addEventListener("DOMContentLoaded", function() {
    readNotificationsFullscreen()
    displayNotificationsFullscreen()
});

var categoryOpen = false
var notificationsCategory = "All"
var notificationsLoaded = 0
var allNotificationsLoaded = false
var lastRequest = 0

function selectCategory() {
    var notificationsDiv = document.getElementById("notificationsFullscreen")
    if (categoryOpen) {
        categoryOpen = false
        notificationsDiv.children[0].children[1].style.borderBottom = "1px solid rgb(54, 53, 55)"
        notificationsDiv.children[0].children[1].style.borderRight = "1px solid transparent"
        notificationsDiv.children[0].children[1].style.borderLeft = "1px solid transparent"
        notificationsDiv.children[0].children[1].style.height = "calc(2vw + 2px)"
    } else {
        categoryOpen = true
        notificationsDiv.children[0].children[1].style.borderBottom = "1px solid rgb(54, 53, 55)"
        notificationsDiv.children[0].children[1].style.borderRight = "1px solid rgb(54, 53, 55)"
        notificationsDiv.children[0].children[1].style.borderLeft = "1px solid rgb(54, 53, 55)"
        notificationsDiv.children[0].children[1].style.height = "calc(7.8vw + 2px)"
    }
}

function goBack() {
    window.history.back()
}

function selectNewCategory(event) {
    var notificationsDiv = document.getElementById("notificationsFullscreen")
    if (event.target.tagName != "DIV") {
        notificationsCategory = event.target.textContent
    }
    notificationsDiv.children[0].children[1].children[0].children[0].textContent = notificationsCategory

}

window.addEventListener("click", event => {
    var notificationsDiv = document.getElementById("notificationsFullscreen");
    var rect = notificationsDiv.children[0].children[1].getBoundingClientRect();

    var isInsideDiv = (
        event.clientX >= rect.x && event.clientX <= rect.x + rect.width &&
        event.clientY >= rect.y && event.clientY <= rect.y + rect.height
    );

    if (!isInsideDiv && categoryOpen) {
        selectCategory();
    }

});

function readNotificationsFullscreen() {
    var notificationsDiv = document.getElementById("notificationsFullscreen")
    notificationsDiv.children[2].innerHTML = ""
    notificationsDiv.children[4].innerHTML = ""
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
        var notificationCountDiv = document.getElementById("notificationCountDiv")
        var notificationCountID = document.getElementById("notificationCountID")
        if (notificationCountID != undefined && notificationCountDiv != undefined) {
            notificationCountID.innerHTML = "0";
            notificationCountDiv.style.display = "none";
        }
    }
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
};

function displayNotificationsFullscreen() {
    if (Math.floor(Date.now() / 1000) - lastRequest > 0.2) {
        lastRequest = Math.floor(Date.now() / 1000) + -5
        formData = new FormData();
        formData.append('loaded', notificationsLoaded);
        formData.append('action', "get20Notifications");
    
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
            var notificationsDiv = document.getElementById("notificationsFullscreen")
            Object.values(data).forEach(value => {
                const div = document.createElement("div")
                const img = document.createElement("img")
                if (value["image"].includes("/static/")) {
                    img.src = value["image"]
                } else if (value["image"].includes("images/")) {
                    img.src = "/static/" + value["image"]
                } else {
                    img.src = "/static/images/notifications/" + value["image"]
                }
                div.appendChild(img)
                const div2 = document.createElement("div")
                const txt1 = document.createElement("p")
                txt1.textContent = value["head"]
                const txt2 = document.createElement("p")
                txt2.textContent = value["body"]
                div2.appendChild(txt1)
                div2.appendChild(txt2)
                div.appendChild(div2)
                const txt3 = document.createElement("p")
                txt3.textContent = timeSince(value["created"])
                div.appendChild(txt3)
                if (Math.floor(Date.now() / 1000) - value["created"] > 60 * 60 * 24) {
                    notificationsDiv.children[4].appendChild(div)
                } else {
                    notificationsDiv.children[2].appendChild(div)
                }
            })
            notificationsLoaded += data.length
            if (data.length < 20) {
                allNotificationsLoaded = true
            }
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        });
        lastRequest = Math.floor(Date.now() / 1000)
    }
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
        return `${seconds}s`;
    } else if (minutes < 100) {
        return `${minutes}m`;
    } else if (hours < 100) {
        return `${hours}h`;
    } else if (days < 100) {
        return `${days}d`;
    } else if (years < 2) {
        return `${months}mo`;
    } else {
        return `${years}y`;
    }
}

function checkNotificationsPosition() {
    var notificationsDiv = document.getElementById("notificationsFullscreen")
    if (!notificationsDiv) return;

    const rect = notificationsDiv.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if ((rect.bottom / 16 * 9 * window.innerWidth / window.innerHeight) < viewportHeight / 1.2 && allNotificationsLoaded != true) {
        displayNotificationsFullscreen()
    }
}

window.addEventListener('scroll', checkNotificationsPosition);