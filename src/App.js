import { useState } from "react";
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
function BodySVG({ active, onSelect }) {
  const fill = id => active === id ? REGIONS[id].color : REGIONS[id].light;
  const stroke = id => REGIONS[id].color;
  return (
    <svg viewBox="0 0 200 440" style={{ width:"100%", maxWidth:200, margin:"0 auto", display:"block" }}>
      <ellipse cx="100" cy="26" rx="20" ry="24" fill="#F5DEB3" stroke="#C8A876" strokeWidth="1.5"/>
      <ellipse cx="80" cy="28" rx="5" ry="7" fill="#F5DEB3" stroke="#C8A876" strokeWidth="1"/>
      <ellipse cx="120" cy="28" rx="5" ry="7" fill="#F5DEB3" stroke="#C8A876" strokeWidth="1"/>
      <circle cx="93" cy="23" r="2.5" fill="#8B6914"/>
      <circle cx="107" cy="23" r="2.5" fill="#8B6914"/>
      <path d="M94,35 Q100,40 106,35" fill="none" stroke="#8B6914" strokeWidth="1.5"/>
      <g onClick={() => onSelect("neck")} style={{cursor:"pointer"}}>
        <rect x="88" y="48" width="24" height="18" rx="5" fill={fill("neck")} stroke={stroke("neck")} strokeWidth="2"/>
        <text x="100" y="61" textAnchor="middle" fontSize="7" fill={active==="neck"?"white":stroke("neck")} fontWeight="bold">首</text>
      </g>
      <g onClick={() => onSelect("upper")} style={{cursor:"pointer"}}>
        <path d="M88,66 Q100,62 112,66 L128,72 L134,78 Q100,88 66,78 L72,72 Z" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <ellipse cx="60" cy="84" rx="13" ry="11" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <ellipse cx="140" cy="84" rx="13" ry="11" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <rect x="47" y="92" width="18" height="52" rx="9" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <rect x="135" y="92" width="18" height="52" rx="9" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <rect x="49" y="146" width="14" height="40" rx="7" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <rect x="137" y="146" width="14" height="40" rx="7" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <ellipse cx="56" cy="192" rx="9" ry="7" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <ellipse cx="144" cy="192" rx="9" ry="7" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <rect x="66" y="78" width="68" height="56" rx="6" fill={fill("upper")} stroke={stroke("upper")} strokeWidth="1.5"/>
        <line x1="100" y1="78" x2="100" y2="134" stroke={stroke("upper")} strokeWidth="1" strokeDasharray="3,2" opacity="0.4"/>
        {[90,104,118,130].map((y,i)=>(
          <g key={i} opacity="0.35">
            <path d={`M100,${y} Q82,${y+4} 70,${y+2}`} fill="none" stroke={stroke("upper")} strokeWidth="1"/>
            <path d={`M100,${y} Q118,${y+4} 130,${y+2}`} fill="none" stroke={stroke("upper")} strokeWidth="1"/>
          </g>
        ))}
        <text x="100" y="110" textAnchor="middle" fontSize="8" fill={active==="upper"?"white":stroke("upper")} fontWeight="bold">上半身・肩</text>
      </g>
      <g onClick={() => onSelect("core")} style={{cursor:"pointer"}}>
        <rect x="68" y="134" width="64" height="66" rx="6" fill={fill("core")} stroke={stroke("core")} strokeWidth="2"/>
        <line x1="100" y1="134" x2="100" y2="200" stroke={stroke("core")} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5"/>
        {[150,166,182].map((y,i)=>(
          <line key={i} x1="74" y1={y} x2="126" y2={y} stroke={stroke("core")} strokeWidth="0.8" opacity="0.35"/>
        ))}
        <text x="100" y="172" textAnchor="middle" fontSize="8" fill={active==="core"?"white":stroke("core")} fontWeight="bold">体幹・コア</text>
      </g>
      <g onClick={() => onSelect("hip")} style={{cursor:"pointer"}}>
        <path d="M64,200 Q100,214 136,200 L138,228 Q100,242 62,228 Z" fill={fill("hip")} stroke={stroke("hip")} strokeWidth="2"/>
        <path d="M76,212 Q100,224 124,212" fill="none" stroke={stroke("hip")} strokeWidth="1" opacity="0.5"/>
        <circle cx="76" cy="228" r="7" fill={fill("hip")} stroke={stroke("hip")} strokeWidth="1.5"/>
        <circle cx="124" cy="228" r="7" fill={fill("hip")} stroke={stroke("hip")} strokeWidth="1.5"/>
        <text x="100" y="218" textAnchor="middle" fontSize="7.5" fill={active==="hip"?"white":stroke("hip")} fontWeight="bold">股関節</text>
      </g>
      <g onClick={() => onSelect("thigh")} style={{cursor:"pointer"}}>
        <rect x="62" y="232" width="28" height="76" rx="13" fill={fill("thigh")} stroke={stroke("thigh")} strokeWidth="1.5"/>
        <rect x="110" y="232" width="28" height="76" rx="13" fill={fill("thigh")} stroke={stroke("thigh")} strokeWidth="1.5"/>
        <line x1="76" y1="238" x2="76" y2="300" stroke={stroke("thigh")} strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
        <line x1="124" y1="238" x2="124" y2="300" stroke={stroke("thigh")} strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
        <ellipse cx="76" cy="312" rx="14" ry="9" fill={fill("thigh")} stroke={stroke("thigh")} strokeWidth="1.5"/>
        <ellipse cx="124" cy="312" rx="14" ry="9" fill={fill("thigh")} stroke={stroke("thigh")} strokeWidth="1.5"/>
        <text x="100" y="272" textAnchor="middle" fontSize="8" fill={active==="thigh"?"white":stroke("thigh")} fontWeight="bold">太もも・膝</text>
      </g>
      <g onClick={() => onSelect("foot")} style={{cursor:"pointer"}}>
        <rect x="64" y="318" width="24" height="64" rx="10" fill={fill("foot")} stroke={stroke("foot")} strokeWidth="1.5"/>
        <rect x="112" y="318" width="24" height="64" rx="10" fill={fill("foot")} stroke={stroke("foot")} strokeWidth="1.5"/>
        <ellipse cx="76" cy="386" rx="12" ry="7" fill={fill("foot")} stroke={stroke("foot")} strokeWidth="1.5"/>
        <ellipse cx="124" cy="386" rx="12" ry="7" fill={fill("foot")} stroke={stroke("foot")} strokeWidth="1.5"/>
        <ellipse cx="72" cy="397" rx="14" ry="6" fill={fill("foot")} stroke={stroke("foot")} strokeWidth="1.5"/>
        <ellipse cx="128" cy="397" rx="14" ry="6" fill={fill("foot")} stroke={stroke("foot")} strokeWidth="1.5"/>
        <text x="100" y="354" textAnchor="middle" fontSize="8" fill={active==="foot"?"white":stroke("foot")} fontWeight="bold">下腿・足首</text>
      </g>
    </svg>
  );
}
function LearnView() {
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("muscles");
  const [openIdx, setOpenIdx] = useState(null);
  const d = selected ? REGIONS[selected] : null;
  const regionList = [
    {id:"neck",label:"首・頸部"},{id:"upper",label:"上半身・肩"},
    {id:"core",label:"体幹・コア"},{id:"hip",label:"股関節・骨盤底"},
    {id:"thigh",label:"太もも・膝"},{id:"foot",label:"下腿・足首・足"},
  ];
  return (
    <div>
      <p style={{textAlign:"center",color:"#999",fontSize:12,marginBottom:6}}>部位をタップして学ぼう</p>
      <BodySVG active={selected} onSelect={id=>{setSelected(id===selected?null:id);setTab("muscles");setOpenIdx(null);}}/>
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
function makeChoices(qs, i) {
  const correct = qs[i].location;
  const wrongs = shuffle(quizPool.filter(q=>q.location!==correct)).slice(0,3).map(q=>q.location);
  return shuffle([correct,...wrongs]);
}
function QuizView() {
  const [questions] = useState(()=>shuffle(quizPool).slice(0,15));
  const [idx,setIdx] = useState(0);
  const [choices,setChoices] = useState(()=>makeChoices(shuffle(quizPool).slice(0,15),0));
  const [selected,setSelected] = useState(null);
  const [score,setScore] = useState(0);
  const [done,setDone] = useState(false);
  const [answers,setAnswers] = useState([]);
  function handleAnswer(c){
    if(selected)return;
    setSelected(c);
    if(c===questions[idx].location)setScore(s=>s+1);
    setAnswers(a=>[...a,c===questions[idx].location]);
  }
  function next(){
    if(idx+1>=questions.length){setDone(true);return;}
    const ni=idx+1;
    setIdx(ni);setChoices(makeChoices(questions,ni));setSelected(null);
  }
  function restart(){window.location.reload();}
  if(done)return(
    <div style={{textAlign:"center",padding:28}}>
      <div style={{fontSize:64,marginBottom:12}}>{score>=12?"🎉":score>=9?"😊":"💪"}</div>
      <div style={{fontSize:24,fontWeight:"bold",marginBottom:6}}>結果：{score} / {questions.length}</div>
      <div style={{color:"#888",marginBottom:24,fontSize:14}}>
        {score>=12?"完璧！ピラティス解剖学マスターに近づいています！":score>=9?"いい調子！もう一周してみよう！":"まずは「学ぶ」で確認してから再チャレンジ！"}
      </div>
      <div style={{marginBottom:20}}>{answers.map((a,i)=><span key={i} style={{margin:3,display:"inline-block",fontSize:18}}>{a?"✅":"❌"}</span>)}</div>
      <button onClick={restart} style={{background:"#764ba2",color:"white",border:"none",padding:"14px 36px",borderRadius:30,fontSize:16,cursor:"pointer",fontWeight:"bold"}}>
        もう一度やる
      </button>
    </div>
  );
  const q=questions[idx];
  return(
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <span style={{color:"#aaa",fontSize:13}}>問題 {idx+1} / {questions.length}</span>
        <span style={{background:"#FFF3CD",color:"#856404",borderRadius:20,padding:"4px 14px",fontSize:13}}>⭐ {score}点</span>
      </div>
      <div style={{background:"white",borderRadius:16,padding:18,boxShadow:"0 2px 12px rgba(0,0,0,0.10)",marginBottom:14}}>
        <div style={{display:"inline-block",background:q.light,color:q.color,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:"bold",marginBottom:10}}>
          {q.type==="骨"?"🦴 骨":"💪 筋肉"} · {q.region}
        </div>
        <div style={{fontSize:19,fontWeight:"bold",color:"#222",marginBottom:6}}>{q.name}</div>
        <div style={{fontSize:13,color:"#999"}}>この{q.type}はどこにある？</div>
      </div>
      <div>
        {choices.map((c,i)=>{
          let bg="white",border="1px solid #eee",col="#333";
          if(selected){
            if(c===q.location){bg="#E5F9EA";border="2px solid #2E7D32";col="#1a5e20";}
            else if(c===selected){bg="#FFE5E5";border="2px solid #E53935";col="#b71c1c";}
          }
          return(
            <button key={i} onClick={()=>handleAnswer(c)}
              style={{width:"100%",textAlign:"left",padding:"12px 14px",marginBottom:8,borderRadius:12,
                border,background:bg,color:col,fontSize:12,cursor:selected?"default":"pointer",
                boxShadow:"0 1px 4px rgba(0,0,0,0.06)",lineHeight:1.5,transition:"all 0.2s"}}>
              {c===selected&&c!==q.location?"❌ ":c===q.location&&selected?"✅ ":`${["A","B","C","D"][i]}. `}{c}
            </button>
          );
        })}
      </div>
      {selected&&(
        <div>
          {q.tip&&<div style={{background:"#FFFBEB",border:"1px solid #FCD34D",borderRadius:10,padding:12,marginBottom:12,fontSize:12,color:"#92400E",lineHeight:1.6}}>💡 {q.tip}</div>}
          <button onClick={next} style={{width:"100%",background:q.color,color:"white",border:"none",padding:14,borderRadius:30,fontSize:15,cursor:"pointer",fontWeight:"bold"}}>
            {idx+1>=questions.length?"結果を見る 🎉":"次の問題 →"}
          </button>
        </div>
      )}
    </div>
  );
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
