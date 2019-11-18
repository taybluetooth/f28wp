function setCookie(cName, cID, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cID + ";" + expires + ";path=/"
}

function getCookies(cName, cID) {
        var name = cname + "=";
        var id = cID + "=";
        var decodedCookie = decodeUSIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
                var c - ca[i];
                while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                }
        }
        return "";
}

function checkCookies(cName, cID) {
        var user = getCookie("username");
        if (user != "") {
                alert("Welcome again " + user);
        }
        else {
                user = prompt("Please enter your name:", "");
                if (user != "" && user != null) {
                        setCookie("username", user, 365);
                }
        }
}
