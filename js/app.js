let CARS = JSON.parse(DATA)
const cardListEl = document.getElementById('cardList')
const sortSelectEl = document.getElementById('sortSelect')
const masonryBtnsEl = document.getElementById('masonryBtns')





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
masonryBtnsEl.addEventListener('click', event => {
  const btnEl = event.target.closest('.btn')
  if (btnEl) {
    const view = btnEl.dataset.view
    if (view == '1') {
      cardListEl.classList.remove('row-cols-2')
      cardListEl.classList.add('row-cols-1')
    } else if (view == '2'){
      cardListEl.classList.remove('row-cols-1')
      cardListEl.classList.add('row-cols-2')
    }
    btnEl.classList.remove('btn-secondary')
    btnEl.classList.add('btn-success')
    findSiblings(btnEl).forEach(sibling => {
      sibling.classList.remove('btn-success')
      sibling.classList.add('btn-secondary')
    })
  }
})

sortSelectEl.addEventListener('change', function (event) {
  let [key, type] = this.value.split('-')
  if (type == 'ab') {
    CARS.sort((a,b) => {
      if (typeof a[key] === 'string') {
        return a[key].localeCompare(b[key])
      } else if (typeof a[key] === 'number' || typeof a[key] === 'boolean') {
        return a[key] - b[key]
      }
    })
  } else if(type == 'ba'){
    CARS.sort((a,b) => {
      if (typeof b[key] === 'string') {
        return b[key].localeCompare(a[key])
      } else if (typeof b[key] === 'number' || typeof b[key] === 'boolean') {
        return b[key] - a[key]
      }
    })
  }
  renderCards(CARS, cardListEl)
})

renderCards(CARS, cardListEl)

function renderCards(dataArray, DOMelement) {
    let html = ''
    dataArray.forEach(car => {
        html += createCard(car)
    });
    DOMelement.innerHTML = html
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
      <div class="col-4 card-img-wrap position-relative">
      ${data.top ? `<div class="card-top bg-success text-light">TOP</div>` : ''}
        <img src="${data.img}" alt="${data.make} ${data.model}" class="card-img" width="1" height="1" loading="lazy" />
      </div>
      <div class="col-8 card-body-wrap">
        <div class="card-body">
          <h3 class="card-title">${data.make} ${data.model} ${data.engine_volume} (${data.year})</h3>
          <h4 class="card-price">${data.price}$</h4>
          <ul class="info-block">
            <li title="car mileage"><i class="fas fa-tachometer-alt" ></i>${data.odo} km</li>
            <li title="location"><i class="fas fa-map-marker-alt" ></i>${data.country}</li>
            <li title="engine information"><i class="fas fa-gas-pump"></i>${data.fuel} ${data.engine_volume} L</li>
            <li title="transmission type"><i class="fas fa-cogs"></i>${data.transmission}</li>
          </ul>
          <h5 class="card-rating text-warning"> ${starIcons}</h5>
          <ul class="addition-info d-flex justify-content-between mt-3">
            <li><i class="fas fa-road"></i>${data.consume.road} L/km</li>
            <li><i class="fas fa-city"></i>${data.consume.city} L/km</li>
            <li><i class="fas fa-car-side"></i>${data.consume.mixed} L/km</li>
          </ul>
          ${data.vin ? `<p class="card-vin ${data.vin_check ? 'text-success' : 'text-warning'}">${data.vin_check ? `<i class="fas fa-check me-2"></i>` : `<i class="fas fa-times me-2"></i>`}${data.vin}</p>` : `<p class="card-vin">Продавець не надав VIN код!</p>`}
          <div class=" d-flex justify-content-between">
            <a href="tel:${data.phone}" class="btn btn-success call-btn">Call</a>
            <div class="selection-buttons">
              <i class="far fa-star"></i>
              <i class="fas fa-balance-scale"></i>
            </div> 
          </div>
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

//Utils
function findSiblings(DOMelement) {
  // const parent = DOMelement.parentElement
  // const children = parent.children
  // const siblings = Array.from(children).filter(child => child != DOMelement)
  // return siblings
  return Array.from(DOMelement.parentElement.children).filter(child => child != DOMelement)
}

