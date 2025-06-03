export const sampledpData = {
  title: "Climbing Stairs",
  category: "dp", // Dynamic Programming
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: [
    { value: "Dynamic Programming" },
    { value: "Math" },
    { value: "Memoization" },
  ],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testcases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
      
      /* Alternative approach with O(1) space
      int a = 1; // ways to climb 1 step
      int b = 2; // ways to climb 2 steps
      
      for (int i = 3; i <= n; i++) {
          int temp = a + b;
          a = b;
          b = temp;
      }
      
      return n == 1 ? a : b;
      */
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
};

export const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: [{ value: "String" }, { value: "Two Pointers" }],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testcases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()

    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)

    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Convert to lowercase and keep only alphanumeric characters
        filtered_chars = [c.lower() for c in s if c.isalnum()]
        
        # Check if it's a palindrome
        return filtered_chars == filtered_chars[::-1]

# Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false
`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

export const noData = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: [],
  constraints: "",
  testcases: [{ input: "", output: "" }],
  examples: {
    JAVASCRIPT: { input: "", output: "", explanation: "" },
    PYTHON: { input: "", output: "", explanation: "" },
    JAVA: { input: "", output: "", explanation: "" },
  },
  codeSnippets: {
    JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
    PYTHON: "def solution():\n    # Write your code here\n    pass",
    JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
  },
  referenceSolutions: {
    JAVASCRIPT: "// Add your reference solution here",
    PYTHON: "# Add your reference solution here",
    JAVA: "// Add your reference solution here",
  },
};

export const pushData = [
  {
    title: "Two Sum",
    category: "arrays",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    difficulty: "EASY",
    tags: [
      { value: "Array" },
      { value: "Hash Table" },
      { value: "Google" },
      { value: "Amazon" },
    ],
    constraints:
      "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9, -10^9 <= target <= 10^9",
    hints:
      "Use a hash map to store the complement of each number and its index.",
    editorial:
      "The brute force approach would be O(n²). The optimal solution uses a hash map to store complements, achieving O(n) time complexity.",
    testcases: [
      { input: "[2,7,11,15]\n9", output: "[0,1]" },
      { input: "[3,2,4]\n6", output: "[1,2]" },
      { input: "[3,3]\n6", output: "[0,1]" },
      { input: "[1,5,3,7]\n4", output: "[0,2]" },
      { input: "[-1,2,1,4]\n1", output: "[0,1]" },
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] = 2 + 7 = 9, we return [0, 1].",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let input = [];
rl.on('line', (line) => {
    input.push(line.trim());
    if (input.length === 2) {
        const nums = JSON.parse(input[0]);
        const target = parseInt(input[1]);
        const result = twoSum(nums, target);
        console.log(JSON.stringify(result));
        rl.close();
    }
});`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    
    return [];
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let input = [];
rl.on('line', (line) => {
    input.push(line.trim());
    if (input.length === 2) {
        const nums = JSON.parse(input[0]);
        const target = parseInt(input[1]);
        const result = twoSum(nums, target);
        console.log(JSON.stringify(result));
        rl.close();
    }
});`,
    },
  },
  {
    title: "Valid Parentheses",
    category: "stack",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets, and open brackets must be closed in the correct order.",
    difficulty: "EASY",
    tags: [
      { value: "String" },
      { value: "Stack" },
      { value: "Facebook" },
      { value: "Microsoft" },
    ],
    constraints:
      "1 <= s.length <= 10^4, s consists of parentheses only '()[]{}'",
    hints:
      "Use a stack to keep track of opening brackets. When you encounter a closing bracket, check if it matches the most recent opening bracket.",
    editorial:
      "This is a classic stack problem. Push opening brackets onto the stack and pop when you encounter matching closing brackets.",
    testcases: [
      { input: "()", output: "true" },
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" },
      { input: "([)]", output: "false" },
      { input: "{[]}", output: "true" },
    ],
    examples: {
      JAVASCRIPT: {
        input: 's = "()"',
        output: "true",
        explanation:
          "The string contains valid parentheses that are properly closed.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim().replace(/"/g, '');
    const result = isValid(s);
    console.log(result);
    rl.close();
});`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim().replace(/"/g, '');
    const result = isValid(s);
    console.log(result);
    rl.close();
});`,
    },
  },
  {
    title: "Longest Substring Without Repeating Characters",
    category: "sliding_window",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "MEDIUM",
    tags: [
      { value: "Hash Table" },
      { value: "String" },
      { value: "Sliding Window" },
      { value: "Amazon" },
      { value: "Google" },
    ],
    constraints:
      "0 <= s.length <= 5 * 10^4, s consists of English letters, digits, symbols and spaces",
    hints:
      "Use sliding window technique with two pointers. Keep track of characters using a hash set or map.",
    editorial:
      "Use the sliding window approach with a hash set to track characters in the current window. When a duplicate is found, shrink the window from the left.",
    testcases: [
      { input: "abcabcbb", output: "3" },
      { input: "bbbbb", output: "1" },
      { input: "pwwkew", output: "3" },
      { input: "", output: "0" },
      { input: "au", output: "2" },
    ],
    examples: {
      JAVASCRIPT: {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      PYTHON: {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      JAVA: {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim().replace(/"/g, '');
    const result = lengthOfLongestSubstring(s);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def lengthOfLongestSubstring(s: str) -> int:
    # Write your code here
    pass

# Parse input and execute
import sys
for line in sys.stdin:
    s = line.strip().replace('"', '')
    print(lengthOfLongestSubstring(s))
    break`,
      JAVA: `import java.util.*;

public class Main {
    public static int lengthOfLongestSubstring(String s) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s = scanner.nextLine().replace("\\"", "");
        System.out.println(lengthOfLongestSubstring(s));
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    if (s.length === 0) return 0;
    
    let maxLength = 0;
    let left = 0;
    const charSet = new Set();
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim().replace(/"/g, '');
    const result = lengthOfLongestSubstring(s);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def lengthOfLongestSubstring(s: str) -> int:
    if not s:
        return 0

    char_set = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)

    return max_len

# Parse input and execute
import sys
for line in sys.stdin:
    s = line.strip().replace('"', '')
    print(lengthOfLongestSubstring(s))
    break`,
      JAVA: `import java.util.*;

public class Main {
    public static int lengthOfLongestSubstring(String s) {
        if (s.length() == 0) return 0;

        Set<Character> set = new HashSet<>();
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left));
                left++;
            }
            set.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s = scanner.nextLine().replace("\\"", "");
        System.out.println(lengthOfLongestSubstring(s));
    }
}`,
    },
  },
  {
    title: "Container With Most Water",
    category: "two_pointers",
    description:
      "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that can hold the most water.",
    difficulty: "MEDIUM",
    tags: [
      { value: "Array" },
      { value: "Two Pointers" },
      { value: "Greedy" },
      { value: "Facebook" },
      { value: "Apple" },
    ],
    constraints: "n >= 2, 0 <= height[i] <= 10^4",
    hints:
      "Use two pointers approach. Start with the widest container and move the pointer with smaller height inward.",
    editorial:
      "The two-pointer technique works because moving the pointer with the smaller height gives us the best chance of finding a larger area.",
    testcases: [
      { input: "[1,8,6,2,5,4,8,3,7]", output: "49" },
      { input: "[1,1]", output: "1" },
      { input: "[4,3,2,1,4]", output: "16" },
      { input: "[1,2,1]", output: "2" },
      { input: "[2,1]", output: "1" },
    ],
    examples: {
      JAVASCRIPT: {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. The max area of water the container can contain is 49.",
      },
      JAVA: {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation:
          "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. The max area of water the container can contain is 49.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const height = JSON.parse(line.trim());
    const result = maxArea(height);
    console.log(result);
    rl.close();
});`,

      JAVA: `import java.util.*;

public class Main {
    public static int maxArea(int[] height) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine().trim();
        input = input.substring(1, input.length() - 1); // remove []
        String[] parts = input.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            height[i] = Integer.parseInt(parts[i].trim());
        }
        System.out.println(maxArea(height));
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {number[]} height
 * @return {number}
 */
function maxArea(height) {
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const currentHeight = Math.min(height[left], height[right]);
        const currentArea = width * currentHeight;
        maxWater = Math.max(maxWater, currentArea);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const height = JSON.parse(line.trim());
    const result = maxArea(height);
    console.log(result);
    rl.close();
});`,

      JAVA: `import java.util.*;

public class Main {
    public static int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int maxWater = 0;

        while (left < right) {
            int width = right - left;
            int currentHeight = Math.min(height[left], height[right]);
            int currentArea = width * currentHeight;
            maxWater = Math.max(maxWater, currentArea);

            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return maxWater;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine().trim();
        input = input.substring(1, input.length() - 1); // remove []
        String[] parts = input.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            height[i] = Integer.parseInt(parts[i].trim());
        }
        System.out.println(maxArea(height));
    }
}`,
    },
  },
  {
    title: "Group Anagrams",
    category: "hashing",
    description: "Given an array of strings, group the anagrams together.",
    difficulty: "MEDIUM",
    tags: [
      { value: "Hash Table" },
      { value: "String" },
      { value: "Sorting" },
      { value: "Amazon" },
      { value: "Facebook" },
    ],
    constraints:
      "1 <= strs.length <= 10^4, 0 <= strs[i].length <= 100, strs[i] consists of lowercase English letters.",
    hints: "Use a hash map to group strings by their sorted character key.",
    editorial:
      "Group strings using a hash map where the key is the sorted string. This groups all anagrams together efficiently.",
    testcases: [
      {
        input: JSON.stringify({
          input: ["eat", "tea", "tan", "ate", "nat", "bat"],
          expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
        }),
        output: "true",
      },
      {
        input: JSON.stringify({
          input: [""],
          expected: [[""]],
        }),
        output: "true",
      },
      {
        input: JSON.stringify({
          input: ["a"],
          expected: [["a"]],
        }),
        output: "true",
      },
    ],
    examples: {
      JAVASCRIPT: {
        input: `{
  "input": ["eat", "tea", "tan", "ate", "nat", "bat"],
  "expected": [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
}`,
        output: "true",
        explanation:
          "Groups of anagrams are returned regardless of their order.",
      },
      PYTHON: {
        input: `{
  "input": ["eat", "tea", "tan", "ate", "nat", "bat"],
  "expected": [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
}`,
        output: "true",
        explanation:
          "Each group contains words that are anagrams of each other.",
      },
      JAVA: {
        input: `{
  "input": ["eat", "tea", "tan", "ate", "nat", "bat"],
  "expected": [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
}`,
        output: "true",
        explanation:
          "The expected output is matched by value regardless of order.",
      },
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    const map = new Map();
    for (const str of strs) {
        const key = str.split('').sort().join('');
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(str);
    }
    return Array.from(map.values());
}

function deepEqualIgnoreOrder(actual, expected) {
    const normalize = arr =>
        arr.map(group => group.slice().sort()).sort((a, b) => a[0].localeCompare(b[0]));
    return JSON.stringify(normalize(actual)) === JSON.stringify(normalize(expected));
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let input = '';
rl.on('line', (line) => {
    input += line.trim();
    const { input: strs, expected } = JSON.parse(input);
    const result = groupAnagrams(strs);
    console.log(deepEqualIgnoreOrder(result, expected));
    rl.close();
});`,
      PYTHON: `from typing import List
import sys, json

def groupAnagrams(strs: List[str]) -> List[List[str]]:
    anagrams = {}
    for word in strs:
        key = ''.join(sorted(word))
        anagrams.setdefault(key, []).append(word)
    return list(anagrams.values())

def deep_equal_ignore_order(actual, expected):
    normalize = lambda arr: sorted([sorted(group) for group in arr])
    return normalize(actual) == normalize(expected)

# Parse input and execute
for line in sys.stdin:
    data = json.loads(line.strip())
    result = groupAnagrams(data["input"])
    print(str(deep_equal_ignore_order(result, data["expected"])).lower())
    break`,
      JAVA: `import java.util.*;

public class Main {
    public static List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }

    public static boolean deepEqualIgnoreOrder(List<List<String>> actual, List<List<String>> expected) {
        Comparator<List<String>> cmp = Comparator.comparing(list -> list.get(0));
        actual.forEach(Collections::sort);
        expected.forEach(Collections::sort);
        actual.sort(cmp);
        expected.sort(cmp);
        return actual.equals(expected);
    }

    // Helper: parse array of strings like ["eat","tea","tan"] to String[]
    static String[] parseStringArray(String s) {
        s = s.trim();
        if (s.startsWith("[") && s.endsWith("]")) {
            s = s.substring(1, s.length() - 1).trim();
            if (s.isEmpty()) return new String[0];
            // Split by ",", remove quotes
            String[] parts = s.split(",");
            for (int i = 0; i < parts.length; i++) {
                parts[i] = parts[i].trim();
                if (parts[i].startsWith("\\"") && parts[i].endsWith("\\"")) {
                    parts[i] = parts[i].substring(1, parts[i].length() - 1);
                }
            }
            return parts;
        }
        return new String[0];
    }

    // Helper: parse array of array of strings like [["bat"],["nat","tan"],["ate","eat","tea"]] to List<List<String>>
    static List<List<String>> parseListOfStringLists(String s) {
        List<List<String>> result = new ArrayList<>();
        s = s.trim();
        if (s.startsWith("[") && s.endsWith("]")) {
            s = s.substring(1, s.length() - 1).trim();
            // Now split groups by "],"
            // but keep the trailing ] on last group
            List<String> groups = new ArrayList<>();
            int bracketCount = 0;
            int start = 0;
            for (int i = 0; i < s.length(); i++) {
                char c = s.charAt(i);
                if (c == '[') bracketCount++;
                else if (c == ']') bracketCount--;
                if (bracketCount == 0 && c == ']') {
                    groups.add(s.substring(start, i + 1));
                    start = i + 1;
                    while (start < s.length() && (s.charAt(start) == ',' || Character.isWhitespace(s.charAt(start)))) {
                        start++;
                        i = start - 1;
                    }
                }
            }
            for (String group : groups) {
                String[] arr = parseStringArray(group);
                result.add(Arrays.asList(arr));
            }
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String json = "";
        while (scanner.hasNextLine()) {
            json += scanner.nextLine().trim();
        }

        // Parse input JSON manually:
        // Extract input array
        int inputStart = json.indexOf("\\"input\\":");
        int inputEnd = json.indexOf("]", inputStart);
        String inputStr = json.substring(inputStart + 8, inputEnd + 1);

        // Extract expected array
        int expectedStart = json.indexOf("\\"expected\\":");
        int expectedEnd = json.lastIndexOf("]");
        String expectedStr = json.substring(expectedStart + 11, expectedEnd + 1);

        String[] input = parseStringArray(inputStr);
        List<List<String>> expected = parseListOfStringLists(expectedStr);

        List<List<String>> actual = groupAnagrams(input);
        System.out.println(deepEqualIgnoreOrder(actual, expected));
    }
}
`,
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
function groupAnagrams(strs) {
    // TODO: implement this function
}

// Utility to compare ignoring order
function deepEqualIgnoreOrder(actual, expected) {
    const normalize = arr =>
        arr.map(group => group.slice().sort()).sort((a, b) => a[0].localeCompare(b[0]));
    return JSON.stringify(normalize(actual)) === JSON.stringify(normalize(expected));
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let input = '';
rl.on('line', (line) => {
    input += line.trim();
    const { input: strs, expected } = JSON.parse(input);
    const result = groupAnagrams(strs);
    console.log(deepEqualIgnoreOrder(result, expected));
    rl.close();
});`,

      PYTHON: `from typing import List
import sys, json

def groupAnagrams(strs: List[str]) -> List[List[str]]:
    # TODO: implement this function
    return []

def deep_equal_ignore_order(actual, expected):
    normalize = lambda arr: sorted([sorted(group) for group in arr])
    return normalize(actual) == normalize(expected)

# Parse input and execute
for line in sys.stdin:
    data = json.loads(line.strip())
    result = groupAnagrams(data["input"])
    print(str(deep_equal_ignore_order(result, data["expected"])).lower())
    break`,

      JAVA: `import java.util.*;

public class Main {
    public static List<List<String>> groupAnagrams(String[] strs) {
        // TODO: implement this function
        return new ArrayList<>();
    }

    public static boolean deepEqualIgnoreOrder(List<List<String>> actual, List<List<String>> expected) {
        Comparator<List<String>> cmp = Comparator.comparing(list -> list.get(0));
        actual.forEach(Collections::sort);
        expected.forEach(Collections::sort);
        actual.sort(cmp);
        expected.sort(cmp);
        return actual.equals(expected);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        StringBuilder jsonBuilder = new StringBuilder();
        while (scanner.hasNextLine()) {
            jsonBuilder.append(scanner.nextLine().trim());
        }
        String json = jsonBuilder.toString();

        // Replace this JSON parsing with a real one in practice
        json = json.replaceAll("[\\[\\]\\"]", "");
        String[] parts = json.split("input:")[1].split("expected:");
        String[] input = parts[0].split(",");
        String[] expectedGroups = parts[1].split("],");

        List<List<String>> expected = new ArrayList<>();
        for (String group : expectedGroups) {
            List<String> g = new ArrayList<>(Arrays.asList(group.replaceAll("[^a-zA-Z,]", "").split(",")));
            g.removeIf(String::isEmpty);
            expected.add(g);
        }

        List<List<String>> actual = groupAnagrams(input);
        System.out.println(deepEqualIgnoreOrder(actual, expected));
    }
}`,
    },
  },
  {
    title: "Product of Array Except Self",
    category: "arrays",
    description:
      "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.",
    difficulty: "MEDIUM",
    tags: [
      { value: "Array" },
      { value: "Prefix Sum" },
      { value: "Facebook" },
      { value: "Microsoft" },
      { value: "Amazon" },
    ],
    constraints: "2 <= nums.length <= 10^5, -30 <= nums[i] <= 30",
    hints:
      "Calculate left products and right products separately, then multiply them. You can optimize space by using the result array for intermediate calculations.",
    editorial:
      "Use two passes: first calculate products of elements to the left, then multiply with products of elements to the right.",
    testcases: [
      {
        input: JSON.stringify({
          input: [1, 2, 3, 4],
          expected: [24, 12, 8, 6],
        }),
        output: "true",
      },
      {
        input: JSON.stringify({
          input: [-1, 1, 0, -3, 3],
          expected: [0, 0, 9, 0, 0],
        }),
        output: "true",
      },
      {
        input: JSON.stringify({
          input: [2, 3],
          expected: [3, 2],
        }),
        output: "true",
      },
      {
        input: JSON.stringify({
          input: [1, 0],
          expected: [0, 1],
        }),
        output: "true",
      },
      {
        input: JSON.stringify({
          input: [5, 2, 3, 4],
          expected: [24, 60, 40, 30],
        }),
        output: "true",
      },
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation:
          "For index 0: product = 2*3*4 = 24. For index 1: product = 1*3*4 = 12, etc.",
      },
      JAVA: {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation:
          "For each index, multiply products of elements to the left and right without division.",
      },
      PYTHON: {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]",
        explanation:
          "Compute left products then multiply by right products in two passes.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
    // TODO: Implement the product except self logic
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const { input, expected } = JSON.parse(line.trim());
    const result = productExceptSelf(input);
    console.log(JSON.stringify(JSON.stringify(result) === JSON.stringify(expected)));
    rl.close();
});`,
      JAVA: `import java.util.*;

public class Main {
    // TODO: Implement productExceptSelf method
    public static int[] productExceptSelf(int[] nums) {
        return new int[nums.length];
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String jsonInput = scanner.nextLine().trim();
        scanner.close();

         jsonInput = jsonInput.replaceAll(\"[{}\\\\\\\"]\", \"\").replaceAll(\"input:|expected:\", \"\");\n        String[] parts = jsonInput.split(\"\\\\],\\\\[\");\n\n        String[] inputStr = parts[0].replaceAll(\"[\\\\[\\\\]]\", \"\").split(\",\");\n        String[] expectedStr = parts[1].replaceAll(\"[\\\\[\\\\]]\", \"\").split(\",\");\n\n   

        int[] input = new int[inputStr.length];
        int[] expected = new int[expectedStr.length];
        for (int i = 0; i < inputStr.length; i++) input[i] = Integer.parseInt(inputStr[i].trim());
        for (int i = 0; i < expectedStr.length; i++) expected[i] = Integer.parseInt(expectedStr[i].trim());

        int[] output = productExceptSelf(input);

        boolean isEqual = Arrays.equals(output, expected);
        System.out.println(isEqual ? "true" : "false");
    }
}`,
      PYTHON: `from typing import List
import sys, json

def productExceptSelf(nums: List[int]) -> List[int]:
    # TODO: Implement the product except self logic
    return [0] * len(nums)

for line in sys.stdin:
    data = json.loads(line.strip())
    nums = data["input"]
    expected = data["expected"]
    result = productExceptSelf(nums)
    print(str(result == expected).lower())
    break`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n);
    
    // First pass: calculate left products
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Second pass: multiply with right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    
    return result;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const { input, expected } = JSON.parse(line.trim());
    const result = productExceptSelf(input);
    console.log(JSON.stringify(JSON.stringify(result) === JSON.stringify(expected)));
    rl.close();
});`,
      JAVA: `import java.util.*;\n\npublic class Main {\n    public static int[] productExceptSelf(int[] nums) {\n        int n = nums.length;\n        int[] result = new int[n];\n        \n        result[0] = 1;\n        for (int i = 1; i < n; i++) {\n            result[i] = result[i-1] * nums[i-1];\n        }\n        \n        int rightProduct = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            result[i] *= rightProduct;\n            rightProduct *= nums[i];\n        }\n        \n        return result;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        String jsonInput = scanner.nextLine().trim();\n        scanner.close();\n\n        jsonInput = jsonInput.replaceAll(\"[{}\\\\\\\"]\", \"\").replaceAll(\"input:|expected:\", \"\");\n        String[] parts = jsonInput.split(\"\\\\],\\\\[\");\n\n        String[] inputStr = parts[0].replaceAll(\"[\\\\[\\\\]]\", \"\").split(\",\");\n        String[] expectedStr = parts[1].replaceAll(\"[\\\\[\\\\]]\", \"\").split(\",\");\n\n        int[] input = new int[inputStr.length];\n        int[] expected = new int[expectedStr.length];\n        for (int i = 0; i < inputStr.length; i++) input[i] = Integer.parseInt(inputStr[i].trim());\n        for (int i = 0; i < expectedStr.length; i++) expected[i] = Integer.parseInt(expectedStr[i].trim());\n\n        int[] output = productExceptSelf(input);\n\n        boolean isEqual = Arrays.equals(output, expected);\n        System.out.println(isEqual ? \"true\" : \"false\");\n    }\n}`,
      PYTHON: `from typing import List
import sys, json

def productExceptSelf(nums: List[int]) -> List[int]:
    n = len(nums)
    result = [1] * n
    
    for i in range(1, n):
        result[i] = result[i-1] * nums[i-1]
    
    right_product = 1
    for i in range(n-1, -1, -1):
        result[i] *= right_product
        right_product *= nums[i]
    
    return result

for line in sys.stdin:
    data = json.loads(line.strip())
    nums = data["input"]
    expected = data["expected"]
    result = productExceptSelf(nums)
    print(str(result == expected).lower())
    break`,
    },
  },
  {
    title: "Trapping Rain Water",
    category: "two_pointers",
    description:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    difficulty: "HARD",
    tags: [
      { value: "Array" },
      { value: "Two Pointers" },
      { value: "Dynamic Programming" },
      { value: "Stack" },
      { value: "Google" },
      { value: "Amazon" },
      { value: "Facebook" },
    ],
    constraints:
      "n == height.length, 1 <= n <= 2 * 10^4, 0 <= height[i] <= 3 * 10^4",
    hints:
      "Water level at any point is determined by the minimum of maximum heights to its left and right. Use two pointers approach for O(1) space solution.",
    editorial:
      "The key insight is that water trapped at any position depends on the minimum of the maximum heights on both sides. Two pointers approach optimizes this to O(n) time and O(1) space.",
    testcases: [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
      { input: "[4,2,0,3,2,5]", output: "9" },
      { input: "[3,0,2,0,4]", output: "7" },
      { input: "[1,2,3,4,5]", output: "0" },
      { input: "[5,4,3,2,1]", output: "0" },
    ],
    examples: {
      JAVASCRIPT: {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation:
          "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.",
      },
      PYTHON: {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation:
          "Water trapped calculated using two pointers by tracking left and right max heights.",
      },
      JAVA: {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation:
          "Two pointers approach with leftMax and rightMax tracking the max height on each side.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const height = JSON.parse(line.trim());
    const result = trap(height);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def trap(height):
    # Write your code here
    pass

# Read input and call function
import sys, json
for line in sys.stdin:
    height = json.loads(line.strip())
    result = trap(height)
    print(result)
    break`,
      JAVA: `import java.util.*;

public class Main {
    public static int trap(int[] height) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        input = input.replaceAll("[\\\\[\\\\]\\\\s]", "");
        String[] parts = input.isEmpty() ? new String[0] : input.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            height[i] = Integer.parseInt(parts[i]);
        }

        int result = trap(height);
        System.out.println(result);
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {number[]} height
 * @return {number}
 */
function trap(height) {
    if (height.length === 0) return 0;

    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0;
    let water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }

    return water;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const height = JSON.parse(line.trim());
    const result = trap(height);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def trap(height):
    if not height:
        return 0

    left, right = 0, len(height) - 1
    leftMax, rightMax = 0, 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            if height[left] >= leftMax:
                leftMax = height[left]
            else:
                water += leftMax - height[left]
            left += 1
        else:
            if height[right] >= rightMax:
                rightMax = height[right]
            else:
                water += rightMax - height[right]
            right -= 1

    return water

# Read input and call function
import sys, json
for line in sys.stdin:
    height = json.loads(line.strip())
    result = trap(height)
    print(result)
    break`,
      JAVA: `import java.util.*;

public class Main {
    public static int trap(int[] height) {
        if (height.length == 0) return 0;

        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }

        return water;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        input = input.replaceAll("[\\\\[\\\\]\\\\s]", "");
        String[] parts = input.isEmpty() ? new String[0] : input.split(",");
        int[] height = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            height[i] = Integer.parseInt(parts[i]);
        }

        int result = trap(height);
        System.out.println(result);
    }
}`,
    },
  },
  {
    title: "Median of Two Sorted Arrays",
    category: "binary_search",
    description:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    difficulty: "HARD",
    tags: [
      { value: "Array" },
      { value: "Binary Search" },
      { value: "Divide and Conquer" },
      { value: "Google" },
      { value: "Microsoft" },
      { value: "Apple" },
    ],
    constraints:
      "nums1.length == m, nums2.length == n, 0 <= m <= 1000, 0 <= n <= 1000, 1 <= m + n <= 2000, -10^6 <= nums1[i], nums2[i] <= 10^6",
    hints:
      "Use binary search on the smaller array. The key is to find the right partition such that elements on the left are smaller than elements on the right.",
    editorial:
      "This problem requires binary search to achieve O(log(min(m,n))) complexity. We partition both arrays such that the left side has half the total elements.",
    testcases: [
      { input: "[1,3]\n[2]", output: "2.0" },
      { input: "[1,2]\n[3,4]", output: "2.5" },
      { input: "[0,0]\n[0,0]", output: "0.0" },
      { input: "[]\n[1]", output: "1.0" },
      { input: "[2]\n[]", output: "2.0" },
    ],
    examples: {
      JAVASCRIPT: {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
        explanation: "merged array = [1,2,3] and median is 2.",
      },
      PYTHON: {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
        explanation:
          "Perform binary search on smaller array to find correct partition and calculate median.",
      },
      JAVA: {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.0",
        explanation:
          "Use binary search on smaller array, partition arrays to find median efficiently.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
function findMedianSortedArrays(nums1, nums2) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let input = [];
rl.on('line', (line) => {
    input.push(line.trim());
    if (input.length === 2) {
        const nums1 = JSON.parse(input[0]);
        const nums2 = JSON.parse(input[1]);
        const result = findMedianSortedArrays(nums1, nums2);
        console.log(result.toFixed(1));
        rl.close();
    }
});`,
      PYTHON: `def findMedianSortedArrays(nums1, nums2):
    # Write your code here
    pass

import sys, json
input_lines = []
for line in sys.stdin:
    input_lines.append(line.strip())
    if len(input_lines) == 2:
        nums1 = json.loads(input_lines[0])
        nums2 = json.loads(input_lines[1])
        result = findMedianSortedArrays(nums1, nums2)
        print(f"{result:.1f}")
        break`,
      JAVA: `import java.util.*;

public class Main {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        // Write your code here
        return 0.0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line1 = scanner.nextLine();
        String line2 = scanner.nextLine();

        line1 = line1.replaceAll("[\\[\\]\\s]", "");
        line2 = line2.replaceAll("[\\[\\]\\s]", "");

        String[] parts1 = line1.isEmpty() ? new String[0] : line1.split(",");
        String[] parts2 = line2.isEmpty() ? new String[0] : line2.split(",");

        int[] nums1 = new int[parts1.length];
        int[] nums2 = new int[parts2.length];

        for (int i = 0; i < parts1.length; i++) {
            nums1[i] = Integer.parseInt(parts1[i]);
        }
        for (int i = 0; i < parts2.length; i++) {
            nums2[i] = Integer.parseInt(parts2[i]);
        }

        double result = findMedianSortedArrays(nums1, nums2);
        System.out.printf("%.1f%n", result);
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    const m = nums1.length;
    const n = nums2.length;
    let left = 0, right = m;

    while (left <= right) {
        const partitionX = Math.floor((left + right) / 2);
        const partitionY = Math.floor((m + n + 1) / 2) - partitionX;

        const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        const minRightX = partitionX === m ? Infinity : nums1[partitionX];

        const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        const minRightY = partitionY === n ? Infinity : nums2[partitionY];

        if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
            if ((m + n) % 2 === 0) {
                return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
            } else {
                return Math.max(maxLeftX, maxLeftY);
            }
        } else if (maxLeftX > minRightY) {
            right = partitionX - 1;
        } else {
            left = partitionX + 1;
        }
    }
    return 0;
}

// Parse input and execute
const readline = require('readline');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
let input = [];
rl.on('line', line => {
    input.push(line.trim());
    if (input.length === 2) {
        const nums1 = JSON.parse(input[0]);
        const nums2 = JSON.parse(input[1]);
        const result = findMedianSortedArrays(nums1, nums2);
        console.log(result.toFixed(1));
        rl.close();
    }
});`,
      PYTHON: `def findMedianSortedArrays(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    m, n = len(nums1), len(nums2)
    left, right = 0, m

    while left <= right:
        partitionX = (left + right) // 2
        partitionY = (m + n + 1) // 2 - partitionX

        maxLeftX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
        minRightX = float('inf') if partitionX == m else nums1[partitionX]

        maxLeftY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
        minRightY = float('inf') if partitionY == n else nums2[partitionY]

        if maxLeftX <= minRightY and maxLeftY <= minRightX:
            if (m + n) % 2 == 0:
                return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY)) / 2.0
            else:
                return max(maxLeftX, maxLeftY)
        elif maxLeftX > minRightY:
            right = partitionX - 1
        else:
            left = partitionX + 1
    return 0.0

import sys, json
input_lines = []
for line in sys.stdin:
    input_lines.append(line.strip())
    if len(input_lines) == 2:
        nums1 = json.loads(input_lines[0])
        nums2 = json.loads(input_lines[1])
        result = findMedianSortedArrays(nums1, nums2)
        print(f"{result:.1f}")
        break`,
      JAVA: `import java.util.*;

public class Main {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        int m = nums1.length, n = nums2.length;
        int left = 0, right = m;

        while (left <= right) {
            int partitionX = (left + right) / 2;
            int partitionY = (m + n + 1) / 2 - partitionX;

            int maxLeftX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minRightX = (partitionX == m) ? Integer.MAX_VALUE : nums1[partitionX];

            int maxLeftY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minRightY = (partitionY == n) ? Integer.MAX_VALUE : nums2[partitionY];

            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 == 0) {
                    return ((double)Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
                } else {
                    return (double)Math.max(maxLeftX, maxLeftY);
                }
            } else if (maxLeftX > minRightY) {
                right = partitionX - 1;
            } else {
                left = partitionX + 1;
            }
        }
        return 0.0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line1 = scanner.nextLine();
        String line2 = scanner.nextLine();

        line1 = line1.replaceAll("[\\[\\]\\s]", "");
        line2 = line2.replaceAll("[\\[\\]\\s]", "");

        String[] parts1 = line1.isEmpty() ? new String[0] : line1.split(",");
        String[] parts2 = line2.isEmpty() ? new String[0] : line2.split(",");

        int[] nums1 = new int[parts1.length];
        int[] nums2 = new int[parts2.length];

        for (int i = 0; i < parts1.length; i++) {
            nums1[i] = Integer.parseInt(parts1[i]);
        }
        for (int i = 0; i < parts2.length; i++) {
            nums2[i] = Integer.parseInt(parts2[i]);
        }

        double result = findMedianSortedArrays(nums1, nums2);
        System.out.printf("%.1f%n", result);
    }
}`,
    },
  },
  {
    title: "Largest Rectangle in Histogram",
    category: "stack",
    description:
      "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    difficulty: "HARD",
    tags: [
      { value: "Array" },
      { value: "Stack" },
      { value: "Monotonic Stack" },
      { value: "Google" },
      { value: "Amazon" },
      { value: "Microsoft" },
    ],
    constraints: "1 <= heights.length <= 10^5, 0 <= heights[i] <= 10^4",
    hints:
      "Use a stack to keep track of indices of bars. For each bar, find the largest rectangle that can be formed with that bar as the smallest bar.",
    editorial:
      "Use a monotonic stack to efficiently find the previous and next smaller elements for each bar. This allows us to calculate the maximum rectangle area for each bar as the smallest height.",
    testcases: [
      { input: "[2,1,5,6,2,3]", output: "10" },
      { input: "[2,4]", output: "4" },
      { input: "[1,1,1,1]", output: "4" },
      { input: "[3,6,5,7,4,8,1,0]", output: "20" },
      { input: "[6,2,5,4,5,1,6]", output: "12" },
    ],
    examples: {
      JAVASCRIPT: {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation:
          "The largest rectangle is shown in the red area, which has an area = 10 units.",
      },
      PYTHON: {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation:
          "Use a monotonic stack to track bars and calculate max rectangle for each bar.",
      },
      JAVA: {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation:
          "Maintain a stack of indices with increasing bar heights and calculate max area when height drops.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const heights = JSON.parse(line.trim());
    const result = largestRectangleArea(heights);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def largestRectangleArea(heights):
    # Write your code here
    pass

import sys, json
for line in sys.stdin:
    heights = json.loads(line.strip())
    result = largestRectangleArea(heights)
    print(result)
    break`,
      JAVA: `import java.util.*;

public class Main {
    public static int largestRectangleArea(int[] heights) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line = scanner.nextLine();
        line = line.replaceAll("[\\[\\]\\s]", "");
        String[] parts = line.isEmpty() ? new String[0] : line.split(",");
        int[] heights = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            heights[i] = Integer.parseInt(parts[i]);
        }
        int result = largestRectangleArea(heights);
        System.out.println(result);
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function largestRectangleArea(heights) {
    const stack = [];
    let maxArea = 0;
    
    for (let i = 0; i <= heights.length; i++) {
        const currentHeight = i === heights.length ? 0 : heights[i];
        
        while (stack.length > 0 && heights[stack[stack.length - 1]] > currentHeight) {
            const height = heights[stack.pop()];
            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}

// Parse input and execute
const readline = require('readline');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const heights = JSON.parse(line.trim());
    const result = largestRectangleArea(heights);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def largestRectangleArea(heights):
    stack = []
    max_area = 0
    for i in range(len(heights) + 1):
        current_height = 0 if i == len(heights) else heights[i]
        while stack and heights[stack[-1]] > current_height:
            h = heights[stack.pop()]
            w = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, h * w)
        stack.append(i)
    return max_area

import sys, json
for line in sys.stdin:
    heights = json.loads(line.strip())
    result = largestRectangleArea(heights)
    print(result)
    break`,
      JAVA: `import java.util.*;

public class Main {
    public static int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        int n = heights.length;
        for (int i = 0; i <= n; i++) {
            int currentHeight = (i == n) ? 0 : heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] > currentHeight) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String line = scanner.nextLine();
        line = line.replaceAll("[\\[\\]\\s]", "");
        String[] parts = line.isEmpty() ? new String[0] : line.split(",");
        int[] heights = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            heights[i] = Integer.parseInt(parts[i]);
        }
        int result = largestRectangleArea(heights);
        System.out.println(result);
    }
}`,
    },
  },
  {
    title: "Valid Anagram",
    category: "string",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    difficulty: "EASY",
    tags: [
      { value: "Hash Table" },
      { value: "String" },
      { value: "Sorting" },
      { value: "Facebook" },
      { value: "Amazon" },
    ],
    constraints:
      "1 <= s.length, t.length <= 5 * 10^4, s and t consist of lowercase English letters",
    hints:
      "If the lengths are different, they cannot be anagrams. Count the frequency of each character and compare.",
    editorial:
      "Two strings are anagrams if they have the same character frequencies. You can either sort both strings and compare, or use a frequency map.",
    testcases: [
      { input: "anagram\nnagaram", output: "true" },
      { input: "rat\ncar", output: "false" },
      { input: "listen\nsilent", output: "true" },
      { input: "hello\nbello", output: "false" },
      { input: "a\na", output: "true" },
    ],
    examples: {
      JAVASCRIPT: {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation:
          "Both strings contain the same characters with the same frequencies.",
      },
      PYTHON: {
        input: 's = "anagram", t = "nagaram"',
        output: "True",
        explanation: "Character counts match exactly, confirming an anagram.",
      },
      JAVA: {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation:
          "Frequency counts for each character in s and t are equal.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
function isAnagram(s, t) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let input = [];
rl.on('line', (line) => {
    input.push(line.trim());
    if (input.length === 2) {
        const s = input[0];
        const t = input[1];
        const result = isAnagram(s, t);
        console.log(result);
        rl.close();
    }
});`,
      PYTHON: `def isAnagram(s: str, t: str) -> bool:
    # Write your code here
    pass

import sys
lines = []
for line in sys.stdin:
    lines.append(line.strip())
    if len(lines) == 2:
        s, t = lines
        print(str(isAnagram(s, t)).lower())
        break`,
      JAVA: `import java.util.*;

public class Main {
    public static boolean isAnagram(String s, String t) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s = scanner.nextLine();
        String t = scanner.nextLine();
        System.out.println(isAnagram(s, t));
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const charCount = {};
    
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    
    for (let char of t) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    
    return true;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let input = [];
rl.on('line', (line) => {
    input.push(line.trim());
    if (input.length === 2) {
        const s = input[0];
        const t = input[1];
        const result = isAnagram(s, t);
        console.log(result);
        rl.close();
    }
});`,
      PYTHON: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    count = {}
    for char in s:
        count[char] = count.get(char, 0) + 1
    for char in t:
        if char not in count or count[char] == 0:
            return False
        count[char] -= 1
    return True

import sys
lines = []
for line in sys.stdin:
    lines.append(line.strip())
    if len(lines) == 2:
        s, t = lines
        print(str(isAnagram(s, t)).lower())
        break`,
      JAVA: `import java.util.*;

public class Main {
    public static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (char c : s.toCharArray()) {
            count[c - 'a']++;
        }
        for (char c : t.toCharArray()) {
            if (--count[c - 'a'] < 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String s = scanner.nextLine();
        String t = scanner.nextLine();
        System.out.println(isAnagram(s, t));
    }
}`,
    },
  },
  {
    title: "Power of Two",
    category: "bit_manipulation",
    description:
      "Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two, if there exists an integer x such that n == 2^x.",
    difficulty: "EASY",
    tags: [
      { value: "Math" },
      { value: "Bit Manipulation" },
      { value: "Recursion" },
      { value: "Google" },
      { value: "Microsoft" },
    ],
    constraints: "-2^31 <= n <= 2^31 - 1",
    hints:
      "A power of two in binary has exactly one bit set. Use bit manipulation: n & (n-1) == 0 for positive n.",
    editorial:
      "Powers of two have exactly one bit set in their binary representation. The trick n & (n-1) removes the rightmost set bit.",
    testcases: [
      { input: "1", output: "true" },
      { input: "16", output: "true" },
      { input: "3", output: "false" },
      { input: "4", output: "true" },
      { input: "5", output: "false" },
    ],
    examples: {
      JAVASCRIPT: {
        input: "n = 1",
        output: "true",
        explanation: "2^0 = 1",
      },
      JAVA: {
        input: "n = 1",
        output: "true",
        explanation: "2^0 = 1",
      },
      PYTHON: {
        input: "n = 1",
        output: "true",
        explanation: "2^0 = 1",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number} n
 * @return {boolean}
 */
function isPowerOfTwo(n) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const n = parseInt(line.trim());
    const result = isPowerOfTwo(n);
    console.log(result);
    rl.close();
});`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static boolean isPowerOfTwo(int n) {
        // Write your code here
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPowerOfTwo(n));
        sc.close();
    }
}`,
      PYTHON: `def isPowerOfTwo(n: int) -> bool:
    # Write your code here
    pass

if __name__ == "__main__":
    import sys
    n = int(sys.stdin.readline().strip())
    result = isPowerOfTwo(n)
    print(str(result).lower())
`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {number} n
 * @return {boolean}
 */
function isPowerOfTwo(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const n = parseInt(line.trim());
    const result = isPowerOfTwo(n);
    console.log(result);
    rl.close();
});`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPowerOfTwo(n));
        sc.close();
    }
}`,
      PYTHON: `def isPowerOfTwo(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0

if __name__ == "__main__":
    import sys
    n = int(sys.stdin.readline().strip())
    result = isPowerOfTwo(n)
    print(str(result).lower())
`,
    },
  },
  {
    title: "Roman to Integer",
    category: "string",
    description:
      "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M with values 1, 5, 10, 50, 100, 500, 1000 respectively. Given a roman numeral, convert it to an integer.",
    difficulty: "EASY",
    tags: [
      { value: "Hash Table" },
      { value: "Math" },
      { value: "String" },
      { value: "Facebook" },
      { value: "Microsoft" },
      { value: "Amazon" },
    ],
    constraints:
      "1 <= s.length <= 15, s contains only characters ('I', 'V', 'X', 'L', 'C', 'D', 'M'), It is guaranteed that s is a valid roman numeral in the range [1, 3999]",
    hints:
      "If a smaller numeral appears before a larger one, it should be subtracted. Otherwise, add it to the result.",
    editorial:
      "Iterate through the string and add values. If current character value is less than next character value, subtract it; otherwise add it.",
    testcases: [
      { input: "III", output: "3" },
      { input: "LVIII", output: "58" },
      { input: "MCMXC", output: "1990" },
      { input: "IV", output: "4" },
      { input: "IX", output: "9" },
    ],
    examples: {
      JAVASCRIPT: {
        input: 's = "III"',
        output: "3",
        explanation: "III = 3.",
      },
      JAVA: {
        input: 's = "III"',
        output: "3",
        explanation: "III = 3.",
      },
      PYTHON: {
        input: "s = 'III'",
        output: "3",
        explanation: "III = 3.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim();
    const result = romanToInt(s);
    console.log(result);
    rl.close();
});`,
      JAVA: `import java.util.Scanner;

public class Solution {
    public static int romanCharToInt(char c) {
        //todo, write your code here
    }

    public static int romanToInt(String s) {
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int current = romanCharToInt(s.charAt(i));
            int next = (i + 1 < s.length()) ? romanCharToInt(s.charAt(i + 1)) : 0;

            if (next > current) {
                total -= current;
            } else {
                total += current;
            }
        }
        return total;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(romanToInt(s));
        sc.close();
    }
}`,
      PYTHON: `def romanToInt(s: str) -> int:
    # Write your code here
    pass

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    result = romanToInt(s)
    print(result)
`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let total = 0;
    
    for (let i = 0; i < s.length; i++) {
        const current = romanMap[s[i]];
        const next = romanMap[s[i + 1]];
        
        if (next && current < next) {
            total -= current;
        } else {
            total += current;
        }
    }
    
    return total;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim();
    const result = romanToInt(s);
    console.log(result);
    rl.close();
});`,
      JAVA: `import java.util.Scanner;

public class Main {
    public static int romanCharToInt(char c) {
        switch(c) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            case 'C': return 100;
            case 'D': return 500;
            case 'M': return 1000;
            default: return 0; // or throw exception if invalid char
        }
    }

    public static int romanToInt(String s) {
        int total = 0;
        for (int i = 0; i < s.length(); i++) {
            int current = romanCharToInt(s.charAt(i));
            int next = (i + 1 < s.length()) ? romanCharToInt(s.charAt(i + 1)) : 0;

            if (next > current) {
                total -= current;
            } else {
                total += current;
            }
        }
        return total;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(romanToInt(s));
        sc.close();
    }
}
`,
      PYTHON: `def romanToInt(s: str) -> int:
    romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }

    total = 0
    for i in range(len(s)):
        current = romanMap[s[i]]
        next_val = romanMap[s[i+1]] if i+1 < len(s) else 0
        if next_val > current:
            total -= current
        else:
            total += current
    return total

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    result = romanToInt(s)
    print(result)
`,
    },
  },
  {
    title: "Happy Number",
    category: "math",
    description:
      "Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Return true if n is a happy number, and false if not.",
    difficulty: "MEDIUM",
    tags: [
      { value: "Hash Table" },
      { value: "Math" },
      { value: "Two Pointers" },
      { value: "Google" },
      { value: "Uber" },
      { value: "Airbnb" },
    ],
    constraints: "1 <= n <= 2^31 - 1",
    hints:
      "Use a set to detect cycles. If you see the same number twice, there's a cycle and the number is not happy.",
    editorial:
      "Keep calculating the sum of squares of digits. Use a HashSet to detect if we've seen a number before (indicating a cycle). If we reach 1, it's happy.",
    testcases: [
      { input: "19", output: "true" },
      { input: "2", output: "false" },
      { input: "1", output: "true" },
      { input: "7", output: "true" },
      { input: "4", output: "false" },
    ],
    examples: {
      JAVASCRIPT: {
        input: "n = 19",
        output: "true",
        explanation:
          "1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const n = parseInt(line.trim());
    const result = isHappy(n);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def isHappy(n: int) -> bool:
    # Write your code here
    pass

if __name__ == "__main__":
    import sys
    n = int(sys.stdin.readline().strip())
    print(str(isHappy(n)).lower())`,
      JAVA: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static boolean isHappy(int n) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isHappy(n));
        sc.close();
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {number} n
 * @return {boolean}
 */
function isHappy(n) {
    function getSumOfSquares(num) {
        let sum = 0;
        while (num > 0) {
            const digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    
    const seen = new Set();
    
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = getSumOfSquares(n);
    }
    
    return n === 1;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const n = parseInt(line.trim());
    const result = isHappy(n);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def isHappy(n: int) -> bool:
    def get_sum_of_squares(num):
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = get_sum_of_squares(n)
    return n == 1

if __name__ == "__main__":
    import sys
    n = int(sys.stdin.readline().strip())
    print(str(isHappy(n)).lower())`,
      JAVA: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static int getSumOfSquares(int num) {
        int sum = 0;
        while (num > 0) {
            int digit = num % 10;
            sum += digit * digit;
            num /= 10;
        }
        return sum;
    }

    public static boolean isHappy(int n) {
        HashSet<Integer> seen = new HashSet<>();
        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            n = getSumOfSquares(n);
        }
        return n == 1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isHappy(n));
        sc.close();
    }
}`,
    },
  },
  {
    title: "Number of Islands",
    category: "graph",
    description:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    difficulty: "MEDIUM",
    tags: [
      { value: "Array" },
      { value: "Depth-First Search" },
      { value: "Breadth-First Search" },
      { value: "Union Find" },
      { value: "Amazon" },
      { value: "Google" },
      { value: "Facebook" },
    ],
    constraints:
      "m == grid.length, n == grid[i].length, 1 <= m, n <= 300, grid[i][j] is '0' or '1'",
    hints:
      "Use DFS or BFS to traverse each island when you encounter a '1'. Mark visited cells to avoid counting the same island multiple times.",
    editorial:
      "Iterate through the grid. When you find a '1', increment the island count and use DFS/BFS to mark all connected '1's as visited.",
    testcases: [
      {
        input:
          '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
      },
      {
        input:
          '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3",
      },
      { input: '[["1"]]', output: "1" },
      { input: '[["0"]]', output: "0" },
      { input: '[["1","0","1"],["0","1","0"],["1","0","1"]]', output: "5" },
    ],
    examples: {
      JAVASCRIPT: {
        input:
          'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
        explanation: "All the 1's are connected, forming one island.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const grid = JSON.parse(line.trim());
    const result = numIslands(grid);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def numIslands(grid):
    # Write your code here
    pass

if __name__ == "__main__":
    import sys, json
    grid = json.loads(sys.stdin.readline().strip())
    print(numIslands(grid))`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {character[][]} grid
 * @return {number}
 */
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;
    
    function dfs(row, col) {
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return;
        }
        
        grid[row][col] = '0';
        
        dfs(row + 1, col);
        dfs(row - 1, col);
        dfs(row, col + 1);
        dfs(row, col - 1);
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    
    return count;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const grid = JSON.parse(line.trim());
    const result = numIslands(grid);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def numIslands(grid):
    if not grid or len(grid) == 0:
        return 0
    
    rows = len(grid)
    cols = len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    for i in range(rows):
        for j in range(cols):
            if grid[i][j] == '1':
                count += 1
                dfs(i, j)
    
    return count

if __name__ == "__main__":
    import sys, json
    grid = json.loads(sys.stdin.readline().strip())
    print(numIslands(grid))`,
    },
  },
  {
    title: "String to Integer (atoi)",
    category: "string",
    description:
      "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer (similar to C/C++'s atoi function). Read in and ignore any leading whitespace. Check if the next character is '-' or '+'. Read this character if it is either. Read in next characters until the next non-digit character or end of input. Convert these digits into integer. Clamp the integer so that it fits in 32-bit signed integer range [-2^31, 2^31 - 1].",
    difficulty: "MEDIUM",
    tags: [
      { value: "String" },
      { value: "Math" },
      { value: "Simulation" },
      { value: "Amazon" },
      { value: "Microsoft" },
      { value: "Google" },
    ],
    constraints:
      "0 <= s.length <= 200, s consists of English letters, digits, ' ', '+', '-', and '.'",
    hints:
      "Handle edge cases: leading whitespace, sign, overflow/underflow, and invalid characters. Use parseInt with careful boundary checking.",
    editorial:
      "Follow the algorithm step by step: skip whitespace, handle sign, read digits, and clamp the result to 32-bit integer bounds.",
    testcases: [
      { input: "42", output: "42" },
      { input: "   -42", output: "-42" },
      { input: "4193 with words", output: "4193" },
      { input: "words and 987", output: "0" },
      { input: "-91283472332", output: "-2147483648" },
    ],
    examples: {
      JAVASCRIPT: {
        input: 's = "42"',
        output: "42",
        explanation:
          "The underlined characters are what is read in, the caret is the current reader position.",
      },
      PYTHON: {
        input: 's = "42"',
        output: "42",
        explanation:
          "The function strips whitespace, handles sign, then parses digits until a non-digit is encountered.",
      },
      JAVA: {
        input: 's = "42"',
        output: "42",
        explanation:
          "Same as above, handles whitespace, sign, digits parsing, and clamping to 32-bit int range.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim();  // corrected: no slice here
    const result = myAtoi(s);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def myAtoi(s: str) -> int:
    # Write your code here
    pass

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    print(myAtoi(s))`,
      JAVA: `import java.util.*;
public class Main {
    public static int myAtoi(String s) {
        // Write your code here
        return 0;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int result = myAtoi(s);
        System.out.println(result);
        sc.close();
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {number}
 */
function myAtoi(s) {
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    
    let i = 0;
    let sign = 1;
    let result = 0;
    
    while (i < s.length && s[i] === ' ') i++;
    
    if (i < s.length && (s[i] === '+' || s[i] === '-')) {
        sign = s[i] === '-' ? -1 : 1;
        i++;
    }
    
    while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        const digit = parseInt(s[i]);
        if (result > Math.floor(INT_MAX / 10) || 
           (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }
        result = result * 10 + digit;
        i++;
    }
    
    return sign * result;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim();  // corrected: no slice here
    const result = myAtoi(s);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def myAtoi(s: str) -> int:
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    
    i = 0
    n = len(s)
    sign = 1
    result = 0
    
    # skip whitespaces
    while i < n and s[i] == ' ':
        i += 1
    
    # handle sign
    if i < n and (s[i] == '+' or s[i] == '-'):
        sign = -1 if s[i] == '-' else 1
        i += 1
    
    # read digits
    while i < n and s[i].isdigit():
        digit = int(s[i])
        
        if result > (INT_MAX // 10) or (result == INT_MAX // 10 and digit > INT_MAX % 10):
            return INT_MAX if sign == 1 else INT_MIN
        
        result = result * 10 + digit
        i += 1
    
    return sign * result

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    print(myAtoi(s))`,
      JAVA: `import java.util.*;
public class Main {
    public static int myAtoi(String s) {
        int INT_MAX = Integer.MAX_VALUE;
        int INT_MIN = Integer.MIN_VALUE;
        
        int i = 0, n = s.length();
        int sign = 1;
        int result = 0;
        
        // skip whitespaces
        while (i < n && s.charAt(i) == ' ') i++;
        
        // handle sign
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            sign = (s.charAt(i) == '-') ? -1 : 1;
            i++;
        }
        
        // read digits
        while (i < n && Character.isDigit(s.charAt(i))) {
            int digit = s.charAt(i) - '0';
            
            if (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > INT_MAX % 10)) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }
            
            result = result * 10 + digit;
            i++;
        }
        
        return sign * result;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        int result = myAtoi(s);
        System.out.println(result);
        sc.close();
    }
}`,
    },
  },
  {
    title: "Valid Number",
    category: "string",
    description:
      "A valid number can be split up into these components (in order): A decimal number or an integer, (Optional) An 'e' or 'E', followed by an integer. A decimal number can be split up into these components (in order): (Optional) A sign character ('+' or '-'), One of: At least one digit, followed by a dot '.', At least one digit, followed by a dot '.', followed by at least one digit, A dot '.', followed by at least one digit. An integer can be split up into these components (in order): (Optional) A sign character ('+' or '-'), At least one digit. Given a string s, return true if s is a valid number.",
    difficulty: "HARD",
    tags: [
      { value: "String" },
      { value: "Math" },
      { value: "Finite State Machine" },
      { value: "Google" },
      { value: "Facebook" },
      { value: "LinkedIn" },
    ],
    constraints:
      "1 <= s.length <= 20, s consists of only English letters, digits, space ' ', plus '+', minus '-', and dot '.'",
    hints:
      "Use a finite state machine or careful parsing. Handle signs, digits, decimal points, and scientific notation separately.",
    editorial:
      "This problem requires careful state management. Consider using a finite state machine approach or systematic validation of each component.",
    testcases: [
      { input: "0", output: "true" },
      { input: "e", output: "false" },
      { input: ".", output: "false" },
      { input: "2e10", output: "true" },
      { input: "-90E3", output: "true" },
    ],
    examples: {
      JAVASCRIPT: {
        input: 's = "0"',
        output: "true",
        explanation: "0 is a valid integer.",
      },
      PYTHON: {
        input: 's = "0"',
        output: "True",
        explanation: "0 is a valid integer.",
      },
      JAVA: {
        input: 's = "0"',
        output: "true",
        explanation: "0 is a valid integer.",
      },
    },
    codeSnippets: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isNumber(s) {
    // Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim();  // corrected: no slice here
    const result = isNumber(s);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def isNumber(s: str) -> bool:
    # Write your code here
    pass

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    print(str(isNumber(s)).lower())`,
      JAVA: `import java.util.*;
public class Main {
    public static boolean isNumber(String s) {
        // Write your code here
        return false;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        boolean result = isNumber(s);
        System.out.println(result);
        sc.close();
    }
}`,
    },
    referenceSolutions: {
      JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isNumber(s) {
    s = s.trim();
    let hasNum = false;
    let hasDot = false;
    let hasE = false;
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            hasNum = true;
        } else if (char === '.') {
            if (hasDot || hasE) return false;
            hasDot = true;
        } else if (char === 'e' || char === 'E') {
            if (hasE || !hasNum) return false;
            hasE = true;
            hasNum = false; // Reset for exponent part
        } else if (char === '+' || char === '-') {
            if (i !== 0 && s[i-1] !== 'e' && s[i-1] !== 'E') return false;
        } else {
            return false;
        }
    }
    
    return hasNum;
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    const s = line.trim(); // no slice here
    const result = isNumber(s);
    console.log(result);
    rl.close();
});`,
      PYTHON: `def isNumber(s: str) -> bool:
    s = s.strip()
    has_num = False
    has_dot = False
    has_e = False

    for i, char in enumerate(s):
        if char.isdigit():
            has_num = True
        elif char == '.':
            if has_dot or has_e:
                return False
            has_dot = True
        elif char in ['e', 'E']:
            if has_e or not has_num:
                return False
            has_e = True
            has_num = False  # reset for exponent part
        elif char in ['+', '-']:
            if i != 0 and s[i-1] not in ['e', 'E']:
                return False
        else:
            return False
    return has_num

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    print(str(isNumber(s)).lower())`,
      JAVA: `import java.util.*;
public class Main {
    public static boolean isNumber(String s) {
        s = s.trim();
        boolean hasNum = false;
        boolean hasDot = false;
        boolean hasE = false;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                hasNum = true;
            } else if (c == '.') {
                if (hasDot || hasE) return false;
                hasDot = true;
            } else if (c == 'e' || c == 'E') {
                if (hasE || !hasNum) return false;
                hasE = true;
                hasNum = false; // reset for exponent part
            } else if (c == '+' || c == '-') {
                if (i != 0 && s.charAt(i - 1) != 'e' && s.charAt(i - 1) != 'E') return false;
            } else {
                return false;
            }
        }
        return hasNum;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        boolean result = isNumber(s);
        System.out.println(result);
        sc.close();
    }
}`,
    },
  },
];
