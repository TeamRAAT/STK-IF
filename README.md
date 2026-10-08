# STK IF DEMO WEBSITE

## AUTHORS

Team RAAT: 
Adam Aref, Anette Essel, Taiane Farias & Rubiya Jaffer @ Hyper Island

Thank you to STK IF for their feedback and contributions!

## PROJECT STATUS

This is the demo version of the website and doesn’t include any JavaScript features that are required for some features such as forms.

## USAGE

Each page has separate .html files that store the page content (text, images, etc.) and .css files which store the style (fonts, colors, etc.) of the page. For example, the about page content is stored in `about.html` while its style is stored in `about-styles.css` in the css folder. Site wide styles for elements such as the header and the footer are stored in `shared-styles.css`. 

If changing the html of the header and the footer, you must do so separately in each html file.

Both the html and css files have comments that indicate when code for specific sections start. Within html comments look like this. 
```
<!-- Header -->
```
While in css comments look like this.
```
/* Gallery page */
```

Images are stored in the “images” folder. If you are adding an image to a file that is within the project parent folder that stores the image folder (e.g. all the html files) you can link images by writing its path like below:
`"images/Venjanam-traditioanl-foods.jpg"`
However, if you are adding an image to a file that is within a subfolder of the parent folder (e.g. the css folder) you can link images by writing its path like below:
`"..images/Venjanam-traditioanl-foods.jpg"`

Fonts are in the fonts folder and can be installed through shared-files.css. For example:
```
@font-face {
    font-family: 'Montserrat';
    src: url("../fonts/Montserrat-VariableFont_wght.ttf");
    font-style: normal;
}
```

## SUPPORT
If you have any questions you can contact the authors by email. For each author the email is firstname.lastname@hyperisland.se

