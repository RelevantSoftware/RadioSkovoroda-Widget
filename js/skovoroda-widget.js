/**
 * @author Relevant Software
 */

(function () {

    /**
     * @param {*} styles
     * @param {*} additionalStyle
     * @returns {*}
     */
    function applyStyles(styles, additionalStyle) {
        for (var styleKey in additionalStyle) {
            if (additionalStyle.hasOwnProperty(styleKey)) {
                styles[styleKey] = additionalStyle[styleKey];
            }
        }
    }

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
                    frameStyle: {width: '60%', bottom: '5px', left: '20%', 'border-radius': '5px'},
                    bodyStyle: {}
                }
            },
            styleName = styles.hasOwnProperty(name) ? name : 'fullWidth',
            activeStyle = styles[styleName];

        applyStyles(baseStyle.bodyStyle, activeStyle.bodyStyle); // Merge styles for body
        applyStyles(baseStyle.frameStyle, activeStyle.frameStyle); // Merge styles for frame

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

            applyStyles(document.body.style, style.bodyStyle);
            applyStyles(frameElement.style, style.frameStyle);

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
