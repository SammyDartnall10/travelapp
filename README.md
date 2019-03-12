<h1>Vojaĝado</h1>

<h2>Final site address</h2>
https://sammydartnall10.github.io/travelapp/

<h2>About this page</h2>
<h3>Vojaĝado - an app to help inspire travel destination ideas</h3>

Vojaĝado translates to simply 'travel' in Esparanto, and is a simple, easy to use app that suggests new travel destinations based on raw data, facts and figures, rather then commercial promotion.
The Esparanto langauge itsef is an auxillary universal second languge created to foster peace and international understanding.  

This site calls on the Google Maps API, Places API, Google Geocoder API and Nearby Places search to allow users to search for their next holiday destination. The app helps users:
Select a destination city
Find tourist attractions
Find accommodation
Find bars and restaurants

It then provids search results in a manner that is visually appealing.

As a single page site the funcitonality of the app is revealed in stages - the user is prompted to make selections and then submit them. The user is taken to each new step of the process without need for their intervention.  

Bootstrap has been used to structure the page, and elements such as buttons and centering functionalty has been employed from the bootstrap library to give a consistent look and feel. 
This has then been styled using my own CSS to change font, colour and behaviour of some elements. 

<h2>UX</h2>
This site is aimed at people who are looking for new ideas and inspiration for their next trip. 
It is aimed at those who are looking to go somewhere perhaps a bit different to your ususal "top 10 places to go this summer". It is based,
therefore, on three objective data sets available on the web. 

After answering three simple questions, the site returns a range of city suggestions to the user, displayed on a Google maps. 
The user can then select a destination and look at the bars, restaurants, places to stay and things to see in the area. 

Wireframes.... mockups 

Use this section to provide insight into your UX process, focusing on who this website is for, what it is that 
they want to achieve and how your project is the best way to help them achieve these things.

In particular, as part of this section we recommend that you provide a list of User Stories, with the following general structure:

As a user type, I want to perform an action, so that I can achieve a goal.

This section is also where you would share links to any wireframes, mockups, diagrams etc. 
that you created as part of the design process. These files should themselves either be included in the project itself 
(in an separate directory), or just hosted elsewhere online and can be in any format that is viewable inside the browser. 



<h2>Features</h2>
The website has a number of deployed features, but also a few that may be implemented at a later date. 

<h3>Existing Features</h3>
 Categorisation of cities based on three factors 
* Cost of living 
* Average temperature 
* Development of tourism industry

Resources for each of these are as follows: 
* Cost of living (https://www.numbeo.com/cost-of-living/rankings_by_country.jsp?title=2018)
* Average temperature (https://en.wikipedia.org/wiki/List_of_countries_by_average_yearly_temperature)
* Development of tourism industry (http://www.adventureindex.travel/downloads.htm)

The site uses the Google Geocoder to find the latitude and longitutde of a city, passed through as a string. 
This makes the site easy to maintian, update and grow. As new data is available the city names and their corresponding 
values can be collated in a program such as excel, and converted to JSON data. 
In this way, values can be edited, and the database itself extended to add more destinations.

<h3>Features Left to Implement</h3>

A link to a site such as booking.com, tripadvisor etc could be implemented at the end of the site. 

To make the cost feature more useful, could add in the users location at the start of the site, and add in
distance from current location factor to calculate the cost of getting to that city. 

<h2>Technologies Used</h2>

A combination of HTML5 has been used to provide the basic structre to the site.

For site styling and stucture, the Bootstraplibrary has been employed across the site. 
Bootstrap documentation can be found here: https://getbootstrap.com/docs/4.1/getting-started/introduction/

In addition to bootstrap, custom styling has been added with CSS, and can be found in the assets/style.css file. 

The Javascript library JQuery has been used to enable functionality such as the 'on click' events, and 
reduce the amount of code needed in the main.js file.

The Google places library is used to enable the Maps, Geocoder and Nearby Searches features of the site. 

My own javascript sits alongside this, and pulls together the output and input required from one API to the other.

<h2>Testing </h2>

For this project, testing was carried out manually, both in the browser and with Google developer tools to test different screen sizes.

HTML was validated using the Markup Validation Service provided by The World Wide Web Consortium (W3C): https://validator.w3.org/

CSS was validated using the CSS Validation Service provided by The World Wide Web Consortium (W3C): https://jigsaw.w3.org/css-validator/

To make sure each combination of options returned city results, manual testing of each of the combinations was undertaken. 

This highlighted two previously unnoticed errors -
1. In some cases, the amount was too much for the Google API - resulting in the error "Quota limit exceeded"
2. Combinations with the cost option medium did not return any results. It was not until looking closely at the raw data that the reason for this was shown - in the data the option is "medium", however in the javascript formula/code the option was spelt "med". 

Results matrix was as follows: 
<img src="assets/readme/options-results.png">

After fixing the above issues, all options returned results. 

Also Jasmine Testing? 

UX was tested through having possible users try the site and 
see if they could get to the end goal of a series of city, and corresponding bars/hotels etc options.

UI functionality was tested in all available browsers as follows: 

<img src="assets/readme/elements-check.png">
<img src="assets/readme/layout-check.png">


<h2>Deployment</h2>
GitHub has been used throughout this project to maintain version control as feature are added. After adding a new feature, the code is pushed to GitHub. 

The site has also been deployed using GitHub pages - this is simply a process of in settings for the project, setting source to master branch under GitHub pages and saving the changes. The resulting link can then be used to access the page. 

Final deployed site is here: https://sammydartnall10.github.io/travelapp/

<h2>Credits</h2>

<h3>Content</h3>
As mentioned above, data is available from these sources: 

* Cost of living (https://www.numbeo.com/cost-of-living/rankings_by_country.jsp?title=2018)
* Average temperature (https://en.wikipedia.org/wiki/List_of_countries_by_average_yearly_temperature)
* Development of tourism industry (http://www.adventureindex.travel/downloads.htm)


<h3>Media</h3>
Background image from shutterstock and edited myself with photoshop. 

<h2>Acknowledgements</h2>
General credit and thanks to tutors and the student community of Code Institute, 
helping me to unpick probelms as they arose, and build understanding.

Credit also specifically to my mentor, who not only helped me fix problems and explain 
concepts, but also with: 
*narrowing down the intial concept to an acheivable scope
*explaining async functions, and how to manage output from them 