(function (window, document, $) {
    var LAZY_SRC = 'lazy-src';
    var LAZY_CLASS = 'lazy-class';

    var PRELOAD_IMAGE = 'preload-image';
    var PRELOAD_MIN = 'preload-min';
    var PRELOAD_MAX = 'preload-max';

    var WIDTH = $(window).width();

    $.fn.lazyRender = function (fn) {
        switch (fn) {
            case 'render':
                return render(this);

            case 'renderImages':
                return renderImages(this);

            case 'renderClasses':
                return renderClasses(this);

            case 'preloadImages':
                return preloadImages(this);

            case 'schedule':
            default:
                return schedule(this);
        }
    };

    function schedule($elem) {
        $(window).on('load', function () {
            render($elem);
        });

        return $elem;
    }

    function render($elem) {

        var primaryTasks = [
            renderImages($elem),
            renderClasses($elem)
        ];

        return $.when(primaryTasks).then(function () {
            return preloadImages($elem);
        });
    }

    function renderImages($elem) {
        var $targets = $elem.find('img[data-' + LAZY_SRC + ']').sort(function (a, b) {
            return $(a).offset().top - $(b).offset().top;
        });

        var deferredChain = $targets.map(_renderImage);

        return $.when(deferredChain);
    }

    function _renderImage() {
        var $this = $(this);
        var deferred = $.Deferred();

        $this.attr('src', $this.data('lazy-src'))
            .on('load', function () {
                $this.attr('data-lazy-src-rendered', '');
                deferred.resolve(true, $this);
            })
            .on('error', function () {
                deferred.resolve(false, $this);
            });

        return deferred;
    }

    function renderClasses($elem) {
        var $targets = $elem.find('[data-' + LAZY_CLASS + ']').sort(function (a, b) {
            return $(a).offset().top - $(b).offset().top;
        });

        var deferredChain = $targets.map(_renderClass);

        return $.when(deferredChain);
    }

    function _renderClass() {
        var $this = $(this);
        var deferred = $.Deferred();

        var dataClass = $this.data(LAZY_CLASS);
        $this.addClass(dataClass);

        deferred.resolve(true, dataClass);
        return deferred;
    }

    function preloadImages($elem) {
        var $targets = $elem.find('[data-' + PRELOAD_IMAGE + ']');
        var deferredChain = $targets.map(_preloadImage);

        return $.when(deferredChain);
    }

    function _preloadImage() {
        var $this = $(this);
        var deferred = $.Deferred();

        var src = $this.data(PRELOAD_IMAGE);

        var minWidth = parseInt($this.data(PRELOAD_MIN)) || -Infinity;
        var maxWidth = parseInt($this.data(PRELOAD_MAX)) || Infinity;

        if (WIDTH >= minWidth && WIDTH <= maxWidth) {
            // Create a dummy element and hide it to ensure any background images are previously loaded
            $('<img>').attr('src', src)
                .appendTo('body')
                .on('load', function () {
                    this.remove();
                    deferred.resolve(true, src);
                })
                .on('error', function () {
                    deferred.resolve(false, src);
                });
        } else {
            deferred.resolve(false, src);
        }

        return deferred;
    }

})(window, document, jQuery);
