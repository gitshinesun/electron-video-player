window.addEventListener(
    'DOMContentLoaded',
    init
);

function init(){
     bindEvents();
}

function bindEvents(){
    var video = document.querySelector('#videoContainer');

    video.addEventListener(
        'play',
        playing
    );

    video.addEventListener(
        'ended',
        ended
    );

    video.addEventListener(
        'pause',
        paused
    );

    video.addEventListener(
        'error',
        function(e){
            videoError('Video Error');
        }
    );

    document.querySelector('#playerContainer').addEventListener(
        'click',
        playerClicked
    );

    document.querySelector('#chooseVideo').addEventListener(
        'change',
        loadVideo
    );

}

function togglePlay(){
    document.querySelector('.play:not(.hide),.pause:not(.hide)').click();
}

function playing(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#play').classList.add('hide');
    document.querySelector('#pause').classList.remove('hide');
    player.classList.remove('paused');
}


function paused(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#pause').classList.add('hide');
    document.querySelector('#play').classList.remove('hide');
    player.classList.add('paused');

}

function ended(e){
    var player = document.querySelector('#playerContainer');

    document.querySelector('#play').classList.remove('hide');
    document.querySelector('#pause').classList.add('hide');
    player.classList.add('paused');
}

function loadVideo(e) {
    e.preventDefault();
    var files = [];
    if(e.dataTransfer){
        files=e.dataTransfer.files;
    }else if(e.target.files){
        files=e.target.files;
    }else{
        files=[
            {
                type:video,
                path:e.target.value
            }
        ];
    }
        
    //@ToDo handle playlist
    for (var i=0; i<files.length; i++) {
        console.log(files[i]);
        if(files[i].type.indexOf('video')>-1){
            var video = document.querySelector('video');
            video.src=files[i].path;
            setTimeout(
                function(){
                    document.querySelector('.dropArea').classList.remove('droppableArea');
                    document.querySelector('.play:not(.hide),.pause:not(.hide)').click();
                },
                250
            );
        }
    };
    
};

function videoError(message){
    var err=document.querySelector('#error');
    err.querySelector('h1').innerHTML=message;
    err.classList.remove('hide')

    setTimeout(
        function(){
            document.querySelector('#error').classList.remove('hidden');
        },
        10
    );
}

function closeError(){
    document.querySelector('#error').classList.add('hidden');
    setTimeout(
        function(){
            document.querySelector('#error').classList.add('hide');
        },
        300
    );
}

function playerClicked(e){
    if(!e.target.id || e.target.id=='controlContainer' || e.target.id=='dropArea'){
        return;
    }

    var video = document.querySelector('#videoContainer');
    var player = document.querySelector('#playerContainer');

    switch(e.target.id){
        case 'video' :
            togglePlay();
            break;
        case 'play' :
            if(!video.videoWidth){
                videoError('Error Playing Media File');
                return;
            }
            video.play();
            break;
        case 'pause' :
            video.pause();
            break;
        case 'close' :
            window.close();
            break;
        case 'fileChooser' :
            document.querySelector('#chooseVideo').click();
            break;
        case 'error' :
        case 'errorMessage' :
            closeError();
            break;
        default :
            console.log('stop half assing shit.');
    }
}

