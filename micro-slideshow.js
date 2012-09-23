Slideshow = function(containerSelector) {
    this.containerSelector = '.slideshow';
};

Slideshow.prototype.init = function() {
    this.container = document.querySelectorAll(this.containerSelector)[0];
    this.slides = Array.prototype.slice.call(
        document.querySelectorAll(this.containerSelector + ' > .slide')
    );
    this.current = 0;
    Slideshow.addCSS();
    this.setContainerHeight();
    this.addButtons();
    this.goToCurrent();
};

Slideshow.prototype.goTo = function( /* Node */ elem) {
    this.slides.forEach(function(slide) {
        slide.classList.remove('visible');
    });
    elem.classList.add('visible');
};

Slideshow.prototype.goToCurrent = function() {
    this.goTo(this.slides[this.current]);
};

Slideshow.prototype.next = function( /* Node */ elem) {
    this.current = this.current == this.slides.length - 1 ? 0 :  ++this.current;
    this.goToCurrent();
};

Slideshow.prototype.previous = function( /* Node */ elem) {
    this.current = this.current == 0 ? this.slides.length - 1 : --this.current;
    this.goToCurrent();
};

Slideshow.prototype.addButtons = function() {
    var out, p, n;

    // create previous node 
    p = document.createElement('a');
    p.className = 'previous';
    p.href = '#previous';
    p.innerHTML = 'Previous';
    p.addEventListener('click', this.previous.bind(this), false);
    // create next element 
    n = document.createElement('a');
    n.className = 'next';
    n.href = '#next';
    n.innerHTML = 'Next';
    n.addEventListener('click', this.next.bind(this), false);
    // create return node
    out = document.createElement('div');
    out.className = 'slideshow-nav';
    out.appendChild(p);
    out.appendChild(n);
    this.container.appendChild(out);
};

Slideshow.prototype.setContainerHeight = function() {
    var h = 0;
    this.slides.forEach(function(slide) {
        h = h > slide.offsetHeight ? h : slide.offsetHeight; 
    });
    this.container.style.height = h + 'px';
}

Slideshow.addCSS = function() {
    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML =
        '.slideshow { position:relative; background-color: #000;}' +
        '.slide { position:absolute; opacity:0; transition:opacity 0.7s linear;-webkit-transition:opacity 0.7s linear;-moz-transition:opacity 0.7s linear;}' +
        '.slide.visible { opacity:1; }' +
        '.slideshow-nav { position:absolute; }';
     document.body.appendChild(css);
};

window.onload = function() {
    s = new Slideshow('.slideshow');
    s.init();
};

Array.filter = function filter(array, test) {
    return Array.prototype.filter.call(array, test);
};
Array.forEach = function foreach(array, test) {
    return Array.prototype.forEach.call(array, test);
};
Array.indexOf = function indexof(array, test) {
    return Array.prototype.indexOf.call(array, test);
};
