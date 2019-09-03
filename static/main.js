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
