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
          background: transparent;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.4);
          color: black;
          box-sizing: border-box;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 10px;
        }

        .left-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .volume-container {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .volume-container input[type="range"] {
          width: 100px;
        }

        button {
          background: #4CAF50;
          color: black;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 18px;
          line-height: 0;
          cursor: pointer;
        }

        input[type="range"] {
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
          margin-top: 5px;
        }

        #seekBar {
          width: 100%;
          margin: 10px 0;
        }
      </style>

      <audio></audio>

      <div class="controls">
        <div class="left-controls">
          <button id="playBtn" title="Play/Pause">►</button>
          <button id="downloadBtn" title="Download">💾</button>
        </div>
        <div class="volume-container" title="Volume">
          🔊 <input type="range" id="volumeSlider" min="0" max="1" step="0.01" value="1">
        </div>
      </div>

      <input type="range" id="seekBar" min="0" value="0" step="1">
      <div class="time">
        <span id="currentTime">0:00</span>
        <span id="duration">0:00</span>
      </div>
    `;

    this.audio = shadow.querySelector('audio');
    this.playBtn = shadow.getElementById('playBtn');
    this.downloadBtn = shadow.getElementById('downloadBtn');
    this.volumeSlider = shadow.getElementById('volumeSlider');
    this.seekBar = shadow.getElementById('seekBar');
    this.currentTimeEl = shadow.getElementById('currentTime');
    this.durationEl = shadow.getElementById('duration');

    this.seeking = false;

    this.playPause = this.playPause.bind(this);
    this.updateSeek = this.updateSeek.bind(this);
    this.beginSeek = this.beginSeek.bind(this);
    this.endSeek = this.endSeek.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
    this.downloadAudio = this.downloadAudio.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  connectedCallback() {
    const src = this.getAttribute('src');
    if (src) this.audio.src = src;

    this.playBtn.addEventListener('click', this.playPause);
    this.downloadBtn.addEventListener('click', this.downloadAudio);
    this.volumeSlider.addEventListener('input', this.changeVolume);

    this.audio.addEventListener('loadedmetadata', this.onLoadedMetadata);
    this.audio.addEventListener('timeupdate', this.updateSeek);
    this.audio.addEventListener('ended', this.onEnded);
    this.audio.addEventListener('pause', this.onPause);

    this.seekBar.addEventListener('mousedown', this.beginSeek);
    this.seekBar.addEventListener('mouseup', this.endSeek);
    this.seekBar.addEventListener('input', this.updateSeekPreview.bind(this));
  }

  disconnectedCallback() {
    this.playBtn.removeEventListener('click', this.playPause);
    this.downloadBtn.removeEventListener('click', this.downloadAudio);
    this.volumeSlider.removeEventListener('input', this.changeVolume);

    this.seekBar.removeEventListener('mousedown', this.beginSeek);
    this.seekBar.removeEventListener('mouseup', this.endSeek);
    this.seekBar.removeEventListener('input', this.updateSeekPreview);

    this.audio.removeEventListener('loadedmetadata', this.onLoadedMetadata);
    this.audio.removeEventListener('timeupdate', this.updateSeek);
    this.audio.removeEventListener('ended', this.onEnded);
    this.audio.removeEventListener('pause', this.onPause);
  }

  onLoadedMetadata() {
    if (!isNaN(this.audio.duration)) {
      this.seekBar.max = Math.floor(this.audio.duration);
      this.durationEl.textContent = this.formatTime(this.audio.duration);
    }
  }

  formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
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
    if (!this.seeking && !isNaN(this.audio.duration)) {
      this.seekBar.value = Math.floor(this.audio.currentTime);
      this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }

    const value = parseFloat(this.seekBar.value);
    if (!isNaN(value) && !isNaN(this.audio.duration) && this.seeking) {
      this.audio.currentTime = Math.min(Math.max(value, 0), this.audio.duration);
    }
  }

  updateSeekPreview() {
    const value = parseFloat(this.seekBar.value);
    if (!isNaN(value)) {
      this.currentTimeEl.textContent = this.formatTime(value);
    }
  }

  beginSeek() {
    this.seeking = true;
  }

  endSeek() {
    const value = parseFloat(this.seekBar.value);
    if (!isNaN(value) && !isNaN(this.audio.duration)) {
      this.audio.currentTime = Math.min(Math.max(value, 0), this.audio.duration);
      this.seeking = false;
    }
  }

  onEnded() {
    this.playBtn.textContent = '►';
    this.seekBar.value = 0;
    this.currentTimeEl.textContent = '0:00';
  }

  onPause() {
    this.playBtn.textContent = '►';
  }

  downloadAudio() {
    const src = this.audio.src;
    if (!src) return;

    const link = document.createElement('a');
    link.href = src;
    link.download = src.split('/').pop() || 'audio.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  changeVolume(e) {
    this.audio.volume = parseFloat(e.target.value);
  }
}

customElements.define('audio-player', AudioPlayer);
