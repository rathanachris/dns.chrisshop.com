class MainActivity : AppCompatActivity() {

    private lateinit var fused: FusedLocationProviderClient

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        fused = LocationServices.getFusedLocationProviderClient(this)

        requestPermission.launch(Manifest.permission.ACCESS_FINE_LOCATION)
    }

    private val requestPermission =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { ok ->
            if (ok) getGps()
            else Toast.makeText(this, "GPS required", Toast.LENGTH_SHORT).show()
        }

    @SuppressLint("MissingPermission")
    private fun getGps() {
        fused.getCurrentLocation(
            Priority.PRIORITY_HIGH_ACCURACY, null
        ).addOnSuccessListener { loc ->
            if (loc != null) calcSatellite(loc)
        }
    }
