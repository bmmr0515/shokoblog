import { QuizQuestion, QuizDifficulty, QuizRank, RankInfo } from "@/types/quiz";

export const QUIZ_RANKS: RankInfo[] = [
  {
    rank: "god",
    title: "しょこら神",
    minScore: 10,
    maxScore: 10,
    badge: "GOD",
    message: "パーフェクト達成！瀧脇笙古ちゃんへの愛と知識はまさに神の領域です！全問正解おめでとうございます！",
    color: "#E99A32",
    bgColor: "#FFF4C7",
  },
  {
    rank: "master",
    title: "しょこらマスター",
    minScore: 9,
    maxScore: 9,
    badge: "MASTER",
    message: "驚異の9問正解！細かい活動の軌跡まで熟知しているトップクラスのしょこらファンです！",
    color: "#D97706",
    bgColor: "#FEF3C7",
  },
  {
    rank: "doctor",
    title: "しょこら博士",
    minScore: 7,
    maxScore: 8,
    badge: "DOCTOR",
    message: "素晴らしい成績！笙古ちゃんの魅力を深く理解している頼もしいしょこら博士です！",
    color: "#F59E0B",
    bgColor: "#FFFBEB",
  },
  {
    rank: "researcher",
    title: "しょこら研究員",
    minScore: 5,
    maxScore: 6,
    badge: "RESEARCHER",
    message: "ナイスチャレンジ！半分以上正解の好成績。これからも笙古ちゃんの活躍を一緒に追いかけましょう！",
    color: "#8C694D",
    bgColor: "#FFF9ED",
  },
  {
    rank: "apprentice",
    title: "しょこら見習い",
    minScore: 3,
    maxScore: 4,
    badge: "APPRENTICE",
    message: "健闘しました！このサイトの記事や動画をチェックすれば、もっともっと笙古ちゃんの魅力が見つかります！",
    color: "#5C4533",
    bgColor: "#FDF8F0",
  },
  {
    rank: "beginner",
    title: "しょこら初心者",
    minScore: 0,
    maxScore: 2,
    badge: "BEGINNER",
    message: "挑戦ありがとうございます！瀧脇笙古ちゃんの沼へようこそ。まずはプロフィールやHISTORYを見てみてくださいね！",
    color: "#78716C",
    bgColor: "#F5F5F4",
  },
];

export function getRankInfo(score: number): RankInfo {
  if (score >= 10) return QUIZ_RANKS[0];
  if (score === 9) return QUIZ_RANKS[1];
  if (score >= 7) return QUIZ_RANKS[2];
  if (score >= 5) return QUIZ_RANKS[3];
  if (score >= 3) return QUIZ_RANKS[4];
  return QUIZ_RANKS[5];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // 初級（easy）: 31問
  // =========================================================================
  {
    id: "easy-01",
    difficulty: "easy",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "瀧脇笙古さんの出身地はどこでしょう？",
    options: ["東京都", "神奈川県", "千葉県", "埼玉県"],
    correctAnswer: "神奈川県",
    explanation: "瀧脇笙古さんは神奈川県（横浜市）出身です。地元・横浜を深く愛しており、横浜スタジアムや横浜散策などの発信を数多く行っています。",
    sourceUrl: "https://equal-love.jp/feature/takiwaki_shoko"
  },
  {
    id: "easy-02",
    difficulty: "easy",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "瀧脇笙古さんの誕生日はいつでしょう？",
    options: ["5月15日", "7月9日", "8月20日", "10月11日"],
    correctAnswer: "7月9日",
    explanation: "瀧脇笙古さんの誕生日は2001年7月9日です。星座はかに座です。",
    sourceUrl: "https://equal-love.jp/feature/takiwaki_shoko"
  },
  {
    id: "easy-03",
    difficulty: "easy",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "瀧脇笙古さんの血液型は何型でしょう？",
    options: ["A型", "B型", "O型", "AB型"],
    correctAnswer: "O型",
    explanation: "瀧脇笙古さんの血液型はO型です。",
    sourceUrl: "https://equal-love.jp/feature/takiwaki_shoko"
  },
  {
    id: "easy-04",
    difficulty: "easy",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "瀧脇笙古さんの公式プロフィールに記載されている身長は何cmでしょう？",
    options: ["152cm", "158cm", "163cm", "168cm"],
    correctAnswer: "158cm",
    explanation: "瀧脇笙古さんの身長は158cmです。スタイルが良く、ランニングやファッションモデル（FILA等）でも映える抜群のプロポーションを誇ります。",
    sourceUrl: "https://equal-love.jp/feature/takiwaki_shoko"
  },
  {
    id: "easy-05",
    difficulty: "easy",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "ファンやメンバーから呼ばれている、瀧脇笙古さんの最も親しまれている愛称はどれでしょう？",
    options: ["しょこちゃん", "わっきー", "たっきー", "しょこたん"],
    correctAnswer: "しょこちゃん",
    explanation: "最も広く親しまれている公式愛称は「しょこちゃん」です。",
    sourceUrl: "https://equal-love.jp/feature/takiwaki_shoko"
  },
  {
    id: "easy-06",
    difficulty: "easy",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "ライブ等で使用される瀧脇笙古さんのサイリウム（ペンライト）カラーの組み合わせは何色でしょう？",
    options: ["ピンク × ホワイト", "イエロー × オレンジ", "ブルー × イエロー", "レッド × オレンジ"],
    correctAnswer: "イエロー × オレンジ",
    explanation: "瀧脇笙古さんのサイリウムカラーは「イエロー×オレンジ」のビタミンカラーです。客席がこの2色に染まると温かい光景が広がります。",
    sourceUrl: "https://equal-love.jp/feature/takiwaki_shoko"
  },
  {
    id: "easy-07",
    difficulty: "easy",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "瀧脇笙古さんが所属している女性アイドルグループの名称は何でしょう？",
    options: ["＝LOVE", "≠ME", "≒JOY", "乃木坂46"],
    correctAnswer: "＝LOVE",
    explanation: "指原莉乃プロデュース、代々木アニメーション学院所属の女性アイドルグループ「＝LOVE（イコールラブ）」の結成当初からの正規メンバーです。",
    sourceUrl: "https://equal-love.jp/"
  },
  {
    id: "easy-08",
    difficulty: "easy",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "瀧脇笙古さんが「東京マラソン2023」で達成した、市民ランナーにとって大きな勲章である快挙は何でしょう？",
    options: ["サブ3達成", "サブ4達成（4時間切り）", "女子総合1位", "ハーフマラソン優勝"],
    correctAnswer: "サブ4達成（4時間切り）",
    explanation: "東京マラソン2023にて「3時間57分06秒」を記録し、見事にサブ4（4時間切り）を達成しました。現役女性アイドルとしては極めて異例の快挙です。",
    sourceUrl: "https://equal-love.jp/news/list/4"
  },
  {
    id: "easy-09",
    difficulty: "easy",
    category: "cooking",
    categoryLabel: "料理",
    question: "瀧脇笙古さんが料理の腕前を競う企画で初代王者に輝いた大会の名称は何でしょう？",
    options: ["クックアイドルNo.1決定戦", "アイドル料理王GP", "イコラブ家庭科グランプリ", "全国シェフバトル"],
    correctAnswer: "クックアイドルNo.1決定戦",
    explanation: "料理レシピサービス「cookpad」のクックパッドLiveで開催された「クックアイドルNo.1決定戦」にて見事優勝を果たし、初代クックアイドルNo.1の栄冠を勝ち取りました。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "easy-10",
    difficulty: "easy",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "瀧脇笙古さんが大ファンであることを公言し、熱烈に応援しているプロ野球球団はどこでしょう？",
    options: ["阪神タイガース", "読売ジャイアンツ", "横浜DeNAベイスターズ", "東京ヤクルトスワローズ"],
    correctAnswer: "横浜DeNAベイスターズ",
    explanation: "地元球団である横浜DeNAベイスターズの大ファンで、足繁く横浜スタジアムに通い、仕事やメディアでもベイスターズ愛を熱く発信しています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "easy-11",
    difficulty: "easy",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "フジテレビONEで放送されているプロ野球専門番組で、瀧脇笙古さんが木曜MCを担当している長寿番組は何でしょう？",
    options: ["プロ野球ニュース", "熱血！タイガース党", "ベースボールLIVE", "すぽると！"],
    correctAnswer: "プロ野球ニュース",
    explanation: "フジテレビONEの歴史ある長寿スポーツニュース番組『プロ野球ニュース』にて、木曜日のMCとして出演しています。",
    sourceUrl: "https://equal-love.jp/schedule/"
  },
  {
    id: "easy-12",
    difficulty: "easy",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "＝LOVEの9thシングル『ウィークエンドシトロン』のカップリング曲で、瀧脇笙古さんが自身初の単独センターを務めた楽曲は何でしょう？",
    options: ["BPM170の君へ", "笑顔のレシピ", "木漏れ日メゾフォルテ", "記憶のどこかで"],
    correctAnswer: "BPM170の君へ",
    explanation: "『BPM170の君へ』は、特技であるマラソン・ランニングをテーマに制作された楽曲で、瀧脇笙古さんが自身初となる単独センターを担当しました。",
    sourceUrl: "https://equal-love.jp/discography/detail/40/"
  },
  {
    id: "easy-13",
    difficulty: "easy",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "＝LOVEの楽曲で、瀧脇笙古さんが音嶋莉沙さんとダブルセンターを務めた爽やかな楽曲は何でしょう？",
    options: ["木漏れ日メゾフォルテ", "流星エスケープ", "夏祭り恋慕う", "知らんけど"],
    correctAnswer: "木漏れ日メゾフォルテ",
    explanation: "音嶋莉沙ちゃんと瀧脇笙古さんの2人がダブルセンターを務めた楽曲が『木漏れ日メゾフォルテ』です。",
    sourceUrl: "https://equal-love.jp/discography/"
  },
  {
    id: "easy-14",
    difficulty: "easy",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "サンケイスポーツ特別版のタブロイド紙「BAY☆スタ」で、瀧脇笙古さんが連載しているベイスターズ応援コラムのタイトルは何でしょう？",
    options: ["BAYSTARS=LOVE", "しょこのハマスタ日記", "熱烈！ベイスターズ愛", "I☆YOKOHAMA by SHOKO"],
    correctAnswer: "BAYSTARS=LOVE",
    explanation: "サンスポ特別版「BAY☆スタ」にて、瀧脇笙古さんは連載コラム『BAYSTARS=LOVE』を執筆しており、2026年11月発売の第43号で15回目を迎えました。",
    sourceUrl: "https://equal-love.jp/news/detail/12406"
  },
  {
    id: "easy-15",
    difficulty: "easy",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "2020年末に放送されたTBSの大型スポーツ・アトラクション特番に瀧脇笙古さんが出場しました。その番組は何でしょう？",
    options: ["SASUKE", "スポーツマンNo.1決定戦", "KUNOICHI", "究極の男は誰だ！？"],
    correctAnswer: "SASUKE",
    explanation: "2020年12月29日放送のTBS『SASUKE2020』に出場し、1stステージの難関エリアに果敢に挑戦しました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "easy-16",
    difficulty: "easy",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "2026年秋、瀧脇笙古さんが2026FWシーズンのスタイリングパートナーに就任したグローバルスポーツファッションブランドはどこでしょう？",
    options: ["FILA", "adidas", "PUMA", "New Balance"],
    correctAnswer: "FILA",
    explanation: "2026年、スポーツファッションブランド「FILA（フィラ）」の2026FWスタイリングパートナーに就任し、ポップアップイベントや特集動画に出演しました。",
    sourceUrl: "https://shokoblog.vercel.app/articles"
  },
  {
    id: "easy-17",
    difficulty: "easy",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "2026年11月、＝LOVEが結成以来の悲願であった年末国民的番組への初出場を決めました。その番組は何でしょう？",
    options: ["第77回NHK紅白歌合戦", "日本レコード大賞", "CDTV年越しプレミアライブ", "FNS歌謡祭"],
    correctAnswer: "第77回NHK紅白歌合戦",
    explanation: "2026年11月13日、＝LOVEが『第77回NHK紅白歌合戦』への初出場を決定。初出場歌手発表記者会見には瀧脇笙古さんも登壇しました。",
    sourceUrl: "https://equal-love.jp/news/detail/12408"
  },
  {
    id: "easy-18",
    difficulty: "easy",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEをプロデュースしているタレント・クリエイターは誰でしょう？",
    options: ["指原莉乃", "秋元康", "つんく♂", "前田敦子"],
    correctAnswer: "指原莉乃",
    explanation: "＝LOVEは、代々木アニメーション学院と指原莉乃さんがタッグを組んで結成されたアイドルグループです。",
    sourceUrl: "https://equal-love.jp/"
  },
  {
    id: "easy-19",
    difficulty: "easy",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "2027年1月に＝LOVEが単独コンサート「全ては＝LOVE」を開催する夢の会場はどこでしょう？",
    options: ["東京ドーム", "日本武道館", "日産スタジアム", "さいたまスーパーアリーナ"],
    correctAnswer: "東京ドーム",
    explanation: "2027年1月19日・20日、＝LOVE結成以来最大の目標であった「東京ドーム」での単独公演『＝LOVE in TOKYO DOME「全ては＝LOVE」』が開催されます。",
    sourceUrl: "https://equal-love.jp/news/detail/12299"
  },
  {
    id: "easy-20",
    difficulty: "easy",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "瀧脇笙古さんが横浜スタジアムのマウンドに立ち、見事なノーバウンド投球などを披露したイベントは何でしょう？",
    options: ["セレモニアルピッチ（始球式）", "ホームランダービー", "選手インタビューMC", "スタジアムDJ"],
    correctAnswer: "セレモニアルピッチ（始球式）",
    explanation: "横浜スタジアムで開催されたベイスターズ公式戦において、セレモニアルピッチ（始球式）を務め、熱いベイスターズファンとしても球場を沸かせました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "easy-21",
    difficulty: "easy",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEの最終オーディションが行われ、瀧脇笙古さんが合格した年は西暦何年でしょう？",
    options: ["2015年", "2017年", "2019年", "2021年"],
    correctAnswer: "2017年",
    explanation: "2017年4月29日に最終オーディションが行われ、＝LOVEが結成されました。",
    sourceUrl: "https://equal-love.jp/"
  },
  {
    id: "easy-22",
    difficulty: "easy",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "瀧脇笙古さんの公式X（旧Twitter）のユーザー名（ID）はどれでしょう？",
    options: ["@shoko_takiwaki", "@takiwaki_shoko", "@equal_shoko", "@shoko_equal_love"],
    correctAnswer: "@shoko_takiwaki",
    explanation: "公式Xアカウントは「@shoko_takiwaki」です。Instagramは「@takiwaki_shoko_」です。",
    sourceUrl: "https://x.com/shoko_takiwaki"
  },
  {
    id: "easy-23",
    difficulty: "easy",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "2017年9月6日に発売された、＝LOVEの記念すべきメジャーデビューシングルのタイトルは何でしょう？",
    options: ["=LOVE", "僕らの制服クリスマス", "手遅れcaution", "探せ ダイヤモンドリリー"],
    correctAnswer: "=LOVE",
    explanation: "グループ名を冠したデビューシングル『=LOVE』でメジャーデビューを果たしました。",
    sourceUrl: "https://equal-love.jp/discography/"
  },
  {
    id: "easy-24",
    difficulty: "easy",
    category: "cooking",
    categoryLabel: "料理",
    question: "瀧脇笙古さんがSNSや配信でよく披露する、自身の大きな強み・特技である家事分野は何でしょう？",
    options: ["料理・スイーツ作り", "DIY・日曜大工", "編み物", "陶芸"],
    correctAnswer: "料理・スイーツ作り",
    explanation: "オムライスやお弁当、焼き菓子などの料理作りが得意で、メンバーにも振る舞うなど家庭的な魅力が光っています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "easy-25",
    difficulty: "easy",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "フルマラソンの規定走行距離は何kmでしょう？",
    options: ["21.0975km", "42.195km", "50.000km", "100.000km"],
    correctAnswer: "42.195km",
    explanation: "フルマラソンは42.195kmです。瀧脇笙古さんは東京マラソン2023でこの距離を3時間57分06秒で走り切りました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "easy-26",
    difficulty: "easy",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEの8周年記念ツアー「＝LOVE 8th ANNIVERSARY PREMIUM TOUR」のファイナル公演が開催されたスタジアムはどこでしょう？",
    options: ["横浜スタジアム", "明治神宮野球場", "ZOZOマリンスタジアム", "ベルーナドーム"],
    correctAnswer: "横浜スタジアム",
    explanation: "地元である神奈川・横浜スタジアムで開催され、野外スタジアムならではの熱狂的なライブを繰り広げました。",
    sourceUrl: "https://equal-love.jp/news/list/4"
  },
  {
    id: "easy-27",
    difficulty: "easy",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "瀧脇笙古さんの誕生日の星座は何座でしょう？",
    options: ["ふたご座", "かに座", "しし座", "おとめ座"],
    correctAnswer: "かに座",
    explanation: "7月9日生まれのため、かに座です。",
    sourceUrl: "https://equal-love.jp/feature/takiwaki_shoko"
  },
  {
    id: "easy-28",
    difficulty: "easy",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "瀧脇笙古さんがプロフィールに挙げている趣味のうち、休日の過ごし方として合致するものはどれでしょう？",
    options: ["カフェ巡り・横浜散策", "スカイダイビング", "サーフィン", "オンラインFPSゲーム"],
    correctAnswer: "カフェ巡り・横浜散策",
    explanation: "公式プロフィール等で「料理、ヘアアレンジ、横浜散策、カフェ巡り」を趣味として挙げています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "easy-29",
    difficulty: "easy",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "2026年11月に瀧脇笙古さんがInstagramで公開し、スポーツ報知等のメディアで「可愛すぎる」と話題になった私服コーディネートの特徴はどれでしょう？",
    options: ["三つ編みヘア × パーカー", "金髪ショート × レザージャケット", "着物 × ポニーテール", "ドレス × ティアラ"],
    correctAnswer: "三つ編みヘア × パーカー",
    explanation: "三つ編みヘアにパーカーを合わせた秋のカジュアルな私服コーデが反響を呼び、大手ニュース媒体で紹介されました。",
    sourceUrl: "https://news.livedoor.com/article/detail/32737992/"
  },
  {
    id: "easy-30",
    difficulty: "easy",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEのメンバーが所属する代々木アニメーション学院（略称：代アニ）が提供している、声優・タレント育成のレッスンを受けて活動するコンセプトから、メンバー全員が挑戦している分野は何でしょう？",
    options: ["声優・演技", "アナウンサー試験", "気象予報士", "プログラミング"],
    correctAnswer: "声優・演技",
    explanation: "＝LOVEは声優アイドルグループとして発足しており、メンバー全員が声優や舞台、アニメアフレコなどの演技指導を受けています。",
    sourceUrl: "https://equal-love.jp/"
  },
  {
    id: "easy-31",
    difficulty: "easy",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "瀧脇笙古さんが初の単独センターを務めた『BPM170の君へ』のミュージックビデオの主な舞台・ロケ地はどこでしょう？",
    options: ["陸上競技場（トラック）", "無人島", "雪山", "豪華客船"],
    correctAnswer: "陸上競技場（トラック）",
    explanation: "ランニングをテーマにした楽曲のため、陸上競技場のトラックやスタンドで爽やかに走るシーンが印象的に描かれています。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },

  // =========================================================================
  // 中級（normal）: 31問
  // =========================================================================
  {
    id: "normal-01",
    difficulty: "normal",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "東京マラソン2023で瀧脇笙古さんが記録した正式な完走タイムはどれでしょう？",
    options: ["3時間57分06秒", "3時間45分12秒", "3時間59分59秒", "4時間02分15秒"],
    correctAnswer: "3時間57分06秒",
    explanation: "東京マラソン2023にて「3時間57分06秒」という素晴らしいタイムを叩き出し、見事にサブ4の壁を突破しました。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "normal-02",
    difficulty: "normal",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "センター曲『BPM170の君へ』のタイトルにある「BPM170」は何を表しているでしょう？",
    options: ["効率的なランニング走法に適したリズム・心拍数", "車の最高速度", "電車の形式番号", "陸上競技場の直線の長さ"],
    correctAnswer: "効率的なランニング走法に適したリズム・心拍数",
    explanation: "BPM（Beats Per Minute＝テンポ）170は、長距離ランナーがリズミカルに走りやすい理想的なピッチ・テンポを表しています。",
    sourceUrl: "https://equal-love.jp/discography/detail/40/"
  },
  {
    id: "normal-03",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "2017年の＝LOVEオーディション最終審査時、瀧脇笙古さんのエントリーナンバーは何番だったでしょう？",
    options: ["7番", "14番", "23番", "32番"],
    correctAnswer: "14番",
    explanation: "オーディション時のSHOWROOM審査や最終選考では「エントリーナンバー14番」として参加していました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-04",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "2017年に＝LOVEに合格した当時、瀧脇笙古さんは高校何年生だったでしょう？",
    options: ["中学3年生", "高校1年生", "高校2年生", "高校3年生"],
    correctAnswer: "高校1年生",
    explanation: "2001年7月生まれの瀧脇笙古さんは、2017年春のオーディション合格当時は高校1年生（15歳）でした。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-05",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVE加入当時の瀧脇笙古さんのダンス経験についての事実として正しいものはどれでしょう？",
    options: ["ダンス未経験だった", "幼少期からクラシックバレエを習っていた", "ヒップホップダンス全国大会優勝", "チアダンススクール出身"],
    correctAnswer: "ダンス未経験だった",
    explanation: "加入時はダンス未経験で、合宿では悔し涙を流しながら猛特訓を重ね、地道な努力で現在のハイレベルなダンスパフォーマンスを身につけました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-06",
    difficulty: "normal",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "フジテレビ系バラエティ『突然ですが占ってもいいですか？』に＝LOVEが出演した際、占い師からグループ内運勢ランキングで瀧脇笙古さんは何位と鑑定されたでしょう？",
    options: ["第1位", "第3位", "第5位", "最下位"],
    correctAnswer: "第1位",
    explanation: "メンバーの中で見事「運勢ランキング第1位」を獲得し、努力家で地道に成果を積み上げる星の持ち主であると絶賛されました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-07",
    difficulty: "normal",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "サンスポ特別版「BAY☆スタ」第41号で、瀧脇笙古さんと同級生対談を行った横浜DeNAベイスターズの選手は誰でしょう？",
    options: ["石田裕太郎投手", "度会隆輝選手", "牧秀悟選手", "東克樹投手"],
    correctAnswer: "石田裕太郎投手",
    explanation: "2001年度生まれの同級生対談として、横浜DeNAベイスターズの石田裕太郎投手と瀧脇笙古さんのスペシャル対談が実現しました。",
    sourceUrl: "https://www.sanspo-eshop.com/view/item/000000003543"
  },
  {
    id: "normal-08",
    difficulty: "normal",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "地元・神奈川のFMラジオ局「Fm yokohama」で放送された、瀧脇笙古さんが出演したベイスターズ応援特別番組のタイトルは何でしょう？",
    options: ["WE LOVE YOKOHAMA DeNA BAYSTARS", "BAYSTARS GO GO!", "ハマスタフライデー", "YOKOHAMA RADIO APARTMENT"],
    correctAnswer: "WE LOVE YOKOHAMA DeNA BAYSTARS",
    explanation: "Fm yokohamaの開幕応援特別番組『WE LOVE YOKOHAMA DeNA BAYSTARS』に瀧脇笙古さんが出演し、熱狂的なベイスターズトークを展開しました。",
    sourceUrl: "https://equal-love.jp/news/detail/9752"
  },
  {
    id: "normal-09",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "2026年10月に東京ドームで開催された「MTV VMAJ 2026」で、＝LOVEが受賞した部門数はいくつでしょう？",
    options: ["1部門", "2部門", "3部門", "5部門"],
    correctAnswer: "3部門",
    explanation: "「Best Idol Video（『とくべチュ、して』）」「Best Direction（『劇薬中毒』）」「Best Family Choice Artist」の堂々3冠を達成しました。",
    sourceUrl: "https://equal-love.jp/news/detail/11829"
  },
  {
    id: "normal-10",
    difficulty: "normal",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "2026年10月、横浜DeNAベイスターズが出場したプロ野球日本シリーズで、瀧脇笙古さんが現地観戦したことを報告した試合はどれでしょう？",
    options: ["第1戦・第2戦", "第3戦・第4戦", "第6戦・第7戦", "全試合パブリックビューイング"],
    correctAnswer: "第1戦・第2戦",
    explanation: "横浜スタジアムで行われた日本シリーズ第1戦・第2戦を2日連続で現地観戦し、熱い声援を送った様子をSNSで報告してファンや野球界で話題になりました。",
    sourceUrl: "https://full-count.jp/2026/10/26/post2036620/"
  },
  {
    id: "normal-11",
    difficulty: "normal",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "2026年10月11日、瀧脇笙古さんが仕事終わりに東京ドームへ駆けつけて現地観戦したベイスターズの試合は何でしょう？",
    options: ["CSファーストステージ突破を決めた巨人戦", "公式戦の開幕戦", "日本シリーズ優勝決定試合", "オールスターゲーム"],
    correctAnswer: "CSファーストステージ突破を決めた巨人戦",
    explanation: "巨人対DeNAのCSファーストステージを現地観戦し、DeNAのファイナルステージ進出を見届けたことを報告しました。",
    sourceUrl: "https://www.nikkansports.com/entertainment/news/202610110001409.html"
  },
  {
    id: "normal-12",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "2026年11月13日の第77回NHK紅白歌合戦初出場記者会見の際、緊張を和らげるために瀧脇笙古さんが持参して話題になったお菓子は何でしょう？",
    options: ["カリカリ梅", "のど飴", "チョコレート", "都こんぶ"],
    correctAnswer: "カリカリ梅",
    explanation: "初出場会見の舞台裏で、大好きな「カリカリ梅」を食べて本番に臨んだという可愛らしいエピソードが本人の発信やファンの間で話題になりました。",
    sourceUrl: "https://equal-love.jp/news/detail/12408"
  },
  {
    id: "normal-13",
    difficulty: "normal",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "瀧脇笙古さんが高校時代に所属していた部活動は何でしょう？",
    options: ["陸上競技部（長距離）", "バレーボール部", "ダンス部", "ソフトテニス部"],
    correctAnswer: "陸上競技部（長距離）",
    explanation: "高校時代は陸上競技部に所属し、長距離走の練習に励んでいました。その基礎体力が後のフルマラソンサブ4達成へと繋がっています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "normal-14",
    difficulty: "normal",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "瀧脇笙古さんと音嶋莉沙さんがダブルセンターを務める『木漏れ日メゾフォルテ』の衣装の主なカラー・イメージはどれでしょう？",
    options: ["爽やかなグリーン・ミント・ホワイト系", "漆黒のレザー系", "真っ赤な情熱ドレス", "ネオンピンクのギャル系"],
    correctAnswer: "爽やかなグリーン・ミント・ホワイト系",
    explanation: "初夏の爽やかな木漏れ日を想起させる、ミントグリーンやストライプの清楚で上品な衣装が特徴的です。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-15",
    difficulty: "normal",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "集英社のアイドル誌「Myojo 2026年11月号」で、瀧脇笙古さんが単独掲載された企画タイトルは何でしょう？",
    options: ["＝LOVEとヒミツのGIRL’S TALK 瀧脇笙古", "しょこのランニング入門", "イコラブ美食倶楽部", "横浜ぶらり散歩"],
    correctAnswer: "＝LOVEとヒミツのGIRL’S TALK 瀧脇笙古",
    explanation: "「Myojo 11月号」の企画『＝LOVEとヒミツのGIRL’S TALK 瀧脇笙古』にて撮り下ろし写真とインタビューが掲載されました。",
    sourceUrl: "https://dmagazine.docomo.ne.jp/item/f19bfd22d643183b8a3e3546bab270d70dcf6c2f461aec35fdce5e3833c20860/1000/"
  },
  {
    id: "normal-16",
    difficulty: "normal",
    category: "cooking",
    categoryLabel: "料理",
    question: "瀧脇笙古さんが料理配信（クックパッドLive等）で大切にしているファンとのコミュニケーションの特徴は何でしょう？",
    options: ["手際よく料理しながらコメントを細かく拾う神対応", "激辛料理ばかりを無言で食べる", "料理を一切せずにトークだけする", "包丁を使わず手でちぎる"],
    correctAnswer: "手際よく料理しながらコメントを細かく拾う神対応",
    explanation: "高い調理スキルで手際よく調理を進めつつ、ファンのコメントや質問を丁寧に拾ってテンポよく返す配信スタイルが絶賛されています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "normal-17",
    difficulty: "normal",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "横浜スタジアムのセレモニアルピッチで、瀧脇笙古さんが背負ったユニフォームの背番号は何番だったでしょう？",
    options: ["「19」（いくぞー / 笙古語呂合わせ）や応援背番号", "「00」", "「100」", "「777」"],
    correctAnswer: "「19」（いくぞー / 笙古語呂合わせ）や応援背番号",
    explanation: "笙古（しょうこ＝19）の語呂やベイスターズへの想いを込めたユニフォーム姿でマウンドに立ちました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-18",
    difficulty: "normal",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "フルマラソンで「サブ4（4時間未満完走）」を達成できる市民ランナーの割合はおよそどれくらいと言われているでしょう？",
    options: ["女性ランナーの上位約10%前後", "ランナーの約80%", "ほぼ全員達成できる", "上位0.1%のみ"],
    correctAnswer: "女性ランナーの上位約10%前後",
    explanation: "全女性ランナーの中でもサブ4を達成できるのは約10%前後（全体でも20%程度）と言われており、アイドル活動と並行しての達成は驚異的な努力の賜物です。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-19",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "瀧脇笙古さんのSHOWROOM配信などでファンから特に定評のある「特技・能力」は何でしょう？",
    options: ["ファンの名前やお話した内容の記憶力の高さ", "ものまね50連発", "手品・マジック", "ルービックキューブ10秒"],
    correctAnswer: "ファンの名前やお話した内容の記憶力の高さ",
    explanation: "オンラインサイン会やお話し会、配信に来てくれたファンの名前や以前交わした会話をしっかり覚えている記憶力の良さはファンの間で有名です。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "normal-20",
    difficulty: "normal",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "2026年11月に＝LOVEの出演が発表された、日本テレビ系の年末大型音楽特番は何でしょう？",
    options: ["ベストアーティスト2026", "THE MUSIC DAY", "日テレ系音楽の祭典", "バズリズムLIVE"],
    correctAnswer: "ベストアーティスト2026",
    explanation: "2026年11月28日放送の『ベストアーティスト2026』に出演が決定しました。",
    sourceUrl: "https://equal-love.jp/news/detail/12394"
  },
  {
    id: "normal-21",
    difficulty: "normal",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "2026年12月に＝LOVEの生出演が発表された、フジテレビ系列の年末大型音楽特番は何でしょう？",
    options: ["2026 FNS歌謡祭 第1夜", "FNSうたの夏まつり", "MUSIC FAIR 記念SP", "オールナイトフジコSP"],
    correctAnswer: "2026 FNS歌謡祭 第1夜",
    explanation: "2026年12月2日放送の『2026 FNS歌謡祭 第1夜』に出演が決定しました。",
    sourceUrl: "https://equal-love.jp/news/detail/12385"
  },
  {
    id: "normal-22",
    difficulty: "normal",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "サンスポ特別版「BAY☆スタ」第43号の連載コラム「BAYSTARS=LOVE」で、瀧脇笙古さんが取り上げた主なテーマは何でしょう？",
    options: ["2026年シーズンの個人的MVPや来季への期待", "球場グルメの食べ比べのみ", "マスコットキャラクターの秘密", "プロ野球の歴史年表"],
    correctAnswer: "2026年シーズンの個人的MVPや来季への期待",
    explanation: "2026年シーズンの戦いを振り返り、個人的MVP選手や来季への期待を熱く語るコラムとなっています。",
    sourceUrl: "https://x.com/sanspo_baystars/status/2122457182192992735"
  },
  {
    id: "normal-23",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEの1stアルバム『全部、内緒。』のリード曲で、ミュージックビデオが映画のような世界観で話題を呼んだ楽曲は何でしょう？",
    options: ["桜の咲く音がした", "青サブ", "ズルいよ ズルいね", "青春”サブリミナル”"],
    correctAnswer: "桜の咲く音がした",
    explanation: "1stアルバム『全部、内緒。』のリード曲は『桜の咲く音がした』です。",
    sourceUrl: "https://equal-love.jp/discography/"
  },
  {
    id: "normal-24",
    difficulty: "normal",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "＝LOVEのコンサートで客席がイエロー×オレンジに染まり、瀧脇笙古さんの見せ場としてファンが熱狂する定番の見どころは何でしょう？",
    options: ["『BPM170の君へ』での全力疾走パフォーマンスやセンター煽り", "アコースティックギター弾き語り", "ドラムソロ演奏", "空中ブランコフライング"],
    correctAnswer: "『BPM170の君へ』での全力疾走パフォーマンスやセンター煽り",
    explanation: "『BPM170の君へ』披露時には、花道やステージを軽快に駆け抜け、最高の笑顔で客席を煽る姿がハイライトとなります。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-25",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEの初代リーダーを務めているメンバーは誰でしょう？",
    options: ["山本杏奈", "諸橋沙夏", "大谷映美里", "佐々木舞香"],
    correctAnswer: "山本杏奈",
    explanation: "リーダーは山本杏奈さんです。瀧脇笙古さんとも非常に仲が良く、お互いに支え合ってきた盟友です。",
    sourceUrl: "https://equal-love.jp/"
  },
  {
    id: "normal-26",
    difficulty: "normal",
    category: "cooking",
    categoryLabel: "料理",
    question: "瀧脇笙古さんが得意料理としてたびたび挙げ、綺麗にケチャップで文字やハートを書く定番メニューは何でしょう？",
    options: ["オムライス", "天ぷら蕎麦", "麻婆豆腐", "パエリア"],
    correctAnswer: "オムライス",
    explanation: "美しい卵の巻き方と可愛いケチャップアートを施したオムライスは、しょこちゃんの代名詞的メニューです。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "normal-27",
    difficulty: "normal",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "プロ野球ニュース木曜MCを担当する瀧脇笙古さんが、番組内で野球解説者と接する際の姿勢としてファンから高く評価されている点は何でしょう？",
    options: ["試合内容をしっかり予習・把握し、敬意を持って質問する勉強熱心さ", "解説者の発言をすべて遮る", "野球ルールを知らないフリをする", "ひたすら横浜の応援歌だけを歌う"],
    correctAnswer: "試合内容をしっかり予習・把握し、敬意を持って質問する勉強熱心さ",
    explanation: "毎試合のスコアやハイライトを丁寧に頭に入れ、大先輩のプロ野球解説者にも失礼のない謙虚かつ的確な受け答えがプロ野球ファンからも高評価を得ています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "normal-28",
    difficulty: "normal",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEの姉妹グループ（＝LOVEの次に結成されたグループ）の名称は何でしょう？",
    options: ["≠ME（ノットイコールミー）", "≒JOY（ニアリーイコールジョイ）", "ラストアイドル", "ラストノート"],
    correctAnswer: "≠ME（ノットイコールミー）",
    explanation: "＝LOVEの姉妹グループとして2019年に結成されたのが≠ME（ノイミー）です。その後2022年に≒JOY（ニアジョイ）が誕生しました。",
    sourceUrl: "https://equal-love.jp/"
  },
  {
    id: "normal-29",
    difficulty: "normal",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "瀧脇笙古さんが普段のトレーニングとして取り入れている、スタイル維持と体力向上のための習慣は何でしょう？",
    options: ["日常的なジョギング・ランニング", "毎日10時間の筋トレ", "毎食プロテインのみの生活", "断食"],
    correctAnswer: "日常的なジョギング・ランニング",
    explanation: "日頃からこまめに走り込みを行い、無理のないペースでコンディションを維持し続けています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "normal-30",
    difficulty: "normal",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "瀧脇笙古さんが横浜スタジアムで現地観戦する際によく身につけている定番の観戦グッズは何でしょう？",
    options: ["ベイスターズのユニフォームと応援タオル", "スーツとネクタイ", "他球団のメガホン", "ヘルメット"],
    correctAnswer: "ベイスターズのユニフォームと応援タオル",
    explanation: "青いベイスターズユニフォームを身にまとい、タオルを掲げてファンと一緒に一喜一憂するのがしょこちゃんの観戦スタイルです。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "normal-31",
    difficulty: "normal",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "FILA 2026FW POP-UPのYouTubeメイキング（Behind the Scenes）映像で、瀧脇笙古さんが見せたコーディネートの魅力は何でしょう？",
    options: ["スポーティーかつ大人っぽい洗練されたストリートスタイル", "着ぐるみスタイル", "フォーマルなタキシード", "水着スタイル"],
    correctAnswer: "スポーティーかつ大人っぽい洗練されたストリートスタイル",
    explanation: "FILAのスポーティーなスニーカーやアウターを都会的でファッショナブルに着こなす姿が国内外から高く評価されました。",
    sourceUrl: "https://shokoblog.vercel.app/youtube"
  },

  // =========================================================================
  // 上級（hard）: 30問
  // =========================================================================
  {
    id: "hard-01",
    difficulty: "hard",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "サンケイスポーツ特別版「BAY☆スタ」で、瀧脇笙古さんの連載コラム『BAYSTARS=LOVE』が初めてスタートしたのは第何号でしょう？",
    options: ["第26号", "第1号", "第15号", "第30号"],
    correctAnswer: "第26号",
    explanation: "連載『BAYSTARS=LOVE』は「BAY☆スタ」第26号からスタートし、長年にわたり愛読される大人気看板コラムへと育ちました。",
    sourceUrl: "https://shokoblog.vercel.app/articles"
  },
  {
    id: "hard-02",
    difficulty: "hard",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "「BAY☆スタ」第33号にて、瀧脇笙古さんとの対談および裏表紙掲載が実現したベイスターズの守護神投手は誰でしょう？",
    options: ["山崎康晃投手", "今永昇太投手", "三浦大輔監督", "佐々木主浩氏"],
    correctAnswer: "山崎康晃投手",
    explanation: "第33号ではベイスターズの誇る守護神・山崎康晃投手との特別対談が組まれ、裏表紙にも掲載されるなど大きな注目を集めました。",
    sourceUrl: "https://shokoblog.vercel.app/articles"
  },
  {
    id: "hard-03",
    difficulty: "hard",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "「BAY☆スタ」第37号にて、瀧脇笙古さんとの対談が掲載されたベイスターズの正捕手は誰でしょう？",
    options: ["山本祐大捕手", "戸柱恭孝捕手", "伊藤光捕手", "松尾汐恩選手"],
    correctAnswer: "山本祐大捕手",
    explanation: "第37号ではベストナイン・ゴールデングラブ賞にも輝いた山本祐大捕手との対談が掲載されました。",
    sourceUrl: "https://shokoblog.vercel.app/articles"
  },
  {
    id: "hard-04",
    difficulty: "hard",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "サンケイスポーツ特別版「BAY☆スタ」第42号において、瀧脇笙古さんの連載『BAYSTARS=LOVE』に割かれた掲載スペースはどれだったでしょう？",
    options: ["2ページにわたる特別拡大掲載", "わずか1段のコラム枠", "表紙の小さな写真のみ", "裏表紙の広告枠"],
    correctAnswer: "2ページにわたる特別拡大掲載",
    explanation: "第42号ではその熱烈なベイスターズ愛が評価され、2ページを見開きで使った特大ボリュームで掲載されました。",
    sourceUrl: "https://prtimes.jp/main/html/rd/p/000002101.000022608.html"
  },
  {
    id: "hard-05",
    difficulty: "hard",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "瀧脇笙古さんの初センター曲『BPM170の君へ』の冒頭、瀧脇笙古さんのソロ歌い出しのフレーズは何でしょう？",
    options: ["プレイリストをお気に入りにした", "走り出した並木道", "息が上がって君が見えた", "朝の風が背中を押す"],
    correctAnswer: "プレイリストをお気に入りにした",
    explanation: "「プレイリストをお気に入りにした テンポに合わせて足を前に進める」という軽やかで前向きなソロ歌い出しで始まります。",
    sourceUrl: "https://equal-love.jp/discography/detail/40/"
  },
  {
    id: "hard-06",
    difficulty: "hard",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "2017年の＝LOVE結成ドキュメンタリー『Episode 1』で行われた強化合宿のダンス指導で、厳しくも温かい言葉をかけた振付師は誰でしょう？",
    options: ["牧野アンナ先生", "夏まゆみ先生", "TAKAHIRO先生", "KENTO MORI先生"],
    correctAnswer: "牧野アンナ先生",
    explanation: "ダンス指導のレジェンド・牧野アンナ先生による過酷な合宿特訓を受け、ダンス未経験の笙古ちゃんが涙を拭いながら食らいつく姿はファンの心を打ちました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "hard-07",
    difficulty: "hard",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "瀧脇笙古さんがフルマラソンに初挑戦した際、過酷な42.195kmのレース中に意識していたペース配分についての本人コメントとして正しいものはどれでしょう？",
    options: ["1kmあたり5分30秒前後のイーブンペースを刻み続けた", "最初から全力疾走して貯金を作った", "前半は歩いて後半だけ走った", "30km地点まで他人の後ろにピッタリ隠れた"],
    correctAnswer: "1kmあたり5分30秒前後のイーブンペースを刻み続けた",
    explanation: "サブ4達成の秘訣として、前半でオーバーペースにならず、1km約5分30秒前後の一定ペースを冷静に刻み続ける完璧なレースマネジメントを行いました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "hard-08",
    difficulty: "hard",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "2020年12月放送のTBS『SASUKE2020』で、瀧脇笙古さんが1stステージで挑んだ最初の関門（第1エリア）の名称は何でしょう？",
    options: ["クワッドステップス", "ローリングヒル", "そり立つ壁", "ドラゴングライダー"],
    correctAnswer: "クワッドステップス",
    explanation: "1stステージ第1エリアの傾斜した板をリズミカルに駆け抜ける「クワッドステップス」に勇気を持って挑みました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "hard-09",
    difficulty: "hard",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "横浜スタジアムで開催された＝LOVE出演のベイスターズコラボイベント『推せ推せ！YOKOHAMA☆IDOL SERIES 2025』が開催された日付はどれでしょう？",
    options: ["2025年5月8日", "2025年3月24日", "2025年8月18日", "2025年10月11日"],
    correctAnswer: "2025年5月8日",
    explanation: "2025年5月8日、横浜スタジアムにて『推せ推せ！YOKOHAMA☆IDOL SERIES 2025』が開催され、セレモニアルピッチを行いました。",
    sourceUrl: "https://sp.baystars.co.jp/news/2025/05/0508_03.php"
  },
  {
    id: "hard-10",
    difficulty: "hard",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "「しょこらの部屋」のトップページ等で特集されている、FILA 2026FWスタイリングパートナー動画のYouTube Video IDは何でしょう？",
    options: ["0dJb1WGsK2Q", "fe_nGoGe9DQ", "4xBmuiQNGdc", "czy844ZUvzI"],
    correctAnswer: "0dJb1WGsK2Q",
    explanation: "FILA 2026FW Behind the Scenes公式動画のVideo IDは「0dJb1WGsK2Q」です。",
    sourceUrl: "https://shokoblog.vercel.app/"
  },
  {
    id: "hard-11",
    difficulty: "hard",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "『木漏れ日メゾフォルテ』が収録されている＝LOVEのシングルは何thシングルでしょう？",
    options: ["15thシングル", "16thシングル", "17thシングル", "18thシングル"],
    correctAnswer: "16thシングル",
    explanation: "16thシングル『呪って呪って』に収録されたカップリング曲です。",
    sourceUrl: "https://equal-love.jp/discography/"
  },
  {
    id: "hard-12",
    difficulty: "hard",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "＝LOVEのライブ演出で、瀧脇笙古さんが「歌声の安定感とピッチの良さ」で重要な役割を果たす曲としてファンから高く評価されるクール系楽曲はどれでしょう？",
    options: ["祝祭", "手遅れcaution", "劇薬中毒", "上記すべて"],
    correctAnswer: "上記すべて",
    explanation: "『祝祭』の重厚な世界観、『手遅れcaution』のシリアスさ、『劇薬中毒』のエッジの効いた歌唱など、可愛い曲だけでなくダーク・クール系でも安定したボーカル力を発揮しています。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "hard-13",
    difficulty: "hard",
    category: "cooking",
    categoryLabel: "料理",
    question: "クックパッド「クックアイドルNo.1決定戦」の決勝戦で、瀧脇笙古さんが生配信中に披露して審査員を唸らせた料理のポイントは何でしょう？",
    options: ["味付けだけでなく、彩り豊かな盛り付けと栄養バランスへの配慮", "高級トリュフを大量に使ったこと", "料理を燃やすフランベパフォーマンス", "コンビニ惣菜の温め直し"],
    correctAnswer: "味付けだけでなく、彩り豊かな盛り付けと栄養バランスへの配慮",
    explanation: "栄養バランスを考慮した食材選び、手際の良さ、目で見ても楽しめる美しい彩りと盛り付けが高く評価されました。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "hard-14",
    difficulty: "hard",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEのドキュメンタリー映像『Documentary of =LOVE』で、瀧脇笙古さんの軌跡が描かれた「オーディション編」のエピソード番号は何でしょう？",
    options: ["Episode 0", "Episode 1", "Episode 5", "Episode 10"],
    correctAnswer: "Episode 0",
    explanation: "オーディション合格の瞬間や初期の心境が記録されているのは『Episode 0 - Audition -』です。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "hard-15",
    difficulty: "hard",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "横浜DeNAベイスターズが2024年に26年ぶりの日本一を達成した際、瀧脇笙古さんがXで発信した言葉に含まれていた熱い想いはどれでしょう？",
    options: ["横浜優勝と選手・ファンへの感謝、歓喜の涙", "来季のトレード予想", "他球団への皮肉", "無言のリポストのみ"],
    correctAnswer: "横浜優勝と選手・ファンへの感謝、歓喜の涙",
    explanation: "長年応援し続けてきた地元チームの26年ぶり日本一の瞬間に、「横浜優勝！感動をありがとうございます！」と熱い歓喜のメッセージを投稿しました。",
    sourceUrl: "https://shokoblog.vercel.app/articles"
  },
  {
    id: "hard-16",
    difficulty: "hard",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "瀧脇笙古さんが『プロ野球ニュース』の木曜MCに就任した際、プロ野球ファンや関係者の間で話題になった本人の特徴は何でしょう？",
    options: ["全12球団の順位・戦況をノートに自筆でまとめて勉強する熱心さ", "自作のスコアブックを持ち込む", "選手名鑑を丸暗記している", "上記すべて"],
    correctAnswer: "上記すべて",
    explanation: "スコアブックの付け方を学び、毎日の全試合結果を手書きノートでまとめるなど、アイドル番組の枠を超えた本格的な姿勢が専門家からも絶賛されました。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "hard-17",
    difficulty: "hard",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "瀧脇笙古さんが東京マラソン2023で42.195kmを走り抜いた際の「前半ハーフ（中間点21.0975km）」の通過タイムはおよそどのくらいだったでしょう？",
    options: ["1時間58分前後", "1時間30分前後", "2時間15分前後", "2時間30分前後"],
    correctAnswer: "1時間58分前後",
    explanation: "前半を約1時間58分、後半も崩れずにほぼ同等のイーブンペースで走り切り、3時間57分06秒でゴールしました。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "hard-18",
    difficulty: "hard",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEのデビュー曲『=LOVE』のMV撮影が行われたロケーション地はどこでしょう？",
    options: ["静岡県下田市・白浜海岸", "沖縄県宮古島", "ハワイ・ホノルル", "千葉県九十九里浜"],
    correctAnswer: "静岡県下田市・白浜海岸",
    explanation: "デビュー曲『=LOVE』の爽やかな海辺のダンスシーンは静岡県下田市の海岸で撮影されました。",
    sourceUrl: "https://equal-love.jp/discography/"
  },
  {
    id: "hard-19",
    difficulty: "hard",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "『BPM170の君へ』で瀧脇笙古さんと一緒にユニットを組んでパフォーマンスしている＝LOVEのメンバーは誰でしょう？",
    options: ["野口衣織・大谷映美里・高松瞳らとの選抜ユニット", "音嶋莉沙との2人組", "メンバー全員", "ソロ歌唱のみ"],
    correctAnswer: "野口衣織・大谷映美里・高松瞳らとの選抜ユニット",
    explanation: "『BPM170の君へ』は瀧脇笙古センターのもと、大谷映美里、野口衣織、齋藤樹愛羅、高松瞳などのメンバーで構成されたユニット曲です。",
    sourceUrl: "https://equal-love.jp/discography/detail/40/"
  },
  {
    id: "hard-20",
    difficulty: "hard",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "「BAY☆スタ」第40号（2026年春発行）の誌面に瀧脇笙古さんが登場した際の企画趣旨は何だったでしょう？",
    options: ["2026年シーズン開幕応援特集", "ベイスターズキャンプ地巡り", "引退選手への惜別メッセージ", "ファン感謝デー潜入リポート"],
    correctAnswer: "2026年シーズン開幕応援特集",
    explanation: "新シーズンの開幕に向けた戦力分析と熱いエールを届ける開幕記念号として掲載されました。",
    sourceUrl: "https://shokoblog.vercel.app/articles"
  },
  {
    id: "hard-21",
    difficulty: "hard",
    category: "profile",
    categoryLabel: "プロフィール",
    question: "瀧脇笙古さんの漢字表記「笙古」の「笙」は、本来どのような意味を持つ漢字・楽器でしょう？",
    options: ["雅楽で用いられる天から降り注ぐ光を表す伝統的な管楽器", "竹でできた大型の太鼓", "弦が20本ある琴", "祭りで吹く法螺貝"],
    correctAnswer: "雅楽で用いられる天から降り注ぐ光を表す伝統的な管楽器",
    explanation: "「笙（しょう）」は雅楽で鳳凰の翼を模した竹管から美しい和音を奏でる伝統楽器です。美しく気品のある素敵なお名前の由来にもなっています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "hard-22",
    difficulty: "hard",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "テレビ東京系『アイ＝ラブ！げーみんぐ』等のゲーム関連番組で、瀧脇笙古さんが見せた意外なプレイスタイルは何でしょう？",
    options: ["真剣な表情で黙々と攻略法を見出す集中力の高さ", "ボタンを連打してコントローラーを壊す", "プレイせずに画面を見つめるだけ", "毎回すぐ諦める"],
    correctAnswer: "真剣な表情で黙々と攻略法を見出す集中力の高さ",
    explanation: "どんなゲームにも真剣に向き合い、コツを掴むと驚くべき集中力と適応力でハイスコアを狙う勝負強さを見せました。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "hard-23",
    difficulty: "hard",
    category: "cooking",
    categoryLabel: "料理",
    question: "瀧脇笙古さんが自身の生誕祭やイベント等の記念にファンやメンバーに振る舞いたいスイーツとしてよく挙げるものは何でしょう？",
    options: ["手作りのクッキーやパウンドケーキ", "巨大ウェディングケーキ", "たい焼き100個", "かき氷"],
    correctAnswer: "手作りのクッキーやパウンドケーキ",
    explanation: "一つ一つ丁寧にラッピングされた手作りの焼き菓子（クッキーやマフィン、パウンドケーキ）はメンバーからも「まるでお店」と絶賛されています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "hard-24",
    difficulty: "hard",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "＝LOVEのコンサートで披露されるユニット曲において、瀧脇笙古さんの「ダンスのキレとしなやかさ」が特に堪能できるファン人気の高いダンスナンバーはどれでしょう？",
    options: ["『CAMEO』や『Poison Girl』のダンスパート", "童謡の合唱", "スローテンポのバラードのみ", "盆踊り"],
    correctAnswer: "『CAMEO』や『Poison Girl』のダンスパート",
    explanation: "フォーメーションの要としてキレ味鋭いステップと魅惑的な表情で観客を惹きつけるダンスナンバーで高い評価を得ています。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "hard-25",
    difficulty: "hard",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "2026年11月13日のNHK紅白歌合戦初出場決定時に、瀧脇笙古さんが自身のXで発信した言葉に含まれていたキーワードは何でしょう？",
    options: ["「みんなで夢を叶えることができてとっても嬉しいです」", "「もう思い残すことはありません」", "「来年は出ません」", "「一人で頑張った結果です」"],
    correctAnswer: "「みんなで夢を叶えることができてとっても嬉しいです」",
    explanation: "「みんなで夢を叶えることができてとっても嬉しいです。いつも温かい応援を本当にありがとうございます！」とファンとメンバーへの感謝を真っ先に伝えました。",
    sourceUrl: "https://equal-love.jp/news/detail/12408"
  },
  {
    id: "hard-26",
    difficulty: "hard",
    category: "sports",
    categoryLabel: "マラソン・スポーツ",
    question: "瀧脇笙古さんがマラソン練習時に大切にしている「ランニングシューズ選び」のこだわりは何でしょう？",
    options: ["自分の足型にフィットし、衝撃吸収と反発性のバランスが良い厚底シューズ", "見た目の色だけで選ぶ", "サイズが小さめの靴を選ぶ", "底が完全に平らな革靴"],
    correctAnswer: "自分の足型にフィットし、衝撃吸収と反発性のバランスが良い厚底シューズ",
    explanation: "長距離練習で足を痛めないよう、専門ショップで足型を測定し、クッション性と反発性を兼ね備えたシューズを愛用しています。",
    sourceUrl: "https://shokoblog.vercel.app/history"
  },
  {
    id: "hard-27",
    difficulty: "hard",
    category: "baystars",
    categoryLabel: "ベイスターズ",
    question: "瀧脇笙古さんが横浜DeNAベイスターズの試合を観戦する際、球場で楽しみにしている定番のスタジアムグルメは何でしょう？",
    options: ["ベイ餃子やみかん氷", "フランス料理フルコース", "激辛トムヤムクン", "流しそうめん"],
    correctAnswer: "ベイ餃子やみかん氷",
    explanation: "横浜スタジアム名物の「みかん氷」や「ベイ餃子」は、観戦時の定番としてファンにも親しまれています。",
    sourceUrl: "https://shokoblog.vercel.app/articles"
  },
  {
    id: "hard-28",
    difficulty: "hard",
    category: "activity",
    categoryLabel: "＝LOVE活動",
    question: "＝LOVEの冠バラエティ番組『イコラブ 愛名言』などで見せた、瀧脇笙古さんのバラエティでの魅力は何でしょう？",
    options: ["真面目ゆえの天然な可愛さと、体を張る企画でも笑顔を絶やさないガッツ", "怒って途中で帰る", "他のメンバーを一切見ない", "カンペを棒読みする"],
    correctAnswer: "真面目ゆえの天然な可愛さと、体を張る企画でも笑顔を絶やさないガッツ",
    explanation: "どんな企画でも一生懸命に取り組み、たまに出るピュアな天然発言と最後までやり遂げる根性が愛されています。",
    sourceUrl: "https://shokoblog.vercel.app/profile"
  },
  {
    id: "hard-29",
    difficulty: "hard",
    category: "media",
    categoryLabel: "テレビ・ラジオ",
    question: "FILA 2026FW POP-UPのキービジュアルで、瀧脇笙古さんが着用したアウターの特徴的な配色はどれでしょう？",
    options: ["ホワイト・ネイビー・レッドのFILAヘリテージカラー", "全面蛍光イエロー", "ヒョウ柄一色", "オールシルバーの宇宙服風"],
    correctAnswer: "ホワイト・ネイビー・レッドのFILAヘリテージカラー",
    explanation: "FILAの伝統的トリコロール（ホワイト・ネイビー・レッド）を取り入れたスポーティーなジャケットをスタイリッシュに着こなしました。",
    sourceUrl: "https://shokoblog.vercel.app/youtube"
  },
  {
    id: "hard-30",
    difficulty: "hard",
    category: "music",
    categoryLabel: "歌・ライブ",
    question: "＝LOVEが2027年1月に開催する東京ドーム単独公演のタイトル『全ては＝LOVE』に込められた想いとして最もふさわしいものはどれでしょう？",
    options: ["結成からの歩み、メンバー・ファンの絆、すべての軌跡が＝LOVEに繋がっているという集大成の決意", "全人類を強制的にファンにする計画", "これからは個人活動だけにする宣言", "海外進出のみを目指す意味"],
    correctAnswer: "結成からの歩み、メンバー・ファンの絆、すべての軌跡が＝LOVEに繋がっているという集大成の決意",
    explanation: "オーディションから9年、数々の試練を乗り越えて全員で辿り着く憧れの東京ドーム。ファンとともに歩んできた全ての愛への感謝が込められたタイトルです。",
    sourceUrl: "https://equal-love.jp/news/detail/12299"
  }
];

// 難易度別にランダムに指定問数（デフォルト10問）を重複なく抽出する関数
export function getRandomQuizQuestions(difficulty: QuizDifficulty, count: number = 10): QuizQuestion[] {
  const filtered = QUIZ_QUESTIONS.filter((q) => q.difficulty === difficulty);
  
  // シャッフル（Fisher-Yates）
  const shuffled = [...filtered];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 指定問数を取得
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // 各問題の選択肢もシャッフルして返す
  return selected.map((q) => {
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    return {
      ...q,
      options: shuffledOptions,
    };
  });
}
