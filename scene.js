'use strict';

define(['color', 'fn'], (clr, fn) => {
    return (states, keyframes, pages) => {
        // weather animation
        var raining = keyframes.raining;
        var lightning = fap.zip((raining, raining_edge, random) =>
                            raining && (raining_edge || random),
            raining,
            raining.edge(0).resample(1),
            fap.random.stretch(1/7184).map(x => x > 0.9 || x < -0.9).resample(1));
        window.kf = keyframes;

        var lightning_anim = fap.zip((a, b) => a*b,
                fap.wiggle.stretch(1 / 20).map(x => fn.relerp(x, -1, 1, 0.5, 1)),
                lightning.smooth(0.4));
        var raining_anim = raining.smooth(0.5);

        // prepare colors
        var colors = {};

        // TODO: title text color: 83CFEC
        colors.sky = {
            normal: clr.hex('#0075A2'),
            raining: clr.hex('#001F58'),
            lightning: clr.hex('#BE3FFF'),
        };
        colors.fog = colors.sky;

        colors.landscape = {
            normal: clr.hex('#03202B'),
            raining: clr.hex('#01141B'),
        };
        colors.landscape.lightning = colors.landscape.raining;

        var changing_color = colors => fap.zip(
            (base, a) => base.mix(colors.lightning, a),
            raining_anim.map(a => colors.normal.mix(colors.raining, a)),
            lightning_anim);

        var sky_color = changing_color(colors.sky);
        var fog_color = changing_color(colors.fog);
        var landscape_color = changing_color(colors.landscape);
        var mask = lightning_anim.map(a => clr.rgba(0, 0, 0, a));

        // prepare page actors
        var page_actors = fn.flatmap(pages, page => [
            fap.actor('dom', {
                element: page.title.element,
                x: page.title.x,
                y: page.title.y,
                z: page.title.z,
                a: fap.identity(1).cut(page.start, page.end, 0).smooth(0.3),
                color: clr.hex(page.title.color),
                size: [
                    fap.actor('font-size', { value: page.title.size }),
                ],
            }),
            fap.actor('dom', {
                element: page.content.element,
                x: page.content.x,
                y: page.content.y,
                z: page.content.z,
                a: fap.identity(1).cut(page.start, page.end, 0).smooth(0.2),
                color: clr.hex(page.content.color),
                size: [
                    fap.actor('font-size', { value: page.content.size }),
                    fap.actor('width', { value: page.content.w }),
                    fap.actor('height', { value: page.content.h }),
                ],
            }),
        ]);

        var double_control = name => {
            var state = states[name];
            var kf = keyframes[name];
            if (kf == null) return state;
            var e = state.edge(state.sample(0));
            var controlled = false;
            return fap.anim(t => {
                if (e.sample(t)) controlled = true;
                if (controlled) return state.sample(t);
                return kf.sample(t);
            });
        }

        // scene animation
        return fap.actor('scene', {
            time: keyframes.time,

            // camera
            x: double_control('x'),
            y: double_control('y'),
            z: double_control('z'),
            fov: double_control('fov'),
            rot: double_control('rot'),

            // color
            sky_color,
            fog_color,
            mask,

            // scene description
            data: [
                fap.actor('landscape', {
                    color: landscape_color,
                }),
                fap.actor('firefly', {
                    color: clr.hex('#85FF00').alpha(0.8),
                    working: raining.map(x => !x),
                }),
                fap.actor('rain', {
                    color: clr.rgba(1,1,1,0.8),
                    working: raining,
                }),
                fap.actor('bokeh', {
                    working: raining,
                }),
                ...page_actors,
            ],
        });
    };
});

