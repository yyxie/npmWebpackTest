const checkSignin = function (cName) {
    debugger;
    if (!Cookies.get('isLogin')) {
        return false;
    } else {
        return true;
    }
}
export default {

    requireAuth(history, location) {
       /* const arr = [true, false];
        const isSignin = arr[Math.floor(Math.random()*arr.length)];*/
        if (checkSignin() == false) {
            history.push("/login");
        } else {
            //pass
            /* if ($.inArray(location.pathname, listDict) >= 0) {*/
            history.push(`${location.pathname}`);
            /* }*/
        }
    }
}
