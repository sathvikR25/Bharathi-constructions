import re

with open('src/components/Header.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace scroll state tracking
old_scroll_state = r'''  const \[isScrolled, setIsScrolled\] = React\.useState\(false\);'''
new_scroll_state = r'''  const [scrollState, setScrollState] = React.useState(0); // 0: top, 1: frosted, 2: solid'''
content = re.sub(old_scroll_state, new_scroll_state, content)

# Update scroll handler
old_scroll_handler = r'''      setIsScrolled\(currentScrollY > 50\);'''
new_scroll_handler = r'''      const wh = window.innerHeight;
      if (currentScrollY > wh * 0.85) {
        setScrollState(2);
      } else if (currentScrollY > 50) {
        setScrollState(1);
      } else {
        setScrollState(0);
      }'''
content = re.sub(old_scroll_handler, new_scroll_handler, content)

# Update theme logic
old_theme_logic = r'''  const activeTheme = navOpen \? "dark" : \(!isScrolled \? transparentTheme : theme\);
  const isLightActive = activeTheme === "light";
  
  const textColor = isLightActive \? "\#123645" : "\#ffffff";
  const logoStyle = isLightActive \? \{ filter: "none" \} : \{ filter: "brightness\(0\) invert\(1\)" \};
  const headerBg = navOpen \? "transparent" : \(isScrolled \? \(theme === "light" \? "rgba\(253, 251, 247, 0\.95\)" : "rgba\(10, 10, 10, 0\.95\)"\) : "transparent"\);
  const headerBlur = \(isScrolled && !navOpen\) \? "blur\(12px\)" : "none";
  const border = navOpen \? "none" : \(isScrolled \? 1px solid \$\{theme === "light" \? "rgba\(18,54,69,0\.05\)" : "rgba\(255,255,255,0\.05\)"\} : "none"\);'''

new_theme_logic = r'''  const activeTheme = navOpen ? "dark" : (scrollState === 0 ? transparentTheme : theme);
  const isLightActive = activeTheme === "light";
  
  const textColor = isLightActive ? "#123645" : "#ffffff";
  const logoStyle = isLightActive ? { filter: "none" } : { filter: "brightness(0) invert(1)" };
  
  let headerBg = "transparent";
  if (!navOpen) {
    if (scrollState === 1) {
      headerBg = theme === "light" ? "rgba(253, 251, 247, 0.25)" : "rgba(10, 10, 10, 0.25)";
    } else if (scrollState === 2) {
      headerBg = theme === "light" ? "rgba(253, 251, 247, 0.98)" : "rgba(10, 10, 10, 0.98)";
    }
  }
  const headerBlur = (scrollState > 0 && !navOpen) ? "blur(16px)" : "none";
  const border = navOpen ? "none" : (scrollState > 0 ? 1px solid  : "none");'''

content = content.replace(old_theme_logic, new_theme_logic)

with open('src/components/Header.jsx', 'w', encoding='utf-8') as f:
    f.write(content)