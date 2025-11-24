private fun calcSatellite(loc: Location) {
    val lat = loc.latitude
    val lon = loc.longitude
    val alt = loc.altitude

    val satLon = 19.2   // example: Astra 19.2°E

    // Declination
    val geo = GeomagneticField(lat.toFloat(), lon.toFloat(), alt.toFloat(), System.currentTimeMillis())
    val declination = geo.declination.toDouble()

    // Azimuth (bearing)
    val sat = Location("sat").apply {
        latitude = 0.0
        longitude = satLon
    }
    val azimuth = loc.bearingTo(sat).toDouble()

    // Elevation (geostationary formula)
    val elevation = computeElevation(lat, lon, satLon)

    // 👉 send to UI
    showResult(azimuth, elevation, declination)
}
