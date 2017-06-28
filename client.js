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
      params: [180, 100],
      id: 'rtarc'
    }, {
      name: 'lt',
      desc: 'Make a wide left arc',
      params: [180, 100],
      id: 'ltarc'
    }, {
      name: 'speed',
      desc: 'Set the speed of the turtle',
      params: [10]
    }, {
      name: 'speed',
      desc: 'Use infinite speed',
      params: ['Infinity'],
      id: 'infinitespeed'
    }, {
      name: 'home()',
      desc: 'Jump to the origin, turned up',
      params: [],
      id: 'home'
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
      params: [],
      id: 'hide'
    }, {
      name: 'show()',
      desc: 'Show the main turtle',
      params: [],
      id: 'show'
    }, {
      name: 'cs()',
      desc: 'Clear screen',
      params: [],
      id: 'cs'
    }, {
      name: 'pu()',
      desc: 'Lift the pen up',
      params: [],
      id: 'pu'
    }, {
      name: 'pd()',
      desc: 'Put the pen down',
      params: [],
      id: 'pd'
    }, {
      name: 'drawon',
      desc: 'Draw on sprite s',
      params: ['s'],
      id: 'drawonsprite'
    }, {
      name: 'drawon',
      desc: 'Draw on the document',
      params: ['document'],
      id: 'drawondoc'
    }
  ],
  text: [],
  sound: [],
  control: [
    {
     name: 'for',
     desc: 'For loop. Do something multiple times',
     id: 'for',
     params: ['1', '3', '{}']
    }, {
     name: 'for',
     desc: 'For in loop. Repeat something while counting up x',
     id: 'forin',
     params: ['x', '[0...10]', '{}']
    }, {
     name: 'while',
     desc: 'While loop. Repeat while a condition is true',
     id: 'while',
     params: ['a < b', '{}']
    }, {
     name: 'if',
     desc: 'If statement. Do something only if a condition is true',
     id: 'if',
     params: ['a is b', '{}']
    }, {
     name: 'if else',
     desc: 'If else statement. Do something if a condition is true, otherwise something else',
     id: 'ifelse',
     params: ['{}']
    }, {
     name: 'forever',
     desc: 'Forever loop. Repeat something forever at equally-spaced times',
     id: 'forever',
     params: [1, '{}']
    }, {
     name: 'button',
     desc: 'Make a button and do something when clicked',
     id: 'button',
     params: ['Click', '{}']
    }, {
     name: 'keydown',
     desc: 'Do something when a keyboard key is pressed',
     id: 'keydown',
     params: ['X', '{}']
    }, {
     name: 'click',
     desc: 'Do something when the mouse is clicked',
     id: 'click',
     params: ['e', '{}']
    }
  ],
  operators: [
    {
      name: '=',
      desc: 'Set a variable',
      params: ['x', 0],
      id: 'assign'
    }, {
      name: '+=',
      desc: 'Increase a variable',
      params: ['x', 1],
      id: 'increment'
    }, {
      name: 'f',
      desc: 'Define a new function',
      params: ['= (x)', '->', '{}'],
      id: 'funcdef'
    }, {
      name: 'f',
      desc: 'Use a custom function',
      params: ['(x)'],
      id: 'funccall'
    }, {
      name: 'is',
      desc: 'Compare two values',
      params: ['A', 'B'],
      id: 'is'
    }, {
      name: '<',
      desc: 'Compare two values',
      params: ['A', 'B'],
      id: 'lessthan'
    }, {
      name: '>',
      desc: 'Compare two values',
      params: ['A', 'B'],
      id: 'greaterthan'
    }, {
      name: '+',
      desc: 'Add two numbers',
      params: ['A', 'B'],
      id: 'add'
    }, {
      name: '-',
      desc: 'Subtract two numbers',
      params: ['A', 'B'],
      id: 'subtract'
    }, {
      name: '*',
      desc: 'Multiply two numbers',
      params: ['A', 'B'],
      id: 'multiply'
    }, {
      name: '/',
      desc: 'Divide two numbers',
      params: ['A', 'B'],
      id: 'divide'
    }, {
      name: 'and',
      desc: 'True if both are true',
      params: ['A', 'B'],
      id: 'and'
    }, {
      name: 'or',
      desc: 'True if either is true',
      params: ['A', 'B'],
      id: 'or'
    }, {
      name: 'not',
      desc: 'True if input is false',
      params: ['A'],
      id: 'not'
    }, {
      name: 'random',
      desc: 'Get a random number less than n',
      params: [6],
      id: 'random'
    }, {
      name: 'round',
      desc: 'Round to the nearest integer',
      params: ['A'],
      id: 'round'
    }, {
      name: 'abs',
      desc: 'Absolute value',
      params: ['A'],
      id: 'abs'
    }, {
      name: 'max',
      desc: 'Get the larger of two numbers',
      params: ['A', 'B'],
      id: 'max'
    }, {
      name: 'min',
      desc: 'Get the smaller on two numbers',
      params: ['A', 'B'],
      id: 'min'
    }, {
      name: 'match',
      desc: 'Test if a text pattern is found in a variable',
      params: ['/pattern/'],
      id: 'match'
    }
  ],
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
    'category-1': new Howl({
      src: ['assets/category_move.mp3']
    }),
    'category-2': new Howl({
      src: ['assets/category_art.mp3']
    }),
    'category-3': new Howl({
      src: ['assets/category_text.mp3']
    }),
    'category-4': new Howl({
      src: ['assets/category_sound.mp3']
    }),
    'category-5': new Howl({
      src: ['assets/category_control.mp3']
    }),
    'category-6': new Howl({
      src: ['assets/category_operators.mp3']
    }),
    'category-7': new Howl({
      src: ['assets/category_sprites.mp3']
    }),
    'category-8': new Howl({
      src: ['assets/category_snippets.mp3']
    })
  },
  spearcon: {
    'nestingopening': new Howl({
      src: ['assets/spearcon_nesting_opening.mp3']
    }),
    'nestingclosing': new Howl({
      src: ['assets/spearcon_nesting_closing.mp3']
    }),
    'category-1': new Howl({
      src: ['assets/spearcon_category_move.mp3']
    }),
    'category-2': new Howl({
      src: ['assets/spearcon_category_art.mp3']
    }),
    'category-3': new Howl({
      src: ['assets/spearcon_category_text.mp3']
    }),
    'category-4': new Howl({
      src: ['assets/spearcon_category_sound.mp3']
    }),
    'category-5': new Howl({
      src: ['assets/spearcon_category_control.mp3']
    }),
    'category-6': new Howl({
      src: ['assets/spearcon_category_operators.mp3']
    }),
    'category-7': new Howl({
      src: ['assets/spearcon_category_sprites.mp3']
    }),
    'category-8': new Howl({
      src: ['assets/spearcon_category_snippets.mp3']
    }),
    'selected': new Howl({
      src: ['assets/spearcon_selected.mp3']
    }),
    'block-bk': new Howl({
      src: ['assets/Blocks/move/bk.mp3']
    }),
    'block-cs': new Howl({
      src: ['assets/Blocks/move/cs.mp3']
    }),
    'block-fd': new Howl({
      src: ['assets/Blocks/move/fd.mp3']
    }),
    'block-home': new Howl({
      src: ['assets/Blocks/move/home.mp3']
    }),
    'block-infinitespeed': new Howl({
      src: ['assets/Blocks/move/infinitespeed.mp3']
    }),
    'block-jumpto': new Howl({
      src: ['assets/Blocks/move/jumpto.mp3']
    }),
    'block-jumpxy': new Howl({
      src: ['assets/Blocks/move/jumpxy.mp3']
    }),
    'block-lt': new Howl({
      src: ['assets/Blocks/move/lt.mp3']
    }),
    'block-movexy': new Howl({
      src: ['assets/Blocks/move/movexy.mp3']
    }),
    'block-moveto': new Howl({
      src: ['assets/Blocks/move/moveto.mp3']
    }),
    'block-pause': new Howl({
      src: ['assets/Blocks/move/pause.mp3']
    }),
    'block-rtarc': new Howl({
      src: ['assets/Blocks/move/rtarc.mp3']
    }),
    'block-rt': new Howl({
      src: ['assets/Blocks/move/rt.mp3']
    }),
    'block-speed': new Howl({
      src: ['assets/Blocks/move/speed.mp3']
    }),
    'block-turnto': new Howl({
      src: ['assets/Blocks/move/turnto.mp3']
    }),
    'block-ltarc': new Howl({
      src: ['assets/Blocks/move/ltarc.mp3']
    }),
    'block-button': new Howl({
      src: ['assets/Blocks/control/button.mp3']
    }),
    'block-click': new Howl({
      src: ['assets/Blocks/control/click.mp3']
    }),
    'block-for': new Howl({
      src: ['assets/Blocks/control/for.mp3']
    }),
    'block-if': new Howl({
      src: ['assets/Blocks/control/if.mp3']
    }),
    'block-forever': new Howl({
      src: ['assets/Blocks/control/forever.mp3']
    }),
    'block-ifelse': new Howl({
      src: ['assets/Blocks/control/ifelse.mp3']
    }),
    'block-keydown': new Howl({
      src: ['assets/Blocks/control/keydown.mp3']
    }),
    'block-while': new Howl({
      src: ['assets/Blocks/control/while.mp3']
    }),
    'block-forin': new Howl({
      src: ['assets/Blocks/control/forin.mp3']
    }),
    'block-dot': new Howl({
      src: ['assets/Blocks/art/dot.mp3']
    }),
    'block-drawondoc': new Howl({
      src: ['assets/Blocks/art/drawondoc.mp3']
    }),
    'block-drawonsprite': new Howl({
      src: ['assets/Blocks/art/drawonsprite.mp3']
    }),
    'block-fill': new Howl({
      src: ['assets/Blocks/art/fill.mp3']
    }),
    'block-img': new Howl({
      src: ['assets/Blocks/art/img.mp3']
    }),
    'block-pd': new Howl({
      src: ['assets/Blocks/art/pd.mp3']
    }),
    'block-pen': new Howl({
      src: ['assets/Blocks/art/pen.mp3']
    }),
    'block-pu': new Howl({
      src: ['assets/Blocks/art/pu.mp3']
    }),
    'block-show': new Howl({
      src: ['assets/Blocks/art/show.mp3']
    }),
    'block-box': new Howl({
      src: ['assets/Blocks/art/box.mp3']
    }),
    'block-wear': new Howl({
      src: ['assets/Blocks/art/wear.mp3']
    }),
    'block-grow': new Howl({
      src: ['assets/Blocks/art/grow.mp3']
    }),
    'block-hide': new Howl({
      src: ['assets/Blocks/art/hide.mp3']
    }),
    'block-abs': new Howl({
      src: ['assets/Blocks/operators/abs.mp3']
    }),
    'block-add': new Howl({
      src: ['assets/Blocks/operators/add.mp3']
    }),
    'block-and': new Howl({
      src: ['assets/Blocks/operators/and.mp3']
    }),
    'block-subtract': new Howl({
      src: ['assets/Blocks/operators/subtract.mp3']
    }),
    'block-is': new Howl({
      src: ['assets/Blocks/operators/is.mp3']
    }),
    'block-greaterthan': new Howl({
      src: ['assets/Blocks/operators/greaterthan.mp3']
    }),
    'block-lessthan': new Howl({
      src: ['assets/Blocks/operators/lessthan.mp3']
    }),
    'block-funccall': new Howl({
      src: ['assets/Blocks/operators/funccall.mp3']
    }),
    'block-funcdef': new Howl({
      src: ['assets/Blocks/operators/funcdef.mp3']
    }),
    'block-divide': new Howl({
      src: ['assets/Blocks/operators/divide.mp3']
    }),
    'block-increment': new Howl({
      src: ['assets/Blocks/operators/increment.mp3']
    }),
    'block-max': new Howl({
      src: ['assets/Blocks/operators/max.mp3']
    }),
    'block-min': new Howl({
      src: ['assets/Blocks/operators/min.mp3']
    }),
    'block-multiply': new Howl({
      src: ['assets/Blocks/operators/multiply.mp3']
    }),
    'block-not': new Howl({
      src: ['assets/Blocks/operators/not.mp3']
    }),
    'block-or': new Howl({
      src: ['assets/Blocks/operators/or.mp3']
    }),
    'block-random': new Howl({
      src: ['assets/Blocks/operators/random.mp3']
    }),
    'block-round': new Howl({
      src: ['assets/Blocks/operators/round.mp3']
    }),
    'block-assign': new Howl({
      src: ['assets/Blocks/operators/assign.mp3']
    }),
    'block-match': new Howl({
      src: ['assets/Blocks/operators/match.mp3']
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
      ])
    ]
  },
  '1-1-A': {
    program: [
      new Block( 'art', 'pen', ['green', 10] ),
      new Block( 'operators', 'assign', ['x', 30] ),
      new Block( 'control', 'while', ['x', '90'], [
        new Block( 'operators', 'increment', ['x', 1] )
      ]),
      new Block( 'control', 'ifelse', [new Block('operators', 'lessthan', [new Block('operators', 'multiply', ['x', 3]), 271])], [
        new Block( 'move', 'turnto', [270] )
      ] ),
      new Block( 'move', 'fd', [100] )
    ]
  },
  '1-1-B': {
    program: [
      new Block( 'art', 'pen', ['purple', 10] ),
      new Block( 'operators', 'assign', ['x', 3] ),
      new Block( 'control', 'ifelse', [new Block('operators', 'is', ['x', 4])], [
        new Block( 'control', 'for', ['1', '4'], [
          new Block( 'move', 'fd', [200] ),
          new Block( 'move', 'lt', [90] )
        ])
      ]),
      new Block('control', 'for', ['1', '3'], [
        new Block('move', 'fd', [100]),
        new Block('move', 'rt', [90])
      ]),
      new Block('move', 'lt', [90]),
      new Block('move', 'rtarc', [180, 50])
    ]
  }
};

var ti = 10;

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

Block.prototype.codify = function( tabindex ) {
  return '<li role="presentation" class="block block-[' + this.name + ']" id="block-' + this.name + '" alt="' + this.desc + '"><a href="#" tabindex="' + tabindex + '" aria-label="' + this.name + ". " + sonify_params( this.params ) + ". " + this.desc + ' ">' + this.name + ': ' + codify_params( this.params ) + '</a></li>';
}

Block.prototype.codifyBasics = function() {
  return '(' + this.name + ': ' + codify_params( this.params ) + ')';
}

// ------- Functions ------ \\

function codify_params( params ) {
  var paramcode = '';
  for ( var j = 0; j < params.length; j++ ) {
    if ( typeof params[j] === 'object' ) {
      paramcode += params[j].codifyBasics();
    } else {
      paramcode += ' <code>' + params[j] + '</code>';
    }
  }
  return paramcode;
}

function sonify_params( params ) {
  var sonified = '';
  for ( var j = 0; j < params.length; j++ ) {
    if ( typeof params[j] === 'object' ) {
      sonified += params[j].name + " " + sonify_params( params[j].params );
    } else {
      sonified += params[j] + ", ";
    }
  }
  return sonified;
}

function codify_program( program, nesting, tabindex ) {
  var block_html_insert = '';
  for ( var i = 0; i < program.length; i++ ) {
    block_html_insert += program[i].codify( tabindex++ );
    if ( program[i]['statements'] !== null ) { // nesting
      block_html_insert += '<div class="nesting nesting-' + (nesting + 1) + '" aria-label="nesting open" id="nesting-' + (nesting + 1) + '" tabindex="' + tabindex++ + '"></div>';
      block_html_insert += codify_program( program[i]['statements'], nesting + 1, tabindex );
      tabindex += program[i]['statements'].length;
      block_html_insert += '<div class="nestingend nestingend-' + (nesting + 1) + '" aria-label="close nesting" id="nesting-' + (nesting + 1) + '" tabindex="' + tabindex++ + '"></div>';
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
    var blockid = blocks[i].name;
    if ( blocks[i].id !== undefined ) {
      blockid = blocks[i].id;
    }
    block_html_insert += '<li role="presentation" class="block block-[' + blockid + ']" id="block-' + i + '" alt="' + blocks[i].desc + '"><p class="block-link" id="block-link-' + i + '" tabindex="' + ti++ + '" aria-label="' + blocks[i].desc + '">' + blocks[i].name + ' ' + params + '</p></li>';
  }
  $("#block-list").html(block_html_insert);
}

function update_program_sequence( program_name ) {
  var program = programs[program_name]['program'];
  var block_html_insert = codify_program( program, 0, ti + 100 );
  $("#program-sequence").html(block_html_insert);
}

function play( sound, name, override ) {
  var method = get_auditory_method();
  if ( override !== undefined ) {
    method = override;
  }

  if ( ( method == 'speech' || method == 'spearcon' ) && name !== null ) {
    var index = name.indexOf( 'link' );
    if ( index !== -1 ) {
      name = name.substring(0, index) + name.substring(index + 5);
    } else {
      var index2 = name.indexOf( 'block-[' );
      var index3 = name.indexOf( ']' );
      var blockid = name.substring(index2 + 7, index3);
      console.log( blockid );
      name = "block-" + blockid;
      override = null;
    }
  }

  if ( method == 'earcon' ) {
    sounds['earcon'][sound].play();
  } else if ( method == 'speech' ) {
    // if ( sound.indexOf('select') == -1 ) { // don't play when selecting
      sounds['speech'][name].play();
    // }
  } else if ( method == 'spearcon' ) {
    if ( override == 'spearcon' ) {
      sounds['spearcon'][sound].play();
    } else {
      if ( sound == 'selectcategory' || sound == 'selectblock' ) {
        sounds['spearcon']['selected'].play();
      } else {
        sounds['spearcon'][name].play();
      }
    }
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

function selectcategory ( event, thisObj, focusOnBlock ) {
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
  focusOnBlock();
}

$("#category-list").on('click', '.category', function( event ) {
  selectcategory(event, $(this), function() {
    setTimeout(function() {
      $("#block-0").focus();
    }, 0);
  });
});
$("#category-list").on('keydown', '.category', function( event ) {
  if ( event.keyCode === 13 ) { // keycode 13 = enter key
    selectcategory(event, $(this), function() {
      setTimeout(function() {
        $("#block-0").focus();
      }, 0);
    });
  }
});

$("#block-list").on('focus', '.block', function( event ) {
  // do something on focus
  var blockclasses = $(this).attr("class");
  var blockidwherebegin = blockclasses.indexOf("block-[");
  var blockidwhereend = blockclasses.indexOf("]");
  var blockid = blockclasses.substring(blockidwherebegin + 7, blockidwhereend);
  play('identifyblock', 'block-' + blockid);
  $(':focus').parent().addClass('active');
});

$("#block-list").on('focusout', '.block', function( event ) {
  // do something on focusout
  $(this).removeClass('active');
});

$("#program-sequence").on('focus', '.block', function( event ) {
  // do something on focus
  var blockclasses = $(this).attr("class");
  var blockidwherebegin = blockclasses.indexOf("block-[");
  var blockidwhereend = blockclasses.indexOf("]");
  var blockid = blockclasses.substring(blockidwherebegin + 7, blockidwhereend);
  play('identifyblock', 'block-' + blockid);
  // play('identifyblock', null); // TODO: use this audible icon??
  $(':focus').parent().addClass('active');
});

$("#program-sequence").on('focusout', '.block', function( event ) {
  // do something on focusout
  $(this).removeClass('active');
});

// TODO: get it to work

var nestingopening = function( event ) {
  play('nestingopening', null, get_auditory_method());
}
var nestingclosing = function( event ) {
  play('nestingclosing', null, get_auditory_method());
}
$("#program-sequence").on('focus', '.nesting', nestingopening);
// $("#program-sequence").off('focus', '.nesting', nestingclosing);
// TODO: get this to work
$("#program-sequence").on('focus', '.nestingend', nestingclosing);
// $("#program-sequence").off('focusout', '.nesting', nestingopening);

function selectblock( event, thisObj ) {
  // do something on click
  var blockclasses = thisObj.attr("class");
  var blockidwherebegin = blockclasses.indexOf("block-[");
  var blockidwhereend = blockclasses.indexOf("]");
  var blockid = blockclasses.substring(blockidwherebegin + 7, blockidwhereend);
  play('selectblock', 'block-' + blockid);
}

$("#block-list").on('click', '.block', function(event) {
  selectblock(event, $(this));
});

$("#block-list").on('keydown', '.block', function( event ) {
  if ( event.keyCode === 13 ) { // keycode 13 = enter key
    selectblock(event, $(this));
  }
});

/*
$("#program-sequence").on('keydown', '.block', function( event ) {
  if ( event.key === "ArrowDown" ) {
    var previd = $(':focus').attr('id');
    $('')
  }
});
*/

$("#category-list").on('keydown', '.category', function( event ) {
  if ( event.key === "/" && get_auditory_method() === 'earcon' ) {
    console.log($(this).attr('id'));
    play('identifycategory', $(this).attr('id'), 'speech');
  }
});

$("#block-list").on('keydown', '.block', function( event ) {
  if ( event.key === "/" && get_auditory_method() === 'earcon' ) {
    console.log($(this).attr('class'));
    play('identifyblock', $(this).attr('class'), 'spearcon'); // TODO: change back to speech and class -> id once we gain speech audio tracks
  }
});

$("#program-sequence").on('keydown', '.block', function( event ) {
  if ( event.key === "/" && get_auditory_method() === 'earcon' ) {
    play('identifyblock', $(this).attr('class'), 'spearcon'); // TODO: change back to speech and class -> id once we gain speech audio tracks
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

$("body").on('change', '#programlist', function( event ) {
  update_program_sequence( $('#programlist option:selected').attr('id') );
});
