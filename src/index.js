import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する //
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // p生成
  const p = document.createElement("p");
  p.innerText = text;

  //button(完了)生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 完了リストに追加する要素
    const addTarget = completeButton.parentNode;

    // TODO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;

    // div以下を初期化
    addTarget.textContent = null;

    // p生成
    const p = document.createElement("p");
    p.innerText = text;

    // button生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ(li)を完了リストから削除
      const deleteTarget = addTarget.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    // liタグ配下のHTML階層設定
    addTarget.appendChild(p);
    addTarget.appendChild(backButton);

    // 押された完了ボタンの親タグliタグを未完了リストから削除
    deleteFromIncompleteList(div.parentNode);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(div.parentNode);
  });

  //button(削除)生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 削除ボタンのliタグを未完了リストから削除
    deleteFromIncompleteList(div.parentNode);
  });

  // liタグ配下のHTML階層設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

/** 関数化のコツ
 * 共通化できる部分は関数化して、条件が異なる部分に引数を渡す
 */
