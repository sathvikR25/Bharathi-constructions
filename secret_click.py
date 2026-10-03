import re

with open('src/components/MenuOverlay.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add useNavigate to the import
content = content.replace('import { Link, useLocation } from "react-router-dom";', 'import { Link, useLocation, useNavigate } from "react-router-dom";')

# 2. Add hook and click handler logic
hook_insertion = r'''const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const secretClickCount = useRef(0);
  const secretClickTimeout = useRef(null);

  const handleSecretClick = () => {
    secretClickCount.current += 1;
    if (secretClickCount.current >= 3) {
      secretClickCount.current = 0;
      setNavOpen(false);
      navigate('/adminnn');
    }
    clearTimeout(secretClickTimeout.current);
    secretClickTimeout.current = setTimeout(() => {
      secretClickCount.current = 0;
    }, 1000);
  };'''

content = content.replace('const [isMobile, setIsMobile] = useState(false);', hook_insertion)

# 3. Replace the old Link in the footer with a span that calls handleSecretClick
old_link = r'''<Link to="/admin" onClick={() => setNavOpen(false)} style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", textDecoration: "none", cursor: "default" }} title="Admin">
              &copy; 2026 Bharathi Constructions
            </Link>'''

new_span = r'''<span onClick={handleSecretClick} style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", cursor: "default", userSelect: "none" }}>
              &copy; 2026 Bharathi Constructions
            </span>'''

# Wait, the Link might be slightly different. Let's do a regex replace for safety.
span_pattern = re.compile(r'<Link to="/admin" onClick=\{\(\) => setNavOpen\(false\)\}.*?>\s*&copy; 2026 Bharathi Constructions\s*</Link>', re.DOTALL)
content = span_pattern.sub(new_span, content)

with open('src/components/MenuOverlay.jsx', 'w', encoding='utf-8') as f:
    f.write(content)