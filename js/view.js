let $ = require("jquery");
let https = require("https");
let urlParser = require("./youtube_url_parser");

$("[data-action='search']").on("click", function () {
	try {
		const url = $("[data-role='search-box']").val();
		const result = urlParser.parse(url);

		debugger;

		if (!result.valid()) {
			alert("Invalid YouTube url");
			return;
		}

		const loader = $("#loader");
		loader.show();

		https.get(url,
			(res) => {
				const { statusCode } = res;
				if (statusCode !== 200) {
					const error = new Error("Request failed. " + `Status Code: ${statusCode}.`);
					console.error(error.message);

					res.resume();
					return;
				}

				let rawData = "";
				res.on("data", chunk => { rawData += chunk; });
				res.on("end",
					() => {
						loader.hide();
						console.log(rawData);
						$("#contentarea").val(rawData);
						$("#videoiframe").attr("src", url);
					});

			}).on("error",
			e => {
				console.error(`Got error: ${e.message}`);
			});
	} catch (ex) {
		alert(ex.message);
	}
});