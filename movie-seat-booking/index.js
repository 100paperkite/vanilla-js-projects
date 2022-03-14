const $ = (selector) => document.querySelector(selector);

const getMovies = async () =>
  await fetch('./sample-movies.json').then((response) => response.json());

const row = (leftCount, centerCount, rightCount) => {
  const seatTemplate = '<div class="seat"></div>';
  const seatZoneTemplate = (seats) => `<div class="zone">${seats}</div>`;

  const leftSeats = seatZoneTemplate(seatTemplate.repeat(leftCount));
  const centerSeats = seatZoneTemplate(seatTemplate.repeat(centerCount));
  const rightSeats = seatZoneTemplate(seatTemplate.repeat(rightCount));

  return `<div class="row">${[leftSeats, centerSeats, rightSeats].join('')}</div>`;
};

class App {
  constructor() {
    this.movies = [];
    this.initSeats(10, { leftCount: 3, centerCount: 8, rightCount: 3 });
    this.initEventListeners();
  }

  initSeats(rowCount, { leftCount, centerCount, rightCount }) {
    const template = row(leftCount, centerCount, rightCount).repeat(rowCount);
    $('#seats').insertAdjacentHTML('beforeend', template);
  }

  async loadMovies() {
    this.movies = await getMovies();

    const template = this.movies
      .map((movie) => {
        return `<option>${movie.title}</option>`;
      })
      .join('');
    $('#movie-select').insertAdjacentHTML('beforeend', template);
  }

  initEventListeners() {
    const seats = $('#seats');
    seats.addEventListener('click', (e) => {
      if (e.target.classList.contains('seat')) {
        e.target.classList.toggle('selected');
      }
    });
  }
}

const app = new App();
await app.loadMovies();
