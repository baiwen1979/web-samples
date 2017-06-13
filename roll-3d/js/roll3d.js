window.onload = function() {
    var ul = document.getElementById('images');

    roll3d(ul);
    draggable3d(ul);

    function roll3d(ul) {
        var items = ul.getElementsByTagName('li');
        for (var i = 0; i < items.length; i++) {
            items[i].style.transition = '.4s all ease' + (items.length - i) * 200 + 'ms';
            (function(item, i){
                setTimeout(function() {
                    item.style.transform = 'rotateY(' + 360 / items.length * i + 
                        'deg) translateZ(280px)';
                }, 100)
            })(items[i], i)
        }
    }

    function draggable3d(ul) {

        var x = 0, y = 0;        
        var lastX = 0, lastY = 0;
        var speedX = 0, speedY = 0;
        var timer = null;

        document.onmousedown = function(e) {
            var items = ul.getElementsByTagName('li'); 
            var disX = e.clientX - x;
            var disY = e.clientY - y;
            clearInterval(timer);
            for (var i = 0; i < items.length; i++) {
                items[i].style.transition = 'none';
            }

            document.onmousemove = function(e) {
                x = e.clientX - disX;
                y = e.clientY - disY;
                rotate3d(ul, x / 3, y / 3);
                speedX = e.clientX - lastX;
                speedY = e.clientY - lastY;
                lastX = e.clientX;
                lastY = e.clientY;
            };

            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
                timer = setInterval(function () {
                    speedX *= 0.95;
                    speedY *= 0.95;
                    x += speedX;
                    y += speedY;
                    rotate3d(ul, x / 3, y / 3);
                }, 30);
            };
            return false;
        };
    }

    function rotate3d(ul, x, y) {       
        ul.style.transform = 'perspective(800px) rotateX(' + (-y)+ 'deg) rotateY(' + x + 'deg)';
    }    
}