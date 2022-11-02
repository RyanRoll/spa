const title = 'Hello My電商'
const API_URL = 'http://localhost:8787/api'

$('.spa-menu__link').on('click', (event) => {
  event.preventDefault()
  const href = $(event.target).attr('href')
  changeUrlPath(href)
})

// popstate provided by JS
$(window).on('popstate', (event) => {
  console.log('popstate', event)
})

// create by us
$(window).on('locationchange', async (event) => {
  const url = event.detail.url
  switch (url) {
    case '/commodities': {
      const response = await fetch(`${API_URL}/commodities`, {
        method: 'get',
      })
      const data = await response.json()
      const content = data.commodities.reduce((result, item) => {
        return (
          result +
          `
          <li>
            <label>${item.name}</label>
            <button class="spa_item--addToCar" data-id="${item.id}">加到購物車</button>
            <br/>
            <br/>
          </li>
        `
        )
      }, '')
      $('#main').html(content)
      $(document).prop('title', `${title} - 商品`)
      break
    }
    case '/shoppingCarList': {
      $('#main').html('DEF Page')
      $(document).prop('title', `${title} - 購物車`)
      break
    }
    case '/user': {
      $('#main').html('GHI Page')
      $(document).prop('title', `${title} - 會員中心`)
      break
    }
    default: {
      //
    }
  }
})

$('#main').on('click', '.spa_item--addToCar', async (event) => {
  const $button = $(event.target)
  const id = $button.data('id')
  const response = await fetch(`${API_URL}/shoppingCarList`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
    }),
  })
  const data = await response.json()
  if (data.result === 'ok') {
    console.log('加入購物車成功!')
  }
})

const { history } = window
// const history  = window.history

const changeUrlPath = (url, data) => {
  const historyData = {
    ...data,
    url,
  }
  history.pushState(historyData, '', url)
  const event = new CustomEvent('locationchange', { detail: historyData })
  window.dispatchEvent(event)
}

$('#spa-back').on('click', () => {
  history.back()
})

$(document).ready(() => {
  changeUrlPath(location.pathname)
})
