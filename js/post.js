$(function() {
    var $post = undefined;
    var x = window.location.search.split('&');
    var $postContent = $('#postContent');
    var $videoPostTemplate = '' +
        '<div class="content-image">\n' +
        '    <div class="embed-responsive embed-responsive-16by9">\n' +
        '        <video controls autoplay>\n' +
        '            <source src="{{video}}" type="video/mp4">\n' +
        '            Your browser does not support the video tag.\n' +
        '        </video>' +
        '    </div>\n' +
        '    <br /> ' +
        '</div>' +
        '    <br /> ' +
        ' <div class="row"> '+
        '        <div class="">\n' +
        '            <div class="">\n' +
        '                <h5>{{caption}}</h5>\n' +
        '                <p>{{views}} views</p>\n' +
        '            </div>\n' +
        '        </div>'+
        ' </div>';

    var $imagePostTemplate =  '' +
        '<div>' +
        '  <div>\n' +
        '    <img src="{{image}}" class="img-responsive img">\n' +
        '  </div>\n' +
        '<br /> ' +
        ' <div class="row"> '+
        '        <div class="">\n' +
        '            <div class="">\n' +
        '                <h5>{{caption}}</h5>\n' +
        '                <p>{{views}} views</p>\n' +
        '            </div>\n' +
        '        </div>'+
        ' </div>';

    for(var i=0; i< x.length; i++){
        let item = x[i];
        if (item.includes('id=')){
            item = item.split('=')[1];
            console.log('The id is '+ item);
            $.ajax({
                type: 'GET',
                url: 'https://api.addictaf.com/posts/post/'+item+'/',
                success: function (data) {
                    $post = data;
                    // $postContent.html('Lorem lipsum dolor sit amet');
                    if (data.is_video) {
                        $postContent.html(Mustache.render($videoPostTemplate, $post));
                    } else {
                        $postContent.html(Mustache.render($imagePostTemplate, $post))
                    }
                }, error(){
                    console.log("Failed to load post")
                }
            });
            break
        }
    }
});
