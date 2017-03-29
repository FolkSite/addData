var addData = {
    initialize: function(config) {
        action = config.actionUrl;

        // Запоминание и упр. историей вкладок в табе
        var navbox = $('#adddata-nav-hash');
        navbox.on('click', 'a', function (e) {
            var $this = $(this);
            e.preventDefault();
            window.location.hash = $this.attr('href');
            $this.tab('show');
        });
        function refHash() {
            navbox.find('a[href="'+window.location.hash+'"]').tab('show');
        }
        $(window).bind('hashchange', refHash);

        if(window.location.hash) {
            refHash();
        }
        /*--------------*/

        $(document).on('click, mouseenter', '.adddata-tooltip', function(e)
        {
            $(this).popover('toggle');
            e.preventDefault();
            return false;
        })

    }

}

$(document).ready(function() {

});
