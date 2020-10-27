const perform = require('./performRequest.js')
const {username, password} = require('../../config.json')
const fs = require('fs')
const path = require('path')


/*Purpose:
    -Read an array of links from string, turn links into JSON with following format:
    -Filename : linksObj.json
        [
            {
                url: <url>,
                selection: <url>
            }
        ]
    read the JSON and for each Article make an HTTPS POST request to add the content, using query params
    return status code on each article, then create 2 JSON files:
        <Failed - Todays Date> : POST requests that failed
        <Passed - Todays Date> : POST requests that passed
    Both files will have the following JSON Format:
        [
            url: <url>,
            selection: <url>,
            status: <status code>
        ]
*/

//Create an input listener for a line of links, create an array of strings with that input
const addArticles = function () {
    let linksSTR = `g2g.to/QBfZ
    twtr.to/JmNT`
    let links = linksSTR.split("\n    ")
    let linkObj = {}
    let linksArr = []

    // Take an array of links, turn links into JSON
    links.forEach(url => {
        linkObj = {
            url: url,
            selection: url
        }
        linksArr.push(linkObj)
    });

    console.log(linksArr)

    
    //Write JSON file links.json
    //TODO why am i doing this again? just grab from linksObj
    /*fs.writeFile(path.resolve(__dirname, "../json/Links.json"), JSON.stringify(linksFile, null, 2), (err) => {
        if (err) throw err;
        console.log('Links.json created')
    })*/

    //HTTP POST REQ
    linksArr.forEach(async (obj) => {
       
        await perform.getData(`https://www.instapaper.com/api/add?username=${username}&password=${password}&url=${obj.url}&selection=${obj.selection}`, {})
        .then(data => {
            //TODO logs feature from status codes
            console.log(data) //Usually a status code, could be a callback 
        });
        
    });

    
}

module.exports = {
    addArticles
}



/*fs.readFile(path.resolve(__dirname, "../json/students.json"), (err, data) => {
    if (err) throw err;
    var count = 0
    let students = JSON.parse(data);
    students.forEach(student => {
        count = count + 1 
        console.log(student)
        console.log(`there are ${count} students`)
    });
});*/

