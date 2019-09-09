
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
        data:{id:id, new_qty:new_qty, qty:qty},
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
            data:{id:id, new_qty:new_qty, qty:qty},
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
            // console.log(data);
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

// Remove User
$(document).on('click', '.remove_user', function(e) {
    e.preventDefault();
    let removeUser = confirm("Are you sure you want to remove this user?");
    if (removeUser) {
        let id = $(this).attr("name")

        $.ajax({
            type: "GET",
            url: "remove_user",
            data: {id:id},
            dataType: "json",
            success: function (data) {
                alert(data.msg);
                location.reload(true);
            },
            error: function(){
                alert("Something went wrong");
            }
        });
    }
    else {
        location.reload(true);
    }
});

// side bar
$(document).ready(function () {
    
    $('.aside-menu-toggler').on('click', function () {
        $('body').toggleClass(function(){
            return $(this).is('.rtl-direction, .ltr-direction') ? 'rtl-direction ltr-direction' : 'rtl-direction';
        })
    });

});

// LOGIN SECTION 

(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    

})(jQuery);