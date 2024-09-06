import { atom } from "recoil";

export const charge = atom({
  key: "charge",
  default: {
    chargeclick: false,
  },
});

export const adminRequests = atom({
  key: "adminRequests",
  default: [],
});

export const userState = atom({
  key: "userState",
  default: {
    username: "",
    major: "",
    age: "",
    admissionYear: 19,
    song: "",
    mbti: "",
    point: 0,
    pickMe: 0,
    contact_id: "",
    canRequestCharge: true,
    hobby: [],
    comment: "",
    numParticipants: 0,
  },
});

export const selectedMBTIState = atom({
  key: "selectedMBTIState",
  default: {
    EI: "",
    SN: "",
    TF: "",
    PJ: "",
  },
});

export const MatchPickState = atom({
  key: "MatchPickState",
  default: {
    selectedMBTI: ["X", "X", "X", "X"],
    selectedCategory: [],
    point: 500,
    balance: null,
    isUseOption: [false, false, false, false],
    formData: {
      ageOption: "",
      mbtiOption: "",
      hobbyOption: [],
      contactFrequencyOption: "",
      sameMajorOption: false,
      uuid: "efc3044fc84d4f1e94209d784e8b2615",
    },
  },
});

export const MatchResultState = atom({
  key: "MatchResultState",
  default: {
    age: 0,
    comment: "",
    contactFrequency: "",
    currentPoint: 1500,
    gender: "",
    hobby: [""],
    major: "",
    mbti: "",
    socialId: "",
    song: "",
  },
});

export const checkresultState = atom({
  key: "checkresultState",
  default: [],
});
