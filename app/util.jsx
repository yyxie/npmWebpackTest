
export default {
  requireAuth(nextState, replace) {
    debugger;
    const isSignin = common.checkSignin(common.baseInfo.cookieName);

    const currentStaff = common.getStaff(false);

    if (isSignin == false || currentStaff == false || checkSite() == false)
      replace("/login");
    else {
      //pass
        replace("/bComponent");
    }
  }
}
