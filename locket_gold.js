(function () {
    var body = $response.body;
    if (!body) { $done({}); return; }
    try {
        var obj = JSON.parse(body);
        var modified = false;
        if (obj.subscriber) {
            if (obj.subscriber.entitlements) {
                for (var key in obj.subscriber.entitlements) {
                    obj.subscriber.entitlements[key].expires_date = "2099-12-31T23:59:59Z";
                    obj.subscriber.entitlements[key].purchase_date = "2024-01-01T00:00:00Z";
                    modified = true;
                }
            }
            if (obj.subscriber.subscriptions) {
                for (var sub in obj.subscriber.subscriptions) {
                    obj.subscriber.subscriptions[sub].expires_date = "2099-12-31T23:59:59Z";
                    obj.subscriber.subscriptions[sub].purchase_date = "2024-01-01T00:00:00Z";
                    modified = true;
                }
            }
        }
        function walk(x) {
            if (!x || typeof x !== 'object') return;
            var trueKeys = ['is_gold', 'is_premium', 'gold', 'premium', 'active_subscription', 'filters_enabled', 'photo_booth_enabled', 'ptb_enabled', 'is_paid', 'video_enabled', 'library_upload_enabled'];
            var dateKeys = ['expiration_date', 'expire_date', 'expires_at', 'valid_until', 'subscription_end'];
            for (var k in x) {
                if (trueKeys.indexOf(k) !== -1) {
                    if (typeof x[k] === 'boolean') x[k] = true;
                    else if (typeof x[k] === 'string') x[k] = 'true';
                    modified = true;
                }
                if (dateKeys.indexOf(k) !== -1) {
                    x[k] = "2099-12-31T23:59:59Z";
                    modified = true;
                }
                if (typeof x[k] === 'object') walk(x[k]);
            }
        }
        walk(obj);
        if (modified) { $done({ body: JSON.stringify(obj) }); }
        else { $done({}); }
    } catch (e) { $done({}); }
})();
