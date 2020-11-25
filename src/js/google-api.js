class GoogleApi {

    // note here which instance variables I'm using
    myMap = null;
    myInfoWindow = null;
    markers = [];

    constructor() {
        console.log('GoogleApi()')
        this.setupListeners()
    }
    setupListeners() {
        document.addEventListener('place-search', this.handlePlaceSearch)
    }

    handlePlaceSearch = (theEvent) => {
        console.log('got a place search request', theEvent)

        const service = new google.maps.places.PlacesService(this.myMap);



        const details = theEvent.detail
        const request = {
            query: details['query'],
            bounds: this.myMap.getBounds()
            // location: details['location'],
            // radius: 10000

        }
        service.textSearch(request, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('got results', results)

                // clear any previous markers
                this.clearMarkers()

                const newEvent = new CustomEvent('place-results', {detail: results})
                document.dispatchEvent(newEvent)

                for (let place of results) {
                    let geo = place.geometry.location
                    let title = place.name
                    let content = `<h2>${place.name}</h2>` + `<h2>${place.formatted_address}</h2>` + `<h2>${place.rating} ⭐</h2>`


                    this.addMarker(geo, { title: title, content: content})
                }
            }
        })
    }

    clearMarkers() {
        this.markers.forEach(marker => {
            marker.setMap(null)
        })
        this.markers = []
    }

    setup() {
        console.log('setting up a map')
    
        const mbStadium = { lat: 33.7555, lng: -84.4010 };
        this.myMap = new google.maps.Map(document.getElementById('my-map'), {
            center: mbStadium,
            zoom: 15
        })


       this.myInfoWindow = new google.maps.InfoWindow({
            content: '',
            maxWidth: 200,
        })

        this.addMarker(mbStadium, {title: "Mercedes-Benz Stadium", content: '<h2>Mercedes-Benz Stadium</h2>'})
    }

    // info will be an object with various bits of info
    addMarker(position, info) {
        const marker = new google.maps.Marker({
            map: this.myMap,
            position: position,
            title: info['title'],
    

        }) 

        this.markers.push(marker)
      

        
        marker.addListener('click', () => {
            this.myInfoWindow.setContent(info['content'])
            this.myInfoWindow.open(this.myMap, marker)
        })
    }
}
