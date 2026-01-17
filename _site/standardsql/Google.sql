#standardSQL
-- Takes a struct of x, y, and z and returns a struct with a new field foo.
CREATE TEMPORARY FUNCTION AddField(s STRUCT<x FLOAT64, y BOOL, z STRING>)
  RETURNS STRUCT<x FLOAT64, y BOOL, z STRING, foo STRING> LANGUAGE js AS """
var new_struct = new Object();
new_struct.x = s.x;
new_struct.y = s.y;
new_struct.z = s.z;
if (s.y) {
  new_struct.foo = 'bar';
} else {
  new_struct.foo = 'baz';
}

return new_struct;
""";

WITH T AS (
  SELECT x, MOD(off, 2) = 0 AS y, CAST(x AS STRING) AS z
  FROM UNNEST([5.0, 4.0, 3.0, 2.0, 1.0]) AS x WITH OFFSET off
)
SELECT AddField(t).*
FROM T AS t;