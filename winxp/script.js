document.addEventListener('DOMContentLoaded', () => {
    const errorWindow = document.querySelector('.window__error');
    let isDragging = false;

    errorWindow.addEventListener('mousedown', function(e) {
        isDragging = true;
        let offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
        let offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);

        function mouseMoveHandler(e) {
            if (isDragging) {
                errorWindow.style.left = e.clientX - offsetX + 'px';
                errorWindow.style.top = e.clientY - offsetY + 'px';
            }
        }

        function mouseUpHandler() {
            isDragging = false;
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);
        }

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    });
    

    const gifNames = [
        "128C.gif", "2iH5.gif", "2ii9.gif", "3IsP.gif", "4Cj7.gif", "4HVJ.gif",
        "4SHX.gif", "5FBd.gif", "6e7j.gif", "6ka.gif", "6os.gif", "6XZV.gif",
        "7XJM.gif", "36qY.gif", "67Pg.gif", "bfT.gif", "db.gif", "hdt.gif",
        "PYh.gif", "PyTJ.gif", "WME4.gif", "WS2k.gif", "X1Wr.gif", "XiPm.gif",
        "XlO9.gif", "xt.gif", "Xwl7.gif", "YKCo.gif", "Z7NM.gif", "Zl6r.gif",
        "Z23V.gif", "ZC9Y.gif", "ZKan.gif", "ZUie.gif"
    ];
    
        const basePath = 'img/';
    
        function positionGifRandomly(gifElement) {
            gifElement.onload = () => {
                const viewportWidth = window.innerWidth - gifElement.width;
                const viewportHeight = window.innerHeight - gifElement.height;
    
                const randomX = Math.random() * viewportWidth;
                const randomY = Math.random() * viewportHeight;
    
                gifElement.style.left = randomX + 'px';
                gifElement.style.top = randomY + 'px';
            };
        }
    
        const okButton = document.getElementById('okButton');
        okButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * gifNames.length);
            const gifSrc = basePath + gifNames[randomIndex];
            const gif = new Image();
            gif.src = gifSrc;
            gif.className = 'gif';
            gif.style.position = 'absolute';
    
            document.body.appendChild(gif);
            positionGifRandomly(gif);
        });
    });
    