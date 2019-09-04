 //add new stock    
 $(document).on("click", '.plus', function(e){
    e.preventDefault();
    let current_qty = parseInt($(this).attr("id"));
    let qty = prompt("Enter quantity");
    let id = $(this).attr("name");
    let new_qty = current_qty + parseInt(qty)
    
    $.ajax({	
            
        url:'add',
        type:'GET',
        data:{id:id, new_qty:new_qty},
        dataType: 'json',
        success:function(data) {
            alert(data.msg)
            location.reload();
                
        },
        error: function(){
           alert('something went wrong'); 
        }				
    }); 
      
    

    
});

// remove stock    
$(document).on("click", '.minus', function(e){
    e.preventDefault();
    let current_qty = parseInt($(this).attr("id"));
    let qty = prompt("Enter quantity");
    let id = $(this).attr("name");
    let new_qty = current_qty - parseInt(qty)
    if(new_qty > 0) {
        $.ajax({	
            
            url:'withdraw',
            type:'GET',
            data:{id:id, new_qty:new_qty},
            dataType: 'json',
            success:function(data) {
                alert(data.msg)
                location.reload();
                    
            },
            error: function(){
               alert('something went wrong'); 
            }				
        }); 

    } else {
        alert('stock not enough'); 
    }
    
      
    

    
});

//DELETE ITEM
$(document).on("click", '.remove_item', function(event){
    event.preventDefault();
    let checkConfirm = confirm('Are You Sure You Want Delete It');
    if(checkConfirm == true) {
         let id = $(this).attr("name");
    
    $.ajax({
        url: 'delete_item',
        type:'GET',
        data:{id:id},
        dataType: 'json',
        success : function(data){
            alert(data.msg);
           location.reload(true);
        },
        error: function(){
           alert('something went wrong'); 
        }
    });
    } else {
        location.reload(true);
    }
   
}); 
