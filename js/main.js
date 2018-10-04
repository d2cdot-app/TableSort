(function() {
  'use strict';

  var ths = document.getElementsByTagName('th');//htmlからthを取得する
  var sortOrder = 1; // 1: 昇順、-1: 降順

  function rebuildTbody(rows) {//tbodyを再構築
    var tbody = document.querySelector('tbody');//tbodyの要素を取得
    var i;
    while (tbody.firstChild) {//tbodyの最初の子要素が有る限りtbodyの子要素を削除する
      tbody.removeChild(tbody.firstChild);//削除する要素は最初の子要素
    }
    for (i = 0; i < rows.length; i++) {//tbodyに並び替えられたrowsの要素を追加していく
      tbody.appendChild(rows[i]);//特定の親要素の中に要素を追加するメゾット・追加される場所は親要素の末尾
    }
  }

  function updateClassName(th) {//クリックされたth
    var k;
    for (k = 0; k < ths.length; k++) {//kがths.lengthより小さい間、kを増やしながら次のことをしなさい
      ths[k].className = '';//kのclassnameを空にする
    }
    th.className = sortOrder === 1 ? 'asc' : 'desc';
    //sortOrderが1であったら昇順という意味で”asc”そうでなかったら降順なので”desc”というclassnameがつく
  }

  function compare(a, b, col, type) {//tr,tr
    var _a = a.children[col].textContent;//aがtr要素なのでその子要素であるtd要素の内、クリックされた列番目のものを引っ張ってくる
    var _b = b.children[col].textContent;
    if (type === "number") {
      _a = _a * 1;//数値らしき文字列がきたらそれに1をかけてあげることで数値にしてくれる
      _b = _b * 1;//数値らしき文字列がきたらそれに1をかけてあげることで数値にしてくれる
    } else if (type === "string") {//渡ってきたものが”string”であった場合
      _a = _a.toLowerCase();//大文字も小文字にした上で比較する
      _b = _b.toLowerCase();//大文字も小文字にした上で比較する
    }
    if (_a < _b) {
      return -1;//sortOrderが−１であった場合は降順
    }
    if (_a > _b) {
      return 1;//sortOrderが１であった場合は昇順
    }
    return 0;
  }

  function sortRows(th) {//並び替えられた行要素を返す
    var rows = Array.prototype.slice.call(document.querySelectorAll('tbody > tr'));//NodeListを配列に変換している決まり文句
    var col = th.cellIndex;
    var type = th.dataset.type; // string, number
    rows.sort(function(a, b) { // sortしている
      return compare(a, b, col, type) * sortOrder;
    });
    return rows;
  }

  function setup() {
    var i;
    for (i = 0; i < ths.length; i++) {//iがrows.lengthより小さい間、iを増やしながら次のことをしなさい
      ths[i].addEventListener('click', function() {//thをクリックしたら
        var rows;
        rows = sortRows(this);
        rebuildTbody(rows);
        updateClassName(this);
        sortOrder *= -1;//クリックしたら反転させる
      });
    }
  }

  setup();

})();
