/*
 * Client JS for Accessible PencilCode Foundation
*/

var blocks_move = [
  {
    name: 'fd',
    desc: 'Move forward'
  },
  {
    name: 'rt',
    desc: 'Turn right'
  }
];
var blocks_art = [
  {
    name: 'pen',
    desc: 'Set pen color and size'
  },
  {
    name: 'dot',
    desc: 'Make a dot'
  }
];
var blocks_text = [];
var blocks_sound = [];

function update_block_list( category_id_full ) {
  console.log( category_id_full );
  var category_id = category_id_full.substring(9);
  block_html_insert = "";
  var blocks = [];
  console.log( "Category ID: " + category_id );
  if ( category_id == 1 ) {
    blocks = blocks_move;
  } else if ( category_id == 2 ) {
    blocks = blocks_art;
  }
  for ( var i = 0; i < blocks.length; i++ ) {
    block_html_insert += '<li role="presentation" class="block" id="block-' + blocks[i].name + '"><a href="#">' + blocks[i].name + '</a></li>';
  }
  $("#block-list").html(block_html_insert);

}

/*
 * Bootstrap jQuery list selection
 * @author Jeffrey Wang
 * Derived from the Elephant codebase, also originally written by Jeffrey Wang
*/

$("#category-list").on('click','.category', function( event ) {
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
