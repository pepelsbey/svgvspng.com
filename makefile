default:
	@echo 'Uploading…'
	@rsync --archive --compress --delete --exclude=.DS_Store src/ pepelsbey@svgvspng.com:/var/www/svgvspng.com/html/
	@echo 'Done.'
