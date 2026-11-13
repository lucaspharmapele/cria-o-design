#target illustrator

(function () {
    if (app.documents.length === 0) {
        alert("Abra verso.svg antes de executar este script.");
        return;
    }

    var doc = app.activeDocument;
    if (doc.name.toLowerCase().indexOf("verso") < 0) {
        alert("Este script foi criado para verso.svg.");
        return;
    }

    try { doc.layers.getByName("TEXTO EDITAVEL"); alert("O texto já foi reconstruído."); return; } catch (e) {}

    var blocks = [
        { source:"SOURCE__back_vegan", name:"Rótulo vegano", text:"LINHA VEGANA", x:14, y:10, w:55, h:8, font:"MazzardM-Bold", size:7.94, leading:10, color:"ffffff", tracking:180 },
        { source:"SOURCE__back_title", name:"Título Clean Therapy", text:"CLEAN\rTHERAPY", x:14, y:25, w:90, h:24, font:"MazzardH-Black", size:28.35, leading:29.48, color:"ffffff", tracking:-20, rotation:2 },
        { source:"SOURCE__back_tagline", name:"Assinatura", text:"Ciência e beleza que você sente na pele.", x:14, y:55, w:110, h:8, font:"MazzardM-Regular", size:9.64, leading:12, color:"ffffff", tracking:0 },
        { source:"SOURCE__back_section_label", name:"Rótulo da seção", text:"UMA ROTINA DE CUIDADO COMPLETA", x:14, y:80, w:100, h:8, font:"MazzardM-Bold", size:7.65, leading:10, color:"2288c9", tracking:150 },
        { source:"SOURCE__back_benefit_1_title", name:"Benefício 1 — título", text:"HIGIENIZAÇÃO FACIAL", x:23, y:99, w:102, h:7, font:"MazzardH-Bold", size:10.77, leading:12, color:"163d6c", tracking:0 },
        { source:"SOURCE__back_benefit_1_body", name:"Benefício 1 — parágrafo", text:"Limpeza e frescor para o seu ritual de skincare.", x:23, y:106, w:102, h:7, font:"MazzardM-Regular", size:7.65, leading:9, color:"31465c", tracking:0 },
        { source:"SOURCE__back_benefit_2_title", name:"Benefício 2 — título", text:"CUIDADO DIÁRIO", x:34, y:123, w:106, h:7, font:"MazzardH-Bold", size:10.77, leading:12, color:"ffffff", tracking:0 },
        { source:"SOURCE__back_benefit_2_body", name:"Benefício 2 — parágrafo", text:"Produtos para acompanhar cada passo da sua rotina.", x:34, y:130, w:106, h:7, font:"MazzardM-Regular", size:7.65, leading:9, color:"ffffff", tracking:0 },
        { source:"SOURCE__back_benefit_3_title", name:"Benefício 3 — título", text:"ESCOLHA VEGANA", x:23, y:147, w:102, h:7, font:"MazzardH-Bold", size:10.77, leading:12, color:"163d6c", tracking:0 },
        { source:"SOURCE__back_benefit_3_body", name:"Benefício 3 — parágrafo", text:"Ciência, beleza e autocuidado na mesma linha.", x:23, y:154, w:102, h:7, font:"MazzardM-Regular", size:7.65, leading:9, color:"31465c", tracking:0 },
        { source:"SOURCE__back_offer", name:"Oferta 10 por cento", text:"GANHE 10% OFF", x:14, y:180, w:82, h:11, font:"MazzardH-Black", size:18.71, leading:21, color:"ffffff", tracking:0 },
        { source:"SOURCE__back_offer_note", name:"Oferta Clean Therapy", text:"EM TODA A LINHA CLEAN THERAPY.", x:14, y:190, w:82, h:8, font:"MazzardM-Bold", size:8.5, leading:10, color:"ffffff", tracking:0 },
        { source:"SOURCE__back_qr_cta", name:"CTA do QR Code", text:"APONTE A CÂMERA E FALE COM A LOJA", x:14, y:198, w:82, h:7, font:"MazzardM-Regular", size:6.66, leading:8, color:"ffffff", tracking:0 }
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

        alert("Verso concluído: " + blocks.length + " caixas criadas e " + removed + " textos importados removidos.");
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
