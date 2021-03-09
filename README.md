
# DESCRIPTION
The purpose of the following script is to replace the default behaviour of all links in a site marked with a specific css class.
.The links will open their href address in a new tab while in the contents will load adsmedia.net script in the current existing page using the given tracklink url used in the script settings.


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
2. npm-install && grunt will generate dist/leavebehind.js
3. grunt watch will watch for changes and update the code when needed.
4. grunt min will mnify the script


# NOTES
1. The script also forwards any parameters in the current URL to the leavebehind on reload and to the tracklink URL. So that ads can be tracked.
2. The parameters being forwarded are:  chnm, chnm2 and chnm3. The ad page will take care of replacing in the script the parameters. (note that admedia.net script also has a solution to import parameters for the script directly from the url. thoug  with our implementation of the script that is not needed)

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

# CONDITIONS

Maverick Media provides this script sample for free, without accounting itself responsbile for the correct 

# LICENSE
MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
