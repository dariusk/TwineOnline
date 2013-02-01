
var nextpid = 2;

function addLine(pid1, pid2){
  var $e1 = $('#p_' + pid1);
  var $e2 = $('#p_' + pid2);
  var x1 = $e1.position().left + 45 ;
  var y1 = $e1.position().top + 100;
  var x2 = $e2.position().left + 45;
  var y2 = $e2.position().top +100;
   

  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) ;
  var transform = 'rotate('+angle+'rad)';
   
  var pid1 = $e1.attr('pid');
  var pid2 = $e2.attr('pid')
  var lineId = (pid1 < pid2)?(pid1+'_'+pid2):(pid2+'_'+pid1);
  var line = $('<div>')
    .appendTo('main')
    .addClass('line').addClass('p_'+pid1).addClass('p_'+pid2)
    .css({
      'position': 'absolute',
      'transform': transform
    }).attr('id', lineId)
    .attr('from', pid1).attr('to', pid2)
    .width(length)
    .offset({left:  x1 - (length/2)*(1-Math.cos(angle)) , top:(y1 + y2)/2});

  return line;
}
function redrawLines(pid){
  $('.p_'+pid).each(function(){
    var from = $(this).attr('from');
    var to = $(this).attr('to');
    $(this).remove();
    addLine(from, to);
  });
}

function createPassage(x, y){

  var passage = $('<div>')
    .appendTo('main')
    .addClass('passage').addClass('draggable')
    .attr('id', 'p_'+nextpid++)
    .offset({left: x , top:y});

  passage.draggable({
    drag:function(event){
      var pid = $(event.target).attr('pid');
      redrawLines(pid);
    }
  });
}

function openPassage(p){
  var passage = null;
  var pid;
  if(typeof(p) == 'number'){
    passage = $('p_' + p);
    pid = p;
  }
  if(p instanceof(Element)){
    passage = $(p).select('.passage') || $(p).parent('.passage');
    if(passage) pid = passage.attr('pid');
  }
  alert('Passage ' + pid);
}

function createEditorWindow(pid){
  
}

$('#mainmain').dblclick(function(e){
  createPassage(e.pageX, e.pageY);
  alert('dbl');
});

$(function(){
  $('.passage').draggable({
      drag:function(event){
        var pid = $(event.target).attr('pid');
        redrawLines(pid);
      }
    }
  );
  $('.edit').draggable();
  $('.passage').dblclick(function(e){
    openPassage(this);
  });
  $('.passage').click(function(e){
    e.preventPropagation();
  });
  
  $(document).bind("contextmenu", function(event) {
    event.preventDefault();
    $("menu").css({top: event.pageY + "px", left: event.pageX + "px"}).fadeIn("fast");
  });
  $(document).bind("click",function(event){
    $('menu').fadeOut("fast");
  });
});
