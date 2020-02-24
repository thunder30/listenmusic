$(function()
{
    var playerTrack = $("#player-track");
	var bgArtwork = $('#bg-artwork');
	var bgArtworkUrl;
	var albumName = $('#album-name');
	var trackName = $('#track-name');
	var albumArt = $('#album-art'),
		sArea = $('#s-area'),
		seekBar = $('#seek-bar'),
		trackTime = $('#track-time'),
		insTime = $('#ins-time'),
		sHover = $('#s-hover'),
        playPauseButton = $("#play-pause-button"),
        playRepeatButton = $("#play-repeat"),
        openMenu = $('#play-menu'),
		i = playPauseButton.find('i'),
		tProgress = $('#current-time'),
		tTime = $('#track-length'),
		seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0,
		buffInterval = null, tFlag = false;
	
	var playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;
	
	var songs = [{
		artist: "Huy R",
		name: "Anh Thanh Niên",
        url: "./resources/Mp3/AnhThanhNien.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfioUIvf8425oKQ1dujBJUFEOmS8mZFpsb3mNbfRWQNcgA5NAH"
	},  {
		artist: "Wn-Tez-Tien",
		name: "Crush 2",
		url: "./resources/Mp3/Crush2.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "Đạt G, Du Uyên",
		name: "Bánh Mì Không",
		url: "./resources/Mp3/BanhMiKhong.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "Chillies",
		name: "Có Em Đời Bỗng Vui",
		url: "./resources/Mp3/CoEmDoiBongVui.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "Chung Thanh Duy",
		name: "Duyên Trời Lấy 2",
		url: "./resources/Mp3/DuyenTroiLay2.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "Jack,K-ICM",
		name: "Hoa Vô Sắc",
		url: "./resources/Mp3/HoaVoSac.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "Binz",
		name: "OK",
		url: "./resources/Mp3/OK.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "AMEE,VirusS",
		name: "Trời Giấu Trời Mang Đi",
		url: "./resources/Mp3/TroiGiauTroiMangDi.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "Chillies",
		name: "Và Thế Là Hết",
		url: "./resources/Mp3/VaTheLaHet.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "Nhật Phong",
		name: "Yêu Một Người Tổn Thương",
		url: "./resources/Mp3/YeuMotNguoiTonThuong.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "Lã. x Log x TiB",
		name: "Anh Thương Em Nhất Mà",
		url: "./resources/Mp3/AnhThuongEmNhatMa.mp3",
		picture: "https://i.pinimg.com/originals/94/58/7a/94587aff05f7389aaa1e980758980be3.jpg"
	},  {
		artist: "AMee ft BRay",
		name: "DoForLove",
		url: "./resources/Mp3/DoForLove.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	},  {
		artist: "Thái Đinh",
		name: "Em Có Còn Dùng Số Này Không?",
		url: "./resources/Mp3/EmCoConDungSoNayKhong.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	},  {
		artist: "Reddy",
		name: "Vài Giây Nữa Thôi",
		url: "./resources/Mp3/VaiGiayNuaThoi.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	},  {
		artist: "Chi Pu",
		name: "Anh Ơi Ở Lại",
		url: "./resources/Mp3/AnhOiOLai.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	},  {
		artist: "Tóc Tiên, Touliver",
		name: "Có Ai Thương Em Như Anh (CATENA)",
		url: "./resources/Mp3/CoAiThuongEmNhuAnh.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	},  {
		artist: "Min",
		name: "Đừng Yêu Nữa, Em Mệt Rồi",
		url: "./resources/Mp3/DungYeuNuaEmMetRoi.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	},  {
		artist: "Vũ.",
		name: "Lạ Lùng",
		url: "./resources/Mp3/LaLung.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	},  {
		artist: "Thái Đinh",
		name: "Phố Không Em",
		url: "./resources/Mp3/PhoKhongEm.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	},  {
		artist: "Reddy",
		name: "Thì Thôi",
		url: "./resources/Mp3/ThiThoi.mp3",
		picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzR7t-ogwkT9GDmmdwuQfrqibqnwH1tiDUdFNFmOwYNU9HCrpY"
	}];
	
	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
		return a;
	}
	// songs = shuffle(songs);

    // toggle repeat
    function playRepeat()
    {
        isRepeat = !isRepeat;
        audio.loop = isRepeat;
        toggleEnable(isRepeat, playRepeatButton);
    }

    function toggleEnable(condition, element)
    {
        if (condition)
            element.addClass('isEnabled');
        else
            element.removeClass('isEnabled');
    }
    
    function toggleMenu()
    {
        isOpen = !isOpen;
        toggleEnable(isOpen, openMenu);
    }

    function addSongList() {
        songs.forEach((song, index) => {
            const songTemplate = 
            `<div class="song" id="song${index}">
                <i class="fas fa-play"></i>
                <div class="info">
                    ${song.name} - ${song.artist}
                </div>
            </div>`

            $("#list-song").append(songTemplate);
            $('#song' + index).on('click', () => {
                selectTrack(0, index);
                playPause();
            });
        })
        
    }


    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    	
	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
			selectTrack(1);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag, index = null)
    {
        if (index === null) {
            if( flag == 0 || flag == 1 ) {
                ++currIndex;
            } else if (flag === -1) {
                --currIndex;
            }
        } else {
            currIndex = index;
        }

        if( (currIndex > -1) && (currIndex < songs.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');
			
			currAlbum = songs[currIndex].name;
            currTrackName = songs[currIndex].artist;
            currArtwork = songs[currIndex].picture;

            audio.src = songs[currIndex].url;
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }
            albumArt.find('img').attr('src', currArtwork);
            albumName.text(currAlbum);
            trackName.text(currTrackName);
            $('#album-art img').prop('src', bgArtworkUrl);
            $('.song').removeClass('playingSong');
            $('#song' + currIndex).addClass('playingSong');
        }
        else
        {
             if (currIndex < 0) {
                currIndex = songs.length - 1;
            } else if (currIndex > songs.length - 1) {
                currIndex = 0;
            }
            selectTrack(2);
        }
    }

    function initPlayer()
	{	
        audio = new Audio();
        addSongList();
		selectTrack(0);
		
        audio.loop = false;
        isRepeat = false;
        isOpen = false;
		
		playPauseButton.on('click',playPause);
		
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
        playRepeatButton.on('click', function(){
            playRepeat();
        });
        openMenu.on('click', function(){
            $("#list-song").fadeToggle(300);
            toggleMenu();
        });
	}
    
	initPlayer();
});