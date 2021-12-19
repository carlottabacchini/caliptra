var p = document.getElementById('spotlight')
var spotlightDiameter = 100;
var lastX, lastY, cursorX, cursorY;
var patterns = new Array("radici.jpg");
var randomNum = Math.floor(Math.random() * patterns.length);
p.style.width = spotlightDiameter + 'px';
p.style.height = spotlightDiameter + 'px';
// Verify that the mouse event wasn't triggered by a descendant.
function verifyMouseEvent(e, elem) {
  e = e || window.event;
  var related = e.relatedTarget || e.toElement;
  while ((related != undefined) &&
    (related != elem) &&
    (related.nodeName != 'BODY')) {
    related = related.parentNode;
  }
  return (related != elem);
}


var lImg, ee;

lImg = window.innerHeight * 16 / 9
ee = lImg - window.innerWidth ;

window.addEventListener("resize", function(event) {
  lImg = window.innerHeight * 16 / 9
  ee = lImg - window.innerWidth;
});


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  p.style.left = 'calc(100% - ' + randomNum / 2 * 100 + 'px)';
  p.style.top = 'calc(100% - ' + randomNum * 120 + 'px)';
  p.style.backgroundImage = 'url(' + patterns[randomNum] + ')';
}


else {
  window.addEventListener('mousemove', function(e) {
    p.style.display = "block"
    cursorX = e.pageX - spotlightDiameter / 2;
    cursorY = e.pageY - spotlightDiameter / 2;
  })
  setInterval(function() {
    var newX = p.offsetLeft + (cursorX - lastX) / 7
    var newY = p.offsetTop + (cursorY - lastY) / 7

    p.style.left = newX + 'px';
    p.style.top = newY + 'px';


    p.style.backgroundPositionX = -newX - 4 - ee/2 - 273 + "px";
    p.style.backgroundPositionY = -newY - 4 + "px";
    p.style.backgroundImage = 'url(' + patterns[randomNum] + ')';
    lastX = p.offsetLeft
    lastY = p.offsetTop
  }, 20)
}




function scrollToSmoothly(pos, time) {
  var currentPos = window.pageYOffset;
  var start = null;
  if (time == null) time = 500;
  pos = +pos, time = +time;
  window.requestAnimationFrame(function step(currentTime) {
    start = !start ? currentTime : start;
    var progress = currentTime - start;
    if (currentPos < pos) {
      window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
    } else {
      window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
    }
    if (progress < time) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, pos);
    }
  });
}
