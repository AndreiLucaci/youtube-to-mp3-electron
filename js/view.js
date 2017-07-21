let $ = require("jquery");
let viewActions = require("./js/view_actions");
let urlParser = require("./js/youtube_url_parser");

$("[data-action='search']").on("click", function(ev, el) {
	const url = $("[data-role='search-box']").val();
	const result = urlParser.parse(url);

	if (!result.valid()) {
		alert("Invalid YouTube url");
		return;
	}

	const loader = $("#loader");
	loader.show();

	viewActions.get(url,
		(rawData) => {
			loader.hide();
			$("#contentarea").val(rawData);
			$("#videoiframe").attr("src", `https://www.youtube.com/embed/${result.id}`);
		}).on("error", (err) => {
			alert(err.message);
		});
});