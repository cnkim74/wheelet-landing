// App store links. Set googlePlay when the Android app is published; null = 준비중.
export const STORE_LINKS = {
  appStore: "https://apps.apple.com/app/id6788627879",
  googlePlay: null as string | null,
};

export const NAV_LINKS = [
  { href: "#showcase", label: "기능" },
  { href: "#tesla", label: "테슬라" },
  { href: "#screens", label: "화면" },
  { href: "#pricing", label: "요금제" },
  { href: "#business", label: "기업용" },
  { href: "#faq", label: "FAQ" },
];

export const TESLA_CAPABILITIES: {
  title: string;
  desc: string;
  soon?: boolean;
}[] = [
  {
    title: "배터리·주행거리 실시간 동기화",
    desc: "차에 타지 않아도 충전 상태와 총주행거리가 앱에 자동으로 반영됩니다.",
  },
  {
    title: "슈퍼차저 충전 이력 자동 기록",
    desc: "슈퍼차저 세션의 시간·위치·충전량·요금을 그대로 장부에 올립니다.",
  },
  {
    title: "차량 상태 원격 조회",
    desc: "실내온도, 주차 위치, 도어 상태까지 Wheelet 안에서 한눈에.",
  },
  {
    title: "수동 입력 제로",
    desc: "영수증도, 계기판 사진도 필요 없어요. 그냥 타고 다니세요.",
  },
  {
    title: "슈퍼차저 찾기",
    desc: "주변 슈퍼차저 위치와 실시간 혼잡도를 앱에서 바로 확인하세요.",
    soon: true,
  },
];

export const TESLA_STEPS = [
  {
    n: "01",
    title: "‘테슬라 연결’ 선택",
    desc: "Wheelet 앱 차고에서 테슬라 차량을 추가하고 ‘테슬라 연결’을 누릅니다.",
  },
  {
    n: "02",
    title: "테슬라 계정으로 로그인",
    desc: "테슬라 공식 로그인 화면에서 인증해요. 비밀번호는 Wheelet에 저장되지 않습니다.",
  },
  {
    n: "03",
    title: "데이터 접근 권한 승인",
    desc: "배터리·주행거리·충전 이력 조회 권한을 승인하면 연결이 끝납니다.",
  },
  {
    n: "04",
    title: "원클릭 동기화 시작",
    desc: "이후엔 버튼 한 번으로 현재 상태를 최신으로 맞추고, 이력은 자동 기록됩니다.",
  },
];

export const HERO_STATS = [
  { value: "98%", label: "자동기록 정확도" },
  { value: "₩31만", label: "연평균 절약액" },
  { value: "4.9", label: "스토어 평점" },
];

export type IconKey =
  | "sparkle"
  | "pulse"
  | "bars"
  | "garage"
  | "bolt"
  | "chat";

export const FEATURES: {
  icon: IconKey;
  tint: string;
  title: string;
  desc: string;
}[] = [
  {
    icon: "sparkle",
    tint: "gold",
    title: "AI 자동 기록",
    desc: "충전소·주유소 결제를 자동 인식해 장부에 올립니다. 영수증 촬영도, 수기 입력도 필요 없어요.",
  },
  {
    icon: "pulse",
    tint: "orange",
    title: "약정거리 예측",
    desc: "렌트·리스 약정거리 소진 페이스를 계산해 만료 시점 초과 여부를 미리 알려드립니다.",
  },
  {
    icon: "bars",
    tint: "silver",
    title: "월간 통계 & 리포트",
    desc: "지출·주행·정비를 한 장으로 요약한 월간 리포트를 PDF로 공유하세요.",
  },
  {
    icon: "garage",
    tint: "gold",
    title: "멀티 차고",
    desc: "전기차, 내연기관, 오토바이까지. 여러 대를 하나의 차고에서 관리합니다.",
  },
  {
    icon: "bolt",
    tint: "green",
    title: "테슬라 · OBD 연동",
    desc: "배터리·주행거리 자동 동기화, 슈퍼차저 이력 가져오기, OBD 동글 연동까지.",
  },
  {
    icon: "chat",
    tint: "plain",
    title: "무엇이든 물어보세요",
    desc: '"이번 달 충전비 얼마 썼어?" 내 차 데이터에 대해 AI에게 바로 질문하세요.',
  },
];

export const SHOWCASE = [
  {
    index: "01",
    kicker: "AI 자동 기록",
    accent: "gold",
    title: ["충전 끝나면,", "장부는 이미 적혀 있다"],
    desc: "SK일렉링크, 슈퍼차저, 주유소 결제까지 자동 인식. 시간·장소·단가·용량이 그대로 기록됩니다. 정확도 98%.",
    images: ["/screens/2-records.png"],
  },
  {
    index: "02",
    kicker: "약정거리 예측",
    accent: "orange",
    title: ["위약금 내기 전에,", "페이스를 알려드립니다"],
    desc: "현재 주행 페이스로 만료 시점 총주행거리를 예측하고, 적정 대비 퍼센트로 위험도를 보여줍니다. 렌트·리스 이용자의 필수 기능.",
    images: ["/screens/3-stats.png"],
  },
  {
    index: "03",
    kicker: "멀티 차고",
    accent: "silver",
    title: ["전기차부터 바이크까지,", "차고 하나로"],
    desc: "테슬라 동기화, OBD 동글 연동, 중고 시세 AI 조회까지. 소유한 모든 탈것의 자산 가치를 한눈에.",
    images: ["/screens/4-garage.png", "/screens/5-bike.png"],
  },
] as const;

export const SCREENS = [
  { src: "/screens/2-records.png", alt: "기록 화면", offset: "mt-8" },
  { src: "/screens/1-home.png", alt: "홈 화면", offset: "mt-0", featured: true },
  { src: "/screens/3-stats.png", alt: "통계 화면", offset: "mt-8" },
  { src: "/screens/4-garage.png", alt: "차고 화면", offset: "mt-16" },
  { src: "/screens/5-bike.png", alt: "차고 - 바이크 화면", offset: "mt-8" },
];

export const PLANS: {
  name: string;
  price: string;
  suffix?: string;
  featured?: boolean;
  badge?: string;
  cta: string;
  features: string[];
}[] = [
  {
    name: "Free",
    price: "₩0",
    cta: "시작하기",
    features: ["차량 1대", "수동 기록 무제한", "월간 기본 통계"],
  },
  {
    name: "Premium",
    price: "₩4,900",
    suffix: "/월",
    featured: true,
    badge: "가장 인기",
    cta: "14일 무료 체험",
    features: [
      "AI 자동 기록 · 인사이트",
      "차량 무제한",
      "약정거리 예측",
      "테슬라·OBD 연동",
      "월간 리포트 PDF",
    ],
  },
  {
    name: "Business",
    price: "문의",
    cta: "영업팀 문의",
    features: [
      "법인차량 플리트 관리",
      "웹 CMS 대시보드",
      "지출 정산 · 운전자 관리",
      "전담 지원",
    ],
  },
];

export const BUSINESS_STATS = [
  { label: "관리 차량", value: "48대", tint: "plain" },
  { label: "월 지출 절감", value: "−18%", tint: "gold" },
  { label: "정산 시간", value: "6시간 → 10분", tint: "plain" },
  { label: "약정 초과 사고", value: "0건", tint: "green" },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "자동 기록은 어떻게 작동하나요?",
    a: "충전기·주유소 결제 알림을 AI가 인식해 일시·장소·금액·용량을 자동 분류합니다. 잘못 잡힌 기록은 탭 한 번으로 수정할 수 있어요.",
  },
  {
    q: "내연기관·오토바이도 지원하나요?",
    a: "네. 주유 기록, 엔진오일 등 정비 주기 알림, 오토바이까지 모두 지원합니다. 전기차는 배터리·충전 이력 연동이 추가로 제공됩니다.",
  },
  {
    q: "렌트/리스 약정거리 알림은 무료인가요?",
    a: "약정거리 예측은 Premium 기능입니다. 14일 무료 체험 기간 동안 제한 없이 사용해보실 수 있어요.",
  },
  {
    q: "테슬라 연동에 별도 비용이 있나요?",
    a: "아니요. Premium 요금제에 테슬라·OBD 연동이 포함되어 있으며 추가 비용은 없습니다. 배터리·주행거리·슈퍼차저 이력이 자동 동기화됩니다.",
  },
  {
    q: "데이터는 안전하게 보관되나요?",
    a: "모든 데이터는 암호화되어 저장되며, 결제·차량 정보는 국내 클라우드에 안전하게 보관됩니다. 언제든 전체 데이터를 내보내거나 삭제할 수 있어요.",
  },
  {
    q: "법인용 CMS는 어떻게 도입하나요?",
    a: "Business 요금제로 웹 CMS 대시보드를 제공합니다. 데모 신청 후 도입 규모에 맞춰 온보딩을 도와드립니다.",
  },
];
