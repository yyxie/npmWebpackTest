/**
 * Created by ruiy on 9/14/15.
 *
 * Putting some initialize and global functions here
 *
 */

String.prototype.isEmpty = function () {
    return this == undefined || this.length == 0;
};
String.prototype.isNotEmpty = function () {
    return !this.isEmpty();
};

if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
    };
}

Date.prototype.getDayOfYear = function () {
    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var day = this.getDate();
    var month = this.getMonth();
    var year = this.getFullYear();
    var result = 0;
    for (var i = 0; i < month; i++) {
        result += days[i];
    }
    result += day;
    if (month > 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        result += 1;
    }
    return result;
};

Date.prototype.getDayOfMonth = function () {

    var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month = this.getMonth();
    var year = this.getFullYear();

    var result = days[month];

    if (month == 1 && (year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        result += 1;
    }

    return result;

};


/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
 Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

//todo really need?
if (!Object.keys) {
    Object.keys = (function () {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function (obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [], prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}

var common = common || {},
    logger = console;

common.userInfo = "useInfo_upms";
common.currentStaff = "currentStaff_upms";
common.site = "ly_site";
common.timezoneOffset = new Date().getTimezoneOffset();
common.webConfig = window.webConfig;

common.log = function () {
    if (process && process.env.NODE_ENV == "production") {
        console = {};
        console.log = function () {
        };
        console.info = function () {
        };
        console.warn = function () {
        };
    }
};

common.getRequestParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
};

common.setCookie = function (name, value, expire) {
    var Days = expire || 1;
    Cookies.set(name, value, {expires: Days});
};

common.getCookie = function (cName) {
    var cookie = Cookies.get(cName);
    if (cookie)
        return cookie;
    else
        return '';
};

common.delCookie = function (cName) {
    Cookies.remove(cName);
}

common.signOut = function (cName) {
    this.delCookie(cName);
    localStorage.removeItem(common.userInfo);
    localStorage.removeItem(common.currentStaff);
    common.user = {
        person: false,
        staffList: false
    };
}

common.checkStatus = function (xhr, cookie) {

    if (!common.needSigin()) {
        return;
    }

    if (xhr.errorCode == -9999 || cookie == undefined || cookie == "") {
        localStorage.removeItem(common.userInfo);
        localStorage.removeItem(common.currentStaff);
        //todo remove cookie?
        window.location.href = common.baseInfo.login;
    }
};

common.needSigin = function () {

    var current = window.location.hash;

    // 无需登录路由列表
    var WithoutSiginArray = [
        '#/signup',
        '#/findpwd',
    ]

    for (var i = 0, len = WithoutSiginArray.length; i < len; i++) {

        if (current.indexOf(WithoutSiginArray[i]) === 0) {

            return false;

        }
    }
    return true;

}


common.initCheck = function () {
    if (localStorage[common.currentStaff] == undefined) {
        window.location.href = common.baseInfo.login;
    }
}

common.checkSignin = function (cName) {
    if (localStorage[common.userInfo] == undefined || this.getCookie(cName) == "") {
        return false;
    } else {
        return true;
    }
}

/**
 * HTTP request wrapper for alertweb
 *
 * @param url       http request's url
 * @param param     request parameters
 * @param method    'POST' or 'GET'
 * @param dataType  return data type(json, xml, text)
 * @param async     boolean, send if syncronize request
 * @param success   callback of success
 * @param failure     callback of failure
 */
common.ajax = function (url, param, method, dataType, async, success, failure) {
    var successHandler = (success != undefined) ? success : function (data) {

    };
    var failureHandler = (failure != undefined) ? failure : function (xhr) {
        if (xhr.status == -9999) {
            common.kickout();
        }
    };
    //var ticket = common.getCookie('intebox_sso_tkt') || '';

    if ($(".promise-button")) {
        $(".promise-button").attr("disabled", true);
    }

    var loadingElementId = undefined;

    if (param && param.loadingElementId) {
        loadingElementId = param.loadingElementId;
        delete param.loadingElementId;
    }

    var options = {
        type: (method == undefined) ? 'POST' : method,
        url: url,
        data: param,
        dataType: (dataType == undefined) ? 'json' : dataType,



        //success: common.postSuccess,
        error: common.postError
    };

    if (loadingElementId) {
        options.loadingElementId = loadingElementId;
    }

    return $.ajax(options).done(function (result) {
        //todo get 404 error
       // common.checkStatus(result, ticket);
        if ($(".promise-button")) {
            $(".promise-button").removeAttr("disabled");
        }
    }).done(successHandler).fail(function (arg) {

        var result = {
            xhr: arg,
            errorCode: arg.status,
            message: '和服务器失去连接!',

        };

        failureHandler(result)

    });
};


common.ajaxPromise = function (url, param, method, dataType, formData, loadingId) {
    //var ticket = common.getCookie('intebox_sso_tkt');

    var params = {
        type: (method == undefined) ? 'POST' : method,
        url: url,
        data: {},
        dataType: (dataType == undefined) ? 'json' : dataType,
       /* headers: {
            intebox_sso_tkt: ticket,
            intebox_sso_app: common.baseInfo.UA
        },*/
    };

    var loadingElementId = undefined;

    if (formData && param) {
        //todo formData.get not support
        // loadingElementId = param.get("loadingElementId");
        // param.delete("loadingElementId");

        if (loadingId)
            loadingElementId = loadingId;

        params["processData"] = false;
        params["contentType"] = false;
    } else if (!formData) {
        if (param && param.loadingElementId) {
            loadingElementId = param.loadingElementId;
            delete param.loadingElementId;
        }
    }

    params.success = common.postSuccess;
    params.error = common.postError;
    params.data = param;

    if (loadingElementId) {
        params.loadingElementId = loadingElementId;
    }

    if ($(".clear-button")) {
        $(".clear-button").attr("disabled", true);
    }

    if ($(".promise-button")) {
        $(".promise-button").attr("disabled", true);
    }

    return $.ajax(params);
};

common.postSuccess = function (data, status, xhr) {
    if ($(".clear-button")) {
        $(".clear-button").removeAttr("disabled");
    }

    if ($(".promise-button")) {
        $(".promise-button").removeAttr("disabled");
    }

    if (data.errorCode == -9999) {

        common.kickout();

    }
    // else if( data.errorCode != 0 && data.errorCode != -1 ) {
    //
    //   common.handleGlobalError(data.message);
    // }

}

common.postError = function (xhr, type, error) {
    if ($(".clear-button")) {
        $(".clear-button").removeAttr("disabled");
    }

    if ($(".promise-button")) {
        $(".promise-button").removeAttr("disabled");
    }

    // error = '和服务器失去连接！'
    //
    // common.handleGlobalError(error);

}

common.kickout = function () {

    top.location.hash = '#/signin';

}

common.handleGlobalError = function (error) {

    window.alert(error);
}


common.getURI = function () {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath + '/');
};

common.getRequestParam = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
};

common.isEmpty = function (value) {
    var type;
    if (value == null) { // 等同于 value === undefined || value === null
        return true;
    }
    type = Object.prototype.toString.call(value).slice(8, -1);
    switch (type) {
        case 'String':
            return !$.trim(value);
        case 'Array':
            return !value.length;
        case 'Object':
            return $.isEmptyObject(value); // 普通对象使用 for...in 判断，有 key 即为 false
        default:
            return false; // 其他对象均视作非空
    }
};


common.user = {
    person: false,
    staffList: false,
    currentStaff: false
};

common.getSiteUrl = function (path) {
    var hostArr = window.location.href.split("#");
    return hostArr[0] + path;
};

common.getStaff = function (jump) {
    var jFlag = true;

    if (jump == false)
        jFlag = jump;

    if (common.user.currentStaff == false) {
        var currentStaff = false;
        if (localStorage[common.currentStaff] != undefined) {
            currentStaff = JSON.parse(localStorage[common.currentStaff]);
            common.user.currentStaff = currentStaff;
        }
    }

    var newStaff = false;

    if (common.user.currentStaff) {
        newStaff = $.extend({}, common.user.currentStaff);

        if (common.user.currentStaff.orgId <= 0 || common.isEmpty(common.user.currentStaff.orgId)) {
            newStaff.orgId = -1;
        }
    }

    if (jFlag)
        if (newStaff == false || newStaff.orgId == -1) {
            alert("获取员工信息异常!");
            window.location.href = this.getSiteUrl("#/signin");
        }

    return newStaff;
};

common.getStaffId = function () {
    if (common.user.currentStaff == false) {
        var currentStaff = false;
        if (localStorage[common.currentStaff] != undefined) {
            currentStaff = JSON.parse(localStorage[common.currentStaff]);
            common.user.currentStaff = currentStaff;
        }
    }

    if (common.user.currentStaff) {
        return common.user.currentStaff.id;
    } else
        return '';
};

common.getStaffList = function () {
    if (common.user.person == false || common.user.staffList) {
        var userInfo = false;
        if (localStorage[common.userInfo] != undefined) {
            userInfo = JSON.parse(localStorage[common.userInfo]);
            common.user.person = userInfo.person;
            common.user.staffList = userInfo.staffList;
        }
    }

    if (common.user.staffList) {
        return common.user.staffList;
    } else
        return false;
};

common.getPerson = function () {
    if (common.user.person == false || common.user.staffList) {
        var userInfo = false;
        if (localStorage[common.userInfo] != undefined) {
            userInfo = JSON.parse(localStorage[common.userInfo]);
            common.user.person = userInfo.person;
            common.user.staffList = userInfo.staffList;
        }
    }

    if (common.user.person) {
        return common.user.person;
    } else
        return false;
};

common.mapFields = function (data) {
    var result = {};

    for (var key in data) {
        // if (typeof data[key] != "object") {
        result[key] = {
            value: data[key]
        }
        // }
    }
    return result;
};

common.splitField = function (data) {
    var result = {
        name: "",
        value: ""
    }, count = 1;

    for (var key in data) {
        if (count > 0) {
            result.name = data[key].name;
            result.value = data[key];
        }

        count = count - 1;
    }

    return result;
};

common.getOrgId = function () {

    var staffInfo = common.getStaff();

    if (staffInfo && staffInfo.orgId && staffInfo.orgId > 0)
        return staffInfo.orgId;
    else
        return "-1";
};


(function () {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number}      The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function (value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function (value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }

})();

common.validateByRegex = function (name, regex, error, flag, rule, value, callback) {
    var validateIdentityCode = function (idCard) {
        /*
         * 身份证15位编码规则：dddddd yymmdd xx p
         * dddddd：6位地区编码
         * yymmdd: 出生年(两位年)月日，如：910215
         * xx: 顺序编码，系统产生，无法确定
         * p: 性别，奇数为男，偶数为女
         *
         * 身份证18位编码规则：dddddd yyyymmdd xxx y
         * dddddd：6位地区编码
         * yyyymmdd: 出生年(四位年)月日，如：19910215
         * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
         * y: 校验码，该位数值可通过前17位计算获得
         *
         * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
         * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
         * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
         * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
         * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
         */
        //15位和18位身份证号码的正则表达式
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(idCard)) {
            if (idCard.length == 18) {
                var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                for (var i = 0; i < 17; i++) {
                    idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
                }
                var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                var idCardLast = idCard.substring(17);//得到最后一位身份证号码
                //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                if (idCardMod == 2) {
                    if (idCardLast == "X" || idCardLast == "x") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                    if (idCardLast == idCardY[idCardMod]) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        } else {
            return false;
        }
    }
    var REGEX = {
        number: {
            exp: /^(1[0-9])\d{9}$/,
            error: "手机号码格式错误!"
        },
        money: {
            exp: /^((-|\+)?)(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
            error: "金额格式错误!"
        },
        positive: {
            exp: /^[1-9][0-9]*$/,
            error: "必须为正整数!"
        },
        nature: {
            exp: /^(0|([1-9][0-9]*))$/,
            error: "必须为自然数!"
        },
        float: {
            exp: /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
            error: "必须为浮点数(保留两位小数)!"
        },
    }
    var errors = [];
    if ((value == undefined || value == '') && flag) {

    } else {
        if (name == null) {
            if (regex != null) {
                if (!regex.test(value)) {
                    errors.push(new Error(error));
                }
            }
        } else {
            if (name == "identityCode") {
                validateIdentityCode(value) ? null : errors.push(new Error("身份证号码格式错误"));
            } else {
                if (!REGEX[name].exp.test(value)) {
                    if (error == null) {
                        errors.push(new Error(REGEX[name].error));
                    } else {
                        errors.push(new Error(error));
                    }
                }
            }
        }
    }
    callback(errors);
}

common.filterObjectInArrayObject = function (obj, name, value, key) {
    var data = [];
    for (var o in obj) {
        if (obj[o][name] == value) {
            if (key == "key") {
                data.push(o);
            } else {
                data.push(obj[o]);
            }
        }
    }
    return data;
};

common.connectString = function (strA, strB, connection, empty) {
    if ((strA == undefined || strA == "") && (strB == undefined || strB == "")) {
        return empty || "";
    } else if (strA == undefined || strA == "") {
        return strB;
    } else if (strB == undefined || strB == "") {
        return strA;
    } else {
        return strA + (connection || "<br/>") + strB;
    }
}

common.attachString = function (str, attachment, empty) {
    if (str) {
        return str + attachment;
    } else {
        return empty || "";
    }
};

common.accAdd = function (arg1, arg2) {
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
};
//js浮点数精确计算乘法
common.accMul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//判断滚动条宽度
common.getScrollbarWidth = function () {
    var oP = document.createElement('p'),
        styles = {
            width: '100px',
            height: '100px',
            overflowY: 'scroll'
        }, i, scrollbarWidth;
    for (i in styles) oP.style[i] = styles[i];
    document.body.appendChild(oP);
    scrollbarWidth = oP.offsetWidth - oP.clientWidth;
    oP.remove();
    return scrollbarWidth;
};

common.sortNumberFunc = function (a, b, order, sortField) {

    if (sortField) {
        var _a = a[sortField]
        var _b = b[sortField]
        if (order) {
            if (order == "asc") {
                return _a - _b;
            } else {
                return _b - _a;
            }
        }
    }
};


// loading 处理
// loading 存储栈
common.loadingObjects = {};

// 参数 id: 需要loading遮罩覆盖的元素 id ,body 元素直接传入body字符串即可
// 作用：会在 id所对应的元素/body  上添加loading效果
common.setLoading = function (id) {
    if (!id) {
        return;
    }

    common.removeLoading(id);

    var ele, loadingStyles = "ajax-async-loading";
    if (id !== 'body') {
        // 局部
        ele = document.getElementById(id);
        var computedStyle = getComputedStyle(ele, null);
        if (!computedStyle || !computedStyle.position || computedStyle.position != 'absolute') {
            ele.style.position = 'relative';
        }

        loadingStyles += " load-child";

        // 效果处理
        ele.style.webkitFilter = 'blur(1px)';
        ele.style.filter = 'blur(1px)';
        ele.style.opacity = '0.7';

    } else {
        // 全局
        ele = document.body;

        loadingStyles += " load-body";
        // 删除其他所有
        Object.keys(common.loadingObjects).forEach(function (key) {
            common.removeLoading(key);
        });
    }

    var loadingEle = document.createElement('div');
    loadingEle.setAttribute('class', loadingStyles);

    loadingEle.innerHTML = '<div class="ajax-async-spin-container">'
        + '  <p>'
        + '    <i class="fa fa-spinner fa-pulse fa-2x fa-fw margin-bottom ajax-async-spin"></i>'
        + '  </p>'
        + '</div>';

    ele.appendChild(loadingEle);
    common.loadingObjects[id] = loadingEle;

};


// 参数 id: 需要loading遮罩覆盖的元素 id ；body 为 'body'
// 作用：删除 id所对应的元素/body上的loading效果
common.removeLoading = function (id) {
    if (!id) {
        return;
    }
    if (common.loadingObjects[id]) {

        // 效果处理
        var loadingObj = common.loadingObjects[id].parentNode;
        loadingObj.style.webkitFilter = '';
        loadingObj.style.filter = '';
        loadingObj.style.opacity = '';

        common.loadingObjects[id].parentNode.removeChild(common.loadingObjects[id]);
        delete common.loadingObjects[id];

    }

};

common.init = function () {
    this.initEvent();
    this.log();
};

common.initEvent = function () {
    //todo Object.keys

    $(document).on('ajaxSend', function (e, xhr, setting) {
        common.setLoading(setting.loadingElementId);
    }).on('ajaxComplete', function (e, xhr, setting) {
        common.removeLoading(setting.loadingElementId);
    })
};


common.keyMirror = function(obj) {

    var result = {};

    for(var key in obj) {

        var value = obj[key];

        if(value) {
            result[value] = key
        }

    }

    return result

}
