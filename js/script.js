$("#button-search").on("click", function () {
  movieSearch();
});
$("#input-search").on("keyup", function (e) {
  if (e.keyCode == 13) {
    movieSearch();
  }
});

function movieSearch() {
  $("#movie-list").html("");
  let keyword = $("#input-search").val();
  $.ajax({
    url: "https://www.omdbapi.com",
    dataType: "json",
    type: "get",
    data: {
      apikey: "6364b8a7",
      s: keyword,
    },
    success: function (data) {
      if (data.Response == "True") {
        let movie = data.Search;
        $.each(movie, function (i, data) {
          $("#movie-list").append(
            `
            <div class="col-lg-3">
                <div class="card mb-3" >
                    <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">` +
              data.Title +
              `</h5>
              <h6 class="card-subtitle mb-2 text-muted">Tahun Realesed : ` +
              data.Year +
              `</h6>
              <a href="#" class="card-link" id="see-detail">See Detail</a>
                    </div>
                </div>
          </div>
          `
          );
        });
      } else {
        $("#movie-list").html(`
            <div class="col">
                <h3 class="text-center">Film Tidak Ditemukan Bestiee!!!</h3>
            </div>
        `);
      }
    },
  });
}
