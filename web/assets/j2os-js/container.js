class Request {
    static send(requestType, requestUrl, callBack, requestBody, headers) {
        if (typeof XMLHttpRequest === "undefined") {
            XMLHttpRequest = function () {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                } catch (e) {
                }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                } catch (e) {
                }
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                }
                console.log("browser does not support ajax...");
            };
        }
        const http = new XMLHttpRequest();
        http.open(requestType, requestUrl, true);
        //http.setRequestHeader('Content-Type', "application/json;charset=UTF-8");
        for (const headerName in headers) {
            http.setRequestHeader(headerName, headers[headerName]);
        }
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                callBack(http.status, http.responseText);
            }
        }
        http.send(requestBody);
    }

    static getURL() {
        return window.location.href;
    }

    static getParameter(paramName) {
        return new URLSearchParams(window.location.search).get(paramName);
    }

    static getCookie(cookieName) {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith(cookieName))
            .split('=')[1];
    }
}


class Response {

    static addCookie(cookieName, cookieValue) {
        document.cookie = cookieName + "=" + cookieValue;
    }

    static sendRedirect(address) {
        window.location = address;
    }

    static sendRedirectInNewTab(address) {
        window.open(address);
    }

    static sendRedirectInNewWindow(address) {
        window.open(address, "_blank", "toolbar=yes");
    }

}


class EntityManager {

    static persist(key, value) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(key, value);
        } else {
            console.log("browser does not support web storage...");
        }
    }

    static remove(key) {
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem(key);
        } else {
            console.log("browser does not support web storage...");
        }
    }

    static findOne(key) {
        if (typeof (Storage) !== "undefined") {
            return localStorage.getItem(key);
        } else {
            console.log("browser does not support web storage...");
        }
    }

    static findKeys() {
        if (typeof (Storage) !== "undefined") {
            return Object.keys(localStorage);
        } else {
            console.log("browser does not support web storage...");
        }
    }
}


class UIManager {

    static getValue(componentId) {
        return document.getElementById(componentId).value;
    }


    static getAttribute(componentId, attribute) {
        return document.getElementById(componentId).getAttribute(attribute);
    }

    static setAttribute(componentId, attribute, value) {
        document.getElementById(componentId).setAttribute(attribute, value);
    }

    static submit(componentId) {
        document.getElementById(componentId).submit();
    }

    static reset(componentId) {
        document.getElementById(componentId).reset();
    }

    static print() {
        window.print();
    }

    static isHide(componentId) {
        if (document.getElementById(componentId).style.display == '') {
            return false;
        } else {
            return true;
        }
    }

    static hide(componentId) {
        document.getElementById(componentId).style.display = 'none';
    }

    static show(componentId) {
        document.getElementById(componentId).style.display = '';
    }

    static isDisabled(componentId) {
        return document.getElementById(componentId).disabled;
    }

    static disable(componentId) {
        document.getElementById(componentId).disabled = true;
    }

    static enable(componentId) {
        document.getElementById(componentId).disabled = false;
    }

    static addKeyListener(keys) {
        /*
          const keys = new Array();
          keys['a'] = "javascript:alert('a1')";
          keys['m'] = "javascript:alert('m1')";
          UIManager.addKeyListener(keys);
         */
        function keyListener(keyStroke) {
            const isNetscape = (document.layers);
            const eventChooser = (isNetscape) ? keyStroke.which : event.keyCode;
            const which = String.fromCharCode(eventChooser).toLowerCase();
            for (let i in keys) if (which == i) window.location = keys[i];
        }

        document.onkeypress = keyListener;
    }

    static addTimer(stringCommand, timeout) {
        setInterval(function () {
            eval(stringCommand);
        }, timeout);
    }

    static execScript(stringCommand) {
        eval(stringCommand);
    }

    static form2Json(componentId) {
        //ById
        const list = document.getElementById(componentId).elements;
        const map = new Map();
        for (const formElement of list) {
            if (formElement.id != "") {
                map[formElement.id] = formElement.value;
            }
        }
        return JSON.stringify(map);
    }

    static json2Form(componentId, jsonString) {
        //ById
        const list = document.getElementById(componentId).elements;
        const jsonObject = JSON.parse(jsonString);
        for (const formElement of list) {
            if (formElement.id != "") {
                document.getElementById(formElement.id).value = jsonObject[formElement.id];
            }
        }
    }

    static form2Url(componentId) {
        //byName
        const list = document.getElementById(componentId).elements;
        let urlString = "";
        for (const formElement of list) {
            if (formElement.name != "") {
                urlString += formElement.name + "=" + encodeURI(formElement.value) + "&";
            }
        }
        return urlString.substr(0, urlString.length - 1);
    }

    static fillTable(columnArray, jsonArray, componentId) {
        /*
            UIManager.fillTable(["name", "id", "family"], jsonArray, 'rows');
         */
        let html ="";
        for (const jsonObject of JSON.parse(jsonArray)) {
            html += "<tr>";
            for (const columnName of columnArray) {
                html += "<td>";
                html += jsonObject[columnName];
                html += "</td>";
            }
            html += "</tr>";

        }
        document.getElementById(componentId).innerHTML = html;
    }

    static fillSelectableTable(columnArray, jsonArray, componentId, onEvent, callback) {
        /*
        UIManager.fillSelectableTable(["name", "id", "family"], jsonArray, 'rows','onclick','onClickCallBack');
        function onClickCallBack(s)
        {
            alert(s['id']);
        }
         */
        let html = "";
        for (const jsonObject of JSON.parse(jsonArray)) {
            html += "<tr>";
            html +="<td><input  type='radio' name='"+componentId+"' " + onEvent + "='" + callback + "(" + JSON.stringify(jsonObject) + ")' /></td>";
            for (const columnName of columnArray) {
                html += "<td>";
                html += jsonObject[columnName];
                html += "</td>";
            }
            html += "</tr>";
        }
        document.getElementById(componentId).innerHTML = html;
    }
}
