/*
 * Client JS for Accessible PencilCode Foundation
*/

var blocks_move = [
  {
    name: 'fd',
    desc: 'Move forward',
    params: ['100']
  }, {
    name: 'rt',
    desc: 'Turn right',
    params: ['90']
  }, {
    name: 'lt',
    desc: 'Turn left',
    params: ['90']
  }, {
    name: 'bk',
    desc: 'Move backward',
    params: ['100']
  }, {
    name: 'rt',
    desc: 'Make a wide right arc',
    params: ['180', '100']
  }, {
    name: 'lt',
    desc: 'Make a wide left arc',
    params: ['180', '100']
  }, {
    name: 'speed',
    desc: 'Set the speed of the turtle',
    params: ['10']
  }, {
    name: 'speed',
    desc: 'Use infinite speed',
    params: ['Infinity']
  }, {
    name: 'home()',
    desc: 'Jump to the origin, turned up',
    params: []
  }, {
    name: 'turnto',
    desc: 'Turn to an absolute direction',
    params: ['270']
  }, {
    name: 'moveto',
    desc: 'Move to coordinates',
    params: ['100', '50']
  }, {
    name: 'movexy',
    desc: 'Move by changing x and y',
    params: ['30', '20']
  }, {
    name: 'jumpto',
    desc: 'Jump to coordinates without drawing',
    params: ['100', '50']
  }, {
    name: 'jumpxy',
    desc: 'Jump changing x and y without drawing',
    params: ['30', '20']
  }, {
    name: 'pause',
    desc: 'Do not move for five seconds',
    params: ['5']
  }
];
var blocks_art = [
  {
    name: 'pen',
    desc: 'Set pen color and size',
    params: ['']
  }, {
    name: 'dot',
    desc: 'Make a dot',
    params: ['']
  }
];
var blocks_text = [];
var blocks_sound = [];
var sounds = {
  identifyblock: new Howl({
    src: ['assets/IdentifyBlock.m4a']
  }),
  selectblock: new Howl({
    src: ['assets/SelectBlock.m4a']
  })
};

function update_block_list( category_id_full ) {
  var category_id = category_id_full.substring(9);
  block_html_insert = "";
  var blocks = [];
  if ( category_id == 1 ) {
    blocks = blocks_move;
  } else if ( category_id == 2 ) {
    blocks = blocks_art;
  }
  for ( var i = 0; i < blocks.length; i++ ) {
    var params = '';
    for ( var j = 0; j < blocks[i].params.length; j++ ) {
      params += ' <code>' + blocks[i].params[0] + '</code>';
    }
    block_html_insert += '<li role="presentation" class="block" id="block-' + blocks[i].name + '" alt="' + blocks[i].desc + '"><a href="#" aria-label="' + blocks[i].desc + '">' + blocks[i].name + ' ' + params + '</a></li>';
  }
  $("#block-list").html(block_html_insert);

}

/*
 * Bootstrap jQuery list selection
 * @author Jeffrey Wang
 * Derived from the Elephant codebase, also originally written by Jeffrey Wang
*/

$("#category-list").on('click', '.category', function( event ) {
  if ( !$(this).hasClass("active") ) {
    $(".category").each(function(index, el) {
      if ( $(el).hasClass("category-active") ) {
        $(el).removeClass("category-active").removeClass("active");
      }
    });
    $(this).addClass("category-active").addClass("active");
    update_block_list($(this).attr('id'));
     // pull content for selected category into the pane
  }
});

$("#block-list").on('hover', '.block', function( event ) {
  // do something on hover
  // probably play audio
  sounds.identifyblock.play();
});

$("#block-list").on('click', '.block', function( event ) {
  // do something on click
  sounds.selectblock.play();
});
