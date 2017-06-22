/*
 * Client JS for Accessible PencilCode Foundation
*/

// ------- Data ------- \\

var blocks_move = [
  {
    name: 'fd',
    desc: 'Move forward',
    params: [100]
  }, {
    name: 'rt',
    desc: 'Turn right',
    params: [90]
  }, {
    name: 'lt',
    desc: 'Turn left',
    params: [90]
  }, {
    name: 'bk',
    desc: 'Move backward',
    params: [100]
  }, {
    name: 'rt',
    desc: 'Make a wide right arc',
    params: [180, 100]
  }, {
    name: 'lt',
    desc: 'Make a wide left arc',
    params: [180, 100]
  }, {
    name: 'speed',
    desc: 'Set the speed of the turtle',
    params: [10]
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
    params: [270]
  }, {
    name: 'moveto',
    desc: 'Move to coordinates',
    params: [100, 50]
  }, {
    name: 'movexy',
    desc: 'Move by changing x and y',
    params: [30, 20]
  }, {
    name: 'jumpto',
    desc: 'Jump to coordinates without drawing',
    params: [100, 50]
  }, {
    name: 'jumpxy',
    desc: 'Jump changing x and y without drawing',
    params: [30, 20]
  }, {
    name: 'pause',
    desc: 'Do not move for five seconds',
    params: [5]
  }
];
var blocks_art = [
  {
    name: 'pen',
    desc: 'Set pen color and size',
    params: ['purple', 10]
  }, {
    name: 'dot',
    desc: 'Make a dot',
    params: ['green', 50]
  }, {
    name: 'box',
    desc: 'Make a square',
    params: ['yellow', 50]
  }, {
    name: 'fill',
    desc: 'Fill traced shape',
    params: ['blue']
  }, {
    name: 'wear',
    desc: 'Use an image for the turtle',
    params: ['apple']
  }, {
    name: 'img',
    desc: 'Write an image on the screen',
    params: ['/img/bird']
  }, {
    name: 'grow',
    desc: 'Grow the size of the turtle',
    params: ['3']
  }, {
    name: 'hide()',
    desc: 'Hide the main turtle',
    params: []
  }, {
    name: 'show()',
    desc: 'Show the main turtle',
    params: []
  }, {
    name: 'cs()',
    desc: 'Clear screen',
    params: []
  }, {
    name: 'pu()',
    desc: 'Lift the pen up',
    params: []
  }, {
    name: 'pd()',
    desc: 'Put the pen down',
    params: []
  }, {
    name: 'drawon',
    desc: 'Draw on sprite s',
    params: ['s']
  }, {
    name: 'drawon',
    desc: 'Draw on the document',
    params: ['document']
  }
];
var blocks_text = [];
var blocks_sound = [];
var blocks_control = [];
var blocks_operators = [];
var blocks_sprites = [];
var blocks_snippets = [];
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
    })
  },
  speech: {
    'category-link-1': new Howl({
      src: ['assets/category_move.mp3']
    }),
    'category-link-2': new Howl({
      src: ['assets/category_art.mp3']
    }),
    'category-link-3': new Howl({
      src: ['assets/category_text.mp3']
    }),
    'category-link-4': new Howl({
      src: ['assets/category_sound.mp3']
    }),
    'category-link-5': new Howl({
      src: ['assets/category_control.mp3']
    }),
    'category-link-6': new Howl({
      src: ['assets/category_operators.mp3']
    }),
    'category-link-7': new Howl({
      src: ['assets/category_sprites.mp3']
    }),
    'category-link-8': new Howl({
      src: ['assets/category_snippets.mp3']
    })
  },
  spearcon: {
    'category-link-1': new Howl({
      src: ['assets/spearcon_category_move.mp3']
    }),
    'category-link-2': new Howl({
      src: ['assets/spearcon_category_art.mp3']
    }),
    'category-link-3': new Howl({
      src: ['assets/spearcon_category_text.mp3']
    }),
    'category-link-4': new Howl({
      src: ['assets/spearcon_category_sound.mp3']
    }),
    'category-link-5': new Howl({
      src: ['assets/spearcon_category_control.mp3']
    }),
    'category-link-6': new Howl({
      src: ['assets/spearcon_category_operators.mp3']
    }),
    'category-link-7': new Howl({
      src: ['assets/spearcon_category_sprites.mp3']
    }),
    'category-link-8': new Howl({
      src: ['assets/spearcon_category_snippets.mp3']
    })
  }
};

// ------- Functions ------ \\

/*
 * get_auditory_method()
 * Sees which choice user selected on dropdown, returns choice
*/
function get_auditory_method() {
  return $("#auditorydisplayslist option:selected").attr('id');
}

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
      params += ' <code>' + blocks[i].params[j] + '</code>';
    }
    block_html_insert += '<li role="presentation" class="block" id="block-' + blocks[i].name + '" alt="' + blocks[i].desc + '"><a href="#" aria-label="' + blocks[i].desc + '">' + blocks[i].name + ' ' + params + '</a></li>';
  }
  $("#block-list").html(block_html_insert);
}

function play( sound, name ) {
  var method = get_auditory_method();
  if ( method == 'earcon' ) {
    sounds['earcon'][sound].play();
  } else if ( method == 'speech' ) {
    // if ( sound.indexOf('select') == -1 ) { // don't play when selecting
      sounds['speech'][name].play();
    // }
  } else if ( method == 'spearcon' ) {
    sounds['spearcon'][name].play();
  }
}

// ------- jQuery ------- \\

$("#category-list").on('focus', '.category', function( event ) {
  play('identifycategory', $(':focus').attr('id'));
})

/*
 * Bootstrap jQuery list selection
 * @author Jeffrey Wang
 * Derived from the Elephant codebase, also originally written by Jeffrey Wang
*/

$("#category-list").on('click', '.category', function( event ) {
  play('selectcategory', $(this).attr('id').substring(0,8) + "-link-" + $(this).attr('id').substring(9));
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

$("#block-list").on('focus', '.block', function( event ) {
  // do something on focus
  play('identifyblock', null);
  $(':focus').parent().addClass('active');
});

$("#block-list").on('focusout', '.block', function( event ) {
  // do something on focusout
  console.log($(this).attr('id'));
  $(this).removeClass('active');
});

$("#block-list").on('click', '.block', function( event ) {
  // do something on click
  play('selectblock', null);
});
