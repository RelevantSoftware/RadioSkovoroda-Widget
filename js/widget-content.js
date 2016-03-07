/**
 * @author Relevant Software
 */

(function () {

    function RadioSkovorodaWidget() {

        var _self = {};

        /**
         * Stream api url.
         * @type {string}
         * @protected
         */
        _self.streamApiUrl = '//online-radioskovoroda.demo.relevant.software/api.php';

        /**
         * Stream update time interval in ms
         * @type {string}
         * @protected
         */
        _self.streamUpdateInterval = 10000; // 10s

        /**
         * Generate stream api url with the unique parameter to prevent results from cache.
         * @returns {string}
         * @protected
         */
        _self.generateStreamApiUrl = function () {
            return _self.streamApiUrl + '?_=' + Date.now();
        };

        /**
         * Request stream data.
         * @param callback
         * @protected
         */
        _self.requestStreamData = function (callback) {
            var xmlHttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

            xmlHttp.onload = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlHttp.status == 200) {
                        try {
                            var response = JSON.parse(xmlHttp.responseText);
                            callback(response);
                        } catch (e) {
                            throw new RadioSkovorodaWidgetException("Invalid Server Response.");
                        }
                    } else {
                        throw new RadioSkovorodaWidgetException(xmlHttp.status + " Error.");
                    }
                }
            };

            xmlHttp.open("GET", this.generateStreamApiUrl(), true);
            xmlHttp.send();
        };

        /**
         * Render stream name.
         * @protected
         */
        _self.renderStreamName = function (apiResponse) {
            document.getElementById("radio-bar__song").textContent = apiResponse.title;
        };

        /**
         * Process and render stream name.
         */
        _self.processStreamNameRequest = function () {
            _self.requestStreamData(_self.renderStreamName);
        };

        /**
         * Run the widget.
         */
        this.run = function () {
            _self.processStreamNameRequest();
            window.setInterval(function () {
                _self.processStreamNameRequest();
            }, _self.streamUpdateInterval);
        };

    }

    function RadioSkovorodaWidgetException(message) {

        /**
         * Exception name.
         */
        this.name = this.constructor.name;

        /**
         * Exception message.
         */
        this.message = message;

        /**
         * Convert exception to string.
         * @returns {string}
         */
        this.toString = function () {
            return this.name + ": " + this.message;
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
        (new RadioSkovorodaWidget()).run();
    });

})();
