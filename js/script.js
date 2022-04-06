$("#button-search").on("click", function () {
  movieSearch();
});
$("#input-search").on("keyup", function (e) {
  if (e.keyCode == 13) {
    movieSearch();
  }
});

function movieSearch() {
  $("#movie-list").html(
    `<img src="img/loader.gif" alt="loader" class="loader-gif d-none mx-auto position-absolute top-0" />`
  );
  $(".loader-gif").removeClass("d-none");
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
      $("#input-search").val("");
      $("#movie-list").html(
        `<img src="img/loader.gif" alt="loader" class="loader-gif d-none mx-auto position-absolute top-0" />`
      );
      $("#movie-list .loader-gif").hide();
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
              <a href="#" class="card-link" id="see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See Detail</a>
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

$("#movie-list").on("click", ".card-link", function () {
  $.getJSON("https://www.omdbapi.com/?apikey=6364b8a7&i=" + $(this).data("id"), function (data) {
    $(".modal-body").html(
      `
    <div class="container">
        <div class="row justify-content-between">
        <div class="col-lg-3">
            <img src="` +
        data.Poster +
        `" alt="Movie Photos" style="width: 18rem; height:18rem;" class="mb-3 mx-auto d-block"/>
        </div>
        <div class="col-lg-7">
            <ul class="list-group">
                    <li class="list-group-item"><b>Judul : </b>` +
        data.Title +
        ` </li>
                    <li class="list-group-item"><b>Language : </b> ` +
        data.Language +
        ` </li>
                    <li class="list-group-item"><b>Actor : </b>` +
        data.Actors +
        ` </li>
                    <li class="list-group-item"><b>Director : </b>` +
        data.Director +
        ` </li>
                    <li class="list-group-item"><b>Genre : </b>` +
        data.Genre +
        ` </li>
                    <li class="list-group-item"><b>Realesed : </b>` +
        data.Released +
        ` </li>
            </ul>
        </div>
        </div>
    </div>

    `
    );
    // console.log(data);
  });
});
