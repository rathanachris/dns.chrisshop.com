import android.Manifest
import android.annotation.SuppressLint
import android.location.GeomagneticField
import android.location.Location
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.location.FusedLocationProviderClient
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority
import kotlin.math.*

class MainActivity : AppCompatActivity() {

    private lateinit var fused: FusedLocationProviderClient

    private lateinit var txtAzimuth: TextView
    private lateinit var txtElevation: TextView
    private lateinit var txtDeclination: TextView

    private val requestPermission =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { ok ->
            if (ok) getGps()
            else Toast.makeText(this, "GPS permission needed", Toast.LENGTH_LONG).show()
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        txtAzimuth = findViewById(R.id.txtAzimuth)
        txtElevation = findViewById(R.id.txtElevation)
        txtDeclination = findViewById(R.id.txtDeclination)

        fused = LocationServices.getFusedLocationProviderClient(this)

        requestPermission.launch(Manifest.permission.ACCESS_FINE_LOCATION)
    }

    @SuppressLint("MissingPermission")
    private fun getGps() {
        fused.getCurrentLocation(Priority.PRIORITY_HIGH_ACCURACY, null)
            .addOnSuccessListener { loc ->
                if (loc != null) calcSatellite(loc)
            }
    }

    private fun calcSatellite(loc: Location) {
        val lat = loc.latitude
        val lon = loc.longitude
        val alt = loc.altitude

        val satLon = 19.2  // Astra 19.2E (example)

        val geo = GeomagneticField(
            lat.toFloat(), lon.toFloat(), alt.toFloat(), System.currentTimeMillis()
        )
        val declination = geo.declination.toDouble()

        val sat = Location("sat").apply {
            latitude = 0.0
            longitude = satLon
        }
        val azimuth = loc.bearingTo(sat).toDouble()

        val elevation = computeElevation(lat, lon, satLon)

        showResult(azimuth, elevation, declination)
    }

    private fun computeElevation(latDeg: Double, lonDeg: Double, satLon: Double): Double {
        val Re = 6378.137
        val h = 35786.0
        val Rs = Re + h

        val lat = Math.toRadians(latDeg)
        val dLon = Math.toRadians(satLon - lonDeg)

        val cosc = cos(lat) * cos(dLon)
        val el = atan2(Rs * cosc - Re, Rs * sqrt(1 - cosc * cosc))
        return Math.toDegrees(el)
    }

    private fun showResult(az: Double, el: Double, dec: Double) {
        txtAzimuth.text = "Azimuth: ${"%.1f".format(az)}°"
        txtElevation.text = "Elevation: ${"%.1f".format(el)}°"
        txtDeclination.text = "Declination: ${"%.1f".format(dec)}°"
    }
}
