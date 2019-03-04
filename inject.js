// better-bitbucket JS

window.onload = function () {
    console.log('inserted better-bitbucket JS');

    try {
        runFunctions();
    } catch (err) {
        console.error(err);
    }

    // It's difficult to tell when the page is ready to be manipulated; periodically checking that the
    // #commit-files-summary element exists seems to do the trick well enough at the moment.
    function runFunctions() {
        var checkExist = setInterval(function () {
            if (document.getElementById('commit-files-summary')) {

                makeSidebar();
                highlightFileNames();
                addCommentCheckboxes();

                compareContentButton();

                // Those pesky +'s & -'s reappear if you remove them too early, so wait a few seconds.
                setTimeout(function () {
                    removePlusMinus();
                }, 5000);

                clearInterval(checkExist);
            }
        }, 100); // check every 100ms
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
        let div = document.getElementById('commit-files-summary'),
            clone = div.cloneNode(true);
        clone.id = 'commit-files-summary-sidebar';
        document.body.appendChild(clone);
    }

    function addCommentCheckboxes() {
        let elements = Array.prototype.slice.call(document.getElementsByClassName('refract-content-container'));
        elements.forEach(el => {
            el.insertAdjacentHTML('afterbegin',
                '<input type="checkbox" class="commentChecker toggle-check-input" />' +
                '<!--<label class="toggle-check"><span class="toggle-check-text"></span></label>-->');
        });
    }


    //  Note: most of the code in the below function was taken directly from
    //  Stack Overflow: https://stackoverflow.com/a/7557433/1409469
    function highlightFileNames() {

        let elements = Array.prototype.slice.call(document.getElementsByClassName('diff-actions'));

        elements.forEach(el => {
            let handler = onVisibilityChange(el, function (visible) {
                let sidebarFiles = document.getElementById('commit-files-summary-sidebar').children,
                    fileIndex = elements.indexOf(el);
                if (visible) {
                    sidebarFiles[fileIndex].classList.add('file-in-view');
                } else {
                    sidebarFiles[fileIndex].classList.remove('file-in-view');
                }
            });

            if (window.addEventListener) {
                addEventListener('load', handler, false);
                addEventListener('scroll', handler, false);
                addEventListener('resize', handler, false);
            } else if (window.attachEvent) {
                attachEvent('onload', handler);
                attachEvent('onscroll', handler);
                attachEvent('onresize', handler);
            }
        });

        function isElementInViewport(el) {
            var rect = el.getBoundingClientRect();
            return (
                rect.top >= 50 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - 200 &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function onVisibilityChange(el, callback) {
            var old_visible;
            return function () {
                var visible = isElementInViewport(el);
                if (visible != old_visible) {
                    old_visible = visible;
                    if (typeof callback == 'function') {
                        callback(visible);
                    }
                }
            }
        }
    }

    function compareContentButton() {
        if (window.location.pathname.slice(-18) !== '/pull-requests/new') {
            return;
        }

        let button = document.createElement('span'),
            buttonText = document.createTextNode('Show \'Compare Content\'');
        button.appendChild(buttonText);
        button.id = 'show-compare-content-button';
        button.classList.add('aui-button');
        button.classList.add('aui-button-secondary');

        button.onclick = function () {
            let element = document.getElementById('compare-content');
            if (button.innerText == 'Hide \'Compare Content\'') {
                button.innerText = ('Show \'Compare Content\'');
            } else {
                button.innerText = ('Hide \'Compare Content\'');
            }

            element.classList.toggle('show');
        }

        let prDetails = document.getElementsByClassName('pr-details');
        if (typeof prDetails[0] !== 'undefined') {
            prDetails[0].insertAdjacentElement('afterend', button);
        }
    }

}();