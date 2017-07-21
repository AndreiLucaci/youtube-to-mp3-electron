exports.parse = (url) => {
	const match = urlRegex.exec(url);
	try {
		const [, protocol, subdomain, domain, path, id, qs] = match;
		const result = {
			protocol,
			subdomain,
			domain,
			path,
			id,
			qs,
			valid: function() {
				return !!this.id;
			}
		};
		return result;
	} catch (e) {
		return {
			valid: () => false
		};
	}
};

let urlRegex =
	/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g;
