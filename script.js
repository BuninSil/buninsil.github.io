  const songs = [
    {
      title: 'Hello',
      artist: 'Adele',
      src: 'path_to_song1.mp3', // Замените путь на фактический файл
      cover: 'http://static.stereogum.com/blogs.dir/2/files/2011/12/Adele-21.jpg'
    },
    {
      title: 'Californication',
      artist: 'Red Hot Chili Peppers',
      src: 'path_to_song2.mp3',
      cover: 'https://upload.wikimedia.org/wikipedia/en/d/df/RedHotChiliPeppersCalifornication.jpg'
    },
    {
      title: '6 INCH',
      artist: 'Beyoncé',
      src: 'path_to_song3.mp3',
      cover: 'http://images.rapgenius.com/59fc635f7dbe6b5cd1e07e5e605c96b5.640x640x1.jpg'
    },
    {
      title: 'Purple Rain',
      artist: 'Prince & The Revolution',
      src: 'path_to_song4.mp3',
      cover: 'http://djrichiep.us/wp-content/uploads/2014/06/princelgc7F.jpg'
    }
  ];

  let currentSongIndex = 0;
  const audio = new Audio(songs[currentSongIndex].src);
  const playBtn = document.querySelector('.controls .material-icons.play_arrow');
  const prevBtn = document.querySelector('.controls .material-icons.skip_previous');
  const nextBtn = document.querySelector('.controls .material-icons.skip_next');
  const title = document.querySelector('.title h3');
  const artist = document.querySelector('.small p');
  const progressBar = document.querySelector('.progress .played');
  const cover = document.querySelector('.cover');

  // Обновляем информацию о текущей песне
  function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.style.backgroundImage = `url(${song.cover})`;
  }

  // Воспроизведение/пауза
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = 'pause';
    } else {
      audio.pause();
      playBtn.textContent = 'play_arrow';
    }
  });

  // Предыдущая песня
  prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playBtn.textContent = 'pause';
  });

  // Следующая песня
  nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    audio.play();
    playBtn.textContent = 'pause';
  });

  // Обновление прогресса
  audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
  });

  // Автоматическое переключение на следующую песню
  audio.addEventListener('ended', () => {
    nextBtn.click();
  });

  // Загрузка первой песни при запуске
  loadSong(songs[currentSongIndex]);

