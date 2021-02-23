

Replace the default behaviour of all links in a site marked with a specific css class.
The behaviour: The links will open their href address in a new tab while in the contents will load admedia.net script in the current existing page
#INSTRUCTIONS
Place the following lines within the <head></head> tags of the site replacing media net’s script (both: head and html tags)
```
<script src="https://scripts.fastnclick.com/lbehind.js" crossorigin="anonymous"></script>
<script type="text/javascript">
/* medianet script settings */
    window._mNHandle = window._mNHandle || {};
    window._mNHandle.queue = window._mNHandle.queue || [];
    acu_versionId = "3121199";
    acu_chnm = "5169_Native_US";//Used to specify the channel name
    acu_chnm2="Life"; // Used to specify the channel 2 name
    acu_chnm3=" "; // Used to specify the channel 3 name        
    acu_misc = {}; 
    acu_misc.query = 'Life';
    acu_misc.zip= '<zip>'; //Used to specify the zip
    acu_misc.score='<credit score>'; //Used to specify the credit score/rating

/* Leave behind script settings */
    lbh.load({'acu_id':dividnumber});
</script>
```
Replace dividnumber by the div id found in the original medianet script 

## Within the <head></head> tags
```
<script src="https://csearchtopics101.akamaized.net/dacu.js?cid=8CU37R3V6" async="async"></script>
<script type="text/javascript">
    window._mNHandle = window._mNHandle || {};
    window._mNHandle.queue = window._mNHandle.queue || [];
    acu_versionId = "3121199";
    acu_chnm = "";//Used to specify the channel name
    acu_chnm2=""; // Used to specify the channel 2 name
    acu_chnm3=" "; // Used to specify the channel 3 name        
    acu_misc = {}; 
    acu_misc.query = ';
    acu_misc.zip= '<zip>'; //Used to specify the zip
    acu_misc.score='<credit score>'; //Used to specify the credit score/rating
        </script>
```

## Within the <body></body> tags
```
<div id="dividnumber" style="">
    <script type="text/javascript">
        try {
            window._mNHandle.queue.push(function () {
                window._mNDetails.loadTag("613443177", "800x600", "613443177");
            });
        }
        catch (error) {
        }
    </script>
</div>
```

Add the class “lbh” to all links that need to implement the functionality.
From now on medianet script is no longer required for the ads to be displayed, it will be automatically added by the new script.




#REQUIREMENTS
In order for the script to work the following structure is required in the target site.
```
<html>
<head></head>
<body>
*<header></header>
*<section></section><section></section>
*<div></div><div></div>
*<footer></footer><footer></footer>
</body>
*<footer></footer>
</html>
```
