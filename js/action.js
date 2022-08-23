    //Fibonacci
    var sFiboTimer=0;
    var sFiboTimerR=0;
    var sFiboButton="";
    var sFiboButtonR=false;

    var img = new Image();
    var sBG_Width=0;
    var sBG_Height=0;

    var aColorArray=[
	"#FFFFFF",
        "#C0C0C0",
        "#808080",
        "#000000",
        "#FF0000",
        "#800000",
        "#FFFF00",
        "#808000",
	"#00FF00",
        "#008000",
        "#00FFFF",
	"#008080",
	"#0000FF",
	"#000080",
	"#FF00FF",
	"#800080"
    ];

    function fClearTimeout() {
	console.log("clear!");
	clearTimeout(sFiboTimer);
	clearTimeout(sFiboTimerR);
    }


    function onImgURL() {
	img.src = document.getElementById('img_url').value;

	var fibo = [100, 78.6, 61.8, 50, 38.2, 23.6, 0];
	var sReverse=1;
        var line_width=300;
        var sHigh = 5;
	var sLow = 100;
        var tofix = 4, t, dif;
        var dif = (1*sHigh - 1*sLow);
	var t = sHigh*1;
	var mz=5;
	var dd=5;
	var last=5;
	var aFiboLine=[];
	var aFiboLineR=[];

      var width = window.innerWidth;
      var height = window.innerHeight;

      var stage = new Konva.Stage({
        container: 'container',
        width: width,
        height: height,
      });

      var layer = new Konva.Layer();
      var layer2 = new Konva.Layer();
      stage.add(layer2);
      stage.add(layer);

      var group = new Konva.Group({
        draggable: true,
      });
      layer.add(group);

      var sMax=sHigh;
      if (sLow>sHigh) {
        sMax=sLow;
      }

      var sFiboBox = new Konva.Line({
        points: [5, 5,
		line_width, 5,
		line_width, sMax,
		5, sMax,
		5, 5
	],
        stroke: 'green',
        strokeWidth: 2,
	x:100,
	y:100,
	opacity:0.01,
        fill: '#00D2FF',
        closed: true
      });
    group.add(sFiboBox);

    for(let l=0; l<fibo.length; l++) {
	if (l==3) {
	     dd=0;
	} else {
	     dd=1;
	}
	if (l==0) {
	    t = 1*sHigh;
	} else if (l==6) {
	    t = 1*sLow;
	} else {
	    t = 1*sLow + dif*fibo[l]/100;
	}

	mz=t.toFixed(tofix);
        aFiboLine[l] = new Konva.Line({
        points: [5, mz,line_width, mz],
	dash: [1, dd],
        stroke: 'red',
        strokeWidth: 1,
	x:100,
	y:100,
        closed: false
      });
	group.add(aFiboLine[l]);
    }

    //Fibo sliders

        var fibo_color_slider = document.getElementById('fibo_color_slider');
        fibo_color_slider.oninput = function () {
	    for(l=0; l<aFiboLine.length; l++) {
		var sFiboStroke = aColorArray[fibo_color_slider.value];
		aFiboLine[l].stroke(sFiboStroke);
		aFiboLineR[l].stroke(sFiboStroke);
		aFiboText[l].fill(sFiboStroke);
		aFiboTextR[l].fill(sFiboStroke);
	    }
          layer.batchDraw();
        };

        var fibo_font_size_slider = document.getElementById('fibo_font_size_slider');
        fibo_font_size_slider.oninput = function () {
	    for(l=0; l<aFiboText.length; l++) {
		aFiboText[l].fontSize(fibo_font_size_slider.value);
		aFiboTextR[l].fontSize(fibo_font_size_slider.value);
	    }
          layer.batchDraw();
        };



    //Text
    var aFiboText=[];
    var aFiboTextCorrection =[
	    105,128,142,153,164,180,194
    ];
	for(l=0; l<aFiboTextCorrection.length; l++) {
        aFiboText[l] = new Konva.Text({
    	    x: 105,
    	    y: aFiboTextCorrection[l],
    	    text: fibo[l]+'%',
    	    fontSize: 6,
    	    fontFamily: 'Calibri',
    	    fill: 'red',
        });
	group.add(aFiboText[l]);
    }

      img.onload = function () {
	sBG_Width=this.width;
	sBG_Height=this.height;
	stage.width(sBG_Width);
        stage.height(sBG_Height);
	stage.draw();

        var sBG_Img = new Konva.Image({
          x: 0,
          y: 0,
          image: img,
          width: sBG_Width,
          height: sBG_Height
        });

	layer2.add(sBG_Img);
        layer2.batchDraw();

      };

    const tr = new Konva.Transformer({
	 node: group,
	 keepRatio: true
    });

    tr.rotateEnabled(false)
    tr.forceUpdate();

    layer.add(tr);
    tr.hide();


// ############################################################################
//Fibo listeners

    //Fibo
    group.on('mouseover', function () {
	    tr.show();
    	    layer.draw();
	    clearTimeout(sFiboTimer);
    });
    group.on('click mousedown mouseup', function () {
	document.getElementById('fibo_setting').className='fibo_setting_show';	    
	document.getElementById('line_setting').className='line_setting_hide';
	document.getElementById('slash_setting').className='slash_setting_hide';
	tr.show();
        layer.draw();
	clearTimeout(sFiboTimer);
    });
    group.on('mouseout', function () {
	sFiboTimer=setTimeout(function() {
	    document.getElementById('fibo_setting').className='fibo_setting_hide';
	    tr.hide();
	    layer.draw();
	}, 3000);

    });

    //Buttons

      document.getElementById('fibo_show').addEventListener(
        'click',
        function () {
	    console.log("Fibo click: "+sFiboButton);
	    sFiboButton=document.getElementById('fibo_show').className;
	    if (sFiboButton=="fibo_button_pressed") {
		document.getElementById('fibo_show').className='fibo_button';
        	group.hide();
		tr.hide();
        	layer.draw();
		console.log("fibo hide!");
	    } else {
		document.getElementById('fibo_show').className='fibo_button_pressed';
        	group.show();
        	layer.draw();
		tr.hide();
		console.log("fibo show!");
	    }

        },
        false
      );


    // Fibo reverse ---------------------------------------------------------
    sHigh = 5;
    sLow = 100;
    tofix = 4, t, dif;
    dif = (1*sHigh - 1*sLow);
    t = sHigh*1;

      var groupR = new Konva.Group({
        draggable: true,
        visible: false
      });
      layer.add(groupR);


      fibo.reverse();

      var sFiboBoxR = new Konva.Line({
        points: [5, 5,
		line_width, 5,
		line_width, sMax,
		5, sMax,
		5, 5
	],
        stroke: 'green',
        strokeWidth: 2,
	x:100,
	y:100,
	opacity:0.01,
        fill: '#00D2FF',
        closed: true
      });
    groupR.add(sFiboBoxR);

    for(l=0; l<fibo.length; l++) {
    if (l==3) {
	 dd=0;
    } else {
	 dd=1;
    }
    if (l==0) {
	t = 1*sHigh;
    } else if (l==6) {
	t = 1*sLow;
    } else {
	t = 1*sLow + dif*fibo[l]/100;
    }
    mz=t.toFixed(tofix);
        aFiboLineR[l] = new Konva.Line({
        points: [5, mz,line_width, mz],
	dash: [1, dd],
        stroke: 'red',
        strokeWidth: 1,
	x:100,
	y:100,
        closed: false
      });
    groupR.add(aFiboLineR[l]);
    }

    //Text for reverse
    var aFiboTextR=[];
    var aFiboTextCorrectionR =[
	    105,128,142,153,164,180,192
    ];
	for(l=0; l<aFiboTextCorrectionR.length; l++) {
        aFiboTextR[l] = new Konva.Text({
    	    x: 105,
    	    y: aFiboTextCorrectionR[l],
    	    text: fibo[l]+'%',
    	    fontSize: 6,
    	    fontFamily: 'Calibri',
    	    fill: 'red',
        });
	groupR.add(aFiboTextR[l]);
    }

    const trR = new Konva.Transformer({
	 node: groupR,
	 keepRatio: true,
         visible: false,
    });

    trR.rotateEnabled(false)
    trR.forceUpdate();

    layer.add(trR);
    trR.hide();


// ############################################################################
//FiboR listeners

    //FiboR
    groupR.on('mouseover', function () {
	trR.show();
        layer.draw();
	clearTimeout(sFiboTimerR);
    });
    groupR.on('click mousedown mouseup', function () {
	document.getElementById('fibo_setting').className='fibo_setting_show';	    
	document.getElementById('line_setting').className='line_setting_hide';
	document.getElementById('slash_setting').className='slash_setting_hide';
	trR.show();
        layer.draw();
	clearTimeout(sFiboTimerR);
    });

    groupR.on('mouseout', function () {
	sFiboTimerR=setTimeout(function() {
	    document.getElementById('fibo_setting').className='fibo_setting_hide';
	    trR.hide();
	    layer.draw();
	}, 3000);
    });



      document.getElementById('fiboR').addEventListener(
        'click',
        function () {
	    console.log("FiboR click: "+sFiboButtonR);
	    if (sFiboButtonR==true) {
		document.getElementById('fiboR').className='fibo_button';
        	groupR.hide();
		trR.hide();
        	layer.draw();
		sFiboButtonR=false;
	    } else {
		document.getElementById('fiboR').className='fibo_button_pressed';
        	groupR.show();
		trR.hide();
        	layer.draw();
		sFiboButtonR=true;
	    }
        },
        false
      );

      updateDottedLines();
}
