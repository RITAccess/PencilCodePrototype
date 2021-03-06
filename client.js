/*
 * Client JS for Accessible PencilCode Foundation
*/

// ------- Data ------- \\

// initialize browser's speech synthesis API for sonifying earcon and spearcon data
var ss = window.speechSynthesis;

// list of Pencil Code blocks, taken from Pencil Code's codebase
// name: block's shortened name
// desc: block description
// id: unique identifier for block (for when blocks share the same shortened name)
// params: default params displayed when enumerated in block selection module
// aural: how it should be pronounced by screen reader
// displayas: used for when the block should be displayed a special way (for instance, binary operators)
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
     params: ['x', '[0...10]', '{}'],
     aural: 'for in'
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
     name: 'elseif',
     desc: 'If else statement. Do something if a condition is true, otherwise something else',
     id: 'elseif',
     params: ['{}'],
     aural: 'else if'
    }, {
     name: 'else',
     desc: 'If else statement. Do something if a condition is true, otherwise something else',
     id: 'else',
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
      id: 'assign',
      displayas: 'binaryoperator',
      aural: 'equals'
    }, {
      name: '+=',
      desc: 'Increase a variable',
      params: ['x', 1],
      id: 'increment',
      displayas: 'binaryoperator',
      aural: 'plus equals'
    }, {
      name: 'f',
      desc: 'Define a new function',
      params: ['= (x)', '->', '{}'],
      id: 'funcdef',
      displayas: 'funcdef',
      aural: 'function f defined as'
    }, {
      name: 'f',
      desc: 'Use a custom function',
      params: ['(x)'],
      id: 'funccall',
      displayas: 'funccall',
      aural: 'f of x'
    }, {
      name: 'is',
      desc: 'Compare two values',
      params: ['A', 'B'],
      id: 'is',
      displayas: 'binaryoperator',
      aural: 'is'
    }, {
      name: '<',
      desc: 'Compare two values',
      params: ['A', 'B'],
      id: 'lessthan',
      displayas: 'binaryoperator',
      aural: 'less than'
    }, {
      name: '>',
      desc: 'Compare two values',
      params: ['A', 'B'],
      id: 'greaterthan',
      displayas: 'binaryoperator',
      aural: 'greater than'
    }, {
      name: '+',
      desc: 'Add two numbers',
      params: ['A', 'B'],
      id: 'add',
      displayas: 'binaryoperator',
      aural: 'plus'
    }, {
      name: '-',
      desc: 'Subtract two numbers',
      params: ['A', 'B'],
      id: 'subtract',
      displayas: 'binaryoperator',
      aural: 'minus'
    }, {
      name: '*',
      desc: 'Multiply two numbers',
      params: ['A', 'B'],
      id: 'multiply',
      displayas: 'binaryoperator',
      aural: 'times'
    }, {
      name: '/',
      desc: 'Divide two numbers',
      params: ['A', 'B'],
      id: 'divide',
      displayas: 'binaryoperator',
      aural: 'divided by'
    }, {
      name: 'and',
      desc: 'True if both are true',
      params: ['A', 'B'],
      id: 'and',
      displayas: 'binaryoperator',
      aural: 'and'
    }, {
      name: 'or',
      desc: 'True if either is true',
      params: ['A', 'B'],
      id: 'or',
      displayas: 'binaryoperator',
      aural: 'or'
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

// Sounds
// each sound is a Howler.js object, which is instantiated with a specific src to the sound file
// sounds can be either earcons, speech (unused), or spearcons
// sounds implemented in browser with Howler.js

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
      src: ['assets/SelectCategory_twonotehigh.m4a']
    }),
    nestingopening: new Howl({
      src: ['assets/nesting-opening-PAN.wav']
    }),
    nestingclosing: new Howl({
      src: ['assets/nesting-closing-PAN.wav']
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
    'startofprogram': new Howl({
      src: ['assets/startofprogram.mp3']
    }),
    'endofprogram': new Howl({
      src: ['assets/endofprogram.mp3']
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
      src: ['assets/Blocks/control/forever2.mp3']
    }),
    'block-elseif': new Howl({
      src: ['assets/Blocks/control/elseif3.mp3']
    }),
    'block-else': new Howl({
      src: ['assets/Blocks/control/else.mp3']
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
    }),
    'nesting-0': new Howl({
      src: ['assets/nesting-0.mp3']
    }),
    'nesting-1': new Howl({
      src: ['assets/nesting-1.mp3']
    }),
    'nesting-2': new Howl({
      src: ['assets/nesting-2.mp3']
    }),
    'nesting-3': new Howl({
      src: ['assets/nesting-3.mp3']
    }),
    'goback': new Howl({
      src: ['assets/go_back.mp3']
    })
  }
};

// Programs
// sample programs we've made and loaded into the prototype for trial purposes

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
      new Block( 'control', 'while', [new Block('operators', 'is', ['x', 90])], [
        new Block( 'operators', 'increment', ['x', 1] )
      ]),
      new Block( 'control', 'if', [new Block('operators', 'lessthan', [new Block('operators', 'multiply', ['x', 3]), 271])], [
        new Block( 'move', 'turnto', [270] )
      ]),
      new Block( 'control', 'else', [], [
        new Block( 'move', 'turnto', [45] )
      ]),
      new Block( 'move', 'fd', [100] )
    ]
  },
  '1-1-B': {
    program: [
      new Block( 'art', 'pen', ['purple', 10] ),
      new Block( 'operators', 'assign', ['x', 3] ),
      new Block( 'control', 'if', [new Block('operators', 'is', ['x', 4])], [
        new Block( 'control', 'for', ['1', '4'], [
          new Block( 'move', 'fd', [200] ),
          new Block( 'move', 'lt', [90] )
        ])
      ]),
      new Block( 'control', 'else', [], [
        new Block('control', 'for', ['1', '4'], [
          new Block('move', 'fd', [100]),
          new Block('move', 'rt', [90])
        ])
      ])
    ]
  },
  '1-1-C': {
    program: [
      new Block( 'move', 'speed', [10] ),
      new Block( 'art', 'pen', ['purple', 10] ),
      new Block( 'move', 'jumpto', [-250, 500] ),
      new Block( 'control', 'forin', ['x', '[0..10]'], [
        new Block( 'move', 'turnto', [90] ),
        new Block( 'control', 'forin', ['y', '[0..10]'], [
          new Block( 'move', 'fd', [10] )
        ]),
        new Block( 'move', 'rt', [90] ),
        new Block( 'move', 'jumpxy', [-100, new Block( 'operators', 'multiply', ['y', -5] )] )
      ])
    ]
  },
  '1-2-A': {
    program: [
      new Block( 'art', 'pen', ['blue'] ),
      new Block( 'operators', 'assign', ['x', 4] ),
      new Block( 'control', 'if', [new Block( 'operators', 'lessthan', ['x', 6] )], [
        new Block( 'control', 'forin', ['[1..x]'], [
          new Block( 'move', 'fd', [100] ),
          new Block( 'move', 'rt', [90] )
        ] )
      ] ),
      new Block( 'operators', 'assign', ['x', 6] ),
      new Block( 'control', 'if', [new Block('operators', 'is', ['x', 6])], [
        new Block('move', 'bk', [100])
      ]),
      new Block( 'move', 'jumpto', [-100, -100] )
    ]
  },
  '1-2-B': {
    program: [
      new Block('operators', 'assign', ['x', 2]),
      new Block('operators', 'assign', ['y', 5]),
      new Block('operators', 'funcdef', ['a', 'x'], [
        new Block('operators', 'increment', ['x', 5])
      ]),
      new Block('operators', 'funcdef', ['b', 'x'], [
        new Block('operators', 'increment', ['y', 6])
      ]),
      new Block('operators', 'funccall', ['a', 'x']),
      new Block('operators', 'funcdef', ['f', 'x'], [
        new Block('control', 'if', [new Block('operators', 'and', [ new Block( 'operators', 'is', ['x', 7] ), new Block('operators', 'is', ['y', 11]) ] ) ],[
          new Block('move', 'fd', [100]),
        ]),
        new Block('control', 'else', [], [
          new Block('move', 'bk', [100])
        ])
      ]),
      new Block('operators', 'funccall', ['f', 'x'])
    ]
  },
  '1-2-C': {
    program: [
      new Block('operators', 'assign', ['x', 0]),
      new Block('operators', 'funcdef', ['f', 'x'], [
        new Block('control', 'while', [new Block('operators', 'lessthan', ['x', 10])], [
          new Block('art', 'grow', [2.0]),
          new Block('operators', 'increment', ['x', 9])
        ])
      ]),
      new Block('operators', 'funcdef', ['g', 'x'], [
        new Block('operators', 'funccall', ['f', 'x']),
        new Block('move', 'rt', [180]),
        new Block('move', 'fd', [100]),
        new Block('move', 'lt', [90]),
        new Block('move', 'fd', [100])
      ]),
      new Block('operators', 'funccall', ['g', 'x'])
    ]
  },
  '1-3-A': {
    program: [
      new Block( 'art', 'pen', ['green', 10] ),
      new Block( 'control', 'forin', ['[1..4]'], [
        new Block( 'move', 'rtarc', [90, 50] )
      ]),
      new Block( 'move', 'jumpxy', [-100, -100] ),
      new Block( 'control', 'forin', ['[1..4]'], [
        new Block( 'move', 'rt', [90] ),
        new Block( 'move', 'fd', [100] )
      ]),
      new Block( 'move', 'rt', [90] )
    ]
  },
  '1-3-B': {
    program: [
      new Block('operators', 'assign', ['x', 0]),
      new Block('control', 'if', [new Block('operators', 'lessthan', ['x', 0])], [
        new Block('move', 'bk', [100]),
        new Block('operators', 'increment', ['x', 1]),
        new Block('control', 'if', [new Block('operators', 'is', ['x', 1])], [
          new Block('move', 'fd', [100])
        ])
      ]),
      new Block('control', 'elseif', [new Block('operators', 'greaterthan', ['x', 0])], [
        new Block('move', 'rt', [180, 100])
      ]),
      new Block('control', 'else', [], [
        new Block('move', 'fd', [100]),
        new Block('operators', 'increment', ['x', 2]),
        new Block('control', 'if', [new Block('operators', 'is', ['x', 2])], [
          new Block('move', 'lt', [90])
        ])
      ])
    ]
  },
  '1-3-C': {
    program: [
      new Block('operators', 'assign', ['x', 5]),
      new Block('operators', 'assign', ['y', 17]),
      new Block('operators', 'funcdef', ['f', 'x'], [
        new Block('operators', 'increment', ['x', 1]),
        new Block('operators', 'increment', ['y', new Block('operators', 'add', ['x', 7])])
      ]),
      new Block('operators', 'funccall', ['f', 'x']),
      new Block('control', 'if', [new Block('operators', 'greaterthan', ['x', 'y'])], [
        new Block('art', 'wear', ['apple'])
      ]),
      new Block('control', 'else', [], [
        new Block('art', 'wear', ['pear'])
      ])
    ]
  },
  '2-1-A': {
    program: [
      new Block('art', 'pen', ['purple', 10]),
      new Block('move', 'rt', [30]),
      new Block('control', 'for', ['[1..3]'], [
        new Block('control', 'for', ['[1..3]'], [
          new Block('move', 'fd', [100]),
          new Block('move', 'rt', [120])
        ]),
        new Block('move', 'lt', [60])
      ])
    ]
  },
  '2-1-B': {
    program: [
      new Block('control', 'keydown', ['H'], [
        new Block('operators', 'assign', ['x', 0]),
        new Block('operators', 'funcdef', ['f', 'a'], [
          new Block('art', 'wear', ['apple'])
        ]),
        new Block('operators', 'funccall', ['f', 'a'])
      ]),
      new Block('control', 'keydown', ['e'], [
        new Block('operators', 'assign', ['x', 1]),
        new Block('operators', 'funcdef', ['g', 'b'], [
          new Block('art', 'wear', ['orange'])
        ]),
        new Block('operators', 'funccall', ['g', 'b'])
      ]),
      new Block('control', 'keydown', ['i'], [
        new Block('operators', 'assign', ['x', 2]),
        new Block('operators', 'funcdef', ['h', 'c'], [
          new Block('art', 'wear', ['banana'])
        ]),
        new Block('operators', 'funccall', ['h', 'c'])
      ])
    ]
  },
  '2-1-C': {
    program: [
      new Block('art', 'pen', ['purple', 10]),
      new Block('control', 'for', ['[1..4]'], [
        new Block('move', 'rt', [90, 100])
      ]),
      new Block('move', 'fd', [100]),
      new Block('control', 'for', '[1..4]', [
        new Block('move', 'rt', [90]),
        new Block('move', 'fd', [200])
      ]),
      new Block('move', 'rt', [45]),
      new Block('move', 'fd', [200]),
      new Block('move', 'rt', [90]),
      new Block('move', 'fd', [140])
    ]
  },
  '2-2-A': {
    program: [
      new Block('operators', 'assign', ['x', 4]),
      new Block('operators', 'assign', ['y', 6]),
      new Block('operators', 'assign', ['z', 10]),
      new Block('control', 'while', [new Block('operators', 'and', [new Block('operators', 'lessthan', ['x', 8]),new Block('operators', 'lessthan', ['y', 11])])], [
        new Block('control', 'if', [new Block('operators', 'is', ['z', 10])], [
          new Block('art', 'grow', [3])
        ]),
        new Block('control', 'elseif', [new Block('operators', 'is', ['z', 9])], [
          new Block('art', 'wear', ['apple'])
        ]),
        new Block('control', 'else', [], [
          new Block('art', 'hide')
        ]),
        new Block('operators', 'increment', ['x', 2])
      ])
    ]
  },
  '2-2-B': {
    program: [
      new Block('art', 'pen', ['purple', 10]),
      new Block('operators', 'assign', ['x', 60]),
      new Block('control', 'for', ['[1..4]'], [
        new Block('move', 'fd', [100]),
        new Block('move', 'rt', ['x'])
      ]),
      new Block('move', 'bk', [100]),
      new Block('move', 'lt', [90]),
      new Block('control', 'for', ['[1..3]'], [
        new Block('move', 'fd', [100]),
        new Block('move', 'rt', ['x'])
      ])
    ]
  },
  '2-2-C': {
    program: [
      new Block('operators', 'assign', ['x', 5]),
      new Block('control', 'while', [new Block('operators', 'lessthan', ['x', 7])], [
        new Block('operators', 'funcdef', ['f', 'x'], [
          new Block('move', 'fd', [5]),
          new Block('move', 'rt', [90])
        ]),
        new Block('operators', 'funccall', ['f', 'x']),
        new Block('operators', 'increment', ['x', 1])
      ]),
      new Block('control', 'if', [new Block('operators', 'is', ['x', 10])], [
        new Block('move', 'rt', [360])
      ])
    ]
  },
  '2-3-A': {
    program: [
      new Block('art', 'pen', ['blue', 20]),
      new Block('control', 'for', ['[1..3]'], [
        new Block('move', 'rt', [120, 100])
      ]),
      new Block('art', 'fill', ['yellow']),
      new Block('move', 'jumpto', [100, 50]),
      new Block('art', 'dot', ['green', 50])
    ]
  },
  '2-3-B': {
    program: [
      new Block('operators', 'assign', ['x', 5]),
      new Block('control', 'if', [new Block('operators', 'lessthan', ['x', 0])], [
        new Block('control', 'keydown', ['X'], [
          new Block('art', 'show')
        ])
      ]),
      new Block('control', 'elseif', [new Block('operators', 'is', ['x', 0])], [
        new Block('control', 'keydown', ['X'], [
          new Block('art', 'hide')
        ])
      ]),
      new Block('control', 'else', [], [
        new Block('art', 'cs')
      ])
    ]
  },
  '2-3-C': {
    program: [
      new Block('operators', 'assign', ['x', 2]),
      new Block('operators', 'funcdef', ['f', 'x'], [
        new Block('operators', 'assign', ['x', new Block('operators', 'multiply', ['x', 7])]),
        new Block('control', 'if', [new Block('operators', 'is', ['x', 14])], [
          new Block('art', 'wear', ['apple'])
        ]),
        new Block('control', 'elseif', [new Block('operators', 'is', ['x', 12])], [
          new Block('art', 'wear', ['suit'])
        ]),
        new Block('control', 'else', [], [
          new Block('art', 'wear', ['peach'])
        ])
      ]),
      new Block('operators', 'funccall', ['f', 'x'])
    ]
  }
};

// ti is the global tab index counter
// the tab index counter must be global to ensure the tab indices are unique and ordered sequentially
// tabindex is an HTML attribute

var ti = 10;

// ------- Classes and prototypes ------- \\

// Block
// represents an individual block in OOP form
// info is loaded in from the blocklist within this function automatically, given the block ID
function Block( category, id, params, statements, desc ) {
  this.category = category;
  this.id = id;
  this.desc = "Generic block";
  this.params = [];
  this.statements = null;
  this.name = id;
  // this.aural = null;
  function getBlock( element, index, array ) {
    if ( id == element['id'] ) {
      return element;
    } else if ( id == element['name'] ) {
      return element;
    }
  }
  if ( blocklist[category].find(getBlock) !== undefined ) {
    var blocktemp = blocklist[category].find(getBlock);
    this.desc = blocktemp['desc'];
    this.params = blocktemp['params'];
    this.aural = blocktemp['aural'];
    this.name = blocktemp['name'];
    this.displayas = blocktemp['displayas'];
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

// generates HTML code to display each block
// kind of like the toString() function of the block "class"
Block.prototype.codify = function() {
  var sonifyname = this.name;
  if ( this.aural !== undefined && this.aural !== null ) { // for screen reader auralization overrides
    sonifyname = this.aural;
  }
  var sonified_statement;
  var aria_hidden;
  if ( get_auditory_method() === 'spearcon' ) {
    sonified_statement = '';
    aria_hidden = ' aria-hidden="true"';
  } else {
    sonified_statement = sonify_statement( sonifyname, this.params, this.displayas, this.aural ) + ". " + this.desc;
    aria_hidden = '';
  }
  var paramlist = '';
  this.params.forEach(function( element ) {
    var elemstring;
    if ( typeof element == 'object' ) {
      elemstring = sonify_statement( element.name, element.params, element.displayas, element.aural );
    } else {
      elemstring = element;
    }
    paramlist += elemstring + ',';
  });
  paramlist = paramlist.substring(0, paramlist.length - 1);
  var blockid = this.id || this.name;
  return '<li role="tab" class="block block-[' + blockid + ']" id="block-' + blockid + '" params="' + paramlist + '" alt="' + this.desc + '"' + aria_hidden + '><p class="block-link" tabindex="' + ti++ + '" aria-label="' + sonified_statement + ' ">' + codify_statement( this.name, this.params, this.displayas ) + '</p></li>';
}

// used for nested or more complicated block inclusion
Block.prototype.codifyBasics = function() {
  // return '(' + this.name + ': ' + codify_params( this.params ) + ')';
  return '(' + codify_statement( this.name, this.params, this.displayas ) + ')';
}

// ------- Functions ------ \\

// generates HTML for a statement
function codify_statement( name, params, displayas ) {
  if ( displayas === 'binaryoperator' ) {
    var param0disp, param1disp;
    if ( typeof params[0] === 'object' ) {
      param0disp = params[0].codifyBasics();
    } else {
      param0disp = params[0];
    }
    if ( typeof params[1] === 'object' ) {
      param1disp = params[1].codifyBasics();
    } else {
      param1disp = params[1];
    }
    return param0disp + ' ' + name + ' ' + param1disp;
  }
  return name + ': ' + codify_params( params );
}

// generates HTML for displaying parameters of the block
function codify_params( params ) {
  var paramcode = '';
  for ( var j = 0; j < params.length; j++ ) {
    if ( typeof params[j] === 'object' ) {
      paramcode += params[j].codifyBasics();
    } else {
      // paramcode += ' <code>' + params[j] + '</code>';
      paramcode += ' ' + params[j];
    }
  }
  return paramcode;
}

// generates screen reader friendly HTML code for sonifying purposes
// will be used in aria-labels
function sonify_statement( name, params, displayas, aural ) {
  if ( name == 'function f defined as' ) { // funcdef
    return 'define function \'' + params[0] + '\' of \'' + params[1] + '\'';
  } else if ( name == 'f of x' ) { // funccall
    return 'call function \'' + params[0] + '\' of \'' + params[1] + '\'';
  } else if ( displayas === 'binaryoperator' ) {
    var param0sonify, param1sonify;
    if ( typeof params[0] === 'object' ) {
      // param0sonify = params[0].name + ' ' + sonify_params( params[0].params, params[0].displayas, params[0].aural );
      param0sonify = sonify_statement( params[0].name, params[0].params, params[0].displayas, params[0].aural);
    } else {
      param0sonify = params[0];
    }
    if ( typeof params[1] === 'object' ) {
      // param1sonify = params[1].name + ' ' + sonify_params( params[1].params, params[1].displayas, params[1].aural );
      param1sonify = sonify_statement( params[1].name, params[1].params, params[1].displayas, params[1].aural );
    } else {
      param1sonify = params[1];
    }
    return '(' + param0sonify + ' ' + aural + ' ' + param1sonify + ')';
  }
  return name + ". " + sonify_params( params, displayas, aural );
}

function sonify_params( params, displayas, aural ) {
  var sonified = '';
  for ( var j = 0; j < params.length; j++ ) {
    if ( typeof params[j] === 'object' ) {
      // sonified += params[j].name + " " + sonify_params( params[j].params, aural );
      sonified += sonify_statement( params[j].name, params[j].params, params[j].displayas, params[j].aural );
    } else {
      sonified += params[j] + ", ";
    }
  }
  return sonified;
}

// function used for coding entire program
function codify_program( program, nesting ) {
  var block_html_insert = '';
  var aria_hidden;
  if ( get_auditory_method() === 'spearcon' ) {
    aria_hidden = ' aria-hidden="true"';
  } else {
    aria_hidden = '';
  }
  if ( nesting == 0 ) {
    block_html_insert += '<li role="tab" class="blocklike jumptoprogramselection" id="jumptoprogramselection" alt="Jump to program selection"' + aria_hidden + '><p class="block-link" tabindex="' + ti++ + '" aria-label="Jump to program selection dropdown">Jump to program selection dropdown</p></li>';
    block_html_insert += '<li role="tab" class="block" ' + aria_hidden + '><p id="startofprogram" class="block-link" tabindex="' + ti++ + '" aria-label="Start of program"' + aria_hidden + '>Start of program</p></li>';
  }
  for ( var i = 0; i < program.length; i++ ) {
    block_html_insert += program[i].codify();
    if ( program[i]['statements'] !== null ) { // nesting
      block_html_insert += '<li role="tab" class="block" ' + aria_hidden + '><p class="block-link nesting nesting-' + (nesting + 1) + '" aria-label="nesting open" id="nesting-' + (nesting + 1) + '" tabindex="' + ti++ + '"' + aria_hidden + '>Nesting open</p></li><div class="nav nav-pills nav-stacked nestinglevel-' + (nesting + 1) + '"' + aria_hidden + '>';
      block_html_insert += codify_program( program[i]['statements'], nesting + 1 );
      block_html_insert += '</div><li role="tab" class="block" ' + aria_hidden + '><p class="block-link nestingend nestingend-' + (nesting + 1) + '" aria-label="close nesting" id="nesting-' + (nesting + 1) + '" tabindex="' + ti++ + '"' + aria_hidden + '>Close nesting</p></li>';
    }
  }
  if ( nesting == 0 ) {
    block_html_insert += '<li role="tab" class="block" ' + aria_hidden + '><p id="endofprogram" class="block-link" tabindex="' + ti++ + '" aria-label="End of program">End of program</p></li>';
  }
  return block_html_insert;
}

/*
 * get_auditory_method()
 * Sees which choice user selected on dropdown, returns choice
*/
function get_auditory_method() {
  return $("#auditorydisplayslist option:selected").attr('id');
  update_program_sequence( $('#programlist option:selected').attr('id') );
}

// refreshing the list based on which category was selected
function update_block_list( category_id_full ) {
  var category_id = Number(category_id_full.substring(9));
  ti = 10;
  var block_html_insert = "";
  var blocks = [];
  var catnumtoname = ['move', 'art', 'text', 'sound', 'control', 'operators', 'sprites', 'snippets'];
  blocks = blocklist[catnumtoname[category_id - 1]];
  block_html_insert += '<li role="tab" class="back" id="back-' + category_id + '"><p class="block-link" aria-label="Go back" tabindex="' + ti++ + '">Go back</p></li>';
  for ( var i = 0; i < blocks.length; i++ ) {
    var params = codify_params( blocks[i].params );
    var blockid = blocks[i].name;
    if ( blocks[i].id !== undefined ) {
      blockid = blocks[i].id;
    }
    var sonified_statement, aria_hidden;
    if ( get_auditory_method() === 'spearcon' ) {
      sonified_statement = '';
      aria_hidden = ' aria-hidden="true"';
    } else {
      sonified_statement = blockid + params + '. ' + blocks[i].desc;
      aria_hidden = '';
    }
    block_html_insert += '<li role="presentation" class="block block-[' + blockid + ']" id="block-' + i + '" alt="' + sonified_statement + '"><p class="block-link" role="tab" id="block-link-' + i + '" tabindex="' + ti++ + '" aria-label="' + sonified_statement + '" ' + aria_hidden + '>' + blocks[i].name + ' ' + params + '</p></li>';
  }
  $("#block-list").html(block_html_insert);
}

// updating the sequencing of tab indices
function update_program_sequence( program_name ) {
  var program = programs[program_name]['program'];
  var block_html_insert = codify_program( program, 0, ti + 100 );
  $("#program-sequence").html(block_html_insert);
}

// plays sound
function play( sound, name, override, params ) {
  var method = get_auditory_method();
  if ( override !== undefined ) {
    method = override;
  }

  if ( ( method == 'speech' || method == 'spearcon' ) && ( name !== null && name !== undefined ) ) {
    var index = name.indexOf( 'link' );
    if ( index !== -1 ) {
      name = name.substring(0, index) + name.substring(index + 5);
    } else if ( name.indexOf('block-[') !== -1 ) {
      var index2 = name.indexOf( 'block-[' );
      var index3 = name.indexOf( ']' );
      var blockid = name.substring(index2 + 7, index3);
      // console.log( blockid );
      name = "block-" + blockid;
      override = null;
    } else if ( name.indexOf('nesting-') !== -1 ) {
      var nestingdepth = name.substring(name.indexOf('nesting-') + 8);
      name = "nesting-" + nestingdepth;
      override = null;
    } else if ( name.indexOf('nestinglevel-') !== -1 ) {
      name = 'nesting-' + name.substring(name.indexOf('nestinglevel-') + 13);
      override = null;
    }
  }

  var whattoplay = null;

  if ( method == 'earcon' ) {
    whattoplay = sounds['earcon'][sound];
  } else if ( method == 'speech' ) {
    // if ( sound.indexOf('select') == -1 ) { // don't play when selecting
      whattoplay = sounds['speech'][name];
    // }
  } else if ( method == 'speechsynthesis' ) {
    var utterance = new SpeechSynthesisUtterance('This is a test! Hopefully it works.');
    ss.speak(utterance);
  } else if ( method == 'spearcon' ) {
    if ( override == 'spearcon' ) {
      whattoplay = sounds['spearcon'][sound];
    } else {
      if ( sound == 'selectcategory' || sound == 'selectblock' ) {
        whattoplay = sounds['spearcon']['selected'];
      } else {
        whattoplay = sounds['spearcon'][name];
      }
    }
  }

  if ( method == 'earcon' || method == 'spearcon' || method == 'speech' ) {
    // console.log( sound + ' ' + name );
    whattoplay.play();
    if ( params !== undefined ) {
      var paramlengths = params.length || -1;
      if ( paramlengths > 0 ) {
        var paramsonifiedcount = 0;
        whattoplay.on('end', function() {
          if ( method == 'spearcon' && params !== undefined && paramsonifiedcount < paramlengths ) {
            params.forEach(function( element ) {
              var utterance = new SpeechSynthesisUtterance( element );
              utterance.lang = 'en-US';
              ss.speak(utterance);
              paramsonifiedcount++;
            });
          }
        });
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

function selectcategory( event, thisObj, focusOnBlock ) {
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
  // $('.block').each(function( index ) {
  //   if ( $(this).attr('id') === 'block-0' ) {
  //     $(this).focus();
  //     console.log("Focused");
  //     return false;
  //   }
  // });
  // jQuery focus() function unable to focus on non-form elems, falling back to pure JS
  // forcing object to become array through MDN documentation
  // on document.getElementsByClassName: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
  var blocklist = document.getElementsByClassName("block");
  var blocktraversal = Array.prototype.filter.call(blocklist, function( element ) {
    if ( element.id == 'block-0' ) {
      window.setTimeout(function(){
        element.firstChild.focus();
      }, 0);
      // console.log(element);
      // console.log(element.firstChild);
    }
  });
}

// Event binding in pure JavaScript on dynamically created elements
// https://stackoverflow.com/questions/203198/event-binding-on-dynamically-created-elements

// CSS-related event binded functions
// the following functions have to do with the visuals of the prototype

function hasClass(elem, className) {
    return elem.className.split(' ').indexOf(className) > -1;
}

// allow click event to focus in as well
document.addEventListener('click', function (e) {
    if (hasClass(e.target, 'block')) {
        e.focus();
    }
}, false);

$("#category-list").on('click', '.category', function( event ) {
  selectcategory(event, $(this), function() {
    setTimeout(function() {
      document.getElementById("block-0").focus();
    }, 100);
  });
});
$("#category-list").on('keydown', '.category', function( event ) {
  if ( event.keyCode === 13 ) { // keycode 13 = enter key
    selectcategory(event, $(this), function() {
      setTimeout(function() {
        document.getElementById("block-0").focus();
      }, 100);
    });
  }
});

// adding CSS classes upon focus
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
  var paramraw = $(this).attr('params');
  var params = paramraw.split(',');
  play('identifyblock', 'block-' + blockid, undefined, params);
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

function gobacktocategories( event, thisObj ) {
  // do something on click
  var catidraw = thisObj.attr('id');
  var catid = Number(catidraw.substring( 5 ));
  var catlist = document.getElementsByClassName('category');
  [].forEach.call(catlist, function( element ) {
    if ( element.id === 'category-' + catid ) {
      catelem = element;
    }
    return false;
  });
  window.setTimeout(function(){
    catelem.focus();
  }, 0);
  play('goback', 'back-' + catid);
}

$("#block-list").on('click', '.back', function(event) {
  gobacktocategories(event, $(this));
});

$("#block-list").on('keydown', '.back', function( event ) {
  if ( event.keyCode === 13 ) { // keycode 13 = enter key
    gobacktocategories(event, $(this));
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
  if ( ( event.key === "/" || event.key === "?" || event.key === "'" ) && get_auditory_method() === 'earcon' ) {
    // console.log($(this).attr('id'));
    play('identifycategory', $(this).attr('id'), 'speech');
  }
});

$("#block-list").on('keydown', '.block', function( event ) {
  if ( ( event.key === "/" || event.key === "?" || event.key === "'" ) && get_auditory_method() === 'earcon' ) {
    // console.log($(this).attr('class'));
    play('identifyblock', $(this).attr('class'), 'spearcon'); // TODO: change back to speech and class -> id once we gain speech audio tracks
  }
});

$("#program-sequence").on('keydown', '.block', function( event ) {
  if ( ( event.key === "/" || event.key === "?" || event.key === "'" ) && get_auditory_method() === 'earcon' ) {
    var paramraw = $(this).attr('params');
    var params = paramraw.split(',');
    play('identifyblock', $(this).attr('class'), 'spearcon', params); // TODO: change back to speech and class -> id once we gain speech audio tracks
  } else if ( event.key === "." ) {
    // console.log( $(this).parent().attr('class') );
    play('nestinglevel', $(this).parent().attr('class'), 'spearcon');
  }
});


// Prevent scrolling when pressing arrow keys
// document.onkeydown = function(evt) {
//     evt = evt || window.event;
//     var keyCode = evt.keyCode;
//     if (keyCode >= 37 && keyCode <= 40) {
//         return false;
//     }
// };

$("body").on('change', '#auditorydisplayslist', function( event ) {
  var categories = document.getElementsByClassName('category');
  // list zero items bug comes up with VoiceOver when we attempt to silence it on category list,
  // so we'll temporarily disable this

  // if ( get_auditory_method() == 'spearcon' ) {
  //   [].forEach.call(categories, function( element ) {
  //     $(element).attr('aria-hidden', 'true');
  //     $(element).attr('aria-label', '');
  //   });
  // } else {
  //   [].forEach.call(categories, function( element ) {
  //     if ( $(element).attr('aria-hidden') == 'true' ) {
  //       $(element).removeAttr('aria-hidden');
  //       $(element).removeAttr('aria-label');
  //     }
  //   });
  // }
  var active_category_id;
  [].forEach.call(categories, function( element ) {
    var classnames = $(element).attr('class').split(' ');
    classnames.forEach(function( classname ) {
      if ( classname === 'category-active' ) {
        active_category_id = element.id;
      }
    });
    return false;
  });
  $(update_block_list( active_category_id ));
  update_program_sequence( $('#programlist option:selected').attr('id') );
});

$("body").on('change', '#programlist', function( event ) {
  update_program_sequence( $('#programlist option:selected').attr('id') );
});

$("#program-sequence").on('focus', '#startofprogram', function( event ) {
  play('startofprogram', 'startofprogram');
});

$("#program-sequence").on('focus', '#endofprogram', function( event ) {
  play('startofprogram', 'endofprogram');
});

$("#program-sequence").on('click', '#jumptoprogramselection', function( event ) {
  document.getElementById('programlist').focus();
});

$("#program-sequence").on('keydown', '#jumptoprogramselection', function( event ) {
  if ( event.keyCode === 13 ) { // keycode 13 = enter key
    document.getElementById('programlist').focus();
  }
});

$("body").on('click', '#jumptocodenavigation', function( event ) {
  var programseq = document.getElementById('program-sequence');
  document.getElementById('startofprogram').focus();
});

$("body").on('keydown', '#jumptocodenavigation', function( event ) {
  if ( event.keyCode === 13 ) { // keycode 13 = enter key
    document.getElementById('startofprogram').focus();
  }
});
