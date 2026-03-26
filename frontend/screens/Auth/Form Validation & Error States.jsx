// ── FORGOT PASSWORD SCREEN ───────────────────────────────────
// Validation: empty email, missing "@"
// Error UI:   red banner, success "Check your inbox" state
const ForgotScreen = ({
  fpEmail, setFpEmail,
  fpSent, setFpSent,
  fpError, setFpError,
  onBack,
}) => {

  // ── Validation — runs before any network call ──────────────
  const handleForgotPassword = () => {
    if (!fpEmail.trim())        { setFpError("Please enter your email address."); return; }
    if (!fpEmail.includes("@")) { setFpError("Please enter a valid email.");      return; }
    setFpError("");
    setFpSent(true);   // triggers success UI below
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
      <Hero />
      <div style={{ padding: "0 24px 32px" }}>

        {/* ── Back + Title ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, marginTop: 4 }}>
          <button
            onClick={() => { onBack(); setFpSent(false); setFpError(""); setFpEmail(""); }}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <Icon n="back" color={C.textMuted} size={20} />
          </button>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: -1 }}>
            Reset Password
          </h1>
        </div>
        <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 24, marginLeft: 30 }}>
          Enter your email and we'll send you a reset link
        </p>

        {/* ── SUCCESS STATE ── */}
        {fpSent ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📬</div>
            <div style={{ fontWeight: 900, fontSize: 20, marginBottom: 8 }}>Check your inbox</div>
            <div style={{ color: C.textMuted, fontSize: 13, marginBottom: 6 }}>
              We sent a reset link to
            </div>
            <div style={{ color: C.green, fontWeight: 700, fontSize: 14, marginBottom: 28 }}>
              {fpEmail}
            </div>
            <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 24 }}>
              Didn't receive it? Check your spam folder or try again.
            </div>
            <button
              onClick={() => setFpSent(false)}
              style={{
                background: "none", border: `1px solid ${C.border}`, color: C.textDim,
                padding: "10px 24px", borderRadius: 50, cursor: "pointer",
                fontSize: 13, fontWeight: 600, marginBottom: 12,
              }}
            >
              Resend Email
            </button>
            <div />
            <span
              onClick={() => { onBack(); setFpSent(false); setFpEmail(""); }}
              style={{ color: C.green, fontWeight: 700, cursor: "pointer", fontSize: 13 }}
            >
              Back to Sign In
            </span>
          </div>
        ) : (
          <>
            {/* ── ERROR BANNER ── */}
            {fpError && (
              <div
                style={{
                  background: "rgba(232,64,64,0.08)", border: "1px solid rgba(232,64,64,0.3)",
                  borderRadius: 14, padding: "10px 14px", marginBottom: 14,
                  color: C.red, fontSize: 13, fontWeight: 600,
                }}
              >
                {fpError}
              </div>
            )}

            <div style={{ fontSize: 13, color: C.textDim, marginBottom: 6 }}>Email Address</div>
            <input
              value={fpEmail}
              onChange={e => setFpEmail(e.target.value)}
              placeholder="name@example.com"
              type="email"
              style={{
                width: "100%", padding: "14px 18px", borderRadius: 50,
                background: "#0f1f13", border: `1px solid ${C.border}`,
                color: C.text, fontSize: 14, marginBottom: 22,
                boxSizing: "border-box", outline: "none",
              }}
            />

            <Btn onClick={handleForgotPassword} style={{ marginBottom: 18 }}>
              Send Reset Link
            </Btn>

            <p style={{ textAlign: "center", color: C.textDim, fontSize: 13, margin: 0 }}>
              Remember your password?{" "}
              <span
                style={{ color: C.green, fontWeight: 700, cursor: "pointer" }}
                onClick={() => { onBack(); setFpError(""); }}
              >
                Sign In
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};


// ── SIGN UP SCREEN ───────────────────────────────────────────
// Validation: empty name, empty email, password < 6 chars, passwords don't match
// Error UI:   red banner, success banner, live password match indicator
const SignUpScreen = ({
  suName, setSuName,
  suEmail, setSuEmail,
  suPass, setSuPass,
  suConfirm, setSuConfirm,
  showSu, setShowSu,
  showConfirm, setShowConfirm,
  suError, setSuError,
  suSuccess,
  handleSignUp,   // final submit — Person B calls onLogin inside this
  onBack,
}) => (
  <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
    <Hero />
    <div style={{ padding: "0 24px 32px" }}>

      {/* ── Back + Title ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, marginTop: 4 }}>
        <button
          onClick={() => { onBack(); setSuError(""); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
        >
          <Icon n="back" color={C.textMuted} size={20} />
        </button>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: -1 }}>
          Create Account
        </h1>
      </div>
      <p style={{ color: C.green, fontSize: 14, marginBottom: 20, fontWeight: 600, marginLeft: 30 }}>
        Join BookMyCourt today
      </p>

      {/* ── SUCCESS BANNER ── */}
      {suSuccess && (
        <div
          style={{
            background: "rgba(34,228,85,0.1)", border: `1px solid ${C.green}44`,
            borderRadius: 14, padding: "12px 16px", marginBottom: 16, textAlign: "center",
          }}
        >
          <div style={{ fontWeight: 800, color: C.green, fontSize: 15 }}>Account created!</div>
          <div style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>Signing you in...</div>
        </div>
      )}

      {/* ── ERROR BANNER ── */}
      {suError && (
        <div
          style={{
            background: "rgba(232,64,64,0.08)", border: "1px solid rgba(232,64,64,0.3)",
            borderRadius: 14, padding: "10px 14px", marginBottom: 14,
            color: C.red, fontSize: 13, fontWeight: 600,
          }}
        >
          {suError}
        </div>
      )}

      {/* ── Full Name ── */}
      <div style={{ fontSize: 13, color: C.textDim, marginBottom: 6 }}>Full Name</div>
      <input
        value={suName} onChange={e => setSuName(e.target.value)}
        placeholder="Alex Johnson" type="text"
        style={{
          width: "100%", padding: "14px 18px", borderRadius: 50, background: "#0f1f13",
          border: `1px solid ${C.border}`, color: C.text, fontSize: 14, marginBottom: 14,
          boxSizing: "border-box", outline: "none",
        }}
      />

      {/* ── Email ── */}
      <div style={{ fontSize: 13, color: C.textDim, marginBottom: 6 }}>Email Address</div>
      <input
        value={suEmail} onChange={e => setSuEmail(e.target.value)}
        placeholder="name@example.com" type="email"
        style={{
          width: "100%", padding: "14px 18px", borderRadius: 50, background: "#0f1f13",
          border: `1px solid ${C.border}`, color: C.text, fontSize: 14, marginBottom: 14,
          boxSizing: "border-box", outline: "none",
        }}
      />

      {/* ── Password ── */}
      <div style={{ fontSize: 13, color: C.textDim, marginBottom: 6 }}>Password</div>
      <div style={{ position: "relative", marginBottom: 14 }}>
        <input
          type={showSu ? "text" : "password"} value={suPass}
          onChange={e => setSuPass(e.target.value)} placeholder="Min. 6 characters"
          style={{
            width: "100%", padding: "14px 46px 14px 18px", borderRadius: 50,
            background: "#0f1f13", border: `1px solid ${C.border}`,
            color: C.text, fontSize: 14, boxSizing: "border-box", outline: "none",
          }}
        />
        <button
          onClick={() => setShowSu(!showSu)}
          style={{
            position: "absolute", right: 16, top: "50%",
            transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer",
          }}
        >
          <Icon n="eye" color={C.textMuted} size={18} />
        </button>
      </div>

      {/* ── Confirm Password ── */}
      <div style={{ fontSize: 13, color: C.textDim, marginBottom: 6 }}>Confirm Password</div>
      <div style={{ position: "relative", marginBottom: 4 }}>
        <input
          type={showConfirm ? "text" : "password"} value={suConfirm}
          onChange={e => setSuConfirm(e.target.value)} placeholder="Re-enter password"
          style={{
            width: "100%", padding: "14px 46px 14px 18px", borderRadius: 50,
            background: "#0f1f13",
            border: `1px solid ${
              suConfirm && suConfirm !== suPass
                ? "rgba(232,64,64,0.5)"
                : suConfirm && suConfirm === suPass
                  ? C.green + "66"
                  : C.border
            }`,
            color: C.text, fontSize: 14, boxSizing: "border-box", outline: "none",
          }}
        />
        <button
          onClick={() => setShowConfirm(!showConfirm)}
          style={{
            position: "absolute", right: 16, top: "50%",
            transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer",
          }}
        >
          <Icon n="eye" color={C.textMuted} size={18} />
        </button>
      </div>

      {/* ── LIVE PASSWORD MATCH INDICATOR ── */}
      <div style={{ minHeight: 22, marginBottom: 14, paddingLeft: 4 }}>
        {suConfirm.length > 0 && (
          <span
            style={{
              fontSize: 11,
              color: suConfirm === suPass ? C.green : C.red,
              fontWeight: 600,
            }}
          >
            {suConfirm === suPass ? "✓ Passwords match" : "✗ Passwords do not match"}
          </span>
        )}
      </div>

      <Btn onClick={handleSignUp} style={{ marginBottom: 18 }}>Create Account</Btn>

      <p style={{ textAlign: "center", color: C.textDim, fontSize: 13, margin: 0 }}>
        Already have an account?{" "}
        <span
          style={{ color: C.green, fontWeight: 700, cursor: "pointer" }}
          onClick={() => { onBack(); setSuError(""); }}
        >
          Sign In
        </span>
      </p>
    </div>
  </div>
);
