exports.parse = url => {
	const match = urlRegex.exec(url);
	const [, protocol, subdomain, domain, path, id, qs] = match;
	const result = {
		protocol,
		subdomain,
		domain,
		path,
		id,
		qs,
		valid: () => {
			return !!this.id;
		}
	};

	return result;
}

let urlRegex =
	/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/g;
