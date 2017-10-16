var storeKey = "lastUpdateDate";

function setUri(baseUrl, para, val) {
  var strNewUrl = new String();
  var strUrl = new String();
  var url = baseUrl;
  strUrl = baseUrl;

  var result = "";

  if (strUrl.indexOf("?") != -1) {
    strUrl = strUrl.substr(strUrl.indexOf("?") + 1);  //获取参数

    if (strUrl.toLowerCase().indexOf(para.toLowerCase()) == -1) { //如果没有找到参数,则直接赋值
      strNewUrl = url + "&" + para + "=" + val;
      result = strNewUrl;
    } else {
      var aParam = strUrl.split("&");

      for (var i = 0; i < aParam.length; i++) {
        if (aParam[i].substr(0, aParam[i].indexOf("=")).toLowerCase() == para.toLowerCase()) {
          aParam[i] = aParam[i].substr(0, aParam[i].indexOf("=")) + "=" + val;
        }
      }
      strNewUrl = url.substr(0, url.indexOf("?") + 1) + aParam.join("&");
      result = strNewUrl;
    }
  } else {
    strUrl += "?" + para + "=" + val;
    result = strUrl;
  }

  return result;
}

function reload(build) {
  var url = window.location.href;

  var urlArr = url.split("#");

  urlArr[0] = setUri(urlArr[0], "q", new Date().valueOf());

  if (localStorage) {
    localStorage.setItem(storeKey, build);
  }

  window.location.href = urlArr.join("#");
}

function checkUpdte(nextBuild) {
  var lastUpdateDate = "";

  if (localStorage)
    lastUpdateDate = localStorage.getItem(storeKey);

  if (nextBuild > lastUpdateDate || lastUpdateDate == false) {
    //should update
    reload(nextBuild);
  }
}

function checkBuild() {
  $.ajax({
    type: "get",
    url: "./static/js/config.json",
    dataType: "json",
    cache: false,
    success: function (config) {
      checkUpdte(config.build)
    }
  })
}
