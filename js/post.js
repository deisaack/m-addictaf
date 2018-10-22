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

    var $currentPosts = undefined;
    var liveUrl = window.location.origin;
    var $postsList = $('#postsList');
    var $postTemplate = '<div class="col s6">\n' +
        '                    <div class="content">\n' +
        '                        <a class="image" href="{{address}}">\n' +
        '                            <img src="{{image}}" alt="{{caption}}">\n' +
        '                            <div class="{{videoIcon}}"></div>\n' +
        '                        </a>\n' +
        '                        <a href="{{address}}">\n' +
        '                            <h5>{{caption}}</h5>\n' +
        '                        </a>\n' +
        // '                        <p>\n' +
        // '                            <a href="{{address}}">John Doe</a>\n' +
        // '                        </p>\n' +
        '                        <p class="date">\n' +
        '                            <span>{{views}} Views</span>\n' +
        '                        </p>\n' +
        '                    </div>\n' +
        '                </div>';

    function addPost(post){
        $postsList.append(Mustache.render($postTemplate, post));
    }

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
                    // $currentPosts = data.related;
                    $.each(data.related, function (i, post) {
                        post.address = liveUrl + '/post/?id='+post.id;
                        if (post.caption.length > 50) {
                            post.caption = post.caption.substring(0, 50) + '...';
                        }
                        post.videoIcon = '';
                        if (post.is_video){
                            post.videoIcon = 'video-icon'
                        }
                        post.views += Math.floor((Math.random() * 10) + 1);
                        addPost(post);
                    });
                }, error(){
                }
            });
            break
        }
    }


    // $.ajax({
    //     type: 'GET',
    //     url: 'https://api.addictaf.com/posts/post/?category=SPORTSMEME&limit=6&',
    //     success: function (data) {
    //         $currentPosts = data;
    //         $.each(data.results, function (i, post) {
    //             post.address = liveUrl + '/post/?id='+post.id;
    //             if (post.caption.length > 50) {
    //                 post.caption = post.caption.substring(0, 50) + '...';
    //             }
    //             post.videoIcon = '';
    //             if (post.is_video){
    //                 post.videoIcon = 'video-icon'
    //             }
    //             post.views += Math.floor((Math.random() * 10) + 1);
    //             addPost(post);
    //         });
    //     }, error: function (data) {
    //         alert('Error fetching posts');
    //     }
    // });
});

// 98439849843