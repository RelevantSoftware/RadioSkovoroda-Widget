# Radio Skovoroda Widget
Integrate radio SKOVORODA with your site.
Listen to the radio online http://radioskovoroda.com/.

### How to install widget

Copy and paste this code into every webpage you want to show widget:
```
<script type="text/javascript">
    (function (src, options) {
        var h = document.getElementsByTagName("head")[0];
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = src + "?_=" + Date.now();
        s.async = "async";
        h.appendChild(s);
        window['radioskovoroda-widget'] = options;
    })("//radioskovoroda.com/widget/js/skovoroda-widget.min.js", {style: 'centered'}); 
</script>
```

### Configuration 
Available styles:
* fullWidth
* centered

### Preview
* fullWidth
![Widget preview fullWidth style](https://raw.githubusercontent.com/RelevantSoftware/radioskovoroda-widget/master/preview-fullWidth.png)

* centered
![Widget preview centered style](https://raw.githubusercontent.com/RelevantSoftware/radioskovoroda-widget/master/preview-centred.png)

