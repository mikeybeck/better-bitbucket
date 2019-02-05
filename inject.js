// this is the code which will be injected into a given page...

(function () {
    console.log('inserted better-bitbucket JS');

    try {
        removePlusMinus();
        makeSidebar();
    } catch (err) {
        console.error(err);
    }

    function removePlusMinus() {
        var list = document.getElementsByClassName('source');
        for (let item of list) {
            if (item.innerHTML.charAt(0) === '+' || item.innerHTML.charAt(0) === '-') {
                item.innerHTML = ' ' + item.innerHTML.substr(1);
            }
        }
    }

    function makeSidebar() {
        var div = document.getElementById('commit-files-summary'),
            clone = div.cloneNode(true);
        clone.id = 'commit-files-summary-sidebar';
        document.body.appendChild(clone);
    }
})();