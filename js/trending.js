$(function() {
    var $queryParams = window.location.search.replace('?', '');
    var liveUrl = window.location.origin;
    var $postsList = $('#post-view');
    var $currentPosts = undefined;
    var $categoryList = $('#categoryList');
    var $popularVideos = $('#popularVideos');
    var $popularVideoTemplate = '' +
        '<div class="col-sm-3">\n' +
        '  <div class="row inner m0">\n' +
        '    <div class="preview_img">\n' +
        '      <img src="{{image}}" alt="" style="height: 100px" class="preview">\n' +
        '      <a href="/post/?id={{id}}" class="play-btn"></a>\n' +
        '    </div>\n' +
        '    <div class="title_row row m0"><a href="{{address}}">{{caption}}</a></div>\n' +
        '  </div>\n' +
        '</div>';
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

    $.ajax({
        type: 'GET',
        url: 'https://api.addictaf.com/posts/post/?category=SPORTSMEME&limit=50&'+$queryParams,
        success: function (data) {
            $currentPosts = data;
            $.each(data.results, function (i, post) {
                post.address = liveUrl + '/post/?id='+post.id;
                if (post.caption.length > 50) {
                    post.caption = post.caption.substring(0, 50) + '...';
                }
                post.videoIcon = '';
                if (post.is_video){
                    post.videoIcon = 'video-icon'
                }
                post.views += Math.floor((Math.random() * 10) + 1);
                if (i%3 === 2) {
                    addPost(post);
                }
            });
        }, error: function (data) {
            alert('Error fetching posts');
        }
    });

    function loadMore() {
        if ($currentPosts !== undefined) {
            $.ajax({
                type: 'GET',
                url: $currentPosts.next,
                success: function (data) {
                    $currentPosts.results.concat(data.results);
                    $currentPosts.next = data.next;
                    console.log("Current posts", $currentPosts);
                    $.each(data.results, function (i, post) {
                        post.address = liveUrl + '/post/?id='+post.id;
                        if (post.caption.length > 50) {
                            post.caption = post.caption.substring(0, 50) + '...';
                        }
                        post.videoIcon = '';
                        if (post.is_video){
                            post.videoIcon = 'video-icon'
                        }
                        post.views += Math.floor((Math.random() * 10) + 1);
                        if (i%3 === 2) {
                            addPost(post);
                        }
                    });
                }, error: function (data) {
                    alert('Error fetching posts');
                }
            });
        }
    }

    $("#load-more").click(function() {
        loadMore()
    });


    $.ajax({
        type: 'GET',
        url: 'https://api.addictaf.com/posts/post/?category=SPORTSMEME&is_video=1&limit=50&'+$queryParams,
        success: function (data) {
            $.each(data.results, function (i, post) {
                post.address = liveUrl + '/post/?id='+post.id;
                addPopularVideo(post);
            });
        }, error(){
            console.log("Failed to load Tags")
        }
    });

});
