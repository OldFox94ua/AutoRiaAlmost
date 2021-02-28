
let CARS = JSON.parse(DATA)
console.log(CARS.length)
const cardListEl = document.getElementById('cardList')
const sortSelectEl = document.getElementById('sortSelect')
const masonryBtnsEl = document.getElementById('masonryBtns')
const searchFormEl = document.getElementById('searchForm')
const moreBtnEl = document.getElementById('moreBtn')
const filterFormEl= document.getElementById('filterForm')
const filterFields = ['make','rating', 'fuel', 'transmission', 'color']



renderCards(CARS, cardListEl)
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



{/* <fieldset class="mb-3">
              <legend>Fuel</legend>
              <div class="fieldset-group d-flex flex-column">
                <label>
                  <input type="checkbox" name="fuel" value="Benzin">
                  Benzin
                </label>
                <label>
                  <input type="checkbox" name="fuel" value="Diesel">
                  Diesel
                </label>
                <label>
                  <input type="checkbox" name="fuel" value="Propan">
                  Propan
                </label>
              </div>
            </fieldset> */}


filterFormEl.addEventListener('submit', function (event) {
  event.preventDefault()

  const query = []
  filterFields.forEach(field => {
    const values = []
    Array.from(this[field]).forEach(input => {
        if (input.checked) {
          values.push(input.value)
        }
    })
    query.push(values)
  })

  console.log(query);

  CARS = JSON.parse(DATA).filter(car => {
    return query.every((values, i) => {
      return values.length == 0 ? true : values.includes(`${car[filterFields[i]]}`)
    })
  })
  console.log(CARS);
  renderCards(CARS, cardListEl, true)

})

renderFilterForm(filterFields, filterFormEl, CARS)

function renderFilterForm(fields, formEl, cars) {
  let formHtml = ''
  
  fields.forEach(field => {
    const values = new Set(cars.map(car => car[field]).sort())
    formHtml += createFilterFieldset(field, values)
  })

  formEl.insertAdjacentHTML('afterBegin', formHtml)
}

function createFilterFieldset(field, values) {
  let inputsHtml = ''

  values.forEach(value => inputsHtml += createFilterCheckbox(field, value))

  return `<fieldset class="mb-3">
  <legend>${field}</legend>
  <div class="fieldset-group d-flex flex-column">
    ${inputsHtml}
  </div>
</fieldset>`
}

function createFilterCheckbox(key, value) {
  return `<label>
  <input type="checkbox" name="${key}" value="${value}">
  ${value}
</label>`
}











moreBtnEl.addEventListener('click', event => {
  renderCards(CARS, cardListEl)
})

searchFormEl.addEventListener('submit', function (event) {
  event.preventDefault()

  console.time('search-time ->>>');
  const searchFields = ['make', 'model', 'year']
  const query = this.search.value.trim().toLowerCase().split(' ').filter(word => word.length > 1)
  CARS = JSON.parse(DATA).filter(car => {
    return query.every(word => {
      return searchFields.some(field => {
        return `${car[field]}`.trim().toLowerCase().includes(word)
      })
    })
  })
  console.timeEnd('search-time ->>>');
  console.log(CARS);
  renderCards(CARS, cardListEl, true)
})






masonryBtnsEl.addEventListener('click', event => {
  const btnEl = event.target.closest('.btn')
  if (btnEl) {
    const view = btnEl.dataset.view
    if (view == '1') {
      cardListEl.classList.remove('row-cols-2')
      cardListEl.classList.add('row-cols-1')
    } else if (view == '2') {
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
    CARS.sort((a, b) => {
      if (typeof a[key] === 'string') {
        return a[key].localeCompare(b[key])
      } else if (typeof a[key] === 'number' || typeof a[key] === 'boolean') {
        return a[key] - b[key]
      }
    })
  } else if (type == 'ba') {
    CARS.sort((a, b) => {
      if (typeof b[key] === 'string') {
        return b[key].localeCompare(a[key])
      } else if (typeof b[key] === 'number' || typeof b[key] === 'boolean') {
        return b[key] - a[key]
      }
    })
  }
  renderCards(CARS, cardListEl, true)
})



function renderCards(dataArray, DOMelement, clear) {
  moreBtnEl.classList.remove('d-none')
  const count = 10
  if (clear) {
    DOMelement.innerHTML = ''
  }
  const length = DOMelement.children.length
  let html = ''
  if (dataArray.length > 0) {
    for (let i = 0; i < count; i++) {
      const car = dataArray[length + i]
      if (!car) {
        moreBtnEl.classList.add('d-none')
        break
      }
      html += createCard(car)
    }
  } else{
    html = `<h3 class="text-center text-danger">No cars :((</h3>`
  }

  DOMelement.insertAdjacentHTML('beforeend', html)
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

