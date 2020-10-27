




Purpose:
    -Create an input listener for a line of links, create an array of strings with that input
    -Take an array of links, turn links into JSON with following format:
    -Filename : links.json
        [
            {
                url: <url>,
                selection: <url>
            }
        ]
    TODO read the JSON and for each Article make an HTTPS POST request to add the content, using query params
    TODO return status code on each article, then create 2 JSON files:
        <Failed - Todays Date> : POST requests that failed
        <Passed - Todays Date> : POST requests that passed
    Both files will have the following JSON Format:
        [
            url: <url>,
            selection: <url>,
            status: <status code>
        ]