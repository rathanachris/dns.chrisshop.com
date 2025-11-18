// MainActivity.kt (Kotlin)
import android.Manifest
import android.annotation.SuppressLint
import android.location.GeomagneticField
import android.location.Location
import android.os.Bundle
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import kotlin.math.*

class MainActivity : AppCompatActivity() {
    private lateinit var fused: FusedLocationProviderClient

    // example satellite longitude (e.g. Astra 19.2E -> 19.2)
    private val satelliteLongitudeDeg = 19.2

    private val requestPermission =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { granted ->
            if (granted) startGetLocation()
            else {/* show message to user */}
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // setContentView(R.layout.activity_main)
        fused = LocationServices.getFusedLocationProviderClient(this)
        requestPermission.launch(Manifest.permission.ACCESS_FINE_LOCATION)
    }

    @SuppressLint("MissingPermission")
    private fun startGetLocation() {
        // One-shot current location (can also use requestLocationUpdates)
        fused.lastLocation.addOnSuccessListener { location: Location? ->
            if (location != null) {
                handleLocation(location)
            } else {
                // fallback: requestCurrentLocation or location updates
                fused.getCurrentLocation(
                    com.google.android.gms.location.Priority.PRIORITY_HIGH_ACCURACY, null
                ).addOnSuccessListener { loc -> if (loc!=null) handleLocation(loc) }
            }
        }
    }

    private fun handleLocation(loc: Location) {
        val lat = loc.latitude
        val lon = loc.longitude
        val accuracy = loc.accuracy // meters
        val altitude = loc.altitude // meters (may be 0 if unavailable)

        // 1) Declination (geomagnetic)
        val geo = GeomagneticField(
            (lat).toFloat(),
            (lon).toFloat(),
            (altitude).toFloat(),
            System.currentTimeMillis()
        )
        val declinationDeg = geo.declination.toDouble() // degrees

        // 2) Azimuth (bearing) to sub-satellite point (sat lat=0, sat lon=satelliteLongitudeDeg)
        val satLat = 0.0
        val satLon = satelliteLongitudeDeg
        val satLocation = Location("sat").apply {
            latitude = satLat
            longitude = satLon
        }
        val azToSat = loc.bearingTo(satLocation).toDouble() // degrees, 0=north clockwise

        // 3) Elevation (approx formula for geostationary)
        val elevationDeg = computeElevationToGeostationary(lat, lon, satLon)

        // Now you can update UI with lat, lon, accuracy, declination, azToSat, elevationDeg
        // e.g., show arrow rotated to (azToSat - deviceAzimuth - declination)
    }

    // Approx formula used by many sat-apps:
    private fun computeElevationToGeostationary(userLatDeg: Double, userLonDeg: Double, satLonDeg: Double): Double {
        val Re = 6378.137 // earth radius km
        val h = 35786.0  // geostationary altitude km
        val Rs = Re + h

        val phi = Math.toRadians(userLatDeg)
        val deltaLon = Math.toRadians(satLonDeg - userLonDeg)

        val cosc = cos(phi) * cos(deltaLon)
        val numerator = Rs * cosc - Re
        val denom = Rs * sqrt(1.0 - cosc * cosc)
        val elevationRad = atan2(numerator, denom)
        return Math.toDegrees(elevationRad)
    }
}
