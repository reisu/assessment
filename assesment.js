'use strict'
const userNameInput = document.getElementById('user-name');
const assesmentButton = document.getElementById('assesment');
const resultDevided = document.getElementById('result-area');
const tweetDevided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供を全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
 }

 userNameInput.onkeydown = (event) => {
  if(event.key === 'Enter'){
   assesmentButton.onclick();
  }
};

 assesmentButton.onclick = () => {
 const userName = userNameInput.value;
 if(userName.length === 0){
   return;
 };

 console.log(userName);

 //診断結果表示エリアの作成--------------------------------
removeAllChildren(resultDevided);

 const header = document.createElement('h3');
 header.innerText = '診断結果';
 resultDevided.appendChild(header);

 const paragraph = document.createElement('p');
 const result = assesment(userName);
 paragraph.innerText = result;
 resultDevided.appendChild(paragraph);

 //ツイートエリアの作成------------------------------------
 removeAllChildren(tweetDevided);
 const anchor = document.createElement('a');
 const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
 + encodeURIComponent('あなたのオードリー') 
 + '&ref_src=twsrc%5Etfw';
 anchor.setAttribute('href', hrefValue);
 anchor.className = 'twitter-hashtag-button';
 anchor.setAttribute('data-text', result);
 anchor.innerText = 'Tweet #あなたのオードリー';
 tweetDevided.appendChild(anchor);

 //widgets.jsの設定----------------------------------------
 const script = document.createElement('script');
 script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
 tweetDevided.appendChild(script);

};



const answers = [
  '{Username}の憧れのオードリーは"ともり成人の儀"です。',
  '{Username}の憧れのオードリーは"無理ですブロッコリー"です。',
  '{Username}の憧れのオードリーは"オオイヌノフグリ"です。',
  '{Username}の憧れのオードリーは"函館で食うウニ"です。',
  '{Username}の憧れのオードリーは"炬燵でかき氷"です。',
  '{Username}の憧れのオードリーは"メチャ食べるまゆち"です。',
  '{Username}の憧れのオードリーは"ついてたよ芋けんぴ"です。',
  '{Username}の憧れのオードリーは"筋肉もりもり"です。',
  '{Username}の憧れのオードリーは"ならばすぐリコー通り"です。',
  '{Username}の憧れのオードリーは"趣味はPUBG"です。',
  '{Username}の憧れのオードリーは"ピルクルがぶ飲み"です。',
  '{Username}の憧れのオードリーは"お揃いの割烹着"です。',
  '{Username}の憧れのオードリーは"エママちゃんの子守り"です。',
  '{Username}の憧れのオードリーは"渡辺の手料理"です。',
  '{Username}の憧れのオードリーは"ありがとうの気持ち"です。',
  '{Username}の憧れのオードリーは"競馬場でも呑み"です。',
  '{Username}の憧れのオードリーは"また武蔵野の森"です。',
  '{Username}の憧れのオードリーは"ほらみろ思い通り"です。',
  '{Username}の憧れのオードリーは"ならばすぐに行動に"です。',
  '{Username}の憧れのオードリーは"ハタチだねともり"です。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assesment(userName){
  let sumOfCharCode = 0;
  for(let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replace(/\{Username\}/g, userName);
  return result;
}

console.assert(
  assesment('太郎') === assesment('太郎'),
  '同じ入力値で異なった値が返されました。'
);
