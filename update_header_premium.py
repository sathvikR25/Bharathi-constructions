import re

with open('src/components/Header.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Props
content = re.sub(
    r'export default function Header\(\{ theme = "dark", navOpen, setNavOpen \}\) \{',
    r'export default function Header({ theme = "dark", transparentTheme = "dark", navOpen, setNavOpen }) {',
    content
)

# 2. Update Theme Logic
old_logic = r'''  const isLight = theme === "light";
  const forceDarkMenu = navOpen;

  const logoStyle = \(isLight && !forceDarkMenu\)
    \? \{ filter: "none" \}
    : \{ filter: "brightness\(0\) invert\(1\)" \};

  const textColor = \(isLight && !forceDarkMenu\) \? "\#000" : "\#fff";
  const headerBg = navOpen \? "transparent" : \(isScrolled \? \(isLight \? "rgba\(253, 251, 247, 0\.9\)" : "rgba\(10, 10, 10, 0\.9\)"\) : "transparent"\);
  const headerBlur = \(isScrolled && !navOpen\) \? "blur\(10px\)" : "none";
  const border = navOpen \? "none" : 1px solid \$\{isLight \? 'rgba\(0,0,0,0\.05\)' : 'rgba\(255,255,255,0\.05\)'\};'''

new_logic = r'''  const activeTheme = navOpen ? "dark" : (!isScrolled ? transparentTheme : theme);
  const isLightActive = activeTheme === "light";
  
  const textColor = isLightActive ? "#123645" : "#ffffff";
  const logoStyle = isLightActive ? { filter: "none" } : { filter: "brightness(0) invert(1)" };
  const headerBg = navOpen ? "transparent" : (isScrolled ? (theme === "light" ? "rgba(253, 251, 247, 0.95)" : "rgba(10, 10, 10, 0.95)") : "transparent");
  const headerBlur = (isScrolled && !navOpen) ? "blur(12px)" : "none";
  const border = navOpen ? "none" : (isScrolled ? 1px solid  : "none");'''

content = content.replace(old_logic, new_logic)

# 3. Improve Logo height constraint
content = re.sub(
    r'<Link to="/" style=\{\{ display: "flex", alignItems: "center", height: "clamp\(60px, 9vw, 90px\)" \}\}.*?>\s*<img src="/logo\.png".*?/>\s*</Link>',
    r'''<Link to="/" style={{ display: "flex", alignItems: "center", height: "clamp(60px, 9vw, 90px)" }} onClick={() => setNavOpen(false)}>
          <img src="/logo.png" alt="Bharathi Constructions" style={{ height: "clamp(35px, 5vw, 60px)", width: "auto", objectFit: "contain", ...logoStyle, transition: "filter 0.3s" }} />
        </Link>''',
    content,
    flags=re.DOTALL
)

# 4. Improve Button styling
content = re.sub(
    r'padding: "0\.7rem clamp\(1rem, 2vw, 2rem\)",',
    r'padding: "0.8rem clamp(1.5rem, 3vw, 2.5rem)",',
    content
)
content = re.sub(
    r'letterSpacing: "0\.12em",',
    r'letterSpacing: "0.15em",\n              fontWeight: "600",',
    content
)

# 5. Improve Hamburger Menu (thinner lines)
content = re.sub(
    r'width: "26px", height: "2px",',
    r'width: "30px", height: "1px",',
    content
)

with open('src/components/Header.jsx', 'w', encoding='utf-8') as f:
    f.write(content)