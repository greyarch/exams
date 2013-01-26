define(function () {

    function onErr(err) {
        $('#main-title').message('<span class="icon-warning"><b>What are you doing, Dave? Server says:   </b></span>' + err.responseText, {
            classes:['red-gradient'],
            autoClose:5000
        });
    }

    return {
        call:function (method, url, data, onSuccess, onError) {
            $.ajax({
                type:method,
                url:url,
                data:data || {},
                success:onSuccess,
                error:onError || onErr
            }, "json");
        },

        get:function (url, onSuccess, onError) {
            this.call('GET', url, null, onSuccess, onError);
        },

        post:function (url, data, onSuccess, onError) {
            this.call('POST', url, data, onSuccess, onError);
        },

        put:function (url, data, onSuccess, onError) {
            this.call('PUT', url, data, onSuccess, onError);
        },

        del:function (url, onSuccess, onError) {
            this.call('DELETE', url, null, onSuccess, onError);
        }
    }
});