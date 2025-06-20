import './HomePage.css';

export default function HomePage() {
  return (
    <div className="Homepage">
      <h1>🛡️</h1>
      <h2> <strong>Nick Fury was last seen deep within Doom’s occupied territory,
        leading a covert strike team who's mission was to divert Doom's troops.
        Communications went dark shortly after entry, but S.H.I.E.L.D.
        intercepted a final encrypted message from Fury moments before the signal was lost</strong>.</h2>

      <div className="Homepage holo-panel">
        <h1 className="holo-title">🛰️ S.H.I.E.L.D. MISSION BRIEFING — DOOM</h1>

        <p className="holo-text">
          🔴 <strong>Status:</strong> Code Red. Interdimensional breach confirmed above Latveria. Subject: <strong>Victor Von Doom</strong>. Threat Level: <span className="highlight">Omega-Class</span>.
        </p>

        <p className="holo-text">
          <strong>Anomalies detected:</strong> Dark matter surges and seismic distortions. Doom Sentinels deploying in global clusters. Time Nexus destabilizing.
        </p>

        <p className="holo-text">
          <strong>Countdown:</strong> 48 hours until total timeline collapse. The Time Nexus Protocol must be executed.
        </p>

        <hr className="holo-divider" />

        <p className="holo-text">
          <strong>Objective:</strong> Assemble a counter-strike team using your <span className="highlight">1,000 command points</span>. Each hero costs points based on rarity and power classification.
        </p>

        <p className="holo-text">
          <strong>Strategy Advisory:</strong> High-power heroes may drain points fast — but a well-balanced squad with tactical synergy is mission critical.
        </p>

        <p className="holo-text">
          <strong>Confirmed Combat Zones:</strong> New York City, Wakanda, Quantum Realm, and Titan. Certain heroes gain zone-specific buffs.
        </p>

        <p className="holo-text">
          <strong>Next Step:</strong> Deploy to the Team Assembly Deck. Monitor energy output. Counter Doom. Preserve reality.
        </p>

        <p><strong>Earth is In Your Hands</strong></p>
        <p className="holo-footer">TRANSMISSION ENDS // SIGNAL ENCRYPTED BY NICK FURY 🔒</p>
      </div>

    </div>

  );
};