publish:
	@echo 'Uploading files…'
	@rsync -az de.svg en.svg ru.svg index.html pepelsbey@46.101.148.11:/var/www/svgvspng.com/html/
	@echo 'Done.'
