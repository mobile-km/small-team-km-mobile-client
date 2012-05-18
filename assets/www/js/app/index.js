jQuery(function(){
  // PhoneGap加载完毕的回调
  //document.addEventListener('deviceready', on_device_ready, false);

  function register_events() {
    // 跳转到新建文本表单
    jQuery('#new-text').live('click', function() {
      render_new_text_page();
    });

    // 跳转到编辑文件表单
    jQuery('.note').live('click', function() {
      var id = $(this).data('id');
      DB.getNote(id, function(tx, records) {
        var record = records.rows.item(0);

        render_edit_text_page(record);
      });
    });

    // 提交登陆表单
    jQuery('.login-form .submit').live('click',function(){
      var formdata = jQuery('.login-form').serialize();
      jQuery('.login-form .errors').hide();
      jQuery('form :input').val('');
      auth.ajax_login(formdata,function(){
	render_profile_page();
      },function(){
	jQuery('.login-form .errors').show();
	jQuery('form :input').val('');
      });
    });

    // 提交新建text表单
    jQuery('#submit-text').live('click', function(e) {
      e.preventDefault();
      var content = jQuery('textarea').val();
      DB.createNote(content, function() {
        render_profile_page()
      });
    });

    // 提交编辑text表单
    jQuery('#submit-text-editing').live('click', function(e) {
      e.preventDefault();
      var id = ~~jQuery('textarea').data('id');
      var content = jQuery('textarea').val();
      DB.updateNote(id, content, function() {
        render_profile_page()
      });
    });

    // 取消表单返回list
    jQuery('#cancel-text').live('click', function(e) {
      e.preventDefault();
      render_profile_page();
    })
  }

  function on_device_ready(){
    DB.createTable();
    register_events();
    console.log('deviceready');
    if (jQuery.cookie('_cookie')) {
      // 尝试认证
      auth.ajax_auth(function(){
	render_profile_page();
      },function(){
	render_login_page();
      });
    } else {
      // 显示登录表单
      render_login_page();
    }
  }


  function render_profile_page(){
    jQuery('#main-page').html('正在载入');

    var content = {name:'fushang318'}

    DB.getNotes(function(tx, records) {
      var length = records.rows.length;
      var notes = [];
      for (var i=0; i < length; i++) {
        var note = records.rows.item(i);

        notes = notes.concat(note);
      }

      content.notes = notes;

      var template_content = render_template('#profile-page-template', content);

      jQuery('#main-page').html(template_content);

    });

    //    display_page('#profile-page');
    //
    //    jQuery.ajax({
    //      type: 'GET',
    //      url: 'http://192.168.1.28:9527/photos/profile',
    //      headers: {
    //        'X-User-Agent': 'Android'
    //      }
    //    }).success(function(data){
    //      var context = data.user;
    //      jQuery('#profile-page div[data-role=content]').html(render_tpl('#profile-page', context));
    //    });
  }


  function render_login_page(){
    jQuery('#main-page').html('正在载入');
    var template_content = render_template('#login-page-template',{});
    console.log(template_content);
    jQuery('#main-page').html(template_content);
  }

  function render_new_text_page() {
    var template_content = render_template('#new-text-page-template', {})
    jQuery('#main-page').html(template_content);
  }

  function render_edit_text_page(context) {
    var template_content = render_template('#new-text-page-template', context)
    jQuery('#main-page').html(template_content);

  }

  function render_template(template_id, context) {
    console.log(template_id + '1');
    var _template = jQuery(template_id).html();
    console.log(template_id + '2');
    var _compile_template = Hogan.compile(_template);
    console.log(template_id + '3');
    return _compile_template.render(context);
  }

  on_device_ready();
});
