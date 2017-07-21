var sounds = {
  earcon: {
    identifyblock: new Howl({
      src: ['assets/IdentifyBlock.m4a']
    }),
    selectblock: new Howl({
      src: ['assets/SelectBlock.m4a']
    }),
    identifycategory: new Howl({
      src: ['assets/IdentifyCategory.m4a']
    }),
    selectcategory: new Howl({
      src: ['assets/SelectCategory_short.m4a']
    }),
    nestingopening: new Howl({
      src: ['assets/Nesting-Opening.mp3']
    }),
    nestingclosing: new Howl({
      src: ['assets/Nesting-Closing.mp3']
    })
  }
};

function play( sound ) {
  sounds['earcon'][sound].play();
}

$('#a').click(function(){
  play('identifycategory');
});

$('#b').click(function(){
  play('identifyblock');
});

$('#c').click(function(){
  play('selectcategory');
});

$('#d').click(function(){
  play('selectblock');
});
