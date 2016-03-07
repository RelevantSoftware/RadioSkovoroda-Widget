/**
 * @author Relevant Software
 */

(function () {

    function RadioSkovorodaImporter() {

        var _self = {};

        /**
         * Frame source url.
         * @type {string}
         * @protected
         */
        _self.frameSrc = "//radioskovoroda.com/widget/layout.html";

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
            var frameElement = document.createElement("iframe");
            frameElement.id = "radioskovoroda-widget";
            frameElement.style.display = "block";
            frameElement.style.width = "100%";
            frameElement.style.height = "35px";
            frameElement.style.position = "fixed";
            frameElement.style.bottom = "0px";
            frameElement.style.left = "0px";
            frameElement.style.zIndex = "999";
            frameElement.style.border = "none";
            frameElement.src = _self.generateFrameSrc();
            return frameElement;
        };

        /**
         * Import frame into the page body tag.
         * @protected
         */
        _self.importFrame = function () {
            document.body.style.marginBottom = "35px";
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
