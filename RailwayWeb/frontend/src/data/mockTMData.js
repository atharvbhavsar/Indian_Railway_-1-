export const trainManagerProfile = {
  name: "A. Mehta",
  hrmsId: "TM_1001",
  stationName: "Nagpur Junction (NGP)",
  designation: "Train Manager",
  mobileNumber: "+91 98220 77001",
  pmeStatus: "FIT (Periodic Medical Exam) - Due: 2029-08-20",
  refStatus: "COMPLETED (Refresher Course) - Due: 2027-05-12",
  trainingStatus: "ACTIVE (Safety & Automatic Block Certified)",
  currentCategory: "A",
  department: "Operations",
  reportingOfficer: "TI_1001 (Traffic Inspector)",
  joiningDate: "2019-04-12"
};

export const TEST_NAME = "Train Manager Periodic Assessment";

export const rawQuestions = [
  { text: "A signal shows double yellow. The driver should:", options: ["Proceed at full speed", "Prepare to stop at next signal", "Stop immediately", "Sound horn continuously"], answer: 1, explanation: "A double yellow aspect is an attention signal, warning the driver that they are approaching a signal showing a restrictive aspect (single yellow or red) and must prepare to stop." },
  { text: "When a track circuit fails, the train manager must:", options: ["Ignore it and proceed", "Immediately inform the station master", "Wait for someone else to act", "Close the station"], answer: 1, explanation: "Any signal or track circuit failure is a safety hazard. The train manager must notify the Station Master immediately so that proper block working or manual pilot-in procedures can be initiated." },
  { text: "The safe distance to stand from a moving train is:", options: ["0.5 metres", "1 metre", "2 metres", "5 metres"], answer: 2, explanation: "To avoid aerodynamic suction and flying ballast, personnel must maintain a safe distance of at least 2 metres from any moving rail vehicle." },
  { text: "A 'Line Clear' token must be:", options: ["Carried by the guard", "Exchanged only at block stations", "Kept at the engine", "Kept at the signal box"], answer: 1, explanation: "In single line token working territory, the authority to proceed is a tangible token that must only be exchanged at designated block stations under the SM's authority." },
  { text: "Points must be clipped and padlocked when:", options: ["A train is expected", "Maintenance is not needed", "No train is expected for 8 hours", "During night only"], answer: 0, explanation: "For maximum protection during non-interlocked working or defect conditions, points must be physically clipped and padlocked for the authorized route before a train is received." },
  { text: "Which colour indicates a 'Stop' signal?", options: ["Green", "Yellow", "Red", "White"], answer: 2, explanation: "Red is the universal danger aspect indicating a mandatory stop before the signal." },
  { text: "An emergency brake application mid-section requires:", options: ["Driver to restart immediately", "Informing the guard and station master", "Reversing to the last station", "Disconnecting the coupling"], answer: 1, explanation: "An unexpected emergency halt requires immediate coordination with the train guard and the adjacent station masters to protect the block section." },
  { text: "A detonator placed on the track signals the driver to:", options: ["Increase speed", "Stop and proceed cautiously", "Reverse immediately", "Ignore it"], answer: 1, explanation: "A detonator explosion is an audible warning. The loco pilot must stop immediately, investigate, and then proceed with extreme caution at restricted speed." },
  { text: "Fixed signals are distinguished from working signals by:", options: ["Being painted blue", "Having no moving parts", "Being placed lower", "Flashing continuously"], answer: 1, explanation: "Fixed signals are permanent trackside landmarks or boards (like warning boards) that do not have active moving arms or shifting light aspects." },
  { text: "The whistle code for 'Stop' is:", options: ["One long", "Two short", "Three short", "One short"], answer: 0, explanation: "One long continuous blast of the engine whistle is the standard operational code signaling a stop or warning." },
  { text: "When automatic block operations, the speed limit in station limits is:", options: ["15 km/h", "25 km/h", "30 km/h", "50 km/h"], answer: 0, explanation: "Standard automatic block operations speed is strictly capped at 15 km/h to allow train managers and automatic block operations staff to safely switch tracks and prevent high-impact collisions." },
  { text: "A fouling mark indicates:", options: ["The limit of safe track clearance", "A defective rail", "Speed restriction end", "Gradient change"], answer: 0, explanation: "A fouling mark is a physical block placed between two converging tracks indicating the limit up to which vehicles can stand without obstructing movements on the adjacent line." },
  { text: "Who authorises working on a live track?", options: ["The nearest train manager", "The gang mate", "The station master with permit", "Any senior staff"], answer: 2, explanation: "Safety rules forbid working on active tracks without an official block permit and authorization issued by the Station Master on duty." },
  { text: "Verbal communication during train operations must be:", options: ["Quick and informal", "Clear, loud, and repeated back", "Whispered to avoid panic", "Written only"], answer: 1, explanation: "To prevent fatal misunderstandings, all verbal automatic block operations commands and line instructions must be clearly spoken and actively repeated back by the receiver." },
  { text: "A Point Indicator showing 'Normal' means:", options: ["Points are in reverse position", "Points are in normal position", "Points are defective", "No train is expected"], answer: 1, explanation: "A point indicator operates in correspondence with the switch rail position. A 'Normal' display confirms that the points are set for the straight/main line." },
  { text: "In fog, the frequency of detonator placement is:", options: ["Every 500 metres", "Every 1 km", "Every signal", "At engine only"], answer: 2, explanation: "During dense fog or thick weather, additional detonators are placed at the distant signal limits to warn incoming loco pilots of their proximity to the station." },
  { text: "When a train passes, the train manager should:", options: ["Walk along the track", "Stand at least 2 m away and observe", "Record speed", "Signal with a flag immediately"], answer: 1, explanation: "Train Managers are required to perform visual inspection of passing trains (checking for hot axles, hanging parts, or sparks) while standing at a safe distance." },
  { text: "A green hand signal during automatic block operations means:", options: ["Stop", "Proceed", "Caution", "Reverse"], answer: 1, explanation: "A green flag or green hand lamp signal indicates authorization to proceed with the automatic block operations movement." },
  { text: "Interlocking ensures that:", options: ["Signals and points cannot be in conflicting positions", "Only one train can enter the yard", "Points are locked at all times", "Signals always show green"], answer: 0, explanation: "Interlocking is a safety arrangement of signals, points, and other appliances, operated mechanically or electrically, preventing conflicting routes from being cleared simultaneously." },
  { text: "A 'Caution Order' issued to a driver must be:", options: ["Signed and returned to station master", "Kept by the driver until destination", "Torn after reading", "Radioed to control"], answer: 0, explanation: "A caution order contains temporary speed restrictions. The driver must sign and acknowledge receipt, returning the counterfoil to the SM." },
  { text: "The correct way to hold a flag when giving an 'All Right' signal is:", options: ["Waving it rapidly overhead", "Held steadily by the side", "Stretched horizontally at arm's length", "Pointing at the engine"], answer: 2, explanation: "An 'All Right' signal is presented by holding the green flag steadily stretched horizontally at arm's length towards the passing train." },
  { text: "Trap points are used to:", options: ["Increase train speed", "Prevent unauthorized entry into main line", "Derail a runaway vehicle away from the main line", "Signal an emergency stop"], answer: 2, explanation: "Trap points are safety switches designed to derail any runaway carriage or vehicle shifting unauthorizedly towards a busy passenger running line, protecting main line movements." },
  { text: "The SWR (Station Working Rules) must be revised:", options: ["Every 5 years", "As and when changes occur", "Only by the GM", "Never once issued"], answer: 1, explanation: "SWR rules must be amended immediately whenever physical layouts, signaling systems, or operating block instruments are modified at the station." },
  { text: "Before restoring points to normal after engineering work, the train manager must:", options: ["Inform the driver", "Check that the track is clear and inform station master", "Replace detonators", "Wait for green signal"], answer: 1, explanation: "Safety requires the train manager to visually verify that the track switches are free of tools, ballast, or staff before notifying the SM to normalise the routing." },
  { text: "If a signal cannot be lowered, the driver should be given:", options: ["A red flag and stopped", "A 'T/369' caution memo and proceed at 15 km/h", "Permission to proceed at full speed", "A verbal confirmation only"], answer: 1, explanation: "A defective signal requires a physical authorization memo (T/369-3b) handed to the driver, authorizing them to pass the signal at danger at restricted speed." }
];

export const testQuestions = rawQuestions.map((q, i) => ({ id: i + 1, ...q }));

export function generateMockResponses(score) {
  const correctCount = Math.round((score / 100) * 25);
  const arr = Array(25).fill(null);
  const indices = Array.from({ length: 25 }, (_, i) => i);
  // shuffle indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const correctIndices = new Set(indices.slice(0, correctCount));
  for (let i = 0; i < 25; i++) {
    const q = testQuestions[i];
    if (correctIndices.has(i)) {
      arr[i] = q.answer; // correct
    } else {
      arr[i] = (q.answer + 1) % 4; // incorrect
    }
  }
  return arr;
}

export const initialHistory = [
  {
    id: 1,
    date: "2026-03-10",
    name: TEST_NAME,
    assessmentPeriod: "March 2026",
    totalScore: 84,
    sections: [
      { title: "Signal Rules", marks: 17, outOf: 20 },
      { title: "Track Handling", marks: 16, outOf: 20 },
      { title: "Communication", marks: 17, outOf: 20 },
      { title: "Safety Response", marks: 17, outOf: 20 },
      { title: "Operational Judgement", marks: 17, outOf: 20 }
    ],
    responses: generateMockResponses(84)
  },
  {
    id: 2,
    date: "2026-02-10",
    name: TEST_NAME,
    assessmentPeriod: "February 2026",
    totalScore: 76,
    sections: [
      { title: "Signal Rules", marks: 15, outOf: 20 },
      { title: "Track Handling", marks: 16, outOf: 20 },
      { title: "Communication", marks: 14, outOf: 20 },
      { title: "Safety Response", marks: 13, outOf: 20 },
      { title: "Operational Judgement", marks: 18, outOf: 20 }
    ],
    responses: generateMockResponses(76)
  },
  {
    id: 3,
    date: "2026-01-10",
    name: TEST_NAME,
    assessmentPeriod: "January 2026",
    totalScore: 88,
    sections: [
      { title: "Signal Rules", marks: 18, outOf: 20 },
      { title: "Track Handling", marks: 18, outOf: 20 },
      { title: "Communication", marks: 17, outOf: 20 },
      { title: "Safety Response", marks: 18, outOf: 20 },
      { title: "Operational Judgement", marks: 17, outOf: 20 }
    ],
    responses: generateMockResponses(88)
  },
  {
    id: 4,
    date: "2025-12-10",
    name: TEST_NAME,
    assessmentPeriod: "December 2025",
    totalScore: 68,
    sections: [
      { title: "Signal Rules", marks: 13, outOf: 20 },
      { title: "Track Handling", marks: 14, outOf: 20 },
      { title: "Communication", marks: 14, outOf: 20 },
      { title: "Safety Response", marks: 14, outOf: 20 },
      { title: "Operational Judgement", marks: 13, outOf: 20 }
    ],
    responses: generateMockResponses(68)
  },
  {
    id: 5,
    date: "2025-11-10",
    name: TEST_NAME,
    assessmentPeriod: "November 2025",
    totalScore: 72,
    sections: [
      { title: "Signal Rules", marks: 15, outOf: 20 },
      { title: "Track Handling", marks: 14, outOf: 20 },
      { title: "Communication", marks: 14, outOf: 20 },
      { title: "Safety Response", marks: 15, outOf: 20 },
      { title: "Operational Judgement", marks: 14, outOf: 20 }
    ],
    responses: generateMockResponses(72)
  }
];

export const currentTestSeed = {
  id: "CT-APR-2026",
  name: TEST_NAME,
  period: "April 2026"
};
