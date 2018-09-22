window.jQuery.prototype.NhapNhay = function(object){
    var selector = $(this);
    for(var i=0 ; i<object.soLan ; i++)
    {   
        selector.fadeOut(300);
        selector.fadeIn(300);
        
    }
    selector.animate({
        fontSize:object.size 
    },1000);
    selector.css({"color":object.color})
}