publish:
	@echo 'Uploading files…'
	@rsync -az .htaccess de.svg en.svg ru.svg index.html pepelsbey@pepelsbey.net:svgvspng.com/
	@echo 'Done.'
