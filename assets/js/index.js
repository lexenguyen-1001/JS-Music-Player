// api: https://api.apify.com/v2/key-value-stores/EJ3Ppyr2t73Ifit64/records/LATEST?fbclid=IwAR2z-xXFt-t0GdBHO456dCDPuEgaGSTGmXMJ9kU_bfq01v-Oe9OSC1Mq6NQ

const $ = document.querySelector.bind(document);

const player = $("#player");
const audio = $("#audio");

const btnPlay = $(".btn__play");
const btnPause = $(".btn__pause");
const btnNext = $(".btn__next");
const btnPrev = $(".btn__prev");

const songName = $(".dashboard__name");
const songSinger = $(".dashboard__singer");
const cdThumb = $(".cd-thumb");
const progress = $(".progress");

const cdThumbAnimate = cdThumb.animate(
  [
    {
      transform: "rotate(360deg)",
    },
  ],
  {
    duration: 10000,
    iterations: Infinity,
  }
);

cdThumbAnimate.pause();

const app = {
  currentIndex: 0,
  progressStatus: false,
  songs: [
    {
      name: "Muộn Rồi Mà Sao Còn",
      singer: "Sơn Tùng M-TP",
      path: "https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=Sa2HB-f9fJqVYxlxKDSB-g&e=1625536524",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg",
    },
    {
      name: "Sài Gòn Đau Lòng Quá",
      singer: "Hứa Kim Tuyền, Hoàng Duyên",
      path: "https://aredir.nixcdn.com/NhacCuaTui1013/SaiGonDauLongQua-HuaKimTuyenHoangDuyen-6992977.mp3?st=HfvYFxlX6Rm_nHrlYq0_Sg&e=1625536524",
      image:
        "https://avatar-ex-swe.nixcdn.com/song/2021/06/28/8/4/3/c/1624872522478.jpg",
    },
  ],
  loadMusic: function () {
    const song = this.songs[this.currentIndex];
    audio.src = song.path;
    songName.textContent = song.name;
    songSinger.textContent = song.singer;

    cdThumb.style.backgroundImage = `url(${song.image})`;
  },
  handleEvent: function () {
    const _this = this;
    // khi click play
    btnPlay.onclick = function () {
      audio.play();
    };

    // khi click pause
    btnPause.onclick = function () {
      audio.pause();
    };

    // khi click next
    btnNext.onclick = function () {
      _this.currentIndex++;
      if (_this.currentIndex >= _this.songs.length) _this.currentIndex = 0;
      _this.loadMusic();
      audio.play();
    };

    // khi click next
    btnPrev.onclick = function () {
      _this.currentIndex--;
      if (_this.currentIndex < 0) _this.currentIndex = _this.songs.length;
      _this.loadMusic();
      audio.play();
    };

    // audio run
    audio.onplay = function () {
      player.classList.add("playing");

      cdThumbAnimate.play();
    };

    // audio pause
    audio.onpause = function () {
      player.classList.remove("playing");

      cdThumbAnimate.pause();
    };

    // audio update
    audio.ontimeupdate = function () {
      const progressPercent = Math.floor(
        (audio.currentTime * 100) / audio.duration
      );
      progress.style.background = `linear-gradient(to right, var(--primary-color) ${progressPercent}% , var(--bg-color-2) 0%)`;

      if (!_this.progressStatus) progress.value = progressPercent;
    };

    //audio ended
    audio.onended = function () {
      btnNext.click();
    };

    // progress change
    progress.onchange = function () {
      const time = (progress.value * audio.duration) / 100;
      audio.currentTime = time;
    };

    progress.onmousedown = function () {
      _this.progressStatus = true;
    };
    progress.onmouseup = function () {
      _this.progressStatus = false;
    };
  },
  start: function () {
    this.handleEvent();

    this.loadMusic();
  },
};

app.start();
