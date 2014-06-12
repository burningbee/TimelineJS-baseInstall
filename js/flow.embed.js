/**
 * flowembed 0.11. Flowplayer embedding script
 *
 * http://flowplayer.org/tools/flow-embed.html
 *
 * Copyright (c) 2008 Tero Piirainen (tero@flowplayer.org)
 *
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * >> Basically you can do anything you want but leave this header as is <<
 *
 * Version: 0.10 - 05/19/2008
 */
(function($) {

	// jQuery plugin initialization
	$.fn.extend({
		flowembed: function(params, config, opts) {
			return this.each(function() {
				new flowembed($(this), params, config, opts);
			});
		}
	});


	function flowembed(root, params, config, embedOpts) {

		var opts = {
			oneInstance: true,
			activeClass: 'playing',
			overlayClass: 'playButton',
			fallback: null
		};

		$.extend(opts, embedOpts);
		var player = null;
		config = config || {};
		if (typeof params == 'string') params = {src:params};

		root.click(function(event) {

			// disable default behaviour
			event.preventDefault();

			if (root.find("embed, object").length) return false;

			// if oneInstance = true, resume previously playing video
			if (opts.oneInstance) onClipDone();

			// save nested HTML content for resuming purposes
			root.addClass(opts.activeClass).data("html", root.html());

			// build flowplayer with videoFile supplied in href- attribute
			var href = root.attr("href");
			config.videoFile = href;
			//config.url = href;

			// possible fallback
			if (opts.fallback && !flashembed.isSupported([9,115])) {
				config.videoFile = href.substring(0, href.lastIndexOf(".") + 1) + opts.fallback;
				//config.url = href.substring(0, href.lastIndexOf(".") + 1) + opts.fallback;
			}

      // the following two config... lines make the correct videos play in their target frames
      config.playlist[1].url=config.videoFile; //sukjin
      config.playlist[0].url=root.context.firstChild.src; //sukjin
      player = flashembed(this, params, {config:config});

		});

		// create play button on top of splash image
		if ( root[0].outerHTML.match("playButton") == null) //sukjin, 2013,0710
			root.append($("<div/>").addClass(opts.overlayClass));


		/*
			this function is called by Flowplayer when playback finishes.
			it makes currently playing video to oneInstance it's original
			HTML stage.
		*/
		if (opts.oneInstance && !$.isFunction("onClipDone")) {
			window.onClipDone = function() {
				$("." + opts.activeClass).each(function() {
					$(this).html($(this).data("html")).removeClass(opts.activeClass);
				});
			};
		}
	}

})(jQuery);

$(function() {			$("a.flowplayer").flowembed("http://129.89.24.131/ui/cdm/default/collection/default/viewers/videoViewer/flowplayer_3.2.11/flowplayer.unlimited.swf",  {initialScale:"scale",'key':'1481dfae45442213d2e','playerId':'cdm_vplayer1_flash','playlist':[{'url':$("a.flowplayer:last img").attr("src")},{'url':$("a.flowplayer:last").attr("href"),'autoPlay':true,'autoBuffering':true}]});				});









