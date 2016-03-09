# Radio Skovoroda Widget
Integrate radio SKOVORODA with your site.
Listen to the radio online http://radioskovoroda.com/.

### How to install widget
Copy and paste this code into every webpage you want to show widget.
```
<script type="text/javascript">
	(function (src) {
		var h = document.getElementsByTagName('head')[0];
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = src + '?_=' + Date.now();
		s.async = "async";
		h.appendChild(s);
	})('//radioskovoroda.com/widget/js/skovoroda-widget.min.js');
</script>
```
### Preview
![Widget preview](https://raw.githubusercontent.com/RelevantSoftware/radioskovoroda-widget/master/preview.png)
