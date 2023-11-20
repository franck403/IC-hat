import lottieWeb from "https://cdn.skypack.dev/lottie-web";

class AudioPlayer extends HTMLElement {
    constructor() {
        super();
        const tem = `
        <style>
        button {
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          outline: none;
          width: 40px;
          height: 40px;
          float: left;
        }
    
        #audio-player-container {
          position: relative;
          margin: 100px 2.5% auto 2.5%;
          width: 95%;
          display: flex;
          max-width: 50%;
          height: fit-content;
          background: #fff;
          border-radius: 90px;
          font-family: Arial, Helvetica, sans-serif;
          --seek-before-width: 0%;
          --volume-before-width: 100%;
          --buffered-width: 0%;
          letter-spacing: -0.5px;
        }
    
        #audio-player-container::before {
          position: absolute;
          content: '';
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          left: -2px;
          top: -2px;
          border-radius: 90px;
          background: black;
          z-index: -1;
        }
    
        p {
          position: absolute;
          top: -18px;
          right: 5%;
          padding: 0 5px;
          margin: 0;
          font-size: 28px;
          background: #fff;
        }
    
        #play-icon {
          margin: 10px 2.5% 10px 2.5%;
        }
    
        path {
          stroke: #007db5;
        }
    
        .time {
          display: inline-block;
          width: 37px;
          text-align: center;
          font-size: 20px;
          margin: 20px 2.5% 20px 2.5%;
          float: left;
        }
    
        output {
          display: inline-block;
          width: 32px;
          text-align: center;
          font-size: 20px;
          margin: 20px 2.5% 20px 2.5%;
          float: left;
          clear: left;
        }
    
        #volume-slider {
          width: 58%;
        }
    
        #volume-slider::-webkit-slider-runnable-track {
          background: rgba(0, 125, 181, 0.6);
        }
    
        #volume-slider::-moz-range-track {
          background: rgba(0, 125, 181, 0.6);
        }
    
        #volume-slider::-ms-fill-upper {
          background: rgba(0, 125, 181, 0.6);
        }
    
        #volume-slider::before {
          width: var(--volume-before-width);
        }
    
        svg {
          width: 40px !important;
          height: 40px !important;
        }
    
        #mute-icon {
          margin: 10px 2.5% 10px 2.5%;
        }
    
        input[type="range"] {
          position: relative;
          -webkit-appearance: none;
          width: 48%;
          margin: 0;
          padding: 0;
          height: 19px;
          margin: 20px 2.5% 20px 2.5%;
          float: left;
          outline: none;
        }
    
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 3px;
          cursor: pointer;
          background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
        }
    
        input[type="range"]::before {
          position: absolute;
          content: "";
          top: 8px;
          left: 0;
          width: var(--seek-before-width);
          height: 3px;
          background-color: #007db5;
          cursor: pointer;
        }
    
        input[type="range"]::-webkit-slider-thumb {
          position: relative;
          -webkit-appearance: none;
          box-sizing: content-box;
          border: 1px solid #007db5;
          height: 15px;
          width: 15px;
          border-radius: 50%;
          background-color: #fff;
          cursor: pointer;
          margin: -7px 0 0 0;
        }
    
        input[type="range"]:active::-webkit-slider-thumb {
          transform: scale(1.2);
          background: #007db5;
        }
    
        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 3px;
          cursor: pointer;
          background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
        }
    
        input[type="range"]::-moz-range-progress {
          background-color: #007db5;
        }
    
        input[type="range"]::-moz-focus-outer {
          border: 0;
        }
    
        input[type="range"]::-moz-range-thumb {
          box-sizing: content-box;
          border: 1px solid #007db5;
          height: 15px;
          width: 15px;
          border-radius: 50%;
          background-color: #fff;
          cursor: pointer;
        }
    
        input[type="range"]:active::-moz-range-thumb {
          transform: scale(1.2);
          background: #007db5;
        }
    
        input[type="range"]::-ms-track {
          width: 100%;
          height: 3px;
          cursor: pointer;
          background: transparent;
          border: solid transparent;
          color: transparent;
        }
    
        input[type="range"]::-ms-fill-lower {
          background-color: #007db5;
        }
    
        input[type="range"]::-ms-fill-upper {
          background: linear-gradient(to right, rgba(0, 125, 181, 0.6) var(--buffered-width), rgba(0, 125, 181, 0.2) var(--buffered-width));
        }
    
        input[type="range"]::-ms-thumb {
          box-sizing: content-box;
          border: 1px solid #007db5;
          height: 15px;
          width: 15px;
          border-radius: 50%;
          background-color: #fff;
          cursor: pointer;
        }
    
        input[type="range"]:active::-ms-thumb {
          transform: scale(1.2);
          background: #007db5;
        }
      </style>
      <div id="audio-player-container">
        <audio src="" preload="metadata" loop></audio>
        <p style="margin-right:13%"></p>
        <button style="width: 40px;
        height: 40px;" id="play-icon"></button>
        <span id="current-time" class="time">0:00</span>
        <input type="range" id="seek-slider" max="100" value="0">
        <span id="duration" class="time">0:00</span>
        <output id="volume-output">100</output>
        <input type="range" id="volume-slider" max="100" value="100">
        <button style="width: 40px;
        height: 40px;" id="mute-icon"></button>
      </div>
      `;
        const template = document.createElement('template')
        template.innerHTML = tem
        const templateContent = template.content
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(templateContent.cloneNode(true));
    }

    connectedCallback() {
        everything(this);
    }
}

const everything = function (element) {
    const shadow = element.shadowRoot;

    const audioPlayerContainer = shadow.getElementById("audio-player-container");
    const playIconContainer = shadow.getElementById("play-icon");
    const seekSlider = shadow.getElementById("seek-slider");
    const volumeSlider = shadow.getElementById("volume-slider");
    const muteIconContainer = shadow.getElementById("mute-icon");
    const audio = shadow.querySelector("audio");
    const durationContainer = shadow.getElementById("duration");
    const currentTimeContainer = shadow.getElementById("current-time");
    const outputContainer = shadow.getElementById("volume-output");
    let playState = "play";
    let muteState = "unmute";
    let raf = null;

    audio.src = element.getAttribute("data-src");

    const playAnimation = lottieWeb.loadAnimation({
        container: playIconContainer,
        path:
            "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json",
        renderer: "svg",
        loop: false,
        autoplay: false,
        name: "Play Animation"
    });

    const muteAnimation = lottieWeb.loadAnimation({
        container: muteIconContainer,
        path:
            "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json",
        renderer: "svg",
        loop: false,
        autoplay: false,
        name: "Mute Animation"
    });

    playAnimation.goToAndStop(14, true);

    const whilePlaying = () => {
        seekSlider.value = Math.floor(audio.currentTime);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        audioPlayerContainer.style.setProperty(
            "--seek-before-width",
            `${(seekSlider.value / seekSlider.max) * 100}%`
        );
        raf = requestAnimationFrame(whilePlaying);
    };

    const showRangeProgress = (rangeInput) => {
        if (rangeInput === seekSlider)
            audioPlayerContainer.style.setProperty(
                "--seek-before-width",
                (rangeInput.value / rangeInput.max) * 100 + "%"
            );
        else
            audioPlayerContainer.style.setProperty(
                "--volume-before-width",
                (rangeInput.value / rangeInput.max) * 100 + "%"
            );
    };

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${returnedSeconds}`;
    };

    const displayDuration = () => {
        durationContainer.textContent = calculateTime(audio.duration);
    };

    const setSliderMax = () => {
        seekSlider.max = Math.floor(audio.duration);
    };

    const displayBufferedAmount = () => {
        const bufferedAmount = Math.floor(
            audio.buffered.end(audio.buffered.length - 1)
        );
        audioPlayerContainer.style.setProperty(
            "--buffered-width",
            `${(bufferedAmount / seekSlider.max) * 100}%`
        );
    };

    if (audio.readyState > 0) {
        displayDuration();
        setSliderMax();
        displayBufferedAmount();
    } else {
        audio.addEventListener("loadedmetadata", () => {
            displayDuration();
            setSliderMax();
            displayBufferedAmount();
        });
    }

    playIconContainer.addEventListener("click", () => {
        if (playState === "play") {
            audio.play();
            playAnimation.playSegments([14, 27], true);
            requestAnimationFrame(whilePlaying);
            playState = "pause";
        } else {
            audio.pause();
            playAnimation.playSegments([0, 14], true);
            cancelAnimationFrame(raf);
            playState = "play";
        }
    });

    muteIconContainer.addEventListener("click", () => {
        if (muteState === "unmute") {
            muteAnimation.playSegments([0, 15], true);
            audio.muted = true;
            muteState = "mute";
        } else {
            muteAnimation.playSegments([15, 25], true);
            audio.muted = false;
            muteState = "unmute";
        }
    });

    audio.addEventListener("progress", displayBufferedAmount);

    seekSlider.addEventListener("input", (e) => {
        showRangeProgress(e.target);
        currentTimeContainer.textContent = calculateTime(seekSlider.value);
        if (!audio.paused) {
            cancelAnimationFrame(raf);
        }
    });

    seekSlider.addEventListener("change", () => {
        audio.currentTime = seekSlider.value;
        if (!audio.paused) {
            requestAnimationFrame(whilePlaying);
        }
    });

    volumeSlider.addEventListener("input", (e) => {
        const value = e.target.value;
        showRangeProgress(e.target);
        outputContainer.textContent = value;
        audio.volume = value / 100;
    });

    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: "Komorebi",
            artist: "Anitek",
            album: "MainStay",
            artwork: [
                {
                    src: "https://assets.codepen.io/4358584/1.300.jpg",
                    sizes: "96x96",
                    type: "image/png"
                },
                {
                    src: "https://assets.codepen.io/4358584/1.300.jpg",
                    sizes: "128x128",
                    type: "image/png"
                },
                {
                    src: "https://assets.codepen.io/4358584/1.300.jpg",
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: "https://assets.codepen.io/4358584/1.300.jpg",
                    sizes: "256x256",
                    type: "image/png"
                },
                {
                    src: "https://assets.codepen.io/4358584/1.300.jpg",
                    sizes: "384x384",
                    type: "image/png"
                },
                {
                    src: "https://assets.codepen.io/4358584/1.300.jpg",
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        });
        navigator.mediaSession.setActionHandler("play", () => {
            if (playState === "play") {
                audio.play();
                playAnimation.playSegments([14, 27], true);
                requestAnimationFrame(whilePlaying);
                playState = "pause";
            } else {
                audio.pause();
                playAnimation.playSegments([0, 14], true);
                cancelAnimationFrame(raf);
                playState = "play";
            }
        });
        navigator.mediaSession.setActionHandler("pause", () => {
            if (playState === "play") {
                audio.play();
                playAnimation.playSegments([14, 27], true);
                requestAnimationFrame(whilePlaying);
                playState = "pause";
            } else {
                audio.pause();
                playAnimation.playSegments([0, 14], true);
                cancelAnimationFrame(raf);
                playState = "play";
            }
        });
        navigator.mediaSession.setActionHandler("seekbackward", (details) => {
            audio.currentTime = audio.currentTime - (details.seekOffset || 10);
        });
        navigator.mediaSession.setActionHandler("seekforward", (details) => {
            audio.currentTime = audio.currentTime + (details.seekOffset || 10);
        });
        navigator.mediaSession.setActionHandler("seekto", (details) => {
            if (details.fastSeek && "fastSeek" in audio) {
                audio.fastSeek(details.seekTime);
                return;
            }
            audio.currentTime = details.seekTime;
        });
        navigator.mediaSession.setActionHandler("stop", () => {
            audio.currentTime = 0;
            seekSlider.value = 0;
            audioPlayerContainer.style.setProperty("--seek-before-width", "0%");
            currentTimeContainer.textContent = "0:00";
            if (playState === "pause") {
                playAnimation.playSegments([0, 14], true);
                cancelAnimationFrame(raf);
                playState = "play";
            }
        });
    }
};

customElements.define("audio-player", AudioPlayer);
