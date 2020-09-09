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
