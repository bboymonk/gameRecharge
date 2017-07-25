// Last time updated at August 31, 2016, 08:32:23

// Muaz Khan     - https://github.com/muaz-khan
// MIT License   - https://www.webrtc-experiment.com/licence/
// Documentation - https://github.com/muaz-khan/WebRTC-Experiment/tree/master/part-of-screen-sharing

// Note: All libraries listed in this file are "external libraries"
// ----  and has their own copyrights. Taken from "html2canvas" project.
(function (a, b, c, d, e, f) {
    function k(a, b, c, d, e) {
        return t(a, a, c, d, b, a.defaultView.pageXOffset, a.defaultView.pageYOffset).then(function (f) {
            R("Document cloned");
            var h = g + e, i = "[" + h + "='" + e + "']";
            a.querySelector(i).removeAttribute(h);
            var j = f.contentWindow, k = j.document.querySelector(i),
                m = "function" == typeof b.onclone ? Promise.resolve(b.onclone(j.document)) : Promise.resolve(!0);
            return m.then(function () {
                return l(k, f, b, c, d)
            })
        })
    }

    function l(a, c, d, e, f) {
        var g = c.contentWindow, h = new Ya(g.document), i = new P(d, h), j = Z(a),
            k = "view" === d.type ? e : o(g.document), l = "view" === d.type ? f : p(g.document),
            q = new d.renderer(k, l, i, d, b), r = new _(a, q, h, i, d);
        return r.ready.then(function () {
            R("Finished rendering");
            var b;
            return b = "view" === d.type ? n(q.canvas, {
                width: q.canvas.width,
                height: q.canvas.height,
                top: 0,
                left: 0,
                x: 0,
                y: 0
            }) : a === g.document.body || a === g.document.documentElement || null != d.canvas ? q.canvas : n(q.canvas, {
                width: null != d.width ? d.width : j.width,
                height: null != d.height ? d.height : j.height,
                top: j.top,
                left: j.left,
                x: g.pageXOffset,
                y: g.pageYOffset
            }), m(c, d), b
        })
    }

    function m(a, b) {
        b.removeContainer && (a.parentNode.removeChild(a), R("Cleaned up container"))
    }

    function n(a, c) {
        var d = b.createElement("canvas"), e = Math.min(a.width - 1, Math.max(0, c.left)),
            f = Math.min(a.width, Math.max(1, c.left + c.width)), g = Math.min(a.height - 1, Math.max(0, c.top)),
            h = Math.min(a.height, Math.max(1, c.top + c.height));
        return d.width = c.width, d.height = c.height, R("Cropping canvas at:", "left:", c.left, "top:", c.top, "width:", f - e, "height:", h - g), R("Resulting crop with width", c.width, "and height", c.height, " with x", e, "and y", g), d.getContext("2d").drawImage(a, e, g, f - e, h - g, c.x, c.y, f - e, h - g), d
    }

    function o(a) {
        return Math.max(Math.max(a.body.scrollWidth, a.documentElement.scrollWidth), Math.max(a.body.offsetWidth, a.documentElement.offsetWidth), Math.max(a.body.clientWidth, a.documentElement.clientWidth))
    }

    function p(a) {
        return Math.max(Math.max(a.body.scrollHeight, a.documentElement.scrollHeight), Math.max(a.body.offsetHeight, a.documentElement.offsetHeight), Math.max(a.body.clientHeight, a.documentElement.clientHeight))
    }

    function q() {
        return "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    }

    function r() {
        return b.documentMode && b.documentMode <= 9
    }

    function s(a, c) {
        for (var d = 3 === a.nodeType ? b.createTextNode(a.nodeValue) : a.cloneNode(!1), e = a.firstChild; e;)c !== !0 && 1 === e.nodeType && "SCRIPT" === e.nodeName || d.appendChild(s(e, c)), e = e.nextSibling;
        return d
    }

    function t(a, b, c, d, e, f, g) {
        y(a);
        var h = r() ? s(a.documentElement, e.javascriptEnabled) : a.documentElement.cloneNode(!0),
            i = b.createElement("iframe");
        return i.className = "html2canvas-container", i.style.visibility = "hidden", i.style.position = "fixed", i.style.left = "-10000px", i.style.top = "0px", i.style.border = "0", i.width = c, i.height = d, i.scrolling = "no", b.body.appendChild(i), new Promise(function (b) {
            var c = i.contentWindow.document;
            u(a.documentElement, h, "textarea"), u(a.documentElement, h, "select"), i.contentWindow.onload = i.onload = function () {
                var d = setInterval(function () {
                    c.body.childNodes.length > 0 && (z(a, c), clearInterval(d), "view" === e.type && i.contentWindow.scrollTo(f, g), b(i))
                }, 50)
            }, c.open(), c.write("<!DOCTYPE html><html></html>"), v(a, f, g), c.replaceChild(e.javascriptEnabled === !0 ? c.adoptNode(h) : A(c.adoptNode(h)), c.documentElement), c.close()
        })
    }

    function u(a, b, c) {
        for (var d = a.getElementsByTagName(c), e = b.getElementsByTagName(c), f = d.length, g = 0; g < f; g++)e[g].value = d[g].value
    }

    function v(a, b, c) {
        !a.defaultView || b === a.defaultView.pageXOffset && c === a.defaultView.pageYOffset || a.defaultView.scrollTo(b, c)
    }

    function w(b, c, d, e, f, g) {
        return new Ma(b, c, a.document).then(x(b)).then(function (a) {
            return t(a, d, e, f, g, 0, 0)
        })
    }

    function x(a) {
        return function (c) {
            var e, d = new DOMParser;
            try {
                e = d.parseFromString(c, "text/html")
            } catch (a) {
                R("DOMParser not supported, falling back to createHTMLDocument"), e = b.implementation.createHTMLDocument("");
                try {
                    e.open(), e.write(c), e.close()
                } catch (a) {
                    R("createHTMLDocument write not supported, falling back to document.body.innerHTML"), e.body.innerHTML = c
                }
            }
            var f = e.querySelector("base");
            if (!f || !f.href.host) {
                var g = e.createElement("base");
                g.href = a, e.head.insertBefore(g, e.head.firstChild)
            }
            return e
        }
    }

    function y(a) {
        [].slice.call(a.querySelectorAll("canvas"), 0).forEach(function (a) {
            a.setAttribute(h, "canvas-" + i++)
        })
    }

    function z(a, b) {
        [].slice.call(a.querySelectorAll("[" + h + "]"), 0).forEach(function (a) {
            try {
                var c = b.querySelector("[" + h + '="' + a.getAttribute(h) + '"]');
                c && (c.width = a.width, c.height = a.height, c.getContext("2d").putImageData(a.getContext("2d").getImageData(0, 0, a.width, a.height), 0, 0))
            } catch (b) {
                R("Unable to copy canvas content from", a, b)
            }
            a.removeAttribute(h)
        })
    }

    function A(a) {
        return [].slice.call(a.childNodes, 0).filter(B).forEach(function (b) {
            "SCRIPT" === b.tagName ? a.removeChild(b) : A(b)
        }), a
    }

    function B(a) {
        return a.nodeType === Node.ELEMENT_NODE
    }

    function C(a) {
        var c = b.createElement("a");
        return c.href = a, c.href = c.href, c
    }

    function D(a) {
        this.r = 0, this.g = 0, this.b = 0, this.a = null;
        this.fromArray(a) || this.namedColor(a) || this.rgb(a) || this.rgba(a) || this.hex6(a) || this.hex3(a)
    }

    function J(a) {
        if (this.src = a, R("DummyImageContainer for", a), !this.promise || !this.image) {
            R("Initiating DummyImageContainer"), J.prototype.image = new Image;
            var b = this.image;
            J.prototype.promise = new Promise(function (a, c) {
                b.onload = a, b.onerror = c, b.src = q(), b.complete === !0 && a(b)
            })
        }
    }

    function K(a, c) {
        var h, i, d = b.createElement("div"), e = b.createElement("img"), f = b.createElement("span"),
            g = "Hidden Text";
        d.style.visibility = "hidden", d.style.fontFamily = a, d.style.fontSize = c, d.style.margin = 0, d.style.padding = 0, b.body.appendChild(d), e.src = q(), e.width = 1, e.height = 1, e.style.margin = 0, e.style.padding = 0, e.style.verticalAlign = "baseline", f.style.fontFamily = a, f.style.fontSize = c, f.style.margin = 0, f.style.padding = 0, f.appendChild(b.createTextNode(g)), d.appendChild(f), d.appendChild(e), h = e.offsetTop - f.offsetTop + 1, d.removeChild(f), d.appendChild(b.createTextNode(g)), d.style.lineHeight = "normal", e.style.verticalAlign = "super", i = e.offsetTop - d.offsetTop + 1, b.body.removeChild(d), this.baseline = h, this.lineWidth = 1, this.middle = i
    }

    function L() {
        this.data = {}
    }

    function M(a, b, c) {
        this.image = null, this.src = a;
        var d = this, e = Z(a);
        this.promise = (b ? new Promise(function (b) {
            "about:blank" === a.contentWindow.document.URL || null == a.contentWindow.document.documentElement ? a.contentWindow.onload = a.onload = function () {
                b(a)
            } : b(a)
        }) : this.proxyLoad(c.proxy, e, c)).then(function (a) {
            return html2canvas(a.contentWindow.document.documentElement, {
                type: "view",
                width: a.width,
                height: a.height,
                proxy: c.proxy,
                javascriptEnabled: c.javascriptEnabled,
                removeContainer: c.removeContainer,
                allowTaint: c.allowTaint,
                imageTimeout: c.imageTimeout / 2
            })
        }).then(function (a) {
            return d.image = a
        })
    }

    function N(a) {
        this.src = a.value, this.colorStops = [], this.type = null, this.x0 = .5, this.y0 = .5, this.x1 = .5, this.y1 = .5, this.promise = Promise.resolve(!0)
    }

    function O(a, b) {
        this.src = a, this.image = new Image;
        var c = this;
        this.tainted = null, this.promise = new Promise(function (d, e) {
            c.image.onload = d, c.image.onerror = e, b && (c.image.crossOrigin = "anonymous"), c.image.src = a, c.image.complete === !0 && d(c.image)
        })
    }

    function P(b, c) {
        this.link = null, this.options = b, this.support = c, this.origin = this.getOrigin(a.location.href)
    }

    function Q(a) {
        N.apply(this, arguments), this.type = this.TYPES.LINEAR;
        var b = null === a.args[0].match(this.stepRegExp);
        b ? a.args[0].split(" ").reverse().forEach(function (a) {
            switch (a) {
                case"left":
                    this.x0 = 0, this.x1 = 1;
                    break;
                case"top":
                    this.y0 = 0, this.y1 = 1;
                    break;
                case"right":
                    this.x0 = 1, this.x1 = 0;
                    break;
                case"bottom":
                    this.y0 = 1, this.y1 = 0;
                    break;
                case"to":
                    var b = this.y0, c = this.x0;
                    this.y0 = this.y1, this.x0 = this.x1, this.x1 = c, this.y1 = b
            }
        }, this) : (this.y0 = 0, this.y1 = 1), this.colorStops = a.args.slice(b ? 1 : 0).map(function (a) {
            var b = a.match(this.stepRegExp);
            return {color: new D(b[1]), stop: "%" === b[3] ? b[2] / 100 : null}
        }, this), null === this.colorStops[0].stop && (this.colorStops[0].stop = 0), null === this.colorStops[this.colorStops.length - 1].stop && (this.colorStops[this.colorStops.length - 1].stop = 1), this.colorStops.forEach(function (a, b) {
            null === a.stop && this.colorStops.slice(b).some(function (c, d) {
                return null !== c.stop && (a.stop = (c.stop - this.colorStops[b - 1].stop) / (d + 1) + this.colorStops[b - 1].stop, !0)
            }, this)
        }, this)
    }

    function R() {
        a.html2canvas.logging && a.console && a.console.log && Function.prototype.bind.call(a.console.log, a.console).apply(a.console, [Date.now() - a.html2canvas.start + "ms", "html2canvas:"].concat([].slice.call(arguments, 0)))
    }

    function S(a, b) {
        this.node = a, this.parent = b, this.stack = null, this.bounds = null, this.borders = null, this.clip = [], this.backgroundClip = [], this.offsetBounds = null, this.visible = null, this.computedStyles = null, this.colors = {}, this.styles = {}, this.backgroundImages = null, this.transformData = null, this.transformMatrix = null, this.isPseudoElement = !1, this.opacity = null
    }

    function T(a) {
        var b = a.options[a.selectedIndex || 0];
        return b ? b.text || "" : ""
    }

    function U(a) {
        if (a && "matrix" === a[1])return a[2].split(",").map(function (a) {
            return parseFloat(a.trim())
        })
    }

    function V(a) {
        return a.toString().indexOf("%") !== -1
    }

    function W(a) {
        var c, d, e, f, g, k, l, b = " \r\n\t", h = [], i = 0, j = 0, m = function () {
            c && ('"' === d.substr(0, 1) && (d = d.substr(1, d.length - 2)), d && l.push(d), "-" === c.substr(0, 1) && (f = c.indexOf("-", 1) + 1) > 0 && (e = c.substr(0, f), c = c.substr(f)), h.push({
                prefix: e,
                method: c.toLowerCase(),
                value: g,
                args: l,
                image: null
            })), l = [], c = e = d = g = ""
        };
        return l = [], c = e = d = g = "", a.split("").forEach(function (a) {
            if (!(0 === i && b.indexOf(a) > -1)) {
                switch (a) {
                    case'"':
                        k ? k === a && (k = null) : k = a;
                        break;
                    case"(":
                        if (k)break;
                        if (0 === i)return i = 1, void(g += a);
                        j++;
                        break;
                    case")":
                        if (k)break;
                        if (1 === i) {
                            if (0 === j)return i = 0, g += a, void m();
                            j--
                        }
                        break;
                    case",":
                        if (k)break;
                        if (0 === i)return void m();
                        if (1 === i && 0 === j && !c.match(/^url$/i))return l.push(d), d = "", void(g += a)
                }
                g += a, 0 === i ? c += a : d += a
            }
        }), m(), h
    }

    function X(a) {
        return a.replace("px", "")
    }

    function Y(a) {
        return parseFloat(a)
    }

    function Z(a) {
        if (a.getBoundingClientRect) {
            var b = a.getBoundingClientRect(), c = null == a.offsetWidth ? b.width : a.offsetWidth;
            return {
                top: b.top,
                bottom: b.bottom || b.top + b.height,
                right: b.left + c,
                left: b.left,
                width: c,
                height: null == a.offsetHeight ? b.height : a.offsetHeight
            }
        }
        return {}
    }

    function $(a) {
        var b = a.offsetParent ? $(a.offsetParent) : {top: 0, left: 0};
        return {
            top: a.offsetTop + b.top,
            bottom: a.offsetTop + a.offsetHeight + b.top,
            right: a.offsetLeft + b.left + a.offsetWidth,
            left: a.offsetLeft + b.left,
            width: a.offsetWidth,
            height: a.offsetHeight
        }
    }

    function _(a, b, c, d, e) {
        R("Starting NodeParser"), this.renderer = b, this.options = e, this.range = null, this.support = c, this.renderQueue = [], this.stack = new Xa(!0, 1, a.ownerDocument, null);
        var f = new S(a, null);
        if (e.background && b.rectangle(0, 0, b.width, b.height, new D(e.background)), a === a.ownerDocument.documentElement) {
            var g = new S(f.color("backgroundColor").isTransparent() ? a.ownerDocument.body : a.ownerDocument.documentElement, null);
            b.rectangle(0, 0, b.width, b.height, g.color("backgroundColor"))
        }
        f.visibile = f.isElementVisible(), this.createPseudoHideStyles(a.ownerDocument), this.disableAnimations(a.ownerDocument), this.nodes = Ha([f].concat(this.getChildren(f)).filter(function (a) {
            return a.visible = a.isElementVisible()
        }).map(this.getPseudoElements, this)), this.fontMetrics = new L, R("Fetched nodes, total:", this.nodes.length), R("Calculate overflow clips"), this.calculateOverflowClips(), R("Start fetching images"), this.images = d.fetch(this.nodes.filter(ya)), this.ready = this.images.ready.then(Da(function () {
            return R("Images loaded, starting parsing"), R("Creating stacking contexts"), this.createStackingContexts(), R("Sorting stacking contexts"), this.sortStackingContexts(this.stack), this.parse(this.stack), R("Render queue created with " + this.renderQueue.length + " items"), new Promise(Da(function (a) {
                e.async ? "function" == typeof e.async ? e.async.call(this, this.renderQueue, a) : this.renderQueue.length > 0 ? (this.renderIndex = 0, this.asyncRenderer(this.renderQueue, a)) : a() : (this.renderQueue.forEach(this.paint, this), a())
            }, this))
        }, this))
    }

    function aa(a) {
        return a.parent && a.parent.clip.length
    }

    function ba(a) {
        return a.replace(/(\-[a-z])/g, function (a) {
            return a.toUpperCase().replace("-", "")
        })
    }

    function ca() {
    }

    function ea(a, b, c, d) {
        return a.map(function (e, f) {
            if (e.width > 0) {
                var g = b.left, h = b.top, i = b.width, j = b.height - a[2].width;
                switch (f) {
                    case 0:
                        j = a[0].width, e.args = ia({
                            c1: [g, h],
                            c2: [g + i, h],
                            c3: [g + i - a[1].width, h + j],
                            c4: [g + a[3].width, h + j]
                        }, d[0], d[1], c.topLeftOuter, c.topLeftInner, c.topRightOuter, c.topRightInner);
                        break;
                    case 1:
                        g = b.left + b.width - a[1].width, i = a[1].width, e.args = ia({
                            c1: [g + i, h],
                            c2: [g + i, h + j + a[2].width],
                            c3: [g, h + j],
                            c4: [g, h + a[0].width]
                        }, d[1], d[2], c.topRightOuter, c.topRightInner, c.bottomRightOuter, c.bottomRightInner);
                        break;
                    case 2:
                        h = h + b.height - a[2].width, j = a[2].width, e.args = ia({
                            c1: [g + i, h + j],
                            c2: [g, h + j],
                            c3: [g + a[3].width, h],
                            c4: [g + i - a[3].width, h]
                        }, d[2], d[3], c.bottomRightOuter, c.bottomRightInner, c.bottomLeftOuter, c.bottomLeftInner);
                        break;
                    case 3:
                        i = a[3].width, e.args = ia({
                            c1: [g, h + j + a[2].width],
                            c2: [g, h],
                            c3: [g + i, h + a[0].width],
                            c4: [g + i, h + j]
                        }, d[3], d[0], c.bottomLeftOuter, c.bottomLeftInner, c.topLeftOuter, c.topLeftInner)
                }
            }
            return e
        })
    }

    function fa(a, b, c, d) {
        var e = 4 * ((Math.sqrt(2) - 1) / 3), f = c * e, g = d * e, h = a + c, i = b + d;
        return {
            topLeft: ha({x: a, y: i}, {x: a, y: i - g}, {x: h - f, y: b}, {x: h, y: b}),
            topRight: ha({x: a, y: b}, {x: a + f, y: b}, {x: h, y: i - g}, {x: h, y: i}),
            bottomRight: ha({x: h, y: b}, {x: h, y: b + g}, {x: a + f, y: i}, {x: a, y: i}),
            bottomLeft: ha({x: h, y: i}, {x: h - f, y: i}, {x: a, y: b + g}, {x: a, y: b})
        }
    }

    function ga(a, b, c) {
        var d = a.left, e = a.top, f = a.width, g = a.height, h = b[0][0], i = b[0][1], j = b[1][0], k = b[1][1],
            l = b[2][0], m = b[2][1], n = b[3][0], o = b[3][1], p = f - j, q = g - m, r = f - l, s = g - o;
        return {
            topLeftOuter: fa(d, e, h, i).topLeft.subdivide(.5),
            topLeftInner: fa(d + c[3].width, e + c[0].width, Math.max(0, h - c[3].width), Math.max(0, i - c[0].width)).topLeft.subdivide(.5),
            topRightOuter: fa(d + p, e, j, k).topRight.subdivide(.5),
            topRightInner: fa(d + Math.min(p, f + c[3].width), e + c[0].width, p > f + c[3].width ? 0 : j - c[3].width, k - c[0].width).topRight.subdivide(.5),
            bottomRightOuter: fa(d + r, e + q, l, m).bottomRight.subdivide(.5),
            bottomRightInner: fa(d + Math.min(r, f - c[3].width), e + Math.min(q, g + c[0].width), Math.max(0, l - c[1].width), m - c[2].width).bottomRight.subdivide(.5),
            bottomLeftOuter: fa(d, e + s, n, o).bottomLeft.subdivide(.5),
            bottomLeftInner: fa(d + c[3].width, e + s, Math.max(0, n - c[3].width), o - c[2].width).bottomLeft.subdivide(.5)
        }
    }

    function ha(a, b, c, d) {
        var e = function (a, b, c) {
            return {x: a.x + (b.x - a.x) * c, y: a.y + (b.y - a.y) * c}
        };
        return {
            start: a, startControl: b, endControl: c, end: d, subdivide: function (f) {
                var g = e(a, b, f), h = e(b, c, f), i = e(c, d, f), j = e(g, h, f), k = e(h, i, f), l = e(j, k, f);
                return [ha(a, g, j, l), ha(l, k, i, d)]
            }, curveTo: function (a) {
                a.push(["bezierCurve", b.x, b.y, c.x, c.y, d.x, d.y])
            }, curveToReversed: function (d) {
                d.push(["bezierCurve", c.x, c.y, b.x, b.y, a.x, a.y])
            }
        }
    }

    function ia(a, b, c, d, e, f, g) {
        var h = [];
        return b[0] > 0 || b[1] > 0 ? (h.push(["line", d[1].start.x, d[1].start.y]), d[1].curveTo(h)) : h.push(["line", a.c1[0], a.c1[1]]), c[0] > 0 || c[1] > 0 ? (h.push(["line", f[0].start.x, f[0].start.y]), f[0].curveTo(h), h.push(["line", g[0].end.x, g[0].end.y]), g[0].curveToReversed(h)) : (h.push(["line", a.c2[0], a.c2[1]]), h.push(["line", a.c3[0], a.c3[1]])), b[0] > 0 || b[1] > 0 ? (h.push(["line", e[1].end.x, e[1].end.y]), e[1].curveToReversed(h)) : h.push(["line", a.c4[0], a.c4[1]]), h
    }

    function ja(a, b, c, d, e, f, g) {
        b[0] > 0 || b[1] > 0 ? (a.push(["line", d[0].start.x, d[0].start.y]), d[0].curveTo(a), d[1].curveTo(a)) : a.push(["line", f, g]), (c[0] > 0 || c[1] > 0) && a.push(["line", e[0].start.x, e[0].start.y])
    }

    function ka(a) {
        return a.cssInt("zIndex") < 0
    }

    function la(a) {
        return a.cssInt("zIndex") > 0
    }

    function ma(a) {
        return 0 === a.cssInt("zIndex")
    }

    function na(a) {
        return ["inline", "inline-block", "inline-table"].indexOf(a.css("display")) !== -1
    }

    function oa(a) {
        return a instanceof Xa
    }

    function pa(a) {
        return a.node.data.trim().length > 0
    }

    function qa(a) {
        return /^(normal|none|0px)$/.test(a.parent.css("letterSpacing"))
    }

    function ra(a) {
        return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function (b) {
            var c = a.css("border" + b + "Radius"), d = c.split(" ");
            return d.length <= 1 && (d[1] = d[0]), d.map(Ea)
        })
    }

    function sa(a) {
        return a.nodeType === Node.TEXT_NODE || a.nodeType === Node.ELEMENT_NODE
    }

    function ta(a) {
        var b = a.css("position"), c = ["absolute", "relative", "fixed"].indexOf(b) !== -1 ? a.css("zIndex") : "auto";
        return "auto" !== c
    }

    function ua(a) {
        return "static" !== a.css("position")
    }

    function va(a) {
        return "none" !== a.css("float")
    }

    function wa(a) {
        return ["inline-block", "inline-table"].indexOf(a.css("display")) !== -1
    }

    function xa(a) {
        var b = this;
        return function () {
            return !a.apply(b, arguments)
        }
    }

    function ya(a) {
        return a.node.nodeType === Node.ELEMENT_NODE
    }

    function za(a) {
        return a.isPseudoElement === !0
    }

    function Aa(a) {
        return a.node.nodeType === Node.TEXT_NODE
    }

    function Ba(a) {
        return function (b, c) {
            return b.cssInt("zIndex") + a.indexOf(b) / a.length - (c.cssInt("zIndex") + a.indexOf(c) / a.length)
        }
    }

    function Ca(a) {
        return a.getOpacity() < 1
    }

    function Da(a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    }

    function Ea(a) {
        return parseInt(a, 10)
    }

    function Fa(a) {
        return a.width
    }

    function Ga(a) {
        return a.node.nodeType !== Node.ELEMENT_NODE || ["SCRIPT", "HEAD", "TITLE", "OBJECT", "BR", "OPTION"].indexOf(a.node.nodeName) === -1
    }

    function Ha(a) {
        return [].concat.apply([], a)
    }

    function Ia(a) {
        var b = a.substr(0, 1);
        return b === a.substr(a.length - 1) && b.match(/'|"/) ? a.substr(1, a.length - 2) : a
    }

    function Ja(b) {
        for (var f, c = [], d = 0, e = !1; b.length;)Ka(b[d]) === e ? (f = b.splice(0, d), f.length && c.push(a.html2canvas.punycode.ucs2.encode(f)), e = !e, d = 0) : d++, d >= b.length && (f = b.splice(0, d), f.length && c.push(a.html2canvas.punycode.ucs2.encode(f)));
        return c
    }

    function Ka(a) {
        return [32, 13, 10, 9, 45].indexOf(a) !== -1
    }

    function La(a) {
        return /[^\u0000-\u00ff]/.test(a)
    }

    function Ma(a, b, c) {
        if (!b)return Promise.reject("No proxy configured");
        var d = Sa(Oa), e = Ta(b, a, d);
        return Oa ? db(e) : Ra(c, e, d).then(function (a) {
            return $a(a.content)
        })
    }

    function Qa(a, b, c) {
        var d = Sa(Pa), e = Ta(b, a, d);
        return Pa ? Promise.resolve(e) : Ra(c, e, d).then(function (a) {
            return "data:" + a.type + ";base64," + a.content
        })
    }

    function Ra(b, c, d) {
        return new Promise(function (e, f) {
            var g = b.createElement("script"), h = function () {
                delete a.html2canvas.proxy[d], b.body.removeChild(g)
            };
            a.html2canvas.proxy[d] = function (a) {
                h(), e(a)
            }, g.src = c, g.onerror = function (a) {
                h(), f(a)
            }, b.body.appendChild(g)
        })
    }

    function Sa(a) {
        return a ? "" : "html2canvas_" + Date.now() + "_" + ++Na + "_" + Math.round(1e5 * Math.random())
    }

    function Ta(a, b, c) {
        return a + "?url=" + encodeURIComponent(b) + (c.length ? "&callback=html2canvas.proxy." + c : "")
    }

    function Ua(a, c) {
        var e = (b.createElement("script"), b.createElement("a"));
        e.href = a, a = e.href, this.src = a, this.image = new Image;
        var f = this;
        this.promise = new Promise(function (d, e) {
            f.image.crossOrigin = "Anonymous", f.image.onload = d, f.image.onerror = e, new Qa(a, c, b).then(function (a) {
                f.image.src = a
            }).catch(e)
        })
    }

    function Va(a, b, c) {
        S.call(this, a, b), this.isPseudoElement = !0, this.before = ":before" === c
    }

    function Wa(a, b, c, d, e) {
        this.width = a, this.height = b, this.images = c, this.options = d, this.document = e
    }

    function Xa(a, b, c, d) {
        S.call(this, c, d), this.ownStacking = a, this.contexts = [], this.children = [], this.opacity = (this.parent ? this.parent.stack.opacity : 1) * b
    }

    function Ya(a) {
        this.rangeBounds = this.testRangeBounds(a), this.cors = this.testCORS(), this.svg = this.testSVG()
    }

    function Za(a) {
        this.src = a, this.image = null;
        var b = this;
        this.promise = this.hasFabric().then(function () {
            return b.isInline(a) ? Promise.resolve(b.inlineFormatting(a)) : db(a)
        }).then(function (a) {
            return new Promise(function (c) {
                html2canvas.fabric.loadSVGFromString(a, b.createCanvas.call(b, c))
            })
        })
    }

    function $a(a) {
        var d, e, f, g, h, i, j, k, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
            c = a.length, l = "";
        for (d = 0; d < c; d += 4)e = b.indexOf(a[d]), f = b.indexOf(a[d + 1]), g = b.indexOf(a[d + 2]), h = b.indexOf(a[d + 3]), i = e << 2 | f >> 4, j = (15 & f) << 4 | g >> 2, k = (3 & g) << 6 | h, l += 64 === g ? String.fromCharCode(i) : 64 === h || h === -1 ? String.fromCharCode(i, j) : String.fromCharCode(i, j, k);
        return l
    }

    function _a(a, b) {
        this.src = a, this.image = null;
        var c = this;
        this.promise = b ? new Promise(function (b, d) {
            c.image = new Image, c.image.onload = b, c.image.onerror = d, c.image.src = "data:image/svg+xml," + (new XMLSerializer).serializeToString(a), c.image.complete === !0 && b(c.image)
        }) : this.hasFabric().then(function () {
            return new Promise(function (b) {
                html2canvas.fabric.parseSVGDocument(a, c.createCanvas.call(c, b))
            })
        })
    }

    function ab(a, b) {
        S.call(this, a, b)
    }

    function bb(a, b, c) {
        if (a.length > 0)return b + c.toUpperCase()
    }

    function cb(a) {
        N.apply(this, arguments), this.type = "linear" === a.args[0] ? this.TYPES.LINEAR : this.TYPES.RADIAL
    }

    function db(a) {
        return new Promise(function (b, c) {
            var d = new XMLHttpRequest;
            d.open("GET", a), d.onload = function () {
                200 === d.status ? b(d.responseText) : c(new Error(d.statusText))
            }, d.onerror = function () {
                c(new Error("Network Error"))
            }, d.send()
        })
    }

    function eb(a, b) {
        Wa.apply(this, arguments), this.canvas = this.options.canvas || this.document.createElement("canvas"), this.options.canvas || (this.canvas.width = a, this.canvas.height = b), this.ctx = this.canvas.getContext("2d"), this.taintCtx = this.document.createElement("canvas").getContext("2d"), this.ctx.textBaseline = "bottom", this.variables = {}, R("Initialized CanvasRenderer with size", a, "x", b)
    }

    function fb(a) {
        return a.length > 0
    }

    function jb(a) {
        return gb ? (hb = event.clientX + b.body.scrollLeft, ib = event.clientY + b.body.scrollTop) : (hb = a.pageX, ib = a.pageY), hb < 0 && (hb = 0), ib < 0 && (ib = 0), !0
    }

    if (function () {
            function c(a, b) {
                E[B] = a, E[B + 1] = b, B += 2, 2 === B && F()
            }

            function f(a) {
                return "function" == typeof a
            }

            function g() {
                return function () {
                    process.nextTick(k)
                }
            }

            function h() {
                var a = 0, c = new D(k), d = b.createTextNode("");
                return c.observe(d, {characterData: !0}), function () {
                    d.data = a = ++a % 2
                }
            }

            function i() {
                var a = new MessageChannel;
                return a.port1.onmessage = k, function () {
                    a.port2.postMessage(0)
                }
            }

            function j() {
                return function () {
                    setTimeout(k, 1)
                }
            }

            function k() {
                for (var a = 0; a < B; a += 2)(0, E[a])(E[a + 1]), E[a] = void 0, E[a + 1] = void 0;
                B = 0
            }

            function l() {
            }

            function m(a, b, c, d) {
                try {
                    a.call(b, c, d)
                } catch (a) {
                    return a
                }
            }

            function n(a, b, d) {
                c(function (a) {
                    var c = !1, e = m(d, b, function (d) {
                        c || (c = !0, b !== d ? p(a, d) : r(a, d))
                    }, function (b) {
                        c || (c = !0, s(a, b))
                    });
                    !c && e && (c = !0, s(a, e))
                }, a)
            }

            function o(a, b) {
                1 === b.a ? r(a, b.b) : 2 === a.a ? s(a, b.b) : t(b, void 0, function (b) {
                    p(a, b)
                }, function (b) {
                    s(a, b)
                })
            }

            function p(a, b) {
                if (a === b) s(a, new TypeError("You cannot resolve a promise with itself")); else if ("function" == typeof b || "object" == typeof b && null !== b)if (b.constructor === a.constructor) o(a, b); else {
                    var c;
                    try {
                        c = b.then
                    } catch (a) {
                        G.error = a, c = G
                    }
                    c === G ? s(a, G.error) : void 0 === c ? r(a, b) : f(c) ? n(a, b, c) : r(a, b)
                } else r(a, b)
            }

            function q(a) {
                a.f && a.f(a.b), u(a)
            }

            function r(a, b) {
                void 0 === a.a && (a.b = b, a.a = 1, 0 !== a.e.length && c(u, a))
            }

            function s(a, b) {
                void 0 === a.a && (a.a = 2, a.b = b, c(q, a))
            }

            function t(a, b, d, e) {
                var f = a.e, g = f.length;
                a.f = null, f[g] = b, f[g + 1] = d, f[g + 2] = e, 0 === g && a.a && c(u, a)
            }

            function u(a) {
                var b = a.e, c = a.a;
                if (0 !== b.length) {
                    for (var d, e, f = a.b, g = 0; g < b.length; g += 3)d = b[g], e = b[g + c], d ? w(c, d, e, f) : e(f);
                    a.e.length = 0
                }
            }

            function v() {
                this.error = null
            }

            function w(a, b, c, d) {
                var g, h, i, j, e = f(c);
                if (e) {
                    try {
                        g = c(d)
                    } catch (a) {
                        H.error = a, g = H
                    }
                    if (g === H ? (j = !0, h = g.error, g = null) : i = !0, b === g)return void s(b, new TypeError("A promises callback cannot return that same promise."))
                } else g = d, i = !0;
                void 0 === b.a && (e && i ? p(b, g) : j ? s(b, h) : 1 === a ? r(b, g) : 2 === a && s(b, g))
            }

            function x(a, b) {
                try {
                    b(function (b) {
                        p(a, b)
                    }, function (b) {
                        s(a, b)
                    })
                } catch (b) {
                    s(a, b)
                }
            }

            function y(a, b, c, d) {
                this.n = a, this.c = new a(l, d), this.i = c, this.o(b) ? (this.m = b, this.d = this.length = b.length, this.l(), 0 === this.length ? r(this.c, this.b) : (this.length = this.length || 0, this.k(), 0 === this.d && r(this.c, this.b))) : s(this.c, this.p())
            }

            function z(a) {
                if (I++, this.b = this.a = void 0, this.e = [], l !== a) {
                    if (!f(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                    if (!(this instanceof z))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    x(this, a)
                }
            }

            var F, A = Array.isArray ? Array.isArray : function (a) {
                    return "[object Array]" === Object.prototype.toString.call(a)
                }, B = 0, C = "undefined" != typeof a ? a : {}, D = C.MutationObserver || C.WebKitMutationObserver,
                C = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
                E = Array(1e3);
            F = "undefined" != typeof process && "[object process]" === {}.toString.call(process) ? g() : D ? h() : C ? i() : j();
            var G = new v, H = new v;
            y.prototype.o = function (a) {
                return A(a)
            }, y.prototype.p = function () {
                return Error("Array Methods must be provided an Array")
            }, y.prototype.l = function () {
                this.b = Array(this.length)
            }, y.prototype.k = function () {
                for (var a = this.length, b = this.c, c = this.m, d = 0; void 0 === b.a && d < a; d++)this.j(c[d], d)
            }, y.prototype.j = function (a, b) {
                var c = this.n;
                "object" == typeof a && null !== a ? a.constructor === c && void 0 !== a.a ? (a.f = null, this.g(a.a, b, a.b)) : this.q(c.resolve(a), b) : (this.d--, this.b[b] = this.h(a))
            }, y.prototype.g = function (a, b, c) {
                var d = this.c;
                void 0 === d.a && (this.d--, this.i && 2 === a ? s(d, c) : this.b[b] = this.h(c)), 0 === this.d && r(d, this.b)
            }, y.prototype.h = function (a) {
                return a
            }, y.prototype.q = function (a, b) {
                var c = this;
                t(a, void 0, function (a) {
                    c.g(1, b, a)
                }, function (a) {
                    c.g(2, b, a)
                })
            };
            var I = 0;
            z.all = function (a, b) {
                return new y(this, a, !0, b).c
            }, z.race = function (a, b) {
                function c(a) {
                    p(e, a)
                }

                function d(a) {
                    s(e, a)
                }

                var e = new this(l, b);
                if (!A(a))return s(e, new TypeError("You must pass an array to race.")), e;
                for (var f = a.length, g = 0; void 0 === e.a && g < f; g++)t(this.resolve(a[g]), void 0, c, d);
                return e
            }, z.resolve = function (a, b) {
                if (a && "object" == typeof a && a.constructor === this)return a;
                var c = new this(l, b);
                return p(c, a), c
            }, z.reject = function (a, b) {
                var c = new this(l, b);
                return s(c, a), c
            }, z.prototype = {
                constructor: z, then: function (a, b) {
                    var d = this.a;
                    if (1 === d && !a || 2 === d && !b)return this;
                    var e = new this.constructor(l), f = this.b;
                    if (d) {
                        var g = arguments[d - 1];
                        c(function () {
                            w(d, e, g, f)
                        })
                    } else t(this, e, a, b);
                    return e
                }, catch: function (a) {
                    return this.then(null, a)
                }
            };
            var J = {
                Promise: z, polyfill: function () {
                    var b;
                    b = "undefined" != typeof d ? d : "undefined" != typeof a && a.document ? a : self, "Promise" in b && "resolve" in b.Promise && "reject" in b.Promise && "all" in b.Promise && "race" in b.Promise && function () {
                        var a;
                        return new b.Promise(function (b) {
                            a = b
                        }), f(a)
                    }() || (b.Promise = z)
                }
            };
            "function" == typeof e && e.amd ? e(function () {
                return J
            }) : "undefined" != typeof module && module.exports ? module.exports = J : "undefined" != typeof this && (this.ES6Promise = J)
        }.call(a), a && a.ES6Promise.polyfill(), "undefined" == typeof b || "function" != typeof Object.create || "function" != typeof b.createElement("canvas").getContext)return void((a || module.exports).html2canvas = function () {
        return Promise.reject("No canvas support")
    });
    !function (a) {
        function z(a) {
            throw RangeError(u[a])
        }

        function A(a, b) {
            for (var c = a.length, d = []; c--;)d[c] = b(a[c]);
            return d
        }

        function B(a, b) {
            var c = a.split("@"), d = "";
            c.length > 1 && (d = c[0] + "@", a = c[1]);
            var e = a.split(t), f = A(e, b).join(".");
            return d + f
        }

        function C(a) {
            for (var e, f, b = [], c = 0, d = a.length; c < d;)e = a.charCodeAt(c++), e >= 55296 && e <= 56319 && c < d ? (f = a.charCodeAt(c++), 56320 == (64512 & f) ? b.push(((1023 & e) << 10) + (1023 & f) + 65536) : (b.push(e), c--)) : b.push(e);
            return b
        }

        function D(a) {
            return A(a, function (a) {
                var b = "";
                return a > 65535 && (a -= 65536, b += x(a >>> 10 & 1023 | 55296), a = 56320 | 1023 & a), b += x(a)
            }).join("")
        }

        function E(a) {
            return a - 48 < 10 ? a - 22 : a - 65 < 26 ? a - 65 : a - 97 < 26 ? a - 97 : j
        }

        function F(a, b) {
            return a + 22 + 75 * (a < 26) - ((0 != b) << 5)
        }

        function G(a, b, c) {
            var d = 0;
            for (a = c ? w(a / n) : a >> 1, a += w(a / b); a > v * l >> 1; d += j)a = w(a / v);
            return w(d + (v + 1) * a / (a + m))
        }

        function H(a) {
            var d, h, m, n, r, s, t, u, v, x, b = [], c = a.length, e = 0, f = p, g = o;
            for (h = a.lastIndexOf(q), h < 0 && (h = 0), m = 0; m < h; ++m)a.charCodeAt(m) >= 128 && z("not-basic"), b.push(a.charCodeAt(m));
            for (n = h > 0 ? h + 1 : 0; n < c;) {
                for (r = e, s = 1, t = j; n >= c && z("invalid-input"), u = E(a.charCodeAt(n++)), (u >= j || u > w((i - e) / s)) && z("overflow"), e += u * s, v = t <= g ? k : t >= g + l ? l : t - g, !(u < v); t += j)x = j - v, s > w(i / x) && z("overflow"), s *= x;
                d = b.length + 1, g = G(e - r, d, 0 == r), w(e / d) > i - f && z("overflow"), f += w(e / d), e %= d, b.splice(e++, 0, f)
            }
            return D(b)
        }

        function I(a) {
            var b, c, d, e, f, g, h, m, n, r, s, u, v, y, A, t = [];
            for (a = C(a), u = a.length, b = p, c = 0, f = o, g = 0; g < u; ++g)s = a[g], s < 128 && t.push(x(s));
            for (d = e = t.length, e && t.push(q); d < u;) {
                for (h = i, g = 0; g < u; ++g)s = a[g], s >= b && s < h && (h = s);
                for (v = d + 1, h - b > w((i - c) / v) && z("overflow"), c += (h - b) * v, b = h, g = 0; g < u; ++g)if (s = a[g], s < b && ++c > i && z("overflow"), s == b) {
                    for (m = c, n = j; r = n <= f ? k : n >= f + l ? l : n - f, !(m < r); n += j)A = m - r, y = j - r, t.push(x(F(r + A % y, 0))), m = w(A / y);
                    t.push(x(F(m, 0))), f = G(c, v, d == e), c = 0, ++d
                }
                ++c, ++b
            }
            return t.join("")
        }

        function J(a) {
            return B(a, function (a) {
                return r.test(a) ? H(a.slice(4).toLowerCase()) : a
            })
        }

        function K(a) {
            return B(a, function (a) {
                return s.test(a) ? "xn--" + I(a) : a
            })
        }

        var b = "object" == typeof c && c && !c.nodeType && c,
            f = "object" == typeof module && module && !module.nodeType && module, g = "object" == typeof d && d;
        g.global !== g && g.window !== g && g.self !== g || (a = g);
        var h, y, i = 2147483647, j = 36, k = 1, l = 26, m = 38, n = 700, o = 72, p = 128, q = "-", r = /^xn--/,
            s = /[^\x20-\x7E]/, t = /[\x2E\u3002\uFF0E\uFF61]/g, u = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            }, v = j - k, w = Math.floor, x = String.fromCharCode;
        if (h = {
                version: "1.3.1",
                ucs2: {decode: C, encode: D},
                decode: H,
                encode: I,
                toASCII: K,
                toUnicode: J
            }, "function" == typeof e && "object" == typeof e.amd && e.amd) e("punycode", function () {
            return h
        }); else if (b && f)if (module.exports == b) f.exports = h; else for (y in h)h.hasOwnProperty(y) && (b[y] = h[y]); else a.punycode = h
    }(this);
    var g = "data-html2canvas-node", h = "data-html2canvas-canvas-clone", i = 0, j = 0;
    a.html2canvas = function (c, d) {
        var e = j++;
        if (d = d || {}, d.logging && (a.html2canvas.logging = !0, a.html2canvas.start = Date.now()), d.async = "undefined" == typeof d.async || d.async, d.allowTaint = "undefined" != typeof d.allowTaint && d.allowTaint, d.removeContainer = "undefined" == typeof d.removeContainer || d.removeContainer, d.javascriptEnabled = "undefined" != typeof d.javascriptEnabled && d.javascriptEnabled, d.imageTimeout = "undefined" == typeof d.imageTimeout ? 1e4 : d.imageTimeout, d.renderer = "function" == typeof d.renderer ? d.renderer : eb, d.strict = !!d.strict, "string" == typeof c) {
            if ("string" != typeof d.proxy)return Promise.reject("Proxy must be used when rendering url");
            var h = null != d.width ? d.width : a.innerWidth, i = null != d.height ? d.height : a.innerHeight;
            return w(C(c), d.proxy, b, h, i, d).then(function (a) {
                return l(a.contentWindow.document.documentElement, a, d, h, i)
            })
        }
        var m = (c === f ? [b.documentElement] : c.length ? c : [c])[0];
        return m.setAttribute(g + e, e), k(m.ownerDocument, d, m.ownerDocument.defaultView.innerWidth, m.ownerDocument.defaultView.innerHeight, e).then(function (a) {
            if ("function" == typeof d.onrendered)if (R("options.onrendered is deprecated, html2canvas returns a Promise containing the canvas"), "undefined" == typeof d.grabMouse || d.grabMouse) {
                var b = new Image(25, 25);
                b.onload = function () {
                    a.getContext("2d").drawImage(b, hb, ib, 25, 25), d.onrendered(a)
                }, b.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAzZJREFUSEut1EtME1EUANBiTTFaivRDKbaFFgiILgxx0bQllYItYKFIgEYoC2oEwqeCC4gG1xg2dmEwEQMJujIxwQ24wA2uCFAB3SBBfqWuyqd/CuV634QSPgOFxElu+mZye+a++948BgAw/mccYAwGIyY7O1vR3NzSiuMLX5GiDoO8tLQ0QzAYDLW1tT2/qEgHJslk8rKtLU9odzcMTU3N7RdB6UBhRkZG6fz8QrCuzgJutwfq6xtazovSgunp6SUOhzPI5XJBr9fD9nYojHjDeVA6MJH0EMGARCIBRKC8vJygO2ZzrSUaSgumpqY+cDjWAlJpCgWSMJlMiO6EqqpMtWehtKBUKi1eXV3zI3wAEhQrJJUGseJHp6G0IE61CKfsl8lkR0CCWiyPAXeU32AwVNChdKAAwUIEfXK5/ARI0IaGRkS3vXp9ofE4SguKxWL92tpfH642LUjQ1lYr+P0Bt1abX3wYPQv04n48FSRoe/sz8Pn8G7m5uboISgfyk5OT72OF3szMzBMgk8k88qyjowPW1zddCoVCS1BaUCQSEdCTlZV18GcOh0ONq6trYGbmJ0xMTO3Z7dMwPj4B4XAYXC7XhkqlKqAFBQJBAS6KB08dClEqlTA8/JUak5cEAkHo6nppMxqN7ZWVVZ0GQ0lnRUXlC6VSVXoamI+gm/RQKEyChYU/u5gYUqvVFDo09AVsNttrHMdh3MAQYyRhxNIeX3y+QLu0tLKlVufC5OQU9Pa+/TgwMPCpv7+fAouKigG/pFX81qV4H4PBwrh8Wg95eOUtLi5vLi+v4FSHRzExRafTNZJ7NptNobOzs2C1Wp+eZx/yEhIS8jwer99ut//icOJvk+mwWCzF3NzvebPZTIF4+ILd/mMcx1ei7UOeUCjUjY19n8YvRYPJVzG4GGk9PT3vRkZGKJDH44PT6STTfxgNjGez4+4idg8Tr+8nx+KvNCcnx4y926mpMUNf33vY2wPo7n71JhpImszer4x5KFmE4zujo98m3W6ve3Dww2eNRvMEW3GLrG4kj26Vj/c5ch+Pg5t4ApXhopFWSDASMcjzg+siIKmWVJm839Nr+Hvp+Nsj4D+5Hdf43ZzjNQAAAABJRU5ErkJggg=="
            } else d.onrendered(a);
            return a
        })
    }, a.html2canvas.punycode = this.punycode, a.html2canvas.proxy = {}, D.prototype.darken = function (a) {
        var b = 1 - a;
        return new D([Math.round(this.r * b), Math.round(this.g * b), Math.round(this.b * b), this.a])
    }, D.prototype.isTransparent = function () {
        return 0 === this.a
    }, D.prototype.isBlack = function () {
        return 0 === this.r && 0 === this.g && 0 === this.b
    }, D.prototype.fromArray = function (a) {
        return Array.isArray(a) && (this.r = Math.min(a[0], 255), this.g = Math.min(a[1], 255), this.b = Math.min(a[2], 255), a.length > 3 && (this.a = a[3])), Array.isArray(a)
    };
    var E = /^#([a-f0-9]{3})$/i;
    D.prototype.hex3 = function (a) {
        var b = null;
        return null !== (b = a.match(E)) && (this.r = parseInt(b[1][0] + b[1][0], 16), this.g = parseInt(b[1][1] + b[1][1], 16), this.b = parseInt(b[1][2] + b[1][2], 16)), null !== b
    };
    var F = /^#([a-f0-9]{6})$/i;
    D.prototype.hex6 = function (a) {
        var b = null;
        return null !== (b = a.match(F)) && (this.r = parseInt(b[1].substring(0, 2), 16), this.g = parseInt(b[1].substring(2, 4), 16), this.b = parseInt(b[1].substring(4, 6), 16)), null !== b
    };
    var G = /^rgb\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3})\)$/;
    D.prototype.rgb = function (a) {
        var b = null;
        return null !== (b = a.match(G)) && (this.r = Number(b[1]), this.g = Number(b[2]), this.b = Number(b[3])), null !== b
    };
    var H = /^rgba\((\d{1,3}) *, *(\d{1,3}) *, *(\d{1,3}) *, *(\d+\.?\d*)\)$/;
    D.prototype.rgba = function (a) {
        var b = null;
        return null !== (b = a.match(H)) && (this.r = Number(b[1]), this.g = Number(b[2]), this.b = Number(b[3]), this.a = Number(b[4])), null !== b
    }, D.prototype.toString = function () {
        return null !== this.a && 1 !== this.a ? "rgba(" + [this.r, this.g, this.b, this.a].join(",") + ")" : "rgb(" + [this.r, this.g, this.b].join(",") + ")"
    }, D.prototype.namedColor = function (a) {
        var b = I[a.toLowerCase()];
        if (b) this.r = b[0], this.g = b[1], this.b = b[2]; else if ("transparent" === a.toLowerCase())return this.r = this.g = this.b = this.a = 0, !0;
        return !!b
    }, D.prototype.isColor = !0;
    var I = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
    };
    L.prototype.getMetrics = function (a, b) {
        return this.data[a + "-" + b] === f && (this.data[a + "-" + b] = new K(a, b)), this.data[a + "-" + b]
    }, M.prototype.proxyLoad = function (a, b, c) {
        var d = this.src;
        return w(d.src, a, d.ownerDocument, b.width, b.height, c)
    }, N.prototype.TYPES = {LINEAR: 1, RADIAL: 2}, P.prototype.findImages = function (a) {
        var b = [];
        return a.reduce(function (a, b) {
            switch (b.node.nodeName) {
                case"IMG":
                    return a.concat([{args: [b.node.src], method: "url"}]);
                case"svg":
                case"IFRAME":
                    return a.concat([{args: [b.node], method: b.node.nodeName}])
            }
            return a
        }, []).forEach(this.addImage(b, this.loadImage), this), b
    }, P.prototype.findBackgroundImage = function (a, b) {
        return b.parseBackgroundImages().filter(this.hasImageBackground).forEach(this.addImage(a, this.loadImage), this), a
    }, P.prototype.addImage = function (a, b) {
        return function (c) {
            c.args.forEach(function (d) {
                this.imageExists(a, d) || (a.splice(0, 0, b.call(this, c)), R("Added image #" + a.length, "string" == typeof d ? d.substring(0, 100) : d))
            }, this)
        }
    }, P.prototype.hasImageBackground = function (a) {
        return "none" !== a.method
    }, P.prototype.loadImage = function (a) {
        if ("url" === a.method) {
            var b = a.args[0];
            return !this.isSVG(b) || this.support.svg || this.options.allowTaint ? b.match(/data:image\/.*;base64,/i) ? new O(b.replace(/url\(['"]{0,}|['"]{0,}\)$/gi, ""), !1) : this.isSameOrigin(b) || this.options.allowTaint === !0 || this.isSVG(b) ? new O(b, !1) : this.support.cors && !this.options.allowTaint && this.options.useCORS ? new O(b, !0) : this.options.proxy ? new Ua(b, this.options.proxy) : new J(b) : new Za(b)
        }
        return "linear-gradient" === a.method ? new Q(a) : "gradient" === a.method ? new cb(a) : "svg" === a.method ? new _a(a.args[0], this.support.svg) : "IFRAME" === a.method ? new M(a.args[0], this.isSameOrigin(a.args[0].src), this.options) : new J(a)
    }, P.prototype.isSVG = function (a) {
        return "svg" === a.substring(a.length - 3).toLowerCase() || Za.prototype.isInline(a)
    }, P.prototype.imageExists = function (a, b) {
        return a.some(function (a) {
            return a.src === b
        })
    }, P.prototype.isSameOrigin = function (a) {
        return this.getOrigin(a) === this.origin
    }, P.prototype.getOrigin = function (a) {
        var c = this.link || (this.link = b.createElement("a"));
        return c.href = a, c.href = c.href, c.protocol + c.hostname + c.port
    }, P.prototype.getPromise = function (a) {
        return this.timeout(a, this.options.imageTimeout).catch(function () {
            var b = new J(a.src);
            return b.promise.then(function (b) {
                a.image = b
            })
        })
    }, P.prototype.get = function (a) {
        var b = null;
        return this.images.some(function (c) {
            return (b = c).src === a
        }) ? b : null
    }, P.prototype.fetch = function (a) {
        return this.images = a.reduce(Da(this.findBackgroundImage, this), this.findImages(a)), this.images.forEach(function (a, b) {
            a.promise.then(function () {
                R("Succesfully loaded image #" + (b + 1), a)
            }, function (c) {
                R("Failed loading image #" + (b + 1), a, c)
            })
        }), this.ready = Promise.all(this.images.map(this.getPromise, this)), R("Finished searching images"), this
    }, P.prototype.timeout = function (a, b) {
        var c, d = Promise.race([a.promise, new Promise(function (d, e) {
            c = setTimeout(function () {
                R("Timed out loading image", a), e(a)
            }, b)
        })]).then(function (a) {
            return clearTimeout(c), a
        });
        return d.catch(function () {
            clearTimeout(c)
        }), d
    }, Q.prototype = Object.create(N.prototype), Q.prototype.stepRegExp = /((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/, S.prototype.cloneTo = function (a) {
        a.visible = this.visible, a.borders = this.borders, a.bounds = this.bounds, a.clip = this.clip, a.backgroundClip = this.backgroundClip, a.computedStyles = this.computedStyles, a.styles = this.styles, a.backgroundImages = this.backgroundImages, a.opacity = this.opacity
    }, S.prototype.getOpacity = function () {
        return null === this.opacity ? this.opacity = this.cssFloat("opacity") : this.opacity
    }, S.prototype.assignStack = function (a) {
        this.stack = a, a.children.push(this)
    }, S.prototype.isElementVisible = function () {
        return this.node.nodeType === Node.TEXT_NODE ? this.parent.visible : "none" !== this.css("display") && "hidden" !== this.css("visibility") && !this.node.hasAttribute("data-html2canvas-ignore") && ("INPUT" !== this.node.nodeName || "hidden" !== this.node.getAttribute("type"))
    }, S.prototype.css = function (a) {
        return this.computedStyles || (this.computedStyles = this.isPseudoElement ? this.parent.computedStyle(this.before ? ":before" : ":after") : this.computedStyle(null)), this.styles[a] || (this.styles[a] = this.computedStyles[a])
    }, S.prototype.prefixedCss = function (a) {
        var b = ["webkit", "moz", "ms", "o"], c = this.css(a);
        return c === f && b.some(function (b) {
            return c = this.css(b + a.substr(0, 1).toUpperCase() + a.substr(1)), c !== f
        }, this), c === f ? null : c
    }, S.prototype.computedStyle = function (a) {
        return this.node.ownerDocument.defaultView.getComputedStyle(this.node, a)
    }, S.prototype.cssInt = function (a) {
        var b = parseInt(this.css(a), 10);
        return isNaN(b) ? 0 : b
    }, S.prototype.color = function (a) {
        return this.colors[a] || (this.colors[a] = new D(this.css(a)))
    }, S.prototype.cssFloat = function (a) {
        var b = parseFloat(this.css(a));
        return isNaN(b) ? 0 : b
    }, S.prototype.fontWeight = function () {
        var a = this.css("fontWeight");
        switch (parseInt(a, 10)) {
            case 401:
                a = "bold";
                break;
            case 400:
                a = "normal"
        }
        return a
    }, S.prototype.parseClip = function () {
        var a = this.css("clip").match(this.CLIP);
        return a ? {
            top: parseInt(a[1], 10),
            right: parseInt(a[2], 10),
            bottom: parseInt(a[3], 10),
            left: parseInt(a[4], 10)
        } : null
    }, S.prototype.parseBackgroundImages = function () {
        return this.backgroundImages || (this.backgroundImages = W(this.css("backgroundImage")))
    }, S.prototype.cssList = function (a, b) {
        var c = (this.css(a) || "").split(",");
        return c = c[b || 0] || c[0] || "auto", c = c.trim().split(" "), 1 === c.length && (c = [c[0], c[0]]), c
    }, S.prototype.parseBackgroundSize = function (a, b, c) {
        var e, f, d = this.cssList("backgroundSize", c);
        if (V(d[0])) e = a.width * parseFloat(d[0]) / 100; else {
            if (/contain|cover/.test(d[0])) {
                var g = a.width / a.height, h = b.width / b.height;
                return g < h ^ "contain" === d[0] ? {width: a.height * h, height: a.height} : {
                    width: a.width,
                    height: a.width / h
                }
            }
            e = parseInt(d[0], 10)
        }
        return f = "auto" === d[0] && "auto" === d[1] ? b.height : "auto" === d[1] ? e / b.width * b.height : V(d[1]) ? a.height * parseFloat(d[1]) / 100 : parseInt(d[1], 10), "auto" === d[0] && (e = f / b.height * b.width), {
            width: e,
            height: f
        }
    }, S.prototype.parseBackgroundPosition = function (a, b, c, d) {
        var f, g, e = this.cssList("backgroundPosition", c);
        return f = V(e[0]) ? (a.width - (d || b).width) * (parseFloat(e[0]) / 100) : parseInt(e[0], 10), g = "auto" === e[1] ? f / b.width * b.height : V(e[1]) ? (a.height - (d || b).height) * parseFloat(e[1]) / 100 : parseInt(e[1], 10), "auto" === e[0] && (f = g / b.height * b.width), {
            left: f,
            top: g
        }
    }, S.prototype.parseBackgroundRepeat = function (a) {
        return this.cssList("backgroundRepeat", a)[0]
    }, S.prototype.parseTextShadows = function () {
        var a = this.css("textShadow"), b = [];
        if (a && "none" !== a)for (var c = a.match(this.TEXT_SHADOW_PROPERTY), d = 0; c && d < c.length; d++) {
            var e = c[d].match(this.TEXT_SHADOW_VALUES);
            b.push({
                color: new D(e[0]),
                offsetX: e[1] ? parseFloat(e[1].replace("px", "")) : 0,
                offsetY: e[2] ? parseFloat(e[2].replace("px", "")) : 0,
                blur: e[3] ? e[3].replace("px", "") : 0
            })
        }
        return b
    }, S.prototype.parseTransform = function () {
        if (!this.transformData)if (this.hasTransform()) {
            var a = this.parseBounds(), b = this.prefixedCss("transformOrigin").split(" ").map(X).map(Y);
            b[0] += a.left, b[1] += a.top, this.transformData = {origin: b, matrix: this.parseTransformMatrix()}
        } else this.transformData = {origin: [0, 0], matrix: [1, 0, 0, 1, 0, 0]};
        return this.transformData
    }, S.prototype.parseTransformMatrix = function () {
        if (!this.transformMatrix) {
            var a = this.prefixedCss("transform"), b = a ? U(a.match(this.MATRIX_PROPERTY)) : null;
            this.transformMatrix = b ? b : [1, 0, 0, 1, 0, 0]
        }
        return this.transformMatrix
    }, S.prototype.parseBounds = function () {
        return this.bounds || (this.bounds = this.hasTransform() ? $(this.node) : Z(this.node))
    }, S.prototype.hasTransform = function () {
        return "1,0,0,1,0,0" !== this.parseTransformMatrix().join(",") || this.parent && this.parent.hasTransform()
    }, S.prototype.getValue = function () {
        var a = this.node.value || "";
        return "SELECT" === this.node.tagName ? a = T(this.node) : "password" === this.node.type && (a = Array(a.length + 1).join("•")), 0 === a.length ? this.node.placeholder || "" : a
    }, S.prototype.MATRIX_PROPERTY = /(matrix)\((.+)\)/, S.prototype.TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g, S.prototype.TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g, S.prototype.CLIP = /^rect\((\d+)px,? (\d+)px,? (\d+)px,? (\d+)px\)$/, _.prototype.calculateOverflowClips = function () {
        this.nodes.forEach(function (a) {
            if (ya(a)) {
                za(a) && a.appendToDOM(), a.borders = this.parseBorders(a);
                var b = "hidden" === a.css("overflow") ? [a.borders.clip] : [], c = a.parseClip();
                c && ["absolute", "fixed"].indexOf(a.css("position")) !== -1 && b.push([["rect", a.bounds.left + c.left, a.bounds.top + c.top, c.right - c.left, c.bottom - c.top]]), a.clip = aa(a) ? a.parent.clip.concat(b) : b, a.backgroundClip = "hidden" !== a.css("overflow") ? a.clip.concat([a.borders.clip]) : a.clip, za(a) && a.cleanDOM()
            } else Aa(a) && (a.clip = aa(a) ? a.parent.clip : []);
            za(a) || (a.bounds = null)
        }, this)
    }, _.prototype.asyncRenderer = function (a, b, c) {
        c = c || Date.now(), this.paint(a[this.renderIndex++]), a.length === this.renderIndex ? b() : c + 20 > Date.now() ? this.asyncRenderer(a, b, c) : setTimeout(Da(function () {
            this.asyncRenderer(a, b)
        }, this), 0)
    }, _.prototype.createPseudoHideStyles = function (a) {
        this.createStyles(a, "." + Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + ':before { content: "" !important; display: none !important; }.' + Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER + ':after { content: "" !important; display: none !important; }')
    }, _.prototype.disableAnimations = function (a) {
        this.createStyles(a, "* { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important;}")
    }, _.prototype.createStyles = function (a, b) {
        var c = a.createElement("style");
        c.innerHTML = b, a.body.appendChild(c)
    }, _.prototype.getPseudoElements = function (a) {
        var b = [[a]];
        if (a.node.nodeType === Node.ELEMENT_NODE) {
            var c = this.getPseudoElement(a, ":before"), d = this.getPseudoElement(a, ":after");
            c && b.push(c), d && b.push(d)
        }
        return Ha(b)
    }, _.prototype.getPseudoElement = function (a, c) {
        var d = a.computedStyle(c);
        if (!d || !d.content || "none" === d.content || "-moz-alt-content" === d.content || "none" === d.display)return null;
        for (var e = Ia(d.content), f = "url" === e.substr(0, 3), g = b.createElement(f ? "img" : "html2canvaspseudoelement"), h = new Va(g, a, c), i = d.length - 1; i >= 0; i--) {
            var j = ba(d.item(i));
            g.style[j] = d[j]
        }
        if (g.className = Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER, f)return g.src = W(e)[0].args[0], [h];
        var k = b.createTextNode(e);
        return g.appendChild(k), [h, new ab(k, h)]
    }, _.prototype.getChildren = function (a) {
        return Ha([].filter.call(a.node.childNodes, sa).map(function (b) {
            var c = [b.nodeType === Node.TEXT_NODE ? new ab(b, a) : new S(b, a)].filter(Ga);
            return b.nodeType === Node.ELEMENT_NODE && c.length && "TEXTAREA" !== b.tagName ? c[0].isElementVisible() ? c.concat(this.getChildren(c[0])) : [] : c
        }, this))
    }, _.prototype.newStackingContext = function (a, b) {
        var c = new Xa(b, a.getOpacity(), a.node, a.parent);
        a.cloneTo(c);
        var d = b ? c.getParentStack(this) : c.parent.stack;
        d.contexts.push(c), a.stack = c
    }, _.prototype.createStackingContexts = function () {
        this.nodes.forEach(function (a) {
            ya(a) && (this.isRootElement(a) || Ca(a) || ta(a) || this.isBodyWithTransparentRoot(a) || a.hasTransform()) ? this.newStackingContext(a, !0) : ya(a) && (ua(a) && ma(a) || wa(a) || va(a)) ? this.newStackingContext(a, !1) : a.assignStack(a.parent.stack)
        }, this)
    }, _.prototype.isBodyWithTransparentRoot = function (a) {
        return "BODY" === a.node.nodeName && a.parent.color("backgroundColor").isTransparent()
    }, _.prototype.isRootElement = function (a) {
        return null === a.parent
    }, _.prototype.sortStackingContexts = function (a) {
        a.contexts.sort(Ba(a.contexts.slice(0))), a.contexts.forEach(this.sortStackingContexts, this)
    }, _.prototype.parseTextBounds = function (a) {
        return function (b, c, d) {
            if ("none" !== a.parent.css("textDecoration").substr(0, 4) || 0 !== b.trim().length) {
                if (this.support.rangeBounds && !a.parent.hasTransform()) {
                    var e = d.slice(0, c).join("").length;
                    return this.getRangeBounds(a.node, e, b.length)
                }
                if (a.node && "string" == typeof a.node.data) {
                    var f = a.node.splitText(b.length), g = this.getWrapperBounds(a.node, a.parent.hasTransform());
                    return a.node = f, g
                }
            } else this.support.rangeBounds && !a.parent.hasTransform() || (a.node = a.node.splitText(b.length));
            return {}
        }
    }, _.prototype.getWrapperBounds = function (a, b) {
        var c = a.ownerDocument.createElement("html2canvaswrapper"), d = a.parentNode, e = a.cloneNode(!0);
        c.appendChild(a.cloneNode(!0)), d.replaceChild(c, a);
        var f = b ? $(c) : Z(c);
        return d.replaceChild(e, c), f
    }, _.prototype.getRangeBounds = function (a, b, c) {
        var d = this.range || (this.range = a.ownerDocument.createRange());
        return d.setStart(a, b), d.setEnd(a, b + c), d.getBoundingClientRect()
    }, _.prototype.parse = function (a) {
        var b = a.contexts.filter(ka), c = a.children.filter(ya), d = c.filter(xa(va)),
            e = d.filter(xa(ua)).filter(xa(na)), f = c.filter(xa(ua)).filter(va), g = d.filter(xa(ua)).filter(na),
            h = a.contexts.concat(d.filter(ua)).filter(ma), i = a.children.filter(Aa).filter(pa),
            j = a.contexts.filter(la);
        b.concat(e).concat(f).concat(g).concat(h).concat(i).concat(j).forEach(function (a) {
            this.renderQueue.push(a), oa(a) && (this.parse(a), this.renderQueue.push(new ca))
        }, this)
    }, _.prototype.paint = function (a) {
        try {
            a instanceof ca ? this.renderer.ctx.restore() : Aa(a) ? (za(a.parent) && a.parent.appendToDOM(), this.paintText(a), za(a.parent) && a.parent.cleanDOM()) : this.paintNode(a)
        } catch (a) {
            if (R(a), this.options.strict)throw a
        }
    }, _.prototype.paintNode = function (a) {
        oa(a) && (this.renderer.setOpacity(a.opacity), this.renderer.ctx.save(), a.hasTransform() && this.renderer.setTransform(a.parseTransform())), "INPUT" === a.node.nodeName && "checkbox" === a.node.type ? this.paintCheckbox(a) : "INPUT" === a.node.nodeName && "radio" === a.node.type ? this.paintRadio(a) : this.paintElement(a)
    }, _.prototype.paintElement = function (a) {
        var b = a.parseBounds();
        this.renderer.clip(a.backgroundClip, function () {
            this.renderer.renderBackground(a, b, a.borders.borders.map(Fa))
        }, this), this.renderer.clip(a.clip, function () {
            this.renderer.renderBorders(a.borders.borders)
        }, this), this.renderer.clip(a.backgroundClip, function () {
            switch (a.node.nodeName) {
                case"svg":
                case"IFRAME":
                    var c = this.images.get(a.node);
                    c ? this.renderer.renderImage(a, b, a.borders, c) : R("Error loading <" + a.node.nodeName + ">", a.node);
                    break;
                case"VIDEO":
                    var d = {
                        image: a.node, src: "", tainted: !1, promise: function () {
                        }
                    };
                    this.renderer.renderImage(a, b, a.borders, d);
                    break;
                case"IMG":
                    var d = this.images.get(a.node.src);
                    d ? this.renderer.renderImage(a, b, a.borders, d) : R("Error loading <img>", a.node.src);
                    break;
                case"CANVAS":
                    this.renderer.renderImage(a, b, a.borders, {image: a.node});
                    break;
                case"SELECT":
                case"INPUT":
                case"TEXTAREA":
                    this.paintFormValue(a)
            }
        }, this)
    }, _.prototype.paintCheckbox = function (a) {
        var b = a.parseBounds(), c = Math.min(b.width, b.height),
            d = {width: c - 1, height: c - 1, top: b.top, left: b.left}, e = [3, 3], f = [e, e, e, e],
            g = [1, 1, 1, 1].map(function (a) {
                return {color: new D("#A5A5A5"), width: a}
            }), h = ga(d, f, g);
        this.renderer.clip(a.backgroundClip, function () {
            this.renderer.rectangle(d.left + 1, d.top + 1, d.width - 2, d.height - 2, new D("#DEDEDE")), this.renderer.renderBorders(ea(g, d, h, f)), a.node.checked && (this.renderer.font(new D("#424242"), "normal", "normal", "bold", c - 3 + "px", "arial"), this.renderer.text("✔", d.left + c / 6, d.top + c - 1))
        }, this)
    }, _.prototype.paintRadio = function (a) {
        var b = a.parseBounds(), c = Math.min(b.width, b.height) - 2;
        this.renderer.clip(a.backgroundClip, function () {
            this.renderer.circleStroke(b.left + 1, b.top + 1, c, new D("#DEDEDE"), 1, new D("#A5A5A5")), a.node.checked && this.renderer.circle(Math.ceil(b.left + c / 4) + 1, Math.ceil(b.top + c / 4) + 1, Math.floor(c / 2), new D("#424242"))
        }, this)
    }, _.prototype.paintFormValue = function (a) {
        var b = a.getValue();
        if (b.length > 0) {
            var c = a.node.ownerDocument, d = c.createElement("html2canvaswrapper"),
                e = ["lineHeight", "textAlign", "fontFamily", "fontWeight", "fontSize", "color", "paddingLeft", "paddingTop", "paddingRight", "paddingBottom", "width", "height", "borderLeftStyle", "borderTopStyle", "borderLeftWidth", "borderTopWidth", "boxSizing", "whiteSpace", "wordWrap"];
            e.forEach(function (b) {
                try {
                    d.style[b] = a.css(b)
                } catch (a) {
                    R("html2canvas: Parse: Exception caught in renderFormValue: " + a.message)
                }
            });
            var f = a.parseBounds();
            d.style.position = "fixed", d.style.left = f.left + "px", d.style.top = f.top + "px", d.textContent = b, c.body.appendChild(d), this.paintText(new ab(d.firstChild, a)), c.body.removeChild(d)
        }
    }, _.prototype.paintText = function (b) {
        b.applyTextTransform();
        var c = a.html2canvas.punycode.ucs2.decode(b.node.data),
            d = this.options.letterRendering && !qa(b) || La(b.node.data) ? c.map(function (b) {
                return a.html2canvas.punycode.ucs2.encode([b])
            }) : Ja(c), e = b.parent.fontWeight(), f = b.parent.css("fontSize"), g = b.parent.css("fontFamily"),
            h = b.parent.parseTextShadows();
        this.renderer.font(b.parent.color("color"), b.parent.css("fontStyle"), b.parent.css("fontVariant"), e, f, g), h.length ? this.renderer.fontShadow(h[0].color, h[0].offsetX, h[0].offsetY, h[0].blur) : this.renderer.clearShadow(), this.renderer.clip(b.parent.clip, function () {
            d.map(this.parseTextBounds(b), this).forEach(function (a, c) {
                a && (this.renderer.text(d[c], a.left, a.bottom), this.renderTextDecoration(b.parent, a, this.fontMetrics.getMetrics(g, f)))
            }, this)
        }, this)
    }, _.prototype.renderTextDecoration = function (a, b, c) {
        switch (a.css("textDecoration").split(" ")[0]) {
            case"underline":
                this.renderer.rectangle(b.left, Math.round(b.top + c.baseline + c.lineWidth), b.width, 1, a.color("color"));
                break;
            case"overline":
                this.renderer.rectangle(b.left, Math.round(b.top), b.width, 1, a.color("color"));
                break;
            case"line-through":
                this.renderer.rectangle(b.left, Math.ceil(b.top + c.middle + c.lineWidth), b.width, 1, a.color("color"))
        }
    };
    var da = {inset: [["darken", .6], ["darken", .1], ["darken", .1], ["darken", .6]]};
    _.prototype.parseBorders = function (a) {
        var b = a.parseBounds(), c = ra(a), d = ["Top", "Right", "Bottom", "Left"].map(function (b, c) {
            var d = a.css("border" + b + "Style"), e = a.color("border" + b + "Color");
            "inset" === d && e.isBlack() && (e = new D([255, 255, 255, e.a]));
            var f = da[d] ? da[d][c] : null;
            return {width: a.cssInt("border" + b + "Width"), color: f ? e[f[0]](f[1]) : e, args: null}
        }), e = ga(b, c, d);
        return {clip: this.parseBackgroundClip(a, e, d, c, b), borders: ea(d, b, e, c)}
    }, _.prototype.parseBackgroundClip = function (a, b, c, d, e) {
        var f = a.css("backgroundClip"), g = [];
        switch (f) {
            case"content-box":
            case"padding-box":
                ja(g, d[0], d[1], b.topLeftInner, b.topRightInner, e.left + c[3].width, e.top + c[0].width), ja(g, d[1], d[2], b.topRightInner, b.bottomRightInner, e.left + e.width - c[1].width, e.top + c[0].width), ja(g, d[2], d[3], b.bottomRightInner, b.bottomLeftInner, e.left + e.width - c[1].width, e.top + e.height - c[2].width), ja(g, d[3], d[0], b.bottomLeftInner, b.topLeftInner, e.left + c[3].width, e.top + e.height - c[2].width);
                break;
            default:
                ja(g, d[0], d[1], b.topLeftOuter, b.topRightOuter, e.left, e.top), ja(g, d[1], d[2], b.topRightOuter, b.bottomRightOuter, e.left + e.width, e.top), ja(g, d[2], d[3], b.bottomRightOuter, b.bottomLeftOuter, e.left + e.width, e.top + e.height), ja(g, d[3], d[0], b.bottomLeftOuter, b.topLeftOuter, e.left, e.top + e.height)
        }
        return g
    };
    var Na = 0, Oa = "withCredentials" in new XMLHttpRequest, Pa = "crossOrigin" in new Image;
    Va.prototype.cloneTo = function (a) {
        Va.prototype.cloneTo.call(this, a), a.isPseudoElement = !0, a.before = this.before
    }, Va.prototype = Object.create(S.prototype), Va.prototype.appendToDOM = function () {
        this.before ? this.parent.node.insertBefore(this.node, this.parent.node.firstChild) : this.parent.node.appendChild(this.node), this.parent.node.className += " " + this.getHideClass()
    }, Va.prototype.cleanDOM = function () {
        this.node.parentNode.removeChild(this.node), this.parent.node.className = this.parent.node.className.replace(this.getHideClass(), "")
    }, Va.prototype.getHideClass = function () {
        return this["PSEUDO_HIDE_ELEMENT_CLASS_" + (this.before ? "BEFORE" : "AFTER")]
    }, Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before", Va.prototype.PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after", Wa.prototype.renderImage = function (a, b, c, d) {
        var e = a.cssInt("paddingLeft"), f = a.cssInt("paddingTop"), g = a.cssInt("paddingRight"),
            h = a.cssInt("paddingBottom"), i = c.borders, j = b.width - (i[1].width + i[3].width + e + g),
            k = b.height - (i[0].width + i[2].width + f + h);
        this.drawImage(d, 0, 0, d.image.width || j, d.image.height || k, b.left + e + i[3].width, b.top + f + i[0].width, j, k)
    }, Wa.prototype.renderBackground = function (a, b, c) {
        b.height > 0 && b.width > 0 && (this.renderBackgroundColor(a, b), this.renderBackgroundImage(a, b, c))
    }, Wa.prototype.renderBackgroundColor = function (a, b) {
        var c = a.color("backgroundColor");
        c.isTransparent() || this.rectangle(b.left, b.top, b.width, b.height, c)
    }, Wa.prototype.renderBorders = function (a) {
        a.forEach(this.renderBorder, this)
    }, Wa.prototype.renderBorder = function (a) {
        a.color.isTransparent() || null === a.args || this.drawShape(a.args, a.color)
    }, Wa.prototype.renderBackgroundImage = function (a, b, c) {
        var d = a.parseBackgroundImages();
        d.reverse().forEach(function (d, e, f) {
            switch (d.method) {
                case"url":
                    var g = this.images.get(d.args[0]);
                    g ? this.renderBackgroundRepeating(a, b, g, f.length - (e + 1), c) : R("Error loading background-image", d.args[0]);
                    break;
                case"linear-gradient":
                case"gradient":
                    var h = this.images.get(d.value);
                    h ? this.renderBackgroundGradient(h, b, c) : R("Error loading background-image", d.args[0]);
                    break;
                case"none":
                    break;
                default:
                    R("Unknown background-image type", d.args[0])
            }
        }, this)
    }, Wa.prototype.renderBackgroundRepeating = function (a, b, c, d, e) {
        var f = a.parseBackgroundSize(b, c.image, d), g = a.parseBackgroundPosition(b, c.image, d, f),
            h = a.parseBackgroundRepeat(d);
        switch (h) {
            case"repeat-x":
            case"repeat no-repeat":
                this.backgroundRepeatShape(c, g, f, b, b.left + e[3], b.top + g.top + e[0], 99999, f.height, e);
                break;
            case"repeat-y":
            case"no-repeat repeat":
                this.backgroundRepeatShape(c, g, f, b, b.left + g.left + e[3], b.top + e[0], f.width, 99999, e);
                break;
            case"no-repeat":
                this.backgroundRepeatShape(c, g, f, b, b.left + g.left + e[3], b.top + g.top + e[0], f.width, f.height, e);
                break;
            default:
                this.renderBackgroundRepeat(c, g, f, {top: b.top, left: b.left}, e[3], e[0])
        }
    }, Xa.prototype = Object.create(S.prototype), Xa.prototype.getParentStack = function (a) {
        var b = this.parent ? this.parent.stack : null;
        return b ? b.ownStacking ? b : b.getParentStack(a) : a.stack
    }, Ya.prototype.testRangeBounds = function (a) {
        var b, c, d, e, f = !1;
        return a.createRange && (b = a.createRange(), b.getBoundingClientRect && (c = a.createElement("boundtest"), c.style.height = "123px", c.style.display = "block", a.body.appendChild(c), b.selectNode(c), d = b.getBoundingClientRect(), e = d.height, 123 === e && (f = !0), a.body.removeChild(c))), f
    }, Ya.prototype.testCORS = function () {
        return "undefined" != typeof(new Image).crossOrigin
    }, Ya.prototype.testSVG = function () {
        var a = new Image, c = b.createElement("canvas"), d = c.getContext("2d");
        a.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
        try {
            d.drawImage(a, 0, 0), c.toDataURL()
        } catch (a) {
            return !1
        }
        return !0
    }, Za.prototype.hasFabric = function () {
        return html2canvas.fabric ? Promise.resolve() : Promise.reject(new Error("html2canvas.svg.js is not loaded, cannot render svg"))
    }, Za.prototype.inlineFormatting = function (a) {
        return /^data:image\/svg\+xml;base64,/.test(a) ? this.decode64(this.removeContentType(a)) : this.removeContentType(a)
    }, Za.prototype.removeContentType = function (a) {
        return a.replace(/^data:image\/svg\+xml(;base64)?,/, "")
    }, Za.prototype.isInline = function (a) {
        return /^data:image\/svg\+xml/i.test(a)
    }, Za.prototype.createCanvas = function (a) {
        var b = this;
        return function (c, d) {
            var e = new html2canvas.fabric.StaticCanvas("c");
            b.image = e.lowerCanvasEl, e.setWidth(d.width).setHeight(d.height).add(html2canvas.fabric.util.groupSVGElements(c, d)).renderAll(), a(e.lowerCanvasEl)
        }
    }, Za.prototype.decode64 = function (b) {
        return "function" == typeof a.atob ? a.atob(b) : $a(b)
    }, _a.prototype = Object.create(Za.prototype), ab.prototype = Object.create(S.prototype), ab.prototype.applyTextTransform = function () {
        this.node.data = this.transform(this.parent.css("textTransform"))
    }, ab.prototype.transform = function (a) {
        var b = this.node.data;
        switch (a) {
            case"lowercase":
                return b.toLowerCase();
            case"capitalize":
                return b.replace(/(^|\s|:|-|\(|\))([a-z])/g, bb);
            case"uppercase":
                return b.toUpperCase();
            default:
                return b
        }
    }, cb.prototype = Object.create(N.prototype), eb.prototype = Object.create(Wa.prototype), eb.prototype.setFillStyle = function (a) {
        return this.ctx.fillStyle = "object" == typeof a && a.isColor ? a.toString() : a, this.ctx
    }, eb.prototype.rectangle = function (a, b, c, d, e) {
        this.setFillStyle(e).fillRect(a, b, c, d)
    }, eb.prototype.circle = function (a, b, c, d) {
        this.setFillStyle(d), this.ctx.beginPath(), this.ctx.arc(a + c / 2, b + c / 2, c / 2, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill()
    }, eb.prototype.circleStroke = function (a, b, c, d, e, f) {
        this.circle(a, b, c, d), this.ctx.strokeStyle = f.toString(), this.ctx.stroke()
    }, eb.prototype.drawShape = function (a, b) {
        this.shape(a), this.setFillStyle(b).fill()
    }, eb.prototype.taints = function (a) {
        if (null === a.tainted) {
            this.taintCtx.drawImage(a.image, 0, 0);
            try {
                this.taintCtx.getImageData(0, 0, 1, 1), a.tainted = !1
            } catch (c) {
                this.taintCtx = b.createElement("canvas").getContext("2d"), a.tainted = !0
            }
        }
        return a.tainted
    }, eb.prototype.drawImage = function (a, b, c, d, e, f, g, h, i) {
        this.taints(a) && !this.options.allowTaint || this.ctx.drawImage(a.image, b, c, d, e, f, g, h, i)
    }, eb.prototype.clip = function (a, b, c) {
        this.ctx.save(), a.filter(fb).forEach(function (a) {
            this.shape(a).clip()
        }, this), b.call(c), this.ctx.restore()
    }, eb.prototype.shape = function (a) {
        return this.ctx.beginPath(), a.forEach(function (a, b) {
            "rect" === a[0] ? this.ctx.rect.apply(this.ctx, a.slice(1)) : this.ctx[0 === b ? "moveTo" : a[0] + "To"].apply(this.ctx, a.slice(1))
        }, this), this.ctx.closePath(), this.ctx
    }, eb.prototype.font = function (a, b, c, d, e, f) {
        this.setFillStyle(a).font = [b, c, d, e, f].join(" ").split(",")[0]
    }, eb.prototype.fontShadow = function (a, b, c, d) {
        this.setVariable("shadowColor", a.toString()).setVariable("shadowOffsetY", b).setVariable("shadowOffsetX", c).setVariable("shadowBlur", d)
    }, eb.prototype.clearShadow = function () {
        this.setVariable("shadowColor", "rgba(0,0,0,0)")
    }, eb.prototype.setOpacity = function (a) {
        this.ctx.globalAlpha = a
    }, eb.prototype.setTransform = function (a) {
        this.ctx.translate(a.origin[0], a.origin[1]), this.ctx.transform.apply(this.ctx, a.matrix), this.ctx.translate(-a.origin[0], -a.origin[1])
    }, eb.prototype.setVariable = function (a, b) {
        return this.variables[a] !== b && (this.variables[a] = this.ctx[a] = b), this
    }, eb.prototype.text = function (a, b, c) {
        this.ctx.fillText(a, b, c)
    }, eb.prototype.backgroundRepeatShape = function (a, b, c, d, e, f, g, h, i) {
        var j = [["line", Math.round(e), Math.round(f)], ["line", Math.round(e + g), Math.round(f)], ["line", Math.round(e + g), Math.round(h + f)], ["line", Math.round(e), Math.round(h + f)]];
        this.clip([j], function () {
            this.renderBackgroundRepeat(a, b, c, d, i[3], i[0])
        }, this)
    }, eb.prototype.renderBackgroundRepeat = function (a, b, c, d, e, f) {
        var g = Math.round(d.left + b.left + e), h = Math.round(d.top + b.top + f);
        this.setFillStyle(this.ctx.createPattern(this.resizeImage(a, c), "repeat")), this.ctx.translate(g, h), this.ctx.fill(), this.ctx.translate(-g, -h)
    }, eb.prototype.renderBackgroundGradient = function (a, b) {
        if (a instanceof Q) {
            var c = this.ctx.createLinearGradient(b.left + b.width * a.x0, b.top + b.height * a.y0, b.left + b.width * a.x1, b.top + b.height * a.y1);
            a.colorStops.forEach(function (a) {
                c.addColorStop(a.stop, a.color.toString())
            }), this.rectangle(b.left, b.top, b.width, b.height, c)
        }
    }, eb.prototype.resizeImage = function (a, c) {
        var d = a.image;
        if (d.width === c.width && d.height === c.height)return d;
        var e, f = b.createElement("canvas");
        return f.width = c.width, f.height = c.height, e = f.getContext("2d"), e.drawImage(d, 0, 0, d.width, d.height, 0, 0, c.width, c.height), f
    };
    var gb = !!b.all;
    gb || b.captureEvents(Event.MOUSEMOVE), b.addEventListener("mousemove", jb, !1);
    var hb = 0, ib = 0
}).call({}, "undefined" != typeof window ? window : void 0, "undefined" != typeof document ? document : void 0), function (window, document, exports, undefined) {
    var fabric = fabric || {version: "1.4.11"};
    "undefined" != typeof exports && (exports.fabric = fabric), "undefined" != typeof document && "undefined" != typeof window ? (fabric.document = document, fabric.window = window) : (fabric.document = require("jsdom").jsdom("<!DOCTYPE html><html><head></head><body></body></html>"), fabric.window = fabric.document.createWindow()), fabric.isTouchSupported = "ontouchstart" in fabric.document.documentElement, fabric.isLikelyNode = "undefined" != typeof Buffer && "undefined" == typeof window, fabric.SHARED_ATTRIBUTES = ["display", "transform", "fill", "fill-opacity", "fill-rule", "opacity", "stroke", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width"], fabric.DPI = 96;
    var Cufon = function () {
        function d(a) {
            var b = this.face = a.face;
            this.glyphs = a.glyphs, this.w = a.w, this.baseSize = parseInt(b["units-per-em"], 10), this.family = b["font-family"].toLowerCase(), this.weight = b["font-weight"], this.style = b["font-style"] || "normal", this.viewBox = function () {
                var a = b.bbox.split(/\s+/), c = {
                    minX: parseInt(a[0], 10),
                    minY: parseInt(a[1], 10),
                    maxX: parseInt(a[2], 10),
                    maxY: parseInt(a[3], 10)
                };
                return c.width = c.maxX - c.minX, c.height = c.maxY - c.minY, c.toString = function () {
                    return [this.minX, this.minY, this.width, this.height].join(" ")
                }, c
            }(), this.ascent = -parseInt(b.ascent, 10), this.descent = -parseInt(b.descent, 10), this.height = -this.ascent + this.descent
        }

        function e() {
            var a = {}, b = {oblique: "italic", italic: "oblique"};
            this.add = function (b) {
                (a[b.style] || (a[b.style] = {}))[b.weight] = b
            }, this.get = function (c, d) {
                var e = a[c] || a[b[c]] || a.normal || a.italic || a.oblique;
                if (!e)return null;
                if (d = {normal: 400, bold: 700}[d] || parseInt(d, 10), e[d])return e[d];
                var h, i, f = {1: 1, 99: 0}[d % 100], g = [];
                f === undefined && (f = d > 400), 500 == d && (d = 400);
                for (var j in e)j = parseInt(j, 10), (!h || j < h) && (h = j), (!i || j > i) && (i = j), g.push(j);
                return d < h && (d = h), d > i && (d = i), g.sort(function (a, b) {
                    return (f ? a > d && b > d ? a < b : a > b : a < d && b < d ? a > b : a < b) ? -1 : 1
                }), e[g[0]]
            }
        }

        function f() {
            function b(a, b) {
                return a.contains ? a.contains(b) : 16 & a.compareDocumentPosition(b)
            }

            function c(a) {
                var c = a.relatedTarget;
                c && !b(this, c) && e(this)
            }

            function d(a) {
                e(this)
            }

            function e(b) {
                setTimeout(function () {
                    a.replace(b, r.get(b).options, !0)
                }, 10)
            }

            this.attach = function (a) {
                a.onmouseenter === undefined ? (i(a, "mouseover", c), i(a, "mouseout", c)) : (i(a, "mouseenter", d), i(a, "mouseleave", d))
            }
        }

        function g() {
            function c(a) {
                return a.cufid || (a.cufid = ++b)
            }

            var a = {}, b = 0;
            this.get = function (b) {
                var d = c(b);
                return a[d] || (a[d] = {})
            }
        }

        function h(a) {
            var b = {}, d = {};
            this.get = function (c) {
                return b[c] != undefined ? b[c] : a[c]
            }, this.getSize = function (a, b) {
                return d[a] || (d[a] = new c.Size(this.get(a), b))
            }, this.extend = function (a) {
                for (var c in a)b[c] = a[c];
                return this
            }
        }

        function i(a, b, c) {
            a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, function () {
                    return c.call(a, fabric.window.event)
                })
        }

        function j(a, b) {
            var c = r.get(a);
            return c.options ? a : (b.hover && b.hoverables[a.nodeName.toLowerCase()] && s.attach(a), c.options = b, a)
        }

        function k(a) {
            var b = {};
            return function (c) {
                return b.hasOwnProperty(c) || (b[c] = a.apply(null, arguments)), b[c]
            }
        }

        function l(a, b) {
            b || (b = c.getStyle(a));
            for (var e, d = c.quotedList(b.get("fontFamily").toLowerCase()), f = 0, g = d.length; f < g; ++f)if (e = d[f], v[e])return v[e].get(b.get("fontStyle"), b.get("fontWeight"));
            return null
        }

        function m(a) {
            return fabric.document.getElementsByTagName(a)
        }

        function n() {
            for (var b, a = {}, c = 0, d = arguments.length; c < d; ++c)for (b in arguments[c])a[b] = arguments[c][b];
            return a
        }

        function o(a, b, d, e, f, g) {
            var h = e.separate;
            if ("none" == h)return u[e.engine].apply(null, arguments);
            var j, i = fabric.document.createDocumentFragment(), k = b.split(x[h]), l = "words" == h;
            l && q && (/^\s/.test(b) && k.unshift(""), /\s$/.test(b) && k.push(""));
            for (var m = 0, n = k.length; m < n; ++m)j = u[e.engine](a, l ? c.textAlign(k[m], d, m, n) : k[m], d, e, f, g, m < n - 1), j && i.appendChild(j);
            return i
        }

        function p(a, b) {
            for (var d, e, f, g, h = j(a, b).firstChild; h; h = f) {
                if (f = h.nextSibling, g = !1, 1 == h.nodeType) {
                    if (!h.firstChild)continue;
                    if (!/cufon/.test(h.className)) {
                        arguments.callee(h, b);
                        continue
                    }
                    g = !0
                }
                if (e || (e = c.getStyle(a).extend(b)), d || (d = l(a, e)), d)if (g) u[b.engine](d, null, e, b, h, a); else {
                    var i = h.data;
                    if ("undefined" != typeof G_vmlCanvasManager && (i = i.replace(/\r/g, "\n")), "" !== i) {
                        var k = o(d, i, e, b, h, a);
                        k ? h.parentNode.replaceChild(k, h) : h.parentNode.removeChild(h)
                    }
                }
            }
        }

        var a = function () {
            return a.replace.apply(null, arguments)
        }, b = a.DOM = {
            ready: function () {
                var a = !1, b = {loaded: 1, complete: 1}, c = [], d = function () {
                    if (!a) {
                        a = !0;
                        for (var b; b = c.shift(); b());
                    }
                };
                return fabric.document.addEventListener && (fabric.document.addEventListener("DOMContentLoaded", d, !1), fabric.window.addEventListener("pageshow", d, !1)), !fabric.window.opera && fabric.document.readyState && function () {
                    b[fabric.document.readyState] ? d() : setTimeout(arguments.callee, 10)
                }(), fabric.document.readyState && fabric.document.createStyleSheet && function () {
                    try {
                        fabric.document.body.doScroll("left"), d()
                    } catch (a) {
                        setTimeout(arguments.callee, 1)
                    }
                }(), i(fabric.window, "load", d), function (b) {
                    arguments.length ? a ? b() : c.push(b) : d()
                }
            }()
        }, c = a.CSS = {
            Size: function (a, b) {
                this.value = parseFloat(a), this.unit = String(a).match(/[a-z%]*$/)[0] || "px", this.convert = function (a) {
                    return a / b * this.value
                }, this.convertFrom = function (a) {
                    return a / this.value * b
                }, this.toString = function () {
                    return this.value + this.unit
                }
            }, getStyle: function (a) {
                return new h(a.style)
            }, quotedList: k(function (a) {
                for (var d, b = [], c = /\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g; d = c.exec(a);)b.push(d[3] || d[1]);
                return b
            }), ready: function () {
                var a = !1, c = [], d = function () {
                    a = !0;
                    for (var b; b = c.shift(); b());
                }, e = Object.prototype.propertyIsEnumerable ? m("style") : {length: 0}, f = m("link");
                return b.ready(function () {
                    for (var b, a = 0, c = 0, g = f.length; b = f[c], c < g; ++c)b.disabled || "stylesheet" != b.rel.toLowerCase() || ++a;
                    fabric.document.styleSheets.length >= e.length + a ? d() : setTimeout(arguments.callee, 10)
                }), function (b) {
                    a ? b() : c.push(b)
                }
            }(), supports: function (a, b) {
                var c = fabric.document.createElement("span").style;
                return c[a] !== undefined && (c[a] = b, c[a] === b)
            }, textAlign: function (a, b, c, d) {
                return "right" == b.get("textAlign") ? c > 0 && (a = " " + a) : c < d - 1 && (a += " "), a
            }, textDecoration: function (a, b) {
                b || (b = this.getStyle(a));
                for (var c = {
                    underline: null,
                    overline: null,
                    "line-through": null
                }, d = a; d.parentNode && 1 == d.parentNode.nodeType;) {
                    var e = !0;
                    for (var f in c)c[f] || (b.get("textDecoration").indexOf(f) != -1 && (c[f] = b.get("color")), e = !1);
                    if (e)break;
                    b = this.getStyle(d = d.parentNode)
                }
                return c
            }, textShadow: k(function (a) {
                if ("none" == a)return null;
                for (var d, b = [], c = {}, e = 0, f = /(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/gi; d = f.exec(a);)"," == d[0] ? (b.push(c), c = {}, e = 0) : d[1] ? c.color = d[1] : c[["offX", "offY", "blur"][e++]] = d[2];
                return b.push(c), b
            }), color: k(function (a) {
                var b = {};
                return b.color = a.replace(/^rgba\((.*?),\s*([\d.]+)\)/, function (a, c, d) {
                    return b.opacity = parseFloat(d), "rgb(" + c + ")"
                }), b
            }), textTransform: function (a, b) {
                return a[{uppercase: "toUpperCase", lowercase: "toLowerCase"}[b.get("textTransform")] || "toString"]()
            }
        }, q = 0 == " ".split(/\s+/).length, r = new g, s = new f, t = [], u = {}, v = {}, w = {
            engine: null,
            hover: !1,
            hoverables: {a: !0},
            printable: !0,
            selector: fabric.window.Sizzle || fabric.window.jQuery && function (a) {
                return jQuery(a)
            } || fabric.window.dojo && dojo.query || fabric.window.$$ && function (a) {
                return $$(a)
            } || fabric.window.$ && function (a) {
                return $(a)
            } || fabric.document.querySelectorAll && function (a) {
                return fabric.document.querySelectorAll(a)
            } || m,
            separate: "words",
            textShadow: "none"
        }, x = {words: /\s+/, characters: ""};
        return a.now = function () {
            return b.ready(), a
        }, a.refresh = function () {
            for (var b = t.splice(0, t.length), c = 0, d = b.length; c < d; ++c)a.replace.apply(null, b[c]);
            return a
        }, a.registerEngine = function (b, c) {
            return c ? (u[b] = c, a.set("engine", b)) : a
        }, a.registerFont = function (b) {
            var c = new d(b), f = c.family;
            return v[f] || (v[f] = new e), v[f].add(c), a.set("fontFamily", '"' + f + '"')
        }, a.replace = function (b, d, e) {
            return d = n(w, d), d.engine ? ("string" == typeof d.textShadow && d.textShadow && (d.textShadow = c.textShadow(d.textShadow)), e || t.push(arguments), (b.nodeType || "string" == typeof b) && (b = [b]), c.ready(function () {
                for (var c = 0, e = b.length; c < e; ++c) {
                    var f = b[c];
                    "string" == typeof f ? a.replace(d.selector(f), d, !0) : p(f, d)
                }
            }), a) : a
        }, a.replaceElement = function (a, b) {
            return b = n(w, b), "string" == typeof b.textShadow && b.textShadow && (b.textShadow = c.textShadow(b.textShadow)), p(a, b)
        }, a.engines = u, a.fonts = v, a.getOptions = function () {
            return n(w)
        }, a.set = function (b, c) {
            return w[b] = c, a
        }, a
    }();
    Cufon.registerEngine("canvas", function () {
        function e(a, b) {
            var g, c = 0, d = 0, e = [], f = /([mrvxe])([^a-z]*)/g;
            a:for (var h = 0; g = f.exec(a); ++h) {
                var i = g[2].split(",");
                switch (g[1]) {
                    case"v":
                        e[h] = {
                            m: "bezierCurveTo",
                            a: [c + ~~i[0], d + ~~i[1], c + ~~i[2], d + ~~i[3], c += ~~i[4], d += ~~i[5]]
                        };
                        break;
                    case"r":
                        e[h] = {m: "lineTo", a: [c += ~~i[0], d += ~~i[1]]};
                        break;
                    case"m":
                        e[h] = {m: "moveTo", a: [c = ~~i[0], d = ~~i[1]]};
                        break;
                    case"x":
                        e[h] = {m: "closePath", a: []};
                        break;
                    case"e":
                        break a
                }
                b[e[h].m].apply(b, e[h].a)
            }
            return e
        }

        function f(a, b) {
            for (var c = 0, d = a.length; c < d; ++c) {
                var e = a[c];
                b[e.m].apply(b, e.a)
            }
        }

        var a = Cufon.CSS.supports("display", "inline-block"),
            b = !a && ("BackCompat" == fabric.document.compatMode || /frameset|transitional/i.test(fabric.document.doctype.publicId)),
            c = fabric.document.createElement("style");
        c.type = "text/css";
        var d = fabric.document.createTextNode(".cufon-canvas{text-indent:0}@media screen,projection{.cufon-canvas{display:inline;display:inline-block;position:relative;vertical-align:middle" + (b ? "" : ";font-size:1px;line-height:1px") + "}.cufon-canvas .cufon-alt{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden}" + (a ? ".cufon-canvas canvas{position:relative}" : ".cufon-canvas canvas{position:absolute}") + "}@media print{.cufon-canvas{padding:0 !important}.cufon-canvas canvas{display:none}.cufon-canvas .cufon-alt{display:inline}}");
        try {
            c.appendChild(d)
        } catch (a) {
            c.setAttribute("type", "text/css"), c.styleSheet.cssText = d.data
        }
        return fabric.document.getElementsByTagName("head")[0].appendChild(c), function (b, c, d, g, h, i) {
            function Y() {
                S.save();
                var a = 0, c = 0, d = [{left: 0}];
                g.backgroundColor && (S.save(), S.fillStyle = g.backgroundColor, S.translate(0, b.ascent), S.fillRect(0, 0, z + 10, (-b.ascent + b.descent) * C), S.restore()), "right" === g.textAlign ? (S.translate(F[c], 0), d[0].left = F[c] * T) : "center" === g.textAlign && (S.translate(F[c] / 2, 0), d[0].left = F[c] / 2 * T);
                for (var e = 0, f = y.length; e < f; ++e)if ("\n" !== y[e]) {
                    var k = b.glyphs[y[e]] || b.missingGlyph;
                    if (k) {
                        var l = Number(k.w || b.w) + m;
                        g.textBackgroundColor && (S.save(), S.fillStyle = g.textBackgroundColor, S.translate(0, b.ascent), S.fillRect(0, 0, l + 10, -b.ascent + b.descent), S.restore()), S.translate(l, 0), a += l, e == f - 1 && (d[d.length - 1].width = a * T, d[d.length - 1].height = (-b.ascent + b.descent) * T)
                    }
                } else {
                    c++;
                    var h = -b.ascent - b.ascent / 5 * g.lineHeight, i = d[d.length - 1], j = {left: 0};
                    i.width = a * T, i.height = (-b.ascent + b.descent) * T, "right" === g.textAlign ? (S.translate(-z, h), S.translate(F[c], 0), j.left = F[c] * T) : "center" === g.textAlign ? (S.translate(-a - F[c - 1] / 2, h), S.translate(F[c] / 2, 0), j.left = F[c] / 2 * T) : S.translate(-a, h), d.push(j), a = 0
                }
                S.restore(), Cufon.textOptions.boundaries = d
            }

            function Z(a) {
                S.fillStyle = a || Cufon.textOptions.color || d.get("color");
                var c = 0, h = 0;
                "right" === g.textAlign ? S.translate(F[h], 0) : "center" === g.textAlign && S.translate(F[h] / 2, 0);
                for (var i = 0, j = y.length; i < j; ++i)if ("\n" !== y[i]) {
                    var l = b.glyphs[y[i]] || b.missingGlyph;
                    if (l) {
                        var n = Number(l.w || b.w) + m;
                        W && (S.save(), S.strokeStyle = S.fillStyle, S.lineWidth += S.lineWidth, S.beginPath(), W.underline && (S.moveTo(0, -b.face["underline-position"] + .5), S.lineTo(n, -b.face["underline-position"] + .5)), W.overline && (S.moveTo(0, b.ascent + .5), S.lineTo(n, b.ascent + .5)), W["line-through"] && (S.moveTo(0, -b.descent + .5), S.lineTo(n, -b.descent + .5)), S.stroke(), S.restore()), X && (S.save(), S.transform(1, 0, -.25, 1, 0, 0)), S.beginPath(), l.d && (l.code ? f(l.code, S) : l.code = e("m" + l.d, S)), S.fill(), g.strokeStyle && (S.closePath(), S.save(), S.lineWidth = g.strokeWidth, S.strokeStyle = g.strokeStyle, S.stroke(), S.restore()), X && S.restore(), S.translate(n, 0), c += n
                    }
                } else {
                    h++;
                    var k = -b.ascent - b.ascent / 5 * g.lineHeight;
                    "right" === g.textAlign ? (S.translate(-z, k), S.translate(F[h], 0)) : "center" === g.textAlign ? (S.translate(-c - F[h - 1] / 2, k), S.translate(F[h] / 2, 0)) : S.translate(-c, k), c = 0
                }
            }

            var j = null === c, k = b.viewBox, l = d.getSize("fontSize", b.baseSize), m = d.get("letterSpacing");
            m = "normal" == m ? 0 : l.convertFrom(parseInt(m, 10));
            var n = 0, o = 0, p = 0, q = 0, r = g.textShadow, s = [];
            if (Cufon.textOptions.shadowOffsets = [], Cufon.textOptions.shadows = null, r) {
                Cufon.textOptions.shadows = r;
                for (var t = 0, u = r.length; t < u; ++t) {
                    var v = r[t], w = l.convertFrom(parseFloat(v.offX)), x = l.convertFrom(parseFloat(v.offY));
                    s[t] = [w, x]
                }
            }
            for (var y = Cufon.CSS.textTransform(j ? h.alt : c, d).split(""), z = 0, A = null, B = 0, C = 1, D = [], t = 0, u = y.length; t < u; ++t)if ("\n" !== y[t]) {
                var E = b.glyphs[y[t]] || b.missingGlyph;
                E && (z += A = Number(E.w || b.w) + m)
            } else C++, z > B && (B = z), D.push(z), z = 0;
            D.push(z), z = Math.max(B, z);
            for (var F = [], t = D.length; t--;)F[t] = z - D[t];
            if (null === A)return null;
            o += k.width - A, q += k.minX;
            var G, H;
            if (j) G = h, H = h.firstChild; else if (G = fabric.document.createElement("span"), G.className = "cufon cufon-canvas", G.alt = c, H = fabric.document.createElement("canvas"), G.appendChild(H), g.printable) {
                var I = fabric.document.createElement("span");
                I.className = "cufon-alt", I.appendChild(fabric.document.createTextNode(c)), G.appendChild(I)
            }
            var J = G.style, K = H.style || {}, L = l.convert(k.height - n + p), M = Math.ceil(L), N = M / L;
            H.width = Math.ceil(l.convert(z + o - q) * N), H.height = M, n += k.minY, K.top = Math.round(l.convert(n - b.ascent)) + "px", K.left = Math.round(l.convert(q)) + "px";
            var O = Math.ceil(l.convert(z * N)), P = O + "px", Q = l.convert(b.height),
                R = (g.lineHeight - 1) * l.convert(-b.ascent / 5) * (C - 1);
            Cufon.textOptions.width = O, Cufon.textOptions.height = Q * C + R, Cufon.textOptions.lines = C, Cufon.textOptions.totalLineHeight = R, a ? (J.width = P, J.height = Q + "px") : (J.paddingLeft = P, J.paddingBottom = Q - 1 + "px");
            var S = Cufon.textOptions.context || H.getContext("2d"), T = M / k.height;
            Cufon.textOptions.fontAscent = b.ascent * T, Cufon.textOptions.boundaries = null;
            for (var U = Cufon.textOptions.shadowOffsets, t = s.length; t--;)U[t] = [s[t][0] * T, s[t][1] * T];
            S.save(), S.scale(T, T), S.translate(-q - 1 / T * H.width / 2 + (Cufon.fonts[b.family].offsetLeft || 0), -n - Cufon.textOptions.height / T / 2 + (Cufon.fonts[b.family].offsetTop || 0)), S.lineWidth = b.face["underline-thickness"], S.save();
            var W = Cufon.getTextDecoration(g), X = "italic" === g.fontStyle;
            if (S.save(), Y(), r)for (var t = 0, u = r.length; t < u; ++t) {
                var v = r[t];
                S.save(), S.translate.apply(S, s[t]), Z(v.color), S.restore()
            }
            return Z(), S.restore(), S.restore(), S.restore(), G
        }
    }()), Cufon.registerEngine("vml", function () {
        function c(a, b) {
            return d(a, /(?:em|ex|%)$/i.test(b) ? "1em" : b)
        }

        function d(a, b) {
            if (/px$/i.test(b))return parseFloat(b);
            var c = a.style.left, d = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left, a.style.left = b;
            var e = a.style.pixelLeft;
            return a.style.left = c, a.runtimeStyle.left = d, e
        }

        if (fabric.document.namespaces) {
            var a = fabric.document.createElement("canvas");
            if (!(a && a.getContext && a.getContext.apply)) {
                null == fabric.document.namespaces.cvml && fabric.document.namespaces.add("cvml", "urn:schemas-microsoft-com:vml");
                var b = fabric.document.createElement("cvml:shape");
                if (b.style.behavior = "url(#default#VML)", b.coordsize)return b = null, fabric.document.write('<style type="text/css">.cufon-vml-canvas{text-indent:0}@media screen{cvml\\:shape,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute}.cufon-vml-canvas{position:absolute;text-align:left}.cufon-vml{display:inline-block;position:relative;vertical-align:middle}.cufon-vml .cufon-alt{position:absolute;left:-10000in;font-size:1px}a .cufon-vml{cursor:pointer}}@media print{.cufon-vml *{display:none}.cufon-vml .cufon-alt{display:inline}}</style>'), function (a, b, e, f, g, h, i) {
                    var j = null === b;
                    j && (b = g.alt);
                    var k = a.viewBox,
                        l = e.computedFontSize || (e.computedFontSize = new Cufon.CSS.Size(c(h, e.get("fontSize")) + "px", a.baseSize)),
                        m = e.computedLSpacing;
                    m == undefined && (m = e.get("letterSpacing"), e.computedLSpacing = m = "normal" == m ? 0 : ~~l.convertFrom(d(h, m)));
                    var n, o;
                    if (j) n = g, o = g.firstChild; else {
                        if (n = fabric.document.createElement("span"), n.className = "cufon cufon-vml", n.alt = b, o = fabric.document.createElement("span"), o.className = "cufon-vml-canvas", n.appendChild(o), f.printable) {
                            var p = fabric.document.createElement("span");
                            p.className = "cufon-alt", p.appendChild(fabric.document.createTextNode(b)), n.appendChild(p)
                        }
                        i || n.appendChild(fabric.document.createElement("cvml:shape"))
                    }
                    var q = n.style, r = o.style, s = l.convert(k.height), t = Math.ceil(s), u = t / s, v = k.minX,
                        w = k.minY;
                    r.height = t, r.top = Math.round(l.convert(w - a.ascent)), r.left = Math.round(l.convert(v)), q.height = l.convert(a.height) + "px";
                    for (var D, E, y = (Cufon.getTextDecoration(f), e.get("color")), z = Cufon.CSS.textTransform(b, e).split(""), A = 0, B = 0, C = null, F = f.textShadow, G = 0, H = 0, I = z.length; G < I; ++G)D = a.glyphs[z[G]] || a.missingGlyph, D && (A += C = ~~(D.w || a.w) + m);
                    if (null === C)return null;
                    var N, J = -v + A + (k.width - C), K = l.convert(J * u), L = Math.round(K), M = J + "," + k.height,
                        O = "r" + M + "nsnf";
                    for (G = 0; G < I; ++G)if (D = a.glyphs[z[G]] || a.missingGlyph) {
                        j ? (E = o.childNodes[H], E.firstChild && E.removeChild(E.firstChild)) : (E = fabric.document.createElement("cvml:shape"), o.appendChild(E)), E.stroked = "f", E.coordsize = M, E.coordorigin = N = v - B + "," + w, E.path = (D.d ? "m" + D.d + "xe" : "") + "m" + N + O, E.fillcolor = y;
                        var P = E.style;
                        if (P.width = L, P.height = t, F) {
                            var T, Q = F[0], R = F[1], S = Cufon.CSS.color(Q.color),
                                U = fabric.document.createElement("cvml:shadow");
                            U.on = "t", U.color = S.color, U.offset = Q.offX + "," + Q.offY, R && (T = Cufon.CSS.color(R.color), U.type = "double", U.color2 = T.color, U.offset2 = R.offX + "," + R.offY), U.opacity = S.opacity || T && T.opacity || 1, E.appendChild(U)
                        }
                        B += ~~(D.w || a.w) + m, ++H
                    }
                    return q.width = Math.max(Math.ceil(l.convert(A * u)), 0), n
                }
            }
        }
    }()), Cufon.getTextDecoration = function (a) {
        return {
            underline: "underline" === a.textDecoration,
            overline: "overline" === a.textDecoration,
            "line-through": "line-through" === a.textDecoration
        }
    }, "undefined" != typeof exports && (exports.Cufon = Cufon), "object" != typeof JSON && (JSON = {}), function () {
        "use strict";
        function f(a) {
            return a < 10 ? "0" + a : a
        }

        function quote(a) {
            return escapable.lastIndex = 0, escapable.test(a) ? '"' + a.replace(escapable, function (a) {
                    var b = meta[a];
                    return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + a + '"'
        }

        function str(a, b) {
            var c, d, e, f, h, g = gap, i = b[a];
            switch (i && "object" == typeof i && "function" == typeof i.toJSON && (i = i.toJSON(a)), "function" == typeof rep && (i = rep.call(b, a, i)), typeof i) {
                case"string":
                    return quote(i);
                case"number":
                    return isFinite(i) ? String(i) : "null";
                case"boolean":
                case"null":
                    return String(i);
                case"object":
                    if (!i)return "null";
                    if (gap += indent, h = [], "[object Array]" === Object.prototype.toString.apply(i)) {
                        for (f = i.length, c = 0; c < f; c += 1)h[c] = str(c, i) || "null";
                        return e = 0 === h.length ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]", gap = g, e
                    }
                    if (rep && "object" == typeof rep)for (f = rep.length, c = 0; c < f; c += 1)"string" == typeof rep[c] && (d = rep[c], e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e)); else for (d in i)Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i), e && h.push(quote(d) + (gap ? ": " : ":") + e));
                    return e = 0 === h.length ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}", gap = g, e
            }
        }

        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        });
        var cx, escapable, gap, indent, meta, rep;
        "function" != typeof JSON.stringify && (escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, JSON.stringify = function (a, b, c) {
            var d;
            if (gap = "", indent = "", "number" == typeof c)for (d = 0; d < c; d += 1)indent += " "; else"string" == typeof c && (indent = c);
            if (rep = b, b && "function" != typeof b && ("object" != typeof b || "number" != typeof b.length))throw new Error("JSON.stringify");
            return str("", {"": a})
        }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function (text, reviver) {
            function walk(a, b) {
                var c, d, e = a[b];
                if (e && "object" == typeof e)for (c in e)Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), d !== undefined ? e[c] = d : delete e[c]);
                return reviver.call(a, b, e)
            }

            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }(), function () {
        function a(a, b) {
            this.__eventListeners[a] && (b ? fabric.util.removeFromArray(this.__eventListeners[a], b) : this.__eventListeners[a].length = 0)
        }

        function b(a, b) {
            if (this.__eventListeners || (this.__eventListeners = {}), 1 === arguments.length)for (var c in a)this.on(c, a[c]); else this.__eventListeners[a] || (this.__eventListeners[a] = []), this.__eventListeners[a].push(b);
            return this
        }

        function c(b, c) {
            if (this.__eventListeners) {
                if (0 === arguments.length) this.__eventListeners = {}; else if (1 === arguments.length && "object" == typeof arguments[0])for (var d in b)a.call(this, d, b[d]); else a.call(this, b, c);
                return this
            }
        }

        function d(a, b) {
            if (this.__eventListeners) {
                var c = this.__eventListeners[a];
                if (c) {
                    for (var d = 0, e = c.length; d < e; d++)c[d].call(this, b || {});
                    return this
                }
            }
        }

        fabric.Observable = {observe: b, stopObserving: c, fire: d, on: b, off: c, trigger: d}
    }(), fabric.Collection = {
        add: function () {
            this._objects.push.apply(this._objects, arguments);
            for (var a = 0, b = arguments.length; a < b; a++)this._onObjectAdded(arguments[a]);
            return this.renderOnAddRemove && this.renderAll(), this
        }, insertAt: function (a, b, c) {
            var d = this.getObjects();
            return c ? d[b] = a : d.splice(b, 0, a), this._onObjectAdded(a), this.renderOnAddRemove && this.renderAll(), this
        }, remove: function () {
            for (var b, a = this.getObjects(), c = 0, d = arguments.length; c < d; c++)b = a.indexOf(arguments[c]), b !== -1 && (a.splice(b, 1), this._onObjectRemoved(arguments[c]));
            return this.renderOnAddRemove && this.renderAll(), this
        }, forEachObject: function (a, b) {
            for (var c = this.getObjects(), d = c.length; d--;)a.call(b, c[d], d, c);
            return this
        }, getObjects: function (a) {
            return "undefined" == typeof a ? this._objects : this._objects.filter(function (b) {
                return b.type === a
            })
        }, item: function (a) {
            return this.getObjects()[a]
        }, isEmpty: function () {
            return 0 === this.getObjects().length
        }, size: function () {
            return this.getObjects().length
        }, contains: function (a) {
            return this.getObjects().indexOf(a) > -1
        }, complexity: function () {
            return this.getObjects().reduce(function (a, b) {
                return a += b.complexity ? b.complexity() : 0
            }, 0)
        }
    }, function (a) {
        var b = Math.sqrt, c = Math.atan2, d = Math.PI / 180;
        fabric.util = {
            removeFromArray: function (a, b) {
                var c = a.indexOf(b);
                return c !== -1 && a.splice(c, 1), a
            }, getRandomInt: function (a, b) {
                return Math.floor(Math.random() * (b - a + 1)) + a
            }, degreesToRadians: function (a) {
                return a * d
            }, radiansToDegrees: function (a) {
                return a / d
            }, rotatePoint: function (a, b, c) {
                var d = Math.sin(c), e = Math.cos(c);
                a.subtractEquals(b);
                var f = a.x * e - a.y * d, g = a.x * d + a.y * e;
                return new fabric.Point(f, g).addEquals(b)
            }, transformPoint: function (a, b, c) {
                return c ? new fabric.Point(b[0] * a.x + b[1] * a.y, b[2] * a.x + b[3] * a.y) : new fabric.Point(b[0] * a.x + b[1] * a.y + b[4], b[2] * a.x + b[3] * a.y + b[5])
            }, invertTransform: function (a) {
                var b = a.slice(), c = 1 / (a[0] * a[3] - a[1] * a[2]);
                b = [c * a[3], -c * a[1], -c * a[2], c * a[0], 0, 0];
                var d = fabric.util.transformPoint({x: a[4], y: a[5]}, b);
                return b[4] = -d.x, b[5] = -d.y, b
            }, toFixed: function (a, b) {
                return parseFloat(Number(a).toFixed(b))
            }, parseUnit: function (a) {
                var b = /\D{0,2}$/.exec(a), c = parseFloat(a);
                switch (b[0]) {
                    case"mm":
                        return c * fabric.DPI / 25.4;
                    case"cm":
                        return c * fabric.DPI / 2.54;
                    case"in":
                        return c * fabric.DPI;
                    case"pt":
                        return c * fabric.DPI / 72;
                    case"pc":
                        return c * fabric.DPI / 72 * 12;
                    default:
                        return c
                }
            }, falseFunction: function () {
                return !1
            }, getKlass: function (a, b) {
                return a = fabric.util.string.camelize(a.charAt(0).toUpperCase() + a.slice(1)), fabric.util.resolveNamespace(b)[a]
            }, resolveNamespace: function (b) {
                if (!b)return fabric;
                for (var c = b.split("."), d = c.length, e = a || fabric.window, f = 0; f < d; ++f)e = e[c[f]];
                return e
            }, loadImage: function (a, b, c, d) {
                if (!a)return void(b && b.call(c, a));
                var e = fabric.util.createImage();
                e.onload = function () {
                    b && b.call(c, e), e = e.onload = e.onerror = null
                }, e.onerror = function () {
                    fabric.log("Error loading " + e.src), b && b.call(c, null, !0), e = e.onload = e.onerror = null
                }, 0 !== a.indexOf("data") && "undefined" != typeof d && (e.crossOrigin = d), e.src = a
            }, enlivenObjects: function (a, b, c, d) {
                function e() {
                    ++g === h && b && b(f)
                }

                a = a || [];
                var f = [], g = 0, h = a.length;
                return h ? void a.forEach(function (a, b) {
                    if (!a || !a.type)return void e();
                    var g = fabric.util.getKlass(a.type, c);
                    g.async ? g.fromObject(a, function (c, g) {
                        g || (f[b] = c, d && d(a, f[b])), e()
                    }) : (f[b] = g.fromObject(a), d && d(a, f[b]), e())
                }) : void(b && b(f))
            }, groupSVGElements: function (a, b, c) {
                var d;
                return d = new fabric.PathGroup(a, b), "undefined" != typeof c && d.setSourcePath(c), d
            }, populateWithProperties: function (a, b, c) {
                if (c && "[object Array]" === Object.prototype.toString.call(c))for (var d = 0, e = c.length; d < e; d++)c[d] in a && (b[c[d]] = a[c[d]])
            }, drawDashedLine: function (a, d, e, f, g, h) {
                var i = f - d, j = g - e, k = b(i * i + j * j), l = c(j, i), m = h.length, n = 0, o = !0;
                for (a.save(), a.translate(d, e), a.moveTo(0, 0), a.rotate(l), d = 0; k > d;)d += h[n++ % m], d > k && (d = k), a[o ? "lineTo" : "moveTo"](d, 0), o = !o;
                a.restore()
            }, createCanvasElement: function (a) {
                return a || (a = fabric.document.createElement("canvas")), a.getContext || "undefined" == typeof G_vmlCanvasManager || G_vmlCanvasManager.initElement(a), a
            }, createImage: function () {
                return fabric.isLikelyNode ? new (require("canvas").Image) : fabric.document.createElement("img")
            }, createAccessors: function (a) {
                for (var b = a.prototype, c = b.stateProperties.length; c--;) {
                    var d = b.stateProperties[c], e = d.charAt(0).toUpperCase() + d.slice(1), f = "set" + e,
                        g = "get" + e;
                    b[g] || (b[g] = function (a) {
                        return new Function('return this.get("' + a + '")')
                    }(d)), b[f] || (b[f] = function (a) {
                        return new Function("value", 'return this.set("' + a + '", value)')
                    }(d))
                }
            }, clipContext: function (a, b) {
                b.save(), b.beginPath(), a.clipTo(b), b.clip()
            }, multiplyTransformMatrices: function (a, b) {
                for (var c = [[a[0], a[2], a[4]], [a[1], a[3], a[5]], [0, 0, 1]], d = [[b[0], b[2], b[4]], [b[1], b[3], b[5]], [0, 0, 1]], e = [], f = 0; f < 3; f++) {
                    e[f] = [];
                    for (var g = 0; g < 3; g++) {
                        for (var h = 0, i = 0; i < 3; i++)h += c[f][i] * d[i][g];
                        e[f][g] = h
                    }
                }
                return [e[0][0], e[1][0], e[0][1], e[1][1], e[0][2], e[1][2]]
            }, getFunctionBody: function (a) {
                return (String(a).match(/function[^{]*\{([\s\S]*)\}/) || {})[1]
            }, isTransparent: function (a, b, c, d) {
                d > 0 && (b > d ? b -= d : b = 0, c > d ? c -= d : c = 0);
                for (var e = !0, f = a.getImageData(b, c, 2 * d || 1, 2 * d || 1), g = 3, h = f.data.length; g < h; g += 4) {
                    var i = f.data[g];
                    if (e = i <= 0, e === !1)break
                }
                return f = null, e
            }
        }
    }("undefined" != typeof exports ? exports : this), function () {
        function d(b, d, g, h, i, j, k) {
            var l = c.call(arguments);
            if (a[l])return a[l];
            var m = Math.PI, n = k * (m / 180), o = Math.sin(n), p = Math.cos(n), q = 0, r = 0;
            g = Math.abs(g), h = Math.abs(h);
            var s = -p * b - o * d, t = -p * d + o * b, u = g * g, v = h * h, w = t * t, x = s * s,
                y = 4 * u * v - u * w - v * x, z = 0;
            if (y < 0) {
                var A = Math.sqrt(1 - .25 * y / (u * v));
                g *= A, h *= A
            } else z = (i === j ? -.5 : .5) * Math.sqrt(y / (u * w + v * x));
            var B = z * g * t / h, C = -z * h * s / g, D = p * B - o * C + b / 2, E = o * B + p * C + d / 2,
                F = f(1, 0, (s - B) / g, (t - C) / h), G = f((s - B) / g, (t - C) / h, (-s - B) / g, (-t - C) / h);
            0 === j && G > 0 ? G -= 2 * m : 1 === j && G < 0 && (G += 2 * m);
            for (var H = Math.ceil(Math.abs(G / (.5 * m))), I = [], J = G / H, K = 8 / 3 * Math.sin(J / 4) * Math.sin(J / 4) / Math.sin(J / 2), L = F + J, M = 0; M < H; M++)I[M] = e(F, L, p, o, g, h, D, E, K, q, r), q = I[M][4], r = I[M][5], F += J, L += J;
            return a[l] = I, I
        }

        function e(a, d, e, f, g, h, i, j, k, l, m) {
            var n = c.call(arguments);
            if (b[n])return b[n];
            var o = Math.cos(a), p = Math.sin(a), q = Math.cos(d), r = Math.sin(d), s = e * g * q - f * h * r + i,
                t = f * g * q + e * h * r + j, u = l + k * (-e * g * p - f * h * o),
                v = m + k * (-f * g * p + e * h * o), w = s + k * (e * g * r + f * h * q),
                x = t + k * (f * g * r - e * h * q);
            return b[n] = [u, v, w, x, s, t], b[n]
        }

        function f(a, b, c, d) {
            var e = Math.atan2(b, a), f = Math.atan2(d, c);
            return f >= e ? f - e : 2 * Math.PI - (e - f)
        }

        var a = {}, b = {}, c = Array.prototype.join;
        fabric.util.drawArc = function (a, b, c, e) {
            for (var f = e[0], g = e[1], h = e[2], i = e[3], j = e[4], k = e[5], l = e[6], m = [[], [], [], []], n = d(k - b, l - c, f, g, i, j, h), o = 0, p = n.length; o < p; o++)m[o][0] = n[o][0] + b, m[o][1] = n[o][1] + c, m[o][2] = n[o][2] + b, m[o][3] = n[o][3] + c, m[o][4] = n[o][4] + b, m[o][5] = n[o][5] + c, a.bezierCurveTo.apply(a, m[o])
        }
    }(), function () {
        function b(b, c) {
            for (var d = a.call(arguments, 2), e = [], f = 0, g = b.length; f < g; f++)e[f] = d.length ? b[f][c].apply(b[f], d) : b[f][c].call(b[f]);
            return e
        }

        function c(a, b) {
            return e(a, b, function (a, b) {
                return a >= b
            })
        }

        function d(a, b) {
            return e(a, b, function (a, b) {
                return a < b
            })
        }

        function e(a, b, c) {
            if (a && 0 !== a.length) {
                var d = a.length - 1, e = b ? a[d][b] : a[d];
                if (b)for (; d--;)c(a[d][b], e) && (e = a[d][b]); else for (; d--;)c(a[d], e) && (e = a[d]);
                return e
            }
        }

        var a = Array.prototype.slice;
        fabric.util.array = {invoke: b, min: d, max: c}
    }(), function () {
        function a(a, b) {
            for (var c in b)a[c] = b[c];
            return a
        }

        function b(b) {
            return a({}, b)
        }

        fabric.util.object = {extend: a, clone: b}
    }(), function () {
        function a(a) {
            return a.replace(/-+(.)?/g, function (a, b) {
                return b ? b.toUpperCase() : ""
            })
        }

        function b(a, b) {
            return a.charAt(0).toUpperCase() + (b ? a.slice(1) : a.slice(1).toLowerCase())
        }

        function c(a) {
            return a.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        fabric.util.string = {camelize: a, capitalize: b, escapeXml: c}
    }(), function () {
        function e() {
        }

        function f(b) {
            var c = this.constructor.superclass.prototype[b];
            return arguments.length > 1 ? c.apply(this, a.call(arguments, 1)) : c.call(this)
        }

        function g() {
            function h() {
                this.initialize.apply(this, arguments)
            }

            var c = null, g = a.call(arguments, 0);
            "function" == typeof g[0] && (c = g.shift()), h.superclass = c, h.subclasses = [], c && (e.prototype = c.prototype, h.prototype = new e, c.subclasses.push(h));
            for (var i = 0, j = g.length; i < j; i++)d(h, g[i], c);
            return h.prototype.initialize || (h.prototype.initialize = b), h.prototype.constructor = h, h.prototype.callSuper = f, h
        }

        var a = Array.prototype.slice, b = function () {
        }, c = function () {
            for (var a in{toString: 1})if ("toString" === a)return !1;
            return !0
        }(), d = function (a, b, d) {
            for (var e in b)e in a.prototype && "function" == typeof a.prototype[e] && (b[e] + "").indexOf("callSuper") > -1 ? a.prototype[e] = function (a) {
                return function () {
                    var c = this.constructor.superclass;
                    this.constructor.superclass = d;
                    var e = b[a].apply(this, arguments);
                    if (this.constructor.superclass = c, "initialize" !== a)return e
                }
            }(e) : a.prototype[e] = b[e], c && (b.toString !== Object.prototype.toString && (a.prototype.toString = b.toString), b.valueOf !== Object.prototype.valueOf && (a.prototype.valueOf = b.valueOf))
        };
        fabric.util.createClass = g
    }(), function () {
        function b(a) {
            var c, d, b = Array.prototype.slice.call(arguments, 1), e = b.length;
            for (d = 0; d < e; d++)if (c = typeof a[b[d]], !/^(?:function|object|unknown)$/.test(c))return !1;
            return !0
        }

        function f(a, b) {
            return {handler: b, wrappedHandler: g(a, b)}
        }

        function g(a, b) {
            return function (d) {
                b.call(c(a), d || fabric.window.event)
            }
        }

        function h(a, b) {
            return function (c) {
                if (l[a] && l[a][b])for (var d = l[a][b], e = 0, f = d.length; e < f; e++)d[e].call(this, c || fabric.window.event)
            }
        }

        function o(b, c) {
            b || (b = fabric.window.event);
            var d = b.target || (typeof b.srcElement !== a ? b.srcElement : null),
                e = fabric.util.getScrollLeftTop(d, c);
            return {x: p(b) + e.left, y: q(b) + e.top}
        }

        function r(a, b, c) {
            var d = "touchend" === a.type ? "changedTouches" : "touches";
            return a[d] && a[d][0] ? a[d][0][b] - (a[d][0][b] - a[d][0][c]) || a[c] : a[c]
        }

        var c, d, a = "unknown", e = function () {
            var a = 0;
            return function (b) {
                return b.__uniqueID || (b.__uniqueID = "uniqueID__" + a++)
            }
        }();
        !function () {
            var a = {};
            c = function (b) {
                return a[b]
            }, d = function (b, c) {
                a[b] = c
            }
        }();
        var m, n,
            i = b(fabric.document.documentElement, "addEventListener", "removeEventListener") && b(fabric.window, "addEventListener", "removeEventListener"),
            j = b(fabric.document.documentElement, "attachEvent", "detachEvent") && b(fabric.window, "attachEvent", "detachEvent"),
            k = {}, l = {};
        i ? (m = function (a, b, c) {
            a.addEventListener(b, c, !1)
        }, n = function (a, b, c) {
            a.removeEventListener(b, c, !1)
        }) : j ? (m = function (a, b, c) {
            var g = e(a);
            d(g, a), k[g] || (k[g] = {}), k[g][b] || (k[g][b] = []);
            var h = f(g, c);
            k[g][b].push(h), a.attachEvent("on" + b, h.wrappedHandler)
        }, n = function (a, b, c) {
            var f, d = e(a);
            if (k[d] && k[d][b])for (var g = 0, h = k[d][b].length; g < h; g++)f = k[d][b][g], f && f.handler === c && (a.detachEvent("on" + b, f.wrappedHandler), k[d][b][g] = null)
        }) : (m = function (a, b, c) {
            var d = e(a);
            if (l[d] || (l[d] = {}), !l[d][b]) {
                l[d][b] = [];
                var f = a["on" + b];
                f && l[d][b].push(f), a["on" + b] = h(d, b)
            }
            l[d][b].push(c)
        }, n = function (a, b, c) {
            var d = e(a);
            if (l[d] && l[d][b])for (var f = l[d][b], g = 0, h = f.length; g < h; g++)f[g] === c && f.splice(g, 1)
        }), fabric.util.addListener = m, fabric.util.removeListener = n;
        var p = function (b) {
            return typeof b.clientX !== a ? b.clientX : 0
        }, q = function (b) {
            return typeof b.clientY !== a ? b.clientY : 0
        };
        fabric.isTouchSupported && (p = function (a) {
            return r(a, "pageX", "clientX")
        }, q = function (a) {
            return r(a, "pageY", "clientY")
        }), fabric.util.getPointer = o, fabric.util.object.extend(fabric.util, fabric.Observable)
    }(), function () {
        function a(a, b) {
            var c = a.style;
            if (!c)return a;
            if ("string" == typeof b)return a.style.cssText += ";" + b, b.indexOf("opacity") > -1 ? f(a, b.match(/opacity:\s*(\d?\.?\d*)/)[1]) : a;
            for (var d in b)if ("opacity" === d) f(a, b[d]); else {
                var e = "float" === d || "cssFloat" === d ? "undefined" == typeof c.styleFloat ? "cssFloat" : "styleFloat" : d;
                c[e] = b[d]
            }
            return a
        }

        var b = fabric.document.createElement("div"), c = "string" == typeof b.style.opacity,
            d = "string" == typeof b.style.filter, e = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/, f = function (a) {
                return a
            };
        c ? f = function (a, b) {
            return a.style.opacity = b, a
        } : d && (f = function (a, b) {
                var c = a.style;
                return a.currentStyle && !a.currentStyle.hasLayout && (c.zoom = 1), e.test(c.filter) ? (b = b >= .9999 ? "" : "alpha(opacity=" + 100 * b + ")", c.filter = c.filter.replace(e, b)) : c.filter += " alpha(opacity=" + 100 * b + ")", a
            }), fabric.util.setStyle = a
    }(), function () {
        function b(a) {
            return "string" == typeof a ? fabric.document.getElementById(a) : a
        }

        function e(a, b) {
            var c = fabric.document.createElement(a);
            for (var d in b)"class" === d ? c.className = b[d] : "for" === d ? c.htmlFor = b[d] : c.setAttribute(d, b[d]);
            return c
        }

        function f(a, b) {
            a && (" " + a.className + " ").indexOf(" " + b + " ") === -1 && (a.className += (a.className ? " " : "") + b)
        }

        function g(a, b, c) {
            return "string" == typeof b && (b = e(b, c)), a.parentNode && a.parentNode.replaceChild(b, a), b.appendChild(a), b
        }

        function h(a, b) {
            var c, d, e = 0, f = 0, g = fabric.document.documentElement,
                h = fabric.document.body || {scrollLeft: 0, scrollTop: 0};
            for (d = a; a && a.parentNode && !c;)a = a.parentNode, a !== fabric.document && "fixed" === fabric.util.getElementStyle(a, "position") && (c = a), a !== fabric.document && d !== b && "absolute" === fabric.util.getElementStyle(a, "position") ? (e = 0, f = 0) : a === fabric.document ? (e = h.scrollLeft || g.scrollLeft || 0, f = h.scrollTop || g.scrollTop || 0) : (e += a.scrollLeft || 0, f += a.scrollTop || 0);
            return {left: e, top: f}
        }

        function i(a) {
            var b, f, c = a && a.ownerDocument, d = {left: 0, top: 0}, e = {left: 0, top: 0},
                g = {borderLeftWidth: "left", borderTopWidth: "top", paddingLeft: "left", paddingTop: "top"};
            if (!c)return {left: 0, top: 0};
            for (var h in g)e[g[h]] += parseInt(j(a, h), 10) || 0;
            return b = c.documentElement, "undefined" != typeof a.getBoundingClientRect && (d = a.getBoundingClientRect()), f = fabric.util.getScrollLeftTop(a, null), {
                left: d.left + f.left - (b.clientLeft || 0) + e.left,
                top: d.top + f.top - (b.clientTop || 0) + e.top
            }
        }

        var c, a = Array.prototype.slice, d = function (b) {
            return a.call(b, 0)
        };
        try {
            c = d(fabric.document.childNodes) instanceof Array
        } catch (a) {
        }
        c || (d = function (a) {
            for (var b = new Array(a.length), c = a.length; c--;)b[c] = a[c];
            return b
        });
        var j;
        j = fabric.document.defaultView && fabric.document.defaultView.getComputedStyle ? function (a, b) {
            return fabric.document.defaultView.getComputedStyle(a, null)[b]
        } : function (a, b) {
            var c = a.style[b];
            return !c && a.currentStyle && (c = a.currentStyle[b]), c
        }, function () {
            function c(a) {
                return "undefined" != typeof a.onselectstart && (a.onselectstart = fabric.util.falseFunction), b ? a.style[b] = "none" : "string" == typeof a.unselectable && (a.unselectable = "on"), a
            }

            function d(a) {
                return "undefined" != typeof a.onselectstart && (a.onselectstart = null), b ? a.style[b] = "" : "string" == typeof a.unselectable && (a.unselectable = ""), a
            }

            var a = fabric.document.documentElement.style,
                b = "userSelect" in a ? "userSelect" : "MozUserSelect" in a ? "MozUserSelect" : "WebkitUserSelect" in a ? "WebkitUserSelect" : "KhtmlUserSelect" in a ? "KhtmlUserSelect" : "";
            fabric.util.makeElementUnselectable = c, fabric.util.makeElementSelectable = d
        }(), function () {
            function a(a, b) {
                var c = fabric.document.getElementsByTagName("head")[0], d = fabric.document.createElement("script"),
                    e = !0;
                d.onload = d.onreadystatechange = function (a) {
                    if (e) {
                        if ("string" == typeof this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)return;
                        e = !1, b(a || fabric.window.event), d = d.onload = d.onreadystatechange = null
                    }
                }, d.src = a, c.appendChild(d)
            }

            fabric.util.getScript = a
        }(), fabric.util.getById = b, fabric.util.toArray = d, fabric.util.makeElement = e, fabric.util.addClass = f, fabric.util.wrapElement = g, fabric.util.getScrollLeftTop = h, fabric.util.getElementOffset = i, fabric.util.getElementStyle = j
    }(), function () {
        function a(a, b) {
            return a + (/\?/.test(a) ? "&" : "?") + b
        }

        function c() {
        }

        function d(d, e) {
            e || (e = {});
            var i, f = e.method ? e.method.toUpperCase() : "GET", g = e.onComplete || function () {
                }, h = b();
            return h.onreadystatechange = function () {
                4 === h.readyState && (g(h), h.onreadystatechange = c)
            }, "GET" === f && (i = null, "string" == typeof e.parameters && (d = a(d, e.parameters))), h.open(f, d, !0), "POST" !== f && "PUT" !== f || h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), h.send(i), h
        }

        var b = function () {
            for (var a = [function () {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP.3.0")
            }, function () {
                return new XMLHttpRequest
            }], b = a.length; b--;)try {
                var c = a[b]();
                if (c)return a[b]
            } catch (a) {
            }
        }();
        fabric.util.request = d
    }(), fabric.log = function () {
    }, fabric.warn = function () {
    }, "undefined" != typeof console && ["log", "warn"].forEach(function (a) {
        "undefined" != typeof console[a] && console[a].apply && (fabric[a] = function () {
            return console[a].apply(console, arguments)
        })
    }), function (a) {
        "use strict";
        function k(a) {
            return a in i ? i[a] : a
        }

        function l(a, c, d) {
            var f, e = "[object Array]" === Object.prototype.toString.call(c);
            return "fill" !== a && "stroke" !== a || "none" !== c ? "fillRule" === a ? c = "evenodd" === c ? "destination-over" : c : "strokeDashArray" === a ? c = c.replace(/,/g, " ").split(/\s+/).map(function (a) {
                return parseInt(a)
            }) : "transformMatrix" === a ? c = d && d.transformMatrix ? h(d.transformMatrix, b.parseTransformAttribute(c)) : b.parseTransformAttribute(c) : "visible" === a ? (c = "none" !== c && "hidden" !== c, d && d.visible === !1 && (c = !1)) : "originX" === a ? c = "start" === c ? "left" : "end" === c ? "right" : "center" : f = e ? c.map(g) : g(c) : c = "", !e && isNaN(f) ? c : f
        }

        function m(a) {
            for (var c in j)if (a[c] && "undefined" != typeof a[j[c]] && 0 !== a[c].indexOf("url(")) {
                var d = new b.Color(a[c]);
                a[c] = d.setAlpha(f(d.getAlpha() * a[j[c]], 2)).toRgba()
            }
            return a
        }

        function n(a, b) {
            var c = a.match(/(normal|italic)?\s*(normal|small-caps)?\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\s*(\d+)px(?:\/(normal|[\d\.]+))?\s+(.*)/);
            if (c) {
                var d = c[1], e = c[3], f = c[4], g = c[5], h = c[6];
                d && (b.fontStyle = d), e && (b.fontWeight = isNaN(parseFloat(e)) ? e : parseFloat(e)), f && (b.fontSize = parseFloat(f)), h && (b.fontFamily = h), g && (b.lineHeight = "normal" === g ? 1 : g)
            }
        }

        function o(a, b) {
            var c, d;
            a.replace(/;$/, "").split(";").forEach(function (a) {
                var e = a.split(":");
                c = k(e[0].trim().toLowerCase()), d = l(c, e[1].trim()), "font" === c ? n(d, b) : b[c] = d
            })
        }

        function p(a, b) {
            var c, d;
            for (var e in a)"undefined" != typeof a[e] && (c = k(e.toLowerCase()), d = l(c, a[e]), "font" === c ? n(d, b) : b[c] = d)
        }

        function q(a) {
            var c = {};
            for (var d in b.cssRules)if (r(a, d.split(" ")))for (var e in b.cssRules[d])c[e] = b.cssRules[d][e];
            return c
        }

        function r(a, b) {
            var c, d = !0;
            return c = t(a, b.pop()), c && b.length && (d = s(a, b)), c && d && 0 === b.length
        }

        function s(a, b) {
            for (var c, d = !0; a.parentNode && 1 === a.parentNode.nodeType && b.length;)d && (c = b.pop()), a = a.parentNode, d = t(a, c);
            return 0 === b.length
        }

        function t(a, b) {
            var f, c = a.nodeName, d = a.getAttribute("class"), e = a.getAttribute("id");
            if (f = new RegExp("^" + c, "i"), b = b.replace(f, ""), e && b.length && (f = new RegExp("#" + e + "(?![a-zA-Z\\-]+)", "i"), b = b.replace(f, "")), d && b.length) {
                d = d.split(" ");
                for (var g = d.length; g--;)f = new RegExp("\\." + d[g] + "(?![a-zA-Z\\-]+)", "i"), b = b.replace(f, "")
            }
            return 0 === b.length
        }

        function u(a) {
            for (var b = a.getElementsByTagName("use"); b.length;) {
                for (var i, c = b[0], d = c.getAttribute("xlink:href").substr(1), e = c.getAttribute("x") || 0, f = c.getAttribute("y") || 0, g = a.getElementById(d).cloneNode(!0), h = (c.getAttribute("transform") || "") + " translate(" + e + ", " + f + ")", j = 0, k = c.attributes, l = k.length; j < l; j++) {
                    var m = k.item(j);
                    "x" !== m.nodeName && "y" !== m.nodeName && "xlink:href" !== m.nodeName && ("transform" === m.nodeName ? h = h + " " + m.nodeValue : g.setAttribute(m.nodeName, m.nodeValue))
                }
                g.setAttribute("transform", h), g.removeAttribute("id"), i = c.parentNode, i.replaceChild(g, c)
            }
        }

        function v(a, b) {
            if (b[3] = b[0] = b[0] > b[3] ? b[3] : b[0], 1 !== b[0] || 1 !== b[3] || 0 !== b[4] || 0 !== b[5]) {
                for (var c = a.ownerDocument.createElement("g"); null != a.firstChild;)c.appendChild(a.firstChild);
                c.setAttribute("transform", "matrix(" + b[0] + " " + b[1] + " " + b[2] + " " + b[3] + " " + b[4] + " " + b[5] + ")"), a.appendChild(c)
            }
        }

        function x(a) {
            var c = a.objects, e = a.options;
            return c = c.map(function (a) {
                return b[d(a.type)].fromObject(a)
            }), {objects: c, options: e}
        }

        function y(a, b, c) {
            b[c] && b[c].toSVG && a.push('<pattern x="0" y="0" id="', c, 'Pattern" ', 'width="', b[c].source.width, '" height="', b[c].source.height, '" patternUnits="userSpaceOnUse">', '<image x="0" y="0" ', 'width="', b[c].source.width, '" height="', b[c].source.height, '" xlink:href="', b[c].source.src, '"></image></pattern>')
        }

        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend, d = b.util.string.capitalize,
            e = b.util.object.clone, f = b.util.toFixed, g = b.util.parseUnit, h = b.util.multiplyTransformMatrices,
            i = {
                cx: "left",
                x: "left",
                r: "radius",
                cy: "top",
                y: "top",
                display: "visible",
                visibility: "visible",
                transform: "transformMatrix",
                "fill-opacity": "fillOpacity",
                "fill-rule": "fillRule",
                "font-family": "fontFamily",
                "font-size": "fontSize",
                "font-style": "fontStyle",
                "font-weight": "fontWeight",
                "stroke-dasharray": "strokeDashArray",
                "stroke-linecap": "strokeLineCap",
                "stroke-linejoin": "strokeLineJoin",
                "stroke-miterlimit": "strokeMiterLimit",
                "stroke-opacity": "strokeOpacity",
                "stroke-width": "strokeWidth",
                "text-decoration": "textDecoration",
                "text-anchor": "originX"
            }, j = {stroke: "strokeOpacity", fill: "fillOpacity"};
        b.parseTransformAttribute = function () {
            function a(a, b) {
                var c = b[0];
                a[0] = Math.cos(c), a[1] = Math.sin(c), a[2] = -Math.sin(c), a[3] = Math.cos(c)
            }

            function c(a, b) {
                var c = b[0], d = 2 === b.length ? b[1] : b[0];
                a[0] = c, a[3] = d
            }

            function d(a, b) {
                a[2] = b[0]
            }

            function e(a, b) {
                a[1] = b[0]
            }

            function f(a, b) {
                a[4] = b[0], 2 === b.length && (a[5] = b[1])
            }

            var g = [1, 0, 0, 1, 0, 0], h = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)", i = "(?:\\s+,?\\s*|,\\s*)",
                j = "(?:(skewX)\\s*\\(\\s*(" + h + ")\\s*\\))", k = "(?:(skewY)\\s*\\(\\s*(" + h + ")\\s*\\))",
                l = "(?:(rotate)\\s*\\(\\s*(" + h + ")(?:" + i + "(" + h + ")" + i + "(" + h + "))?\\s*\\))",
                m = "(?:(scale)\\s*\\(\\s*(" + h + ")(?:" + i + "(" + h + "))?\\s*\\))",
                n = "(?:(translate)\\s*\\(\\s*(" + h + ")(?:" + i + "(" + h + "))?\\s*\\))",
                o = "(?:(matrix)\\s*\\(\\s*(" + h + ")" + i + "(" + h + ")" + i + "(" + h + ")" + i + "(" + h + ")" + i + "(" + h + ")" + i + "(" + h + ")\\s*\\))",
                p = "(?:" + o + "|" + n + "|" + m + "|" + l + "|" + j + "|" + k + ")",
                q = "(?:" + p + "(?:" + i + p + ")*)", r = "^\\s*(?:" + q + "?)\\s*$", s = new RegExp(r),
                t = new RegExp(p, "g");
            return function (h) {
                var i = g.concat(), j = [];
                if (!h || h && !s.test(h))return i;
                h.replace(t, function (h) {
                    var k = new RegExp(p).exec(h).filter(function (a) {
                        return "" !== a && null != a
                    }), l = k[1], m = k.slice(2).map(parseFloat);
                    switch (l) {
                        case"translate":
                            f(i, m);
                            break;
                        case"rotate":
                            m[0] = b.util.degreesToRadians(m[0]), a(i, m);
                            break;
                        case"scale":
                            c(i, m);
                            break;
                        case"skewX":
                            d(i, m);
                            break;
                        case"skewY":
                            e(i, m);
                            break;
                        case"matrix":
                            i = m
                    }
                    j.push(i.concat()), i = g.concat()
                });
                for (var k = j[0]; j.length > 1;)j.shift(), k = b.util.multiplyTransformMatrices(k, j[0]);
                return k
            }
        }(), b.parseSVGDocument = function () {
            function f(a, b) {
                for (; a && (a = a.parentNode);)if (b.test(a.nodeName))return !0;
                return !1
            }

            var a = /^(path|circle|polygon|polyline|ellipse|rect|line|image|text)$/,
                c = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)",
                d = new RegExp("^\\s*(" + c + "+)\\s*,?\\s*(" + c + "+)\\s*,?\\s*(" + c + "+)\\s*,?\\s*(" + c + "+)\\s*$");
            return function (c, h, i) {
                if (c) {
                    var j = new Date;
                    u(c);
                    var n, o, k = c.getAttribute("viewBox"), l = g(c.getAttribute("width") || "100%"),
                        m = g(c.getAttribute("height") || "100%");
                    if (k && (k = k.match(d))) {
                        var p = parseFloat(k[1]), q = parseFloat(k[2]), r = 1, s = 1;
                        n = parseFloat(k[3]), o = parseFloat(k[4]), l && l !== n && (r = l / n), m && m !== o && (s = m / o), v(c, [r, 0, 0, s, r * -p, s * -q])
                    }
                    var t = b.util.toArray(c.getElementsByTagName("*"));
                    if (0 === t.length && b.isLikelyNode) {
                        t = c.selectNodes('//*[name(.)!="svg"]');
                        for (var w = [], x = 0, y = t.length; x < y; x++)w[x] = t[x];
                        t = w
                    }
                    var z = t.filter(function (b) {
                        return a.test(b.tagName) && !f(b, /^(?:pattern|defs)$/)
                    });
                    if (!z || z && !z.length)return void(h && h([], {}));
                    var A = {width: l ? l : n, height: m ? m : o, widthAttr: l, heightAttr: m};
                    b.gradientDefs = b.getGradientDefs(c), b.cssRules = b.getCSSRules(c), b.parseElements(z, function (a) {
                        b.documentParsingTime = new Date - j, h && h(a, A)
                    }, e(A), i)
                }
            }
        }();
        var w = {
            has: function (a, b) {
                b(!1)
            }, get: function () {
            }, set: function () {
            }
        };
        c(b, {
            getGradientDefs: function (a) {
                var d, e, g, h, b = a.getElementsByTagName("linearGradient"),
                    c = a.getElementsByTagName("radialGradient"), f = 0, i = [], j = {}, k = {};
                for (i.length = b.length + c.length, e = b.length; e--;)i[f++] = b[e];
                for (e = c.length; e--;)i[f++] = c[e];
                for (; f--;)d = i[f], h = d.getAttribute("xlink:href"), g = d.getAttribute("id"), h && (k[g] = h.substr(1)), j[g] = d;
                for (g in k) {
                    var l = j[k[g]].cloneNode(!0);
                    for (d = j[g]; l.firstChild;)d.appendChild(l.firstChild)
                }
                return j
            }, parseAttributes: function (a, d) {
                if (a) {
                    var e, f = {};
                    a.parentNode && /^symbol|[g|a]$/i.test(a.parentNode.nodeName) && (f = b.parseAttributes(a.parentNode, d));
                    var g = d.reduce(function (b, c) {
                        return e = a.getAttribute(c), e && (c = k(c), e = l(c, e, f), b[c] = e), b
                    }, {});
                    return g = c(g, c(q(a), b.parseStyleAttribute(a))), m(c(f, g))
                }
            }, parseElements: function (a, c, d, e) {
                new b.ElementsParser(a, c, d, e).parse()
            }, parseStyleAttribute: function (a) {
                var b = {}, c = a.getAttribute("style");
                return c ? ("string" == typeof c ? o(c, b) : p(c, b), b) : b
            }, parsePointsAttribute: function (a) {
                if (!a)return null;
                a = a.replace(/,/g, " ").trim(), a = a.split(/\s+/);
                var c, d, b = [];
                for (c = 0, d = a.length; c < d; c += 2)b.push({x: parseFloat(a[c]), y: parseFloat(a[c + 1])});
                return b
            }, getCSSRules: function (a) {
                for (var e, c = a.getElementsByTagName("style"), d = {}, f = 0, g = c.length; f < g; f++) {
                    var h = c[0].textContent;
                    h = h.replace(/\/\*[\s\S]*?\*\//g, ""), e = h.match(/[^{]*\{[\s\S]*?\}/g), e = e.map(function (a) {
                        return a.trim()
                    }), e.forEach(function (a) {
                        for (var c = a.match(/([\s\S]*?)\s*\{([^}]*)\}/), e = {}, f = c[2].trim(), g = f.replace(/;$/, "").split(/\s*;\s*/), h = 0, i = g.length; h < i; h++) {
                            var j = g[h].split(/\s*:\s*/), m = k(j[0]), n = l(m, j[1], j[0]);
                            e[m] = n
                        }
                        a = c[1], a.split(",").forEach(function (a) {
                            d[a.trim()] = b.util.object.clone(e)
                        })
                    })
                }
                return d
            }, loadSVGFromURL: function (a, c, d) {
                function e(e) {
                    var f = e.responseXML;
                    f && !f.documentElement && b.window.ActiveXObject && e.responseText && (f = new ActiveXObject("Microsoft.XMLDOM"), f.async = "false", f.loadXML(e.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, ""))), f && f.documentElement && b.parseSVGDocument(f.documentElement, function (d, e) {
                        w.set(a, {objects: b.util.array.invoke(d, "toObject"), options: e}), c(d, e)
                    }, d)
                }

                a = a.replace(/^\n\s*/, "").trim(), w.has(a, function (d) {
                    d ? w.get(a, function (a) {
                        var b = x(a);
                        c(b.objects, b.options)
                    }) : new b.util.request(a, {method: "get", onComplete: e})
                })
            }, loadSVGFromString: function (a, c, d) {
                a = a.trim();
                var e;
                if ("undefined" != typeof DOMParser) {
                    var f = new DOMParser;
                    f && f.parseFromString && (e = f.parseFromString(a, "text/xml"))
                } else b.window.ActiveXObject && (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = "false", e.loadXML(a.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
                b.parseSVGDocument(e.documentElement, function (a, b) {
                    c(a, b)
                }, d)
            }, createSVGFontFacesMarkup: function (a) {
                for (var b = "", c = 0, d = a.length; c < d; c++)"text" === a[c].type && a[c].path && (b += ["@font-face {", "font-family: ", a[c].fontFamily, "; ", "src: url('", a[c].path, "')", "}"].join(""));
                return b && (b = ['<style type="text/css">', "<![CDATA[", b, "]]>", "</style>"].join("")), b
            }, createSVGRefElementsMarkup: function (a) {
                var b = [];
                return y(b, a, "backgroundColor"), y(b, a, "overlayColor"), b.join("")
            }
        })
    }("undefined" != typeof exports ? exports : this), fabric.ElementsParser = function (a, b, c, d) {
        this.elements = a, this.callback = b, this.options = c, this.reviver = d
    }, fabric.ElementsParser.prototype.parse = function () {
        this.instances = new Array(this.elements.length), this.numElements = this.elements.length, this.createObjects()
    }, fabric.ElementsParser.prototype.createObjects = function () {
        for (var a = 0, b = this.elements.length; a < b; a++)!function (a, b) {
            setTimeout(function () {
                a.createObject(a.elements[b], b)
            }, 0)
        }(this, a)
    }, fabric.ElementsParser.prototype.createObject = function (a, b) {
        var c = fabric[fabric.util.string.capitalize(a.tagName)];
        if (c && c.fromElement)try {
            this._createObject(c, a, b)
        } catch (a) {
            fabric.log(a)
        } else this.checkIfDone()
    }, fabric.ElementsParser.prototype._createObject = function (a, b, c) {
        if (a.async) a.fromElement(b, this.createCallback(c, b), this.options); else {
            var d = a.fromElement(b, this.options);
            this.resolveGradient(d, "fill"), this.resolveGradient(d, "stroke"), this.reviver && this.reviver(b, d), this.instances[c] = d, this.checkIfDone()
        }
    }, fabric.ElementsParser.prototype.createCallback = function (a, b) {
        var c = this;
        return function (d) {
            c.resolveGradient(d, "fill"), c.resolveGradient(d, "stroke"), c.reviver && c.reviver(b, d), c.instances[a] = d, c.checkIfDone()
        }
    }, fabric.ElementsParser.prototype.resolveGradient = function (a, b) {
        var c = a.get(b);
        if (/^url\(/.test(c)) {
            var d = c.slice(5, c.length - 1);
            fabric.gradientDefs[d] && a.set(b, fabric.Gradient.fromElement(fabric.gradientDefs[d], a))
        }
    }, fabric.ElementsParser.prototype.checkIfDone = function () {
        0 === --this.numElements && (this.instances = this.instances.filter(function (a) {
            return null != a
        }), this.callback(this.instances))
    }, function (a) {
        "use strict";
        function c(a, b) {
            this.x = a, this.y = b
        }

        var b = a.fabric || (a.fabric = {});
        return b.Point ? void b.warn("fabric.Point is already defined") : (b.Point = c, void(c.prototype = {
            constructor: c,
            add: function (a) {
                return new c(this.x + a.x, this.y + a.y)
            },
            addEquals: function (a) {
                return this.x += a.x, this.y += a.y, this
            },
            scalarAdd: function (a) {
                return new c(this.x + a, this.y + a)
            },
            scalarAddEquals: function (a) {
                return this.x += a, this.y += a, this
            },
            subtract: function (a) {
                return new c(this.x - a.x, this.y - a.y)
            },
            subtractEquals: function (a) {
                return this.x -= a.x, this.y -= a.y, this
            },
            scalarSubtract: function (a) {
                return new c(this.x - a, this.y - a)
            },
            scalarSubtractEquals: function (a) {
                return this.x -= a, this.y -= a, this
            },
            multiply: function (a) {
                return new c(this.x * a, this.y * a)
            },
            multiplyEquals: function (a) {
                return this.x *= a, this.y *= a, this
            },
            divide: function (a) {
                return new c(this.x / a, this.y / a)
            },
            divideEquals: function (a) {
                return this.x /= a, this.y /= a, this
            },
            eq: function (a) {
                return this.x === a.x && this.y === a.y
            },
            lt: function (a) {
                return this.x < a.x && this.y < a.y
            },
            lte: function (a) {
                return this.x <= a.x && this.y <= a.y
            },
            gt: function (a) {
                return this.x > a.x && this.y > a.y
            },
            gte: function (a) {
                return this.x >= a.x && this.y >= a.y
            },
            lerp: function (a, b) {
                return new c(this.x + (a.x - this.x) * b, this.y + (a.y - this.y) * b)
            },
            distanceFrom: function (a) {
                var b = this.x - a.x, c = this.y - a.y;
                return Math.sqrt(b * b + c * c)
            },
            midPointFrom: function (a) {
                return new c(this.x + (a.x - this.x) / 2, this.y + (a.y - this.y) / 2)
            },
            min: function (a) {
                return new c(Math.min(this.x, a.x), Math.min(this.y, a.y))
            },
            max: function (a) {
                return new c(Math.max(this.x, a.x), Math.max(this.y, a.y))
            },
            toString: function () {
                return this.x + "," + this.y
            },
            setXY: function (a, b) {
                this.x = a, this.y = b
            },
            setFromPoint: function (a) {
                this.x = a.x, this.y = a.y
            },
            swap: function (a) {
                var b = this.x, c = this.y;
                this.x = a.x, this.y = a.y, a.x = b, a.y = c
            }
        }))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        function c(a) {
            this.status = a, this.points = []
        }

        var b = a.fabric || (a.fabric = {});
        return b.Intersection ? void b.warn("fabric.Intersection is already defined") : (b.Intersection = c, b.Intersection.prototype = {
            appendPoint: function (a) {
                this.points.push(a)
            }, appendPoints: function (a) {
                this.points = this.points.concat(a)
            }
        }, b.Intersection.intersectLineLine = function (a, d, e, f) {
            var g, h = (f.x - e.x) * (a.y - e.y) - (f.y - e.y) * (a.x - e.x),
                i = (d.x - a.x) * (a.y - e.y) - (d.y - a.y) * (a.x - e.x),
                j = (f.y - e.y) * (d.x - a.x) - (f.x - e.x) * (d.y - a.y);
            if (0 !== j) {
                var k = h / j, l = i / j;
                0 <= k && k <= 1 && 0 <= l && l <= 1 ? (g = new c("Intersection"), g.points.push(new b.Point(a.x + k * (d.x - a.x), a.y + k * (d.y - a.y)))) : g = new c
            } else g = new c(0 === h || 0 === i ? "Coincident" : "Parallel");
            return g
        }, b.Intersection.intersectLinePolygon = function (a, b, d) {
            for (var e = new c, f = d.length, g = 0; g < f; g++) {
                var h = d[g], i = d[(g + 1) % f], j = c.intersectLineLine(a, b, h, i);
                e.appendPoints(j.points)
            }
            return e.points.length > 0 && (e.status = "Intersection"), e
        }, b.Intersection.intersectPolygonPolygon = function (a, b) {
            for (var d = new c, e = a.length, f = 0; f < e; f++) {
                var g = a[f], h = a[(f + 1) % e], i = c.intersectLinePolygon(g, h, b);
                d.appendPoints(i.points)
            }
            return d.points.length > 0 && (d.status = "Intersection"), d
        }, void(b.Intersection.intersectPolygonRectangle = function (a, d, e) {
            var f = d.min(e), g = d.max(e), h = new b.Point(g.x, f.y), i = new b.Point(f.x, g.y),
                j = c.intersectLinePolygon(f, h, a), k = c.intersectLinePolygon(h, g, a),
                l = c.intersectLinePolygon(g, i, a), m = c.intersectLinePolygon(i, f, a), n = new c;
            return n.appendPoints(j.points), n.appendPoints(k.points), n.appendPoints(l.points), n.appendPoints(m.points), n.points.length > 0 && (n.status = "Intersection"), n
        }))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        function c(a) {
            a ? this._tryParsingColor(a) : this.setSource([0, 0, 0, 1])
        }

        function d(a, b, c) {
            return c < 0 && (c += 1), c > 1 && (c -= 1), c < 1 / 6 ? a + 6 * (b - a) * c : c < .5 ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
        }

        var b = a.fabric || (a.fabric = {});
        return b.Color ? void b.warn("fabric.Color is already defined.") : (b.Color = c, b.Color.prototype = {
            _tryParsingColor: function (a) {
                var b;
                return a in c.colorNameMap && (a = c.colorNameMap[a]), "transparent" === a ? void this.setSource([255, 255, 255, 0]) : (b = c.sourceFromHex(a), b || (b = c.sourceFromRgb(a)), b || (b = c.sourceFromHsl(a)), void(b && this.setSource(b)))
            }, _rgbToHsl: function (a, c, d) {
                a /= 255, c /= 255, d /= 255;
                var e, f, g, h = b.util.array.max([a, c, d]), i = b.util.array.min([a, c, d]);
                if (g = (h + i) / 2, h === i) e = f = 0; else {
                    var j = h - i;
                    switch (f = g > .5 ? j / (2 - h - i) : j / (h + i), h) {
                        case a:
                            e = (c - d) / j + (c < d ? 6 : 0);
                            break;
                        case c:
                            e = (d - a) / j + 2;
                            break;
                        case d:
                            e = (a - c) / j + 4
                    }
                    e /= 6
                }
                return [Math.round(360 * e), Math.round(100 * f), Math.round(100 * g)]
            }, getSource: function () {
                return this._source
            }, setSource: function (a) {
                this._source = a
            }, toRgb: function () {
                var a = this.getSource();
                return "rgb(" + a[0] + "," + a[1] + "," + a[2] + ")"
            }, toRgba: function () {
                var a = this.getSource();
                return "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + a[3] + ")"
            }, toHsl: function () {
                var a = this.getSource(), b = this._rgbToHsl(a[0], a[1], a[2]);
                return "hsl(" + b[0] + "," + b[1] + "%," + b[2] + "%)"
            }, toHsla: function () {
                var a = this.getSource(), b = this._rgbToHsl(a[0], a[1], a[2]);
                return "hsla(" + b[0] + "," + b[1] + "%," + b[2] + "%," + a[3] + ")"
            }, toHex: function () {
                var b, c, d, a = this.getSource();
                return b = a[0].toString(16), b = 1 === b.length ? "0" + b : b, c = a[1].toString(16), c = 1 === c.length ? "0" + c : c, d = a[2].toString(16), d = 1 === d.length ? "0" + d : d, b.toUpperCase() + c.toUpperCase() + d.toUpperCase()
            }, getAlpha: function () {
                return this.getSource()[3]
            }, setAlpha: function (a) {
                var b = this.getSource();
                return b[3] = a, this.setSource(b), this
            }, toGrayscale: function () {
                var a = this.getSource(), b = parseInt((.3 * a[0] + .59 * a[1] + .11 * a[2]).toFixed(0), 10), c = a[3];
                return this.setSource([b, b, b, c]), this
            }, toBlackWhite: function (a) {
                var b = this.getSource(), c = (.3 * b[0] + .59 * b[1] + .11 * b[2]).toFixed(0), d = b[3];
                return a = a || 127, c = Number(c) < Number(a) ? 0 : 255, this.setSource([c, c, c, d]), this
            }, overlayWith: function (a) {
                a instanceof c || (a = new c(a));
                for (var b = [], d = this.getAlpha(), e = .5, f = this.getSource(), g = a.getSource(), h = 0; h < 3; h++)b.push(Math.round(f[h] * (1 - e) + g[h] * e));
                return b[3] = d, this.setSource(b), this
            }
        }, b.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, b.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, b.Color.reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i, b.Color.colorNameMap = {
            aqua: "#00FFFF",
            black: "#000000",
            blue: "#0000FF",
            fuchsia: "#FF00FF",
            gray: "#808080",
            green: "#008000",
            lime: "#00FF00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            orange: "#FFA500",
            purple: "#800080",
            red: "#FF0000",
            silver: "#C0C0C0",
            teal: "#008080",
            white: "#FFFFFF",
            yellow: "#FFFF00"
        }, b.Color.fromRgb = function (a) {
            return c.fromSource(c.sourceFromRgb(a))
        }, b.Color.sourceFromRgb = function (a) {
            var b = a.match(c.reRGBa);
            if (b) {
                var d = parseInt(b[1], 10) / (/%$/.test(b[1]) ? 100 : 1) * (/%$/.test(b[1]) ? 255 : 1),
                    e = parseInt(b[2], 10) / (/%$/.test(b[2]) ? 100 : 1) * (/%$/.test(b[2]) ? 255 : 1),
                    f = parseInt(b[3], 10) / (/%$/.test(b[3]) ? 100 : 1) * (/%$/.test(b[3]) ? 255 : 1);
                return [parseInt(d, 10), parseInt(e, 10), parseInt(f, 10), b[4] ? parseFloat(b[4]) : 1]
            }
        }, b.Color.fromRgba = c.fromRgb, b.Color.fromHsl = function (a) {
            return c.fromSource(c.sourceFromHsl(a))
        }, b.Color.sourceFromHsl = function (a) {
            var b = a.match(c.reHSLa);
            if (b) {
                var h, i, j, e = (parseFloat(b[1]) % 360 + 360) % 360 / 360,
                    f = parseFloat(b[2]) / (/%$/.test(b[2]) ? 100 : 1),
                    g = parseFloat(b[3]) / (/%$/.test(b[3]) ? 100 : 1);
                if (0 === f) h = i = j = g; else {
                    var k = g <= .5 ? g * (f + 1) : g + f - g * f, l = 2 * g - k;
                    h = d(l, k, e + 1 / 3), i = d(l, k, e), j = d(l, k, e - 1 / 3)
                }
                return [Math.round(255 * h), Math.round(255 * i), Math.round(255 * j), b[4] ? parseFloat(b[4]) : 1]
            }
        }, b.Color.fromHsla = c.fromHsl, b.Color.fromHex = function (a) {
            return c.fromSource(c.sourceFromHex(a))
        }, b.Color.sourceFromHex = function (a) {
            if (a.match(c.reHex)) {
                var b = a.slice(a.indexOf("#") + 1), d = 3 === b.length,
                    e = d ? b.charAt(0) + b.charAt(0) : b.substring(0, 2),
                    f = d ? b.charAt(1) + b.charAt(1) : b.substring(2, 4),
                    g = d ? b.charAt(2) + b.charAt(2) : b.substring(4, 6);
                return [parseInt(e, 16), parseInt(f, 16), parseInt(g, 16), 1]
            }
        }, void(b.Color.fromSource = function (a) {
            var b = new c;
            return b.setSource(a), b
        }))
    }("undefined" != typeof exports ? exports : this), function () {
        function a(a) {
            var d, e, f, b = a.getAttribute("style"), c = a.getAttribute("offset");
            if (c = parseFloat(c) / (/%$/.test(c) ? 100 : 1), c = c < 0 ? 0 : c > 1 ? 1 : c, b) {
                var g = b.split(/\s*;\s*/);
                "" === g[g.length - 1] && g.pop();
                for (var h = g.length; h--;) {
                    var i = g[h].split(/\s*:\s*/), j = i[0].trim(), k = i[1].trim();
                    "stop-color" === j ? d = k : "stop-opacity" === j && (f = k)
                }
            }
            return d || (d = a.getAttribute("stop-color") || "rgb(0,0,0)"), f || (f = a.getAttribute("stop-opacity")), d = new fabric.Color(d), e = d.getAlpha(), f = isNaN(parseFloat(f)) ? 1 : parseFloat(f), f *= e, {
                offset: c,
                color: d.toRgb(),
                opacity: f
            }
        }

        function b(a) {
            return {
                x1: a.getAttribute("x1") || 0,
                y1: a.getAttribute("y1") || 0,
                x2: a.getAttribute("x2") || "100%",
                y2: a.getAttribute("y2") || 0
            }
        }

        function c(a) {
            return {
                x1: a.getAttribute("fx") || a.getAttribute("cx") || "50%",
                y1: a.getAttribute("fy") || a.getAttribute("cy") || "50%",
                r1: 0,
                x2: a.getAttribute("cx") || "50%",
                y2: a.getAttribute("cy") || "50%",
                r2: a.getAttribute("r") || "50%"
            }
        }

        function d(a, b, c) {
            var d, e = 0, f = 1, g = "";
            for (var h in b)d = parseFloat(b[h], 10), f = "string" == typeof b[h] && /^\d+%$/.test(b[h]) ? .01 : 1, "x1" === h || "x2" === h || "r2" === h ? (f *= "objectBoundingBox" === c ? a.width : 1, e = "objectBoundingBox" === c ? a.left || 0 : 0) : "y1" !== h && "y2" !== h || (f *= "objectBoundingBox" === c ? a.height : 1, e = "objectBoundingBox" === c ? a.top || 0 : 0), b[h] = d * f + e;
            if ("ellipse" === a.type && null !== b.r2 && "objectBoundingBox" === c && a.rx !== a.ry) {
                var i = a.ry / a.rx;
                g = " scale(1, " + i + ")", b.y1 && (b.y1 /= i), b.y2 && (b.y2 /= i)
            }
            return g
        }

        fabric.Gradient = fabric.util.createClass({
            offsetX: 0, offsetY: 0, initialize: function (a) {
                a || (a = {});
                var b = {};
                this.id = fabric.Object.__uid++, this.type = a.type || "linear", b = {
                    x1: a.coords.x1 || 0,
                    y1: a.coords.y1 || 0,
                    x2: a.coords.x2 || 0,
                    y2: a.coords.y2 || 0
                }, "radial" === this.type && (b.r1 = a.coords.r1 || 0, b.r2 = a.coords.r2 || 0), this.coords = b, this.colorStops = a.colorStops.slice(), a.gradientTransform && (this.gradientTransform = a.gradientTransform), this.offsetX = a.offsetX || this.offsetX, this.offsetY = a.offsetY || this.offsetY
            }, addColorStop: function (a) {
                for (var b in a) {
                    var c = new fabric.Color(a[b]);
                    this.colorStops.push({offset: b, color: c.toRgb(), opacity: c.getAlpha()})
                }
                return this
            }, toObject: function () {
                return {
                    type: this.type,
                    coords: this.coords,
                    colorStops: this.colorStops,
                    offsetX: this.offsetX,
                    offsetY: this.offsetY
                }
            }, toSVG: function (a) {
                var c, d, b = fabric.util.object.clone(this.coords);
                if (this.colorStops.sort(function (a, b) {
                        return a.offset - b.offset
                    }), !a.group || "path-group" !== a.group.type)for (var e in b)"x1" === e || "x2" === e || "r2" === e ? b[e] += this.offsetX - a.width / 2 : "y1" !== e && "y2" !== e || (b[e] += this.offsetY - a.height / 2);
                d = 'id="SVGID_' + this.id + '" gradientUnits="userSpaceOnUse"', this.gradientTransform && (d += ' gradientTransform="matrix(' + this.gradientTransform.join(" ") + ')" '), "linear" === this.type ? c = ["<linearGradient ", d, ' x1="', b.x1, '" y1="', b.y1, '" x2="', b.x2, '" y2="', b.y2, '">\n'] : "radial" === this.type && (c = ["<radialGradient ", d, ' cx="', b.x2, '" cy="', b.y2, '" r="', b.r2, '" fx="', b.x1, '" fy="', b.y1, '">\n']);
                for (var f = 0; f < this.colorStops.length; f++)c.push("<stop ", 'offset="', 100 * this.colorStops[f].offset + "%", '" style="stop-color:', this.colorStops[f].color, null != this.colorStops[f].opacity ? ";stop-opacity: " + this.colorStops[f].opacity : ";", '"/>\n');
                return c.push("linear" === this.type ? "</linearGradient>\n" : "</radialGradient>\n"), c.join("")
            }, toLive: function (a) {
                var b;
                if (this.type) {
                    "linear" === this.type ? b = a.createLinearGradient(this.coords.x1, this.coords.y1, this.coords.x2, this.coords.y2) : "radial" === this.type && (b = a.createRadialGradient(this.coords.x1, this.coords.y1, this.coords.r1, this.coords.x2, this.coords.y2, this.coords.r2));
                    for (var c = 0, d = this.colorStops.length; c < d; c++) {
                        var e = this.colorStops[c].color, f = this.colorStops[c].opacity, g = this.colorStops[c].offset;
                        "undefined" != typeof f && (e = new fabric.Color(e).setAlpha(f).toRgba()), b.addColorStop(parseFloat(g), e)
                    }
                    return b
                }
            }
        }), fabric.util.object.extend(fabric.Gradient, {
            fromElement: function (e, f) {
                var m, g = e.getElementsByTagName("stop"), h = "linearGradient" === e.nodeName ? "linear" : "radial",
                    i = e.getAttribute("gradientUnits") || "objectBoundingBox", j = e.getAttribute("gradientTransform"),
                    k = [], l = {};
                "linear" === h ? l = b(e) : "radial" === h && (l = c(e));
                for (var n = g.length; n--;)k.push(a(g[n]));
                m = d(f, l, i);
                var o = new fabric.Gradient({type: h, coords: l, colorStops: k, offsetX: -f.left, offsetY: -f.top});
                return (j || "" !== m) && (o.gradientTransform = fabric.parseTransformAttribute((j || "") + m)), o
            }, forObject: function (a, b) {
                return b || (b = {}), d(a, b.coords, "userSpaceOnUse"), new fabric.Gradient(b)
            }
        })
    }(), fabric.Pattern = fabric.util.createClass({
        repeat: "repeat", offsetX: 0, offsetY: 0, initialize: function (a) {
            if (a || (a = {}), this.id = fabric.Object.__uid++, a.source)if ("string" == typeof a.source)if ("undefined" != typeof fabric.util.getFunctionBody(a.source)) this.source = new Function(fabric.util.getFunctionBody(a.source)); else {
                var b = this;
                this.source = fabric.util.createImage(), fabric.util.loadImage(a.source, function (a) {
                    b.source = a
                })
            } else this.source = a.source;
            a.repeat && (this.repeat = a.repeat), a.offsetX && (this.offsetX = a.offsetX), a.offsetY && (this.offsetY = a.offsetY)
        }, toObject: function () {
            var a;
            return "function" == typeof this.source ? a = String(this.source) : "string" == typeof this.source.src && (a = this.source.src), {
                source: a,
                repeat: this.repeat,
                offsetX: this.offsetX,
                offsetY: this.offsetY
            }
        }, toSVG: function (a) {
            var b = "function" == typeof this.source ? this.source() : this.source, c = b.width / a.getWidth(),
                d = b.height / a.getHeight(), e = "";
            return b.src ? e = b.src : b.toDataURL && (e = b.toDataURL()), '<pattern id="SVGID_' + this.id + '" x="' + this.offsetX + '" y="' + this.offsetY + '" width="' + c + '" height="' + d + '"><image x="0" y="0" width="' + b.width + '" height="' + b.height + '" xlink:href="' + e + '"></image></pattern>'
        }, toLive: function (a) {
            var b = "function" == typeof this.source ? this.source() : this.source;
            if (!b)return "";
            if ("undefined" != typeof b.src) {
                if (!b.complete)return "";
                if (0 === b.naturalWidth || 0 === b.naturalHeight)return ""
            }
            return a.createPattern(b, this.repeat)
        }
    }), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {});
        return b.Shadow ? void b.warn("fabric.Shadow is already defined.") : (b.Shadow = b.util.createClass({
            color: "rgb(0,0,0)",
            blur: 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: !1,
            includeDefaultValues: !0,
            initialize: function (a) {
                "string" == typeof a && (a = this._parseShadow(a));
                for (var c in a)this[c] = a[c];
                this.id = b.Object.__uid++
            },
            _parseShadow: function (a) {
                var c = a.trim(), d = b.Shadow.reOffsetsAndBlur.exec(c) || [],
                    e = c.replace(b.Shadow.reOffsetsAndBlur, "") || "rgb(0,0,0)";
                return {
                    color: e.trim(),
                    offsetX: parseInt(d[1], 10) || 0,
                    offsetY: parseInt(d[2], 10) || 0,
                    blur: parseInt(d[3], 10) || 0
                }
            },
            toString: function () {
                return [this.offsetX, this.offsetY, this.blur, this.color].join("px ")
            },
            toSVG: function (a) {
                var b = "SourceAlpha";
                return !a || a.fill !== this.color && a.stroke !== this.color || (b = "SourceGraphic"), '<filter id="SVGID_' + this.id + '" y="-40%" height="180%"><feGaussianBlur in="' + b + '" stdDeviation="' + (this.blur ? this.blur / 3 : 0) + '"></feGaussianBlur><feOffset dx="' + this.offsetX + '" dy="' + this.offsetY + '"></feOffset><feMerge><feMergeNode></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>'
            },
            toObject: function () {
                if (this.includeDefaultValues)return {
                    color: this.color,
                    blur: this.blur,
                    offsetX: this.offsetX,
                    offsetY: this.offsetY
                };
                var a = {}, c = b.Shadow.prototype;
                return this.color !== c.color && (a.color = this.color), this.blur !== c.blur && (a.blur = this.blur), this.offsetX !== c.offsetX && (a.offsetX = this.offsetX), this.offsetY !== c.offsetY && (a.offsetY = this.offsetY), a
            }
        }), void(b.Shadow.reOffsetsAndBlur = /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/))
    }("undefined" != typeof exports ? exports : this), function () {
        "use strict";
        if (fabric.StaticCanvas)return void fabric.warn("fabric.StaticCanvas is already defined.");
        var a = fabric.util.object.extend, b = fabric.util.getElementOffset, c = fabric.util.removeFromArray,
            d = new Error("Could not initialize `canvas` element");
        fabric.StaticCanvas = fabric.util.createClass({
            initialize: function (a, b) {
                b || (b = {}), this._initStatic(a, b), fabric.StaticCanvas.activeInstance = this
            },
            backgroundColor: "",
            backgroundImage: null,
            overlayColor: "",
            overlayImage: null,
            includeDefaultValues: !0,
            stateful: !0,
            renderOnAddRemove: !0,
            clipTo: null,
            controlsAboveOverlay: !1,
            allowTouchScrolling: !1,
            imageSmoothingEnabled: !0,
            viewportTransform: [1, 0, 0, 1, 0, 0],
            onBeforeScaleRotate: function () {
            },
            _initStatic: function (a, b) {
                this._objects = [], this._createLowerCanvas(a), this._initOptions(b), this._setImageSmoothing(), b.overlayImage && this.setOverlayImage(b.overlayImage, this.renderAll.bind(this)), b.backgroundImage && this.setBackgroundImage(b.backgroundImage, this.renderAll.bind(this)), b.backgroundColor && this.setBackgroundColor(b.backgroundColor, this.renderAll.bind(this)), b.overlayColor && this.setOverlayColor(b.overlayColor, this.renderAll.bind(this)), this.calcOffset()
            },
            calcOffset: function () {
                return this._offset = b(this.lowerCanvasEl), this
            },
            setOverlayImage: function (a, b, c) {
                return this.__setBgOverlayImage("overlayImage", a, b, c)
            },
            setBackgroundImage: function (a, b, c) {
                return this.__setBgOverlayImage("backgroundImage", a, b, c)
            },
            setOverlayColor: function (a, b) {
                return this.__setBgOverlayColor("overlayColor", a, b)
            },
            setBackgroundColor: function (a, b) {
                return this.__setBgOverlayColor("backgroundColor", a, b)
            },
            _setImageSmoothing: function () {
                var a = this.getContext();
                a.imageSmoothingEnabled = this.imageSmoothingEnabled, a.webkitImageSmoothingEnabled = this.imageSmoothingEnabled, a.mozImageSmoothingEnabled = this.imageSmoothingEnabled, a.msImageSmoothingEnabled = this.imageSmoothingEnabled, a.oImageSmoothingEnabled = this.imageSmoothingEnabled
            },
            __setBgOverlayImage: function (a, b, c, d) {
                return "string" == typeof b ? fabric.util.loadImage(b, function (b) {
                    this[a] = new fabric.Image(b, d), c && c()
                }, this) : (this[a] = b, c && c()), this
            },
            __setBgOverlayColor: function (a, b, c) {
                if (b && b.source) {
                    var d = this;
                    fabric.util.loadImage(b.source, function (e) {
                        d[a] = new fabric.Pattern({
                            source: e,
                            repeat: b.repeat,
                            offsetX: b.offsetX,
                            offsetY: b.offsetY
                        }), c && c()
                    })
                } else this[a] = b, c && c();
                return this
            },
            _createCanvasElement: function () {
                var a = fabric.document.createElement("canvas");
                if (a.style || (a.style = {}), !a)throw d;
                return this._initCanvasElement(a), a
            },
            _initCanvasElement: function (a) {
                if (fabric.util.createCanvasElement(a), "undefined" == typeof a.getContext)throw d
            },
            _initOptions: function (a) {
                for (var b in a)this[b] = a[b];
                this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0, this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0, this.lowerCanvasEl.style && (this.lowerCanvasEl.width = this.width, this.lowerCanvasEl.height = this.height, this.lowerCanvasEl.style.width = this.width + "px", this.lowerCanvasEl.style.height = this.height + "px", this.viewportTransform = this.viewportTransform.slice())
            },
            _createLowerCanvas: function (a) {
                this.lowerCanvasEl = fabric.util.getById(a) || this._createCanvasElement(), this._initCanvasElement(this.lowerCanvasEl), fabric.util.addClass(this.lowerCanvasEl, "lower-canvas"), this.interactive && this._applyCanvasStyle(this.lowerCanvasEl), this.contextContainer = this.lowerCanvasEl.getContext("2d")
            },
            getWidth: function () {
                return this.width
            },
            getHeight: function () {
                return this.height
            },
            setWidth: function (a, b) {
                return this.setDimensions({width: a}, b)
            },
            setHeight: function (a, b) {
                return this.setDimensions({height: a}, b)
            },
            setDimensions: function (a, b) {
                var c;
                b = b || {};
                for (var d in a)c = a[d], b.cssOnly || (this._setBackstoreDimension(d, a[d]), c += "px"), b.backstoreOnly || this._setCssDimension(d, c);
                return b.cssOnly || this.renderAll(), this.calcOffset(), this
            },
            _setBackstoreDimension: function (a, b) {
                return this.lowerCanvasEl[a] = b, this.upperCanvasEl && (this.upperCanvasEl[a] = b), this.cacheCanvasEl && (this.cacheCanvasEl[a] = b), this[a] = b, this
            },
            _setCssDimension: function (a, b) {
                return this.lowerCanvasEl.style[a] = b, this.upperCanvasEl && (this.upperCanvasEl.style[a] = b), this.wrapperEl && (this.wrapperEl.style[a] = b), this
            },
            getZoom: function () {
                return Math.sqrt(this.viewportTransform[0] * this.viewportTransform[3])
            },
            setViewportTransform: function (a) {
                this.viewportTransform = a, this.renderAll();
                for (var b = 0, c = this._objects.length; b < c; b++)this._objects[b].setCoords();
                return this
            },
            zoomToPoint: function (a, b) {
                var c = a;
                a = fabric.util.transformPoint(a, fabric.util.invertTransform(this.viewportTransform)), this.viewportTransform[0] = b, this.viewportTransform[3] = b;
                var d = fabric.util.transformPoint(a, this.viewportTransform);
                this.viewportTransform[4] += c.x - d.x, this.viewportTransform[5] += c.y - d.y, this.renderAll();
                for (var e = 0, f = this._objects.length; e < f; e++)this._objects[e].setCoords();
                return this
            },
            setZoom: function (a) {
                return this.zoomToPoint(new fabric.Point(0, 0), a), this
            },
            absolutePan: function (a) {
                this.viewportTransform[4] = -a.x, this.viewportTransform[5] = -a.y, this.renderAll();
                for (var b = 0, c = this._objects.length; b < c; b++)this._objects[b].setCoords();
                return this
            },
            relativePan: function (a) {
                return this.absolutePan(new fabric.Point(-a.x - this.viewportTransform[4], -a.y - this.viewportTransform[5]))
            },
            getElement: function () {
                return this.lowerCanvasEl
            },
            getActiveObject: function () {
                return null
            },
            getActiveGroup: function () {
                return null
            },
            _draw: function (a, b) {
                if (b) {
                    a.save();
                    var c = this.viewportTransform;
                    a.transform(c[0], c[1], c[2], c[3], c[4], c[5]), b.render(a), a.restore(), this.controlsAboveOverlay || b._renderControls(a)
                }
            },
            _onObjectAdded: function (a) {
                this.stateful && a.setupState(), a.canvas = this, a.setCoords(), this.fire("object:added", {target: a}), a.fire("added")
            },
            _onObjectRemoved: function (a) {
                this.getActiveObject() === a && (this.fire("before:selection:cleared", {target: a}), this._discardActiveObject(), this.fire("selection:cleared")), this.fire("object:removed", {target: a}), a.fire("removed")
            },
            clearContext: function (a) {
                return a.clearRect(0, 0, this.width, this.height), this
            },
            getContext: function () {
                return this.contextContainer
            },
            clear: function () {
                return this._objects.length = 0, this.discardActiveGroup && this.discardActiveGroup(), this.discardActiveObject && this.discardActiveObject(), this.clearContext(this.contextContainer), this.contextTop && this.clearContext(this.contextTop), this.fire("canvas:cleared"), this.renderAll(), this
            },
            renderAll: function (a) {
                var b = this[a === !0 && this.interactive ? "contextTop" : "contextContainer"],
                    c = this.getActiveGroup();
                return this.contextTop && this.selection && !this._groupSelector && this.clearContext(this.contextTop), a || this.clearContext(b), this.fire("before:render"), this.clipTo && fabric.util.clipContext(this, b), this._renderBackground(b), this._renderObjects(b, c), this._renderActiveGroup(b, c), this.clipTo && b.restore(), this._renderOverlay(b), this.controlsAboveOverlay && this.interactive && this.drawControls(b), this.fire("after:render"), this
            },
            _renderObjects: function (a, b) {
                var c, d;
                if (b)for (c = 0, d = this._objects.length; c < d; ++c)this._objects[c] && !b.contains(this._objects[c]) && this._draw(a, this._objects[c]); else for (c = 0, d = this._objects.length; c < d; ++c)this._draw(a, this._objects[c])
            },
            _renderActiveGroup: function (a, b) {
                if (b) {
                    var c = [];
                    this.forEachObject(function (a) {
                        b.contains(a) && c.push(a)
                    }), b._set("objects", c), this._draw(a, b)
                }
            },
            _renderBackground: function (a) {
                this.backgroundColor && (a.fillStyle = this.backgroundColor.toLive ? this.backgroundColor.toLive(a) : this.backgroundColor, a.fillRect(this.backgroundColor.offsetX || 0, this.backgroundColor.offsetY || 0, this.width, this.height)), this.backgroundImage && this._draw(a, this.backgroundImage)
            },
            _renderOverlay: function (a) {
                this.overlayColor && (a.fillStyle = this.overlayColor.toLive ? this.overlayColor.toLive(a) : this.overlayColor, a.fillRect(this.overlayColor.offsetX || 0, this.overlayColor.offsetY || 0, this.width, this.height)), this.overlayImage && this._draw(a, this.overlayImage)
            },
            renderTop: function () {
                var a = this.contextTop || this.contextContainer;
                this.clearContext(a), this.selection && this._groupSelector && this._drawSelection();
                var b = this.getActiveGroup();
                return b && b.render(a), this._renderOverlay(a), this.fire("after:render"), this
            },
            getCenter: function () {
                return {top: this.getHeight() / 2, left: this.getWidth() / 2}
            },
            centerObjectH: function (a) {
                return this._centerObject(a, new fabric.Point(this.getCenter().left, a.getCenterPoint().y)), this.renderAll(), this
            },
            centerObjectV: function (a) {
                return this._centerObject(a, new fabric.Point(a.getCenterPoint().x, this.getCenter().top)), this.renderAll(), this
            },
            centerObject: function (a) {
                var b = this.getCenter();
                return this._centerObject(a, new fabric.Point(b.left, b.top)), this.renderAll(), this
            },
            _centerObject: function (a, b) {
                return a.setPositionByOrigin(b, "center", "center"), this
            },
            toDatalessJSON: function (a) {
                return this.toDatalessObject(a)
            },
            toObject: function (a) {
                return this._toObjectMethod("toObject", a)
            },
            toDatalessObject: function (a) {
                return this._toObjectMethod("toDatalessObject", a)
            },
            _toObjectMethod: function (b, c) {
                var d = this.getActiveGroup();
                d && this.discardActiveGroup();
                var e = {objects: this._toObjects(b, c)};
                return a(e, this.__serializeBgOverlay()), fabric.util.populateWithProperties(this, e, c), d && (this.setActiveGroup(new fabric.Group(d.getObjects(), {
                    originX: "center",
                    originY: "center"
                })), d.forEachObject(function (a) {
                    a.set("active", !0)
                }), this._currentTransform && (this._currentTransform.target = this.getActiveGroup())), e
            },
            _toObjects: function (a, b) {
                return this.getObjects().map(function (c) {
                    return this._toObject(c, a, b)
                }, this)
            },
            _toObject: function (a, b, c) {
                var d;
                this.includeDefaultValues || (d = a.includeDefaultValues, a.includeDefaultValues = !1);
                var e = a[b](c);
                return this.includeDefaultValues || (a.includeDefaultValues = d), e
            },
            __serializeBgOverlay: function () {
                var a = {background: this.backgroundColor && this.backgroundColor.toObject ? this.backgroundColor.toObject() : this.backgroundColor};
                return this.overlayColor && (a.overlay = this.overlayColor.toObject ? this.overlayColor.toObject() : this.overlayColor), this.backgroundImage && (a.backgroundImage = this.backgroundImage.toObject()), this.overlayImage && (a.overlayImage = this.overlayImage.toObject()), a
            },
            svgViewportTransformation: !0,
            toSVG: function (a, b) {
                a || (a = {});
                var c = [];
                return this._setSVGPreamble(c, a), this._setSVGHeader(c, a), this._setSVGBgOverlayColor(c, "backgroundColor"), this._setSVGBgOverlayImage(c, "backgroundImage"), this._setSVGObjects(c, b), this._setSVGBgOverlayColor(c, "overlayColor"), this._setSVGBgOverlayImage(c, "overlayImage"), c.push("</svg>"), c.join("")
            },
            _setSVGPreamble: function (a, b) {
                b.suppressPreamble || a.push('<?xml version="1.0" encoding="', b.encoding || "UTF-8", '" standalone="no" ?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')
            },
            _setSVGHeader: function (a, b) {
                var c, d, e;
                b.viewBox ? (c = b.viewBox.width, d = b.viewBox.height) : (c = this.width, d = this.height, this.svgViewportTransformation || (e = this.viewportTransform, c /= e[0], d /= e[3])), a.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', c, '" ', 'height="', d, '" ', this.backgroundColor && !this.backgroundColor.toLive ? 'style="background-color: ' + this.backgroundColor + '" ' : null, b.viewBox ? 'viewBox="' + b.viewBox.x + " " + b.viewBox.y + " " + b.viewBox.width + " " + b.viewBox.height + '" ' : null, 'xml:space="preserve">', "<desc>Created with Fabric.js ", fabric.version, "</desc>", "<defs>", fabric.createSVGFontFacesMarkup(this.getObjects()), fabric.createSVGRefElementsMarkup(this), "</defs>")
            },
            _setSVGObjects: function (a, b) {
                var c = this.getActiveGroup();
                c && this.discardActiveGroup();
                for (var d = 0, e = this.getObjects(), f = e.length; d < f; d++)a.push(e[d].toSVG(b));
                c && (this.setActiveGroup(new fabric.Group(c.getObjects())), c.forEachObject(function (a) {
                    a.set("active", !0)
                }))
            },
            _setSVGBgOverlayImage: function (a, b) {
                this[b] && this[b].toSVG && a.push(this[b].toSVG())
            },
            _setSVGBgOverlayColor: function (a, b) {
                this[b] && this[b].source ? a.push('<rect x="', this[b].offsetX, '" y="', this[b].offsetY, '" ', 'width="', "repeat-y" === this[b].repeat || "no-repeat" === this[b].repeat ? this[b].source.width : this.width, '" height="', "repeat-x" === this[b].repeat || "no-repeat" === this[b].repeat ? this[b].source.height : this.height, '" fill="url(#' + b + 'Pattern)"', "></rect>") : this[b] && "overlayColor" === b && a.push('<rect x="0" y="0" ', 'width="', this.width, '" height="', this.height, '" fill="', this[b], '"', "></rect>")
            },
            sendToBack: function (a) {
                return c(this._objects, a), this._objects.unshift(a), this.renderAll && this.renderAll()
            },
            bringToFront: function (a) {
                return c(this._objects, a), this._objects.push(a), this.renderAll && this.renderAll()
            },
            sendBackwards: function (a, b) {
                var d = this._objects.indexOf(a);
                if (0 !== d) {
                    var e = this._findNewLowerIndex(a, d, b);
                    c(this._objects, a), this._objects.splice(e, 0, a), this.renderAll && this.renderAll()
                }
                return this
            },
            _findNewLowerIndex: function (a, b, c) {
                var d;
                if (c) {
                    d = b;
                    for (var e = b - 1; e >= 0; --e) {
                        var f = a.intersectsWithObject(this._objects[e]) || a.isContainedWithinObject(this._objects[e]) || this._objects[e].isContainedWithinObject(a);
                        if (f) {
                            d = e;
                            break
                        }
                    }
                } else d = b - 1;
                return d
            },
            bringForward: function (a, b) {
                var d = this._objects.indexOf(a);
                if (d !== this._objects.length - 1) {
                    var e = this._findNewUpperIndex(a, d, b);
                    c(this._objects, a), this._objects.splice(e, 0, a), this.renderAll && this.renderAll()
                }
                return this
            },
            _findNewUpperIndex: function (a, b, c) {
                var d;
                if (c) {
                    d = b;
                    for (var e = b + 1; e < this._objects.length; ++e) {
                        var f = a.intersectsWithObject(this._objects[e]) || a.isContainedWithinObject(this._objects[e]) || this._objects[e].isContainedWithinObject(a);
                        if (f) {
                            d = e;
                            break
                        }
                    }
                } else d = b + 1;
                return d
            },
            moveTo: function (a, b) {
                return c(this._objects, a), this._objects.splice(b, 0, a), this.renderAll && this.renderAll()
            },
            dispose: function () {
                return this.clear(), this.interactive && this.removeListeners(), this
            },
            toString: function () {
                return "#<fabric.Canvas (" + this.complexity() + "): { objects: " + this.getObjects().length + " }>"
            }
        }), a(fabric.StaticCanvas.prototype, fabric.Observable), a(fabric.StaticCanvas.prototype, fabric.Collection), a(fabric.StaticCanvas.prototype, fabric.DataURLExporter), a(fabric.StaticCanvas, {
            EMPTY_JSON: '{"objects": [], "background": "white"}',
            supports: function (a) {
                var b = fabric.util.createCanvasElement();
                if (!b || !b.getContext)return null;
                var c = b.getContext("2d");
                if (!c)return null;
                switch (a) {
                    case"getImageData":
                        return "undefined" != typeof c.getImageData;
                    case"setLineDash":
                        return "undefined" != typeof c.setLineDash;
                    case"toDataURL":
                        return "undefined" != typeof b.toDataURL;
                    case"toDataURLWithQuality":
                        try {
                            return b.toDataURL("image/jpeg", 0), !0
                        } catch (a) {
                        }
                        return !1;
                    default:
                        return null
                }
            }
        }), fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject
    }(), fabric.BaseBrush = fabric.util.createClass({
        color: "rgb(0, 0, 0)",
        width: 1,
        shadow: null,
        strokeLineCap: "round",
        strokeLineJoin: "round",
        setShadow: function (a) {
            return this.shadow = new fabric.Shadow(a), this
        },
        _setBrushStyles: function () {
            var a = this.canvas.contextTop;
            a.strokeStyle = this.color, a.lineWidth = this.width, a.lineCap = this.strokeLineCap, a.lineJoin = this.strokeLineJoin
        },
        _setShadow: function () {
            if (this.shadow) {
                var a = this.canvas.contextTop;
                a.shadowColor = this.shadow.color, a.shadowBlur = this.shadow.blur, a.shadowOffsetX = this.shadow.offsetX, a.shadowOffsetY = this.shadow.offsetY
            }
        },
        _resetShadow: function () {
            var a = this.canvas.contextTop;
            a.shadowColor = "", a.shadowBlur = a.shadowOffsetX = a.shadowOffsetY = 0
        }
    }), function () {
        var a = fabric.util.array.min, b = fabric.util.array.max;
        fabric.PencilBrush = fabric.util.createClass(fabric.BaseBrush, {
            initialize: function (a) {
                this.canvas = a, this._points = []
            }, onMouseDown: function (a) {
                this._prepareForDrawing(a), this._captureDrawingPath(a), this._render()
            }, onMouseMove: function (a) {
                this._captureDrawingPath(a), this.canvas.clearContext(this.canvas.contextTop), this._render()
            }, onMouseUp: function () {
                this._finalizeAndAddPath()
            }, _prepareForDrawing: function (a) {
                var b = new fabric.Point(a.x, a.y);
                this._reset(), this._addPoint(b), this.canvas.contextTop.moveTo(b.x, b.y)
            }, _addPoint: function (a) {
                this._points.push(a)
            }, _reset: function () {
                this._points.length = 0, this._setBrushStyles(), this._setShadow()
            }, _captureDrawingPath: function (a) {
                var b = new fabric.Point(a.x, a.y);
                this._addPoint(b)
            }, _render: function () {
                var a = this.canvas.contextTop, b = this.canvas.viewportTransform, c = this._points[0],
                    d = this._points[1];
                a.save(), a.transform(b[0], b[1], b[2], b[3], b[4], b[5]), a.beginPath(), 2 === this._points.length && c.x === d.x && c.y === d.y && (c.x -= .5, d.x += .5), a.moveTo(c.x, c.y);
                for (var e = 1, f = this._points.length; e < f; e++) {
                    var g = c.midPointFrom(d);
                    a.quadraticCurveTo(c.x, c.y, g.x, g.y), c = this._points[e], d = this._points[e + 1]
                }
                a.lineTo(c.x, c.y), a.stroke(), a.restore()
            }, _getSVGPathData: function () {
                return this.box = this.getPathBoundingBox(this._points), this.convertPointsToSVGPath(this._points, this.box.minX, this.box.minY)
            }, getPathBoundingBox: function (c) {
                for (var d = [], e = [], f = c[0], g = c[1], h = f, i = 1, j = c.length; i < j; i++) {
                    var k = f.midPointFrom(g);
                    d.push(h.x), d.push(k.x), e.push(h.y), e.push(k.y), f = c[i], g = c[i + 1], h = k
                }
                return d.push(f.x), e.push(f.y), {minX: a(d), minY: a(e), maxX: b(d), maxY: b(e)}
            }, convertPointsToSVGPath: function (a, b, c) {
                var d = [], e = new fabric.Point(a[0].x - b, a[0].y - c), f = new fabric.Point(a[1].x - b, a[1].y - c);
                d.push("M ", a[0].x - b, " ", a[0].y - c, " ");
                for (var g = 1, h = a.length; g < h; g++) {
                    var i = e.midPointFrom(f);
                    d.push("Q ", e.x, " ", e.y, " ", i.x, " ", i.y, " "), e = new fabric.Point(a[g].x - b, a[g].y - c), g + 1 < a.length && (f = new fabric.Point(a[g + 1].x - b, a[g + 1].y - c))
                }
                return d.push("L ", e.x, " ", e.y, " "), d
            }, createPath: function (a) {
                var b = new fabric.Path(a);
                return b.fill = null, b.stroke = this.color, b.strokeWidth = this.width, b.strokeLineCap = this.strokeLineCap, b.strokeLineJoin = this.strokeLineJoin, this.shadow && (this.shadow.affectStroke = !0, b.setShadow(this.shadow)), b
            }, _finalizeAndAddPath: function () {
                var a = this.canvas.contextTop;
                a.closePath();
                var b = this._getSVGPathData().join("");
                if ("M 0 0 Q 0 0 0 0 L 0 0" === b)return void this.canvas.renderAll();
                var c = this.box.minX + (this.box.maxX - this.box.minX) / 2,
                    d = this.box.minY + (this.box.maxY - this.box.minY) / 2;
                this.canvas.contextTop.arc(c, d, 3, 0, 2 * Math.PI, !1);
                var e = this.createPath(b);
                e.set({
                    left: c,
                    top: d,
                    originX: "center",
                    originY: "center"
                }), this.canvas.add(e), e.setCoords(), this.canvas.clearContext(this.canvas.contextTop), this._resetShadow(), this.canvas.renderAll(), this.canvas.fire("path:created", {path: e})
            }
        })
    }(), fabric.CircleBrush = fabric.util.createClass(fabric.BaseBrush, {
        width: 10, initialize: function (a) {
            this.canvas = a, this.points = []
        }, drawDot: function (a) {
            var b = this.addPoint(a), c = this.canvas.contextTop, d = this.canvas.viewportTransform;
            c.save(), c.transform(d[0], d[1], d[2], d[3], d[4], d[5]), c.fillStyle = b.fill, c.beginPath(), c.arc(b.x, b.y, b.radius, 0, 2 * Math.PI, !1), c.closePath(), c.fill(), c.restore()
        }, onMouseDown: function (a) {
            this.points.length = 0, this.canvas.clearContext(this.canvas.contextTop), this._setShadow(), this.drawDot(a)
        }, onMouseMove: function (a) {
            this.drawDot(a)
        }, onMouseUp: function () {
            var a = this.canvas.renderOnAddRemove;
            this.canvas.renderOnAddRemove = !1;
            for (var b = [], c = 0, d = this.points.length; c < d; c++) {
                var e = this.points[c], f = new fabric.Circle({
                    radius: e.radius,
                    left: e.x,
                    top: e.y,
                    originX: "center",
                    originY: "center",
                    fill: e.fill
                });
                this.shadow && f.setShadow(this.shadow), b.push(f)
            }
            var g = new fabric.Group(b, {originX: "center", originY: "center"});
            g.canvas = this.canvas, this.canvas.add(g), this.canvas.fire("path:created", {path: g}), this.canvas.clearContext(this.canvas.contextTop), this._resetShadow(), this.canvas.renderOnAddRemove = a, this.canvas.renderAll()
        }, addPoint: function (a) {
            var b = new fabric.Point(a.x, a.y),
                c = fabric.util.getRandomInt(Math.max(0, this.width - 20), this.width + 20) / 2,
                d = new fabric.Color(this.color).setAlpha(fabric.util.getRandomInt(0, 100) / 100).toRgba();
            return b.radius = c, b.fill = d, this.points.push(b), b
        }
    }), fabric.SprayBrush = fabric.util.createClass(fabric.BaseBrush, {
        width: 10,
        density: 20,
        dotWidth: 1,
        dotWidthVariance: 1,
        randomOpacity: !1,
        optimizeOverlapping: !0,
        initialize: function (a) {
            this.canvas = a, this.sprayChunks = []
        },
        onMouseDown: function (a) {
            this.sprayChunks.length = 0, this.canvas.clearContext(this.canvas.contextTop), this._setShadow(), this.addSprayChunk(a), this.render()
        },
        onMouseMove: function (a) {
            this.addSprayChunk(a), this.render()
        },
        onMouseUp: function () {
            var a = this.canvas.renderOnAddRemove;
            this.canvas.renderOnAddRemove = !1;
            for (var b = [], c = 0, d = this.sprayChunks.length; c < d; c++)for (var e = this.sprayChunks[c], f = 0, g = e.length; f < g; f++) {
                var h = new fabric.Rect({
                    width: e[f].width,
                    height: e[f].width,
                    left: e[f].x + 1,
                    top: e[f].y + 1,
                    originX: "center",
                    originY: "center",
                    fill: this.color
                });
                this.shadow && h.setShadow(this.shadow), b.push(h)
            }
            this.optimizeOverlapping && (b = this._getOptimizedRects(b));
            var i = new fabric.Group(b, {originX: "center", originY: "center"});
            i.canvas = this.canvas, this.canvas.add(i), this.canvas.fire("path:created", {path: i}), this.canvas.clearContext(this.canvas.contextTop), this._resetShadow(), this.canvas.renderOnAddRemove = a, this.canvas.renderAll()
        },
        _getOptimizedRects: function (a) {
            for (var c, b = {}, d = 0, e = a.length; d < e; d++)c = a[d].left + "" + a[d].top, b[c] || (b[c] = a[d]);
            var f = [];
            for (c in b)f.push(b[c]);
            return f
        },
        render: function () {
            var a = this.canvas.contextTop;
            a.fillStyle = this.color;
            var b = this.canvas.viewportTransform;
            a.save(), a.transform(b[0], b[1], b[2], b[3], b[4], b[5]);
            for (var c = 0, d = this.sprayChunkPoints.length; c < d; c++) {
                var e = this.sprayChunkPoints[c];
                "undefined" != typeof e.opacity && (a.globalAlpha = e.opacity), a.fillRect(e.x, e.y, e.width, e.width)
            }
            a.restore()
        },
        addSprayChunk: function (a) {
            this.sprayChunkPoints = [];
            for (var b, c, d, e = this.width / 2, f = 0; f < this.density; f++) {
                b = fabric.util.getRandomInt(a.x - e, a.x + e), c = fabric.util.getRandomInt(a.y - e, a.y + e), d = this.dotWidthVariance ? fabric.util.getRandomInt(Math.max(1, this.dotWidth - this.dotWidthVariance), this.dotWidth + this.dotWidthVariance) : this.dotWidth;
                var g = new fabric.Point(b, c);
                g.width = d, this.randomOpacity && (g.opacity = fabric.util.getRandomInt(0, 100) / 100), this.sprayChunkPoints.push(g)
            }
            this.sprayChunks.push(this.sprayChunkPoints)
        }
    }), fabric.PatternBrush = fabric.util.createClass(fabric.PencilBrush, {
        getPatternSrc: function () {
            var a = 20, b = 5, c = fabric.document.createElement("canvas"), d = c.getContext("2d");
            return c.width = c.height = a + b, d.fillStyle = this.color, d.beginPath(), d.arc(a / 2, a / 2, a / 2, 0, 2 * Math.PI, !1), d.closePath(), d.fill(), c
        }, getPatternSrcFunction: function () {
            return String(this.getPatternSrc).replace("this.color", '"' + this.color + '"')
        }, getPattern: function () {
            return this.canvas.contextTop.createPattern(this.source || this.getPatternSrc(), "repeat")
        }, _setBrushStyles: function () {
            this.callSuper("_setBrushStyles"), this.canvas.contextTop.strokeStyle = this.getPattern()
        }, createPath: function (a) {
            var b = this.callSuper("createPath", a);
            return b.stroke = new fabric.Pattern({source: this.source || this.getPatternSrcFunction()}), b
        }
    }), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        toDataURL: function (a) {
            a || (a = {});
            var b = a.format || "png", c = a.quality || 1, d = a.multiplier || 1,
                e = {left: a.left, top: a.top, width: a.width, height: a.height};
            return 1 !== d ? this.__toDataURLWithMultiplier(b, c, e, d) : this.__toDataURL(b, c, e)
        }, __toDataURL: function (a, b, c) {
            this.renderAll(!0);
            var d = this.upperCanvasEl || this.lowerCanvasEl, e = this.__getCroppedCanvas(d, c);
            "jpg" === a && (a = "jpeg");
            var f = fabric.StaticCanvas.supports("toDataURLWithQuality") ? (e || d).toDataURL("image/" + a, b) : (e || d).toDataURL("image/" + a);
            return this.contextTop && this.clearContext(this.contextTop), this.renderAll(), e && (e = null), f
        }, __getCroppedCanvas: function (a, b) {
            var c, d, e = "left" in b || "top" in b || "width" in b || "height" in b;
            return e && (c = fabric.util.createCanvasElement(), d = c.getContext("2d"), c.width = b.width || this.width, c.height = b.height || this.height, d.drawImage(a, -b.left || 0, -b.top || 0)), c
        }, __toDataURLWithMultiplier: function (a, b, c, d) {
            var e = this.getWidth(), f = this.getHeight(), g = e * d, h = f * d, i = this.getActiveObject(),
                j = this.getActiveGroup(), k = this.contextTop || this.contextContainer;
            d > 1 && this.setWidth(g).setHeight(h), k.scale(d, d), c.left && (c.left *= d), c.top && (c.top *= d), c.width ? c.width *= d : d < 1 && (c.width = g), c.height ? c.height *= d : d < 1 && (c.height = h), j ? this._tempRemoveBordersControlsFromGroup(j) : i && this.deactivateAll && this.deactivateAll(), this.renderAll(!0);
            var l = this.__toDataURL(a, b, c);
            return this.width = e, this.height = f, k.scale(1 / d, 1 / d), this.setWidth(e).setHeight(f), j ? this._restoreBordersControlsOnGroup(j) : i && this.setActiveObject && this.setActiveObject(i), this.contextTop && this.clearContext(this.contextTop), this.renderAll(), l
        }, toDataURLWithMultiplier: function (a, b, c) {
            return this.toDataURL({format: a, multiplier: b, quality: c})
        }, _tempRemoveBordersControlsFromGroup: function (a) {
            a.origHasControls = a.hasControls, a.origBorderColor = a.borderColor, a.hasControls = !0, a.borderColor = "rgba(0,0,0,0)", a.forEachObject(function (a) {
                a.origBorderColor = a.borderColor, a.borderColor = "rgba(0,0,0,0)"
            })
        }, _restoreBordersControlsOnGroup: function (a) {
            a.hideControls = a.origHideControls, a.borderColor = a.origBorderColor, a.forEachObject(function (a) {
                a.borderColor = a.origBorderColor, delete a.origBorderColor
            })
        }
    }), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        loadFromDatalessJSON: function (a, b, c) {
            return this.loadFromJSON(a, b, c)
        }, loadFromJSON: function (a, b, c) {
            if (a) {
                var d = "string" == typeof a ? JSON.parse(a) : a;
                this.clear();
                var e = this;
                return this._enlivenObjects(d.objects, function () {
                    e._setBgOverlay(d, b)
                }, c), this
            }
        }, _setBgOverlay: function (a, b) {
            var c = this, d = {backgroundColor: !1, overlayColor: !1, backgroundImage: !1, overlayImage: !1};
            if (!(a.backgroundImage || a.overlayImage || a.background || a.overlay))return void(b && b());
            var e = function () {
                d.backgroundImage && d.overlayImage && d.backgroundColor && d.overlayColor && (c.renderAll(), b && b())
            };
            this.__setBgOverlay("backgroundImage", a.backgroundImage, d, e), this.__setBgOverlay("overlayImage", a.overlayImage, d, e), this.__setBgOverlay("backgroundColor", a.background, d, e), this.__setBgOverlay("overlayColor", a.overlay, d, e), e()
        }, __setBgOverlay: function (a, b, c, d) {
            var e = this;
            return b ? void("backgroundImage" === a || "overlayImage" === a ? fabric.Image.fromObject(b, function (b) {
                e[a] = b, c[a] = !0, d && d()
            }) : this["set" + fabric.util.string.capitalize(a, !0)](b, function () {
                c[a] = !0, d && d()
            })) : void(c[a] = !0)
        }, _enlivenObjects: function (a, b, c) {
            var d = this;
            if (!a || 0 === a.length)return void(b && b());
            var e = this.renderOnAddRemove;
            this.renderOnAddRemove = !1, fabric.util.enlivenObjects(a, function (a) {
                a.forEach(function (a, b) {
                    d.insertAt(a, b, !0)
                }), d.renderOnAddRemove = e, b && b()
            }, null, c)
        }, _toDataURL: function (a, b) {
            this.clone(function (c) {
                b(c.toDataURL(a))
            })
        }, _toDataURLWithMultiplier: function (a, b, c) {
            this.clone(function (d) {
                c(d.toDataURLWithMultiplier(a, b))
            })
        }, clone: function (a, b) {
            var c = JSON.stringify(this.toJSON(b));
            this.cloneWithoutData(function (b) {
                b.loadFromJSON(c, function () {
                    a && a(b)
                })
            })
        }, cloneWithoutData: function (a) {
            var b = fabric.document.createElement("canvas");
            b.width = this.getWidth(), b.height = this.getHeight();
            var c = new fabric.Canvas(b);
            c.clipTo = this.clipTo, this.backgroundImage ? (c.setBackgroundImage(this.backgroundImage.src, function () {
                c.renderAll(), a && a(c)
            }), c.backgroundImageOpacity = this.backgroundImageOpacity, c.backgroundImageStretch = this.backgroundImageStretch) : a && a(c)
        }
    }), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend, d = b.util.toFixed, e = b.util.string.capitalize,
            f = b.util.degreesToRadians, g = b.StaticCanvas.supports("setLineDash");
        b.Object || (b.Object = b.util.createClass({
            type: "object",
            originX: "left",
            originY: "top",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            scaleX: 1,
            scaleY: 1,
            flipX: !1,
            flipY: !1,
            opacity: 1,
            angle: 0,
            cornerSize: 12,
            transparentCorners: !0,
            hoverCursor: null,
            padding: 0,
            borderColor: "rgba(102,153,255,0.75)",
            cornerColor: "rgba(102,153,255,0.5)",
            centeredScaling: !1,
            centeredRotation: !0,
            fill: "rgb(0,0,0)",
            fillRule: "source-over",
            backgroundColor: "",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeLineJoin: "miter",
            strokeMiterLimit: 10,
            shadow: null,
            borderOpacityWhenMoving: .4,
            borderScaleFactor: 1,
            transformMatrix: null,
            minScaleLimit: .01,
            selectable: !0,
            evented: !0,
            visible: !0,
            hasControls: !0,
            hasBorders: !0,
            hasRotatingPoint: !0,
            rotatingPointOffset: 40,
            perPixelTargetFind: !1,
            includeDefaultValues: !0,
            clipTo: null,
            lockMovementX: !1,
            lockMovementY: !1,
            lockRotation: !1,
            lockScalingX: !1,
            lockScalingY: !1,
            lockUniScaling: !1,
            lockScalingFlip: !1,
            stateProperties: "top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill fillRule shadow clipTo visible backgroundColor".split(" "),
            initialize: function (a) {
                a && this.setOptions(a)
            },
            _initGradient: function (a) {
                !a.fill || !a.fill.colorStops || a.fill instanceof b.Gradient || this.set("fill", new b.Gradient(a.fill))
            },
            _initPattern: function (a) {
                !a.fill || !a.fill.source || a.fill instanceof b.Pattern || this.set("fill", new b.Pattern(a.fill)), !a.stroke || !a.stroke.source || a.stroke instanceof b.Pattern || this.set("stroke", new b.Pattern(a.stroke))
            },
            _initClipping: function (a) {
                if (a.clipTo && "string" == typeof a.clipTo) {
                    var c = b.util.getFunctionBody(a.clipTo);
                    "undefined" != typeof c && (this.clipTo = new Function("ctx", c))
                }
            },
            setOptions: function (a) {
                for (var b in a)this.set(b, a[b]);
                this._initGradient(a), this._initPattern(a), this._initClipping(a)
            },
            transform: function (a, b) {
                this.group && this.group.transform(a, b), a.globalAlpha = this.opacity;
                var c = b ? this._getLeftTopCoords() : this.getCenterPoint();
                a.translate(c.x, c.y), a.rotate(f(this.angle)), a.scale(this.scaleX * (this.flipX ? -1 : 1), this.scaleY * (this.flipY ? -1 : 1))
            },
            toObject: function (a) {
                var c = b.Object.NUM_FRACTION_DIGITS, e = {
                    type: this.type,
                    originX: this.originX,
                    originY: this.originY,
                    left: d(this.left, c),
                    top: d(this.top, c),
                    width: d(this.width, c),
                    height: d(this.height, c),
                    fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
                    stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke,
                    strokeWidth: d(this.strokeWidth, c),
                    strokeDashArray: this.strokeDashArray,
                    strokeLineCap: this.strokeLineCap,
                    strokeLineJoin: this.strokeLineJoin,
                    strokeMiterLimit: d(this.strokeMiterLimit, c),
                    scaleX: d(this.scaleX, c),
                    scaleY: d(this.scaleY, c),
                    angle: d(this.getAngle(), c),
                    flipX: this.flipX,
                    flipY: this.flipY,
                    opacity: d(this.opacity, c),
                    shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
                    visible: this.visible,
                    clipTo: this.clipTo && String(this.clipTo),
                    backgroundColor: this.backgroundColor
                };
                return this.includeDefaultValues || (e = this._removeDefaultValues(e)), b.util.populateWithProperties(this, e, a), e
            },
            toDatalessObject: function (a) {
                return this.toObject(a)
            },
            _removeDefaultValues: function (a) {
                var c = b.util.getKlass(a.type).prototype, d = c.stateProperties;
                return d.forEach(function (b) {
                    a[b] === c[b] && delete a[b]
                }), a
            },
            toString: function () {
                return "#<fabric." + e(this.type) + ">"
            },
            get: function (a) {
                return this[a]
            },
            _setObject: function (a) {
                for (var b in a)this._set(b, a[b])
            },
            set: function (a, b) {
                return "object" == typeof a ? this._setObject(a) : "function" == typeof b && "clipTo" !== a ? this._set(a, b(this.get(a))) : this._set(a, b), this
            },
            _set: function (a, c) {
                var e = "scaleX" === a || "scaleY" === a;
                return e && (c = this._constrainScale(c)), "scaleX" === a && c < 0 ? (this.flipX = !this.flipX, c *= -1) : "scaleY" === a && c < 0 ? (this.flipY = !this.flipY, c *= -1) : "width" === a || "height" === a ? this.minScaleLimit = d(Math.min(.1, 1 / Math.max(this.width, this.height)), 2) : "shadow" !== a || !c || c instanceof b.Shadow || (c = new b.Shadow(c)), this[a] = c, this
            },
            toggle: function (a) {
                var b = this.get(a);
                return "boolean" == typeof b && this.set(a, !b), this
            },
            setSourcePath: function (a) {
                return this.sourcePath = a, this
            },
            getViewportTransform: function () {
                return this.canvas && this.canvas.viewportTransform ? this.canvas.viewportTransform : [1, 0, 0, 1, 0, 0]
            },
            render: function (a, c) {
                if (0 !== this.width && 0 !== this.height && this.visible) {
                    if (a.save(), this._setupFillRule(a), this._transform(a, c), this._setStrokeStyles(a), this._setFillStyles(a), this.group && "path-group" === this.group.type) {
                        a.translate(-this.group.width / 2, -this.group.height / 2);
                        var d = this.transformMatrix;
                        d && a.transform.apply(a, d)
                    }
                    a.globalAlpha = this.group ? a.globalAlpha * this.opacity : this.opacity, this._setShadow(a), this.clipTo && b.util.clipContext(this, a), this._render(a, c), this.clipTo && a.restore(), this._removeShadow(a), this._restoreFillRule(a), a.restore()
                }
            },
            _transform: function (a, b) {
                var c = this.transformMatrix;
                c && !this.group && a.setTransform.apply(a, c), b || this.transform(a)
            },
            _setStrokeStyles: function (a) {
                this.stroke && (a.lineWidth = this.strokeWidth, a.lineCap = this.strokeLineCap, a.lineJoin = this.strokeLineJoin, a.miterLimit = this.strokeMiterLimit, a.strokeStyle = this.stroke.toLive ? this.stroke.toLive(a) : this.stroke)
            },
            _setFillStyles: function (a) {
                this.fill && (a.fillStyle = this.fill.toLive ? this.fill.toLive(a) : this.fill)
            },
            _renderControls: function (a, c) {
                var d = this.getViewportTransform();
                if (a.save(), this.active && !c) {
                    var e;
                    this.group && (e = b.util.transformPoint(this.group.getCenterPoint(), d), a.translate(e.x, e.y), a.rotate(f(this.group.angle))), e = b.util.transformPoint(this.getCenterPoint(), d, null != this.group), this.group && (e.x *= this.group.scaleX, e.y *= this.group.scaleY), a.translate(e.x, e.y), a.rotate(f(this.angle)), this.drawBorders(a), this.drawControls(a)
                }
                a.restore()
            },
            _setShadow: function (a) {
                this.shadow && (a.shadowColor = this.shadow.color, a.shadowBlur = this.shadow.blur, a.shadowOffsetX = this.shadow.offsetX, a.shadowOffsetY = this.shadow.offsetY)
            },
            _removeShadow: function (a) {
                this.shadow && (a.shadowColor = "", a.shadowBlur = a.shadowOffsetX = a.shadowOffsetY = 0)
            },
            _renderFill: function (a) {
                if (this.fill) {
                    if (a.save(), this.fill.toLive && a.translate(-this.width / 2 + this.fill.offsetX || 0, -this.height / 2 + this.fill.offsetY || 0), this.fill.gradientTransform) {
                        var b = this.fill.gradientTransform;
                        a.transform.apply(a, b)
                    }
                    "destination-over" === this.fillRule ? a.fill("evenodd") : a.fill(), a.restore(), this.shadow && !this.shadow.affectStroke && this._removeShadow(a)
                }
            },
            _renderStroke: function (a) {
                if (this.stroke && 0 !== this.strokeWidth) {
                    if (a.save(), this.strokeDashArray) 1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), g ? (a.setLineDash(this.strokeDashArray), this._stroke && this._stroke(a)) : this._renderDashedStroke && this._renderDashedStroke(a), a.stroke(); else {
                        if (this.stroke.gradientTransform) {
                            var b = this.stroke.gradientTransform;
                            a.transform.apply(a, b)
                        }
                        this._stroke ? this._stroke(a) : a.stroke()
                    }
                    this._removeShadow(a), a.restore()
                }
            },
            clone: function (a, c) {
                return this.constructor.fromObject ? this.constructor.fromObject(this.toObject(c), a) : new b.Object(this.toObject(c));
            },
            cloneAsImage: function (a) {
                var c = this.toDataURL();
                return b.util.loadImage(c, function (c) {
                    a && a(new b.Image(c))
                }), this
            },
            toDataURL: function (a) {
                a || (a = {});
                var c = b.util.createCanvasElement(), d = this.getBoundingRect();
                c.width = d.width, c.height = d.height, b.util.wrapElement(c, "div");
                var e = new b.Canvas(c);
                "jpg" === a.format && (a.format = "jpeg"), "jpeg" === a.format && (e.backgroundColor = "#fff");
                var f = {active: this.get("active"), left: this.getLeft(), top: this.getTop()};
                this.set("active", !1), this.setPositionByOrigin(new b.Point(c.width / 2, c.height / 2), "center", "center");
                var g = this.canvas;
                e.add(this);
                var h = e.toDataURL(a);
                return this.set(f).setCoords(), this.canvas = g, e.dispose(), e = null, h
            },
            isType: function (a) {
                return this.type === a
            },
            complexity: function () {
                return 0
            },
            toJSON: function (a) {
                return this.toObject(a)
            },
            setGradient: function (a, c) {
                c || (c = {});
                var d = {colorStops: []};
                d.type = c.type || (c.r1 || c.r2 ? "radial" : "linear"), d.coords = {
                    x1: c.x1,
                    y1: c.y1,
                    x2: c.x2,
                    y2: c.y2
                }, (c.r1 || c.r2) && (d.coords.r1 = c.r1, d.coords.r2 = c.r2);
                for (var e in c.colorStops) {
                    var f = new b.Color(c.colorStops[e]);
                    d.colorStops.push({offset: e, color: f.toRgb(), opacity: f.getAlpha()})
                }
                return this.set(a, b.Gradient.forObject(this, d))
            },
            setPatternFill: function (a) {
                return this.set("fill", new b.Pattern(a))
            },
            setShadow: function (a) {
                return this.set("shadow", a ? new b.Shadow(a) : null)
            },
            setColor: function (a) {
                return this.set("fill", a), this
            },
            setAngle: function (a) {
                var b = ("center" !== this.originX || "center" !== this.originY) && this.centeredRotation;
                return b && this._setOriginToCenter(), this.set("angle", a), b && this._resetOrigin(), this
            },
            centerH: function () {
                return this.canvas.centerObjectH(this), this
            },
            centerV: function () {
                return this.canvas.centerObjectV(this), this
            },
            center: function () {
                return this.canvas.centerObject(this), this
            },
            remove: function () {
                return this.canvas.remove(this), this
            },
            getLocalPointer: function (a, b) {
                b = b || this.canvas.getPointer(a);
                var c = this.translateToOriginPoint(this.getCenterPoint(), "left", "top");
                return {x: b.x - c.x, y: b.y - c.y}
            },
            _setupFillRule: function (a) {
                this.fillRule && (this._prevFillRule = a.globalCompositeOperation, a.globalCompositeOperation = this.fillRule)
            },
            _restoreFillRule: function (a) {
                this.fillRule && this._prevFillRule && (a.globalCompositeOperation = this._prevFillRule)
            }
        }), b.util.createAccessors(b.Object), b.Object.prototype.rotate = b.Object.prototype.setAngle, c(b.Object.prototype, b.Observable), b.Object.NUM_FRACTION_DIGITS = 2, b.Object.__uid = 0)
    }("undefined" != typeof exports ? exports : this), function () {
        var a = fabric.util.degreesToRadians;
        fabric.util.object.extend(fabric.Object.prototype, {
            translateToCenterPoint: function (b, c, d) {
                var e = b.x, f = b.y, g = this.stroke ? this.strokeWidth : 0;
                return "left" === c ? e = b.x + (this.getWidth() + g * this.scaleX) / 2 : "right" === c && (e = b.x - (this.getWidth() + g * this.scaleX) / 2), "top" === d ? f = b.y + (this.getHeight() + g * this.scaleY) / 2 : "bottom" === d && (f = b.y - (this.getHeight() + g * this.scaleY) / 2), fabric.util.rotatePoint(new fabric.Point(e, f), b, a(this.angle))
            }, translateToOriginPoint: function (b, c, d) {
                var e = b.x, f = b.y, g = this.stroke ? this.strokeWidth : 0;
                return "left" === c ? e = b.x - (this.getWidth() + g * this.scaleX) / 2 : "right" === c && (e = b.x + (this.getWidth() + g * this.scaleX) / 2), "top" === d ? f = b.y - (this.getHeight() + g * this.scaleY) / 2 : "bottom" === d && (f = b.y + (this.getHeight() + g * this.scaleY) / 2), fabric.util.rotatePoint(new fabric.Point(e, f), b, a(this.angle))
            }, getCenterPoint: function () {
                var a = new fabric.Point(this.left, this.top);
                return this.translateToCenterPoint(a, this.originX, this.originY)
            }, getPointByOrigin: function (a, b) {
                var c = this.getCenterPoint();
                return this.translateToOriginPoint(c, a, b)
            }, toLocalPoint: function (b, c, d) {
                var g, h, e = this.getCenterPoint(), f = this.stroke ? this.strokeWidth : 0;
                return c && d ? (g = "left" === c ? e.x - (this.getWidth() + f * this.scaleX) / 2 : "right" === c ? e.x + (this.getWidth() + f * this.scaleX) / 2 : e.x, h = "top" === d ? e.y - (this.getHeight() + f * this.scaleY) / 2 : "bottom" === d ? e.y + (this.getHeight() + f * this.scaleY) / 2 : e.y) : (g = this.left, h = this.top), fabric.util.rotatePoint(new fabric.Point(b.x, b.y), e, -a(this.angle)).subtractEquals(new fabric.Point(g, h))
            }, setPositionByOrigin: function (a, b, c) {
                var d = this.translateToCenterPoint(a, b, c),
                    e = this.translateToOriginPoint(d, this.originX, this.originY);
                this.set("left", e.x), this.set("top", e.y)
            }, adjustPosition: function (b) {
                var c = a(this.angle), d = this.getWidth() / 2, e = Math.cos(c) * d, f = Math.sin(c) * d,
                    g = this.getWidth(), h = Math.cos(c) * g, i = Math.sin(c) * g;
                "center" === this.originX && "left" === b || "right" === this.originX && "center" === b ? (this.left -= e, this.top -= f) : "left" === this.originX && "center" === b || "center" === this.originX && "right" === b ? (this.left += e, this.top += f) : "left" === this.originX && "right" === b ? (this.left += h, this.top += i) : "right" === this.originX && "left" === b && (this.left -= h, this.top -= i), this.setCoords(), this.originX = b
            }, _setOriginToCenter: function () {
                this._originalOriginX = this.originX, this._originalOriginY = this.originY;
                var a = this.getCenterPoint();
                this.originX = "center", this.originY = "center", this.left = a.x, this.top = a.y
            }, _resetOrigin: function () {
                var a = this.translateToOriginPoint(this.getCenterPoint(), this._originalOriginX, this._originalOriginY);
                this.originX = this._originalOriginX, this.originY = this._originalOriginY, this.left = a.x, this.top = a.y, this._originalOriginX = null, this._originalOriginY = null
            }, _getLeftTopCoords: function () {
                return this.translateToOriginPoint(this.getCenterPoint(), "left", "center")
            }
        })
    }(), function () {
        var a = fabric.util.degreesToRadians;
        fabric.util.object.extend(fabric.Object.prototype, {
            oCoords: null, intersectsWithRect: function (a, b) {
                var c = this.oCoords, d = new fabric.Point(c.tl.x, c.tl.y), e = new fabric.Point(c.tr.x, c.tr.y),
                    f = new fabric.Point(c.bl.x, c.bl.y), g = new fabric.Point(c.br.x, c.br.y),
                    h = fabric.Intersection.intersectPolygonRectangle([d, e, g, f], a, b);
                return "Intersection" === h.status
            }, intersectsWithObject: function (a) {
                function b(a) {
                    return {
                        tl: new fabric.Point(a.tl.x, a.tl.y),
                        tr: new fabric.Point(a.tr.x, a.tr.y),
                        bl: new fabric.Point(a.bl.x, a.bl.y),
                        br: new fabric.Point(a.br.x, a.br.y)
                    }
                }

                var c = b(this.oCoords), d = b(a.oCoords),
                    e = fabric.Intersection.intersectPolygonPolygon([c.tl, c.tr, c.br, c.bl], [d.tl, d.tr, d.br, d.bl]);
                return "Intersection" === e.status
            }, isContainedWithinObject: function (a) {
                var b = a.getBoundingRect(), c = new fabric.Point(b.left, b.top),
                    d = new fabric.Point(b.left + b.width, b.top + b.height);
                return this.isContainedWithinRect(c, d)
            }, isContainedWithinRect: function (a, b) {
                var c = this.getBoundingRect();
                return c.left >= a.x && c.left + c.width <= b.x && c.top >= a.y && c.top + c.height <= b.y
            }, containsPoint: function (a) {
                var b = this._getImageLines(this.oCoords), c = this._findCrossPoints(a, b);
                return 0 !== c && c % 2 === 1
            }, _getImageLines: function (a) {
                return {
                    topline: {o: a.tl, d: a.tr},
                    rightline: {o: a.tr, d: a.br},
                    bottomline: {o: a.br, d: a.bl},
                    leftline: {o: a.bl, d: a.tl}
                }
            }, _findCrossPoints: function (a, b) {
                var c, d, e, f, g, h, j, i = 0;
                for (var k in b)if (j = b[k], !(j.o.y < a.y && j.d.y < a.y || j.o.y >= a.y && j.d.y >= a.y || (j.o.x === j.d.x && j.o.x >= a.x ? (g = j.o.x, h = a.y) : (c = 0, d = (j.d.y - j.o.y) / (j.d.x - j.o.x), e = a.y - c * a.x, f = j.o.y - d * j.o.x, g = -(e - f) / (c - d), h = e + c * g), g >= a.x && (i += 1), 2 !== i)))break;
                return i
            }, getBoundingRectWidth: function () {
                return this.getBoundingRect().width
            }, getBoundingRectHeight: function () {
                return this.getBoundingRect().height
            }, getBoundingRect: function () {
                this.oCoords || this.setCoords();
                var a = [this.oCoords.tl.x, this.oCoords.tr.x, this.oCoords.br.x, this.oCoords.bl.x],
                    b = fabric.util.array.min(a), c = fabric.util.array.max(a), d = Math.abs(b - c),
                    e = [this.oCoords.tl.y, this.oCoords.tr.y, this.oCoords.br.y, this.oCoords.bl.y],
                    f = fabric.util.array.min(e), g = fabric.util.array.max(e), h = Math.abs(f - g);
                return {left: b, top: f, width: d, height: h}
            }, getWidth: function () {
                return this.width * this.scaleX
            }, getHeight: function () {
                return this.height * this.scaleY
            }, _constrainScale: function (a) {
                return Math.abs(a) < this.minScaleLimit ? a < 0 ? -this.minScaleLimit : this.minScaleLimit : a
            }, scale: function (a) {
                return a = this._constrainScale(a), a < 0 && (this.flipX = !this.flipX, this.flipY = !this.flipY, a *= -1), this.scaleX = a, this.scaleY = a, this.setCoords(), this
            }, scaleToWidth: function (a) {
                var b = this.getBoundingRectWidth() / this.getWidth();
                return this.scale(a / this.width / b)
            }, scaleToHeight: function (a) {
                var b = this.getBoundingRectHeight() / this.getHeight();
                return this.scale(a / this.height / b)
            }, setCoords: function () {
                var b = this.strokeWidth > 1 ? this.strokeWidth : 0, c = a(this.angle), d = this.getViewportTransform(),
                    e = function (a) {
                        return fabric.util.transformPoint(a, d)
                    }, f = this.width, g = this.height,
                    h = "round" === this.strokeLineCap || "square" === this.strokeLineCap,
                    i = "line" === this.type && 1 === this.width, j = "line" === this.type && 1 === this.height,
                    k = h && j || "line" !== this.type, l = h && i || "line" !== this.type;
                i ? f = b : j && (g = b), k && (f += b), l && (g += b), this.currentWidth = f * this.scaleX, this.currentHeight = g * this.scaleY, this.currentWidth < 0 && (this.currentWidth = Math.abs(this.currentWidth));
                var m = Math.sqrt(Math.pow(this.currentWidth / 2, 2) + Math.pow(this.currentHeight / 2, 2)),
                    n = Math.atan(isFinite(this.currentHeight / this.currentWidth) ? this.currentHeight / this.currentWidth : 0),
                    o = Math.cos(n + c) * m, p = Math.sin(n + c) * m, q = Math.sin(c), r = Math.cos(c),
                    s = this.getCenterPoint(), t = new fabric.Point(this.currentWidth, this.currentHeight),
                    u = new fabric.Point(s.x - o, s.y - p), v = new fabric.Point(u.x + t.x * r, u.y + t.x * q),
                    w = new fabric.Point(u.x - t.y * q, u.y + t.y * r),
                    x = new fabric.Point(u.x + t.x / 2 * r, u.y + t.x / 2 * q), y = e(u), z = e(v),
                    A = e(new fabric.Point(v.x - t.y * q, v.y + t.y * r)), B = e(w),
                    C = e(new fabric.Point(u.x - t.y / 2 * q, u.y + t.y / 2 * r)), D = e(x),
                    E = e(new fabric.Point(v.x - t.y / 2 * q, v.y + t.y / 2 * r)),
                    F = e(new fabric.Point(w.x + t.x / 2 * r, w.y + t.x / 2 * q)), G = e(new fabric.Point(x.x, x.y)),
                    H = Math.cos(n + c) * this.padding * Math.sqrt(2),
                    I = Math.sin(n + c) * this.padding * Math.sqrt(2);
                return y = y.add(new fabric.Point(-H, -I)), z = z.add(new fabric.Point(I, -H)), A = A.add(new fabric.Point(H, I)), B = B.add(new fabric.Point(-I, H)), C = C.add(new fabric.Point((-H - I) / 2, (-I + H) / 2)), D = D.add(new fabric.Point((I - H) / 2, -(I + H) / 2)), E = E.add(new fabric.Point((I + H) / 2, (I - H) / 2)), F = F.add(new fabric.Point((H - I) / 2, (H + I) / 2)), G = G.add(new fabric.Point((I - H) / 2, -(I + H) / 2)), this.oCoords = {
                    tl: y,
                    tr: z,
                    br: A,
                    bl: B,
                    ml: C,
                    mt: D,
                    mr: E,
                    mb: F,
                    mtr: G
                }, this._setCornerCoords && this._setCornerCoords(), this
            }
        })
    }(), fabric.util.object.extend(fabric.Object.prototype, {
        sendToBack: function () {
            return this.group ? fabric.StaticCanvas.prototype.sendToBack.call(this.group, this) : this.canvas.sendToBack(this), this
        }, bringToFront: function () {
            return this.group ? fabric.StaticCanvas.prototype.bringToFront.call(this.group, this) : this.canvas.bringToFront(this), this
        }, sendBackwards: function (a) {
            return this.group ? fabric.StaticCanvas.prototype.sendBackwards.call(this.group, this, a) : this.canvas.sendBackwards(this, a), this
        }, bringForward: function (a) {
            return this.group ? fabric.StaticCanvas.prototype.bringForward.call(this.group, this, a) : this.canvas.bringForward(this, a), this
        }, moveTo: function (a) {
            return this.group ? fabric.StaticCanvas.prototype.moveTo.call(this.group, this, a) : this.canvas.moveTo(this, a), this
        }
    }), fabric.util.object.extend(fabric.Object.prototype, {
        getSvgStyles: function () {
            var a = this.fill ? this.fill.toLive ? "url(#SVGID_" + this.fill.id + ")" : this.fill : "none",
                b = "destination-over" === this.fillRule ? "evenodd" : this.fillRule,
                c = this.stroke ? this.stroke.toLive ? "url(#SVGID_" + this.stroke.id + ")" : this.stroke : "none",
                d = this.strokeWidth ? this.strokeWidth : "0",
                e = this.strokeDashArray ? this.strokeDashArray.join(" ") : "",
                f = this.strokeLineCap ? this.strokeLineCap : "butt",
                g = this.strokeLineJoin ? this.strokeLineJoin : "miter",
                h = this.strokeMiterLimit ? this.strokeMiterLimit : "4",
                i = "undefined" != typeof this.opacity ? this.opacity : "1",
                j = this.visible ? "" : " visibility: hidden;",
                k = this.shadow && "text" !== this.type ? "filter: url(#SVGID_" + this.shadow.id + ");" : "";
            return ["stroke: ", c, "; ", "stroke-width: ", d, "; ", "stroke-dasharray: ", e, "; ", "stroke-linecap: ", f, "; ", "stroke-linejoin: ", g, "; ", "stroke-miterlimit: ", h, "; ", "fill: ", a, "; ", "fill-rule: ", b, "; ", "opacity: ", i, ";", k, j].join("")
        }, getSvgTransform: function () {
            if (this.group)return "";
            var a = fabric.util.toFixed, b = this.getAngle(),
                c = !this.canvas || this.canvas.svgViewportTransformation ? this.getViewportTransform() : [1, 0, 0, 1, 0, 0],
                d = fabric.util.transformPoint(this.getCenterPoint(), c), e = fabric.Object.NUM_FRACTION_DIGITS,
                f = "path-group" === this.type ? "" : "translate(" + a(d.x, e) + " " + a(d.y, e) + ")",
                g = 0 !== b ? " rotate(" + a(b, e) + ")" : "",
                h = 1 === this.scaleX && 1 === this.scaleY && 1 === c[0] && 1 === c[3] ? "" : " scale(" + a(this.scaleX * c[0], e) + " " + a(this.scaleY * c[3], e) + ")",
                i = "path-group" === this.type ? this.width * c[0] : 0,
                j = this.flipX ? " matrix(-1 0 0 1 " + i + " 0) " : "",
                k = "path-group" === this.type ? this.height * c[3] : 0,
                l = this.flipY ? " matrix(1 0 0 -1 0 " + k + ")" : "";
            return [f, g, h, j, l].join("")
        }, getSvgTransformMatrix: function () {
            return this.transformMatrix ? " matrix(" + this.transformMatrix.join(" ") + ")" : ""
        }, _createBaseSVGMarkup: function () {
            var a = [];
            return this.fill && this.fill.toLive && a.push(this.fill.toSVG(this, !1)), this.stroke && this.stroke.toLive && a.push(this.stroke.toSVG(this, !1)), this.shadow && a.push(this.shadow.toSVG(this)), a
        }
    }), fabric.util.object.extend(fabric.Object.prototype, {
        hasStateChanged: function () {
            return this.stateProperties.some(function (a) {
                return this.get(a) !== this.originalState[a]
            }, this)
        }, saveState: function (a) {
            return this.stateProperties.forEach(function (a) {
                this.originalState[a] = this.get(a)
            }, this), a && a.stateProperties && a.stateProperties.forEach(function (a) {
                this.originalState[a] = this.get(a)
            }, this), this
        }, setupState: function () {
            return this.originalState = {}, this.saveState(), this
        }
    }), function (a) {
        "use strict";
        function f(a, b) {
            var c = a.origin, d = a.axis1, e = a.axis2, f = a.dimension, g = b.nearest, h = b.center, i = b.farthest;
            return function () {
                switch (this.get(c)) {
                    case g:
                        return Math.min(this.get(d), this.get(e));
                    case h:
                        return Math.min(this.get(d), this.get(e)) + .5 * this.get(f);
                    case i:
                        return Math.max(this.get(d), this.get(e))
                }
            }
        }

        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend, d = {x1: 1, x2: 1, y1: 1, y2: 1},
            e = b.StaticCanvas.supports("setLineDash");
        return b.Line ? void b.warn("fabric.Line is already defined") : (b.Line = b.util.createClass(b.Object, {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            initialize: function (a, b) {
                b = b || {}, a || (a = [0, 0, 0, 0]), this.callSuper("initialize", b), this.set("x1", a[0]), this.set("y1", a[1]), this.set("x2", a[2]), this.set("y2", a[3]), this._setWidthHeight(b)
            },
            _setWidthHeight: function (a) {
                a || (a = {}), this.width = Math.abs(this.x2 - this.x1) || 1, this.height = Math.abs(this.y2 - this.y1) || 1, this.left = "left" in a ? a.left : this._getLeftToOriginX(), this.top = "top" in a ? a.top : this._getTopToOriginY()
            },
            _set: function (a, b) {
                return this[a] = b, "undefined" != typeof d[a] && this._setWidthHeight(), this
            },
            _getLeftToOriginX: f({origin: "originX", axis1: "x1", axis2: "x2", dimension: "width"}, {
                nearest: "left",
                center: "center",
                farthest: "right"
            }),
            _getTopToOriginY: f({origin: "originY", axis1: "y1", axis2: "y2", dimension: "height"}, {
                nearest: "top",
                center: "center",
                farthest: "bottom"
            }),
            _render: function (a, b) {
                if (a.beginPath(), b) {
                    var c = this.getCenterPoint();
                    a.translate(c.x, c.y)
                }
                if (!this.strokeDashArray || this.strokeDashArray && e) {
                    var d = this.x1 <= this.x2 ? -1 : 1, f = this.y1 <= this.y2 ? -1 : 1;
                    a.moveTo(1 === this.width ? 0 : d * this.width / 2, 1 === this.height ? 0 : f * this.height / 2), a.lineTo(1 === this.width ? 0 : d * -1 * this.width / 2, 1 === this.height ? 0 : f * -1 * this.height / 2)
                }
                a.lineWidth = this.strokeWidth;
                var g = a.strokeStyle;
                a.strokeStyle = this.stroke || a.fillStyle, this.stroke && this._renderStroke(a), a.strokeStyle = g
            },
            _renderDashedStroke: function (a) {
                var c = this.x1 <= this.x2 ? -1 : 1, d = this.y1 <= this.y2 ? -1 : 1,
                    e = 1 === this.width ? 0 : c * this.width / 2, f = 1 === this.height ? 0 : d * this.height / 2;
                a.beginPath(), b.util.drawDashedLine(a, e, f, -e, -f, this.strokeDashArray), a.closePath()
            },
            toObject: function (a) {
                return c(this.callSuper("toObject", a), {
                    x1: this.get("x1"),
                    y1: this.get("y1"),
                    x2: this.get("x2"),
                    y2: this.get("y2")
                })
            },
            toSVG: function (a) {
                var b = this._createBaseSVGMarkup(), c = "";
                if (!this.group) {
                    var d = -this.width / 2 - (this.x1 > this.x2 ? this.x2 : this.x1),
                        e = -this.height / 2 - (this.y1 > this.y2 ? this.y2 : this.y1);
                    c = "translate(" + d + ", " + e + ") "
                }
                return b.push("<line ", 'x1="', this.x1, '" y1="', this.y1, '" x2="', this.x2, '" y2="', this.y2, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), c, this.getSvgTransformMatrix(), '"/>\n'), a ? a(b.join("")) : b.join("")
            },
            complexity: function () {
                return 1
            }
        }), b.Line.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")), b.Line.fromElement = function (a, d) {
            var e = b.parseAttributes(a, b.Line.ATTRIBUTE_NAMES), f = [e.x1 || 0, e.y1 || 0, e.x2 || 0, e.y2 || 0];
            return new b.Line(f, c(e, d))
        }, void(b.Line.fromObject = function (a) {
            var c = [a.x1, a.y1, a.x2, a.y2];
            return new b.Line(c, a)
        }))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        function e(a) {
            return "radius" in a && a.radius > 0
        }

        var b = a.fabric || (a.fabric = {}), c = 2 * Math.PI, d = b.util.object.extend;
        return b.Circle ? void b.warn("fabric.Circle is already defined.") : (b.Circle = b.util.createClass(b.Object, {
            type: "circle",
            radius: 0,
            initialize: function (a) {
                a = a || {}, this.callSuper("initialize", a), this.set("radius", a.radius || 0)
            },
            _set: function (a, b) {
                return this.callSuper("_set", a, b), "radius" === a && this.setRadius(b), this
            },
            toObject: function (a) {
                return d(this.callSuper("toObject", a), {radius: this.get("radius")})
            },
            toSVG: function (a) {
                var b = this._createBaseSVGMarkup(), c = 0, d = 0;
                return this.group && (c = this.left + this.radius, d = this.top + this.radius), b.push("<circle ", 'cx="' + c + '" cy="' + d + '" ', 'r="', this.radius, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n'), a ? a(b.join("")) : b.join("")
            },
            _render: function (a, b) {
                a.beginPath(), a.arc(b ? this.left + this.radius : 0, b ? this.top + this.radius : 0, this.radius, 0, c, !1), this._renderFill(a), this._renderStroke(a)
            },
            getRadiusX: function () {
                return this.get("radius") * this.get("scaleX")
            },
            getRadiusY: function () {
                return this.get("radius") * this.get("scaleY")
            },
            setRadius: function (a) {
                this.radius = a, this.set("width", 2 * a).set("height", 2 * a)
            },
            complexity: function () {
                return 1
            }
        }), b.Circle.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")), b.Circle.fromElement = function (a, c) {
            c || (c = {});
            var f = b.parseAttributes(a, b.Circle.ATTRIBUTE_NAMES);
            if (!e(f))throw new Error("value of `r` attribute is required and can not be negative");
            f.left = f.left || 0, f.top = f.top || 0;
            var g = new b.Circle(d(f, c));
            return g.left -= g.radius, g.top -= g.radius, g
        }, void(b.Circle.fromObject = function (a) {
            return new b.Circle(a)
        }))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {});
        return b.Triangle ? void b.warn("fabric.Triangle is already defined") : (b.Triangle = b.util.createClass(b.Object, {
            type: "triangle",
            initialize: function (a) {
                a = a || {}, this.callSuper("initialize", a), this.set("width", a.width || 100).set("height", a.height || 100)
            },
            _render: function (a) {
                var b = this.width / 2, c = this.height / 2;
                a.beginPath(), a.moveTo(-b, c), a.lineTo(0, -c), a.lineTo(b, c), a.closePath(), this._renderFill(a), this._renderStroke(a)
            },
            _renderDashedStroke: function (a) {
                var c = this.width / 2, d = this.height / 2;
                a.beginPath(), b.util.drawDashedLine(a, -c, d, 0, -d, this.strokeDashArray), b.util.drawDashedLine(a, 0, -d, c, d, this.strokeDashArray), b.util.drawDashedLine(a, c, d, -c, d, this.strokeDashArray), a.closePath()
            },
            toSVG: function (a) {
                var b = this._createBaseSVGMarkup(), c = this.width / 2, d = this.height / 2,
                    e = [-c + " " + d, "0 " + -d, c + " " + d].join(",");
                return b.push("<polygon ", 'points="', e, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"/>'), a ? a(b.join("")) : b.join("")
            },
            complexity: function () {
                return 1
            }
        }), void(b.Triangle.fromObject = function (a) {
            return new b.Triangle(a)
        }))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = 2 * Math.PI, d = b.util.object.extend;
        return b.Ellipse ? void b.warn("fabric.Ellipse is already defined.") : (b.Ellipse = b.util.createClass(b.Object, {
            type: "ellipse",
            rx: 0,
            ry: 0,
            initialize: function (a) {
                a = a || {}, this.callSuper("initialize", a), this.set("rx", a.rx || 0), this.set("ry", a.ry || 0), this.set("width", 2 * this.get("rx")), this.set("height", 2 * this.get("ry"))
            },
            toObject: function (a) {
                return d(this.callSuper("toObject", a), {rx: this.get("rx"), ry: this.get("ry")})
            },
            toSVG: function (a) {
                var b = this._createBaseSVGMarkup(), c = 0, d = 0;
                return this.group && (c = this.left + this.rx, d = this.top + this.ry), b.push("<ellipse ", 'cx="', c, '" cy="', d, '" ', 'rx="', this.rx, '" ry="', this.ry, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'), a ? a(b.join("")) : b.join("")
            },
            _render: function (a, b) {
                a.beginPath(), a.save(), a.transform(1, 0, 0, this.ry / this.rx, 0, 0), a.arc(b ? this.left + this.rx : 0, b ? (this.top + this.ry) * this.rx / this.ry : 0, this.rx, 0, c, !1), a.restore(), this._renderFill(a), this._renderStroke(a)
            },
            complexity: function () {
                return 1
            }
        }), b.Ellipse.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")), b.Ellipse.fromElement = function (a, c) {
            c || (c = {});
            var e = b.parseAttributes(a, b.Ellipse.ATTRIBUTE_NAMES);
            e.left = e.left || 0, e.top = e.top || 0;
            var f = new b.Ellipse(d(e, c));
            return f.top -= f.ry, f.left -= f.rx, f
        }, void(b.Ellipse.fromObject = function (a) {
            return new b.Ellipse(a)
        }))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        if (b.Rect)return void console.warn("fabric.Rect is already defined");
        var d = b.Object.prototype.stateProperties.concat();
        d.push("rx", "ry", "x", "y"), b.Rect = b.util.createClass(b.Object, {
            stateProperties: d,
            type: "rect",
            rx: 0,
            ry: 0,
            strokeDashArray: null,
            initialize: function (a) {
                a = a || {}, this.callSuper("initialize", a), this._initRxRy()
            },
            _initRxRy: function () {
                this.rx && !this.ry ? this.ry = this.rx : this.ry && !this.rx && (this.rx = this.ry)
            },
            _render: function (a, b) {
                if (1 === this.width && 1 === this.height)return void a.fillRect(0, 0, 1, 1);
                var c = this.rx ? Math.min(this.rx, this.width / 2) : 0,
                    d = this.ry ? Math.min(this.ry, this.height / 2) : 0, e = this.width, f = this.height,
                    g = b ? this.left : -this.width / 2, h = b ? this.top : -this.height / 2, i = 0 !== c || 0 !== d,
                    j = .4477152502;
                a.beginPath(), a.moveTo(g + c, h), a.lineTo(g + e - c, h), i && a.bezierCurveTo(g + e - j * c, h, g + e, h + j * d, g + e, h + d), a.lineTo(g + e, h + f - d), i && a.bezierCurveTo(g + e, h + f - j * d, g + e - j * c, h + f, g + e - c, h + f), a.lineTo(g + c, h + f), i && a.bezierCurveTo(g + j * c, h + f, g, h + f - j * d, g, h + f - d), a.lineTo(g, h + d), i && a.bezierCurveTo(g, h + j * d, g + j * c, h, g + c, h), a.closePath(), this._renderFill(a), this._renderStroke(a)
            },
            _renderDashedStroke: function (a) {
                var c = -this.width / 2, d = -this.height / 2, e = this.width, f = this.height;
                a.beginPath(), b.util.drawDashedLine(a, c, d, c + e, d, this.strokeDashArray), b.util.drawDashedLine(a, c + e, d, c + e, d + f, this.strokeDashArray), b.util.drawDashedLine(a, c + e, d + f, c, d + f, this.strokeDashArray), b.util.drawDashedLine(a, c, d + f, c, d, this.strokeDashArray), a.closePath()
            },
            toObject: function (a) {
                var b = c(this.callSuper("toObject", a), {rx: this.get("rx") || 0, ry: this.get("ry") || 0});
                return this.includeDefaultValues || this._removeDefaultValues(b), b
            },
            toSVG: function (a) {
                var b = this._createBaseSVGMarkup(), c = this.left, d = this.top;
                return this.group || (c = -this.width / 2, d = -this.height / 2), b.push("<rect ", 'x="', c, '" y="', d, '" rx="', this.get("rx"), '" ry="', this.get("ry"), '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'), a ? a(b.join("")) : b.join("")
            },
            complexity: function () {
                return 1
            }
        }), b.Rect.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")), b.Rect.fromElement = function (a, d) {
            if (!a)return null;
            d = d || {};
            var e = b.parseAttributes(a, b.Rect.ATTRIBUTE_NAMES);
            return e.left = e.left || 0, e.top = e.top || 0, new b.Rect(c(d ? b.util.object.clone(d) : {}, e))
        }, b.Rect.fromObject = function (a) {
            return new b.Rect(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.toFixed;
        return b.Polyline ? void b.warn("fabric.Polyline is already defined") : (b.Polyline = b.util.createClass(b.Object, {
            type: "polyline",
            points: null,
            initialize: function (a, b) {
                b = b || {}, this.set("points", a), this.callSuper("initialize", b), this._calcDimensions()
            },
            _calcDimensions: function () {
                return b.Polygon.prototype._calcDimensions.call(this)
            },
            _applyPointOffset: function () {
                return b.Polygon.prototype._applyPointOffset.call(this)
            },
            toObject: function (a) {
                return b.Polygon.prototype.toObject.call(this, a)
            },
            toSVG: function (a) {
                for (var b = [], d = this._createBaseSVGMarkup(), e = 0, f = this.points.length; e < f; e++)b.push(c(this.points[e].x, 2), ",", c(this.points[e].y, 2), " ");
                return d.push("<polyline ", 'points="', b.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n'), a ? a(d.join("")) : d.join("")
            },
            _render: function (a) {
                var b;
                a.beginPath(), this._applyPointOffset && (this.group && "path-group" === this.group.type || this._applyPointOffset(), this._applyPointOffset = null), a.moveTo(this.points[0].x, this.points[0].y);
                for (var c = 0, d = this.points.length; c < d; c++)b = this.points[c], a.lineTo(b.x, b.y);
                this._renderFill(a), this._renderStroke(a)
            },
            _renderDashedStroke: function (a) {
                var c, d;
                a.beginPath();
                for (var e = 0, f = this.points.length; e < f; e++)c = this.points[e], d = this.points[e + 1] || c, b.util.drawDashedLine(a, c.x, c.y, d.x, d.y, this.strokeDashArray)
            },
            complexity: function () {
                return this.get("points").length
            }
        }), b.Polyline.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat(), b.Polyline.fromElement = function (a, c) {
            if (!a)return null;
            c || (c = {});
            var d = b.parsePointsAttribute(a.getAttribute("points")),
                e = b.parseAttributes(a, b.Polyline.ATTRIBUTE_NAMES);
            return null === d ? null : new b.Polyline(d, b.util.object.extend(e, c))
        }, void(b.Polyline.fromObject = function (a) {
            var c = a.points;
            return new b.Polyline(c, a, !0)
        }))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend, d = b.util.array.min, e = b.util.array.max,
            f = b.util.toFixed;
        return b.Polygon ? void b.warn("fabric.Polygon is already defined") : (b.Polygon = b.util.createClass(b.Object, {
            type: "polygon",
            points: null,
            initialize: function (a, b) {
                b = b || {}, this.points = a, this.callSuper("initialize", b), this._calcDimensions()
            },
            _calcDimensions: function () {
                var a = this.points, b = d(a, "x"), c = d(a, "y"), f = e(a, "x"), g = e(a, "y");
                this.width = f - b || 1, this.height = g - c || 1, this.left = b, this.top = c
            },
            _applyPointOffset: function () {
                this.points.forEach(function (a) {
                    a.x -= this.left + this.width / 2, a.y -= this.top + this.height / 2
                }, this)
            },
            toObject: function (a) {
                return c(this.callSuper("toObject", a), {points: this.points.concat()})
            },
            toSVG: function (a) {
                for (var b = [], c = this._createBaseSVGMarkup(), d = 0, e = this.points.length; d < e; d++)b.push(f(this.points[d].x, 2), ",", f(this.points[d].y, 2), " ");
                return c.push("<polygon ", 'points="', b.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"/>\n'), a ? a(c.join("")) : c.join("")
            },
            _render: function (a) {
                var b;
                a.beginPath(), this._applyPointOffset && (this.group && "path-group" === this.group.type || this._applyPointOffset(), this._applyPointOffset = null), a.moveTo(this.points[0].x, this.points[0].y);
                for (var c = 0, d = this.points.length; c < d; c++)b = this.points[c], a.lineTo(b.x, b.y);
                this._renderFill(a), (this.stroke || this.strokeDashArray) && (a.closePath(), this._renderStroke(a))
            },
            _renderDashedStroke: function (a) {
                var c, d;
                a.beginPath();
                for (var e = 0, f = this.points.length; e < f; e++)c = this.points[e], d = this.points[e + 1] || this.points[0], b.util.drawDashedLine(a, c.x, c.y, d.x, d.y, this.strokeDashArray);
                a.closePath()
            },
            complexity: function () {
                return this.points.length
            }
        }), b.Polygon.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat(), b.Polygon.fromElement = function (a, d) {
            if (!a)return null;
            d || (d = {});
            var e = b.parsePointsAttribute(a.getAttribute("points")),
                f = b.parseAttributes(a, b.Polygon.ATTRIBUTE_NAMES);
            return null === e ? null : new b.Polygon(e, c(f, d))
        }, void(b.Polygon.fromObject = function (a) {
            return new b.Polygon(a.points, a, !0)
        }))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        function j(a) {
            return "H" === a[0] ? a[1] : a[a.length - 2]
        }

        function k(a) {
            return "V" === a[0] ? a[1] : a[a.length - 1]
        }

        var b = a.fabric || (a.fabric = {}), c = b.util.array.min, d = b.util.array.max, e = b.util.object.extend,
            f = Object.prototype.toString, g = b.util.drawArc,
            h = {m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7}, i = {m: "l", M: "L"};
        return b.Path ? void b.warn("fabric.Path is already defined") : (b.Path = b.util.createClass(b.Object, {
            type: "path", path: null, initialize: function (a, b) {
                if (b = b || {}, this.setOptions(b), !a)throw new Error("`path` argument is required");
                var c = "[object Array]" === f.call(a);
                this.path = c ? a : a.match && a.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi), this.path && (c || (this.path = this._parsePath()), this._initializePath(b), b.sourcePath && this.setSourcePath(b.sourcePath))
            }, _initializePath: function (a) {
                var b = "width" in a && null != a.width, c = "height" in a && null != a.width, d = "left" in a,
                    f = "top" in a, g = d ? this.left : 0, h = f ? this.top : 0;
                b && c ? (f || (this.top = this.height / 2), d || (this.left = this.width / 2)) : (e(this, this._parseDimensions()), b && (this.width = a.width), c && (this.height = a.height)), this.pathOffset = this.pathOffset || this._calculatePathOffset(g, h)
            }, _calculatePathOffset: function (a, b) {
                return {x: this.left - a - this.width / 2, y: this.top - b - this.height / 2}
            }, _render: function (a, b) {
                var c, l, m, n, o, d = null, e = 0, f = 0, h = 0, i = 0, j = 0, k = 0,
                    p = -(this.width / 2 + this.pathOffset.x), q = -(this.height / 2 + this.pathOffset.y);
                b && (p += this.width / 2, q += this.height / 2);
                for (var r = 0, s = this.path.length; r < s; ++r) {
                    switch (c = this.path[r], c[0]) {
                        case"l":
                            h += c[1], i += c[2], a.lineTo(h + p, i + q);
                            break;
                        case"L":
                            h = c[1], i = c[2], a.lineTo(h + p, i + q);
                            break;
                        case"h":
                            h += c[1], a.lineTo(h + p, i + q);
                            break;
                        case"H":
                            h = c[1], a.lineTo(h + p, i + q);
                            break;
                        case"v":
                            i += c[1], a.lineTo(h + p, i + q);
                            break;
                        case"V":
                            i = c[1], a.lineTo(h + p, i + q);
                            break;
                        case"m":
                            h += c[1], i += c[2], e = h, f = i, a.moveTo(h + p, i + q);
                            break;
                        case"M":
                            h = c[1], i = c[2], e = h, f = i, a.moveTo(h + p, i + q);
                            break;
                        case"c":
                            l = h + c[5], m = i + c[6], j = h + c[3], k = i + c[4], a.bezierCurveTo(h + c[1] + p, i + c[2] + q, j + p, k + q, l + p, m + q), h = l, i = m;
                            break;
                        case"C":
                            h = c[5], i = c[6], j = c[3], k = c[4], a.bezierCurveTo(c[1] + p, c[2] + q, j + p, k + q, h + p, i + q);
                            break;
                        case"s":
                            l = h + c[3], m = i + c[4], j = j ? 2 * h - j : h, k = k ? 2 * i - k : i, a.bezierCurveTo(j + p, k + q, h + c[1] + p, i + c[2] + q, l + p, m + q), j = h + c[1], k = i + c[2], h = l, i = m;
                            break;
                        case"S":
                            l = c[3], m = c[4], j = 2 * h - j, k = 2 * i - k, a.bezierCurveTo(j + p, k + q, c[1] + p, c[2] + q, l + p, m + q), h = l, i = m, j = c[1], k = c[2];
                            break;
                        case"q":
                            l = h + c[3], m = i + c[4], j = h + c[1], k = i + c[2], a.quadraticCurveTo(j + p, k + q, l + p, m + q), h = l, i = m;
                            break;
                        case"Q":
                            l = c[3], m = c[4], a.quadraticCurveTo(c[1] + p, c[2] + q, l + p, m + q), h = l, i = m, j = c[1], k = c[2];
                            break;
                        case"t":
                            l = h + c[1], m = i + c[2], null === d[0].match(/[QqTt]/) ? (j = h, k = i) : "t" === d[0] ? (j = 2 * h - n, k = 2 * i - o) : "q" === d[0] && (j = 2 * h - j, k = 2 * i - k), n = j, o = k, a.quadraticCurveTo(j + p, k + q, l + p, m + q), h = l, i = m, j = h + c[1], k = i + c[2];
                            break;
                        case"T":
                            l = c[1], m = c[2], j = 2 * h - j, k = 2 * i - k, a.quadraticCurveTo(j + p, k + q, l + p, m + q), h = l, i = m;
                            break;
                        case"a":
                            g(a, h + p, i + q, [c[1], c[2], c[3], c[4], c[5], c[6] + h + p, c[7] + i + q]), h += c[6], i += c[7];
                            break;
                        case"A":
                            g(a, h + p, i + q, [c[1], c[2], c[3], c[4], c[5], c[6] + p, c[7] + q]), h = c[6], i = c[7];
                            break;
                        case"z":
                        case"Z":
                            h = e, i = f, a.closePath()
                    }
                    d = c
                }
            }, render: function (a, c) {
                if (this.visible) {
                    a.save(), c && a.translate(-this.width / 2, -this.height / 2);
                    var d = this.transformMatrix;
                    d && a.transform(d[0], d[1], d[2], d[3], d[4], d[5]), c || this.transform(a), this._setStrokeStyles(a), this._setFillStyles(a), this._setShadow(a), this.clipTo && b.util.clipContext(this, a), a.beginPath(), a.globalAlpha = this.group ? a.globalAlpha * this.opacity : this.opacity, this._render(a, c), this._renderFill(a), this._renderStroke(a), this.clipTo && a.restore(), this._removeShadow(a), a.restore()
                }
            }, toString: function () {
                return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>"
            }, toObject: function (a) {
                var b = e(this.callSuper("toObject", a), {
                    path: this.path.map(function (a) {
                        return a.slice()
                    }), pathOffset: this.pathOffset
                });
                return this.sourcePath && (b.sourcePath = this.sourcePath), this.transformMatrix && (b.transformMatrix = this.transformMatrix), b
            }, toDatalessObject: function (a) {
                var b = this.toObject(a);
                return this.sourcePath && (b.path = this.sourcePath), delete b.sourcePath, b
            }, toSVG: function (a) {
                for (var b = [], c = this._createBaseSVGMarkup(), d = 0, e = this.path.length; d < e; d++)b.push(this.path[d].join(" "));
                var f = b.join(" ");
                return c.push("<path ", 'd="', f, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '" stroke-linecap="round" ', "/>\n"), a ? a(c.join("")) : c.join("")
            }, complexity: function () {
                return this.path.length
            }, _parsePath: function () {
                for (var c, d, f, g, k, a = [], b = [], e = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, j = 0, l = this.path.length; j < l; j++) {
                    for (c = this.path[j], g = c.slice(1).trim(), b.length = 0; f = e.exec(g);)b.push(f[0]);
                    k = [c.charAt(0)];
                    for (var m = 0, n = b.length; m < n; m++)d = parseFloat(b[m]), isNaN(d) || k.push(d);
                    var o = k[0], p = h[o.toLowerCase()], q = i[o] || o;
                    if (k.length - 1 > p)for (var r = 1, s = k.length; r < s; r += p)a.push([o].concat(k.slice(r, r + p))), o = q; else a.push(k)
                }
                return a
            }, _parseDimensions: function () {
                var a = [], b = [], e = {};
                this.path.forEach(function (c, d) {
                    this._getCoordsFromCommand(c, d, a, b, e)
                }, this);
                var f = c(a), g = c(b), h = d(a), i = d(b), j = h - f, k = i - g,
                    l = {left: this.left + (f + j / 2), top: this.top + (g + k / 2), width: j, height: k};
                return l
            }, _getCoordsFromCommand: function (a, b, c, d, e) {
                var f = !1;
                "H" !== a[0] && (e.x = j(0 === b ? a : this.path[b - 1])),
                "V" !== a[0] && (e.y = k(0 === b ? a : this.path[b - 1])), a[0] === a[0].toLowerCase() && (f = !0);
                var h, g = this._getXY(a, f, e);
                h = parseInt(g.x, 10), isNaN(h) || c.push(h), h = parseInt(g.y, 10), isNaN(h) || d.push(h)
            }, _getXY: function (a, b, c) {
                var d = b ? c.x + j(a) : "V" === a[0] ? c.x : j(a), e = b ? c.y + k(a) : "H" === a[0] ? c.y : k(a);
                return {x: d, y: e}
            }
        }), b.Path.fromObject = function (a, c) {
            "string" == typeof a.path ? b.loadSVGFromURL(a.path, function (d) {
                var e = d[0], f = a.path;
                delete a.path, b.util.object.extend(e, a), e.setSourcePath(f), c(e)
            }) : c(new b.Path(a.path, a))
        }, b.Path.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat(["d"]), b.Path.fromElement = function (a, c, d) {
            var f = b.parseAttributes(a, b.Path.ATTRIBUTE_NAMES);
            c && c(new b.Path(f.d, e(f, d)))
        }, void(b.Path.async = !0))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend, d = b.util.array.invoke,
            e = b.Object.prototype.toObject;
        return b.PathGroup ? void b.warn("fabric.PathGroup is already defined") : (b.PathGroup = b.util.createClass(b.Path, {
            type: "path-group",
            fill: "",
            initialize: function (a, b) {
                b = b || {}, this.paths = a || [];
                for (var c = this.paths.length; c--;)this.paths[c].group = this;
                this.setOptions(b), b.widthAttr && (this.scaleX = b.widthAttr / b.width), b.heightAttr && (this.scaleY = b.heightAttr / b.height), this.setCoords(), b.sourcePath && this.setSourcePath(b.sourcePath)
            },
            render: function (a) {
                if (this.visible) {
                    a.save();
                    var c = this.transformMatrix;
                    c && a.transform(c[0], c[1], c[2], c[3], c[4], c[5]), this.transform(a), this._setShadow(a), this.clipTo && b.util.clipContext(this, a);
                    for (var d = 0, e = this.paths.length; d < e; ++d)this.paths[d].render(a, !0);
                    this.clipTo && a.restore(), this._removeShadow(a), a.restore()
                }
            },
            _set: function (a, b) {
                if ("fill" === a && b && this.isSameColor())for (var c = this.paths.length; c--;)this.paths[c]._set(a, b);
                return this.callSuper("_set", a, b)
            },
            toObject: function (a) {
                var b = c(e.call(this, a), {paths: d(this.getObjects(), "toObject", a)});
                return this.sourcePath && (b.sourcePath = this.sourcePath), b
            },
            toDatalessObject: function (a) {
                var b = this.toObject(a);
                return this.sourcePath && (b.paths = this.sourcePath), b
            },
            toSVG: function (a) {
                for (var b = this.getObjects(), c = "translate(" + this.left + " " + this.top + ")", d = ["<g ", 'style="', this.getSvgStyles(), '" ', 'transform="', c, this.getSvgTransform(), '" ', ">\n"], e = 0, f = b.length; e < f; e++)d.push(b[e].toSVG(a));
                return d.push("</g>\n"), a ? a(d.join("")) : d.join("")
            },
            toString: function () {
                return "#<fabric.PathGroup (" + this.complexity() + "): { top: " + this.top + ", left: " + this.left + " }>"
            },
            isSameColor: function () {
                var a = (this.getObjects()[0].get("fill") || "").toLowerCase();
                return this.getObjects().every(function (b) {
                    return (b.get("fill") || "").toLowerCase() === a
                })
            },
            complexity: function () {
                return this.paths.reduce(function (a, b) {
                    return a + (b && b.complexity ? b.complexity() : 0)
                }, 0)
            },
            getObjects: function () {
                return this.paths
            }
        }), b.PathGroup.fromObject = function (a, c) {
            "string" == typeof a.paths ? b.loadSVGFromURL(a.paths, function (d) {
                var e = a.paths;
                delete a.paths;
                var f = b.util.groupSVGElements(d, a, e);
                c(f)
            }) : b.util.enlivenObjects(a.paths, function (d) {
                delete a.paths, c(new b.PathGroup(d, a))
            })
        }, void(b.PathGroup.async = !0))
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend, d = b.util.array.min, e = b.util.array.max,
            f = b.util.array.invoke;
        if (!b.Group) {
            var g = {
                lockMovementX: !0,
                lockMovementY: !0,
                lockRotation: !0,
                lockScalingX: !0,
                lockScalingY: !0,
                lockUniScaling: !0
            };
            b.Group = b.util.createClass(b.Object, b.Collection, {
                type: "group",
                initialize: function (a, b) {
                    b = b || {}, this._objects = a || [];
                    for (var d = this._objects.length; d--;)this._objects[d].group = this;
                    this.originalState = {}, this.callSuper("initialize"), this._calcBounds(), this._updateObjectsCoords(), b && c(this, b), this._setOpacityIfSame(), this.setCoords(), this.saveCoords()
                },
                _updateObjectsCoords: function () {
                    this.forEachObject(this._updateObjectCoords, this)
                },
                _updateObjectCoords: function (a) {
                    var b = a.getLeft(), c = a.getTop();
                    a.set({
                        originalLeft: b,
                        originalTop: c,
                        left: b - this.left,
                        top: c - this.top
                    }), a.setCoords(), a.__origHasControls = a.hasControls, a.hasControls = !1
                },
                toString: function () {
                    return "#<fabric.Group: (" + this.complexity() + ")>"
                },
                addWithUpdate: function (a) {
                    return this._restoreObjectsState(), a && (this._objects.push(a), a.group = this), this.forEachObject(this._setObjectActive, this), this._calcBounds(), this._updateObjectsCoords(), this
                },
                _setObjectActive: function (a) {
                    a.set("active", !0), a.group = this
                },
                removeWithUpdate: function (a) {
                    return this._moveFlippedObject(a), this._restoreObjectsState(), this.forEachObject(this._setObjectActive, this), this.remove(a), this._calcBounds(), this._updateObjectsCoords(), this
                },
                _onObjectAdded: function (a) {
                    a.group = this
                },
                _onObjectRemoved: function (a) {
                    delete a.group, a.set("active", !1)
                },
                delegatedProperties: {
                    fill: !0,
                    opacity: !0,
                    fontFamily: !0,
                    fontWeight: !0,
                    fontSize: !0,
                    fontStyle: !0,
                    lineHeight: !0,
                    textDecoration: !0,
                    textAlign: !0,
                    backgroundColor: !0
                },
                _set: function (a, b) {
                    if (a in this.delegatedProperties) {
                        var c = this._objects.length;
                        for (this[a] = b; c--;)this._objects[c].set(a, b)
                    } else this[a] = b
                },
                toObject: function (a) {
                    return c(this.callSuper("toObject", a), {objects: f(this._objects, "toObject", a)})
                },
                render: function (a) {
                    if (this.visible) {
                        a.save(), this.clipTo && b.util.clipContext(this, a);
                        for (var c = 0, d = this._objects.length; c < d; c++)this._renderObject(this._objects[c], a);
                        this.clipTo && a.restore(), a.restore()
                    }
                },
                _renderControls: function (a, b) {
                    this.callSuper("_renderControls", a, b);
                    for (var c = 0, d = this._objects.length; c < d; c++)this._objects[c]._renderControls(a)
                },
                _renderObject: function (a, b) {
                    var c = a.hasRotatingPoint;
                    a.visible && (a.hasRotatingPoint = !1, a.render(b), a.hasRotatingPoint = c)
                },
                _restoreObjectsState: function () {
                    return this._objects.forEach(this._restoreObjectState, this), this
                },
                _moveFlippedObject: function (a) {
                    var b = a.get("originX"), c = a.get("originY"), d = a.getCenterPoint();
                    a.set({originX: "center", originY: "center", left: d.x, top: d.y}), this._toggleFlipping(a);
                    var e = a.getPointByOrigin(b, c);
                    return a.set({originX: b, originY: c, left: e.x, top: e.y}), this
                },
                _toggleFlipping: function (a) {
                    this.flipX && (a.toggle("flipX"), a.set("left", -a.get("left")), a.setAngle(-a.getAngle())), this.flipY && (a.toggle("flipY"), a.set("top", -a.get("top")), a.setAngle(-a.getAngle()))
                },
                _restoreObjectState: function (a) {
                    return this._setObjectPosition(a), a.setCoords(), a.hasControls = a.__origHasControls, delete a.__origHasControls, a.set("active", !1), a.setCoords(), delete a.group, this
                },
                _setObjectPosition: function (a) {
                    var b = this.getLeft(), c = this.getTop(), d = this._getRotatedLeftTop(a);
                    a.set({
                        angle: a.getAngle() + this.getAngle(),
                        left: b + d.left,
                        top: c + d.top,
                        scaleX: a.get("scaleX") * this.get("scaleX"),
                        scaleY: a.get("scaleY") * this.get("scaleY")
                    })
                },
                _getRotatedLeftTop: function (a) {
                    var b = this.getAngle() * (Math.PI / 180);
                    return {
                        left: -Math.sin(b) * a.getTop() * this.get("scaleY") + Math.cos(b) * a.getLeft() * this.get("scaleX"),
                        top: Math.cos(b) * a.getTop() * this.get("scaleY") + Math.sin(b) * a.getLeft() * this.get("scaleX")
                    }
                },
                destroy: function () {
                    return this._objects.forEach(this._moveFlippedObject, this), this._restoreObjectsState()
                },
                saveCoords: function () {
                    return this._originalLeft = this.get("left"), this._originalTop = this.get("top"), this
                },
                hasMoved: function () {
                    return this._originalLeft !== this.get("left") || this._originalTop !== this.get("top")
                },
                setObjectsCoords: function () {
                    return this.forEachObject(function (a) {
                        a.setCoords()
                    }), this
                },
                _setOpacityIfSame: function () {
                    var a = this.getObjects(), b = a[0] ? a[0].get("opacity") : 1, c = a.every(function (a) {
                        return a.get("opacity") === b
                    });
                    c && (this.opacity = b)
                },
                _calcBounds: function (a) {
                    for (var d, b = [], c = [], e = 0, f = this._objects.length; e < f; ++e) {
                        d = this._objects[e], d.setCoords();
                        for (var g in d.oCoords)b.push(d.oCoords[g].x), c.push(d.oCoords[g].y)
                    }
                    this.set(this._getBounds(b, c, a))
                },
                _getBounds: function (a, c, f) {
                    var g = b.util.invertTransform(this.getViewportTransform()),
                        h = b.util.transformPoint(new b.Point(d(a), d(c)), g),
                        i = b.util.transformPoint(new b.Point(e(a), e(c)), g),
                        j = {width: i.x - h.x || 0, height: i.y - h.y || 0};
                    return f || (j.left = (h.x + i.x) / 2 || 0, j.top = (h.y + i.y) / 2 || 0), j
                },
                toSVG: function (a) {
                    for (var b = ["<g ", 'transform="', this.getSvgTransform(), '">\n'], c = 0, d = this._objects.length; c < d; c++)b.push(this._objects[c].toSVG(a));
                    return b.push("</g>\n"), a ? a(b.join("")) : b.join("")
                },
                get: function (a) {
                    if (a in g) {
                        if (this[a])return this[a];
                        for (var b = 0, c = this._objects.length; b < c; b++)if (this._objects[b][a])return !0;
                        return !1
                    }
                    return a in this.delegatedProperties ? this._objects[0] && this._objects[0].get(a) : this[a]
                }
            }), b.Group.fromObject = function (a, c) {
                b.util.enlivenObjects(a.objects, function (d) {
                    delete a.objects, c && c(new b.Group(d, a))
                })
            }, b.Group.async = !0
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = fabric.util.object.extend;
        return a.fabric || (a.fabric = {}), a.fabric.Image ? void fabric.warn("fabric.Image is already defined.") : (fabric.Image = fabric.util.createClass(fabric.Object, {
            type: "image",
            crossOrigin: "",
            initialize: function (a, b) {
                b || (b = {}), this.filters = [], this.callSuper("initialize", b), this._initElement(a, b), this._initConfig(b), b.filters && (this.filters = b.filters, this.applyFilters())
            },
            getElement: function () {
                return this._element
            },
            setElement: function (a, b) {
                return this._element = a, this._originalElement = a, this._initConfig(), 0 !== this.filters.length && this.applyFilters(b), this
            },
            setCrossOrigin: function (a) {
                return this.crossOrigin = a, this._element.crossOrigin = a, this
            },
            getOriginalSize: function () {
                var a = this.getElement();
                return {width: a.width, height: a.height}
            },
            _stroke: function (a) {
                a.save(), this._setStrokeStyles(a), a.beginPath(), a.strokeRect(-this.width / 2, -this.height / 2, this.width, this.height), a.closePath(), a.restore()
            },
            _renderDashedStroke: function (a) {
                var b = -this.width / 2, c = -this.height / 2, d = this.width, e = this.height;
                a.save(), this._setStrokeStyles(a), a.beginPath(), fabric.util.drawDashedLine(a, b, c, b + d, c, this.strokeDashArray), fabric.util.drawDashedLine(a, b + d, c, b + d, c + e, this.strokeDashArray), fabric.util.drawDashedLine(a, b + d, c + e, b, c + e, this.strokeDashArray), fabric.util.drawDashedLine(a, b, c + e, b, c, this.strokeDashArray), a.closePath(), a.restore()
            },
            toObject: function (a) {
                return b(this.callSuper("toObject", a), {
                    src: this._originalElement.src || this._originalElement._src,
                    filters: this.filters.map(function (a) {
                        return a && a.toObject()
                    }),
                    crossOrigin: this.crossOrigin
                })
            },
            toSVG: function (a) {
                var b = [], c = -this.width / 2, d = -this.height / 2;
                if (this.group && (c = this.left, d = this.top), b.push('<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n', '<image xlink:href="', this.getSvgSrc(), '" x="', c, '" y="', d, '" style="', this.getSvgStyles(), '" width="', this.width, '" height="', this.height, '" preserveAspectRatio="none"', "></image>\n"), this.stroke || this.strokeDashArray) {
                    var e = this.fill;
                    this.fill = null, b.push("<rect ", 'x="', c, '" y="', d, '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '"/>\n'), this.fill = e
                }
                return b.push("</g>\n"), a ? a(b.join("")) : b.join("")
            },
            getSrc: function () {
                if (this.getElement())return this.getElement().src || this.getElement()._src
            },
            toString: function () {
                return '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
            },
            clone: function (a, b) {
                this.constructor.fromObject(this.toObject(b), a)
            },
            applyFilters: function (a) {
                if (this._originalElement) {
                    if (0 === this.filters.length)return this._element = this._originalElement, void(a && a());
                    var b = this._originalElement, c = fabric.util.createCanvasElement(), d = fabric.util.createImage(),
                        e = this;
                    return c.width = b.width, c.height = b.height, c.getContext("2d").drawImage(b, 0, 0, b.width, b.height), this.filters.forEach(function (a) {
                        a && a.applyTo(c)
                    }), d.width = b.width, d.height = b.height, fabric.isLikelyNode ? (d.src = c.toBuffer(undefined, fabric.Image.pngCompression), e._element = d, a && a()) : (d.onload = function () {
                        e._element = d, a && a(), d.onload = c = b = null
                    }, d.src = c.toDataURL("image/png")), this
                }
            },
            _render: function (a, b) {
                this._element && a.drawImage(this._element, b ? this.left : -this.width / 2, b ? this.top : -this.height / 2, this.width, this.height), this._renderStroke(a)
            },
            _resetWidthHeight: function () {
                var a = this.getElement();
                this.set("width", a.width), this.set("height", a.height)
            },
            _initElement: function (a) {
                this.setElement(fabric.util.getById(a)), fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS)
            },
            _initConfig: function (a) {
                a || (a = {}), this.setOptions(a), this._setWidthHeight(a), this._element && this.crossOrigin && (this._element.crossOrigin = this.crossOrigin)
            },
            _initFilters: function (a, b) {
                a.filters && a.filters.length ? fabric.util.enlivenObjects(a.filters, function (a) {
                    b && b(a)
                }, "fabric.Image.filters") : b && b()
            },
            _setWidthHeight: function (a) {
                this.width = "width" in a ? a.width : this.getElement() ? this.getElement().width || 0 : 0, this.height = "height" in a ? a.height : this.getElement() ? this.getElement().height || 0 : 0
            },
            complexity: function () {
                return 1
            }
        }), fabric.Image.CSS_CANVAS = "canvas-img", fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc, fabric.Image.fromObject = function (a, b) {
            fabric.util.loadImage(a.src, function (c) {
                fabric.Image.prototype._initFilters.call(a, a, function (d) {
                    a.filters = d || [];
                    var e = new fabric.Image(c, a);
                    b && b(e)
                })
            }, null, a.crossOrigin)
        }, fabric.Image.fromURL = function (a, b, c) {
            fabric.util.loadImage(a, function (a) {
                b(new fabric.Image(a, c))
            }, null, c && c.crossOrigin)
        }, fabric.Image.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("x y width height xlink:href".split(" ")), fabric.Image.fromElement = function (a, c, d) {
            var e = fabric.parseAttributes(a, fabric.Image.ATTRIBUTE_NAMES);
            fabric.Image.fromURL(e["xlink:href"], c, b(d ? fabric.util.object.clone(d) : {}, e))
        }, fabric.Image.async = !0, void(fabric.Image.pngCompression = 1))
    }("undefined" != typeof exports ? exports : this), fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.BaseFilter = fabric.util.createClass({
        type: "BaseFilter",
        toObject: function () {
            return {type: this.type}
        },
        toJSON: function () {
            return this.toObject()
        }
    }), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.Brightness = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Brightness",
            initialize: function (a) {
                a = a || {}, this.brightness = a.brightness || 0
            },
            applyTo: function (a) {
                for (var b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height), d = c.data, e = this.brightness, f = 0, g = d.length; f < g; f += 4)d[f] += e, d[f + 1] += e, d[f + 2] += e;
                b.putImageData(c, 0, 0)
            },
            toObject: function () {
                return c(this.callSuper("toObject"), {brightness: this.brightness})
            }
        }), b.Image.filters.Brightness.fromObject = function (a) {
            return new b.Image.filters.Brightness(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.Convolute = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Convolute",
            initialize: function (a) {
                a = a || {}, this.opaque = a.opaque, this.matrix = a.matrix || [0, 0, 0, 0, 1, 0, 0, 0, 0];
                var c = b.util.createCanvasElement();
                this.tmpCtx = c.getContext("2d")
            },
            _createImageData: function (a, b) {
                return this.tmpCtx.createImageData(a, b)
            },
            applyTo: function (a) {
                for (var b = this.matrix, c = a.getContext("2d"), d = c.getImageData(0, 0, a.width, a.height), e = Math.round(Math.sqrt(b.length)), f = Math.floor(e / 2), g = d.data, h = d.width, i = d.height, j = h, k = i, l = this._createImageData(j, k), m = l.data, n = this.opaque ? 1 : 0, o = 0; o < k; o++)for (var p = 0; p < j; p++) {
                    for (var q = o, r = p, s = 4 * (o * j + p), t = 0, u = 0, v = 0, w = 0, x = 0; x < e; x++)for (var y = 0; y < e; y++) {
                        var z = q + x - f, A = r + y - f;
                        if (!(z < 0 || z > i || A < 0 || A > h)) {
                            var B = 4 * (z * h + A), C = b[x * e + y];
                            t += g[B] * C, u += g[B + 1] * C, v += g[B + 2] * C, w += g[B + 3] * C
                        }
                    }
                    m[s] = t, m[s + 1] = u, m[s + 2] = v, m[s + 3] = w + n * (255 - w)
                }
                c.putImageData(l, 0, 0)
            },
            toObject: function () {
                return c(this.callSuper("toObject"), {opaque: this.opaque, matrix: this.matrix})
            }
        }), b.Image.filters.Convolute.fromObject = function (a) {
            return new b.Image.filters.Convolute(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.GradientTransparency = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "GradientTransparency",
            initialize: function (a) {
                a = a || {}, this.threshold = a.threshold || 100
            },
            applyTo: function (a) {
                for (var b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height), d = c.data, e = this.threshold, f = d.length, g = 0, h = d.length; g < h; g += 4)d[g + 3] = e + 255 * (f - g) / f;
                b.putImageData(c, 0, 0)
            },
            toObject: function () {
                return c(this.callSuper("toObject"), {threshold: this.threshold})
            }
        }), b.Image.filters.GradientTransparency.fromObject = function (a) {
            return new b.Image.filters.GradientTransparency(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {});
        b.Image.filters.Grayscale = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Grayscale",
            applyTo: function (a) {
                for (var g, b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height), d = c.data, e = c.width * c.height * 4, f = 0; f < e;)g = (d[f] + d[f + 1] + d[f + 2]) / 3, d[f] = g, d[f + 1] = g, d[f + 2] = g, f += 4;
                b.putImageData(c, 0, 0)
            }
        }), b.Image.filters.Grayscale.fromObject = function () {
            return new b.Image.filters.Grayscale
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {});
        b.Image.filters.Invert = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Invert", applyTo: function (a) {
                var f, b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height), d = c.data, e = d.length;
                for (f = 0; f < e; f += 4)d[f] = 255 - d[f], d[f + 1] = 255 - d[f + 1], d[f + 2] = 255 - d[f + 2];
                b.putImageData(c, 0, 0)
            }
        }), b.Image.filters.Invert.fromObject = function () {
            return new b.Image.filters.Invert
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.Mask = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Mask", initialize: function (a) {
                a = a || {}, this.mask = a.mask, this.channel = [0, 1, 2, 3].indexOf(a.channel) > -1 ? a.channel : 0
            }, applyTo: function (a) {
                if (this.mask) {
                    var i, c = a.getContext("2d"), d = c.getImageData(0, 0, a.width, a.height), e = d.data,
                        f = this.mask.getElement(), g = b.util.createCanvasElement(), h = this.channel,
                        j = d.width * d.height * 4;
                    g.width = f.width, g.height = f.height, g.getContext("2d").drawImage(f, 0, 0, f.width, f.height);
                    var k = g.getContext("2d").getImageData(0, 0, f.width, f.height), l = k.data;
                    for (i = 0; i < j; i += 4)e[i + 3] = l[i + h];
                    c.putImageData(d, 0, 0)
                }
            }, toObject: function () {
                return c(this.callSuper("toObject"), {mask: this.mask.toObject(), channel: this.channel})
            }
        }), b.Image.filters.Mask.fromObject = function (a, c) {
            b.util.loadImage(a.mask.src, function (d) {
                a.mask = new b.Image(d, a.mask), c && c(new b.Image.filters.Mask(a))
            })
        }, b.Image.filters.Mask.async = !0
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.Noise = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Noise",
            initialize: function (a) {
                a = a || {}, this.noise = a.noise || 0
            },
            applyTo: function (a) {
                for (var f, b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height), d = c.data, e = this.noise, g = 0, h = d.length; g < h; g += 4)f = (.5 - Math.random()) * e, d[g] += f, d[g + 1] += f, d[g + 2] += f;
                b.putImageData(c, 0, 0)
            },
            toObject: function () {
                return c(this.callSuper("toObject"), {noise: this.noise})
            }
        }), b.Image.filters.Noise.fromObject = function (a) {
            return new b.Image.filters.Noise(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.Pixelate = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Pixelate",
            initialize: function (a) {
                a = a || {}, this.blocksize = a.blocksize || 4
            },
            applyTo: function (a) {
                var g, h, i, j, k, l, m, b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height),
                    d = c.data, e = c.height, f = c.width;
                for (h = 0; h < e; h += this.blocksize)for (i = 0; i < f; i += this.blocksize) {
                    g = 4 * h * f + 4 * i, j = d[g], k = d[g + 1], l = d[g + 2], m = d[g + 3];
                    for (var n = h, o = h + this.blocksize; n < o; n++)for (var p = i, q = i + this.blocksize; p < q; p++)g = 4 * n * f + 4 * p, d[g] = j, d[g + 1] = k, d[g + 2] = l, d[g + 3] = m
                }
                b.putImageData(c, 0, 0)
            },
            toObject: function () {
                return c(this.callSuper("toObject"), {blocksize: this.blocksize})
            }
        }), b.Image.filters.Pixelate.fromObject = function (a) {
            return new b.Image.filters.Pixelate(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.RemoveWhite = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "RemoveWhite",
            initialize: function (a) {
                a = a || {}, this.threshold = a.threshold || 30, this.distance = a.distance || 20
            },
            applyTo: function (a) {
                for (var i, j, k, b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height), d = c.data, e = this.threshold, f = this.distance, g = 255 - e, h = Math.abs, l = 0, m = d.length; l < m; l += 4)i = d[l], j = d[l + 1], k = d[l + 2], i > g && j > g && k > g && h(i - j) < f && h(i - k) < f && h(j - k) < f && (d[l + 3] = 1);
                b.putImageData(c, 0, 0)
            },
            toObject: function () {
                return c(this.callSuper("toObject"), {threshold: this.threshold, distance: this.distance})
            }
        }), b.Image.filters.RemoveWhite.fromObject = function (a) {
            return new b.Image.filters.RemoveWhite(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {});
        b.Image.filters.Sepia = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Sepia", applyTo: function (a) {
                var f, g, b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height), d = c.data, e = d.length;
                for (f = 0; f < e; f += 4)g = .3 * d[f] + .59 * d[f + 1] + .11 * d[f + 2], d[f] = g + 100, d[f + 1] = g + 50, d[f + 2] = g + 255;
                b.putImageData(c, 0, 0)
            }
        }), b.Image.filters.Sepia.fromObject = function () {
            return new b.Image.filters.Sepia
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {});
        b.Image.filters.Sepia2 = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Sepia2", applyTo: function (a) {
                var f, g, h, i, b = a.getContext("2d"), c = b.getImageData(0, 0, a.width, a.height), d = c.data,
                    e = d.length;
                for (f = 0; f < e; f += 4)g = d[f], h = d[f + 1], i = d[f + 2], d[f] = (.393 * g + .769 * h + .189 * i) / 1.351, d[f + 1] = (.349 * g + .686 * h + .168 * i) / 1.203, d[f + 2] = (.272 * g + .534 * h + .131 * i) / 2.14;
                b.putImageData(c, 0, 0)
            }
        }), b.Image.filters.Sepia2.fromObject = function () {
            return new b.Image.filters.Sepia2
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.Tint = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Tint", initialize: function (a) {
                a = a || {}, this.color = a.color || "#000000", this.opacity = "undefined" != typeof a.opacity ? a.opacity : new b.Color(this.color).getAlpha()
            }, applyTo: function (a) {
                var g, h, i, j, k, l, m, n, o, c = a.getContext("2d"), d = c.getImageData(0, 0, a.width, a.height),
                    e = d.data, f = e.length;
                for (o = new b.Color(this.color).getSource(), h = o[0] * this.opacity, i = o[1] * this.opacity, j = o[2] * this.opacity, n = 1 - this.opacity, g = 0; g < f; g += 4)k = e[g], l = e[g + 1], m = e[g + 2], e[g] = h + k * n, e[g + 1] = i + l * n, e[g + 2] = j + m * n;
                c.putImageData(d, 0, 0)
            }, toObject: function () {
                return c(this.callSuper("toObject"), {color: this.color, opacity: this.opacity})
            }
        }), b.Image.filters.Tint.fromObject = function (a) {
            return new b.Image.filters.Tint(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend;
        b.Image.filters.Multiply = b.util.createClass(b.Image.filters.BaseFilter, {
            type: "Multiply",
            initialize: function (a) {
                a = a || {}, this.color = a.color || "#000000"
            },
            applyTo: function (a) {
                var g, h, c = a.getContext("2d"), d = c.getImageData(0, 0, a.width, a.height), e = d.data, f = e.length;
                for (h = new b.Color(this.color).getSource(), g = 0; g < f; g += 4)e[g] *= h[0] / 255, e[g + 1] *= h[1] / 255, e[g + 2] *= h[2] / 255;
                c.putImageData(d, 0, 0)
            },
            toObject: function () {
                return c(this.callSuper("toObject"), {color: this.color})
            }
        }), b.Image.filters.Multiply.fromObject = function (a) {
            return new b.Image.filters.Multiply(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric;
        b.Image.filters.Blend = b.util.createClass({
            type: "Blend", initialize: function (a) {
                a = a || {}, this.color = a.color || "#000", this.image = a.image || !1, this.mode = a.mode || "multiply", this.alpha = a.alpha || 1
            }, applyTo: function (a) {
                var f, g, h, i, j, k, l, c = a.getContext("2d"), d = c.getImageData(0, 0, a.width, a.height),
                    e = d.data, m = !1;
                if (this.image) {
                    m = !0;
                    var n = b.util.createCanvasElement();
                    n.width = this.image.width, n.height = this.image.height;
                    var o = new b.StaticCanvas(n);
                    o.add(this.image);
                    var p = o.getContext("2d");
                    l = p.getImageData(0, 0, o.width, o.height).data
                } else l = new b.Color(this.color).getSource(), f = l[0] * this.alpha, g = l[1] * this.alpha, h = l[2] * this.alpha;
                for (var q = 0, r = e.length; q < r; q += 4)switch (i = e[q], j = e[q + 1], k = e[q + 2], m && (f = l[q] * this.alpha, g = l[q + 1] * this.alpha, h = l[q + 2] * this.alpha), this.mode) {
                    case"multiply":
                        e[q] = i * f / 255, e[q + 1] = j * g / 255, e[q + 2] = k * h / 255;
                        break;
                    case"screen":
                        e[q] = 1 - (1 - i) * (1 - f), e[q + 1] = 1 - (1 - j) * (1 - g), e[q + 2] = 1 - (1 - k) * (1 - h);
                        break;
                    case"add":
                        e[q] = Math.min(255, i + f), e[q + 1] = Math.min(255, j + g), e[q + 2] = Math.min(255, k + h);
                        break;
                    case"diff":
                    case"difference":
                        e[q] = Math.abs(i - f), e[q + 1] = Math.abs(j - g), e[q + 2] = Math.abs(k - h);
                        break;
                    case"subtract":
                        var s = i - f, t = j - g, u = k - h;
                        e[q] = s < 0 ? 0 : s, e[q + 1] = t < 0 ? 0 : t, e[q + 2] = u < 0 ? 0 : u;
                        break;
                    case"darken":
                        e[q] = Math.min(i, f), e[q + 1] = Math.min(j, g), e[q + 2] = Math.min(k, h);
                        break;
                    case"lighten":
                        e[q] = Math.max(i, f), e[q + 1] = Math.max(j, g), e[q + 2] = Math.max(k, h)
                }
                c.putImageData(d, 0, 0)
            }
        }), b.Image.filters.Blend.fromObject = function (a) {
            return new b.Image.filters.Blend(a)
        }
    }("undefined" != typeof exports ? exports : this), function (a) {
        "use strict";
        var b = a.fabric || (a.fabric = {}), c = b.util.object.extend, d = b.util.object.clone, e = b.util.toFixed,
            f = b.StaticCanvas.supports("setLineDash");
        if (b.Text)return void b.warn("fabric.Text is already defined");
        var g = b.Object.prototype.stateProperties.concat();
        g.push("fontFamily", "fontWeight", "fontSize", "text", "textDecoration", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor", "useNative", "path"), b.Text = b.util.createClass(b.Object, {
            _dimensionAffectingProps: {
                fontSize: !0,
                fontWeight: !0,
                fontFamily: !0,
                textDecoration: !0,
                fontStyle: !0,
                lineHeight: !0,
                stroke: !0,
                strokeWidth: !0,
                text: !0
            },
            _reNewline: /\r?\n/,
            type: "text",
            fontSize: 40,
            fontWeight: "normal",
            fontFamily: "Times New Roman",
            textDecoration: "",
            textAlign: "left",
            fontStyle: "",
            lineHeight: 1.3,
            textBackgroundColor: "",
            path: null,
            useNative: !0,
            stateProperties: g,
            stroke: null,
            shadow: null,
            initialize: function (a, b) {
                b = b || {}, this.text = a, this.__skipDimension = !0, this.setOptions(b), this.__skipDimension = !1, this._initDimensions()
            },
            _initDimensions: function () {
                if (!this.__skipDimension) {
                    var a = b.util.createCanvasElement();
                    this._render(a.getContext("2d"))
                }
            },
            toString: function () {
                return "#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>'
            },
            _render: function (a) {
                "undefined" == typeof Cufon || this.useNative === !0 ? this._renderViaNative(a) : this._renderViaCufon(a)
            },
            _renderViaNative: function (a) {
                var c = this.text.split(this._reNewline);
                this._setTextStyles(a), this.width = this._getTextWidth(a, c), this.height = this._getTextHeight(a, c), this.clipTo && b.util.clipContext(this, a), this._renderTextBackground(a, c), this._translateForTextAlign(a), this._renderText(a, c), "left" !== this.textAlign && "justify" !== this.textAlign && a.restore(), this._renderTextDecoration(a, c), this.clipTo && a.restore(), this._setBoundaries(a, c), this._totalLineHeight = 0
            },
            _renderText: function (a, b) {
                a.save(), this._setShadow(a), this._setupFillRule(a), this._renderTextFill(a, b), this._renderTextStroke(a, b), this._restoreFillRule(a), this._removeShadow(a), a.restore()
            },
            _translateForTextAlign: function (a) {
                "left" !== this.textAlign && "justify" !== this.textAlign && (a.save(), a.translate("center" === this.textAlign ? this.width / 2 : this.width, 0))
            },
            _setBoundaries: function (a, b) {
                this._boundaries = [];
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = this._getLineWidth(a, b[c]), f = this._getLineLeftOffset(e);
                    this._boundaries.push({height: this.fontSize * this.lineHeight, width: e, left: f})
                }
            },
            _setTextStyles: function (a) {
                this._setFillStyles(a), this._setStrokeStyles(a), a.textBaseline = "alphabetic", this.skipTextAlign || (a.textAlign = this.textAlign), a.font = this._getFontDeclaration()
            },
            _getTextHeight: function (a, b) {
                return this.fontSize * b.length * this.lineHeight
            },
            _getTextWidth: function (a, b) {
                for (var c = a.measureText(b[0] || "|").width, d = 1, e = b.length; d < e; d++) {
                    var f = a.measureText(b[d]).width;
                    f > c && (c = f)
                }
                return c
            },
            _renderChars: function (a, b, c, d, e) {
                b[a](c, d, e)
            },
            _renderTextLine: function (a, b, c, d, e, f) {
                if (e -= this.fontSize / 4, "justify" !== this.textAlign)return void this._renderChars(a, b, c, d, e, f);
                var g = b.measureText(c).width, h = this.width;
                if (h > g)for (var i = c.split(/\s+/), j = b.measureText(c.replace(/\s+/g, "")).width, k = h - j, l = i.length - 1, m = k / l, n = 0, o = 0, p = i.length; o < p; o++)this._renderChars(a, b, i[o], d + n, e, f), n += b.measureText(i[o]).width + m; else this._renderChars(a, b, c, d, e, f)
            },
            _getLeftOffset: function () {
                return b.isLikelyNode ? 0 : -this.width / 2
            },
            _getTopOffset: function () {
                return -this.height / 2
            },
            _renderTextFill: function (a, b) {
                if (this.fill || this._skipFillStrokeCheck) {
                    this._boundaries = [];
                    for (var c = 0, d = 0, e = b.length; d < e; d++) {
                        var f = this._getHeightOfLine(a, d, b);
                        c += f, this._renderTextLine("fillText", a, b[d], this._getLeftOffset(), this._getTopOffset() + c, d)
                    }
                }
            },
            _renderTextStroke: function (a, b) {
                if (this.stroke && 0 !== this.strokeWidth || this._skipFillStrokeCheck) {
                    var c = 0;
                    a.save(), this.strokeDashArray && (1 & this.strokeDashArray.length && this.strokeDashArray.push.apply(this.strokeDashArray, this.strokeDashArray), f && a.setLineDash(this.strokeDashArray)), a.beginPath();
                    for (var d = 0, e = b.length; d < e; d++) {
                        var g = this._getHeightOfLine(a, d, b);
                        c += g, this._renderTextLine("strokeText", a, b[d], this._getLeftOffset(), this._getTopOffset() + c, d)
                    }
                    a.closePath(), a.restore()
                }
            },
            _getHeightOfLine: function () {
                return this.fontSize * this.lineHeight
            },
            _renderTextBackground: function (a, b) {
                this._renderTextBoxBackground(a), this._renderTextLinesBackground(a, b)
            },
            _renderTextBoxBackground: function (a) {
                this.backgroundColor && (a.save(), a.fillStyle = this.backgroundColor, a.fillRect(this._getLeftOffset(), this._getTopOffset(), this.width, this.height), a.restore())
            },
            _renderTextLinesBackground: function (a, b) {
                if (this.textBackgroundColor) {
                    a.save(), a.fillStyle = this.textBackgroundColor;
                    for (var c = 0, d = b.length; c < d; c++)if ("" !== b[c]) {
                        var e = this._getLineWidth(a, b[c]), f = this._getLineLeftOffset(e);
                        a.fillRect(this._getLeftOffset() + f, this._getTopOffset() + c * this.fontSize * this.lineHeight, e, this.fontSize * this.lineHeight)
                    }
                    a.restore()
                }
            },
            _getLineLeftOffset: function (a) {
                return "center" === this.textAlign ? (this.width - a) / 2 : "right" === this.textAlign ? this.width - a : 0
            },
            _getLineWidth: function (a, b) {
                return "justify" === this.textAlign ? this.width : a.measureText(b).width
            },
            _renderTextDecoration: function (a, b) {
                function e(e) {
                    for (var f = 0, g = b.length; f < g; f++) {
                        var h = d._getLineWidth(a, b[f]), i = d._getLineLeftOffset(h);
                        a.fillRect(d._getLeftOffset() + i, ~~(e + f * d._getHeightOfLine(a, f, b) - c), h, 1)
                    }
                }

                if (this.textDecoration) {
                    var c = this._getTextHeight(a, b) / 2, d = this;
                    this.textDecoration.indexOf("underline") > -1 && e(this.fontSize * this.lineHeight), this.textDecoration.indexOf("line-through") > -1 && e(this.fontSize * this.lineHeight - this.fontSize / 2), this.textDecoration.indexOf("overline") > -1 && e(this.fontSize * this.lineHeight - this.fontSize)
                }
            },
            _getFontDeclaration: function () {
                return [b.isLikelyNode ? this.fontWeight : this.fontStyle, b.isLikelyNode ? this.fontStyle : this.fontWeight, this.fontSize + "px", b.isLikelyNode ? '"' + this.fontFamily + '"' : this.fontFamily].join(" ")
            },
            render: function (a, b) {
                if (this.visible) {
                    a.save(), this._transform(a, b);
                    var c = this.transformMatrix, d = this.group && "path-group" === this.group.type;
                    d && a.translate(-this.group.width / 2, -this.group.height / 2), c && a.transform(c[0], c[1], c[2], c[3], c[4], c[5]), d && a.translate(this.left, this.top), this._render(a), a.restore()
                }
            },
            toObject: function (a) {
                var b = c(this.callSuper("toObject", a), {
                    text: this.text,
                    fontSize: this.fontSize,
                    fontWeight: this.fontWeight,
                    fontFamily: this.fontFamily,
                    fontStyle: this.fontStyle,
                    lineHeight: this.lineHeight,
                    textDecoration: this.textDecoration,
                    textAlign: this.textAlign,
                    path: this.path,
                    textBackgroundColor: this.textBackgroundColor,
                    useNative: this.useNative
                });
                return this.includeDefaultValues || this._removeDefaultValues(b), b
            },
            toSVG: function (a) {
                var b = [], c = this.text.split(this._reNewline), d = this._getSVGLeftTopOffsets(c),
                    e = this._getSVGTextAndBg(d.lineTop, d.textLeft, c), f = this._getSVGShadows(d.lineTop, c);
                return d.textTop += this._fontAscent ? this._fontAscent / 5 * this.lineHeight : 0, this._wrapSVGTextAndBg(b, e, f, d), a ? a(b.join("")) : b.join("")
            },
            _getSVGLeftTopOffsets: function (a) {
                var b = this.useNative ? this.fontSize * this.lineHeight : -this._fontAscent - this._fontAscent / 5 * this.lineHeight,
                    c = -(this.width / 2),
                    d = this.useNative ? this.fontSize - 1 : this.height / 2 - a.length * this.fontSize - this._totalLineHeight;
                return {
                    textLeft: c + (this.group && "path-group" === this.group.type ? this.left : 0),
                    textTop: d + (this.group && "path-group" === this.group.type ? this.top : 0),
                    lineTop: b
                }
            },
            _wrapSVGTextAndBg: function (a, b, c, d) {
                a.push('<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n', b.textBgRects.join(""), "<text ", this.fontFamily ? 'font-family="' + this.fontFamily.replace(/"/g, "'") + '" ' : "", this.fontSize ? 'font-size="' + this.fontSize + '" ' : "", this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "", this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "", this.textDecoration ? 'text-decoration="' + this.textDecoration + '" ' : "", 'style="', this.getSvgStyles(), '" ', 'transform="translate(', e(d.textLeft, 2), " ", e(d.textTop, 2), ')">', c.join(""), b.textSpans.join(""), "</text>\n", "</g>\n");
            },
            _getSVGShadows: function (a, c) {
                var f, g, d = [], h = 1;
                if (!this.shadow || !this._boundaries)return d;
                for (f = 0, g = c.length; f < g; f++)if ("" !== c[f]) {
                    var i = this._boundaries && this._boundaries[f] ? this._boundaries[f].left : 0;
                    d.push('<tspan x="', e(i + h + this.shadow.offsetX, 2), 0 === f || this.useNative ? '" y' : '" dy', '="', e(this.useNative ? a * f - this.height / 2 + this.shadow.offsetY : a + (0 === f ? this.shadow.offsetY : 0), 2), '" ', this._getFillAttributes(this.shadow.color), ">", b.util.string.escapeXml(c[f]), "</tspan>"), h = 1
                } else h++;
                return d
            },
            _getSVGTextAndBg: function (a, b, c) {
                var d = [], e = [], f = 1;
                this._setSVGBg(e);
                for (var g = 0, h = c.length; g < h; g++)"" !== c[g] ? (this._setSVGTextLineText(c[g], g, d, a, f, e), f = 1) : f++, this.textBackgroundColor && this._boundaries && this._setSVGTextLineBg(e, g, b, a);
                return {textSpans: d, textBgRects: e}
            },
            _setSVGTextLineText: function (a, c, d, f, g) {
                var h = this._boundaries && this._boundaries[c] ? e(this._boundaries[c].left, 2) : 0;
                d.push('<tspan x="', h, '" ', 0 === c || this.useNative ? "y" : "dy", '="', e(this.useNative ? f * c - this.height / 2 : f * g, 2), '" ', this._getFillAttributes(this.fill), ">", b.util.string.escapeXml(a), "</tspan>")
            },
            _setSVGTextLineBg: function (a, b, c, d) {
                a.push("<rect ", this._getFillAttributes(this.textBackgroundColor), ' x="', e(c + this._boundaries[b].left, 2), '" y="', e(d * b - this.height / 2, 2), '" width="', e(this._boundaries[b].width, 2), '" height="', e(this._boundaries[b].height, 2), '"></rect>\n')
            },
            _setSVGBg: function (a) {
                this.backgroundColor && this._boundaries && a.push("<rect ", this._getFillAttributes(this.backgroundColor), ' x="', e(-this.width / 2, 2), '" y="', e(-this.height / 2, 2), '" width="', e(this.width, 2), '" height="', e(this.height, 2), '"></rect>')
            },
            _getFillAttributes: function (a) {
                var c = a && "string" == typeof a ? new b.Color(a) : "";
                return c && c.getSource() && 1 !== c.getAlpha() ? 'opacity="' + c.getAlpha() + '" fill="' + c.setAlpha(1).toRgb() + '"' : 'fill="' + a + '"'
            },
            _set: function (a, b) {
                "fontFamily" === a && this.path && (this.path = this.path.replace(/(.*?)([^\/]*)(\.font\.js)/, "$1" + b + "$3")), this.callSuper("_set", a, b), a in this._dimensionAffectingProps && (this._initDimensions(), this.setCoords())
            },
            complexity: function () {
                return 1
            }
        }), b.Text.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" ")), b.Text.DEFAULT_SVG_FONT_SIZE = 16, b.Text.fromElement = function (a, c) {
            if (!a)return null;
            var d = b.parseAttributes(a, b.Text.ATTRIBUTE_NAMES);
            c = b.util.object.extend(c ? b.util.object.clone(c) : {}, d), "dx" in d && (c.left += d.dx), "dy" in d && (c.top += d.dy), "fontSize" in c || (c.fontSize = b.Text.DEFAULT_SVG_FONT_SIZE), c.originX || (c.originX = "left");
            var e = new b.Text(a.textContent, c), f = 0;
            return "left" === e.originX && (f = e.getWidth() / 2), "right" === e.originX && (f = -e.getWidth() / 2), e.set({
                left: e.getLeft() + f,
                top: e.getTop() - e.getHeight() / 2
            }), e
        }, b.Text.fromObject = function (a) {
            return new b.Text(a.text, d(a))
        }, b.util.createAccessors(b.Text)
    }("undefined" != typeof exports ? exports : this)
}.call({}, window, document, html2canvas);
