(function() {
	
	// Describe the Create Arcade Character function
	// One argument: n (amount of columns)
	function createArcadeCharacter(n, cw, ch) {
		var container = document.querySelector('.arcade');
        container.style.height = n*ch + 'px';
        container.style.width = n*cw + 'px';
        
		var tempStr = '', l = 0, t = 0, p = 1, pattern = generateRandomArcadeCharacterPattern(n);
		for(var i = 0;i < n * n;i++) {
			tempStr += '<div class="bit';
			p = pattern.charAt(i);
			if(p == 1) {
				tempStr += ' bit--active';
			}			
			tempStr += '"';
			tempStr += ' style="';
			tempStr += 'width:' + cw + 'px;';
			tempStr += 'height:' + ch + 'px;';
			tempStr += 'left:' + l + 'px;';
			tempStr += 'top:' + t + 'px;';
			tempStr += '">';
			tempStr += '</div>';	
			
			if((i > 0) && ((i + 1) % n == 0)) {
				l += cw;
				t = 0;
			} else {
				t += ch;
			}
			
		}	
		container.innerHTML = tempStr;
	}
	
	function generateRandomArcadeCharacterPattern(n) {
		var patternStr = '', reflectionPatternStr = '';
		var patternLength = Math.ceil(n / 2);
		for(var i = 0;i < n * patternLength;i++) {
			patternStr += Math.round(Math.random());
		}
		for(var i=0;i<(patternLength - 1);i++) {
			reflectionPatternStr = patternStr.substring((i*n), (i*n)+n) + reflectionPatternStr;
		}
		return patternStr + reflectionPatternStr;
	}
	
	updateAvatar();
	
	function updateAvatar() {
		createArcadeCharacter(11, 20, 20);// Callback function createArcadeCharacter with certain amount
		window.setTimeout(function(){updateAvatar();}, 1268);
	}
	
})();