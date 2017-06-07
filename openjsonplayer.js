var vid, playButton,seekslider,clientNT;
var clientTT, volume_control,muteButton;
var fullScreen,cv;
var ojp = document.getElementById("openjsonplayer");
window.onload = playerInit;
//Player Write
function playerInit(){
	var vidPATH = ojp.getAttribute("vidPATH");
	ojp.innerHTML=	"<video id='ojp_core'><source src="+vidPATH+"></video><div id='all_danmu'><pre id='read_json'></pre></div><div><div id='video_controls_bar'><button id='playControlButton'><i class='fa fa-pause' aria-hidden='true'></i></button><input type='range' id='seekslider' min='0' max='100' value='0' step='1'>&#32;&#32;&#124;<span id='clientNT'></span> &#47; <span id='clientTT'></span><button id='muteButton'><i class='fa fa-volume-up' aria-hidden='true'></i></button><span id='CV'>100%</span><input type='range' id='volumeSlider' min='0' max='100' value='100' step='1'><button id='fullScreen'><i class='fa fa-arrows-alt' aria-hidden='true'></i></button></div><div id='danmu_send'><button id='danmu_style'><i class='fa fa-sort-desc' aria-hidden='true'></i></button><input type='text' name='danmu_content' id='danmu_enter' placeholder='发个弹幕呗~~~'><button id='danmu_send'><i class='fa fa-paper-plane-o' aria-hidden='true'></i></i></button><button id='danmu_history'><i class='fa fa-history' aria-hidden='true'></i> History</button></div>";
	vid = document.getElementById("ojp_core");
	playButton = document.getElementById("playControlButton");
	seekslider = document.getElementById("seekslider");
	clientNT = document.getElementById("clientNT");
	clientTT = document.getElementById("clientTT");
	muteButton = document.getElementById("muteButton");
	volume_control = document.getElementById("volumeSlider");
	fullScreen = document.getElementById("fullScreen");
	cv = document.getElementById("CV");
	playButton.addEventListener("click",playControl,false);
	seekslider.addEventListener("change",vidSeek,false);
	vid.addEventListener("timeupdate",seekTimeUp,false);
	muteButton.addEventListener("click",muteSound,false);
	volume_control.addEventListener("change",setVolume,false);
	fullScreen.addEventListener("click",TFS,false);
}
function playControl(){
	if(vid.paused){
		vid.play();
		var playButtonStatus = "Pause"
		playButton.innerHTML = "<i class='fa fa-pause' aria-hidden='true'></i>"
		console.log('Play Button is now ' + playButtonStatus);
	}else{
		vid.pause();
		var playButtonStatus = "Play"
		playButton.innerHTML = "<i class='fa fa-play' aria-hidden='true'></i>";
		console.log('Play Button is now ' + playButtonStatus);
	}
}
function vidSeek(){
	var seekto = vid.duration * (seekslider.value / 100);
	vid.currentTime = seekto;
}
function seekTimeUp(){
	var nt = vid.currentTime * (100 / vid.duration);
	seekslider.value = nt;
	var curmins = Math.floor(vid.currentTime / 60);
	var cursecs = Math.floor(vid.currentTime - curmins * 60);
	var durmins = Math.floor(vid.duration / 60);
	var dursecs = Math.floor(vid.duration - durmins * 60);
	if(cursecs < 10){ cursecs = "0"+cursecs; }
	if(dursecs < 10){ dursecs = "0"+dursecs; }
	if(curmins < 10){ curmins = "0"+curmins; }
	if(durmins < 10){ durmins = "0"+durmins; }
	clientNT.innerHTML = curmins+":"+cursecs;
	clientTT.innerHTML = durmins+":"+dursecs;
}
function muteSound(){
	if(vid.muted){
		vid.muted = false;
		var muteButtonStatus = "Mute"
		muteButton.innerHTML = "<i class='fa fa-volume-up' aria-hidden='true'></i>";
		console.log('Mute Button is now ' + muteButtonStatus);
	}else{
		vid.muted = true;
		var muteButtonStatus = "Unmute"
		muteButton.innerHTML = "<i class='fa fa-volume-off' aria-hidden='true'></i>";
		console.log('Play Button is now ' + muteButtonStatus);
	}
}
function setVolume(){
	vid.volume = volumeSlider.value / 100;
	cv.innerHTML = volumeSlider.value + "%";
}
function TFS(){
	if(vid.requestFullScreen){
		vid.requestFullScreen();
	} else if(vid.webkitRequestFullScreen){
		vid.webkitRequestFullScreen();
	} else if(vid.mozRequestFullScreen){
		vid.mozRequestFullScreen();
	}
}