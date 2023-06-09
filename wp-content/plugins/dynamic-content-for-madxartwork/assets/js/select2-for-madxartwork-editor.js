// SELECT2 everywhere
jQuery(window).on( 'load', function() {
    if (jQuery.fn.select2) {
        if ( window.madxartworkFrontend ) {
            madxartworkFrontend.hooks.addAction( 'frontend/element_ready/global', function( $scope ) {
                jQuery('.madxartwork-control-type-select select').select2();
            } );
        }
        madxartwork.hooks.addAction( 'panel/open_editor/section', function( panel, model, view ) {
            jQuery('.madxartwork-control-type-select select').select2();
        } );
        madxartwork.hooks.addAction( 'panel/open_editor/column', function( panel, model, view ) {
            jQuery('.madxartwork-control-type-select select').select2();
        } );
        madxartwork.hooks.addAction( 'panel/open_editor/widget', function( panel, model, view ) {
            jQuery('.madxartwork-control-type-select select').select2();
        } );
    }
    setInterval(function(){
        if (jQuery.fn.select2) {
            // add navigator element toggle
            jQuery('.madxartwork-control-type-select select').not('.select2-hidden-accessible').each(function(){
                jQuery(this).select2();
            });
        }
    }, 1000);
});

jQuery(window).load(function() {
    var iFrameDOM = jQuery("iframe#madxartwork-preview-iframe").contents();

    // add EDIT Template on Context Menu
    iFrameDOM.on('mousedown', '.madxartwork-editor-active .madxartwork:not(.madxartwork-edit-mode)', function(event) {
        if (event.which == 3) {
            var template_id = jQuery(this).data('madxartwork-id');
            var post_id = iFrameDOM.find('.madxartwork-editor-active .madxartwork.madxartwork-edit-mode').data('madxartwork-id');
            if (template_id && post_id) {
                setTimeout(function(){
                    var menu = jQuery('.madxartwork-context-menu:visible');
                    if (menu.length) {
                        menu.find('.madxartwork-context-menu-list__item-template').remove();
                        var edit_url = window.location.href.replace('post='+post_id, 'post='+template_id);
                        menu.find('.madxartwork-context-menu-list__item-edit').after('<div class="madxartwork-context-menu-list__item madxartwork-context-menu-list__item-template" onclick="window.open(\''+edit_url+'\'); return false;"><div class="madxartwork-context-menu-list__item__icon"><i class="eicon-edit"></i></div><div class="madxartwork-context-menu-list__item__title">Edit Template</div></div>');
                    }
                }, 10);
            }
        }
    });

});
