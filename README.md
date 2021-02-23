
# DESCRIPTION
Replace the default behaviour of all links in a site marked with a specific css class.
The behaviour: The links will open their href address in a new tab while in the contents will load adsmedia.net script in the current existing page using the given tracklink url used in the script settings.


# INSTRUCTIONS
1. Place the following lines within the <head></head> tags of the site 
```
<script src="https://domain.com/leavebehind/dist/leavebehind.min.js" crossorigin="anonymous"></script>
<script type="text/javascript">
lbh.load({tracklink:"https://financejournal.club/view/nGAFW7l4ZoyXsULpihQsULpnFPdoNDBjJ7kpOkrW7xOsITHHY?c=36380&tid="});
</script>
```

2. Add the class “lbh” to all links that need to implement the functionality.

# DEV

1. public folder is /dist
2. npm-install && grunt will generate dist/leavebehind.min.js


# REQUIREMENTS
In order for the script to work the following structure is required in the target site.
```
<html>
    <head>    </head>
    <body>
        *<header></header>
        *<section></section><section></section>
        *<div></div><div></div>
        *<footer></footer><footer></footer>
    </body>
    *<footer></footer>
</html>
```
```*``` are optional html tags that will be hidden
