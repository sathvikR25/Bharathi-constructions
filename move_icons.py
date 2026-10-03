import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the left panel phone section to include social icons
left_old = r'''<div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <Phone size={14} color="rgba(255,255,255,0.3)" />
              <a href="tel:+917997992051" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.05em", transition: "color 0.3s" }}
                onMouseEnter={e => e.target.style.color = "#c9a96e"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
              >
                +91 79979 92051
              </a>
            </div>'''

left_new = r'''<div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Phone size={14} color="rgba(255,255,255,0.3)" />
                <a href="tel:+917997992051" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.05em", transition: "color 0.3s" }}
                  onMouseEnter={e => e.target.style.color = "#c9a96e"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                >
                  +91 79979 92051
                </a>
              </div>
              
              <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
                <a href="https://www.instagram.com/bharathiconstructionshyd" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://www.youtube.com/@bharathiconstructionshyd" target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                </a>
              </div>
            </div>'''
            
content = content.replace(left_old, left_new)

# 2. Modify the right panel footer to ONLY show icons on mobile, and fix the crazy margin/padding
right_old = r'''            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", marginRight: "clamp(1rem, 25vw, 18rem)" }}>
              <a href="https://www.instagram.com/bharathiconstructionshyd" target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.youtube.com/@bharathiconstructionshyd" target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
              {/* Mobile phone link */}
              <a href="tel:+917997992051" style={{ color: "rgba(255,255,255,0.6)", transition: "color 0.3s", display: "flex", alignItems: "center" }}
                onMouseEnter={e => e.currentTarget.style.color = "#c9a96e"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >
                <Phone size={15} />
              </a>
            </div>'''

right_new = r'''            <div className="md:hidden" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
              <a href="https://www.instagram.com/bharathiconstructionshyd" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.youtube.com/@bharathiconstructionshyd" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.6)" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
              </a>
              <a href="tel:+917997992051" style={{ color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center" }}>
                <Phone size={15} />
              </a>
            </div>'''
            
content = content.replace(right_old, right_new)

# Revert the crazy paddingBottom 
content = content.replace('paddingBottom: "8rem",', 'paddingBottom: "3rem",')

with open('src/components/MenuOverlay.jsx', 'w', encoding='utf-8') as f:
    f.write(content)