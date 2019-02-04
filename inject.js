// this is the code which will be injected into a given page...

(function () {
    console.log('inserted better-bitbucket JS');

    removePlusMinus();

    function removePlusMinus() {
        try {
            var list = document.getElementsByClassName("source");
            for (let item of list) {
                if (item.innerHTML.charAt(0) === '+' || item.innerHTML.charAt(0) === '-') {
                    item.innerHTML = ' ' + item.innerHTML.substr(1);
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

})();