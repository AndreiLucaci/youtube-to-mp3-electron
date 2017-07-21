let https = require("https");

exports.get = function (url, resolve) {
	return https.get(url,
		(res) => {
			const { statusCode } = res;
			if (statusCode !== 200) {
				const error = new Error(`Request failed. ${`Status Code: ${statusCode}.`}`);
				alert(error.message);
				res.resume();
				return;
			}

			let rawData = "";
			res.on("data", chunk => {
				rawData += chunk;
			});

			res.on("end", () => { resolve(rawData); });
		}
	);
}