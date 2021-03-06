const swiper = new Swiper('.swiper-container', {
  centeredSlides: true,
  loop: false,
  speed: 500,
  slidesPerView: 1.5,
  spaceBetween: 40,
});

mapboxgl.accessToken = 'pk.eyJ1Ijoib3R0YWI5OCIsImEiOiJjanh4NDF4bW8wa2dhM2JrOWF1Zmdmc2hhIn0.laR8OsN_RveET11YiK09MA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ottab98/ckubgdqz406jq18mqyy85qni0',
  center: [9.190106391906738,45.47903093138234],
  zoom: 12.25,
  attributionControl: false
});

var tracce = false;
var orto

var nuoviMarker

// map.scrollZoom.disable();

$.getJSON('orti.geojson', function(geojson) {
  for (const feature of geojson.features) {
    const el = document.createElement('div');
    el.className = 'marker';
    el.id = feature.properties.title;

    new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
  }

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
  map.addLayer({
    'id': 'IPVoutline',
    'type': 'line',
    'source': 'IPV',
    'layout': {},
    'paint': {
      'line-color': '#172424',
      'line-width': 3
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
  map.addLayer({
    'id': 'OVPoutline',
    'type': 'line',
    'source': 'OVP',
    'layout': {},
    'paint': {
      'line-color': '#172424',
      'line-width': 3
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
  map.addLayer({
    'id': 'CGNoutline',
    'type': 'line',
    'source': 'CGN',
    'layout': {},
    'paint': {
      'line-color': '#172424',
      'line-width': 3
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
  map.addLayer({
    'id': 'GDAoutline',
    'type': 'line',
    'source': 'GDA',
    'layout': {},
    'paint': {
      'line-color': '#172424',
      'line-width': 3
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
    map.addLayer({
      'id': 'GDSoutline',
      'type': 'line',
      'source': 'GDS',
      'layout': {},
      'paint': {
        'line-color': '#172424',
        'line-width': 3
      }
    });

  setTimeout(function() {
    $(".marker").fadeOut(3000)

    $.getJSON('IPV.geojson', function(geojson) {
      var bbox = turf.extent(geojson);
      map.fitBounds(bbox, {
        padding: 300,
        bearing: 0,
        speed: 0.2,
        curve: 1,
        easing: (t) => t,
        essential: true
      });

    })
  }, 5000);

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
  } else {
    $('#close').css({
      "animation": "closeOut 1.25s normal forwards ease-in-out"
    });
  }

  // $("#details").fadeOut();
  $(".marker").fadeIn()

  map.flyTo({
    center: [9.190106391906738,45.47903093138234],
    zoom: 12.25,
  });

  if (tracce) {
    map.removeLayer("areaIsola")
    map.removeLayer("lineaIsola")
    map.removeSource("isola")

    $(".tracce").fadeOut()

    tracce = false;
  }

  setTimeout(function() {
    $("#sidebar").css("width", "calc(50% + 85px)");
    //$("#sidebar").css("padding-right", "none
    $("#sidebar").css("background", "#e7c6c6");

    $("#sidebar img").css("display", "block")
    $("#sidebar h1").html("Isola Pepe Verde");
    $("#sidebar p").html("In questa zona si accostano, cos??, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato pi?? o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realt??, per comprendere i vari strati, ?? solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, citt?? del rigore e degli spostamenti rapidi. ");

    $("#details").html("Scopri di pi??");

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

  $("#sidebar h1").css("padding-top", "250px")
  $("#sidebar h1").css("font-size", "95px")
  $("#sidebar h1").css("color", "#000000")
  $("#sidebar p").css("color", "#000000")
  $("#sidebar .swiper-container").css("display", "block")

  $("#sidebar #details").css("transform", "scaleX(1)")
  $("#sidebar #details").css("border-bottom", "3px solid white")

  if (orto == "IPV") {
    $("#details").html("Scopri di pi??");

    $("#sidebar").css("width", "calc(50% + 85px)");
    //$("#sidebar").css("padding-right", "none
    $("#sidebar").css("background", "#e7c6c6");

    $("#sidebar img").css("display", "block")
    $("#sidebar h1").html("Isola Pepe Verde");
    $("#sidebar p").html("In questa zona si accostano, cos??, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato pi?? o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realt??, per comprendere i vari strati, ?? solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, citt?? del rigore e degli spostamenti rapidi. ");

    map.removeLayer("areaIsola")
    map.removeLayer("lineaIsola")
    map.removeSource("isola")

    $(".tracce").fadeOut()


    $.getJSON('IPV.geojson', function(geojson) {
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
    $("#details").html("Scopri di pi??");

    $("#sidebar").css("width", "calc(50% + 85px)");
    //$("#sidebar").css("padding-right", "none
    $("#sidebar").css("background", "#e7c6c6");

    $("#sidebar img").css("display", "block")
    $("#sidebar h1").html("Orti di Via Padova");
    $("#sidebar p").html("In questa zona si accostano, cos??, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato pi?? o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realt??, per comprendere i vari strati, ?? solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, citt?? del rigore e degli spostamenti rapidi. ");

    map.removeLayer("areaIsola")
    map.removeLayer("lineaIsola")
    map.removeSource("isola")

    $(".tracce").fadeOut()


    $.getJSON('OVP.geojson', function(geojson) {
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

  $('#close').css({
    "animation": "closeShort 0.25s normal forwards ease-in-out"
  });

  if (orto == "IPV") {
    $("#details").html("");


    $("#sidebar").css("width", "33vw");
    //$("#sidebar").css("padding-right", "50px");
    $("#sidebar").css("background", "#172424");

    $("#map").css("transform", "translateX(-15%)");

    $("#sidebar h1").html("Le tracce di Isola");
    $("#sidebar p").html("Le tracce sono ........ <br> <br> <br> Scopri le singole tracce andandoci sopra con il mouse");
    $("#sidebar img").css("display", "none")

    tracce = true;

    $.getJSON('tracceIsola.geojson', function(geojson) {
      for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'tracce';
        el.id = feature.properties.title;

        nuoviMarker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      }

    });

    map.addSource('isola', {
      type: 'geojson',
      data: "isola.geojson"
    });

    map.addLayer({
      'id': 'areaIsola',
      'type': 'fill',
      'source': 'isola',
      'layout': {},
      'paint': {
        'fill-color': '#236b6c',
        'fill-opacity': 0.2
      }
    });
    map.addLayer({
      'id': 'lineaIsola',
      'type': 'line',
      'source': 'isola',
      'layout': {},
      'paint': {
        'line-color': '#172424',
        'line-width': 1
      }
    });

    map.flyTo({
      center: [9.18854534626007,45.485496356019915],
      zoom: 16.8
    });

    setTimeout(function() {

      $("#artigiani").on({
        mouseenter: function() {
          $("#sidebar h1").html("STECCA DEGLI ARTIGIANI");
          $("#sidebar p").html("??La sconfitta del movimento del quartiere riguardo la salvezza di Stecca e giardini, pesa sullo stato d'animo di molti abitanti?? <br><br> <span style='text-align:right'>KATHY MAYOH</span>");
          $("#sidebar #imgT").css("display", "block")
          $("#sidebar #imgT").attr("src", "steccaA.png")
          $("#details").css("display", "none")
        },
        mouseleave: function() {
          $("#sidebar h1").html("Le tracce di Isola");
          $("#sidebar p").html("Le tracce sono ........ <br> <br> <br> Scopri le singole tracce andandoci sopra con il mouse");
          $("#sidebar #imgT").attr("src", "")
          $("#sidebar #imgT").css("display", "none")
          $("#details").css("display", "block")
        }
      });

    }, 100);

  } else if (orto == "OVP") {
    $("#details").html("");


    $("#sidebar").css("width", "33vw");
    //$("#sidebar").css("padding-right", "50px");
    $("#sidebar").css("background", "#172424");

    $("#map").css("transform", "translateX(-15%)");

    $("#sidebar h1").html("Le tracce di Rottole");
    $("#sidebar p").html("Le tracce sono ........ <br> <br> <br> Scopri le singole tracce andandoci sopra con il mouse");
    $("#sidebar img").css("display", "none")

    tracce = true;

    $.getJSON('tracceIsola.geojson', function(geojson) {
      for (const feature of geojson.features) {
        const el = document.createElement('div');
        el.className = 'tracce';
        el.id = feature.properties.title;

        nuoviMarker = new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map);
      }

    });

    map.addSource('isola', {
      type: 'geojson',
      data: "rottole.geojson"
    });

    map.addLayer({
      'id': 'areaIsola',
      'type': 'fill',
      'source': 'isola',
      'layout': {},
      'paint': {
        'fill-color': '#236b6c',
        'fill-opacity': 0.2
      }
    });
    map.addLayer({
      'id': 'lineaIsola',
      'type': 'line',
      'source': 'isola',
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

      $("#artigiani").on({
        mouseenter: function() {
          $("#sidebar img").css("display", "block")
          $("#sidebar h1").html("Stecca degli Artigiani");
          $("#sidebar p").html("Lorem ");
          $("#sidebar img").attr("src", "steccaA.png")
        },
        mouseleave: function() {
          $("#sidebar h1").html("Le tracce di Isola");
          $("#sidebar p").html("Le tracce sono ........ <br> <br> <br> Scopri le singole tracce andandoci sopra con il mouse");
          $("#sidebar img").css("display", "none")
        }
      });

    }, 100);
  }






}
