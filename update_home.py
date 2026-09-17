import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace opening div for Horizon
content = re.sub(
    r'<div className="horizontal-card-inner w-\[85vw\] md:w-\[120vw\] flex-shrink-0 flex flex-col md:flex-row gap-8 md:gap-\[5vw\] items-center">',
    r'<Link to="/horizon" className="horizontal-card-inner group w-[85vw] md:w-[120vw] flex-shrink-0 flex flex-col md:flex-row gap-8 md:gap-[5vw] items-center cursor-pointer transition-transform duration-500 hover:scale-[1.02]" style={{ textDecoration: "none" }}>',
    content
)

# Replace opening div for Lake Woods
content = re.sub(
    r'<div className="horizontal-card-inner w-\[85vw\] md:w-\[120vw\] flex-shrink-0 flex flex-col md:flex-row-reverse gap-8 md:gap-\[5vw\] items-center">',
    r'<Link to="/lake-woods" className="horizontal-card-inner group w-[85vw] md:w-[120vw] flex-shrink-0 flex flex-col md:flex-row-reverse gap-8 md:gap-[5vw] items-center cursor-pointer transition-transform duration-500 hover:scale-[1.02]" style={{ textDecoration: "none" }}>',
    content
)

# Replace inner Link for Horizon with span
content = re.sub(
    r'<Link to="/horizon" className="hover-target" style={{.*?}}>View Horizon <ArrowRight size=\{24\}/></Link>',
    r'<span className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#fff", background: "#123645", textDecoration: "none", fontSize: "clamp(0.9rem, 1.2vw, 1.5rem)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", borderRadius: "100px", transition: "background-color 0.3s ease", boxShadow: "0 10px 30px rgba(18,54,69,0.2)" }}>View Horizon <ArrowRight size={24}/></span>',
    content
)

# Replace inner Link for Lake Woods with span
content = re.sub(
    r'<Link to="/lake-woods" className="hover-target" style={{.*?}}>View Lake Woods <ArrowRight size=\{24\}/></Link>',
    r'<span className="hover-target" style={{ display: "inline-flex", alignItems: "center", gap: "1rem", color: "#fff", background: "#123645", textDecoration: "none", fontSize: "clamp(0.9rem, 1.2vw, 1.5rem)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "1rem 2.5rem", borderRadius: "100px", transition: "background-color 0.3s ease", boxShadow: "0 10px 30px rgba(18,54,69,0.2)" }}>View Lake Woods <ArrowRight size={24}/></span>',
    content
)

# Fix the closing tags. The structure was <div> ... </div> (for the button container) ... </div> (for the main horizontal card).
# We need to change the main horizontal card closing </div> to </Link>.
# We will do this by looking for the specific pattern around the closing of each block.
content = re.sub(
    r'(View Horizon <ArrowRight size=\{24\}/></span>\s*</div>\s*)</div>',
    r'\1</Link>',
    content
)

content = re.sub(
    r'(View Lake Woods <ArrowRight size=\{24\}/></span>\s*</div>\s*)</div>',
    r'\1</Link>',
    content
)

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)