//define function
//enter search term return recipes and/or
//select diet return filtered list of recipes and/or
//select allergy return filtered list of recipes

// STEP 1 - get the input from the user
$("#search-form").submit(function (event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    //get the value from the input box
    var ingredient = $("#ingredient").val();
    var dietName = $("#dietName").val();
    var allergyName = $("#allergyName").val();
    console.log(ingredient, dietName, allergyName);
    //use that value to call the getResults function defined bellow
    getYummlySearchData(ingredient, dietName, allergyName);
});

function getYummlySearchData(keyword, diet, allergy) {
    //var yummly_base_URL = "http://api.yummly.com/v1/api/recipes?_app_id=350000fd&_app_key=a7c7b74ce0a5f35e6e9fcca1e0f49325&q=" + keyword + "&allowedDiet[]=" + diet + "&allowedAllergy[]=" + allergy + "&requirePictures=true&maxResult=12";

    var yummly_base_URL = "http://api.yummly.com/v1/api/recipes?_app_id=350000fd&_app_key=a7c7b74ce0a5f35e6e9fcca1e0f49325";

    if (keyword != "") {
        yummly_base_URL += "&q=" + keyword;
    }
    if (diet != "choose") {
        yummly_base_URL += "&allowedDiet[]=" + diet;
    }
    if (allergy != "choose") {
        yummly_base_URL += "&allowedAllergy[]=" + allergy;
    }
    yummly_base_URL += "&requirePictures=true&maxResult=12";

    console.log(yummly_base_URL);
    var result = $.ajax({
            /* update API end point */
            url: yummly_base_URL,
            dataType: "jsonp",
            /*set the call type GET / POST*/
            type: "GET"
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            //            console.log(result);
            //            console.log(result.matches[0].smallImageUrls[0]);
            //            console.log(result.matches[0].recipeName);
            //            console.log((result.matches[0].totalTimeInSeconds / 60) + " minutes");
            //            console.log(result.matches[0].rating + "*");

            displayYummlySearchData(result.matches);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}


function displayYummlySearchData(dataMatches) {
    //create an empty variable to store one LI for each one the results
    var buildTheHtmlOutput = "<ul class='recipe-details'>";

    $.each(dataMatches, function (dataMatchesKey, dataMatchesValue) {
        //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
        buildTheHtmlOutput += '<li>';
        buildTheHtmlOutput += '<div class="recipe-image" style="background-image: url(' + dataMatchesValue.smallImageUrls + ')"></div>';
        buildTheHtmlOutput += '<div class="recipe-description">';
        buildTheHtmlOutput += '<h4><a target="_blank" href=https://www.yummly.com/recipe/' + dataMatchesValue.id + ' >' + dataMatchesValue.recipeName + '</a></h4>';
        buildTheHtmlOutput += '<p>Cooking time: ' + (dataMatchesValue.totalTimeInSeconds / 60) + ' minutes</p>';
        buildTheHtmlOutput += '<p>Rating: ' + dataMatchesValue.rating + '*</p>';
        buildTheHtmlOutput += '</div>';
        buildTheHtmlOutput += '</li>';
    });

    buildTheHtmlOutput += "</ul>";

    //use the HTML output to show it in the index.html
    $(".display-results").html(buildTheHtmlOutput);
}







//use functions
$(document).ready(function () {

})

//on click on #searchButton filter results and display them
