import { useState } from "react";

const Login = ({ onLogin }) => {

  // ── Screen router ──────────────────────────────────────────
  const [screen, setScreen] = useState("login"); // "login" | "signup" | "forgot"

  // ── Login state ────────────────────────────────────────────
  const [email,      setEmail]      = useState("");
  const [pass,       setPass]       = useState("");
  const [show,       setShow]       = useState(false);
  const [loginError, setLoginError] = useState("");

  // ── Forgot password state ──────────────────────────────────
  const [fpEmail, setFpEmail] = useState("");
  const [fpSent,  setFpSent]  = useState(false);
  const [fpError, setFpError] = useState("");

  // ── Sign Up state ──────────────────────────────────────────
  const [suName,      setSuName]      = useState("");
  const [suEmail,     setSuEmail]     = useState("");
  const [suPass,      setSuPass]      = useState("");
  const [suConfirm,   setSuConfirm]   = useState("");
  const [showSu,      setShowSu]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [suError,     setSuError]     = useState("");
  const [suSuccess,   setSuSuccess]   = useState(false);

  // ── DEMO ACCOUNTS ──────────────────────────────────────────
  // Two roles: "owner" routes to Owner Dashboard, "player" routes to Player app
  const DEMO_ACCOUNTS = [
    { email: "owner@bookmycourt.com",  password: "owner123",  role: "owner",  name: "Alex Johnson" },
    { email: "player@bookmycourt.com", password: "player123", role: "player", name: "Ahmed Ali"    },
  ];

  // ── HANDLE LOGIN ───────────────────────────────────────────
  // 1. Clear previous error
  // 2. Guard: empty email / empty password
  // 3. Match against DEMO_ACCOUNTS
  // 4. On match: call onLogin with role → App routes accordingly
  // 5. On no match: show error (Person A's error banner renders it)
  const handleLogin = () => {
    setLoginError("");
    if (!email.trim()) { setLoginError("Please enter your email.");    return; }
    if (!pass)         { setLoginError("Please enter your password."); return; }

    const match = DEMO_ACCOUNTS.find(
      a => a.email === email.trim().toLowerCase() && a.password === pass
    );

    if (match) {
      // Pass role + identity to App shell — App decides which UI to show
      onLogin({ role: match.role, name: match.name, email: match.email });
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  // ── HANDLE FORGOT PASSWORD ─────────────────────────────────
  // Validation lives in Person A Part 2 (ForgotScreen component).
  // This function only fires after Person A's guards pass.
  const handleForgotPassword = () => {
    setFpError("");
    setFpSent(true);
  };

  // ── HANDLE SIGN UP ─────────────────────────────────────────
  // Validation guards live in Person A Part 2 (SignUpScreen component).
  // This function only fires after all guards pass.
  // Always creates a "player" account (owners are added by admins).
  const handleSignUp = () => {
    setSuError("");
    setSuSuccess(true);
    setTimeout(() => {
      setSuSuccess(false);
      onLogin({ role: "player", name: suName.trim(), email: suEmail.trim() });
    }, 1200);
  };

  // ── SCREEN ROUTER ──────────────────────────────────────────
  // Delegates all JSX rendering to Person A's screen components.

  if (screen === "forgot") {
    return (
      <ForgotScreen
        fpEmail={fpEmail}   setFpEmail={setFpEmail}
        fpSent={fpSent}     setFpSent={setFpSent}
        fpError={fpError}   setFpError={setFpError}
        handleForgotPassword={handleForgotPassword}
        onBack={() => setScreen("login")}
      />
    );
  }

  if (screen === "signup") {
    return (
      <SignUpScreen
        suName={suName}           setSuName={setSuName}
        suEmail={suEmail}         setSuEmail={setSuEmail}
        suPass={suPass}           setSuPass={setSuPass}
        suConfirm={suConfirm}     setSuConfirm={setSuConfirm}
        showSu={showSu}           setShowSu={setShowSu}
        showConfirm={showConfirm} setShowConfirm={setShowConfirm}
        suError={suError}         setSuError={setSuError}
        suSuccess={suSuccess}
        handleSignUp={handleSignUp}
        onBack={() => setScreen("login")}
      />
    );
  }

  // Default: Login screen
  return (
    <LoginScreenUI
      email={email}       setEmail={v => { setEmail(v);      setLoginError(""); }}
      pass={pass}         setPass={v  => { setPass(v);       setLoginError(""); }}
      show={show}         setShow={setShow}
      loginError={loginError}
      handleLogin={handleLogin}
      onForgot={() => setScreen("forgot")}
      onSignUp={() => setScreen("signup")}
    />
  );
};

export default Login;
