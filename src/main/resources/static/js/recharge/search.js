$(function () {
    var _csrf = $("[name=csrf-token]").attr("content");
    var _gameItem = $(".searchCon");
    var _searchGameItem = $(".searchGameCon");
    var _isA = true;
    var _storage = window.localStorage;
    var _gameHistory = 'gameHistory';
    var _searchData = 'searchData';
    var _ajax = null;
    var areaData = null;
    /*鎼滅储妗嗘父鎴忓悕*/
    $("#sGame").on("click", function () {
        $(".searchBoxDrop").hide();
        $(".gameBox").show();
        $(".searchBoxCon").show();

        var _gameH = _storage.getItem(_gameHistory);
        var _jHistory = eval('(' + _gameH + ')');
        var _hisConH = '';
        if (_jHistory) {
            var _hHis = '<span>鍘嗗彶閫夋嫨锛�</span>';
            var _conH = '';
            _jHistory.forEach(function (v, k) {
                _conH += '<a href="javascript:;" data-id="' + v.id + '" class="sGameName">' + v.name + '</a>';
            });
            _hisConH = _hHis + _conH;
        }
        $('.historyCon').html(_hisConH);

        var _con = _searchGameItem.html();
        if (!_con.trim()) {
            getHotGames(_searchGameItem);
        }
    });

    $(".hotGame").on("click", function () {
        $(".letterTab li a").removeClass("active");
        getHotGames(_searchGameItem);
    });

    $("#sType").on("click", function () {
        $(".searchBoxDrop").hide();
        $(".typeBox").show();
        var _gId = $('#sGame').attr("data-id");
        if (!_gId.trim()) {
            $(".searchBoxCon").hide();
            $(".goodsTypeBox").html('<div class="triangle"></div><div class="noSearch"><p class="noSearchText">涓轰簡鎮ㄧ殑鎼滅储缁撴灉鏇寸簿纭紝璇峰厛閫夋嫨娓告垙</p><p class="noSearchHref"><a href="javascript:;" class="choosegame" id="choosegame">閫夋嫨娓告垙</a></p></div>');
        } else {
            setGameType(_gId.trim());
        }
    });

    $("#sArea").on("click", function () {
        $(".searchBoxDrop").hide();
        $(".areaBox").show();
        var _gId = $('#sGame').attr("data-id");
        if (!_gId.trim()) {
            $(".searchBoxCon").hide();
            $(".noSearch").show();
        } else {
            $(".noSearch").hide();
            $(".searchBoxCon").show();
            getGameArea(_gId);
        }
    });

    $("#IOSCharge").mousemove(function () {
        $("#IOSChargeBox").show();
        var _con = _gameItem.html();
        if (!_con.trim() && _isA) {
            getAjax({_gameItem: _gameItem, _letter: 'A'});
            _isA = false;
        }
    }).mouseout(function () {
        $("#IOSChargeBox").hide();
    });

    $(".firstLetter").on("click", function () {
        var _letter = $(this).text();
        if (_letter.trim()) {
            getGameAjax(_searchGameItem, _letter);
        }
    });

    $(".letterTag").on("click", function () {
        var _letter = $(this).text();
        if (_letter.trim()) {
            getAjax({_gameItem: _gameItem, _letter: _letter});
        }
    });

    $(".searchGameBtn").on("click", function () {
        var _keywords = $('.searchGameName').val();
        if (_keywords.trim()) {
            getGameAjax(_searchGameItem, null, _keywords);
        }
    });
    $(document).keyup(function (event) {
        if (event.keyCode == 13) {
            $(".searchGameBtn").trigger("click");
        }
    });
    var searchAreaName = $('.searchAreaName'),
        areaCon = $('.areaCon');
    $(".searchAreaBtn").on("click", function () {
        var _keywords = searchAreaName.val().trim(),
            _html = '';
        areaData.forEach(function (value, index) {
            if (value.trim().indexOf(_keywords) != -1) {
                _html += '<div class="lf option"><span class="leftCurrent"></span><a href="javascript:;" class="sGameArea" id=area_' + index + ' data-id="' + index + '" data-server="' + value + '">' + value + '</a></div>';
            }
        });
        areaCon.html(_html);
    });

    $(".iosSearch").on("click", function () {
        var _keywords = $('.iosWords').val();
        if (_keywords.trim()) {
            getAjax({_gameItem: _gameItem, _letter: null, _keywords: _keywords});
            $('.letterTag').removeClass("active");
        }
    });
    $(document).keyup(function (event) {
        if (event.keyCode == 13) {
            $(".iosSearch").trigger("click");
        }
    });
    //娓告垙鍚嶅瓧鐐瑰嚮
    $(document).on('click', '.sGameName', function (e) {
        var _gameId = $(this).attr('data-id');
        $(".option a").removeClass("optionActive");
        $('#game_' + _gameId).addClass('optionActive');
        var _gameName = $('#game_' + _gameId).text();
        $("#sGame").text(_gameName);
        $("#sGame").attr("data-id", _gameId);
        $(".searchBoxDrop").hide();
        $(".typeBox").show();

        var _gameN = '[{"id":' + _gameId + ',"name":"' + _gameName + '"}]';
        var _s = eval('(' + _gameN + ')');
        var _gameH = _storage.getItem(_gameHistory);
        var _j = eval('(' + _gameH + ')');
        if (_j) {
            var _t = '';
            var _isC = false;
            _j.forEach(function (v, k) {
                if (v.id == _gameId) {
                    _isC = true;
                    _j.splice(k, 1);
                }
            });
            if (!_isC) {
                _j.splice(0, 0, _s[0]);
            } else {
                _j.unshift(_s[0]);
            }
            if (_j.length > 5) {
                _j.splice(5, 1);
            }
        } else {
            _j = _s;
        }
        _storage.setItem(_gameHistory, JSON.stringify(_j));

        setGameType(_gameId);
    });

    function setGameType(_gameId) {
        $.ajax({
            url: '/games/gametype.html',
            type: 'post',
            data: {id: _gameId, _csrf: _csrf},
            async: false,
            success: function (data) {
                var _noFindHtml = '<div class="triangle"></div><div class="searchBoxCon"><div class="searchBoxTitle"><span></span><a href="javascript:;" class="whole">鍏ㄩ儴</a><div class="rt"><a href="#" class="noFind lf">鎵句笉鍒帮紵</a><span class="closeButton"></span></div></div>';
                var _headDiv = '<div class="searchSection">';
                var _ulHHtml = '<div class="tab">';
                var rest = eval('(' + data + ')');
                var _uhtml = '';
                var _ulFHtml = '</div>';

                var _conHtml = '';
                if (rest) {
                    rest.forEach(function (value, index) {
                        var _conDiv = '<div class="goodsTypeInfo">';
                        var _hcon = '';
                        _uhtml = '<a href="javascript:;" class="sGoodsType goodsTypeTitle" id=type_' + value.key + '_' + value.id + ' data-k="' + value.key + '" data-id="' + value.id + '" data-val="' + value.data.val + '">' + value.data.name + '</a>';
                        _hcon += '<div class="tabCon">';
                        var _con = '';
                        if (value.child) {
                            value.child.forEach(function (items, key) {
                                _con += '<div class="lf option"><span class="leftCurrent"></span><a href="javascript:;" class="sGoodsType optionlist" id=type_' + items.key + '_' + items.id + ' data-k="' + items.key + '" data-id="' + items.id + '" data-val="' + items.data.val + '">' + items.data.name + '</a></div>';
                            });
                        }
                        var _fcon = '</div>';
                        var _confDiv = '</div>';
                        _conHtml += _conDiv + _uhtml + _hcon + _con + _fcon + _confDiv;
                    });
                }
                var _footDiv = '</div></div>';
                var _str = _noFindHtml + _headDiv + _ulHHtml + _conHtml + _ulFHtml + _footDiv;
                $(".goodsTypeBox").html(_str);
                $(".searchBoxCon").show();
            }
        }, "json");
    }

    $(document).on('click', '.sGoodsType', function (e) {
        var _tId = $(this).attr('data-id');
        var _tVul = $(this).attr('data-val');
        var _tKey = $(this).attr('data-k');
        var _gameId = $('#sGame').attr('data-id');
        $(".option .sGoodsType ").removeClass("optionActive");
        $('#type_' + _tKey + '_' + _tId).addClass('optionActive');
        $("#sType").text($('#type_' + _tKey + '_' + _tId).text());
        $("#sType").attr("data-id", _tId);
        $("#sType").attr("data-k", _tKey);
        $("#sType").attr("data-v", _tVul);
        $(".searchBoxDrop").hide();
        $(".areaBox").show();
        $(".noSearch").hide();
        getGameArea(_gameId);
    });

    $(document).on('click', '.whole', function (e) {
        $("#sType").text($(this).text());
        $(".searchBoxDrop").hide();
        $(".areaBox").show();
    });

    $(document).on('click', '.sGameArea', function (e) {
        var _aServer = $(this).attr('data-server');
        var _aId = $(this).attr('data-id');
        $(".option a").removeClass("optionActive");
        $('#area_' + _aId).addClass('optionActive');
        $("#sArea").text($('#area_' + _aId).text());
        $("#sArea").attr("data-server", _aServer);
        $(".searchBoxDrop").hide();
    });
    $(".gold").on("click", function () {
        $("#sArea").text($(this).text());
        $(".searchBoxDrop").hide();
    });
    /*tabs*/
    $(document).on('mouseover click', '.tab li', function (e) {
        var $this = $(this);
        var $t = $this.index();
        $(".tab li").removeClass();
        $this.addClass('current');
        $(".content .tabCon").css('display', 'none');
        $(".content .tabCon").eq($t).css('display', 'block');
    });

    $(document).on('click', '.searchBoxTitle .closeButton', function (e) {
        $(".searchBoxDrop").hide();
    });

    $(document).on('click', '#choosegame', function (e) {
        $(".searchBoxDrop").hide();
        $(".searchBoxCon").show();
        $(".noSearch").hide();
        $(".gameBox").show();
        var _con = _searchGameItem.html();
        if (!_con.trim()) {
            getHotGames(_searchGameItem);
        }
    });

    function getHotGames(_searchGameItem) {
        $.ajax({
            url: '/games/ajax.html',
            type: 'post',
            data: {type: 1, limit: 'all', _csrf: _csrf},
            async: false,
            success: function (data) {
                sGameCallBack(data, _searchGameItem);
            }
        }, "json");
    }

    function getGameArea(_gameId, _keywords = null) {
        $.ajax({
            url: '/games/gamearea.html',
            type: 'post',
            data: {gameId: _gameId, keywords: _keywords, _csrf: _csrf},
            async: false,
            success: function (data) {
                var _html = '';
                var rest = eval('(' + data + ')');
                areaData = rest;
                if (rest != null) {
                    rest.forEach(function (value, index) {
                        if (value.trim()) {
                            _html += '<div class="lf option"><span class="leftCurrent"></span><a href="javascript:;" class="sGameArea" id=area_' + index + ' data-id="' + index + '" data-server="' + value + '">' + value + '</a></div>';
                        }
                    });
                }
                $('.areaCon').html(_html);
            }
        }, "json");
    }

    function getGameAjax(_gameItem, _letter = null, _keywords = null, _type = null) {
        $.ajax({
            url: '/games/precharge.html',
            type: 'post',
            data: {type: _type, letter: _letter, keywords: _keywords, _csrf: _csrf},
            async: false,
            success: function (data) {
                sGameCallBack(data, _gameItem);
            }
        }, "json");
    }

    function getAjax(parameters) {
        var _gameItem = parameters._gameItem;
        var _letter = parameters._letter;
        var _keywords = parameters._keywords;
        var _type = parameters._type;
        $.ajax({
            url: '/games/precharge.html',
            type: 'post',
            data: {type: _type, letter: _letter, keywords: _keywords, _csrf: _csrf},
            async: false,
            success: function (data) {
                sCallBack(data, _gameItem);
            }
        }, "json");
    }

    //鏁版嵁鍥炶皟
    function sGameCallBack(data, _gameItem) {
        var _html = '';
        var rest = eval('(' + data + ')');
        if (JSON.parse(data).length == 0) {
            _html += '<p class="noLetterBox">娌℃湁鎼滅储鍒扮浉鍏虫父鎴�</p>'
        }
        rest.forEach(function (value, index) {
            _html += '<div class="lf option"><span class="leftCurrent"></span><a href="javascript:;" class="sGameName" id=game_' + value.game_id + ' data-id="' + value.game_id + '">' + value.game_name + '</a></div>';
        });
        _gameItem.html(_html);
    }

    //鏁版嵁鍥炶皟
    function sCallBack(data, _gameItem) {
        var _html = '';
        var rest = eval('(' + data + ')');
        if (JSON.parse(data).length == 0) {
            _html += '<p class="noLetterBox">娌℃湁鎼滅储鍒扮浉鍏虫父鎴�</p>'
        }
        rest.forEach(function (value, index) {
            _html += '<div class="lf option"><span class="leftCurrent"></span><a href="/goods-' + value.game_id + '.html">' + value.game_name + '</a></div>';
        });
        _gameItem.html(_html);
    }

    $(document).keyup(function (event) {
        if (event.keyCode == 13) {
            $("#searchBut").trigger("click");
        }
    });
    $(document).on('click', '#searchBut', function (e) {
        var _gameId = $('#sGame').attr('data-id');
        var _gameName = $('#sGame').text();
        var _gameTypeV = $('#sType').attr('data-v');
        var _gameTypeK = $('#sType').attr('data-k');
        var _gameArea = $('#sArea').attr('data-server');
        var _keyW = $('#searchInput').val();
        var _url = '';

        if (!_gameId.trim() && _keyW.trim()) {
            _url = "/games.html?keywords=" + _keyW.trim();
        }
        if (_gameId.trim() && (!_gameTypeV.trim() || !_gameArea.trim()) && !_keyW.trim()) {
            _url = "/games.html?keywords=" + _gameName.trim();
        }
        if (_gameId.trim() && (!_gameTypeV.trim() || !_gameArea.trim()) && _keyW.trim()) {
            _url = '/goods-' + _gameId + '.html?keywords=' + _keyW.trim();
        }
        if (_gameId.trim() && (_gameTypeV.trim() || _gameArea.trim())) {
            //_url = '/goods-' + _gameId + '.html?keywords=' + _keyW.trim() + '&' + _gameTypeK + '=' + _gameTypeV + '&aid=' + _gameArea;
            _url = '/goods-' + _gameId + '--1--1--1--1--1' + (_gameArea.trim() ? '-' + _gameArea : '') + '.html' + (_keyW.trim() ? '?keywords=' + _keyW.trim() : '');
            if (_gameTypeK === 'pid') {
                _url = '/goods-' + _gameId + '--1' + (_gameTypeV === '-1' ? _gameTypeV : '-' + _gameTypeV) + '--1--1--1' + (_gameArea.trim() ? '-' + _gameArea : '') + '.html' + (_keyW.trim() ? '?keywords=' + _keyW.trim() : '');
            }
            if (_gameTypeK === 'gid') {
                _url = '/goods-' + _gameId + '--1--1' + (_gameTypeV === '-1' ? _gameTypeV : '-' + _gameTypeV) + '--1--1' + (_gameArea.trim() ? '-' + _gameArea : '') + '.html' + (_keyW.trim() ? '?keywords=' + _keyW.trim() : '');
            }
        }
        var _gName = '', _gId = '';
        if (_gameId.trim()) {
            _gName = _gameName.trim();
            _gId = _gameId;
        }
        var _tName = '';
        if (_gameTypeV.trim()) {
            _tName = $('#sType').text();
        }
        var _aName = '';
        if (_gameArea.trim()) {
            _aName = _gameArea;
        }
        var _kName = '';
        if (_keyW.trim()) {
            _kName = _keyW.trim();
        }
        if (_url != '') {
            var _t = _gName + ' - ' + _tName + ' - ' + _aName + ' - ' + _kName;
            var _search = '[{"title":"' + _t + '","url":"' + _url + '","gameId":"' + _gId + '"}]';
            var _s = eval('(' + _search + ')');
            _storage.setItem(_searchData, JSON.stringify(_s));
            window.location.href = _url;
        }
    });

    $(document).on('click', '.noFind', function (e) {
        $(".nofindBox").show();
    });

    $(".addClose").on("click", function () {
        $(".nofindBox").hide();
    });

    $(document).on('click', '.confirmSubmitBtn', function (e) {
        var _gameName = $('.facdbackGameName').val();
        var _serviceName = $('.gameServiceName').val();
        var _type = '', _selecType = '';
        $("#noFindForm :input[name='terminalType']:checked").each(function (i, dom) {
            _type = $(this).val();
        });
        $("#noFindForm :input[name='selecType']:checked").each(function (i, dom) {
            _selecType = $(this).val();
        });
        if (_gameName.trim() && _serviceName.trim() && _type.trim() && _selecType.trim()) {
            if (_ajax) _ajax.abort();
            var _con = _type.trim() + '-' + _selecType.trim() + '-' + _gameName.trim() + '-' + _serviceName.trim();
            _ajax = $.ajax({
                url: '/suggest.html',
                data: {title: '鏈壘鍒版父鎴忕敤鎴峰弽棣�', content: _con, src: 5, _csrf: _csrf},
                type: 'post',
                async: false,
                timeout: 1000,
                success: function (data) {
                    alert(data.msg);
                    location.reload();
                },
                error: function () {
                    alert("缃戠粶寮傚父!");
                }
            }, "json");
        } else {
            alert("鍙嶉淇℃伅涓嶅畬鏁�");
        }
    });
});