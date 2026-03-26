const Hero = () => (
  <div style={{ position: "relative", height: 220, flexShrink: 0, overflow: "hidden" }}>
    <img
      src={BG_IMG}
      alt="court"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
    <div
      style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom,rgba(10,19,13,0.05) 0%,rgba(10,19,13,0.95) 100%)",
      }}
    />
    <div
      style={{
        position: "absolute", top: 22, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}
    >
      <img src={LOGO_IMG} alt="logo" style={{ width: 36, height: 36, objectFit: "contain" }} />
      <span style={{ fontWeight: 800, fontSize: 17 }}>BookMyCourt</span>
    </div>
  </div>
);


const LoginScreenUI = ({
  email, setEmail,
  pass, setPass,
  show, setShow,
  loginError,
  handleLogin,
  onForgot,
  onSignUp,
}) => (
  <div style={{ display: "flex", flexDirection: "column", height: "100%", overflowY: "auto" }}>
    <Hero />
    <div style={{ padding: "0 24px 32px" }}>

      {/* ── Heading ── */}
      <h1 style={{ fontSize: 30, fontWeight: 900, marginBottom: 4, letterSpacing: -1 }}>
        Welcome Back
      </h1>
      <p style={{ color: C.green, fontSize: 15, marginBottom: 24, fontWeight: 600 }}>
        Ready for your next match?
      </p>

      {/* ── Demo hint card ── */}
      <div
        style={{
          background: "rgba(34,228,85,0.06)", border: `1px solid ${C.green}33`,
          borderRadius: 12, padding: "10px 14px", marginBottom: 18,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: C.green, marginBottom: 4 }}>
          DEMO CREDENTIALS
        </div>
        <div style={{ fontSize: 11, color: C.textDim, lineHeight: 1.7 }}>
          🏟️ <span style={{ color: C.text, fontWeight: 600 }}>Owner:</span> owner@bookmycourt.com / owner123<br />
          ⚽ <span style={{ color: C.text, fontWeight: 600 }}>Player:</span> player@bookmycourt.com / player123
        </div>
      </div>

      {/* ── Error banner slot (filled by Part 2 validation) ── */}
      {loginError && (
        <div
          style={{
            background: "rgba(232,64,64,0.08)", border: "1px solid rgba(232,64,64,0.3)",
            borderRadius: 14, padding: "10px 14px", marginBottom: 14,
            color: C.red, fontSize: 13, fontWeight: 600,
          }}
        >
          {loginError}
        </div>
      )}

      {/* ── Email input ── */}
      <div style={{ fontSize: 13, color: C.textDim, marginBottom: 6 }}>Email Address</div>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="name@example.com"
        style={{
          width: "100%", padding: "14px 18px", borderRadius: 50,
          background: "#0f1f13", border: `1px solid ${C.border}`,
          color: C.text, fontSize: 14, marginBottom: 14,
          boxSizing: "border-box", outline: "none",
        }}
      />

      {/* ── Password input + forgot link ── */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: C.textDim }}>Password</span>
        <span
          style={{ fontSize: 13, color: C.green, cursor: "pointer" }}
          onClick={onForgot}
        >
          Forgot Password?
        </span>
      </div>
      <div style={{ position: "relative", marginBottom: 22 }}>
        <input
          type={show ? "text" : "password"}
          value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder="••••••••"
          style={{
            width: "100%", padding: "14px 46px 14px 18px", borderRadius: 50,
            background: "#0f1f13", border: `1px solid ${C.border}`,
            color: C.text, fontSize: 14, boxSizing: "border-box", outline: "none",
          }}
        />
        <button
          onClick={() => setShow(!show)}
          style={{
            position: "absolute", right: 16, top: "50%",
            transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer",
          }}
        >
          <Icon n="eye" color={C.textMuted} size={18} />
        </button>
      </div>

      {/* ── Sign In button ── */}
      <Btn onClick={handleLogin} style={{ marginBottom: 18 }}>Sign In</Btn>

      {/* ── Divider ── */}
      <div
        style={{
          textAlign: "center", color: C.textMuted, fontSize: 12,
          marginBottom: 14, position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute", top: "50%", left: 0, right: 0,
            height: 1, background: C.border,
          }}
        />
        <span style={{ background: C.bg, padding: "0 12px", position: "relative" }}>
          Or continue with
        </span>
      </div>

      {/* ── Social buttons (decorative) ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {["G  Google", "  Apple"].map(p => (
          <button
            key={p}
            style={{
              flex: 1, padding: "12px", borderRadius: 50,
              background: "#0f1f13", border: `1px solid ${C.border}`,
              color: C.text, fontWeight: 700, cursor: "pointer", fontSize: 13,
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* ── Sign Up link ── */}
      <p style={{ textAlign: "center", color: C.textDim, fontSize: 13, margin: 0 }}>
        Don't have an account?{" "}
        <span
          style={{ color: C.green, fontWeight: 700, cursor: "pointer" }}
          onClick={onSignUp}
        >
          Sign Up
        </span>
      </p>
    </div>
  </div>
);
