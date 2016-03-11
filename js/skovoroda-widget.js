/**
 * @author Relevant Software
 */

(function () {

    /**
     * Create widget iFrame style.
     * @param name
     */
    function getWidgetStyle(name) {

        var baseStyle = {
                frameStyle: {display: 'block', height: '35px', position: 'fixed', zIndex: '999', border: 'none'},
                bodyStyle: {}
            },
            styles = {
                fullWidth: {
                    frameStyle: {width: '100%', bottom: 0, left: 0},
                    bodyStyle: {marginBottom: '35px'}
                },
                centered: {
                    frameStyle: {width: '60%', bottom: '5px', left: '20%'},
                    bodyStyle: {}
                }
            },
            styleName = styles.hasOwnProperty(name) ? name : 'fullWidth',
            activeStyle = styles[styleName];

        /* Apply styles to body */
        for (var styleKey in activeStyle.bodyStyle) {
            baseStyle.bodyStyle[styleKey] = activeStyle.bodyStyle[styleKey];
        }

        /* Apply styles to frame */
        for (var styleKey in activeStyle.frameStyle) {
            baseStyle.frameStyle[styleKey] = activeStyle.frameStyle[styleKey];
        }

        return baseStyle;
    }

    function RadioSkovorodaImporter() {

        var _self = {};

        /**
         * Frame source url.
         * @type {string}
         * @protected
         */
        _self.frameSrc = "//radioskovoroda.com/widget/layout.html";

        /**
         * Load fame options.
         * @returns object
         */
        _self.getFrameOptions = function () {
            return window['radioskovoroda-widget'] ? window['radioskovoroda-widget'] : {};
        };

        _self.applyElementStyles = function (el, style) {
            for (var styleKey in style) {
                el.style[styleKey] = style[styleKey];
            }
        };

        /**
         * Generate frame source url with unique parameter.
         * @returns {string}
         * @protected
         */
        _self.generateFrameSrc = function () {
            return _self.frameSrc + '?_=' + Date.now();
        };

        /**
         * Build frame DOM element.
         * @returns {Node}
         * @protected
         */
        _self.buildFrame = function () {
            var frameElement = document.createElement("iframe"),
                frameOptions = _self.getFrameOptions(),
                style = getWidgetStyle(frameOptions.style);

            frameElement.id = "radioskovoroda-widget";

            _self.applyElementStyles(document.body, style.bodyStyle);
            _self.applyElementStyles(frameElement, style.frameStyle);

            frameElement.src = _self.generateFrameSrc();

            return frameElement;
        };

        /**
         * Import frame into the page body tag.
         * @protected
         */
        _self.importFrame = function () {
            document.body.appendChild(_self.buildFrame());
        };

        /**
         * Build and import widget into the page.
         */
        this.widget = function () {
            _self.importFrame();
        };
    }

    /**
     * Specify a function to execute when the DOM is fully loaded.
     * @param callback
     */
    var DOMReady = function (callback) {
        document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
    };


    /* Run */
    DOMReady(function () {
        (new RadioSkovorodaImporter()).widget();
    });

})();
