export const slugify = (text: string): string => {
	if (!text) return '';

	return text
		.toLowerCase()
		.replace(/%/g, '-percent') // Replace % with "percent"
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/[^\w-]+/g, '') // Remove non-alphanumeric characters (except hyphens)
		.replace(/--+/g, '-') // Collapse multiple hyphens
		.replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
};
