// Shooting Planner — PWA build
// React/ReactDOM/Babel come from globals (loaded by index.html)
const { useState, useEffect, useRef } = React;

const SCHEDULE = [
  {
    time: "08:00",
    title: "校門口集合出發",
    location: "福智教育園區校門口",
    chapter: "第一章：啟程與期待",
    shots: [
      { type: "📷", desc: "校門口晨曦大景，掛活動名稱的紅布條或告示" },
      { type: "🎬", desc: "家長與學生陸續抵達，互相打招呼、簽到特寫(10-15秒)" },
      { type: "📷", desc: "孩子驚喜迎接父母的神情特寫" },
      { type: "📷", desc: "活動手冊/識別證/報名表特寫" },
      { type: "🎬", desc: "準備上車出發的縮時攝影或動態跟拍(15秒)" },
      { type: "📷", desc: "集合的全體大景照" },
    ],
    tips: "💡 建議拍攝片頭素材：清晨光線、校門口氛圍。可錄一段安靜的環境音。",
    textOverlay: "「平常，是您牽著我的手看世界；今天，我們大手牽小手，一起走進這畝心靈福田。」",
  },
  {
    time: "08:40",
    title: "抵達義工廚房集合",
    location: "湖山分院 義工廚房",
    chapter: "第一章：啟程與期待",
    shots: [
      { type: "📷", desc: "湖山分院牌樓/入口大景" },
      { type: "🎬", desc: "下車步行進入分院的動態跟拍(10秒)" },
      { type: "📷", desc: "義工廚房外觀" },
      { type: "📷", desc: "食材及廣供品放置入口處的畫面" },
      { type: "📷", desc: "湖山分院莊嚴建築景觀(遠景)" },
      { type: "🎬", desc: "分院天空、樹木、環境空鏡頭(10秒)" },
    ],
    tips: "💡 抵達時是拍環境空鏡的好時機！分院建築、佛像、自然景色都要收集。",
  },
  {
    time: "09:00",
    title: "大福及中餐製作開始",
    location: "義工廚房",
    chapter: "第二章：同心協力",
    shots: [
      { type: "📷", desc: "琳瑯滿目的食材全景" },
      { type: "🎬", desc: "挽袖開始準備的動態畫面(洗菜、切菜、包裝)15秒" },
      { type: "🎬", desc: "★重點★ 家長與孩子一起分工的畫面(爸爸切菜、兒子遞盤子)" },
      { type: "📷", desc: "大手牽小手共同工作的特寫" },
      { type: "📷", desc: "手部動作特寫(切、洗、捧、揉)" },
      { type: "📷", desc: "認真的眼神、汗水、彼此相視而笑" },
      { type: "📷", desc: "汗流浹背但滿足的側臉" },
      { type: "🎬", desc: "紅豆大福製作過程縮時攝影(15-20秒)" },
      { type: "📷", desc: "齋僧品包裝細節特寫" },
      { type: "📷", desc: "流汗的額頭特寫" },
    ],
    tips: "💡 這段是影片最重要的素材來源！多拍親子互動畫面。可隨機訪問1-2位家長和學生：「今天最期待什麼？」",
    textOverlay: "「大手牽小手，共植福田」",
  },
  {
    time: "10:20",
    title: "齋僧品運送至大寮",
    location: "義工廚房 → 大寮",
    chapter: "第三章：虔誠供養",
    shots: [
      { type: "🎬", desc: "搬運齋僧品往大寮的過程，展現團隊合作(15秒)" },
      { type: "📷", desc: "整齊排列的供養品" },
      { type: "📷", desc: "兩代人共同抬重物的畫面" },
      { type: "🎬", desc: "慢動作：雙手捧著供養物，眼神專注且恭敬" },
      { type: "📷", desc: "大寮煙囪特寫" },
      { type: "🎬", desc: "接著製作親師生大福的過程(10秒)" },
    ],
    tips: "💡 運送過程可用動態跟拍，強調團隊合作力量。注意拍攝法師穿梭的身影。",
    textOverlay: "「一份供養，萬分誠心」",
  },
  {
    time: "11:00",
    title: "全體打掃義工廚房",
    location: "義工廚房",
    chapter: "第五章：福田心耕",
    shots: [
      { type: "🎬", desc: "掃地、拖地、擦桌子的勞動畫面(10秒)" },
      { type: "📷", desc: "打掃工具的勞動剪影" },
      { type: "📷", desc: "孩子認真清潔的側拍" },
      { type: "📷", desc: "學生向長輩問好的互動" },
    ],
    tips: "💡 捕捉「勞動中修行」的精神，可拍攝逆光剪影效果。",
  },
  {
    time: "11:20",
    title: "全體移動至觀音亭",
    location: "觀音廣場",
    chapter: "第三章：虔誠供養",
    shots: [
      { type: "🎬", desc: "移動過程中的行進畫面(10秒)" },
      { type: "📷", desc: "觀音廣場全景" },
      { type: "📷", desc: "佛像莊嚴特寫" },
    ],
    tips: "💡 路上可拍攝分院內的各種景色作為轉場素材。",
  },
  {
    time: "11:30",
    title: "廣供及用餐・親子時間",
    location: "觀音廣場",
    chapter: "第三章＋第四章",
    shots: [
      { type: "🎬", desc: "廣供儀式莊嚴感：大眾合掌、誦經、禮佛遠景(15秒)" },
      { type: "📷", desc: "廣供品佈置全景" },
      { type: "📷", desc: "大眾虔誠合掌的背影" },
      { type: "🎬", desc: "慢動作：祈願時的閉目凝神" },
      { type: "📷", desc: "用餐時家長為孩子夾菜的溫暖畫面" },
      { type: "📷", desc: "孩子為父母盛湯的特寫" },
      { type: "📷", desc: "豐富的午餐特寫" },
      { type: "🎬", desc: "餐後親子對話，草地散步聊天(15秒)" },
      { type: "📷", desc: "親子間自然的親密互動(搭肩、對笑)" },
      { type: "📷", desc: "全家福合照(協助拍攝各家庭)" },
      { type: "📷", desc: "勞動後的開懷大笑" },
    ],
    tips: "💡 這是情感類素材的黃金時段！用餐＋親子互動，多抓自然表情。可訪問家長：「今天最感動的一刻是什麼？」",
    textOverlay: "「最美的風景，不是湖山的景色，而是我們一起為他人付出時，那份如出一轍的專注與笑容。」",
  },
  {
    time: "13:30",
    title: "出坡＋清洗餐具",
    location: "湖山分院各處 / 義工廚房",
    chapter: "第五章：福田心耕",
    shots: [
      { type: "🎬", desc: "出坡(整理環境)動作，體現勞動修行(15秒)" },
      { type: "📷", desc: "打掃工具的勞動剪影" },
      { type: "📷", desc: "回義工廚房清洗餐具的畫面" },
      { type: "📷", desc: "孩子們合作清洗鍋具" },
      { type: "🎬", desc: "清潔工作的縮時攝影(10秒)" },
    ],
    tips: "💡 出坡是好的空鏡頭素材，可拍逆光、側光的美感畫面。",
  },
  {
    time: "15:10",
    title: "法師帶結行",
    location: "教室",
    chapter: "第五章：福田心耕",
    shots: [
      { type: "🎬", desc: "結行分享會：大家圍成一圈，分享心得(錄一段聲音當旁白)" },
      { type: "📷", desc: "分享時專注聆聽的神情" },
      { type: "📷", desc: "法師開示的莊嚴畫面" },
      { type: "📷", desc: "分享時感動的表情" },
    ],
    tips: "💡 ★重要★ 可錄製1-2位學生或家長的心得分享作為影片旁白素材！問：「今天最感動的一刻？」",
    textOverlay: "「齋僧，齋的是一份恭敬，種的是萬世福報。」",
  },
  {
    time: "15:40",
    title: "返校・活動結束",
    location: "福智教育園區",
    chapter: "結尾",
    shots: [
      { type: "📷", desc: "★★★ 全體大合照 ★★★(最重要！)" },
      { type: "🎬", desc: "全體大合照由小漸大的退後運鏡(15秒)" },
      { type: "📷", desc: "回程時揮手告別的畫面" },
      { type: "🎬", desc: "離開分院的動態跟拍(10秒)" },
    ],
    tips: "💡 片尾素材！全體合照務必拍好。告別畫面是很好的收尾素材。",
    textOverlay: "「忙碌後的汗水，是喜悅的滋味。感恩每一份付出，圓滿每一次遇見。」\n2026.05.03 於 湖山分院\n福智國中 國二忠班 全體親師生敬製",
  },
];

const STORAGE_KEY = "shootPlanner.checkedShots.v1";
const SETTINGS_KEY = "shootPlanner.settings.v1";

function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function formatCountdown(diffMs) {
  if (diffMs <= 0) return "已到時間";
  const totalSec = Math.floor(diffMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}時${m.toString().padStart(2,"0")}分${s.toString().padStart(2,"0")}秒`;
  if (m > 0) return `${m}分${s.toString().padStart(2,"0")}秒`;
  return `${s}秒`;
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.4);
      osc.start(ctx.currentTime + i * 0.15);
      osc.stop(ctx.currentTime + i * 0.15 + 0.4);
    });
  } catch (e) {}
}

function playUrgentChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.2, 0.4].forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "square";
      gain.gain.setValueAtTime(0.25, ctx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + t + 0.15);
      osc.start(ctx.currentTime + t);
      osc.stop(ctx.currentTime + t + 0.15);
    });
  } catch (e) {}
}

// Detect iOS Safari (not standalone) — show "Add to Home Screen" hint
function isIOS() {
  const ua = window.navigator.userAgent;
  return /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
}
function isStandalone() {
  return window.navigator.standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches;
}

function InstallHint({ onClose }) {
  return (
    <div style={{
      position: "fixed", left: 12, right: 12, bottom: "calc(80px + env(safe-area-inset-bottom))",
      background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      border: "1px solid rgba(251,191,36,0.4)",
      borderRadius: 16, padding: "14px 14px 12px",
      zIndex: 200, boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      animation: "slideIn 0.3s ease-out",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#FDE68A" }}>📲 安裝到主畫面</div>
        <button onClick={onClose} style={{
          background: "none", border: "none", color: "#64748B", fontSize: 18, cursor: "pointer", padding: 0, lineHeight: 1,
        }}>×</button>
      </div>
      <div style={{ fontSize: 12, color: "#CBD5E1", lineHeight: 1.6 }}>
        在 Safari 點選下方 <span style={{ color: "#FBBF24", fontWeight: 700 }}>分享</span> 按鈕
        <span style={{ display: "inline-block", margin: "0 4px", verticalAlign: "middle" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 16V4M12 4l-4 4M12 4l4 4"/>
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>
          </svg>
        </span>
        ，再選擇「<span style={{ color: "#FBBF24", fontWeight: 700 }}>加入主畫面</span>」即可全螢幕使用，並可離線。
      </div>
    </div>
  );
}

function App() {
  const [now, setNow] = useState(new Date());
  const [useSimTime, setUseSimTime] = useState(false);
  const [simHour, setSimHour] = useState(8);
  const [simMin, setSimMin] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [checkedShots, setCheckedShots] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
  });
  const [alertShown, setAlertShown] = useState({});
  const [showModal, setShowModal] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [preAlertMin, setPreAlertMin] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [showFilmStructure, setShowFilmStructure] = useState(false);
  const [showInstallHint, setShowInstallHint] = useState(false);
  const activeRef = useRef(null);

  // Load saved settings
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
      if (typeof s.soundEnabled === "boolean") setSoundEnabled(s.soundEnabled);
      if (typeof s.preAlertMin === "number") setPreAlertMin(s.preAlertMin);
    } catch {}
    // Show install hint on iOS Safari (not standalone), once per session
    if (isIOS() && !isStandalone() && !sessionStorage.getItem("hintDismissed")) {
      setTimeout(() => setShowInstallHint(true), 1200);
    }
  }, []);

  // Persist
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedShots)); } catch {}
  }, [checkedShots]);
  useEffect(() => {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({ soundEnabled, preAlertMin })); } catch {}
  }, [soundEnabled, preAlertMin]);

  const currentMinutes = useSimTime ? simHour * 60 + simMin : now.getHours() * 60 + now.getMinutes();
  const currentSeconds = useSimTime ? 0 : now.getSeconds();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    SCHEDULE.forEach((item, idx) => {
      const itemMin = parseTime(item.time);
      const alertMin = itemMin - preAlertMin;
      const key = `${idx}-${item.time}`;
      if (currentMinutes >= alertMin && currentMinutes < itemMin + 2 && !alertShown[key]) {
        if (soundEnabled) {
          if (currentMinutes >= itemMin) playUrgentChime();
          else playChime();
        }
        setShowModal(idx);
        setAlertShown((prev) => ({ ...prev, [key]: true }));
      }
    });
  }, [currentMinutes, alertShown, soundEnabled, preAlertMin]);

  const toggleShot = (schedIdx, shotIdx) => {
    const key = `${schedIdx}-${shotIdx}`;
    setCheckedShots((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getProgress = (schedIdx) => {
    const total = SCHEDULE[schedIdx].shots.length;
    let done = 0;
    for (let i = 0; i < total; i++) {
      if (checkedShots[`${schedIdx}-${i}`]) done++;
    }
    return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  let activeIdx = -1;
  for (let i = SCHEDULE.length - 1; i >= 0; i--) {
    if (currentMinutes >= parseTime(SCHEDULE[i].time)) { activeIdx = i; break; }
  }
  const nextIdx = activeIdx < SCHEDULE.length - 1 ? activeIdx + 1 : -1;

  // Avoid scrollIntoView per project guidance — use window scrollTo
  useEffect(() => {
    if (activeRef.current) {
      const rect = activeRef.current.getBoundingClientRect();
      const top = rect.top + window.scrollY - window.innerHeight * 0.35;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [activeIdx]);

  const totalShots = SCHEDULE.reduce((a, s) => a + s.shots.length, 0);
  const totalDone = Object.values(checkedShots).filter(Boolean).length;

  const chapterColors = {
    "第一章：啟程與期待": { bg: "#FFF7ED", border: "#F97316", accent: "#EA580C", tag: "#FED7AA" },
    "第二章：同心協力": { bg: "#F0FDF4", border: "#22C55E", accent: "#16A34A", tag: "#BBF7D0" },
    "第三章：虔誠供養": { bg: "#FDF2F8", border: "#EC4899", accent: "#DB2777", tag: "#FBCFE8" },
    "第三章＋第四章": { bg: "#FFF1F2", border: "#F43F5E", accent: "#E11D48", tag: "#FECDD3" },
    "第四章：溫情時光": { bg: "#FFFBEB", border: "#F59E0B", accent: "#D97706", tag: "#FDE68A" },
    "第五章：福田心耕": { bg: "#EFF6FF", border: "#3B82F6", accent: "#2563EB", tag: "#BFDBFE" },
    "結尾": { bg: "#FAF5FF", border: "#A855F7", accent: "#9333EA", tag: "#E9D5FF" },
  };
  const getChapterStyle = (chapter) => chapterColors[chapter] || { bg: "#F9FAFB", border: "#6B7280", accent: "#4B5563", tag: "#E5E7EB" };

  const dismissHint = () => {
    setShowInstallHint(false);
    try { sessionStorage.setItem("hintDismissed", "1"); } catch {}
  };

  return (
    <div style={{
      fontFamily: "'Noto Serif TC', 'Noto Sans TC', serif",
      background: "linear-gradient(165deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
      minHeight: "100vh",
      color: "#E2E8F0",
      position: "relative",
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: `${40 + i * 20}px`,
            height: `${40 + i * 20}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(${i % 2 ? '251,191,36' : '236,72,153'},0.08) 0%, transparent 70%)`,
            left: `${10 + i * 15}%`,
            top: `${5 + (i * 17) % 80}%`,
            animation: `float${i % 3} ${8 + i * 2}s ease-in-out infinite`,
          }} />
        ))}
      </div>

      {showModal !== null && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
          zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "20px",
        }} onClick={() => setShowModal(null)}>
          <div style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            border: "2px solid #FBBF24",
            borderRadius: "20px",
            padding: "28px 24px",
            maxWidth: "380px",
            width: "100%",
            animation: "modalIn 0.3s ease-out",
            boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(251,191,36,0.2)",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <div style={{ fontSize: "40px", marginBottom: "8px" }}>🔔</div>
              <div style={{ fontSize: "13px", color: "#FBBF24", fontWeight: 700, letterSpacing: "2px", marginBottom: "4px" }}>拍攝提醒</div>
              <div style={{ fontSize: "22px", fontWeight: 900, color: "#FDE68A" }}>
                {SCHEDULE[showModal]?.time}
              </div>
            </div>
            <div style={{
              background: "rgba(251,191,36,0.1)",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "16px",
            }}>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "#FDE68A", marginBottom: "6px" }}>
                {SCHEDULE[showModal]?.title}
              </div>
              <div style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "12px" }}>
                📍 {SCHEDULE[showModal]?.location}
              </div>
              <div style={{ fontSize: "13px", color: "#CBD5E1", fontWeight: 600, marginBottom: "8px" }}>
                需要拍攝 {SCHEDULE[showModal]?.shots.length} 個鏡頭：
              </div>
              <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                {SCHEDULE[showModal]?.shots.map((shot, i) => (
                  <div key={i} style={{
                    fontSize: "13px", color: "#E2E8F0", padding: "4px 0",
                    borderBottom: i < SCHEDULE[showModal].shots.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}>
                    {shot.type} {shot.desc}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => { setShowModal(null); setExpandedIdx(showModal); }} style={{
              width: "100%", padding: "14px", border: "none", borderRadius: "12px",
              background: "linear-gradient(135deg, #FBBF24, #F59E0B)",
              color: "#1a1a2e", fontSize: "15px", fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              查看拍攝清單
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "linear-gradient(180deg, rgba(26,26,46,0.98) 0%, rgba(26,26,46,0.92) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(251,191,36,0.15)",
        padding: "calc(env(safe-area-inset-top) + 12px) 16px 12px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
          <div>
            <div style={{ fontSize: "11px", color: "#FBBF24", fontWeight: 700, letterSpacing: "3px", marginBottom: "2px" }}>
              🎬 拍攝計畫
            </div>
            <div style={{ fontSize: "18px", fontWeight: 900, color: "#FDE68A", lineHeight: 1.3 }}>
              國二忠 齋僧活動
            </div>
            <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>
              2026.05.03 ｜ 雲林斗六 湖山分院
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button onClick={() => setShowFilmStructure(!showFilmStructure)} style={{
              background: showFilmStructure ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(251,191,36,0.3)",
              borderRadius: "10px", padding: "8px 10px",
              color: "#FDE68A", fontSize: "13px", cursor: "pointer",
            }}>🎞️</button>
            <button onClick={() => setShowSettings(!showSettings)} style={{
              background: showSettings ? "rgba(251,191,36,0.2)" : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(251,191,36,0.3)",
              borderRadius: "10px", padding: "8px 10px",
              color: "#FDE68A", fontSize: "13px", cursor: "pointer",
            }}>⚙️</button>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              width: `${totalShots ? (totalDone / totalShots) * 100 : 0}%`,
              height: "100%",
              background: "linear-gradient(90deg, #FBBF24, #F59E0B)",
              borderRadius: "3px",
              transition: "width 0.5s ease",
              animation: totalDone > 0 ? "progressGlow 2s infinite" : "none",
            }} />
          </div>
          <div style={{ fontSize: "12px", color: "#94A3B8", whiteSpace: "nowrap" }}>
            {totalDone}/{totalShots} 鏡頭
          </div>
        </div>

        {nextIdx >= 0 && (
          <div style={{
            marginTop: "8px", padding: "8px 12px",
            background: "rgba(251,191,36,0.08)", borderRadius: "8px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ fontSize: "12px", color: "#94A3B8" }}>
              ⏱ 下一站：<span style={{ color: "#FDE68A", fontWeight: 600 }}>{SCHEDULE[nextIdx].title}</span>
            </div>
            <div style={{ fontSize: "13px", color: "#FBBF24", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
              {(() => {
                const nextMin = parseTime(SCHEDULE[nextIdx].time);
                const diffMs = (nextMin - currentMinutes) * 60000 - currentSeconds * 1000;
                return formatCountdown(diffMs > 0 ? diffMs : 0);
              })()}
            </div>
          </div>
        )}
      </div>

      {showSettings && (
        <div style={{
          margin: "12px 16px", padding: "16px",
          background: "rgba(255,255,255,0.04)", borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "slideIn 0.2s ease-out",
        }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#FDE68A", marginBottom: "12px" }}>設定</div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px" }}>🔊 提醒音效</span>
            <button onClick={() => setSoundEnabled(!soundEnabled)} style={{
              width: "48px", height: "26px", borderRadius: "13px", border: "none", cursor: "pointer",
              background: soundEnabled ? "#FBBF24" : "rgba(255,255,255,0.15)",
              position: "relative", transition: "background 0.2s",
            }}>
              <div style={{
                width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
                position: "absolute", top: "3px",
                left: soundEnabled ? "25px" : "3px", transition: "left 0.2s",
              }} />
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <span style={{ fontSize: "13px" }}>⏰ 提前提醒(分鐘)</span>
            <div style={{ display: "flex", gap: "6px" }}>
              {[3, 5, 10].map((m) => (
                <button key={m} onClick={() => setPreAlertMin(m)} style={{
                  padding: "4px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                  background: preAlertMin === m ? "#FBBF24" : "rgba(255,255,255,0.1)",
                  color: preAlertMin === m ? "#1a1a2e" : "#94A3B8",
                  fontSize: "13px", fontWeight: 600,
                }}>{m}</button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px" }}>🕐 模擬時間模式</span>
              <button onClick={() => setUseSimTime(!useSimTime)} style={{
                width: "48px", height: "26px", borderRadius: "13px", border: "none", cursor: "pointer",
                background: useSimTime ? "#FBBF24" : "rgba(255,255,255,0.15)",
                position: "relative", transition: "background 0.2s",
              }}>
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
                  position: "absolute", top: "3px",
                  left: useSimTime ? "25px" : "3px", transition: "left 0.2s",
                }} />
              </button>
            </div>
            {useSimTime && (
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input type="range" min={7} max={16} value={simHour}
                  onChange={(e) => { setSimHour(+e.target.value); setAlertShown({}); }}
                  style={{ flex: 1, accentColor: "#FBBF24" }} />
                <input type="range" min={0} max={59} value={simMin}
                  onChange={(e) => { setSimMin(+e.target.value); setAlertShown({}); }}
                  style={{ flex: 1, accentColor: "#FBBF24" }} />
                <span style={{ fontSize: "16px", fontWeight: 700, color: "#FBBF24", minWidth: "52px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                  {String(simHour).padStart(2,"0")}:{String(simMin).padStart(2,"0")}
                </span>
              </div>
            )}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px", marginTop: "12px" }}>
            <button onClick={() => {
              if (confirm("確定要清除所有打勾紀錄嗎？")) setCheckedShots({});
            }} style={{
              width: "100%", padding: "10px", borderRadius: "10px",
              background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
              color: "#FCA5A5", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>🗑 清除所有勾選紀錄</button>
          </div>
        </div>
      )}

      {showFilmStructure && (
        <div style={{
          margin: "12px 16px", padding: "16px",
          background: "rgba(255,255,255,0.04)", borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "slideIn 0.2s ease-out",
        }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#FDE68A", marginBottom: "12px" }}>🎞️ 影片架構(約5分鐘)</div>
          {[
            { ch: "第一章", name: "啟程與期待", dur: "約1分鐘", color: "#F97316" },
            { ch: "第二章", name: "同心協力：製作與準備", dur: "約1.5分鐘", color: "#22C55E" },
            { ch: "第三章", name: "虔誠供養：齋僧與廣供", dur: "約1分鐘", color: "#EC4899" },
            { ch: "第四章", name: "溫情時光：用餐與親子", dur: "約0.5分鐘", color: "#F59E0B" },
            { ch: "第五章", name: "福田心耕：出坡與結行", dur: "約1分鐘", color: "#3B82F6" },
          ].map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: "10px",
              padding: "8px 0",
              borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.05)" : "none",
            }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: c.color, flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#E2E8F0" }}>{c.ch}：{c.name}</div>
              </div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>{c.dur}</div>
            </div>
          ))}
          <div style={{
            marginTop: "12px", padding: "10px", borderRadius: "10px",
            background: "rgba(251,191,36,0.06)", fontSize: "12px", color: "#94A3B8", lineHeight: 1.6,
          }}>
            🎵 音樂建議：前半段輕快活潑 → 齋僧過程莊重 → 結尾感人溫馨<br/>
            🎙️ 建議錄製1-2位家長/學生的心聲作為旁白
          </div>
        </div>
      )}

      <div style={{ padding: "16px 12px 120px", position: "relative", zIndex: 1 }}>
        <div style={{
          position: "absolute", left: "28px", top: "24px", bottom: "100px",
          width: "2px", background: "linear-gradient(180deg, rgba(251,191,36,0.3), rgba(251,191,36,0.05))",
        }} />

        {SCHEDULE.map((item, idx) => {
          const itemMin = parseTime(item.time);
          const isActive = idx === activeIdx;
          const isPast = currentMinutes > itemMin + 30;
          const isExpanded = expandedIdx === idx;
          const progress = getProgress(idx);
          const cs = getChapterStyle(item.chapter);

          return (
            <div key={idx} ref={isActive ? activeRef : null} style={{
              position: "relative", marginBottom: "12px", paddingLeft: "44px",
              animation: `slideIn 0.3s ease-out ${idx * 0.05}s both`,
            }}>
              <div style={{
                position: "absolute", left: "20px", top: "18px",
                width: "18px", height: "18px", borderRadius: "50%",
                background: isActive ? "#FBBF24" : isPast ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.1)",
                border: `2px solid ${isActive ? "#FBBF24" : isPast ? "rgba(251,191,36,0.4)" : "rgba(255,255,255,0.15)"}`,
                zIndex: 2,
                animation: isActive ? "pulse 2s infinite" : "none",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {isPast && progress.pct === 100 && (<span style={{ fontSize: "10px" }}>✓</span>)}
              </div>

              <div onClick={() => setExpandedIdx(isExpanded ? null : idx)} style={{
                background: isActive
                  ? "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(251,191,36,0.04) 100%)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? "rgba(251,191,36,0.3)" : "rgba(255,255,255,0.06)"}`,
                borderRadius: "16px", padding: "14px 14px",
                cursor: "pointer",
                opacity: isPast && !isExpanded ? 0.6 : 1,
                transition: "all 0.3s ease",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: "18px", fontWeight: 900,
                        color: isActive ? "#FBBF24" : "#94A3B8",
                        fontVariantNumeric: "tabular-nums",
                      }}>{item.time}</span>
                      <span style={{
                        fontSize: "10px", padding: "2px 8px", borderRadius: "6px",
                        background: cs.tag, color: cs.accent, fontWeight: 600,
                        fontFamily: "'Noto Sans TC', sans-serif",
                      }}>{item.chapter}</span>
                    </div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "#E2E8F0", marginBottom: "4px" }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: "12px", color: "#64748B" }}>📍 {item.location}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                    <div style={{
                      fontSize: "12px", color: progress.pct === 100 ? "#22C55E" : "#94A3B8",
                      fontWeight: 600,
                    }}>{progress.done}/{progress.total}</div>
                    <span style={{
                      fontSize: "16px",
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s", display: "inline-block",
                    }}>▾</span>
                  </div>
                </div>

                <div style={{
                  marginTop: "8px", height: "3px",
                  background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden",
                }}>
                  <div style={{
                    width: `${progress.pct}%`, height: "100%",
                    background: progress.pct === 100 ? "#22C55E" : "#FBBF24",
                    borderRadius: "2px", transition: "width 0.4s ease",
                  }} />
                </div>

                {isExpanded && (
                  <div style={{ marginTop: "14px", animation: "slideIn 0.2s ease-out" }}>
                    {item.tips && (
                      <div style={{
                        padding: "10px 12px", borderRadius: "10px",
                        background: "rgba(251,191,36,0.08)",
                        border: "1px solid rgba(251,191,36,0.15)",
                        fontSize: "12px", color: "#FDE68A", lineHeight: 1.6,
                        marginBottom: "12px",
                      }}>{item.tips}</div>
                    )}
                    {item.textOverlay && (
                      <div style={{
                        padding: "10px 12px", borderRadius: "10px",
                        background: "rgba(236,72,153,0.06)",
                        border: "1px solid rgba(236,72,153,0.15)",
                        fontSize: "12px", color: "#F9A8D4", lineHeight: 1.7,
                        marginBottom: "12px", fontStyle: "italic",
                      }}>✍️ 建議字幕：{item.textOverlay}</div>
                    )}
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#E2E8F0", marginBottom: "8px" }}>
                      📋 拍攝清單
                    </div>
                    {item.shots.map((shot, si) => {
                      const checked = checkedShots[`${idx}-${si}`];
                      return (
                        <div key={si} onClick={(e) => { e.stopPropagation(); toggleShot(idx, si); }} style={{
                          display: "flex", alignItems: "flex-start", gap: "10px",
                          padding: "10px 10px",
                          background: checked ? "rgba(34,197,94,0.08)" : "rgba(255,255,255,0.02)",
                          borderRadius: "10px", marginBottom: "4px",
                          border: `1px solid ${checked ? "rgba(34,197,94,0.2)" : "transparent"}`,
                          cursor: "pointer", transition: "all 0.2s",
                        }}>
                          <div style={{
                            width: "22px", height: "22px", borderRadius: "6px", flexShrink: 0,
                            border: `2px solid ${checked ? "#22C55E" : "rgba(255,255,255,0.2)"}`,
                            background: checked ? "#22C55E" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s", marginTop: "1px",
                          }}>
                            {checked && <span style={{ color: "#fff", fontSize: "12px", fontWeight: 900 }}>✓</span>}
                          </div>
                          <div style={{
                            fontSize: "13px", color: checked ? "#64748B" : "#CBD5E1",
                            textDecoration: checked ? "line-through" : "none",
                            lineHeight: 1.5,
                          }}>
                            <span style={{ marginRight: "4px" }}>{shot.type}</span>
                            {shot.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showInstallHint && <InstallHint onClose={dismissHint} />}

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "linear-gradient(180deg, rgba(26,26,46,0.95), rgba(15,52,96,0.98))",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(251,191,36,0.15)",
        padding: "12px 20px calc(12px + env(safe-area-inset-bottom))",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 100,
      }}>
        <div style={{ fontSize: "12px", color: "#64748B" }}>
          {useSimTime ? "🕐 模擬模式" : "🔴 即時模式"}
        </div>
        <div style={{
          fontSize: "22px", fontWeight: 900, color: "#FBBF24",
          fontVariantNumeric: "tabular-nums",
          fontFamily: "'Noto Sans TC', sans-serif",
        }}>
          {useSimTime
            ? `${String(simHour).padStart(2,"0")}:${String(simMin).padStart(2,"0")}`
            : `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`}
        </div>
        <div style={{ fontSize: "12px", color: soundEnabled ? "#22C55E" : "#EF4444" }}>
          {soundEnabled ? "🔔 已開啟" : "🔕 已關閉"}
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
