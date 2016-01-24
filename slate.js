S.cfga({
  "defaultToCurrentScreen": true,
  "resizePercentOf": "screenSize",
  "windowHintsShowIcons": true,
  "focusCheckWidthMax": 3000
});

// monitors
var monLap = "1680x1050";
var monExt = "1920x1080";

var extFull = S.op("move", {
  "screen": monExt,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});

var pushRight = slate.operation("push", {
  "direction" : "right",
  "style" : "bar-resize:screenSizeX/3"
});

var pushLeft = slate.operation("push", {
  "direction" : "left",
  "style" : "bar-resize:screenSizeX/3"
});
var pushUp = slate.operation("push", {
  "direction" : "top",
  "style" : "bar-resize:screenSizeX/2"
});
var pushDown = slate.operation("push", {
  "direction": "bottom",
  "style": "bar-resize:screenSizeX/2"
});
var fullscreen = slate.operation("move", {
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});
var growLeft = slate.operation("resize", {
  "width": "+10%",
  "height": "+0",
  "anchor": "top-right"
});
var growRight = slate.operation("resize", {
  "width": "+10%",
  "height": "+0",
  "anchor": "top-left"
});
var shrinkLeft = slate.operation("resize", {
  "width": "-10%",
  "height": "+0",
  "anchor": "top-left"
});
var shrinkRight = slate.operation("resize", {
  "width": "-10%",
  "height": "+0",
  "anchor": "top-right"
});
var growUp = slate.operation("resize", {
  "height": "+10%",
  "width": "+0",
  "anchor": "bottom-left"
});
var growDown = slate.operation("resize", {
  "height": "+10%",
  "width": "+0",
  "anchor": "top-left"
});
var shrinkUp = slate.operation("resize", {
  "height": "-10%",
  "width": "+0",
  "anchor": "top-left"
});
var shrinkDown = slate.operation("resize", {
  "height": "-10%",
  "width": "+0",
  "anchor": "bottom-right"
});

var focusRight = slate.operation("focus", {
  "direction": "right"
});
var focusLeft = slate.operation("focus", {
  "direction": "left"
});
var focusUp = slate.operation("focus", {
  "direction": "up"
});
var focusDown = slate.operation("focus", {
  "direction": "down"
});
var focusBehind = slate.operation("focus", {
  "direction": "behind"
});


function getAllScreens() {
  var screens = [];
  slate.eachScreen(function (screen) {screens.push(screen);});
  return screens;
}

var throwCycle = slate.operation("throw", {
  "screen": function () {
    currentScreen = slate.screen();
    allScreens = getAllScreens();
    currentIndex = allScreens.indexOf(currentScreen);
    return allScreens[(currentIndex + 1) % allScreens.length];
  }
});

// var switch = slate.operation("switch");
// slate.bind("space:alt", switch);

S.bindAll({
  "a:cmd;alt;shift": pushLeft,
  "d:cmd;alt;shift": pushRight,
  "w:cmd;alt;shift": pushUp,
  "s:cmd;alt;shift": pushDown,
  "a:shift;alt": growLeft,
  "d:shift;alt": growRight,
  "w:shift;alt": growUp,
  "s:shift;alt": growDown,
  "a:cmd;alt": shrinkLeft,
  "d:cmd;alt": shrinkRight,
  "w:cmd;alt": shrinkUp,
  "s:cmd;alt": shrinkDown,

  "q:alt;shift": throwCycle,

  "a:cmd;shift": focusLeft,
  "d:cmd;shift": focusRight,
  "w:cmd;shift": focusUp,
  "s:cmd;shift": focusDown,
  "space:cmd;shift": focusBehind,
  "return:cmd;shift": fullscreen
});

S.log("[SLATE] -------------- Finished Loading Config --------------");
