// Lyricy Main JavaScript
// Cyberpunk Music Player Functionality

class LyricyPlayer {
    constructor() {
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 0;
        this.volume = 0.7;
        this.filteredSongs = [...SONGS];
        this.lastActiveIdx = -1;        // remember last highlighted line
        this.userScrolling = false;     // user is actively scrolling lyrics
        this.userScrollTimer = null;    // timer to end the "user scrolling" window

        
        // DOM Elements
        this.audioPlayer = document.getElementById('audio-player');
        this.playBtn = document.getElementById('play-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.progressBar = document.getElementById('progress-bar');
        this.progressFill = document.getElementById('progress-fill');
        this.currentTimeEl = document.getElementById('current-time');
        this.durationEl = document.getElementById('duration');
        this.volumeSlider = document.getElementById('volume-slider');
        this.volumeFill = document.getElementById('volume-fill');
        this.volumeDisplay = document.getElementById('volume-display');
        
        // Song Info Elements
        this.albumArt = document.getElementById('album-art');
        this.songTitle = document.getElementById('song-title');
        this.songArtist = document.getElementById('song-artist');
        this.songAlbum = document.getElementById('song-album');
        
        // Lyrics
        this.lyricsContent = document.getElementById('lyrics-content');
        
        // Library Elements
        this.searchInput = document.getElementById('search-input');
        this.genreFilter = document.getElementById('genre-filter');
        this.songsGrid = document.getElementById('songs-grid');
        this.quickPicksGrid = document.getElementById('quick-picks-grid');
        
        // Statistics Elements
        this.totalTracks = document.getElementById('total-tracks');
        this.totalArtists = document.getElementById('total-artists');
        this.totalGenres = document.getElementById('total-genres');
        this.totalDuration = document.getElementById('total-duration');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSong(0);
        this.setupParticleBackground();
        this.setupVisualEffects();
        this.updateLibraryStats();
        this.renderQuickPicks();
        this.renderSongsGrid();
        this.handleURLParams();
    }

    setupEventListeners() {
        // Audio Controls
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.prevBtn.addEventListener('click', () => this.previousSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        
        // Progress Bar
        this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        
        // Volume Control
        this.volumeSlider.addEventListener('click', (e) => this.setVolume(e));
        
        // Audio Events
        this.audioPlayer.addEventListener('timeupdate', () => this.updateTime());
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('ended', () => this.nextSong());
        
        // Library Events
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.debounce(() => this.handleSearch(), 200));
        }
        
        if (this.genreFilter) {
            this.genreFilter.addEventListener('change', () => this.handleGenreFilter());
        }
        
        // Keyboard Controls
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        if (this.lyricsContent) {
          const markUserScroll = () => {
            this.userScrolling = true;
            clearTimeout(this.userScrollTimer);
            this.userScrollTimer = setTimeout(() => {
              this.userScrolling = false;
            }, 1200); // user is considered "active" for 1.2s after last interaction
          };
          this.lyricsContent.addEventListener('wheel', markUserScroll, { passive: true });
          this.lyricsContent.addEventListener('touchmove', markUserScroll, { passive: true });
          this.lyricsContent.addEventListener('scroll', markUserScroll, { passive: true });
        }
    }

    loadSong(index) {
        if (index < 0 || index >= SONGS.length) return;
        
        this.currentSongIndex = index;
        const song = SONGS[index];
        
        // Update audio source (using demo audio for now)
        this.audioPlayer.src = song.mp3;
        
        // Update song info
        this.albumArt.src = song.coverImage;
        this.songTitle.textContent = song.title;
        this.songArtist.textContent = song.artist;
        this.songAlbum.textContent = song.album;
        
        // Update duration display
        this.duration = song.duration;
        this.durationEl.textContent = this.formatTime(song.duration);
        
        // Update lyrics
        this.updateLyrics(song.lyrics);
        
        // Store current song in localStorage
        localStorage.setItem('selectedSongId', song.id);
        
        // Reset progress
        this.currentTime = 0;
        this.progressFill.style.width = '0%';
        this.currentTimeEl.textContent = '0:00';
    }

    togglePlay() {
        if (this.isPlaying) {
            this.audioPlayer.pause();
            this.playBtn.innerHTML = '▶';
            this.isPlaying = false;
        } else {
            this.audioPlayer.play().catch(e => {
                console.log('Audio play failed:', e);
                // Fallback for demo - simulate playing state
                this.simulateAudioPlayback();
            });
            this.playBtn.innerHTML = '⏸';
            this.isPlaying = true;
        }
    }

    simulateAudioPlayback() {
        // Demo simulation since we can't play actual MP3s
        let simulationInterval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(simulationInterval);
                return;
            }
            
            this.currentTime += 0.5;
            if (this.currentTime >= this.duration) {
                this.currentTime = 0;
                this.nextSong();
                clearInterval(simulationInterval);
                return;
            }
            
            this.updateTime();
        }, 500);
    }

    previousSong() {
        let newIndex = this.currentSongIndex - 1;
        if (newIndex < 0) newIndex = SONGS.length - 1;
        
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.audioPlayer.play().catch(() => this.simulateAudioPlayback());
        }
    }

    nextSong() {
        let newIndex = this.currentSongIndex + 1;
        if (newIndex >= SONGS.length) newIndex = 0;
        
        this.loadSong(newIndex);
        if (this.isPlaying) {
            this.audioPlayer.play().catch(() => this.simulateAudioPlayback());
        }
    }

    seekTo(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const seekTime = percent * this.duration;
        
        this.audioPlayer.currentTime = seekTime;
        this.currentTime = seekTime;
        this.updateTime();
    }

    setVolume(e) {
        const rect = this.volumeSlider.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        
        this.volume = percent;
        this.audioPlayer.volume = percent;
        this.volumeFill.style.width = `${percent * 100}%`;
        this.volumeDisplay.textContent = `${Math.round(percent * 100)}%`;
    }

    updateTime() {
      // always pull the real time from the audio element
      this.currentTime = this.audioPlayer.currentTime || 0;

      this.currentTimeEl.textContent = this.formatTime(this.currentTime);
      const progress = (this.currentTime / (this.duration || 1)) * 100;
      this.progressFill.style.width = `${Math.min(100, progress)}%`;

      // highlight only if line actually changed
      this.setActiveLyricAtTime(this.currentTime);
    }


    updateDuration() {
        this.duration = this.audioPlayer.duration || SONGS[this.currentSongIndex].duration;
        this.durationEl.textContent = this.formatTime(this.duration);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    updateLyrics(lyrics) {
        if (!this.lyricsContent) return;
        
        this.lyricsContent.innerHTML = '';
        lyrics.forEach((lyric, index) => {
            const lyricEl = document.createElement('div');
            lyricEl.className = 'lyric-line';
            lyricEl.dataset.time = lyric.t;
            lyricEl.textContent = lyric.text;
            
            lyricEl.addEventListener('click', () => {
                this.currentTime = lyric.t;
                this.audioPlayer.currentTime = lyric.t;
            });
            
            this.lyricsContent.appendChild(lyricEl);
        });
    }

  setActiveLyricAtTime(t) {
    const root = this.lyricsContent;
    if (!root) return;

    const lines = Array.from(root.querySelectorAll(".lyric-line"));
    if (!lines.length) return;

    // find current line
    let idx = -1;
    for (let i = 0; i < lines.length; i++) {
      const start = Number(lines[i].dataset.time || 0);
      const end   = (i + 1 < lines.length) ? Number(lines[i + 1].dataset.time || 1e9) : 1e9;
      if (t >= start && t < end) { idx = i; break; }
    }

    if (idx === this.lastActiveIdx) return;       // ✅ no change → no work

    // toggle classes once
    lines.forEach((el, i) => el.classList.toggle("active", i === idx));

    // auto-scroll only if the user is NOT actively scrolling
    if (idx >= 0 && !this.userScrolling) {
      const el = lines[idx];
      // Only scroll if the line is outside a comfy viewport band
      if (!this.isMostlyInView(el, root, 0.15)) {
          // keep block:'nearest' so we don't force center
          el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        }
      }

      this.lastActiveIdx = idx;
    }

    // helper: is element mostly visible in the scroll container?
    isMostlyInView(el, container, marginRatio = 0.1) {
      const c = container.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      const topBand = c.top + c.height * marginRatio;
      const botBand = c.bottom - c.height * marginRatio;
      return r.top >= topBand && r.bottom <= botBand;
    }


    // Library Functions
    handleSearch() {
        const query = this.searchInput?.value.toLowerCase() || '';
        this.filteredSongs = SONGS.filter(song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        );
        this.applyGenreFilter();
    }

    handleGenreFilter() {
        const selectedGenre = this.genreFilter?.value || '';
        this.applyGenreFilter(selectedGenre);
    }

    applyGenreFilter(genre = '') {
        let filtered = this.searchInput?.value ? this.filteredSongs : [...SONGS];
        
        if (genre && genre !== '') {
            filtered = filtered.filter(song => song.genre === genre);
        }
        
        this.filteredSongs = filtered;
        this.renderSongsGrid();
    }

    renderSongsGrid() {
        if (!this.songsGrid) return;
        
        if (this.filteredSongs.length === 0) {
            this.songsGrid.style.display = 'none';
            document.getElementById('empty-state').style.display = 'block';
            return;
        }
        
        this.songsGrid.style.display = 'grid';
        document.getElementById('empty-state').style.display = 'none';
        
        this.songsGrid.innerHTML = this.filteredSongs.map(song => `
            <div class="song-card" onclick="player.playSong(${song.id})">
                <img class="song-card-cover" src="${song.coverImage}" alt="${song.title}" loading="lazy">
                <h3 class="song-card-title">${song.title}</h3>
                <p class="song-card-artist">${song.artist}</p>
                <p class="song-card-genre">${song.genre}</p>
                <p class="song-card-duration">${this.formatTime(song.duration)}</p>
            </div>
        `).join('');
    }

    renderQuickPicks() {
        if (!this.quickPicksGrid) return;
        
        // Show first 6 songs in quick picks
        const quickPicks = SONGS.slice(0, 6);
        
        this.quickPicksGrid.innerHTML = quickPicks.map(song => `
            <div class="quick-pick-card" onclick="player.playSong(${song.id})">
                <img class="quick-pick-cover" src="${song.coverImage}" alt="${song.title}" loading="lazy">
                <h4 class="quick-pick-title">${song.title}</h4>
                <p class="quick-pick-artist">${song.artist}</p>
            </div>
        `).join('');
    }

    playSong(songId) {
        const songIndex = SONGS.findIndex(song => song.id === songId);
        if (songIndex !== -1) {
            this.loadSong(songIndex);
            
            // Navigate to player if on library page
            if (window.location.pathname.includes('library.html')) {
                window.location.href = `index.html?song=${songId}&autoplay=1`;
            } else {
                // Auto-play if autoplay parameter is set
                const urlParams = new URLSearchParams(window.location.search);
                if (urlParams.get('autoplay') === '1') {
                    this.togglePlay();
                }
            }
        }
    }

    updateLibraryStats() {
        if (!this.totalTracks) return;
        
        const uniqueArtists = [...new Set(SONGS.map(song => song.artist))];
        const uniqueGenres = [...new Set(SONGS.map(song => song.genre))];
        const totalDuration = SONGS.reduce((sum, song) => sum + song.duration, 0);
        
        this.totalTracks.textContent = SONGS.length;
        this.totalArtists.textContent = uniqueArtists.length;
        this.totalGenres.textContent = uniqueGenres.length;
        this.totalDuration.textContent = this.formatTime(totalDuration);
        
        // Animate numbers
        this.animateNumbers();
    }

    animateNumbers() {
        const elements = [this.totalTracks, this.totalArtists, this.totalGenres];
        elements.forEach(el => {
            if (el) {
                anime({
                    targets: el,
                    scale: [0.8, 1],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutElastic(1, .8)',
                    delay: Math.random() * 200
                });
            }
        });
    }

    handleURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const songId = urlParams.get('song');
        
        if (songId) {
            this.playSong(parseInt(songId));
        } else {
            // Check localStorage for last played song
            const lastSongId = localStorage.getItem('selectedSongId');
            if (lastSongId) {
                this.playSong(parseInt(lastSongId));
            }
        }
    }

    handleKeyboard(e) {
        // Spacebar for play/pause
        if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            this.togglePlay();
        }
        
        // Arrow keys for previous/next
        if (e.code === 'ArrowLeft' && e.ctrlKey) {
            e.preventDefault();
            this.previousSong();
        }
        
        if (e.code === 'ArrowRight' && e.ctrlKey) {
            e.preventDefault();
            this.nextSong();
        }
    }

    // Visual Effects
    setupParticleBackground() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;
        
        new p5((p) => {
            let particles = [];
            
            p.setup = () => {
                const canvas = p.createCanvas(window.innerWidth, window.innerHeight);
                canvas.id('particle-canvas');
                
                // Create particles
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 6),
                        color: p.random(['#00ffff', '#ff007a', '#00ff9f'])
                    });
                }
            };
            
            p.draw = () => {
                p.clear();
                
                particles.forEach(particle => {
                    // Update position
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // Wrap around edges
                    if (particle.x < 0) particle.x = p.width;
                    if (particle.x > p.width) particle.x = 0;
                    if (particle.y < 0) particle.y = p.height;
                    if (particle.y > p.height) particle.y = 0;
                    
                    // Draw particle
                    p.fill(particle.color + '40');
                    p.noStroke();
                    p.circle(particle.x, particle.y, particle.size);
                });
            };
            
            p.windowResized = () => {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
            };
        });
    }

    setupVisualEffects() {
        // Text splitting animation
        if (typeof Splitting !== 'undefined') {
            Splitting();
        }
        
        // Animate hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && typeof anime !== 'undefined') {
            anime({
                targets: heroTitle,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutElastic(1, .8)',
                delay: 500
            });
        }
        
        // Glow effects on hover
        this.setupGlowEffects();
    }

    setupGlowEffects() {
        const glowingElements = document.querySelectorAll('.control-btn, .song-card, .quick-pick-card, .stat-card');
        
        glowingElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: element,
                        scale: 1.05,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: element,
                        scale: 1,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                }
            });
        });
    }

    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.player = new LyricyPlayer();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden && window.player) {
        // Pause when tab is hidden to save resources
        if (window.player.isPlaying) {
            window.player.togglePlay();
        }
    }
});

// ===== PLAYER PAGE WIRING (index.html) =====
(function () {
  if (!/index\.html(\?|$)/i.test(location.pathname)) return;

  // --- Get SONGS (works whether songs.js attached window.SONGS or a global const) ---
  const SONGS = Array.isArray(window.SONGS) ? window.SONGS :
                (typeof window.SONGS !== "undefined" ? window.SONGS :
                (typeof window.SONGS === "undefined" && typeof window.SONGS !== "object" ? [] : []));

  // --- Refs ---
  const audio = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const progressFill = document.getElementById("progress-fill");
  const progressBar = document.getElementById("progress-bar");
  const curEl = document.getElementById("current-time");
  const durEl = document.getElementById("duration");
  const lyricsEl = document.getElementById("lyrics-content");
  const coverEl = document.getElementById("album-art");
  const titleEl = document.getElementById("song-title");
  const artistEl = document.getElementById("song-artist");
  const albumEl = document.getElementById("song-album");

  if (!audio) return;

  // --- State ---
  let currentSong = null;
  let rafId = null;
  let pendingAutoplay = false;

  const fmt = (sec) => {
    sec = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const findByToken = (token) => {
    if (!token) return null;
    const n = Number(token);
    if (!Number.isNaN(n)) return SONGS.find(s => String(s.id) === String(n));
    return SONGS.find(s => s.slug === token) || SONGS.find(s => String(s.id) === String(token));
  };

  // --- Render lyrics and wire seek on dblclick ---
  function renderLyrics(song) {
    if (!lyricsEl) return;
    const lines = (song.lyrics || []).map(l =>
      `<div class="lyric-line" data-time="${Number(l.t)||0}">${l.text}</div>`
    ).join("");
    lyricsEl.innerHTML = lines;

    lyricsEl.addEventListener("dblclick", (e) => {
      const line = e.target.closest(".lyric-line");
      if (!line) return;
      const t = Number(line.dataset.time || 0);
      audio.currentTime = t;
    }, { once: false });
  }

  // --- Highlight current line based on time ---
  function updateActiveLyric(t) {
    if (!lyricsEl) return;
    const lines = Array.from(lyricsEl.querySelectorAll(".lyric-line"));
    if (!lines.length) return;
    let active = -1;
    for (let i = 0; i < lines.length; i++) {
      const start = Number(lines[i].dataset.time || 0);
      const end = (i + 1 < lines.length) ? Number(lines[i + 1].dataset.time || 1e9) : 1e9;
      if (t >= start && t < end) { active = i; break; }
    }
    lines.forEach((el, i) => el.classList.toggle("active", i === active));
    if (active >= 0) {
      lines[active].scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  // --- rAF loop for progress + lyrics ---
  function loop() {
    const t = audio.currentTime || 0;
    const d = audio.duration || (currentSong?.duration || 0) || 1;
    if (curEl) curEl.textContent = fmt(t);
    if (durEl) durEl.textContent = fmt(d);
    if (progressFill) progressFill.style.width = `${Math.min(100, (t / d) * 100)}%`;
    updateActiveLyric(t);
    rafId = requestAnimationFrame(loop);
  }
  function startLoop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(loop);
  }
  function stopLoop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }

  // --- Load a song into the player ---
  function loadSong(song) {
    currentSong = song;
    if (titleEl)  titleEl.textContent  = song.title || "—";
    if (artistEl) artistEl.textContent = song.artist || "—";
    if (albumEl)  albumEl.textContent  = song.album || "—";
    if (coverEl)  coverEl.src = song.coverImage || song.image || coverEl.src;

    // lyrics for this song
    renderLyrics(song);

    // set source
    audio.src = song.mp3 || song.audio || "";
    audio.load(); // important to reset currentTime/events
  }

  // --- Attempt autoplay; if blocked, resume on first user interaction ---
  async function tryAutoplay() {
    try {
      await audio.play();
      pendingAutoplay = false;
      playBtn && (playBtn.textContent = "⏸");
    } catch (err) {
      pendingAutoplay = true;
      playBtn && (playBtn.textContent = "▶");
      const resume = async () => {
        window.removeEventListener("pointerdown", resume);
        try { await audio.play(); } catch (_) {}
      };
      window.addEventListener("pointerdown", resume, { once: true });
    }
  }

  // --- Controls ---
  playBtn && playBtn.addEventListener("click", async () => {
    if (audio.paused) {
      await audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  });
  prevBtn && prevBtn.addEventListener("click", () => {
    if (!currentSong) return;
    const idx = SONGS.findIndex(s => s.id === currentSong.id);
    const prev = SONGS[(idx - 1 + SONGS.length) % SONGS.length];
    loadSong(prev);
    audio.play().catch(() => {}); // user gesture (button) so allowed
  });
  nextBtn && nextBtn.addEventListener("click", () => {
    if (!currentSong) return;
    const idx = SONGS.findIndex(s => s.id === currentSong.id);
    const next = SONGS[(idx + 1) % SONGS.length];
    loadSong(next);
    audio.play().catch(() => {});
  });

  // Seek by clicking the progress bar
  progressBar && progressBar.addEventListener("click", (e) => {
    const rect = progressBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const d = audio.duration || (currentSong?.duration || 0);
    audio.currentTime = Math.max(0, Math.min(d, d * ratio));
  });

  // --- Audio events drive the UI loop ---
  audio.addEventListener("loadedmetadata", () => {
    if (durEl) durEl.textContent = fmt(audio.duration || currentSong?.duration || 0);
  });
  audio.addEventListener("play", () => {
    playBtn && (playBtn.textContent = "⏸");
    startLoop();                   // <<< start continuous updates when audio actually plays
  });
  audio.addEventListener("pause", () => {
    playBtn && (playBtn.textContent = "▶");
    stopLoop();                    // optional; we could keep the loop but it’s cleaner to stop
    loop();                        // do one final UI update at pause position
  });
  audio.addEventListener("ended", () => {
    stopLoop();
    // auto-next (optional)
    const idx = SONGS.findIndex(s => s.id === currentSong.id);
    const next = SONGS[(idx + 1) % SONGS.length];
    loadSong(next);
    audio.play().catch(() => {});
  });

  // --- Quick Picks on the player page (click to play) ---
  document.querySelectorAll(".quick-pick-card,[data-song-id]").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-song-id");
      const slug = card.getAttribute("data-song-slug");
      const token = slug || id;
      const s = findByToken(token);
      if (!s) return;
      loadSong(s);
      audio.play().catch(() => {});   // user gesture—should play; loop starts in 'play' event
    });
  });

  // --- Initial selection: ?song=... & ?autoplay=1 OR fallback to last or first ---
  const qp = new URLSearchParams(location.search);
  const token = qp.get("song");
  let initial = findByToken(token);

  if (!initial) {
    const saved = localStorage.getItem("selectedSongId");
    initial = findByToken(saved) || SONGS[0];
  }
  if (initial) {
    loadSong(initial);
    localStorage.setItem("selectedSongId", String(initial.id));
    if (qp.get("autoplay") === "1") {
      tryAutoplay();                // may get blocked; we attach a one-time pointerdown to resume
    } else {
      // no autoplay—still start the UI loop so duration/time show immediately
      loop();
    }
  }
})();


// ===== LIBRARY PAGE WIRING =====
(function () {
  if (!/library\.html(\?|$)/i.test(location.pathname)) return;

  // --- Safe access to songs (supports both window.SONGS or a global SONGS const) ---
  const getSongs = () => {
    if (Array.isArray(window.SONGS)) return window.SONGS;
    return (typeof SONGS !== "undefined" && Array.isArray(SONGS)) ? SONGS : [];
  };

  const songs = getSongs();

  // --- DOM refs ---
  const grid = document.getElementById("songs-grid");
  const empty = document.getElementById("empty-state");
  const totalTracksEl  = document.getElementById("total-tracks");
  const totalArtistsEl = document.getElementById("total-artists");
  const totalGenresEl  = document.getElementById("total-genres");
  const totalDurationEl= document.getElementById("total-duration");
  const searchInput    = document.getElementById("search-input");
  const genreSelect    = document.getElementById("genre-filter");

  // NEW: chips container & controls
  const chipsBox = document.getElementById("genre-chips");
  const chipsAllBtn = document.getElementById("chips-all");
  const chipsNoneBtn = document.getElementById("chips-none");

  // --- Helpers ---
  const fmtTime = (sec) => {
    sec = Math.max(0, Math.floor(sec || 0));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const computeCounts = (list) => {
    const artists = new Set();
    const genres  = new Set();
    let durationSum = 0;
    let tracks = 0;

    for (const s of list) {
      if (!s || typeof s !== "object") continue;
      const isTrack = ("id" in s) || (s.title && String(s.title).trim());
      if (isTrack) tracks++;
      if (s.artist) artists.add(String(s.artist).trim().toLowerCase());
      if (s.genre)  genres.add(String(s.genre).trim().toLowerCase());
      if (Number.isFinite(s.duration)) durationSum += s.duration;
    }
    return { tracks, artists: artists.size, genres: genres.size, durationSum };
  };

  const updateStats = (list) => {
    const { tracks, artists, genres, durationSum } = computeCounts(list);
    if (totalTracksEl)  totalTracksEl.textContent  = tracks;
    if (totalArtistsEl) totalArtistsEl.textContent = artists;
    if (totalGenresEl)  totalGenresEl.textContent  = genres;
    if (totalDurationEl) totalDurationEl.textContent = fmtTime(durationSum);
  };

  const uniqueGenres = () => {
    const set = new Set();
    for (const s of songs) if (s?.genre) set.add(String(s.genre).trim());
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  };

  const buildGenreOptions = () => {
    if (!genreSelect) return;
    const current = genreSelect.value || "";
    // Clear all except the first "All" option
    genreSelect.innerHTML = `<option value="">All Genres</option>`;
    for (const g of uniqueGenres()) {
      const opt = document.createElement("option");
      opt.value = g;
      opt.textContent = g;
      genreSelect.appendChild(opt);
    }
    // keep previous selection if possible
    if (current && [...genreSelect.options].some(o => o.value === current)) {
      genreSelect.value = current;
    }
  };
  const listGenres = () => {
    const set = new Set();
    for (const s of songs) {
      const g = (s?.genre || "").trim();
      if (g) set.add(g);
    }
    return Array.from(set).sort((a,b)=>a.localeCompare(b));
  };

  let selectedGenres = new Set(listGenres());

  function buildGenreChips() {
    if (!chipsBox) return;
    chipsBox.innerHTML = "";

    const genres = listGenres();
    if (selectedGenres.size === 0) selectedGenres = new Set(genres);

    genres.forEach(g => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (selectedGenres.has(g) ? " active" : "");
      btn.textContent = g;
      btn.setAttribute("data-genre", g);

      btn.addEventListener("click", () => {
        if (selectedGenres.has(g)) selectedGenres.delete(g);
        else selectedGenres.add(g);
        btn.classList.toggle("active");
        apply();
      });

      chipsBox.appendChild(btn);
    });

    chipsAllBtn?.addEventListener("click", () => {
      selectedGenres = new Set(genres);
      chipsBox.querySelectorAll(".chip").forEach(ch => ch.classList.add("active"));
      apply();
    });

    chipsNoneBtn?.addEventListener("click", () => {
      selectedGenres.clear();
      chipsBox.querySelectorAll(".chip").forEach(ch => ch.classList.remove("active"));
      apply();
    });
  }

  const matchesSearch = (song, q) => {
    if (!q) return true;
    q = q.toLowerCase();
    return (
      (song.title && song.title.toLowerCase().includes(q)) ||
      (song.artist && song.artist.toLowerCase().includes(q))
    );
  };

  const matchesSelectedGenres = (song) => {
    const g = (song.genre || "").trim();
    if (selectedGenres.size === 0) return false; // "off" = show none
    return selectedGenres.has(g);
  };

  const matchesGenre = (song, g) => {
    if (!g) return true;
    return (song.genre && String(song.genre).trim().toLowerCase() === g.toLowerCase());
  };

  const cardHtml = (s) => {
    const cover = s.coverImage || s.image || "https://via.placeholder.com/600x600?text=No+Cover";
    const title = s.title || "Untitled";
    const artist= s.artist || "Unknown Artist";
    const genre = s.genre ? String(s.genre).toUpperCase() : "—";
    const dur   = Number.isFinite(s.duration) ? fmtTime(s.duration) : "0:00";
    return `
      <div class="song-card" data-song-id="${s.id ?? ""}" data-song-slug="${s.slug ?? ""}">
        <img class="song-card-cover" src="${cover}" alt="Cover of ${title}">
        <div class="song-card-title" title="${title}">${title}</div>
        <div class="song-card-artist" title="${artist}">${artist}</div>
        <div class="song-card-genre">${genre}</div>
        <div class="song-card-duration">${dur}</div>
      </div>
    `;
  };

  const renderSongs = (list) => {
    if (!grid) return;
    grid.innerHTML = list.map(cardHtml).join("");
    empty.style.display = list.length ? "none" : "block";

    // Click -> go to player
    grid.querySelectorAll(".song-card").forEach(card => {
      card.addEventListener("click", () => {
        const id   = card.getAttribute("data-song-id");
        const slug = card.getAttribute("data-song-slug");
        const token = slug || id;
        if (!token) return;
        if (id) localStorage.setItem("selectedSongId", id);
        location.href = `index.html?song=${encodeURIComponent(token)}&autoplay=1`;
      });
    });
  };

  // --- Filter + search pipeline ---
let q = "";

const apply = () => {
  const filtered = songs.filter(s => matchesSearch(s, q) && matchesSelectedGenres(s));
  updateStats(filtered);
  renderSongs(filtered);
};

// Debounced search (keep)
const debounce = (fn, ms = 200) => {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

searchInput && searchInput.addEventListener("input", debounce(() => {
  q = searchInput.value || "";
  apply();
}, 200));

// --- Init ---
buildGenreChips();
updateStats(songs);
renderSongs(songs);

})();

// Export for global access
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LyricyPlayer;
}