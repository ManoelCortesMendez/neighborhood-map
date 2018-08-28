import React, { Component } from 'react'

class CityMap extends Component {

  componentDidMount = () => {
    window.initMap = this.initMap
    this.loadMapsAPI()
  }

  loadMapsAPI = () => {
    const loadMapsAPIScript = document.createElement('script')
    loadMapsAPIScript.async = true
    loadMapsAPIScript.defer = true
    loadMapsAPIScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCKOrRrF3ns0-jL1xgBPMVXVnqE-wzrfLw&callback=initMap'
    document.body.appendChild(loadMapsAPIScript)
  }

  createMap = () => {
    const newMap = new window.google.maps.Map(this.refs.map, {
      center: {lat: 51.502491, lng: -0.10031},
      zoom: 13
    })

    this.props.onMapSet(newMap)
  }

  createMarker = locationIndex => {
    const newMarker = new window.google.maps.Marker({
      map: this.props.map,
      position: this.props.locations[locationIndex].latlng,
      title: this.props.locations[locationIndex].name
    })

    this.props.onMarkerSet(newMarker, locationIndex)
  }

  createInfoWindow = locationIndex => {
    const newInfoWindow = new window.google.maps.InfoWindow({
      content: this.props.locations[locationIndex].name
    })

    this.props.onInfoWindowSet(newInfoWindow, locationIndex)
  }

  initMap = () => {
    this.createMap()

    // I only needed the locationIndex, but for...in didn't work here
    this.props.locations.forEach((_location, locationIndex) => {
      this.createMarker(locationIndex)
      this.createInfoWindow(locationIndex)
      this.props.onInfoWindowToMarkerBind(locationIndex)
    })

  }

  render = () => (
    <div className='CityMap'>
      <div ref='map' className='CityMap-map'></div>
    </div>
  )
}

export default CityMap
