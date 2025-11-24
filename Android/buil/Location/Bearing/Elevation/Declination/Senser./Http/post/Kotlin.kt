interface Api {
  @GET("satellites/list")
  suspend fun getSatList(): List<Satellite>
  @POST("satellites/save")
  suspend fun saveList(@Body list: List<Satellite>): Response<Unit>
}
