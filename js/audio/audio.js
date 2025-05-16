class AudioPlayer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          font-family: sans-serif;
          background: #2c2c3e;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          color: white;
          box-sizing: border-box;
        }

        .controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        button {
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 18px;
          cursor: pointer;
        }

        input[type="range"] {
          width: 100%;
          margin: 15px 0;
          appearance: none;
          height: 5px;
          background: #444;
          border-radius: 3px;
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: #4CAF50;
          border-radius: 50%;
          cursor: pointer;
        }

        .time {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
      </style>

      <audio></audio>
      <div class="controls">
        <button id="playBtn">►</button>
      </div>
      <input type="range" id="seekBar" min="0" value="0" step="1">
      <div class="time">
        <span id="currentTime">0:00</span>
        <span id="duration">0:00</span>
      </div>
    `;

    this.audio = shadow.querySelector('audio');
    this.playBtn = shadow.getElementById('playBtn');
    this.seekBar = shadow.getElementById('seekBar');
    this.currentTimeEl = shadow.getElementById('currentTime');
    this.durationEl = shadow.getElementById('duration');

    // Bindings
    this.playPause = this.playPause.bind(this);
    this.updateSeek = this.updateSeek.bind(this);
    this.seek = this.seek.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onPause = this.onPause.bind(this);
  }

  connectedCallback() {
    const src = this.getAttribute('src');
    if (src) this.audio.src = src;

    this.playBtn.addEventListener('click', this.playPause);
    this.audio.addEventListener('loadedmetadata', () => {
      this.seekBar.max = Math.floor(this.audio.duration);
      console.log(this.audio);
      this.durationEl.textContent = this.formatTime(this.audio.duration);
    });
    this.audio.addEventListener('timeupdate', this.updateSeek);
    this.audio.addEventListener('ended', this.onEnded);
    this.audio.addEventListener('pause', this.onPause);
    this.seekBar.addEventListener('input', this.seek);
  }

  disconnectedCallback() {
    this.playBtn.removeEventListener('click', this.playPause);
    this.seekBar.removeEventListener('input', this.seek);
    this.audio.removeEventListener('timeupdate', this.updateSeek);
    this.audio.removeEventListener('ended', this.onEnded);
    this.audio.removeEventListener('pause', this.onPause);
  }

  formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  }

  playPause() {
    if (this.audio.paused) {
      this.audio.play();
      this.playBtn.textContent = '❚❚';
    } else {
      this.audio.pause();
      this.playBtn.textContent = '►';
    }
  }

  updateSeek() {
    this.seekBar.value = this.audio.currentTime;
    this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
  }

  seek() {
    this.audio.currentTime = this.seekBar.value;
  }

  onEnded() {
    this.playBtn.textContent = '►';
    this.seekBar.value = 0;
  }

  onPause() {
    this.playBtn.textContent = '►';
    this.seekBar.value = 0;
  }
}

customElements.define('audio-player', AudioPlayer);
