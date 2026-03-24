import { useState, useEffect } from "react";
const REGIONS = {
  neck: {
    label: "首・頸部", emoji: "🟣", color: "#9B59B6", light: "#F5EEF8",
    bones: [
      { name: "頸椎C1（アトラス）", location: "頭蓋骨のすぐ下、首の最上部の椎骨", tip: "頭を前後に頷く動き（うなずき）を作る。「はい」の動き" },
      { name: "頸椎C2（アクシス）", location: "C1の直下。突起（歯突起）を持つ特殊な椎骨", tip: "頭を左右に回す動き（首振り）を作る。「いいえ」の動き" },
      { name: "頸椎C3〜C7", location: "首の中〜下部の5つの椎骨", tip: "首の屈曲・伸展・側屈すべてに関与。ピラティスで頭の位置の基準" },
    ],
    muscles: [
      { name: "胸鎖乳突筋（SCM）", location: "耳の後ろ（乳様突起）から鎖骨・胸骨に斜めに走る目立つ筋肉", tip: "ハンドレッドで頭を持ち上げる動作の主役。片側で頸部側屈・回旋、両側で頸部屈曲" },
      { name: "斜角筋群（前・中・後）", location: "頸椎の横突起から第1・2肋骨へ走る首の側面の筋肉", tip: "首の側屈を補助し、深い吸気の際に第1肋骨を引き上げる呼吸補助筋" },
      { name: "肩甲挙筋", location: "頸椎C1〜C4の横突起から肩甲骨上角まで走る", tip: "肩甲骨を引き上げる。緊張すると「肩が上がる」原因に。ピラティスでは抑える意識が重要" },
      { name: "板状筋（頭板状筋・頸板状筋）", location: "頸椎〜胸椎の棘突起から頭蓋骨・頸椎横突起へ走る後頸部の筋肉", tip: "頭・首を後ろに伸ばす・同側に回す。スワンで頭を後ろに反らす動き" },
      { name: "半棘筋（頭半棘筋・頸半棘筋）", location: "胸椎・頸椎の横突起から後頭骨・頸椎棘突起へ走る深層筋", tip: "頭・首を伸展させる深層筋。姿勢保持に重要" },
      { name: "頭長筋・頸長筋", location: "頸椎前面を縦に走る前頸深層筋", tip: "深頸屈筋群。頭を前に屈曲させる。チンタックの際に使う重要な筋肉" },
      { name: "舌骨上下筋群", location: "顎の下から胸骨・肩甲骨にかけての喉周辺の筋肉群", tip: "嚥下・発声に関わるが、過緊張が頸部の動きを妨げることがある" },
    ],
    pilates: ["ハンドレッド（頭部挙上）", "ロールアップ（頸部アーティキュレーション）", "チンタック（頭部のニュートラル確認）", "スパインストレッチ（頸椎の伸展）"],
  },
  core: {
    label: "体幹・コア", emoji: "🔴", color: "#E53935", light: "#FEECEC",
    bones: [
      { name: "胸椎（T1〜T12）", location: "胸部の背骨。12個の椎骨で肋骨と連結する", tip: "回旋動作の中心。スパインツイストで動く。腰椎より動きやすい" },
      { name: "腰椎（L1〜L5）", location: "腰部の背骨。5つの大きな椎骨", tip: "体重を最も支える。ピラティスで「腰が反らないよう」注意する部位" },
      { name: "仙骨", location: "骨盤後方中央。腰椎L5の下の逆三角形の骨", tip: "骨盤の中心。ニュートラルペルビス・前傾・後傾の基準点" },
      { name: "尾骨（尾てい骨）", location: "仙骨のすぐ下、脊椎の最下端", tip: "ロールダウンで「骨を1つずつマットに下ろす」の起点" },
      { name: "胸骨（柄・体・剣状突起）", location: "胸の前面中央の縦に走る平らな骨。3部位からなる", tip: "肋骨を前面でつなぐ。「肋骨を閉じる」意識のランドマーク" },
      { name: "肋骨（12対）", location: "胸部を囲むアーチ状の24本の骨", tip: "真肋（1〜7）・仮肋（8〜10）・浮遊肋（11〜12）に分かれる" },
      { name: "骨盤（腸骨・坐骨・恥骨）", location: "体幹の土台となる大きな骨格。左右対称", tip: "ASIS（上前腸骨棘）は骨盤ポジションのランドマーク。触ってわかるようにしよう" },
      { name: "恥骨結合", location: "骨盤前面中央の左右の恥骨をつなぐ軟骨結合", tip: "骨盤底筋群の前方の付着点。骨盤ニュートラルの理解に不可欠" },
    ],
    muscles: [
      { name: "腹横筋（TVA）", location: "腹部の最深層。コルセット状に腹部を横に360度包む", tip: "ピラティスで最重要！「お腹を薄くする・背骨に引き込む」感覚がこの筋肉の収縮" },
      { name: "腹直筋", location: "お腹の前面中央。みぞおちから恥骨まで縦に走る", tip: "シックスパック。体を前に丸める屈曲動作。腱画で6つに区切られる" },
      { name: "外腹斜筋", location: "お腹の外側表層。肋骨から骨盤へ斜め前下方に走る", tip: "体をひねる・横に曲げる動作。クリスクロスで強く使う" },
      { name: "内腹斜筋", location: "外腹斜筋の内側。骨盤から肋骨へ斜め上方に走る", tip: "外腹斜筋と逆方向に走り、回旋時に反対側の外腹斜筋と協力する" },
      { name: "多裂筋", location: "背骨の両脇、各椎骨をまたぐ深層筋群。腰椎部が最も発達", tip: "椎骨ひとつひとつの安定に不可欠なインナーマッスル。慢性腰痛と深く関係" },
      { name: "脊柱起立筋（腸肋筋・最長筋・棘筋）", location: "背骨に沿って縦に走る3列の大きな筋肉群", tip: "背骨を伸ばす・後ろに反らす。スワン（バックエクステンション）で主役" },
      { name: "腰方形筋（QL）", location: "腰の深部。骨盤（腸骨稜）と腰椎・第12肋骨をつなぐ四角形の筋肉", tip: "体の側屈・骨盤の高さの左右差に関わる。サイドベンドで活躍。腰痛の原因になりやすい" },
      { name: "腸腰筋（大腰筋＋腸骨筋）", location: "腰椎から骨盤内側を通り大腿骨内側小転子に至る深層筋", tip: "脚を持ち上げる（股関節屈曲）最重要筋。レッグサークル・ハンドレッドで大活躍" },
      { name: "横隔膜", location: "胸腔と腹腔を仕切るドーム状の筋肉。胸骨・肋骨・腰椎に付着", tip: "ピラティス呼吸の主役。吸気でドームが下がり腹圧が上がる" },
      { name: "骨盤底筋群（レバトルアニ等）", location: "骨盤の底をハンモック状に閉じる筋肉群", tip: "腹横筋・横隔膜・多裂筋と連動するインナーユニット。「引き上げる」感覚で使う" },
      { name: "肋間筋（外・内・最内）", location: "肋骨と肋骨の間を埋める3層の薄い筋肉", tip: "呼吸時の肋骨の動きを作る。側方呼吸（ラテラルブリージング）に直結" },
      { name: "回旋筋（短・長）", location: "脊椎の横突起から棘突起へ走る最も深い背部の小筋肉群", tip: "椎骨間の微細な回旋と脊椎の固有感覚（プロプリオセプション）に関与" },
      { name: "棘間筋・横突間筋", location: "隣接する棘突起間・横突起間をつなぐ最深層の極小筋肉", tip: "各椎骨のセグメント的安定を担う。スパインアーティキュレーション（背骨の節々の動き）に関与" },
    ],
    pilates: ["ハンドレッド", "ロールアップ / ロールダウン", "スパインストレッチ", "クリスクロス", "スワン（バックエクステンション）", "サイドベンド", "ティーザー", "リフォーマー：フットワーク（コア安定）", "リフォーマー：ショートボックスシリーズ", "リフォーマー：スキニング"],
  },
  upper: {
    label: "上半身・肩", emoji: "🔵", color: "#1E88E5", light: "#EEF5FF",
    bones: [
      { name: "肩甲骨", location: "背中の上部左右にある逆三角形の骨。烏口突起・肩峰・関節窩を持つ", tip: "上方回旋・下方回旋・挙上・下制・外転（外転）・内転の6方向に動く" },
      { name: "鎖骨", location: "首の付け根から肩へ横に走るS字状の細長い骨", tip: "肩甲骨と胸骨をつなぐ唯一の骨。肩甲帯全体の動きに関与" },
      { name: "上腕骨", location: "肩関節から肘まで。腕の上半分の1本骨", tip: "大結節（棘上筋等付着）・小結節（肩甲下筋付着）が重要なランドマーク" },
      { name: "橈骨", location: "前腕の親指側。肘〜手首の外側を走る骨", tip: "回内・回外（手のひらの向き変化）を作る主役" },
      { name: "尺骨", location: "前腕の小指側。肘の出っ張り（肘頭）が尺骨の一部", tip: "肘の屈伸に主に関わる。肘関節の安定の要" },
      { name: "手根骨（8個）", location: "手首を構成する8つの小骨（舟状骨・月状骨・三角骨・豆状骨・大菱形骨・小菱形骨・有頭骨・有鈎骨）", tip: "プランクで手首に体重がかかる時に関与。手首の柔軟性・安定に関係" },
    ],
    muscles: [
      { name: "僧帽筋（上部・中部・下部）", location: "後頭骨〜胸椎の棘突起から肩甲骨・鎖骨にかけての大きな菱形筋肉", tip: "ピラティスでは「肩を下げる」＝上部を抑えて下部を使う意識。肩こりの主犯格" },
      { name: "前鋸筋", location: "第1〜9肋骨の側面から肩甲骨内側縁へ走る、のこぎり状の筋肉", tip: "肩甲骨を胸郭に押しつける（前方に引き出す）。プランクで非常に重要。弱いと肩甲骨が浮く" },
      { name: "菱形筋（大・小）", location: "胸椎・頸椎の棘突起から肩甲骨内側縁をつなぐ菱形の筋肉", tip: "肩甲骨を脊椎方向に引き寄せる（内転）。姿勢改善・巻き肩修正の鍵" },
      { name: "広背筋", location: "胸椎下部〜腰椎〜骨盤から上腕骨小結節稜まで走る背中最大の筋肉", tip: "腕を体に引き寄せる・内旋。プルダウン系・リフォーマープルの主役" },
      { name: "大胸筋（鎖骨部・胸肋部・腹部）", location: "鎖骨・胸骨・肋骨から上腕骨大結節稜への扇状の大きな筋肉", tip: "腕を前に押し出す・内転させる。プッシュアップで主役。過緊張で巻き肩になる" },
      { name: "小胸筋", location: "第3〜5肋骨前面から肩甲骨烏口突起へ走る薄い筋肉", tip: "肩甲骨を前傾・下制させる。硬くなると肩の可動域低下・巻き肩の原因に" },
      { name: "三角筋（前部・中部・後部）", location: "鎖骨・肩峰・肩甲棘から上腕骨（三角筋粗面）への逆三角形の筋肉", tip: "前部：腕を前に上げる、中部：横に上げる、後部：後ろに引く。アームサークルで全部使う" },
      { name: "棘上筋", location: "肩甲骨棘上窩から上腕骨大結節上面へ", tip: "ローテーターカフの一部。腕を最初に外転させる（0〜15度）。最も損傷しやすい腱板筋" },
      { name: "棘下筋", location: "肩甲骨棘下窩から上腕骨大結節中面へ", tip: "ローテーターカフの一部。肩の外旋の主役。リフォーマーのアームワークで重要" },
      { name: "小円筋", location: "肩甲骨外側縁から上腕骨大結節下面へ", tip: "ローテーターカフの一部。棘下筋と協力して外旋を補助する" },
      { name: "肩甲下筋", location: "肩甲骨前面（肩甲下窩）から上腕骨小結節へ", tip: "ローテーターカフの一部で最大・最強の筋肉。肩の内旋を担う" },
      { name: "大円筋", location: "肩甲骨下角から上腕骨小結節稜へ走る丸い筋肉", tip: "腕を後ろ・下・内旋させる。広背筋と協力。「大円筋は広背筋の助手」" },
      { name: "烏口腕筋", location: "肩甲骨烏口突起から上腕骨内側面へ走る細い筋肉", tip: "肩を屈曲・内転させる補助筋。上腕二頭筋の短頭と並走する" },
      { name: "上腕二頭筋（長頭・短頭）", location: "肩甲骨から前腕橈骨（二頭筋粗面）へ走る上腕前面の2頭の筋肉", tip: "肘屈曲と前腕回外の主役。プランク・プッシュアップで肘の安定に関わる" },
      { name: "上腕三頭筋（長頭・外側頭・内側頭）", location: "肩甲骨・上腕骨後面から肘頭（尺骨）へ走る上腕後面の3頭の筋肉", tip: "肘を伸ばす唯一の筋肉。プッシュアップの押し出し・ディップスで主役" },
      { name: "前腕屈筋群・伸筋群", location: "前腕の前面（屈筋）と後面（伸筋）を覆う複数の筋肉群", tip: "手首・指の動きを作る。プランクで手首を安定させる際に関与" },
    ],
    pilates: ["アームサークル", "プランク / サイドプランク", "プッシュアップ", "スワン（肩甲骨安定）", "リフォーマー：ロングボックス・プルストラップ", "リフォーマー：アームワーク（プレス・プル・ハグ）", "リフォーマー：セレーティッドプレス"],
  },
  hip: {
    label: "股関節・骨盤底", emoji: "🟠", color: "#F57C00", light: "#FFF3E0",
    bones: [
      { name: "大腿骨頭・大腿骨頸", location: "大腿骨の最上部。球状の骨頭が骨盤の寛骨臼にはまり込む", tip: "股関節の「ボールとソケット」の構造。6方向に動ける多軸関節" },
      { name: "大転子", location: "大腿骨上部外側の大きな突起", tip: "多くの臀部・外旋筋の付着点。触ってわかる重要なランドマーク" },
      { name: "小転子", location: "大腿骨上部内側の小さな突起", tip: "腸腰筋の付着点。股関節屈曲のてこの支点" },
      { name: "坐骨結節", location: "骨盤の底部、左右に突出した骨の塊（座ったときに座面に当たる部分）", tip: "ハムストリングスの起始点。「座骨」とも言う。ハムストリングスのストレッチで意識する" },
      { name: "ASIS（上前腸骨棘）", location: "骨盤前面の左右の突起。骨盤の前の「角」に当たる部分", tip: "骨盤ニュートラル確認の最重要ランドマーク。縫工筋・大腿筋膜張筋の起始" },
      { name: "PSIS（上後腸骨棘）", location: "骨盤後面の左右の突起。腰のエクボのあたり", tip: "骨盤傾斜の後方ランドマーク。仙腸関節の近傍" },
    ],
    muscles: [
      { name: "大臀筋", location: "お尻の表層、最も大きな臀部の筋肉。腸骨・仙骨から大腿骨と腸脛靭帯へ", tip: "股関節伸展の最強筋。ブリッジ・スクワット・ランジで主役" },
      { name: "中臀筋", location: "お尻の外側・上部。腸骨翼から大腿骨大転子へ", tip: "片足立ちの安定と脚外転を担う。弱いと歩行時に骨盤が傾く（トレンデレンブルグ徴候）" },
      { name: "小臀筋", location: "中臀筋の深層。腸骨前部から大腿骨大転子前面へ", tip: "中臀筋と協力して股関節の安定・外転・内旋を補助する" },
      { name: "梨状筋", location: "仙骨前面から大腿骨大転子へ走る深層外旋筋", tip: "深層外旋六筋の一つ。坐骨神経のすぐ近くを通る。硬化すると坐骨神経痛様の痛みに" },
      { name: "上双子筋・下双子筋", location: "坐骨棘（上）・坐骨結節（下）から大腿骨大転子へ走る小筋肉", tip: "深層外旋六筋の一部。ターンアウト（外旋）を担う" },
      { name: "内閉鎖筋・外閉鎖筋", location: "閉鎖孔の内面・外面から大腿骨大転子窩へ走る筋肉", tip: "深層外旋六筋の一部。股関節を外旋させ安定させる" },
      { name: "大腿方形筋", location: "坐骨結節から大腿骨転子間稜へ走る四角形の筋肉", tip: "深層外旋六筋で最も下位。股関節の外旋を担う" },
      { name: "大腿筋膜張筋（TFL）", location: "ASIS（上前腸骨棘）から腸脛靭帯（IT Band）へ走る筋肉", tip: "股関節の屈曲・内旋・外転を担う。硬いとIT Bandが張って膝外側痛の原因に" },
      { name: "縫工筋", location: "ASISから膝内側（鵞足）まで太ももを斜めに縦断する体最長の筋肉", tip: "「お裁縫師が座る姿勢」を作る筋肉。股関節屈曲・外旋・膝屈曲に関与" },
    ],
    pilates: ["レッグサークル（股関節の可動域）", "ブリッジ（大臀筋・深層外旋筋）", "サイドキック（外転・外旋）", "ピラティスVポジション（外旋六筋）", "リフォーマー：ランジ", "リフォーマー：サイドスプリット", "リフォーマー：ヒップワーク"],
  },
  thigh: {
    label: "太もも・膝", emoji: "🟢", color: "#2E7D32", light: "#E8F5E9",
    bones: [
      { name: "大腿骨体部", location: "太ももの長い骨幹部分", tip: "人体最長・最強の骨。前面は大腿四頭筋、後面はハムストリングスが覆う" },
      { name: "膝蓋骨", location: "膝の前面にある丸い骨（お皿）。大腿四頭筋腱の中にある", tip: "大腿四頭筋の力を効率よく脛骨に伝える滑車の役割。膝伸展の効率が40%向上する" },
      { name: "脛骨", location: "すねの太い骨。膝〜足首の内側を走る", tip: "体重の85%を支える下腿主骨。膝関節・足首関節の両方に関与" },
      { name: "腓骨", location: "下腿外側の細い骨", tip: "体重の15%を支える。足首の外側安定に重要。多くの下腿筋の付着点" },
    ],
    muscles: [
      { name: "大腿直筋", location: "大腿四頭筋の1つ。ASISから膝蓋骨へ走る表層の筋肉", tip: "唯一の2関節筋（股関節屈曲＋膝伸展）。ランジ・スクワットで意識" },
      { name: "外側広筋", location: "大腿四頭筋の1つ。大腿骨外側から膝蓋骨へ走る太ももの外側を覆う筋肉", tip: "膝蓋骨を外側に引く傾向がある。内側広筋とのバランスが膝健康の鍵" },
      { name: "内側広筋（VMO）", location: "大腿四頭筋の1つ。大腿骨内側から膝蓋骨内側縁へ走る", tip: "膝最終伸展の要。VMO（内側広筋斜頭）が弱いと膝前面痛に。ピラティスで重点的に鍛える部位" },
      { name: "中間広筋", location: "大腿四頭筋の1つ。大腿骨前面の深層に位置する筋肉", tip: "大腿直筋の直下。膝蓋骨を引き上げ膝を伸ばす" },
      { name: "大腿二頭筋（長頭・短頭）", location: "ハムストリングスの外側。坐骨結節（長頭）・大腿骨（短頭）から腓骨頭へ", tip: "膝屈曲と股関節伸展に関与。スパインストレッチで「脚裏の張り」はここ" },
      { name: "半腱様筋", location: "ハムストリングスの内側。坐骨結節から脛骨内側（鵞足）へ走る", tip: "膝を曲げながら内旋させる。大腿二頭筋と拮抗関係" },
      { name: "半膜様筋", location: "ハムストリングスの最内側深層。坐骨結節から脛骨後面へ", tip: "半腱様筋と並走。膝の屈曲と内旋を担う。最も大きいハムストリングス" },
      { name: "大内転筋", location: "内転筋群最大。坐骨結節・恥骨から大腿骨内側全体へ走る", tip: "脚を閉じる動作。一部（坐骨顆部）はハムストリングスの機能も持つ" },
      { name: "長内転筋・短内転筋", location: "恥骨から大腿骨後面（粗線）へ走る内転筋群の中核", tip: "股関節内転（脚を閉じる）の主役。ピラティスVポジションで活性化" },
      { name: "薄筋（グラシリス）", location: "恥骨から脛骨内側（鵞足）まで走る内転筋群最内側の筋肉", tip: "股関節内転と膝屈曲の両方に関与する2関節筋。ストレッチで太もも内側が伸びる筋" },
      { name: "恥骨筋", location: "恥骨上枝から大腿骨後面（恥骨筋線）へ走る扁平な筋肉", tip: "内転筋群最上部。股関節の屈曲・内転・外旋を補助する" },
    ],
    pilates: ["レッグサークル（大腿四頭筋・内転筋）", "スクワット", "ランジ", "ピラティスV（内転筋）", "サイドキック（外転・内転交互）", "リフォーマー：フットワーク全種（スクワット・ルンジ等）", "リフォーマー：レッグプレス"],
  },
  foot: {
    label: "下腿・足首・足", emoji: "🟡", color: "#C0902A", light: "#FFF8E1",
    bones: [
      { name: "踵骨（かかと）", location: "足の骨の中で最大。かかとの骨", tip: "アキレス腱（腓腹筋・ヒラメ筋）の付着点。立位の安定の土台" },
      { name: "距骨", location: "踵骨の上。脛骨・腓骨との間に挟まれ足首関節を形成", tip: "足首の底屈（つま先下げ）・背屈（つま先上げ）の要の骨" },
      { name: "舟状骨", location: "距骨の前内側に位置する足根骨", tip: "内側縦アーチの頂点。扁平足・足底筋膜炎と関係が深い" },
      { name: "楔状骨（3個）・立方骨", location: "足の中央部を形成する4つの足根骨", tip: "横アーチを形成。フットバーへの荷重時に重要な中足部の骨" },
      { name: "中足骨（5本）", location: "足の甲〜指の付け根を形成する5本の長骨", tip: "「ハーフトゥ」（爪先立ちの半分）でここが地面と接する。リフォーマーのフットワークに直結" },
      { name: "趾骨（14個）", location: "足の指の骨。母趾は2節、他は3節", tip: "ポイント（底屈）・フレックス（背屈）のつま先の動きに直結" },
    ],
    muscles: [
      { name: "腓腹筋（内側頭・外側頭）", location: "ふくらはぎの表層。大腿骨後面から踵骨（アキレス腱経由）へ走る2頭の筋肉", tip: "つま先立ち（足関節底屈）と膝屈曲に関与する2関節筋。ふくらはぎの見た目の形を作る" },
      { name: "ヒラメ筋", location: "腓腹筋の深層。脛骨・腓骨後面から踵骨（アキレス腱経由）へ", tip: "腓腹筋と合わさりアキレス腱を形成。底屈の持久力担当。立位での姿勢保持に直結" },
      { name: "前脛骨筋", location: "脛骨前外側面から足の内側（第1中足骨・内側楔状骨）へ走る", tip: "足首を持ち上げる（背屈）の主役。フレックスフット。フットワーク時のつま先コントロール" },
      { name: "後脛骨筋", location: "脛骨・腓骨後面の深層から舟状骨・足底へ走る", tip: "足を内反・底屈させる。内側縦アーチのサポートに不可欠。扁平足と関係が深い" },
      { name: "長腓骨筋・短腓骨筋", location: "腓骨外側面から足底（長腓骨筋）・第5中足骨（短腓骨筋）へ走る", tip: "足を外反・底屈させる。外側アーチの安定。捻挫予防に重要。バランスワークで活躍" },
      { name: "長趾伸筋・長母趾伸筋", location: "腓骨・脛骨前面から各趾背面へ走る", tip: "足指を反らせる（伸展）・足首を背屈させる補助筋。ポイント&フレックスで意識する" },
      { name: "長趾屈筋・長母趾屈筋", location: "脛骨・腓骨後面の深層から各趾底面へ走る", tip: "足指を曲げる（屈曲）。ポイント時・つま先でバーを押す動作で使う" },
      { name: "足底筋群（内在筋）", location: "足底に位置する複数の小筋肉群（短趾屈筋・母趾外転筋・小趾外転筋・骨間筋等）", tip: "足のアーチを保持し、細かな足指の動きを作る。フットワークで地面やバーをつかむ感覚" },
    ],
    pilates: ["フットワーク（ポイント・フレックス・ハーフトゥ）", "カーフレイズ", "アンクルサークル", "リフォーマー：フットバーへの押し出し全種", "キャデラック：フットプレス", "バランスボード・フットコレクション"],
  },
};
const quizPool = Object.entries(REGIONS).flatMap(([, d]) => [
  ...d.bones.map(b => ({ type: "骨", region: d.label, color: d.color, light: d.light, ...b })),
  ...d.muscles.map(m => ({ type: "筋肉", region: d.label, color: d.color, light: d.light, ...m })),
]);
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

const MUSCLE_VIEW_MAP = {
  "胸鎖乳突筋":"front","斜角筋":"front","肩甲挙筋":"side","板状筋":"back","半棘筋":"back",
  "頭長筋":"front","舌骨上下筋群":"front",
  "腹横筋":"side","腹直筋":"front","外腹斜筋":"front","内腹斜筋":"side",
  "多裂筋":"back","脊柱起立筋":"back","腰方形筋":"side","腸腰筋":"side",
  "横隔膜":"side","骨盤底筋群":"side","肋間筋":"side","回旋筋":"back","棘間筋":"back",
  "僧帽筋":"back","前鋸筋":"front","菱形筋":"back","広背筋":"back",
  "大胸筋":"front","小胸筋":"front","三角筋":"front",
  "棘上筋":"back","棘下筋":"back","小円筋":"back","肩甲下筋":"back","大円筋":"back",
  "烏口腕筋":"front","上腕二頭筋":"front","上腕三頭筋":"back","前腕屈筋群":"front",
  "大臀筋":"back","中臀筋":"back","小臀筋":"side",
  "梨状筋":"back","上双子筋":"back","内閉鎖筋":"back","大腿方形筋":"back",
  "大腿筋膜張筋":"front","縫工筋":"front",
  "大腿直筋":"front","外側広筋":"front","内側広筋":"front","中間広筋":"front",
  "大腿二頭筋":"back","半腱様筋":"back","半膜様筋":"back",
  "大内転筋":"side","長内転筋":"front","薄筋":"side","恥骨筋":"front",
  "腓腹筋":"back","ヒラメ筋":"back","前脛骨筋":"front","後脛骨筋":"back",
  "長腓骨筋":"front","長趾伸筋":"front","長趾屈筋":"back","足底筋群":"front",
};

function getViewForMuscle(name) {
  for (const [key, view] of Object.entries(MUSCLE_VIEW_MAP)) {
    if (name.includes(key) || key.includes(name.split("（")[0])) return view;
  }
  return "front";
}

function useBH(activeRegion, activeItem, activeTab) {
  const hi = (r) => !activeRegion || activeRegion === r;
  const ma = (n) => activeItem && (activeItem.name.includes(n) || n.includes(activeItem.name.split("（")[0]));
  const S = (r, n, base="#D4453B") => ({
    fill: ma(n) ? "#FFD54F" : base, stroke: ma(n) ? "#FF6F00" : "#7B241C",
    strokeWidth: ma(n) ? 2.5 : 0.6, opacity: hi(r) ? 1 : 0.25,
    cursor:"pointer", transition:"all 0.3s", filter: ma(n) ? "url(#glow)" : "none",
  });
  const mo = (r) => hi(r) ? 1 : 0.25;
  const boneActive = (n) => activeTab === "bones" && activeItem && (activeItem.name.includes(n) || n.includes(activeItem.name.split("（")[0]));
  const bs = (n) => ({ fill:"none", stroke: boneActive(n) ? "#FFF" : "rgba(255,255,255,0.5)",
    strokeWidth: boneActive(n) ? 2.5 : 1.2, strokeDasharray: boneActive(n) ? "none" : "4,3",
    opacity: boneActive(n) ? 1 : 0.6, filter: boneActive(n) ? "url(#glow)" : "none",
    transition:"all 0.3s", pointerEvents:"none" });
  return { S, mo, bs, boneActive, hi };
}

function SvgDefs() {
  return <defs>
    <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#E8594A"/><stop offset="100%" stopColor="#C0392B"/></linearGradient>
    <pattern id="fib" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
      <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(120,30,10,0.12)" strokeWidth="0.6"/>
    </pattern>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>;
}

/* ==================== FRONT VIEW ==================== */
function BodySVGFront({ activeRegion, onSelectRegion, activeItem, activeTab }) {
  const { S, mo, bs, boneActive, hi } = useBH(activeRegion, activeItem, activeTab);
  const clk = (r) => () => onSelectRegion(r);
  return (
    <svg viewBox="0 0 300 640" style={{ width:"100%", maxWidth:280, margin:"0 auto", display:"block" }}>
      <SvgDefs/>

      {/* ===== BODY SKIN BACKGROUND ===== */}
      <ellipse cx="150" cy="36" rx="27" ry="31" fill="#F0C8A8" stroke="#D4A574" strokeWidth="1"/>
      <rect x="132" y="64" width="36" height="30" rx="10" fill="#F0C8A8"/>
      <path d="M74,108 L226,108 Q232,108 232,114 L224,300 Q218,340 150,345 Q82,340 76,300 L68,114 Q68,108 74,108 Z" fill="#F0C8A8"/>
      {/* Left arm */}
      <path d="M68,108 C54,116 46,135 46,160 L40,232 C38,248 36,268 34,290 L30,328 C28,342 26,358 30,365 C36,374 46,370 48,358 L52,328 C54,308 56,288 58,268 L64,232 C66,216 68,196 70,176 Z" fill="#F0C8A8"/>
      {/* Right arm */}
      <path d="M232,108 C246,116 254,135 254,160 L260,232 C262,248 264,268 266,290 L270,328 C272,342 274,358 270,365 C264,374 254,370 252,358 L248,328 C246,308 244,288 242,268 L236,232 C234,216 232,196 230,176 Z" fill="#F0C8A8"/>
      {/* Left leg */}
      <path d="M96,300 C90,335 86,360 86,380 L84,460 C82,470 84,480 88,492 L94,575 C96,588 94,598 98,610 L128,618 L148,616 L148,300 Z" fill="#F0C8A8"/>
      {/* Right leg */}
      <path d="M204,300 C210,335 214,360 214,380 L216,460 C218,470 216,480 212,492 L206,575 C204,588 206,598 202,610 L172,618 L152,616 L152,300 Z" fill="#F0C8A8"/>
      {/* Feet */}
      <path d="M98,608 C92,612 86,618 90,624 L130,628 C136,626 134,614 130,610 Z" fill="#F0C8A8"/>
      <path d="M202,608 C208,612 214,618 210,624 L170,628 C164,626 166,614 170,610 Z" fill="#F0C8A8"/>
      {/* Head features */}
      <circle cx="140" cy="30" r="3" fill="#6B4226"/>
      <circle cx="160" cy="30" r="3" fill="#6B4226"/>
      <path d="M143,44 Q150,50 157,44" fill="none" stroke="#6B4226" strokeWidth="1.5"/>
      {/* Ears */}
      <ellipse cx="122" cy="36" rx="5" ry="8" fill="#F0C8A8" stroke="#D4A574" strokeWidth="0.8"/>
      <ellipse cx="178" cy="36" rx="5" ry="8" fill="#F0C8A8" stroke="#D4A574" strokeWidth="0.8"/>

      {/* ===== MUSCLES ===== */}

      {/* --- NECK --- */}
      <g onClick={clk("neck")}>
        {/* SCM left */}
        <path d="M138,68 C136,74 130,84 132,94 L140,96 C141,86 142,76 144,70 Z" style={S("neck","胸鎖乳突筋","#C9453A")}/>
        {/* SCM right */}
        <path d="M162,68 C164,74 170,84 168,94 L160,96 C159,86 158,76 156,70 Z" style={S("neck","胸鎖乳突筋","#C9453A")}/>
        {/* Scalenes left */}
        <path d="M130,72 C126,80 124,90 126,98 L132,96 C132,88 132,78 134,72 Z" style={S("neck","斜角筋","#B5382E")}/>
        {/* Scalenes right */}
        <path d="M170,72 C174,80 176,90 174,98 L168,96 C168,88 168,78 166,72 Z" style={S("neck","斜角筋","#B5382E")}/>
        {/* Front neck deep */}
        <path d="M142,72 L158,72 L156,92 L144,92 Z" style={S("neck","頭長筋","#A0302A")}/>
      </g>

      {/* --- UPPER BODY --- */}
      <g onClick={clk("upper")}>
        {/* Trapezius upper left */}
        <path d="M132,82 C118,88 92,100 76,110 L80,118 C96,106 122,94 136,88 Z" style={S("upper","僧帽筋","#D4453B")}/>
        {/* Trapezius upper right */}
        <path d="M168,82 C182,88 208,100 224,110 L220,118 C204,106 178,94 164,88 Z" style={S("upper","僧帽筋","#D4453B")}/>

        {/* Deltoid left */}
        <path d="M76,110 C62,118 54,138 58,158 C60,164 66,166 70,162 C72,150 76,134 86,120 L92,114 Z" style={S("upper","三角筋","#E05A4B")}/>
        {/* Deltoid right */}
        <path d="M224,110 C238,118 246,138 242,158 C240,164 234,166 230,162 C228,150 224,134 214,120 L208,114 Z" style={S("upper","三角筋","#E05A4B")}/>

        {/* Pectoral left */}
        <path d="M92,114 C98,110 130,108 148,120 L148,178 C136,185 108,184 94,175 C82,168 76,152 78,138 Z" style={S("upper","大胸筋","#D4453B")}/>
        {/* Pec fiber lines left */}
        {[130,142,154,166].map((y,i)=><line key={`pfl${i}`} x1="148" y1={y} x2={92-i*3} y2={y+8+i*2} stroke="rgba(120,30,10,0.15)" strokeWidth="0.5" style={{opacity:mo("upper"),pointerEvents:"none"}}/>)}
        {/* Pectoral right */}
        <path d="M208,114 C202,110 170,108 152,120 L152,178 C164,185 192,184 206,175 C218,168 224,152 222,138 Z" style={S("upper","大胸筋","#D4453B")}/>
        {[130,142,154,166].map((y,i)=><line key={`pfr${i}`} x1="152" y1={y} x2={208+i*3} y2={y+8+i*2} stroke="rgba(120,30,10,0.15)" strokeWidth="0.5" style={{opacity:mo("upper"),pointerEvents:"none"}}/>)}

        {/* Serratus anterior left */}
        {[158,170,182].map((y,i)=><path key={`sl${i}`} d={`M${84-i*2},${y} L${92-i},${y+2} L${90-i},${y+10} L${82-i*2},${y+8} Z`} style={S("upper","前鋸筋","#BA3A30")}/>)}
        {/* Serratus anterior right */}
        {[158,170,182].map((y,i)=><path key={`sr${i}`} d={`M${216+i*2},${y} L${208+i},${y+2} L${210+i},${y+10} L${218+i*2},${y+8} Z`} style={S("upper","前鋸筋","#BA3A30")}/>)}

        {/* Bicep left */}
        <path d="M60,160 C54,172 50,200 48,228 C46,238 50,242 56,240 C60,234 64,210 66,190 C68,175 66,165 64,160 Z" style={S("upper","上腕二頭筋","#D94F42")}/>
        {/* Bicep right */}
        <path d="M240,160 C246,172 250,200 252,228 C254,238 250,242 244,240 C240,234 236,210 234,190 C232,175 234,165 236,160 Z" style={S("upper","上腕二頭筋","#D94F42")}/>

        {/* Tricep left (visible from outer side) */}
        <path d="M56,162 C50,170 46,195 44,225 C42,235 44,240 48,238 L50,228 C52,205 54,180 58,165 Z" style={S("upper","上腕三頭筋","#B5382E")}/>
        {/* Tricep right */}
        <path d="M244,162 C250,170 254,195 256,225 C258,235 256,240 252,238 L250,228 C248,205 246,180 242,165 Z" style={S("upper","上腕三頭筋","#B5382E")}/>

        {/* Forearm left */}
        <path d="M46,240 C42,260 38,290 36,318 C34,332 32,348 36,358 C40,366 48,362 50,352 L52,330 C54,310 56,285 58,262 L60,242 Z" style={S("upper","前腕屈筋群","#C9453A")}/>
        {/* Forearm fiber lines */}
        {[255,275,295,315].map((y,i)=><line key={`ffl${i}`} x1={56-i*2} y1={y} x2={52-i*3} y2={y+18} stroke="rgba(120,30,10,0.12)" strokeWidth="0.4" style={{opacity:mo("upper"),pointerEvents:"none"}}/>)}
        {/* Forearm right */}
        <path d="M254,240 C258,260 262,290 264,318 C266,332 268,348 264,358 C260,366 252,362 250,352 L248,330 C246,310 244,285 242,262 L240,242 Z" style={S("upper","前腕屈筋群","#C9453A")}/>
        {[255,275,295,315].map((y,i)=><line key={`ffr${i}`} x1={244+i*2} y1={y} x2={248+i*3} y2={y+18} stroke="rgba(120,30,10,0.12)" strokeWidth="0.4" style={{opacity:mo("upper"),pointerEvents:"none"}}/>)}
      </g>

      {/* --- CORE --- */}
      <g onClick={clk("core")}>
        {/* External oblique left */}
        <path d="M86,192 C82,215 80,245 82,275 C84,290 90,298 96,296 L98,278 C96,255 94,228 92,205 Z" style={S("core","外腹斜筋","#C0392B")}/>
        {/* Oblique fiber lines left */}
        {[205,225,245,265].map((y,i)=><line key={`ofl${i}`} x1={94-i} y1={y} x2={86-i} y2={y+18} stroke="rgba(120,30,10,0.15)" strokeWidth="0.4" style={{opacity:mo("core"),pointerEvents:"none"}}/>)}
        {/* External oblique right */}
        <path d="M214,192 C218,215 220,245 218,275 C216,290 210,298 204,296 L202,278 C204,255 206,228 208,205 Z" style={S("core","外腹斜筋","#C0392B")}/>
        {[205,225,245,265].map((y,i)=><line key={`ofr${i}`} x1={206+i} y1={y} x2={214+i} y2={y+18} stroke="rgba(120,30,10,0.15)" strokeWidth="0.4" style={{opacity:mo("core"),pointerEvents:"none"}}/>)}

        {/* Rectus abdominis - 8 segments */}
        {[0,1,2,3].map(row => [0,1].map(col => {
          const x = col === 0 ? 133 : 155;
          const w = 18;
          const heights = [24, 24, 22, 20];
          const gaps = [194, 222, 250, 276];
          const y = gaps[row];
          const h = heights[row];
          const xShrink = row >= 2 ? row * 1.5 : 0;
          return <rect key={`abs${row}${col}`}
            x={x + (col===0?xShrink:0)} y={y}
            width={w - (col===0?xShrink:xShrink)} height={h}
            rx="3" style={S("core","腹直筋","#D4453B")} />;
        }))}
        {/* Linea alba */}
        <line x1="150" y1="120" x2="150" y2="300" stroke="#F0C8A8" strokeWidth="3" style={{opacity:mo("core"),pointerEvents:"none"}}/>
        {/* Tendinous inscriptions */}
        {[218,246,274].map((y,i)=><line key={`ti${i}`} x1="134" y1={y} x2="166" y2={y} stroke="#F0C8A8" strokeWidth="2" style={{opacity:mo("core")*0.7,pointerEvents:"none"}}/>)}
      </g>

      {/* --- HIP --- */}
      <g onClick={clk("hip")}>
        {/* TFL / Glute med left */}
        <path d="M82,290 C78,305 78,325 84,340 L94,340 C92,322 90,305 92,292 Z" style={S("hip","大腿筋膜張筋","#D4453B")}/>
        {/* TFL / Glute med right */}
        <path d="M218,290 C222,305 222,325 216,340 L206,340 C208,322 210,305 208,292 Z" style={S("hip","大腿筋膜張筋","#D4453B")}/>
        {/* Inguinal / hip flexor left */}
        <path d="M96,296 C110,312 128,326 144,332 L148,332 L148,298 C132,294 112,292 96,296 Z" style={S("hip","縫工筋","#C9453A")}/>
        {/* Inguinal / hip flexor right */}
        <path d="M204,296 C190,312 172,326 156,332 L152,332 L152,298 C168,294 188,292 204,296 Z" style={S("hip","縫工筋","#C9453A")}/>
        {/* Gluteus medius visible left */}
        <path d="M80,285 C76,292 78,302 82,290 Z" style={S("hip","中臀筋","#BA3A30")}/>
        {/* Gluteus medius visible right */}
        <path d="M220,285 C224,292 222,302 218,290 Z" style={S("hip","中臀筋","#BA3A30")}/>
      </g>

      {/* --- THIGH --- */}
      <g onClick={clk("thigh")}>
        {/* Vastus lateralis left */}
        <path d="M86,342 C82,365 82,400 86,430 C88,445 94,458 102,462 L112,458 C108,445 106,425 106,400 C106,375 108,355 110,342 Z" style={S("thigh","外側広筋","#C0392B")}/>
        {/* Vastus lateralis right */}
        <path d="M214,342 C218,365 218,400 214,430 C212,445 206,458 198,462 L188,458 C192,445 194,425 194,400 C194,375 192,355 190,342 Z" style={S("thigh","外側広筋","#C0392B")}/>

        {/* Adductors left */}
        <path d="M136,338 C140,360 142,395 140,425 C138,445 134,458 130,462 L122,458 C126,445 128,425 128,400 C128,375 128,355 130,340 Z" style={S("thigh","長内転筋","#B03A2E")}/>
        {/* Adductors right */}
        <path d="M164,338 C160,360 158,395 160,425 C162,445 166,458 170,462 L178,458 C174,445 172,425 172,400 C172,375 172,355 170,340 Z" style={S("thigh","長内転筋","#B03A2E")}/>

        {/* Rectus femoris left */}
        <path d="M112,340 C108,358 106,385 106,412 C106,435 110,452 114,460 L126,460 C130,452 132,435 132,412 C132,385 128,358 124,340 Z" style={S("thigh","大腿直筋","#D4453B")}/>
        {/* Rectus femoris fiber lines left */}
        {[355,380,405,430].map((y,i)=><line key={`rfl${i}`} x1="118" y1={y} x2="118" y2={y+20} stroke="rgba(120,30,10,0.12)" strokeWidth="0.5" style={{opacity:mo("thigh"),pointerEvents:"none"}}/>)}
        {/* Rectus femoris right */}
        <path d="M188,340 C192,358 194,385 194,412 C194,435 190,452 186,460 L174,460 C170,452 168,435 168,412 C168,385 172,358 176,340 Z" style={S("thigh","大腿直筋","#D4453B")}/>
        {[355,380,405,430].map((y,i)=><line key={`rfr${i}`} x1="182" y1={y} x2="182" y2={y+20} stroke="rgba(120,30,10,0.12)" strokeWidth="0.5" style={{opacity:mo("thigh"),pointerEvents:"none"}}/>)}

        {/* Vastus medialis left (teardrop) */}
        <path d="M126,422 C130,432 134,448 132,460 L122,464 C118,452 116,438 120,425 Z" style={S("thigh","内側広筋","#D94F42")}/>
        {/* Vastus medialis right */}
        <path d="M174,422 C170,432 166,448 168,460 L178,464 C182,452 184,438 180,425 Z" style={S("thigh","内側広筋","#D94F42")}/>

        {/* Patella left */}
        <ellipse cx="118" cy="468" rx="11" ry="8" fill="#F5CBA7" stroke="#D4A574" strokeWidth="1" style={{opacity:mo("thigh")}}/>
        {/* Patella right */}
        <ellipse cx="182" cy="468" rx="11" ry="8" fill="#F5CBA7" stroke="#D4A574" strokeWidth="1" style={{opacity:mo("thigh")}}/>
      </g>

      {/* --- FOOT / LOWER LEG --- */}
      <g onClick={clk("foot")}>
        {/* Tibialis anterior left */}
        <path d="M112,478 C110,495 108,525 110,558 C112,568 116,572 118,568 C120,555 120,528 118,500 C116,488 114,480 114,478 Z" style={S("foot","前脛骨筋","#D4453B")}/>
        {/* Tibialis anterior right */}
        <path d="M188,478 C190,495 192,525 190,558 C188,568 184,572 182,568 C180,555 180,528 182,500 C184,488 186,480 186,478 Z" style={S("foot","前脛骨筋","#D4453B")}/>

        {/* Gastrocnemius left */}
        <path d="M98,476 C94,494 92,520 96,548 C98,558 104,562 108,556 C110,542 110,518 108,496 C106,484 102,478 100,476 Z" style={S("foot","腓腹筋","#C9453A")}/>
        {/* Gastrocnemius right */}
        <path d="M202,476 C206,494 208,520 204,548 C202,558 196,562 192,556 C190,542 190,518 192,496 C194,484 198,478 200,476 Z" style={S("foot","腓腹筋","#C9453A")}/>

        {/* Peroneus left */}
        <path d="M96,480 C92,498 90,525 92,555 C93,562 96,564 98,560 C100,545 100,520 100,498 Z" style={S("foot","長腓骨筋","#BA3A30")}/>
        {/* Peroneus right */}
        <path d="M204,480 C208,498 210,525 208,555 C207,562 204,564 202,560 C200,545 200,520 200,498 Z" style={S("foot","長腓骨筋","#BA3A30")}/>

        {/* Soleus left */}
        <path d="M100,555 C102,565 106,572 110,574 L108,570 C106,562 104,558 102,555 Z" style={S("foot","ヒラメ筋","#A0302A")}/>
        {/* Soleus right */}
        <path d="M200,555 C198,565 194,572 190,574 L192,570 C194,562 196,558 198,555 Z" style={S("foot","ヒラメ筋","#A0302A")}/>

        {/* Achilles tendon left */}
        <path d="M106,572 L108,592 L104,592 L102,572 Z" fill="#F5CBA7" stroke="#D4A574" strokeWidth="0.5" style={{opacity:mo("foot")}}/>
        {/* Achilles tendon right */}
        <path d="M194,572 L192,592 L196,592 L198,572 Z" fill="#F5CBA7" stroke="#D4A574" strokeWidth="0.5" style={{opacity:mo("foot")}}/>

        {/* Foot muscles left */}
        <path d="M98,608 C92,612 86,618 90,624 L128,628 C134,624 132,616 128,610 Z" style={S("foot","足底筋群","#C9453A")}/>
        {/* Foot muscles right */}
        <path d="M202,608 C208,612 214,618 210,624 L172,628 C166,624 168,616 172,610 Z" style={S("foot","足底筋群","#C9453A")}/>
      </g>

      {/* ===== BONE OVERLAY (when bones tab active) ===== */}
      {activeTab === "bones" && (
        <g>
          {/* Spine */}
          <path d="M150,68 L150,320" style={bs("椎")}/>
          {/* Cervical vertebrae dots */}
          {[72,78,84,90].map((y,i)=><circle key={`cv${i}`} cx="150" cy={y} r={boneActive("頸椎")?3:1.5} fill={boneActive("頸椎")?"white":"rgba(255,255,255,0.5)"} style={{transition:"all 0.3s"}}/>)}
          {/* Thoracic vertebrae */}
          {[100,115,130,145,160,175,190].map((y,i)=><circle key={`tv${i}`} cx="150" cy={y} r={boneActive("胸椎")?2.5:1.2} fill={boneActive("胸椎")?"white":"rgba(255,255,255,0.4)"} style={{transition:"all 0.3s"}}/>)}
          {/* Lumbar vertebrae */}
          {[210,230,250,270,285].map((y,i)=><circle key={`lv${i}`} cx="150" cy={y} r={boneActive("腰椎")?3:1.5} fill={boneActive("腰椎")?"white":"rgba(255,255,255,0.4)"} style={{transition:"all 0.3s"}}/>)}
          {/* Sacrum */}
          <path d="M144,295 L156,295 L152,320 L148,320 Z" style={bs("仙骨")}/>
          {/* Clavicles */}
          <path d="M150,98 C130,96 100,100 78,110" style={bs("鎖骨")}/>
          <path d="M150,98 C170,96 200,100 222,110" style={bs("鎖骨")}/>
          {/* Sternum */}
          <path d="M150,100 L150,192" style={bs("胸骨")}/>
          {/* Ribs */}
          {[110,125,140,155,170,182].map((y,i)=><g key={`rib${i}`}>
            <path d={`M150,${y} Q${120-i*3},${y+8} ${85-i*2},${y+4}`} style={bs("肋骨")}/>
            <path d={`M150,${y} Q${180+i*3},${y+8} ${215+i*2},${y+4}`} style={bs("肋骨")}/>
          </g>)}
          {/* Pelvis */}
          <path d="M92,286 Q120,275 150,280 Q180,275 208,286 L212,310 Q200,330 150,335 Q100,330 88,310 Z" style={bs("骨盤")}/>
          {/* Femur left */}
          <path d="M108,340 L116,455" style={bs("大腿骨")}/>
          {/* Femur right */}
          <path d="M192,340 L184,455" style={bs("大腿骨")}/>
          {/* Patella bones */}
          <ellipse cx="118" cy="468" rx="8" ry="6" style={bs("膝蓋骨")}/>
          <ellipse cx="182" cy="468" rx="8" ry="6" style={bs("膝蓋骨")}/>
          {/* Tibia left */}
          <path d="M116,478 L112,580" style={bs("脛骨")}/>
          {/* Tibia right */}
          <path d="M184,478 L188,580" style={bs("脛骨")}/>
          {/* Fibula left */}
          <path d="M104,478 L100,575" style={bs("腓骨")}/>
          {/* Fibula right */}
          <path d="M196,478 L200,575" style={bs("腓骨")}/>
          {/* Humerus */}
          <path d="M72,112 L50,235" style={bs("上腕骨")}/>
          <path d="M228,112 L250,235" style={bs("上腕骨")}/>
          {/* Radius/Ulna */}
          <path d="M50,238 L36,330" style={bs("橈骨")}/>
          <path d="M48,238 L38,328" style={bs("尺骨")}/>
          <path d="M250,238 L264,330" style={bs("橈骨")}/>
          <path d="M252,238 L262,328" style={bs("尺骨")}/>
          {/* Foot bones */}
          <path d="M112,582 L108,610 L96,618" style={bs("踵骨")}/>
          <path d="M188,582 L192,610 L204,618" style={bs("踵骨")}/>
        </g>
      )}

      {/* ===== FIBER TEXTURE OVERLAY ===== */}
      <rect x="0" y="0" width="300" height="640" fill="url(#fib)" opacity="0.3" pointerEvents="none"/>

      {/* ===== REGION LABELS ===== */}
      <text x="150" y="82" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("neck")?0.9:0.2,pointerEvents:"none"}}>首</text>
      <text x="150" y="150" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold" style={{opacity:hi("upper")?0.9:0.2,pointerEvents:"none"}}>胸</text>
      <text x="150" y="256" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold" style={{opacity:hi("core")?0.9:0.2,pointerEvents:"none"}}>コア</text>
      <text x="150" y="316" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("hip")?0.9:0.2,pointerEvents:"none"}}>股関節</text>
      <text x="118" y="405" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("thigh")?0.9:0.2,pointerEvents:"none"}}>太もも</text>
      <text x="118" y="530" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("foot")?0.8:0.2,pointerEvents:"none"}}>下腿</text>
    </svg>
  );
}

/* ==================== BACK VIEW ==================== */
function BodySVGBack({ activeRegion, onSelectRegion, activeItem, activeTab }) {
  const { S, mo, bs, boneActive, hi } = useBH(activeRegion, activeItem, activeTab);
  const clk = (r) => () => onSelectRegion(r);
  return (
    <svg viewBox="0 0 300 640" style={{ width:"100%", maxWidth:280, margin:"0 auto", display:"block" }}>
      <SvgDefs/>
      {/* Body skin background (back) */}
      <ellipse cx="150" cy="36" rx="27" ry="31" fill="#F0C8A8" stroke="#D4A574" strokeWidth="1"/>
      <rect x="132" y="64" width="36" height="30" rx="10" fill="#F0C8A8"/>
      <path d="M74,108 L226,108 Q232,108 232,114 L224,300 Q218,340 150,345 Q82,340 76,300 L68,114 Q68,108 74,108 Z" fill="#F0C8A8"/>
      <path d="M68,108 C54,116 46,135 46,160 L40,232 C38,248 36,268 34,290 L30,328 C28,342 26,358 30,365 C36,374 46,370 48,358 L52,328 C54,308 56,288 58,268 L64,232 C66,216 68,196 70,176 Z" fill="#F0C8A8"/>
      <path d="M232,108 C246,116 254,135 254,160 L260,232 C262,248 264,268 266,290 L270,328 C272,342 274,358 270,365 C264,374 254,370 252,358 L248,328 C246,308 244,288 242,268 L236,232 C234,216 232,196 230,176 Z" fill="#F0C8A8"/>
      <path d="M96,300 C90,335 86,360 86,380 L84,460 C82,470 84,480 88,492 L94,575 C96,588 94,598 98,610 L128,618 L148,616 L148,300 Z" fill="#F0C8A8"/>
      <path d="M204,300 C210,335 214,360 214,380 L216,460 C218,470 216,480 212,492 L206,575 C204,588 206,598 202,610 L172,618 L152,616 L152,300 Z" fill="#F0C8A8"/>
      <path d="M98,608 C92,612 86,618 90,624 L130,628 C136,626 134,614 130,610 Z" fill="#F0C8A8"/>
      <path d="M202,608 C208,612 214,618 210,624 L170,628 C164,626 166,614 170,610 Z" fill="#F0C8A8"/>
      {/* Back of head */}
      <path d="M128,20 Q150,8 172,20 Q178,30 176,45 L124,45 Q122,30 128,20 Z" fill="#8B6914" opacity="0.3"/>
      <ellipse cx="122" cy="36" rx="5" ry="8" fill="#F0C8A8" stroke="#D4A574" strokeWidth="0.8"/>
      <ellipse cx="178" cy="36" rx="5" ry="8" fill="#F0C8A8" stroke="#D4A574" strokeWidth="0.8"/>

      {/* NECK back */}
      <g onClick={clk("neck")}>
        <path d="M136,68 C132,76 128,86 130,96 L140,96 C140,86 140,78 138,70 Z" style={S("neck","板状筋","#B5382E")}/>
        <path d="M164,68 C168,76 172,86 170,96 L160,96 C160,86 160,78 162,70 Z" style={S("neck","板状筋","#B5382E")}/>
        <path d="M140,70 L160,70 L158,94 L142,94 Z" style={S("neck","半棘筋","#A0302A")}/>
      </g>

      {/* UPPER back */}
      <g onClick={clk("upper")}>
        {/* Trapezius full */}
        <path d="M150,68 C125,78 88,98 74,112 L78,120 L86,168 C105,152 135,136 150,130 C165,136 195,152 214,168 L222,120 L226,112 C212,98 175,78 150,68 Z" style={S("upper","僧帽筋","#D4453B")}/>
        {/* Spine line through trap */}
        <line x1="150" y1="68" x2="150" y2="168" stroke="rgba(120,30,10,0.2)" strokeWidth="1.5" style={{opacity:mo("upper"),pointerEvents:"none"}}/>

        {/* Infraspinatus left */}
        <path d="M100,122 C94,132 90,148 94,162 L116,162 C118,148 114,132 108,122 Z" style={S("upper","棘下筋","#C9453A")}/>
        <path d="M200,122 C206,132 210,148 206,162 L184,162 C182,148 186,132 192,122 Z" style={S("upper","棘下筋","#C9453A")}/>

        {/* Teres minor */}
        <path d="M90,163 C86,170 84,178 88,184 L104,178 C104,172 98,165 94,163 Z" style={S("upper","小円筋","#BA3A30")}/>
        <path d="M210,163 C214,170 216,178 212,184 L196,178 C196,172 202,165 206,163 Z" style={S("upper","小円筋","#BA3A30")}/>

        {/* Teres major */}
        <path d="M86,185 C80,194 78,204 82,210 L100,204 C98,196 94,188 90,185 Z" style={S("upper","大円筋","#B03A2E")}/>
        <path d="M214,185 C220,194 222,204 218,210 L200,204 C202,196 206,188 210,185 Z" style={S("upper","大円筋","#B03A2E")}/>

        {/* Latissimus dorsi */}
        <path d="M82,210 C78,235 76,265 80,290 L96,298 C94,265 92,235 90,215 Z" style={S("upper","広背筋","#A0302A")}/>
        <path d="M218,210 C222,235 224,265 220,290 L204,298 C206,265 208,235 210,215 Z" style={S("upper","広背筋","#A0302A")}/>

        {/* Rhomboids */}
        <path d="M140,118 C134,128 128,145 130,165 L140,165 C142,145 142,130 144,120 Z" style={S("upper","菱形筋","#B5382E")}/>
        <path d="M160,118 C166,128 172,145 170,165 L160,165 C158,145 158,130 156,120 Z" style={S("upper","菱形筋","#B5382E")}/>

        {/* Deltoid posterior */}
        <path d="M74,112 C64,120 56,138 58,158 C60,164 64,166 68,162 L78,132 Z" style={S("upper","三角筋","#E05A4B")}/>
        <path d="M226,112 C236,120 244,138 242,158 C240,164 236,166 232,162 L222,132 Z" style={S("upper","三角筋","#E05A4B")}/>

        {/* Triceps */}
        <path d="M60,160 C54,178 48,208 46,232 C44,242 48,246 54,244 C58,236 62,215 66,192 C68,178 66,166 64,160 Z" style={S("upper","上腕三頭筋","#C9453A")}/>
        <path d="M240,160 C246,178 252,208 254,232 C256,242 252,246 246,244 C242,236 238,215 234,192 C232,178 234,166 236,160 Z" style={S("upper","上腕三頭筋","#C9453A")}/>

        {/* Forearm back */}
        <path d="M46,244 C42,262 38,292 36,320 C34,334 32,350 36,360 C40,368 48,364 50,354 L52,332 C54,310 56,288 58,264 L60,246 Z" style={S("upper","前腕屈筋群","#C9453A")}/>
        <path d="M254,244 C258,262 262,292 264,320 C266,334 268,350 264,360 C260,368 252,364 250,354 L248,332 C246,310 244,288 242,264 L240,246 Z" style={S("upper","前腕屈筋群","#C9453A")}/>
      </g>

      {/* CORE back */}
      <g onClick={clk("core")}>
        {/* Erector spinae left */}
        <path d="M138,170 C136,210 136,250 138,290 L146,290 C148,250 148,210 146,170 Z" style={S("core","脊柱起立筋","#C0392B")}/>
        <path d="M154,170 C152,210 152,250 154,290 L162,290 C164,250 164,210 162,170 Z" style={S("core","脊柱起立筋","#C0392B")}/>
        {/* Multifidus (deep, semi-transparent) */}
        <path d="M146,180 L154,180 L154,285 L146,285 Z" style={{...S("core","多裂筋","#922B21"), opacity: hi("core") ? 0.5 : 0.15}}/>
        {/* Spine center line */}
        <line x1="150" y1="170" x2="150" y2="295" stroke="rgba(245,203,167,0.6)" strokeWidth="2" style={{opacity:mo("core"),pointerEvents:"none"}}/>
      </g>

      {/* HIP back */}
      <g onClick={clk("hip")}>
        {/* Gluteus maximus */}
        <path d="M84,296 C78,315 80,345 90,365 C98,378 115,382 130,374 C140,366 146,350 148,335 L148,296 C128,290 106,288 84,296 Z" style={S("hip","大臀筋","#D4453B")}/>
        <path d="M216,296 C222,315 220,345 210,365 C202,378 185,382 170,374 C160,366 154,350 152,335 L152,296 C172,290 194,288 216,296 Z" style={S("hip","大臀筋","#D4453B")}/>
        {/* Glute med */}
        <path d="M82,282 C78,290 80,298 86,296 L96,296 C92,290 88,284 84,282 Z" style={S("hip","中臀筋","#BA3A30")}/>
        <path d="M218,282 C222,290 220,298 214,296 L204,296 C208,290 212,284 216,282 Z" style={S("hip","中臀筋","#BA3A30")}/>
        {/* Piriformis (deep) */}
        <path d="M148,310 C138,315 122,322 114,330 L118,336 C128,328 140,320 148,316 Z" style={{...S("hip","梨状筋","#A0302A"), opacity: hi("hip") ? 0.5 : 0.15}}/>
        <path d="M152,310 C162,315 178,322 186,330 L182,336 C172,328 160,320 152,316 Z" style={{...S("hip","梨状筋","#A0302A"), opacity: hi("hip") ? 0.5 : 0.15}}/>
      </g>

      {/* THIGH back (hamstrings) */}
      <g onClick={clk("thigh")}>
        {/* Biceps femoris (outer) */}
        <path d="M86,368 C82,395 82,425 86,450 C90,460 98,466 106,468 L114,462 C110,450 108,430 108,405 C108,385 110,372 112,365 Z" style={S("thigh","大腿二頭筋","#C0392B")}/>
        <path d="M214,368 C218,395 218,425 214,450 C210,460 202,466 194,468 L186,462 C190,450 192,430 192,405 C192,385 190,372 188,365 Z" style={S("thigh","大腿二頭筋","#C0392B")}/>
        {/* Semitendinosus (middle) */}
        <path d="M114,365 C112,390 112,420 114,448 C116,458 122,466 128,468 L134,462 C130,450 128,428 128,405 C128,385 130,372 132,366 Z" style={S("thigh","半腱様筋","#D4453B")}/>
        <path d="M186,365 C188,390 188,420 186,448 C184,458 178,466 172,468 L166,462 C170,450 172,428 172,405 C172,385 170,372 168,366 Z" style={S("thigh","半腱様筋","#D4453B")}/>
        {/* Semimembranosus (inner) */}
        <path d="M134,368 C136,392 138,420 136,448 C134,458 130,464 126,466 L120,460 C124,450 126,430 126,408 C126,388 126,375 128,368 Z" style={S("thigh","半膜様筋","#BA3A30")}/>
        <path d="M166,368 C164,392 162,420 164,448 C166,458 170,464 174,466 L180,460 C176,450 174,430 174,408 C174,388 174,375 172,368 Z" style={S("thigh","半膜様筋","#BA3A30")}/>
        {/* Knee back */}
        <ellipse cx="118" cy="470" rx="16" ry="8" fill="#F5CBA7" stroke="#D4A574" strokeWidth="0.8" style={{opacity:mo("thigh")}}/>
        <ellipse cx="182" cy="470" rx="16" ry="8" fill="#F5CBA7" stroke="#D4A574" strokeWidth="0.8" style={{opacity:mo("thigh")}}/>
      </g>

      {/* FOOT back (calves) */}
      <g onClick={clk("foot")}>
        {/* Gastrocnemius medial head left */}
        <path d="M104,476 C98,496 96,525 100,555 C102,565 110,572 118,568 C122,558 122,530 118,500 C116,488 110,478 108,476 Z" style={S("foot","腓腹筋","#D4453B")}/>
        <path d="M196,476 C202,496 204,525 200,555 C198,565 190,572 182,568 C178,558 178,530 182,500 C184,488 190,478 192,476 Z" style={S("foot","腓腹筋","#D4453B")}/>
        {/* Gastrocnemius lateral head */}
        <path d="M92,478 C88,496 86,522 90,548 C92,558 98,562 104,558 C106,548 106,525 104,500 C102,488 98,480 96,478 Z" style={S("foot","腓腹筋","#C9453A")}/>
        <path d="M208,478 C212,496 214,522 210,548 C208,558 202,562 196,558 C194,548 194,525 196,500 C198,488 202,480 204,478 Z" style={S("foot","腓腹筋","#C9453A")}/>
        {/* Soleus */}
        <path d="M98,555 C100,565 106,574 112,576 L110,570 C106,564 102,558 100,555 Z" style={S("foot","ヒラメ筋","#A0302A")}/>
        <path d="M202,555 C200,565 194,574 188,576 L190,570 C194,564 198,558 200,555 Z" style={S("foot","ヒラメ筋","#A0302A")}/>
        {/* Posterior tibialis */}
        <path d="M110,508 C108,528 108,550 110,568 L114,566 C116,548 116,528 114,508 Z" style={S("foot","後脛骨筋","#B5382E")}/>
        <path d="M190,508 C192,528 192,550 190,568 L186,566 C184,548 184,528 186,508 Z" style={S("foot","後脛骨筋","#B5382E")}/>
        {/* Achilles */}
        <path d="M108,574 L110,594 L106,594 L104,574 Z" fill="#F5CBA7" stroke="#D4A574" strokeWidth="0.5" style={{opacity:mo("foot")}}/>
        <path d="M192,574 L190,594 L194,594 L196,574 Z" fill="#F5CBA7" stroke="#D4A574" strokeWidth="0.5" style={{opacity:mo("foot")}}/>
        {/* Foot back */}
        <path d="M98,608 C92,612 86,618 90,624 L128,628 C134,624 132,616 128,610 Z" style={S("foot","足底筋群","#C9453A")}/>
        <path d="M202,608 C208,612 214,618 210,624 L172,628 C166,624 168,616 172,610 Z" style={S("foot","足底筋群","#C9453A")}/>
        {/* Long flexors */}
        <path d="M106,530 C104,548 104,565 106,572 L110,570 C112,562 112,548 110,530 Z" style={S("foot","長趾屈筋","#A0302A")}/>
        <path d="M194,530 C196,548 196,565 194,572 L190,570 C188,562 188,548 190,530 Z" style={S("foot","長趾屈筋","#A0302A")}/>
      </g>

      {/* Bone overlay back */}
      {activeTab === "bones" && <g>
        <path d="M150,68 L150,320" style={bs("椎")}/>
        {[72,78,84,90].map((y,i)=><circle key={`cv${i}`} cx="150" cy={y} r={boneActive("頸椎")?3:1.5} fill={boneActive("頸椎")?"white":"rgba(255,255,255,0.5)"} style={{transition:"all 0.3s"}}/>)}
        {[100,115,130,145,160,175,190].map((y,i)=><circle key={`tv${i}`} cx="150" cy={y} r={boneActive("胸椎")?2.5:1.2} fill={boneActive("胸椎")?"white":"rgba(255,255,255,0.4)"} style={{transition:"all 0.3s"}}/>)}
        {[210,230,250,270,285].map((y,i)=><circle key={`lv${i}`} cx="150" cy={y} r={boneActive("腰椎")?3:1.5} fill={boneActive("腰椎")?"white":"rgba(255,255,255,0.4)"} style={{transition:"all 0.3s"}}/>)}
        <path d="M144,295 L156,295 L152,320 L148,320 Z" style={bs("仙骨")}/>
        {/* Scapulae */}
        <path d="M118,110 L96,120 L92,165 L120,168 L130,135 Z" style={bs("肩甲骨")}/>
        <path d="M182,110 L204,120 L208,165 L180,168 L170,135 Z" style={bs("肩甲骨")}/>
        <path d="M92,286 Q120,275 150,280 Q180,275 208,286 L212,310 Q200,330 150,335 Q100,330 88,310 Z" style={bs("骨盤")}/>
        <path d="M108,340 L116,455" style={bs("大腿骨")}/>
        <path d="M192,340 L184,455" style={bs("大腿骨")}/>
        <path d="M116,478 L112,580" style={bs("脛骨")}/>
        <path d="M184,478 L188,580" style={bs("脛骨")}/>
        <path d="M72,112 L50,235" style={bs("上腕骨")}/>
        <path d="M228,112 L250,235" style={bs("上腕骨")}/>
      </g>}

      <rect x="0" y="0" width="300" height="640" fill="url(#fib)" opacity="0.3" pointerEvents="none"/>
      <text x="150" y="82" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("neck")?0.9:0.2,pointerEvents:"none"}}>首</text>
      <text x="150" y="148" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold" style={{opacity:hi("upper")?0.9:0.2,pointerEvents:"none"}}>背中</text>
      <text x="150" y="240" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold" style={{opacity:hi("core")?0.9:0.2,pointerEvents:"none"}}>脊柱</text>
      <text x="150" y="340" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("hip")?0.9:0.2,pointerEvents:"none"}}>臀部</text>
      <text x="118" y="420" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("thigh")?0.9:0.2,pointerEvents:"none"}}>ハム</text>
      <text x="110" y="535" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("foot")?0.8:0.2,pointerEvents:"none"}}>ふくらはぎ</text>
    </svg>
  );
}

/* ==================== SIDE VIEW ==================== */
function BodySVGSide({ activeRegion, onSelectRegion, activeItem, activeTab }) {
  const { S, mo, bs, boneActive, hi } = useBH(activeRegion, activeItem, activeTab);
  const clk = (r) => () => onSelectRegion(r);
  return (
    <svg viewBox="0 0 300 640" style={{ width:"100%", maxWidth:280, margin:"0 auto", display:"block" }}>
      <SvgDefs/>
      {/* Side body silhouette (facing right) */}
      <ellipse cx="155" cy="36" rx="28" ry="31" fill="#F0C8A8" stroke="#D4A574" strokeWidth="1"/>
      {/* Nose */}
      <path d="M183,32 C186,36 185,42 182,44" fill="none" stroke="#D4A574" strokeWidth="1.2"/>
      {/* Eye */}
      <circle cx="168" cy="30" r="2.5" fill="#6B4226"/>
      {/* Ear */}
      <ellipse cx="132" cy="36" rx="5" ry="8" fill="#F0C8A8" stroke="#D4A574" strokeWidth="0.8"/>
      {/* Neck */}
      <rect x="140" y="64" width="30" height="30" rx="8" fill="#F0C8A8"/>
      {/* Torso side */}
      <path d="M125,94 C120,100 115,120 115,160 L112,200 C110,240 112,270 118,300 L180,300 C186,270 188,240 186,200 L184,160 C184,120 180,100 175,94 Z" fill="#F0C8A8"/>
      {/* Arm */}
      <path d="M178,100 C192,110 200,130 198,160 L200,232 C202,260 204,290 202,320 C200,340 196,355 190,358 C184,360 180,352 182,340 L184,310 C186,285 184,260 182,235 L180,200 C178,180 178,160 180,140 Z" fill="#F0C8A8"/>
      {/* Leg */}
      <path d="M118,300 C112,330 110,360 112,395 L114,460 C112,475 114,490 118,500 L124,575 C126,590 124,600 128,612 L170,618 L170,612 C166,600 168,590 166,575 L160,500 C156,490 154,475 156,460 L158,395 C160,360 162,330 164,300 Z" fill="#F0C8A8"/>
      {/* Foot */}
      <path d="M126,610 C120,614 116,620 120,626 L172,628 C178,624 176,616 172,612 Z" fill="#F0C8A8"/>

      {/* NECK side */}
      <g onClick={clk("neck")}>
        <path d="M142,66 C138,74 134,84 136,94 L146,94 C146,84 146,76 144,68 Z" style={S("neck","肩甲挙筋","#C9453A")}/>
        <path d="M148,66 C152,72 158,80 160,92 L154,94 C152,82 150,74 148,68 Z" style={S("neck","胸鎖乳突筋","#D4453B")}/>
      </g>

      {/* UPPER side */}
      <g onClick={clk("upper")}>
        {/* Deltoid side */}
        <path d="M176,96 C190,104 198,125 196,148 C194,156 190,158 186,154 C184,142 182,125 178,110 Z" style={S("upper","三角筋","#E05A4B")}/>
        {/* Pec edge */}
        <path d="M170,110 C176,115 182,130 180,150 L172,148 C174,132 172,118 170,112 Z" style={S("upper","大胸筋","#D4453B")}/>
        {/* Serratus */}
        {[140,152,164,176].map((y,i)=><path key={`ss${i}`} d={`M${120+i},${y} L${130+i},${y+2} L${128+i},${y+10} L${118+i},${y+8} Z`} style={S("upper","前鋸筋","#BA3A30")}/>)}
        {/* Lat edge */}
        <path d="M122,170 C118,200 116,240 120,275 L128,278 C126,245 124,210 126,175 Z" style={S("upper","広背筋","#A0302A")}/>
        {/* Bicep */}
        <path d="M188,152 C192,168 194,195 192,222 C190,232 186,235 184,230 C182,218 180,195 182,172 C183,162 186,155 188,152 Z" style={S("upper","上腕二頭筋","#D94F42")}/>
        {/* Tricep */}
        <path d="M184,154 C180,170 178,198 180,226 C182,234 186,236 188,230 L190,224 C192,200 190,175 186,158 Z" style={S("upper","上腕三頭筋","#B5382E")}/>
      </g>

      {/* CORE side */}
      <g onClick={clk("core")}>
        {/* External oblique */}
        <path d="M126,195 C122,220 120,250 122,280 L132,282 C130,252 130,222 132,198 Z" style={S("core","外腹斜筋","#C0392B")}/>
        {/* Internal oblique */}
        <path d="M132,200 C130,225 128,255 130,282 L140,284 C138,256 138,228 140,202 Z" style={{...S("core","内腹斜筋","#BA3A30"), opacity: hi("core") ? 0.7 : 0.2}}/>
        {/* Rectus edge */}
        <path d="M160,195 C164,220 166,255 164,288 L158,290 C156,258 154,225 156,198 Z" style={S("core","腹直筋","#D4453B")}/>
        {/* TVA (deep, semi-transparent wrap) */}
        <path d="M118,210 L172,210 L170,280 L116,280 Z" style={{fill:"rgba(160,48,42,0.15)", stroke:"#A0302A", strokeWidth:1, strokeDasharray:"4,3", opacity: hi("core") ? 0.5 : 0.1, pointerEvents:"none"}}/>
        <text x="145" y="248" textAnchor="middle" fontSize="6" fill="#A0302A" style={{opacity: hi("core") ? 0.6 : 0.1}}>TVA</text>
        {/* Diaphragm schematic */}
        <path d="M118,192 Q148,172 178,192" fill="none" stroke={boneActive("横隔膜")||activeItem?.name?.includes("横隔膜")?"#FFD54F":"#D4453B"} strokeWidth="2" strokeDasharray="3,2" style={{opacity: hi("core") ? 0.7 : 0.2}}/>
        <text x="148" y="186" textAnchor="middle" fontSize="5" fill="#D4453B" style={{opacity: hi("core") ? 0.5 : 0.1}}>横隔膜</text>
        {/* QL */}
        <path d="M122,198 L120,278 L128,280 L130,200 Z" style={S("core","腰方形筋","#922B21")}/>
        {/* Psoas / Iliopsoas (deep) */}
        <path d="M148,218 C146,245 142,275 138,305 C135,325 134,345 136,360 L144,360 C142,342 142,322 144,302 C148,272 150,242 152,220 Z" style={{...S("core","腸腰筋","#B03A2E"), opacity: hi("core") ? 0.5 : 0.15}}/>
        <text x="142" y="310" textAnchor="middle" fontSize="5" fill="white" style={{opacity: hi("core") ? 0.5 : 0.1}}>腸腰筋</text>
        {/* Pelvic floor schematic */}
        <path d="M128,328 Q148,340 168,328" fill="none" stroke={activeItem?.name?.includes("骨盤底")?"#FFD54F":"#D4453B"} strokeWidth="2" strokeDasharray="3,2" style={{opacity: hi("core") ? 0.6 : 0.15}}/>
        {/* Intercostals */}
        {[120,135,150,165,178].map((y,i)=><line key={`ic${i}`} x1="120" y1={y} x2="175" y2={y} stroke={activeItem?.name?.includes("肋間")?"#FFD54F":"rgba(120,30,10,0.25)"} strokeWidth={activeItem?.name?.includes("肋間")?1.5:0.6} style={{opacity:mo("core"),pointerEvents:"none"}}/>)}
      </g>

      {/* HIP side */}
      <g onClick={clk("hip")}>
        {/* TFL + IT band */}
        <path d="M116,292 C112,310 112,340 116,370 L124,372 C122,342 122,312 124,296 Z" style={S("hip","大腿筋膜張筋","#D4453B")}/>
        <path d="M116,370 L118,460 L124,460 L124,372 Z" style={{fill:"#F5CBA7",stroke:"#D4A574",strokeWidth:0.6,opacity:mo("hip")}}/>
        {/* Glute med (side, upper) */}
        <path d="M118,284 C114,292 114,302 118,308 L128,306 C128,298 126,290 124,286 Z" style={S("hip","中臀筋","#C9453A")}/>
        {/* Small gluteus */}
        <path d="M120,296 C116,302 116,310 120,316 L128,314 C128,308 126,300 124,298 Z" style={{...S("hip","小臀筋","#BA3A30"), opacity: hi("hip") ? 0.5 : 0.15}}/>
      </g>

      {/* THIGH side */}
      <g onClick={clk("thigh")}>
        {/* Quad profile */}
        <path d="M156,340 C162,370 164,405 162,440 C160,455 156,462 150,464 L144,460 C146,448 148,420 148,395 C148,370 148,350 150,340 Z" style={S("thigh","大腿直筋","#D4453B")}/>
        {/* Vastus lat profile */}
        <path d="M118,345 C114,370 114,405 118,440 C120,455 126,462 132,464 L138,460 C134,448 132,420 132,400 C132,375 134,355 136,345 Z" style={S("thigh","外側広筋","#C0392B")}/>
        {/* Adductor magnus */}
        <path d="M152,345 C156,370 158,400 156,435 C154,450 150,460 146,462 L140,458 C144,448 146,425 146,405 C146,380 146,358 148,345 Z" style={S("thigh","大内転筋","#B03A2E")}/>
        {/* Gracilis */}
        <path d="M158,350 C160,375 160,410 158,445 C156,455 154,460 150,462 L148,458 C152,448 154,415 154,390 C154,368 154,355 156,350 Z" style={S("thigh","薄筋","#A0302A")}/>
        <ellipse cx="142" cy="468" rx="16" ry="8" fill="#F5CBA7" stroke="#D4A574" strokeWidth="0.8" style={{opacity:mo("thigh")}}/>
      </g>

      {/* FOOT side */}
      <g onClick={clk("foot")}>
        <path d="M134,478 C130,498 128,525 132,558 C134,568 140,574 146,570 C148,558 148,530 146,502 C144,488 140,480 138,478 Z" style={S("foot","腓腹筋","#C9453A")}/>
        <path d="M126,480 C122,500 120,530 124,558 C126,565 130,568 134,564 C134,548 134,525 132,502 C130,490 128,482 128,480 Z" style={S("foot","長腓骨筋","#BA3A30")}/>
        <path d="M148,480 C152,498 154,525 152,555 C150,565 146,568 144,564 C142,550 142,528 144,502 C146,490 148,482 148,480 Z" style={S("foot","前脛骨筋","#D4453B")}/>
        <path d="M132,560 C134,568 140,576 146,578 L144,572 C140,566 136,562 134,560 Z" style={S("foot","ヒラメ筋","#A0302A")}/>
        <path d="M140,576 L142,596 L138,596 L136,576 Z" fill="#F5CBA7" stroke="#D4A574" strokeWidth="0.5" style={{opacity:mo("foot")}}/>
        <path d="M128,610 C122,614 118,620 122,626 L172,628 C178,624 176,616 172,612 Z" style={S("foot","足底筋群","#C9453A")}/>
      </g>

      {/* Bone overlay side */}
      {activeTab === "bones" && <g>
        {/* Spine with curves */}
        <path d="M150,68 C148,80 146,90 148,100 C150,120 152,140 150,160 C146,180 142,200 144,220 C146,250 148,270 146,290 L148,320" style={bs("椎")}/>
        {/* Ribs side */}
        {[108,122,136,150,164,178].map((y,i)=><path key={`rs${i}`} d={`M${148-i},${y} Q${160},${y+6} ${178+i},${y+2}`} style={bs("肋骨")}/>)}
        {/* Pelvis side */}
        <path d="M120,280 Q145,270 170,285 L168,320 Q148,335 128,320 Z" style={bs("骨盤")}/>
        {/* Femur */}
        <path d="M140,340 L142,458" style={bs("大腿骨")}/>
        <path d="M142,478 L138,580" style={bs("脛骨")}/>
        <path d="M184,100 L194,232" style={bs("上腕骨")}/>
        {/* Scapula side */}
        <path d="M126,105 L120,165 L135,160 L140,110 Z" style={bs("肩甲骨")}/>
      </g>}

      <rect x="0" y="0" width="300" height="640" fill="url(#fib)" opacity="0.3" pointerEvents="none"/>
      <text x="148" y="82" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("neck")?0.9:0.2,pointerEvents:"none"}}>首</text>
      <text x="160" y="135" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("upper")?0.9:0.2,pointerEvents:"none"}}>肩</text>
      <text x="148" y="250" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("core")?0.9:0.2,pointerEvents:"none"}}>コア</text>
      <text x="130" y="310" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("hip")?0.9:0.2,pointerEvents:"none"}}>股関節</text>
      <text x="140" y="405" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("thigh")?0.9:0.2,pointerEvents:"none"}}>太もも</text>
      <text x="140" y="535" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold" style={{opacity:hi("foot")?0.8:0.2,pointerEvents:"none"}}>下腿</text>
    </svg>
  );
}

/* ==================== BODY SVG WRAPPER ==================== */
function BodySVG({ view, ...props }) {
  if (view === "back") return <BodySVGBack {...props}/>;
  if (view === "side") return <BodySVGSide {...props}/>;
  return <BodySVGFront {...props}/>;
}

/* ==================== LEARN VIEW ==================== */
function LearnView() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("muscles");
  const [openIdx, setOpenIdx] = useState(null);
  const [bodyView, setBodyView] = useState("front");
  const d = selected ? REGIONS[selected] : null;
  const activeItem = d && openIdx !== null ? (tab === "muscles" ? d.muscles[openIdx] : tab === "bones" ? d.bones[openIdx] : null) : null;

  useEffect(() => {
    if (tab === "muscles" && d && openIdx !== null) {
      const muscle = d.muscles[openIdx];
      if (muscle) { const v = getViewForMuscle(muscle.name); setBodyView(v); }
    }
  }, [openIdx, tab, d]);

  const regionList = [
    {id:"neck",label:"首・頸部"},{id:"upper",label:"上半身・肩"},
    {id:"core",label:"体幹・コア"},{id:"hip",label:"股関節・骨盤底"},
    {id:"thigh",label:"太もも・膝"},{id:"foot",label:"下腿・足首・足"},
  ];
  const viewBtns = [["front","前面"],["side","側面"],["back","背面"]];
  return (
    <div>
      <p style={{textAlign:"center",color:"#999",fontSize:12,marginBottom:6}}>部位をタップして学ぼう</p>
      {/* View toggle */}
      <div style={{display:"flex",justifyContent:"center",gap:4,marginBottom:8}}>
        {viewBtns.map(([v,label])=>(
          <button key={v} onClick={()=>setBodyView(v)}
            style={{padding:"6px 18px",borderRadius:20,border:"1.5px solid #764ba2",
              background:bodyView===v?"linear-gradient(135deg,#667eea,#764ba2)":"white",
              color:bodyView===v?"white":"#764ba2",fontSize:12,fontWeight:"bold",cursor:"pointer",
              transition:"all 0.2s"}}>
            {label}
          </button>
        ))}
      </div>
      <BodySVG
        view={bodyView}
        activeRegion={selected}
        onSelectRegion={id=>{setSelected(id===selected?null:id);setTab("muscles");setOpenIdx(null);}}
        activeItem={activeItem}
        activeTab={tab}
      />
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:10,marginBottom:4}}>
        {regionList.map(r=>(
          <button key={r.id} onClick={()=>{setSelected(r.id===selected?null:r.id);setTab("muscles");setOpenIdx(null);}}
            style={{flex:"1 0 calc(33% - 6px)",padding:"7px 4px",borderRadius:20,border:`1.5px solid ${REGIONS[r.id].color}`,
              background:selected===r.id?REGIONS[r.id].color:"white",
              color:selected===r.id?"white":REGIONS[r.id].color,
              fontSize:11,fontWeight:"bold",cursor:"pointer"}}>
            {REGIONS[r.id].emoji} {r.label}
          </button>
        ))}
      </div>
      {d && (
        <div style={{marginTop:10,background:"white",borderRadius:16,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,0.10)"}}>
          <div style={{background:d.color,color:"white",padding:"11px 16px",fontSize:15,fontWeight:"bold"}}>
            {d.emoji} {d.label} — 骨 {d.bones.length}個 / 筋肉 {d.muscles.length}個
          </div>
          <div style={{display:"flex",borderBottom:"1px solid #eee"}}>
            {[["muscles","💪 筋肉"],["bones","🦴 骨"],["pilates","🧘 種目"]].map(([key,label])=>(
              <button key={key} onClick={()=>{setTab(key);setOpenIdx(null);}}
                style={{flex:1,padding:"10px 2px",border:"none",background:tab===key?d.light:"white",
                  color:tab===key?d.color:"#aaa",fontWeight:tab===key?"bold":"normal",
                  fontSize:11,cursor:"pointer",borderBottom:tab===key?`2.5px solid ${d.color}`:"none"}}>
                {label}
              </button>
            ))}
          </div>
          <div style={{padding:"12px 14px",maxHeight:380,overflowY:"auto"}}>
            {(tab==="muscles"?d.muscles:tab==="bones"?d.bones:null)?.map((item,i)=>(
              <div key={i} onClick={()=>setOpenIdx(openIdx===i?null:i)}
                style={{marginBottom:7,borderRadius:12,overflow:"hidden",
                  border:`1px solid ${openIdx===i?d.color:"#eee"}`,
                  cursor:"pointer",background:openIdx===i?d.light:"white",transition:"all 0.2s"}}>
                <div style={{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:"bold",color:openIdx===i?d.color:"#333",fontSize:13}}>
                    {tab==="muscles"?"💪 ":"🦴 "}{item.name}
                    {tab==="muscles"&&getViewForMuscle(item.name)!=="front"&&
                      <span style={{fontSize:9,marginLeft:4,padding:"1px 5px",borderRadius:8,
                        background:getViewForMuscle(item.name)==="back"?"#EDE7F6":"#E3F2FD",
                        color:getViewForMuscle(item.name)==="back"?"#764ba2":"#1E88E5"}}>
                        {getViewForMuscle(item.name)==="back"?"背面":"側面"}
                      </span>}
                  </span>
                  <span style={{color:d.color,fontSize:14}}>{openIdx===i?"▲":"▼"}</span>
                </div>
                {openIdx===i&&(
                  <div style={{padding:"0 14px 12px"}}>
                    <div style={{fontSize:12,color:"#555",marginBottom:6,lineHeight:1.6}}>📍 {item.location}</div>
                    <div style={{fontSize:12,color:"#7a5500",background:"#fffbe6",borderRadius:8,padding:"8px 10px",lineHeight:1.6}}>💡 {item.tip}</div>
                  </div>
                )}
              </div>
            ))}
            {tab==="pilates"&&d.pilates.map((p,i)=>(
              <div key={i} style={{padding:"10px 14px",background:d.light,borderRadius:10,marginBottom:7,
                color:d.color,fontWeight:"bold",fontSize:13}}>🏋️ {p}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
/* ==================== QUIZ SYSTEM (5 types, 50 questions) ==================== */
const QTYPE = {
  location:{icon:"📍",label:"場所",color:"#1E88E5"},
  exercise2region:{icon:"🧘",label:"種目→部位",color:"#9B59B6"},
  muscle2exercise:{icon:"🏋️",label:"筋肉→種目",color:"#E53935"},
  tip:{icon:"💡",label:"知識",color:"#F57C00"},
  classify:{icon:"📂",label:"分類",color:"#2E7D32"},
};
function buildQuizPool(){
  const all=[];
  const re=Object.entries(REGIONS);
  const aM=re.flatMap(([,d])=>d.muscles.map(m=>({...m,region:d.label,color:d.color,light:d.light,pilates:d.pilates})));
  const aB=re.flatMap(([,d])=>d.bones.map(b=>({...b,region:d.label,color:d.color,light:d.light})));
  const aI=[...aM.map(m=>({...m,itype:"筋肉"})),...aB.map(b=>({...b,itype:"骨"}))];
  const aP=re.flatMap(([,d])=>d.pilates.map(p=>({name:p,region:d.label,color:d.color,light:d.light})));
  const rL=re.map(([,d])=>d.label);
  // T1: 場所
  aI.forEach(it=>{
    const w=shuffle(aI.filter(q=>q.location!==it.location)).slice(0,3).map(q=>q.location);
    all.push({qType:"location",question:`この${it.itype}はどこにある？`,subject:it.name,
      correct:it.location,choices:shuffle([it.location,...w]),
      tip:it.tip,region:it.region,color:it.color,light:it.light,badge:`${it.itype==="骨"?"🦴":"💪"} ${it.region}`});
  });
  // T2: 種目→部位
  aP.forEach(ex=>{
    const w=shuffle(rL.filter(r=>r!==ex.region)).slice(0,3);
    all.push({qType:"exercise2region",question:"この種目で主に鍛えられる部位は？",subject:ex.name,
      correct:ex.region,choices:shuffle([ex.region,...w]),
      tip:`${ex.name}は「${ex.region}」の代表的なエクササイズです`,region:ex.region,color:ex.color,light:ex.light,badge:"🧘 種目"});
  });
  // T3: 筋肉→種目
  aM.forEach(m=>{
    if(!m.pilates||!m.pilates.length)return;
    const ce=m.pilates[Math.floor(Math.random()*m.pilates.length)];
    const oe=aP.filter(p=>p.region!==m.region).map(p=>p.name);
    const w=shuffle(oe).slice(0,3);if(w.length<3)return;
    all.push({qType:"muscle2exercise",question:"この筋肉を鍛えるピラティス種目は？",subject:m.name,
      correct:ce,choices:shuffle([ce,...w]),
      tip:m.tip,region:m.region,color:m.color,light:m.light,badge:`💪 ${m.region}`});
  });
  // T4: Tip知識
  aM.forEach(m=>{
    if(!m.tip||m.tip.length<15)return;
    const w=shuffle(aM.filter(q=>q.name!==m.name)).slice(0,3).map(q=>q.name);
    all.push({qType:"tip",question:m.tip,subject:"どの筋肉の説明？",
      correct:m.name,choices:shuffle([m.name,...w]),
      tip:`📍 ${m.location}`,region:m.region,color:m.color,light:m.light,badge:"💡 知識"});
  });
  // T5: 分類
  aM.forEach(m=>{
    const w=shuffle(aM.filter(q=>q.region!==m.region)).slice(0,3).map(q=>q.name);
    all.push({qType:"classify",question:`「${m.region}」に属する筋肉はどれ？`,subject:m.region,
      correct:m.name,choices:shuffle([m.name,...w]),
      tip:`${m.name}は「${m.region}」の筋肉。📍 ${m.location}`,region:m.region,color:m.color,light:m.light,badge:"📂 分類"});
  });
  return all;
}
function selectQs(pool,n=50){
  const ts=Object.keys(QTYPE),per=Math.floor(n/ts.length),sel=[];
  ts.forEach(t=>sel.push(...shuffle(pool.filter(q=>q.qType===t)).slice(0,per)));
  return shuffle(sel).slice(0,n);
}
function QuizView(){
  const [fp]=useState(()=>buildQuizPool());
  const [qs,setQs]=useState(()=>selectQs(buildQuizPool(),50));
  const [idx,setIdx]=useState(0);
  const [sel,setSel]=useState(null);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [ans,setAns]=useState([]);
  function pick(c){if(sel)return;setSel(c);const ok=c===qs[idx].correct;if(ok)setScore(s=>s+1);setAns(a=>[...a,{correct:ok,qType:qs[idx].qType}]);}
  function next(){if(idx+1>=qs.length){setDone(true);return;}setIdx(idx+1);setSel(null);}
  function restart(){setQs(selectQs(fp,50));setIdx(0);setSel(null);setScore(0);setDone(false);setAns([]);}
  if(done){
    const ts={};Object.keys(QTYPE).forEach(t=>{ts[t]={n:0,c:0};});
    ans.forEach(a=>{ts[a.qType].n++;if(a.correct)ts[a.qType].c++;});
    const pct=Math.round(score/qs.length*100);
    return(<div style={{textAlign:"center",padding:20}}>
      <div style={{fontSize:56,marginBottom:8}}>{pct>=80?"🎉":pct>=60?"😊":"💪"}</div>
      <div style={{fontSize:22,fontWeight:"bold",marginBottom:4}}>結果：{score} / {qs.length}</div>
      <div style={{fontSize:14,color:"#888",marginBottom:16}}>正答率 {pct}% — {pct>=80?"素晴らしい！":pct>=60?"いい調子！":"「学ぶ」で復習しよう！"}</div>
      <div style={{textAlign:"left",background:"white",borderRadius:14,padding:14,marginBottom:16,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
        <div style={{fontWeight:"bold",fontSize:13,marginBottom:8,color:"#555"}}>📊 タイプ別スコア</div>
        {Object.entries(QTYPE).map(([k,{icon,label,color}])=>{const s=ts[k],p=s.n?Math.round(s.c/s.n*100):0;
          return <div key={k} style={{display:"flex",alignItems:"center",marginBottom:6,gap:8}}>
            <span style={{fontSize:16}}>{icon}</span>
            <span style={{fontSize:12,fontWeight:"bold",color,minWidth:70}}>{label}</span>
            <div style={{flex:1,height:8,background:"#f0f0f0",borderRadius:4,overflow:"hidden"}}>
              <div style={{width:`${p}%`,height:"100%",background:color,borderRadius:4,transition:"width 0.5s"}}/></div>
            <span style={{fontSize:11,color:"#999",minWidth:55,textAlign:"right"}}>{s.c}/{s.n} ({p}%)</span>
          </div>;})}
      </div>
      <div style={{marginBottom:16,lineHeight:2}}>{ans.map((a,i)=><span key={i} style={{margin:2,display:"inline-block",fontSize:14}}>{a.correct?"✅":"❌"}</span>)}</div>
      <button onClick={restart} style={{background:"linear-gradient(135deg,#667eea,#764ba2)",color:"white",border:"none",padding:"14px 36px",borderRadius:30,fontSize:15,cursor:"pointer",fontWeight:"bold"}}>もう一度やる 🔄</button>
    </div>);
  }
  const q=qs[idx],qt=QTYPE[q.qType],prog=((idx)/qs.length)*100;
  return(<div>
    <div style={{height:4,background:"#eee",borderRadius:2,marginBottom:10,overflow:"hidden"}}>
      <div style={{width:`${prog}%`,height:"100%",background:"linear-gradient(90deg,#667eea,#764ba2)",borderRadius:2,transition:"width 0.3s"}}/></div>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
      <span style={{color:"#aaa",fontSize:12}}>問題 {idx+1} / {qs.length}</span>
      <span style={{background:"#FFF3CD",color:"#856404",borderRadius:20,padding:"3px 12px",fontSize:12}}>⭐ {score}点</span>
    </div>
    <div style={{background:"white",borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(0,0,0,0.10)",marginBottom:12}}>
      <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
        <span style={{display:"inline-block",background:qt.color+"18",color:qt.color,borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:"bold"}}>{qt.icon} {qt.label}</span>
        <span style={{display:"inline-block",background:q.light,color:q.color,borderRadius:20,padding:"3px 10px",fontSize:10,fontWeight:"bold"}}>{q.badge}</span>
      </div>
      {q.qType==="tip"?(<>
        <div style={{fontSize:13,color:"#555",lineHeight:1.6,marginBottom:6}}>💡 {q.question}</div>
        <div style={{fontSize:15,fontWeight:"bold",color:"#222"}}>{q.subject}</div>
      </>):(<>
        <div style={{fontSize:17,fontWeight:"bold",color:"#222",marginBottom:4}}>{q.subject}</div>
        <div style={{fontSize:12,color:"#999"}}>{q.question}</div>
      </>)}
    </div>
    <div>{q.choices.map((c,i)=>{
      let bg="white",border="1px solid #eee",col="#333";
      if(sel){if(c===q.correct){bg="#E5F9EA";border="2px solid #2E7D32";col="#1a5e20";}
        else if(c===sel){bg="#FFE5E5";border="2px solid #E53935";col="#b71c1c";}}
      return(<button key={i} onClick={()=>pick(c)}
        style={{width:"100%",textAlign:"left",padding:"11px 14px",marginBottom:7,borderRadius:12,
          border,background:bg,color:col,fontSize:12,cursor:sel?"default":"pointer",
          boxShadow:"0 1px 4px rgba(0,0,0,0.06)",lineHeight:1.5,transition:"all 0.2s"}}>
        {c===sel&&c!==q.correct?"❌ ":c===q.correct&&sel?"✅ ":`${["A","B","C","D"][i]}. `}{c}
      </button>);
    })}</div>
    {sel&&(<div>
      <div style={{background:"#FFFBEB",border:"1px solid #FCD34D",borderRadius:10,padding:10,marginBottom:10,fontSize:11,color:"#92400E",lineHeight:1.6}}>💡 {q.tip}</div>
      <button onClick={next} style={{width:"100%",background:qt.color,color:"white",border:"none",padding:13,borderRadius:30,fontSize:14,cursor:"pointer",fontWeight:"bold"}}>
        {idx+1>=qs.length?"結果を見る 🎉":"次の問題 →"}</button>
    </div>)}
  </div>);
}
export default function App() {
  const [view,setView] = useState("learn");
  const total = Object.values(REGIONS).reduce((s,d)=>s+d.bones.length+d.muscles.length,0);
  return(
    <div style={{maxWidth:430,margin:"0 auto",fontFamily:"-apple-system,sans-serif",background:"#F5F6FA",minHeight:"100vh"}}>
      <div style={{background:"linear-gradient(135deg,#667eea,#764ba2)",color:"white",padding:"18px 16px 12px",textAlign:"center"}}>
        <div style={{fontSize:21,fontWeight:"bold"}}>🧘 ピラティス解剖学</div>
        <div style={{fontSize:11,opacity:0.85,marginTop:3}}>骨・筋肉・場所をセットで覚えよう</div>
        <div style={{fontSize:11,opacity:0.7,marginTop:2}}>全{total}項目収録 · 6部位</div>
      </div>
      <div style={{display:"flex",background:"white",boxShadow:"0 2px 4px rgba(0,0,0,0.06)"}}>
        {[["learn","📖 学ぶ"],["quiz","❓ クイズ"]].map(([v,label])=>(
          <button key={v} onClick={()=>setView(v)}
            style={{flex:1,padding:"13px 0",border:"none",background:"white",fontSize:15,
              fontWeight:view===v?"bold":"normal",color:view===v?"#764ba2":"#bbb",
              borderBottom:view===v?"3px solid #764ba2":"3px solid transparent",cursor:"pointer"}}>
            {label}
          </button>
        ))}
      </div>
      <div style={{padding:16}}>
        {view==="learn"?<LearnView/>:<QuizView/>}
      </div>
    </div>
  );
}
