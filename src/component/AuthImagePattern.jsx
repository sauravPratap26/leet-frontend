import { Code, Terminal, FileCode, Braces, Cpu, Binary, Database, FunctionSquare } from "lucide-react"
import { useEffect, useState } from "react"
import "../global.css"
const CodeBackground = ({ title, subtitle }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Code snippets to display in the background
  const codeSnippets = [
    {
      code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      language: "JavaScript",
      complexity: "O(n)"
    },
    {
      code: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
      language: "JavaScript",
      complexity: "O(n)"
    },
    {
      code: `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) return false;
    }
  }
  
  return stack.length === 0;
}`,
      language: "JavaScript",
      complexity: "O(n)"
    },
    {
      code: `def quick_sort(arr):
  if len(arr) <= 1:
    return arr
  pivot = arr[len(arr) // 2]
  left = [x for x in arr if x < pivot]
  middle = [x for x in arr if x == pivot]
  right = [x for x in arr if x > pivot]
  return quick_sort(left) + middle + quick_sort(right)`,
      language: "Python",
      complexity: "O(n log n)"
    },
    {
      code: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
    int result = sum(10, 20);
    System.out.println(result);
  }
  
  public static int sum(int a, int b) {
    return a + b;
  }
}`,
      language: "Java",
      complexity: "O(1)"
    }
  ]

  // Rotate through code snippets
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((prev) => (prev + 1) % codeSnippets.length)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [codeSnippets.length, isHovered])

  // Icons for floating animation
  const icons = [
    { icon: <Braces size={40} />, top: '10%', left: '15%', delay: 'delay-0' },
    { icon: <FileCode size={50} />, top: '30%', left: '80%', delay: 'delay-300' },
    { icon: <Terminal size={45} />, top: '70%', left: '20%', delay: 'delay-700' },
    { icon: <Code size={55} />, top: '60%', left: '75%', delay: 'delay-500' },
    { icon: <Cpu size={40} />, top: '20%', left: '40%', delay: 'delay-200' },
    { icon: <Binary size={35} />, top: '85%', left: '45%', delay: 'delay-400' },
    { icon: <Database size={50} />, top: '50%', left: '10%', delay: 'delay-600' },
    { icon: <FunctionSquare size={45} />, top: '25%', left: '70%', delay: 'delay-100' }
  ]

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-12 relative overflow-hidden">
      {/* Animated floating icons in background */}
      <div className="absolute inset-0 opacity-10">
        {icons.map((item, index) => (
          <div 
            key={index}
            className={`absolute top-[${item.top}] left-[${item.left}] animate-float ${item.delay}`}
            style={{ top: item.top, left: item.left }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5 bg-grid-slate-700/30"></div>

      <div className="z-10 max-w-2xl flex flex-col items-center">
        {/* Code editor mockup with more realistic styling */}
        <div 
          className="w-full bg-slate-800 rounded-xl shadow-2xl mb-8 overflow-hidden border border-slate-700/50 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Editor header */}
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-4 py-2 flex items-center border-b border-slate-700/50">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs font-mono flex-1 text-slate-300">
              {codeSnippets[activeIndex].language} • {codeSnippets[activeIndex].complexity}
            </div>
            <div className="text-xs font-mono opacity-70">algorithm.js</div>
          </div>

          {/* Code content with line numbers */}
          <div className="p-4 font-mono text-sm overflow-hidden relative h-72 bg-slate-900/50">
            <div className="flex">
              {/* Line numbers */}
              <div className="text-slate-500 pr-4 select-none">
                {codeSnippets[activeIndex].code.split('\n').map((_, i) => (
                  <div key={i} className="text-right pr-2">{i + 1}</div>
                ))}
              </div>
              
              {/* Actual code with syntax highlighting */}
              <pre className="whitespace-pre-wrap flex-1 transition-opacity duration-1000 overflow-x-auto">
                <code className="text-green-400">
                  {codeSnippets[activeIndex].code}
                </code>
              </pre>
            </div>

            {/* Blinking cursor */}
            <div className="absolute bottom-6 right-6 w-2 h-6 bg-primary animate-blink rounded-sm"></div>
            
            {/* Subtle reflection effect */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
          </div>
        </div>

        {/* Logo with animation */}
        <div className="flex items-center justify-center mb-6 group">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:rotate-6 group-hover:scale-110">
            <Code className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        {/* Text content with better typography */}
        <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400">
          {title}
        </h2>
        <p className="text-slate-300 text-center text-lg max-w-lg leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-slate-700/30"
            style={{
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default CodeBackground