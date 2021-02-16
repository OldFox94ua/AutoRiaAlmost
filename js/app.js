let CARS = JSON.parse(DATA)
const cardListEl = document.getElementById('cardList')



// {
//     "id": "89aed5b8c686ebd713a62873e4cd756abab7a106",
//     "make": "BMW",
//     "model": "M3",
//     "year": 2010,
//     "img": "http://dummyimage.com/153x232.jpg/cc0000/ffffff",
//     "color": "Goldenrod",
//     "vin": "1G6DW677550624991",
//     "country": "United States",
//     "rating": 1.5,
//     "price": 2269,
//     "views": 5,
//     "seller": "Ellery Girardin",
//     "vin_check": true,
//     "top": false,
//     "timestamp": 1601652988000,
//     "phone": "+1 (229) 999-8553",
//     "fuel": "Benzin",
//     "engine_volume": 1.4,
//     "transmission": "CVT",
//     "odo": 394036,
//     "consume": { "road": 4.8, "city": 12.3, "mixed": 8.4 }
//   }



renderCards(CARS, cardListEl)

function renderCards(dataArray, DOMelement) {
    dataArray.forEach(car => {
        let html = createCard(car)
        DOMelement.insertAdjacentHTML('beforeEnd', html)
    });
}

function createCard(data) {
    let starIcons = ''
    for (let i = 0; i < 5; i++) {
        if (i < data.rating) {
            starIcons += '<i class="fas fa-star"></i>'
        } else {
            starIcons += '<i class="far fa-star"></i>'
        }
    }

    return `<div class="col card mb-3">
    <div class="row g-0">
      <div class="col-4 position-relative">
      ${data.top ? `<div class="card-top bg-success text-light">TOP</div>` : ''}
        <img src="${data.img}" alt="${data.make} ${data.model}" class="card-img" width="1" height="1" loading="lazy" />
      </div>
      <div class="col-8">
        <div class="card-body">
          <h3 class="card-title">${data.make} ${data.model} ${data.engine_volume} (${data.year})</h3>
          <h4 class="card-price">${data.price}$</h4>
          <ul class="info-block">
            <li><i class="fas fa-tachometer-alt"></i>${data.odo}km</li>
            <li><i class="fas fa-map-marker-alt"></i>${data.country}</li>
            <li><i class="fas fa-gas-pump me-10"></i>${data.fuel} ${data.engine_volume}L</li>
            <li><i class="fas fa-cogs"></i>${data.transmission}</li>
          </ul>
          <h5 class="card-rating text-warning"> ${starIcons} ${data.rating}</h5>
          ${data.vin ? `<p class="card-vin ${data.vin_check ? 'text-success' : 'text-warning'}">${data.vin_check ? `<i class="fas fa-check me-2"></i>` : `<i class="fas fa-times me-2"></i>`}${data.vin}</p>` : `<p class="card-vin">Продавець не надав VIN код!</p>`}
          <a href="tel:${data.phone}" class="btn btn-success call-btn">Call</a>
        </div>
      </div>
      <div class="col-12 card-footer text-muted">
        <p class="card-text d-flex justify-content-between">
          <small class="text-muted card-time"><i class="far fa-clock me-2"></i>${data.timestamp}</small>
          <small class="text-muted card-views"><i class="far fa-eye me-2"></i>${data.views}</small>
        </p>
      </div>
    </div>
  </div>`
}

