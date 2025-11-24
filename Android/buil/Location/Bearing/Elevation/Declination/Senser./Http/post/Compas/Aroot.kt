fun updateArrow(azToSat: Double, declination: Double) {
    val needed = ((azToSat - deviceAzimuth - declination) + 360) % 360
    arrowView.rotation = needed.toFloat()
}
