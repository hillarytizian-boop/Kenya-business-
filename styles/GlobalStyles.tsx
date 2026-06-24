export function GlobalStyles() {
  return (
    <style>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #FFFFFF;
        color: #0D1117;
      }
      
      .jakarta {
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      
      .fade-up {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.55s ease, transform 0.55s ease;
      }
      
      .fade-up.visible {
        opacity: 1;
        transform: translateY(0);
      }
      
      .btn-primary {
        background: #0B6E4F;
        color: white;
        border: none;
        cursor: pointer;
        font-weight: 600;
        border-radius: 10px;
        padding: 10px 20px;
        transition: all 0.18s;
      }
      
      .btn-primary:hover {
        background: #1A8A63;
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(11,110,79,0.3);
      }
    `}</style>
  );
}
