
var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 1
    })
});

//initial view - epsg:3857 coordinates if not "Match project CRS"
map.getView().fit([-7514452.173913, -3515132.451674, -1169902.956522, 544448.997799], map.getSize());

//full zooms only
map.getView().setProperties({constrainResolution: true});

//change cursor
function pointerOnFeature(evt) {
    if (evt.dragging) {
        return;
    }
    var hasFeature = map.hasFeatureAtPixel(evt.pixel, {
        layerFilter: function(layer) {
            return layer && (layer.get("interactive"));
        }
    });
    map.getViewport().style.cursor = hasFeature ? "pointer" : "";
}
map.on('pointermove', pointerOnFeature);
function styleCursorMove() {
    map.on('pointerdrag', function() {
        map.getViewport().style.cursor = "move";
    });
    map.on('pointerup', function() {
        map.getViewport().style.cursor = "default";
    });
}
styleCursorMove();

////small screen definition
    var hasTouchScreen = map.getViewport().classList.contains('ol-touch');
    var isSmallScreen = window.innerWidth < 650;

////controls container

    //top left container
    var topLeftContainer = new ol.control.Control({
        element: (() => {
            var topLeftContainer = document.createElement('div');
            topLeftContainer.id = 'top-left-container';
            return topLeftContainer;
        })(),
    });
    map.addControl(topLeftContainer)

    //bottom left container
    var bottomLeftContainer = new ol.control.Control({
        element: (() => {
            var bottomLeftContainer = document.createElement('div');
            bottomLeftContainer.id = 'bottom-left-container';
            return bottomLeftContainer;
        })(),
    });
    map.addControl(bottomLeftContainer)
  
    //top right container
    var topRightContainer = new ol.control.Control({
        element: (() => {
            var topRightContainer = document.createElement('div');
            topRightContainer.id = 'top-right-container';
            return topRightContainer;
        })(),
    });
    map.addControl(topRightContainer)

    //bottom right container
    var bottomRightContainer = new ol.control.Control({
        element: (() => {
            var bottomRightContainer = document.createElement('div');
            bottomRightContainer.id = 'bottom-right-container';
            return bottomRightContainer;
        })(),
    });
    map.addControl(bottomRightContainer)

//popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

function stopMediaInPopup() {
    var mediaElements = container.querySelectorAll('audio, video');
    mediaElements.forEach(function(media) {
        media.pause();
        media.currentTime = 0;
    });
}
closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    stopMediaInPopup();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container,
	autoPan: true
});
map.addOverlay(overlayPopup)
    
    
var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

//highligth collection
var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = true;
var doHover = false;

function createPopupField(currentFeature, currentFeatureKeys, layer) {
    var popupText = '';
    for (var i = 0; i < currentFeatureKeys.length; i++) {
        var key = currentFeatureKeys[i];
        
        // 1. Ignora geometria e atributos internos do sistema
        if (key === 'geometry' || key === 'layerObject' || key === 'idO' || key === 'boundedBy') {
            continue;
        }

        var rawValue = currentFeature.get(key);

        // 2. ELIMINA O [object Object]: pula qualquer valor que seja um objeto ou função
        if (rawValue !== null && typeof rawValue === 'object') {
            continue;
        }

        // Respeita a configuração de campos ocultos
        if (layer.get('fieldLabels')[key] == "hidden field") {
            continue;
        } else if (layer.get('fieldLabels')[key] == "inline label - visible with data") {
            if (rawValue == null || rawValue === '') {
                continue;
            }
        }

        var popupField = '';
        var labelType = layer.get('fieldLabels')[key];

        // Se for visível apenas com dados e o valor estiver vazio, pula a linha
        if (labelType == "header label - visible with data" || labelType == "inline label - visible with data") {
            if (rawValue == null || rawValue === '') {
                continue;
            }
        }

        // Se não tiver rótulo, ocupa as duas colunas; se tiver qualquer rótulo, monta sempre lado a lado na tabela
        if (labelType == "no label") {
            popupField += '<td colspan="2">';
        } else {
            popupField += '<th>' + (layer.get('fieldAliases')[key] || key) + '</th><td>';
        }

        // Formata o valor e corrige o caractere corrompido em "Piauí" se houver
        var valString = '';
        if (rawValue != null) {
            valString = rawValue.toLocaleString();

            var correcoes = {
                // Estado e correções gerais
                'Piau\uFFFD': 'Piauí',
                'Piau?': 'Piauí',
                'Sert?o 1': 'Sertão 1',
                'Opera??o': 'Operação',

                // Todos os 141 Municípios do Piauí com caracteres especiais
                'Socorro do Piau\uFFFD': 'Socorro do Piauí',
                'Gilbu\uFFFDs': 'Gilbués',
                'Santo Ant\uFFFDnio de Lisboa': 'Santo Antônio de Lisboa',
                'Tanque do Piau\uFFFD': 'Tanque do Piauí',
                'Tamboril do Piau\uFFFD': 'Tamboril do Piauí',
                'Santo Ant\uFFFDnio dos Milagres': 'Santo Antônio dos Milagres',
                'Col\uFFFDnia do Gurgu\uFFFDia': 'Colônia do Gurguéia',
                'Paquet\uFFFD': 'Paquetá',
                'Agricol\uFFFDndia': 'Agricolândia',
                'S\uFFFDo Jos\uFFFD do Peixe': 'São José do Peixe',
                'Col\uFFFDnia do Piau\uFFFD': 'Colônia do Piauí',
                'V\uFFFDrzea Grande': 'Várzea Grande',
                'Curimat\uFFFD': 'Curimatá',
                'S\uFFFDo Jo\uFFFDo da Serra': 'São João da Serra',
                'Prata do Piau\uFFFD': 'Prata do Piauí',
                'S\uFFFDo Jo\uFFFDo da Varjota': 'São João da Varjota',
                'Luzil\uFFFDndia': 'Luzilândia',
                'Curral Novo do Piau\uFFFD': 'Curral Novo do Piauí',
                'Parnagu\uFFFD': 'Parnaguá',
                'Concei\uFFFD\uFFFDo do Canind\uFFFD': 'Conceição do Canindé',
                'S\uFFFDo Jo\uFFFDo do Arraial': 'São João do Arraial',
                'Miguel Le\uFFFDo': 'Miguel Leão',
                'Milton Brand\uFFFDo': 'Milton Brandão',
                'Santa Cruz do Piau\uFFFD': 'Santa Cruz do Piauí',
                'Coronel Jos\uFFFD Dias': 'Coronel José Dias',
                'Itain\uFFFDpolis': 'Itainópolis',
                '\uFFFDgua Branca': 'Água Branca',
                'S\uFFFDo Jos\uFFFD do Piau\uFFFD': 'São José do Piauí',
                'Bela Vista do Piau\uFFFD': 'Bela Vista do Piauí',
                'Alagoinha do Piau\uFFFD': 'Alagoinha do Piauí',
                'Capit\uFFFDo Gerv\uFFFDsio Oliveira': 'Capitão Gervásio Oliveira',
                'Reden\uFFFD\uFFFDo do Gurgu\uFFFDia': 'Redenção do Gurguéia',
                'Bel\uFFFDm do Piau\uFFFD': 'Belém do Piauí',
                'Manoel Em\uFFFDdio': 'Manoel Emídio',
                'Hugo Napole\uFFFDo': 'Hugo Napoleão',
                'Marcol\uFFFDndia': 'Marcolândia',
                "Barra D'Alc\uFFFDntara": "Barra D'Alcântara",
                'Jos\uFFFD de Freitas': 'José de Freitas',
                'Juazeiro do Piau\uFFFD': 'Juazeiro do Piauí',
                'Sim\uFFFDes': 'Simões',
                'An\uFFFDsio de Abreu': 'Anísio de Abreu',
                'Lagoinha do Piau\uFFFD': 'Lagoinha do Piauí',
                'J\uFFFDlio Borges': 'Júlio Borges',
                'Flores do Piau\uFFFD': 'Flores do Piauí',
                'Lagoa do Piau\uFFFD': 'Lagoa do Piauí',
                'Lagoa do S\uFFFDtio': 'Lagoa do Sítio',
                'Massap\uFFFD do Piau\uFFFD': 'Massapê do Piauí',
                'Lagoa do Barro do Piau\uFFFD': 'Lagoa do Barro do Piauí',
                'Lagoa de S\uFFFDo Francisco': 'Lagoa de São Francisco',
                'Floresta do Piau\uFFFD': 'Floresta do Piauí',
                'Caridade do Piau\uFFFD': 'Caridade do Piauí',
                'Paje\uFFFD do Piau\uFFFD': 'Pajeú do Piauí',
                'Cara\uFFFDbas do Piau\uFFFD': 'Caraúbas do Piauí',
                'Uru\uFFFDu\uFFFD': 'Uruçuí',
                'Cristal\uFFFDndia do Piau\uFFFD': 'Cristalândia do Piauí',
                'Novo Oriente do Piau\uFFFD': 'Novo Oriente do Piauí',
                'Novo Santo Ant\uFFFDnio': 'Novo Santo Antônio',
                'S\uFFFDo Francisco do Piau\uFFFD': 'São Francisco do Piauí',
                'S\uFFFDo Gon\uFFFDalo do Gurgu\uFFFDia': 'São Gonçalo do Gurguéia',
                'Palmeira do Piau\uFFFD': 'Palmeira do Piauí',
                'Simpl\uFFFDcio Mendes': 'Simplício Mendes',
                'Ant\uFFFDnio Almeida': 'Antônio Almeida',
                'Castelo do Piau\uFFFD': 'Castelo do Piauí',
                'Matias Ol\uFFFDmpio': 'Matias Olímpio',
                'Valen\uFFFDsa do Piau\uFFFD': 'Valença do Piauí',
                'Valen\uFFFDa do Piau\uFFFD': 'Valença do Piauí',
                'Barreiras do Piau\uFFFD': 'Barreiras do Piauí',
                'Caxing\uFFFD': 'Caxingó',
                'S\uFFFDo Jo\uFFFDo do Piau\uFFFD': 'São João do Piauí',
                'V\uFFFDrzea Branca': 'Várzea Branca',
                'S\uFFFDo Jos\uFFFD do Divino': 'São José do Divino',
                'Monte Alegre do Piau\uFFFD': 'Monte Alegre do Piauí',
                'Lu\uFFFDs Correia': 'Luís Correia',
                'S\uFFFDo Gon\uFFFDalo do Piau\uFFFD': 'São Gonçalo do Piauí',
                'S\uFFFDo Jo\uFFFDo da Fronteira': 'São João da Fronteira',
                'Morro do Chap\uFFFD\uFFFDu do Piau\uFFFD': 'Morro do Chapéu do Piauí',
                'Morro do Chap\uFFFDdo Piau\uFFFD': 'Morro do Chapéu do Piauí',
                'Morro do Chap\uFFFD': 'Morro do Chapéu do Piauí',
                'S\uFFFDo Jo\uFFFDo da Canabrava': 'São João da Canabrava',
                'Porto Alegre do Piau\uFFFD': 'Porto Alegre do Piauí',
                'Morro Cabe\uFFFDsa no Tempo': 'Morro Cabeça no Tempo',
                'Morro Cabe\uFFFDca no Tempo': 'Morro Cabeça no Tempo',
                'Morro Cabe\uFFFD no Tempo': 'Morro Cabeça no Tempo',
                'Morro Cabe\uFFFD': 'Morro Cabeça no Tempo',
                'S\uFFFDo Pedro do Piau\uFFFD': 'São Pedro do Piauí',
                'Francin\uFFFDpolis': 'Francinópolis',
                'Jo\uFFFDo Costa': 'João Costa',
                'Rio Grande do Piau\uFFFD': 'Rio Grande do Piauí',
                "Olho D'\uFFFDgua do Piau\uFFFD": "Olho D'Água do Piauí",
                'Isa\uFFFDas Coelho': 'Isaías Coelho',
                'Naz\uFFFDria': 'Nazária',
                'Nazar\uFFFD do Piau\uFFFD': 'Nazaré do Piauí',
                'Nossa Senhora de Nazar\uFFFD': 'Nossa Senhora de Nazaré',
                'Santo In\uFFFDcio do Piau\uFFFD': 'Santo Inácio do Piauí',
                'Assun\uFFFD\uFFFDo do Piau\uFFFD': 'Assunção do Piauí',
                'S\uFFFDo Braz do Piau\uFFFD': 'São Braz do Piauí',
                'Bom Princ\uFFFDpio do Piau\uFFFD': 'Bom Princípio do Piauí',
                'Sebasti\uFFFDo Barros': 'Sebastião Barros',
                'S\uFFFDo Raimundo Nonato': 'São Raimundo Nonato',
                'Boqueir\uFFFDo do Piau\uFFFD': 'Boqueirão do Piauí',
                'Angical do Piau\uFFFD': 'Angical do Piauí',
                'Capit\uFFFDo de Campos': 'Capitão de Campos',
                'Bonfim do Piau\uFFFD': 'Bonfim do Piauí',
                'Sebasti\uFFFDo Leal': 'Sebastião Leal',
                'Brejo do Piau\uFFFD': 'Brejo do Piauí',
                'Fartura do Piau\uFFFD': 'Fartura do Piauí',
                'Uni\uFFFDo': 'União',
                'Demerval Lob\uFFFDo': 'Demerval Lobão',
                'Nossa Senhora dos Rem\uFFFDdios': 'Nossa Senhora dos Remédios',
                'Alegrete do Piau\uFFFD': 'Alegrete do Piauí',
                'Cajazeiras do Piau\uFFFD': 'Cajazeiras do Piauí',
                'Caldeir\uFFFDo Grande do Piau\uFFFD': 'Caldeirão Grande do Piauí',
                'Cabeceiras do Piau\uFFFD': 'Cabeceiras do Piauí',
                'S\uFFFDlix do Piau\uFFFD': 'São Félix do Piauí',
                'S\uFFFDo F\uFFFDlix do Piau\uFFFD': 'São Félix do Piauí',
                'Parna\uFFFDba': 'Parnaíba',
                'Patos do Piau\uFFFD': 'Patos do Piauí',
                'Passagem Franca do Piau\uFFFD': 'Passagem Franca do Piauí',
                'S\uFFFDo Francisco de Assis do Piau\uFFFD': 'São Francisco de Assis do Piauí',
                "Pau D'Arco do Piau\uFFFD": "Pau D'Arco do Piauí",
                'S\uFFFDo Juli\uFFFDo': 'São Julião',
                'Alto Long\uFFFD': 'Alto Longá',
                'Jacobina do Piau\uFFFD': 'Jacobina do Piauí',
                'Vila Nova do Piau\uFFFD': 'Vila Nova do Piauí',
                'S\uFFFDo Luis do Piau\uFFFD': 'São Luís do Piauí',
                'S\uFFFDo Lu\uFFFDs do Piau\uFFFD': 'São Luís do Piauí',
                'S\uFFFDo Miguel da Baixa Grande': 'São Miguel da Baixa Grande',
                'S\uFFFDo Louren\uFFFD do Piau\uFFFD': 'São Lourenço do Piauí',
                'S\uFFFDo Louren\uFFFDso do Piau\uFFFD': 'São Lourenço do Piauí',
                'S\uFFFDo Louren\uFFFDco do Piau\uFFFD': 'São Lourenço do Piauí',
                'Campinas do Piau\uFFFD': 'Campinas do Piauí',
                'Dom Inoc\uFFFDncio': 'Dom Inocêncio',
                'Domingos Mour\uFFFDo': 'Domingos Mourão',
                'S\uFFFDo Miguel do Fidalgo': 'São Miguel do Fidalgo',
                'Campo Grande do Piau\uFFFD': 'Campo Grande do Piauí',
                'Regenera\uFFFD\uFFFDo': 'Regeneração',
                'Campo Largo do Piau\uFFFD': 'Campo Largo do Piauí',
                'Ribeira do Piau\uFFFD': 'Ribeira do Piauí',
                'Monsenhor Hip\uFFFDlito': 'Monsenhor Hipólito',
                'Santana do Piau\uFFFD': 'Santana do Piauí',
                'Bertol\uFFFDnia': 'Bertolínia',
                'Jaic\uFFFDs': 'Jaicós',
                'S\uFFFDo Miguel do Tapuio': 'São Miguel do Tapuio',
                'Jatob\uFFFD do Piau\uFFFD': 'Jatobá do Piauí',
                'Alvorada do Gurgu\uFFFDia': 'Alvorada do Gurguéia',
                'Santa Rosa do Piau\uFFFD': 'Santa Rosa do Piauí',
                'Bet\uFFFDnia do Piau\uFFFD': 'Betânia do Piauí',
                'Elesb\uFFFDo Veloso': 'Elesbão Veloso',
                'Ribeiro Gon\uFFFDalves': 'Ribeiro Gonçalves',
                'Acau\uFFFD': 'Acauã',
                'Ipiranga do Piau\uFFFD': 'Ipiranga do Piauí',
                // --- REDE HIDROGRÁFICA ---
                'Olho-d\'\uFFFDgua': 'Olho-d\'Água',
                'Ro\uFFFDa': 'Roça',
                'Cara\uFFFDbas': 'Caraúbas',
                'Jos\uFFFD': 'José',
                'Euz\uFFFDbio': 'Euzébio',
                'Vered\uFFFDo': 'Veredão',
                'Cai\uFFFDara': 'Caiçara',
                'Manda\uFFFDaia': 'Mandaçaia',
                'Juli\uFFFDo': 'Julião',
                'Pil\uFFFDes': 'Pilões',
                'Esperan\uFFFDa': 'Esperança',
                'M\uFFFDrcio': 'Márcio',
                'Samba\uFFFDba': 'Sambaíba',
                'Boqueir\uFFFDo': 'Boqueirão',
                'Furam\uFFFDo': 'Furamão',
                'Vit\uFFFDria': 'Vitória',
                'Camale\uFFFDo': 'Camaleão',
                'V\uFFFDo': 'Vão',
                'Carcar\uFFFD': 'Carcará',
                'Ara\uFFFD\uFFFD': 'Araçá',
                'Chic\uFFFDo': 'Chicão',
                'Po\uFFFDo': 'Poço',
                'Uru\uFFFD\uFFFD\uFFFD': 'Uruçuí',
                'S\uFFFD': 'Sá',
                'Capit\uFFFDo': 'Capitão',
                'Dami\uFFFDo': 'Damião',
                'Mucait\uFFFD': 'Mucaitá',
                'On\uFFFDa': 'Onça',
                'Timb\uFFFD': 'Timbó',
                'Caldeir\uFFFDo': 'Caldeirão',
                'Caldeir\uFFFDo': 'Caldeirão',
                'Caldeir\uFFFDo': 'Caldeirãozinho',
                'Ar\uFFFDbia': 'Arábia',
                'Agrest\uFFFDo': 'Agrestão',
                'Lam\uFFFD': 'Lamá',
                'Rom\uFFFDo': 'Romão',
                'Par\uFFFD': 'Pará',
                'Grot\uFFFDo': 'Grotão',
                'Gra\uFFFDno': 'Graúno',
                'Cabe\uFFFDa': 'Cabeça',
                'Jo\uFFFDo': 'João',
                'Pu\uFFFDazeiro': 'Puçazeiro',
                'Tob\uFFFDs': 'Tobás',
                'Macap\uFFFD': 'Macapá',
                'Fac\uFFFDo': 'Facão',
                'Pinda\uFFFDba': 'Pindaíba',
                'Sim\uFFFDes': 'Simões',
                'Brej\uFFFDo': 'Brejão',
                'Car\uFFFDo': 'Carão',
                'Gar\uFFFDas': 'Garças',
                'Pil\uFFFDo': 'Pilão',
                'P\uFFFD-da-Ladeira': 'Pé-da-Ladeira',
                'Gon\uFFFDalave': 'Gonçalave',
                'Anaj\uFFFD': 'Anajá',
                'Requeij\uFFFDo': 'Requeijão',
                'Ambr\uFFFDsio': 'Ambrósio',
                'Ta\uFFFDpoca': 'Taipoca',
                'Mar\uFFFDal': 'Marçal',
                'Cach\uFFFD': 'Cachá',
                'Parna\uFFFDba': 'Parnaíba',
                'Cai\uFFFDaras': 'Caiçaras',
                'Sucurui\uFFFD': 'Sucuruiá',
                'Ant\uFFFDnio': 'Antônio',
                'Gon\uFFFDalo': 'Gonçalo',
                'Sucuri\uFFFD': 'Sucuriú',
                'L\uFFFDu': 'Léu',
                'Perdi\uFFFD\uFFFDo': 'Perdição',
                'Barand\uFFFDo': 'Barandão',
                'Expedi\uFFFD\uFFFDo': 'Expedição',
                'Croat\uFFFD': 'Croatá',
                'Camba\uFFFDba': 'Cambaíba',
                'Fund\uFFFDo': 'Fundão',
                'Remiss\uFFFDo': 'Remissão',
                'Po\uFFFD\uFFFDes': 'Poções',
                'Louren\uFFFDo': 'Lourenço',
                'Catol\uFFFD': 'Catolé',
                'Uni\uFFFDo': 'União',
                'Moc\uFFFD': 'Mocó',
                'Capit\uFFFDes': 'Capitães',
                'Azul\uFFFDo': 'Azulão',
                'Minera\uFFFD\uFFFDo': 'Mineração',
                'Piraj\uFFFD': 'Pirajá',
                'Carna\uFFFDba': 'Carnaúba',
                'Cansan\uFFFD\uFFFDo': 'Cansanção',
                'Graja\uFFFD': 'Grajaú',
                'Tr\uFFFDes': 'Três',
                'F\uFFFDsforo': 'Fósforo',
                'Ab\uFFFDbora': 'Abóbora',
                'Cip\uFFFD': 'Cipó',
                'Consola\uFFFD\uFFFDo': 'Consolação',
                'Jacare\uFFFD': 'Jacareí',
                'Caranj\uFFFDo': 'Caranjão',
                'V\uFFFDrzea': 'Várzea',
                'Lan\uFFFDa': 'Lança',
                'Curimat\uFFFD': 'Curimatá',
                'Salt\uFFFDo': 'Saltão',
                'Barroc\uFFFDo': 'Barrocão',
                'Basti\uFFFDo': 'Bastião',
                'A\uFFFDude': 'Açude',
                'Gamb\uFFFD': 'Gambá',
                'Por\uFFFD\uFFFDo': 'Porção',
                'Trapi\uFFFD': 'Trapiá',
                'Sabor\uFFFD': 'Saborá',
                'Confus\uFFFDes': 'Confusões',
                'Jacar\uFFFD': 'Jacaré',
                'Mimb\uFFFD': 'Mimbó',
                'C\uFFFDrrego': 'Córrego',
                'Marimb\uFFFD': 'Marimbó',
                'Sap\uFFFD': 'Sapé',
                'Ford\uFFFDo': 'Fordão',
                'Cunh\uFFFDs': 'Cunhãs',
                'Muqu\uFFFDm': 'Muquém',
                'Alm\uFFFDecegas': 'Almécegas',
                'Ing\uFFFD': 'Ingá',
                'Uru\uFFFD\uFFFDu': 'Uruçu',
                'Arab\uFFFD': 'Arabá',
                'S\uFFFDtio': 'Sítio',
                'Corrent\uFFFDo': 'Correntão',
                'Riach\uFFFDo': 'Riachão',
                'Barrac\uFFFDo': 'Barracão',
                'Cir\uFFFDaco': 'Ciríaco',
                'C\uFFFDndido': 'Cândido',
                'Po\uFFFD\uFFFDo': 'Poção',
                'Chap\uFFFDu': 'Chapéu',
                'Cai\uFFFDarinha': 'Caiçarinha',
                'Pau-d\'\uFFFDgua': 'Pau-d\'Água',
                'P\uFFFD': 'Pé',
                'Bouqueir\uFFFDo': 'Bouqueirão',
                'Canind\uFFFD': 'Canindé',
                'Gurgu\uFFFDia': 'Gurguéia',
                'Paci\uFFFDncia': 'Paciência',
                'Pared\uFFFDo': 'Paredão',
                'Caba\uFFFDas': 'Cabaças',
                'Po\uFFFDos': 'Poços',
                'Paje\uFFFD': 'Pajeú',
                'Mat\uFFFDes': 'Matões',
                'Marato\uFFFD': 'Maratoã',
                'Rapos\uFFFDo': 'Raposão',
                'T\uFFFDbua': 'Tábua',
                'Jatob\uFFFD': 'Jatobá',
                'Jacara\uFFFD': 'Jacaraí',
                'Ining\uFFFD': 'Iningá',
                'Baix\uFFFDo': 'Baixão',
                'Miror\uFFFD': 'Miroró',
                'Igarap\uFFFD': 'Igarapé',
                'Confus\uFFFDo': 'Confusão',
                'Su\uFFFDuarana': 'Suçuarana',
                'Greg\uFFFDrio': 'Gregório',
                'P\uFFFD-de-Morro': 'Pé-de-Morro',
                'Escaramu\uFFFDa': 'Escaramuça',
                'Al\uFFFDvio': 'Alívio',
                'C\uFFFDgados': 'Cágados',
                'Tamandu\uFFFD': 'Tamanduá',
                'Estev\uFFFDo': 'Estevão',
                'Simpl\uFFFDcio': 'Simplício',
                'Bel\uFFFDm': 'Belém',
                'Juc\uFFFD': 'Jucá',
                'Gra\uFFFDa': 'Graúna',
                'Mal\uFFFDcia': 'Malícia',
                'Caba\uFFFDos': 'Cabaços',
                'Vared\uFFFDo': 'Varedão',
                'd\'\uFFFDgua': 'd\'Água',
                'Gravat\uFFFD': 'Gravatá',
                'Ros\uFFFDrio': 'Rosário',
                'Pu\uFFFD\uFFFD': 'Puçá',
                'Chup\uFFFD': 'Chupé',
                'Ribeir\uFFFDo': 'Ribeirão',
                'Tabo\uFFFD': 'Taboã',
                'Ter\uFFFDados': 'Terçados',
                'Almo\uFFFDo': 'Almoço',
                'Concei\uFFFD\uFFFDo': 'Conceição',
                'Am\uFFFDeica': 'América',
                '\uFFFDguas': 'Águas',
                'Can\uFFFDrio': 'Canário',
                '\uFFFDgua': 'Água',
                'Sonh\uFFFDm': 'Sonhém',
                // --- ÁREAS DE CONSERVAÇÃO (nomeuc) ---
                'PARQUE NACIONAL DA SERRA DAS CONFUS\uFFFDES': 'PARQUE NACIONAL DA SERRA DAS CONFUSÕES',
                '\uFFFDREA DE PROTE\uFFFD\uFFFDO AMBIENTAL SERRA DA IBIAPABA': 'ÁREA DE PROTEÇÃO AMBIENTAL SERRA DA IBIAPABA',
                'RESERVA EXTRATIVISTA MARINHA DO DELTA DO PARNA\uFFFDBA': 'RESERVA EXTRATIVISTA MARINHA DO DELTA DO PARNAÍBA',
                '\uFFFDREA DE PROTE\uFFFD\uFFFDO AMBIENTAL SERRA DA TABATINGA': 'ÁREA DE PROTEÇÃO AMBIENTAL SERRA DA TABATINGA',
                'PARQUE NACIONAL DAS NASCENTES DO RIO PARNA\uFFFDBA': 'PARQUE NACIONAL DAS NASCENTES DO RIO PARNAÍBA',
                '\uFFFDREA DE PROTE\uFFFD\uFFFDO AMBIENTAL DELTA DO PARNA\uFFFDBA': 'ÁREA DE PROTEÇÃO AMBIENTAL DELTA DO PARNAÍBA',
                'ESTA\uFFFD\uFFFDO ECOL\uFFFDGICA DE URU\uFFFDU\uFFFD - UNA': 'ESTAÇÃO ECOLÓGICA DE URUÇUÍ - UNA',
                '\uFFFDREA DE PROTE\uFFFD\uFFFDO AMBIENTAL DA CHAPADA DO ARARIPE': 'ÁREA DE PROTEÇÃO AMBIENTAL DA CHAPADA DO ARARIPE',

                // Palavras-chave isoladas (garantia para nomeuc)
                '\uFFFDREA': 'ÁREA',
                'PROTE\uFFFD\uFFFDO': 'PROTEÇÃO',
                'PARNA\uFFFDBA': 'PARNAÍBA',
                'ECOL\uFFFDGICA': 'ECOLÓGICA',
                'CONFUS\uFFFDES': 'CONFUSÕES',
                'URU\uFFFDU\uFFFD': 'URUÇUÍ',

                // --- DEMARCAÇÃO (demarcacao) ---
                'N\uFFFDo demarcada': 'Não demarcada',
                'N\uFFFDo se aplica': 'Não se aplica',
                'N\uFFFDo': 'Não',

                'fid': 'FID',
                'Empreendim': 'Empreendimento',
                'CEG': 'Código CEG',
                'UF': 'Estado',
                'Fonte': 'Fonte',
                'Fase': 'Fase',
                'Origem': 'Origem',
                'Tipo': 'Tipo de Geração',
                'Tipo de At': 'Tipo de Outorga',
                'Combust\uFFFDve': 'Combustível',
                'Inicio ope': 'Início da Operação',
                'Pot\uFFFDncia O': 'Potência Outorgada (kW)',
                'Pot\uFFFDncia F': 'Potência Fiscalizada (kW)',
                'Garantia F': 'Garantia Física (MW)',
                'Gera\uFFFDao Qu': 'Geração Qualificada',
                'Latitude D': 'Latitude',
                'Longitude': 'Longitude',
                'In\uFFFDcio Vig': 'Início de Vigência',
                'Fim Vig\uFFFDnc': 'Fim de Vigência',
                'Propriet\uFFFDr': 'Proprietário',
                'Sub-Bacia': 'Sub-Bacia',
                'Munic\uFFFDpio': 'Município',
                'ID': 'ID',
                'categoria': 'Categoria',
                'parent_id': 'Parent ID',
                'name': 'Tipo',
                'Label': 'Rótulo',
                        };

            for (var termoErrado in correcoes) {
                if (valString.indexOf(termoErrado) !== -1) {
                    valString = valString.split(termoErrado).join(correcoes[termoErrado]);
                }
            }
        }

        if (layer.get('fieldImages')[key] != "ExternalResource") {
            popupField += (rawValue != null ? autolinker.link(valString) + '</td>' : '');
        } else {
            popupField += (rawValue != null ? autolinker.link(valString) + '</td>' : '');
        }

        popupText += '<tr>' + popupField + '</tr>';
    }
    return popupText;
}

var highlight;
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

function onPointerMove(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var clusterLength;
    var popupText = '<ul>';

    // Collect all features and their layers at the pixel
    var featuresAndLayers = [];
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            featuresAndLayers.push({ feature, layer });
        }
    });

    // Iterate over the features and layers in reverse order
    for (var i = featuresAndLayers.length - 1; i >= 0; i--) {
        var feature = featuresAndLayers[i].feature;
        var layer = featuresAndLayers[i].layer;
        var doPopup = false;
        for (k in layer.get('fieldImages')) {
            if (layer.get('fieldImages')[k] != "Hidden") {
                doPopup = true;
            }
        }
        currentFeature = feature;
        currentLayer = layer;
        clusteredFeatures = feature.get("features");
        if (clusteredFeatures) {
            clusterLength = clusteredFeatures.length;
        }
        if (typeof clusteredFeatures !== "undefined") {
            if (doPopup) {
                for(var n=0; n<clusteredFeatures.length; n++) {
                    currentFeature = clusteredFeatures[n];
                    currentFeatureKeys = currentFeature.getKeys();
                    popupText += '<li><table>'
                    popupText += '<a>' + '<b>' + layer.get('popuplayertitle') + '</b>' + '</a>';
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table></li>';    
                }
            }
        } else {
            currentFeatureKeys = currentFeature.getKeys();
            if (doPopup) {
                popupText += '<li><table>';
                popupText += '<a>' + '<b>' + layer.get('popuplayertitle') + '</b>' + '</a>';
                popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                popupText += '</table></li>';
            }
        }
    }

    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
    
	if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var featureStyle
                if (typeof clusteredFeatures == "undefined") {
					var style = currentLayer.getStyle();
					var styleFunction = typeof style === 'function' ? style : function() { return style; };
					featureStyle = styleFunction(currentFeature)[0];
				} else {
					featureStyle = currentLayer.getStyle().toString();
				}

                if (currentFeature.getGeometry().getType() == 'Point' || currentFeature.getGeometry().getType() == 'MultiPoint') {
                    var radius
					if (typeof clusteredFeatures == "undefined") {
						radius = featureStyle.getImage().getRadius();
					} else {
						radius = parseFloat(featureStyle.split('radius')[1].split(' ')[1]) + clusterLength;
					}

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: "rgba(255, 255, 0, 1.00)"
                            }),
                            radius: radius
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'LineString' || currentFeature.getGeometry().getType() == 'MultiLineString') {

                    var featureWidth = featureStyle.getStroke().getWidth();

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'rgba(255, 255, 0, 1.00)',
                            lineDash: null,
                            width: featureWidth
                        })
                    });

                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 0, 1.00)'
                        })
                    })
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
			content.innerHTML = popupText;
            container.style.display = 'block';
            overlayPopup.setPosition(coord);
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

map.on('pointermove', onPointerMove);

var popupContent = '';
var popupCoord = null;
var featuresPopupActive = false;

function updatePopup() {
    if (popupContent) {
        content.innerHTML = popupContent;
        container.style.display = 'block';
		overlayPopup.setPosition(popupCoord);
    } else {
        container.style.display = 'none';
        closer.blur();
        stopMediaInPopup();
    }
} 

function onSingleClickFeatures(evt) {
    if (doHover || sketch) {
        return;
    }
    if (!featuresPopupActive) {
        featuresPopupActive = true;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupText = '';
    
    // Pega APENAS a primeira feição no ponto clicado (a mais acima visualmente)
    var hit = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            var doPopup = false;
            for (var k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] !== "Hidden") {
                    doPopup = true;
                }
            }
            if (doPopup) {
                return { feature: feature, layer: layer }; // para na primeira camada encontrada!
            }
        }
    });

    if (hit) {
        var feature = hit.feature;
        var layer = hit.layer;
        var clusteredFeatures = feature.get("features");
        var currentFeature = (clusteredFeatures && clusteredFeatures.length > 0) ? clusteredFeatures[0] : feature;
        var currentFeatureKeys = currentFeature.getKeys();

        popupText += '<ul><li><table>';
        popupText += '<a><b>' + (layer.get('popuplayertitle') || '') + '</b></a>';
        popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
        popupText += '</table></li></ul>';
    }
	
    popupContent = popupText;
    popupCoord = coord;
    updatePopup();
}

function onSingleClickWMS(evt) {
    if (doHover || sketch) {
        return;
    }
    if (!featuresPopupActive) {
        popupContent = '';
    }
    var coord = evt.coordinate;
    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();

    for (var i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1] && wms_layers[i][0].getVisible()) {
            var url = wms_layers[i][0].getSource().getFeatureInfoUrl(
                evt.coordinate, viewResolution, viewProjection, {
                    'INFO_FORMAT': 'text/html',
                });
            if (url) {
                const wmsTitle = wms_layers[i][0].get('popuplayertitle');
                var ldsRoller = '<div class="roller-switcher" style="height: 25px; width: 25px;"></div>';

                popupCoord = coord;
                popupContent += ldsRoller;
                updatePopup();

                var timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        reject(new Error('Timeout exceeded'));
                    }, 5000); // (5 second)
                });

                // Function to try fetch with different option
                function tryFetch(urls) {
                    if (urls.length === 0) {
                        return Promise.reject(new Error('All fetch attempts failed'));
                    }
                    return fetch(urls[0])
                        .then((response) => {
                            if (response.ok) {
                                return response.text();
                            } else {
                                throw new Error('Fetch failed');
                            }
                        })
                        .catch(() => tryFetch(urls.slice(1))); // Try next URL
                }

                // List of URLs to try
                // The first URL is the original, the second is the encoded version, and the third is the proxy
                const urlsToTry = [
                    url,
                    encodeURIComponent(url),
                    'https://api.allorigins.win/raw?url=' + encodeURIComponent(url)
                ];

                Promise.race([tryFetch(urlsToTry), timeoutPromise])
                    .then((html) => {
                        if (html.indexOf('<table') !== -1) {
                            popupContent += '<a><b>' + wmsTitle + '</b></a>';
                            popupContent += html + '<p></p>';
                            updatePopup();
                        }
                    })
                    .finally(() => {
                        setTimeout(() => {
                            var loaderIcon = document.querySelector('.roller-switcher');
                            if (loaderIcon) loaderIcon.remove();
                        }, 500); // (0.5 second)
                    });
            }
        }
    }
}

map.on('singleclick', onSingleClickFeatures);
map.on('singleclick', onSingleClickWMS);

//get container
var topLeftContainerDiv = document.getElementById('top-left-container')
var bottomLeftContainerDiv = document.getElementById('bottom-left-container')
var topRightContainerDiv = document.getElementById('top-right-container')
var bottomRightContainerDiv = document.getElementById('bottom-right-container')

//title

//abstract


//geolocate



//measurement
let measuring = false;

	const measureButton = document.createElement('button');
	measureButton.className = 'measure-button fas fa-ruler';
	measureButton.title = 'Measure';

	const measureControl = document.createElement('div');
	measureControl.className = 'ol-unselectable ol-control measure-control';
	measureControl.appendChild(measureButton);
	map.getTargetElement().appendChild(measureControl);

	// Event handler
	function handleMeasure() {
	  if (!measuring) {
		selectLabel.style.display = "";
		map.addInteraction(draw);
		createHelpTooltip();
		createMeasureTooltip();
		measuring = true;
	  } else {
		selectLabel.style.display = "none";
		map.removeInteraction(draw);
		map.removeOverlay(helpTooltip);
		map.removeOverlay(measureTooltip);
		const staticTooltips = document.getElementsByClassName("tooltip-static");
		while (staticTooltips.length > 0) {
		  staticTooltips[0].parentNode.removeChild(staticTooltips[0]);
		}
		measureLayer.getSource().clear();
		sketch = null;
		measuring = false;
	  }
	}

	measureButton.addEventListener('click', handleMeasure);
	measureButton.addEventListener('touchstart', handleMeasure);

    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
        if (measuring) {
            /** @type {string} */
            var helpMsg = 'Click to start drawing';
            if (sketch) {
                var geom = (sketch.getGeometry());
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }
            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);
        }
    });
    

    var selectLabel = document.createElement("label");
    selectLabel.innerHTML = "&nbsp;Measure:&nbsp;";

    var typeSelect = document.createElement("select");
    typeSelect.id = "type";

    var measurementOption = [
        { value: "LineString", description: "Length" },
        { value: "Polygon", description: "Area" }
        ];
    measurementOption.forEach(function (option) {
        var optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.text = option.description;
        typeSelect.appendChild(optionElement);
    });

    selectLabel.appendChild(typeSelect);
    measureControl.appendChild(selectLabel);

    selectLabel.style.display = "none";
	/**
	 * Currently drawn feature.
	 * @type {ol.Feature}
	 */

	/**
	 * The help tooltip element.
	 * @type {Element}
	 */
	var helpTooltipElement;


	/**
	 * Overlay to show the help messages.
	 * @type {ol.Overlay}
	 */
	var helpTooltip;


	/**
	 * The measure tooltip element.
	 * @type {Element}
	 */
	var measureTooltipElement;


	/**
	 * Overlay to show the measurement.
	 * @type {ol.Overlay}
	 */
	var measureTooltip;


	/**
	 * Message to show when the user is drawing a line.
	 * @type {string}
	 */
	var continueLineMsg = 'Click to continue drawing the line';



	/**
	 * Message to show when the user is drawing a polygon.
	 * @type {string}
	 */
	var continuePolygonMsg = "1click continue, 2click close";


	var typeSelect = document.getElementById("type");
	var typeSelectForm = document.getElementById("form_measure");

	typeSelect.onchange = function (e) {		  
	  map.removeInteraction(draw);
	  addInteraction();
	  map.addInteraction(draw);		  
	};

	var measureLineStyle = new ol.style.Style({
	  stroke: new ol.style.Stroke({ 
		color: "rgba(0, 0, 255)", //blu
		lineDash: [10, 10],
		width: 4
	  }),
	  image: new ol.style.Circle({
		radius: 6,
		stroke: new ol.style.Stroke({
		  color: "rgba(255, 255, 255)", 
		  width: 1
		}),
	  })
	});

	var measureLineStyle2 = new ol.style.Style({	  
		stroke: new ol.style.Stroke({
			color: "rgba(255, 255, 255)", 
			lineDash: [10, 10],
			width: 2
		  }),
	  image: new ol.style.Circle({
		radius: 5,
		stroke: new ol.style.Stroke({
		  color: "rgba(0, 0, 255)", 
		  width: 1
		}),
			  fill: new ol.style.Fill({
		  color: "rgba(255, 204, 51, 0.4)", 
		}),
		  })
	});

	var labelStyle = new ol.style.Style({
	  text: new ol.style.Text({
		font: "14px Calibri,sans-serif",
		fill: new ol.style.Fill({
		  color: "rgba(0, 0, 0, 1)"
		}),
		stroke: new ol.style.Stroke({
		  color: "rgba(255, 255, 255, 1)",
		  width: 3
		})
	  })
	});

	var labelStyleCache = [];

	var styleFunction = function (feature, type) {
	  var styles = [measureLineStyle, measureLineStyle2];
	  var geometry = feature.getGeometry();
	  var type = geometry.getType();
	  var lineString;
	  if (!type || type === type) {
		if (type === "Polygon") {
		  lineString = new ol.geom.LineString(geometry.getCoordinates()[0]);
		} else if (type === "LineString") {
		  lineString = geometry;
		}
	  }
	  if (lineString) {
		var count = 0;
		lineString.forEachSegment(function (a, b) {
		  var segment = new ol.geom.LineString([a, b]);
		  var label = formatLength(segment);
		  if (labelStyleCache.length - 1 < count) {
			labelStyleCache.push(labelStyle.clone());
		  }
		  labelStyleCache[count].setGeometry(segment);
		  labelStyleCache[count].getText().setText(label);
		  styles.push(labelStyleCache[count]);
		  count++;
		});
	  }
	  return styles;
	};
	var source = new ol.source.Vector();

	var measureLayer = new ol.layer.Vector({
	  source: source,
	  displayInLayerSwitcher: false,
	  style: function (feature) {
		labelStyleCache = [];
		return styleFunction(feature);
	  }
	});

	map.addLayer(measureLayer);

	var draw; // global so we can remove it later
	function addInteraction() {
	  var type = typeSelect.value;
	  draw = new ol.interaction.Draw({
		source: source,
		type: /** @type {ol.geom.GeometryType} */ (type),
		style: function (feature) {
				  return styleFunction(feature, type);
				}
	  });

	  var listener;
	  draw.on('drawstart',
		  function(evt) {
			// set sketch
			sketch = evt.feature;

			/** @type {ol.Coordinate|undefined} */
			var tooltipCoord = evt.coordinate;

			listener = sketch.getGeometry().on('change', function(evt) {
			  var geom = evt.target;
			  var output;
			  if (geom instanceof ol.geom.Polygon) {
					  output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
					  tooltipCoord = geom.getInteriorPoint().getCoordinates();
					} else if (geom instanceof ol.geom.LineString) {
					  output = formatLength(/** @type {ol.geom.LineString} */ (geom));
					  tooltipCoord = geom.getLastCoordinate();
					}
			  measureTooltipElement.innerHTML = output;
			  measureTooltip.setPosition(tooltipCoord);
			});
		  }, this);

	  draw.on('drawend',
		  function(evt) {
			measureTooltipElement.className = 'tooltip tooltip-static';
			measureTooltip.setOffset([0, -7]);
			// unset sketch
			sketch = null;
			// unset tooltip so that a new one can be created
			measureTooltipElement = null;
			createMeasureTooltip();
			ol.Observable.unByKey(listener);
		  }, this);
	}


	/**
	 * Creates a new help tooltip
	 */
	function createHelpTooltip() {
	  if (helpTooltipElement) {
		helpTooltipElement.parentNode.removeChild(helpTooltipElement);
	  }
	  helpTooltipElement = document.createElement('div');
	  helpTooltipElement.className = 'tooltip hidden';
	  helpTooltip = new ol.Overlay({
		element: helpTooltipElement,
		offset: [15, 0],
		positioning: 'center-left'
	  });
	  map.addOverlay(helpTooltip);
	}


	/**
	 * Creates a new measure tooltip
	 */
	function createMeasureTooltip() {
	  if (measureTooltipElement) {
		measureTooltipElement.parentNode.removeChild(measureTooltipElement);
	  }
	  measureTooltipElement = document.createElement('div');
	  measureTooltipElement.className = 'tooltip tooltip-measure';
	  measureTooltip = new ol.Overlay({
		element: measureTooltipElement,
		offset: [0, -15],
		positioning: 'bottom-center'
	  });
	  map.addOverlay(measureTooltip);
	}


  /**
  * format length output
  * @param {ol.geom.LineString} line
  * @return {string}
  */
  var formatLength = function(line) {
    var length;
    var coordinates = line.getCoordinates();
    length = 0;
    var sourceProj = map.getView().getProjection();
    for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
        var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
        length += ol.sphere.getDistance(c1, c2);
      }
    var output;
    if (length > 100) {
      output = (Math.round(length / 1000 * 100) / 100) +
          ' ' + 'km';
    } else {
      output = (Math.round(length * 100) / 100) +
          ' ' + 'm';
    }
    return output;
  };

  /**
  * Format area output.
  * @param {ol.geom.Polygon} polygon The polygon.
  * @return {string} Formatted area.
  */
	var formatArea = function (polygon) {
		var sourceProj = map.getView().getProjection();
		var geom = polygon.clone().transform(sourceProj, 'EPSG:3857');
		var area = Math.abs(ol.sphere.getArea(geom));
		var output;
		if (area > 1000000) {
			output = Math.round((area / 1000000) * 1000) / 1000 + ' ' + 'km<sup>2</sup>';
		} else {
			output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
		}
		return output.replace('.', ',');
	};

  addInteraction();

  var parentElement = document.querySelector(".measure-control");
  var elementToMove = document.getElementById("form_measure");
  if (elementToMove && parentElement) {
    parentElement.insertBefore(elementToMove, parentElement.firstChild);
  }


//geocoder


//layer search


//scalebar


//layerswitcher

var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: "Layers",
    target: 'top-right-container'
});
map.addControl(layerSwitcher);
    





//attribution
var bottomAttribution = new ol.control.Attribution({
  collapsible: false,
  collapsed: false,
  className: 'bottom-attribution'
});
map.addControl(bottomAttribution);

map.once('rendercomplete', function() {
  var bottomAttributionUl = bottomAttribution.element.querySelector('ul');
  if (bottomAttributionUl) {
    var layerAttrs = Array.from(bottomAttributionUl.querySelectorAll('li'))
      .map(function(li) { return li.innerHTML.trim(); }).filter(Boolean);
    var attribHtml = `
    <a href="https://github.com/qgis2web/qgis2web">qgis2web</a> &middot;
    <a href="https://openlayers.org/">OpenLayers</a> &middot;
    <a href="https://qgis.org/">QGIS</a>`;
    if (layerAttrs.length > 0) { attribHtml += ' &nbsp;|&nbsp; ' + layerAttrs.join(', '); }
    bottomAttributionUl.innerHTML = '<li>' + attribHtml + '</li>';
  }
});


// Disable "popup on hover" or "highlight on hover" if ol-control mouseover
var preDoHover = doHover;
var preDoHighlight = doHighlight;
var isPopupAllActive = false;
document.addEventListener('DOMContentLoaded', function() {
	if (doHover || doHighlight) {
		var controlElements = document.getElementsByClassName('ol-control');
		for (var i = 0; i < controlElements.length; i++) {
			controlElements[i].addEventListener('mouseover', function() { 
				doHover = false;
				doHighlight = false;
			});
			controlElements[i].addEventListener('mouseout', function() {
				doHover = preDoHover;
				if (isPopupAllActive) { return }
				doHighlight = preDoHighlight;
			});
		}
	}
});


//move controls inside containers, in order
    //zoom
    var zoomControl = document.getElementsByClassName('ol-zoom')[0];
    if (zoomControl) {
        topLeftContainerDiv.appendChild(zoomControl);
    }
    //geolocate
    if (typeof geolocateControl !== 'undefined') {
        topLeftContainerDiv.appendChild(geolocateControl);
    }
    //measure
    if (typeof measureControl !== 'undefined') {
        topLeftContainerDiv.appendChild(measureControl);
    }
    //geocoder
    var searchbar = document.getElementsByClassName('photon-geocoder-autocomplete ol-unselectable ol-control')[0];
    if (searchbar) {
        topLeftContainerDiv.appendChild(searchbar);
    }
    //search layer
    var searchLayerControl = document.getElementsByClassName('search-layer')[0];
    if (searchLayerControl) {
        topLeftContainerDiv.appendChild(searchLayerControl);
    }
    //scale line
    var scaleLineControl = document.getElementsByClassName('ol-scale-line')[0];
    if (scaleLineControl) {
        scaleLineControl.className += ' ol-control';
        bottomLeftContainerDiv.appendChild(scaleLineControl);
    }
    //attribution
    var attributionControl = document.getElementsByClassName('bottom-attribution')[0];
    if (attributionControl) {
        bottomRightContainerDiv.appendChild(attributionControl);
    }



// ==========================================
// CATÁLOGO DE CAMADAS EXTERNAS DA INDE
// ==========================================

// Catálogo com as URLs e camadas oficiais testadas
var catalogoINDE = {
  'IBGE': [
    {
      id: 'ibge_estados',
      nome: 'Estados do Brasil (2022)',
      url: 'https://geoservicos.ibge.gov.br/geoserver/wms',
      layer: 'CGEO:estados_2022'
    },
    {
      id: 'ibge_municipios',
      nome: 'Municípios do Brasil (2022)',
      url: 'https://geoservicos.ibge.gov.br/geoserver/wms',
      layer: 'CGEO:municipios_2022'
    },
    {
      id: 'ibge_biomas',
      nome: 'Biomas do Brasil',
      url: 'https://geoservicos.ibge.gov.br/geoserver/wms',
      layer: 'CGEO:Biomas'
    }
  ],
  'FUNAI': [
    {
      id: 'funai_ti',
      nome: 'Terras Indígenas (Poligonais)',
      url: 'https://geoserver.funai.gov.br/geoserver/wms',
      layer: 'funai:tis_poligonais'
    }
  ],
  'ICMBIO': [
    {
      id: 'icmbio_uc',
      nome: 'Unidades de Conservação Federais',
      url: 'https://geoservicos.inde.gov.br/geoserver/ICMBio/ows',
      layer: 'ICMBio:UC_federais'
    }
  ]
};

// Armazena as camadas ativas na memória do OpenLayers
var camadasIndeCarregadas = {};

// Função para abrir / fechar o painel
window.togglePainelInde = function() {
  var painel = document.getElementById('painel-inde');
  if (painel) {
    painel.style.display = (painel.style.display === 'block') ? 'none' : 'block';
  }
};

// Atualiza a lista de opções quando o usuário escolhe a instituição no <select>
window.atualizarListaCamadasInde = function() {
  var orgao = document.getElementById('select-orgao-inde').value;
  var container = document.getElementById('container-camadas-inde');
  container.innerHTML = '';

  if (!orgao || !catalogoINDE[orgao]) {
    container.innerHTML = '<em style="color: #888; font-size: 12px;">Selecione uma instituição acima para carregar as opções disponíveis.</em>';
    return;
  }

  catalogoINDE[orgao].forEach(function(item) {
    var estaAtiva = camadasIndeCarregadas[item.id] ? camadasIndeCarregadas[item.id].getVisible() : false;

    var label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '6px';
    label.style.cursor = 'pointer';

    var chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = estaAtiva;
    chk.onchange = function() {
      alternarCamadaDinamicaInde(item, this.checked);
    };

    label.appendChild(chk);
    label.appendChild(document.createTextNode(' ' + item.nome));
    container.appendChild(label);
  });
};

// Cria ou alterna a camada no mapa OpenLayers com Z-Index alto para garantir visibilidade
function alternarCamadaDinamicaInde(item, visivel) {
  if (!camadasIndeCarregadas[item.id]) {
    var novaCamada = new ol.layer.Tile({
      visible: true,
      title: item.nome,
      zIndex: 9999, // Garante que a camada fique no topo das outras
      source: new ol.source.TileWMS({
        url: item.url,
        params: {
          'LAYERS': item.layer,
          'TILED': true,
          'FORMAT': 'image/png',
          'TRANSPARENT': true
        },
        serverType: 'geoserver',
        crossOrigin: 'anonymous'
      })
    });

    camadasIndeCarregadas[item.id] = novaCamada;
    map.addLayer(novaCamada);
  } else {
    camadasIndeCarregadas[item.id].setVisible(visivel);
  }
}