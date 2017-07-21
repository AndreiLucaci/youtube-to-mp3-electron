let $ = require("jquery");
let https = require("https");

$("[data-action='search']").on("click", function(ev, el){
    var url = $("[data-role='search-box']").val();

    const loader = $("#loader");
    loader.show();

    https.get(url, (res) => {
        const { statusCode } = res;

        let error;
        if (statusCode !== 200){
            error = new Error("Request failed. "+`Status Code: ${statusCode}.`);
            console.error(error.message);

            res.resume();
            return;
        }

        let rawData = "";
        res.on("data", chunk => {rawData += chunk;});
        res.on("end", () => {
            loader.hide();
            console.log(rawData);
            $("#contentarea").val(rawData);
            $("#video-content").attr("src", url);
        });

    }).on("error", e => {
	    console.error(`Got error: ${e.message}`);
    });
});