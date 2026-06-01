import React from "react";
import { ShieldCheck } from "lucide-react";
import { testQuestions } from "../../../data/mockPointsmanData";

export function PointsmanMCQTest({
  pmActiveQIdx,
  pmTestResponses,
  setPmTestResponses,
  setPmActiveQIdx,
  setScreenMode,
  fullName,
  employeeId,
  profile,
  handleSubmitTestAttempt,
  handleExitExam // Added reusable exit handler
}) {
  const question = testQuestions[pmActiveQIdx];
  const answeredCount = pmTestResponses.filter(r => r !== null && r !== undefined).length;
  const completionRate = Math.round((answeredCount / 25) * 100);
  const unansweredCount = 25 - answeredCount;

  return (
    <div style={{
      position:"fixed", top:0, left:0, right:0, bottom:0, zIndex:999999,
      background:"#f1f5f9", display:"flex", flexDirection:"column",
      height:"100vh", width:"100vw", overflow:"hidden", fontFamily:"'Poppins', sans-serif"
    }}>
      <header style={{
        background:"#1e293b", color:"#ffffff", padding:"16px 24px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        boxShadow:"0 4px 6px -1px rgba(0,0,0,0.1)", height:"70px", flexShrink:0
      }}>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <ShieldCheck size={28} color="#ea580c"/>
          <div>
            <h1 style={{fontSize:18, fontWeight:800, margin:0, color:"#ffffff", letterSpacing:"0.5px"}}>
              POINTSMAN CBT COMPETENCY EVALUATION
            </h1>
            <p style={{margin:0, fontSize:11, color:"#94a3b8", fontWeight:500}}>
              Official Railway Safety &amp; Operational Assessment
            </p>
          </div>
        </div>
        <div style={{display:"flex", alignItems:"center", gap:16}}>
          <div style={{background:"#334155", padding:"6px 16px", borderRadius:8, fontSize:13, fontWeight:700, color:"#cbd5e1", border:"1px solid #475569"}}>
            ⚙️ STATUS: <span style={{color:"#ea580c"}}>Active Exam Session</span>
          </div>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to abort the exam? Your progress will not be saved.")) {
                if (handleExitExam) {
                  handleExitExam();
                } else {
                  setScreenMode("default");
                }
              }
            }}
            style={{padding:"8px 18px", borderRadius:8, fontSize:13, background:"#ef4444", color:"#ffffff", border:"none", fontWeight:700, cursor:"pointer"}}
          >
            Exit Exam
          </button>
        </div>
      </header>

      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"#ffffff", borderBottom:"1.5px solid #e2e8f0", padding:"12px 24px", height:"50px", flexShrink:0, fontSize:13.5, color:"#334155"}}>
        <div>Candidate: <strong style={{color:"#1e3a8a"}}>{fullName}</strong> &nbsp;|&nbsp; HRMS: <strong style={{color:"#1e3a8a"}}>{employeeId}</strong> &nbsp;|&nbsp; Station: <strong>{profile.stationName}</strong></div>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <span style={{fontWeight:600}}>Progress: <strong style={{color:"#ea580c"}}>{answeredCount} / 25 Answered</strong> ({completionRate}%)</span>
          <div style={{width:140, height:8, background:"#e2e8f0", borderRadius:4, overflow:"hidden"}}>
            <div style={{width:`${completionRate}%`, height:"100%", background:"#ea580c", borderRadius:4}}/>
          </div>
        </div>
      </div>

      <div style={{display:"grid", gridTemplateColumns:"1fr 340px", flex:1, overflow:"hidden"}}>
        {/* Left: Question Pane */}
        <div style={{padding:"32px 40px", display:"flex", flexDirection:"column", background:"#f8fafc", overflowY:"auto", height:"100%"}}>
          <div style={{background:"#ffffff", border:"1px solid #e2e8f0", borderRadius:14, padding:36, boxShadow:"0 10px 15px -3px rgba(0,0,0,0.05)", flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between", marginBottom:24}}>
            <div>
              <span style={{fontSize:12.5, fontWeight:800, color:"#ea580c", background:"#fff7ed", padding:"6px 14px", borderRadius:20, textTransform:"uppercase", letterSpacing:"0.8px"}}>
                Compulsory Question {pmActiveQIdx + 1} of 25
              </span>
              <h2 style={{fontSize:22, fontWeight:700, color:"#0f172a", marginTop:24, marginBottom:28, lineHeight:1.5}}>{question.text}</h2>
              <div style={{display:"flex", flexDirection:"column", gap:14}}>
                {question.options.map((opt, oi) => {
                  const isSelected = pmTestResponses[pmActiveQIdx] === oi;
                  return (
                    <label key={oi} style={{display:"flex", alignItems:"center", gap:16, padding:"18px 24px", border:isSelected ? "2.5px solid #ea580c" : "1.5px solid #e2e8f0", borderRadius:12, background:isSelected ? "#fff7ed" : "#ffffff", cursor:"pointer", boxShadow:isSelected ? "0 4px 6px rgba(234,88,12,0.08)" : "none", transition:"all 0.15s ease"}}>
                      <input type="radio" name={`pmq-${pmActiveQIdx}`} checked={isSelected} onChange={() => { const r=[...pmTestResponses]; r[pmActiveQIdx]=oi; setPmTestResponses(r); }} style={{width:20, height:20, accentColor:"#ea580c"}}/>
                      <span style={{fontSize:15, fontWeight:800, color:isSelected?"#c2410c":"#64748b", width:24}}>{["A","B","C","D"][oi]}</span>
                      <span style={{fontSize:15, color:"#1e293b", fontWeight:isSelected?700:500}}>{opt}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", background:"#ffffff", border:"1px solid #e2e8f0", borderRadius:12, padding:"16px 24px", boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)"}}>
            <button disabled={pmActiveQIdx===0} onClick={() => setPmActiveQIdx(p=>Math.max(0,p-1))} style={{padding:"12px 28px", borderRadius:8, fontSize:14, fontWeight:700, background:pmActiveQIdx===0?"#f1f5f9":"#ffffff", color:pmActiveQIdx===0?"#94a3b8":"#334155", border:"1.5px solid #cbd5e1", cursor:pmActiveQIdx===0?"not-allowed":"pointer"}}>← Previous Question</button>
            <div style={{fontSize:14, color:"#64748b"}}>
              {unansweredCount>0 ? <span style={{color:"#b45309",fontWeight:800}}>⚠️ {unansweredCount} question{unansweredCount>1?"s":""} remaining</span> : <span style={{color:"#16a34a",fontWeight:800}}>✓ All 25 answered! You can submit.</span>}
            </div>
            <button disabled={pmActiveQIdx===24} onClick={() => setPmActiveQIdx(p=>Math.min(24,p+1))} style={{padding:"12px 28px", borderRadius:8, fontSize:14, fontWeight:700, background:pmActiveQIdx===24?"#f1f5f9":"#ffffff", color:pmActiveQIdx===24?"#94a3b8":"#334155", border:"1.5px solid #cbd5e1", cursor:pmActiveQIdx===24?"not-allowed":"pointer"}}>Next Question →</button>
          </div>
        </div>

        {/* Right: Navigator Sidebar */}
        <div style={{background:"#ffffff", borderLeft:"1.5px solid #e2e8f0", padding:"24px", display:"flex", flexDirection:"column", gap:20, overflowY:"auto", height:"100%"}}>
          <div style={{textAlign:"center", paddingBottom:16, borderBottom:"1.5px solid #f1f5f9"}}>
            <div style={{width:60, height:60, borderRadius:"50%", background:"#ffedd5", color:"#ea580c", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:800, margin:"0 auto 10px"}}>{fullName.charAt(0)}</div>
            <h3 style={{fontSize:15, fontWeight:700, color:"#1e293b", margin:0}}>{fullName}</h3>
            <span style={{fontSize:12, color:"#64748b", fontWeight:500}}>HRMS ID: {employeeId}</span>
          </div>
          <h4 style={{fontSize:12, fontWeight:800, color:"#475569", textTransform:"uppercase", letterSpacing:"0.6px", margin:0}}>Question Palette</h4>
          <div style={{display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, maxHeight:220, overflowY:"auto", paddingRight:4}}>
            {testQuestions.map((q, idx) => {
              const isCurrent = idx===pmActiveQIdx;
              const isAnswered = pmTestResponses[idx]!==null && pmTestResponses[idx]!==undefined;
              let bg="#ffffff", border="1.5px solid #cbd5e1", color="#475569", fw="600";
              if (isCurrent) { bg="#ffedd5"; border="2px solid #ea580c"; color="#c2410c"; fw="800"; }
              else if (isAnswered) { bg="#dcfce7"; border="1.5px solid #86efac"; color="#15803d"; }
              else { bg="#fef3c7"; border="1.5px solid #fde047"; color="#a16207"; }
              return <button key={q.id} onClick={()=>setPmActiveQIdx(idx)} style={{height:40, borderRadius:8, fontSize:13, fontWeight:fw, background:bg, border, color, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center"}}>{q.id}</button>;
            })}
          </div>
          <div style={{borderTop:"1.5px solid #f1f5f9", paddingTop:16, fontSize:12, color:"#64748b", display:"flex", flexDirection:"column", gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{width:16,height:16,background:"#dcfce7",border:"1.5px solid #86efac",borderRadius:4}}/><span>Attempted</span></div>
            <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{width:16,height:16,background:"#fef3c7",border:"1.5px solid #fde047",borderRadius:4}}/><span style={{color:"#a16207",fontWeight:600}}>Unattempted</span></div>
            <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{width:16,height:16,background:"#ffedd5",border:"2px solid #ea580c",borderRadius:4}}/><span>Current Focus</span></div>
          </div>
          <div style={{marginTop:"auto", paddingTop:20, borderTop:"1.5px solid #f1f5f9"}}>
            <button
              disabled={unansweredCount>0}
              onClick={handleSubmitTestAttempt}
              style={{width:"100%", padding:"14px 16px", borderRadius:10, fontSize:14.5, fontWeight:800, background:unansweredCount>0?"#cbd5e1":"#16a34a", color:unansweredCount>0?"#94a3b8":"#ffffff", border:"none", cursor:unansweredCount>0?"not-allowed":"pointer", boxShadow:unansweredCount>0?"none":"0 4px 12px rgba(22,163,74,0.3)"}}
            >
              Submit Examination
            </button>
            {unansweredCount>0 && <p style={{fontSize:11, color:"#b45309", margin:"8px 0 0", textAlign:"center", fontWeight:600}}>* All 25 questions must be answered before submission ({unansweredCount} remaining)</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
