$(document).ready(function(){
    $('.delete-article').on('click', function(e){
        var id = $(this).data('id');
        $.ajax({
            type: 'DELETE',
            url: '/article/'+ id,
            success : function(res){
                alert(res);
                window.location.href = '/';
            },
            error :function(err){
                console.log(err);
            }
        });
    });
});
