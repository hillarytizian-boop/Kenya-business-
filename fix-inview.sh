#!/bin/bash

# Find the useInView function and replace it
sed -i '/function useInView/,/^}/c\
function useInView(threshold = 0.15) {\
  const ref = useRef<HTMLElement | null>(null);\
  const [inView, setInView] = useState(false);\
  useEffect(() => {\
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });\
    if (ref.current) obs.observe(ref.current);\
    return () => obs.disconnect();\
  }, [threshold]);\
  return { ref, inView };\
}' src/app/page.tsx

# Then update all usages from [ref, inView] to { ref, inView }
sed -i 's/const \[ref, inView\] = useInView/const { ref, inView } = useInView/g' src/app/page.tsx
