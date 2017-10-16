export default {
    requireAuth(history, location) {
        const isSignin = true;

        const currentStaff = true;

        if (isSignin == false || currentStaff == false) {
            history.push("/login");
        } else {
            //pass

            /* if ($.inArray(location.pathname, listDict) >= 0) {*/
            history.push(`${location.pathname}`);
            /* }*/
        }
    }
}
