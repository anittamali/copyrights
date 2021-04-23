(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"copyrights_anitamalinsky_atlas_1", frames: [[0,0,1659,1575]]},
		{name:"copyrights_anitamalinsky_atlas_2", frames: [[0,0,1328,1222],[1330,0,677,1621]]},
		{name:"copyrights_anitamalinsky_atlas_3", frames: [[886,0,520,1724],[0,0,884,1202]]},
		{name:"copyrights_anitamalinsky_atlas_4", frames: [[0,1113,1213,659],[1670,0,308,1618],[0,0,798,1111],[800,0,868,770]]},
		{name:"copyrights_anitamalinsky_atlas_5", frames: [[1576,468,383,623],[526,1433,1359,136],[0,1571,1359,136],[0,0,913,466],[915,0,913,466],[1361,1571,563,287],[0,1709,563,287],[565,1860,1253,125],[263,468,261,977],[1051,468,260,961],[788,468,261,959],[1313,468,261,953],[0,468,261,979],[526,468,260,963]]},
		{name:"copyrights_anitamalinsky_atlas_6", frames: [[310,1063,305,422],[1776,429,264,454],[0,127,279,507],[1484,1032,282,421],[627,1278,299,425],[1198,1032,284,426],[928,558,311,420],[1255,0,315,425],[0,1505,318,424],[0,636,319,425],[321,564,308,437],[0,1063,308,440],[1572,0,311,427],[930,127,320,429],[606,127,322,427],[281,127,323,435],[631,556,295,445],[1725,1455,249,475],[1768,895,256,461],[1507,429,267,464],[928,1278,268,465],[1241,558,264,472],[1464,1460,259,457],[1198,1460,264,454],[320,1487,305,422],[617,1003,470,273],[0,0,1253,125]]},
		{name:"copyrights_anitamalinsky_atlas_7", frames: [[488,1848,109,48],[599,1848,97,35],[496,481,283,416],[248,962,242,476],[0,1436,242,476],[244,1440,242,472],[252,0,246,479],[0,474,246,479],[248,481,246,479],[0,955,246,479],[781,474,245,472],[0,0,250,472],[492,1373,242,473],[1028,461,241,471],[993,1409,239,468],[1487,927,236,469],[1243,934,242,468],[1271,463,243,462],[1271,0,245,461],[743,948,248,462],[500,0,252,463],[993,948,248,459],[736,1412,240,462],[1243,1404,242,463],[1003,0,251,459],[496,899,245,472],[754,0,247,472],[320,1914,38,13],[1068,934,38,9],[540,465,38,12],[40,1914,38,15],[698,1876,38,16],[599,1885,38,16],[360,1914,38,13],[1108,934,38,9],[580,465,38,12],[80,1914,38,15],[488,1898,38,16],[528,1898,38,16],[400,1914,38,13],[1148,934,38,9],[620,465,38,12],[120,1914,38,15],[639,1885,38,16],[738,1876,38,16],[440,1914,38,13],[1188,934,38,9],[660,465,38,12],[160,1914,38,15],[778,1876,38,16],[818,1876,38,16],[500,465,38,13],[1518,0,38,9],[700,465,38,12],[200,1914,38,15],[858,1876,38,16],[898,1876,38,16],[280,1914,38,14],[1558,0,38,9],[1028,934,38,12],[240,1914,38,15],[938,1876,38,16],[0,1914,38,16],[1516,463,274,346]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_114 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_113 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_112 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_111 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_110 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(img.CachedBmp_60);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3946,1552);


(lib.CachedBmp_59 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(img.CachedBmp_58);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2585,786);


(lib.CachedBmp_57 = function() {
	this.initialize(img.CachedBmp_57);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2205,7874);


(lib.CachedBmp_56 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(img.CachedBmp_53);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2828,1909);


(lib.CachedBmp_52 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(59);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(60);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(61);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(62);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_6"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(img.CachedBmp_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3626,1344);


(lib.CachedBmp_7 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(img.CachedBmp_4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2654,884);


(lib.CachedBmp_3 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_7"]);
	this.gotoAndStop(63);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.BMP_3ba5c8f2_04b4_4b2b_a252_36f5c7ab6eb4 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.BMP_6ee24740_86fe_4ffc_9fe7_bf090fb4ef91 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.BMP_8092a444_8ce5_4664_9679_9f4d5a5aa692 = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.BMP_823c1e00_6031_405e_bf46_eb255521357a = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.BMP_b731b6c6_2353_47a4_a46e_e643956eb19b = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.BMP_dd6b41c0_5568_4f07_bbc3_661edbd3dc5b = function() {
	this.initialize(ss["copyrights_anitamalinsky_atlas_5"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.cameraBG = function() {
	this.initialize(img.cameraBG);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,3631,2057);


(lib.GALLERY = function() {
	this.initialize(img.GALLERY);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,8982,1145);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.WarpedAsset_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_114();
	this.instance.setTransform(-79.75,-104.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.7,-104.3,152.5,211);


(lib.WarpedAsset_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.BMP_b731b6c6_2353_47a4_a46e_e643956eb19b();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,261,979);


(lib.WarpedAsset_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_113();
	this.instance.setTransform(-65.9,-113.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.9,-113.4,132,227);


(lib.SMILE = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_112();
	this.instance.setTransform(0,0,0.3319,0.3319);

	this.instance_1 = new lib.CachedBmp_111();
	this.instance_1.setTransform(3.5,0.75,0.3319,0.3319);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.SMILE, new cjs.Rectangle(0,0,36.2,16), null);


(lib.Scene_1_TEXT = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// TEXT
	this.text = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text.lineHeight = 180;
	this.text.parent = this;
	this.text.setTransform(494.65,60.65);

	this.text_1 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_1.lineHeight = 180;
	this.text_1.parent = this;
	this.text_1.setTransform(494.65,60.65);

	this.text_2 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_2.lineHeight = 180;
	this.text_2.parent = this;
	this.text_2.setTransform(494.65,60.65);

	this.text_3 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_3.lineHeight = 180;
	this.text_3.parent = this;
	this.text_3.setTransform(494.65,60.65);

	this.text_4 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_4.lineHeight = 180;
	this.text_4.parent = this;
	this.text_4.setTransform(494.65,60.65);

	this.text_5 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_5.lineHeight = 180;
	this.text_5.parent = this;
	this.text_5.setTransform(494.65,60.65);

	this.text_6 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_6.lineHeight = 180;
	this.text_6.parent = this;
	this.text_6.setTransform(494.65,60.65);

	this.text_7 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_7.lineHeight = 180;
	this.text_7.parent = this;
	this.text_7.setTransform(494.65,60.65);

	this.text_8 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_8.lineHeight = 180;
	this.text_8.parent = this;
	this.text_8.setTransform(494.65,60.65);

	this.text_9 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_9.lineHeight = 180;
	this.text_9.parent = this;
	this.text_9.setTransform(494.65,60.65);

	this.text_10 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_10.lineHeight = 180;
	this.text_10.parent = this;
	this.text_10.setTransform(494.65,60.65);

	this.text_11 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_11.lineHeight = 180;
	this.text_11.parent = this;
	this.text_11.setTransform(494.65,60.65);

	this.text_12 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_12.lineHeight = 180;
	this.text_12.parent = this;
	this.text_12.setTransform(494.65,60.65);

	this.text_13 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_13.lineHeight = 180;
	this.text_13.parent = this;
	this.text_13.setTransform(494.65,60.65);

	this.text_14 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_14.lineHeight = 180;
	this.text_14.parent = this;
	this.text_14.setTransform(494.65,60.65);

	this.text_15 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_15.lineHeight = 180;
	this.text_15.parent = this;
	this.text_15.setTransform(494.65,60.65);

	this.text_16 = new cjs.Text("T", "140px 'Snap ITC'", "#FFFFFF");
	this.text_16.lineHeight = 180;
	this.text_16.parent = this;
	this.text_16.setTransform(494.65,60.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.text,p:{x:494.65,text:"T",lineWidth:105,y:60.65}}]},513).to({state:[{t:this.text_1,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text,p:{x:598.95,text:"h",lineWidth:88,y:60.65}}]},2).to({state:[{t:this.text_2,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_1,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text,p:{x:686.45,text:"e",lineWidth:89,y:60.65}}]},2).to({state:[{t:this.text_3,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_2,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_1,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text,p:{x:427.15,text:"N",lineWidth:132,y:242.6}}]},2).to({state:[{t:this.text_4,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_3,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_2,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_1,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text,p:{x:559,text:"e",lineWidth:89,y:242.6}}]},2).to({state:[{t:this.text_5,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_4,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_3,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_2,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_1,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text,p:{x:647.4,text:"x",lineWidth:109,y:242.6}}]},2).to({state:[{t:this.text_6,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_5,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_4,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_3,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_2,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_1,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text,p:{x:756.55,text:"t",lineWidth:86,y:242.6}}]},2).to({state:[{t:this.text_7,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_6,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_5,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_4,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_3,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_2,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_1,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text,p:{x:254.85,text:"M",lineWidth:154,y:424.55}}]},2).to({state:[{t:this.text_8,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_7,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_6,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_5,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_4,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_3,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_2,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_1,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text,p:{x:408.75,text:"o",lineWidth:85,y:424.55}}]},2).to({state:[{t:this.text_9,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_8,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_7,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_6,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_5,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_4,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_3,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_2,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_1,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text,p:{x:493.05,text:"r",lineWidth:83,y:424.55}}]},2).to({state:[{t:this.text_10,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_9,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_8,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_7,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_6,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_5,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_4,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_3,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_2,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text_1,p:{x:493.05,text:"r",lineWidth:83,y:424.55}},{t:this.text,p:{x:575.6,text:"n",lineWidth:88,y:424.55}}]},2).to({state:[{t:this.text_11,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_10,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_9,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_8,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_7,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_6,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_5,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_4,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_3,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text_2,p:{x:493.05,text:"r",lineWidth:83,y:424.55}},{t:this.text_1,p:{x:575.6,text:"n",lineWidth:88,y:424.55}},{t:this.text,p:{x:663.5,text:"i",lineWidth:63,y:424.55}}]},2).to({state:[{t:this.text_12,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_11,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_10,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_9,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_8,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_7,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_6,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_5,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_4,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text_3,p:{x:493.05,text:"r",lineWidth:83,y:424.55}},{t:this.text_2,p:{x:575.6,text:"n",lineWidth:88,y:424.55}},{t:this.text_1,p:{x:663.5,text:"i",lineWidth:63,y:424.55}},{t:this.text,p:{x:726.65,text:"n",lineWidth:88,y:424.55}}]},2).to({state:[{t:this.text_13,p:{x:494.65,text:"T",lineWidth:105,y:60.65}},{t:this.text_12,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_11,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_10,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_9,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_8,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_7,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_6,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_5,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text_4,p:{x:493.05,text:"r",lineWidth:83,y:424.55}},{t:this.text_3,p:{x:575.6,text:"n",lineWidth:88,y:424.55}},{t:this.text_2,p:{x:663.5,text:"i",lineWidth:63,y:424.55}},{t:this.text_1,p:{x:726.65,text:"n",lineWidth:88,y:424.55}},{t:this.text,p:{x:814.55,text:"g",lineWidth:92,y:424.55}}]},2).to({state:[{t:this.text_14,p:{x:494.65,text:"T",lineWidth:105}},{t:this.text_13,p:{x:598.95,text:"h",lineWidth:88,y:60.65}},{t:this.text_12,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_11,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_10,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_9,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_8,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_7,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_6,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text_5,p:{x:493.05,text:"r",lineWidth:83,y:424.55}},{t:this.text_4,p:{x:575.6,text:"n",lineWidth:88,y:424.55}},{t:this.text_3,p:{x:663.5,text:"i",lineWidth:63,y:424.55}},{t:this.text_2,p:{x:726.65,text:"n",lineWidth:88,y:424.55}},{t:this.text_1,p:{x:814.55,text:"g",lineWidth:92,y:424.55}},{t:this.text,p:{x:906.1,text:".",lineWidth:57,y:424.55}}]},2).to({state:[{t:this.text_15,p:{x:494.65,text:"T",lineWidth:105}},{t:this.text_14,p:{x:598.95,text:"h",lineWidth:88}},{t:this.text_13,p:{x:686.45,text:"e",lineWidth:89,y:60.65}},{t:this.text_12,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_11,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_10,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_9,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_8,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_7,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text_6,p:{x:493.05,text:"r",lineWidth:83,y:424.55}},{t:this.text_5,p:{x:575.6,text:"n",lineWidth:88,y:424.55}},{t:this.text_4,p:{x:663.5,text:"i",lineWidth:63,y:424.55}},{t:this.text_3,p:{x:726.65,text:"n",lineWidth:88,y:424.55}},{t:this.text_2,p:{x:814.55,text:"g",lineWidth:92,y:424.55}},{t:this.text_1,p:{x:906.1,text:".",lineWidth:57,y:424.55}},{t:this.text,p:{x:962.5,text:".",lineWidth:57,y:424.55}}]},2).to({state:[{t:this.text_16},{t:this.text_15,p:{x:598.95,text:"h",lineWidth:88}},{t:this.text_14,p:{x:686.45,text:"e",lineWidth:89}},{t:this.text_13,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_12,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_11,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_10,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_9,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_8,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text_7,p:{x:493.05,text:"r",lineWidth:83,y:424.55}},{t:this.text_6,p:{x:575.6,text:"n",lineWidth:88,y:424.55}},{t:this.text_5,p:{x:663.5,text:"i",lineWidth:63,y:424.55}},{t:this.text_4,p:{x:726.65,text:"n",lineWidth:88,y:424.55}},{t:this.text_3,p:{x:814.55,text:"g",lineWidth:92,y:424.55}},{t:this.text_2,p:{x:906.1,text:".",lineWidth:57,y:424.55}},{t:this.text_1,p:{x:962.5,text:".",lineWidth:57,y:424.55}},{t:this.text,p:{x:1018.9,text:".",lineWidth:57,y:424.55}}]},2).to({state:[{t:this.text_16},{t:this.text_15,p:{x:598.95,text:"h",lineWidth:88}},{t:this.text_14,p:{x:686.45,text:"e",lineWidth:89}},{t:this.text_13,p:{x:427.15,text:"N",lineWidth:132,y:242.6}},{t:this.text_12,p:{x:559,text:"e",lineWidth:89,y:242.6}},{t:this.text_11,p:{x:647.4,text:"x",lineWidth:109,y:242.6}},{t:this.text_10,p:{x:756.55,text:"t",lineWidth:86,y:242.6}},{t:this.text_9,p:{x:254.85,text:"M",lineWidth:154,y:424.55}},{t:this.text_8,p:{x:408.75,text:"o",lineWidth:85,y:424.55}},{t:this.text_7,p:{x:493.05,text:"r",lineWidth:83,y:424.55}},{t:this.text_6,p:{x:575.6,text:"n",lineWidth:88,y:424.55}},{t:this.text_5,p:{x:663.5,text:"i",lineWidth:63,y:424.55}},{t:this.text_4,p:{x:726.65,text:"n",lineWidth:88,y:424.55}},{t:this.text_3,p:{x:814.55,text:"g",lineWidth:92,y:424.55}},{t:this.text_2,p:{x:906.1,text:".",lineWidth:57,y:424.55}},{t:this.text_1,p:{x:962.5,text:".",lineWidth:57,y:424.55}},{t:this.text,p:{x:1018.9,text:".",lineWidth:57,y:424.55}}]},19).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_finish = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// finish
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECOKAAAUAAAA64gppAppUgpoAppg65AAAUg64AAAgpogppUgppgppAAAg64UAAAg64AppgpoUApogppA64AAAUA65AAAApoAppUAppApoAAAA64g");
	this.shape.setTransform(603.2,324.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(102,102,102,0)").s().p("EhkgBkhUgpogppAAAg64UAAAg64ApogpoUAppgppA63AAAUA65AAAApoAppUApoApoAAAA64UAAAA64gpoAppUgpoAppg65AAAUg63AAAgppgppg");
	this.shape_1.setTransform(603.2,324.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EBzPhHpQAEAGAEAGQACABABACQGfIRE6I1QOIZgAtepQAAAdAAAfQgRQJjbO2QhxHoimHSQh7FWiWFJMgYyAk1QivC9i9C4UgdyAdHgmhAIEQvVDOwmgIQhdgBhdAAMhPVga7IlVkKQgEgDgFgEQmIlBlxl0QgogpgpgoIgCgFUgm+goLgA4g3+QAAgKgBgKIgBiIQAAgDAAgCIAAgTQAAgCAAgBIABg/QAAgLAAgKQAAgJAAgIQAGkNASkHIAEgvQABgMABgMIAekwUAEHggrAVAgaNQAIgKAIgJQHtrmKdqcQAEgEADgDUAmggmbA13gBTQB4gCB4AAQBBAAA/ABQGGAEF5AkQA7AFA6AGUAl6AEBAdxAXpQGkFOGLGLQBjBjBfBlQJ7KfHRLnQAIANAIANQAqBFApBEMASGBERQAAAEAAADECDqg2yQACAGADAHQANAhANAhIH0cOICMYLQAAARABARECDqg2yQAKAaAKAZQAGAOAFAOECOJgBKQAAANABAMQAAAEAAAFIAAAZQAAADAAADIAAAIQAAAPAAAPQAAAEAAAEIAAAfQgPOtiuNrIhREUIkXO6IheFAQgFAMgEAMQgHARgIARECGogBFIAAAyQgBAJAAAJIgFD6QgKFFggE9IgCAUQgBAGAAAGUgE0AubgiQAiQUgn3An2g4UAABQgBAAgCAAUg4XgABgn1gn0QgBgBgBgBQmKmKlMmjQrnuqmywpIlW59IpX2mIAAgBQAAgJgBgKECEHA1qQgKAXgJAXQgCAGgDAGIhHCoIhUB9Qg+CGhCCFQoxRguBPKIg7BYQhgBnhlBlQgJAJgJAJUgpjApXg6sAABQgIAAgIAAUg6ugAGgpjgpjQgDgDgEgEQg0g1g0g2EhkLhk4QABAAABgBQG5m3HXltQAHgFAGgFUAg3gZaAqOgC0QAFAAAFAAQAIgBAHAAQAFgBAFAAQAEAAAFAAQElgTEsgBIApAAQABAAACAAIOIFyIABAAIAMAFMBDrAbqIAKAEIABAAIRWHHQAUATATATQALALAMALQAAABABABQAGAGAGAFMAe8AtkEhz1hLPQGnoMIQnkQFck9FwkTQAzgmA0glQZHyPeslxQO3izQKAIQQAAIO1C/UAnMAH4AeMAb4QJLIcHOJJEBnnBhWQhMBOhNBNQgXAYgYAYUgpYApXg6aAAQQgYAAgXAAQiIAAiIgFEiEgg0lQAahEAbhCQKZ5FUx0xQALgLALgMEiEgg0lQAIgYAJgYQKP5fU31FQAVgWAWgVQAKgKAJgKEiJigBGQAAAAAAgBMAUKhHyQAxhLAyhLEiNMgQEQAFg1AFg0IBwrQIGy3oEiNsgK8QAQjbAajWEiEwAZJIkw3HQABgBgBgBQgChhAAhgQAAgCAAgBEiOIgBTQAGlEAYk9EhtBBSZIhCifMgWtg2xEhY8Bu+QlvkslclaQgNgNgOgOQg4g4g3g5ImwwT");
	this.shape_2.setTransform(603.2,324.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("rgba(48,48,48,0.004)").ss(0.1,1,1).p("EB0mhFuQAIANAHAMQAmA+AlA/EB0mhFuQAJAPAJAOUATLAfHAACAnCEBg6hehICGCLIAQAVIRMWGIAKANECIFABAQAAABAAABECIFAB0QAAADAAAEQAAAGAAAFECHXAPuQgBALAAAKECIAAGBIgpJtUgEqAuJgieAh+QgZAYgYAYUgnoAmgg32AAAQgoAAgpAAUg3igAdgnagm0QgkgjgjgkQmHmJlLmiQqutkmpvQEAPZiGTQAHABAHABUAmJAD/Ad6AX1QGeFKGGGFQAIAJAIAIIAUAUQABACACABQACADADACEAPZiGTQAHABAIABUAmJAEAAd5AXzQGeFLGGGGQAIAIAIAIEhz7hGxQAphCArhBQHyryKnqnIAHgDIJZkCMA30gYAIbLrrIAJgEQBzgDBzAAICAAFIL/AoIBaAEEBgyhepQAEAEAEAEEiIEABDIAAgB");
	this.shape_3.setTransform(593.85,310.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(99,99,99,0.051)").s().p("EgACCLRQiIAAiIgFIC6ABQQmAIPVjNUAmhgIFAdzgdHQC8i3Cvi+Ig7BYIiYCcIgwAvUgpXApXg6aAAQIgwAAgECFlAtzIEXu6QhxHoimHSIheFAIgTAuIgFAMIAFgMIATguIgKAYIgOAiIhHCoIhVB9QCXlJB7lWgECNogAFIAAg8Qgt+puI5hQk6o1mfoQIgRgdIgKgNQnRrmp7qgIgRgVIiGiLIgIgIIgTgUIgQgRQmGmFmflKIRXHGIAnAmIAWAWIACACIAMAMMAe8AtkIAUAyIALAcIgbhCIgEgMIAEAMIAbBCIH0cOICMYLIAAAiIAAgiIAAAaIAAAIIAAAZIAAAGIAAAIIAAAgIAAAHIAAAfQgOOsiuNrIhREUQDbu1ARwJgEiOHgATIgBgUIAAiIIAAgFIAAgUIAAgDIAAg/QAGlEAYk9IAekwUAEHggrAVAgaNQgqBBgpBCMgUJBHyIAAACIAAABIAAADQAABhACBiIAAACIEwXFgEiNBgUkIgLBpIgeEwIgCAYQAQjaAbjXgEiNMgS7IAAAAgEiEPg4MQKQ5fU21FIArgrIATgUIgWAYQ0xUwqZZFIg1CGIARgwgEBSMhvdUgd5gXzgmIgEAIgBAAUAmJAD/Ad5AX1gEBSChvhUgdxgXpgl6gEBIgMgFUAmIAEAAd5AXzgEAOXiLLUAl6AEBAdxAXpgEAOLiLQIAAAAg");
	this.shape_4.setTransform(603.2,342.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EBv4g/4QAFAFAEAEQABABABABQHqIdFtJEQOdXFBQbuQgBAdgBAdQgcORi+NOQhQFmhtFbQidHyjYHZQhbDGhkDBQnUOCqoMbIh5C7QipC/i5C5QgJAJgJAJUgpjApYg6sAABQgIAAgJAAUg6ugAGgpjgpjQgDgDgEgEQhshshnhwIgEgKMgmJhd4IAAgBQAAgJAAgJIgCizQAAgEAAgFQAAgCAAgBQABgqAAgqIAAgVQAHjSANjPIACgXQABgLABgLIAEgsQADgoADgoIAKhKQARiTAXiRQEr8sVB3AQAHgHAHgIQADgFAEgGQH2s2LRrcQAbgcAbgcQBWhVBXhTUAj7giKAxigBQQB5gDB5AAQAjAAAjAAQc/AOYZLUQUVJbRHRIQCICICBCLQKyLsHWNGQAUAjATAjQAWAnAVAnUAOGAabAAcAgFQAAAXAAAYIAABFQAAADAAADECDhg3GQAPAiAOAjQAMAgAMAgMAIMAgPIBmTZQABAUABAVQAAAQAAAPIAAAPQAAAOAAAQQAAAFAAAEQAAAPAAAPQgBAYgBAYIiKWrIiTIiIi9LBIihJYQgIAVgIAVQgEALgFALQgBADgCADIgQAoIioEFMgU7AgkQlCF2lwFgUgd0AccgmcAHpQvSDDwbgQQk7gFk0gVMg9TgTxIvZrDQgQgNgPgMQmFlCltlyQhPhQhOhRECDhg3GQAHAQAHARQATAyAUAyEBk7hkKIMnOWIR/euEB/FgCLIAAA0EB/EAAFQAAAFAAAFIgBBAQgBApgCAqIAAAOECOKAAlQgBAngBAnECOIgBZQABAkABAkEB6cAhaQgCALgDAKQgIAdgIAdQgJAdgIAdQgFAPgEAPQo8d63xXxUgmFAmEg1zAABQgBAAgBAAUg12gABgmEgmDQgBgBgBAAQgIgIgIgIQgIgIgIgIQgJgKgJgJQgLgMgMgLQgLgMgMgLQgEgFgFgFQgSgSgSgTUgZCgaHgHkghWQgBgHgCgHECENA1ZQgNAggMAgEBj3hlOQAUAUAUAVQAHAGAHAHQAHAHAHAHEBj3hlOQAKAKAKAKQAMAMANAMQALAMAMAMEhy6hEuQGEmnHbmIQFYkcFtj0UAldgZFAyJAAxQP3AQO1C1UAnEAHdAeMAZiQIFG0GnHREhj2hlOMAtxgexQAVgIAVgJQAJgEAKgEQAJgDAIgEQYKpncFgHIAmAAQADAAADAAMBjzAo/EBqFBerQiYCkihCjQgXAXgYAYUgpXApVg6bAAQQgYAAgXAAQmUAAmIgiEiDpg2yIQ39ZINovvQACgCABgBIAbgcQAFgEAEgFQAMgMAMgMQALgKAKgKEhkshkZQAIgHAIgIQATgTATgTEiDsg2oQAAgCABgCQABgDABgDEiEvgz9QARguARgvQAQgnARgnQACgFABgFEiEvgz9QAhhWAihVEiE7gCMIAAgDMAPqg+hQBKiABNh+EiNygIzQAFhJAHhJEiNsgJ1QAHhOAJhMEiE5AAwIgBhZQgBgwAAgxEiOHADAQAAgKAAgJEiOJgAGQAGkkATkfEiM0gQzIBxsqIGU2gEhZMBuwQlnkolVlTQgNgNgOgOQhwhwhrhyUglIgndgBBg2b");
	this.shape_5.setTransform(603.2,324.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("rgba(46,46,46,0.004)").ss(0.1,1,1).p("EBydg8XQARAdAQAeQAOAbAOAbEBydg8XQAPAdAQAcQAPAcAPAcIAEAMMAOiA6fIAAACQAAAFAAAEQAAAFAAAEQAAAFAAAFQAAAJAAAIEhbnhaOICLiHIAOgGMBVegjZIATgIQBugDBvAAIAAAAQARAAARAAIABAAIAjAIMA1ZALhIAfAHQUCJaQ7Q6QAAABAAAAQATATATASQABACABABIDGDOIAbAlISIYyIARAWECCBACAQAAACAAACECB+AFfQgBALAAAKQgBAmgBAmIgBAXQgCAygCAxQAAAFAAAGQgBACAAACIiJSHQg7FThaFHECCBAC4QgBAvgBAuEB/sAbQUgHMAkPgckAbqQgXAXgXAWUgl3AkKg1WAAAQgmAAgogBUg1EgAbglpgkdQgighgigiUgcUgb9gGugkpIh+0cQABgBgBgBEhcThZiQAMgMAMgMQAKgKAKgKEhcThZiQAMgMAMgMQAKgKAKgKEhyWg8gQBCh4BHh2IAVgbITH4SIAegnEiCAACGIAAgDEh+xAgCQgvjQggjU");
	this.shape_6.setTransform(584.5,296.925);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(97,97,97,0.102)").s().p("EgASBiXQmUAAmIgiQE0AWE7AEQQbARPSjEUAmcgHoAd0gccQFwlgFBl3Ih4C7QiZCligCiIgvAvUgpYApWg6aAAPIgvAAgECGgAATIC9rBQhQFnhtFaIihJXIgZBAIgDAHIgQAnIipEGQDZnZCdnygECD/AJqIgQArIgJAVIAZhAgECN6gtHIABAoIAAAgIgBhIgEiN1g20IALhKQgJBNgHBOIAFhRgEiEbhhIIAhhPIhDCsIAihdg");
	this.shape_7.setTransform(604.625,604);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("rgba(43,43,43,0.004)").ss(0.1,1,1).p("EBwdgx9QAIAQAHAPQAFALAFALEBwdgx9QAHAPAHAQQAFALAGALIAFAWMAK2As7IABAEQAAAEAAAEQAAADABAEQAAAEAAADQAAAHAAAGQABANAAANQABAOAAANQABAOAAANQABAOAAAOQAAAHABAGEB76AAGQABAcAAAbQABAgAAAhQAAAOAAAPIAAAAEB75gAvQAAAEAAADEB78AEVQAAAGAAAFEB78AEVQgBAKAAAJIAAAlEB78ADHIAABOEB74AHSQgBAJAAAJUgBjAt+giqAg7QgWAVgWAVUgkGAh0gy2AAAQgkAAgmgBUgylgAZgj6giHQgggfghgfQhKhIhIhKUgfMgfqgBvgrSIAAAAQgBgOAAgPIgEh4QABgBgBgBQAAgHAAgIEB76AF9IgBAsEBXWhU6QAJAKAKAJQAOAOAOAOQAJAKAJAJIFSFqIAgAwISBbEIATAdEBXWhU6QAJAJAJAJQAPAPAOAOQADAEAEADQAFAGAGAGEhw8gw1QBijXBxjRQDSmCEBluQAQgXAQgWQACgDADgDQACgEACgDQAHgKAHgJQAIgKAHgKQACgEADgDQACgEADgEQADgDACgEQF7oFHeneQAAAAAAAAIAWgKMBQXgjzIAdgNQDNgJDRAAQAAAAAAAAQAQAAAQAAQAGAAAHAAQAGAAAHAAQANAAANAAQAGAAAHAAIAcAMMBVEAjrIAVAJEh77ADDIAAgCEh77ADGIAAgBEh72AH5QAAgEAAgEEh71AIOQAAgDAAgFIgBgEEha6BTKMgg7hK8EhXoBapIjSnf");
	this.shape_8.setTransform(575.15,283.1);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EBsKg4AQAEAFAFAEQAAAAAAABQJGIkGpJNQOzUqBxYzQgCAdgBAdQhWcKrRYDQhoDch0DYQmjMGpAK0QmJHZnTGzUgd1AbxgmXAHOQvOC4wRgYQkggHkagTMg4ogRQIzWtXQgogggoghQmAlBlplxQiWiaiPicIgHgQMgjWhWbIgBgCQgBgZgBgZEBj5hlPQATAUATATQAHAGAGAHQU7U/KWZZQAVA4ATA4IHKbPICZXiQABAZABAZQAAAPAAAPQAAAFAAAFIAAAEQAAAPAAAPQAAAGAAAFQAAAOAAAOQgBAdgCAdIjDa3Im2YiQgIAZgJAYQgFALgEAKIj4GFIy/duIi0EaQirDDi6C6QgKAJgIAJUgpjApZg6sAABQgIAAgJAAUg6ugAFgpjgpjQgEgEgDgDQjFjGi1jNEBj5hlPQAJALALAKQAMAMALAMQU0U0KXZJQAbBJAbBJEB3ggHAIACAvEBsKg4AQAMAbANAbQJnUuBOYMQAEBQADBRIABAoEB3jgD8IAAAeQAAADAAADQAAAEAAADEB3jgB4IAAAIEB3jgBLIgBAwEB3gAARIgBAoUgBcAwmgizAiyUgkTAkTgzSAABQgBAAgCAAUgzVgABgkSgkRQgBgBgBgBECOKAAlQgCArgBArECOIgBiQAAAoACAoECEOA1UQgNAjgNAjEhx0g+DQIcvZNXtYQALgLALgLUAhughgAuqgCTQDbgKDgAAQA/AAA+AAUAxpAAsAjaAi/QAUAUAUAUQDaDbDGDiQLEMsG9OYQANAaAMAZEhk0hkSIAQgQQACgBABgCIAHgHQAHgHAHgHQO1uwRApfQYotvdMisQAHgBAHgBQGwgnG/gCIAjAAQAEAAAFAAMBZwAf5IKDJHEhx0g+DQFclHGgkyQFUj6FqjVUAlIgV8AxqABKQPuAYOyCqUAm9AHDAeNAXNQG0FNF0FeEBqJBenQicCmijClQgXAYgYAXUgpYApUg6aAAPQgYAAgXAAQmmgBmYglEiFNgyhQAghfAiheQKP5fU31FQAJgIAIgIEiNugIXQC/+KYt3VQAHgGAHgHEiAUgDXIAAgJQABgEgBgFQABgEgBgFMALAgzbQBpjeB3jYEiFNgyhQAwiGAyiFQKT47Uk0rEiNigLBICkyKIFx1WEiN1gHRQADgjAEgjQAGhVAGhVEiOHgB+QAGifAKicIACgYQAIh4ALh4EiOJgAJQAAgCAAgCQAAgCAAgBIABg/QAAgLAAgKQAAgNABgNEiOIgBPQAAgYABgXEiN9AHjQgBgagCgaIgJm4QAIkJATkFEiAUgDSIAAgCEiAOABpIAAgIQgDhJgBhHIgCijEiAOAB1QAAgDAAgEEhZCBu3QlsktlblYQgOgOgNgNQjJjKi6jPUghAgk3gCWgxk");
	this.shape_9.setTransform(603.2,323.975);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(94,94,94,0.149)").s().p("EgEkB5LQmmAAmYglQEaATEhAGQQQAYPPi4UAmWgHNAd1gbyQHTmzGJnYIi0EaQicCmijClIgvAuUgpYApVg6ZAAOIgwAAgEB/wAgcIgRAxIgJAUIAahFgECJqgWaIACAyIAAAeIgChQgEiIohKXQKO5eU41FIAQgQQ0jUrqTY7QgzCFgwCGQAghgAjheg");
	this.shape_10.setTransform(631.7875,457.6125);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("rgba(41,41,41,0.004)").ss(0.1,1,1).p("EBuHgnAIAJAmIHEekIACAMQABAFAAAEQABAEAAAEQAGBJAFBIQAEA6ADA6QACAeACAfQAJDHABDLQAAACAAACIAAA0QgBA9gBA9IAAAHEB1zAH+QAAAMAAAMQAAAIgBAHEB1yAI2QAAACgBACEB1yAIwIAAAFIAAABQgPGlg6GTIgHAPQkKZfwaUwIkrKfQgFAHgGAGQgLAOgMAOQgXAbgWAaQgkApgjAoEB1wAJhIg4KIQgKBLgMBJMgUkAuPQlmHFnBGgQgVAUgVATUgiUAffgwXgABQgjAAgjAAUgwHgAYgiIgfwQgfgdgfgeQofoCmWo4MgRvgsLQgKhGgJhGIgrpfIgChTQAAAAAAgBEhymgYeQAah0Afh0QCmpiEPo3QIZxjOyu6QAMgMALgLQAAAAAAgBIAbgLMBSHgiGIAngQIAsAAIAxAQMBEWAWkIAmAMQAJAHAJAHQGqFFGNGNQABABAAAAQACACACACQANAOANAMQACACABABQADAEADACEBT0hO2QAFAFAEAEIC2C/IAhAyMAWWAjAIAQAZQADAKAEAJQADAIADAIEBt6gnjQAEAKAEAKQADAHACAIEh12ACkQAAgBAAAAQAAgGAAgGQAAgFAAgFEh13AEGIAAgCEh13AD1QABgMgBgMEh01ATuIgGgPQgtlngLl1EhdeBL/QgIgKgHgJQgFgHgFgGQgDgEgDgDQgEgFgEgGQgDgDgCgDQgKgMgJgNQgFgGgEgGQgDgDgCgEQgDgDgDgEQgEgGgFgGQgFgGgFgHIkCqCQuTz/jc4M");
	this.shape_11.setTransform(565.8,269.25);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDag3XQAKAZALAZQAcBPAdBOIHheZIB8TqQADArACArQAAAOAAAOQAAAGAAAGIAAACQAAAOAAAQQAAAGAAAGQAAANAAAOQgCAegCAfIjkcwImGV/QgUA3gUA3QgBACgBACECDag3XQASApARApQAWA/AVA+EBoDgv4QAMAeALAfQFkOcBgQIQAjF5AAGHQAABVgBBWQgBADAAADQAAAVgBAUIAAAaIgCAnIAAALEBv8AAUQAAACgBADIgBAmECOKAAlQgCAsgCAsECOFgCFQACA5ADA5EBoDgv4QAEAEAEADQABAAAAABQKvIlHvJOQPJSOCSV5QgCAcgCAdQh6dqtGZBIpAO2QpZNgsyLnUgd2AbHgmSAGzQvLCtwGggQj/gJj7gQMgyzgORI5CwgQg0gogygrQl9lBlklvQiWibiQidIgJgWMgi5hXKQgGiggBihQAAgHAAgGIgBhMQABAAgBgBIABgqQAAgVAAgVQABgOAAgOIABgJQAFhkAGhjIACgXQADgkAEgjQC17caP04QAGgFAGgEQIexkO4u5QAOgNANgNUAiHgh0AwAgASQAbgBAaAAQAoAAAoABUAmsAAXAdpAWMQHJFWGnGnQCDCDB7CGQOuQCHoS+QAHASAIATgECEcA0sQgQAugQAtQgFALgFAMIgIASImpK+Qg8BzhABxQjQFzj0FfIlWIyQkqFyldFdQgIAJgKAJUgpiApZg6tAACQgHAAgJAAUg6vgAFgpjgpjQgDgDgEgEQjWjXjDjfEBvCALIQgHBCgIBCEhj8hlMMBNCgnaQAcgEAcgEQKchgLDgDQAPABAQgBQAGAAAHAAMBiIAnbQA/A9A+A9QAIAJAJAIQADAEAEADQADADACADMAevAtHEhwig3JQEujwFejiQFRjYFni2UAkzgSzAxLABjQPkAfOxChUAm1AGoAeOAU4QFYDtEzD0EBurBZWQkfFVlFFHQgXAYgXAXUgpYApTg6bAAOQgYAAgXAAQmxgBmjgoEBTHBI5QisDCi7C7UgiiAihgwxAABQgBAAgBAAUgw0gABgihgifQgBgBAAgBQgFgFgGgGQgQgQgRgRQgEgEgEgEQgYgZgYgYQgTgUgTgUQgUgVgTgUQgSgTgSgTQgNgOgOgPQgKgMgLgLQgFgGgFgFQgkgngjgoQgegigegiQgDgEgEgEQgdgigdgiQgKgMgJgLQgIgJgJgKQgEgGgFgFQgEgFgEgFQgFgGgEgFQgTgYgTgWQgFgHgFgGQgPgSgOgRQgLgOgLgOQgKgNgLgOEiFQgyRQAihqAlhoQKP5fU31EQAEgEAEgDIAfggQACgBABgCQAPgOAOgOEhkchktQAIgHAHgIQAJgIAIgIEiFQgyRQAyiOAziNQKR45Uf0oEiNngJOICTxXIGE3sEh7tgFDIABgYQAAgMAAgLIAAgKEh7tgEcIAAgDQAAgGAAgGEh7rgBxIgCioQAAAAAAgBEiNygGsQAFhSAGhQEiN5gFlQAHh1ALh0EiOIgA4QAAgjABgjEiOBAGNIAAgCQgGilgBinEh6xAK+QgGg/gHg/EiOJgAOQAIjQAPjOEh7sgGUIDQ6rQCzrkFHqmEhZSBuoQllkolUlSQgNgNgOgOQjZjajJjiUgg8glKgB9gyA");
	this.shape_12.setTransform(603.2,323.8);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(92,92,92,0.2)").s().p("EgAJB5nQmxAAmjgoQD7AQD/AIQQGAgPLitUAmSgGyAd2gbHQMyroJYtfIlVIxQkgFVlEFIIguAvUgpYApTg6bAANIgvAAgEiOBgOOQgHilAAioIAAANQABCiAGCggECOFgWgIAEBWIAAAcIgEhygEiEJhJ+QKP5eU31EIAIgIQ0fUpqRY5QgzCMgyCOQAihpAlhpgECDuhK/IgUgzIAiBTQAXA+AVA/Ig6idgEhkZh5KIAdgcIgRAQIgPAPIADgDg");
	this.shape_13.setTransform(603.2125,454.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EBk5hkSIXTeTQANAWANAXQAFAKAGAKQAIAOAIAOQAFAJAFAJQDsGqC4HBQAGAPAHAQQATA4ATA5IG+bcICkWoQADAxADAyQAAANAAANECDvg2lQAaBIAZBIECOEgCRQADA+ADA/QAAAHAAAGQAAAPAAAPQAAAIAAAHQAAAMAAAMQgDA1gEA1Ii6YPImqZoQgRA1gTA1QgEAJgDAJIpHPDQghA6ghA5QhoCyhwCtQqrQivcNsUgd4AacgmNAGXQvICjv6goQjogJjjgPMguZgMXI7UxJQh3hdh1hjQl5lBlflsQiaiiiUiiIgLgbMgiYha5IAAgBQAAgbAAgaECOKAAmQgEBBgDBBEBjegnfQAEADADACQABAAAAABQMtIhI+JCQPePzC0S/QgCAbgCAdQieeSuUZYIkaHSInlMjQkrF1ldFeQgKAJgIAJUgpjApag6tAACQgHAAgJAAUg6vgAFgpjgpiQgEgEgDgDQjsjtjUj2ECEfA0fQgWA+gVA+EBkDhlIQAOANANANQAGAHAHAHQAHAHAHAHEBkDhlIQAGAGAGAGQAMAMAMAMQAJAJAJAJEiDpg2xMAZygoRQAfgiAeghQB6iECAiBQABgBABgBIAYgYQAIgIAHgIQAFgEAEgEUApYgpKA6VgANQAOABANgBQAIAAAJAAMBX6AecIL+KvEhvAgwAQIMz5QewdQARgRARgRUAgNgf2AtRgAYQAiAAAhAAUAuUAAAAguAgwQCXCWCMCbQP8RrG8VbQAKAgAKAgQAQA1AQA1QEIN+AXPiQACBcAABcQAABggCBgIAAANQgBAHAAAGQAAADAAAEQAAAIgBAJIAAAKQAAAKgBAMEhvAgwAQD4igEViaQFNi1FkiYUAkegPpAwsAB7QPcAnOtCXUAmvAGOAeNAShQDyCUDfCVEBRMA+3QgEAFgEAGQgQATgQAUQkEFCkwExUggvAgvguSAABQgBAAgBAAUguTgABggvgguQAAAAgBgBQgKgLgKgJQgfgggfggQgEgEgEgDQgbgcgagbQgJgKgJgJQgHgIgIgIQgDgEgFgEQgVgXgVgXQgEgFgFgEQgIgKgJgJQgHgIgHgHQgPgSgQgRQgGgHgGgGQgKgMgKgLQgKgLgKgLQgHgJgIgIQgFgGgGgHQgIgKgJgJEBnuAHwQgMB0gPBzEBuuBZTQkiFWlHFKQgXAXgXAXUgpZApSg6aAANQgYAAgXAAQnGgBm1grEiFKgybQAviJAwiJQABgCABgCEiFKgybQAghnAjhmQAPglAPgkEiN2gFPQCu4bb+yPQAFgDAFgEEh3GgFkIAAgDMAEgggUQBklJCCk8EiNpgIDICmzSIF53GEiN2gFPQAGhaAHhaEiOGgCDIACgiQABgXACgWIADgvQAEgnAEgnEiOIgA4QABgmABglEiOIgA4QAAgUAAgUQABgSABgREiOIABvQAAgTAAgUQAAgIAAgHIgBhJIABgoEiOJgAQQAIigALifEiN+gEBQAJiCAMiAEh3EgDCIgCidQABgCgBgBEhXzBv0QmXlKmCl/QgNgNgOgOQjvjwjaj4UghxgmlgAng0U");
	this.shape_14.setTransform(603.2,323.6);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("rgba(38,38,38,0.004)").ss(0.1,1,1).p("EhrSgbRQBclGB/k4QIEz0QOwbQARgRARgRQAAAAAAAAIAigOMBNeggOIAxgUIASAAQAOAAAOAAQaJAGVyKiQAEACAEACQAFACAEACQAGADAHADQQVIAN4N4QAAABABAAIAZAaQADADADADQAEADADAEEBPchJnQAHAGAGAHIDcDnIAgA3MAW4AnGIAOAYQAHAXAHAXQAJAeAJAdEBf2A6EQm6KFp3I9QgUASgUASUggjAdIgt3gABQghAAgiAAUgtogAXggYgdZQgegbgdgbQlPk2kZlMUgVLgZCgBBggpIAAgDQAAgDAAgDQgBgWgBgXQABgBgBAAEBqrgdeQAHAXAHAXQAKAeAIAdIAHApIEedfIABAJQABAIAAAJQAAAJAAAJQABA+AAA/QAAACAAACIAAAwQgBA4gBA3QAAAUAAATIgBAGEBvwAIZQAAABAAABIgBALEBuZAWhIAOghQA5mJAOmaIgsI8QgSCFgXCDQjZTQrKQTIlKMlQgCAEgDADQgEAGgEAGQgDADgCADQgDADgCADQgEAGgFAGQgEAGgFAGQgCADgDADQgCADgCADQgCADgDADQgJANgKAMQgSAZgTAYQgPASgPATEBuZAWhMgOjAjjEhvyAFGIAAgCEhZjBCJMgWMg5rEhVKBNhIkZrY");
	this.shape_15.setTransform(556.45,255.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(89,89,89,0.251)").s().p("EgALCOKQnGgBm1grQDjAPDoAJQP6AnPIiiUAmNgGXAd4gacQPbtsKswiInlMiQkjFXlGFKIguAuUgpZApSg6aAANIgvAAgECLfAN9IAEg3Qi0y/vevzQo+pCstohIgPguIgOgYQm71bv8xrIghg3IjbjoIgNgNIgagZIgBgBQt4t5wVn/IgNgGIgIgFIgJgEQ1yqi6HgGIgdAAIgSAAIgxAUUgtRAAYggNAf2IgiAOIgBAAIghAiQwPQboDT0Q7+SPiuYbIANi0ICmzSIF53GQAviJAwiJIACgEMAZygoRIA9hDQB6iECAiBIACgCIAYgYIAPgQIAJgIUApYgpKA6VgANIAbAAIARAAMBX6AecIL+KvIAMAMIAYAYIASASIXTeTIAaAtIALAUIAQAcIAJASQDtGqC4HBIAzCQIG9bcIClWoIAFB9IAAAMIAAAfIAAAOIgGCDIi6YOImqZoIgsB8IAsh8IgkBqIgIASIpGPEQOU5YCe+TgEiOIAB4IAAg2IAAAQIAAAngECOJgAKIgFh9IAFBjIAAAaIAAAAgECOEgCHIAAAAgEiEHg1eIAehJIgCAEQgwCJgvCJQAghnAjhmgEiDpg2nIAAAAg");
	this.shape_16.setTransform(603.2124,322.6);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("rgba(36,36,36,0.004)").ss(0.1,1,1).p("EhnDgTqQA8kFBTj9QADgJACgIQADgIADgJQAHgVAHgWQAFgMAEgMQAKgdAKgdQAIgWAIgWQAEgIADgJQADgJADgJQAEgJADgJQADgHACgHQAFgNAGgOQADgHADgIQAHgSAGgRQHvziQEwEQAAAAAAAAIApgSMBIAgeUIA6gYQAmAAAmAAQABAAABAAQANAAANAAUAq8AAKAejAd9QAaAaAbAbQABAAAAABIAPAPQAHAHAIAHQVuV9GQcXQCiLcABMdEBoqAS2QkUeu53W2QgTAQgTARUgeyAaygrWgABQggAAggAAUgrKgAVgengbDQgcgZgcgZQ5m3Cj8+/EBKrhEfQV6WDGTcfQApC3AcC7EBpbAGtQgBBOgCBN");
	this.shape_17.setTransform(549.05,241.625);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EhkghksIALgMQADgCADgDUApZgpMA6XgAMQAMABAMgBQAKAAAKAAMBkDApYQAGAGAHAHQAGAGAFAFQABABABABQQtQwJ8TjQCbEwCBE7QAAABABABQAFANAGAOQAQAxAQAxIGNXwIDaaVQAEBFAEBGECDwg2jQAVA+AWA/ECOCgChQAEA5AEA6QAAAMAAAMQAAAHAAAHQAAABAAAAIAAAdQAAAIAAAIQAAALAAAMQgEA7gFA7Ijka7ImDW9QgUA4gTA4QgBADgCAEECOKAAmQgFBGgEBHEBeVgeyQADABADACIAAAAQPDIWKbIrQP0NXDVQEQgDAcgCAbQjEe9vpZwQryTfx9PhUgd5AZxgmIAF8QvFCYvvgwQmEgTl4gsMghegIuMgh3gT6QiShxiOh6Ql2lClalqQiXifiRifIgMgiMgh9hY0QgBhIgBhHQAAgIAAgGIgBgrQAAgKAAgJQAAgBAAgBQAAgEAAgEIAAgCQABgBgBgCIABgSQAChlALhjQCf1QeKveQAFgCAEgCQHi2fSGyHQAVgUAUgUUAeCgdmAp+gAuQBDgCBEAAUArzAAAAe9Ae+QV9V9GZcZgECEaA0rQgQAwgQAwQgFALgFAMIgDAHIwvdQQmYIuoAIAQgIAJgJAJUgpjApbg6tAACQgHAAgJAAUg6vgAEgpkgpjQgEgEgDgDQj5j5jfkFEBg7gDoIgvJsUgD3AjogaWAaVUge9Ae+grwAAAQgBAAgBAAUgrzgABge9ge7QAAgBgBgBUga1ga1gDhgkdIgmpAQAAgBAAgBQgBhJgBhKQAAgCAAgDIAAgEIC+5sQBDkIBVj/QC1hdDEhZQFIiUFih4UAkJgMgAwNACTQPSAvOsCNUAmoAFzAeNAQNQB7BBB3BCQAqC5AhC9IBdSHQAAACAAACQAAAHAAAHIAAAgEBy+BT5QmUIOnoHsQgXAXgWAXUgpZApRg6bAAMQgYAAgWAAQqSgBpxhWEiFBgyuQAriAArh/QKU5GUw0yQADgDAEgEEiFBgyuQAdhgAfhfQKO5eU51DQAPgPAPgPEiOIgAoQAAgbAAgbQALizARiwEiOJgAWQAHhtAHhtQAIhpAHhoIDL2VIFg1YEiOGADUIgBgBQAAgIAAgHQAAgOAAgNQgBgPAAgOQAAgrAAgqEhXlBv/QmflQmJmHQgOgOgNgNQj9j+jkkHUgg3gl1gBGgy/");
	this.shape_18.setTransform(603.2,323.4);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(87,87,87,0.302)").s().p("ECJeAv/IAIB0IAAAYIgIiMgEiIogDLQKO5eU41DIAegeIgHAHQ0vUyqUZGIhXD/QAdhgAghfg");
	this.shape_19.setTransform(632.375,0.0375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDqg2xQAIATAIAUQATA5ASA7IG1b8ICuWMQAEA7AEA8ECDqg2xQADAGACAGQAYBHAYBIEBk/hkQISkWrIMHW0ECOCgCOQAEAwAEAxQAAALAAALQAAAHAAAGIAAAeQAAAJAAAJQAAAKAAALQgFA/gFA/IkGc1IllVGQgOAtgOAsQgDAHgDAIIszXyQnzLzqlKnQgJAJgKAJUgpiApbg6tAADQgIAAgIAAUg6wgAEgpkgpjQgDgDgEgEQkHkIjqkVIgPgnMghghX2IgBgCQgBgpgBgqQAAgVAAgUQAAgfAAgfIgBg5QAAgBAAgBIAAgQIABgFQABg9AHg7UACEgR0Ag+gMiQAEgCADgBQGY5YTzz0QAYgYAZgYUAbBgahAlQgBzQCsgICwAAQeeAAX4P6QG6EmGWF7QBcBWBbBbQCcCcCQCiQTnWKD7crQABALACAMQACABACABIAAAAQAKAFAKAFQRoH/MAH9QQLK8D2NKQgEAbgCAbQjleiwAZZQsDTNx8PGUgd7AZHgmCAFhQvDCNvkg4Qk1gSkughI7ImHMgo7gWbQiwiGipiSQlxlBlWlpQiVieiOieECOKAAmQgFBKgFBJECEVA00QgRA0gRA0EBj8hlSQAQAQAQAQQAHAGAGAHQALAKALALEBj8hlSQALAKALAKQAMAMALAMQAMALAKALEhk7hkSIASgTQALgLALgMQACgBABgBUApZgpOA6bgALQAKABAKgBIAXAAMBjtApFEBZbgIKIAAAOQAAABAAABQAAAJAAAIIAAAUQAAAHAAAIIgCBpIgBAxIAAAGQAAAFAAAGIgCAiIAAAKQgDBhgHBhIgHBtUgC2AjmgaAAaBUgdLAdLgpQAABQAAAAgCAAUgpRgABgdMgdKQAAgBgBAAUga3ga5gCHglHIgMkJQAAgBAAgBQgBgqAAgpQAAgbgBgaQAAgDAAgDIAAgEIBry1QAmjEAwi+QBjglBmglQFFhyFfhZUAj0gJWAvtACrQPKA3OqCDUAmRAFWAeEANuQAOBqAMBrIAhKJEB3ABOOQnyLSqOKUQgXAWgXAXUgpYApQg6bAALQgXAAgYAAQpvgBpRhOEhlGhkIQAFgFAFgFQAAAAABAAEhlGhkIQAFgFAGgFEiDrg2sQAEgIADgIQACgGADgGQI+1rQxybIEqk6EiFBgylQAehnAghlQAMgeAMgdEiFBgylQAriEAriDEiOJgAXQABgjAAgiQAKiFANiDEiOFADwQgChXgBhYQAAgGAAgHEiOAgCUQAIhoAHhoIDF2NIFr20EhXTBwLQmplXmTmQQgNgNgOgOQkLkMjwkXUggSglfgBOgyX");
	this.shape_20.setTransform(603.2,323.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("rgba(33,33,33,0.004)").ss(0.1,1,1).p("EhiFgLxQAhjCAui9QGT5qT/z/QAAAAAAgBIAxgVMBARgcUIBGgeQCJgFCLAAQABAAABAAQAMAAAMAAQcdAGWsN/IC2CQINPKhICjCCQAJAJAJAJQAPAOAOAPQAEAEAEAEEBGDg/uQAKAJAKAKQASASARASIDuD9IAbA5MAXiAy1IAFAKQABAIABAHQANBpAJBqEBjWANnQiVfX6nWwQgSAPgSAPUgdAAYdgo3gACQgeAAgfAAUgoqgAUgc4gYsQgagWgagXQ532iiX+4EBiqgHCQABAIABAHQA2GjABG4QAAAEAAADIAAAAEBjhAJcQAAARAAARQgBAHAAAIQAAAIAAAJEBjgAKTQAAAMAAAMQgBALAAAKEBjeALKQAAAFAAAEIgICUQgBATgBAS");
	this.shape_21.setTransform(538.3875,227.7751);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(84,84,84,0.349)").s().p("ECEVBLwIgcBYIgGAQIAihogECOCAUsIAHBhIAAAXIgHh4gEiOIAVeQAKiEANiDIgPDQQgHA7gBA8IAAAGIAAhGgEiECge2IAXg7IhWEHQAehmAhhmgEhk8hNWIABgBIgLALIAKgKg");
	this.shape_22.setTransform(603.2,176.425);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EBkHhlKQALAKAKALQAHAGAGAHQU+VAKSZcQARA2AQA3IGcaRIDLX5QAEA+AFA/EBkHhlKQAGAGAFAGQANAMAMAMQUyU1KSZNQAVBCAWBDECOBgCVQAFA0AEA0QAAALAAAKQAAAGAAAHQAAADAAADIAAAYQAAAKAAAJQAAAKAAAKQgFA5gFA5IjraUIl+XrQgPAygPAxQgEAHgCAIIs0XyQnxLzqmKoQgJAJgJAJUgpiApbg6tAADQgIAAgIAAUg6wgAEgpkgpiQgEgEgDgDQmtmullnNIgRgvMgc8hRJQgEh+gBh+QAAgGAAgGIgBg1QAAgBAAgBIAAgKQABgLAAgLIABgKQAAgDAAgDIACgOUABagN/AkggJTQACgBACAAQACgBADgBQABgKACgKQEi75Uu1MQAcgcAcgdQAqgpApgpUAaigZpAk9gAfQAtAAAsAAUAmxAAAAbaAbaUAaEAaEABSAkVQAAAAABABIAAAAQCuA9CqBBQRpGoMRGJQQfIiEYKPQgDAbgDAbQkFeIwYZCQsUS6x8OrUgd8AYdgl9AFGQu/CCvahAQjrgPjmgYI0+kEMgvxgYZQjKiZjCirQlulBlRlnQkik2kDlCECOKAAmQgGBDgEBDECEXA0rQgSA5gSA5EhkehkyIAMgMQABgBAAAAUApbgpQA6cgAKQAIABAIgBQAOAAAOAAIAAAAMBYDAepILyKmEBR5gIZIgCB8IgCBBQAAAEAAAFIAAAAMgTKArwIoMSvUgbaAbagmvAABQAAAAgBAAUgmxgABgbZgbZQgBAAgBgBQsyszm1vQIior4IlH2+IgBgDQAAgHAAgHIgBgjQAAgSgBgSIgBhtQAAgFAAgEIArrrQARh6ATh4QE9hOFWg6UAjfgGNAvPADEQPAA/OoB4UAjBAEiAcNAJ/QADBXABBYIAAAfEBR5gJCIAAAUEB2/BOPQnzLSqOKTQgXAXgXAWUgpYApPg6bAAKQgYAAgXAAQpQgCo1hFEiF5gvdQBFjpBKjnQKS5HUu0yQAGgGAGgGEiF5gvdQA5jOA/jLQKO5eU51CQAOgOAOgOEiNegIIIC8zuIEpznEiOJgAaQABgFAAgGEiOJgAPQAAgFAAgEIAAgCQABggAAggQASjZAYjVEiODAE6IgCgEQAAgOAAgOQgDhzAAh1EiOFgBDQARjkAWjhEhXGBwWQmwldmamYQgNgNgOgOQmxmzlrnQUgbfgjMgBdgt9");
	this.shape_23.setTransform(603.2,323);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("rgba(31,31,31,0.004)").ss(0.1,1,1).p("EhBwg6iIA4gXMA/fgaJIBOggIAJAAQABAAABAAQALAAALAAUAipAAIAZhAWCQC4CeCwCwQABACABAAIAVAWQACACACABUAZ4AaJABHAkXQAAALAAAKEhChg5wQAKgLALgLQAOgOAOgOEhChg5wQALgMALgLQANgOAOgNEhc6gDkQAMh5ATh3QAAgEABgDIAHgOMAZQgxFIAihCEBdhALlQAAAFAAAFQhEYyyGS/QjuD5kbDpQgRAOgRANUgbPAWHgmYgACQgcAAgcAAUgmNgASgbGgWWQgZgUgZgUQu9skmlvbQknqyggsNQgBgIAAgJEBCfg5yUAZ8AaLABHAkYQAAALAAAKIADCXQAAABAAABEBdlAH+QAAABAAAAEBdlAITQAAALAAAKEBdjAKkQAAAHAAAHQgBAegBAeEhdjAKXIgBgJQAAgBAAgBQAAgHAAgIEhdjAKgQAAgEAAgFEhdiALRQgBgdAAgd");
	this.shape_24.setTransform(528.4221,213.9501);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(82,82,82,0.4)").s().p("ECEXBL2IgeBjIgGAPIAkhygEiOIAWyIAAgBIAAgLIAAAWIAAgKgECOBAU1IAIBpIAAAUIgIh9gEiOIAVwQASjYAZjWQgXDigRDjIgCAPIAAAFIgBALIAAALIAAhBgEiEAgerQKN5dU51DIAcgcIgLAMQ0vUzqSZHQhKDmhFDpQA5jOBAjLg");
	this.shape_25.setTransform(603.2,174.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDbg3XQAKAZAKAaQApCEAoCGIGSbXICvU8QAEA3AFA3ECDbg3XQAPAkAPAkQAlB6AiB7ECOBgCHQAFAtAEAuQAAAJAAAKQAAAGAAAGIAAAeQAAALAAAKQAAAJAAAJQgGA8gGA7Ij/bTIlrWvQgNAwgPAvQgDAHgCAGIs0XzQnxL0qlKnQgJAJgJAJUgpiApcg6tAADQgIAAgJAAUg6wgAEgpkgpiQgEgEgDgDQm8m9lundIgUg2MgcihQxQgDh6gBh6QAAgHAAgIIgBgsQAAgBAAgBQAAgMAAgNIAAgBQABgeAAgdQAUjaAajYIDDz6IEkzfQBCjmBHjkQADgGACgGMAeOgtCQAQgQAPgQQAHgGAGgGQAJgJAIgIQAEgEADgDQABgBABgBIACgCQAKgKAKgJUApVgo7A6OgAKQAHABAGgBQAPAAAQAAIABAAMBgpAmMQBsBmBqBqQAEAEADADQAGAGAHAHQACACACACQAHAHAHAHMAehAtCECOKAAmQgGBFgGBEEBKDgCQQF5BjFoBsQRpFRMiEXQQ2GGE5HVQgEAagEAbQkmdtwuYrQslSox8ORUgd9AXygl4AErQu8B3vPhIQiJgKiIgMIsgh4Mgx2gU4QnqlInJmVQlqlBlMllQkfk1kAlBECEUA0xQgRA2gQA2EhkfgPXUAB6gghAXjgXjQAfgfAfgeUAYsgYDAiZgAoQA7gBA7AAQQ5AAOnFlQPhF7M6MPQA/A8A9A+QLhLgGcNlMAHsAkLEBKDgCQQigfN20W0UgZpAZpgkNAAAQgBAAgBAAUgkQgABgZngZnQgBAAAAgBQgDgDgEgEQghghghgiQgDgEgEgDQgMgNgMgMQgFgFgFgGQgJgJgJgJQgLgNgMgLQgLgMgLgMQgHgJgIgIQgFgGgGgGQgLgMgKgLQgEgFgFgEIn80BMgOBgjRIAAgBQAAgGgBgGIAAgEQAAgEAAgDIAAgMQAAgNgBgOIgBhlQAAgFAAgFIADisQADhVAFhTQDCgXDKgQUAjKgDEAuwADdQO3BGOnBvQfGDtZyGxQADABADABgEBKXgKKIgDDIQAAAKAAAKIgBAUQAAADAAADIgHBpIgJCbEB2/BOQQn1LRqOKUQgXAWgWAWUgpaApOg6bAAJQgXAAgXAAQoZgCoDg4EiFzgvjQA3jOA9jKQANgfANgfEiOEAEuIgBgEQAAgOgBgNQgChxAAhzEiOJgAdQAVj4Aaj1EiOJgADUAANgJIAlUgFpQCBgTCGgQQABAAABAAEhPGB2OQrEnsqHqEQgOgOgNgNQnBnDl1nhUgbIgjEgBagtt");
	this.shape_26.setTransform(603.2,322.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("rgba(28,28,28,0.004)").ss(0.1,1,1).p("EhXdAGaQABhUAFhTQABgSABgTUAB6ggeAXigXjQAAAAABgBIA9gZMA7GgYrIBXglIAcAAQABAAABAAQAKAAAKAAQPkAENmEyICCBTIcbSKIBsBFQAHAHAHAHQANANANANQAGAGAGAGEA9ng1FQAIAIAJAIQASASARASIFtGUQHQI0EdJ+EBXVAOfQgGBNgJBMQi3X62URkQgPANgQAMUgZeATxgj5gADQgZAAgbAAUgjugAQgZWgT/QgXgSgXgTQmQlAksliQtPvngxzrQgBgGAAgHEBXgAI/IAAAAEBXdAMIQAAADAAADQAAAEAAAEIAAAFEhXfALRIAAgMQAAAAAAgBQAAgHAAgHEhXeAL0QAAgMAAgM");
	this.shape_27.setTransform(519.0721,200.1002);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(79,79,79,0.451)").s().p("ECAJA0/IgcBgIgFANIAhhtgECJ2gB4IAJBaIAAATIgJhtgEiIJg1sIAZg/IgFANQhHDjhCDmQA3jNA+jKg");
	this.shape_28.setTransform(629.8875,321.325);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDqg2xQACAGADAGQAcBfAdBeIGEZ/IDTXYQAFA7AGA7ECDqg2xQAHAQAHARQAYBUAYBUECN/gCRQAGAyAFAzQAAAJAAAIQAAAGAAAGIAAAeQAAAMAAALQAAAIAAAIQgGA3gGA2IjoY9ImBZJQgOA0gQA1QgDAGgCAGIs0XzQnvL0qlKmQgJAJgJAJUgpiApdg6tAADQgJAAgIAAUg6wgADgplgpiQgDgEgEgDQnKnLl5nvIgVg9Ugazgi9gBVgtgQgDhzgBhzQAAgcAAgbQAAAAAAgBQAAgPAAgPIAAgCQAAgaAAgbQAXjjAdjgIDU0xIEXytQAzjGA5jDQAKgWAJgWQAAgBAAgBIJtzIQGvq+JCqAQCli4CyizQAFgEAEgFQAMgMAMgMQAEgEADgDUAnkgnWA3EgB5QCngGCoAAQAFAAAFAAIAjAAMBj+ApcQADACACADQAHAHAHAGQACADADADQAHAHAHAGQAIAJAIAIMAefAtZECOKAAmQgGA+gGA/EBApAIUIAAAAQKAB2JRCHQRqD5MyCkQRNDrFaEaQgEAagFAaQlGdTxGYUQs2SWx7N3Ugd/AXHglzAEPQu5BsvDhPQgwgEgvgEECEVA0pQgSA6gRA7EhgCgJXIgBhoQAAgGAAgGIAAgDQAAgEAAgFIAChtUAA2ggKAW/gW/QAigiAjgiQW12HfugqQA+gBA/AAUAhvAAAAX2AX2QM2M2GCPrIE/cZEBApAIUQgDAKgCALMgU1Ak8QgYAZgZAYUgX2AX3ghtAAAQAAAAgBAAUghvAAAgX2gX2QgBAAAAgBQtPtPl5wRQgCgGgDgGQgCgGgCgGIjDu/IhBk+IgVhmQAAgMgBgLQADAAADAAQAdAAAdAAUAi1AAFAuRAD1QOtBPOlBjQZoCyWCEBQAvAIAvAJgEBC1gLSIAAAXEBC0gJFIAAAEEBC1gKvIgBBZQAAACAAABQAAABAAABIAAAGEBCzgI3QAAABAAABQAAARgBARIhEITIhCIEQgCAIgBAIEB2+BORQn2LQqPKUQgWAWgWAWUgpaApMg6bAAJQgYAAgXAAQnpgBnWgvIkbgfMg51gVZQr5oDqzqxQgOgNgNgOQnQnSl/nzMgcIhQdIgBgDQAAgOgBgNQgCh1gBh2IABgPQAAgDAAgCEiDqg2sQAAgBAAAAQAAgBAAAAEiOIAAFQAAgEAAgCUAANgDoAk1gBqQEcgLEzACIAAAAQgFhXgDhXIgBgPIgBgsEiOIgAhQAYj9Acj7EiFpgv3QA9jcBCjZEhNmB3OQoylsoHnSQlmlBlIljQkck1j+lA");
	this.shape_29.setTransform(603.2,322.625);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("rgba(26,26,26,0.004)").ss(0.1,1,1).p("EhRaAIOQAAgSAAgTQAAgEAAgEQABgEAAgEQAAgEAAgEQAAgRABgQQACg2ADg2QAAgEAAgFQAAgDABgEQAAgMABgMQABgIAAgIQAAgDABgEQABgYACgYQCL9WVV1ZQADgDACgDQABAAAAgBIBGgdMA2igWxIBigpIAcAAQAJAAAKAAUAhfAAIAXtAXoQACACABACQACABABABIAKALQAGAGAFAFQAIAJAJAIEA5vgvXQAOAOAOAOIDwEEQJwLOEyNQEBRZAM/QgMERg4EDQg6EJhpD6QlrNhueKzQgPALgOALUgXtARbghZgADQgYAAgZAAUghPgAPgXmgRoQgVgQgWgQQxRtIkdxHQgpidgYiiQgJg+gHg/QgJhWgFhYEBRcAJ/IAAABEBRcAKXQAAAGAAAGEBRaAMRQAAADAAADQAAACAAACEBRbAMHQgBADAAADEBPTAdXQgCAIgBAIQgDALgCAKEhRaAMNIgBgRQAAAAAAgBEhRPAQNQgBgLgBgMQgFhegDhf");
	this.shape_30.setTransform(509.725,186.3003);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(77,77,77,0.502)").s().p("ECAGA0zIgfBpIgFAMIAkh1gECJvgCHIALBlIAAASIgLh3gEiIMg11IASgtQhBDZg+DcQAzjGA6jCgEB/fg2aIgFgNIAOAhQAZBUAXBVIg5i9g");
	this.shape_31.setTransform(630.375,321.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EhkThlEQAEgDAEgEQApgpApgoQAGgFAFgGQWS1nbIp5QWzoUaOgDQADAAACAAQATAAATAAQAAAAABAAUA6mAANApXApQQACACACACQAHAGAGAHQAEADADAEQAHAGAGAHQUBUKKMYOQAUAwATAvQAEAJAEAKQAaBcAYBdIE5UhIEacSQAGBFAIBFQAAAGAAAFQAAAHAAAGIAAARQAAAOAAALQAAAHAAAIQgGAxgGAxIjTWpImVbgQgQA6gQA5QgCAFgCAFQAAABAAAAQqQZU03U6QgJAJgJAJUgpiApeg6tAADQgJAAgIAAUg6xgACgpkgpjQgEgDgDgEQnanbmDoAIgYhEMgbthQQQgChogBhpQAAgYAAgZQAAgBAAgBQAAgRAAgSIAAgBQAAgYAAgYQAZjhAejeIDW0oIEWy8QA8jcA/jbQKP5IUu0yQAGgGAFgGIAEgFQADgCACgCQACgCACgCQABgCABgBgECDvg2lQAdBmAdBmECN8gCmQAHA9AHA9QAAAIAAAIECOKAAmQgGA4gGA5EA0fATgQPuB8OCCGQRrCjNEAxQRhBPF8BgQgFAZgEAaQlnc4xeX9QtHSEx5NcUgeBAWcgluAD1QoTA2oTgCIlIgIImAgYQhAgEhAgGUgtggEPgiWgfKQlilBlElhQkZk1j7lAECEWA0gQgSA/gSA+QqcYx0fUnQgWAWgWAWUgpbApLg6bAAIQgWAAgYAAQg3AAg4gCEhbbgKlIAAgBQABAAgBgBQABAAgBgBIgBhGQABgMgBgMQAJ+9V817QWF2FfOAAQfNAAWFWFQAaAaAZAaQVAVkAReJQAAAOAAAOQAABBgBBBQgBAPAAAPIgDAwQgBAXAAAXIgEARIheHqIilNTIihGJQgCAGgDAGEhbagKdIAAgEEhZbAFpQgujGgejNQgpkcgJkoIgBgqEhZbAFpQBFAGBGAHUAfpAC9AoeADuQOkBXOiBaQQoBoPHByQDcAaDWAaIABAAQgGAMgFAMIvGVEQ2FWE/MABQAAAAgBAAQ/OgB2E2DQgBgBAAAAQvavbkqz4gEhkZhk9QADgDADgEEiFlgv3QAyjIA4jGQKN5dU71BQAJgJAIgIEiOIAAHQAAgDAAgCEiOIAAHQAAgEAAgDUAANAB4AkYACVQE2AWFSAiQC+ASDCASEiOFAEEIgBgFQgCh0gBh1IABgPEiOIgAkQAaj5Adj2EgNQCNSUgyQgEPgk0gksQgNgOgOgNQngnimJoGUgafgi6gBOgtW");
	this.shape_32.setTransform(603.2,322.425);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("rgba(23,23,23,0)").ss(0.1,1,1).p("EA06gqnQALALALALQALALALALQAAABABAAIAfBLMAVRAzsIABACQAAABAAABIAAAfQAAAogBAoQgBARAAARIAAAKEA06gqnQAMAMANANQAJAJAKAKEhLXALsQAAgSAAgTQAAgBAAgBIAAgBQAAgEAAgEQAAhIAChHQABgbABgbQAAgEAAgDQABgXABgXQABgXABgXQAAgDABgEQAAgLABgMQBt7zUI0LQACgCACgCQABgBAAAAQWA18e5gKIAaAAQAIAAAKAAQexAHV3VlEhLWAM2QABAAgBgBEhLVAM5QAAgBgBgCEhLVANDIAAgFQAAgBAAAAQAAgDgBgEEBLSAOpQgCAggDAfQgXD8hHDuQjGKQo4IlQjsDlktDTQgOAJgOAJQ17PF+6gCQgWAAgXgBQ+xgN11vSQgUgOgUgOQsDollUqiQjsnUgdoREBLVAN5QgCAwgCAvEBEqAqvQgEAGgDAHQgFALgFAM");
	this.shape_33.setTransform(500.3,172.4752);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(74,74,74,0.549)").s().p("ECAEBLsIggBzIgEAKIAkh9gECJqAUlIAOB6IAAAQIgOiKgEiINge5QKO5dU61BIASgRIgMAMQ0uUyqPZIQg/Dbg8DcQAyjIA4jGg");
	this.shape_34.setTransform(630.5625,174.0125);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDlg2/QAIAWAJAVQAdBqAbBrIFYXqID2Y+QAHA9AHA9ECDlg2/QAFANAFANQAgBzAfBzEBk/hkaMAY2AhOIFwMNECN8gCXQAHA2AHA2QAAAHAAAHQAAAGAAAFIAAAeQAAAOAAAMQAAAHAAAGQgGAzgHAzIjnXmImDanQgOA3gPA4QgDAFgBAFIs1X0QntL0qkKmQgJAJgJAJUgpiApeg6tAAEQgJAAgIAAUg6xgACgplgpjQgEgDgDgEQlSlSkllnIgbhLUgdzgkRgBcgwBQgDh3gBh4QAAgWAAgWQAAgBAAgBQAAgTAAgVIAAgCQAAgVAAgVQAbjjAgjgIDe01IEPyzQA6jZA8jYQADgIADgHIQp9TQAKgOALgOQAwhBAyg/QAog0ApgzQAeglAdgkQEtlvFalcQABgBABgBQAMgMANgNQAHgGAGgHUApBgowA5sgAhQAlAAAmAAQABAAABAAIApAAMBjpApKQALALALALQAGAHAHAGQAMANANAMECOKAAmQgHA6gGA5EAjaAfSQYaCCUwBgQRsBLNVhCQR4hMGdhaQgFAYgFAaQmIcdx1XnQtXRxx6NCUgeBAVxglqADaQiYAOiYAKImqAPQglAAglAAQgXAAgXAAUg6fgALgpbgpUQgOgNgNgOQlZlaksltMgfPhUSIgCgFQAAgNAAgNQgCh0gBh0IABgPQAAgDAAgCUAASAHXAj2AGUQExA3FQBBQIFBhItBaQnKtkgcwUIgBhMQAAgVgBgVQADoEBqnZQEAx6NbuAQAlgmAmgmQUT0TctAAQctAAUSUTQULUKAJceQgBBMgDBMQAAAFAAAGIgBADIhdHnIioNsQkGLFoHJbQh3CKiFCFQ0TUT8rAAQgBAAgBAAQ8tAA0S0SQAAgBgBAAQn3n3k0pIQIPBVIzBQQVNDAYcCeQL/BOMCBFQCeAOCdAOQL5BCLHA8gECETA0mQgRA8gQA9EBkDhlWQAKAKAKAKQANAMAMAMQAHAIAIAIEB29BOTQn5LPqQKTQgVAWgXAWUgmnAmYg1aACqEABdCNyQpDAKpDg6UgtCgEogiBgfMQlflAk/lgQiKiZiGiZEiFggv9QAxjHA2jFQAKgaALgaEiOIAAJQAAgEAAgDEiOIgAoQAcj3Afj2");
	this.shape_35.setTransform(603.2,322.225);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("rgba(20,20,20,0)").ss(0.1,1,1).p("EgwrglOICRiKQSzxKZlgqQBAgCBAAAQABAAABAAQAIAAAIAAQUEAFP8J/QGkEHF3FzQAJAJAJAJQACABABACIANANQACACACACQADAEAEADEAxNgkuQAFAFAGAGIDNDdQQsTHADZ+QgBACABABIgCB4QAAAHAAAGQgBAVgBAVQAAABAAABQAAAIgBAHQgQD8hNDrQkCMPurJbQgNAIgMAHQqrGws/DKQrjC0tXgBQgUAAgVAAQ5XgLyxqZQiLhNiFhWQgSgMgSgMQy7sYg4xMEgxQgkqQAIgIAIgIQALgKAKgKEgxQgkqQAIgHAHgIQALgLALgKEhFSANBQgBgdAAgdQAAgBAAAAIAAgBQAAg4ACg4QABg1ACg0QAAgDAAgEQABgHAAgIQABgKAAgLQABgWACgXQACgrAEgsQAAgDAAgEQABgHAAgIQABgHABgIQADgiADgjQADgZADgaQAAgEAAgEQABgDAAgDQACgTADgSQABgHAAgHQABgIABgHQAEgYADgYQACgMABgMQALhGAMhFQACgJABgJQAEgTAEgTQABgJACgIQADgNACgMIARghIRc/5IA6hrEBFSAN6QAAAVgBAUQAAAHgBAHQAAAHAAAH");
	this.shape_36.setTransform(490.95,158.6254);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(71,71,71,0.6)").s().p("EgU9BhnUgtDgEngiAgfMQlflBk/lfQiLiZiFiaIgchLQEsFtFaFbIAbAbUApbApUA6eAAKIAvAAIBKAAQhZAChZAAQnqAAnqgygEB//AJLIgeBwIgEAJIAih5gECJogtyIANBsIAAAOIgNh6gEiIOhhkIAWg0IgGAQQg9DXg5DZQAxjHA1jFg");
	this.shape_37.setTransform(630.85,600.0688);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EBj/hlcQANANANAMQAGAHAHAGQU/VBKQZfQAbBkAYBlIFCWTIEQadQAIA/AIBAQAAAFAAAFQAAAJAAAIIAAANQAAAPAAANQAAAGAAAGQgGAtgHAtIjPVBImZdPQgQA9gQA+QgCAEgBAEQAAAAAAAAQqOZV03U7QgJAJgKAJUgpiApeg6tAAEQgIAAgIAAUg6ygACgplgpiQgDgEgEgDQlelfktl0IgghVUgcsgjMgCEguOQgJjDgBjHQAAgTAAgTQAAgXAAgZIAAgBQAAgTAAgSQAdjgAhjdIDg0oIEOzGQAwjLA1jIQKN5dU71AQAGgGAGgGIALgLQAJgIAIgJQANgNANgMUApDgogA5rgAWQAYAAAXAAQAAAAABAAQAVAAAWAAQABAAAAAAMBXAAd7IMiLLQANANANANQALAMAMAMQUyU2KNZQQAdBrAcBsECN6gCdQAIA5AIA5QAAAGAAAHECOKAAmQgHAzgGAzEAHaArEQBvAJBuAIUAl2AC6AeNgAJQRtgMNmi2QSNjnG/kVQgGAZgFAYQmocDyNXQQtoRfx6MnQu0KbwmGKMgjMAHbIgwAEQljAZltABQgXAAgYAAUg6egALgpagpVQgOgNgNgOQlnlok2l9MgewhRaIgDgGQgHjJgBjMIAAgCQAAgKABgJUAAQAM3AjaAKTQEuBaFNBfQRiE8UfDuQipiLihihQAAAAgBgBIsK8BImUuiIgBgDQAAgMAAgNQgBgtgBgtQAL54SWyVQAuguAugsQRUwYXzguQBFgCBGAAQBMAABLADQXZAwRIP+QA7A3A5A6QSZSYAIZ8QAAA8gCA8QAAARgBARIgDARIgiDQIiBMaQkXOdrgLgIyAM1QgKAEgKAFQgGADgGADI6MFeQAAAAgBAAQ2pAAw6t1QTDDcVlCaQMlBaMvBBgECEVA0cQgSBBgRBCQqfYw0hUnQgWAWgWAVQ3jXZ9GJ9EALhCNWQgIABgJAAQuuBMukhnUgskgFAghtgfOQlblBk6leQiFiViBiVEiFcgv7QA4jaA6jZQKN5JUt0zQAHgGAGgHEiOIgArQAejyAgjw");
	this.shape_38.setTransform(603.2,322.025);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("rgba(18,18,18,0)").ss(0.1,1,1).p("EAsYgqUQAKALALALQAEAEAEADEAsYgqUQAJAJAJAJQAFAGAGAFIAHAIQSRSdACZ7QAAACAAABQAAANAAAMIgBBVQgBASAAASQgBABAAACQgBAagCAZQgKBqgYBmQiyLkvCIqQgMAFgLAGQyZKa56gDQgTAAgTAAQ50gLyUqkQgSgKgQgKQnYkUkYlCQlxmqgin5QgCgOAAgOQgBgHAAgJIAAAAQgBgtAAguIAAgCQAA6KSgyhQAAAAABgBIBcgnMApHgRGICBg1IAJAAQAHAAAHAAQADAAADAAICDA2MAoiAQugEg/MAE1QgBgUAAgVEA/OAEaQAAAGAAAGQgBAfgCAeEAauA8RQgKAFgKAEQgGADgGAD");
	this.shape_39.setTransform(481.6,211);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(69,69,69,0.651)").s().p("EALQBL7IgfB7IgEAHIAjiCgAU2VBIAPByIAAANIgPh/gAKr/FQqN5Q0x02IgYgYIgZgZIAZAYIANANQU/VBKQZfQAaBkAZBlIg5jXg");
	this.shape_40.setTransform(1378.0375,171.725);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDjg3EQAGAQAGAQQAfB5AfB6IFhZmIDuW+QAGA3AIA2QAAAGAAAFQAAAJAAAKIAAALQAAAQAAANQAAAFAAAFQgHAxgHAxIjrWuImPcfQgHAdgHAdQgBADgCADQAAABAAAAQqNZV02U7QgKAJgIAJUgpjApfg6sAAEQgKAAgHAAUg6ygACgplgpiQgEgDgDgEQluluk4mEIgjhdUgcLgi6gCHgtsIgDgIQgIjPgBjRIAAgCQAAgKABgJQAAgaAAgbIAAgBQAAgQAAgQQAPhrARhqECDjg3EQAJAWAIAWQAeBzAbB0EAAtiOkMBhKAnBQBRBOBQBQQABABABABQAFAFAGAGQAGAGAHAHQH5H7GYIkIQgdIECN8gCNQAHAxAHAyQAAAFAAAFECOKAAmQgIA2gGA2EiOIAAQUAAYASTAi1AOOQEqB8FKB/UAhgAMqAsVAFXQOJBuOdA8UAluACfAeOgCeQRuhjN2kpQSjmDHgnPQgFAYgGAYQnJboykW6Qt5RMx5MNQrxH/s1FZI6/HqIn6BKQojA8o9ABQgWAAgYAAUg6dgAMgpbgpVQgNgOgOgNQl2l5lCmOMgeShQmQgKjNgBjPQAAgNAAgMgECECA1fQgJAggIAgQqgYw0hUnQgWAWgVAVQ1cVS6CKKEiDgg3HMAevgtkQACgCACgCQAKgKAKgKQAKgKAKgKQGgmdG7lcQANgKAMgKUAlCgc7Aw+gAFQACAAACAAIAmAAQADAAADAAQAHAAAHAAEAAZiOkQAKAAAKAAEAkigMeIhJJcQjXPpsEMFQwwQv3qABQAAAAgBAAQ3qgBwwwvQAAAAAAAAQgEgEgEgEQgEgFgFgEQgCgCgCgCQglgmgkglQgIgKgJgJQgEgEgEgEQgFgGgGgGQgMgOgNgOQgOgQgOgPQgFgHgGgGQgEgFgFgFQgIgKgJgKQgMgPgNgOIpz6MIjFoPIgBgEQAAgKgBgKQAAgkgBgkQAM3WQjwjQQwwvXrAAQXrAAQvQvQQmQmAJXaQAAA1gBA2IAAAAQgBAFAAAGIgCASEARuCMxQj/AhkFASQusBBuZhvUgsGgFZghYgfQQlXlBk2lcQiDiUh/iUEiEogy/QAgh3Aeh4QAGgNAEgMEiEogy/QAYhqAbhqQALgaAKgaEiOIAAIIAAAIEiOIgAuQAQh7AQh6ID33CIFJ3a");
	this.shape_41.setTransform(603.2,321.825);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("rgba(15,15,15,0)").ss(0.1,1,1).p("Eg5JAPaIAAgBQgBgoAAgqQAAAAAAgBIAAAAQAAgoABgoQABg4ADg4QAAgGAAgGQBE1mPlvmQABgBAAgBQQqwoXbgIIAWAAQAGAAAFAAQAHAAAGAAQIYADHgCKQAEABAEABQAEABADABQNOD3KfKYQAFAGAGAFQACACACACQALAMAMAMEAoXgaZQAIAJAJAIQAFAGAFAFIEhFHQKeNRBPRCQAKCPABCTQgBACABACQAAALAAAKQgBAqgBAoQAAAEAAADIAAALQAAAGgBAGQAAACAAACEA5IAQNQgBAOgBAPQgDAWgDAWQheKLvBHaQgLAFgKAFQwoID3bgDQgRAAgRAAQ3VgJwloOQgPgHgPgIQpOkpkCltQivj4gXkXQAAgLgBgMQAAgFgBgEEg5IAP3QAAgPgBgOEA5JAP8QAAAFAAAFQgBABAAABQAAAIAAAI");
	this.shape_42.setTransform(472.25,130.9512);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(66,66,66,0.698)").s().p("EBNMB75QR5sNN5xMQSk26HJ7oIAMgwQngHPyjGDQt3EpxtBjUgeOACeglugCfQudg8uJhuUgsVgFXghggMqQlKh/kqh8Ugi1gOOgAYgSTIAAgIIAAg2IAAgBIAfj1ID43BIFJ3aQAYhqAbhqIAVg0IgKAZIg+DvIA+jvIAKgZMAevgtkIAEgEIAUgUIAUgUQGgmdG7lcIAZgUUAlCgc7Aw+gAFIAEAAIAmAAIAGAAIAOAAIgUAAIAUAAMBhJAnBQBSBOBQBQIACACIALALIANANQH5H7GXIkIQgdIIANAgIA+DzIFhZmIDtW9IAOBtIgOhtIAOBjIAAAKIAAALIAAATIAAAMIAAAdIgOBsIjrWuImOceIgRBBIARhBIgOA7IgDAGQqgYw0iUnIgrArQ1bVS6DKKQM2lZLwn/gEg84gy0IgCABQvlPmhEVnIAAANIgDBwIgBBPIAAABIAAABIABBSIAAAAIABAdIABAEQAWEXCvD3IJzaNIAZAdIARAUIAJAKIALANIAbAeIAaAdIALAMIAIAIIARATIBIBKIAFAFIAJAJIAIAIIAAAAQQvQvXrABIABAAQXqgBQvwvQMEsFDYvrIBJpaIAGgsIACgSIAAgQIABgCIAAgKIAAgKIAAgIIAChRIAAgVIAAgEQAAiUgLiPQhPxDqetRIkhlHIgXgYIgEgDIgLgLQqfqZtNj2IgHgDIgHgCQnhiKoYgDIgMAAIgMAAIgXAAQ3bAIwpQpgECDvgxQIgNggIASAsQAdBzAcB0Ig+jzg");
	this.shape_43.setTransform(603.225,287.825);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EBlAhkeIPkSWQAEAGAEAFQAFAIAGAHQJIM4FwOSQACAFADAFQAMAyALAzIFOX/IEgabQAIA9AJA9ECDvg2kQAOA4AOA3ECN5gCbQAIA5AJA5QAAAEAAAEQAAAGAAAEIAAAeQAAARAAAPQAAAEAAAEQgIA1gJA2IkLYxIluaaQgGAbgGAbQgCADgBADQqMZV03U7QgIAJgKAJUgpiApfg6tAAFQgJAAgHAAUg6ygABgpmgpiQgDgEgEgDQl+l/lFmXIglhlUgb9gjBgB5gtzIgDgIQAAgNAAgMQgBgggBggQgDiGgBiIIAAgCQAAgKABgJQAAgdAAgeIAAgBQAAgNAAgNQAQhrARhqECOKAAnQgJA5gIA6EiOIAAYUAAbAXvAiVASMQEmCdFHCeUAhLAP0Ar2AFvQOAB2OaAyUAloACFAeOgE0QRvi7OHmcQS5oeIBqJQgHAXgFAYQnqbNy7WjQuLQ6x4LzQn8FOobEFIxdGqIwcD5QsJB9s9ABQgXAAgXAAUg6dgANgpagpWQgOgNgNgOQmImKlOmiMgd2hQ0QgHizgBi2QAAgHAAgGgECEAA1lQgIAegHAeQqhYv0jUnQgWAVgUAVQysSi2MKIEBkBhleQALALALALQAHAHAGAGQAPAOANAPEBkBhleQANANANANQAMAMAMAMQAHAHAGAHEAAtiOmMBYKAfEILKKEEhj7hliMBh/gpDQA1gBA0AAQAFAAAEAAIAmAAQACAAADAAQAGAAAGAAEAAciOmQAJAAAIAAAdJvWQAAAJAAAJQgnUAuVOVQu8O+1KAAQgBAAAAAAQ1KAAu+u9IAAgBQqdqdjKtdIhWqyQAAgGAAgFQAAgdgBgcQAN0zOwuxQO+u+VLAAQVKAAO9O+QOzOzAKU4QAAAQAAAQIgBAgQABABgBABgEAZSCLuQoaBjo2AgQunA2uPh3UgrogFxghEgfTQlTlBkxlZQiDiVh+iWEiElgzDQAYhrAahqQKN5cU70/QAUgUAUgTQAEgEAEgEEiElgzDQAeh1Adh2QKL5KUt0zQAMgNAMgMQAQgPAPgPEiOIAAKIAAAOEiOIgAyQARh3AQh4ID/3CIFD3g");
	this.shape_44.setTransform(603.2,321.625);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("rgba(13,13,13,0)").ss(0.1,1,1).p("EgzEAQRIAAAAQgBglAAglIAAgBQAA1IO8u9QABgBABgBQOjuiUWgbQAlgBAmAAQABAAACAAQAFAAAFAAQAhAAAhABQAOAAAOAAQATABAUABQAIAAAJAAQAIABAIAAQAGABAHAAQANABAMAAQAGABAFAAQALABAKAAQAFABAFAAQAFAAAFABQSZBVNaNTQAEAEADADQACACACACQAFAFAGAGQOwO5ADU9QAAACAAADQAAAJAAAIQAAAYgBAXEAzEAQ3QgmHzuQFlQgJAEgKADQu2Ft07gDQgPAAgPAAQ03gIu0l3QgNgFgOgGQuIlpgin4QAAgCAAgCEgzDAQhQgBgIAAgI");
	this.shape_45.setTransform(462.9,117.1517);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(64,64,64,0.749)").s().p("EBLiB+mQR4ryOKw6QS82jHp7OIANgvQoBKKy6IeQuHGcxvC6UgeNAE0glogCEQuagzuAh1Ugr2gFwghLgP0QlHidkmieUgiWgSLgAagXwIAAgOIAAg7IAAgBIAhjvID/3CIFD3fIA7jsQKL5KUt0zIAYgYIAfgeMBh/gpEIBpgBIAJAAIAlAAIAGAAIAMAAIgSAAIASAAMBYKAfFILKKDIAaAbIAYAYIANANIPkSXIAIALIAKAPQJJM4FwORIAcBwIFNX+IEgaaIARB7IgRh7IARByIAAAJIAAAKIAAAfIAAAfIgQBzIkMYyIltaZIgPA8IAPg8IgNA2IgCAGQqiYw0iUmIgrArQyrSi2MKHQIakFH9lOgEgXKg9NQ0VAcukOiIgBACQu8O8AAVKIAAABIABBKIAAAAIAAAPIBWKxQDKNfKdKdIAAAAQO+O9VKABIABAAQVKAAO8u+QOVuWAn0AIAAgRIAAgCIABghIABguIAAgRIAAgFQgD0+uxu5IgLgLIgDgEIgHgHQtatTyZhWIgJAAIgKgBIgVgBIgLgBIgZgBIgOgBIgPgBIgSgBIgngBIgbgBIhDAAIgKAAIgEAAIhLAAgEBkzhd9IgYgYIgagbIAWAXIANANIAcAcIgNgNg");
	this.shape_46.setTransform(603.225,278.5875);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDwg2jQABADACAEQAKAsAKAtIEhVBIFXeaQAFAjAGAjEAAxiOoMBjmApeQACACADADQAEAEAEAEQAIAIAIAIMAe7AuJQABAAAAABQALAwAMAwECN/gBoQAGAgAFAfQAAAEAAADQAAAFAAAFIAAAeQAAASAAAPQAAADAAADQgHAtgIAtIjkU8ImWebQgHAfgHAfQgBACgBADQAAAAAAAAQqMZW01U7QgKAJgIAJUgpiApgg6uAAFQgJAAgIAAUg6ygABgpmgpiQgDgEgEgDQmNmOlQmoIgohuMgWag9LQIgOXSrMNQEjDAFEC8UAg2AS9ArXAGIQN2B+OZAoUAlhABqAeNgHKQRwkROYoPQTPq5IjtFQgHAXgHAYQoKazzTWMQubQnx3LYQjNCCjQB3ECOKAAnQgIAwgHAwECEBA1eQgIAhgIAiQqjYw0jUmQgWAVgVAVQvJPBxcJhImpDbI6FJWQwfD1yFABQgWAAgYAAUg6cgAOgpZgpWQgOgNgNgOQmZmblZm1Ugbhgi0gB4gtbIgDgIQgBgggBggQgDiRgBiSIAAgCQAAgKABgJIAAgBQAAgfAAggIAAgBQAAgKAAgLQASh1AUh1Ehj5hlmMAiegZiUAblgOfAhMgA9QCLgECLAAQAGAAAGAAIAlAAQADAAADAAQAHAAAHAAEAAdiOoQALAAAJAAAVnwjItKeaQtLNMypAAIgBAAQypAAtMtMQAAAAAAAAQs1s1gWx9IgBgVQABgLgBgLQANyQM/s+QNMtMSpAAQSqAANKNMQM3M2AVSDIAAAdQAAAFAAAGIAAAgEAitCJ0QtkDfuuArQukAruDh/UgrLgGKggvgfVQlQlAkslYQiBiUh8iWEhlDhkcQAIgIAIgIQAGgFAFgGIAGgHQAEgDADgEQARgRARgQEhlDhkcQAOgOANgNEhkihk+QARgQAQgQQAEgEAEgEEiEcgzbQAUhhAXhgQAEgKADgJEiEcgzbQAZhqAZhqMAengttEiOAAGMQgHi0gBi2QAAgBAAgBQAEDiAiDcgEiOIAAMIAAAUEiOIgA1QAUh/ASiAIEj5XIEj1QEiNiAHeQBeJRFDIhg");
	this.shape_47.setTransform(603.2,321.425);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(61,61,61,0.8)").s().p("EBJ3CB9QR4rYObwnQTT2MIK6zIANguQoiNEzPK5QuYIQxwERUgeOAHJglggBqQuZgot2h9UgrXgGIgg2gS+QlEi8kjjAQyrsNoguXImhxyQgjjbgDjjQADDjAjDbIgehSQgHi0gBi2IAAgCIAAgUIAAAAIAAhBIAAAAIAmkAIEj5WIEj1QQAUhhAXhgIAHgTIgyDUIAyjUMAengttIAQgPIALgMIAGgHIAhggIAIgIMAidgZhUAbmgOgAhMgA9QCKgECMAAIAMAAIAlAAIAGAAIAOAAMBjlApeIAGAGIAHAHIARAQMAe7AuJIAAABIAYBgIEhVBIFXeZIAKBHIgKhHIAKA/IAAAIIAAAJIAAAfIAAAhIgOBgIjlU8ImWebIgOA/IgCAEIAQhDIgQBDQqjYw0jUnIgqApQvJPCxcJgQDQh3DMiCgEg3Ogo/QtLNLAASqIAAABIAAAsIABAVQAWR9M1M1IAAAAQNMNMSpAAIABAAQSpAANLtMINK+ZIAAgHIAAgKIABggIAAgLIAAgdIAAgEQAAyotMtNQtKtLyqAAQyoAAtONNgEAAxiF1IgUAAIAUAAg");
	this.shape_48.setTransform(603.225,265.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("EBlIhkbMAcEAn8QBXC7BMDAQABAAAAAAQABADABADQAGAbAGAbIFbaMIEnZ+QAFAdAFAeQAAAFAAAEIAAAeQAAATAAAQQAAACAAADQgEAYgFAYIkKXhIl5cmQgGAegGAdQgBACgBACQqKZW02U7QgIAJgJAJUgpiAphg6uAAFQgJAAgIAAUg6ygABgpmgpiQgEgDgDgEQmemelcm7Igrh2MgQ+gvLQIJMFNoKqQEfDhFBDbUAghAWHAq3AGgQNuCFOXAfUAlZABPAeOgJfQRwloOpqDQTltUJEv/QgHAXgHAWQoqaZzsV1QmAGsmiF1In+GhIo/GSUghMAVIgp9AACQgXAAgXAAUg6cgAPgpZgpWQgNgOgOgNQmqmtllnJUgbSgi6gBqgtiIgCgIQgBgTAAgTQgDiCgBiDIAAgCQAAgKABgJIABBeECDwg2kQAGAeAIAeECOAgBeQAFAbAFAbQAAACAAADECOKAAnQgFAagEAbECD+A1jQgHAfgHAgQqkYu0kUnQgVAVgVAWQjzDwj+DZEBkBhlhQALAKAKAKQAGAHAHAGQASASATATEBkBhlhQAPANAOAOQALAMAMAMQAKAJAJAKEhj1hlsMBg+go9QBRgBBRAAQAIAAAHAAIAsAAMBjbApJACtIcQrZLawJAAIAAAAQwIAArbraQrGrFgTvjIgBgQQABgIgBgIQAOvuLMrLQLaraQIAAQQJAALaLaQLNLOAMPzQAAAXgBAYIjYO7QgBACgBACQgBACgBADQi0GElIFJgEBLQB4eQhgBChjA9UgeIAScglRABSQuhAgt4iHUgqtgGjggbgfWQlMlBknlWQiBiVh6iXEhk1hktQAIgHAHgIQALgLALgLEhkEhleQACgCACgCQAGgGAFgEEhk1hktQAMgMANgNQAGgGAGgGIAMgMQAHgHAIgHEiDng21IEvqZQADgFACgGQAGgKAGgLQJty0QFwLEiEdgzPQAahwAZhwQACgDABgDEiEdgzPQAXhqAXhoQAEgKAEgKEiOIAAOIAAgBQAAgiAAgjIAAAAQAAgIAAgIQAShtAThtEiN4AFyIgKgcQgEh0gBh2QAECEALCCQBiRjKSPSgEiOIgA4QATh1ASh1IET3pIEz3E");
	this.shape_49.setTransform(603.2,321.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(59,59,59,0.851)").s().p("EBovBwqQTr11Ir6ZIAOgtQpEP/zlNUQupKDxxFoUgeNAJfglZgBPQuXgftuiFUgq3gGggghgWHQlBjbkfjhQtoqqoJsFMgL0gg1QgLiCgEiEIgBheIAAgBIAAhGIAAAAIAljpIET3oIEz3FIAujSIAHgUIgCAGIgzDgIAzjgIACgGIEwqZIAFgKIALgWQJuy0QFwLIAPgOIAWgXIAMgMIAOgOMBg/go8ICigCIAPAAIArAAMBjcApJIAVAUIANANIAlAlMAcEAn8QBWC7BNDAIAAAAIAOA8IFbaMIEoZ9IAJA7IgJg7IAJA2IAAAFIAAAJIAAAfIAAAjIgIA1IkKXiIl5clIgOA/IAOg/IgNA7IgBAEQqkYv0kUmIgqArQjzDwj+DZQGil1GAmsgEg0ZgdHQrZLZAAQIIAAABIAAApIABAQQATPiLGLGQLbLaQIAAIAAAAQQJAALYraQFJlIC0mGIACgEIACgFIDYu6IAAgHIABhLQAAwHrarbQrZrZwJgBQwHAArcLcgEBkjhTgIgNgNIgVgUIAcAbIAYAYIATATIglglgEhkchTmIAMgMIgWAXIgPAOIAZgZgEhkQhTyIAAAAgEhkAhUCIAKgKIgOAOIAEgEgEBkBhUBIAAAAgEhj2hUMIAAAAg");
	this.shape_50.setTransform(603.225,209.225);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDvg2jQABABABACQAFAZAFAZIE8YPIFIb9QAFAfAGAfQAAAEAAAFIAAAeQAAATAAARQAAABAAACQgFAdgGAcIlFbpIk+YiQgGAZgFAZQAAABgBABIAAABQqJZW02U7QgJAJgJAJUgpiAphg6tAAGQgJAAgIAAUg6zAAAgpmgpiQgDgEgEgDQlhlikxl2Ig2iIMgOwgk0QHMKkKcJjQEcEDE9D6UAgNAZQAqYAG5QNkCNOVAUUAlSAA1AeOgL0QRynAO6r1QT7vwJly6QgHAXgIAWQmfSXr3QLInjJOIhpB2QiKCUiRCRQgVAVgVAVUgpcApCg6bAACQgXAAgYAAUg6bgAQgpYgpXQgOgNgNgOQlzl1k+mLUgaXggpgDlgqGIgHgTQgcl5gBmEIAAgCQAAgKABgJIAAgBQAAglAAglIAAgBQAKg5AJg5IEf4MIFS59QALg4AMg3QKM5cU90+QATgTATgTQAKgKAKgKMBdngorQC1gHC3AAQAKAAAJAAIAmAAQADAAACAAQAHAAAGAAMBXCAePIMHK1QAMAMAMAMQAHAHAHAGQAPAQAPAPIM3OtIRxfDQADAIADAIIAAABQAGAaAGAbECDpg20QADAIADAJECN/gBiQAFAdAGAdQAAACAAACECOKAAnQgGAegFAeECD8A1uQgGAagGAaQmuPtq1OAEBj9hloQARARARAQQAMANAMALQAFAGAFAFEAAiiOsQAJAAAJAAAjDDBQpoJptnAAIgBAAQtnAApopoQgBAAAAgBQlOlOiZmaIiAqfQAAgWgBgWQAPtMJZpZQJopoNoAAQNoAAJoJoQJbJcAMNRQAAAbgBAaIipL1QiZFekkEjgEBpBBfTQg1A8g3A6Qu7QDx4KjUgeKARyglKAA3QufAVttiPUgqPgG7ggGgfZQlIlBkjlUQg7hFg6hEEiEEg03QAOg8ANg8QKI5MUr0zQAMgMANgNQAagZAZgaEiOIgA8QAAgFAAgFQAJg0AKg0EiOIAAQIAEDUEiNAAORIglhcQgYklgHksQAPFcA1FRQDGTjLhQ8g");
	this.shape_51.setTransform(603.2,321.05);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(56,56,56,0.898)").s().p("EADGCAEQuVgUtkiOUgqYgG5ggNgZPQk9j6kckEQqdpinLqkMgOngkfQg1lRgPldIgEjUIAAAAIAAhMIAAAAIAThyIEf4LIFS5+IAbh3QKI5MUr0zIAZgZIAzgzMBdngorQC1gHC3AAIATAAIAmAAIAFAAIANAAIgSAAIASAAMBXCAePIMHK1IAYAYIANANIAfAfIM2OtIRyfCIAGARIgGgRIAGARIAAAAIAMA2IE7YOIFJb9IAKA9IgKg9IAKA6IAAADIAAAJIAAAfIAAAkIgKA9IlFboIk/YiIgLA1IALg1IgKAzIgBACQmuPtq1OAQL2wLGgyXIAPgtQplS5z7PwQu6L2xyHAUgcPALCgiaAAAQiaAAidgDgEgxkgc3QpnJoAANnIAAABIAAAvIABAYICAKeQCYGaFPFPIABAAQJoJpNnAAIABAAQNnAAJoppQEjklCaldICpr0IABgbIAAg/QAAtnpoppQpnpntpgBQtmAApqJqgEBkehWhIAYAYIALALIgLgLIgYgYIghghIAhAhIAAAAg");
	this.shape_52.setTransform(603.225,227.6736);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECDqg2yQADAHACAHQAEATAFATMAG4AjHIDWR9QACAKACAKQAAAFAAAEQAAAPAAAOIAAABQAAAUAAASQAAABAAABQgCAJgCAJIjZSNQjXRwjlRqQgBAAAAABQAAAAAAAAQkNJzlyJKQoyN8sbMcQgVAVgVAVUgpbApBg6cAABQgXAAgYAAUg6agAQgpYgpYQgOgNgNgOQlnlqk3l+IpF07QFCG7GMGfQEXElE7EaUAf3AcYAp6AHSQNbCVOTAKUAlLAAaAeOgOJQRzoXPKtpQURyLKH10QgJAWgHAWQkJK7mHKHQoKNjrsMGQvMPwx3KJUgeLARHglGAAbQubALtjiXUgpxgHUgfygfbQlElBkflSQgagfgbgfIhFifUgYPgd2gFHglxIgTgsQgBgQgCgPQhFpCgBpeIAAgCQAAgKABgJQAAgoAAgpQAAgDAAgCQAKg1AKg0ECDqg2yQADAIAEAIQADASAEASEAA4iOuMBiBAoBQAJAJAKAJQAkAkAlAlQAFAFAGAGQABABAAAAQAMAMALALQJsJwHYKuINuZfECOGgA6QACAJACAKQAAAAAAABECOKAAnQgCAKgCAKEhjxhl0MBhGgo5QBJgBBKAAQALAAALAAIAmAAQADAAADAAQAHAAAHAAEAAkiOuQAKAAAKAAAoziYQn2H2rHAAQrHAAn2n2Qjujuh9kbIiLqFQAAgKgBgJQAQqpHmnmQH3n2LGAAQLHAAH3H2QHpHpANKvQAAAPgBAPIgoFGQhoHOllFmgECDwA2jQqJZX01U7QgJAJgJAJUgpiApig6tAAGQgJAAgIAAUg6zAAAgpngpiQgDgEgEgDQlNlPkklfEhk3hkvQALgKAKgLQACgCABgBIAfgfQAHgHAIgHEhkAhlmQACgCACgCQAGgFAFgFEhk3hkvQAMgMAMgMEiEBg09QAMg5AMg6QADgGACgGEiEBg09QALg3ALg3QADgJAEgIMAetgtzEiOIAASQAAACAAADIAhLSEiOIgA/QAKg3AKg3IEr4lIFI5rEiMOAVYIgfhGQgkkRgWkYQAgE8A5EzQEmYuPMU4g");
	this.shape_53.setTransform(603.2,320.85);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(54,54,54,0.949)").s().p("EABjCHHQuTgKtbiVUgp6gHSgf3gcYQk7kakXklQmMmflCm6MgTygtnQg5kzggk8IghrSIAAgFIAAhSIAUhuIEr4kIFI5rIAYhyIAFgNMAetgtyIAVgWIADgDIAfgeIAPgPMBhGgo4ICTgCIAWAAIAmAAIAGAAIAOABIgUgBIAUABMBiBAoBIASASIBJBIIAMALIABACIAXAWQJsJxHYKuINuZfIAFANIAIAmMAG5AjHIDWR9IADATIgDgTIADASIAAABIAAAJIAAAdIAAACIAAAmIgDAUIjZSNQjYRwjlRqIAAABIAAAAQkNJzlyJKQGGqHEJq7IARgsQqHV00RSLQvLNpxyIXUgdXANwgj7AAAIiHgBgEguuggrQn2H2AALHIAAAnIAAAIICMKFQB9EaDuDuQH2H3LHAAQLHAAH2n3QFllkBnnPIAplGIABgRIAAgzQAArGn3n4Qn2n1rHAAQrGAAn3H3gECDvgu9IgFgNIAGAPIAHAkIgIgmgEhkfhdgIgDADIgVAWIAYgZgEhkfhdgIAAAAgEhj8heDIALgKIgPAPIAEgFgEhjxheNIAAAAg");
	this.shape_54.setTransform(603.225,272.1127);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("ECOKgyYIAAAnMgKbA17QqMZj1CVCUgpoAppg65AAAUg64AAAgpogppUgppgpoAAAg64QAAgKABgKIAAhXEgx9hIZQARoGFzlzQGFmFImAAQImAAGEGFQF3F2AOIN");
	this.shape_55.setTransform(603.2,643.15);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#333333").s().p("EhkgBkgUgpTgpTgAVg6SIAAhWMAKfg1tQKM5bU909UAppgpoA63AAAUA65AAAApoApoQVCVCKMZiMAKaA18IAAAnIAAAoMgKaA18QqoYv0mUmUgpoAppg65AAAUg63AAAgppgppgEgr4gkgQmFGEAAImIAAAeQAKITF7F6QGFGFIlAAQImAAGFmFQF2l3AOoMIAAgoQAAommEmEQmFmFomAAQolAAmFGFg");
	this.shape_56.setTransform(603.2125,316.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},754).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]},1).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},1).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14}]},1).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17}]},1).to({state:[{t:this.shape_22},{t:this.shape_21},{t:this.shape_20}]},1).to({state:[{t:this.shape_25},{t:this.shape_24},{t:this.shape_23}]},1).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.shape_26}]},1).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29}]},1).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32}]},1).to({state:[{t:this.shape_37},{t:this.shape_36},{t:this.shape_35}]},1).to({state:[{t:this.shape_40},{t:this.shape_39},{t:this.shape_38}]},1).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41}]},1).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44}]},1).to({state:[{t:this.shape_48},{t:this.shape_47}]},1).to({state:[{t:this.shape_50},{t:this.shape_49}]},1).to({state:[{t:this.shape_52},{t:this.shape_51}]},1).to({state:[{t:this.shape_54},{t:this.shape_53}]},1).to({state:[{t:this.shape_56},{t:this.shape_55}]},1).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Star3Animation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AACETIgBgDQADgEgBgDIgCgGIgBgJIAAgBQAAgIABgJIABgDIABgBIAAAAIABAAIAAABIABABQgDAKABAJIACAPQACAFgGAHIABgBgAgGCGIAAAAIgBgBIAAgBIgBgQIgDgVIAAgBIgBgWIACgQIABgGQACgMgDgHIgCgEIgFgLIAAABQgDgGgLgBIgUgBIgTgBIgBgBIAAgBIAAAAIABgBIABAAIASACIAUAAIAIACQAGACACAEIAAAAIADAFIAEAKQADAIgCAMIgCAWIAAABIAAAVIABAJIACANIACAQIgBABIAAABIgBAAgAAKBUIAAAAIgBgBIAAgBIACgEQACgHgBgIIAAgBIgBgSIAAAAIACgMIACgGQACgLAHgFIADgBQAFgDAHAAQAKAAALgCIAVgEQAJgBAMAEIABABIAAABIAAAAIgBABIgBAAIgCgBQgKgEgIABIgUAEIgEABQgKACgIAAQgIAAgGADQgFAFgDAJIgDASIAAATQACALgEAJIgBABIAAAAIgBAAgAhJAIIgUgBIgTgBIgSgBIgUABQgMAAgNgEIgEgBIgMgBIgCABQgHADgLgBQgKAAgJgCQgIgBgPAAIgBgBIAAgBIAAAAIABgBIAAAAIAWACIACAAQAIABAKABQAHAAAFgBIAFgBQAIgDAMAEIAHACQAJABAIAAIAKAAIAKAAIASAAIAAAAIATABIAUABIABABIABAAIgBABIAAABIgBAAgABpAGIgBgBIAAAAIAAgBIABgBIABAAQAJABALgBQAMgBAJAAIABAAIACAAQAIABAIgBIABgBIABAAIAIAAIAJABQAJABAIgDIACAAIALgDIgEAAIgVgEQgIgBgKAAIgBgBIAAAAIAAgBIAAgBIABAAQALAAAHACIAIABIANACQAMACAIgCIACgBIABAAQAKgDAHACIANACIAAAAIAFABIABABIAAABIAAAAIgBABIgBABIgBgBIAAgBIAAAAIAAAAIgBABIgBABIgSABQgMABgKgBIgFAAIgGAAIgJABQgKAFgKgCQgKgBgJABQgJACgKgBIAAAAQgJgBgLACIgMAAIgKAAgADxgGIgHACIAAAAIgKABIACABIALABIAIgBIABAAIAQgCIgLgBIgBAAIgFgBIgEAAgAkAAAIgEgCIgBAAIAAAAIgFABQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAIAAgBIABgCIADAAIAFABQAHgBAKAAQALAAAKgCQALgBAJAAIABAAQAKABAJgBIAUgCIABAAIABABIAAAAIgBABIAAABIgUACQgKABgLgBQgJgBgKACQgKACgMgBIgNABIABAAIAAABIABAAIAAABIgBABIgBAAIAAAAgAkLgDIABAAIABAAIgBgBIgBABgACogIIgRgBIgTAAQgKAAgNgCIgXgBQgMAAgKgBIgSgBIgSgBIgBgBIAAgBIAAAAIABgBIAAAAIASABIASACQAKABAMgBIAYACQAMACAKgBIATAAIARABIABABIABAAIAAABIgBAAIAAABIgBAAgAifgJIgBgBIAAAAIAAAAIABgBQAPAAAHgCQAIgBAKABQALABAJgBIAOgBIAHABQALAAAJgCIAAAAQAJgEAIABQAJAAAHgGIANgJIAAAAIABAAIAAABIABABIgBAAIgBABIgLAIQgGAEgGABIgGABQgHAAgJADQgJADgMgBQgLgBgKABQgJABgLgBQgKAAgHABQgHABgQABIAAAAIAAgBgAAZgQIgDgBQgGgFgBgGIgCgIIgBgJIgCgWIgBgVIgBgTIgBgSIgBgTIgCgXIgCgVIAAAAQAAgJABgKIABgBIAAAAIABAAIAAABIABABIgBAHIAAALIAAAAIABAVIABANIABAKIACATIABASIABATIABAVIACAVIACASQACAGAHAEIABABIgBABIAAABIAAAAIgBgBgAgMghIAAAAIgBgBIAAgBIACgSIABgVIAAgUQABgJgCgLQgCgLAFgKIAAAAIACgEQADgHAAgIQABgKgCgKIAAAAQgCgKABgLIABgBIAAAAIABAAIAAABIABAAQgBALABAJQACAKAAALQgBALgFAJIAAAAIAAACQgEAIABAKIABAHIABANIgBAUIgBAWIgBARIgBABIAAABIgBAAgAgEjEIgBgBQgEgKABgLIAAAAIAEgSIAAgBQACgHABgNIABgQIAAAAIAAgBIAAgBIABAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABIABAFIABASIABAUIAAAAQABAKAAAKIgBABIgBABIgBgBIAAgBQABgKgBgKIgBgUIgBgQIgBAJQAAALgBAHIgBADIgDASIAAAAQgBAJADAJIABACIAAABIgBABIgBAAIAAAAg");
	this.shape.setTransform(-0.0492,0.4729);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFED").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,237,0.808)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,237,0.647)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,237,0.486)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,237,0.31)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,237,0.11)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,237,0)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},8).to({state:[{t:this.shape_3},{t:this.shape}]},1).to({state:[{t:this.shape_4},{t:this.shape}]},2).to({state:[{t:this.shape_5},{t:this.shape}]},1).to({state:[{t:this.shape_6},{t:this.shape}]},2).to({state:[{t:this.shape_7},{t:this.shape}]},1).to({state:[{t:this.shape_7},{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28,-28,56,56.1);


(lib.Star2Animation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AACETIgBgDQADgEgBgDIgCgGIgBgJIAAgBQAAgIABgJIABgDIABgBIAAAAIABAAIAAABIABABQgDAKABAJIACAPQACAFgGAHIABgBgAgGCGIAAAAIgBgBIAAgBIgBgQIgDgVIAAgBIgBgWIACgQIABgGQACgMgDgHIgCgEIgFgLIAAABQgDgGgLgBIgUgBIgTgBIgBgBIAAgBIAAAAIABgBIABAAIASACIAUAAIAIACQAGACACAEIAAAAIADAFIAEAKQADAIgCAMIgCAWIAAABIAAAVIABAJIACANIACAQIgBABIAAABIgBAAgAAKBUIAAAAIgBgBIAAgBIACgEQACgHgBgIIAAgBIgBgSIAAAAIACgMIACgGQACgLAHgFIADgBQAFgDAHAAQAKAAALgCIAVgEQAJgBAMAEIABABIAAABIAAAAIgBABIgBAAIgCgBQgKgEgIABIgUAEIgEABQgKACgIAAQgIAAgGADQgFAFgDAJIgDASIAAATQACALgEAJIgBABIAAAAIgBAAgAhJAIIgUgBIgTgBIgSgBIgUABQgMAAgNgEIgEgBIgMgBIgCABQgHADgLgBQgKAAgJgCQgIgBgPAAIgBgBIAAgBIAAAAIABgBIAAAAIAWACIACAAQAIABAKABQAHAAAFgBIAFgBQAIgDAMAEIAHACQAJABAIAAIAKAAIAKAAIASAAIAAAAIATABIAUABIABABIABAAIgBABIAAABIgBAAgABpAGIgBgBIAAAAIAAgBIABgBIABAAQAJABALgBQAMgBAJAAIABAAIACAAQAIABAIgBIABgBIABAAIAIAAIAJABQAJABAIgDIACAAIALgDIgEAAIgVgEQgIgBgKAAIgBgBIAAAAIAAgBIAAgBIABAAQALAAAHACIAIABIANACQAMACAIgCIACgBIABAAQAKgDAHACIANACIAAAAIAFABIABABIAAABIAAAAIgBABIgBABIgBgBIAAgBIAAAAIAAAAIgBABIgBABIgSABQgMABgKgBIgFAAIgGAAIgJABQgKAFgKgCQgKgBgJABQgJACgKgBIAAAAQgJgBgLACIgMAAIgKAAgADxgGIgHACIAAAAIgKABIACABIALABIAIgBIABAAIAQgCIgLgBIgBAAIgFgBIgEAAgAkAAAIgEgCIgBAAIAAAAIgFABQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAIAAgBIABgCIADAAIAFABQAHgBAKAAQALAAAKgCQALgBAJAAIABAAQAKABAJgBIAUgCIABAAIABABIAAAAIgBABIAAABIgUACQgKABgLgBQgJgBgKACQgKACgMgBIgNABIABAAIAAABIABAAIAAABIgBABIgBAAIAAAAgAkLgDIABAAIABAAIgBgBIgBABgACogIIgRgBIgTAAQgKAAgNgCIgXgBQgMAAgKgBIgSgBIgSgBIgBgBIAAgBIAAAAIABgBIAAAAIASABIASACQAKABAMgBIAYACQAMACAKgBIATAAIARABIABABIABAAIAAABIgBAAIAAABIgBAAgAifgJIgBgBIAAAAIAAAAIABgBQAPAAAHgCQAIgBAKABQALABAJgBIAOgBIAHABQALAAAJgCIAAAAQAJgEAIABQAJAAAHgGIANgJIAAAAIABAAIAAABIABABIgBAAIgBABIgLAIQgGAEgGABIgGABQgHAAgJADQgJADgMgBQgLgBgKABQgJABgLgBQgKAAgHABQgHABgQABIAAAAIAAgBgAAZgQIgDgBQgGgFgBgGIgCgIIgBgJIgCgWIgBgVIgBgTIgBgSIgBgTIgCgXIgCgVIAAAAQAAgJABgKIABgBIAAAAIABAAIAAABIABABIgBAHIAAALIAAAAIABAVIABANIABAKIACATIABASIABATIABAVIACAVIACASQACAGAHAEIABABIgBABIAAABIAAAAIgBgBgAgMghIAAAAIgBgBIAAgBIACgSIABgVIAAgUQABgJgCgLQgCgLAFgKIAAAAIACgEQADgHAAgIQABgKgCgKIAAAAQgCgKABgLIABgBIAAAAIABAAIAAABIABAAQgBALABAJQACAKAAALQgBALgFAJIAAAAIAAACQgEAIABAKIABAHIABANIgBAUIgBAWIgBARIgBABIAAABIgBAAgAgEjEIgBgBQgEgKABgLIAAAAIAEgSIAAgBQACgHABgNIABgQIAAAAIAAgBIAAgBIABAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABIABAFIABASIABAUIAAAAQABAKAAAKIgBABIgBABIgBgBIAAgBQABgKgBgKIgBgUIgBgQIgBAJQAAALgBAHIgBADIgDASIAAAAQgBAJADAJIABACIAAABIgBABIgBAAIAAAAg");
	this.shape.setTransform(-0.0492,0.4729);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFED").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,237,0.808)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,237,0.647)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,237,0.486)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,237,0.31)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,237,0.11)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,237,0)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},6).to({state:[{t:this.shape_3},{t:this.shape}]},2).to({state:[{t:this.shape_4},{t:this.shape}]},1).to({state:[{t:this.shape_5},{t:this.shape}]},2).to({state:[{t:this.shape_6},{t:this.shape}]},1).to({state:[{t:this.shape_7},{t:this.shape}]},2).to({state:[{t:this.shape_7},{t:this.shape}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28,-28,56,56.1);


(lib.Star1Animation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0)").s().p("AACETIgBgDQADgEgBgDIgCgGIgBgJIAAgBQAAgIABgJIABgDIABgBIAAAAIABAAIAAABIABABQgDAKABAJIACAPQACAFgGAHIABgBgAgGCGIAAAAIgBgBIAAgBIgBgQIgDgVIAAgBIgBgWIACgQIABgGQACgMgDgHIgCgEIgFgLIAAABQgDgGgLgBIgUgBIgTgBIgBgBIAAgBIAAAAIABgBIABAAIASACIAUAAIAIACQAGACACAEIAAAAIADAFIAEAKQADAIgCAMIgCAWIAAABIAAAVIABAJIACANIACAQIgBABIAAABIgBAAgAAKBUIAAAAIgBgBIAAgBIACgEQACgHgBgIIAAgBIgBgSIAAAAIACgMIACgGQACgLAHgFIADgBQAFgDAHAAQAKAAALgCIAVgEQAJgBAMAEIABABIAAABIAAAAIgBABIgBAAIgCgBQgKgEgIABIgUAEIgEABQgKACgIAAQgIAAgGADQgFAFgDAJIgDASIAAATQACALgEAJIgBABIAAAAIgBAAgAhJAIIgUgBIgTgBIgSgBIgUABQgMAAgNgEIgEgBIgMgBIgCABQgHADgLgBQgKAAgJgCQgIgBgPAAIgBgBIAAgBIAAAAIABgBIAAAAIAWACIACAAQAIABAKABQAHAAAFgBIAFgBQAIgDAMAEIAHACQAJABAIAAIAKAAIAKAAIASAAIAAAAIATABIAUABIABABIABAAIgBABIAAABIgBAAgABpAGIgBgBIAAAAIAAgBIABgBIABAAQAJABALgBQAMgBAJAAIABAAIACAAQAIABAIgBIABgBIABAAIAIAAIAJABQAJABAIgDIACAAIALgDIgEAAIgVgEQgIgBgKAAIgBgBIAAAAIAAgBIAAgBIABAAQALAAAHACIAIABIANACQAMACAIgCIACgBIABAAQAKgDAHACIANACIAAAAIAFABIABABIAAABIAAAAIgBABIgBABIgBgBIAAgBIAAAAIAAAAIgBABIgBABIgSABQgMABgKgBIgFAAIgGAAIgJABQgKAFgKgCQgKgBgJABQgJACgKgBIAAAAQgJgBgLACIgMAAIgKAAgADxgGIgHACIAAAAIgKABIACABIALABIAIgBIABAAIAQgCIgLgBIgBAAIgFgBIgEAAgAkAAAIgEgCIgBAAIAAAAIgFABQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBAAAAIAAgBIABgCIADAAIAFABQAHgBAKAAQALAAAKgCQALgBAJAAIABAAQAKABAJgBIAUgCIABAAIABABIAAAAIgBABIAAABIgUACQgKABgLgBQgJgBgKACQgKACgMgBIgNABIABAAIAAABIABAAIAAABIgBABIgBAAIAAAAgAkLgDIABAAIABAAIgBgBIgBABgACogIIgRgBIgTAAQgKAAgNgCIgXgBQgMAAgKgBIgSgBIgSgBIgBgBIAAgBIAAAAIABgBIAAAAIASABIASACQAKABAMgBIAYACQAMACAKgBIATAAIARABIABABIABAAIAAABIgBAAIAAABIgBAAgAifgJIgBgBIAAAAIAAAAIABgBQAPAAAHgCQAIgBAKABQALABAJgBIAOgBIAHABQALAAAJgCIAAAAQAJgEAIABQAJAAAHgGIANgJIAAAAIABAAIAAABIABABIgBAAIgBABIgLAIQgGAEgGABIgGABQgHAAgJADQgJADgMgBQgLgBgKABQgJABgLgBQgKAAgHABQgHABgQABIAAAAIAAgBgAAZgQIgDgBQgGgFgBgGIgCgIIgBgJIgCgWIgBgVIgBgTIgBgSIgBgTIgCgXIgCgVIAAAAQAAgJABgKIABgBIAAAAIABAAIAAABIABABIgBAHIAAALIAAAAIABAVIABANIABAKIACATIABASIABATIABAVIACAVIACASQACAGAHAEIABABIgBABIAAABIAAAAIgBgBgAgMghIAAAAIgBgBIAAgBIACgSIABgVIAAgUQABgJgCgLQgCgLAFgKIAAAAIACgEQADgHAAgIQABgKgCgKIAAAAQgCgKABgLIABgBIAAAAIABAAIAAABIABAAQgBALABAJQACAKAAALQgBALgFAJIAAAAIAAACQgEAIABAKIABAHIABANIgBAUIgBAWIgBARIgBABIAAABIgBAAgAgEjEIgBgBQgEgKABgLIAAAAIAEgSIAAgBQACgHABgNIABgQIAAAAIAAgBIAAgBIABAAQAAAAAAAAQABAAAAAAQAAAAAAABQAAAAAAABIABAFIABASIABAUIAAAAQABAKAAAKIgBABIgBABIgBgBIAAgBQABgKgBgKIgBgUIgBgQIgBAJQAAALgBAHIgBADIgDASIAAAAQgBAJADAJIABACIAAABIgBABIgBAAIAAAAg");
	this.shape.setTransform(-0.0492,0.4729);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFED").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,237,0.808)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,237,0.647)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,237,0.486)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,237,0.31)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,237,0.11)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,237,0)").s().p("AgGCKIAAAAIABAAIAAgBIgBgRIgCgNIgCgdIAAgBIADgWQACgNgDgIIgFgJIAAgLIgKAAIgIgCIgUgBIgTgBIgBAAIAAABIAAAAIgBAAIAAgBIgBAAIgUgBIgTgBIAAAAIgSgBIgKAAIgbgBIgHgCQgNgEgHADIgFABIgggBIgWgCIgBAAIAAAAIgBAAIgBAAIAAAAIAMgBQAMAAAKgBQALgBAJAAQAKABAKgBIAUgCIABAAIAAgBIAAAAIABAAIAAAAIAAABIABAAQAPAAAHgCQAIgBAKABQALABAJgBQAJgBAMABQAMABAIgDQAJgDAIAAIAGgBIAWgBIAAgMIACgBIAAgBIAAgBIgBAAIAAAAIAAgBIAAAAIABAAIAAgBIACgSIABgVIAAgVIAAgNIABgZIABgBIAAAAQAFgKAAgKQABgLgCgKQgCgKABgKIAAgBIgBAAIAAgBIABgBIAAAAIAAgCIACgoQABgHAAgKIABgJIAAAPIABAVQABAKAAAKIAAABIABAAIAAABIgBAAIAAABQgCAKABAIIAAABIABAUIACAYIACATIABARIABAUIABAVIACAVIABAKIABASIAIAAIACACIABAAIABAAIAAgBIABAAIAAAAIAAABIABAAIASABIASACQAKABAMgBIAXACQAMACAKgBIATAAIASABIABAAIAAgBIACAAIAAABIABAAQAKAAAHACIAVACIAEABIgKACIgCABIgbABIgHABIgBAAIgSABIgCAAIAAAAQgKgBgLACQgLABgKgBIgBAAIAAABIAAAAIgCAAIAAgBIAAAAQgNgFgJABIgUAEQgMADgJAAQgHAAgGACIgMABIgBAWIgCAMIAAABIAAARIAAACQABAHgCAHIgBAEIAAABIABABIAAAAIgHCRIgBAAIAAABIgBADQgBAJAAAIIAAABIABAIIgBARgAgMAfIABAEQADAIgCALIgBAGgAA8ALIAVgEQAHgBAKAEIgqACIAEgBgADhABIgBAAIAKgBIAAAAIAHgBIAKAAIAKABIgPACIgCAAIgHABIgMgCgAEOAAIgBAAIALAAIgKABgAkLAAIACAAIgCABIAAgBgAkXAAIAJAAIAAABgADTgBIgNgCIAgABIgJACIgKgBgAhOgJIgHAAIAagCQgGACgIAAIgFAAgAgFipQACAJAAALQgBAHgCAIgAAGijIgCgVIAAAAIAAgLIADAuIgBgOgAAAkXIABAJIgBAAIAAAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},2).to({state:[{t:this.shape_3},{t:this.shape}]},1).to({state:[{t:this.shape_4},{t:this.shape}]},2).to({state:[{t:this.shape_5},{t:this.shape}]},1).to({state:[{t:this.shape_6},{t:this.shape}]},2).to({state:[{t:this.shape_7},{t:this.shape}]},1).to({state:[{t:this.shape_7},{t:this.shape}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28,-28,56,56.1);


(lib.Museum = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_62();
	this.instance.setTransform(-331.9,-305.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-331.9,-305.5,664,611);


(lib.LightPole = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_61();
	this.instance.setTransform(-130.05,-430.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-130,-430.9,260,862);


(lib.HousesBG = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(-986.5,-388,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-986.5,-388,1973,776);


(lib.singlecloud = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_59();
	this.instance.setTransform(-261.95,-142.3,0.4318,0.4318);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-261.9,-142.3,523.8,284.6);


(lib.FLOOR = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_58();
	this.instance.setTransform(-448.2,-136.25,0.3468,0.3468);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-448.2,-136.2,896.5999999999999,272.6);


(lib.MonaLisaEntranceLeo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_57();
	this.instance.setTransform(-69.1,-242.55,0.0616,0.0616);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.1,-242.5,135.89999999999998,485.1);


(lib.Body = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,191.5,311.5);


(lib.Side_View_Leo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(-36.7,-193.2,0.2389,0.2389);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.7,-193.2,73.6,386.5);


(lib.Path_15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18152D").s().p("EhdtBDBQnVAAmti2Qmeivk/k/QlAlAivmeQi1mtAAnVMAAAg95QAAnVC1mtQCvmeFAlAQE/k/GeivQGti2HVAAMC7bAAAQHVAAGtC2QGeCvE/E/QFAFACvGeQC1GtAAHVMAAAA95QAAHVi1GtQivGelAFAQk/E/meCvQmtC2nVAAg");
	this.shape.setTransform(830.525,428.85);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_15, new cjs.Rectangle(0,0,1661.1,857.7), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#18152D").s().p("EhdtBDAQnVAAmti1QmeivlAlAQk/k/ivmeQi2mtAAnVMAAAg95QAAnVC2mtQCvmeE/k/QFAlAGeivQGti1HVAAMC7bAAAQHWAAGsC1QGeCvFAFAQE/E/CvGeQC1GtABHVMAAAA95QgBHVi1GtQivGek/E/QlAFAmeCvQmsC1nWAAg");
	this.shape.setTransform(830.55,428.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,1661.1,857.7), null);


(lib.Mona_Lisa_BG = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Painting
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(-263.15,-249.35,0.3172,0.3172);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.004)").ss(0.1,1,1).p("EiLDhfTMEWHAAAMAAAC+nMkWHAAAg");
	this.shape.setTransform(60,40);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(153,153,153,0.137)").s().p("EiLDBfUMAAAi+nMEWHAAAMAAAC+ng");
	this.shape_1.setTransform(60,40);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-831,-571,1782,1222);


(lib.LIGHTS = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,247,174,0.498)").s().p("EgbfhhQMArHgAKMAukDCrMh8XAAKg");
	this.shape.setTransform(398,623.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.LIGHTS, new cjs.Rectangle(0,0,796,1247), null);


(lib.HOME_M = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Text
	this.text = new cjs.Text("Da-Vinci\n Family", "6px 'Ravie'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 10;
	this.text.lineWidth = 34;
	this.text.parent = this;
	this.text.setTransform(137.45,301.15);

	this.timeline.addTween(cjs.Tween.get(this.text).wait(1));

	// Sign
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(85.65,267.25,0.2941,0.2941);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// House
	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(204.65,137.6,0.2941,0.2941);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// BG
	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(-49.1,109.25,0.2941,0.2941);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.1,109.3,780.6,260);


(lib.Camerarecording = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// camera
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,0,0,0.447)").s().p("AhpBqQgsgsAAg+QAAg9AsgsQAsgsA9AAQA+AAAsAsQAsAsAAA9QAAA+gsAsQgsAsg+AAQg9AAgsgsg");
	this.shape.setTransform(82.7,78.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,0,0,0.247)").s().p("AhpBqQgsgsAAg+QAAg9AsgsQAsgsA9AAQA+AAAsAsQAsAsAAA9QAAA+gsAsQgsAsg+AAQg9AAgsgsg");
	this.shape_1.setTransform(82.7,78.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},15).wait(12));

	// BG
	this.instance = new lib.cameraBG();
	this.instance.setTransform(-10,-10,0.358,0.3597);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({x:-11,y:-11},0).wait(3).to({x:-12,y:-12},0).wait(3).to({x:-11,y:-11},0).wait(3).to({x:-10,y:-10},0).wait(3).to({x:-9,y:-9},0).wait(3).to({x:-8,y:-8},0).wait(3).to({x:-9,y:-9},0).wait(3).to({x:-10,y:-10},0).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-12,-12,1304,744);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.PuppetShape_54 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_110();
	this.instance_1.setTransform(-54.9,-309.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.7,-309.5,157.3,414.5);


(lib.PuppetShape_50 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_109();
	this.instance_1.setTransform(-43.45,-105.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.7,-106,170.3,211.2);


(lib.PuppetShape_49 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_108();
	this.instance_1.setTransform(-46.2,-105.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.7,-106,168,211);


(lib.PuppetShape_48 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_107();
	this.instance_1.setTransform(-56.25,-105.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.7,-106,166,213.2);


(lib.PuppetShape_47 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_106();
	this.instance_1.setTransform(-50.5,-105.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.7,-106,164.2,213.8);


(lib.PuppetShape_46 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_105();
	this.instance_1.setTransform(-66.25,-105.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.7,-106,162,211);


(lib.PuppetShape_45 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_104();
	this.instance_1.setTransform(-70.1,-105.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.7,-106,160.10000000000002,213.4);


(lib.PuppetShape_44 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_103();
	this.instance_1.setTransform(-72.9,-104.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.9,-106,159,213.1);


(lib.PuppetShape_43 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_102();
	this.instance_1.setTransform(-74.2,-104.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.2,-106,159.5,213.7);


(lib.PuppetShape_42 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_101();
	this.instance_1.setTransform(-70.55,-104.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.7,-106,156.2,219.8);


(lib.PuppetShape_41 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_100();
	this.instance_1.setTransform(-72.8,-104.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.8,-106,154,221.4);


(lib.PuppetShape_40 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_99();
	this.instance_1.setTransform(-75.9,-104.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-75.9,-106,155.7,215);


(lib.PuppetShape_39 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_98();
	this.instance_1.setTransform(-80.7,-104.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-80.7,-106,160.5,216.1);


(lib.PuppetShape_38 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_97();
	this.instance_1.setTransform(-83.8,-104.4,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83.8,-106,163.6,215.1);


(lib.PuppetShape_37 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_96();
	this.instance_1.setTransform(-86.05,-104.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86,-106,165.8,219.3);


(lib.PuppetShape_36 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_95();
	this.instance_1.setTransform(-73.5,-104.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.5,-106,153.3,224.4);


(lib.PuppetShape_35 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.instance_1 = new lib.BMP_6ee24740_86fe_4ffc_9fe7_bf090fb4ef91();
	this.instance_1.setTransform(1.3,-1.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-1.4,261.3,980.4);


(lib.PuppetShape_34 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.instance_1 = new lib.BMP_dd6b41c0_5568_4f07_bbc3_661edbd3dc5b();
	this.instance_1.setTransform(4.1,-3.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.6,264.1,982.6);


(lib.PuppetShape_33 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.instance_1 = new lib.BMP_8092a444_8ce5_4664_9679_9f4d5a5aa692();
	this.instance_1.setTransform(-0.75,0.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.7,0,261.7,979);


(lib.PuppetShape_32 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.instance_1 = new lib.BMP_823c1e00_6031_405e_bf46_eb255521357a();
	this.instance_1.setTransform(-1.95,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.9,0,262.9,979);


(lib.PuppetShape_31 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_2("synched",0);

	this.instance_1 = new lib.BMP_3ba5c8f2_04b4_4b2b_a252_36f5c7ab6eb4();
	this.instance_1.setTransform(0,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(33));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,261,979);


(lib.PuppetShape_30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_94();
	this.instance_1.setTransform(-72.15,-118.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,238);


(lib.PuppetShape_29 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_93();
	this.instance_1.setTransform(-72.15,-118.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,238);


(lib.PuppetShape_28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_92();
	this.instance_1.setTransform(-72.15,-118.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,236);


(lib.PuppetShape_27copy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_91();
	this.instance_1.setTransform(-72.15,-118.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,239.5);


(lib.PuppetShape_27 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_90();
	this.instance_1.setTransform(-72.15,-118.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,239.5);


(lib.PuppetShape_26 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_89();
	this.instance_1.setTransform(-72.15,-118.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,239.5);


(lib.PuppetShape_25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_88();
	this.instance_1.setTransform(-72.15,-118.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,239.5);


(lib.PuppetShape_24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_87();
	this.instance_1.setTransform(-72.15,-118.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,236);


(lib.PuppetShape_23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_86();
	this.instance_1.setTransform(-74.85,-119.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.8,-119.8,140.89999999999998,236);


(lib.PuppetShape_22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_85();
	this.instance_1.setTransform(-74.15,-121.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74.1,-121.8,140.2,237.5);


(lib.PuppetShape_21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_84();
	this.instance_1.setTransform(-70.6,-120.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.6,-120.3,136.7,236.5);


(lib.PuppetShape_20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_83();
	this.instance_1.setTransform(-70.4,-119.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.4,-119.2,136.5,235.5);


(lib.PuppetShape_19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_82();
	this.instance_1.setTransform(-70.3,-119.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.3,-119.3,136.39999999999998,234);


(lib.PuppetShape_18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_81();
	this.instance_1.setTransform(-70,-119.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70,-119.8,136.1,234.5);


(lib.PuppetShape_17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_80();
	this.instance_1.setTransform(-70.2,-119.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.2,-119.4,136.3,234);


(lib.PuppetShape_16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_79();
	this.instance_1.setTransform(-70.3,-120.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.3,-120.1,136.39999999999998,233.7);


(lib.PuppetShape_15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_78();
	this.instance_1.setTransform(-70.4,-119.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.4,-119.8,136.5,233.39999999999998);


(lib.PuppetShape_14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_77();
	this.instance_1.setTransform(-71.7,-121.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-71.7,-121.1,137.8,234.7);


(lib.PuppetShape_13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_76();
	this.instance_1.setTransform(-74,-121.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-74,-121.8,140.1,235.39999999999998);


(lib.PuppetShape_12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_75();
	this.instance_1.setTransform(-69.95,-120.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.9,-120.1,136,233.7);


(lib.PuppetShape_11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_74();
	this.instance_1.setTransform(-67.7,-119.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.7,-119,133.8,232.6);


(lib.PuppetShape_10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_73();
	this.instance_1.setTransform(-67.7,-119.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.7,-119.3,133.8,232.89999999999998);


(lib.PuppetShape_9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_72();
	this.instance_1.setTransform(-67.8,-117.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.8,-117.5,133.89999999999998,231.1);


(lib.PuppetShape_8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_71();
	this.instance_1.setTransform(-67.7,-118.45,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.7,-118.4,133.8,232);


(lib.PuppetShape_7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_70();
	this.instance_1.setTransform(-67.7,-118.25,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.7,-118.2,133.8,232);


(lib.PuppetShape_6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_69();
	this.instance_1.setTransform(-67.75,-118.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.7,-118.7,134,232.5);


(lib.PuppetShape_5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_68();
	this.instance_1.setTransform(-65.75,-122.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.9,-122.6,132.2,236.2);


(lib.PuppetShape_4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_67();
	this.instance_1.setTransform(-63.6,-114.9,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.9,-114.9,132,228.5);


(lib.PuppetShape_3copy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_66();
	this.instance_1.setTransform(-65.75,-113.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-65.9,-113.4,132.2,227.10000000000002);


(lib.PuppetShape_3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_65();
	this.instance_1.setTransform(-72.15,-119,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-119,138.2,236);


(lib.PuppetShape_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_1("synched",0);

	this.instance_1 = new lib.CachedBmp_64();
	this.instance_1.setTransform(-72.15,-118.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.1,-118.8,138.2,236);


(lib.PuppetShape_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.WarpedAsset_6("synched",0);
	this.instance.setTransform(0,0,1,1,0,0,0,-7,1.7);

	this.instance_1 = new lib.CachedBmp_63();
	this.instance_1.setTransform(-79.7,-104.2,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(750));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.7,-106,159.5,212.8);


(lib.CloudsGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.singlecloud("synched",0);
	this.instance.setTransform(684.55,181.9,0.5951,0.5951,0,0,180,-0.1,0);

	this.instance_1 = new lib.singlecloud("synched",0);
	this.instance_1.setTransform(1718.15,265.2,0.6704,0.6704,0,0,180);

	this.instance_2 = new lib.singlecloud("synched",0);
	this.instance_2.setTransform(1383.25,164.8,1.1578,1.1578);

	this.instance_3 = new lib.singlecloud("synched",0);
	this.instance_3.setTransform(303.3,199.6,1.1578,1.1578);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CloudsGroup, new cjs.Rectangle(0,0,1893.8,364.3), null);


(lib.StaticIntro = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Body("synched",0);
	this.instance.setTransform(0.5,-110.55,1,1,0,0,0,95.7,155.8);

	this.instance_1 = new lib.PuppetShape_27copy("synched",1,false);
	this.instance_1.setTransform(9.15,145.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-95.2,-266.3,191.5,532.6);


(lib.Man = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Shirt
	this.instance = new lib.Body("synched",0);
	this.instance.setTransform(95.7,155.8,1,1,0,0,0,95.7,155.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(60));

	// Legs
	this.instance_1 = new lib.PuppetShape_3copy("synched",1,false);
	this.instance_1.setTransform(104.35,411.95);

	this.instance_2 = new lib.PuppetShape_4("synched",1,false);
	this.instance_2.setTransform(104.35,411.95);

	this.instance_3 = new lib.PuppetShape_5("synched",1,false);
	this.instance_3.setTransform(104.35,411.95);

	this.instance_4 = new lib.PuppetShape_6("synched",1,false);
	this.instance_4.setTransform(104.35,411.95);

	this.instance_5 = new lib.PuppetShape_7("synched",1,false);
	this.instance_5.setTransform(104.35,411.95);

	this.instance_6 = new lib.PuppetShape_8("synched",1,false);
	this.instance_6.setTransform(104.35,411.95);

	this.instance_7 = new lib.PuppetShape_9("synched",1,false);
	this.instance_7.setTransform(104.35,411.95);

	this.instance_8 = new lib.PuppetShape_10("synched",1,false);
	this.instance_8.setTransform(104.35,411.95);

	this.instance_9 = new lib.PuppetShape_11("synched",1,false);
	this.instance_9.setTransform(104.35,411.95);

	this.instance_10 = new lib.PuppetShape_12("synched",1,false);
	this.instance_10.setTransform(104.35,411.95);

	this.instance_11 = new lib.PuppetShape_13("synched",1,false);
	this.instance_11.setTransform(104.35,411.95);

	this.instance_12 = new lib.PuppetShape_14("synched",1,false);
	this.instance_12.setTransform(104.35,411.95);

	this.instance_13 = new lib.PuppetShape_15("synched",1,false);
	this.instance_13.setTransform(104.35,411.95);

	this.instance_14 = new lib.PuppetShape_16("synched",1,false);
	this.instance_14.setTransform(104.35,411.95);

	this.instance_15 = new lib.PuppetShape_17("synched",1,false);
	this.instance_15.setTransform(104.35,411.95);

	this.instance_16 = new lib.PuppetShape_18("synched",1,false);
	this.instance_16.setTransform(104.35,411.95);

	this.instance_17 = new lib.PuppetShape_19("synched",1,false);
	this.instance_17.setTransform(104.35,411.95);

	this.instance_18 = new lib.PuppetShape_20("synched",1,false);
	this.instance_18.setTransform(104.35,411.95);

	this.instance_19 = new lib.PuppetShape_21("synched",1,false);
	this.instance_19.setTransform(104.35,411.95);

	this.instance_20 = new lib.PuppetShape_22("synched",1,false);
	this.instance_20.setTransform(104.35,411.95);

	this.instance_21 = new lib.PuppetShape_23("synched",1,false);
	this.instance_21.setTransform(104.35,411.95);

	this.instance_22 = new lib.PuppetShape_24("synched",1,false);
	this.instance_22.setTransform(104.35,411.95);

	this.instance_23 = new lib.PuppetShape_25("synched",1,false);
	this.instance_23.setTransform(104.35,411.95);

	this.instance_24 = new lib.PuppetShape_26("synched",1,false);
	this.instance_24.setTransform(104.35,411.95);

	this.instance_25 = new lib.PuppetShape_27("synched",1,false);
	this.instance_25.setTransform(104.35,411.95);

	this.instance_26 = new lib.PuppetShape_2("synched",1,false);
	this.instance_26.setTransform(104.35,411.95);

	this.instance_27 = new lib.PuppetShape_3("synched",1,false);
	this.instance_27.setTransform(104.35,411.95);

	this.instance_28 = new lib.PuppetShape_28("synched",1,false);
	this.instance_28.setTransform(104.35,411.95);

	this.instance_29 = new lib.PuppetShape_29("synched",1,false);
	this.instance_29.setTransform(104.35,411.95);

	this.instance_30 = new lib.PuppetShape_30("synched",1,false);
	this.instance_30.setTransform(104.35,411.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_5}]},2).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},2).to({state:[{t:this.instance_8}]},2).to({state:[{t:this.instance_9}]},2).to({state:[{t:this.instance_10}]},2).to({state:[{t:this.instance_11}]},2).to({state:[{t:this.instance_12}]},2).to({state:[{t:this.instance_13}]},2).to({state:[{t:this.instance_14}]},2).to({state:[{t:this.instance_15}]},2).to({state:[{t:this.instance_16}]},2).to({state:[{t:this.instance_17}]},2).to({state:[{t:this.instance_18}]},2).to({state:[{t:this.instance_19}]},2).to({state:[{t:this.instance_20}]},2).to({state:[{t:this.instance_21}]},2).to({state:[{t:this.instance_22}]},2).to({state:[{t:this.instance_23}]},2).to({state:[{t:this.instance_24}]},2).to({state:[{t:this.instance_25}]},2).to({state:[{t:this.instance_26}]},2).to({state:[{t:this.instance_27}]},2).to({state:[{t:this.instance_28}]},2).to({state:[{t:this.instance_29}]},2).to({state:[{t:this.instance_30}]},2).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,191.5,532.7);


(lib.backview = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.MonaLisaEntranceLeo("synched",0);
	this.instance.setTransform(659.95,606.5,2.5656,1.6728,0,0,0,1.1,0.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(479.9,200.4,348.5,811.5);


(lib.Walking_Camera_View = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.PuppetShape_31("synched",1,false);
	this.instance.setTransform(36.9,138.4,0.2828,0.2828,0,0,0,130.5,489.4);

	this.instance_1 = new lib.PuppetShape_32("synched",1,false);
	this.instance_1.setTransform(36.9,138.4,0.2828,0.2828,0,0,0,130.5,489.4);

	this.instance_2 = new lib.PuppetShape_33("synched",1,false);
	this.instance_2.setTransform(36.9,138.4,0.2828,0.2828,0,0,0,130.5,489.4);

	this.instance_3 = new lib.PuppetShape_34("synched",1,false);
	this.instance_3.setTransform(36.9,138.4,0.2828,0.2828,0,0,0,130.5,489.4);

	this.instance_4 = new lib.PuppetShape_35("synched",1,false);
	this.instance_4.setTransform(36.9,138.4,0.2828,0.2828,0,0,0,130.5,489.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_3}]},4).to({state:[{t:this.instance_4}]},4).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-1,75.2,277.6);


(lib.Leo_walking_Side = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.Side_View_Leo("synched",0);
	this.instance.setTransform(-0.05,0.2,2.0931,2.0931,0,0,0,0,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:0,rotation:0.1641,x:-0.0494,y:-0.7125},0).wait(1).to({rotation:0.3283,x:-0.0488,y:-1.425},0).wait(1).to({rotation:0.4924,x:-0.0482,y:-2.1375},0).wait(1).to({rotation:0.6566,x:-0.0476,y:-2.85},0).wait(1).to({rotation:0.8207,x:-0.047,y:-3.42},0).wait(1).to({rotation:0.9849,x:-0.0464,y:-3.99},0).wait(1).to({rotation:1.149,x:-0.0458,y:-4.56},0).wait(1).to({rotation:1.3132,x:-0.0452,y:-5.1299},0).wait(1).to({rotation:1.4773,x:-0.0446,y:-5.6999},0).wait(1).to({rotation:1.6414,x:-0.044,y:-6.1749},0).wait(1).to({rotation:1.8056,x:-0.0434,y:-6.6499},0).wait(1).to({rotation:1.9697,x:-0.0428,y:-7.1249},0).wait(1).to({rotation:2.1339,x:-0.0422,y:-7.5999},0).wait(1).to({rotation:2.298,x:-0.0416,y:-8.0748},0).wait(1).to({rotation:2.4622,x:-0.041,y:-8.5498},0).wait(1).to({rotation:2.2958,x:-0.0416,y:-7.9798},0).wait(1).to({rotation:2.1293,x:-0.0422,y:-7.4099},0).wait(1).to({rotation:1.9629,x:-0.0428,y:-6.8399},0).wait(1).to({rotation:1.7965,x:-0.0434,y:-6.2699},0).wait(1).to({rotation:1.6301,x:-0.044,y:-5.6999},0).wait(1).to({rotation:1.4637,x:-0.0447,y:-5.1299},0).wait(1).to({rotation:1.2973,x:-0.0453,y:-4.5599},0).wait(1).to({rotation:1.1309,x:-0.0459,y:-3.99},0).wait(1).to({rotation:0.9645,x:-0.0465,y:-3.42},0).wait(1).to({rotation:0.7981,x:-0.0471,y:-2.85},0).wait(1).to({rotation:0.6317,x:-0.0477,y:-2.1375},0).wait(1).to({rotation:0.4653,x:-0.0483,y:-1.425},0).wait(1).to({rotation:0.2989,x:-0.0489,y:-0.7125},0).wait(1).to({rotation:0.1325,x:-0.0495,y:0},0).wait(1).to({rotation:-0.0339,x:-0.0501},0).wait(1).to({rotation:-0.0339},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.1,-415.7,188.6,820.5);


(lib.handup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.PuppetShape_54("synched",1,false);
	this.instance.setTransform(-38,172.75,1,1,6.9746);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85.7,-141.1,169.3,268.5);


(lib._final = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// eye_static
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1B").s().p("ABsKaQgHgNALgKIAVgOQBGgtAigYQA4goAognQBShPBCh6QAjhABGikQhdB5hgBUQhtBgh8A6QirBQi8gXQi+gYh5h2QhRhPgvhmQgvhogDhsQgGj4DSinQE+j+F4BPQBEAOBKAoQAsAYBXA6QBIAvAvBHQApA+AbBYQAaBVggBDQgTAlgMA0QgHAdgMA9QgdCLhRB5QhJBuh2BjQhUBHhPArQgPALgIADQgEACgEAAQgJAAgGgLgApkASQAAAAABAAQAAAAAAABQAAAAAAAAQABABAAAAIADAEIAAADIACACIAAAHIACAAIAAAFIABAAIAAAHIACABIAAAFQAAAAABAAQAAAAAAABQAAAAAAAAQABABAAAAIAAALIABAAIAAABIAEAEIADAJQBKC6C6BcQC7BdC5g+QFHhqDRlgQAdgyABg4IAAgBIAAgBIACAAIAAgFIACgCIAAgEIABAAIAAgWIgBgCIAAgFIgCgBIAAgQIgCgCIAAgMIgCgBIAAgCIgBgCIAAgHIgCgBIAAgEIgCgCIAAgDIgBgCIAAgBIgCgBQAAgKgGgPQgwiAhhhNQhehLiFgYQijgcibAjQiZAkiLBgQiBBZg4BrQhBB7AYCYIAEgCgAjLCVIAAAAIgBAAIABAAg");
	this.shape.setTransform(-177.3572,-335.7391,0.2911,0.2912);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(146).to({_off:true},1).wait(7));

	// blink
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F1D2B5").s().p("Aivh1IFbgLIBoDqQj5mTkuGqg");
	this.shape_1.setTransform(-178.125,-346.225);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F1D2B5").s().p("AirhhIGMgcIAkClQhvgWmaBrg");
	this.shape_2.setTransform(-179.65,-345.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F1D2B5").s().p("AiuhmIANgEIEsgQIBIAJIAmCGIABAZQg1AGhdASQg0APg7AMQgtAJgzAFQhCAIhQAEg");
	this.shape_3.setTransform(-179.2,-345.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F1D2B5").s().p("AhnCBQg9AAhMgOIA+jjIAKgHIEqgKIBAAXIAvCCIgEAYQg4AUhPAVQg2AWg2AMQgjAHglAAIgZgBg");
	this.shape_4.setTransform(-178.55,-344.789);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F1D2B5").s().p("AhlCMQg5gIhKggIAxjmIAHgJIEpgFIA4AmIA4B9IgKAWQg8AlhBAXQg1AegzAKQgVAEgWAAQgZAAgbgFg");
	this.shape_5.setTransform(-177.875,-343.2049);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#F1D2B5").s().p("AhlCWQg0gRhGgxIAijpIAEgMIEpABIAwA0IBAB6IgOAUQhAA0gzAaQg2AlguAKQgQADgQAAQgfAAghgMg");
	this.shape_6.setTransform(-177.175,-341.5638);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F1D2B5").s().p("AhkCiQgwgZhDhDIAWj6IEnAGIByC4QhSBSgqAhQg3AsgqAJQgMADgMAAQgiAAglgTg");
	this.shape_7.setTransform(-176.475,-340.1479);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F1D2B5").s().p("AhkCLQgUgCgXgGQg0gJgugOIApjFIAngnIFBgNIAZAMIADABIA2C5IgDALIgSgDQg5gZgMAjIglARQhCAfgvALIgaAFQgSADgTAAQgTAAgUgDg");
	this.shape_8.setTransform(-177.25,-344.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F1D2B5").s().p("AjKhQIBWgQIFvggIAEAAIAODkIgQgZQhLhXADArQiHAdg/ATQhAAShFAIQhFAIgxAQg");
	this.shape_9.setTransform(-178.025,-346.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},135).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_9}]},1).to({state:[]},1).to({state:[]},2).wait(5));

	// full_eye
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1D1D1B").s().p("ABsKaQgHgNALgKIAVgOQBGgtAigYQA4goAognQBShPBCh6QAjhABGikQhdB5hgBUQhtBgh8A6QirBQi8gXQi+gYh5h2QhRhPgvhmQgvhogDhsQgGj4DSinQE+j+F4BPQBEAOBKAoQAsAYBXA6QBIAvAvBHQApA+AbBYQAaBVggBDQgTAlgMA0QgHAdgMA9QgdCLhRB5QhJBuh2BjQhUBHhPArQgPALgIADQgEACgEAAQgJAAgGgLgAo6AuQgRAEgEAFQgHAHAIATQBKC6C6BcQC7BdC5g+QFHhqDRlgQAlg+gIhHQkPBAhmAWQjRAtinAXQAiAtAIAbQAMAngaAjQgfAogyAJQgpAIg0gOQgygNADg2IAFguQACgbgHgPgAhipTQiZAkiLBgQiBBZg4BrQhBB7AYCYQBrg0BqgZQBSgTCIgUQCogZAygJQA2gKDTgvQCjgjBogOQAagEAGgMQAEgLgJgXQgwiAhhhNQhehLiFgYQhJgNhHAAQhYAAhWAUg");
	this.shape_10.setTransform(-177.3572,-335.7391,0.2911,0.2912);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(146).to({_off:true},1).wait(3).to({_off:false},0).wait(4));

	// TV_LIPS
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(459,-367.9,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_18();
	this.instance_1.setTransform(459,-367.7,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_19();
	this.instance_2.setTransform(459,-367,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_20();
	this.instance_3.setTransform(459,-366.4,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_21();
	this.instance_4.setTransform(459,-365.35,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_22();
	this.instance_5.setTransform(459,-366.6,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_23();
	this.instance_6.setTransform(458.95,-367.8,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_24();
	this.instance_7.setTransform(458.95,-367.7,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_25();
	this.instance_8.setTransform(458.95,-366.95,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_26();
	this.instance_9.setTransform(458.95,-366.4,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_27();
	this.instance_10.setTransform(458.95,-365.3,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_28();
	this.instance_11.setTransform(458.95,-366.55,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_29();
	this.instance_12.setTransform(458.95,-367.8,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_30();
	this.instance_13.setTransform(458.95,-367.7,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_31();
	this.instance_14.setTransform(458.95,-366.95,0.5,0.5);

	this.instance_15 = new lib.CachedBmp_32();
	this.instance_15.setTransform(458.95,-366.4,0.5,0.5);

	this.instance_16 = new lib.CachedBmp_33();
	this.instance_16.setTransform(458.95,-365.3,0.5,0.5);

	this.instance_17 = new lib.CachedBmp_34();
	this.instance_17.setTransform(458.95,-366.55,0.5,0.5);

	this.instance_18 = new lib.CachedBmp_35();
	this.instance_18.setTransform(458.95,-367.8,0.5,0.5);

	this.instance_19 = new lib.CachedBmp_36();
	this.instance_19.setTransform(458.95,-367.7,0.5,0.5);

	this.instance_20 = new lib.CachedBmp_37();
	this.instance_20.setTransform(458.95,-366.95,0.5,0.5);

	this.instance_21 = new lib.CachedBmp_38();
	this.instance_21.setTransform(458.95,-366.4,0.5,0.5);

	this.instance_22 = new lib.CachedBmp_39();
	this.instance_22.setTransform(458.95,-365.3,0.5,0.5);

	this.instance_23 = new lib.CachedBmp_40();
	this.instance_23.setTransform(458.95,-366.55,0.5,0.5);

	this.instance_24 = new lib.CachedBmp_41();
	this.instance_24.setTransform(458.9,-367.75,0.5,0.5);

	this.instance_25 = new lib.CachedBmp_42();
	this.instance_25.setTransform(458.9,-367.7,0.5,0.5);

	this.instance_26 = new lib.CachedBmp_43();
	this.instance_26.setTransform(458.9,-366.9,0.5,0.5);

	this.instance_27 = new lib.CachedBmp_44();
	this.instance_27.setTransform(458.9,-366.4,0.5,0.5);

	this.instance_28 = new lib.CachedBmp_45();
	this.instance_28.setTransform(458.9,-365.25,0.5,0.5);

	this.instance_29 = new lib.CachedBmp_46();
	this.instance_29.setTransform(458.9,-366.5,0.5,0.5);

	this.instance_30 = new lib.CachedBmp_47();
	this.instance_30.setTransform(458.9,-367.75,0.5,0.5);

	this.instance_31 = new lib.CachedBmp_48();
	this.instance_31.setTransform(458.9,-367.7,0.5,0.5);

	this.instance_32 = new lib.CachedBmp_49();
	this.instance_32.setTransform(458.9,-366.9,0.5,0.5);

	this.instance_33 = new lib.CachedBmp_50();
	this.instance_33.setTransform(458.9,-366.4,0.5,0.5);

	this.instance_34 = new lib.CachedBmp_51();
	this.instance_34.setTransform(458.9,-365.25,0.5,0.5);

	this.instance_35 = new lib.CachedBmp_52();
	this.instance_35.setTransform(458.9,-366.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},8).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},2).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},3).to({state:[{t:this.instance_12}]},2).to({state:[{t:this.instance_13}]},3).to({state:[{t:this.instance_14}]},3).to({state:[{t:this.instance_15}]},3).to({state:[{t:this.instance_16}]},3).to({state:[{t:this.instance_17}]},3).to({state:[{t:this.instance_18}]},4).to({state:[{t:this.instance_19}]},3).to({state:[{t:this.instance_20}]},8).to({state:[{t:this.instance_21}]},3).to({state:[{t:this.instance_22}]},3).to({state:[{t:this.instance_23}]},3).to({state:[{t:this.instance_24}]},2).to({state:[{t:this.instance_25}]},3).to({state:[{t:this.instance_26}]},3).to({state:[{t:this.instance_27}]},3).to({state:[{t:this.instance_28}]},3).to({state:[{t:this.instance_29}]},3).to({state:[{t:this.instance_30}]},2).to({state:[{t:this.instance_31}]},3).to({state:[{t:this.instance_32}]},3).to({state:[{t:this.instance_33}]},3).to({state:[{t:this.instance_34}]},3).to({state:[{t:this.instance_35}]},3).to({state:[]},2).wait(40));

	// LEO_LIPS
	this.instance_36 = new lib.SMILE();
	this.instance_36.setTransform(-123.3,-250.5,1,1,0,0,0,18.1,8);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(68).to({scaleX:1.0061,scaleY:1.0061,y:-250.45},0).wait(1).to({scaleX:1.0122,scaleY:1.0122},0).wait(1).to({scaleX:1.0183,scaleY:1.0183,x:-123.25},0).wait(1).to({scaleX:1.0244,scaleY:1.0244},0).wait(1).to({scaleX:1.0305,scaleY:1.0305,x:-123.3},0).wait(1).to({scaleX:1.0366,scaleY:1.0366},0).wait(1).to({scaleX:1.0427,scaleY:1.0427},0).wait(1).to({scaleX:1.0488,scaleY:1.0488,x:-123.25},0).wait(1).to({scaleX:1.0549,scaleY:1.0549},0).wait(1).to({scaleX:1.061,scaleY:1.061,x:-123.3},0).wait(1).to({scaleX:1.0671,scaleY:1.0671},0).wait(1).to({scaleX:1.0732,scaleY:1.0732},0).wait(1).to({scaleX:1.0793,scaleY:1.0793,x:-123.25},0).wait(1).to({scaleX:1.0854,scaleY:1.0854},0).wait(1).to({scaleX:1.0915,scaleY:1.0915,x:-123.3},0).wait(1).to({scaleX:1.0976,scaleY:1.0976},0).wait(1).to({scaleX:1.1037,scaleY:1.1037,x:-123.25},0).wait(1).to({scaleX:1.1098,scaleY:1.1098},0).wait(1).to({scaleX:1.1159,scaleY:1.1159},0).wait(1).to({scaleX:1.122,scaleY:1.122,x:-123.3},0).wait(1).to({scaleX:1.1281,scaleY:1.1281,y:-250.5},0).wait(1).to({scaleX:1.1342,scaleY:1.1342,x:-123.25},0).wait(1).to({scaleX:1.1403,scaleY:1.1403},0).wait(1).to({scaleX:1.1464,scaleY:1.1464,x:-123.3},0).wait(1).to({scaleX:1.1525,scaleY:1.1525},0).wait(1).to({scaleX:1.1586,scaleY:1.1586},0).wait(1).to({scaleX:1.1647,scaleY:1.1647,x:-123.25},0).wait(1).to({scaleX:1.1708,scaleY:1.1708},0).wait(1).to({scaleX:1.1769,scaleY:1.1769,x:-123.3},0).wait(1).to({scaleX:1.183,scaleY:1.183},0).wait(1).to({scaleX:1.1891,scaleY:1.1891},0).wait(1).to({scaleX:1.1952,scaleY:1.1952,x:-123.25},0).wait(1).to({scaleX:1.2013,scaleY:1.2013},0).wait(1).to({scaleX:1.2074,scaleY:1.2074,x:-123.3},0).wait(1).to({scaleX:1.2135,scaleY:1.2135},0).wait(1).to({scaleX:1.2196,scaleY:1.2196},0).wait(1).to({scaleX:1.2257,scaleY:1.2257,x:-123.25},0).wait(1).to({scaleX:1.2318,scaleY:1.2318},0).wait(1).to({scaleX:1.2379,scaleY:1.2379,x:-123.3},0).wait(1).to({scaleX:1.244,scaleY:1.244},0).wait(1).to({scaleX:1.2501,scaleY:1.2501,x:-123.25},0).wait(1).to({scaleX:1.2562,scaleY:1.2562,y:-250.45},0).wait(1).to({scaleX:1.2623,scaleY:1.2623},0).wait(1).to({scaleX:1.2684,scaleY:1.2684,x:-123.3},0).wait(1).to({scaleX:1.2745,scaleY:1.2745},0).wait(1).to({scaleX:1.2806,scaleY:1.2806,x:-123.25},0).wait(1).to({scaleX:1.2867,scaleY:1.2867},0).wait(1).to({scaleX:1.2928,scaleY:1.2928,x:-123.3},0).wait(1).to({scaleX:1.2989,scaleY:1.2989},0).wait(1).to({scaleX:1.305,scaleY:1.305},0).wait(1).to({scaleX:1.3111,scaleY:1.3111,x:-123.25},0).wait(1).to({scaleX:1.3172,scaleY:1.3172},0).wait(1).to({scaleX:1.3233,scaleY:1.3233,x:-123.3},0).wait(1).to({scaleX:1.3294,scaleY:1.3294},0).wait(1).to({scaleX:1.3355,scaleY:1.3355},0).wait(1).to({scaleX:1.3416,scaleY:1.3416,x:-123.25},0).wait(1).to({scaleX:1.3477,scaleY:1.3477},0).wait(1).to({scaleX:1.3538,scaleY:1.3538,x:-123.3},0).wait(1).to({scaleX:1.3599,scaleY:1.3599},0).wait(1).to({scaleX:1.366,scaleY:1.366,x:-123.25},0).wait(1).to({scaleX:1.3721,scaleY:1.3721},0).wait(1).to({scaleX:1.3782,scaleY:1.3782},0).wait(1).to({scaleX:1.3843,scaleY:1.3843,x:-123.3,y:-250.5},0).wait(1).to({scaleX:1.3904,scaleY:1.3904},0).wait(1).to({scaleX:1.3965,scaleY:1.3965,x:-123.25},0).wait(1).to({scaleX:1.4026,scaleY:1.4026},0).wait(1).to({scaleX:1.4087,scaleY:1.4087},0).wait(1).to({scaleX:1.4148,scaleY:1.4148,x:-123.3},0).wait(1).to({scaleX:1.4209,scaleY:1.4209},0).wait(1).to({scaleX:1.427,scaleY:1.427,x:-123.25},0).wait(1).to({scaleX:1.4331,scaleY:1.4331},0).wait(1).to({scaleX:1.4392,scaleY:1.4392,x:-123.3},0).wait(1).to({scaleX:1.4453,scaleY:1.4453},0).wait(1).to({scaleX:1.4514,scaleY:1.4514},0).wait(1).to({scaleX:1.4575,scaleY:1.4575,x:-123.25},0).wait(1).to({scaleX:1.4636,scaleY:1.4636},0).wait(1).to({scaleX:1.4697,scaleY:1.4697,x:-123.3},0).wait(1).to({scaleX:1.4758,scaleY:1.4758},0).wait(1).to({scaleX:1.4819,scaleY:1.4819},0).to({_off:true},1).wait(3).to({_off:false,scaleX:1.5063,scaleY:1.5063},0).wait(1).to({scaleX:1.5124,scaleY:1.5124,x:-123.25,y:-250.45},0).wait(1).to({scaleX:1.5185,scaleY:1.5185},0).wait(1).to({scaleX:1.5246,scaleY:1.5246},0).wait(1));

	// BG
	this.instance_37 = new lib.CachedBmp_53();
	this.instance_37.setTransform(-706.95,-477.75,0.5,0.5);

	this.text = new cjs.Text("\nMusic video by Billie Eilish performing bad guy. © 2019 Darkroom/Interscope Records", "20px 'Tw Cen MT'");
	this.text.lineHeight = 24;
	this.text.lineWidth = 729;
	this.text.parent = this;
	this.text.setTransform(-515.75,-40.65);
	this.text.shadow = new cjs.Shadow("rgba(0,0,0,1)",3,3,4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.text},{t:this.instance_37}]}).to({state:[{t:this.text},{t:this.instance_37}]},146).to({state:[]},1).to({state:[{t:this.text},{t:this.instance_37}]},3).wait(4));

	// painting
	this.instance_38 = new lib.CachedBmp_54();
	this.instance_38.setTransform(-470.9,-453.95,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(146).to({_off:true},1).wait(3).to({_off:false},0).wait(4));

	// BG
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("rgba(51,51,51,0.004)").ss(0.1,1,1).p("Ej16ijqMHr1AAAMAAAFHVMnr1AAAg");
	this.shape_11.setTransform(134.325,-26.8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFCC").s().p("Ej16CjrMAAAlHVMHr1AAAMAAAFHVg");
	this.shape_12.setTransform(134.325,-26.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11}]}).to({state:[{t:this.shape_12},{t:this.shape_11}]},146).to({state:[]},1).to({state:[{t:this.shape_12},{t:this.shape_11}]},3).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1440.6,-1075.3,3149.8999999999996,2097);


(lib.Start = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(-135.15,-18.75,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_11();
	this.instance_1.setTransform(-138.85,-21.45,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_10();
	this.instance_2.setTransform(-308.05,-94.1,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_9();
	this.instance_3.setTransform(-310.65,-96.25,0.5,0.5);

	this.instance_4 = new lib.Path();
	this.instance_4.setTransform(0,0,0.3811,0.326,0,0,0,830.5,428.7);
	this.instance_4.alpha = 0.8984;

	this.instance_5 = new lib.CachedBmp_16();
	this.instance_5.setTransform(-341.7,-122.75,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_15();
	this.instance_6.setTransform(-344.55,-125.05,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_14();
	this.instance_7.setTransform(-208.85,-68.85,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_13();
	this.instance_8.setTransform(-214.9,-73.3,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4,p:{regY:428.7,scaleX:0.3811,scaleY:0.326,y:0}},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_4,p:{regY:428.8,scaleX:0.4432,scaleY:0.3791,y:0.15}},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-368,-162.4,736.1,326.6);


(lib.Again = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.text = new cjs.Text("Music by Billie Eilish performing bad guy. © 2019 Darkroom/Interscope Records", "22px 'Arial'");
	this.text.lineHeight = 27;
	this.text.lineWidth = 1640;
	this.text.parent = this;
	this.text.setTransform(-587.3,297.2);

	this.text_1 = new cjs.Text("AGAIN", "96px 'Ravie'", "#FFFFFF");
	this.text_1.lineHeight = 130;
	this.text_1.lineWidth = 429;
	this.text_1.parent = this;
	this.text_1.setTransform(-63,-54);

	this.text_2 = new cjs.Text("LETS DRAW", "58px 'Ravie'", "#FFFFFF");
	this.text_2.lineHeight = 79;
	this.text_2.lineWidth = 475;
	this.text_2.parent = this;
	this.text_2.setTransform(-100.2,-117.3);

	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-390.5,-280.55,0.5,0.5);

	this.instance_1 = new lib.Path_15();
	this.instance_1.setTransform(59.2,-20.15,0.3882,0.3882,0,0,0,831.2,429.2);
	this.instance_1.alpha = 0.8008;

	this.instance_2 = new lib.CachedBmp_7();
	this.instance_2.setTransform(-429.1,-299.6,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1,p:{scaleX:0.3882,scaleY:0.3882,x:59.2,y:-20.15}},{t:this.instance},{t:this.text_2},{t:this.text_1,p:{scaleX:1,scaleY:1,x:-63,y:-54,text:"AGAIN",font:"96px 'Ravie'",lineHeight:129.9,lineWidth:429}},{t:this.text,p:{scaleX:1,scaleY:1,x:-587.3,y:297.2,text:"Music by Billie Eilish performing bad guy. © 2019 Darkroom/Interscope Records",font:"22px 'Arial'",color:"#000000",lineHeight:26.55,lineWidth:1640}}]}).to({state:[{t:this.instance_1,p:{scaleX:0.4161,scaleY:0.4161,x:63.5,y:-21.55}},{t:this.instance_2},{t:this.text_1,p:{scaleX:1.0391,scaleY:1.0391,x:-99.5,y:-122.4344,text:"LETS DRAW",font:"58px 'Ravie'",lineHeight:79.25,lineWidth:475}},{t:this.text,p:{scaleX:1.0391,scaleY:1.0391,x:-60.85,y:-56.65,text:"AGAIN",font:"96px 'Ravie'",color:"#FFFFFF",lineHeight:129.9,lineWidth:429}}]},1).wait(1));

	// flash0.ai
	this.instance_3 = new lib.CachedBmp_8();
	this.instance_3.setTransform(-1096.6,-448.35,0.5,0.5);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({_off:false},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1096.6,-448.3,2151.2,870.9000000000001);


(lib.Light = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.LIGHTS();
	this.instance.setTransform(0,0,1,1,0,0,0,398,623.5);
	this.instance.alpha = 0.4102;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-398,-623.5,796,1247);


(lib.HOME = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.HOME_M("synched",0);
	this.instance.setTransform(663.9,217.9,1.6999,1.6725,0,0,0,341.4,239.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.HOME, new cjs.Rectangle(0.1,0,1326.9,434.8), null);


(lib.GalleryBG = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// spots
	this.instance = new lib.Light("synched",0);
	this.instance.setTransform(3486.2,367.5,0.4573,0.6807,0,0,0,0,0.2);

	this.instance_1 = new lib.Light("synched",0);
	this.instance_1.setTransform(2652.95,367.5,0.4573,0.6807,0,0,0,0,0.2);

	this.instance_2 = new lib.Light("synched",0);
	this.instance_2.setTransform(1820.1,367.5,0.4573,0.6807,0,0,0,0,0.2);

	this.instance_3 = new lib.Light("synched",0);
	this.instance_3.setTransform(987.05,367.5,0.4573,0.6807,0,0,0,0,0.2);

	this.instance_4 = new lib.Light("synched",0);
	this.instance_4.setTransform(154.5,367.5,0.4573,0.6807,0,0,0,0,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	// Shading
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EgW0goRMAtpAAAMAAABQjMgtpAAAg");
	this.shape.setTransform(563.525,257.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.4)").s().p("EDM5AoUMAAAhQmIKdgBMgJpBQogEBKwAoUMAAAhQmIKcgBMgJpBQogEg3YAoUMAAAhQmIKdgBMgJpBQogEk7uAoUMAAAgwWMAAAggQIKcgBMgD3AgRMgFyAwXgEi5kAoUMAAAhQnIKcAAMgJpBQogECKZAoQMAAAhQjMAtqAAAMAAABQjgEAJ8AoQMAAAhQjMAtqAAAMAAABQjgEh4YAoQMAAAhQfMAuOgAEMAAABQjgEj6fAoQMAAAhQjMAtpAAAMAAABQjgED6fAoOMgM6hQdINVgEMAADBQigEB4WAoOMgM6hQdINUgEMAADBQigEgJxAoOMgM6hQdINUgEMAADBQigEkOIAoOMgHvgwQMgFLggNINUgEMAABAgRMAADAwRgEEOFAoOMAAAhQiMAtqAAAMAAABQigEiL+AoOMgM6hQeINUgDMAAEBQhg");
	this.shape_1.setTransform(2020.7,258.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Pics
	this.instance_5 = new lib.GALLERY();
	this.instance_5.setTransform(0,0,0.4502,0.4502);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// wall
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(255,0,0,0.004)").ss(0.1,1,1).p("A24rxMAsxAAAID0XjMgzZgAGg");
	this.shape_2.setTransform(152.05,590.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(225,224,215,0.898)").s().p("EBoXALtIC03cMAszAAAIDzXigEiS3ALtIpCgBICp17IALhhMAsyAAAIDzXigEDqnALrICz3cMAszAAAIDzXigA5uLrIC03cMAsxAAAIDzXigEkd/ALqIC03cMAszAAAIDzXig");
	this.shape_3.setTransform(1817.95,590.975);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// BG
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(1,1,1).p("ElDyg4fMKHlAAAMAAABw+MqHlAAAg");
	this.shape_4.setTransform(2024.925,304.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#666666").s().p("ElDyA4fMAAAhw+MKHlAAAMAAABw+g");
	this.shape_5.setTransform(2024.925,304.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.GalleryBG, new cjs.Rectangle(-48.3,-58,4146.5,849.8), null);


(lib.Scene_1_spot_light = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// spot_light
	this.instance = new lib.Light("synched",0);
	this.instance.setTransform(683.05,258.5,1.3035,1.3035);
	this.instance.alpha = 0.6016;

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.004)").ss(0.1,1,1).p("EBkAg4PIkGgIMgwGgACMAa4BwfIZUAUMAAAhE5gEhj/g4YINeAAMAp+AAAMgT+BweMgjeAAKMAAAhFEg");
	this.shape.setTransform(640,360);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("EBKsA4GMga4hwfMAwHAACIEFAIMAAAArwMAAABE5gEhj/gM0MAAAgrjINeAAMAp+AAAMgT+BwdMgjeAAKg");
	this.shape_1.setTransform(640,360);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance}]},316).to({state:[{t:this.shape_1},{t:this.shape}]},58).wait(139));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Side_View_Man = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Side_View_Man
	this.instance = new lib.Leo_walking_Side();
	this.instance.setTransform(180.1,740);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(120).to({_off:false},0).wait(1).to({regX:0.1,regY:-5.5,x:181.5,y:734.5},0).wait(1).to({x:182.8},0).wait(1).to({x:184.1},0).wait(1).to({x:185.4},0).wait(1).to({x:186.7},0).wait(1).to({x:188},0).wait(1).to({x:189.3},0).wait(1).to({x:190.6},0).wait(1).to({x:191.9},0).wait(1).to({x:193.2},0).wait(1).to({x:194.5},0).wait(1).to({x:195.8},0).wait(1).to({x:197.1},0).wait(1).to({x:198.4},0).wait(1).to({x:199.7},0).wait(1).to({x:201},0).wait(1).to({x:202.3},0).wait(1).to({x:203.6},0).wait(1).to({x:204.9},0).wait(1).to({x:206.2},0).wait(1).to({x:207.5},0).wait(1).to({x:208.8},0).wait(1).to({x:210.1},0).wait(1).to({x:211.4},0).wait(1).to({x:212.7},0).wait(1).to({x:214},0).wait(1).to({x:215.3},0).wait(1).to({x:216.6},0).wait(1).to({x:217.9},0).wait(1).to({x:219.2},0).wait(1).to({x:220.5},0).wait(1).to({x:221.8},0).wait(1).to({x:223.1},0).wait(1).to({x:224.4},0).wait(1).to({x:225.7},0).wait(1).to({x:227},0).wait(1).to({x:228.3},0).wait(1).to({x:229.6},0).wait(1).to({x:230.9},0).wait(1).to({x:232.2},0).wait(1).to({x:233.5},0).wait(1).to({x:234.8},0).wait(1).to({x:236.1},0).wait(1).to({x:237.4},0).wait(1).to({x:238.7},0).wait(1).to({x:240},0).wait(1).to({x:241.3},0).wait(1).to({x:242.6},0).wait(1).to({x:243.9},0).wait(1).to({x:245.2},0).wait(1).to({x:246.5},0).wait(1).to({x:247.8},0).wait(1).to({x:249.1},0).wait(1).to({x:250.4},0).wait(1).to({x:251.7},0).wait(1).to({x:253},0).wait(1).to({x:254.3},0).wait(1).to({x:255.6},0).wait(1).to({x:256.9},0).wait(1).to({x:258.2},0).wait(1).to({x:259.5},0).wait(1).to({x:260.8},0).wait(1).to({x:262.1},0).wait(1).to({x:263.45},0).wait(1).to({x:264.75},0).wait(1).to({x:266.05},0).wait(1).to({x:267.35},0).wait(1).to({x:268.65},0).wait(1).to({x:269.95},0).wait(1).to({x:271.25},0).wait(1).to({x:272.55},0).wait(1).to({x:273.85},0).wait(1).to({x:275.15},0).wait(1).to({x:276.45},0).wait(1).to({x:277.75},0).wait(1).to({x:279.05},0).wait(1).to({x:280.35},0).wait(1).to({x:281.65},0).wait(1).to({x:282.95},0).wait(1).to({x:284.25},0).wait(1).to({x:285.55},0).wait(1).to({x:286.85},0).wait(1).to({x:288.15},0).wait(1).to({x:289.45},0).wait(1).to({x:290.75},0).wait(1).to({x:292.05},0).wait(1).to({x:293.35},0).wait(1).to({x:294.65},0).wait(1).to({x:295.95},0).wait(1).to({x:297.25},0).wait(1).to({x:298.55},0).wait(1).to({x:299.85},0).wait(1).to({x:301.15},0).wait(1).to({x:302.45},0).wait(1).to({x:303.75},0).wait(1).to({x:305.05},0).wait(1).to({x:306.35},0).wait(1).to({x:307.65},0).wait(1).to({x:308.95},0).wait(1).to({x:310.25},0).wait(1).to({x:311.55},0).wait(1).to({x:312.85},0).wait(1).to({x:314.15},0).wait(1).to({x:315.45},0).wait(1).to({x:316.75},0).wait(1).to({x:318.05},0).wait(1).to({x:319.35},0).wait(1).to({x:320.65},0).wait(1).to({x:321.95},0).wait(1).to({x:323.25},0).wait(1).to({x:324.55},0).wait(1).to({x:325.85},0).wait(1).to({x:327.15},0).wait(1).to({x:328.45},0).wait(1).to({x:329.75},0).wait(1).to({x:331.05},0).wait(1).to({x:332.35},0).wait(1).to({x:333.65},0).wait(1).to({x:334.95},0).wait(1).to({x:336.25},0).wait(1).to({x:337.55},0).wait(1).to({x:338.85},0).wait(1).to({x:340.15},0).wait(1).to({x:341.45},0).wait(1).to({x:342.75},0).wait(1).to({x:344.05},0).wait(1).to({x:345.4},0).to({_off:true},1).wait(79));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Hand_ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Hand_
	this.instance = new lib.PuppetShape_1("synched",1,false);
	this.instance.setTransform(755.6,542.6);

	this.instance_1 = new lib.PuppetShape_36("synched",1,false);
	this.instance_1.setTransform(755.55,539.45);

	this.instance_2 = new lib.PuppetShape_37("synched",1,false);
	this.instance_2.setTransform(754.85,539.1);

	this.instance_3 = new lib.PuppetShape_38("synched",1,false);
	this.instance_3.setTransform(754.8,537.9);

	this.instance_4 = new lib.PuppetShape_39("synched",1,false);
	this.instance_4.setTransform(754.4,539.05);

	this.instance_5 = new lib.PuppetShape_40("synched",1,false);
	this.instance_5.setTransform(753.25,537.85);

	this.instance_6 = new lib.PuppetShape_41("synched",1,false);
	this.instance_6.setTransform(754.7,541.05);

	this.instance_7 = new lib.PuppetShape_42("synched",1,false);
	this.instance_7.setTransform(752.85,537.1);

	this.instance_8 = new lib.PuppetShape_43("synched",1,false);
	this.instance_8.setTransform(752.45,539);

	this.instance_9 = new lib.PuppetShape_44("synched",1,false);
	this.instance_9.setTransform(751.65,538.25);

	this.instance_10 = new lib.PuppetShape_45("synched",1,false);
	this.instance_10.setTransform(751.3,537.1);

	this.instance_11 = new lib.PuppetShape_46("synched",1,false);
	this.instance_11.setTransform(750.15,536.7);

	this.instance_12 = new lib.PuppetShape_47("synched",1,false);
	this.instance_12.setTransform(750.15,536.7);

	this.instance_13 = new lib.PuppetShape_48("synched",1,false);
	this.instance_13.setTransform(750.15,536.7);

	this.instance_14 = new lib.PuppetShape_49("synched",1,false);
	this.instance_14.setTransform(750.15,536.7);

	this.instance_15 = new lib.PuppetShape_50("synched",1,false);
	this.instance_15.setTransform(750.15,536.7);

	this.instance_16 = new lib.handup("synched",0);
	this.instance_16.setTransform(794.15,450.85,1,1,0,0,0,0,17.8);
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},390).to({state:[{t:this.instance_1}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},3).to({state:[{t:this.instance_12}]},3).to({state:[{t:this.instance_13}]},3).to({state:[{t:this.instance_14}]},3).to({state:[{t:this.instance_15}]},3).to({state:[{t:this.instance_16}]},28).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(463).to({_off:false},0).wait(1).to({regX:-19.7,regY:72,x:774.4,y:503.95},0).wait(1).to({x:774.35,y:502.9},0).wait(1).to({x:774.3,y:501.85},0).wait(1).to({x:774.25,y:500.8},0).wait(1).to({y:499.75},0).wait(1).to({x:774.2,y:498.7},0).wait(1).to({x:774.15,y:497.65},0).wait(1).to({x:774.1,y:496.6},0).wait(1).to({y:495.55},0).wait(1).to({x:774.05,y:494.5},0).wait(1).to({x:774,y:493.45},0).wait(1).to({x:773.95,y:492.4},0).wait(1).to({x:773.9,y:491.35},0).wait(1).to({y:490.3},0).wait(1).to({x:773.85,y:489.25},0).wait(1).to({x:773.8,y:488.2},0).wait(1).to({x:773.75,y:487.15},0).wait(1).to({y:486.1},0).wait(1).to({x:773.7,y:485.05},0).wait(1).to({x:773.65,y:484},0).wait(1).to({x:773.6,y:482.95},0).wait(1).to({x:773.55,y:481.9},0).wait(1).to({y:480.85},0).wait(1).to({x:773.5,y:479.8},0).wait(1).to({x:773.45,y:478.7},0).wait(1).to({x:773.4,y:477.65},0).wait(1).to({y:476.6},0).wait(1).to({x:773.35,y:475.55},0).wait(1).to({x:773.3,y:474.5},0).wait(1).to({x:773.25,y:473.45},0).wait(1).to({x:773.2,y:472.4},0).wait(1).to({y:471.35},0).wait(1).to({x:773.15,y:470.3},0).wait(1).to({x:773.1,y:469.25},0).wait(1).to({x:773.05,y:468.2},0).wait(1).to({y:467.15},0).wait(1).to({x:773,y:466.1},0).wait(1).to({x:772.95,y:465.05},0).wait(1).to({x:772.9,y:464},0).wait(1).to({x:772.85,y:462.95},0).wait(1).to({y:461.9},0).wait(1).to({x:772.8,y:460.85},0).wait(1).to({x:772.75,y:459.8},0).wait(1).to({x:772.7,y:458.75},0).wait(1).to({y:457.7},0).wait(1).to({x:772.65,y:456.65},0).wait(1).to({x:772.6,y:455.6},0).wait(1).to({x:772.55,y:454.55},0).wait(1).to({y:453.5},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_first_scene_man = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// first_scene_man
	this.instance = new lib.StaticIntro("synched",0);
	this.instance.setTransform(701.15,441.15,1,1,0,0,0,0.5,0);

	this.instance_1 = new lib.Man();
	this.instance_1.setTransform(654.85,477,1,1,0,0,0,57.2,302.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},15).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(16).to({_off:false},0).wait(1).to({regX:95.8,regY:266.3,scaleX:0.9922,scaleY:0.9922,x:691.15,y:442.65},0).wait(1).to({scaleX:0.9843,scaleY:0.9843,x:688.9,y:444.25},0).wait(1).to({scaleX:0.9765,scaleY:0.9765,x:686.65,y:445.9},0).wait(1).to({scaleX:0.9686,scaleY:0.9686,x:684.35,y:447.5},0).wait(1).to({scaleX:0.9608,scaleY:0.9608,x:682.1,y:449.1},0).wait(1).to({scaleX:0.9529,scaleY:0.9529,x:679.85,y:450.7},0).wait(1).to({scaleX:0.9451,scaleY:0.9451,x:677.55,y:452.35},0).wait(1).to({scaleX:0.9372,scaleY:0.9372,x:675.3,y:453.95},0).wait(1).to({scaleX:0.9294,scaleY:0.9294,x:673.05,y:455.5},0).wait(1).to({scaleX:0.9216,scaleY:0.9216,x:670.75,y:457.1},0).wait(1).to({scaleX:0.9137,scaleY:0.9137,x:668.5,y:458.7},0).wait(1).to({scaleX:0.9059,scaleY:0.9059,x:666.25,y:460.35},0).wait(1).to({scaleX:0.898,scaleY:0.898,x:664,y:461.95},0).wait(1).to({scaleX:0.8902,scaleY:0.8902,x:661.7,y:463.55},0).wait(1).to({scaleX:0.8823,scaleY:0.8823,x:659.45,y:465.15},0).wait(1).to({scaleX:0.8745,scaleY:0.8745,x:657.2,y:466.8},0).wait(1).to({scaleX:0.8667,scaleY:0.8667,x:654.9,y:468.35},0).wait(1).to({scaleX:0.8588,scaleY:0.8588,x:652.6,y:469.95},0).wait(1).to({scaleX:0.851,scaleY:0.851,x:650.35,y:471.55},0).wait(1).to({scaleX:0.8431,scaleY:0.8431,x:648.05,y:473.15},0).wait(1).to({scaleX:0.8353,scaleY:0.8353,x:645.8,y:474.8},0).wait(1).to({scaleX:0.8274,scaleY:0.8274,x:643.55,y:476.4},0).wait(1).to({scaleX:0.8196,scaleY:0.8196,x:641.3,y:478},0).wait(1).to({scaleX:0.8117,scaleY:0.8117,x:639,y:479.6},0).wait(1).to({scaleX:0.8039,scaleY:0.8039,x:636.75,y:481.2},0).wait(1).to({scaleX:0.7961,scaleY:0.7961,x:634.5,y:482.8},0).wait(1).to({scaleX:0.7882,scaleY:0.7882,x:632.2,y:484.4},0).wait(1).to({scaleX:0.7804,scaleY:0.7804,x:629.95,y:486},0).wait(1).to({scaleX:0.7725,scaleY:0.7725,x:627.7,y:487.6},0).wait(1).to({scaleX:0.7647,scaleY:0.7647,x:625.4,y:489.25},0).wait(1).to({scaleX:0.7568,scaleY:0.7568,x:623.15,y:490.85},0).wait(1).to({scaleX:0.749,scaleY:0.749,x:620.9,y:492.45},0).wait(1).to({scaleX:0.7412,scaleY:0.7412,x:618.65,y:494},0).wait(1).to({scaleX:0.7333,scaleY:0.7333,x:616.35,y:495.65},0).wait(1).to({scaleX:0.7255,scaleY:0.7255,x:614.1,y:497.25},0).wait(1).to({scaleX:0.7176,scaleY:0.7176,x:611.85,y:498.85},0).wait(1).to({scaleX:0.7098,scaleY:0.7098,x:609.55,y:500.45},0).wait(1).to({scaleX:0.7019,scaleY:0.7019,x:607.3,y:502.05},0).wait(1).to({scaleX:0.6941,scaleY:0.6941,x:605.05,y:503.7},0).wait(1).to({scaleX:0.6862,scaleY:0.6862,x:602.75,y:505.3},0).wait(1).to({scaleX:0.6784,scaleY:0.6784,x:600.5,y:506.85},0).wait(1).to({scaleX:0.6706,scaleY:0.6706,x:598.25,y:508.45},0).wait(1).to({scaleX:0.6627,scaleY:0.6627,x:596,y:510.1},0).wait(1).to({scaleX:0.6549,scaleY:0.6549,x:593.7,y:511.7},0).wait(1).to({scaleX:0.647,scaleY:0.647,x:591.45,y:513.3},0).wait(1).to({scaleX:0.6392,scaleY:0.6392,x:589.2,y:514.9},0).wait(1).to({scaleX:0.6313,scaleY:0.6313,x:586.9,y:516.5},0).wait(1).to({scaleX:0.6235,scaleY:0.6235,x:584.65,y:518.15},0).wait(1).to({scaleX:0.6156,scaleY:0.6156,x:582.4,y:519.7},0).wait(1).to({scaleX:0.6078,scaleY:0.6078,x:580.1,y:521.3},0).wait(1).to({scaleX:0.6,scaleY:0.6,x:577.85,y:522.9},0).wait(1).to({scaleX:0.5921,scaleY:0.5921,x:575.55,y:524.55},0).wait(1).to({scaleX:0.5843,scaleY:0.5843,x:573.3,y:526.15},0).wait(1).to({scaleX:0.5764,scaleY:0.5764,x:571,y:527.75},0).wait(1).to({scaleX:0.5686,scaleY:0.5686,x:568.75,y:529.35},0).wait(1).to({scaleX:0.5607,scaleY:0.5607,x:566.5,y:530.95},0).wait(1).to({scaleX:0.5529,scaleY:0.5529,x:564.2,y:532.6},0).wait(1).to({scaleX:0.5451,scaleY:0.5451,x:561.95,y:534.15},0).wait(1).to({scaleX:0.5372,scaleY:0.5372,x:559.7,y:535.75},0).wait(1).to({scaleX:0.5294,scaleY:0.5294,x:557.4,y:537.35},0).wait(1).to({scaleX:0.5215,scaleY:0.5215,x:555.15,y:539},0).wait(1).to({scaleX:0.5137,scaleY:0.5137,x:552.9,y:540.6},0).wait(1).to({scaleX:0.5058,scaleY:0.5058,x:550.65,y:542.2},0).wait(1).to({scaleX:0.498,scaleY:0.498,x:548.35,y:543.8},0).wait(1).to({scaleX:0.4901,scaleY:0.4901,x:546.1,y:545.45},0).wait(1).to({scaleX:0.4823,scaleY:0.4823,x:543.85,y:547},0).wait(1).to({scaleX:0.4745,scaleY:0.4745,x:541.55,y:548.6},0).wait(1).to({scaleX:0.4666,scaleY:0.4666,x:539.3,y:550.2},0).wait(1).to({scaleX:0.4588,scaleY:0.4588,x:537.05,y:551.8},0).wait(1).to({scaleX:0.4509,scaleY:0.4509,x:534.75,y:553.45},0).wait(1).to({scaleX:0.4431,scaleY:0.4431,x:532.5,y:555.05},0).wait(1).to({scaleX:0.4352,scaleY:0.4352,x:530.25,y:556.65},0).wait(1).to({scaleX:0.4274,scaleY:0.4274,x:528,y:558.25},0).wait(1).to({scaleX:0.4196,scaleY:0.4196,x:525.7,y:559.8},0).wait(1).to({scaleX:0.4117,scaleY:0.4117,x:523.45,y:561.45},0).wait(1).to({scaleX:0.4039,scaleY:0.4039,x:521.2,y:563.05},0).wait(1).to({scaleX:0.396,scaleY:0.396,x:518.9,y:564.65},0).wait(1).to({scaleX:0.3882,scaleY:0.3882,x:516.65,y:566.25},0).wait(1).to({scaleX:0.3803,scaleY:0.3803,x:514.4,y:567.9},0).wait(1).to({scaleX:0.3725,scaleY:0.3725,x:512.1,y:569.5},0).wait(1).to({scaleX:0.3646,scaleY:0.3646,x:509.85,y:571.1},0).wait(1).to({scaleX:0.3568,scaleY:0.3568,x:507.6,y:572.65},0).wait(1).to({scaleX:0.349,scaleY:0.349,x:505.35,y:574.3},0).wait(1).to({scaleX:0.3411,scaleY:0.3411,x:503.05,y:575.9},0).wait(1).to({scaleX:0.3333,scaleY:0.3333,x:500.8,y:577.5},0).wait(1).to({scaleX:0.3254,scaleY:0.3254,x:498.5,y:579.1},0).wait(1).to({scaleX:0.3233,scaleY:0.3233,x:497.6,y:577.25},0).wait(1).to({scaleX:0.3213,scaleY:0.3213,x:496.65,y:575.4},0).wait(1).to({scaleX:0.3192,scaleY:0.3192,x:495.7,y:573.55},0).wait(1).to({scaleX:0.3171,scaleY:0.3171,x:494.75,y:571.7},0).wait(1).to({scaleX:0.315,scaleY:0.315,x:493.8,y:569.85},0).wait(1).to({scaleX:0.313,scaleY:0.313,x:492.9,y:568.05},0).wait(1).to({scaleX:0.3109,scaleY:0.3109,x:491.95,y:566.2},0).wait(1).to({scaleX:0.3088,scaleY:0.3088,x:491,y:564.35},0).wait(1).to({scaleX:0.3067,scaleY:0.3067,x:490.05,y:562.45},0).wait(1).to({scaleX:0.3046,scaleY:0.3046,x:489.1,y:560.6},0).wait(1).to({scaleX:0.3026,scaleY:0.3026,x:488.15,y:558.75},0).wait(1).to({scaleX:0.3005,scaleY:0.3005,x:487.25,y:556.9},0).wait(1).to({scaleX:0.2984,scaleY:0.2984,x:486.3,y:555.05},0).wait(1).to({scaleX:0.2963,scaleY:0.2963,x:485.35,y:553.2},0).wait(1).to({scaleX:0.2942,scaleY:0.2942,x:484.4,y:551.35},0).wait(1).to({scaleX:0.2922,scaleY:0.2922,x:483.45,y:549.5},0).wait(1).to({scaleX:0.2901,scaleY:0.2901,x:482.5,y:547.7},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Drawing = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Drawing
	this.instance = new lib.MonaLisaEntranceLeo("synched",0);
	this.instance.setTransform(664.1,1458,8.1141,5.5872,0,0,0,1.4,1);
	this.instance._off = true;

	this.instance_1 = new lib.backview("synched",0);
	this.instance_1.setTransform(657.3,605.3,1,1,0,0,0,657.2,606.1);

	this.instance_2 = new lib.CachedBmp_1();
	this.instance_2.setTransform(477.45,199.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},316).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).wait(123));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(316).to({_off:false},0).wait(1).to({regX:-1.2,regY:0,scaleX:8.037,scaleY:5.5329,rotation:0.0515,x:643.15,y:1440.6},0).wait(1).to({scaleX:7.96,scaleY:5.4785,rotation:0.103,x:643.3,y:1428.8},0).wait(1).to({scaleX:7.883,scaleY:5.4242,rotation:0.1546,x:643.45,y:1416.95},0).wait(1).to({scaleX:7.8059,scaleY:5.3698,rotation:0.2061,x:643.6,y:1405.2},0).wait(1).to({scaleX:7.729,scaleY:5.3155,rotation:0.2576,x:643.75,y:1393.4},0).wait(1).to({scaleX:7.6519,scaleY:5.2611,rotation:0.3091,x:643.9,y:1381.6},0).wait(1).to({scaleX:7.5749,scaleY:5.2068,rotation:0.3606,x:644.05,y:1369.8},0).wait(1).to({scaleX:7.4978,scaleY:5.1524,rotation:0.4122,x:644.2,y:1358.05},0).wait(1).to({scaleX:7.4208,scaleY:5.0981,rotation:0.4637,x:644.35,y:1346.25},0).wait(1).to({scaleX:7.3437,scaleY:5.0437,rotation:0.5152,x:644.5,y:1334.4},0).wait(1).to({scaleX:7.2667,scaleY:4.9893,rotation:0.5667,x:644.7,y:1322.65},0).wait(1).to({scaleX:7.1896,scaleY:4.9349,rotation:0.6182,x:644.8,y:1310.85},0).wait(1).to({scaleX:7.1124,scaleY:4.8805,rotation:0.6698,x:644.95,y:1299.05},0).wait(1).to({scaleX:7.0354,scaleY:4.8262,rotation:0.7213,x:645.1,y:1287.3},0).wait(1).to({scaleX:6.9583,scaleY:4.7717,rotation:0.7728,x:645.25,y:1275.5},0).wait(1).to({scaleX:6.8813,scaleY:4.7175,rotation:0.6822,x:645.4,y:1263.75},0).wait(1).to({scaleX:6.8043,scaleY:4.6631,rotation:0.5915,x:645.55,y:1252},0).wait(1).to({scaleX:6.7272,scaleY:4.6087,rotation:0.5009,x:645.7,y:1240.25},0).wait(1).to({scaleX:6.6502,scaleY:4.5544,rotation:0.4102,x:645.8,y:1228.5},0).wait(1).to({scaleX:6.5731,scaleY:4.5,rotation:0.3196,x:645.95,y:1216.75},0).wait(1).to({scaleX:6.4961,scaleY:4.4456,rotation:0.2289,x:646.1,y:1205},0).wait(1).to({scaleX:6.4189,scaleY:4.3912,rotation:0.1383,x:646.25,y:1193.3},0).wait(1).to({scaleX:6.3418,scaleY:4.3368,rotation:0.0476,x:646.4,y:1181.5},0).wait(1).to({scaleX:6.2647,scaleY:4.2824,rotation:-0.043,x:646.55,y:1169.75},0).wait(1).to({scaleX:6.1878,scaleY:4.2281,rotation:-0.1337,x:646.65,y:1158},0).wait(1).to({scaleX:6.1108,scaleY:4.1738,rotation:-0.2243,x:646.8,y:1146.3},0).wait(1).to({scaleX:6.0337,scaleY:4.1194,rotation:-0.3149,x:646.95,y:1134.5},0).wait(1).to({scaleX:5.9566,scaleY:4.0651,rotation:-0.4056,x:647.1,y:1122.75},0).wait(1).to({scaleX:5.8796,scaleY:4.0107,rotation:-0.4962,x:647.25,y:1111},0).wait(1).to({scaleX:5.8025,scaleY:3.9563,rotation:-0.5869,x:647.4,y:1099.25},0).wait(1).to({scaleX:5.7255,scaleY:3.902,rotation:-0.6775,x:647.55,y:1087.5},0).wait(1).to({scaleX:5.6484,scaleY:3.8476,rotation:-0.6051,x:647.65,y:1075.7},0).wait(1).to({scaleX:5.5713,scaleY:3.7932,rotation:-0.5327,x:647.8,y:1063.9},0).wait(1).to({scaleX:5.4943,scaleY:3.7389,rotation:-0.4602,x:647.95,y:1052.1},0).wait(1).to({scaleX:5.4172,scaleY:3.6845,rotation:-0.3878,x:648.1,y:1040.3},0).wait(1).to({scaleX:5.3401,scaleY:3.6301,rotation:-0.3154,x:648.3,y:1028.55},0).wait(1).to({scaleX:5.2631,scaleY:3.5758,rotation:-0.2429,x:648.45,y:1016.75},0).wait(1).to({scaleX:5.186,scaleY:3.5214,rotation:-0.1705,x:648.6,y:1004.9},0).wait(1).to({scaleX:5.1089,scaleY:3.4669,rotation:-0.0981,x:648.7,y:993.1},0).wait(1).to({scaleX:5.0318,scaleY:3.4126,rotation:-0.0257,x:648.85,y:981.35},0).wait(1).to({scaleX:4.9548,scaleY:3.3582,rotation:0.0468,x:649,y:969.55},0).wait(1).to({scaleX:4.8778,scaleY:3.3039,rotation:0.1192,x:649.2,y:957.75},0).wait(1).to({scaleX:4.8007,scaleY:3.2495,rotation:0.1916,x:649.35,y:946},0).wait(1).to({scaleX:4.7237,scaleY:3.1952,rotation:0.2641,x:649.5,y:934.15},0).wait(1).to({scaleX:4.6467,scaleY:3.1408,rotation:0.3365,x:649.6,y:922.35},0).wait(1).to({scaleX:4.5696,scaleY:3.0865,rotation:0.4089,x:649.75,y:910.6},0).wait(1).to({scaleX:4.4925,scaleY:3.0321,rotation:0.4813,x:649.9,y:898.8},0).wait(1).to({scaleX:4.4154,scaleY:2.9777,rotation:0.5538,x:650.1,y:887},0).wait(1).to({scaleX:4.3384,scaleY:2.9233,rotation:0.6262,x:650.25,y:875.25},0).wait(1).to({scaleX:4.2613,scaleY:2.869,rotation:0.6986,x:650.4,y:863.45},0).wait(1).to({scaleX:4.1842,scaleY:2.8146,rotation:0.7711,x:650.55,y:851.65},0).wait(1).to({scaleX:4.1072,scaleY:2.7602,rotation:0.7343,x:650.65,y:839.9},0).wait(1).to({scaleX:4.0301,scaleY:2.7059,rotation:0.6976,x:650.8,y:828.1},0).wait(1).to({scaleX:3.9531,scaleY:2.6515,rotation:0.6609,x:650.95,y:816.35},0).wait(1).to({scaleX:3.876,scaleY:2.5971,rotation:0.6242,x:651.1,y:804.6},0).wait(1).to({scaleX:3.799,scaleY:2.5428,rotation:0.5875,x:651.25,y:792.8},0).wait(1).to({scaleX:3.7219,scaleY:2.4884,rotation:0.5508,x:651.4,y:781.05},0).wait(1).to({scaleX:3.6449,scaleY:2.434,rotation:0.514,x:651.55,y:769.25},0).wait(1).to({scaleX:3.5678,scaleY:2.3797,rotation:0.4773,x:651.7,y:757.5},0).wait(1).to({scaleX:3.4907,scaleY:2.3253,rotation:0.4406,x:651.85,y:745.7},0).wait(1).to({scaleX:3.4137,scaleY:2.2709,rotation:0.4039,x:652,y:733.95},0).wait(1).to({scaleX:3.3366,scaleY:2.2166,rotation:0.3672,x:652.15,y:722.15},0).wait(1).to({scaleX:3.2595,scaleY:2.1622,rotation:0.3305,x:652.3,y:710.45},0).wait(1).to({scaleX:3.1825,scaleY:2.1078,rotation:0.2937,x:652.45,y:698.7},0).wait(1).to({scaleX:3.1055,scaleY:2.0535,rotation:0.257,x:652.55,y:686.9},0).wait(1).to({scaleX:3.0284,scaleY:1.9991,rotation:0.2203,x:652.7,y:675.15},0).wait(1).to({scaleX:2.9513,scaleY:1.9447,rotation:0.1836,x:652.85,y:663.35},0).wait(1).to({scaleX:2.8743,scaleY:1.8904,rotation:0.1469,x:653,y:651.6},0).wait(1).to({scaleX:2.7972,scaleY:1.836,rotation:0.1102,x:653.15,y:639.8},0).wait(1).to({scaleX:2.7201,scaleY:1.7816,rotation:0.0734,x:653.3,y:628.05},0).wait(1).to({scaleX:2.643,scaleY:1.7272,rotation:0.0367,x:653.45,y:616.25},0).wait(1).to({scaleX:2.566,scaleY:1.6729,rotation:0,x:653.55,y:604.5},0).to({_off:true},1).wait(124));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_Camera_View_Man = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Camera_View_Man
	this.instance = new lib.Walking_Camera_View("synched",0);
	this.instance.setTransform(512.9,499.4,1,1,0,0,0,36.9,138.4);
	this.instance.alpha = 0.6914;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(248).to({_off:false},0).wait(1).to({regX:37.1,regY:137.9,x:516.95,y:497.15,alpha:0.69,startPosition:1},0).wait(1).to({x:520.85,y:495.45,startPosition:2},0).wait(1).to({x:524.75,y:493.75,startPosition:3},0).wait(1).to({x:528.65,y:492.05,startPosition:4},0).wait(1).to({x:532.55,y:490.3,startPosition:5},0).wait(1).to({x:536.45,y:488.6,startPosition:6},0).wait(1).to({x:540.35,y:486.9,startPosition:7},0).wait(1).to({x:544.2,y:485.2,startPosition:8},0).wait(1).to({x:548.1,y:483.45,startPosition:9},0).wait(1).to({x:552,y:481.75,startPosition:10},0).wait(1).to({x:555.9,y:480.05,startPosition:11},0).wait(1).to({x:559.8,y:478.35,startPosition:12},0).wait(1).to({x:563.7,y:476.65,startPosition:13},0).wait(1).to({x:567.6,y:474.9,startPosition:14},0).wait(1).to({x:571.45,y:473.2,startPosition:15},0).wait(1).to({x:575.35,y:471.5,startPosition:16},0).wait(1).to({x:579.25,y:469.8,startPosition:17},0).wait(1).to({x:583.15,y:468.05,startPosition:18},0).wait(1).to({x:587.05,y:466.35,startPosition:0},0).wait(1).to({x:590.95,y:464.65,startPosition:1},0).wait(1).to({x:594.85,y:462.95,startPosition:2},0).wait(1).to({x:598.75,y:461.25,startPosition:3},0).wait(1).to({x:602.6,y:459.5,startPosition:4},0).wait(1).to({x:606.5,y:457.8,startPosition:5},0).wait(1).to({x:610.4,y:456.1,startPosition:6},0).wait(1).to({x:614.3,y:454.4,startPosition:7},0).wait(1).to({x:618.2,y:452.65,startPosition:8},0).wait(1).to({x:622.1,y:450.95,startPosition:9},0).wait(1).to({x:626,y:449.25,startPosition:10},0).wait(1).to({x:629.85,y:447.55,startPosition:11},0).wait(1).to({x:633.75,y:445.85,startPosition:12},0).wait(1).to({x:637.65,y:444.1,startPosition:13},0).wait(1).to({x:641.55,y:442.4,startPosition:14},0).wait(1).to({x:645.45,y:440.7,startPosition:15},0).wait(1).to({x:649.35,y:439,startPosition:16},0).wait(1).to({x:653.25,y:437.25,startPosition:17},0).wait(1).to({x:657.15,y:435.55,startPosition:18},0).wait(1).to({x:661,y:433.85,startPosition:0},0).wait(1).to({x:664.9,y:432.15,startPosition:1},0).wait(1).to({x:668.8,y:430.45,startPosition:2},0).wait(1).to({x:672.7,y:428.7,startPosition:3},0).wait(1).to({x:676.6,y:427,startPosition:4},0).wait(1).to({x:680.5,y:425.3,startPosition:5},0).wait(1).to({x:684.4,y:423.6,startPosition:6},0).wait(1).to({x:688.25,y:421.85,startPosition:7},0).wait(1).to({x:692.15,y:420.15,startPosition:8},0).wait(1).to({x:696.05,y:418.45,startPosition:9},0).wait(1).to({x:699.95,y:416.75,startPosition:10},0).wait(1).to({x:703.85,y:415.05,startPosition:11},0).wait(1).to({x:707.75,y:413.3,startPosition:12},0).wait(1).to({x:711.65,y:411.6,startPosition:13},0).wait(1).to({x:715.55,y:409.9,startPosition:14},0).wait(1).to({x:719.4,y:408.2,startPosition:15},0).wait(1).to({x:723.3,y:406.45,startPosition:16},0).wait(1).to({x:727.2,y:404.75,startPosition:17},0).wait(1).to({x:731.1,y:403.05,startPosition:18},0).wait(1).to({x:735,y:401.35,startPosition:0},0).wait(1).to({x:738.9,y:399.65,startPosition:1},0).wait(1).to({x:742.8,y:397.9,startPosition:2},0).wait(1).to({x:746.65,y:396.2,startPosition:3},0).wait(1).to({x:750.55,y:394.5,startPosition:4},0).wait(1).to({x:754.45,y:392.8,startPosition:5},0).wait(1).to({x:758.35,y:391.05,startPosition:6},0).wait(1).to({x:762.25,y:389.35,startPosition:7},0).wait(1).to({x:766.15,y:387.65,startPosition:8},0).wait(1).to({x:770.05,y:385.95,startPosition:9},0).wait(1).to({x:773.95,y:384.25,startPosition:10},0).to({_off:true},1).wait(427));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_buttons = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// buttons
	this.Start = new lib.Start();
	this.Start.name = "Start";
	this.Start.setTransform(640,360.05);
	new cjs.ButtonHelper(this.Start, 0, 1, 1);

	this.Again = new lib.Again();
	this.Again.name = "Again";
	this.Again.setTransform(636.75,369.95);
	new cjs.ButtonHelper(this.Again, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.Start}]}).to({state:[]},2).to({state:[{t:this.Again}]},785).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.MUSEMBG = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// stairs
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("A+vhQMA9fAAAA73BRMA3nAAA");
	this.shape.setTransform(332.25,583.15);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1).to({_off:false},0).to({_off:true},119).wait(119));

	// Light_Poles
	this.instance = new lib.LightPole("synched",0);
	this.instance.setTransform(765.15,392.7,0.3833,0.3833,0,0,0,-0.2,0.4);
	var instanceFilter_1 = new cjs.ColorFilter(0.3,0.3,0.3,1,3.5,4.2,4.9,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-132,-433,264,866);

	this.instance_1 = new lib.LightPole("synched",0);
	this.instance_1.setTransform(-86.95,392.7,0.3833,0.3833,0,0,0,-0.2,0.4);
	var instance_1Filter_2 = new cjs.ColorFilter(0.3,0.3,0.3,1,3.5,4.2,4.9,0);
	this.instance_1.filters = [instance_1Filter_2];
	this.instance_1.cache(-132,-433,264,866);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[]},120).wait(119));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(119));
	this.timeline.addTween(cjs.Tween.get(instance_1Filter_2).wait(119));

	// Musem
	this.instance_2 = new lib.Museum("synched",0);
	this.instance_2.setTransform(331.9,305.5);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({_off:false},0).to({_off:true},119).wait(119));

	// Clouds
	this.instance_3 = new lib.CloudsGroup();
	this.instance_3.setTransform(346.85,22.75,0.5977,0.5977,0,0,0,943.5,182.1);
	var instance_3Filter_3 = new cjs.ColorFilter(0.81,0.81,0.81,1,0,0,0,0);
	this.instance_3.filters = [instance_3Filter_3];
	this.instance_3.cache(-2,-2,1898,368);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:946.9,regY:182.2,x:351,y:22.8},0).wait(1).to({x:353.1},0).wait(1).to({x:355.2},0).wait(1).to({x:357.25},0).wait(1).to({x:359.35},0).wait(1).to({x:361.45},0).wait(1).to({x:363.55},0).wait(1).to({x:365.6},0).wait(1).to({x:367.7},0).wait(1).to({x:369.8},0).wait(1).to({x:371.9},0).wait(1).to({x:373.95},0).wait(1).to({x:376.05},0).wait(1).to({x:378.15},0).wait(1).to({x:380.25},0).wait(1).to({x:382.3},0).wait(1).to({x:384.4},0).wait(1).to({x:386.5},0).wait(1).to({x:388.6},0).wait(1).to({x:390.7},0).wait(1).to({x:392.75},0).wait(1).to({x:394.85},0).wait(1).to({x:396.95},0).wait(1).to({x:399.05},0).wait(1).to({x:401.1},0).wait(1).to({x:403.2},0).wait(1).to({x:405.3},0).wait(1).to({x:407.4},0).wait(1).to({x:409.45},0).wait(1).to({x:411.55},0).wait(1).to({x:413.65},0).wait(1).to({x:415.75},0).wait(1).to({x:417.8},0).wait(1).to({x:419.9},0).wait(1).to({x:422},0).wait(1).to({x:424.1},0).wait(1).to({x:426.2},0).wait(1).to({x:428.25},0).wait(1).to({x:430.35},0).wait(1).to({x:432.45},0).wait(1).to({x:434.55},0).wait(1).to({x:436.6},0).wait(1).to({x:438.7},0).wait(1).to({x:440.8},0).wait(1).to({x:442.9},0).wait(1).to({x:444.95},0).wait(1).to({x:447.05},0).wait(1).to({x:449.15},0).wait(1).to({x:451.25},0).wait(1).to({x:453.3},0).wait(1).to({x:455.4},0).wait(1).to({x:457.5},0).wait(1).to({x:459.6},0).wait(1).to({x:461.7},0).wait(1).to({x:463.75},0).wait(1).to({x:465.85},0).wait(1).to({x:467.95},0).wait(1).to({x:470.05},0).wait(1).to({x:472.1},0).wait(1).to({x:474.2},0).wait(1).to({x:476.3},0).wait(1).to({x:478.4},0).wait(1).to({x:480.45},0).wait(1).to({x:482.55},0).wait(1).to({x:484.65},0).wait(1).to({x:486.75},0).wait(1).to({x:488.8},0).wait(1).to({x:490.9},0).wait(1).to({x:493},0).wait(1).to({x:495.1},0).wait(1).to({x:497.2},0).wait(1).to({x:499.25},0).wait(1).to({x:501.35},0).wait(1).to({x:503.45},0).wait(1).to({x:505.55},0).wait(1).to({x:507.6},0).wait(1).to({x:509.7},0).wait(1).to({x:511.8},0).wait(1).to({x:513.9},0).wait(1).to({x:515.95},0).wait(1).to({x:518.05},0).wait(1).to({x:520.15},0).wait(1).to({x:522.25},0).wait(1).to({x:524.3},0).wait(1).to({x:526.4},0).wait(1).to({x:528.5},0).wait(1).to({x:530.6},0).wait(1).to({x:532.7},0).wait(1).to({x:534.75},0).wait(1).to({x:536.85},0).wait(1).to({x:538.95},0).wait(1).to({x:541.05},0).wait(1).to({x:543.1},0).wait(1).to({x:545.2},0).wait(1).to({x:547.3},0).wait(1).to({x:549.4},0).wait(1).to({x:551.45},0).wait(1).to({x:553.55},0).wait(1).to({x:555.65},0).wait(1).to({x:557.75},0).wait(1).to({x:559.8},0).wait(1).to({x:561.9},0).wait(1).to({x:564},0).wait(1).to({x:566.05},0).wait(1).to({x:568.15},0).wait(1).to({x:570.2},0).wait(1).to({x:572.3},0).wait(1).to({x:574.4},0).wait(1).to({x:576.5},0).wait(1).to({x:578.55},0).wait(1).to({x:580.65},0).wait(1).to({x:582.75},0).wait(1).to({x:584.85,y:22.75},0).wait(1).to({x:586.9},0).wait(1).to({x:589},0).wait(1).to({x:591.1},0).wait(1).to({x:593.2},0).wait(1).to({x:595.25},0).wait(1).to({x:597.35},0).to({_off:true},1).wait(119));
	this.timeline.addTween(cjs.Tween.get(instance_3Filter_3).wait(1).to(new cjs.ColorFilter(1,1,1,1,-48.45,-48.45,-48.45,0), 0).wait(237));

	// Stars
	this.instance_4 = new lib.Star3Animation();
	this.instance_4.setTransform(237.1,28.65,0.3593,0.3593,0,0,0,0,0.1);

	this.instance_5 = new lib.Star1Animation();
	this.instance_5.setTransform(211.5,47.45,0.5521,0.5521,0,0,0,-0.2,0);

	this.instance_6 = new lib.Star2Animation();
	this.instance_6.setTransform(684.15,47.15,0.7472,0.7472,0,0,0,2.8,2.3);

	this.instance_7 = new lib.Star3Animation();
	this.instance_7.setTransform(63,131.05,0.4044,0.4044);

	this.instance_8 = new lib.Star3Animation();
	this.instance_8.setTransform(696.2,16.8,0.3022,0.3022,0,0,0,0.1,0.1);

	this.instance_9 = new lib.Star3Animation();
	this.instance_9.setTransform(441.2,-3.85,0.7022,0.7022);

	this.instance_10 = new lib.Star3Animation();
	this.instance_10.setTransform(556.75,108.65,0.2294,0.2294,0,0,0,0.2,0);

	this.instance_11 = new lib.Star1Animation();
	this.instance_11.setTransform(34.25,152.25,0.6214,0.6214,0,0,0,-0.1,0);

	this.instance_12 = new lib.Star3Animation();
	this.instance_12.setTransform(653.95,17.2,0.904,0.904);

	this.instance_13 = new lib.Star2Animation();
	this.instance_13.setTransform(409,-21.4,0.4467,0.4467);

	this.instance_14 = new lib.Star1Animation();
	this.instance_14.setTransform(572.6,119.6,0.5671,0.3909);

	this.instance_15 = new lib.Star3Animation();
	this.instance_15.setTransform(-0.25,13.45,0.2951,0.2951);

	this.instance_16 = new lib.Star1Animation();
	this.instance_16.setTransform(-88.6,41.3,0.4534,0.4534,0,0,0,-0.2,0.1);

	this.instance_17 = new lib.Star2Animation();
	this.instance_17.setTransform(1098.1,29.9,0.2601,0.2601,0,0,0,0.2,0);

	this.instance_18 = new lib.Star1Animation();
	this.instance_18.setTransform(991.15,24.5,0.6762,0.6762,0,0,0,-10,6.6);

	this.instance_19 = new lib.Star3Animation();
	this.instance_19.setTransform(-75.5,-9.9,1.3746,1.3746);

	this.instance_20 = new lib.Star2Animation();
	this.instance_20.setTransform(-37.05,27.3,0.5616,0.5616,0,0,0,-0.1,0.1);

	this.instance_21 = new lib.Star1Animation();
	this.instance_21.setTransform(-16.55,-24.7,0.7297,0.7297);

	this.instance_22 = new lib.Star3Animation();
	this.instance_22.setTransform(1017.25,-25.7,0.6287,0.6287,0,0,0,0.1,0);

	this.instance_23 = new lib.Star2Animation();
	this.instance_23.setTransform(1044.65,16.35,0.351,0.351,0,0,0,0.1,0.1);

	this.instance_24 = new lib.Star1Animation();
	this.instance_24.setTransform(1076.7,-12.85,1.0235,1.0235);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4}]}).to({state:[]},120).wait(119));

	// Houses_BG
	this.instance_25 = new lib.HousesBG("synched",0);
	this.instance_25.setTransform(810.55,353.75,0.3647,0.3252,0,0,180,-0.4,0.5);
	var instance_25Filter_4 = new cjs.ColorFilter(0.05,0.05,0.05,1,4.75,5.7,6.65,0);
	this.instance_25.filters = [instance_25Filter_4];
	this.instance_25.cache(-988,-390,1977,780);

	this.instance_26 = new lib.HousesBG("synched",0);
	this.instance_26.setTransform(114.6,353.75,0.3647,0.3252,0,0,0,0.2,0.5);
	var instance_26Filter_5 = new cjs.ColorFilter(0.05,0.05,0.05,1,4.75,5.7,6.65,0);
	this.instance_26.filters = [instance_26Filter_5];
	this.instance_26.cache(-988,-390,1977,780);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_26},{t:this.instance_25}]}).to({state:[]},120).wait(119));
	this.timeline.addTween(cjs.Tween.get(instance_25Filter_4).wait(119));
	this.timeline.addTween(cjs.Tween.get(instance_26Filter_5).wait(119));

	// Floor
	this.instance_27 = new lib.FLOOR("synched",0);
	this.instance_27.setTransform(489.15,568.95,1.4415,0.7228,0,0,0,0.1,0.3);
	var instance_27Filter_6 = new cjs.ColorFilter(0.31,0.31,0.31,1,0,0,0,0);
	this.instance_27.filters = [instance_27Filter_6];
	this.instance_27.cache(-450,-138,901,277);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).to({_off:true},120).wait(119));
	this.timeline.addTween(cjs.Tween.get(instance_27Filter_6).wait(119));

	// BG
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(102,102,102,0)").ss(1,1,1).p("EhpzA+QImSAAMAAAh9SMDdXAAAIAAErEhpzBAqIusAAMAAAiBTMDw/AAAMAAACBTIk8AA");
	this.shape_1.setTransform(520.1,313.875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000413").s().p("EhurA+qIAAiSIAAiaMAAAh4mMDXGAAAIGRAAMAAAB7AIAACSg");
	this.shape_2.setTransform(551.2625,341.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[]},120).wait(119));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.instance_3, startFrame:1, endFrame:1, x:-2, y:-2, w:1898, h:368});
	this.filterCacheList.push({instance: this.instance_3, startFrame:0, endFrame:0, x:-2, y:-2, w:1898, h:368});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-252,-100.9,1544.3,843.1);


(lib.Spots_overlay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Light("synched",0);
	this.instance.setTransform(3513.7,424.55,0.4573,0.6807,0,0,0,0,0.2);
	var instanceFilter_1 = new cjs.ColorFilter(0.75,0.75,0.75,1,0,0,0,0);
	this.instance.filters = [instanceFilter_1];
	this.instance.cache(-400,-625,800,1251);

	this.instance_1 = new lib.Light("synched",0);
	this.instance_1.setTransform(2680.45,424.55,0.4573,0.6807,0,0,0,0,0.2);
	var instance_1Filter_2 = new cjs.ColorFilter(0.5,0.5,0.5,1,0,0,0,0);
	this.instance_1.filters = [instance_1Filter_2];
	this.instance_1.cache(-400,-625,800,1251);

	this.instance_2 = new lib.Light("synched",0);
	this.instance_2.setTransform(1847.6,424.55,0.4573,0.6807,0,0,0,0,0.2);
	var instance_2Filter_3 = new cjs.ColorFilter(0.5,0.5,0.5,1,0,0,0,0);
	this.instance_2.filters = [instance_2Filter_3];
	this.instance_2.cache(-400,-625,800,1251);

	this.instance_3 = new lib.Light("synched",0);
	this.instance_3.setTransform(1014.55,424.55,0.4573,0.6807,0,0,0,0,0.2);
	var instance_3Filter_4 = new cjs.ColorFilter(0.5,0.5,0.5,1,0,0,0,0);
	this.instance_3.filters = [instance_3Filter_4];
	this.instance_3.cache(-400,-625,800,1251);

	this.instance_4 = new lib.Light("synched",0);
	this.instance_4.setTransform(182,424.55,0.4573,0.6807,0,0,0,0,0.2);
	var instance_4Filter_5 = new cjs.ColorFilter(0.5,0.5,0.5,1,0,0,0,0);
	this.instance_4.filters = [instance_4Filter_5];
	this.instance_4.cache(-400,-625,800,1251);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));
	this.timeline.addTween(cjs.Tween.get(instanceFilter_1).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_1Filter_2).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_2Filter_3).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_3Filter_4).wait(1));
	this.timeline.addTween(cjs.Tween.get(instance_4Filter_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Spots_overlay, new cjs.Rectangle(0,0,3695.7,848.9), null);


(lib.Scene_1_Spots_Overlay = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Spots_Overlay
	this.instance = new lib.Spots_overlay();
	this.instance.setTransform(1865.9,314,1,1,0,0,0,1845,314.8);
	this.instance._off = true;

	this.instance_1 = new lib.Light("synched",0);
	this.instance_1.setTransform(683.05,259.4,1.3035,1.3035);
	this.instance_1.alpha = 0.6016;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},120).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[]},1).to({state:[{t:this.instance_1}]},126).wait(139));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(120).to({_off:false},0).wait(1).to({regX:1847.9,regY:424.4,x:1850.2,y:423.75},0).wait(1).to({x:1831.65,y:423.9},0).wait(1).to({x:1813.1,y:424},0).wait(1).to({x:1794.5,y:424.15},0).wait(1).to({x:1775.95,y:424.3},0).wait(1).to({x:1757.35,y:424.4},0).wait(1).to({x:1738.8,y:424.5},0).wait(1).to({x:1720.2,y:424.6},0).wait(1).to({x:1701.65,y:424.75},0).wait(1).to({x:1683.05,y:424.9},0).wait(1).to({x:1664.5,y:425},0).wait(1).to({x:1645.9,y:425.15},0).wait(1).to({x:1627.35,y:425.25},0).wait(1).to({x:1608.75,y:425.4},0).wait(1).to({x:1590.2,y:425.55},0).wait(1).to({x:1571.6,y:425.65},0).wait(1).to({x:1553.05,y:425.8},0).wait(1).to({x:1534.45,y:425.9},0).wait(1).to({x:1515.9,y:426.05},0).wait(1).to({x:1497.3,y:426.2},0).wait(1).to({x:1478.75,y:426.3},0).wait(1).to({x:1460.15,y:426.45},0).wait(1).to({x:1441.6,y:426.55},0).wait(1).to({x:1423,y:426.7},0).wait(1).to({x:1404.45,y:426.85},0).wait(1).to({x:1385.85,y:426.95},0).wait(1).to({x:1367.3,y:427.1},0).wait(1).to({x:1348.7,y:427.2},0).wait(1).to({x:1330.15,y:427.35},0).wait(1).to({x:1311.55,y:427.5},0).wait(1).to({x:1293,y:427.6},0).wait(1).to({x:1274.4,y:427.75},0).wait(1).to({x:1255.8,y:427.85},0).wait(1).to({x:1237.25,y:428},0).wait(1).to({x:1218.65,y:428.15},0).wait(1).to({x:1200.1,y:428.25},0).wait(1).to({x:1181.5,y:428.4},0).wait(1).to({x:1162.95,y:428.5},0).wait(1).to({x:1144.35,y:428.65},0).wait(1).to({x:1125.8,y:428.8},0).wait(1).to({x:1107.2,y:428.9},0).wait(1).to({x:1088.65,y:429.05},0).wait(1).to({x:1070.05,y:429.15},0).wait(1).to({x:1051.5,y:429.3},0).wait(1).to({x:1032.9,y:429.45},0).wait(1).to({x:1014.35,y:429.55},0).wait(1).to({x:995.75,y:429.7},0).wait(1).to({x:977.2,y:429.85},0).wait(1).to({x:958.6,y:429.95},0).wait(1).to({x:940.05,y:430.1},0).wait(1).to({x:921.45,y:430.2},0).wait(1).to({x:902.9,y:430.35},0).wait(1).to({x:884.3,y:430.5},0).wait(1).to({x:865.75,y:430.6},0).wait(1).to({x:847.15,y:430.75},0).wait(1).to({x:828.6,y:430.85},0).wait(1).to({x:810,y:431},0).wait(1).to({x:791.45,y:431.15},0).wait(1).to({x:772.85,y:431.25},0).wait(1).to({x:754.3,y:431.4},0).wait(1).to({x:735.7,y:431.5},0).wait(1).to({x:717.15,y:431.65},0).wait(1).to({x:698.55,y:431.8},0).wait(1).to({x:679.95,y:431.9},0).wait(1).to({x:661.4,y:432.05},0).wait(1).to({x:642.8,y:432.15},0).wait(1).to({x:624.25,y:432.3},0).wait(1).to({x:605.65,y:432.45},0).wait(1).to({x:587.1,y:432.55},0).wait(1).to({x:568.5,y:432.7},0).wait(1).to({x:549.95,y:432.8},0).wait(1).to({x:531.35,y:432.95},0).wait(1).to({x:512.8,y:433.1},0).wait(1).to({x:494.2,y:433.2},0).wait(1).to({x:475.65,y:433.35},0).wait(1).to({x:457.05,y:433.45},0).wait(1).to({x:438.5,y:433.6},0).wait(1).to({x:419.9,y:433.75},0).wait(1).to({x:401.35,y:433.85},0).wait(1).to({x:382.75,y:434},0).wait(1).to({x:364.2,y:434.1},0).wait(1).to({x:345.6,y:434.25},0).wait(1).to({x:327.05,y:434.4},0).wait(1).to({x:308.45,y:434.5},0).wait(1).to({x:289.9,y:434.65},0).wait(1).to({x:271.3,y:434.75},0).wait(1).to({x:252.75,y:434.9},0).wait(1).to({x:234.15,y:435.05},0).wait(1).to({x:215.6,y:435.15},0).wait(1).to({x:197,y:435.3},0).wait(1).to({x:178.45,y:435.4},0).wait(1).to({x:159.85,y:435.55},0).wait(1).to({x:141.3,y:435.7},0).wait(1).to({x:122.7,y:435.8},0).wait(1).to({x:104.1,y:435.95},0).wait(1).to({x:85.55,y:436.1},0).wait(1).to({x:66.95,y:436.2},0).wait(1).to({x:48.4,y:436.35},0).wait(1).to({x:29.8,y:436.45},0).wait(1).to({x:11.25,y:436.6},0).wait(1).to({x:-7.35,y:436.75},0).wait(1).to({x:-25.9,y:436.85},0).wait(1).to({x:-44.5,y:437},0).wait(1).to({x:-63.05,y:437.1},0).wait(1).to({x:-81.65,y:437.25},0).wait(1).to({x:-100.2,y:437.4},0).wait(1).to({x:-118.8,y:437.5},0).wait(1).to({x:-137.35,y:437.65},0).wait(1).to({x:-155.95,y:437.75},0).wait(1).to({x:-174.5,y:437.9},0).wait(1).to({x:-193.1,y:438.05},0).wait(1).to({x:-211.65,y:438.15},0).wait(1).to({x:-230.25,y:438.3},0).wait(1).to({x:-248.8,y:438.4},0).wait(1).to({x:-267.4,y:438.55},0).wait(1).to({x:-285.95,y:438.7},0).wait(1).to({x:-304.55,y:438.8},0).wait(1).to({x:-323.1,y:438.95},0).wait(1).to({x:-341.7,y:439.05},0).wait(1).to({x:-360.25,y:439.2},0).wait(1).to({x:-378.85,y:439.35},0).wait(1).to({x:-397.4,y:439.45},0).wait(1).to({x:-416,y:439.6},0).wait(1).to({x:-434.55,y:439.7},0).wait(1).to({x:-453.15,y:439.85},0).wait(1).to({x:-471.75,y:440},0).wait(1).to({regX:1845,regY:314.8,x:-491.2,y:314},0).to({_off:true},1).wait(265));
	this.instance.addEventListener("tick", AdobeAn.handleFilterCache);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_bg_museum = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bg_museum
	this.instance = new lib.MUSEMBG("synched",0);
	this.instance.setTransform(476.95,358.25,1,1,0,0,0,331.9,305.5);

	this.instance_1 = new lib.GalleryBG();
	this.instance_1.setTransform(2069.2,313.95,1,1,0,0,0,2021.8,257.7);
	this.instance_1._off = true;

	this.instance_2 = new lib.Camerarecording("synched",0);
	this.instance_2.setTransform(640,360,1,1,0,0,0,640,360);

	this.instance_3 = new lib.Mona_Lisa_BG("synched",0);
	this.instance_3.setTransform(658.1,408.35,1.5762,1.5575,0,0,0,0.1,1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EiPihasMEfGAAAMAAAC1ZMkfGAAAg");
	this.shape.setTransform(674.1,383.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("EiPiBatMAAAi1ZMEfFAAAMAAAC1Zg");
	this.shape_1.setTransform(674.1,383.85);

	this.instance_4 = new lib.HOME();
	this.instance_4.setTransform(775.55,433,1,1,0,0,0,663.5,217.6);

	this.instance_5 = new lib._final("synched",0);
	this.instance_5.setTransform(554.95,487.9,1,1,0,0,0,0,-1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},120).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},68).to({state:[{t:this.shape_1},{t:this.shape}]},197).to({state:[{t:this.instance_4}]},52).to({state:[{t:this.instance_5}]},74).wait(147));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(120).to({_off:false},0).wait(1).to({regX:2024.9,regY:367.1,x:2053.7,y:423.35},0).wait(1).to({x:2035.15},0).wait(1).to({x:2016.65},0).wait(1).to({x:1998.1},0).wait(1).to({x:1979.55},0).wait(1).to({x:1960.95},0).wait(1).to({x:1942.4},0).wait(1).to({x:1923.85},0).wait(1).to({x:1905.3},0).wait(1).to({x:1886.75},0).wait(1).to({x:1868.15},0).wait(1).to({x:1849.6},0).wait(1).to({x:1831.05},0).wait(1).to({x:1812.5},0).wait(1).to({x:1793.95},0).wait(1).to({x:1775.35},0).wait(1).to({x:1756.8},0).wait(1).to({x:1738.25},0).wait(1).to({x:1719.7},0).wait(1).to({x:1701.15},0).wait(1).to({x:1682.55},0).wait(1).to({x:1664},0).wait(1).to({x:1645.45},0).wait(1).to({x:1626.9},0).wait(1).to({x:1608.35},0).wait(1).to({x:1589.75},0).wait(1).to({x:1571.2},0).wait(1).to({x:1552.65},0).wait(1).to({x:1534.1},0).wait(1).to({x:1515.55},0).wait(1).to({x:1496.95},0).wait(1).to({x:1478.4},0).wait(1).to({x:1459.85},0).wait(1).to({x:1441.3},0).wait(1).to({x:1422.75},0).wait(1).to({x:1404.15},0).wait(1).to({x:1385.6},0).wait(1).to({x:1367.05},0).wait(1).to({x:1348.5},0).wait(1).to({x:1329.95},0).wait(1).to({x:1311.35},0).wait(1).to({x:1292.8},0).wait(1).to({x:1274.25},0).wait(1).to({x:1255.7},0).wait(1).to({x:1237.15},0).wait(1).to({x:1218.55},0).wait(1).to({x:1200},0).wait(1).to({x:1181.45},0).wait(1).to({x:1162.9},0).wait(1).to({x:1144.35},0).wait(1).to({x:1125.75},0).wait(1).to({x:1107.2},0).wait(1).to({x:1088.65},0).wait(1).to({x:1070.1},0).wait(1).to({x:1051.55},0).wait(1).to({x:1032.95},0).wait(1).to({x:1014.4},0).wait(1).to({x:995.85},0).wait(1).to({x:977.3},0).wait(1).to({x:958.75},0).wait(1).to({x:940.15},0).wait(1).to({x:921.6},0).wait(1).to({x:903.05},0).wait(1).to({x:884.5},0).wait(1).to({x:865.95},0).wait(1).to({x:847.4},0).wait(1).to({x:828.8},0).wait(1).to({x:810.25},0).wait(1).to({x:791.7},0).wait(1).to({x:773.15},0).wait(1).to({x:754.6},0).wait(1).to({x:736},0).wait(1).to({x:717.45},0).wait(1).to({x:698.9},0).wait(1).to({x:680.35},0).wait(1).to({x:661.8},0).wait(1).to({x:643.2},0).wait(1).to({x:624.65},0).wait(1).to({x:606.1},0).wait(1).to({x:587.55},0).wait(1).to({x:569},0).wait(1).to({x:550.4},0).wait(1).to({x:531.85},0).wait(1).to({x:513.3},0).wait(1).to({x:494.75},0).wait(1).to({x:476.2},0).wait(1).to({x:457.6},0).wait(1).to({x:439.05},0).wait(1).to({x:420.5},0).wait(1).to({x:401.95},0).wait(1).to({x:383.4},0).wait(1).to({x:364.8},0).wait(1).to({x:346.25},0).wait(1).to({x:327.7},0).wait(1).to({x:309.15},0).wait(1).to({x:290.6},0).wait(1).to({x:272},0).wait(1).to({x:253.45},0).wait(1).to({x:234.9},0).wait(1).to({x:216.35},0).wait(1).to({x:197.8},0).wait(1).to({x:179.2},0).wait(1).to({x:160.65},0).wait(1).to({x:142.1},0).wait(1).to({x:123.55},0).wait(1).to({x:105},0).wait(1).to({x:86.4},0).wait(1).to({x:67.85},0).wait(1).to({x:49.3},0).wait(1).to({x:30.75},0).wait(1).to({x:12.2},0).wait(1).to({x:-6.4},0).wait(1).to({x:-24.95},0).wait(1).to({x:-43.5},0).wait(1).to({x:-62.05},0).wait(1).to({x:-80.6},0).wait(1).to({x:-99.2},0).wait(1).to({x:-117.75},0).wait(1).to({x:-136.3},0).wait(1).to({x:-154.85},0).wait(1).to({x:-173.4},0).wait(1).to({x:-192},0).wait(1).to({x:-210.55},0).wait(1).to({x:-229.1},0).wait(1).to({x:-247.65},0).wait(1).to({x:-266.2},0).wait(1).to({x:-284.8},0).to({_off:true},1).wait(538));
	this.instance.addEventListener("tick", AdobeAn.handleFilterCache);

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.copyrights_anitamalinsky = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,2,762,787,788];
	this.streamSoundSymbolsList[0] = [{id:"Sound_Badguy",startFrame:0,endFrame:751,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("Sound_Badguy",0);
		this.InsertIntoSoundStreamData(soundInstance,0,751,1);
		this.Start = this.buttons.Start;
		var self=this;
		self.stop();
		
		self.Start.addEventListener("click",StartPlaying);
		
		function StartPlaying()
		{
			self.gotoAndPlay(2);
		}
		
		createjs.Sound.registerSound("/sounds/Sound_Badguy", "Bad");
		createjs.Sound.play("Bad");
	}
	this.frame_2 = function() {
		this.Start = undefined;
	}
	this.frame_762 = function() {
		createjs.Sound.stop();
	}
	this.frame_787 = function() {
		this.Again = this.buttons.Again;
		var self=this;
		self.stop();
		
		self.Again.addEventListener("click",playagain);
		
		function playagain()
		{
			self.gotoAndPlay(1);
		}
	}
	this.frame_788 = function() {
		this.___loopingOver___ = true;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(760).call(this.frame_762).wait(25).call(this.frame_787).wait(1).call(this.frame_788).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(104).to({regX:1,regY:1.2,scaleX:0.3241,scaleY:0.3241,x:487.7,y:519.95},0).wait(16).to({regX:1.4,regY:1.6,scaleX:1,scaleY:1,x:641.3,y:360.65},0).wait(264).to({regY:0},0).wait(1).to({regX:0,scaleX:0.9796,scaleY:0.9796,x:640.6186,y:363.5971},0).wait(1).to({scaleX:0.9593,scaleY:0.9593,x:641.3372,y:366.5441},0).wait(1).to({scaleX:0.939,scaleY:0.939,x:642.0558,y:369.4912},0).wait(1).to({scaleX:0.9187,scaleY:0.9187,x:642.7744,y:372.4382},0).wait(1).to({scaleX:0.8984,scaleY:0.8984,x:643.4929,y:375.3853},0).wait(1).to({scaleX:0.8781,scaleY:0.8781,x:644.2115,y:378.3324},0).wait(1).to({scaleX:0.8578,scaleY:0.8578,x:644.9301,y:381.2794},0).wait(1).to({scaleX:0.8375,scaleY:0.8375,x:645.6487,y:384.2265},0).wait(1).to({scaleX:0.8172,scaleY:0.8172,x:646.3673,y:387.1735},0).wait(1).to({scaleX:0.7969,scaleY:0.7969,x:647.0859,y:390.1206},0).wait(1).to({scaleX:0.7766,scaleY:0.7766,x:647.8045,y:393.0676},0).wait(1).to({scaleX:0.7563,scaleY:0.7563,x:648.5231,y:396.0147},0).wait(1).to({scaleX:0.736,scaleY:0.736,x:649.2416,y:398.9618},0).wait(1).to({scaleX:0.7157,scaleY:0.7157,x:649.9602,y:401.9088},0).wait(1).to({scaleX:0.6954,scaleY:0.6954,x:650.6788,y:404.8559},0).wait(1).to({scaleX:0.6751,scaleY:0.6751,x:651.3974,y:407.8029},0).wait(1).to({scaleX:0.6548,scaleY:0.6548,x:652.116,y:410.75},0).wait(34).to({regX:0.2,regY:0.1,scaleX:0.6535,scaleY:0.6535,x:652.4,y:409.65,visible:true},0).wait(1).to({regX:0,regY:0,scaleX:0.6437,scaleY:0.6437,x:651.9701,y:400.9397},0).wait(1).to({scaleX:0.6338,scaleY:0.6338,x:651.6903,y:392.2793},0).wait(1).to({scaleX:0.624,scaleY:0.624,x:651.4104,y:383.619},0).wait(1).to({scaleX:0.6141,scaleY:0.6141,x:651.1305,y:374.9586},0).wait(1).to({scaleX:0.6042,scaleY:0.6042,x:650.8507,y:366.2983},0).wait(1).to({scaleX:0.5944,scaleY:0.5944,x:650.5708,y:357.6379},0).wait(1).to({scaleX:0.5845,scaleY:0.5845,x:650.2909,y:348.9776},0).wait(1).to({scaleX:0.5746,scaleY:0.5746,x:650.0111,y:340.3172},0).wait(1).to({scaleX:0.5648,scaleY:0.5648,x:649.7312,y:331.6569},0).wait(1).to({scaleX:0.5549,scaleY:0.5549,x:649.4513,y:322.9965},0).wait(1).to({scaleX:0.545,scaleY:0.545,x:649.1715,y:314.3362},0).wait(1).to({scaleX:0.5352,scaleY:0.5352,x:648.8916,y:305.6758},0).wait(1).to({scaleX:0.5253,scaleY:0.5253,x:648.6117,y:297.0155},0).wait(1).to({scaleX:0.5154,scaleY:0.5154,x:648.3318,y:288.3551},0).wait(1).to({scaleX:0.5056,scaleY:0.5056,x:648.052,y:279.6948},0).wait(1).to({scaleX:0.4957,scaleY:0.4957,x:647.7721,y:271.0345},0).wait(1).to({scaleX:0.4858,scaleY:0.4858,x:647.4922,y:262.3741},0).wait(1).to({scaleX:0.476,scaleY:0.476,x:647.2124,y:253.7138},0).wait(1).to({scaleX:0.4661,scaleY:0.4661,x:646.9325,y:245.0534},0).wait(1).to({scaleX:0.4562,scaleY:0.4562,x:646.6526,y:236.3931},0).wait(1).to({scaleX:0.4464,scaleY:0.4464,x:646.3728,y:227.7327},0).wait(1).to({scaleX:0.4365,scaleY:0.4365,x:646.0929,y:219.0724},0).wait(1).to({scaleX:0.4266,scaleY:0.4266,x:645.813,y:210.412},0).wait(1).to({scaleX:0.4167,scaleY:0.4167,x:645.5332,y:201.7517},0).wait(1).to({scaleX:0.4069,scaleY:0.4069,x:645.2533,y:193.0913},0).wait(1).to({scaleX:0.397,scaleY:0.397,x:644.9734,y:184.431},0).wait(1).to({scaleX:0.3871,scaleY:0.3871,x:644.6936,y:175.7706},0).wait(51).to({scaleX:1,scaleY:1,x:639.5404,y:359.6095},0).wait(10).to({_off:true},1).wait(41).to({_off:false,regY:0.8,scaleX:0.4881,scaleY:0.4881,x:709.6,y:422.1},0).wait(1).to({regY:0,scaleX:0.4806,scaleY:0.4806,x:702.7651,y:424.3199},0).wait(1).to({scaleX:0.4731,scaleY:0.4731,x:695.9302,y:426.9399},0).wait(1).to({scaleX:0.4656,scaleY:0.4656,x:689.0953,y:429.5599},0).wait(1).to({scaleX:0.4581,scaleY:0.4581,x:682.2605,y:432.1798},0).wait(1).to({scaleX:0.4506,scaleY:0.4506,x:675.4256,y:434.7998},0).wait(1).to({scaleX:0.4431,scaleY:0.4431,x:668.5907,y:437.4198},0).wait(1).to({scaleX:0.4356,scaleY:0.4356,x:661.7558,y:440.0397},0).wait(1).to({scaleX:0.4281,scaleY:0.4281,x:654.9209,y:442.6597},0).wait(1).to({scaleX:0.4206,scaleY:0.4206,x:648.086,y:445.2796},0).wait(1).to({scaleX:0.4131,scaleY:0.4131,x:641.2512,y:447.8996},0).wait(1).to({scaleX:0.4056,scaleY:0.4056,x:634.4163,y:450.5196},0).wait(1).to({scaleX:0.398,scaleY:0.398,x:627.5814,y:453.1395},0).wait(1).to({scaleX:0.3905,scaleY:0.3905,x:620.7465,y:455.7595},0).wait(1).to({scaleX:0.383,scaleY:0.383,x:613.9116,y:458.3794},0).wait(1).to({scaleX:0.3755,scaleY:0.3755,x:607.0767,y:460.9994},0).wait(1).to({scaleX:0.368,scaleY:0.368,x:600.2419,y:463.6194},0).wait(1).to({scaleX:0.3605,scaleY:0.3605,x:593.407,y:466.2393},0).wait(1).to({scaleX:0.353,scaleY:0.353,x:586.5721,y:468.8593},0).wait(1).to({scaleX:0.3455,scaleY:0.3455,x:579.7372,y:471.4792},0).wait(1).to({scaleX:0.338,scaleY:0.338,x:572.9023,y:474.0992},0).wait(1).to({scaleX:0.3305,scaleY:0.3305,x:566.0674,y:476.7192},0).wait(1).to({scaleX:0.323,scaleY:0.323,x:559.2326,y:479.3391},0).wait(1).to({scaleX:0.3154,scaleY:0.3154,x:552.3977,y:481.9591},0).wait(1).to({scaleX:0.3079,scaleY:0.3079,x:545.5628,y:484.5791},0).wait(1).to({scaleX:0.3004,scaleY:0.3004,x:538.7279,y:487.199},0).wait(1).to({scaleX:0.2929,scaleY:0.2929,x:531.893,y:489.819},0).wait(1).to({scaleX:0.2854,scaleY:0.2854,x:525.0581,y:492.4389},0).wait(1).to({scaleX:0.2779,scaleY:0.2779,x:518.2233,y:495.0589},0).wait(1).to({scaleX:0.2704,scaleY:0.2704,x:511.3884,y:497.6789},0).wait(1).to({scaleX:0.2629,scaleY:0.2629,x:504.5535,y:500.2988},0).wait(1).to({scaleX:0.2554,scaleY:0.2554,x:497.7186,y:502.9188},0).wait(1).to({scaleX:0.2479,scaleY:0.2479,x:490.8837,y:505.5387},0).wait(1).to({scaleX:0.2403,scaleY:0.2403,x:484.0488,y:508.1587},0).wait(1).to({scaleX:0.2328,scaleY:0.2328,x:477.214,y:510.7787},0).wait(1).to({scaleX:0.2253,scaleY:0.2253,x:470.3791,y:513.3986},0).wait(1).to({scaleX:0.2178,scaleY:0.2178,x:463.5442,y:516.0186},0).wait(1).to({scaleX:0.2103,scaleY:0.2103,x:456.7093,y:518.6385},0).wait(1).to({scaleX:0.2028,scaleY:0.2028,x:449.8744,y:521.2585},0).wait(1).to({scaleX:0.1953,scaleY:0.1953,x:443.0395,y:523.8785},0).wait(1).to({scaleX:0.1878,scaleY:0.1878,x:436.2047,y:526.4984},0).wait(1).to({scaleX:0.1803,scaleY:0.1803,x:429.3698,y:529.1184},0).wait(1).to({scaleX:0.1728,scaleY:0.1728,x:422.5349,y:531.7384},0).wait(1).to({scaleX:0.1653,scaleY:0.1653,x:415.7,y:534.3583},0).wait(31).to({scaleX:0.269,scaleY:0.269,x:806.75,y:164.1},0).wait(1).to({scaleX:0.2735,scaleY:0.2735,x:805.1552,y:165.1768},0).wait(1).to({scaleX:0.2779,scaleY:0.2779,x:803.5604,y:166.2535},0).wait(1).to({scaleX:0.2824,scaleY:0.2824,x:801.9655,y:167.3303},0).wait(1).to({scaleX:0.2868,scaleY:0.2868,x:800.3707,y:168.4071},0).wait(1).to({scaleX:0.2913,scaleY:0.2913,x:798.7759,y:169.4839},0).wait(1).to({scaleX:0.2957,scaleY:0.2957,x:797.1811,y:170.5606},0).wait(1).to({scaleX:0.3002,scaleY:0.3002,x:795.5863,y:171.6374},0).wait(1).to({scaleX:0.3046,scaleY:0.3046,x:793.9915,y:172.7142},0).wait(1).to({scaleX:0.3091,scaleY:0.3091,x:792.3966,y:173.791},0).wait(1).to({scaleX:0.3135,scaleY:0.3135,x:790.8018,y:174.8677},0).wait(1).to({scaleX:0.3179,scaleY:0.3179,x:789.207,y:175.9445},0).wait(1).to({scaleX:0.3224,scaleY:0.3224,x:787.6122,y:177.0213},0).wait(1).to({scaleX:0.3268,scaleY:0.3268,x:786.0174,y:178.0981},0).wait(1).to({scaleX:0.3313,scaleY:0.3313,x:784.4226,y:179.1748},0).wait(1).to({scaleX:0.3357,scaleY:0.3357,x:782.8277,y:180.2516},0).wait(1).to({scaleX:0.3402,scaleY:0.3402,x:781.2329,y:181.3284},0).wait(1).to({scaleX:0.3446,scaleY:0.3446,x:779.6381,y:182.4052},0).wait(1).to({scaleX:0.3491,scaleY:0.3491,x:778.0433,y:183.4819},0).wait(1).to({scaleX:0.3535,scaleY:0.3535,x:776.4485,y:184.5587},0).wait(1).to({scaleX:0.3579,scaleY:0.3579,x:774.8537,y:185.6355},0).wait(1).to({scaleX:0.3624,scaleY:0.3624,x:773.2588,y:186.7123},0).wait(1).to({scaleX:0.3668,scaleY:0.3668,x:771.664,y:187.789},0).wait(1).to({scaleX:0.3713,scaleY:0.3713,x:770.0692,y:188.8658},0).wait(1).to({scaleX:0.3757,scaleY:0.3757,x:768.4744,y:189.9426},0).wait(1).to({scaleX:0.3802,scaleY:0.3802,x:766.8796,y:191.0193},0).wait(1).to({scaleX:0.3846,scaleY:0.3846,x:765.2847,y:192.0961},0).wait(1).to({scaleX:0.3891,scaleY:0.3891,x:763.6899,y:193.1729},0).wait(1).to({scaleX:0.3935,scaleY:0.3935,x:762.0951,y:194.2497},0).wait(1).to({scaleX:0.398,scaleY:0.398,x:760.5003,y:195.3264},0).wait(1).to({scaleX:0.4024,scaleY:0.4024,x:758.9055,y:196.4032},0).wait(1).to({scaleX:0.4068,scaleY:0.4068,x:757.3107,y:197.48},0).wait(1).to({scaleX:0.4113,scaleY:0.4113,x:755.7158,y:198.5568},0).wait(1).to({scaleX:0.4157,scaleY:0.4157,x:754.121,y:199.6335},0).wait(1).to({scaleX:0.4202,scaleY:0.4202,x:752.5262,y:200.7103},0).wait(1).to({scaleX:0.4246,scaleY:0.4246,x:750.9314,y:201.7871},0).wait(1).to({scaleX:0.4291,scaleY:0.4291,x:749.3366,y:202.8639},0).wait(1).to({scaleX:0.4335,scaleY:0.4335,x:747.7418,y:203.9406},0).wait(1).to({scaleX:0.438,scaleY:0.438,x:746.1469,y:205.0174},0).wait(1).to({scaleX:0.4424,scaleY:0.4424,x:744.5521,y:206.0942},0).wait(1).to({scaleX:0.4468,scaleY:0.4468,x:742.9573,y:207.171},0).wait(1).to({scaleX:0.4513,scaleY:0.4513,x:741.3625,y:208.2477},0).wait(1).to({scaleX:0.4557,scaleY:0.4557,x:739.7677,y:209.3245},0).wait(1).to({scaleX:0.4602,scaleY:0.4602,x:738.1729,y:210.4013},0).wait(1).to({scaleX:0.4646,scaleY:0.4646,x:736.578,y:211.4781},0).wait(1).to({scaleX:0.4691,scaleY:0.4691,x:734.9832,y:212.5548},0).wait(1).to({scaleX:0.4735,scaleY:0.4735,x:733.3884,y:213.6316},0).wait(1).to({scaleX:0.478,scaleY:0.478,x:731.7936,y:214.7084},0).wait(1).to({scaleX:0.4824,scaleY:0.4824,x:730.1988,y:215.7851},0).wait(1).to({scaleX:0.4868,scaleY:0.4868,x:728.6039,y:216.8619},0).wait(1).to({scaleX:0.4913,scaleY:0.4913,x:727.0091,y:217.9387},0).wait(1).to({scaleX:0.4957,scaleY:0.4957,x:725.4143,y:219.0155},0).wait(1).to({scaleX:0.5002,scaleY:0.5002,x:723.8195,y:220.0922},0).wait(1).to({scaleX:0.5046,scaleY:0.5046,x:722.2247,y:221.169},0).wait(1).to({scaleX:0.5091,scaleY:0.5091,x:720.6299,y:222.2458},0).wait(1).to({scaleX:0.5135,scaleY:0.5135,x:719.035,y:223.3226},0).wait(1).to({scaleX:0.518,scaleY:0.518,x:717.4402,y:224.3993},0).wait(1).to({scaleX:0.5224,scaleY:0.5224,x:715.8454,y:225.4761},0).wait(1).to({scaleX:0.5268,scaleY:0.5268,x:714.2506,y:226.5529},0).wait(1).to({scaleX:0.5313,scaleY:0.5313,x:712.6558,y:227.6297},0).wait(1).to({scaleX:0.5357,scaleY:0.5357,x:711.061,y:228.7064},0).wait(1).to({scaleX:0.5402,scaleY:0.5402,x:709.4661,y:229.7832},0).wait(1).to({scaleX:0.5446,scaleY:0.5446,x:707.8713,y:230.86},0).wait(1).to({scaleX:0.5491,scaleY:0.5491,x:706.2765,y:231.9368},0).wait(1).to({scaleX:0.5535,scaleY:0.5535,x:704.6817,y:233.0135},0).wait(1).to({scaleX:0.558,scaleY:0.558,x:703.0869,y:234.0903},0).wait(1).to({scaleX:0.5624,scaleY:0.5624,x:701.4921,y:235.1671},0).wait(1).to({scaleX:0.5668,scaleY:0.5668,x:699.8972,y:236.2439},0).wait(1).to({scaleX:0.5713,scaleY:0.5713,x:698.3024,y:237.3206},0).wait(1).to({scaleX:0.5757,scaleY:0.5757,x:696.7076,y:238.3974},0).wait(1).to({scaleX:0.5802,scaleY:0.5802,x:695.1128,y:239.4742},0).wait(1).to({scaleX:0.5846,scaleY:0.5846,x:693.518,y:240.5509},0).wait(1).to({scaleX:0.5891,scaleY:0.5891,x:691.9231,y:241.6277},0).wait(1).to({scaleX:0.5935,scaleY:0.5935,x:690.3283,y:242.7045},0).wait(1).to({scaleX:0.598,scaleY:0.598,x:688.7335,y:243.7813},0).wait(1).to({scaleX:0.6024,scaleY:0.6024,x:687.1387,y:244.858},0).wait(1).to({scaleX:0.6068,scaleY:0.6068,x:685.5439,y:245.9348},0).wait(1).to({scaleX:0.6113,scaleY:0.6113,x:683.9491,y:247.0116},0).wait(1).to({scaleX:0.6157,scaleY:0.6157,x:682.3542,y:248.0884},0).wait(1).to({scaleX:0.6202,scaleY:0.6202,x:680.7594,y:249.1651},0).wait(1).to({scaleX:0.6246,scaleY:0.6246,x:679.1646,y:250.2419},0).wait(1).to({scaleX:0.6291,scaleY:0.6291,x:677.5698,y:251.3187},0).wait(1).to({scaleX:0.6335,scaleY:0.6335,x:675.975,y:252.3955},0).wait(1).to({scaleX:0.638,scaleY:0.638,x:674.3802,y:253.4722},0).wait(1).to({scaleX:0.6424,scaleY:0.6424,x:672.7853,y:254.549},0).wait(1).to({scaleX:0.6468,scaleY:0.6468,x:671.1905,y:255.6258},0).wait(1).to({scaleX:0.6513,scaleY:0.6513,x:669.5957,y:256.7026},0).wait(1).to({scaleX:0.6557,scaleY:0.6557,x:668.0009,y:257.7793},0).wait(1).to({scaleX:0.6602,scaleY:0.6602,x:666.4061,y:258.8561},0).wait(1).to({scaleX:0.6646,scaleY:0.6646,x:664.8113,y:259.9329},0).wait(1).to({scaleX:0.6691,scaleY:0.6691,x:663.2164,y:261.0097},0).wait(1).to({scaleX:0.6735,scaleY:0.6735,x:661.6216,y:262.0864},0).wait(1).to({scaleX:0.678,scaleY:0.678,x:660.0268,y:263.1632},0).wait(1).to({scaleX:0.6824,scaleY:0.6824,x:658.432,y:264.24},0).wait(1).to({scaleX:0.6868,scaleY:0.6868,x:656.8372,y:265.3167},0).wait(1).to({scaleX:0.6913,scaleY:0.6913,x:655.2423,y:266.3935},0).wait(1).to({scaleX:0.6957,scaleY:0.6957,x:653.6475,y:267.4703},0).wait(1).to({scaleX:0.7002,scaleY:0.7002,x:652.0527,y:268.5471},0).wait(1).to({scaleX:0.7046,scaleY:0.7046,x:650.4579,y:269.6238},0).wait(1).to({scaleX:0.7091,scaleY:0.7091,x:648.8631,y:270.7006},0).wait(1).to({scaleX:0.7135,scaleY:0.7135,x:647.2683,y:271.7774},0).wait(1).to({scaleX:0.718,scaleY:0.718,x:645.6734,y:272.8542},0).wait(1).to({scaleX:0.7224,scaleY:0.7224,x:644.0786,y:273.9309},0).wait(1).to({scaleX:0.7268,scaleY:0.7268,x:642.4838,y:275.0077},0).wait(1).to({scaleX:0.7313,scaleY:0.7313,x:640.889,y:276.0845},0).wait(1).to({scaleX:0.7357,scaleY:0.7357,x:639.2942,y:277.1613},0).wait(1).to({scaleX:0.7402,scaleY:0.7402,x:637.6994,y:278.238},0).wait(1).to({scaleX:0.7446,scaleY:0.7446,x:636.1045,y:279.3148},0).wait(1).to({scaleX:0.7491,scaleY:0.7491,x:634.5097,y:280.3916},0).wait(1).to({scaleX:0.7535,scaleY:0.7535,x:632.9149,y:281.4684},0).wait(1).to({scaleX:0.758,scaleY:0.758,x:631.3201,y:282.5451},0).wait(1).to({scaleX:0.7624,scaleY:0.7624,x:629.7253,y:283.6219},0).wait(1).to({scaleX:0.7668,scaleY:0.7668,x:628.1305,y:284.6987},0).wait(1).to({scaleX:0.7713,scaleY:0.7713,x:626.5356,y:285.7755},0).wait(1).to({scaleX:0.7757,scaleY:0.7757,x:624.9408,y:286.8522},0).wait(1).to({scaleX:0.7802,scaleY:0.7802,x:623.346,y:287.929},0).wait(33).to({regX:0.1,regY:0.1,scaleX:1,scaleY:1,x:639.75,y:359.7},0).to({_off:true},1).wait(1));

	// buttons_obj_
	this.buttons = new lib.Scene_1_buttons();
	this.buttons.name = "buttons";
	this.buttons.setTransform(640,360.9,1,1,0,0,0,640,360.9);
	this.buttons.depth = 0;
	this.buttons.isAttachedToCamera = 0
	this.buttons.isAttachedToMask = 0
	this.buttons.layerDepth = 0
	this.buttons.layerIndex = 0
	this.buttons.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.buttons).wait(121).to({regX:639.9,regY:360,scaleX:1.0001,scaleY:1.0001},0).wait(641).to({regX:623.2,regY:288.4,scaleX:1.2818,scaleY:1.2818,x:639.95,y:360.85},0).wait(25).to({regX:639.7,regY:360.6,scaleX:1,scaleY:1,x:640,y:360.95},0).wait(2));

	// Spots_Overlay_obj_
	this.Spots_Overlay = new lib.Scene_1_Spots_Overlay();
	this.Spots_Overlay.name = "Spots_Overlay";
	this.Spots_Overlay.depth = 0;
	this.Spots_Overlay.isAttachedToCamera = 0
	this.Spots_Overlay.isAttachedToMask = 0
	this.Spots_Overlay.layerDepth = 0
	this.Spots_Overlay.layerIndex = 1
	this.Spots_Overlay.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Spots_Overlay).wait(120).to({regX:-0.1,regY:-0.9,scaleX:1.0001,scaleY:1.0001,x:-0.05},0).wait(1).to({regX:690.2,regY:259.4,scaleX:1,scaleY:1,x:690.2,y:260.25},0).wait(126).to({regX:-0.1,regY:-0.9,scaleX:1.0001,scaleY:1.0001,x:-0.05,y:0},0).wait(127).to({_off:true},139).wait(276));

	// Drawing_obj_
	this.Drawing = new lib.Scene_1_Drawing();
	this.Drawing.name = "Drawing";
	this.Drawing.depth = 0;
	this.Drawing.isAttachedToCamera = 0
	this.Drawing.isAttachedToMask = 0
	this.Drawing.layerDepth = 0
	this.Drawing.layerIndex = 2
	this.Drawing.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Drawing).wait(316).to({regX:-0.1,regY:-0.9,scaleX:1.0001,scaleY:1.0001,x:-0.05},0).wait(1).to({regX:643.3,regY:1452.6,scaleX:1,scaleY:1,x:643.3,y:1453.45},0).wait(72).to({regX:68.5,regY:51.9,scaleX:1.1131,scaleY:1.1131,x:0.05,y:0},0).wait(1).to({regX:82.2,regY:62.1,scaleX:1.1388,scaleY:1.1388,x:0,y:-0.1},0).to({_off:true},123).wait(276));

	// Hand__obj_
	this.Hand_ = new lib.Scene_1_Hand_();
	this.Hand_.name = "Hand_";
	this.Hand_.depth = 0;
	this.Hand_.isAttachedToCamera = 0
	this.Hand_.isAttachedToMask = 0
	this.Hand_.layerDepth = 0
	this.Hand_.layerIndex = 3
	this.Hand_.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Hand_).wait(390).to({regX:82.2,regY:62.1,scaleX:1.1388,scaleY:1.1388,y:-0.1},0).wait(3).to({regX:123.3,regY:92.9,scaleX:1.2237,scaleY:1.2237,y:0},0).wait(3).to({regX:164.4,regY:123.7,scaleX:1.3223,scaleY:1.3223},0).wait(3).to({regX:205.6,regY:154.6,scaleX:1.4381,scaleY:1.4381,x:-0.05,y:0.1},0).wait(3).to({regX:233.1,regY:175.1,scaleX:1.5273,scaleY:1.5273,x:0.1,y:0.05},0).wait(33).to({regX:234,regY:174.2,scaleX:1.5301,scaleY:1.5301,y:-0.1},0).wait(28).to({regX:396.9,regY:36.4,scaleX:2.5831,scaleY:2.5831,x:0.05,y:0.15},0).wait(1).to({regX:773.3,regY:479.2,scaleX:1,scaleY:1,x:376.45,y:442.9},0).wait(48).to({_off:true},1).wait(276));

	// Camera_View_Man_obj_
	this.Camera_View_Man = new lib.Scene_1_Camera_View_Man();
	this.Camera_View_Man.name = "Camera_View_Man";
	this.Camera_View_Man.depth = 0;
	this.Camera_View_Man.isAttachedToCamera = 0
	this.Camera_View_Man.isAttachedToMask = 0
	this.Camera_View_Man.layerDepth = 0
	this.Camera_View_Man.layerIndex = 4
	this.Camera_View_Man.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Camera_View_Man).wait(248).to({regX:-0.1,regY:-0.9,scaleX:1.0001,scaleY:1.0001,x:-0.05},0).wait(1).to({regX:643.5,regY:441.6,scaleX:1,scaleY:1,x:643.5,y:442.45},0).wait(67).to({regX:-0.1,regY:-0.9,scaleX:1.0001,scaleY:1.0001,x:-0.05,y:0},0).to({_off:true},427).wait(46));

	// Side_View_Man_obj_
	this.Side_View_Man = new lib.Scene_1_Side_View_Man();
	this.Side_View_Man.name = "Side_View_Man";
	this.Side_View_Man.depth = 0;
	this.Side_View_Man.isAttachedToCamera = 0
	this.Side_View_Man.isAttachedToMask = 0
	this.Side_View_Man.layerDepth = 0
	this.Side_View_Man.layerIndex = 5
	this.Side_View_Man.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.Side_View_Man).wait(120).to({regX:-0.1,regY:-0.9,scaleX:1.0001,scaleY:1.0001,x:-0.05},0).wait(1).to({regX:262.8,regY:734.5,scaleX:1,scaleY:1,x:262.8,y:735.35},0).wait(127).to({regX:-0.1,regY:-0.9,scaleX:1.0001,scaleY:1.0001,x:-0.05,y:0},0).to({_off:true},79).wait(462));

	// first_scene_man_obj_
	this.first_scene_man = new lib.Scene_1_first_scene_man();
	this.first_scene_man.name = "first_scene_man";
	this.first_scene_man.depth = 0;
	this.first_scene_man.isAttachedToCamera = 0
	this.first_scene_man.isAttachedToMask = 0
	this.first_scene_man.layerDepth = 0
	this.first_scene_man.layerIndex = 6
	this.first_scene_man.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.first_scene_man).wait(17).to({regX:625.8,regY:441.1,x:625.8,y:441.1},0).wait(102).to({_off:true},1).wait(669));

	// spot_light_obj_
	this.spot_light = new lib.Scene_1_spot_light();
	this.spot_light.name = "spot_light";
	this.spot_light.depth = 0;
	this.spot_light.isAttachedToCamera = 0
	this.spot_light.isAttachedToMask = 0
	this.spot_light.layerDepth = 0
	this.spot_light.layerIndex = 7
	this.spot_light.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.spot_light).wait(316).to({regX:-0.1,regY:-0.9,scaleX:1.0001,scaleY:1.0001,x:-0.05},0).wait(58).to({_off:true},139).wait(276));

	// TEXT_obj_
	this.TEXT = new lib.Scene_1_TEXT();
	this.TEXT.name = "TEXT";
	this.TEXT.depth = 0;
	this.TEXT.isAttachedToCamera = 0
	this.TEXT.isAttachedToMask = 0
	this.TEXT.layerDepth = 0
	this.TEXT.layerIndex = 8
	this.TEXT.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.TEXT).wait(513).to({regX:-0.4,regY:-0.4,scaleX:1.0001,scaleY:1.0001,y:-0.05},0).wait(12).to({regX:0,regY:0,scaleX:1,scaleY:1,y:0},0).wait(39).to({_off:true},1).wait(224));

	// finish_obj_
	this.finish = new lib.Scene_1_finish();
	this.finish.name = "finish";
	this.finish.depth = 0;
	this.finish.isAttachedToCamera = 0
	this.finish.isAttachedToMask = 0
	this.finish.layerDepth = 0
	this.finish.layerIndex = 9
	this.finish.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.finish).wait(754).to({regX:124,regY:6.9,scaleX:1.2818,scaleY:1.2818,x:0.1,y:0.05},0).wait(20).to({_off:true},12).wait(3));

	// bg_museum_obj_
	this.bg_museum = new lib.Scene_1_bg_museum();
	this.bg_museum.name = "bg_museum";
	this.bg_museum.setTransform(665.1,373.7,1,1,0,0,0,665.1,373.7);
	this.bg_museum.depth = 0;
	this.bg_museum.isAttachedToCamera = 0
	this.bg_museum.isAttachedToMask = 0
	this.bg_museum.layerDepth = 0
	this.bg_museum.layerIndex = 10
	this.bg_museum.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.bg_museum).wait(120).to({regY:372.8,scaleX:1.0001,scaleY:1.0001,x:665.2},0).wait(1).to({regX:893.8,regY:462.1,scaleX:1,scaleY:1,x:893.85,y:463},0).wait(127).to({regX:665.1,regY:372.8,scaleX:1.0001,scaleY:1.0001,x:665.2,y:373.7},0).wait(265).to({regX:664.7,regY:373.3,x:665.15,y:373.65},0).wait(52).to({regX:721.8,regY:428.3,scaleX:2.0486,scaleY:2.0486,x:665.1,y:373.6},0).wait(74).to({regX:813.5,regY:167.7,scaleX:3.7169,scaleY:3.7169,x:665.2,y:373.55},0).to({_off:true},147).wait(3));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-1718,-233.6,5863.1,3041.5);
// library properties:
lib.properties = {
	id: '5FC4BBCBE5306A41B19472F31D93B0FB',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#E1E0D7",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_60.png?1619159190647", id:"CachedBmp_60"},
		{src:"images/CachedBmp_58.png?1619159190647", id:"CachedBmp_58"},
		{src:"images/CachedBmp_57.png?1619159190647", id:"CachedBmp_57"},
		{src:"images/CachedBmp_53.png?1619159190647", id:"CachedBmp_53"},
		{src:"images/CachedBmp_8.png?1619159190647", id:"CachedBmp_8"},
		{src:"images/CachedBmp_4.png?1619159190647", id:"CachedBmp_4"},
		{src:"images/cameraBG.png?1619159190647", id:"cameraBG"},
		{src:"images/GALLERY.png?1619159190647", id:"GALLERY"},
		{src:"images/copyrights_anitamalinsky_atlas_1.png?1619159190347", id:"copyrights_anitamalinsky_atlas_1"},
		{src:"images/copyrights_anitamalinsky_atlas_2.png?1619159190347", id:"copyrights_anitamalinsky_atlas_2"},
		{src:"images/copyrights_anitamalinsky_atlas_3.png?1619159190347", id:"copyrights_anitamalinsky_atlas_3"},
		{src:"images/copyrights_anitamalinsky_atlas_4.png?1619159190347", id:"copyrights_anitamalinsky_atlas_4"},
		{src:"images/copyrights_anitamalinsky_atlas_5.png?1619159190348", id:"copyrights_anitamalinsky_atlas_5"},
		{src:"images/copyrights_anitamalinsky_atlas_6.png?1619159190348", id:"copyrights_anitamalinsky_atlas_6"},
		{src:"images/copyrights_anitamalinsky_atlas_7.png?1619159190349", id:"copyrights_anitamalinsky_atlas_7"},
		{src:"sounds/Sound_Badguy.mp3?1619159190647", id:"Sound_Badguy"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['5FC4BBCBE5306A41B19472F31D93B0FB'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;