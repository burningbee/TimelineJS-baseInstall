
  $(document).ready(function(){
    if($("#cdm_updatedvideo").val() == "updated" ){
      cdm.util.ConsoleLogger("updated...");
      //$.getScript($("#cdm_audio_scripturl").val());
      cdm.util.ConsoleLogger("no no no native support");
      $.getScript( $("#cdm_video_scripturl").val(), function() {
        cdm_videoFallback($("#cdm_viewer_path").val(),$("#cdm_video_url").val());
      });
    }

    var oldIEVersion = false;
    if($.browser.msie && $.browser.version < 9){
      oldIEVersion = true;
    }
    if($('#details').exists() ){
      $('#details').show();
    }
    if($('#img_view_text_container').exists() ){
      $('#img_view_text_container').show();
    }
    if($('#co-tabs').exists() ){
      $('#co-tabs').show();
    }

          // && !$.browser.webkit
          if (document.createElement('video').canPlayType && !oldIEVersion && $("#html5_video_enabled").val() == "on"  ) {
            var videoElem = document.createElement('video');
            var canPlayFile = videoElem.canPlayType($("#file_mimetype").val());
            if (canPlayFile == "probably" || canPlayFile == "maybe" ) {
              cdm.util.ConsoleLogger("can play " + $("#file_mimetype").val());
              cdm_showHTML5Video();
              cdm.util.ConsoleLogger('Player Type: HTML5');
              $("#html5_wrapper").show();
            } else {
              cdm_videoFallback($("#cdm_viewer_path").val(),$("#cdm_video_url").val());
              cdm.util.ConsoleLogger("can create element but canPlayFile is: " + canPlayFile);
            }
          } else {
            cdm.util.ConsoleLogger("no native support");
            cdm_videoFallback($("#cdm_viewer_path").val(),$("#cdm_video_url").val());
          }
  });

function cdm_videoFallback(abspath,videourl){
  if($("#file_mimetype").val() == "video/ogg" || $("#file_mimetype").val() == "video/unsupported"){
    //will not play in flash
    cdm.api.SingleItem.noMediaSupport();
  } else {
    $("#cdm_media_loading").remove();
    $("#html5_wrapper").remove();
    $("#flash_wrapper").show();
    cdm.util.ConsoleLogger('Player Type: Flash');

     flowplayer("cdm_vplayer1_flash", abspath + "viewers/videoViewer/flowplayer/flowplayer.unlimited-3.2.5.swf", {clip: {url: videourl,autoPlay: false,scaling: "fit",autoBuffering: false}, key: '8bd978b03c46fdb64f0'});  }
  cdm.util.ConsoleLogger("fallback");

}
function cdm_showHTML5Video(){
  $("#cdm_media_loading").remove();
  $("#flash_wrapper").remove();
  cdm.util.ConsoleLogger("loaded...");
}