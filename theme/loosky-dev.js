// scrollto
(function(h){h.browser=h.extend({chrome:(/chrome/i).test(navigator.userAgent)},h.browser);var m=h.scrollTo=function(b,c,g){h(window).scrollTo(b,c,g)};m.defaults={axis:'y',duration:1};m.window=function(b){return h(window).scrollable()};h.fn.scrollable=function(){return this.map(function(){var b=this.parentWindow||this.defaultView,c=this.nodeName=='#document'?b.frameElement||b:this,g=c.contentDocument||(c.contentWindow||c).document,i=c.setInterval;return c.nodeName=='IFRAME'||i&&(h.browser.safari||h.browser.chrome)?g.body:i?(g.compatMode&&g.compatMode!=="BackCompat"?g.documentElement:g.body):this})};h.fn.scrollTo=function(r,j,a){if(typeof j=='object'){a=j;j=0}if(typeof a=='function')a={onAfter:a};a=h.extend({},m.defaults,a);j=j||a.speed||a.duration;a.queue=a.queue&&a.axis.length>1;if(a.queue)j/=2;a.offset=n(a.offset);a.over=n(a.over);return this.scrollable().each(function(){var k=this,o=h(k),d=r,l,e={},p=o.is('html,body');switch(typeof d){case'number':case'string':if(/^([+-]=)?\d+(px)?$/.test(d)){d=n(d);break}d=h(d,this);case'object':if(d.is||d.style)l=(d=h(d)).offset()}h.each(a.axis.split(''),function(b,c){var g=c=='x'?'Left':'Top',i=g.toLowerCase(),f='scroll'+g,s=k[f],t=c=='x'?'Width':'Height',v=t.toLowerCase();if(l){e[f]=l[i]+(p?0:s-o.offset()[i]);if(a.margin){e[f]-=parseInt(d.css('margin'+g))||0;e[f]-=parseInt(d.css('border'+g+'Width'))||0}e[f]+=a.offset[i]||0;if(a.over[i])e[f]+=d[v]()*a.over[i]}else e[f]=d[i];if(/^\d+$/.test(e[f]))e[f]=e[f]<=0?0:Math.min(e[f],u(t));if(!b&&a.queue){if(s!=e[f])q(a.onAfterFirst);delete e[f]}});q(a.onAfter);function q(b){o.animate(e,j,a.easing,b&&function(){b.call(this,r,a)})};function u(b){var c='scroll'+b,g=k.ownerDocument;return p?Math.max(g.documentElement[c],g.body[c]):k[c]}}).end()};function n(b){return typeof b=='object'?b:{top:b,left:b}}})(jQuery);

jQuery(document).ready(function($){ 
$body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');// 这行是 Opera 的补丁, 少了它 Opera 是直接用跳的而且画面闪烁

//滑动效果
jQuery('a[href!="#"][href^="#"]').click(function () {
      jQuery.scrollTo(this.href.replace(/^.*#/g, '#'), 400);
      return false
});

//在新窗口打开外部链接(http://www.jeff.asia/library/1942/)
$("a[href*='http://']:not([href*='"+location.hostname+"']),[href*='https://']:not([href*='"+location.hostname+"'])")
.addClass("external")
.attr("target","_blank");

//回到顶部
GoTop = function() {
    this.config = {
        pageWidth: 960,
        nodeId: 'go-top',
        nodeWidth: 70,
        distanceToBottom: 120,
        hideRegionHeight: 90,
        topPosition: 0
    };
    this.cache = {
        topLinkThread: null
    }
};
GoTop.prototype = {
    init: function(config) {
        this.config = config || this.config;
        var _self = this;
        jQuery(window).scroll(function() {
            _self._scrollScreen({
                _self: _self
            })
        });
        jQuery(window).resize(function() {
            _self._resizeWindow({
                _self: _self
            })
        });
        _self._insertNode({
            _self: _self
        })
    },
    _insertNode: function(args) {
        var _self = args._self;
        var topLink = jQuery('<a id="' + _self.config.nodeId + '" href="#"></a>');
        topLink.appendTo(jQuery('body')).click(function() {
            jQuery.scrollTo({
                top: _self.config.topPosition
            },
            400);
            return false
        });
        var right = _self._getDistanceToBottom({
            _self: _self
        });
        if (/MSIE 6/i.test(navigator.userAgent)) {
            topLink.css({
                'display': 'none',
                'position': 'absolute',
                'right': right + 'px'
            })
        } else {
            topLink.css({
                'display': 'none',
                'position': 'fixed',
                'right': right + 'px',
                'top': (jQuery(window).height() - _self.config.distanceToBottom) + 'px'
            })
        }
    },
    _scrollScreen: function(args) {
        var _self = args._self;
        var topLink = jQuery('#' + _self.config.nodeId);
        if (jQuery(document).scrollTop() <= _self.config.hideRegionHeight) {
            clearTimeout(_self.cache.topLinkThread);
            topLink.hide();
            return
        }
        if (/MSIE 6/i.test(navigator.userAgent)) {
            clearTimeout(_self.cache.topLinkThread);
            topLink.hide();
            _self.cache.topLinkThread = setTimeout(function() {
                var top = jQuery(document).scrollTop() + jQuery(window).height() - _self.config.distanceToBottom;
                topLink.css({
                    'top': top + 'px'
                }).fadeIn()
            },
            400)
        } else {
            topLink.fadeIn()
        }
    },
    _resizeWindow: function(args) {
        var _self = args._self;
        var topLink = jQuery('#' + _self.config.nodeId);
        var right = _self._getDistanceToBottom({
            _self: _self
        });
        var top = jQuery(window).height() - _self.config.distanceToBottom;
        if (/MSIE 6/i.test(navigator.userAgent)) {
            top += jQuery(document).scrollTop()
        }
        topLink.css({
            'right': right + 'px',
            'top': top + 'px'
        })
    },
    _getDistanceToBottom: function(args) {
        var _self = args._self;
        var right = parseInt((jQuery(window).width() - _self.config.pageWidth) / 2 - _self.config.nodeWidth, 10);
        if (right < 10) {
            right = 10
        }
        return right
    }
};

(new GoTop()).init({
		pageWidth: 980,
		nodeId: 'go-top',
		nodeWidth: 70,
		distanceToBottom: 125,
		hideRegionHeight: 90,
		topPosition: 0
})

})();
