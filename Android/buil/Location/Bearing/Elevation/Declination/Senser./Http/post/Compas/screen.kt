public lateinit var sensorManager: SensorManager
public var deviceAzimuth = 0f

public val sensorListener = object : SensorEventListener {
    override fun onSensorChanged(e: SensorEvent) {
        val rotation = FloatArray(9)
        val orientation = FloatArray(3)

        SensorManager.getRotationMatrixFromVector(rotation, e.values)
        SensorManager.getOrientation(rotation, orientation)

        deviceAzimuth = Math.toDegrees(orientation[0].toDouble()).toFloat()
    }
    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}
}

public fun startCompass() {
    sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
    val sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ROTATION_VECTOR)
    sensorManager.registerListener(sensorListener, sensor, SensorManager.SENSOR_DELAY_UI)
}
