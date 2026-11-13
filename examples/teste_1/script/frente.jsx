#target illustrator

(function () {
    if (app.documents.length === 0) {
        alert("Abra frente.svg antes de executar este script.");
        return;
    }

    var doc = app.activeDocument;
    if (doc.name.toLowerCase().indexOf("frente") < 0) {
        alert("Este script foi criado para frente.svg.");
        return;
    }

    try { doc.layers.getByName("TEXTO EDITAVEL"); alert("O texto já foi reconstruído."); return; } catch (e) {}

    var blocks = [
        { source:"SOURCE__front_brand", name:"Marca", text:"PHARMAPELE", x:14, y:9, w:75, h:9, font:"MazzardH-Bold", size:14.46, leading:16, color:"163d6c", tracking:40 },
        { source:"SOURCE__front_store", name:"Loja", text:"PAULISTA", x:14, y:18, w:40, h:6, font:"MazzardM-SemiBold", size:7.65, leading:9, color:"2288c9", tracking:160 },
        { source:"SOURCE__front_eyebrow", name:"Chamada superior", text:"CUIDADO QUE COMEÇA POR VOCÊ", x:14, y:37, w:100, h:7, font:"MazzardM-Bold", size:8.5, leading:10, color:"2288c9", tracking:120 },
        { source:"SOURCE__front_headline", name:"Título principal", text:"VOCÊ MERECE\rUM MOMENTO\rDE CUIDADO ÚNICO.", x:14, y:48, w:120, h:31, font:"MazzardH-Black", size:24.66, leading:28.91, color:"163d6c", tracking:-20, rotation:2, firstLineColor:"ffffff" },
        { source:"SOURCE__front_intro", name:"Introdução", text:"Reserve um tempo para cuidar de você\rcom ciência, beleza e acolhimento.", x:51, y:85, w:83, h:15, font:"MazzardM-Regular", size:10.06, leading:14.17, color:"31465c", tracking:0 },
        { source:"SOURCE__front_coupon_label", name:"Rótulo do cupom", text:"APRESENTE ESTE CUPOM NA LOJA", x:24, y:110, w:100, h:7, font:"MazzardM-Bold", size:7.51, leading:9, color:"2288c9", tracking:150 },
        { source:"SOURCE__front_coupon_title", name:"Oferta principal", text:"REVITALIZAÇÃO FACIAL\rGRATUITA", x:24, y:120, w:102, h:20, font:"MazzardH-Black", size:17.43, leading:20.41, color:"163d6c", tracking:0 },
        { source:"SOURCE__front_coupon_note", name:"Instrução do cupom", text:"Agende sua experiência de cuidado em nossa loja.", x:24, y:143, w:100, h:8, font:"MazzardM-Regular", size:7.8, leading:10, color:"31465c", tracking:0 },
        { source:"SOURCE__front_whatsapp", name:"WhatsApp", text:"WHATSAPP  81 99559-2532", x:23, y:174, w:90, h:8, font:"MazzardM-Bold", size:9.78, leading:12, color:"163d6c", tracking:0 },
        { source:"SOURCE__front_instagram", name:"Instagram", text:"@pharmapelepaulista", x:23, y:182, w:75, h:7, font:"MazzardM-SemiBold", size:9.21, leading:11, color:"2288c9", tracking:0 },
        { source:"SOURCE__front_address", name:"Endereço", text:"Av. Mal. Floriano Peixoto, 56 – 1A\rPaulista • PE", x:23, y:194, w:90, h:12, font:"MazzardM-Regular", size:7.51, leading:11.34, color:"31465c", tracking:0 }
    ];

    rebuild(doc, blocks);

    function rebuild(doc, blocks) {
        for (var i = 0; i < blocks.length; i++) getFont(blocks[i].font);

        var removed = removeImportedText(doc);
        var layer = doc.layers.add();
        layer.name = "TEXTO EDITAVEL";

        for (var j = 0; j < blocks.length; j++) {
            createAreaText(doc, layer, blocks[j]);
        }

        alert("Frente concluída: " + blocks.length + " caixas criadas e " + removed + " textos importados removidos.");
    }

    function createAreaText(doc, layer, b) {
        var art = doc.artboards[doc.artboards.getActiveArtboardIndex()].artboardRect;
        var left = art[0] + mm(b.x);
        var top = art[1] - mm(b.y);
        var path = layer.pathItems.rectangle(top, left, mm(b.w), mm(b.h));
        path.stroked = false; path.filled = false;
        var frame = doc.textFrames.areaText(path);
        frame.name = "TEXT__" + b.name;
        frame.contents = b.text;
        var range = frame.textRange;
        range.characterAttributes.textFont = getFont(b.font);
        range.characterAttributes.size = b.size;
        range.characterAttributes.leading = b.leading;
        range.characterAttributes.tracking = b.tracking;
        range.characterAttributes.fillColor = rgb(b.color);
        range.paragraphAttributes.justification = Justification.LEFT;
        if (b.firstLineColor) frame.paragraphs[0].characterAttributes.fillColor = rgb(b.firstLineColor);
        if (b.rotation) frame.rotate(b.rotation);
    }

    function removeImportedText(doc) {
        var count = doc.textFrames.length;
        for (var i = count - 1; i >= 0; i--) doc.textFrames[i].remove();
        return count;
    }

    function getFont(name) {
        try { return app.textFonts.getByName(name); }
        catch (e) { throw new Error("Fonte não encontrada no Illustrator: " + name); }
    }

    function rgb(hex) {
        var c = new RGBColor();
        c.red = parseInt(hex.substr(0, 2), 16);
        c.green = parseInt(hex.substr(2, 2), 16);
        c.blue = parseInt(hex.substr(4, 2), 16);
        return c;
    }

    function mm(value) { return value * 72 / 25.4; }
})();
