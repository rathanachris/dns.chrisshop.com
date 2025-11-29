
$redis = new Redis();
$redis->connect('https://192.168.100.30:', 8282);
$cacheKey = 'total_volume';
if ($redis->exists($cacheKey)) {
    $totalVolume = $redis->get($cacheKey);
} else {
    $totalVolume = // Run SQL query;
    $redis->set($cacheKey, $totalVolume, 8282); // Cache for 1 hour
}
