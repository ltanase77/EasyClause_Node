import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID
};
export const firebaseInstance = firebase.initializeApp(firebaseConfig);

export const setToastContent = (type, language, message) => {
    let title;
    switch (type) {
        case "error":
            title = language ? "An error has ocurred" : "A aparut o erorare";
            break;
        case "success":
            title = language ? "Success" : "Succes";
            break;
        case "fail":
            title = language ? "Operation failed" : "Operațiune eșuată";
            break;
        case "info":
            title = "Info";
            break;
        default:
            title = "Info";
    }
    return {
        status: true,
        title: title,
        message: language ? message[0] : message[1]
    };
};

/* fontawesome icons are formed from an svg element and a path element
and when clicked we need to determine which element is the event target */
export const getSVGTarget = target => {
    if (target.nodeName === "svg") {
        return target;
    }
    return target.parentNode;
};

export const getRelevantIcons = (target, iconType) => {
    let saveIcon,
        content,
        editIcon,
        closeIcon,
        removeIcon,
        otherIcon = null;

    switch (iconType) {
        case "edit":
            editIcon = target;
            saveIcon = target.nextElementSibling;
            closeIcon = saveIcon.nextElementSibling;
            content = target.parentNode.parentNode.nextSibling;
            break;
        case "save":
            saveIcon = target;
            editIcon = target.previousElementSibling;
            closeIcon = target.nextElementSibling;
            content = target.parentNode.parentNode.nextSibling;
            break;
        case "close":
            closeIcon = target;
            saveIcon = target.previousElementSibling;
            editIcon = saveIcon.previousElementSibling;
            content = target.parentNode.parentNode.nextSibling;
        case "remove":
            removeIcon = target;
            content = target.parentNode.parentNode.nextSibling;
            break;
        default:
            otherIcon = target;
    }
    return {
        editIcon,
        saveIcon,
        closeIcon,
        removeIcon,
        otherIcon,
        content
    };
};
