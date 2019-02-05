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





    // TESTING BELOW HERE:

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
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


    let els = document.getElementsByClassName('diff-actions');
    els = Array.prototype.slice.call(els);

    els.forEach(el => {
        var handler = onVisibilityChange(el, function (visible) {
            console.log('visiblilty changed!');
            console.log(visible);
            console.log(el.id);
            console.log(els.indexOf(el));

            let c = document.getElementById('commit-files-summary-sidebar').children;
            if (visible) {
                c[els.indexOf(el)].style.backgroundColor = 'yellow';
            } else {
                c[els.indexOf(el)].style.backgroundColor = 'inherit';
            }
        });

        if (window.addEventListener) {
            addEventListener('DOMContentLoaded', handler, false);
            addEventListener('load', handler, false);
            addEventListener('scroll', handler, false);
            addEventListener('resize', handler, false);
        } else if (window.attachEvent) {
            attachEvent('onDOMContentLoaded', handler); // IE9+ :(
            attachEvent('onload', handler);
            attachEvent('onscroll', handler);
            attachEvent('onresize', handler);
        }
    });

})();