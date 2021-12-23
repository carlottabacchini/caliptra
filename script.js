// SLIDER
const swiper = new Swiper('.swiper-container', {
  centeredSlides: true,
  loop: false,
  speed: 500,
  slidesPerView: 1.5,
  spaceBetween: 40,
  slideToClickedSlide: true,
  grabCursor: true,
});

// PRELOADER
var progress = 0;
document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
    var allElement = $("*");
    var length = allElement.length;
    for (var i = 0; i < length; i++) {
      set_element(allElement[i], length)
    }
  }
}

function set_element(element, totalElement) {
  var percetage = 100 / totalElement;
  if ($(element).length == 1) {
    var tot = progress + percetage
    $('#loaderFill').animate({
      width: tot + "%"
    }, 1.5, function() {
      $("#loaderText").html(Math.round(tot) + "%")
      $("#loaderText").css("margin-left", "calc(" + tot + "% - 10px)")

      if (tot >= 99) {
        $("#loaderText").html("100%")
      }
    });
    progress = progress + percetage;

  }
}

// MAPBOX
mapboxgl.accessToken = 'pk.eyJ1Ijoib3R0YWI5OCIsImEiOiJjanh4NDF4bW8wa2dhM2JrOWF1Zmdmc2hhIn0.laR8OsN_RveET11YiK09MA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ottab98/ckubgdqz406jq18mqyy85qni0',
  center: [9.187917709350586, 45.4860116022679],
  zoom: 12.50,
  attributionControl: false
});

var tracce = false;
var orto

var nuoviMarker

map.scrollZoom.disable();

map.once('idle', function() {

  $.getJSON('orti.geojson', function(geojson) {
    for (const feature of geojson.features) {
      const el = document.createElement('div');
      el.className = 'marker';
      el.id = feature.properties.title;

      new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
    }

    setTimeout(function() {

      map.addSource('IPV', {
        type: 'geojson',
        data: 'IPV.geojson'
      });

      map.addLayer({
        'id': 'IPVarea',
        'type': 'fill',
        'source': 'IPV',
        'layout': {},
        'paint': {
          'fill-color': '#236b6c',
          'fill-opacity': 1
        }
      });

      map.addSource('OVP', {
        type: 'geojson',
        data: 'OVP.geojson'
      });

      map.addLayer({
        'id': 'OVParea',
        'type': 'fill',
        'source': 'OVP',
        'layout': {},
        'paint': {
          'fill-color': '#236b6c',
          'fill-opacity': 1
        }
      });

      map.addSource('CGN', {
        type: 'geojson',
        data: 'CGN.geojson'
      });

      map.addLayer({
        'id': 'CGNarea',
        'type': 'fill',
        'source': 'CGN',
        'layout': {},
        'paint': {
          'fill-color': '#236b6c',
          'fill-opacity': 1
        }
      });

      map.addSource('GDA', {
        type: 'geojson',
        data: 'GDA.geojson'
      });

      map.addLayer({
        'id': 'GDAarea',
        'type': 'fill',
        'source': 'GDA',
        'layout': {},
        'paint': {
          'fill-color': '#236b6c',
          'fill-opacity': 1
        }
      });

      map.addSource('GDS', {
        type: 'geojson',
        data: 'GDS.geojson'
      });

      map.addLayer({
        'id': 'GDSarea',
        'type': 'fill',
        'source': 'GDS',
        'layout': {},
        'paint': {
          'fill-color': '#236b6c',
          'fill-opacity': 1
        }
      });

      map.addSource('STR', {
        type: 'geojson',
        data: 'STR.geojson'
      });

      map.addLayer({
        'id': 'STRarea',
        'type': 'fill',
        'source': 'STR',
        'layout': {},
        'paint': {
          'fill-color': '#236b6c',
          'fill-opacity': 0.4
        }
      });

      $("#loader").fadeOut("slow")

    }, 1000);

    document.getElementById('IPV').onclick = function() {

      window.scrollTo(0, 0);
      $(".marker").fadeOut()
      $('#indicazioni').css("display", "block");

      document.getElementById('indicazioni').onclick = function() {
        window.open('https://www.google.com/maps/search/?api=1&query=isola+pepe+verde+ipv', '_blank');
      }

      orto = "IPV"

      map.addLayer({
        'id': orto + 'outline',
        'type': 'line',
        'source': orto,
        'layout': {},
        'paint': {
          'line-color': '#172424',
          'line-width': 3
        }
      });

      $.getJSON(orto + '.geojson', function(geojson) {
        var bbox = turf.extent(geojson);
        map.fitBounds(bbox, {
          padding: 400,
          bearing: 0,
          speed: 1,
          curve: 2,
          easing: (t) => t,
          essential: true
        });
      })

      $("#sidebar").css("width", "calc(50% + 85px)");

      $("#sidebar #render").css("display", "block")
      $("#sidebar #render").css("background-image", "url(" + orto + ".png)")

      $('#sidebar').css({
        "animation": "slideIn 1s normal forwards ease-in-out"
      });
      $('#close').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni img').css("filter", "none");
      $('#map').css({
        "animation": "mapOut 2s normal forwards ease-in-out"
      });

      $("#sidebar h1").html("Isola Pepe Verde");
      $("#sidebar h3").html("7 MAGGIO - 26 GIUGNO");
      $("#sidebar p").html("RISCATTO VERDE <br><br>Isola Pepe Verde non è una realtà in cui le aiuole sono curate da uno sponsor o dal Comune, i prati tagliati dai giardinieri e le fontane ed i viali disegnati dagli architetti. Infatti, nasce durante la lunga fase dei cantieri di Porta Nuova, dall’esigenza di restituire al quartiere un’area verde e dalla volontà di sperimentare nuove modalità di partecipazione e condivisione dei residenti.  <br><br>È proprio per questi motivi che la volontà di riunirsi per trovare un luogo in cui ricreare uno spazio verde e comunitario – simbolo di riscatto in opposizione alle colate di cemento – ha portato alla luce Isola Pepe Verde: una piccola oasi verde, composta da alberi, ortaggi, piante aromatiche di vario genere, che emerge tra i grattacieli della metropoli.");

      $("#sidebar #s1").attr("src", orto + "/1.png")
      $("#sidebar #s2").attr("src", orto + "/2.png")
      $("#sidebar #s3").attr("src", orto + "/3.png")
      $("#sidebar #s4").attr("src", orto + "/4.png")
      $("#sidebar #s5").attr("src", orto + "/5.png")
    }








    document.getElementById('OVP').onclick = function() {

      window.scrollTo(0, 0);
      $(".marker").fadeOut()
      $('#indicazioni').css("display", "block");

      document.getElementById('indicazioni').onclick = function() {
        window.open('https://www.google.com/maps/search/?api=1&query=orti+di+via+padova', '_blank');
      }

      orto = "OVP"

      map.addLayer({
        'id': orto + 'outline',
        'type': 'line',
        'source': orto,
        'layout': {},
        'paint': {
          'line-color': '#172424',
          'line-width': 3
        }
      });

      $.getJSON(orto + '.geojson', function(geojson) {
        var bbox = turf.extent(geojson);
        map.fitBounds(bbox, {
          padding: 400,
          bearing: 0,
          speed: 1,
          curve: 2,
          easing: (t) => t,
          essential: true
        });
      })

      $("#sidebar").css("width", "calc(50% + 85px)");

      $("#sidebar #render").css("display", "block")
      $("#sidebar #render").css("background-image", "url(" + orto + ".png)")

      $('#sidebar').css({
        "animation": "slideIn 1s normal forwards ease-in-out"
      });
      $('#close').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni img').css("filter", "none");
      $('#map').css({
        "animation": "mapOut 2s normal forwards ease-in-out"
      });

      $("#sidebar h1").html("Orti di Via Padova");
      $("#sidebar h3").html("21 MAGGIO - 10 LUGLIO ");
      $("#sidebar p").html("COESIONE SOCIALE<br><br>Gli Orti di via Padova sorgono in una zona che, da una parte, è stata oscurata per molto tempo dalla fama turbolenta di via Padova, dall’altra, dal costante traffico di via Palmanova che taglia a metà il quartiere segnando un netto confine. Nel 2014 nasce l’orto con l’intento di ricucire le ferite del quartiere e dei rapporti tra i suoi cittadini, diventando un luogo di incontro e simbolo di coesione sociale.");

      $("#sidebar #s1").attr("src", orto + "/1.png")
      $("#sidebar #s2").attr("src", orto + "/2.png")
      $("#sidebar #s3").attr("src", orto + "/3.png")
      $("#sidebar #s4").attr("src", orto + "/4.png")
      $("#sidebar #s5").attr("src", orto + "/5.png")

    }







    document.getElementById('GDS').onclick = function() {

      window.scrollTo(0, 0);
      $(".marker").fadeOut()
      $('#indicazioni').css("display", "block");

      document.getElementById('indicazioni').onclick = function() {
        window.open('https://www.google.com/maps/search/?api=1&query=parco+trotter', '_blank');
      }

      orto = "GDS"

      map.addLayer({
        'id': orto + 'outline',
        'type': 'line',
        'source': orto,
        'layout': {},
        'paint': {
          'line-color': '#172424',
          'line-width': 3
        }
      });

      $.getJSON(orto + '.geojson', function(geojson) {
        var bbox = turf.extent(geojson);
        map.fitBounds(bbox, {
          padding: 400,
          bearing: 0,
          speed: 1,
          curve: 2,
          easing: (t) => t,
          essential: true
        });
      })

      $("#sidebar").css("width", "calc(50% + 85px)");

      $("#sidebar #render").css("display", "block")
      $("#sidebar #render").css("background-image", "url(" + orto + ".png)")

      $('#sidebar').css({
        "animation": "slideIn 1s normal forwards ease-in-out"
      });
      $('#close').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni img').css("filter", "none");
      $('#map').css({
        "animation": "mapOut 2s normal forwards ease-in-out"
      });

      $("#sidebar h1").html("Giardini del Sole");
      $("#sidebar h3").html("4 GIUGNO - 24 LUGLIO");
      $("#sidebar p").html("EDUCAZIONE ATTIVA<br><br>I Giardini del Sole sono collocati all’interno del parco Trotter, area vasta e salubre nata all’inizio del ‘900 dove i bambini di salute gracile potevano godere dei benefici del contatto diretto con l’ambiente naturale, oltre ad apprendere le nozioni botaniche. Questi orti si trovano in prossimità di istituzioni scolastiche, il che rende la loro forma di resilienza dell’educazione attiva ancora più forte dal momento che si è perpetuata fino ai giorni nostri.");

      $("#sidebar #s1").attr("src", orto + "/1.png")
      $("#sidebar #s2").attr("src", orto + "/2.png")
      $("#sidebar #s3").attr("src", orto + "/3.png")
      $("#sidebar #s4").attr("src", orto + "/4.png")
      $("#sidebar #s5").attr("src", orto + "/5.png")

    }



    document.getElementById('CGN').onclick = function() {

      window.scrollTo(0, 0);
      $(".marker").fadeOut()
      $('#indicazioni').css("display", "block");

      document.getElementById('indicazioni').onclick = function() {
        window.open('https://www.google.com/maps/search/?api=1&query=cascina+cuccagna', '_blank');
      }

      orto = "CGN"

      map.addLayer({
        'id': orto + 'outline',
        'type': 'line',
        'source': orto,
        'layout': {},
        'paint': {
          'line-color': '#172424',
          'line-width': 3
        }
      });

      $.getJSON(orto + '.geojson', function(geojson) {
        var bbox = turf.extent(geojson);
        map.fitBounds(bbox, {
          padding: 400,
          bearing: 0,
          speed: 1,
          curve: 2,
          easing: (t) => t,
          essential: true
        });
      })

      $("#sidebar").css("width", "calc(50% + 85px)");

      $("#sidebar #render").css("display", "block")
      $("#sidebar #render").css("background-image", "url(" + orto + ".png)")

      $('#sidebar').css({
        "animation": "slideIn 1s normal forwards ease-in-out"
      });
      $('#close').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni img').css("filter", "none");
      $('#map').css({
        "animation": "mapOut 2s normal forwards ease-in-out"
      });

      $("#sidebar h1").html("Cascina Cuccagna");
      $("#sidebar h3").html("28 MAGGIO - 17 LUGLIO");
      $("#sidebar p").html("LEGAME STORICO<br><br>Gli orti della Cascina Cuccagna sorgono una decina di anni fa in un’area iscritta al catasto fin dal 1690. Si tratta di un vero proprio movimento proveniente dal basso: per tornare alle origini rurali, i cittadini si mobilitano per realizzare un piccolo spazio verde coltivato in cui il legame storico con il quartiere continua ad essere vivo.");

      $("#sidebar #s1").attr("src", orto + "/1.png")
      $("#sidebar #s2").attr("src", orto + "/2.png")
      $("#sidebar #s3").attr("src", orto + "/3.png")
      $("#sidebar #s4").attr("src", orto + "/4.png")
      $("#sidebar #s5").attr("src", orto + "/5.png")

    }




    document.getElementById('GDA').onclick = function() {

      window.scrollTo(0, 0);
      $(".marker").fadeOut()
      $('#indicazioni').css("display", "block");

      document.getElementById('indicazioni').onclick = function() {
        window.open('https://www.google.com/maps/search/?api=1&query=il+giardino+degli+aromi', '_blank');
      }

      orto = "GDA"

      map.addLayer({
        'id': orto + 'outline',
        'type': 'line',
        'source': orto,
        'layout': {},
        'paint': {
          'line-color': '#172424',
          'line-width': 3
        }
      });

      $.getJSON(orto + '.geojson', function(geojson) {
        var bbox = turf.extent(geojson);
        map.fitBounds(bbox, {
          padding: 400,
          bearing: 0,
          speed: 1,
          curve: 2,
          easing: (t) => t,
          essential: true
        });
      })

      $("#sidebar").css("width", "calc(50% + 85px)");

      $("#sidebar #render").css("display", "block")
      $("#sidebar #render").css("background-image", "url(" + orto + ".png)")

      $('#sidebar').css({
        "animation": "slideIn 1s normal forwards ease-in-out"
      });
      $('#close').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni').css({
        "animation": "closeIn 1.25s normal forwards ease-in-out"
      });
      $('#indicazioni img').css("filter", "none");
      $('#map').css({
        "animation": "mapOut 2s normal forwards ease-in-out"
      });

      $("#sidebar h1").html("Giardino degli Aromi");
      $("#sidebar h3").html("14 GIUGNO - 3 LUGLIO");
      $("#sidebar p").html("TRASFORMAZIONE CURATIVA<br><br>Il Giardino degli Aromi è portavoce e testimonianza della riconversione di uno spazio. Quando esisteva ancora l’ospedale psichiatrico Paolo Pini, le aree verdi venivano utilizzate per dare conforto e terapia agli internati e costituivano uno spazio totalmente chiuso rispetto al quartiere; ad oggi i giardini e la loro trasformazione curativa hanno ancora un significativo legame con ambienti sanitari, ma, privati dello stigma della malattia godono di un’apertura anche verso gli ambienti cittadini.");

      $("#sidebar #s1").attr("src", orto + "/1.png")
      $("#sidebar #s2").attr("src", orto + "/2.png")
      $("#sidebar #s3").attr("src", orto + "/3.png")
      $("#sidebar #s4").attr("src", orto + "/4.png")
      $("#sidebar #s5").attr("src", orto + "/5.png")

    }

  });
});









$("#close").on("click", function() {

  $('#sidebar').css({
    "animation": "slideOut 2s normal forwards ease-in-out"
  });
  $('#map').css({
    "animation": "mapIn 1s normal forwards ease-in-out"
  });

  $("#sidebar .swiper-container").css("display", "block")

  if (tracce) {
    $('#close').css({
      "animation": "closeS-Out 1.25s normal forwards ease-in-out"
    });

    $(".tracce").remove()

  } else {
    $('#close').css({
      "animation": "closeOut 1.25s normal forwards ease-in-out"
    });
    $('#indicazioni').css({
      "animation": "closeOut 1.25s normal forwards ease-in-out"
    });
    $('#indicazioni img').css("filter", "none");
  }

  // $("#details").fadeOut();
  $(".marker").fadeIn()

  // map.removeLayer("IPVarea")
  map.removeLayer(orto + "outline")
  // map.removeSource(orto)

  map.flyTo({
    center: [9.187917709350586, 45.4860116022679],
    zoom: 12.50
  });

  if (tracce) {
    map.removeLayer("area")
    map.removeLayer("linea")
    map.removeSource("quartiere")

    $(".tracce").fadeOut()

    tracce = false;
  }

  setTimeout(function() {
    $("#sidebar").css("width", "calc(50% + 85px)");
    //$("#sidebar").css("padding-right", "none
    $("#sidebar").css("background", "#e7c6c6");

    $("#sidebar img").css("display", "block")
    $("#sidebar h1").html("Isola Pepe Verde");
    $("#sidebar p").html("In questa zona si accostano, così, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato più o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realtà, per comprendere i vari strati, è solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, città del rigore e degli spostamenti rapidi. ");

    $("#details").html("Scopri di più");

    $("#sidebar h1").css("padding-top", "250px")
    $("#sidebar h1").css("font-size", "95px")
    $("#sidebar h1").css("color", "#000000")
    $("#sidebar p").css("color", "#000000")

    $("#sidebar #details").css("transform", "scaleX(1)")
    $("#sidebar #details").css("border-bottom", "3px solid white")

  }, 2000);



});







function checkTracce() {

  if (!tracce) {
    addInfo()
  } else {
    removeInfo()
  }
}









function removeInfo() {

  $('#close').css({
    "animation": "closeLong 0.25s normal forwards ease-in-out"
  });

  $('#indicazioni').css("display", "block");

  $("#sidebar h1").css("padding-top", "250px")
  $("#sidebar h1").css("font-size", "95px")
  $("#sidebar h1").css("color", "#000000")
  $("#sidebar p").css("color", "#000000")
  $("#sidebar .swiper-container").css("display", "block")

  $("#sidebar #details").css("transform", "scaleX(1)")
  $("#sidebar #details").css("border-bottom", "3px solid white")

  $("#details").html("Scopri di più");

  $("#sidebar").css("width", "calc(50% + 85px)");
  $("#sidebar").css("background", "#e7c6c6");

  $("#sidebar img").css("display", "block")

  $(".tracce").remove()


  if (orto == "IPV") {
    $("#sidebar h1").html("Isola Pepe Verde");
    $("#sidebar p").html("RISCATTO VERDE<br><br>In questa zona si accostano, così, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato più o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realtà, per comprendere i vari strati, è solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, città del rigore e degli spostamenti rapidi. ");
    $("#sidebar h3").html("7 MAGGIO - 26 GIUGNO");

    map.removeLayer("area")
    map.removeLayer("linea")
    map.removeSource("quartiere")

    // $(".tracce").fadeOut()


    $.getJSON(orto + '.geojson', function(geojson) {
      var bbox = turf.extent(geojson);
      map.fitBounds(bbox, {
        padding: 400,
        bearing: 0,
        speed: 0.8,
        curve: 2,
        easing: (t) => t,
        essential: true
      });
    })

  } else if (orto == "OVP") {

    $("#sidebar h1").html("Orti di Via Padova");
    $("#sidebar p").html("COESIONE SOCIALE<br><br>In questa zona si accostano, così, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato più o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realtà, per comprendere i vari strati, è solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, città del rigore e degli spostamenti rapidi. ");
    $("#sidebar h3").html("21 MAGGIO - 10 LUGLIO");

    map.removeLayer("area")
    map.removeLayer("linea")
    map.removeSource("quartiere")

    // $(".tracce").fadeOut()


    $.getJSON(orto + '.geojson', function(geojson) {
      var bbox = turf.extent(geojson);
      map.fitBounds(bbox, {
        padding: 400,
        bearing: 0,
        speed: 0.8,
        curve: 2,
        easing: (t) => t,
        essential: true
      });
    })
  } else if (orto == "GDA") {

    $("#sidebar h1").html("Giardino degli Aromi");
    $("#sidebar p").html("TRASFORMAZIONE CURATIVA<br><br>Il Giardino degli Aromi è portavoce e testimonianza della riconversione di uno spazio. Quando esisteva ancora l’ospedale psichiatrico Paolo Pini, le aree verdi venivano utilizzate per dare conforto e terapia agli internati e costituivano uno spazio totalmente chiuso rispetto al quartiere; ad oggi i giardini e la loro trasformazione curativa hanno ancora un significativo legame con ambienti sanitari, ma, privati dello stigma della malattia godono di un’apertura anche verso gli ambienti cittadini.");
    $("#sidebar h3").html("14 GIUGNO - 3 LUGLIO");

    map.removeLayer("area")
    map.removeLayer("linea")
    map.removeSource("quartiere")

    // $(".tracce").fadeOut()


    $.getJSON(orto + '.geojson', function(geojson) {
      var bbox = turf.extent(geojson);
      map.fitBounds(bbox, {
        padding: 400,
        bearing: 0,
        speed: 0.8,
        curve: 2,
        easing: (t) => t,
        essential: true
      });
    })
  } else if (orto == "CGN") {
    $("#sidebar h1").html("Cascina Cuccagna");
    $("#sidebar h3").html("28 MAGGIO - 17 LUGLIO");
    $("#sidebar p").html("LEGAME STORICO<br><br>Gli orti della Cascina Cuccagna sorgono una decina di anni fa in un’area iscritta al catasto fin dal 1690. Si tratta di un vero proprio movimento proveniente dal basso: per tornare alle origini rurali, i cittadini si mobilitano per realizzare un piccolo spazio verde coltivato in cui il legame storico con il quartiere continua ad essere vivo.");

    map.removeLayer("area")
    map.removeLayer("linea")
    map.removeSource("quartiere")

    // $(".tracce").fadeOut()


    $.getJSON(orto + '.geojson', function(geojson) {
      var bbox = turf.extent(geojson);
      map.fitBounds(bbox, {
        padding: 400,
        bearing: 0,
        speed: 0.8,
        curve: 2,
        easing: (t) => t,
        essential: true
      });
    })

  } else if (orto == "GDS") {
    $("#sidebar h1").html("Giardini del Sole");
    $("#sidebar h3").html("4 GIUGNO - 24 LUGLIO");
    $("#sidebar p").html("EDUCAZIONE ATTIVA<br><br>I Giardini del Sole sono collocati all’interno del parco Trotter, area vasta e salubre nata all’inizio del ‘900 dove i bambini di salute gracile potevano godere dei benefici del contatto diretto con l’ambiente naturale, oltre ad apprendere le nozioni botaniche. Questi orti si trovano in prossimità di istituzioni scolastiche, il che rende la loro forma di resilienza dell’educazione attiva ancora più forte dal momento che si è perpetuata fino ai giorni nostri.");

    map.removeLayer("area")
    map.removeLayer("linea")
    map.removeSource("quartiere")

    // $(".tracce").fadeOut()


    $.getJSON(orto + '.geojson', function(geojson) {
      var bbox = turf.extent(geojson);
      map.fitBounds(bbox, {
        padding: 400,
        bearing: 0,
        speed: 0.8,
        curve: 2,
        easing: (t) => t,
        essential: true
      });
    })

  }

  $("#sidebar #render").css("display", "block")
  $("#sidebar h1").css("padding-top", "250px")
  $("#sidebar h1").css("font-size", "95px")

  tracce = false
}









function addInfo() {
  $("#sidebar #render").css("display", "none")
  $("#sidebar h1").css("padding-top", "8vh")
  $("#sidebar h1").css("color", "#efd9d9")
  $("#sidebar p").css("color", "#efd9d9")
  $("#sidebar h1").css("font-size", "42px")
  $("#sidebar .swiper-container").css("display", "none")

  $("#sidebar #details").css("transform", "scaleX(-1)")
  $("#sidebar #details").css("border-bottom", "0px solid white")

  $("#details").html("");
  $("#sidebar").css("width", "33vw");
  $("#sidebar").css("background", "#172424");
  $("#map").css("transform", "translateX(-15%)");
  $("#sidebar img").css("display", "none")

  $("#sidebar h3").html("");

  $('#close').css({
    "animation": "closeShort 0.25s normal forwards ease-in-out"
  });

  $('#indicazioni').css("display", "none");

  tracce = true;

  if (orto == "IPV") {

    $("#sidebar h1").html("Le tracce di Isola");
    $("#sidebar p").html("La storia di Isola Pepe Verde non si trova solo in via Pepe 10, ma si respira nell’aria dei luoghi salienti che narrano come le intricate vicende di quartiere abbiano portato alla costituzione di un orto comunitario. Diversi luoghi di Isola hanno subito rapide trasformazioni – così come l’intero quartiere – modificando l’assetto urbano, snaturando la zona, e provocando il malcontento dei cittadini per le dinamiche di gentrificazione e cementificazione. <br><br> Monumenti, strade e palazzi sono alcune delle tracce presenti sul territorio, che evocano l’identità dell’oasi urbana e narrano in coro un pezzo della stessa storia: un quartiere che crea Isola Pepe Verde.");


    $.getJSON('tracceIsola.geojson', function(geojson) {
      for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'tracce';
        el.id = feature.properties.title;

        nuoviMarker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      }

    });

    map.addSource('quartiere', {
      type: 'geojson',
      data: "isola.geojson"
    });

    map.addLayer({
      'id': 'area',
      'type': 'fill',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'fill-color': '#236b6c',
        'fill-opacity': 0.2
      }
    });
    map.addLayer({
      'id': 'linea',
      'type': 'line',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'line-color': '#172424',
        'line-width': 1
      }
    });

    map.flyTo({
      center: [9.18854534626007, 45.485496356019915],
      zoom: 16.8
    });

    setTimeout(function() {

      $("#artigiani").on({
        mouseenter: function() {
          $("#sidebar h1").html("STECCA DEGLI ARTIGIANI");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("II");
          $("#sidebar p").html("«La sconfitta del movimento del quartiere riguardo la salvezza di Stecca e giardini, pesa sullo stato d'animo di molti abitanti» <br><br> <span style='text-align:right'>KATHY MAYOH</span>");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "steccaA.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetIsola()
        }
      });

      $("#gatti").on({
        mouseenter: function() {
          $("#sidebar h1").html("AREA GATTI OLTRE IL MURO");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("VI");
          $("#sidebar p").html("«Quando è crollato il muro abbiamo chiesto al Comune di integrare l’area, l’unica veramente verde, nonostante la presenza di macerie nel sottosuolo dovute alla mancanza di bonifica» <br><br> <span style='text-align:right'>MARIETTE SCHILTZ</span>");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "gatti.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetIsola()
        }
      });

      $("#ecobox").on({
        mouseenter: function() {
          $("#sidebar h1").html("IL SISTEMA ECOBOX");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("V");
          $("#sidebar p").html("«Stare insieme agli altri, in natura, fa stare le persone in salute perché vedono che la crescita delle piante è una rinascita. [...] La natura ci dà esempio che  si rinasce tutti i giorni» <br><br> <span style='text-align:right'>AFRICA SUNICO</span>");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "ecobox.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetIsola()
        }
      });

      $("#cavalcavia").on({
        mouseenter: function() {
          $("#sidebar h1").html("IL CAVALCAVIA E. BUSSA");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("I");
          $("#sidebar p").html("«Il Cavalcavia E. Bussa costituisce uno spezzone dell’asse attrezzato proposto nel 1953, finendo  per essere un “inutile monumento” che cercava  di mediare tra le volontà dei residenti di Isola e le pressioni del Comune di Milano» <br><br> <span style='text-align:right'>SARA REGINA</span>");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "cavalcavia.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetIsola()
        }
      });

      $("#deposito").on({
        mouseenter: function() {
          $("#sidebar h1").html("L'EX DEPOSITO EDILE DEL BIANCO");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("IV");
          $("#sidebar p").html("«Quando ci hanno affidato l’area, il cancello d’ingresso di Isola Pepe Verde è diventato  l’insegna di fare arte, di fare bellezza e fare  un lavoro condiviso» <br><br> <span style='text-align:right'>CLAUDIO CASOLO</span>");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "deposito.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetIsola()
        }
      });

      $("#striscia").on({
        mouseenter: function() {
          $("#sidebar h1").html("LA STRISCIA VERDE DI VIA PEPE");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("III");
          $("#sidebar p").html("«La striscia è il progenitore di Isola Pepe Verde, l’anima esterna ma interna al giardino perché  in seguito a questo intervento il Comune ha deciso di affidarci lo spazio dell’orto» <br><br> <span style='text-align:right'>CLAUDIO CASOLO</span>");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "striscia.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetIsola()
        }
      });

    }, 500);

    function resetIsola() {
      $("#sidebar h1").html("Le tracce di Isola");
      $("#sidebar p").html("La storia di Isola Pepe Verde non si trova solo in via Pepe 10, ma si respira nell’aria dei luoghi salienti che narrano come le intricate vicende di quartiere abbiano portato alla costituzione di un orto comunitario. Diversi luoghi di Isola hanno subito rapide trasformazioni – così come l’intero quartiere – modificando l’assetto urbano, snaturando la zona, e provocando il malcontento dei cittadini per le dinamiche di gentrificazione e cementificazione. <br><br> Monumenti, strade e palazzi sono alcune delle tracce presenti sul territorio, che evocano l’identità dell’oasi urbana e narrano in coro un pezzo della stessa storia: un quartiere che crea Isola Pepe Verde.");
      $("#sidebar #imgT").attr("src", "")
      $("#sidebar #imgT").css("display", "none")
      $("#details").css("display", "block")
      $("#sidebar h2").css("display", "none");

    }

  } else if (orto == "OVP") {

    $("#sidebar h1").html("Le tracce di Rottole");
    $("#sidebar p").html("La storia degli Orti di via Padova non riguarda solo il giardino condiviso: elementi esterni all’orto si fanno portatori della memoria e delle trasformazioni che ha subito il quartiere, testimoniando come un microcosmo come questo possa dare un nuovo volto alla città.");


    $.getJSON('tracceRottole.geojson', function(geojson) {
      for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'tracce';
        el.id = feature.properties.title;

        nuoviMarker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      }

    });

    map.addSource('quartiere', {
      type: 'geojson',
      data: "rottole.geojson"
    });

    map.addLayer({
      'id': 'area',
      'type': 'fill',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'fill-color': '#236b6c',
        'fill-opacity': 0.2
      }
    });
    map.addLayer({
      'id': 'linea',
      'type': 'line',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'line-color': '#172424',
        'line-width': 1
      }
    });

    map.flyTo({
      center: [9.231702, 45.493360],
      zoom: 16
    });

    setTimeout(function() {

      $("#sassi").on({
        mouseenter: function() {
          $("#sidebar h1").html("SASSI DEL FIUME");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("I");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRottole()
        }
      });

      $("#lampione").on({
        mouseenter: function() {
          $("#sidebar h1").html("LAMPIONE/MURALES");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("II");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRottole()
        }
      });

      $("#atm").on({
        mouseenter: function() {
          $("#sidebar h1").html("SEDE DEPOSITO ATM");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("III");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRottole()
        }
      });

      $("#cassoni").on({
        mouseenter: function() {
          $("#sidebar h1").html("CASSONI DI TERRA");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("IV");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRottole()
        }
      });

      $("#piante").on({
        mouseenter: function() {
          $("#sidebar h1").html("PIANTE GIÀ ESISTENTI");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("V");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRottole()
        }
      });

    }, 500);

    function resetRottole() {
      $("#sidebar h1").html("Le tracce di Rottole");
      $("#sidebar p").html("La storia degli Orti di via Padova non riguarda solo il giardino condiviso: elementi esterni all’orto si fanno portatori della memoria e delle trasformazioni che ha subito il quartiere, testimoniando come un microcosmo come questo possa dare un nuovo volto alla città.");
      $("#sidebar #imgT").attr("src", "")
      $("#sidebar #imgT").css("display", "none")
      $("#details").css("display", "block")
      $("#sidebar h2").css("display", "none");

    }

  } else if (orto == "CGN") {

    $("#sidebar h1").html("Le tracce di Porta Romana");
    $("#sidebar p").html("La storia degli orti della Cascina Cuccagna ha lasciato tracce nell’area che oggi è occupata da questa oasi urbana: nonostante si tratti di una piccola realtà, questi orti diventano portatori del trascorso della Cascina e della volontà dei cittadini che hanno voluto celebrarne le origini.");


    $.getJSON('tracceCuccagna.geojson', function(geojson) {
      for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'tracce';
        el.id = feature.properties.title;

        nuoviMarker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      }

    });

    map.addSource('quartiere', {
      type: 'geojson',
      data: "pRomana.geojson"
    });

    map.addLayer({
      'id': 'area',
      'type': 'fill',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'fill-color': '#236b6c',
        'fill-opacity': 0.2
      }
    });
    map.addLayer({
      'id': 'linea',
      'type': 'line',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'line-color': '#172424',
        'line-width': 1
      }
    });

    map.flyTo({
      center: [9.209332466125488, 45.45309031426514],
      zoom: 16.3
    });

    setTimeout(function() {

      $("#mura").on({
        mouseenter: function() {
          $("#sidebar h1").html("MURA E CASCINA");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("I");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRomana()
        }
      });

      $("#guerra").on({
        mouseenter: function() {
          $("#sidebar h1").html("ORTI DI GUERRA IN TEMPO DI PACE");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("II");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRomana()
        }
      });

      $("#piante").on({
        mouseenter: function() {
          $("#sidebar h1").html("PIANTE DEL MONDO");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("III");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRomana()
        }
      });

      $("#fico").on({
        mouseenter: function() {
          $("#sidebar h1").html("FICO");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("IV");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetRomana()
        }
      });


    }, 500);

    function resetRomana() {
      $("#sidebar h1").html("Le tracce di Porta Romana");
      $("#sidebar p").html("La storia degli orti della Cascina Cuccagna ha lasciato tracce nell’area che oggi è occupata da questa oasi urbana: nonostante si tratti di una piccola realtà, questi orti diventano portatori del trascorso della Cascina e della volontà dei cittadini che hanno voluto celebrarne le origini.");
      $("#sidebar #imgT").attr("src", "")
      $("#sidebar #imgT").css("display", "none")
      $("#details").css("display", "block")
      $("#sidebar h2").css("display", "none");

    }

  } else if (orto == "GDA") {

    $("#sidebar h1").html("Le tracce di Comasina");
    $("#sidebar p").html("Oltre a tracce limitrofe agli spazi adibiti ad orto condiviso, è possibile percepire la presenza di ulteriori testimonianze in tutto lo spazio circostante. L’ospedale psichiatrico Paolo Pini ha avuto una forte influenza sul luogo dove oggi sorge il Giardino degli Aromi: ancora oggi, se si guarda attentamente, si possono intravedere molteplici segni lasciati da ciò che era il luogo in precedenza.");


    $.getJSON('tracceComasina.geojson', function(geojson) {
      for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'tracce';
        el.id = feature.properties.title;

        nuoviMarker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      }

    });

    map.addSource('quartiere', {
      type: 'geojson',
      data: "comasina.geojson"
    });

    map.addLayer({
      'id': 'area',
      'type': 'fill',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'fill-color': '#236b6c',
        'fill-opacity': 0.2
      }
    });
    map.addLayer({
      'id': 'linea',
      'type': 'line',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'line-color': '#172424',
        'line-width': 1
      }
    });

    map.flyTo({
      center: [9.162565469741821, 45.52027805588598],
      zoom: 16.2
    });

    setTimeout(function() {

      $("#edifici").on({
        mouseenter: function() {
          $("#sidebar h1").html("EDIFICI/WAYFINDING OSPEDALE PSICHIATRICO");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("I");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetComasina()
        }
      });

      $("#mura").on({
        mouseenter: function() {
          $("#sidebar h1").html("MURA");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("II");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetComasina()
        }
      });

      $("#mandala").on({
        mouseenter: function() {
          $("#sidebar h1").html("MANDALA");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("III");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetComasina()
        }
      });

      $("#vento").on({
        mouseenter: function() {
          $("#sidebar h1").html("GIARDINO DEL VENTO E DELLA LUCE");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("IV");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetComasina()
        }
      });

    }, 500);

    function resetComasina() {
      $("#sidebar h1").html("Le tracce di Comasina");
      $("#sidebar p").html("Oltre a tracce limitrofe agli spazi adibiti ad orto condiviso, è possibile percepire la presenza di ulteriori testimonianze in tutto lo spazio circostante. L’ospedale psichiatrico Paolo Pini ha avuto una forte influenza sul luogo dove oggi sorge il Giardino degli Aromi: ancora oggi, se si guarda attentamente, si possono intravedere molteplici segni lasciati da ciò che era il luogo in precedenza.");
      $("#sidebar #imgT").attr("src", "")
      $("#sidebar #imgT").css("display", "none")
      $("#details").css("display", "block")
      $("#sidebar h2").css("display", "none");

    }

  } else if (orto == "GDS") {

    $("#sidebar h1").html("Le tracce di Turro");
    $("#sidebar p").html("L’eco dei Giardini del Sole riecheggia in tutta l’area che circonda e racchiude gli orti: il Parco Trotter diventa, così, una parte fondamentale per la storia e per la narrazione dei giardini e un luogo che, grazie alle tracce ancora visibili, racchiude e conserva il loro passato.");


    $.getJSON('tracceTurro.geojson', function(geojson) {
      for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'tracce';
        el.id = feature.properties.title;

        nuoviMarker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      }

    });

    map.addSource('quartiere', {
      type: 'geojson',
      data: "turro.geojson"
    });

    map.addLayer({
      'id': 'area',
      'type': 'fill',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'fill-color': '#236b6c',
        'fill-opacity': 0.2
      }
    });
    map.addLayer({
      'id': 'linea',
      'type': 'line',
      'source': 'quartiere',
      'layout': {},
      'paint': {
        'line-color': '#172424',
        'line-width': 1
      }
    });

    map.flyTo({
      center: [9.221928119659424, 45.4979399275852],
      zoom: 15
    });

    setTimeout(function() {

      $("#vasche").on({
        mouseenter: function() {
          $("#sidebar h1").html("EX VASCHE");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("I");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetTurro()
        }
      });

      $("#solarium").on({
        mouseenter: function() {
          $("#sidebar h1").html("SOLARIUM");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("II");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetTurro()
        }
      });

      $("#rosa").on({
        mouseenter: function() {
          $("#sidebar h1").html("ROSA DEI VENTI");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("III");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetTurro()
        }
      });

      $("#ippodromo").on({
        mouseenter: function() {
          $("#sidebar h1").html("IPPODROMO");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("IV");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetTurro()
        }
      });

      $("#convitto").on({
        mouseenter: function() {
          $("#sidebar h1").html("EX-CONVITTO");
          $("#sidebar h2").css("display", "block");
          $("#sidebar h2").html("V");
          $("#sidebar p").html("Presto più informazioni!");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "soon.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          resetTurro()
        }
      });

    }, 500);

    function resetTurro() {
      $("#sidebar h1").html("Le tracce di Turro");
      $("#sidebar p").html("L’eco dei Giardini del Sole riecheggia in tutta l’area che circonda e racchiude gli orti: il Parco Trotter diventa, così, una parte fondamentale per la storia e per la narrazione dei giardini e un luogo che, grazie alle tracce ancora visibili, racchiude e conserva il loro passato.");
      $("#sidebar #imgT").attr("src", "")
      $("#sidebar #imgT").css("display", "none")
      $("#details").css("display", "block")
      $("#sidebar h2").css("display", "none");
    }

  }

}
