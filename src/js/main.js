class Main {
    constructor() {
        this.setupListeners()

        window.gmap = new GoogleApi()
    }

    setupListeners() {
        var $form = document.querySelector('#place-search')
        $form.addEventListener('submit', this.handleSearch)
        document.addEventListener('got-results', this.handleSearchResults)
        // document.addEventListener('place-results', this.handleSearchResults)
    }

    handleSearch(theEvent) {
        theEvent.preventDefault()
    
        var query = document.querySelector('[name="query"]').value
        var location = document.querySelector('[name="location"]').value
    
        console.log('searching for ', query)
       

        const yelpApi = new YelpApi()
        if (query && location === '') {
            alert('Please enter a keyword')
        } else {
            yelpApi.businessSearch({
                term: query,
                location: location,
            })
        }

    
        var customEvent = new CustomEvent('place-search', {detail : {query: query, location: location}})
        document.dispatchEvent(customEvent)
    }

    handleSearchResults = (theEvent) => {
        //show list or grid of results below the map
        const results = theEvent.detail
        const resultsUl = document.querySelector('.results-grid')
        resultsUl.textContent = ''
    

        for (let r in results) {
            const resultInfo = results[r]
           

            const resultEl = document.createElement('li')
            resultsUl.appendChild(resultEl)

            const resultDiv = document.createElement('div')
            resultDiv.setAttribute('class', 'result-div')
            resultEl.appendChild(resultDiv)

            const dataDiv = document.createElement('div')
            dataDiv.setAttribute('class', 'info-box')
            resultDiv.appendChild(dataDiv)

            const nameDiv = document.createElement('div')
            nameDiv.setAttribute('class', 'name-box')
            dataDiv.appendChild(nameDiv)

            const categoryDiv = document.createElement('div')
            categoryDiv.setAttribute('class', 'category-div')
            dataDiv.appendChild(categoryDiv)

            const statsDiv = document.createElement('div')
            statsDiv.setAttribute('class', 'stats-div')
            dataDiv.appendChild(statsDiv)

            const imgDiv = document.createElement('div')
            imgDiv.setAttribute('class', 'img-div')
            resultDiv.appendChild(imgDiv)

            const imgEl = document.createElement('img')
            imgEl.setAttribute('src', resultInfo.image_url)
            imgDiv.appendChild(imgEl)

            const nameEl = document.createElement('h2')
            nameDiv.appendChild(nameEl)
            nameEl.textContent = resultInfo.name

            const ratingEl = document.createElement('span')
            statsDiv.appendChild(ratingEl)
            ratingEl.setAttribute('class', 'rating-el')
            ratingEl.textContent = resultInfo.rating + ' ⭐'

            const addressEl = document.createElement('span')
            dataDiv.appendChild(addressEl)
            addressEl.setAttribute('class', 'address-el')
            addressEl.textContent = resultInfo.location.display_address

            const phoneEl = document.createElement('span');
			dataDiv.appendChild(phoneEl);
			phoneEl.textContent = resultInfo.display_phone;

        }


    }
}



new Main()