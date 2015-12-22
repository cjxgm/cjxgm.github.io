'use strict';

define(['random', 'fn'], (rand, fn) => {
    var spread;
    var max_height;

    var cache_selector = {};
    var select_cache = (...args) => {
        var a = JSON.stringify(args);
        if (cache_selector[a] == null) cache_selector[a] = {};
        return cache_selector[a];
    }

    var cache;
    var height = (i) => fn.relerp(rand(i*1996 + 1995), -1, 1, 0, max_height);
    var generate = (i) => {
        if (cache[i] == null) {
            var y = height(i);
            var x = i * spread + rand(i)*spread*0.8;
            cache[i] = { x, y };
        }
        return cache[i];
    };

    return (front, back, height, spread_) => {
        spread = (spread_ == null ? 1 : spread_);
        max_height = (height == null ? 4 : height);
        cache = select_cache(spread, max_height);

        front = parseInt(front/spread) - 2;
        back  = parseInt( back/spread) + 2;

        var result = [];
        for (var i=front; i<=back; i++)
            result.push(generate(i));
        return result;
    };
});
