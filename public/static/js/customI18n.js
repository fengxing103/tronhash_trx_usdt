"use strict";
!function (t)
{
    var i = {
        lang : "zh-CN", dict : {}
    },
    e = navigator.language, e = ("zh-CN" === (e = "zh-CN" === e || "zh" === e ? "zh-CN" : e) || "zh-CN" === e) && e;
    function s(t, e)
    {
        null != sessionStorage.getItem(e + "_" + t + "_Data") ? i.dict = JSON.parse(sessionStorage.getItem(e + "_" + t + "_Data")) : function ()
        {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "index", t = (new Date).getTime();
            $.ajax(
            {
                async :!1, type : "GET", data : {
                    t : t
                },
                url : "./lang/" + e + "/" + i.lang + ".json",
                success : function (t)
                {
                    t.siteName = "zh-CN" == i.lang ? cn_siteName : en_siteName, i.dict = t, sessionStorage.setItem(e + "_" + i.lang + "_Data", 
                    JSON.stringify(t));
                }
            })
        }
        (e), $("[lang]").each(function ()
        {
            switch (this.tagName.toLowerCase())
            {
                case "input":
                    $(this).attr("placeholder", a($(this).attr("lang")));
                    break;
                case "html":
                    break;
                case "img":
                    $(this).attr("src", a($(this).attr("lang")));
                    break;
                default:
                    $(this).html(a($(this).attr("lang")))
            }
        })
    }
    function a(t)
    {
        for (var e = t.split("."), a = i.dict, n = 0; n < e.length; n++) {
            a = a[e[n]];
        }
        return a || t
    }
    function n(t)
    {
        return a(t)
    }
    i.lang = function (t)
    {
        var e, a = document.cookie.split(";");
        for (e in a)
        {
            var n = $.trim(a[e]), i = n.indexOf("="), s = n.substring(0, i);
            if (t == $.trim(s)) {
                return $.trim(n.substring(i + 1));
            }
        }
        return null
    }
    ("lang") || e || "zh-CN", i.setLanguage = function (t)
    {
        var e, a, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : i.lang;
        i.lang = n, e = "lang=" + n + "; path=/;", (a = new Date).setTime(a.getTime() + 2592e6), document.cookie = e + ";expires=" + a.toGMTString(), 
        s(n, t);
    },
    i.registerWords = function ()
    {
        $("[lang]").each(function ()
        {
            switch (this.tagName.toLowerCase())
            {
                case "input":
                case "html":
                case "img":
                    break;
                default:
                    "" == $(this).attr("lang") && $(this).attr("lang", $(this).text())
            }
        })
    },
    i.$t = n, t.$t = n, t.I18n = i
}
(window);
