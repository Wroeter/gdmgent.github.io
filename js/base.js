(function() {
    
	var toggleOpen = document.querySelector('.nav-toggle--open');
	if(toggleOpen) {
		toggleOpen.addEventListener('click', function(ev) {
			ev.preventDefault();
			document.querySelector('body').classList.toggle('js__nav-is-open');
			return false;
		});
	}
	
	var toggleClose = document.querySelector('.nav-toggle--close');
	if(toggleClose) {
		toggleClose.addEventListener('click', function(ev) {
			ev.preventDefault();
			document.querySelector('body').classList.remove('js__nav-is-open');
			return false;
		});
	}
	
})();