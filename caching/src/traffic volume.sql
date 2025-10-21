SELECT endpoint, COUNT(*) AS request_count, AVG(response_time_ms) AS avg_response_time
FROM access_logs
WHERE request_time >= NOW() - INTERVAL 1 DAY
GROUP BY endpoint
ORDER BY request_count DESC
LIMIT 10;
