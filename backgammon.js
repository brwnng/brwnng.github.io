document.addEventListener('DOMContentLoaded', function() {
    const svgContainer = document.getElementById('svg-container');
    const menuItems = document.querySelectorAll('.menu-item');

    function loadSVG(svgFile) {
        const svgPath = `assets/${svgFile}`;

        svgContainer.innerHTML = '';

        const imgElement = document.createElement('img');
        imgElement.src = svgPath;
        imgElement.alt = 'Backgammon SVG';

        svgContainer.appendChild(imgElement);
    }

    function selectRow(item) {
        menuItems.forEach(item => {
            item.classList.remove('selected');
        });
        item.classList.add('selected');
        const svgFile = item.getAttribute('data-svg');
        loadSVG(svgFile);
    }
    function randomizeSelection() {
        const randomIndex = Math.floor(Math.random() * menuItems.length);
        const randomItem = menuItems[randomIndex];
        selectRow(randomItem);
    }
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            selectRow(item);
        });
    });
    svgContainer.addEventListener('click', randomizeSelection);
    if (menuItems.length > 0) {
        const firstItem = menuItems[0];
        selectRow(firstItem);
    }
});
