(function(w){
  w.auth = {
    ajax_auth : ajax_auth,
    ajax_login : ajax_login
  }

  function ajax_auth(success_callback, fail_callback){
    jQuery.ajax({
      type: 'GET',
      url: 'http://192.168.1.28:9527/auth',
      headers: {'Cookie': jQuery.cookie('_cookie')}
    }).success(function(){
      success_callback();
    }).complete(function(xhr){
      if (xhr.status != 200) {
	if(fail_callback){
	  fail_callback();
	}
      }
    });
  }

  function ajax_login(formdata,success_callback, fail_callback){
    jQuery.ajax({
      type: 'POST',
      url: 'http://192.168.1.28:9527/login',
      data: formdata,
      headers: {
        'X-User-Agent': 'Android'
      }
    }).success(function(data, status, xhr){
      console.log(xhr)
      jQuery.cookie('_cookie', xhr.getResponseHeader('Set-Cookie'));
      console.log(xhr.getAllResponseHeaders());
      success_callback();
    }).complete(function(xhr){
      if (xhr.status === 401) {
	if(fail_callback){
	  fail_callback();
	}
      }
    });
  }

})(window);
