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
      $("#sidebar h3").html("RISCATTO VERDE");
      $("#sidebar p").html("Isola Pepe Verde non è una realtà in cui le aiuole sono curate da uno sponsor o dal Comune, i prati tagliati dai giardinieri e le fontane ed i viali disegnati dagli architetti. Infatti, nasce durante la lunga fase dei cantieri di Porta Nuova, dall’esigenza di restituire al quartiere un’area verde e dalla volontà di sperimentare nuove modalità di partecipazione e condivisione dei residenti.  <br><br>È proprio per questi motivi che la volontà di riunirsi per trovare un luogo in cui ricreare uno spazio verde e comunitario – simbolo di riscatto in opposizione alle colate di cemento – ha portato alla luce Isola Pepe Verde: una piccola oasi verde, composta da alberi, ortaggi, piante aromatiche di vario genere, che emerge tra i grattacieli della metropoli.");

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
      $("#sidebar p").html("In questa zona si accostano, così, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato più o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realtà, per comprendere i vari strati, è solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, città del rigore e degli spostamenti rapidi. ");

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


  if (orto == "IPV") {
    $("#sidebar h1").html("Isola Pepe Verde");
    $("#sidebar p").html("In questa zona si accostano, così, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato più o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realtà, per comprendere i vari strati, è solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, città del rigore e degli spostamenti rapidi. ");
    $("#sidebar h3").html("RISCATTO VERDE");

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

    $("#sidebar h1").html("Orti di Via Padova");
    $("#sidebar p").html("In questa zona si accostano, così, mondi e storie diverse, immagini e prospettive di nuove forme urbane mescolate a un passato più o meno recente. A Isola ci sono, velate dalla polvere di nuovi e vecchi cantieri, sovrapposizioni di ricordi che, per chi si affaccia per la prima volta alle geometrie del quartiere, possono risultare caotiche e disordinate. In realtà, per comprendere i vari strati, è solo richiesta una maggiore lentezza, un diverso sguardo, una calma non consona a Milano, città del rigore e degli spostamenti rapidi. ");
    $("#sidebar h3").html("COESIONE SOCIALE");

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
    $("#sidebar p").html("Le tracce sono ........ <br> <br> <br> Scopri le singole tracce andandoci sopra con il mouse");


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
