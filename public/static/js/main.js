"use strict";
function copy(i, t)
{
    var n = $(i).text(), i = new Clipboard(t, {
        text : function ()
        {
            return n;
        }
    });
    i.on("success", function (i)
    {
        msg(I18n.dict.Copy_success)
    }), i.on("error", function (i)
    {
        msg(i)
    })
}
function showCircuit(i)
{
    $(".circuitDiv .side li").removeClass("cur"), $(".circuitDiv .side li[data-num=" + i + "]").addClass("cur"), 
    $(".circuitDiv .blocks .item").hide(), $(".circuitDiv .blocks .item[data-num=" + i + "]").show()
}
function showWhy(i)
{
    $(".whyDiv .buts li").removeClass("cur"), $(".whyDiv .buts li[data-num=" + i + "]").addClass("cur"), 
    $(".whyDiv .blocks .item").removeClass("cur"), $(".whyDiv .blocks .item[data-num=" + i + "]").addClass("cur");
    var t = parseInt($(".whyDiv .blocks .item").width() + 2);
    $(".whyDiv .blocks").css("margin-left", t * (i - 1) *- 1 + "px")
}
function showWin(i)
{
    $(".winDiv .item").hide(), $(".winDiv ." + i).show(), $(".winDiv").fadeIn(200), $(".winMask").fadeIn(200)
}
function animateInitToTop()
{
    var i = location.hash, t = $(".pdiv a[data-href='" + i + "']");
    t.length ? (console.log(111), $(t).trigger("click")) :- 1 != i.indexOf("service") && (console.log(11), 
    showWin(i = i.replace("#", "")))
}
$(window).scroll(function ()
{
    18 < (document.documentElement.scrollTop || document.body.scrollTop) ? $(".headNav").addClass("in") : $(".headNav").removeClass("in")
}), $(".headNav .nav>li>a").click(function ()
{
    var i, t = $(this).data("href");
    return - 1 != t.indexOf("#") ? (i = $(".headNav").height(), $("html, body").animate( {
        scrollTop : $(t).offset().top - i
    }, 500)) : "language" == t ? (i = "zh-CN" == I18n.lang ? "zh-CN" : "zh-CN", I18n.setLanguage("index", 
    i), api_initialize()) : "userCenter" == t ? merge.getValue("token") && merge.getValue("userId") ? window.location.href = "./user.html" : window.location.href = "./login.html" : showWin(t), 
    !1;
}), $(".circuitDiv .side li").click(function (i)
{
    showCircuit($(this).data("num"))
}), $(".whyDiv .buts li").click(function (i)
{
    showWhy($(this).data("num"))
}), $(".winDiv .colse").click(function (i)
{
    $(".winDiv").fadeOut(200), $(".winMask").fadeOut(200)
}), $(".winMask").click(function (i)
{
    $(".winDiv").fadeOut(200), $(".winMask").fadeOut(200)
}), $(".sideDiv ul li").click(function (i)
{
    showWin($(this).data("type"))
}), $(".faqDiv .list ul li button").click(function (i)
{
    "Expand" == $(this).attr("lang") ? ($(this).parent().find("div").css({
        height : "auto", overflow : "scroll"
    }), $(this).attr("lang", "Collapse").text(__tr($(this).attr("lang")))) : ($(this).parent().find("div").css({
        height : "12vw", overflow : "hidden"
    }), $(this).attr("lang", "Expand").text(__tr($(this).attr("lang"))))
}), showCircuit(1), showWhy(1), I18n.setLanguage("index"), commonDataInit();
