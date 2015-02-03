var SingleEvent = require('geval/single')
var MultipleEvent = require('geval/multiple')
var extend = require('xtend')
var value = require('observ')
var struct = require('observ-struct')
var Delegator = require('dom-delegator')
var main = require('main-loop')
var diff = require('virtual-dom/vtree/diff')
var create = require('virtual-dom/vdom/create-element')
var patch = require('virtual-dom/vdom/patch')


var mercury = module.exports = {
    // Entry
    app: app,
    // Input
    channels: channels,
    // State
    state: state,
}

function input(names) {
    if (!names) {
        return SingleEvent();
    }

    return MultipleEvent(names);
}

function state(obj) {
    var copy = extend(obj);
    var $channels = copy.channels;
    var $handles = copy.handles;

    if ($channels) {
        copy.channels = value(null);
    } else if ($handles) {
        copy.handles = value(null);
    }

    var observ = struct(copy);
    if ($channels) {
        observ.channels.set(channels($channels, observ));
    } else if ($handles) {
        observ.handles.set(channels($handles, observ));
    }
    return observ;
}

function channels(funcs, context) {
    return Object.keys(funcs).reduce(createHandle, {});

    function createHandle(acc, name) {
        var handle = Delegator.allocateHandle(
            funcs[name].bind(null, context));

        acc[name] = handle;
        return acc;
    }
}

function app(elem, observ, render, opts) {
    Delegator(opts);
    var loop = main(observ(), render, extend({
        diff: diff,
        create: create,
        patch: patch
    }, opts));
    if (elem) {
        elem.appendChild(loop.target);
    }
    return observ(loop.update);
}