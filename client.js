/*
 * Client JS for Accessible PencilCode Foundation
*/

// ------- Data ------- \\

var blocklist = {
  move: [
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
  ],
  art: [
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
  ],
  text: [],
  sound: [],
  control: [
    {
     name: 'for',
     desc: 'For loop. Do something multiple times',
     params: ['1', '3', '{}']
    }, {
     name: 'for in',
     desc: 'For in loop. Repeat something while counting up x',
     params: ['x', '[0...10]', '{}']
    }, {
     name: 'while',
     desc: 'While loop. Repeat while a condition is true',
     params: ['a < b', '{}']
    }, {
     name: 'if',
     desc: 'If statement. Do something only if a condition is true',
     params: ['a is b', '{}']
    }, {
     name: 'if else',
     desc: 'If else statement. Do something if a condition is true, otherwise something else',
     params: ['{}']
    }, {
     name: 'forever',
     desc: 'Forever loop. Repeat something forever at equally-spaced times',
     params: [1, '{}']
    }, {
     name: 'button',
     desc: 'Make a button and do something when clicked',
     params: ['Click', '{}']
    }, {
     name: 'keydown',
     desc: 'Do something when a keyboard key is pressed',
     params: ['X', '{}']
    }, {
     name: 'click',
     desc: 'Do something when the mouse is clicked',
     params: ['e', '{}']
    }
  ],
  operators: [],
  sprites: [],
  snippets: []
};
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

var programs = {
  'example': {
    program: [
      new Block( 'art', 'pen', ['red'] ),
      new Block( 'move', 'speed', [2] ),
      new Block( 'control', 'for', ['1', '25'], [
        new Block( 'move', 'fd', [100] ),
        new Block( 'move', 'rt', [88] )
      ] )
    ]
  }
};

// ------- Classes and prototypes ------- \\

function Block( category, name, params, statements, desc ) {
  this.category = category;
  this.name = name;
  this.desc = "Generic block";
  this.params = [];
  this.statements = null;
  function getBlock( element, index, array ) {
    if ( name == element['name'] ) {
      return element;
    }
  }
  if ( blocklist[category].find(getBlock) !== undefined ) {
    var blocktemp = blocklist[category].find(getBlock);
    this.desc = blocktemp['desc'];
    this.params = blocktemp['params'];
  }
  if ( params !== undefined ) {
    this.params = params;
  }
  if ( desc !== undefined ) {
    this.desc = desc;
  }
  if ( statements !== undefined ) {
    this.statements = statements;
  }
}

Block.prototype.codify = function() {
  return '<li role="presentation" class="block" id="block-' + this.name + '" alt="' + this.desc + '"><a href="#" aria-label="' + this.name + ". " + sonify_params( this.params ) + ". " + this.desc + ' ">' + this.name + ': ' + codify_params( this.params ) + '</a></li>';
}

// ------- Functions ------ \\

function codify_params( params ) {
  var paramcode = '';
  for ( var j = 0; j < params.length; j++ ) {
    paramcode += ' <code>' + params[j] + '</code>';
  }
  return paramcode;
}

function sonify_params( params ) {
  var sonified = '';
  for ( var j = 0; j < params.length; j++ ) {
    sonified += params[j] + ", ";
  }
  return sonified;
}

function codify_program( program, nesting ) {
  var block_html_insert = '';
  for ( var i = 0; i < program.length; i++ ) {
    block_html_insert += program[i].codify();
    if ( program[i]['statements'] !== null ) { // nesting
      block_html_insert += '<div class="nav nav-pills nav-stacked nesting nesting-' + (nesting + 1) + '" id="nesting-' + (nesting + 1) + '">';
      block_html_insert += codify_program( program[i]['statements'], nesting + 1 );
      block_html_insert += '</div>';
    }
  }
  return block_html_insert;
}

/*
 * get_auditory_method()
 * Sees which choice user selected on dropdown, returns choice
*/
function get_auditory_method() {
  return $("#auditorydisplayslist option:selected").attr('id');
}

function update_block_list( category_id_full ) {
  var category_id = category_id_full.substring(9);
  var block_html_insert = "";
  var blocks = [];
  var catnumtoname = ['move', 'art', 'text', 'sound', 'control', 'operators', 'sprites', 'snippets'];
  blocks = blocklist[catnumtoname[category_id - 1]];
  for ( var i = 0; i < blocks.length; i++ ) {
    var params = codify_params( blocks[i].params );
    block_html_insert += '<li role="presentation" class="block" id="block-' + i + '" alt="' + blocks[i].desc + '"><a href="#" aria-label="' + blocks[i].desc + '">' + blocks[i].name + ' ' + params + '</a></li>';
  }
  $("#block-list").html(block_html_insert);
}

function update_program_sequence( program_name ) {
  var program = programs[program_name]['program'];
  var block_html_insert = codify_program( program, 0 );
  $("#program-sequence").html(block_html_insert);
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

function selectcategory ( event, thisObj ) {
  play('selectcategory', thisObj.attr('id').substring(0,8) + "-link-" + thisObj.attr('id').substring(9));
  if ( !thisObj.hasClass("active") ) {
    $(".category").each(function(index, el) {
      if ( $(el).hasClass("category-active") ) {
        $(el).removeClass("category-active").removeClass("active");
      }
    });
    thisObj.addClass("category-active").addClass("active");
    update_block_list(thisObj.attr('id'));
     // pull content for selected category into the pane
  }
};

$("#category-list").on('click', '.category', function( event ) {
  selectcategory( event, $(this) );
});
$("#category-list").on('keydown', '.category', function( event ) {
  if ( event.keyCode === 13 ) { // keycode 13 = enter key
    console.log("13!");
    selectcategory( event, $(this) );
  }
});

$("#block-list").on('focus', '.block', function( event ) {
  // do something on focus
  play('identifyblock', null);
  $(':focus').parent().addClass('active');
});

$("#block-list").on('focusout', '.block', function( event ) {
  // do something on focusout
  $(this).removeClass('active');
});

$("#program-sequence").on('focus', '.block', function( event ) {
  // do something on focus
  play('identifyblock', null); // TODO: use this audible icon??
  $(':focus').parent().addClass('active');
});

$("#program-sequence").on('focusout', '.block', function( event ) {
  // do something on focusout
  $(this).removeClass('active');
});

// TODO: get it to work

var nestingopening = function( event ) {
  play('nestingopening', null);
}
var nestingclosing = function( event ) {
  play('nestingclosing', null);
}
$("#program-sequence").on('focus', '.nesting', nestingopening);
// $("#program-sequence").off('focus', '.nesting', nestingclosing);
// TODO: get this to work
$("#program-sequence").on('focusout', '.nesting', nestingclosing);
// $("#program-sequence").off('focusout', '.nesting', nestingopening);

$("#block-list").on('click', '.block', function( event ) {
  // do something on click
  play('selectblock', null);
});

$("#program-sequence").on('keydown', '.block', function( event ) {
  if ( event.key === "ArrowDown" ) {
    $(':focus');
  }
});

// Prevent scrolling when pressing arrow keys
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var keyCode = evt.keyCode;
    if (keyCode >= 37 && keyCode <= 40) {
        return false;
    }
};
