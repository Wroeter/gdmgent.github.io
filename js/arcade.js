var Arcade = {
    init:function(container, n, cw, ch) {
        this._container = container;
        this._n = n;
        this._cw = cw;
        this._ch = ch;
        
        this.update();
    },
    resetCharacter: function(n, cw, ch) {
        this._n = n;
        this._cw = cw;
        this._ch = ch;
    },
    generateRandomArcadeCharacterPattern: function() {
		var patternStr = '', reflectionPatternStr = '';
		var patternLength = Math.ceil(this._n / 2);
		for(var i = 0;i < this._n * patternLength;i++) {
			patternStr += Math.round(Math.random());
		}
		for(var i=0;i<(patternLength - 1);i++) {
			reflectionPatternStr = patternStr.substring((i*this._n), (i*this._n)+this._n) + reflectionPatternStr;
		}
		return patternStr + reflectionPatternStr;
	},
    createArcadeCharacter: function() {
        this._container.style.height = this._n*this._ch + 'px';
        this._container.style.width = this._n*this._cw + 'px';
        
		var tempStr = '', l = 0, t = 0, p = 1, pattern = this.generateRandomArcadeCharacterPattern();
		for(var i = 0;i < this._n * this._n;i++) {
			tempStr += '<div class="bit';
			p = pattern.charAt(i);
			if(p == 1) {
				tempStr += ' bit--active';
			}			
			tempStr += '"';
			tempStr += ' style="';
			tempStr += 'width:' + this._cw + 'px;';
			tempStr += 'height:' + this._ch + 'px;';
			tempStr += 'left:' + l + 'px;';
			tempStr += 'top:' + t + 'px;';
			tempStr += '">';
			tempStr += '</div>';	
			
			if((i > 0) && ((i + 1) % this._n == 0)) {
				l += this._cw;
				t = 0;
			} else {
				t += this._ch;
			}
			
		}	
		this._container.innerHTML = tempStr;
    },
    update: function() {
        var self = this;
        
        this.createArcadeCharacter();
		window.setTimeout(function(){self.update();}, 1268);
    }
};