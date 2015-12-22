'use strict'

define(['random', 'fn', 'color'], (rand, fn, clr) => {
    var nlayer = 10;
    var depth = 20;     // camera fog distance

    var candidates = [
        {
            make: (i, x, y, z) => ({
                name: 'mountain',
                x,
                y: y + fn.relerp(rand(i*147), -1, 1, 0, -1),
                z,
                color: clr.hex('#4F0761'),
                spread: 0.7 + fn.relerp(parseInt(rand(i*147)*3), -3, 3, -0.5, 1.5),
                height: 2.5 + fn.relerp(parseInt(rand(i*147)*3), -3, 3, -1, 5),
            }),
        },
        {
            make: (i, x, y, z) => ({
                name: 'cliff',
                x,
                y: y+fn.relerp(rand(i*627), -1, 1, 0, -2),
                z,
                color: clr.hex('#4F0761'),
                spread: 0.7 + fn.relerp(parseInt(rand(i*627)*3), -3, 3, -0.5, 2),
                height: 2 + fn.relerp(parseInt(rand(i*627)*3), -3, 3, -1, 7),
            }),
        },
        {
            make: (i, x, y, z) => ({
                name: 'firefly',
                x,
                y,
                z,
                spread: 1.3 + 0.5 * parseInt(rand(i*147+222)*3)/3,
                height: 4.5 + fn.relerp(parseInt(rand(i*147+222)*3), -3, 3, -1, 4),
                color: clr.hex('#85FF00').alpha(fn.relerp(rand(i*147+222), -1, 1, 0.75, 0.95)),
            }),
        },
        {
            make: (i, x, y, z) => ({
                name: 'rain',
                x,
                y: y - fn.relerp(rand(i*147+222), -1, 1, 0, 10),
                z,
                spread: 2 + 0.5 * parseInt(rand(i*147+222)*3)/3,
                height: 5 + fn.relerp(parseInt(rand(i*147+222)*3), -3, 3, -1, 16),
                color: clr.rgba(1,1,1,0.2).alpha(fn.relerp(rand(i*147+222), -1, 1, 0.75, 0.95)),
                length: fn.relerp(rand(i*625), -1, 1, 5, 16),
                angle: 75 + rand(i*723)*10,
            }),
        },
    ];

    var pick = i => {
        var c = parseInt(fn.relerp(rand(i*222+147), -1, 1, 0, candidates.length))
        return candidates[c];
    };

    return (x, y, z) => {
        var front = -z;
        var front_layer = Math.ceil(front);
        var layers = [];
        for (var i=0; i<nlayer+2; i++) {
            var ilayer = fn.relerp(i, 0, nlayer+1, front_layer, front_layer - nlayer - 1);
            var ox = x + rand(ilayer*173) * 1996;
            var oy = y + rand(ilayer*731);
            var oz = fn.relerp(z+ilayer, 0, nlayer, 0, depth) + rand(ilayer*1997+3)*0.4;
            layers.push(pick(ilayer).make(ilayer, ox, oy, oz));
        }
        return layers;
    };
});

