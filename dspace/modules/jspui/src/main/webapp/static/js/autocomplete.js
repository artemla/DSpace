jQuery(function(){
    jQuery('[name^=dc_contributor_author_last_]').autocomplete({
        source: function (request, response) {
            jQuery.get("/browse", {
                type: 'author',
                order: 'ASC',
                rpp: '20',
                starts_with: request.term
            }, function (html) {
                var data = [];
                var $authors = jQuery(html).find('.list-group-item a');
                if ($authors.size() != 0) {
                    $authors.each(function(){
                        data.push({'label': jQuery(this).text(), 'value': jQuery(this).text().split(',')[0]});
                    });
                }
                response(data);
            });
        },
        select: function( event, ui ) {
            var name = jQuery(event.target).prop('name');
            name = name.replace('last', 'first');
            jQuery('[name='+name).val(ui.item.label.split(', ')[1]);
        },
        minLength: 2,
    });
});