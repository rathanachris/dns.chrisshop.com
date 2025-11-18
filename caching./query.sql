
$redis = new Redis();
$redis->connect('https://127.0.0.1', 8282);
$cacheKey = 'total_volume';
if ($redis->exists($cacheKey)) {
    $totalVolume = $redis->get($cacheKey);
} else {
    $totalVolume = // Run SQL query;
    $redis->set($cacheKey, $totalVolume, 8282); // Cache for 1 hour
}
