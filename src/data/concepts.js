// src/data/concepts.js
export const CONCEPTS = {
  1: {
    title: "Two Pointers",
    tagline: "Two pointers = one loop that does the work of two.",
    days: [
      {
        day: "Mon — Opposite Ends",
        where: "Sorted arrays where you need to find pairs, triplets, or satisfy a sum condition.",
        when: "When brute force uses nested loops O(n²) on a sorted array — two pointers cuts it to O(n).",
        what: "Place one pointer at the start (left) and one at the end (right) of a sorted array. Move them toward each other based on whether your current result is too big, too small, or just right.",
        example: {
          title: "Two Sum II — Input Array Is Sorted",
          explanation: "If sum < target → left pointer right (increase sum). If sum > target → right pointer left (decrease sum). Works because array is sorted — moving left increases sum, moving right decreases it.",
          code: {
            python: `def twoSum(numbers, target):
    l, r = 0, len(numbers) - 1
    while l < r:
        s = numbers[l] + numbers[r]
        if s == target:
            return [l+1, r+1]
        elif s < target:
            l += 1   # need bigger sum
        else:
            r -= 1   # need smaller sum`,
            cpp: `vector<int> twoSum(vector<int>& numbers, int target) {
    int l = 0, r = numbers.size() - 1;
    while (l < r) {
        int s = numbers[l] + numbers[r];
        if (s == target)
            return {l+1, r+1};
        else if (s < target)
            l++;   // need bigger sum
        else
            r--;   // need smaller sum
    }
    return {};
}`,
            java: `public int[] twoSum(int[] numbers, int target) {
    int l = 0, r = numbers.length - 1;
    while (l < r) {
        int s = numbers[l] + numbers[r];
        if (s == target)
            return new int[]{l+1, r+1};
        else if (s < target)
            l++;   // need bigger sum
        else
            r--;   // need smaller sum
    }
    return new int[]{};
}`
          }
        },
        keyInsight: "Only works on SORTED arrays. For unsorted → sort first or use hashmap instead.",
        template: {
          python: `l, r = 0, len(arr) - 1
while l < r:
    if condition_met:
        # found answer
    elif need_bigger:
        l += 1
    else:
        r -= 1`,
          cpp: `int l = 0, r = arr.size() - 1;
while (l < r) {
    if (condition_met) {
        // found answer
    } else if (need_bigger) {
        l++;
    } else {
        r--;
    }
}`,
          java: `int l = 0, r = arr.length - 1;
while (l < r) {
    if (condition_met) {
        // found answer
    } else if (need_bigger) {
        l++;
    } else {
        r--;
    }
}`
        }
      },
      {
        day: "Tue — 3Sum Pattern",
        where: "Finding triplets or k-tuples in an array that satisfy a condition (sum = 0, etc.).",
        when: "When you need all unique combinations of 3+ elements. Fix one element, reduce to 2-pointer subproblem.",
        what: "Sort the array. Fix one element with a for loop. Run two pointers on the remaining subarray. Skip duplicates at every level to avoid repeated results.",
        example: {
          title: "3Sum",
          explanation: "Sort → fix nums[i] → two pointer on [i+1, end]. Skip duplicates at each level. When sum==0, record result and skip all duplicates before moving pointers.",
          code: {
            python: `def threeSum(nums):
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # skip duplicates
        l, r = i+1, len(nums)-1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                result.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1; r -= 1
            elif s < 0: l += 1
            else: r -= 1
    return result`,
            cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    for (int i = 0; i < nums.size()-2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i+1, r = nums.size()-1;
        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];
            if (s == 0) {
                result.push_back({nums[i], nums[l], nums[r]});
                while (l<r && nums[l]==nums[l+1]) l++;
                while (l<r && nums[r]==nums[r-1]) r--;
                l++; r--;
            } else if (s < 0) l++;
            else r--;
        }
    }
    return result;
}`,
            java: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length-2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i+1, r = nums.length-1;
        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];
            if (s == 0) {
                result.add(Arrays.asList(nums[i], nums[l], nums[r]));
                while (l<r && nums[l]==nums[l+1]) l++;
                while (l<r && nums[r]==nums[r-1]) r--;
                l++; r--;
            } else if (s < 0) l++;
            else r--;
        }
    }
    return result;
}`
          }
        },
        keyInsight: "Pattern extends to 4Sum, kSum: each extra element adds one more outer loop. Sort + fix + two pointer on rest.",
        template: {
          python: `nums.sort()
for i in range(n-2):
    if i > 0 and nums[i] == nums[i-1]: continue
    l, r = i+1, n-1
    while l < r:
        # two pointer logic`,
          cpp: `sort(nums.begin(), nums.end());
for (int i = 0; i < n-2; i++) {
    if (i > 0 && nums[i] == nums[i-1]) continue;
    int l = i+1, r = n-1;
    while (l < r) {
        // two pointer logic
    }
}`,
          java: `Arrays.sort(nums);
for (int i = 0; i < n-2; i++) {
    if (i > 0 && nums[i] == nums[i-1]) continue;
    int l = i+1, r = n-1;
    while (l < r) {
        // two pointer logic
    }
}`
        }
      },
      {
        day: "Wed — Fast-Slow Pointer",
        where: "In-place array modification: removing elements, partitioning, sorting colors.",
        when: "When you need to separate or partition elements without extra space. Slow marks valid boundary, fast scans ahead.",
        what: "Slow pointer tracks where the next valid element goes. Fast pointer scans every element. When fast finds something valid, place it at slow's position and advance slow.",
        example: {
          title: "Sort Colors (Dutch National Flag)",
          explanation: "3-way partition: [0..low-1]=0s, [low..mid-1]=1s, [high+1..n-1]=2s. mid scans the unknown region. Swap based on which bucket current element belongs to.",
          code: {
            python: `def sortColors(nums):
    low, mid, high = 0, 0, len(nums)-1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1`,
            cpp: `void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size()-1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low++], nums[mid++]);
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high--]);
        }
    }
}`,
            java: `public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length-1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            int tmp = nums[low]; nums[low]=nums[mid]; nums[mid]=tmp;
            low++; mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            int tmp = nums[mid]; nums[mid]=nums[high]; nums[high]=tmp;
            high--;
        }
    }
}`
          }
        },
        keyInsight: "Don't increment mid when swapping with high — the swapped element is unseen and needs checking.",
        template: {
          python: `slow = 0
for fast in range(n):
    if nums[fast] is valid:
        nums[slow], nums[fast] = nums[fast], nums[slow]
        slow += 1`,
          cpp: `int slow = 0;
for (int fast = 0; fast < n; fast++) {
    if (isValid(nums[fast])) {
        swap(nums[slow++], nums[fast]);
    }
}`,
          java: `int slow = 0;
for (int fast = 0; fast < n; fast++) {
    if (isValid(nums[fast])) {
        int tmp = nums[slow]; nums[slow]=nums[fast]; nums[fast]=tmp;
        slow++;
    }
}`
        }
      },
      {
        day: "Thu — Medium Problems",
        where: "Greedy pairing problems where you need to match elements from both ends.",
        when: "Sort + pair lightest with heaviest. If they fit together → both placed. Else → heaviest goes alone.",
        what: "Sort the array. Use two pointers from both ends. At each step greedily try to pair the two extremes. The heavier element always gets placed (move r). The lighter only gets placed if it fits.",
        example: {
          title: "Boats to Save People",
          explanation: "Sort people by weight. Heaviest person always takes a boat (r always decrements). Lightest person joins if they fit within limit. This greedy choice is always optimal.",
          code: {
            python: `def numRescueBoats(people, limit):
    people.sort()
    l, r = 0, len(people)-1
    boats = 0
    while l <= r:
        if people[l] + people[r] <= limit:
            l += 1  # lightest can join
        r -= 1      # heaviest always takes a boat
        boats += 1
    return boats`,
            cpp: `int numRescueBoats(vector<int>& people, int limit) {
    sort(people.begin(), people.end());
    int l = 0, r = people.size()-1, boats = 0;
    while (l <= r) {
        if (people[l] + people[r] <= limit)
            l++;
        r--;
        boats++;
    }
    return boats;
}`,
            java: `public int numRescueBoats(int[] people, int limit) {
    Arrays.sort(people);
    int l = 0, r = people.length-1, boats = 0;
    while (l <= r) {
        if (people[l] + people[r] <= limit)
            l++;
        r--;
        boats++;
    }
    return boats;
}`
          }
        },
        keyInsight: "When you see 'pairs + constraint + sorted' → think greedy two pointer from both ends.",
        template: {
          python: `arr.sort()
l, r = 0, n-1
while l <= r:
    if can_pair(arr[l], arr[r]):
        l += 1
    r -= 1`,
          cpp: `sort(arr.begin(), arr.end());
int l = 0, r = n-1;
while (l <= r) {
    if (canPair(arr[l], arr[r])) l++;
    r--;
}`,
          java: `Arrays.sort(arr);
int l = 0, r = n-1;
while (l <= r) {
    if (canPair(arr[l], arr[r])) l++;
    r--;
}`
        }
      },
      {
        day: "Fri — Trapping Rain Water",
        where: "Problems where each position's value depends on the maximum seen so far from both sides.",
        when: "When you need left-max and right-max at every position. Two pointer approach avoids O(n) extra space.",
        what: "Water at position i = min(maxLeft, maxRight) - height[i]. Process whichever side has smaller max — that side's answer is fully determined because there's a taller wall on the other side.",
        example: {
          title: "Trapping Rain Water",
          explanation: "If height[l] <= height[r]: maxL is the bottleneck for column l (we know right side has something >= maxL). So water[l] = maxL - height[l]. Move l forward. Mirror logic for right.",
          code: {
            python: `def trap(height):
    l, r = 0, len(height)-1
    maxL = maxR = water = 0
    while l < r:
        if height[l] <= height[r]:
            if height[l] >= maxL: maxL = height[l]
            else: water += maxL - height[l]
            l += 1
        else:
            if height[r] >= maxR: maxR = height[r]
            else: water += maxR - height[r]
            r -= 1
    return water`,
            cpp: `int trap(vector<int>& height) {
    int l = 0, r = height.size()-1;
    int maxL = 0, maxR = 0, water = 0;
    while (l < r) {
        if (height[l] <= height[r]) {
            if (height[l] >= maxL) maxL = height[l];
            else water += maxL - height[l];
            l++;
        } else {
            if (height[r] >= maxR) maxR = height[r];
            else water += maxR - height[r];
            r--;
        }
    }
    return water;
}`,
            java: `public int trap(int[] height) {
    int l = 0, r = height.length-1;
    int maxL = 0, maxR = 0, water = 0;
    while (l < r) {
        if (height[l] <= height[r]) {
            if (height[l] >= maxL) maxL = height[l];
            else water += maxL - height[l];
            l++;
        } else {
            if (height[r] >= maxR) maxR = height[r];
            else water += maxR - height[r];
            r--;
        }
    }
    return water;
}`
          }
        },
        keyInsight: "Process the side with smaller max — its answer is determined. The other side guarantees a wall tall enough.",
        template: {
          python: `l, r = 0, n-1
maxL = maxR = 0
while l < r:
    if height[l] <= height[r]:
        maxL = max(maxL, height[l])
        water += maxL - height[l]
        l += 1
    else:
        maxR = max(maxR, height[r])
        water += maxR - height[r]
        r -= 1`,
          cpp: `int l = 0, r = n-1, maxL = 0, maxR = 0;
while (l < r) {
    if (height[l] <= height[r]) {
        maxL = max(maxL, height[l]);
        water += maxL - height[l]; l++;
    } else {
        maxR = max(maxR, height[r]);
        water += maxR - height[r]; r--;
    }
}`,
          java: `int l = 0, r = n-1, maxL = 0, maxR = 0;
while (l < r) {
    if (height[l] <= height[r]) {
        maxL = Math.max(maxL, height[l]);
        water += maxL - height[l]; l++;
    } else {
        maxR = Math.max(maxR, height[r]);
        water += maxR - height[r]; r--;
    }
}`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review all 4 two-pointer patterns and when each applies.",
        when: "Use this day to solidify pattern recognition — not just memorizing code but knowing WHICH pattern to reach for.",
        what: "4 patterns: (1) Opposite ends for sorted pairs. (2) Fix + two pointer for triplets. (3) Fast-slow for in-place partition. (4) Greedy two pointer for min/max pairing.",
        example: {
          title: "Pattern Decision Tree",
          explanation: "Each pattern has a trigger. Sorted + find pairs → opposite ends. Find triplets → fix one + two pointer. Remove/partition in-place → fast-slow. Match min with max → greedy.",
          code: {
            python: `# Pattern 1: Sorted pairs
l, r = 0, n-1  # move based on sum vs target

# Pattern 2: Triplets (fix + two pointer)
sort → fix i → l,r = i+1, n-1

# Pattern 3: Partition (fast-slow)
slow = 0
for fast in range(n):
    if valid: swap, slow++

# Pattern 4: Greedy pairing
sort → l=0, r=n-1 → pair min+max`,
            cpp: `// Pattern 1: Sorted pairs
int l=0, r=n-1; // move based on sum vs target

// Pattern 2: Triplets
sort → fix i → l=i+1, r=n-1

// Pattern 3: Partition
int slow=0;
for(int fast=0;fast<n;fast++)
    if(valid) swap(arr[slow++],arr[fast]);

// Pattern 4: Greedy
sort → l=0,r=n-1 → pair min+max`,
            java: `// Pattern 1: Sorted pairs
int l=0, r=n-1; // move based on sum vs target

// Pattern 2: Triplets
Arrays.sort → fix i → l=i+1, r=n-1

// Pattern 3: Partition
int slow=0;
for(int fast=0;fast<n;fast++)
    if(valid) swap(arr,slow++,fast);

// Pattern 4: Greedy
Arrays.sort → l=0,r=n-1 → pair min+max`
          }
        },
        keyInsight: "Two pointer only works when moving in one direction is ALWAYS correct. This requires sorted input or a monotone property.",
        template: {
          python: `# Decision:
# → find pairs with sum? → opposite ends (sorted)
# → find triplets? → fix + two pointer
# → remove/partition? → fast-slow
# → match min+max? → greedy two pointer`,
          cpp: `// Decision:
// → find pairs with sum? → opposite ends (sorted)
// → find triplets? → fix + two pointer
// → remove/partition? → fast-slow
// → match min+max? → greedy two pointer`,
          java: `// Decision:
// → find pairs with sum? → opposite ends (sorted)
// → find triplets? → fix + two pointer
// → remove/partition? → fast-slow
// → match min+max? → greedy two pointer`
        }
      },
      {
        day: "Sun — Mock",
        where: "Mock interview simulation — apply patterns under time pressure.",
        when: "Practice identifying the right pattern within 2-3 minutes, then coding it cleanly.",
        what: "Before coding: state your approach out loud. Mention why you sorted, which pattern you're using, and the time/space complexity.",
        example: {
          title: "Interview Communication Template",
          explanation: "Interviewers value pattern recognition and clear communication as much as the code itself. Always explain your thinking before typing.",
          code: {
            python: `# Step 1: Clarify
# "Is the array sorted? Can I sort it?"

# Step 2: State pattern
# "Since it's sorted, I'll use two pointers
#  to find the pair in O(n) instead of O(n²)"

# Step 3: Handle edge cases first
# Empty array, single element, all same

# Step 4: Code + dry run
# Trace through one example while coding`,
            cpp: `// Step 1: Clarify
// "Is the array sorted? Can I sort it?"

// Step 2: State pattern
// "Since it's sorted, I'll use two pointers
//  to find the pair in O(n) instead of O(n²)"

// Step 3: Handle edge cases first
// Empty array, single element, all same

// Step 4: Code + dry run
// Trace through one example while coding`,
            java: `// Step 1: Clarify
// "Is the array sorted? Can I sort it?"

// Step 2: State pattern
// "Since it's sorted, I'll use two pointers
//  to find the pair in O(n) instead of O(n²)"

// Step 3: Handle edge cases first
// Empty array, single element, all same

// Step 4: Code + dry run
// Trace through one example while coding`
          }
        },
        keyInsight: "Two pointer reduces O(n²) to O(n) for pair problems. Always worth mentioning in interviews — shows you know the WHY.",
        template: {
          python: `# Before coding, say:
# "I notice this array can be sorted.
#  That enables two pointers → O(n) solution.
#  Time: O(n log n) sort + O(n) scan = O(n log n)
#  Space: O(1) extra"`,
          cpp: `// Before coding, say:
// "I notice this array can be sorted.
//  That enables two pointers → O(n) solution.
//  Time: O(n log n) sort + O(n) scan = O(n log n)
//  Space: O(1) extra"`,
          java: `// Before coding, say:
// "I notice this array can be sorted.
//  That enables two pointers -> O(n) solution.
//  Time: O(n log n) sort + O(n) scan = O(n log n)
//  Space: O(1) extra"`
        }
      }
    ]
  },

  2: {
    title: "Prefix Sum",
    tagline: "Precompute once, answer range queries in O(1) forever.",
    days: [
      {
        day: "Mon — 1D Prefix Basics",
        where: "Any problem involving sum of a contiguous subarray or range [l, r].",
        when: "When you need to answer multiple range sum queries, or when you see nested loops over ranges in brute force.",
        what: "Build an array prefix[] where prefix[i] = sum of all elements from index 0 to i-1. Then sum of range [l, r] = prefix[r+1] - prefix[l]. O(n) to build, O(1) per query.",
        example: {
          title: "Range Sum Query",
          explanation: "prefix[0]=0 is a sentinel that handles l=0 without a special case. prefix[i+1] = prefix[i] + nums[i]. Query [l,r] = prefix[r+1] - prefix[l].",
          code: {
            python: `def buildPrefix(nums):
    n = len(nums)
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i+1] = prefix[i] + nums[i]
    return prefix

def rangeSum(prefix, l, r):
    return prefix[r+1] - prefix[l]

# Example:
# nums   = [1,  3,  5,  7,  9]
# prefix = [0,  1,  4,  9, 16, 25]
# sum[1..3] = prefix[4]-prefix[1] = 16-1 = 15`,
            cpp: `vector<int> buildPrefix(vector<int>& nums) {
    int n = nums.size();
    vector<int> prefix(n+1, 0);
    for (int i = 0; i < n; i++)
        prefix[i+1] = prefix[i] + nums[i];
    return prefix;
}

int rangeSum(vector<int>& prefix, int l, int r) {
    return prefix[r+1] - prefix[l];
}`,
            java: `int[] buildPrefix(int[] nums) {
    int n = nums.length;
    int[] prefix = new int[n+1];
    for (int i = 0; i < n; i++)
        prefix[i+1] = prefix[i] + nums[i];
    return prefix;
}

int rangeSum(int[] prefix, int l, int r) {
    return prefix[r+1] - prefix[l];
}`
          }
        },
        keyInsight: "Always build prefix with size n+1 and prefix[0]=0. This removes the edge case when l=0.",
        template: {
          python: `prefix = [0] * (n+1)
for i in range(n):
    prefix[i+1] = prefix[i] + nums[i]
# Query [l, r]:
total = prefix[r+1] - prefix[l]`,
          cpp: `vector<int> prefix(n+1, 0);
for (int i = 0; i < n; i++)
    prefix[i+1] = prefix[i] + nums[i];
// Query [l, r]:
int total = prefix[r+1] - prefix[l];`,
          java: `int[] prefix = new int[n+1];
for (int i = 0; i < n; i++)
    prefix[i+1] = prefix[i] + nums[i];
// Query [l, r]:
int total = prefix[r+1] - prefix[l];`
        }
      },
      {
        day: "Tue — Prefix + HashMap",
        where: "Counting or finding subarrays with a specific sum, average, or property.",
        when: "When brute force checks all subarrays O(n²). Prefix + hashmap finds subarrays with target sum in O(n).",
        what: "Store prefix sums in a hashmap. At index j, if prefix[j] - k exists in map, then some subarray ending at j sums to k. seen={0:1} handles subarrays starting from index 0.",
        example: {
          title: "Subarray Sum Equals K",
          explanation: "seen={0:1} is crucial — it handles the case where prefix itself equals k (subarray from start). For each position: check if prefix-k was seen before, then store current prefix.",
          code: {
            python: `def subarraySum(nums, k):
    count = 0
    prefix = 0
    seen = {0: 1}  # prefix_sum → frequency
    for num in nums:
        prefix += num
        count += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return count`,
            cpp: `int subarraySum(vector<int>& nums, int k) {
    int count = 0, prefix = 0;
    unordered_map<int,int> seen;
    seen[0] = 1;
    for (int num : nums) {
        prefix += num;
        if (seen.count(prefix - k))
            count += seen[prefix - k];
        seen[prefix]++;
    }
    return count;
}`,
            java: `public int subarraySum(int[] nums, int k) {
    int count = 0, prefix = 0;
    Map<Integer,Integer> seen = new HashMap<>();
    seen.put(0, 1);
    for (int num : nums) {
        prefix += num;
        count += seen.getOrDefault(prefix - k, 0);
        seen.put(prefix, seen.getOrDefault(prefix, 0) + 1);
    }
    return count;
}`
          }
        },
        keyInsight: "seen = {0: 1} is the most important line. Without it, subarrays starting at index 0 are missed.",
        template: {
          python: `prefix = 0
seen = {0: 1}
for num in nums:
    prefix += num
    result += seen.get(prefix - target, 0)
    seen[prefix] = seen.get(prefix, 0) + 1`,
          cpp: `int prefix = 0;
unordered_map<int,int> seen; seen[0]=1;
for (int num : nums) {
    prefix += num;
    result += seen.count(prefix-target) ? seen[prefix-target] : 0;
    seen[prefix]++;
}`,
          java: `int prefix = 0;
Map<Integer,Integer> seen = new HashMap<>(); seen.put(0,1);
for (int num : nums) {
    prefix += num;
    result += seen.getOrDefault(prefix-target, 0);
    seen.put(prefix, seen.getOrDefault(prefix,0)+1);
}`
        }
      },
      {
        day: "Wed — 2D Prefix Sum",
        where: "Grid/matrix problems requiring sum of rectangular regions.",
        when: "When you need to query the sum of any submatrix multiple times. O(m*n) build, O(1) per query.",
        what: "prefix[i][j] = sum of rectangle from (0,0) to (i-1,j-1). Build using inclusion-exclusion. Query any rectangle using 4 prefix values.",
        example: {
          title: "Range Sum Query 2D",
          explanation: "Build: prefix[i][j] = matrix value + top + left - top-left (inclusion-exclusion). Query (r1,c1)→(r2,c2): big - top - left + corner. Draw it on paper to visualize.",
          code: {
            python: `def buildPrefix2D(matrix):
    m, n = len(matrix), len(matrix[0])
    p = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            p[i][j] = (matrix[i-1][j-1]
                      + p[i-1][j] + p[i][j-1]
                      - p[i-1][j-1])
    return p

def query(p, r1, c1, r2, c2):
    return (p[r2+1][c2+1] - p[r1][c2+1]
            - p[r2+1][c1] + p[r1][c1])`,
            cpp: `vector<vector<int>> buildPrefix2D(vector<vector<int>>& mat) {
    int m=mat.size(), n=mat[0].size();
    vector<vector<int>> p(m+1, vector<int>(n+1,0));
    for(int i=1;i<=m;i++)
        for(int j=1;j<=n;j++)
            p[i][j]=mat[i-1][j-1]+p[i-1][j]+p[i][j-1]-p[i-1][j-1];
    return p;
}
int query(vector<vector<int>>& p,int r1,int c1,int r2,int c2){
    return p[r2+1][c2+1]-p[r1][c2+1]-p[r2+1][c1]+p[r1][c1];
}`,
            java: `int[][] buildPrefix2D(int[][] mat) {
    int m=mat.length, n=mat[0].length;
    int[][] p = new int[m+1][n+1];
    for(int i=1;i<=m;i++)
        for(int j=1;j<=n;j++)
            p[i][j]=mat[i-1][j-1]+p[i-1][j]+p[i][j-1]-p[i-1][j-1];
    return p;
}
int query(int[][] p,int r1,int c1,int r2,int c2){
    return p[r2+1][c2+1]-p[r1][c2+1]-p[r2+1][c1]+p[r1][c1];
}`
          }
        },
        keyInsight: "Draw 4 rectangles on paper. Add big, subtract two sides, add corner back (it was subtracted twice).",
        template: {
          python: `# Build:
p[i][j] = mat[i-1][j-1] + p[i-1][j] + p[i][j-1] - p[i-1][j-1]
# Query (r1,c1)→(r2,c2):
p[r2+1][c2+1] - p[r1][c2+1] - p[r2+1][c1] + p[r1][c1]`,
          cpp: `// Build:
p[i][j]=mat[i-1][j-1]+p[i-1][j]+p[i][j-1]-p[i-1][j-1];
// Query:
p[r2+1][c2+1]-p[r1][c2+1]-p[r2+1][c1]+p[r1][c1];`,
          java: `// Build:
p[i][j]=mat[i-1][j-1]+p[i-1][j]+p[i][j-1]-p[i-1][j-1];
// Query:
p[r2+1][c2+1]-p[r1][c2+1]-p[r2+1][c1]+p[r1][c1];`
        }
      },
      {
        day: "Thu — Difference Array",
        where: "Problems with multiple range update operations followed by a single read of the final array.",
        when: "When you need to add a value to all elements in range [l,r] many times, then read final array. O(1) per update vs O(n) per update without it.",
        what: "diff[i] = arr[i] - arr[i-1]. To add v to range [l,r]: diff[l]+=v, diff[r+1]-=v. Take prefix sum of diff to get final array.",
        example: {
          title: "Car Pooling",
          explanation: "People get in at 'from' stop and out at 'to' stop. diff[from]+=passengers, diff[to]-=passengers. Prefix sum of diff = people in car at each stop.",
          code: {
            python: `def carPooling(trips, capacity):
    diff = [0] * 1001
    for passengers, start, end in trips:
        diff[start] += passengers
        diff[end] -= passengers
    current = 0
    for i in range(1001):
        current += diff[i]
        if current > capacity:
            return False
    return True`,
            cpp: `bool carPooling(vector<vector<int>>& trips, int capacity) {
    vector<int> diff(1001, 0);
    for (auto& t : trips) {
        diff[t[1]] += t[0];
        diff[t[2]] -= t[0];
    }
    int current = 0;
    for (int i = 0; i < 1001; i++) {
        current += diff[i];
        if (current > capacity) return false;
    }
    return true;
}`,
            java: `public boolean carPooling(int[][] trips, int capacity) {
    int[] diff = new int[1001];
    for (int[] t : trips) {
        diff[t[1]] += t[0];
        diff[t[2]] -= t[0];
    }
    int current = 0;
    for (int i = 0; i < 1001; i++) {
        current += diff[i];
        if (current > capacity) return false;
    }
    return true;
}`
          }
        },
        keyInsight: "Difference array = lazy range update. Perfect when many updates happen before any reads.",
        template: {
          python: `diff = [0] * (n+2)
# Add v to [l, r]:
diff[l] += v
diff[r+1] -= v
# Get final array:
for i in range(1, n):
    diff[i] += diff[i-1]`,
          cpp: `vector<int> diff(n+2, 0);
// Add v to [l, r]:
diff[l] += v; diff[r+1] -= v;
// Get final array:
for (int i = 1; i < n; i++)
    diff[i] += diff[i-1];`,
          java: `int[] diff = new int[n+2];
// Add v to [l, r]:
diff[l] += v; diff[r+1] -= v;
// Get final array:
for (int i = 1; i < n; i++)
    diff[i] += diff[i-1];`
        }
      },
      {
        day: "Fri — Product Except Self",
        where: "Problems where you need a combined value from both sides of each element without using the element itself.",
        when: "When division is not allowed. Left-right pass pattern avoids O(n²) brute force and uses O(1) extra space.",
        what: "result[i] = (product of all elements left of i) × (product of all elements right of i). First pass fills left products into result. Second pass multiplies right products on the fly.",
        example: {
          title: "Product of Array Except Self",
          explanation: "Pass 1: result[i] = product of everything to its left (prefix product). Pass 2: multiply each result[i] by running suffix product from right. No division, O(1) extra space.",
          code: {
            python: `def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n
    # Left products
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    # Multiply right products
    suffix = 1
    for i in range(n-1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    return result`,
            cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = n-1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}`,
            java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, 1);
    int prefix = 1;
    for (int i = 0; i < n; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }
    int suffix = 1;
    for (int i = n-1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}`
          }
        },
        keyInsight: "Two-pass: left products in result → right products multiplied in-place on second pass. O(n) time, O(1) extra space.",
        template: {
          python: `result = [1] * n
prefix = 1
for i in range(n):
    result[i] = prefix; prefix *= nums[i]
suffix = 1
for i in range(n-1, -1, -1):
    result[i] *= suffix; suffix *= nums[i]`,
          cpp: `vector<int> result(n, 1);
int prefix = 1;
for(int i=0;i<n;i++){result[i]=prefix;prefix*=nums[i];}
int suffix = 1;
for(int i=n-1;i>=0;i--){result[i]*=suffix;suffix*=nums[i];}`,
          java: `int[] result = new int[n]; Arrays.fill(result,1);
int prefix=1;
for(int i=0;i<n;i++){result[i]=prefix;prefix*=nums[i];}
int suffix=1;
for(int i=n-1;i>=0;i--){result[i]*=suffix;suffix*=nums[i];}`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review all 4 prefix sum patterns.",
        when: "Consolidate understanding before the mock tomorrow.",
        what: "4 patterns: (1) 1D prefix for range queries. (2) Prefix + hashmap for subarray counts. (3) 2D prefix for rectangle sums. (4) Difference array for range updates.",
        example: {
          title: "Pattern Summary",
          explanation: "Each pattern converts an O(n²) or O(n*q) solution to O(n) or O(1) per operation. Recognize by what operation you're doing repeatedly.",
          code: {
            python: `# Pattern 1: Range sum query
prefix[r+1] - prefix[l]

# Pattern 2: Subarray sum = k
seen = {0:1}; count += seen[prefix-k]

# Pattern 3: 2D rectangle sum
inclusion-exclusion with 4 prefix values

# Pattern 4: Range update → read
diff[l]+=v; diff[r+1]-=v → prefix sum`,
            cpp: `// Pattern 1: Range sum query
prefix[r+1] - prefix[l]
// Pattern 2: Subarray sum = k
seen[0]=1; count += seen[prefix-k]
// Pattern 3: 2D rectangle sum
p[r2+1][c2+1]-p[r1][c2+1]-p[r2+1][c1]+p[r1][c1]
// Pattern 4: Range update → read
diff[l]+=v; diff[r+1]-=v → prefix sum`,
            java: `// Pattern 1: Range sum query
prefix[r+1] - prefix[l]
// Pattern 2: Subarray sum = k
seen.put(0,1); count += seen.getOrDefault(prefix-k,0)
// Pattern 3: 2D rectangle sum
p[r2+1][c2+1]-p[r1][c2+1]-p[r2+1][c1]+p[r1][c1]
// Pattern 4: Range update → read
diff[l]+=v; diff[r+1]-=v → prefix sum`
          }
        },
        keyInsight: "Prefix sum = precomputation tradeoff. Spend O(n) once to make future operations O(1).",
        template: {
          python: `# Trigger words:
# "sum of range [l,r]" → 1D prefix
# "count subarrays with sum k" → prefix+hash
# "sum of rectangle" → 2D prefix
# "add v to range, read later" → diff array`,
          cpp: `// Trigger words:
// "sum of range [l,r]" → 1D prefix
// "count subarrays with sum k" → prefix+hash
// "sum of rectangle" → 2D prefix
// "add v to range, read later" → diff array`,
          java: `// Trigger words:
// "sum of range [l,r]" → 1D prefix
// "count subarrays with sum k" → prefix+hash
// "sum of rectangle" → 2D prefix
// "add v to range, read later" → diff array`
        }
      },
      {
        day: "Sun — Mock",
        where: "Apply prefix sum pattern recognition under time pressure.",
        when: "When brute force has nested loops over ranges — prefix sum likely reduces to O(n).",
        what: "Identify the trigger words. Choose the right pattern. Code the template. Handle edge cases (empty array, l=0, etc.).",
        example: {
          title: "Interview Recognition Guide",
          explanation: "Prefix sum is often the 'aha' insight that takes O(n²) to O(n). Mention it proactively when you see range/subarray queries.",
          code: {
            python: `# If brute force = nested loop over ranges:
for i in range(n):
    for j in range(i, n):
        # O(n²) → think prefix sum!

# Mention in interview:
# "I'll precompute prefix sums → O(n) build
#  then each query is O(1)"`,
            cpp: `// If brute force = nested loop:
for(int i=0;i<n;i++)
    for(int j=i;j<n;j++)
        // O(n²) → think prefix sum!

// Say in interview:
// "I'll precompute prefix sums.
//  O(n) build, O(1) per query."`,
            java: `// If brute force = nested loop:
for(int i=0;i<n;i++)
    for(int j=i;j<n;j++)
        // O(n²) → think prefix sum!

// Say in interview:
// "I'll precompute prefix sums.
//  O(n) build, O(1) per query."`
          }
        },
        keyInsight: "If you see O(n²) from nested range loops → prefix sum almost always reduces it to O(n).",
        template: {
          python: `# Before coding, say:
# "I see repeated range sum queries.
#  Precomputing prefix sums gives O(1) per query.
#  Total: O(n) time, O(n) space."`,
          cpp: `// Before coding, say:
// "I see repeated range sum queries.
//  Precomputing prefix sums = O(1) per query.
//  Total: O(n) time, O(n) space."`,
          java: `// Before coding, say:
// "I see repeated range sum queries.
//  Precomputing prefix sums = O(1) per query.
//  Total: O(n) time, O(n) space."`
        }
      }
    ]
  },

  3: {
    title: "Binary Search",
    tagline: "If you can check a condition in O(1), binary search finds the answer in O(log n).",
    days: [
      {
        day: "Mon — Classic Binary Search",
        where: "Searching for an element in a sorted array.",
        when: "When the array is sorted and you need to find an element or check existence. O(log n) vs O(n) linear scan.",
        what: "Maintain [lo, hi] search range. At each step compute mid = lo+(hi-lo)//2. Compare nums[mid] with target. Eliminate half the range each step.",
        example: {
          title: "Binary Search",
          explanation: "lo+(hi-lo)//2 avoids integer overflow (important in Java/C++). Loop runs while lo<=hi. When lo>hi, element not found.",
          code: {
            python: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if nums[mid] == target: return mid
        elif nums[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`,
            cpp: `int search(vector<int>& nums, int target) {
    int lo = 0, hi = nums.size()-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) lo = mid+1;
        else hi = mid-1;
    }
    return -1;
}`,
            java: `public int search(int[] nums, int target) {
    int lo = 0, hi = nums.length-1;
    while (lo <= hi) {
        int mid = lo + (hi-lo)/2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) lo = mid+1;
        else hi = mid-1;
    }
    return -1;
}`
          }
        },
        keyInsight: "Always write mid = lo+(hi-lo)//2, never (lo+hi)//2. Prevents integer overflow.",
        template: {
          python: `lo, hi = 0, n-1
while lo <= hi:
    mid = lo + (hi-lo)//2
    if nums[mid] == target: return mid
    elif nums[mid] < target: lo = mid+1
    else: hi = mid-1
return -1`,
          cpp: `int lo=0, hi=n-1;
while(lo<=hi){
    int mid=lo+(hi-lo)/2;
    if(nums[mid]==target) return mid;
    else if(nums[mid]<target) lo=mid+1;
    else hi=mid-1;
}
return -1;`,
          java: `int lo=0, hi=n-1;
while(lo<=hi){
    int mid=lo+(hi-lo)/2;
    if(nums[mid]==target) return mid;
    else if(nums[mid]<target) lo=mid+1;
    else hi=mid-1;
}
return -1;`
        }
      },
      {
        day: "Tue — Rotated Array + Peak",
        where: "Sorted array that has been rotated at some pivot, or finding local maxima.",
        when: "When the array is 'almost sorted' — rotated or has a single peak. Standard binary search needs modification.",
        what: "In a rotated array, one half is always fully sorted. Check which half is sorted using nums[lo]<=nums[mid]. Then determine which half contains your target.",
        example: {
          title: "Search in Rotated Sorted Array",
          explanation: "At least one half is ALWAYS sorted. Check left half first (nums[lo]<=nums[mid]). If target is in the sorted half, go there. Otherwise go to the other half.",
          code: {
            python: `def search(nums, target):
    lo, hi = 0, len(nums)-1
    while lo <= hi:
        mid = lo + (hi-lo)//2
        if nums[mid] == target: return mid
        if nums[lo] <= nums[mid]:  # left sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid-1
            else:
                lo = mid+1
        else:                       # right sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid+1
            else:
                hi = mid-1
    return -1`,
            cpp: `int search(vector<int>& nums, int target) {
    int lo=0, hi=nums.size()-1;
    while(lo<=hi){
        int mid=lo+(hi-lo)/2;
        if(nums[mid]==target) return mid;
        if(nums[lo]<=nums[mid]){
            if(nums[lo]<=target && target<nums[mid]) hi=mid-1;
            else lo=mid+1;
        } else {
            if(nums[mid]<target && target<=nums[hi]) lo=mid+1;
            else hi=mid-1;
        }
    }
    return -1;
}`,
            java: `public int search(int[] nums, int target) {
    int lo=0, hi=nums.length-1;
    while(lo<=hi){
        int mid=lo+(hi-lo)/2;
        if(nums[mid]==target) return mid;
        if(nums[lo]<=nums[mid]){
            if(nums[lo]<=target && target<nums[mid]) hi=mid-1;
            else lo=mid+1;
        } else {
            if(nums[mid]<target && target<=nums[hi]) lo=mid+1;
            else hi=mid-1;
        }
    }
    return -1;
}`
          }
        },
        keyInsight: "One half is ALWAYS sorted in a rotated array. Check that first, then decide direction.",
        template: {
          python: `if nums[lo] <= nums[mid]:  # left sorted
    if nums[lo] <= target < nums[mid]: hi=mid-1
    else: lo=mid+1
else:                          # right sorted
    if nums[mid] < target <= nums[hi]: lo=mid+1
    else: hi=mid-1`,
          cpp: `if(nums[lo]<=nums[mid]){ // left sorted
    if(nums[lo]<=target&&target<nums[mid]) hi=mid-1;
    else lo=mid+1;
} else { // right sorted
    if(nums[mid]<target&&target<=nums[hi]) lo=mid+1;
    else hi=mid-1;
}`,
          java: `if(nums[lo]<=nums[mid]){ // left sorted
    if(nums[lo]<=target&&target<nums[mid]) hi=mid-1;
    else lo=mid+1;
} else { // right sorted
    if(nums[mid]<target&&target<=nums[hi]) lo=mid+1;
    else hi=mid-1;
}`
        }
      },
      {
        day: "Wed — Binary Search on Answer",
        where: "Optimization problems asking for minimum/maximum value satisfying a constraint.",
        when: "When you can write a check(x) function and the answer space is monotone (False...False...True...True).",
        what: "Don't search in the array — search in the ANSWER SPACE. Define lo=min_possible, hi=max_possible. Use check(mid) to decide direction. Find first True or last True.",
        example: {
          title: "Koko Eating Bananas",
          explanation: "Can Koko eat all bananas at speed k in h hours? check(k) = sum(ceil(pile/k)) <= h. Answer space: [1, max(piles)]. Find minimum k where check(k) is True.",
          code: {
            python: `def minEatingSpeed(piles, h):
    def canFinish(speed):
        return sum((p+speed-1)//speed for p in piles) <= h
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = lo + (hi-lo)//2
        if canFinish(mid): hi = mid   # try slower
        else: lo = mid+1              # need faster
    return lo`,
            cpp: `int minEatingSpeed(vector<int>& piles, int h) {
    auto canFinish = [&](int speed) {
        int hours = 0;
        for(int p:piles) hours += (p+speed-1)/speed;
        return hours <= h;
    };
    int lo=1, hi=*max_element(piles.begin(),piles.end());
    while(lo<hi){
        int mid=lo+(hi-lo)/2;
        if(canFinish(mid)) hi=mid;
        else lo=mid+1;
    }
    return lo;
}`,
            java: `public int minEatingSpeed(int[] piles, int h) {
    int lo=1, hi=0;
    for(int p:piles) hi=Math.max(hi,p);
    while(lo<hi){
        int mid=lo+(hi-lo)/2;
        int hours=0;
        for(int p:piles) hours+=(p+mid-1)/mid;
        if(hours<=h) hi=mid;
        else lo=mid+1;
    }
    return lo;
}`
          }
        },
        keyInsight: "Binary search works on any monotone answer space, not just arrays. Ask: is the answer space False...False...True...True?",
        template: {
          python: `lo, hi = min_possible, max_possible
while lo < hi:
    mid = lo + (hi-lo)//2
    if check(mid): hi = mid      # works, try smaller
    else: lo = mid+1             # fails, need bigger
return lo  # first position where check=True`,
          cpp: `int lo=min_val, hi=max_val;
while(lo<hi){
    int mid=lo+(hi-lo)/2;
    if(check(mid)) hi=mid;
    else lo=mid+1;
}
return lo;`,
          java: `int lo=minVal, hi=maxVal;
while(lo<hi){
    int mid=lo+(hi-lo)/2;
    if(check(mid)) hi=mid;
    else lo=mid+1;
}
return lo;`
        }
      },
      {
        day: "Thu — Matrix Binary Search",
        where: "2D matrices where rows and/or columns are sorted.",
        when: "When matrix is fully sorted (treat as 1D) or row+col sorted (staircase search).",
        what: "Fully sorted matrix: map index i to row=i//cols, col=i%cols, then standard binary search. Row+col sorted: start at top-right, go left if too big, down if too small.",
        example: {
          title: "Search a 2D Matrix II (Staircase)",
          explanation: "Top-right corner is unique: left=smaller, down=larger. Each step eliminates a full row or column. O(m+n) not O(m*n).",
          code: {
            python: `def searchMatrix(matrix, target):
    row, col = 0, len(matrix[0])-1
    while row < len(matrix) and col >= 0:
        if matrix[row][col] == target: return True
        elif matrix[row][col] > target: col -= 1
        else: row += 1
    return False`,
            cpp: `bool searchMatrix(vector<vector<int>>& matrix, int target) {
    int row=0, col=matrix[0].size()-1;
    while(row<matrix.size() && col>=0){
        if(matrix[row][col]==target) return true;
        else if(matrix[row][col]>target) col--;
        else row++;
    }
    return false;
}`,
            java: `public boolean searchMatrix(int[][] matrix, int target) {
    int row=0, col=matrix[0].length-1;
    while(row<matrix.length && col>=0){
        if(matrix[row][col]==target) return true;
        else if(matrix[row][col]>target) col--;
        else row++;
    }
    return false;
}`
          }
        },
        keyInsight: "Top-right (or bottom-left) is the only corner where you have a unique direction for each comparison.",
        template: {
          python: `# Fully sorted → treat as 1D:
mid_val = matrix[mid//cols][mid%cols]
# Row+col sorted → staircase:
row, col = 0, cols-1
while in_bounds:
    if too_big: col -= 1
    elif too_small: row += 1`,
          cpp: `// Fully sorted → treat as 1D:
int midVal = matrix[mid/cols][mid%cols];
// Staircase:
int row=0, col=cols-1;
while(row<rows&&col>=0){...}`,
          java: `// Fully sorted → treat as 1D:
int midVal = matrix[mid/cols][mid%cols];
// Staircase:
int row=0, col=cols-1;
while(row<rows&&col>=0){...}`
        }
      },
      {
        day: "Fri — Hard Binary Search",
        where: "Problems requiring O(log n) solution where answer depends on multiple sorted structures.",
        when: "When problem has a clear minimum/maximum phrasing and check function is O(n) or less.",
        what: "Median of two sorted arrays: binary search on partition of smaller array. Find split where all left elements <= all right elements.",
        example: {
          title: "Capacity to Ship Packages",
          explanation: "What's the minimum capacity to ship all packages in D days? check(cap): simulate shipping greedily. If current load+weight>cap, start new day. Answer space: [max(weights), sum(weights)].",
          code: {
            python: `def shipWithinDays(weights, days):
    def canShip(cap):
        d, load = 1, 0
        for w in weights:
            if load + w > cap:
                d += 1; load = 0
            load += w
        return d <= days
    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = lo + (hi-lo)//2
        if canShip(mid): hi = mid
        else: lo = mid+1
    return lo`,
            cpp: `int shipWithinDays(vector<int>& weights, int days) {
    auto canShip=[&](int cap){
        int d=1,load=0;
        for(int w:weights){
            if(load+w>cap){d++;load=0;}
            load+=w;
        }
        return d<=days;
    };
    int lo=*max_element(weights.begin(),weights.end());
    int hi=accumulate(weights.begin(),weights.end(),0);
    while(lo<hi){
        int mid=lo+(hi-lo)/2;
        if(canShip(mid)) hi=mid; else lo=mid+1;
    }
    return lo;
}`,
            java: `public int shipWithinDays(int[] weights, int days) {
    int lo=0, hi=0;
    for(int w:weights){lo=Math.max(lo,w);hi+=w;}
    while(lo<hi){
        int mid=lo+(hi-lo)/2, d=1, load=0;
        for(int w:weights){
            if(load+w>mid){d++;load=0;}
            load+=w;
        }
        if(d<=days) hi=mid; else lo=mid+1;
    }
    return lo;
}`
          }
        },
        keyInsight: "Hard BS = define check(x) clearly + find correct [lo,hi] bounds. The bounds are often max(arr) and sum(arr).",
        template: {
          python: `lo, hi = max(arr), sum(arr)  # or problem-specific
while lo < hi:
    mid = lo+(hi-lo)//2
    if check(mid): hi = mid
    else: lo = mid+1
return lo`,
          cpp: `int lo=max_val, hi=sum_val;
while(lo<hi){
    int mid=lo+(hi-lo)/2;
    if(check(mid)) hi=mid; else lo=mid+1;
}
return lo;`,
          java: `int lo=maxVal, hi=sumVal;
while(lo<hi){
    int mid=lo+(hi-lo)/2;
    if(check(mid)) hi=mid; else lo=mid+1;
}
return lo;`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review 3 binary search types.",
        when: "Before mock, solidify which template to use for which problem type.",
        what: "Type 1: exact value in sorted array (lo<=hi). Type 2: first/last True boundary (lo<hi). Type 3: search on abstract answer space (lo<hi with check function).",
        example: {
          title: "3 Templates Side by Side",
          explanation: "lo<=hi finds exact value. lo<hi finds boundary. The difference: lo<hi loop terminates with lo==hi pointing at the answer. lo<=hi terminates with lo>hi meaning not found.",
          code: {
            python: `# Type 1: Find exact value
lo, hi = 0, n-1
while lo <= hi:
    mid = lo+(hi-lo)//2
    if nums[mid]==target: return mid
    elif nums[mid]<target: lo=mid+1
    else: hi=mid-1

# Type 2: Find first True (boundary)
lo, hi = 0, n-1
while lo < hi:
    mid = lo+(hi-lo)//2
    if isValid(mid): hi=mid
    else: lo=mid+1
return lo  # first True

# Type 3: Answer space
lo, hi = min_ans, max_ans
while lo < hi:
    mid = lo+(hi-lo)//2
    if check(mid): hi=mid
    else: lo=mid+1`,
            cpp: `// Type 1: Exact value
int lo=0,hi=n-1;
while(lo<=hi){ /* return mid if found */ }

// Type 2: First True
int lo=0,hi=n-1;
while(lo<hi){
    int mid=lo+(hi-lo)/2;
    if(isValid(mid)) hi=mid; else lo=mid+1;
}
return lo;

// Type 3: Answer space
int lo=minAns,hi=maxAns;
while(lo<hi){
    int mid=lo+(hi-lo)/2;
    if(check(mid)) hi=mid; else lo=mid+1;
}`,
            java: `// Type 1: Exact value
int lo=0,hi=n-1;
while(lo<=hi){ /* return mid if found */ }

// Type 2: First True
int lo=0,hi=n-1;
while(lo<hi){
    int mid=lo+(hi-lo)/2;
    if(isValid(mid)) hi=mid; else lo=mid+1;
}
return lo;

// Type 3: Answer space
int lo=minAns,hi=maxAns;
while(lo<hi){
    int mid=lo+(hi-lo)/2;
    if(check(mid)) hi=mid; else lo=mid+1;
}`
          }
        },
        keyInsight: "lo<=hi → exact search. lo<hi → boundary/answer search. Know which before you start.",
        template: {
          python: `# Decide first:
# Exact value? → lo<=hi, return mid
# Find boundary? → lo<hi, return lo`,
          cpp: `// Decide first:
// Exact value? → lo<=hi, return mid
// Find boundary? → lo<hi, return lo`,
          java: `// Decide first:
// Exact value? → lo<=hi, return mid
// Find boundary? → lo<hi, return lo`
        }
      },
      {
        day: "Sun — Mock",
        where: "Any problem with O(log n) hint or sorted structure.",
        when: "Keywords: minimum X such that, maximum X such that, search in sorted, k-th smallest.",
        what: "Verify monotone property → define bounds → write check → binary search.",
        example: {
          title: "Interview Recognition",
          explanation: "Binary search is recognizable by keywords. The key verification: if check(x) is True, is check(x+1) also True (or False)? If monotone → binary search.",
          code: {
            python: `# Keywords → binary search:
# "minimum X such that..." → find first True
# "maximum X such that..." → find last True
# "search in sorted array" → classic BS
# "k-th smallest in..." → BS on answer

# Verify monotone:
# "If I can finish at speed k,
#  can I finish at speed k+1?" → Yes → monotone`,
            cpp: `// Keywords → binary search:
// "minimum X such that..." → first True
// "maximum X such that..." → last True
// "search in sorted array" → classic BS
// Verify: if check(k) True, is check(k+1) True?`,
            java: `// Keywords → binary search:
// "minimum X such that..." → first True
// "maximum X such that..." → last True
// "search in sorted array" → classic BS
// Verify: if check(k) True, is check(k+1) True?`
          }
        },
        keyInsight: "Binary search = O(log n). Whenever you see sorted structure + search → think binary search first.",
        template: {
          python: `# Before coding:
# 1. What is my search space? [lo, hi]
# 2. What is check(mid)?
# 3. Is it monotone?
# 4. Finding min-True or max-True?`,
          cpp: `// Before coding:
// 1. Search space? [lo, hi]
// 2. check(mid) = ?
// 3. Monotone?
// 4. min-True or max-True?`,
          java: `// Before coding:
// 1. Search space? [lo, hi]
// 2. check(mid) = ?
// 3. Monotone?
// 4. min-True or max-True?`
        }
      }
    ]
  },

  4: {
    title: "Hashing",
    tagline: "Trade O(n) space for O(1) lookup — remember what you've seen.",
    days: [
      {
        day: "Mon — HashMap Basics",
        where: "Finding pairs, checking existence, storing mappings between values.",
        when: "When you're doing repeated lookups in an array (O(n) each) — put it in a hashmap first for O(1) lookups.",
        what: "HashMap stores key→value with O(1) average insert/lookup. For each element, store what you need to remember and check for its complement/pair.",
        example: {
          title: "Two Sum",
          explanation: "For each number, check if complement (target-num) was seen before. If yes → found pair. If no → store current number with its index.",
          code: {
            python: `def twoSum(nums, target):
    seen = {}  # value → index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
            cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int,int> seen;
    for(int i=0;i<nums.size();i++){
        int comp = target-nums[i];
        if(seen.count(comp))
            return {seen[comp], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
            java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer,Integer> seen = new HashMap<>();
    for(int i=0;i<nums.length;i++){
        int comp = target-nums[i];
        if(seen.containsKey(comp))
            return new int[]{seen.get(comp),i};
        seen.put(nums[i],i);
    }
    return new int[]{};
}`
          }
        },
        keyInsight: "Pattern: store current, check complement. The order matters — check first, then store (avoids using same element twice).",
        template: {
          python: `seen = {}
for i, val in enumerate(arr):
    if need(val) in seen:
        # found answer
    seen[val] = i`,
          cpp: `unordered_map<int,int> seen;
for(int i=0;i<n;i++){
    if(seen.count(need(arr[i]))) { /* found */ }
    seen[arr[i]]=i;
}`,
          java: `Map<Integer,Integer> seen=new HashMap<>();
for(int i=0;i<n;i++){
    if(seen.containsKey(need(arr[i]))) { /* found */ }
    seen.put(arr[i],i);
}`
        }
      },
      {
        day: "Tue — Frequency Maps",
        where: "Counting occurrences, finding top-K, grouping by property.",
        when: "When you need to count how many times each element appears, or group elements that share a computed property.",
        what: "Use Counter (Python) or HashMap<T,Integer> to count. Use the property you're grouping by as the key.",
        example: {
          title: "Group Anagrams",
          explanation: "All anagrams have the same sorted string. Use sorted(s) as key. Group all strings sharing the same key. defaultdict(list) auto-initializes lists.",
          code: {
            python: `from collections import defaultdict
def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))
        groups[key].append(s)
    return list(groups.values())`,
            cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string,vector<string>> groups;
    for(auto& s:strs){
        string key=s; sort(key.begin(),key.end());
        groups[key].push_back(s);
    }
    vector<vector<string>> result;
    for(auto& p:groups) result.push_back(p.second);
    return result;
}`,
            java: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String,List<String>> groups=new HashMap<>();
    for(String s:strs){
        char[] arr=s.toCharArray(); Arrays.sort(arr);
        String key=new String(arr);
        groups.computeIfAbsent(key,k->new ArrayList<>()).add(s);
    }
    return new ArrayList<>(groups.values());
}`
          }
        },
        keyInsight: "When grouping by property → use that property as hashmap key. Sorted string, first char, count array — anything works as key.",
        template: {
          python: `from collections import defaultdict
groups = defaultdict(list)
for item in items:
    key = compute_key(item)
    groups[key].append(item)`,
          cpp: `unordered_map<KeyType,vector<ValType>> groups;
for(auto& item:items){
    auto key=computeKey(item);
    groups[key].push_back(item);
}`,
          java: `Map<String,List<T>> groups=new HashMap<>();
for(T item:items){
    String key=computeKey(item);
    groups.computeIfAbsent(key,k->new ArrayList<>()).add(item);
}`
        }
      },
      {
        day: "Wed — HashSet Patterns",
        where: "Finding consecutive sequences, detecting duplicates, checking membership.",
        when: "When you need O(1) existence check. Convert array to set, then query in O(1).",
        what: "Longest Consecutive Sequence: put all numbers in a set. Only start counting from sequence beginnings (num-1 not in set). Count up as long as next number exists.",
        example: {
          title: "Longest Consecutive Sequence",
          explanation: "Only start from sequence beginnings (num-1 not in set). This ensures O(n) total — each number counted at most once across all sequences.",
          code: {
            python: `def longestConsecutive(nums):
    num_set = set(nums)
    best = 0
    for num in num_set:
        if num-1 not in num_set:  # start of sequence
            length = 1
            while num+length in num_set:
                length += 1
            best = max(best, length)
    return best`,
            cpp: `int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(),nums.end());
    int best=0;
    for(int num:s){
        if(!s.count(num-1)){
            int len=1;
            while(s.count(num+len)) len++;
            best=max(best,len);
        }
    }
    return best;
}`,
            java: `public int longestConsecutive(int[] nums) {
    Set<Integer> s=new HashSet<>();
    for(int n:nums) s.add(n);
    int best=0;
    for(int num:s){
        if(!s.contains(num-1)){
            int len=1;
            while(s.contains(num+len)) len++;
            best=Math.max(best,len);
        }
    }
    return best;
}`
          }
        },
        keyInsight: "Skip if num-1 exists (not a sequence start). This prevents O(n²) — each element touched at most once total.",
        template: {
          python: `num_set = set(nums)
for num in num_set:
    if num-1 not in num_set:  # start only
        # count up from num`,
          cpp: `unordered_set<int> s(nums.begin(),nums.end());
for(int num:s)
    if(!s.count(num-1)){ /* count up */ }`,
          java: `Set<Integer> s=new HashSet<>();
for(int n:nums) s.add(n);
for(int num:s)
    if(!s.contains(num-1)){ /* count up */ }`
        }
      },
      {
        day: "Thu — Prefix + Hash",
        where: "Counting subarrays with a specific sum, equal elements, or balance condition.",
        when: "Combine with prefix sum when you need to find/count subarrays. seen={0:1} handles subarrays from index 0.",
        what: "If prefix[j] - prefix[i] = k, then subarray [i+1..j] sums to k. Store prefix sums in hashmap with their frequency to count all such subarrays.",
        example: {
          title: "Contiguous Array (Equal 0s and 1s)",
          explanation: "Replace 0→-1. Equal 0s and 1s = subarray sum 0. Same prefix at two indices → subarray between them = 0. Store FIRST index for each prefix to maximize length.",
          code: {
            python: `def findMaxLength(nums):
    seen = {0: -1}
    prefix = 0
    best = 0
    for i, num in enumerate(nums):
        prefix += 1 if num==1 else -1
        if prefix in seen:
            best = max(best, i-seen[prefix])
        else:
            seen[prefix] = i  # first occurrence
    return best`,
            cpp: `int findMaxLength(vector<int>& nums) {
    unordered_map<int,int> seen; seen[0]=-1;
    int prefix=0, best=0;
    for(int i=0;i<nums.size();i++){
        prefix += nums[i]==1 ? 1 : -1;
        if(seen.count(prefix)) best=max(best,i-seen[prefix]);
        else seen[prefix]=i;
    }
    return best;
}`,
            java: `public int findMaxLength(int[] nums) {
    Map<Integer,Integer> seen=new HashMap<>(); seen.put(0,-1);
    int prefix=0, best=0;
    for(int i=0;i<nums.length;i++){
        prefix += nums[i]==1 ? 1 : -1;
        if(seen.containsKey(prefix)) best=Math.max(best,i-seen.get(prefix));
        else seen.put(prefix,i);
    }
    return best;
}`
          }
        },
        keyInsight: "For length: store FIRST index (don't overwrite). For count: store frequency (always update). Know which you need.",
        template: {
          python: `seen = {0: -1}  # for length
# OR seen = {0: 1}  # for count
prefix = 0
for i, num in enumerate(nums):
    prefix += num
    if prefix in seen: # update answer
    else: seen[prefix] = i  # length
    # OR: seen[prefix] = seen.get(prefix,0)+1  # count`,
          cpp: `unordered_map<int,int> seen; seen[0]=-1; // length
// OR seen[0]=1; // count`,
          java: `Map<Integer,Integer> seen=new HashMap<>(); seen.put(0,-1); // length
// OR seen.put(0,1); // count`
        }
      },
      {
        day: "Fri — Hard Hashing",
        where: "Complex grouping, pattern matching, or multi-constraint lookup problems.",
        when: "When problem has a complex 'same property' condition that can be normalized to a hashable key.",
        what: "Normalize the property into a canonical hashable form. Use it as key. Tricky part is always the normalization.",
        example: {
          title: "Top K Frequent Elements",
          explanation: "Count frequencies with HashMap. Use bucket sort: create buckets where bucket[freq] = list of elements with that frequency. Scan from high to low to get top K.",
          code: {
            python: `def topKFrequent(nums, k):
    freq = {}
    for n in nums:
        freq[n] = freq.get(n,0) + 1
    # Bucket sort by frequency
    buckets = [[] for _ in range(len(nums)+1)]
    for num, f in freq.items():
        buckets[f].append(num)
    result = []
    for i in range(len(buckets)-1, 0, -1):
        result.extend(buckets[i])
        if len(result) >= k: break
    return result[:k]`,
            cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int,int> freq;
    for(int n:nums) freq[n]++;
    vector<vector<int>> buckets(nums.size()+1);
    for(auto& p:freq) buckets[p.second].push_back(p.first);
    vector<int> result;
    for(int i=buckets.size()-1;i>=1&&result.size()<k;i--)
        for(int n:buckets[i]) result.push_back(n);
    return result;
}`,
            java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer,Integer> freq=new HashMap<>();
    for(int n:nums) freq.put(n,freq.getOrDefault(n,0)+1);
    List<Integer>[] buckets=new List[nums.length+1];
    for(int key:freq.keySet()){
        int f=freq.get(key);
        if(buckets[f]==null) buckets[f]=new ArrayList<>();
        buckets[f].add(key);
    }
    int[] result=new int[k]; int idx=0;
    for(int i=buckets.length-1;i>=1&&idx<k;i--)
        if(buckets[i]!=null)
            for(int n:buckets[i]) if(idx<k) result[idx++]=n;
    return result;
}`
          }
        },
        keyInsight: "Bucket sort by frequency → O(n) solution vs O(n log n) with heap/sort. Frequency can't exceed n so bucket size is bounded.",
        template: {
          python: `freq = Counter(nums)
buckets = [[] for _ in range(n+1)]
for num, f in freq.items():
    buckets[f].append(num)
# Read from high to low`,
          cpp: `unordered_map<int,int> freq;
for(int n:nums) freq[n]++;
vector<vector<int>> buckets(n+1);
for(auto&p:freq) buckets[p.second].push_back(p.first);`,
          java: `Map<Integer,Integer> freq=new HashMap<>();
List<Integer>[] buckets=new List[n+1];
for(int key:freq.keySet()) buckets[freq.get(key)].add(key);`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review all 5 hashmap patterns.",
        when: "Recognize which pattern fits by what you're trying to store and retrieve.",
        what: "5 patterns: complement lookup, frequency count, group by property, prefix+hash, first/last index.",
        example: {
          title: "5 Patterns Summary",
          explanation: "Each pattern has a characteristic seen initialization and update logic. Master these 5 and you can solve 80% of hashing problems.",
          code: {
            python: `# 1. Complement: seen={}; check target-x
# 2. Frequency: seen=Counter(); seen[x]+=1
# 3. Group: groups=defaultdict(list); groups[key].append(x)
# 4. Prefix+hash: seen={0:1}; count+=seen[prefix-k]
# 5. First index: seen={}; if not in seen: seen[x]=i`,
            cpp: `// 1. Complement: seen[target-x]
// 2. Frequency: seen[x]++
// 3. Group: groups[key].push_back(x)
// 4. Prefix+hash: seen[0]=1; count+=seen[prefix-k]
// 5. First index: if(!seen.count(x)) seen[x]=i`,
            java: `// 1. Complement: seen.containsKey(target-x)
// 2. Frequency: seen.put(x, seen.getOrDefault(x,0)+1)
// 3. Group: groups.computeIfAbsent(key,...).add(x)
// 4. Prefix+hash: seen.put(0,1); count+=seen.getOrDefault(p-k,0)
// 5. First index: if(!seen.containsKey(x)) seen.put(x,i)`
          }
        },
        keyInsight: "The key question: what do I need to remember? what do I need to look up? That determines which pattern.",
        template: {
          python: `# Decision:
# Find pair/complement? → pattern 1
# Count frequencies? → pattern 2  
# Group by property? → pattern 3
# Count subarrays with sum? → pattern 4
# Find first/longest? → pattern 5`,
          cpp: `// Decision:
// Find pair? → pattern 1
// Count freq? → pattern 2
// Group? → pattern 3
// Subarray sum? → pattern 4
// First/longest? → pattern 5`,
          java: `// Decision:
// Find pair? → pattern 1
// Count freq? → pattern 2
// Group? → pattern 3
// Subarray sum? → pattern 4
// First/longest? → pattern 5`
        }
      },
      {
        day: "Sun — Mock",
        where: "Any problem where repeated lookups are needed or grouping is required.",
        when: "If you're searching through an array inside a loop → hashmap opportunity.",
        what: "Identify what to store, what to check, and initialize correctly (especially seen={0:1} for prefix problems).",
        example: {
          title: "The One Insight That Solves Dozens",
          explanation: "Replacing O(n) array scan with O(1) hashmap lookup is the single most common optimization in coding interviews.",
          code: {
            python: `# Before (O(n²)):
for x in arr:
    if target-x in arr:  # O(n) each!
        ...

# After (O(n)):
seen = set(arr)          # O(n) once
for x in arr:
    if target-x in seen:  # O(1) each
        ...`,
            cpp: `// Before O(n²):
for(int x:arr)
    if(find(arr.begin(),arr.end(),target-x)!=arr.end()){}

// After O(n):
unordered_set<int> seen(arr.begin(),arr.end());
for(int x:arr)
    if(seen.count(target-x)){}`,
            java: `// Before O(n²):
for(int x:arr)
    for(int y:arr) if(x+y==target){}

// After O(n):
Set<Integer> seen=new HashSet<>();
for(int x:arr) seen.add(x);
for(int x:arr) if(seen.contains(target-x)){}`
          }
        },
        keyInsight: "If you're doing arr.contains() inside a loop → O(n²). Convert to set/map first → O(n). This single insight is worth memorizing.",
        template: {
          python: `# The golden rule:
# list.count(x) in a loop → O(n²) ❌
# set/dict lookup in a loop → O(n) ✓`,
          cpp: `// Golden rule:
// find() in loop → O(n²) ❌
// unordered_set/map lookup → O(1) ✓`,
          java: `// Golden rule:
// contains() on List in loop → O(n²) ❌
// contains() on HashSet in loop → O(1) ✓`
        }
      }
    ]
  },

  5: {
    title: "Sliding Window",
    tagline: "Expand right, shrink left — maintain a valid window at all times.",
    days: [
      {
        day: "Mon — Fixed Window",
        where: "Subarray/substring problems where window size is exactly k.",
        when: "When you need max/min/sum/average of every contiguous subarray of size k.",
        what: "Initialize first window of size k. Then slide: add nums[i] on right, remove nums[i-k] on left. O(n) vs O(n*k) brute force.",
        example: {
          title: "Maximum Average Subarray of Size K",
          explanation: "First window = sum of first k elements. Each slide: add new right element, remove old left element (k positions back). Track maximum across all windows.",
          code: {
            python: `def findMaxAverage(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i]       # add right
        window -= nums[i-k]     # remove left
        best = max(best, window)
    return best / k`,
            cpp: `double findMaxAverage(vector<int>& nums, int k) {
    int window=0;
    for(int i=0;i<k;i++) window+=nums[i];
    int best=window;
    for(int i=k;i<nums.size();i++){
        window+=nums[i]; window-=nums[i-k];
        best=max(best,window);
    }
    return (double)best/k;
}`,
            java: `public double findMaxAverage(int[] nums, int k) {
    int window=0;
    for(int i=0;i<k;i++) window+=nums[i];
    int best=window;
    for(int i=k;i<nums.length;i++){
        window+=nums[i]; window-=nums[i-k];
        best=Math.max(best,window);
    }
    return (double)best/k;
}`
          }
        },
        keyInsight: "Fixed window: always remove nums[i-k] (exactly k positions back). Window size stays exactly k.",
        template: {
          python: `window = sum(nums[:k])
best = window
for i in range(k, n):
    window += nums[i]
    window -= nums[i-k]
    best = max(best, window)`,
          cpp: `int window=0;
for(int i=0;i<k;i++) window+=nums[i];
for(int i=k;i<n;i++){
    window+=nums[i]; window-=nums[i-k];
}`,
          java: `int window=0;
for(int i=0;i<k;i++) window+=nums[i];
for(int i=k;i<n;i++){
    window+=nums[i]; window-=nums[i-k];
}`
        }
      },
      {
        day: "Tue — Variable Window",
        where: "Finding longest/shortest subarray or substring satisfying a condition.",
        when: "Window size varies. Expand when valid, shrink when invalid. Find longest valid window.",
        what: "Use l (left) and r (right) pointers. Expand r every step. When condition violated → shrink from left until valid again. Answer = max(r-l+1).",
        example: {
          title: "Longest Substring Without Repeating Chars",
          explanation: "seen stores last index of each char. When duplicate found inside window (seen[c]>=l), move l past it. seen[c]>=l check ensures we only react to duplicates inside current window.",
          code: {
            python: `def lengthOfLongestSubstring(s):
    seen = {}
    l = best = 0
    for r, c in enumerate(s):
        if c in seen and seen[c] >= l:
            l = seen[c] + 1  # skip past duplicate
        seen[c] = r
        best = max(best, r-l+1)
    return best`,
            cpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char,int> seen;
    int l=0, best=0;
    for(int r=0;r<s.size();r++){
        if(seen.count(s[r]) && seen[s[r]]>=l)
            l=seen[s[r]]+1;
        seen[s[r]]=r;
        best=max(best,r-l+1);
    }
    return best;
}`,
            java: `public int lengthOfLongestSubstring(String s) {
    Map<Character,Integer> seen=new HashMap<>();
    int l=0, best=0;
    for(int r=0;r<s.length();r++){
        char c=s.charAt(r);
        if(seen.containsKey(c) && seen.get(c)>=l)
            l=seen.get(c)+1;
        seen.put(c,r);
        best=Math.max(best,r-l+1);
    }
    return best;
}`
          }
        },
        keyInsight: "seen[c]>=l check is critical — only shrink if the duplicate is INSIDE current window, not before it.",
        template: {
          python: `l = 0
for r in range(n):
    # expand: add s[r] to window
    while window_invalid:
        # shrink: remove s[l]; l += 1
    best = max(best, r-l+1)`,
          cpp: `int l=0;
for(int r=0;r<n;r++){
    // add s[r] to window
    while(windowInvalid){
        // remove s[l]; l++;
    }
    best=max(best,r-l+1);
}`,
          java: `int l=0;
for(int r=0;r<n;r++){
    // add s[r]
    while(windowInvalid){
        // remove s[l]; l++;
    }
    best=Math.max(best,r-l+1);
}`
        }
      },
      {
        day: "Wed — At Most K",
        where: "Counting subarrays with EXACTLY k distinct elements, characters, or zeros.",
        when: "When exactly-k is hard but at-most-k is easy. Use: exactly(k) = atMost(k) - atMost(k-1).",
        what: "atMost(k): maintain window with at most k distinct elements. Shrink when exceeding k. result += r-l+1 counts all valid subarrays ending at r.",
        example: {
          title: "Subarrays with K Different Integers",
          explanation: "result += r-l+1 is the key: for each r, there are (r-l+1) valid subarrays ending at r (starting at l, l+1, ..., r). Exactly k = atMost(k) - atMost(k-1).",
          code: {
            python: `from collections import defaultdict
def subarraysWithKDistinct(nums, k):
    def atMost(k):
        count = defaultdict(int)
        l = result = 0
        for r, num in enumerate(nums):
            count[num] += 1
            while len(count) > k:
                count[nums[l]] -= 1
                if count[nums[l]] == 0: del count[nums[l]]
                l += 1
            result += r-l+1
        return result
    return atMost(k) - atMost(k-1)`,
            cpp: `int subarraysWithKDistinct(vector<int>& nums, int k) {
    auto atMost=[&](int k){
        unordered_map<int,int> cnt;
        int l=0, res=0;
        for(int r=0;r<nums.size();r++){
            cnt[nums[r]]++;
            while(cnt.size()>k){
                if(--cnt[nums[l]]==0) cnt.erase(nums[l]);
                l++;
            }
            res+=r-l+1;
        }
        return res;
    };
    return atMost(k)-atMost(k-1);
}`,
            java: `public int subarraysWithKDistinct(int[] nums, int k) {
    return atMost(nums,k)-atMost(nums,k-1);
}
int atMost(int[] nums, int k){
    Map<Integer,Integer> cnt=new HashMap<>();
    int l=0,res=0;
    for(int r=0;r<nums.length;r++){
        cnt.put(nums[r],cnt.getOrDefault(nums[r],0)+1);
        while(cnt.size()>k){
            cnt.put(nums[l],cnt.get(nums[l])-1);
            if(cnt.get(nums[l])==0) cnt.remove(nums[l]);
            l++;
        }
        res+=r-l+1;
    }
    return res;
}`
          }
        },
        keyInsight: "result += r-l+1 counts all subarrays ending at r. This is the most important sliding window counting insight.",
        template: {
          python: `def atMost(k):
    l = result = 0
    for r in range(n):
        # add nums[r]
        while len(window) > k:
            # remove nums[l]; l += 1
        result += r-l+1
    return result
return atMost(k) - atMost(k-1)`,
          cpp: `// atMost(k): result += r-l+1 inside loop
// exactly(k) = atMost(k) - atMost(k-1)`,
          java: `// atMost(k): res += r-l+1 inside loop
// exactly(k) = atMost(k) - atMost(k-1)`
        }
      },
      {
        day: "Thu — String Window",
        where: "Finding minimum/maximum window in string containing all characters of a pattern.",
        when: "Need → have comparison with formed counter. Shrink while valid to find minimum.",
        what: "Track need (required frequencies) and have (current window frequencies). formed counts distinct chars that have met their required count. When formed==required → valid window.",
        example: {
          title: "Minimum Window Substring",
          explanation: "formed tracks how many distinct chars meet their needed count. formed++ only when count EXACTLY reaches requirement. formed-- only when count drops BELOW requirement. Shrink while valid.",
          code: {
            python: `from collections import Counter
def minWindow(s, t):
    need = Counter(t)
    have = {}
    formed = required = len(need)
    l = 0; best = ""
    for r, c in enumerate(s):
        have[c] = have.get(c,0)+1
        if c in need and have[c]==need[c]: formed+=1
        while formed==required:
            if not best or r-l+1<len(best): best=s[l:r+1]
            have[s[l]]-=1
            if s[l] in need and have[s[l]]<need[s[l]]: formed-=1
            l+=1
    return best`,
            cpp: `string minWindow(string s, string t) {
    unordered_map<char,int> need,have;
    for(char c:t) need[c]++;
    int formed=0,required=need.size(),l=0,best=-1,bl=0,br=0;
    for(int r=0;r<s.size();r++){
        have[s[r]]++;
        if(need.count(s[r])&&have[s[r]]==need[s[r]]) formed++;
        while(formed==required){
            if(best==-1||r-l+1<best){best=r-l+1;bl=l;br=r;}
            have[s[l]]--;
            if(need.count(s[l])&&have[s[l]]<need[s[l]]) formed--;
            l++;
        }
    }
    return best==-1?"":s.substr(bl,best);
}`,
            java: `public String minWindow(String s, String t) {
    Map<Character,Integer> need=new HashMap<>(),have=new HashMap<>();
    for(char c:t.toCharArray()) need.put(c,need.getOrDefault(c,0)+1);
    int formed=0,required=need.size(),l=0,best=Integer.MAX_VALUE,bl=0;
    for(int r=0;r<s.length();r++){
        char c=s.charAt(r); have.put(c,have.getOrDefault(c,0)+1);
        if(need.containsKey(c)&&have.get(c).equals(need.get(c))) formed++;
        while(formed==required){
            if(r-l+1<best){best=r-l+1;bl=l;}
            char lc=s.charAt(l); have.put(lc,have.get(lc)-1);
            if(need.containsKey(lc)&&have.get(lc)<need.get(lc)) formed--;
            l++;
        }
    }
    return best==Integer.MAX_VALUE?"":s.substring(bl,bl+best);
}`
          }
        },
        keyInsight: "formed avoids rechecking all chars each step. Only changes when count hits exactly required (++) or drops below (−−).",
        template: {
          python: `need=Counter(t); have={}
formed=required=len(need); l=0
for r,c in enumerate(s):
    have[c]=have.get(c,0)+1
    if c in need and have[c]==need[c]: formed+=1
    while formed==required:
        # update answer; shrink from left`,
          cpp: `// need=freq of t; have=freq of window
// formed++ when have[c]==need[c]
// formed-- when have[c]<need[c]`,
          java: `// need=freq of t; have=freq of window
// formed++ when have[c].equals(need[c])
// formed-- when have[c]<need[c]`
        }
      },
      {
        day: "Fri — Monotonic Deque",
        where: "Finding maximum or minimum in every window of size k efficiently.",
        when: "Brute force checks all k elements per window = O(n*k). Deque maintains max/min in O(1) per step.",
        what: "Maintain a deque of indices in decreasing order of values. Front = max of current window. Remove expired indices from front. Remove smaller values from back (they can never be max).",
        example: {
          title: "Sliding Window Maximum",
          explanation: "Deque stores indices with decreasing values. New element invalidates all smaller previous elements (they can't be max while new element is in window). Front always = window max.",
          code: {
            python: `from collections import deque
def maxSlidingWindow(nums, k):
    dq = deque()
    result = []
    for i, num in enumerate(nums):
        while dq and dq[0] < i-k+1: dq.popleft()  # expired
        while dq and nums[dq[-1]] < num: dq.pop()  # smaller
        dq.append(i)
        if i >= k-1: result.append(nums[dq[0]])
    return result`,
            cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    for(int i=0;i<nums.size();i++){
        while(!dq.empty()&&dq.front()<i-k+1) dq.pop_front();
        while(!dq.empty()&&nums[dq.back()]<nums[i]) dq.pop_back();
        dq.push_back(i);
        if(i>=k-1) result.push_back(nums[dq.front()]);
    }
    return result;
}`,
            java: `public int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> dq=new ArrayDeque<>();
    int[] result=new int[nums.length-k+1];
    int idx=0;
    for(int i=0;i<nums.length;i++){
        while(!dq.isEmpty()&&dq.peek()<i-k+1) dq.poll();
        while(!dq.isEmpty()&&nums[dq.peekLast()]<nums[i]) dq.pollLast();
        dq.offer(i);
        if(i>=k-1) result[idx++]=nums[dq.peek()];
    }
    return result;
}`
          }
        },
        keyInsight: "Monotonic deque: each element added and removed at most once → O(n) total. Front = window max always.",
        template: {
          python: `dq = deque()
for i in range(n):
    while dq and dq[0] <= i-k: dq.popleft()   # expired
    while dq and nums[dq[-1]] <= nums[i]: dq.pop()  # smaller
    dq.append(i)
    if i >= k-1: result.append(nums[dq[0]])`,
          cpp: `deque<int> dq;
for(int i=0;i<n;i++){
    while(!dq.empty()&&dq.front()<=i-k) dq.pop_front();
    while(!dq.empty()&&nums[dq.back()]<=nums[i]) dq.pop_back();
    dq.push_back(i);
    if(i>=k-1) result.push_back(nums[dq.front()]);
}`,
          java: `Deque<Integer> dq=new ArrayDeque<>();
for(int i=0;i<n;i++){
    while(!dq.isEmpty()&&dq.peek()<=i-k) dq.poll();
    while(!dq.isEmpty()&&nums[dq.peekLast()]<=nums[i]) dq.pollLast();
    dq.offer(i);
    if(i>=k-1) result[idx++]=nums[dq.peek()];
}`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review all 4 sliding window patterns.",
        when: "Identify pattern by question type before coding.",
        what: "4 patterns: fixed window, variable window (longest), at-most-k (counting), monotonic deque (range max).",
        example: {
          title: "Pattern Decision Guide",
          explanation: "Fixed: size is given. Variable: find longest. AtMost: count subarrays. Deque: range max/min. Match pattern to question before writing any code.",
          code: {
            python: `# Fixed (size k given):
window = sum(nums[:k])
for i in range(k,n): window+=nums[i];window-=nums[i-k]

# Variable (find longest):
while invalid: shrink from left
best = max(best, r-l+1)

# AtMost (count subarrays):
result += r-l+1  # all subarrays ending at r
exactly(k) = atMost(k) - atMost(k-1)

# Deque (range max):
maintain decreasing indices deque`,
            cpp: `// Fixed: window+=nums[i]; window-=nums[i-k]
// Variable: while(invalid){shrink;} best=max(best,r-l+1)
// AtMost: res+=r-l+1; exactly=atMost(k)-atMost(k-1)
// Deque: maintain decreasing deque of indices`,
            java: `// Fixed: window+=nums[i]; window-=nums[i-k]
// Variable: while(invalid){shrink;} best=Math.max(best,r-l+1)
// AtMost: res+=r-l+1; exactly=atMost(k)-atMost(k-1)
// Deque: maintain decreasing deque of indices`
          }
        },
        keyInsight: "result += r-l+1 is the most powerful insight for counting problems — counts all valid subarrays ending at r.",
        template: {
          python: `# Identify:
# "max/min of every k elements" → fixed
# "longest subarray with X" → variable
# "count subarrays with exactly k" → atMost
# "max in each window of k" → deque`,
          cpp: `// max/min every k → fixed
// longest with property → variable
// count exactly k → atMost
// range max/min → deque`,
          java: `// max/min every k → fixed
// longest with property → variable
// count exactly k → atMost
// range max/min → deque`
        }
      },
      {
        day: "Sun — Mock",
        where: "Any subarray/substring problem with contiguous elements.",
        when: "Keywords: subarray, substring, window, consecutive, contiguous.",
        what: "Identify fixed or variable. Write shrink condition. Decide where to update answer (inside or outside while loop).",
        example: {
          title: "The 3 Critical Decisions",
          explanation: "Get these 3 right and sliding window code almost writes itself: (1) shrink condition, (2) answer update location, (3) what to track in window.",
          code: {
            python: `# Decision 1: Shrink condition
# Too many distinct? → len(window) > k
# Duplicate exists? → seen[c] >= l  
# Sum exceeds? → window_sum > target

# Decision 2: Update answer location
# Longest → outside while: best=max(best,r-l+1)
# Minimum → inside while: best=min(best,r-l+1)
# Count → outside while: result+=r-l+1

# Decision 3: What to track
# Distinct chars → hashmap with counts
# Sum → running total
# Max → deque`,
            cpp: `// Shrink: len>k || dup || sum>target
// Longest: best=max(best,r-l+1) after while
// Min: best=min(best,r-l+1) inside while
// Count: res+=r-l+1 after while`,
            java: `// Shrink: size>k || dup || sum>target
// Longest: best=Math.max(best,r-l+1) after while
// Min: best=Math.min(best,r-l+1) inside while
// Count: res+=r-l+1 after while`
          }
        },
        keyInsight: "Two key decisions: WHEN to shrink (shrink condition) and WHERE to update answer (inside or outside while). Nail these and the rest is mechanical.",
        template: {
          python: `l = 0; best = 0
for r in range(n):
    # 1. Add s[r] to window
    while SHRINK_CONDITION:
        # 2. Remove s[l]; l += 1
    # 3. Update answer`,
          cpp: `int l=0;
for(int r=0;r<n;r++){
    // 1. add nums[r]
    while(shrinkCondition){ // 2. remove nums[l++] }
    // 3. update answer
}`,
          java: `int l=0;
for(int r=0;r<n;r++){
    // 1. add nums[r]
    while(shrinkCondition){ // 2. remove nums[l++] }
    // 3. update answer
}`
        }
      }
    ]
  },

  6: {
    title: "Matrix + Strings Complete",
    tagline: "2D traversal, in-place tricks, and string patterns — all appear in every MNC OA.",
    days: [
      {
        day: "Mon — Matrix Basics",
        where: "Rotate matrix 90°, set zeroes, spiral order, search in row-col sorted matrix.",
        when: "These are the core matrix manipulation patterns tested at Amazon/Samsung OAs. Rotate = transpose + reverse. Set zeroes = mark first row/col as sentinel.",
        what: "Rotate 90° CW: Step 1 transpose (swap matrix[i][j] with matrix[j][i]). Step 2 reverse each row. Set Matrix Zeroes: use first row and first col as markers to avoid extra space.",
        example: {
          title: "Rotate Image 90° In-Place",
          explanation: "Transpose: swap matrix[i][j] ↔ matrix[j][i] for j>i. Then reverse each row. Two-step trick works because rotation = transpose + mirror. O(1) extra space.",
          code: {
            python: `def rotate(matrix):
    n = len(matrix)
    # Step 1: Transpose
    for i in range(n):
        for j in range(i+1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Step 2: Reverse each row
    for row in matrix:
        row.reverse()`,
            cpp: `void rotate(vector<vector<int>>& m) {
    int n = m.size();
    // Transpose
    for(int i=0;i<n;i++)
        for(int j=i+1;j<n;j++)
            swap(m[i][j], m[j][i]);
    // Reverse each row
    for(auto& row:m)
        reverse(row.begin(), row.end());
}`,
            java: `public void rotate(int[][] m) {
    int n = m.length;
    // Transpose
    for(int i=0;i<n;i++)
        for(int j=i+1;j<n;j++){
            int t=m[i][j]; m[i][j]=m[j][i]; m[j][i]=t;
        }
    // Reverse each row
    for(int[] row:m){
        int l=0,r=row.length-1;
        while(l<r){int t=row[l];row[l]=row[r];row[r]=t;l++;r--;}
    }
}`
          }
        },
        keyInsight: "Rotate 90° CW = Transpose + Reverse rows. Rotate 90° CCW = Reverse rows + Transpose. Memorise this pair — it always works in O(1) space.",
        template: {
          python: `# Rotate 90° CW:
for i in range(n):
    for j in range(i+1, n):
        matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
for row in matrix: row.reverse()

# Spiral traversal:
top,bottom,left,right = 0,rows-1,0,cols-1
while top<=bottom and left<=right:
    for c in range(left,right+1): res.append(m[top][c]); top+=1
    for r in range(top,bottom+1): res.append(m[r][right]); right-=1
    if top<=bottom:
        for c in range(right,left-1,-1): res.append(m[bottom][c]); bottom-=1
    if left<=right:
        for r in range(bottom,top-1,-1): res.append(m[r][left]); left+=1`,
          cpp: `// Transpose: swap(m[i][j], m[j][i]) for j>i
// Reverse: reverse(row.begin(), row.end())
// Spiral: shrink top/bottom/left/right boundaries`,
          java: `// Transpose + reverse each row = 90° CW rotation
// Spiral: 4 boundary pointers, shrink after each side`
        }
      },
      {
        day: "Tue — Matrix Advanced",
        where: "Set Matrix Zeroes (O(1) space), search in row-col sorted matrix, Game of Life.",
        when: "Set zeroes in-place: mark first row/col as sentinels instead of using an extra matrix. Search sorted matrix: staircase search from top-right corner.",
        what: "Staircase search (top-right): if target < curr → go left. If target > curr → go down. Each step eliminates a row or column. O(m+n) instead of O(m*n).",
        example: {
          title: "Search a 2D Matrix II (Staircase)",
          explanation: "Start at top-right corner. If target = curr → found. If target < curr → move left (eliminate column). If target > curr → move down (eliminate row). Guaranteed O(m+n).",
          code: {
            python: `def searchMatrix(matrix, target):
    if not matrix: return False
    rows, cols = len(matrix), len(matrix[0])
    r, c = 0, cols-1          # start top-right
    while r < rows and c >= 0:
        if matrix[r][c] == target: return True
        elif matrix[r][c] > target: c -= 1  # eliminate col
        else: r += 1                         # eliminate row
    return False`,
            cpp: `bool searchMatrix(vector<vector<int>>& m, int target) {
    int r=0, c=m[0].size()-1;
    while(r<(int)m.size() && c>=0) {
        if(m[r][c]==target) return true;
        else if(m[r][c]>target) c--;
        else r++;
    }
    return false;
}`,
            java: `public boolean searchMatrix(int[][] m, int target) {
    int r=0, c=m[0].length-1;
    while(r<m.length && c>=0) {
        if(m[r][c]==target) return true;
        else if(m[r][c]>target) c--;
        else r++;
    }
    return false;
}`
          }
        },
        keyInsight: "Staircase search: top-right corner has a special property — moving left decreases value, moving down increases value. This gives O(m+n) elimination.",
        template: {
          python: `# Set Matrix Zeroes (O(1) space):
# 1. Check if first row/col originally has zero
# 2. Use first row/col as markers for other rows/cols
# 3. Zero out marked rows/cols (skip first row/col)
# 4. Zero out first row/col if originally had zero

# Staircase search:
r, c = 0, cols-1
while r < rows and c >= 0:
    if matrix[r][c] == target: return True
    elif matrix[r][c] > target: c -= 1
    else: r += 1`,
          cpp: `// Staircase: start (0, cols-1)
// > target → c--; < target → r++`,
          java: `// Staircase: start (0, cols-1)
// same logic: r++/c-- based on comparison`
        }
      },
      {
        day: "Wed — String Fundamentals",
        where: "Valid Anagram, Group Anagrams, Longest Common Prefix, Isomorphic Strings.",
        when: "Anagram: sort both or compare freq[26]. Group anagrams: sorted string as hashmap key. LCP: vertical scan — compare column by column.",
        what: "Group Anagrams: for each string, sort its chars → same key for all anagrams. LCP: compare s[0][i], s[1][i], s[2][i]... stop when mismatch. O(S) total where S=sum of all lengths.",
        example: {
          title: "Group Anagrams",
          explanation: "sorted(s) = canonical form of every anagram. All anagrams share the same sorted form. Use it as dictionary key → O(n·k·log k) total.",
          code: {
            python: `from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))   # same for all anagrams
        groups[key].append(s)
    return list(groups.values())`,
            cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    for(auto& s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        groups[key].push_back(s);
    }
    vector<vector<string>> res;
    for(auto& p : groups) res.push_back(p.second);
    return res;
}`,
            java: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String,List<String>> m = new HashMap<>();
    for(String s : strs) {
        char[] c = s.toCharArray();
        Arrays.sort(c);
        String key = new String(c);
        m.computeIfAbsent(key, k->new ArrayList<>()).add(s);
    }
    return new ArrayList<>(m.values());
}`
          }
        },
        keyInsight: "sorted(s) as key = O(k log k) per string. Frequency tuple key = O(k) per string but more code. For lowercase only, freq[26] is fastest.",
        template: {
          python: `# Anagram grouping:
from collections import defaultdict
groups = defaultdict(list)
for s in strs:
    groups[tuple(sorted(s))].append(s)

# Frequency count (lowercase only):
freq = [0]*26
for c in s: freq[ord(c)-ord('a')] += 1

# LCP vertical scan:
for i in range(len(strs[0])):
    c = strs[0][i]
    for s in strs[1:]:
        if i >= len(s) or s[i] != c: return strs[0][:i]`,
          cpp: `// Sort key: sort(key.begin(),key.end())
// Freq: int freq[26]={}; freq[c-'a']++
// LCP: col by col comparison`,
          java: `// Sort key: Arrays.sort(c); new String(c)
// LCP: column by column`
        }
      },
      {
        day: "Thu — String Hashing",
        where: "Longest substring without repeating, find all anagrams, valid palindrome with delete.",
        when: "Character frequency counting with sliding window. HashMap tracks last seen position for O(1) duplicate detection.",
        what: "Longest Without Repeating: hashmap {char → last_index}. When duplicate found, jump left pointer to max(left, last_seen[c]+1). Never move left pointer backward.",
        example: {
          title: "Longest Substring Without Repeating Characters",
          explanation: "HashMap stores {char: last_index}. For each char: if seen and index > left → update left to last_seen+1. Update last_seen[c]=i. Answer = max(i-left+1).",
          code: {
            python: `def lengthOfLongestSubstring(s):
    last_seen = {}
    left = 0
    best = 0
    for i, c in enumerate(s):
        if c in last_seen and last_seen[c] >= left:
            left = last_seen[c] + 1  # jump past duplicate
        last_seen[c] = i
        best = max(best, i - left + 1)
    return best`,
            cpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char,int> last;
    int left=0, best=0;
    for(int i=0;i<(int)s.size();i++) {
        if(last.count(s[i]) && last[s[i]]>=left)
            left = last[s[i]]+1;
        last[s[i]] = i;
        best = max(best, i-left+1);
    }
    return best;
}`,
            java: `public int lengthOfLongestSubstring(String s) {
    Map<Character,Integer> last = new HashMap<>();
    int left=0, best=0;
    for(int i=0;i<s.length();i++) {
        char c = s.charAt(i);
        if(last.containsKey(c) && last.get(c)>=left)
            left = last.get(c)+1;
        last.put(c,i);
        best = Math.max(best, i-left+1);
    }
    return best;
}`
          }
        },
        keyInsight: "last_seen[c] >= left check is critical — only jump if the duplicate is inside the current window. Without it you'd move left backward.",
        template: {
          python: `# Sliding window with hashmap (char → last index):
last_seen = {}; left = 0; best = 0
for i, c in enumerate(s):
    if c in last_seen and last_seen[c] >= left:
        left = last_seen[c] + 1  # only if inside window
    last_seen[c] = i
    best = max(best, i - left + 1)`,
          cpp: `unordered_map<char,int> last;
int left=0;
for(int i=0;i<n;i++){
    if(last.count(s[i])&&last[s[i]]>=left) left=last[s[i]]+1;
    last[s[i]]=i;
    best=max(best,i-left+1);
}`,
          java: `Map<Character,Integer> last=new HashMap<>();
int left=0;
for(int i=0;i<n;i++){
    char c=s.charAt(i);
    if(last.containsKey(c)&&last.get(c)>=left) left=last.get(c)+1;
    last.put(c,i); best=Math.max(best,i-left+1);
}`
        }
      },
      {
        day: "Fri — Sliding Window on Strings",
        where: "Minimum Window Substring, Find All Anagrams, Longest Substring with K Distinct.",
        when: "These are the hardest string problems. Sliding window with frequency maps — expand right, shrink left when invalid.",
        what: "Minimum Window Substring: need/have counters. Add right char → if freq matches needed, have++. Shrink left → if removing breaks match, have--. Record when have==need.",
        example: {
          title: "Minimum Window Substring",
          explanation: "need = Counter(t). Window expands right; when window[c] == need[c], increment 'have'. When have==len(need), try shrinking from left. Track minimum window seen.",
          code: {
            python: `from collections import Counter
def minWindow(s, t):
    if not t: return ""
    need = Counter(t)
    have, required = 0, len(need)
    window = {}
    left = 0
    res = ""
    res_len = float('inf')
    for right, c in enumerate(s):
        window[c] = window.get(c, 0) + 1
        if c in need and window[c] == need[c]:
            have += 1
        while have == required:
            # update result
            if right - left + 1 < res_len:
                res_len = right - left + 1
                res = s[left:right+1]
            # shrink left
            lc = s[left]
            window[lc] -= 1
            if lc in need and window[lc] < need[lc]:
                have -= 1
            left += 1
    return res`,
            cpp: `string minWindow(string s, string t) {
    unordered_map<char,int> need, window;
    for(char c:t) need[c]++;
    int have=0, required=need.size();
    int left=0, minLen=INT_MAX, start=0;
    for(int r=0;r<(int)s.size();r++){
        window[s[r]]++;
        if(need.count(s[r])&&window[s[r]]==need[s[r]]) have++;
        while(have==required){
            if(r-left+1<minLen){minLen=r-left+1;start=left;}
            window[s[left]]--;
            if(need.count(s[left])&&window[s[left]]<need[s[left]]) have--;
            left++;
        }
    }
    return minLen==INT_MAX?"":s.substr(start,minLen);
}`,
            java: `public String minWindow(String s, String t) {
    Map<Character,Integer> need=new HashMap<>(), win=new HashMap<>();
    for(char c:t.toCharArray()) need.merge(c,1,Integer::sum);
    int have=0,req=need.size(),left=0,minLen=Integer.MAX_VALUE,start=0;
    for(int r=0;r<s.length();r++){
        char c=s.charAt(r); win.merge(c,1,Integer::sum);
        if(need.containsKey(c)&&win.get(c).equals(need.get(c))) have++;
        while(have==req){
            if(r-left+1<minLen){minLen=r-left+1;start=left;}
            char lc=s.charAt(left); win.merge(lc,-1,Integer::sum);
            if(need.containsKey(lc)&&win.get(lc)<need.get(lc)) have--;
            left++;
        }
    }
    return minLen==Integer.MAX_VALUE?"":s.substring(start,start+minLen);
}`
          }
        },
        keyInsight: "have/need counters: 'have' only increments when window[c] exactly equals need[c] (not more). This prevents overcounting when frequency exceeds needed.",
        template: {
          python: `need = Counter(t)
have, required = 0, len(need)
window = {}; left = 0
for right, c in enumerate(s):
    window[c] = window.get(c,0)+1
    if c in need and window[c]==need[c]: have+=1
    while have==required:
        # record answer
        lc = s[left]; window[lc]-=1
        if lc in need and window[lc]<need[lc]: have-=1
        left+=1`,
          cpp: `// have++ only when window[c]==need[c] (exact match)
// have-- when window[lc]<need[lc] after shrink`,
          java: `// same: have tracks exact frequency matches
// shrink while have==required`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review all week 6 patterns: matrix manipulation, string hashing, sliding window.",
        when: "Matrix problems need transpose/spiral tricks. String problems need freq[26] or hashmap. Sliding window problems need expand/shrink logic.",
        what: "5 patterns: Rotate (transpose+reverse), Staircase search (top-right), Group anagrams (sorted key), Longest no-repeat (last_seen map), Min window (have/need counters).",
        example: {
          title: "Pattern Decision Guide",
          explanation: "Rotate matrix → transpose+reverse. Search sorted matrix → staircase from top-right. Anagram → sorted key or freq[26]. Sliding window with chars → hashmap + have/need.",
          code: {
            python: `# Rotate 90° CW → transpose + reverse rows
# Search row-col sorted → staircase (top-right)
# Group anagrams → sorted(s) as key
# Longest no-repeat → last_seen hashmap
# Min window substring → have/need + shrink`,
            cpp: `// Rotate → transpose + reverse
// Staircase → (0,cols-1), r++/c-- decision
// Anagram → sort key
// No-repeat → last index map
// Min window → have==required check`,
            java: `// Same 5 patterns
// All O(n) or O(m+n) time`
          }
        },
        keyInsight: "Matrix problems = geometry tricks (transpose/spiral/staircase). String problems = frequency counting. Both are standard OA patterns.",
        template: {
          python: `# Quick reference:
# Rotate → swap(i,j)/(j,i) then row.reverse()
# Staircase → r=0,c=cols-1; r++/c-- by comparison
# Anagram key → tuple(sorted(s))
# No-repeat → last[c]>=left check before jump
# Min window → have/need + while have==req: shrink`,
          cpp: `// Rotate: transpose + reverse
// Staircase: top-right start
// Anagram: sort string as key`,
          java: `// Same patterns work identically`
        }
      },
      {
        day: "Sun — Mock + Assessment",
        where: "Apply all week 6 patterns under timed conditions. Amazon/Samsung OAs heavily test matrix.",
        when: "Matrix rotation and spiral are literal Samsung SWC OA questions. Min window substring is classic Amazon. Group anagrams is Google.",
        what: "For matrix questions: state 'I'll use the transpose+reverse trick for O(1) space rotation.' For string windows: draw the expand/shrink diagram before coding.",
        example: {
          title: "Week 6 Interview Approach",
          explanation: "Matrix rotation: say 'transpose then reverse rows — O(1) extra space.' Spiral: say 'I'll use 4 boundary pointers, shrink after each side.' Min window: say 'have/need counters, O(n+m) time.'",
          code: {
            python: `# Rotate → "transpose + reverse, O(1) space"
# Spiral → "4 boundaries: top,bottom,left,right"
# Group anagrams → "sorted string as key, O(n·k·log k)"
# Min window → "have/need, O(n+m), sliding window"
# Staircase → "top-right start, O(m+n)"`,
            cpp: `// For each: state time/space upfront
// Then draw example, trace algorithm
// Then code from template`,
            java: `// State complexity first, then code
// Matrix: O(n²) time, O(1) space
// Sliding window: O(n) time, O(k) space`
          }
        },
        keyInsight: "Samsung OA = matrix rotation guaranteed. Amazon OA = sliding window on strings. Know these two cold before your interview.",
        template: {
          python: `# Assessment prep checklist:
# ✓ Rotate 90° CW: transpose + reverse
# ✓ Spiral: shrinking boundaries
# ✓ Staircase: top-right corner
# ✓ Set zeroes: first row/col markers
# ✓ Group anagrams: sorted key
# ✓ Min window: have/need counters`,
          cpp: `// Same checklist in C++
// Practice all 6 patterns from memory`,
          java: `// Same: all 6 patterns from memory`
        }
      }
    ]
  },

  7: {
    title: "Linked List",
    tagline: "Pointer manipulation mastery — reversal, fast-slow, dummy head, and cache design.",
    days: [
      { day: "Mon — Reversal Patterns",
        where: "Reversing full list, partial (between positions m and n), or k-group reversal.",
        when: "Any problem involving reversing order in a linked list. The 3-pointer technique works for all variants.",
        what: "3 pointers: prev, curr, next. Save next → flip curr.next to prev → advance both. After loop, prev = new head.",
        example: { title: "Reverse Linked List (Iterative + Recursive)",
          explanation: "Iterative: prev=None, curr=head. Each step: save next, flip pointer, advance. When curr=None, prev is new head. Recursive: reverse from head.next, then head.next.next=head.",
          code: {
            python: `def reverseList(head):
    prev,curr=None,head
    while curr:
        nxt=curr.next; curr.next=prev
        prev=curr; curr=nxt
    return prev`,
            cpp: `ListNode* reverseList(ListNode* head){
    ListNode *prev=nullptr,*curr=head;
    while(curr){
        ListNode* nxt=curr->next;
        curr->next=prev; prev=curr; curr=nxt;
    }
    return prev;
}`,
            java: `public ListNode reverseList(ListNode head){
    ListNode prev=null,curr=head;
    while(curr!=null){
        ListNode nxt=curr.next;
        curr.next=prev; prev=curr; curr=nxt;
    }
    return prev;
}` } },
        keyInsight: "Always save next BEFORE overwriting curr.next. The order is: save → flip → advance. Never deviate from this order.",
        template: { python: `prev,curr=None,head
while curr:
    nxt=curr.next   # 1. save
    curr.next=prev  # 2. flip
    prev=curr       # 3. advance prev
    curr=nxt        # 4. advance curr
return prev`,
          cpp: `ListNode *prev=nullptr,*curr=head;
while(curr){
    ListNode* nxt=curr->next;
    curr->next=prev; prev=curr; curr=nxt;
}`,
          java: `ListNode prev=null,curr=head;
while(curr!=null){
    ListNode nxt=curr.next;
    curr.next=prev; prev=curr; curr=nxt;
}` } },
      { day: "Tue — Fast-Slow Pointer",
        where: "Find middle, detect cycle, find cycle start, find kth from end.",
        when: "O(1) space solutions for linked list structure problems. Fast moves 2x, slow moves 1x.",
        what: "Floyd's algorithm: slow+fast will meet if cycle exists. Middle: fast reaches end when slow is at middle. Kth from end: advance fast by k first, then move both.",
        example: { title: "Linked List Cycle Detection + Middle",
          explanation: "Cycle: slow meets fast inside cycle. No cycle: fast reaches null. Middle: when fast=null/null.next, slow=middle. For even length, slow=second middle.",
          code: {
            python: `def hasCycle(head):
    slow=fast=head
    while fast and fast.next:
        slow=slow.next; fast=fast.next.next
        if slow==fast: return True
    return False

def middleNode(head):
    slow=fast=head
    while fast and fast.next:
        slow=slow.next; fast=fast.next.next
    return slow`,
            cpp: `bool hasCycle(ListNode* head){
    ListNode *slow=head,*fast=head;
    while(fast&&fast->next){
        slow=slow->next; fast=fast->next->next;
        if(slow==fast) return true;
    }
    return false;
}`,
            java: `public boolean hasCycle(ListNode head){
    ListNode slow=head,fast=head;
    while(fast!=null&&fast.next!=null){
        slow=slow.next; fast=fast.next.next;
        if(slow==fast) return true;
    }
    return false;
}` } },
        keyInsight: "Fast-slow solves 3 problems in 1 pass: middle detection, cycle detection, kth from end. All O(1) space. Learn all 3.",
        template: { python: `slow=fast=head
while fast and fast.next:
    slow=slow.next; fast=fast.next.next
    if slow==fast: break  # cycle!
# no break → no cycle; slow=middle`,
          cpp: `ListNode *slow=head,*fast=head;
while(fast&&fast->next){
    slow=slow->next; fast=fast->next->next;
    if(slow==fast){ /* cycle */ break; }
}`,
          java: `ListNode slow=head,fast=head;
while(fast!=null&&fast.next!=null){
    slow=slow.next; fast=fast.next.next;
    if(slow==fast) break;
}` } },
      { day: "Wed — Dummy Head + Merge",
        where: "Merging sorted lists, building new lists, removing Nth node.",
        when: "Any time you're constructing or modifying a linked list and might need to change the head. Dummy head eliminates all null checks.",
        what: "Dummy node at start: curr=dummy. Attach nodes to curr.next, advance curr. Return dummy.next. Never need to handle empty-result edge case.",
        example: { title: "Merge Two Sorted Lists",
          explanation: "Dummy head → no special case for first node. Compare l1.val vs l2.val, attach smaller, advance that pointer. Attach remaining list at end.",
          code: {
            python: `def mergeTwoLists(l1,l2):
    dummy=curr=ListNode(0)
    while l1 and l2:
        if l1.val<=l2.val: curr.next=l1; l1=l1.next
        else: curr.next=l2; l2=l2.next
        curr=curr.next
    curr.next=l1 or l2
    return dummy.next`,
            cpp: `ListNode* mergeTwoLists(ListNode* l1,ListNode* l2){
    ListNode dummy(0),*curr=&dummy;
    while(l1&&l2){
        if(l1->val<=l2->val){curr->next=l1;l1=l1->next;}
        else{curr->next=l2;l2=l2->next;}
        curr=curr->next;
    }
    curr->next=l1?l1:l2;
    return dummy.next;
}`,
            java: `public ListNode mergeTwoLists(ListNode l1,ListNode l2){
    ListNode dummy=new ListNode(0),curr=dummy;
    while(l1!=null&&l2!=null){
        if(l1.val<=l2.val){curr.next=l1;l1=l1.next;}
        else{curr.next=l2;l2=l2.next;}
        curr=curr.next;
    }
    curr.next=l1!=null?l1:l2;
    return dummy.next;
}` } },
        keyInsight: "Dummy head = never worry about null head. Always use it when building a linked list. Return dummy.next at the end.",
        template: { python: `dummy=curr=ListNode(0)
while condition:
    curr.next=chosen_node
    advance chosen list pointer
    curr=curr.next
curr.next=remaining
return dummy.next`,
          cpp: `ListNode dummy(0),*curr=&dummy;
// build list; return dummy.next`,
          java: `ListNode dummy=new ListNode(0),curr=dummy;
// build list; return dummy.next` } },
      { day: "Thu — Hard Pointer Tricks",
        where: "Deep copy with random pointers, reorder list (L0→Ln→L1→Ln-1).",
        when: "Complex pointer rewiring problems. HashMap cloning avoids complex in-place tricks.",
        what: "Copy list with random pointer: hashmap {original→clone}. First pass: create all clones. Second pass: wire next and random using the map.",
        example: { title: "Copy List with Random Pointer",
          explanation: "Pass 1: for each node, create its clone in hashmap. Pass 2: for each node, set clone.next=map[orig.next], clone.random=map[orig.random]. Return map[head].",
          code: {
            python: `def copyRandomList(head):
    if not head: return None
    mp={}
    curr=head
    while curr: mp[curr]=Node(curr.val); curr=curr.next
    curr=head
    while curr:
        if curr.next: mp[curr].next=mp[curr.next]
        if curr.random: mp[curr].random=mp[curr.random]
        curr=curr.next
    return mp[head]`,
            cpp: `Node* copyRandomList(Node* head){
    if(!head) return nullptr;
    unordered_map<Node*,Node*> mp;
    for(Node* c=head;c;c=c->next) mp[c]=new Node(c->val);
    for(Node* c=head;c;c=c->next){
        if(c->next) mp[c]->next=mp[c->next];
        if(c->random) mp[c]->random=mp[c->random];
    }
    return mp[head];
}`,
            java: `public Node copyRandomList(Node head){
    if(head==null) return null;
    Map<Node,Node> mp=new HashMap<>();
    for(Node c=head;c!=null;c=c.next) mp.put(c,new Node(c.val));
    for(Node c=head;c!=null;c=c.next){
        if(c.next!=null) mp.get(c).next=mp.get(c.next);
        if(c.random!=null) mp.get(c).random=mp.get(c.random);
    }
    return mp.get(head);
}` } },
        keyInsight: "Two-pass hashmap: build all nodes first, then wire connections. Clean O(n) approach — no in-place tricks needed.",
        template: { python: `mp={}
# Pass 1: create clones
curr=head
while curr: mp[curr]=Node(curr.val); curr=curr.next
# Pass 2: wire
curr=head
while curr:
    if curr.next: mp[curr].next=mp[curr.next]
    if curr.random: mp[curr].random=mp[curr.random]
    curr=curr.next`,
          cpp: `unordered_map<Node*,Node*> mp;
// pass1: mp[c]=new Node(c->val)
// pass2: mp[c]->next=mp[c->next] etc`,
          java: `Map<Node,Node> mp=new HashMap<>();
// pass1: mp.put(c,new Node(c.val))
// pass2: mp.get(c).next=mp.get(c.next)` } },
      { day: "Fri — LRU Cache Design",
        where: "Implementing LRU Cache: O(1) get and O(1) put with eviction of least recently used.",
        when: "Any cache design problem. Doubly linked list maintains order, hashmap gives O(1) access.",
        what: "DLL: most recent at head, least recent at tail. Hashmap: key→node for O(1) access. Get: move to head. Put: add to head. Evict: remove tail. Sentinel head/tail avoid null checks.",
        example: { title: "LRU Cache (Python OrderedDict)",
          explanation: "Python: OrderedDict with move_to_end and popitem(last=False). Java: extend LinkedHashMap with accessOrder=true. C++: list+map with splice for O(1) move.",
          code: {
            python: `from collections import OrderedDict
class LRUCache:
    def __init__(self,capacity):
        self.cap=capacity; self.cache=OrderedDict()
    def get(self,key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key); return self.cache[key]
    def put(self,key,value):
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key]=value
        if len(self.cache)>self.cap: self.cache.popitem(last=False)`,
            cpp: `class LRUCache{
    int cap;
    list<pair<int,int>> dll;
    unordered_map<int,list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int c):cap(c){}
    int get(int k){
        if(!mp.count(k)) return -1;
        dll.splice(dll.begin(),dll,mp[k]);
        return mp[k]->second;
    }
    void put(int k,int v){
        if(mp.count(k)) dll.erase(mp[k]);
        dll.push_front({k,v}); mp[k]=dll.begin();
        if((int)dll.size()>cap){mp.erase(dll.back().first);dll.pop_back();}
    }
};`,
            java: `class LRUCache extends LinkedHashMap<Integer,Integer>{
    int cap;
    public LRUCache(int c){super(c,0.75f,true);cap=c;}
    public int get(int k){return super.getOrDefault(k,-1);}
    public void put(int k,int v){super.put(k,v);}
    protected boolean removeEldestEntry(Map.Entry e){return size()>cap;}
}` } },
        keyInsight: "Python: OrderedDict. Java: LinkedHashMap(capacity, 0.75, true). C++: list+unordered_map. The data structures do the heavy lifting.",
        template: { python: `from collections import OrderedDict
# move_to_end(key) = mark as recently used
# popitem(last=False) = evict LRU (front)`,
          cpp: `list<pair<int,int>> dll;
unordered_map<int,list<pair<int,int>>::iterator> mp;
// dll.splice(dll.begin(),dll,mp[k]) = O(1) move to front`,
          java: `extends LinkedHashMap<Integer,Integer>
// accessOrder=true in constructor
// override removeEldestEntry` } },
      { day: "Sat — Revision",
        where: "Review all 5 linked list patterns from this week.",
        when: "Identify the right technique before writing a single line of code.",
        what: "5 patterns: 3-pointer reversal, fast-slow, dummy head merge, hashmap clone, DLL+hashmap cache.",
        example: { title: "Pattern Selector",
          explanation: "Reverse? → 3-pointer. Middle/Cycle? → fast-slow. Build/Merge list? → dummy head. Clone with random? → hashmap. LRU? → OrderedDict/LinkedHashMap/DLL+map.",
          code: {
            python: `# Reverse → prev,curr=None,head
# Middle/Cycle → slow=fast=head; fast moves 2x
# Merge → dummy=ListNode(0); return dummy.next
# Clone → {orig:clone} hashmap, 2 passes
# LRU → OrderedDict`,
            cpp: `// Reverse → ListNode *prev=nullptr,*curr=head
// Middle → slow/fast
// Merge → ListNode dummy(0)
// LRU → list+unordered_map<int,iterator>`,
            java: `// Reverse → prev=null,curr=head
// Merge → new ListNode(0) dummy
// LRU → extends LinkedHashMap` } },
        keyInsight: "Linked list = pointer rewiring. Always draw boxes and arrows before coding. Trace 3-4 steps on paper first.",
        template: { python: `# Edge cases every time:
if not head: return None
if not head.next: return head
# then main logic`,
          cpp: `if(!head) return nullptr;
if(!head->next) return head;`,
          java: `if(head==null) return null;
if(head.next==null) return head;` } },
      { day: "Sun — Mock",
        where: "Apply linked list patterns in timed interview setting.",
        when: "Linked list problems test pointer clarity. Draw the list before coding — interviewers value this.",
        what: "Always draw the linked list. Trace your algorithm on 3-4 node example. Verify: empty list, single node, two nodes.",
        example: { title: "Interview Process for Linked Lists",
          explanation: "Say your pointer names out loud: 'I'll use prev, curr, and nxt.' Draw the before/after state. This structured approach impresses interviewers.",
          code: {
            python: `# Before any code:
# Draw: 1→2→3→4→None
# Trace: None←1  2→3→4→None  (after 1 iteration)
# Identify base case and loop invariant
# Then code exactly what you traced`,
            cpp: `// 1. Draw nodes as boxes with arrows
// 2. Trace first 2 iterations manually
// 3. Identify what happens at list end
// 4. Code the traced logic`,
            java: `// Edge cases always check:
// head==null → return null
// head.next==null → return head
// Even vs odd length` } },
        keyInsight: "Drawing the list and tracing pointers catches bugs before coding. Never skip this in an interview.",
        template: { python: `# Interview checklist:
# 1. Draw 4-5 node example
# 2. Trace algorithm step by step
# 3. Identify edge cases (null, single)
# 4. Code and verify against drawing`,
          cpp: `// Draw → Trace → Edge cases → Code`,
          java: `// Same checklist for every linked list problem` } }
    ]
  },

  8: {
    title: "Stack & Queue",
    tagline: "Monotonic stack solves next-greater in O(n). Deque solves sliding-window max in O(n).",
    days: [
      { day: "Mon — Stack Basics + Monotonic",
        where: "Next greater/smaller element, daily temperatures, stock span.",
        when: "When you need 'for each element, find the next element that is larger/smaller.' Brute force O(n²) → monotonic stack O(n).",
        what: "Maintain stack in decreasing order (for next-greater). When new element > stack top, the top's answer is found. Pop and record. Push current index.",
        example: { title: "Daily Temperatures",
          explanation: "Stack stores INDICES of temperatures waiting for a warmer day. When temps[i] > temps[stack.top()], pop and set ans[top] = i - top.",
          code: {
            python: `def dailyTemperatures(temps):
    n=len(temps); ans=[0]*n; stack=[]
    for i,t in enumerate(temps):
        while stack and temps[stack[-1]]<t:
            idx=stack.pop(); ans[idx]=i-idx
        stack.append(i)
    return ans`,
            cpp: `vector<int> dailyTemperatures(vector<int>& temps){
    int n=temps.size(); vector<int> ans(n,0); stack<int> st;
    for(int i=0;i<n;i++){
        while(!st.empty()&&temps[st.top()]<temps[i]){
            ans[st.top()]=i-st.top(); st.pop();}
        st.push(i);
    }
    return ans;
}`,
            java: `public int[] dailyTemperatures(int[] temps){
    int n=temps.length; int[] ans=new int[n];
    Deque<Integer> st=new ArrayDeque<>();
    for(int i=0;i<n;i++){
        while(!st.isEmpty()&&temps[st.peek()]<temps[i])
            ans[st.peek()]=i-st.pop();
        st.push(i);
    }
    return ans;
}` } },
        keyInsight: "Monotonic stack is O(n) total: each element pushed once, popped at most once. Nested loop doesn't mean O(n²) here — it's amortized.",
        template: { python: `stack=[]
for i,val in enumerate(arr):
    while stack and arr[stack[-1]]<val:  # < for next-greater
        idx=stack.pop()
        ans[idx]=i-idx  # or val-arr[idx]
    stack.append(i)`,
          cpp: `stack<int> st;
for(int i=0;i<n;i++){
    while(!st.empty()&&arr[st.top()]<arr[i]){
        ans[st.top()]=i-st.top(); st.pop();}
    st.push(i);
}`,
          java: `Deque<Integer> st=new ArrayDeque<>();
for(int i=0;i<n;i++){
    while(!st.isEmpty()&&arr[st.peek()]<arr[i])
        ans[st.peek()]=i-st.pop();
    st.push(i);
}` } },
      { day: "Tue — Histogram + Hard Stack",
        where: "Largest rectangle in histogram, maximal rectangle in binary matrix.",
        when: "When you need to find the largest rectangle that fits within given heights. Classic monotonic stack application.",
        what: "Increasing stack: pop when current height < top. Width = i - stack[-1] - 1 (using stack as left boundary). Append sentinel 0 to force processing all elements.",
        example: { title: "Largest Rectangle in Histogram",
          explanation: "Sentinel 0 at end flushes remaining stack. Sentinel -1 at bottom simplifies width calculation. Width = i - stack.top() - 1 after popping.",
          code: {
            python: `def largestRectangleArea(heights):
    heights.append(0)  # sentinel
    stack=[-1]; max_area=0
    for i,h in enumerate(heights):
        while stack[-1]!=-1 and heights[stack[-1]]>=h:
            height=heights[stack.pop()]
            width=i-stack[-1]-1
            max_area=max(max_area,height*width)
        stack.append(i)
    return max_area`,
            cpp: `int largestRectangleArea(vector<int>& h){
    h.push_back(0); stack<int> st; st.push(-1); int maxA=0;
    for(int i=0;i<(int)h.size();i++){
        while(st.top()!=-1&&h[st.top()]>=h[i]){
            int ht=h[st.top()];st.pop();
            maxA=max(maxA,ht*(i-st.top()-1));}
        st.push(i);}
    return maxA;
}`,
            java: `public int largestRectangleArea(int[] h){
    Deque<Integer> st=new ArrayDeque<>(); st.push(-1); int maxA=0;
    for(int i=0;i<=h.length;i++){
        int cur=i==h.length?0:h[i];
        while(st.peek()!=-1&&h[st.peek()]>=cur){
            int ht=h[st.pop()];
            maxA=Math.max(maxA,ht*(i-st.peek()-1));}
        st.push(i);}
    return maxA;
}` } },
        keyInsight: "Sentinel 0 at heights end + sentinel -1 at stack bottom → uniform width calculation for all bars. No special cases.",
        template: { python: `heights.append(0)  # flush sentinel
stack=[-1]         # width sentinel
for i,h in enumerate(heights):
    while stack[-1]!=-1 and heights[stack[-1]]>=h:
        height=heights[stack.pop()]
        width=i-stack[-1]-1
        max_area=max(max_area,height*width)
    stack.append(i)`,
          cpp: `h.push_back(0); st.push(-1);
// width=i-st.top()-1 after pop`,
          java: `st.push(-1); // sentinel
// cur=i==h.length?0:h[i]
// width=i-st.peek()-1 after pop` } },
      { day: "Wed — Deque + Sliding Window Max",
        where: "Sliding window maximum, minimum window, implementing queue with O(1) max.",
        when: "When you need max/min of a sliding window efficiently. Monotonic deque gives O(n) total.",
        what: "Deque stores INDICES in decreasing value order. Front = index of max. Remove front if expired. Remove back if value ≤ current (they'll never be max while current exists).",
        example: { title: "Sliding Window Maximum",
          explanation: "For each element: 1) Remove expired indices from front (index < i-k+1). 2) Remove smaller indices from back (nums[back] ≤ nums[i]). 3) Push i. 4) Front = current window max.",
          code: {
            python: `from collections import deque
def maxSlidingWindow(nums,k):
    dq=deque(); result=[]
    for i,num in enumerate(nums):
        while dq and dq[0]<i-k+1: dq.popleft()   # expired
        while dq and nums[dq[-1]]<num: dq.pop()   # smaller
        dq.append(i)
        if i>=k-1: result.append(nums[dq[0]])
    return result`,
            cpp: `vector<int> maxSlidingWindow(vector<int>& nums,int k){
    deque<int> dq; vector<int> res;
    for(int i=0;i<(int)nums.size();i++){
        while(!dq.empty()&&dq.front()<i-k+1) dq.pop_front();
        while(!dq.empty()&&nums[dq.back()]<nums[i]) dq.pop_back();
        dq.push_back(i);
        if(i>=k-1) res.push_back(nums[dq.front()]);
    }
    return res;
}`,
            java: `public int[] maxSlidingWindow(int[] nums,int k){
    Deque<Integer> dq=new ArrayDeque<>();
    int[] res=new int[nums.length-k+1]; int idx=0;
    for(int i=0;i<nums.length;i++){
        while(!dq.isEmpty()&&dq.peek()<i-k+1) dq.poll();
        while(!dq.isEmpty()&&nums[dq.peekLast()]<nums[i]) dq.pollLast();
        dq.offer(i);
        if(i>=k-1) res[idx++]=nums[dq.peek()];
    }
    return res;
}` } },
        keyInsight: "4 deque operations: pop-front (expired), pop-back (smaller), push-back (new), peek-front (answer). O(n) total — each element in/out once.",
        template: { python: `from collections import deque
dq=deque()
for i in range(n):
    while dq and dq[0]<=i-k: dq.popleft()       # remove expired
    while dq and arr[dq[-1]]<=arr[i]: dq.pop()   # remove smaller
    dq.append(i)
    if i>=k-1: result.append(arr[dq[0]])          # front=max`,
          cpp: `deque<int> dq;
while(!dq.empty()&&dq.front()<i-k+1) dq.pop_front();
while(!dq.empty()&&arr[dq.back()]<arr[i]) dq.pop_back();
dq.push_back(i);`,
          java: `Deque<Integer> dq=new ArrayDeque<>();
while(!dq.isEmpty()&&dq.peek()<i-k+1) dq.poll();
while(!dq.isEmpty()&&arr[dq.peekLast()]<arr[i]) dq.pollLast();
dq.offer(i);` } },
      { day: "Thu — Expression Evaluation",
        where: "Calculator problems: evaluate expressions with +,-,*,/,(,) from a string.",
        when: "When you need to evaluate a string expression respecting precedence. Stack holds intermediate results.",
        what: "Key trick: apply the PREVIOUS operator when you see a NEW operator. Initialize op='+'. Push to stack for +/-, compute immediately for *//. Sum stack = result.",
        example: { title: "Basic Calculator II",
          explanation: "When we see an operator (or end), apply previous op to current number. +: push num. -: push -num. *: pop, multiply, push. /: pop, divide (truncate toward 0), push.",
          code: {
            python: `def calculate(s):
    stack=[]; num=0; op='+'
    for i,c in enumerate(s):
        if c.isdigit(): num=num*10+int(c)
        if (not c.isdigit() and c!=' ') or i==len(s)-1:
            if op=='+': stack.append(num)
            elif op=='-': stack.append(-num)
            elif op=='*': stack.append(stack.pop()*num)
            elif op=='/': stack.append(int(stack.pop()/num))
            op=c; num=0
    return sum(stack)`,
            cpp: `int calculate(string s){
    stack<int> st; int num=0; char op='+';
    for(int i=0;i<(int)s.size();i++){
        if(isdigit(s[i])) num=num*10+(s[i]-'0');
        if((!isdigit(s[i])&&s[i]!=' ')||i==(int)s.size()-1){
            if(op=='+') st.push(num);
            else if(op=='-') st.push(-num);
            else if(op=='*'){int t=st.top();st.pop();st.push(t*num);}
            else{int t=st.top();st.pop();st.push(t/num);}
            op=s[i]; num=0;}
    }
    int res=0; while(!st.empty()){res+=st.top();st.pop();} return res;
}`,
            java: `public int calculate(String s){
    Deque<Integer> st=new ArrayDeque<>(); int num=0; char op='+';
    for(int i=0;i<s.length();i++){
        char c=s.charAt(i);
        if(Character.isDigit(c)) num=num*10+(c-'0');
        if((!Character.isDigit(c)&&c!=' ')||i==s.length()-1){
            if(op=='+') st.push(num);
            else if(op=='-') st.push(-num);
            else if(op=='*') st.push(st.pop()*num);
            else st.push(st.pop()/num);
            op=c; num=0;}
    }
    int res=0; for(int x:st) res+=x; return res;
}` } },
        keyInsight: "Apply PREVIOUS operator when NEW operator seen. op='+' initially so first number is always pushed. * and / are eager — compute immediately.",
        template: { python: `stack=[]; num=0; op='+'
for i,c in enumerate(s):
    if c.isdigit(): num=num*10+int(c)
    if (not c.isdigit() and c!=' ') or i==len(s)-1:
        # apply op to num
        op=c; num=0
return sum(stack)`,
          cpp: `stack<int> st; int num=0; char op='+';
// apply prev op when new op or end`,
          java: `Deque<Integer> st=new ArrayDeque<>();
int num=0; char op='+';` } },
      { day: "Fri — Min Stack + Design",
        where: "O(1) min/max queries on a dynamic stack. Stack with push, pop, top, getMin.",
        when: "When you need to track minimum/maximum of current stack contents efficiently.",
        what: "Auxiliary min-stack: push to it only when new value ≤ current min. Pop from it only when main top = min top. Top of aux = current global min always.",
        example: { title: "Min Stack",
          explanation: "Two stacks: main and min_stack. Push to min_stack only when val ≤ min_stack.top() (or min_stack empty). Pop from min_stack when main.top() == min_stack.top().",
          code: {
            python: `class MinStack:
    def __init__(self):
        self.stack=[]; self.min_stack=[]
    def push(self,val):
        self.stack.append(val)
        if not self.min_stack or val<=self.min_stack[-1]:
            self.min_stack.append(val)
    def pop(self):
        if self.stack.pop()==self.min_stack[-1]:
            self.min_stack.pop()
    def top(self): return self.stack[-1]
    def getMin(self): return self.min_stack[-1]`,
            cpp: `class MinStack{
    stack<int> st,minSt;
public:
    void push(int v){st.push(v);if(minSt.empty()||v<=minSt.top())minSt.push(v);}
    void pop(){if(st.top()==minSt.top())minSt.pop();st.pop();}
    int top(){return st.top();}
    int getMin(){return minSt.top();}
};`,
            java: `class MinStack{
    Deque<Integer> st=new ArrayDeque<>(),minSt=new ArrayDeque<>();
    public void push(int v){st.push(v);if(minSt.isEmpty()||v<=minSt.peek())minSt.push(v);}
    public void pop(){if(st.peek().equals(minSt.peek()))minSt.pop();st.pop();}
    public int top(){return st.peek();}
    public int getMin(){return minSt.peek();}
}` } },
        keyInsight: "Push to aux when val ≤ current min (not <). Pop from aux only when main top matches aux top. Aux top = current min at all times.",
        template: { python: `stack=[]; min_stack=[]
def push(val):
    stack.append(val)
    if not min_stack or val<=min_stack[-1]: min_stack.append(val)
def pop():
    if stack[-1]==min_stack[-1]: min_stack.pop()
    stack.pop()
def getMin(): return min_stack[-1]`,
          cpp: `// push to minSt if val<=minSt.top()
// pop from both if st.top()==minSt.top()`,
          java: `// Same logic with ArrayDeque` } },
      { day: "Sat — Revision",
        where: "Review monotonic stack, histogram, deque, calculator, min-stack patterns.",
        when: "Match problem type to pattern instantly before coding.",
        what: "Next greater → monotonic stack. Largest rect → increasing stack + sentinels. Sliding max → monotonic deque. Expression → prev-op stack. O(1) min → aux stack.",
        example: { title: "Pattern Summary",
          explanation: "Hear 'next greater/smaller/warmer/span' → monotonic stack. Hear 'sliding window max/min' → deque. Hear 'evaluate expression' → stack with prev-op. Hear 'O(1) getMin' → aux stack.",
          code: {
            python: `# Next greater → monotonic stack (decreasing)
# Largest rectangle → append 0 sentinel, stack=[-1]
# Sliding max → deque (pop expired + smaller)
# Calculator → prev-op applied on new-op
# Min stack → parallel min_stack`,
            cpp: `// Monotonic: O(n) amortized
// Histogram: sentinels 0 and -1
// Deque: 4 operations O(n)
// Calculator: op='+' initially`,
            java: `// Use ArrayDeque for all stack/queue
// push/pop/peek = stack
// offer/poll/peek = queue` } },
        keyInsight: "Amortized O(n) for monotonic stack/deque: each element enters once, exits once. Always explain this to interviewers.",
        template: { python: `# Decision:
# "next greater/smaller" → monotonic stack
# "sliding window max/min" → monotonic deque
# "expression evaluate" → operator stack
# "O(1) min/max query" → auxiliary stack`,
          cpp: `// next greater → stack<int>
// sliding max → deque<int>
// expression → stack<int> + prev op`,
          java: `// all → ArrayDeque<Integer>` } },
      { day: "Sun — Mock",
        where: "Apply stack/queue pattern recognition in timed interview setting.",
        when: "See 'next greater/warmer' → monotonic stack immediately. See 'sliding max' → deque immediately.",
        what: "Explain amortized O(n) upfront. Say: 'Even with a while loop inside the for loop, each element is pushed once and popped at most once — so total ops = 2n = O(n).'",
        example: { title: "Communicating Monotonic Stack",
          explanation: "The key insight to articulate: 'This looks O(n²) because of nested loops, but it's actually O(n) amortized — each element contributes at most 2 operations total.' Say this proactively.",
          code: {
            python: `# Interview script:
# "I'll use a monotonic stack.
#  For each element I pop all elements it resolves.
#  Each element is pushed once and popped at most once,
#  so total work = O(n) amortized, not O(n²)."`,
            cpp: `// Say: "Amortized O(n): n pushes + n pops total
// The inner while iterates over ALL elements
// across ALL outer iterations, not n times each."`,
            java: `// Proactively mention amortized analysis.
// Interviewers test if you know this.` } },
        keyInsight: "Proactively explaining amortized O(n) separates strong candidates. Say it before the interviewer asks.",
        template: { python: `# Interview template explanation:
# 1. State: "I'll use a monotonic stack"
# 2. Explain invariant: stack is always decreasing
# 3. Explain amortized: each element pushed/popped once
# 4. State: O(n) time, O(n) space`,
          cpp: `// Amortized = total work across all iterations
// Not work per iteration`,
          java: `// Same explanation works for Java` } }
    ]
  },

  9: {
    title: "Recursion & Backtracking",
    tagline: "Try all possibilities, prune early. Every backtracking problem: choose → explore → undo.",
    days: [
      { day: "Mon — Subsets + Permutations",
        where: "Generating all subsets, all permutations, power set.",
        when: "Problem asks 'find ALL possible' arrangements. Backtracking explores every branch of the decision tree.",
        what: "Subsets: at each element, include or exclude (2^n total). The start index prevents revisiting earlier elements. Always snapshot path before returning (path[:]).",
        example: { title: "Subsets",
          explanation: "At each recursive call, record current path. Then for each remaining element, add to path, recurse, UNDO (pop). The undo step is what makes backtracking work.",
          code: {
            python: `def subsets(nums):
    result=[]; path=[]
    def bt(start):
        result.append(path[:])  # snapshot
        for i in range(start,len(nums)):
            path.append(nums[i])
            bt(i+1)
            path.pop()  # UNDO
    bt(0); return result`,
            cpp: `vector<vector<int>> subsets(vector<int>& nums){
    vector<vector<int>> res; vector<int> path;
    function<void(int)> bt=[&](int start){
        res.push_back(path);
        for(int i=start;i<(int)nums.size();i++){
            path.push_back(nums[i]); bt(i+1); path.pop_back();}
    };
    bt(0); return res;
}`,
            java: `public List<List<Integer>> subsets(int[] nums){
    List<List<Integer>> res=new ArrayList<>();
    bt(nums,0,new ArrayList<>(),res); return res;
}
void bt(int[] nums,int start,List<Integer> path,List<List<Integer>> res){
    res.add(new ArrayList<>(path));
    for(int i=start;i<nums.length;i++){
        path.add(nums[i]); bt(nums,i+1,path,res); path.remove(path.size()-1);}
}` } },
        keyInsight: "path.pop() = UNDO. This is what makes backtracking work. Without it, you'd need to copy the array at every level.",
        template: { python: `def bt(start,path):
    result.append(path[:])  # record state (copy!)
    for i in range(start,n):
        path.append(nums[i])  # choose
        bt(i+1,path)           # explore
        path.pop()             # undo`,
          cpp: `function<void(int)> bt=[&](int start){
    res.push_back(path);  // copy automatically
    for(int i=start;i<n;i++){
        path.push_back(nums[i]); bt(i+1); path.pop_back();}
};`,
          java: `void bt(int start,List<Integer> path){
    res.add(new ArrayList<>(path));  // copy!
    for(int i=start;i<n;i++){
        path.add(nums[i]); bt(i+1,path); path.remove(path.size()-1);}
}` } },
      { day: "Tue — Combination Sum Patterns",
        where: "Finding all combinations summing to target, with/without reuse, with/without duplicates.",
        when: "Combination Sum I (reuse): pass same index i (not i+1). Combination Sum II (no reuse, skip dups): sort + skip same value at same level.",
        what: "Sort first. Skip duplicates at same level: if i>start && nums[i]==nums[i-1] → continue. Pruning: if nums[i]>remaining → break (sorted, so rest too large).",
        example: { title: "Combination Sum II",
          explanation: "Sort candidates. For each position: skip if nums[i]==nums[i-1] AND i>start (not i>0!). This skips duplicate VALUES at same recursion level but allows same value deeper.",
          code: {
            python: `def combinationSum2(candidates,target):
    candidates.sort(); result=[]
    def bt(start,path,rem):
        if rem==0: result.append(path[:]); return
        for i in range(start,len(candidates)):
            if candidates[i]>rem: break
            if i>start and candidates[i]==candidates[i-1]: continue
            path.append(candidates[i])
            bt(i+1,path,rem-candidates[i])
            path.pop()
    bt(0,[],target); return result`,
            cpp: `vector<vector<int>> combinationSum2(vector<int>& c,int target){
    sort(c.begin(),c.end());
    vector<vector<int>> res; vector<int> path;
    function<void(int,int)> bt=[&](int start,int rem){
        if(rem==0){res.push_back(path);return;}
        for(int i=start;i<(int)c.size();i++){
            if(c[i]>rem) break;
            if(i>start&&c[i]==c[i-1]) continue;
            path.push_back(c[i]); bt(i+1,rem-c[i]); path.pop_back();}
    };
    bt(0,target); return res;
}`,
            java: `public List<List<Integer>> combinationSum2(int[] c,int target){
    Arrays.sort(c); List<List<Integer>> res=new ArrayList<>();
    bt(c,target,0,new ArrayList<>(),res); return res;
}
void bt(int[] c,int rem,int start,List<Integer> path,List<List<Integer>> res){
    if(rem==0){res.add(new ArrayList<>(path));return;}
    for(int i=start;i<c.length;i++){
        if(c[i]>rem) break;
        if(i>start&&c[i]==c[i-1]) continue;
        path.add(c[i]); bt(c,rem-c[i],i+1,path,res); path.remove(path.size()-1);}
}` } },
        keyInsight: "i>start (not i>0) for dedup. This allows same value deeper in the tree but skips it at the SAME level. Critical distinction.",
        template: { python: `candidates.sort()
def bt(start,rem):
    if rem==0: record; return
    for i in range(start,n):
        if nums[i]>rem: break       # prune
        if i>start and nums[i]==nums[i-1]: continue  # dedup
        path.append(nums[i])
        bt(i+1,rem-nums[i])         # i+1: no reuse
        path.pop()`,
          cpp: `// sort + if(i>start&&c[i]==c[i-1]) continue
// if(c[i]>rem) break`,
          java: `// sort + if(i>start&&c[i]==c[i-1]) continue` } },
      { day: "Wed — N-Queens + Sudoku",
        where: "N-Queens (place queens with no conflicts), Sudoku solver, constraint satisfaction.",
        when: "When constraints can be checked efficiently and many branches can be pruned early.",
        what: "N-Queens: track used columns, diagonals (r-c = constant), anti-diagonals (r+c = constant). Place queens row by row. O(1) conflict check with sets.",
        example: { title: "N-Queens",
          explanation: "Place queen at row r, column c if: c not in cols AND r-c not in diag AND r+c not in anti_diag. Add to all 3 sets, recurse to next row, then remove (backtrack).",
          code: {
            python: `def solveNQueens(n):
    cols=set(); diag=set(); anti=set()
    result=[]; board=[0]*n
    def bt(row):
        if row==n:
            result.append(['.'*c+'Q'+'.'*(n-1-c) for c in board]); return
        for col in range(n):
            if col in cols or row-col in diag or row+col in anti: continue
            cols.add(col); diag.add(row-col); anti.add(row+col)
            board[row]=col; bt(row+1)
            cols.remove(col); diag.remove(row-col); anti.remove(row+col)
    bt(0); return result`,
            cpp: `vector<vector<string>> solveNQueens(int n){
    vector<vector<string>> res; vector<int> board(n,-1);
    set<int> cols,diag,anti;
    function<void(int)> bt=[&](int row){
        if(row==n){
            vector<string> s(n,string(n,'.'));
            for(int r=0;r<n;r++) s[r][board[r]]='Q';
            res.push_back(s); return;}
        for(int c=0;c<n;c++){
            if(cols.count(c)||diag.count(row-c)||anti.count(row+c)) continue;
            cols.insert(c);diag.insert(row-c);anti.insert(row+c);
            board[row]=c; bt(row+1);
            cols.erase(c);diag.erase(row-c);anti.erase(row+c);}
    };
    bt(0); return res;
}`,
            java: `// Set<Integer> cols, diag (r-c), anti (r+c)
// Place if all 3 sets don't contain the value
// Add before recurse, remove after (backtrack)` } },
        keyInsight: "Diagonal key=r-c (constant along /). Anti-diagonal key=r+c (constant along \\). O(1) conflict check — sets not 2D board scan.",
        template: { python: `cols=set(); diag=set(); anti=set()
def ok(r,c): return c not in cols and r-c not in diag and r+c not in anti
def add(r,c): cols.add(c); diag.add(r-c); anti.add(r+c)
def rem(r,c): cols.remove(c); diag.remove(r-c); anti.remove(r+c)`,
          cpp: `set<int> cols,diag,anti;
bool ok(int r,int c){return !cols.count(c)&&!diag.count(r-c)&&!anti.count(r+c);}`,
          java: `Set<Integer> cols=new HashSet<>(),diag=new HashSet<>(),anti=new HashSet<>();
boolean ok(int r,int c){return !cols.contains(c)&&!diag.contains(r-c)&&!anti.contains(r+c);}` } },
      { day: "Thu — Word Search + Grid BT",
        where: "Word search on a grid, path finding with constraints, knight's tour.",
        when: "DFS backtracking on a 2D grid — find a path spelling a word or satisfying a constraint.",
        what: "Modify grid in-place to mark visited (temp=grid[r][c]; grid[r][c]='#'; recurse; grid[r][c]=temp). Avoids O(m*n) visited array.",
        example: { title: "Word Search",
          explanation: "For each cell matching word[0], DFS exploring 4 directions. Mark cell '#' to prevent revisit. Restore after recursion. Return True as soon as word found.",
          code: {
            python: `def exist(board,word):
    rows,cols=len(board),len(board[0])
    def dfs(r,c,idx):
        if idx==len(word): return True
        if r<0 or r>=rows or c<0 or c>=cols: return False
        if board[r][c]!=word[idx]: return False
        tmp,board[r][c]=board[r][c],'#'
        found=any(dfs(r+dr,c+dc,idx+1) for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)])
        board[r][c]=tmp; return found
    return any(dfs(r,c,0) for r in range(rows) for c in range(cols))`,
            cpp: `bool exist(vector<vector<char>>& b,string w){
    int rows=b.size(),cols=b[0].size();
    function<bool(int,int,int)> dfs=[&](int r,int c,int i)->bool{
        if(i==(int)w.size()) return true;
        if(r<0||r>=rows||c<0||c>=cols||b[r][c]!=w[i]) return false;
        char tmp=b[r][c]; b[r][c]='#';
        bool f=dfs(r+1,c,i+1)||dfs(r-1,c,i+1)||dfs(r,c+1,i+1)||dfs(r,c-1,i+1);
        b[r][c]=tmp; return f;
    };
    for(int r=0;r<rows;r++) for(int c=0;c<cols;c++) if(dfs(r,c,0)) return true;
    return false;
}`,
            java: `public boolean exist(char[][] b,String w){
    for(int r=0;r<b.length;r++) for(int c=0;c<b[0].length;c++) if(dfs(b,w,r,c,0)) return true;
    return false;
}
boolean dfs(char[][] b,String w,int r,int c,int i){
    if(i==w.length()) return true;
    if(r<0||r>=b.length||c<0||c>=b[0].length||b[r][c]!=w.charAt(i)) return false;
    char tmp=b[r][c]; b[r][c]='#';
    boolean f=dfs(b,w,r+1,c,i+1)||dfs(b,w,r-1,c,i+1)||dfs(b,w,r,c+1,i+1)||dfs(b,w,r,c-1,i+1);
    b[r][c]=tmp; return f;
}` } },
        keyInsight: "tmp=board[r][c]; board[r][c]='#'; recurse; board[r][c]=tmp — this is the grid backtracking pattern. In-place mark + restore.",
        template: { python: `def dfs(r,c,idx):
    if idx==len(word): return True
    if out_of_bounds or not_matching: return False
    tmp,board[r][c]=board[r][c],'#'  # mark
    found=any(dfs(r+dr,c+dc,idx+1) for dr,dc in DIRS)
    board[r][c]=tmp                    # restore
    return found`,
          cpp: `char tmp=b[r][c]; b[r][c]='#';
bool f=dfs(...)|| dfs(...)||...;
b[r][c]=tmp; return f;`,
          java: `char tmp=b[r][c]; b[r][c]='#';
boolean f=dfs(...)|| ...;
b[r][c]=tmp; return f;` } },
      { day: "Fri — Palindrome Partition + Advanced",
        where: "Palindrome partitioning, letter combinations, phone number combinations.",
        when: "When choices at each step depend on validity checks (is palindrome? is valid word?). Add pruning to cut invalid branches.",
        what: "Palindrome partition: at each start position, try substrings ending at each end. If palindrome, add to path and recurse from end. Precompute palindrome table to avoid O(n) check per call.",
        example: { title: "Palindrome Partitioning",
          explanation: "For each starting position, extend end until non-palindrome. For each valid palindrome substring, add to path and recurse from end position. Record when start==n.",
          code: {
            python: `def partition(s):
    n=len(s); result=[]
    # Precompute palindromes
    dp=[[False]*n for _ in range(n)]
    for i in range(n): dp[i][i]=True
    for l in range(2,n+1):
        for i in range(n-l+1):
            j=i+l-1
            dp[i][j]=s[i]==s[j] and (l==2 or dp[i+1][j-1])
    def bt(start,path):
        if start==n: result.append(path[:]); return
        for end in range(start+1,n+1):
            if dp[start][end-1]:
                path.append(s[start:end]); bt(end,path); path.pop()
    bt(0,[]); return result`,
            cpp: `vector<vector<string>> partition(string s){
    int n=s.size(); vector<vector<string>> res; vector<string> path;
    vector<vector<bool>> dp(n,vector<bool>(n,false));
    for(int i=0;i<n;i++) dp[i][i]=true;
    for(int l=2;l<=n;l++) for(int i=0;i+l-1<n;i++){int j=i+l-1;dp[i][j]=s[i]==s[j]&&(l==2||dp[i+1][j-1]);}
    function<void(int)> bt=[&](int start){
        if(start==n){res.push_back(path);return;}
        for(int end=start+1;end<=n;end++)
            if(dp[start][end-1]){path.push_back(s.substr(start,end-start));bt(end);path.pop_back();}
    };
    bt(0); return res;
}`,
            java: `public List<List<String>> partition(String s){
    int n=s.length(); boolean[][] dp=new boolean[n][n];
    for(int i=0;i<n;i++) dp[i][i]=true;
    for(int l=2;l<=n;l++) for(int i=0;i+l-1<n;i++){int j=i+l-1;dp[i][j]=s.charAt(i)==s.charAt(j)&&(l==2||dp[i+1][j-1]);}
    List<List<String>> res=new ArrayList<>();
    bt(s,0,new ArrayList<>(),res,dp); return res;
}
void bt(String s,int start,List<String> path,List<List<String>> res,boolean[][] dp){
    if(start==s.length()){res.add(new ArrayList<>(path));return;}
    for(int end=start+1;end<=s.length();end++)
        if(dp[start][end-1]){path.add(s.substring(start,end));bt(s,end,path,res,dp);path.remove(path.size()-1);}
}` } },
        keyInsight: "Precompute palindrome DP table in O(n²) to make palindrome check O(1) per call. Without it: O(n³) total. Always precompute.",
        template: { python: `# Precompute palindrome table:
dp=[[False]*n for _ in range(n)]
for i in range(n): dp[i][i]=True
for l in range(2,n+1):
    for i in range(n-l+1):
        j=i+l-1
        dp[i][j]=s[i]==s[j] and (l==2 or dp[i+1][j-1])`,
          cpp: `vector<vector<bool>> dp(n,vector<bool>(n,false));
for(int i=0;i<n;i++) dp[i][i]=true;
for(int l=2;l<=n;l++) for(int i=0;i+l-1<n;i++){int j=i+l-1;dp[i][j]=s[i]==s[j]&&(l==2||dp[i+1][j-1]);}`,
          java: `boolean[][] dp=new boolean[n][n];
// same: dp[i][j]=s[i]==s[j]&&(l==2||dp[i+1][j-1])` } },
      { day: "Sat — Revision",
        where: "Review all backtracking patterns. Every problem = same template with different recording/pruning.",
        when: "See 'find all': backtracking. See 'find one': BFS/DFS faster. Backtracking explores entire tree.",
        what: "Template variations: subsets (record every node), combinations (record at leaf when sum=target), permutations (record when len=n), N-Queens (record when row=n).",
        example: { title: "Universal Backtracking Template",
          explanation: "5 questions to answer before coding: 1) What does path represent? 2) When to record? 3) What choices exist? 4) How to prune? 5) How to undo?",
          code: {
            python: `def backtrack(state):
    if is_solution(state):     # base case
        record(state); return
    for choice in get_choices():
        if is_valid(choice):   # prune
            make_choice(choice)  # choose
            backtrack(new_state) # explore
            undo_choice(choice)  # undo`,
            cpp: `function<void(State)> bt=[&](State s){
    if(isSolution(s)){record(s);return;}
    for(auto c:choices(s)){
        if(valid(c,s)){make(c,s);bt(next(s));undo(c,s);}
    }
};`,
            java: `void bt(State s){
    if(isSolution(s)){record(s);return;}
    for(Choice c:choices(s))
        if(valid(c,s)){make(c,s);bt(s);undo(c,s);}
}` } },
        keyInsight: "The art is knowing WHEN to record (every node vs only leaf) and HOW to prune early. Code is always the same template.",
        template: { python: `# Subsets: record every node (before loop)
# Combinations: record at leaf (rem==0)
# Permutations: record at leaf (len==n)
# N-Queens: record at leaf (row==n)
# All: path.append() → recurse → path.pop()`,
          cpp: `// Record at every node → subsets
// Record at leaf → permutations/N-Queens
// Prune: if exceeds → break/return early`,
          java: `// choose → explore → undo
// vary: when to record, when to prune` } },
      { day: "Sun — Mock",
        where: "Apply backtracking pattern recognition in timed interview.",
        when: "'Find all possible...' → backtracking. Draw the decision tree first. Show pruning. State complexity.",
        what: "Decision tree: root has n choices, each node has n-k choices. Total leaves = answer count. Time = O(leaves × path_length). Always draw before coding.",
        example: { title: "Interview Communication for Backtracking",
          explanation: "Say: 'This is a backtracking problem. I'll draw the decision tree — at each position I have n choices, giving O(2^n) or O(n!) total. I'll prune branches that exceed the target early.'",
          code: {
            python: `# Before any code:
# "This is backtracking. Decision tree:
#  - Root: n choices
#  - Each level: fewer choices
#  - Pruning: [describe your condition]
#  - Time: O(2^n * n) with copying
#  Let me trace a small example first."`,
            cpp: `// Draw 2-3 levels of tree
// Show pruning points explicitly
// State complexity: leaves × path_length`,
            java: `// Always draw before coding
// Trace algorithm on 3-4 element example` } },
        keyInsight: "Drawing the decision tree on paper before coding shows deep understanding. Always do this in interviews — it buys thinking time too.",
        template: { python: `# Interview checklist:
# 1. Identify: "find all" → backtracking
# 2. Draw decision tree (2-3 levels)
# 3. Identify pruning condition
# 4. State where to record answer
# 5. Code the universal template`,
          cpp: `// 1. Find all → backtrack
// 2. Draw tree → identify prune
// 3. Code template`,
          java: `// Same 5-step process every time` } }
    ]
  },

  10: {
    title: "Binary Trees",
    tagline: "Every tree problem = traversal + postorder DFS + global variable. Master the pattern.",
    days: [
      { day: "Mon — Traversals (DFS + BFS)",
        where: "Inorder (sorted BST output), preorder (serialize/copy), postorder (delete/evaluate), level-order (BFS).",
        when: "Inorder: need sorted output from BST. Preorder: process before children. Postorder: process after children (bottom-up). Level-order: process by layers.",
        what: "Recursive DFS: trivial. Iterative inorder: push all lefts, pop+record, go right. Level-order: BFS with size-based batching (len(queue) = current level size).",
        example: { title: "All Traversals",
          explanation: "Level-order key insight: snapshot queue size at start of each level. Process exactly that many nodes — they're all from the current level.",
          code: {
            python: `from collections import deque
# Inorder iterative:
def inorder(root):
    res,stack,curr=[],[],root
    while curr or stack:
        while curr: stack.append(curr); curr=curr.left
        curr=stack.pop(); res.append(curr.val); curr=curr.right
    return res
# Level-order:
def levelOrder(root):
    if not root: return []
    q,res=deque([root]),[]
    while q:
        level=[]
        for _ in range(len(q)):
            node=q.popleft(); level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
            cpp: `// Iterative inorder:
vector<int> inorder(TreeNode* root){
    vector<int> res; stack<TreeNode*> st; TreeNode* curr=root;
    while(curr||!st.empty()){
        while(curr){st.push(curr);curr=curr->left;}
        curr=st.top();st.pop();res.push_back(curr->val);curr=curr->right;}
    return res;
}`,
            java: `// Level-order:
List<List<Integer>> levelOrder(TreeNode root){
    List<List<Integer>> res=new ArrayList<>();
    if(root==null) return res;
    Queue<TreeNode> q=new LinkedList<>(); q.offer(root);
    while(!q.isEmpty()){int sz=q.size();List<Integer> level=new ArrayList<>();
        while(sz-->0){TreeNode n=q.poll();level.add(n.val);
            if(n.left!=null)q.offer(n.left);if(n.right!=null)q.offer(n.right);}
        res.add(level);}
    return res;
}` } },
        keyInsight: "Level-order: process exactly len(queue) nodes per level — this is the snapshot trick. Each batch = one tree level.",
        template: { python: `# DFS postorder template (most tree problems):
def dfs(node):
    if not node: return BASE_CASE
    left=dfs(node.left); right=dfs(node.right)
    return combine(node.val,left,right)
# BFS level-order:
q=deque([root])
while q:
    for _ in range(len(q)):  # snapshot size
        node=q.popleft()
        if node.left: q.append(node.left)
        if node.right: q.append(node.right)`,
          cpp: `// Postorder: recurse left, right, then process
// Level: batch by queue.size() snapshot`,
          java: `// Postorder: return combined result
// Level: int sz=q.size() before loop` } },
      { day: "Tue — Height, Balance, Diameter",
        where: "Computing height, checking balance, finding diameter of binary tree.",
        when: "Bottom-up computation: get results from children, combine at current node. Postorder traversal.",
        what: "Height=1+max(L,R). Balanced: |L-R|≤1 at every node. Diameter: at each node = L_height+R_height. Track global max during DFS — return height (not diameter) upward.",
        example: { title: "Diameter of Binary Tree",
          explanation: "At each node, diameter through it = left_height + right_height. Max diameter might not pass through root. Use nonlocal/global to track max. Return height to parent.",
          code: {
            python: `def diameterOfBinaryTree(root):
    max_d=[0]
    def height(node):
        if not node: return 0
        l=height(node.left); r=height(node.right)
        max_d[0]=max(max_d[0],l+r)
        return 1+max(l,r)
    height(root); return max_d[0]`,
            cpp: `int diameterOfBinaryTree(TreeNode* root){
    int maxD=0;
    function<int(TreeNode*)> h=[&](TreeNode* n)->int{
        if(!n) return 0;
        int l=h(n->left),r=h(n->right);
        maxD=max(maxD,l+r); return 1+max(l,r);
    };
    h(root); return maxD;
}`,
            java: `int maxD=0;
public int diameterOfBinaryTree(TreeNode root){height(root);return maxD;}
int height(TreeNode n){
    if(n==null) return 0;
    int l=height(n.left),r=height(n.right);
    maxD=Math.max(maxD,l+r); return 1+Math.max(l,r);
}` } },
        keyInsight: "Use nonlocal/global to track the answer. The recursive function returns something USEFUL to parent (height), not the final answer.",
        template: { python: `max_val=[0]
def dfs(node):
    if not node: return 0
    l=dfs(node.left); r=dfs(node.right)
    max_val[0]=max(max_val[0],l+r)  # update answer
    return 1+max(l,r)                 # return height`,
          cpp: `int maxVal=0;
int dfs(TreeNode* n){
    if(!n) return 0;
    int l=dfs(n->left),r=dfs(n->right);
    maxVal=max(maxVal,l+r); return 1+max(l,r);
}`,
          java: `int maxVal=0;
int dfs(TreeNode n){
    if(n==null) return 0;
    int l=dfs(n.left),r=dfs(n.right);
    maxVal=Math.max(maxVal,l+r); return 1+Math.max(l,r);
}` } },
      { day: "Wed — Path Problems",
        where: "Maximum path sum, path sum to leaf, count paths with given sum.",
        when: "Path through a node = left contribution + right contribution + node value. But only one branch can go upward.",
        what: "Max Path Sum: at each node, gain_L=max(0,dfs(L)), gain_R=max(0,dfs(R)). Path through=val+gainL+gainR. Return val+max(gainL,gainR) to parent (only one branch upward).",
        example: { title: "Binary Tree Maximum Path Sum",
          explanation: "max(0, child_result) = include branch only if positive. Record val+gainL+gainR at each node. But return val+max(gainL,gainR) upward — can't fork at parent.",
          code: {
            python: `def maxPathSum(root):
    max_sum=[float('-inf')]
    def dfs(node):
        if not node: return 0
        l=max(0,dfs(node.left)); r=max(0,dfs(node.right))
        max_sum[0]=max(max_sum[0],node.val+l+r)
        return node.val+max(l,r)
    dfs(root); return max_sum[0]`,
            cpp: `int maxPathSum(TreeNode* root){
    int maxS=INT_MIN;
    function<int(TreeNode*)> dfs=[&](TreeNode* n)->int{
        if(!n) return 0;
        int l=max(0,dfs(n->left)),r=max(0,dfs(n->right));
        maxS=max(maxS,n->val+l+r); return n->val+max(l,r);
    };
    dfs(root); return maxS;
}`,
            java: `int maxS=Integer.MIN_VALUE;
public int maxPathSum(TreeNode root){dfs(root);return maxS;}
int dfs(TreeNode n){
    if(n==null) return 0;
    int l=Math.max(0,dfs(n.left)),r=Math.max(0,dfs(n.right));
    maxS=Math.max(maxS,n.val+l+r); return n.val+Math.max(l,r);
}` } },
        keyInsight: "max(0, child) = 'include branch only if it adds value.' Return one branch upward. Record both at current node. This is the whole algorithm.",
        template: { python: `max_ans=[float('-inf')]
def dfs(node):
    if not node: return 0
    l=max(0,dfs(node.left))    # ignore negative branch
    r=max(0,dfs(node.right))
    max_ans[0]=max(max_ans[0],node.val+l+r)  # record
    return node.val+max(l,r)  # return best single branch`,
          cpp: `int maxAns=INT_MIN;
int dfs(TreeNode* n){
    if(!n) return 0;
    int l=max(0,dfs(n->left)),r=max(0,dfs(n->right));
    maxAns=max(maxAns,n->val+l+r); return n->val+max(l,r);
}`,
          java: `int maxAns=Integer.MIN_VALUE;
int dfs(TreeNode n){
    if(n==null) return 0;
    int l=Math.max(0,dfs(n.left)),r=Math.max(0,dfs(n.right));
    maxAns=Math.max(maxAns,n.val+l+r); return n.val+Math.max(l,r);
}` } },
      { day: "Thu — LCA + Ancestor",
        where: "Finding Lowest Common Ancestor in binary tree or BST.",
        when: "LCA general tree: DFS returning non-null when target found. LCA BST: use BST property to navigate efficiently.",
        what: "General LCA: if both subtrees return non-null → current node is LCA. If one is null → return the non-null. Base: return root if root is p or q.",
        example: { title: "Lowest Common Ancestor",
          explanation: "DFS returns node when it finds p or q. If left AND right both return non-null → current node is LCA. Otherwise propagate whichever is non-null upward.",
          code: {
            python: `def lowestCommonAncestor(root,p,q):
    if not root or root==p or root==q: return root
    left=lowestCommonAncestor(root.left,p,q)
    right=lowestCommonAncestor(root.right,p,q)
    if left and right: return root
    return left or right`,
            cpp: `TreeNode* lowestCommonAncestor(TreeNode* root,TreeNode* p,TreeNode* q){
    if(!root||root==p||root==q) return root;
    auto l=lowestCommonAncestor(root->left,p,q);
    auto r=lowestCommonAncestor(root->right,p,q);
    if(l&&r) return root;
    return l?l:r;
}`,
            java: `public TreeNode lowestCommonAncestor(TreeNode root,TreeNode p,TreeNode q){
    if(root==null||root==p||root==q) return root;
    TreeNode l=lowestCommonAncestor(root.left,p,q);
    TreeNode r=lowestCommonAncestor(root.right,p,q);
    if(l!=null&&r!=null) return root;
    return l!=null?l:r;
}` } },
        keyInsight: "If left AND right both non-null → current is LCA. That's the entire algorithm. 3 lines of logic total.",
        template: { python: `def lca(root,p,q):
    if not root or root in (p,q): return root
    l=lca(root.left,p,q); r=lca(root.right,p,q)
    return root if (l and r) else (l or r)`,
          cpp: `TreeNode* lca(TreeNode* r,TreeNode* p,TreeNode* q){
    if(!r||r==p||r==q) return r;
    auto l=lca(r->left,p,q),right=lca(r->right,p,q);
    return l&&right?r:l?l:right;
}`,
          java: `TreeNode lca(TreeNode r,TreeNode p,TreeNode q){
    if(r==null||r==p||r==q) return r;
    TreeNode l=lca(r.left,p,q),right=lca(r.right,p,q);
    return l!=null&&right!=null?r:l!=null?l:right;
}` } },
      { day: "Fri — Construction + Serialization",
        where: "Build tree from preorder+inorder, serialize/deserialize, right side view.",
        when: "Construct from preorder+inorder: preorder[0]=root, find in inorder → left/right split. Hashmap for O(1) inorder lookup.",
        what: "Build tree: preorder gives roots top-down. Inorder gives left/right split at root. Hashmap {val→inorder_index} makes splits O(1). Track preorder index globally.",
        example: { title: "Construct from Preorder + Inorder",
          explanation: "Preorder[preIdx]=root. Find root in inorder_map. Left subtree: inorder[l..mid-1], preorder[preIdx+1..]. Right: inorder[mid+1..r]. Increment preIdx for each node.",
          code: {
            python: `def buildTree(preorder,inorder):
    idx_map={val:i for i,val in enumerate(inorder)}
    pre_i=[0]
    def build(l,r):
        if l>r: return None
        val=preorder[pre_i[0]]; pre_i[0]+=1
        node=TreeNode(val); mid=idx_map[val]
        node.left=build(l,mid-1); node.right=build(mid+1,r)
        return node
    return build(0,len(inorder)-1)`,
            cpp: `TreeNode* buildTree(vector<int>& pre,vector<int>& ino){
    unordered_map<int,int> mp;
    for(int i=0;i<(int)ino.size();i++) mp[ino[i]]=i;
    int idx=0;
    function<TreeNode*(int,int)> build=[&](int l,int r)->TreeNode*{
        if(l>r) return nullptr;
        int val=pre[idx++]; TreeNode* root=new TreeNode(val);
        int mid=mp[val];
        root->left=build(l,mid-1); root->right=build(mid+1,r);
        return root;
    };
    return build(0,ino.size()-1);
}`,
            java: `Map<Integer,Integer> mp=new HashMap<>(); int[] preIdx={0};
public TreeNode buildTree(int[] pre,int[] ino){
    for(int i=0;i<ino.length;i++) mp.put(ino[i],i);
    return build(pre,0,ino.length-1);
}
TreeNode build(int[] pre,int l,int r){
    if(l>r) return null;
    int val=pre[preIdx[0]++]; TreeNode root=new TreeNode(val);
    root.left=build(pre,l,mp.get(val)-1);
    root.right=build(pre,mp.get(val)+1,r);
    return root;
}` } },
        keyInsight: "HashMap for inorder lookup = O(1) per node = O(n) total construction. Without it: O(n²). Always use hashmap here.",
        template: { python: `idx_map={val:i for i,val in enumerate(inorder)}
pre_i=[0]
def build(l,r):
    if l>r: return None
    val=preorder[pre_i[0]]; pre_i[0]+=1
    node=TreeNode(val); mid=idx_map[val]
    node.left=build(l,mid-1); node.right=build(mid+1,r)
    return node`,
          cpp: `unordered_map<int,int> mp;
// pre[idx++] = root; mp[root] = mid in inorder`,
          java: `Map<Integer,Integer> mp;
// pre[preIdx[0]++] = root; mp.get(val) = mid` } },
      { day: "Sat — Revision",
        where: "Review all 5 binary tree patterns: traversal, metrics, path, LCA, construction.",
        when: "Most tree problems = postorder DFS with global variable tracking answer.",
        what: "Pattern selector: Height/balance/diameter → postorder DFS. Path max → max(0,child)+node. LCA → both-non-null check. Construction → hashmap+preorder-index.",
        example: { title: "Pattern Summary",
          explanation: "Traversal order: pre=top-down, in=sorted-BST, post=bottom-up, level=BFS. Most problems are postorder (process children first, combine at node).",
          code: {
            python: `# Height/balance/diameter → postorder, global max
# Max path sum → max(0,child)+node, return one branch
# LCA → return root if left AND right non-null
# Level-order → BFS with len(q) snapshot
# Construction → hashmap + pre_idx counter`,
            cpp: `// Postorder: compute left,right → combine
// Path: max(0,l)+max(0,r)+val, return val+max(l,r)
// LCA: l&&r→root, else l?l:r
// BFS: int sz=q.size() before loop`,
            java: `// Same patterns:
// Postorder → bottom-up computation
// Path → global max tracking
// LCA → both-non-null check` } },
        keyInsight: "Universal tree DFS: dfs(node) returns something useful to parent. Global variable tracks the answer. This pattern solves 80% of tree problems.",
        template: { python: `# Universal tree DFS:
ans=[BASE]
def dfs(node):
    if not node: return BASE_CASE
    l=dfs(node.left); r=dfs(node.right)
    ans[0]=max(ans[0],combine(l,r,node.val))
    return useful_value(l,r,node.val)`,
          cpp: `int ans=BASE;
int dfs(TreeNode* n){
    if(!n) return BASE_CASE;
    int l=dfs(n->left),r=dfs(n->right);
    ans=max(ans,combine(l,r,n->val));
    return useful(l,r,n->val);
}`,
          java: `int ans=BASE;
int dfs(TreeNode n){
    if(n==null) return BASE_CASE;
    int l=dfs(n.left),r=dfs(n.right);
    ans=Math.max(ans,combine(l,r,n.val));
    return useful(l,r,n.val);
}` } },
      { day: "Sun — Mock",
        where: "Apply tree pattern recognition in timed interview setting.",
        when: "Before coding, answer: what does dfs() return? How does parent use it? What's base case?",
        what: "Key question: 'What does each call return, and how does parent use it?' Answer this BEFORE writing code. Determines top-down vs bottom-up approach.",
        example: { title: "Interview Framework for Trees",
          explanation: "Ask 4 questions: 1) What does dfs() return? 2) How combine left+right? 3) Base case for null? 4) Global variable needed? Answer these → code writes itself.",
          code: {
            python: `# Framework before every tree problem:
# 1. "dfs() returns: ___" (height? sum? bool?)
# 2. "Parent uses it by: ___" (max? add? check?)
# 3. "Null node returns: ___" (0? -inf? True?)
# 4. "Global variable tracks: ___" (max? count?)
# Then: fill in the template`,
            cpp: `// 1. Return type of dfs?
// 2. How combine left+right?
// 3. null returns?
// 4. Global variable?`,
            java: `// Same 4 questions before every tree problem
// Answer them → code is mechanical` } },
        keyInsight: "Top-down = pass info down (path sum check). Bottom-up = return info up (height/diameter). Most problems bottom-up.",
        template: { python: `# Top-down (pass values down):
def dfs(node,value_from_parent):
    if not node: return
    new_val=compute(node.val,value_from_parent)
    dfs(node.left,new_val); dfs(node.right,new_val)

# Bottom-up (return values up):
def dfs(node):
    if not node: return base
    l,r=dfs(node.left),dfs(node.right)
    return combine(l,r,node.val)`,
          cpp: `// Top-down: extra param passed downward
// Bottom-up: return computed value upward`,
          java: `// Top-down: void dfs(node, param)
// Bottom-up: int/bool dfs(node)` } }
    ]
  },

11: {
    title: "BST + Heaps",
    tagline: "BST gives O(log n) ordered operations. Heap gives O(log n) min/max. Both are essential.",
    days: [
      { day: "Mon — BST Core",
        where: "BST search, insert, delete, in-order traversal gives sorted output.",
        when: "When you need dynamic sorted data with O(log n) search, insert, delete. Inorder BST = sorted array.",
        what: "BST property: left < node < right at every node. Inorder traversal = sorted. Search: compare and go left/right. Insert: reach null, attach. Validate: pass min/max bounds down.",
        example: { title: "Validate BST + Kth Smallest",
          explanation: "Validate: pass (min,max) bounds. Each node must be strictly inside bounds. Left: max=node.val. Right: min=node.val. Kth smallest: inorder traversal with counter.",
          code: {
            python: `def isValidBST(root, lo=float('-inf'), hi=float('inf')):
    if not root: return True
    if not (lo < root.val < hi): return False
    return isValidBST(root.left, lo, root.val) and \
           isValidBST(root.right, root.val, hi)

def kthSmallest(root, k):
    stack=[]; curr=root
    while curr or stack:
        while curr: stack.append(curr); curr=curr.left
        curr=stack.pop(); k-=1
        if k==0: return curr.val
        curr=curr.right`,
            cpp: `bool isValidBST(TreeNode* root,long lo=LLONG_MIN,long hi=LLONG_MAX){
    if(!root) return true;
    if(root->val<=lo||root->val>=hi) return false;
    return isValidBST(root->left,lo,root->val)&&isValidBST(root->right,root->val,hi);
}
int kthSmallest(TreeNode* root,int k){
    stack<TreeNode*> st; TreeNode* curr=root;
    while(curr||!st.empty()){
        while(curr){st.push(curr);curr=curr->left;}
        curr=st.top();st.pop();if(--k==0)return curr->val;curr=curr->right;}
    return -1;
}`,
            java: `public boolean isValidBST(TreeNode root){return valid(root,Long.MIN_VALUE,Long.MAX_VALUE);}
boolean valid(TreeNode n,long lo,long hi){
    if(n==null) return true;
    if(n.val<=lo||n.val>=hi) return false;
    return valid(n.left,lo,n.val)&&valid(n.right,n.val,hi);
}` } },
        keyInsight: "BST validation: pass (lo,hi) bounds — NOT just comparing with parent. A node could violate an ancestor's constraint.",
        template: { python: `# BST validate with bounds:
def validate(node, lo, hi):
    if not node: return True
    if not (lo < node.val < hi): return False
    return validate(node.left, lo, node.val) and \
           validate(node.right, node.val, hi)`,
          cpp: `bool validate(TreeNode* n,long lo,long hi){
    if(!n) return true;
    if(n->val<=lo||n->val>=hi) return false;
    return validate(n->left,lo,n->val)&&validate(n->right,n->val,hi);
}`,
          java: `boolean validate(TreeNode n,long lo,long hi){
    if(n==null) return true;
    if(n.val<=lo||n.val>=hi) return false;
    return validate(n.left,lo,n.val)&&validate(n.right,n.val,hi);
}` } },
      { day: "Tue — BST Advanced",
        where: "BST deletion, successor/predecessor, convert sorted array to BST.",
        when: "BST delete: 3 cases — no child (just remove), one child (bypass), two children (replace with inorder successor).",
        what: "Inorder successor of node with right subtree = leftmost node in right subtree. Without right subtree = nearest ancestor where node is in left subtree.",
        example: { title: "Delete Node in BST",
          explanation: "Case 1: leaf → return null. Case 2: one child → return that child. Case 3: two children → find inorder successor (leftmost in right subtree), copy its value, delete successor.",
          code: {
            python: `def deleteNode(root, key):
    if not root: return None
    if key < root.val: root.left = deleteNode(root.left, key)
    elif key > root.val: root.right = deleteNode(root.right, key)
    else:
        if not root.left: return root.right
        if not root.right: return root.left
        # find inorder successor (leftmost in right subtree)
        succ = root.right
        while succ.left: succ = succ.left
        root.val = succ.val
        root.right = deleteNode(root.right, succ.val)
    return root`,
            cpp: `TreeNode* deleteNode(TreeNode* root,int key){
    if(!root) return nullptr;
    if(key<root->val) root->left=deleteNode(root->left,key);
    else if(key>root->val) root->right=deleteNode(root->right,key);
    else{
        if(!root->left) return root->right;
        if(!root->right) return root->left;
        TreeNode* succ=root->right;
        while(succ->left) succ=succ->left;
        root->val=succ->val;
        root->right=deleteNode(root->right,succ->val);
    }
    return root;
}`,
            java: `public TreeNode deleteNode(TreeNode root,int key){
    if(root==null) return null;
    if(key<root.val) root.left=deleteNode(root.left,key);
    else if(key>root.val) root.right=deleteNode(root.right,key);
    else{
        if(root.left==null) return root.right;
        if(root.right==null) return root.left;
        TreeNode succ=root.right;
        while(succ.left!=null) succ=succ.left;
        root.val=succ.val;
        root.right=deleteNode(root.right,succ.val);
    }
    return root;
}` } },
        keyInsight: "Two-children deletion: copy inorder successor's VALUE (don't rewire pointers), then delete successor from right subtree. Elegant and simple.",
        template: { python: `def delete(root, key):
    if not root: return None
    if key < root.val: root.left = delete(root.left, key)
    elif key > root.val: root.right = delete(root.right, key)
    else:
        if not root.left: return root.right
        if not root.right: return root.left
        # two children: replace with inorder successor
        succ = root.right
        while succ.left: succ = succ.left
        root.val = succ.val
        root.right = delete(root.right, succ.val)
    return root`,
          cpp: `// find leftmost: TreeNode* succ=root->right; while(succ->left) succ=succ->left;
// copy val, delete from right subtree`,
          java: `// same: find leftmost in right subtree
// copy val, delete from right subtree` } },
      { day: "Wed — Heap Fundamentals",
        where: "Top K elements, Kth largest, heap sort, priority queue operations.",
        when: "Need K largest: min-heap of size K. Need K smallest: max-heap of size K. Need running median: two heaps.",
        what: "Min-heap of size K for K largest: when heap size > K, pop minimum. At end, heap contains K largest, top = Kth largest. O(n log K) beats sorting O(n log n) for small K.",
        example: { title: "Kth Largest Element",
          explanation: "Maintain min-heap of size K. For each element, push it. If heap size > K, pop (removes smallest). After all elements, heap[0] = Kth largest. O(n log K) time.",
          code: {
            python: `import heapq
def findKthLargest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]  # smallest in min-heap of size k = kth largest`,
            cpp: `int findKthLargest(vector<int>& nums,int k){
    priority_queue<int,vector<int>,greater<int>> minH;
    for(int n:nums){
        minH.push(n);
        if((int)minH.size()>k) minH.pop();
    }
    return minH.top();
}`,
            java: `public int findKthLargest(int[] nums,int k){
    PriorityQueue<Integer> minH=new PriorityQueue<>();
    for(int n:nums){
        minH.offer(n);
        if(minH.size()>k) minH.poll();
    }
    return minH.peek();
}` } },
        keyInsight: "Min-heap of size K for K-largest: counter-intuitive but correct. The heap holds the K largest seen so far; its top is the Kth largest.",
        template: { python: `import heapq
# K largest → min-heap of size K
heap=[]
for num in nums:
    heapq.heappush(heap,num)
    if len(heap)>k: heapq.heappop(heap)
return heap[0]  # kth largest

# K smallest → max-heap of size K (negate values)
heap=[]
for num in nums:
    heapq.heappush(heap,-num)
    if len(heap)>k: heapq.heappop(heap)
return -heap[0]  # kth smallest`,
          cpp: `// K largest: priority_queue<int,vector<int>,greater<int>> (min-heap)
// K smallest: priority_queue<int> (max-heap, default)`,
          java: `// K largest: new PriorityQueue<>() (min-heap by default)
// K smallest: new PriorityQueue<>(Collections.reverseOrder())` } },
      { day: "Thu — Two Heap Pattern",
        where: "Find Median from Data Stream, sliding window median.",
        when: "When you need running median of a dynamic stream. Two heaps split data into lower half and upper half.",
        what: "Max-heap (lower half) + min-heap (upper half). Keep sizes equal or max-heap one larger. Median = max-heap.top() or average of both tops. Rebalance after each insert.",
        example: { title: "Find Median from Data Stream",
          explanation: "lower = max-heap (negated in Python), upper = min-heap. Always push to lower first, then push lower's top to upper. Rebalance if sizes differ by > 1.",
          code: {
            python: `import heapq
class MedianFinder:
    def __init__(self):
        self.lower=[]  # max-heap (negated)
        self.upper=[]  # min-heap
    def addNum(self,num):
        heapq.heappush(self.lower,-num)
        heapq.heappush(self.upper,-heapq.heappop(self.lower))
        if len(self.upper)>len(self.lower):
            heapq.heappush(self.lower,-heapq.heappop(self.upper))
    def findMedian(self):
        if len(self.lower)>len(self.upper): return -self.lower[0]
        return (-self.lower[0]+self.upper[0])/2`,
            cpp: `class MedianFinder{
    priority_queue<int> lower;
    priority_queue<int,vector<int>,greater<int>> upper;
public:
    void addNum(int n){
        lower.push(n);
        upper.push(lower.top());lower.pop();
        if(upper.size()>lower.size()){lower.push(upper.top());upper.pop();}
    }
    double findMedian(){
        if(lower.size()>upper.size()) return lower.top();
        return (lower.top()+upper.top())/2.0;
    }
};`,
            java: `class MedianFinder{
    PriorityQueue<Integer> lower=new PriorityQueue<>(Collections.reverseOrder());
    PriorityQueue<Integer> upper=new PriorityQueue<>();
    public void addNum(int n){
        lower.offer(n); upper.offer(lower.poll());
        if(upper.size()>lower.size()) lower.offer(upper.poll());
    }
    public double findMedian(){
        if(lower.size()>upper.size()) return lower.peek();
        return(lower.peek()+upper.peek())/2.0;
    }
}` } },
        keyInsight: "Always push to lower first, then push lower's max to upper. This ensures upper gets the correct elements. Then rebalance if sizes diverge.",
        template: { python: `# Two heap: lower=max-heap, upper=min-heap
# Invariant: lower.size >= upper.size
# Invariant: max(lower) <= min(upper)

def addNum(num):
    heappush(lower, -num)
    heappush(upper, -heappop(lower))   # balance
    if len(upper) > len(lower):
        heappush(lower, -heappop(upper))  # rebalance`,
          cpp: `// lower: max-heap (priority_queue<int>)
// upper: min-heap (pq with greater<int>)
// push to lower, then move top to upper, rebalance`,
          java: `// lower: reverseOrder PQ (max-heap)
// upper: default PQ (min-heap)
// same logic` } },
      { day: "Fri — K-way Merge + Top K Patterns",
        where: "Merge K sorted lists, K closest points, top K frequent elements.",
        when: "K-way merge: min-heap with one element from each list. Pop min, push next from same list. O(n log K).",
        what: "Top K Frequent: count frequencies, then use min-heap of size K on (freq, val) pairs. Or use bucket sort: bucket[freq] = [elements]. Scan from high freq down.",
        example: { title: "Top K Frequent Elements",
          explanation: "Count frequencies with Counter. Bucket sort: create buckets[1..n], put elements in bucket[freq]. Scan from highest freq down, collect K elements.",
          code: {
            python: `from collections import Counter
def topKFrequent(nums, k):
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums)+1)]
    for num, freq in count.items():
        buckets[freq].append(num)
    result = []
    for freq in range(len(buckets)-1, 0, -1):
        result.extend(buckets[freq])
        if len(result) >= k: return result[:k]
    return result`,
            cpp: `vector<int> topKFrequent(vector<int>& nums,int k){
    unordered_map<int,int> cnt;
    for(int n:nums) cnt[n]++;
    vector<vector<int>> buckets(nums.size()+1);
    for(auto&[n,f]:cnt) buckets[f].push_back(n);
    vector<int> res;
    for(int f=buckets.size()-1;f>=1&&(int)res.size()<k;f--)
        for(int n:buckets[f]){res.push_back(n);if((int)res.size()==k)return res;}
    return res;
}`,
            java: `public int[] topKFrequent(int[] nums,int k){
    Map<Integer,Integer> cnt=new HashMap<>();
    for(int n:nums) cnt.merge(n,1,Integer::sum);
    List<Integer>[] buckets=new List[nums.length+1];
    for(int i=0;i<buckets.length;i++) buckets[i]=new ArrayList<>();
    for(var e:cnt.entrySet()) buckets[e.getValue()].add(e.getKey());
    int[] res=new int[k]; int idx=0;
    for(int f=buckets.length-1;f>=1&&idx<k;f--)
        for(int n:buckets[f]) if(idx<k) res[idx++]=n;
    return res;
}` } },
        keyInsight: "Bucket sort for Top K Frequent = O(n) time (better than heap's O(n log K)). Freq can't exceed n, so bucket array is bounded.",
        template: { python: `# Bucket sort approach (O(n)):
count=Counter(nums)
buckets=[[] for _ in range(n+1)]
for num,freq in count.items(): buckets[freq].append(num)
result=[]
for freq in range(n,-1,-1):
    result.extend(buckets[freq])
    if len(result)>=k: return result[:k]`,
          cpp: `// Heap approach O(n log k):
priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> minH;
for(auto&[n,f]:cnt){minH.push({f,n});if(minH.size()>k)minH.pop();}`,
          java: `// Heap approach:
PriorityQueue<int[]> minH=new PriorityQueue<>((a,b)->a[0]-b[0]);
for(var e:cnt.entrySet()){minH.offer(new int[]{e.getValue(),e.getKey()});if(minH.size()>k)minH.poll();}` } },
      { day: "Sat — Revision",
        where: "Review BST validation, deletion, heap patterns: K-largest, median, top-K frequent.",
        when: "BST: O(log n) ordered operations. Heap: O(log n) min/max with priority.",
        what: "BST: validate with bounds, delete with inorder successor. Heap: K-largest (min-heap size K), median (two heaps), top-K (bucket sort or min-heap).",
        example: { title: "Pattern Decision",
          explanation: "Need sorted dynamic data? → BST. Need K largest/smallest? → heap size K. Need running median? → two heaps. Need top K frequent? → Counter + bucket sort.",
          code: {
            python: `# BST validate → pass (lo,hi) bounds
# BST delete → 3 cases, inorder successor
# K largest → min-heap size K
# Running median → two heaps (lower max, upper min)
# Top K frequent → Counter + bucket sort O(n)`,
            cpp: `// BST: long bounds for INT_MIN/MAX edge cases
// Heap: priority_queue with greater<> for min-heap
// Top K: bucket sort or heap, both valid`,
            java: `// BST: Long.MIN_VALUE / Long.MAX_VALUE for bounds
// Heap: PriorityQueue default = min-heap
// Top K: bucket sort O(n) or heap O(n log k)` } },
        keyInsight: "Min-heap for K-largest (counterintuitive but correct). Always use Long bounds for BST validation to handle INT_MIN/INT_MAX values.",
        template: { python: `# K largest → heapq (min-heap), push all, pop when >k
# K smallest → negate for max-heap behavior
# Median → lower(max-heap, negated) + upper(min-heap)
# Top K freq → Counter + bucket[freq].append(num)`,
          cpp: `// Min-heap: priority_queue<int,vector<int>,greater<int>>
// Max-heap: priority_queue<int> (default)`,
          java: `// Min-heap: new PriorityQueue<>()
// Max-heap: new PriorityQueue<>(Collections.reverseOrder())` } },
      { day: "Sun — Mock",
        where: "Apply BST and heap pattern recognition under timed interview conditions.",
        when: "Hear 'sorted dynamic data' → BST. Hear 'K largest/smallest/frequent' → heap. Hear 'running median' → two heaps.",
        what: "For heap problems, state complexity upfront: 'K-largest with min-heap: O(n log K) time, O(K) space. Better than sorting O(n log n) for small K.'",
        example: { title: "Interview Communication",
          explanation: "Explain WHY min-heap for K-largest: 'I maintain a min-heap of size K. When it exceeds K, I remove the minimum. At the end, the heap contains the K largest elements, and its top is the Kth largest.'",
          code: {
            python: `# Explain the invariant:
# "Min-heap of size K always contains K largest seen so far.
#  When we push a new element and heap grows to K+1,
#  we pop the smallest — it can't be in top K anymore.
#  After all elements: heap[0] = Kth largest."`,
            cpp: `// Invariant: heap always has K largest
// Pop when size > K: removes smallest of the K+1
// At end: top = Kth largest`,
            java: `// Same explanation works in all languages
// Proactively state: O(n log K) not O(n log n)` } },
        keyInsight: "The min-heap-for-K-largest insight is a classic interview question. Practice explaining it clearly before the interview.",
        template: { python: `# Interview template for K problems:
# 1. "I'll use a min-heap of size K"
# 2. "Push each element, pop if size > K"
# 3. "Heap always contains K largest"  
# 4. "O(n log K) time, O(K) space"`,
          cpp: `// State: O(n log K) vs O(n log n) sorting
// Heap wins when K << n`,
          java: `// Same: justify heap over sort` } }
    ]
  },

  12: {
    title: "Graphs — BFS, DFS, Cycle, Topo Sort",
    tagline: "Graphs = generalized trees. BFS for shortest path. DFS for connectivity and cycles.",
    days: [
      { day: "Mon — Graph Basics",
        where: "Graph representation, BFS, DFS, connected components.",
        when: "Any problem with nodes and edges. Build adjacency list first. BFS for shortest path (unweighted). DFS for connected components/reachability.",
        what: "Adjacency list: dict/array of lists. BFS: queue + visited set. DFS: stack/recursion + visited. Both are O(V+E).",
        example: { title: "Clone Graph",
          explanation: "BFS from start node. Hashmap {original→clone} tracks created nodes. For each neighbor: if not in hashmap, create clone and enqueue. Then add clone to cloned node's neighbors.",
          code: {
            python: `from collections import deque
def cloneGraph(node):
    if not node: return None
    clones = {node: Node(node.val)}
    q = deque([node])
    while q:
        curr = q.popleft()
        for nb in curr.neighbors:
            if nb not in clones:
                clones[nb] = Node(nb.val)
                q.append(nb)
            clones[curr].neighbors.append(clones[nb])
    return clones[node]`,
            cpp: `Node* cloneGraph(Node* node){
    if(!node) return nullptr;
    unordered_map<Node*,Node*> clones;
    queue<Node*> q; q.push(node);
    clones[node]=new Node(node->val);
    while(!q.empty()){
        Node* curr=q.front();q.pop();
        for(Node* nb:curr->neighbors){
            if(!clones.count(nb)){clones[nb]=new Node(nb->val);q.push(nb);}
            clones[curr]->neighbors.push_back(clones[nb]);
        }
    }
    return clones[node];
}`,
            java: `public Node cloneGraph(Node node){
    if(node==null) return null;
    Map<Node,Node> clones=new HashMap<>();
    Queue<Node> q=new LinkedList<>(); q.offer(node);
    clones.put(node,new Node(node.val));
    while(!q.isEmpty()){Node curr=q.poll();
        for(Node nb:curr.neighbors){
            if(!clones.containsKey(nb)){clones.put(nb,new Node(nb.val));q.offer(nb);}
            clones.get(curr).neighbors.add(clones.get(nb));
        }
    }
    return clones.get(node);
}` } },
        keyInsight: "Build adjacency list first from any input format. Visit tracking is crucial — without it, you'll loop infinitely in cyclic graphs.",
        template: { python: `# Build adjacency list:
graph = defaultdict(list)
for u, v in edges: graph[u].append(v); graph[v].append(u)

# BFS:
from collections import deque
visited = set([start])
q = deque([start])
while q:
    node = q.popleft()
    for nb in graph[node]:
        if nb not in visited:
            visited.add(nb); q.append(nb)`,
          cpp: `// Adjacency list:
vector<vector<int>> adj(n);
for(auto&[u,v]:edges){adj[u].push_back(v);adj[v].push_back(u);}
// BFS: queue<int>+vector<bool> visited`,
          java: `// Adjacency list:
List<List<Integer>> adj=new ArrayList<>();
for(int i=0;i<n;i++) adj.add(new ArrayList<>());
// BFS: Queue<Integer>+boolean[] visited` } },
      { day: "Tue — Multi-source BFS",
        where: "Problems where BFS starts from multiple sources simultaneously: 01 Matrix, Walls and Gates.",
        when: "When there are multiple starting points that spread simultaneously — like multiple rotten oranges, multiple gates, all 0s in a matrix.",
        what: "Add ALL sources to queue at time=0. BFS spreads from all simultaneously. First time a cell is reached = shortest distance from any source. O(V+E) total.",
        example: { title: "01 Matrix (Distance to Nearest 0)",
          explanation: "Add all 0-cells to queue with distance=0. BFS spreads outward. When we reach a 1-cell for the first time, that's the shortest distance to a 0. No need to revisit.",
          code: {
            python: `from collections import deque
def updateMatrix(mat):
    rows,cols=len(mat),len(mat[0])
    dist=[[float('inf')]*cols for _ in range(rows)]
    q=deque()
    for r in range(rows):
        for c in range(cols):
            if mat[r][c]==0: dist[r][c]=0; q.append((r,c))
    for r,c in q:
        for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr,nc=r+dr,c+dc
            if 0<=nr<rows and 0<=nc<cols and dist[nr][nc]>dist[r][c]+1:
                dist[nr][nc]=dist[r][c]+1; q.append((nr,nc))
    return dist`,
            cpp: `vector<vector<int>> updateMatrix(vector<vector<int>>& mat){
    int rows=mat.size(),cols=mat[0].size();
    vector<vector<int>> dist(rows,vector<int>(cols,INT_MAX));
    queue<pair<int,int>> q;
    for(int r=0;r<rows;r++) for(int c=0;c<cols;c++)
        if(mat[r][c]==0){dist[r][c]=0;q.push({r,c});}
    int dirs[4][2]={{0,1},{0,-1},{1,0},{-1,0}};
    while(!q.empty()){auto[r,c]=q.front();q.pop();
        for(auto&d:dirs){int nr=r+d[0],nc=c+d[1];
            if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&dist[nr][nc]>dist[r][c]+1){
                dist[nr][nc]=dist[r][c]+1;q.push({nr,nc});}}}
    return dist;
}`,
            java: `public int[][] updateMatrix(int[][] mat){
    int rows=mat.length,cols=mat[0].length;
    int[][] dist=new int[rows][cols];
    for(int[] row:dist) Arrays.fill(row,Integer.MAX_VALUE);
    Queue<int[]> q=new LinkedList<>();
    for(int r=0;r<rows;r++) for(int c=0;c<cols;c++)
        if(mat[r][c]==0){dist[r][c]=0;q.add(new int[]{r,c});}
    int[][]dirs={{0,1},{0,-1},{1,0},{-1,0}};
    while(!q.isEmpty()){int[]cur=q.poll();
        for(int[]d:dirs){int nr=cur[0]+d[0],nc=cur[1]+d[1];
            if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&dist[nr][nc]>dist[cur[0]][cur[1]]+1){
                dist[nr][nc]=dist[cur[0]][cur[1]]+1;q.add(new int[]{nr,nc});}}}
    return dist;
}` } },
        keyInsight: "Multi-source BFS: add ALL sources at distance=0. BFS naturally computes shortest distance from any source to every cell. O(V+E) total.",
        template: { python: `# Multi-source BFS:
q=deque()
for each source: dist[src]=0; q.append(src)
while q:
    node=q.popleft()
    for nb in neighbors(node):
        if dist[nb] > dist[node]+1:
            dist[nb]=dist[node]+1; q.append(nb)`,
          cpp: `queue<pair<int,int>> q;
// add all sources with dist=0
// BFS: if dist[nr][nc]>dist[r][c]+1 → update and enqueue`,
          java: `Queue<int[]> q=new LinkedList<>();
// add all sources; update dist if shorter path found` } },
      { day: "Wed — Cycle Detection",
        where: "Detect cycle in directed and undirected graphs. Course Schedule is the classic problem.",
        when: "Directed graph: DFS with 3 states (unvisited/visiting/visited). Undirected: DFS with parent tracking.",
        what: "3-state DFS for directed: 0=unvisited, 1=visiting (in current path), 2=visited (done). Cycle exists if we reach a node with state=1 (back edge).",
        example: { title: "Course Schedule (Cycle Detection)",
          explanation: "Build directed graph from prerequisites. DFS with 3 states. If we visit a node with state=1 → cycle found → impossible. If DFS completes without cycle → possible.",
          code: {
            python: `def canFinish(numCourses, prerequisites):
    graph = [[] for _ in range(numCourses)]
    for a,b in prerequisites: graph[b].append(a)
    # 0=unvisited, 1=visiting, 2=done
    state = [0] * numCourses
    def dfs(node):
        if state[node]==1: return False  # cycle!
        if state[node]==2: return True   # already done
        state[node]=1
        for nb in graph[node]:
            if not dfs(nb): return False
        state[node]=2
        return True
    return all(dfs(i) for i in range(numCourses))`,
            cpp: `bool canFinish(int n,vector<vector<int>>& prereqs){
    vector<vector<int>> g(n); for(auto&p:prereqs) g[p[1]].push_back(p[0]);
    vector<int> state(n,0);
    function<bool(int)> dfs=[&](int node)->bool{
        if(state[node]==1) return false;
        if(state[node]==2) return true;
        state[node]=1;
        for(int nb:g[node]) if(!dfs(nb)) return false;
        state[node]=2; return true;
    };
    for(int i=0;i<n;i++) if(!dfs(i)) return false;
    return true;
}`,
            java: `public boolean canFinish(int n,int[][] prereqs){
    List<List<Integer>> g=new ArrayList<>();
    for(int i=0;i<n;i++) g.add(new ArrayList<>());
    for(int[] p:prereqs) g.get(p[1]).add(p[0]);
    int[] state=new int[n];
    for(int i=0;i<n;i++) if(!dfs(g,state,i)) return false;
    return true;
}
boolean dfs(List<List<Integer>> g,int[] state,int node){
    if(state[node]==1) return false;
    if(state[node]==2) return true;
    state[node]=1;
    for(int nb:g.get(node)) if(!dfs(g,state,nb)) return false;
    state[node]=2; return true;
}` } },
        keyInsight: "3 states (0/1/2) for directed cycle detection. State=1 means 'in current DFS path' — reaching it again = back edge = cycle.",
        template: { python: `state = [0] * n  # 0=unvisited, 1=visiting, 2=done
def dfs(node):
    if state[node]==1: return False  # back edge → cycle
    if state[node]==2: return True   # already processed
    state[node]=1           # mark visiting
    for nb in graph[node]:
        if not dfs(nb): return False
    state[node]=2           # mark done
    return True`,
          cpp: `vector<int> state(n,0);
// 0=unvisited, 1=visiting, 2=done
// return false if state[nb]==1 (cycle)`,
          java: `int[] state=new int[n];
// same logic: 0/1/2 states` } },
      { day: "Thu — Topological Sort",
        where: "Ordering tasks with dependencies: course schedule order, build systems, task scheduling.",
        when: "When you need to order nodes such that all edges point forward (no cycles). Only valid for DAGs (directed acyclic graphs).",
        what: "Two methods: Kahn's algorithm (BFS + in-degree) or DFS postorder. Kahn's: start from nodes with in-degree=0, process and reduce neighbor in-degrees. DFS: add to result AFTER visiting all dependencies.",
        example: { title: "Course Schedule II (Return Order)",
          explanation: "Kahn's BFS: count in-degrees. Queue all nodes with in-degree=0. Dequeue, add to result, decrement neighbor in-degrees, enqueue neighbors with in-degree=0. If result size=n → valid order.",
          code: {
            python: `from collections import deque
def findOrder(numCourses, prerequisites):
    graph=[[] for _ in range(numCourses)]
    indegree=[0]*numCourses
    for a,b in prerequisites:
        graph[b].append(a); indegree[a]+=1
    q=deque(i for i in range(numCourses) if indegree[i]==0)
    order=[]
    while q:
        node=q.popleft(); order.append(node)
        for nb in graph[node]:
            indegree[nb]-=1
            if indegree[nb]==0: q.append(nb)
    return order if len(order)==numCourses else []`,
            cpp: `vector<int> findOrder(int n,vector<vector<int>>& prereqs){
    vector<vector<int>> g(n); vector<int> indeg(n,0);
    for(auto&p:prereqs){g[p[1]].push_back(p[0]);indeg[p[0]]++;}
    queue<int> q;
    for(int i=0;i<n;i++) if(indeg[i]==0) q.push(i);
    vector<int> order;
    while(!q.empty()){int node=q.front();q.pop();order.push_back(node);
        for(int nb:g[node]) if(--indeg[nb]==0) q.push(nb);}
    return order.size()==n?order:vector<int>{};
}`,
            java: `public int[] findOrder(int n,int[][] prereqs){
    List<List<Integer>> g=new ArrayList<>();
    for(int i=0;i<n;i++) g.add(new ArrayList<>());
    int[] indeg=new int[n];
    for(int[] p:prereqs){g.get(p[1]).add(p[0]);indeg[p[0]]++;}
    Queue<Integer> q=new LinkedList<>();
    for(int i=0;i<n;i++) if(indeg[i]==0) q.offer(i);
    int[] order=new int[n]; int idx=0;
    while(!q.isEmpty()){int node=q.poll();order[idx++]=node;
        for(int nb:g.get(node)) if(--indeg[nb]==0) q.offer(nb);}
    return idx==n?order:new int[]{};
}` } },
        keyInsight: "Kahn's: result size < n means cycle exists (some nodes never reached in-degree=0). This is how you detect cycles using topo sort.",
        template: { python: `# Kahn's algorithm:
indegree=[0]*n
for u,v in edges: graph[u].append(v); indegree[v]+=1
q=deque(i for i in range(n) if indegree[i]==0)
order=[]
while q:
    node=q.popleft(); order.append(node)
    for nb in graph[node]:
        indegree[nb]-=1
        if indegree[nb]==0: q.append(nb)
# if len(order)==n → no cycle, order is valid topo order`,
          cpp: `// indeg[v]++ for each edge u→v
// queue all indeg==0; pop, decrement neighbors, push new 0s`,
          java: `// same logic; check order.length==n for cycle detection` } },
      { day: "Fri — Bipartite + Island Problems",
        where: "Bipartite check (2-colorable), number of distinct islands, max area of island.",
        when: "Bipartite: color nodes with 2 colors alternately. If neighbor has same color → not bipartite. Islands: DFS/BFS counting connected land components.",
        what: "Bipartite check with BFS: assign color 0 to source, alternate colors for neighbors. If you ever need to assign a color that's already assigned differently → not bipartite.",
        example: { title: "Is Graph Bipartite?",
          explanation: "BFS from each uncolored node. Assign color 0. For each neighbor: if uncolored, assign opposite color and enqueue. If colored same as current → not bipartite.",
          code: {
            python: `from collections import deque
def isBipartite(graph):
    n=len(graph); color=[-1]*n
    for start in range(n):
        if color[start]!=-1: continue
        q=deque([start]); color[start]=0
        while q:
            node=q.popleft()
            for nb in graph[node]:
                if color[nb]==-1:
                    color[nb]=1-color[node]; q.append(nb)
                elif color[nb]==color[node]: return False
    return True`,
            cpp: `bool isBipartite(vector<vector<int>>& graph){
    int n=graph.size(); vector<int> color(n,-1);
    for(int start=0;start<n;start++){
        if(color[start]!=-1) continue;
        queue<int> q; q.push(start); color[start]=0;
        while(!q.empty()){int node=q.front();q.pop();
            for(int nb:graph[node]){
                if(color[nb]==-1){color[nb]=1-color[node];q.push(nb);}
                else if(color[nb]==color[node]) return false;}}
    }
    return true;
}`,
            java: `public boolean isBipartite(int[][] graph){
    int n=graph.length; int[] color=new int[n]; Arrays.fill(color,-1);
    for(int start=0;start<n;start++){
        if(color[start]!=-1) continue;
        Queue<Integer> q=new LinkedList<>(); q.offer(start); color[start]=0;
        while(!q.isEmpty()){int node=q.poll();
            for(int nb:graph[node]){
                if(color[nb]==-1){color[nb]=1-color[node];q.offer(nb);}
                else if(color[nb]==color[node]) return false;}}
    }
    return true;
}` } },
        keyInsight: "Bipartite = 2-colorable = no odd-length cycles. BFS coloring: if neighbor has same color as current → odd cycle found → not bipartite.",
        template: { python: `color=[-1]*n
for start in range(n):
    if color[start]!=-1: continue
    q=deque([start]); color[start]=0
    while q:
        node=q.popleft()
        for nb in graph[node]:
            if color[nb]==-1: color[nb]=1-color[node]; q.append(nb)
            elif color[nb]==color[node]: return False  # same color → not bipartite`,
          cpp: `// color[nb]==-1 → assign opposite color
// color[nb]==color[node] → not bipartite`,
          java: `// same: -1=uncolored, 0/1=two colors` } },
      { day: "Sat — Revision",
        where: "Review all graph patterns: BFS, DFS, cycle detection, topo sort, bipartite.",
        when: "Graph pattern selector: shortest path → BFS, connectivity → DFS, cycle in directed → 3-state DFS, ordering → topo sort, 2-coloring → bipartite BFS.",
        what: "All graph algorithms share the same skeleton: visit tracking + queue/stack + neighbor expansion. The variation is in what you track and when you record.",
        example: { title: "Graph Pattern Selector",
          explanation: "Unweighted shortest path → BFS. Connected components → DFS. Cycle in directed graph → 3-state DFS. Topological ordering → Kahn's BFS. 2-colorable → BFS coloring.",
          code: {
            python: `# Shortest path (unweighted) → BFS from source
# Connected components → DFS, count components
# Cycle in directed → state[node]: 0/1/2
# Topological sort → Kahn's (indegree + queue)
# Bipartite → BFS with color[] array
# Multi-source → add all sources to queue at once`,
            cpp: `// Same patterns in C++
// Build adj list first for all graph problems
// visited: vector<bool> or vector<int> for states`,
            java: `// Same patterns in Java
// Build adj list: List<List<Integer>>
// visited: boolean[] or int[] for states` } },
        keyInsight: "Every graph problem: 1) build adjacency list, 2) choose BFS/DFS, 3) track visited, 4) expand neighbors. The rest is problem-specific.",
        template: { python: `# Universal graph template:
graph=defaultdict(list)
for u,v in edges: graph[u].append(v)
visited=set()
def dfs(node):
    visited.add(node)
    for nb in graph[node]:
        if nb not in visited: dfs(nb)`,
          cpp: `vector<vector<int>> adj(n);
vector<bool> vis(n,false);
function<void(int)> dfs=[&](int u){
    vis[u]=true;
    for(int v:adj[u]) if(!vis[v]) dfs(v);
};`,
          java: `List<List<Integer>> adj=new ArrayList<>();
boolean[] vis=new boolean[n];
void dfs(int u){
    vis[u]=true;
    for(int v:adj.get(u)) if(!vis[v]) dfs(v);
}` } },
      { day: "Sun — Mock",
        where: "Apply graph pattern recognition under timed interview conditions.",
        when: "Graph problems require explaining traversal clearly. State: 'I'll use BFS because we need shortest path' or 'DFS because we need reachability.'",
        what: "Always build adjacency list first. State time complexity as O(V+E). Confirm: directed or undirected? Weighted or unweighted? Connected or disconnected?",
        example: { title: "Graph Interview Checklist",
          explanation: "Ask before coding: directed or undirected? Weighted or unweighted? Can I modify the graph? Then choose: BFS (shortest path) or DFS (connectivity/cycle). State O(V+E) time.",
          code: {
            python: `# Before coding any graph problem:
# 1. Is it directed or undirected?
# 2. Is it weighted? (BFS only for unweighted)
# 3. Need shortest path? → BFS
# 4. Need connectivity? → DFS
# 5. Need ordering? → Topo sort (Kahn's)
# 6. State: O(V+E) time and space`,
            cpp: `// Clarify graph properties before coding:
// Directed/undirected? Weighted? Connected?
// BFS=shortest unweighted, DFS=connectivity/cycle`,
            java: `// Same clarification questions
// State: adjacency list → O(V+E) storage
// Time: O(V+E) for BFS and DFS` } },
        keyInsight: "Always clarify directed/undirected and weighted/unweighted before coding. These determine which algorithm to use.",
        template: { python: `# Graph problem template:
# 1. Build adjacency list
# 2. Choose BFS or DFS
# 3. Initialize visited/color/state array
# 4. Process each connected component (outer loop)
# 5. Record answer`,
          cpp: `// 1. adj list → 2. BFS/DFS choice → 3. vis[] → 4. outer loop → 5. result`,
          java: `// Same 5 steps every graph problem` } }
    ]
  },

  13: {
    title: "Graphs — Shortest Path + Union-Find + MST",
    tagline: "Weighted graphs need Dijkstra. Connectivity needs Union-Find. MST ties it all together.",
    days: [
      {
        day: "Mon — Dijkstra's Algorithm",
        where: "Single-source shortest path in weighted graphs with non-negative edge weights.",
        when: "When edges have weights and you need minimum cost path. BFS only works for unweighted. Dijkstra = BFS with a min-heap instead of a queue.",
        what: "Min-heap stores (dist, node). Always process the node with smallest known distance first. When you reach a node, its distance is final (greedy). Relax all neighbors.",
        example: {
          title: "Network Delay Time (Dijkstra)",
          explanation: "Build adjacency list with weights. Min-heap starts with (0, source). Pop smallest dist node, skip if already visited. For each neighbor: if dist+weight < known dist → push to heap. Answer = max of all distances.",
          code: {
            python: `import heapq
from collections import defaultdict

def networkDelayTime(times, n, k):
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    
    dist = {i: float('inf') for i in range(1, n+1)}
    dist[k] = 0
    heap = [(0, k)]  # (distance, node)
    
    while heap:
        d, node = heapq.heappop(heap)
        if d > dist[node]: continue  # stale entry
        for nb, w in graph[node]:
            if dist[node] + w < dist[nb]:
                dist[nb] = dist[node] + w
                heapq.heappush(heap, (dist[nb], nb))
    
    ans = max(dist.values())
    return ans if ans < float('inf') else -1`,
            cpp: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<vector<pair<int,int>>> g(n+1);
    for(auto& t:times) g[t[0]].push_back({t[1],t[2]});
    
    vector<int> dist(n+1, INT_MAX);
    dist[k] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, k});
    
    while(!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if(d > dist[u]) continue;
        for(auto [v, w] : g[u])
            if(dist[u]+w < dist[v]) {
                dist[v] = dist[u]+w;
                pq.push({dist[v], v});
            }
    }
    int ans = *max_element(dist.begin()+1, dist.end());
    return ans == INT_MAX ? -1 : ans;
}`,
            java: `public int networkDelayTime(int[][] times, int n, int k) {
    List<int[]>[] g = new List[n+1];
    for(int i=1;i<=n;i++) g[i]=new ArrayList<>();
    for(int[] t:times) g[t[0]].add(new int[]{t[1],t[2]});
    
    int[] dist = new int[n+1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b)->a[0]-b[0]);
    pq.offer(new int[]{0, k});
    
    while(!pq.isEmpty()) {
        int[] cur = pq.poll();
        int d=cur[0], u=cur[1];
        if(d > dist[u]) continue;
        for(int[] e : g[u])
            if(dist[u]+e[1] < dist[e[0]]) {
                dist[e[0]] = dist[u]+e[1];
                pq.offer(new int[]{dist[e[0]], e[0]});
            }
    }
    int ans=0;
    for(int i=1;i<=n;i++) ans=Math.max(ans,dist[i]);
    return ans==Integer.MAX_VALUE?-1:ans;
}`
          }
        },
        keyInsight: "Skip stale heap entries: if popped distance > dist[node], skip it. This is the lazy deletion trick — O((V+E) log V) without it being O(V²).",
        template: {
          python: `import heapq
dist = {node: float('inf') for node in all_nodes}
dist[src] = 0
heap = [(0, src)]
while heap:
    d, u = heapq.heappop(heap)
    if d > dist[u]: continue  # stale — skip!
    for v, w in graph[u]:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
            heapq.heappush(heap, (dist[v], v))`,
          cpp: `priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq;
// pq stores (dist, node) — min at top
// if(d > dist[u]) continue; // skip stale`,
          java: `PriorityQueue<int[]> pq=new PriorityQueue<>((a,b)->a[0]-b[0]);
// if(d > dist[u]) continue; // skip stale`
        }
      },
      {
        day: "Tue — Bellman-Ford + Advanced",
        where: "Shortest path with negative weights, detecting negative cycles, Cheapest Flights Within K Stops.",
        when: "Dijkstra fails with negative edges. Bellman-Ford handles negatives. K stops = exactly K relaxation rounds.",
        what: "Bellman-Ford: relax ALL edges V-1 times. After V-1 rounds, all shortest paths are found. If you can still relax on round V → negative cycle exists.",
        example: {
          title: "Cheapest Flights Within K Stops",
          explanation: "Modified Bellman-Ford: run exactly K+1 rounds (not V-1). Copy dist before each round to avoid using same-round updates (critical!). Each round = one more stop used.",
          code: {
            python: `def findCheapestPrice(n, flights, src, dst, k):
    dist = [float('inf')] * n
    dist[src] = 0
    
    for _ in range(k + 1):  # k stops = k+1 edges
        temp = dist[:]       # snapshot — don't use this round's updates
        for u, v, w in flights:
            if dist[u] != float('inf') and dist[u] + w < temp[v]:
                temp[v] = dist[u] + w
        dist = temp
    
    return dist[dst] if dist[dst] != float('inf') else -1`,
            cpp: `int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
    vector<int> dist(n, INT_MAX);
    dist[src] = 0;
    for(int i=0;i<=k;i++) {
        vector<int> tmp = dist;
        for(auto& f : flights)
            if(dist[f[0]]!=INT_MAX && dist[f[0]]+f[2]<tmp[f[1]])
                tmp[f[1]] = dist[f[0]]+f[2];
        dist = tmp;
    }
    return dist[dst]==INT_MAX ? -1 : dist[dst];
}`,
            java: `public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    for(int i=0;i<=k;i++) {
        int[] tmp = dist.clone();
        for(int[] f : flights)
            if(dist[f[0]]!=Integer.MAX_VALUE && dist[f[0]]+f[2]<tmp[f[1]])
                tmp[f[1]] = dist[f[0]]+f[2];
        dist = tmp;
    }
    return dist[dst]==Integer.MAX_VALUE ? -1 : dist[dst];
}`
          }
        },
        keyInsight: "The temp[] copy is critical in K-stops Bellman-Ford. Without it, a single path might use more than K edges in one round (using updated values from same round).",
        template: {
          python: `# Standard Bellman-Ford (V-1 rounds):
dist = [inf] * n; dist[src] = 0
for _ in range(n-1):
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            dist[v] = dist[u] + w
# Check negative cycle (round V):
for u, v, w in edges:
    if dist[u] + w < dist[v]: # negative cycle!`,
          cpp: `// K stops: run k+1 rounds with temp[] copy
// Standard: run n-1 rounds, check round n for neg cycle`,
          java: `// K stops: int[] tmp=dist.clone() before each round
// Standard Bellman-Ford: n-1 relaxation rounds`
        }
      },
      {
        day: "Wed — Union-Find Complete",
        where: "Dynamic connectivity, number of connected components, redundant connection, accounts merge.",
        when: "When you need to efficiently check if two nodes are connected and merge groups. Union-Find (DSU) = O(α(n)) ≈ O(1) per operation.",
        what: "Two operations: find(x) = root of x's component. union(x,y) = merge components. Optimizations: path compression (flatten tree) + union by rank (attach smaller to larger).",
        example: {
          title: "Number of Connected Components / Redundant Connection",
          explanation: "For each edge (u,v): find roots of u and v. If same root → cycle found (redundant connection). Otherwise union them and decrement component count.",
          code: {
            python: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False  # already connected
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        self.components -= 1
        return True

# Redundant Connection:
def findRedundantConnection(edges):
    uf = UnionFind(len(edges) + 1)
    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]`,
            cpp: `struct DSU {
    vector<int> p, rank_;
    int comp;
    DSU(int n): p(n), rank_(n,0), comp(n) { iota(p.begin(),p.end(),0); }
    int find(int x){ return p[x]==x?x:p[x]=find(p[x]); }
    bool unite(int x,int y){
        x=find(x);y=find(y);
        if(x==y) return false;
        if(rank_[x]<rank_[y]) swap(x,y);
        p[y]=x; if(rank_[x]==rank_[y]) rank_[x]++;
        comp--; return true;
    }
};`,
            java: `class DSU {
    int[] parent, rank;
    int components;
    DSU(int n){
        parent=new int[n]; rank=new int[n]; components=n;
        for(int i=0;i<n;i++) parent[i]=i;
    }
    int find(int x){ return parent[x]==x?x:(parent[x]=find(parent[x])); }
    boolean union(int x,int y){
        x=find(x);y=find(y);
        if(x==y) return false;
        if(rank[x]<rank[y]){int t=x;x=y;y=t;}
        parent[y]=x; if(rank[x]==rank[y]) rank[x]++;
        components--; return true;
    }
}`
          }
        },
        keyInsight: "Path compression + union by rank = O(α(n)) amortized — effectively O(1). Path compression: parent[x] = find(parent[x]) in one line. Always implement both.",
        template: {
          python: `class DSU:
    def __init__(self, n):
        self.p = list(range(n))
        self.rank = [0]*n
    def find(self, x):
        if self.p[x] != x:
            self.p[x] = self.find(self.p[x])  # path compression
        return self.p[x]
    def union(self, x, y):
        x, y = self.find(x), self.find(y)
        if x == y: return False
        if self.rank[x] < self.rank[y]: x, y = y, x
        self.p[y] = x
        if self.rank[x] == self.rank[y]: self.rank[x] += 1
        return True`,
          cpp: `int find(int x){ return p[x]==x?x:p[x]=find(p[x]); } // path compression in 1 line`,
          java: `int find(int x){ return parent[x]==x?x:(parent[x]=find(parent[x])); }`
        }
      },
      {
        day: "Thu — MST (Kruskal + Prim)",
        where: "Minimum Spanning Tree: connect all nodes with minimum total edge weight. Min Cost to Connect All Points.",
        when: "When you need to connect all nodes with minimum total cost and no cycles. Kruskal = sort edges + DSU. Prim = Dijkstra-like with min-heap.",
        what: "Kruskal: sort all edges by weight. For each edge, union the endpoints if not already connected. Stop when n-1 edges added. Prim: greedy expand from any node using min-heap.",
        example: {
          title: "Min Cost to Connect All Points (Prim's)",
          explanation: "Treat each point as a node. Edge weight = Manhattan distance. Prim's: start from node 0. Min-heap stores (cost, node). For each popped node, add cost to MST, push all unvisited neighbors.",
          code: {
            python: `import heapq

def minCostConnectPoints(points):
    n = len(points)
    visited = set()
    heap = [(0, 0)]  # (cost, node_index)
    total = 0
    
    while len(visited) < n:
        cost, u = heapq.heappop(heap)
        if u in visited: continue
        visited.add(u)
        total += cost
        for v in range(n):
            if v not in visited:
                dist = abs(points[u][0]-points[v][0]) + abs(points[u][1]-points[v][1])
                heapq.heappush(heap, (dist, v))
    return total`,
            cpp: `int minCostConnectPoints(vector<vector<int>>& pts) {
    int n=pts.size(); vector<bool> vis(n,false);
    priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq;
    pq.push({0,0}); int total=0;
    while(!pq.empty()){
        auto[cost,u]=pq.top();pq.pop();
        if(vis[u]) continue;
        vis[u]=true; total+=cost;
        for(int v=0;v<n;v++) if(!vis[v]){
            int d=abs(pts[u][0]-pts[v][0])+abs(pts[u][1]-pts[v][1]);
            pq.push({d,v});
        }
    }
    return total;
}`,
            java: `public int minCostConnectPoints(int[][] pts) {
    int n=pts.length; boolean[] vis=new boolean[n];
    PriorityQueue<int[]> pq=new PriorityQueue<>((a,b)->a[0]-b[0]);
    pq.offer(new int[]{0,0}); int total=0;
    while(!pq.isEmpty()){
        int[] cur=pq.poll(); int cost=cur[0],u=cur[1];
        if(vis[u]) continue;
        vis[u]=true; total+=cost;
        for(int v=0;v<n;v++) if(!vis[v]){
            int d=Math.abs(pts[u][0]-pts[v][0])+Math.abs(pts[u][1]-pts[v][1]);
            pq.offer(new int[]{d,v});
        }
    }
    return total;
}`
          }
        },
        keyInsight: "Prim's MST = Dijkstra but add node cost (not cumulative path cost) to total. Kruskal's = sort edges + DSU union. Both give same MST, different implementations.",
        template: {
          python: `# Kruskal's:
edges.sort(key=lambda x: x[2])  # sort by weight
uf = DSU(n); mst_cost = 0; edges_used = 0
for u, v, w in edges:
    if uf.union(u, v):
        mst_cost += w; edges_used += 1
        if edges_used == n-1: break

# Prim's:
heap = [(0, start)]; visited = set(); total = 0
while heap:
    cost, u = heapq.heappop(heap)
    if u in visited: continue
    visited.add(u); total += cost
    for v, w in graph[u]:
        if v not in visited: heapq.heappush(heap, (w, v))`,
          cpp: `// Kruskal: sort + DSU union
// Prim: min-heap + visited set`,
          java: `// Kruskal: sort edges + DSU
// Prim: PriorityQueue + boolean[] visited`
        }
      },
      {
        day: "Fri — Hard Graph Problems",
        where: "Swim in Rising Water, Path with Maximum Probability, Critical Connections (Bridges).",
        when: "Modified Dijkstra for path optimization problems. Bridges use DFS with discovery time and low values.",
        what: "Swim in Rising Water: binary search on answer + BFS/DFS check. OR modified Dijkstra where dist = max elevation on path (minimize the maximum). Classic minimax on graphs.",
        example: {
          title: "Swim in Rising Water (Modified Dijkstra)",
          explanation: "Instead of minimizing sum of weights, minimize the maximum weight on the path. dist[v] = min over all paths of max(edge weights). Push (max_so_far, neighbor) to heap.",
          code: {
            python: `import heapq

def swimInWater(grid):
    n = len(grid)
    dist = [[float('inf')]*n for _ in range(n)]
    dist[0][0] = grid[0][0]
    heap = [(grid[0][0], 0, 0)]
    
    while heap:
        d, r, c = heapq.heappop(heap)
        if d > dist[r][c]: continue
        if r == n-1 and c == n-1: return d
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            if 0<=nr<n and 0<=nc<n:
                nd = max(d, grid[nr][nc])  # max not sum!
                if nd < dist[nr][nc]:
                    dist[nr][nc] = nd
                    heapq.heappush(heap, (nd, nr, nc))
    return dist[n-1][n-1]`,
            cpp: `int swimInWater(vector<vector<int>>& grid) {
    int n=grid.size();
    vector<vector<int>> dist(n,vector<int>(n,INT_MAX));
    dist[0][0]=grid[0][0];
    priority_queue<tuple<int,int,int>,vector<tuple<int,int,int>>,greater<>> pq;
    pq.push({grid[0][0],0,0});
    int dirs[4][2]={{0,1},{0,-1},{1,0},{-1,0}};
    while(!pq.empty()){
        auto[d,r,c]=pq.top();pq.pop();
        if(d>dist[r][c]) continue;
        if(r==n-1&&c==n-1) return d;
        for(auto&dir:dirs){int nr=r+dir[0],nc=c+dir[1];
            if(nr>=0&&nr<n&&nc>=0&&nc<n){
                int nd=max(d,grid[nr][nc]);
                if(nd<dist[nr][nc]){dist[nr][nc]=nd;pq.push({nd,nr,nc});}
            }
        }
    }
    return dist[n-1][n-1];
}`,
            java: `public int swimInWater(int[][] grid) {
    int n=grid.length;
    int[][] dist=new int[n][n];
    for(int[] row:dist) Arrays.fill(row,Integer.MAX_VALUE);
    dist[0][0]=grid[0][0];
    PriorityQueue<int[]> pq=new PriorityQueue<>((a,b)->a[0]-b[0]);
    pq.offer(new int[]{grid[0][0],0,0});
    int[][]dirs={{0,1},{0,-1},{1,0},{-1,0}};
    while(!pq.isEmpty()){int[]cur=pq.poll();int d=cur[0],r=cur[1],c=cur[2];
        if(d>dist[r][c]) continue;
        if(r==n-1&&c==n-1) return d;
        for(int[]dir:dirs){int nr=r+dir[0],nc=c+dir[1];
            if(nr>=0&&nr<n&&nc>=0&&nc<n){int nd=Math.max(d,grid[nr][nc]);
                if(nd<dist[nr][nc]){dist[nr][nc]=nd;pq.offer(new int[]{nd,nr,nc});}}}
    }
    return dist[n-1][n-1];
}`
          }
        },
        keyInsight: "Modified Dijkstra: replace sum with max (minimax path). The heap still gives the optimal substructure — just change the relaxation condition.",
        template: {
          python: `# Minimax Dijkstra (minimize the maximum):
heap = [(grid[0][0], 0, 0)]
while heap:
    d, r, c = heapq.heappop(heap)
    if d > dist[r][c]: continue
    for nr, nc in neighbors:
        nd = max(d, grid[nr][nc])  # MAX not sum
        if nd < dist[nr][nc]:
            dist[nr][nc] = nd
            heapq.heappush(heap, (nd, nr, nc))`,
          cpp: `// nd = max(d, weight) instead of d+weight
// Everything else identical to standard Dijkstra`,
          java: `// int nd = Math.max(d, grid[nr][nc]);
// Same Dijkstra structure otherwise`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review Dijkstra, Bellman-Ford, Union-Find, Kruskal, Prim, and modified graph algorithms.",
        when: "Weighted shortest path → Dijkstra. Negative weights / K stops → Bellman-Ford. Connectivity → DSU. Minimum spanning tree → Kruskal or Prim.",
        what: "Decision tree: negative edges? → Bellman-Ford. K constraint? → Bellman-Ford (K rounds). Non-negative weights? → Dijkstra. Connect all nodes minimally? → MST.",
        example: {
          title: "Algorithm Selector",
          explanation: "Dijkstra: O((V+E) log V), no negative edges. Bellman-Ford: O(VE), handles negatives. Kruskal: O(E log E), sort + DSU. Prim: O(E log V), heap-based.",
          code: {
            python: `# Shortest path, no negatives → Dijkstra (min-heap)
# Shortest path, negatives → Bellman-Ford (V-1 rounds)
# K stops constraint → Bellman-Ford (K+1 rounds + temp[])
# Connected components → DSU (find + union)
# MST → Kruskal (sort edges + DSU) or Prim (heap)
# Minimax path → Modified Dijkstra (max not sum)`,
            cpp: `// Dijkstra: O((V+E)logV) — priority_queue with greater<>
// Bellman-Ford: O(VE) — relax all edges V-1 times
// DSU: O(α(n)) — path compression + rank
// Kruskal: O(ElogE) — sort + DSU
// Prim: O(ElogV) — min-heap`,
            java: `// Same complexity analysis
// Dijkstra → PriorityQueue<int[]>
// DSU → parent[] + rank[] arrays
// Kruskal → sort + DSU union`
          }
        },
        keyInsight: "If problem says 'at most K stops' or 'K transactions' on a graph → Bellman-Ford with exactly K rounds (not V-1). The K constraint maps directly to rounds.",
        template: {
          python: `# Dijkstra template:
heap=[(0,src)]; dist={src:0}
while heap:
    d,u=heapq.heappop(heap)
    if d>dist.get(u,inf): continue
    for v,w in g[u]:
        if d+w<dist.get(v,inf):
            dist[v]=d+w; heapq.heappush(heap,(dist[v],v))`,
          cpp: `// DSU template:
int find(int x){return p[x]==x?x:p[x]=find(p[x]);}
bool unite(int x,int y){x=find(x);y=find(y);if(x==y)return false;p[y]=x;return true;}`,
          java: `// DSU: find with path compression in one line
// int find(int x){return parent[x]==x?x:(parent[x]=find(parent[x]));}`
        }
      },
      {
        day: "Sun — Mock + Assessment",
        where: "Apply all graph algorithm patterns under timed conditions.",
        when: "Google/Uber interviews heavily test Dijkstra and Union-Find. Always state algorithm choice and complexity before coding.",
        what: "For Dijkstra: say 'I'll use a min-heap. Time O((V+E) log V), space O(V+E). I skip stale entries with the d > dist[u] check.' For DSU: mention path compression + rank.",
        example: {
          title: "Graph Interview Communication",
          explanation: "Always clarify: directed or undirected? Negative weights? Need all pairs or single source? These determine Dijkstra vs Bellman-Ford vs Floyd-Warshall.",
          code: {
            python: `# Decision questions before coding:
# 1. Single source or all pairs? (Dijkstra vs Floyd)
# 2. Negative edges? (Dijkstra → NO, Bellman-Ford → YES)
# 3. K constraint? → Bellman-Ford with K rounds
# 4. Just connectivity? → DSU, O(α(n))
# 5. Connect all nodes? → MST (Kruskal/Prim)`,
            cpp: `// State upfront:
// "Dijkstra: O((V+E)logV), no negative edges"
// "DSU: O(α(n)) per op with path compression+rank"
// "Kruskal: O(ElogE) — sort edges, greedily add"`,
            java: `// Same: state algorithm + complexity first
// Then draw small example and trace
// Then code from template`
          }
        },
        keyInsight: "The stale entry check (if d > dist[u]: continue) is what makes Dijkstra efficient with a lazy heap. Always include it and explain why.",
        template: {
          python: `# Interview checklist for graph week 13:
# ✓ Dijkstra: heap + stale check
# ✓ Bellman-Ford: V-1 rounds, temp[] for K stops
# ✓ DSU: find (path compression) + union (by rank)
# ✓ Kruskal: sort edges + DSU
# ✓ Prim: heap + visited set
# ✓ Modified Dijkstra: max instead of sum`,
          cpp: `// All 6 templates from memory
// Practice coding DSU in under 2 minutes`,
          java: `// DSU is the most commonly tested
// Practice find() with path compression`
        }
      }
    ]
  },

  14: {
    title: "DP — 1D Patterns Complete",
    tagline: "DP = identify subproblem + recurrence + base case. 1D DP covers 60% of all DP interview questions.",
    days: [
      {
        day: "Mon — Foundations",
        where: "Climbing stairs, house robber, decode ways — the classic 1D DP intro problems.",
        when: "When a problem has optimal substructure (optimal solution uses optimal solutions of subproblems) and overlapping subproblems (same subproblems computed repeatedly).",
        what: "3 steps: 1) Define dp[i] meaning. 2) Write recurrence (how dp[i] depends on previous). 3) Set base cases. Then fill bottom-up or memoize top-down.",
        example: {
          title: "House Robber",
          explanation: "dp[i] = max money from first i houses. Choice: rob house i (dp[i-2] + nums[i]) or skip it (dp[i-1]). Take max. Base cases: dp[0]=nums[0], dp[1]=max(nums[0],nums[1]).",
          code: {
            python: `def rob(nums):
    if len(nums) == 1: return nums[0]
    dp = [0] * len(nums)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    for i in range(2, len(nums)):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    return dp[-1]

# Space optimized:
def rob_opt(nums):
    prev2, prev1 = 0, 0
    for num in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + num)
    return prev1`,
            cpp: `int rob(vector<int>& nums) {
    int n=nums.size();
    if(n==1) return nums[0];
    int prev2=nums[0], prev1=max(nums[0],nums[1]);
    for(int i=2;i<n;i++){
        int cur=max(prev1, prev2+nums[i]);
        prev2=prev1; prev1=cur;
    }
    return prev1;
}`,
            java: `public int rob(int[] nums) {
    int n=nums.length;
    if(n==1) return nums[0];
    int prev2=nums[0], prev1=Math.max(nums[0],nums[1]);
    for(int i=2;i<n;i++){
        int cur=Math.max(prev1, prev2+nums[i]);
        prev2=prev1; prev1=cur;
    }
    return prev1;
}`
          }
        },
        keyInsight: "Space optimize 1D DP: if dp[i] only uses dp[i-1] and dp[i-2], you only need 2 variables. Roll them forward. O(n)→O(1) space.",
        template: {
          python: `# 1D DP template:
dp = [0] * n
dp[0] = base_case_0
dp[1] = base_case_1
for i in range(2, n):
    dp[i] = max/min(dp[i-1], dp[i-2] + something)

# Space optimized (if only last 2 needed):
prev2, prev1 = base0, base1
for i in range(2, n):
    curr = recurrence(prev1, prev2)
    prev2, prev1 = prev1, curr`,
          cpp: `// Space opt: int prev2=base0, prev1=base1;
// int cur=max(prev1, prev2+nums[i]);
// prev2=prev1; prev1=cur;`,
          java: `// Same: int prev2, prev1
// roll forward in loop`
        }
      },
      {
        day: "Tue — Subarray + Jump DP",
        where: "Maximum subarray (Kadane's), maximum product subarray, jump game I and II.",
        when: "Kadane's for max subarray sum in O(n). Jump Game: can you reach the end? Jump Game II: minimum jumps to reach end.",
        what: "Kadane's: dp[i] = max subarray ending at i = max(nums[i], dp[i-1]+nums[i]). Reset to nums[i] if dp[i-1] is negative. Track global max separately.",
        example: {
          title: "Maximum Subarray (Kadane's) + Jump Game II",
          explanation: "Kadane: curr_sum = max(num, curr_sum+num). Jump II greedy: track current reach and max reach. When i == current reach, must jump — increment jumps, update reach to max_reach.",
          code: {
            python: `# Kadane's Algorithm
def maxSubArray(nums):
    curr = best = nums[0]
    for num in nums[1:]:
        curr = max(num, curr + num)
        best = max(best, curr)
    return best

# Jump Game II (minimum jumps)
def jump(nums):
    jumps = curr_end = max_reach = 0
    for i in range(len(nums)-1):
        max_reach = max(max_reach, i + nums[i])
        if i == curr_end:          # must jump here
            jumps += 1
            curr_end = max_reach
    return jumps`,
            cpp: `int maxSubArray(vector<int>& nums) {
    int curr=nums[0], best=nums[0];
    for(int i=1;i<(int)nums.size();i++){
        curr=max(nums[i], curr+nums[i]);
        best=max(best,curr);
    }
    return best;
}
int jump(vector<int>& nums) {
    int jumps=0,curEnd=0,maxR=0;
    for(int i=0;i<(int)nums.size()-1;i++){
        maxR=max(maxR,i+nums[i]);
        if(i==curEnd){jumps++;curEnd=maxR;}
    }
    return jumps;
}`,
            java: `public int maxSubArray(int[] nums) {
    int curr=nums[0], best=nums[0];
    for(int i=1;i<nums.length;i++){
        curr=Math.max(nums[i], curr+nums[i]);
        best=Math.max(best,curr);
    }
    return best;
}
public int jump(int[] nums) {
    int jumps=0,curEnd=0,maxR=0;
    for(int i=0;i<nums.length-1;i++){
        maxR=Math.max(maxR,i+nums[i]);
        if(i==curEnd){jumps++;curEnd=maxR;}
    }
    return jumps;
}`
          }
        },
        keyInsight: "Kadane's: curr = max(num, curr+num) — restart at current num if accumulated sum is negative. Jump II: greedy level-by-level, O(n) not O(n²).",
        template: {
          python: `# Kadane's:
curr = best = nums[0]
for num in nums[1:]:
    curr = max(num, curr+num)  # restart or extend
    best = max(best, curr)

# Jump II greedy:
jumps=curEnd=maxR=0
for i in range(len(nums)-1):
    maxR=max(maxR, i+nums[i])
    if i==curEnd: jumps+=1; curEnd=maxR`,
          cpp: `// Kadane: curr=max(nums[i],curr+nums[i])
// Jump II: if(i==curEnd){jumps++;curEnd=maxR;}`,
          java: `// Same templates in Java`
        }
      },
      {
        day: "Wed — Coin + Unbounded Knapsack",
        where: "Coin Change (minimum coins), Coin Change II (number of ways), unbounded knapsack.",
        when: "Coin Change = minimum number of items to reach target. Coin Change II = number of combinations. Both are unbounded (can reuse coins).",
        what: "Coin Change: dp[i] = min coins to make amount i. For each coin c: dp[i] = min(dp[i], dp[i-c]+1). Coin Change II: dp[i] += dp[i-c] for each coin (order: coins outer, amount inner).",
        example: {
          title: "Coin Change + Coin Change II",
          explanation: "Min coins: dp[0]=0, dp[i]=inf. For each amount i, try all coins. Ways: dp[0]=1. Outer loop = coins, inner = amounts. This order avoids counting same combination twice.",
          code: {
            python: `# Coin Change (minimum coins)
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount+1):
        for c in coins:
            if c <= i:
                dp[i] = min(dp[i], dp[i-c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

# Coin Change II (number of ways)
def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in coins:          # coins outer loop!
        for i in range(c, amount+1):
            dp[i] += dp[i-c]
    return dp[amount]`,
            cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, INT_MAX);
    dp[0]=0;
    for(int i=1;i<=amount;i++)
        for(int c:coins)
            if(c<=i && dp[i-c]!=INT_MAX)
                dp[i]=min(dp[i],dp[i-c]+1);
    return dp[amount]==INT_MAX?-1:dp[amount];
}
int change(int amount, vector<int>& coins) {
    vector<int> dp(amount+1,0); dp[0]=1;
    for(int c:coins)
        for(int i=c;i<=amount;i++)
            dp[i]+=dp[i-c];
    return dp[amount];
}`,
            java: `public int coinChange(int[] coins, int amount) {
    int[] dp=new int[amount+1];
    Arrays.fill(dp, amount+1);
    dp[0]=0;
    for(int i=1;i<=amount;i++)
        for(int c:coins)
            if(c<=i) dp[i]=Math.min(dp[i],dp[i-c]+1);
    return dp[amount]>amount?-1:dp[amount];
}
public int change(int amount, int[] coins) {
    int[] dp=new int[amount+1]; dp[0]=1;
    for(int c:coins)
        for(int i=c;i<=amount;i++)
            dp[i]+=dp[i-c];
    return dp[amount];
}`
          }
        },
        keyInsight: "Coin Change II loop order: coins OUTER, amounts INNER. This ensures each coin is considered once per combination, avoiding duplicate combos like (1,2) and (2,1).",
        template: {
          python: `# Combinations (order doesn't matter) → coins outer:
for c in coins:
    for i in range(c, amount+1):
        dp[i] += dp[i-c]

# Permutations (order matters) → amounts outer:
for i in range(1, amount+1):
    for c in coins:
        if c <= i: dp[i] += dp[i-c]`,
          cpp: `// Combinations: for(c in coins) for(i from c to amount)
// Permutations: for(i from 1 to amount) for(c in coins)`,
          java: `// Same loop order distinction — critical!`
        }
      },
      {
        day: "Thu — LIS Family",
        where: "Longest Increasing Subsequence, number of LIS, Russian Doll Envelopes.",
        when: "LIS: dp[i] = length of longest increasing subsequence ending at i. O(n²) DP or O(n log n) with patience sorting (binary search).",
        what: "O(n log n) LIS: maintain tails[] array where tails[i] = smallest tail element of increasing subsequence of length i+1. Binary search for position to insert each new element.",
        example: {
          title: "Longest Increasing Subsequence — O(n log n)",
          explanation: "tails[] is always sorted. For each num: binary search for first tail >= num. Replace it with num (or append if all smaller). Length of tails = LIS length.",
          code: {
            python: `import bisect

def lengthOfLIS(nums):
    tails = []
    for num in nums:
        pos = bisect.bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)   # extend
        else:
            tails[pos] = num    # replace
    return len(tails)`,
            cpp: `int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for(int num : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), num);
        if(it == tails.end()) tails.push_back(num);
        else *it = num;
    }
    return tails.size();
}`,
            java: `public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for(int num : nums) {
        int lo=0, hi=tails.size();
        while(lo<hi){int mid=(lo+hi)/2;if(tails.get(mid)<num)lo=mid+1;else hi=mid;}
        if(lo==tails.size()) tails.add(num);
        else tails.set(lo, num);
    }
    return tails.size();
}`
          }
        },
        keyInsight: "tails[] does NOT store the actual LIS — it stores the smallest possible tail for each length. But its length IS the LIS length. Never use tails to reconstruct sequence.",
        template: {
          python: `import bisect
tails = []
for num in nums:
    pos = bisect.bisect_left(tails, num)  # first >= num
    if pos == len(tails): tails.append(num)
    else: tails[pos] = num
return len(tails)  # LIS length`,
          cpp: `vector<int> tails;
for(int n:nums){
    auto it=lower_bound(tails.begin(),tails.end(),n);
    if(it==tails.end()) tails.push_back(n);
    else *it=n;
}`,
          java: `// Binary search: find first index where tails[i]>=num
// Replace or append`
        }
      },
      {
        day: "Fri — 0/1 Knapsack Family",
        where: "0/1 Knapsack, partition equal subset sum, target sum, last stone weight II.",
        when: "Subset sum / partition problems map directly to 0/1 knapsack. Key: each item used at most once.",
        what: "0/1 Knapsack: dp[j] = max value with capacity j. Iterate items outer, capacity REVERSE inner (j from W down to w[i]). Reverse prevents using same item twice.",
        example: {
          title: "Partition Equal Subset Sum",
          explanation: "Target = total_sum/2. If odd sum → impossible. dp[j] = True if subset with sum j exists. For each num, update dp[j] = dp[j] or dp[j-num] (reverse order!).",
          code: {
            python: `def canPartition(nums):
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for num in nums:
        for j in range(target, num-1, -1):  # REVERSE!
            dp[j] = dp[j] or dp[j-num]
    return dp[target]`,
            cpp: `bool canPartition(vector<int>& nums) {
    int total=0; for(int n:nums) total+=n;
    if(total%2) return false;
    int target=total/2;
    vector<bool> dp(target+1,false);
    dp[0]=true;
    for(int num:nums)
        for(int j=target;j>=num;j--)
            dp[j]=dp[j]||dp[j-num];
    return dp[target];
}`,
            java: `public boolean canPartition(int[] nums) {
    int total=0; for(int n:nums) total+=n;
    if(total%2!=0) return false;
    int target=total/2;
    boolean[] dp=new boolean[target+1];
    dp[0]=true;
    for(int num:nums)
        for(int j=target;j>=num;j--)
            dp[j]=dp[j]||dp[j-num];
    return dp[target];
}`
          }
        },
        keyInsight: "0/1 Knapsack: iterate capacity BACKWARDS (target down to num). This prevents using the same item twice in the same pass. Unbounded: iterate FORWARDS.",
        template: {
          python: `# 0/1 Knapsack (each item once) → REVERSE inner loop:
dp = [0] * (W+1); dp[0] = 0
for weight, value in items:
    for j in range(W, weight-1, -1):  # reverse!
        dp[j] = max(dp[j], dp[j-weight] + value)

# Unbounded Knapsack (reuse items) → FORWARD inner loop:
for weight, value in items:
    for j in range(weight, W+1):      # forward!
        dp[j] = max(dp[j], dp[j-weight] + value)`,
          cpp: `// 0/1: for(j=W;j>=w;j--) dp[j]=max(dp[j],dp[j-w]+v)
// Unbounded: for(j=w;j<=W;j++) dp[j]=max(dp[j],dp[j-w]+v)`,
          java: `// 0/1: j from W down to w (reverse)
// Unbounded: j from w up to W (forward)`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review all 1D DP patterns: house robber, Kadane, coin change, LIS, knapsack.",
        when: "Before coding any DP problem: define dp[i], write recurrence, set base cases. Space optimize if dp[i] only needs last 1-2 values.",
        what: "5 patterns: House Robber (prev2/prev1), Kadane (restart or extend), Coin Change (min/count), LIS (binary search tails), 0/1 Knapsack (reverse loop).",
        example: {
          title: "1D DP Decision Guide",
          explanation: "Can't take adjacent? → House Robber. Max/min subarray? → Kadane. Fill capacity with items (reuse)? → Unbounded KS. Fill capacity without reuse? → 0/1 KS. Longest increasing? → LIS.",
          code: {
            python: `# Adjacent constraint → House Robber: dp[i]=max(dp[i-1],dp[i-2]+nums[i])
# Max subarray → Kadane: curr=max(num,curr+num)
# Min coins → Coin Change: dp[i]=min(dp[i],dp[i-c]+1)
# Count combos → Coin Change II: coins outer, amounts inner
# LIS O(n logn) → bisect_left on tails[]
# Subset sum → 0/1 KS: reverse inner loop`,
            cpp: `// House Robber → 2 variables (prev2,prev1)
// Kadane → curr=max(nums[i],curr+nums[i])
// Coin → dp[i]=min(dp[i],dp[i-c]+1)
// LIS → lower_bound on tails vector
// 0/1 KS → reverse inner loop`,
            java: `// Same 6 patterns, same code structure`
          }
        },
        keyInsight: "Every 1D DP: define what dp[i] means in one sentence. If you can't define it clearly, you can't code it correctly.",
        template: {
          python: `# DP setup checklist:
# 1. dp[i] means: _____________
# 2. Recurrence: dp[i] = f(dp[i-1], dp[i-2], ...)
# 3. Base cases: dp[0]=?, dp[1]=?
# 4. Answer: dp[n] or max(dp)
# 5. Space optimize if only last k values needed`,
          cpp: `// Same 5-step checklist
// Space opt: roll variables forward`,
          java: `// Same checklist applies`
        }
      },
      {
        day: "Sun — Mock + Assessment",
        where: "Apply 1D DP patterns under timed conditions. Amazon/Samsung heavily test coin change and knapsack.",
        when: "State the DP definition out loud first. 'dp[i] represents the maximum money we can rob from the first i houses.' This shows clear thinking before any code.",
        what: "DP interview approach: 1) Brute force + memoization first. 2) Convert to bottom-up. 3) Space optimize. This progression shows mastery.",
        example: {
          title: "DP Interview Process",
          explanation: "Start top-down (recursive + memo) if bottom-up isn't obvious. Say: 'I'll first write the recursive solution with memoization, then optimize to iterative.' Interviewers appreciate this.",
          code: {
            python: `# Step 1: Recursive (show thought process)
from functools import lru_cache
@lru_cache(None)
def dp(i): return max(dp(i-1), dp(i-2)+nums[i]) if i>=2 else ...

# Step 2: Bottom-up (cleaner)
for i in range(2,n): table[i]=max(table[i-1],table[i-2]+nums[i])

# Step 3: Space optimized (impressive)
prev2,prev1=base0,base1
for num in nums[2:]: prev2,prev1=prev1,max(prev1,prev2+num)`,
            cpp: `// Show: top-down memo → bottom-up → space opt
// Each step shows deeper understanding`,
            java: `// Progression: recursive → tabulation → space opt
// Interviewers want to see this thought process`
          }
        },
        keyInsight: "Show the progression: recursive → memoization → tabulation → space optimize. Each step demonstrates a deeper level of understanding.",
        template: {
          python: `# Assessment checklist for week 14:
# ✓ House Robber / Fibonacci variants
# ✓ Kadane's for max subarray
# ✓ Coin Change (min coins): dp[i-c]+1
# ✓ Coin Change II (ways): coins outer loop
# ✓ LIS: bisect_left on tails[]
# ✓ 0/1 Knapsack: reverse inner loop`,
          cpp: `// All 6 coded from memory
// Know the loop order distinction!`,
          java: `// Reverse vs forward inner loop
// is the most common DP mistake`
        }
      }
    ]
  },

  15: {
    title: "DP — 2D, Grid, LCS, Edit Distance",
    tagline: "2D DP: define dp[i][j], fill row by row. The recurrence builds on the rectangle above and to the left.",
    days: [
      {
        day: "Mon — Grid DP",
        where: "Unique paths, minimum path sum, dungeon game, cherry pickup.",
        when: "When movement is restricted (usually right/down only) and you want optimal cost/count of paths.",
        what: "Unique paths: dp[i][j] = dp[i-1][j] + dp[i][j-1]. Min path sum: dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). Fill row by row, left to right.",
        example: {
          title: "Minimum Path Sum",
          explanation: "dp[i][j] = min cost to reach (i,j) from (0,0). Only right/down moves. dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1]). First row and column have only one direction.",
          code: {
            python: `def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    dp = [[0]*n for _ in range(m)]
    dp[0][0] = grid[0][0]
    for j in range(1, n): dp[0][j] = dp[0][j-1] + grid[0][j]
    for i in range(1, m): dp[i][0] = dp[i-1][0] + grid[i][0]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])
    return dp[m-1][n-1]`,
            cpp: `int minPathSum(vector<vector<int>>& grid) {
    int m=grid.size(), n=grid[0].size();
    vector<vector<int>> dp(m,vector<int>(n,0));
    dp[0][0]=grid[0][0];
    for(int j=1;j<n;j++) dp[0][j]=dp[0][j-1]+grid[0][j];
    for(int i=1;i<m;i++) dp[i][0]=dp[i-1][0]+grid[i][0];
    for(int i=1;i<m;i++)
        for(int j=1;j<n;j++)
            dp[i][j]=grid[i][j]+min(dp[i-1][j],dp[i][j-1]);
    return dp[m-1][n-1];
}`,
            java: `public int minPathSum(int[][] grid) {
    int m=grid.length, n=grid[0].length;
    int[][] dp=new int[m][n];
    dp[0][0]=grid[0][0];
    for(int j=1;j<n;j++) dp[0][j]=dp[0][j-1]+grid[0][j];
    for(int i=1;i<m;i++) dp[i][0]=dp[i-1][0]+grid[i][0];
    for(int i=1;i<m;i++)
        for(int j=1;j<n;j++)
            dp[i][j]=grid[i][j]+Math.min(dp[i-1][j],dp[i][j-1]);
    return dp[m-1][n-1];
}`
          }
        },
        keyInsight: "Grid DP: always initialize first row and first column separately (only one direction available). Then fill inner cells using both directions.",
        template: {
          python: `dp = [[0]*n for _ in range(m)]
# Init first row and col:
for j in range(1,n): dp[0][j] = dp[0][j-1] + grid[0][j]
for i in range(1,m): dp[i][0] = dp[i-1][0] + grid[i][0]
# Fill inner:
for i in range(1,m):
    for j in range(1,n):
        dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`,
          cpp: `// Init first row: dp[0][j]=dp[0][j-1]+grid[0][j]
// Init first col: dp[i][0]=dp[i-1][0]+grid[i][0]
// Fill: dp[i][j]=grid[i][j]+min(dp[i-1][j],dp[i][j-1])`,
          java: `// Same initialization pattern
// Always handle boundaries first`
        }
      },
      {
        day: "Tue — LCS Family",
        where: "Longest Common Subsequence, longest common substring, shortest common supersequence.",
        when: "Comparing two strings for common structure. LCS is the foundation for diff tools, DNA alignment, and many string DP problems.",
        what: "LCS: dp[i][j] = length of LCS of s1[0..i-1] and s2[0..j-1]. If chars match: dp[i][j] = dp[i-1][j-1]+1. Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
        example: {
          title: "Longest Common Subsequence",
          explanation: "2D table: rows=s1, cols=s2. When s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1 (extend). Else: dp[i][j]=max(dp[i-1][j],dp[i][j-1]) (skip one char from either). Answer=dp[m][n].",
          code: {
            python: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]`,
            cpp: `int longestCommonSubsequence(string t1, string t2) {
    int m=t1.size(), n=t2.size();
    vector<vector<int>> dp(m+1,vector<int>(n+1,0));
    for(int i=1;i<=m;i++)
        for(int j=1;j<=n;j++)
            dp[i][j]=t1[i-1]==t2[j-1]?dp[i-1][j-1]+1:max(dp[i-1][j],dp[i][j-1]);
    return dp[m][n];
}`,
            java: `public int longestCommonSubsequence(String t1, String t2) {
    int m=t1.length(), n=t2.length();
    int[][] dp=new int[m+1][n+1];
    for(int i=1;i<=m;i++)
        for(int j=1;j<=n;j++)
            dp[i][j]=t1.charAt(i-1)==t2.charAt(j-1)?dp[i-1][j-1]+1:Math.max(dp[i-1][j],dp[i][j-1]);
    return dp[m][n];
}`
          }
        },
        keyInsight: "LCS table has (m+1)×(n+1) size with 0-indexed padding. Index with i-1 for string access but i for dp array. This off-by-one is where bugs happen.",
        template: {
          python: `dp = [[0]*(n+1) for _ in range(m+1)]  # 1-indexed with 0 padding
for i in range(1, m+1):
    for j in range(1, n+1):
        if s1[i-1] == s2[j-1]:      # match: extend diagonal
            dp[i][j] = dp[i-1][j-1] + 1
        else:                         # no match: best of skip either
            dp[i][j] = max(dp[i-1][j], dp[i][j-1])
return dp[m][n]`,
          cpp: `// dp[i][j]: t1[i-1]==t2[j-1]?dp[i-1][j-1]+1:max(dp[i-1][j],dp[i][j-1])`,
          java: `// Same: size (m+1)×(n+1), access chars with i-1/j-1`
        }
      },
      {
        day: "Wed — Edit Distance + String Match",
        where: "Edit Distance (Levenshtein), wildcard matching, regular expression matching.",
        when: "Edit distance: minimum operations (insert/delete/replace) to transform one string into another. Classic 2D DP.",
        what: "dp[i][j] = edit distance between s1[0..i-1] and s2[0..j-1]. Match: dp[i-1][j-1]. No match: 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) = delete/insert/replace.",
        example: {
          title: "Edit Distance",
          explanation: "dp[i][j]: if chars match → dp[i-1][j-1] (no operation). Else: 1 + min of 3 operations: dp[i-1][j] (delete from s1), dp[i][j-1] (insert into s1), dp[i-1][j-1] (replace).",
          code: {
            python: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i  # delete all of word1
    for j in range(n+1): dp[0][j] = j  # insert all of word2
    for i in range(1, m+1):
        for j in range(1, n+1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j],    # delete
                                    dp[i][j-1],    # insert
                                    dp[i-1][j-1])  # replace
    return dp[m][n]`,
            cpp: `int minDistance(string w1, string w2) {
    int m=w1.size(), n=w2.size();
    vector<vector<int>> dp(m+1,vector<int>(n+1));
    for(int i=0;i<=m;i++) dp[i][0]=i;
    for(int j=0;j<=n;j++) dp[0][j]=j;
    for(int i=1;i<=m;i++)
        for(int j=1;j<=n;j++)
            dp[i][j]=w1[i-1]==w2[j-1]?dp[i-1][j-1]:1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});
    return dp[m][n];
}`,
            java: `public int minDistance(String w1, String w2) {
    int m=w1.length(), n=w2.length();
    int[][] dp=new int[m+1][n+1];
    for(int i=0;i<=m;i++) dp[i][0]=i;
    for(int j=0;j<=n;j++) dp[0][j]=j;
    for(int i=1;i<=m;i++)
        for(int j=1;j<=n;j++)
            dp[i][j]=w1.charAt(i-1)==w2.charAt(j-1)?dp[i-1][j-1]:1+Math.min(dp[i-1][j-1],Math.min(dp[i-1][j],dp[i][j-1]));
    return dp[m][n];
}`
          }
        },
        keyInsight: "3 operations = 3 directions in table: dp[i-1][j]=delete, dp[i][j-1]=insert, dp[i-1][j-1]=replace. Memorize this mapping — it's always the same.",
        template: {
          python: `dp[i][0] = i   # base: delete i chars from s1
dp[0][j] = j   # base: insert j chars
for i in range(1,m+1):
    for j in range(1,n+1):
        if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]
        else: dp[i][j]=1+min(dp[i-1][j],  # delete
                              dp[i][j-1],  # insert
                              dp[i-1][j-1])# replace`,
          cpp: `// dp[i-1][j]=delete, dp[i][j-1]=insert, dp[i-1][j-1]=replace
// min({a,b,c}) in C++17`,
          java: `// Math.min(dp[i-1][j-1], Math.min(dp[i-1][j], dp[i][j-1]))`
        }
      },
      {
        day: "Thu — Interval DP",
        where: "Burst Balloons, Strange Printer, Minimum Cost to Merge Stones, Matrix Chain Multiplication.",
        when: "When the problem involves splitting/merging intervals and the optimal split point matters. Think 'what was the LAST operation done?'",
        what: "Interval DP: dp[i][j] = optimal answer for interval [i,j]. Fill by interval length (length 1, then 2, then 3...). For each [i,j], try every split point k.",
        example: {
          title: "Burst Balloons",
          explanation: "Think backwards: instead of which balloon to burst first, ask which to burst LAST in range [i,j]. dp[i][j] = max coins from bursting all in range. dp[i][j] = max over k of dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j].",
          code: {
            python: `def maxCoins(nums):
    nums = [1] + nums + [1]  # boundary balloons
    n = len(nums)
    dp = [[0]*n for _ in range(n)]
    
    for length in range(1, n-1):       # interval length
        for i in range(1, n-1-length+1):
            j = i + length - 1
            for k in range(i, j+1):   # k = last burst
                dp[i][j] = max(dp[i][j],
                    dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j])
    return dp[1][n-2]`,
            cpp: `int maxCoins(vector<int>& nums) {
    nums.insert(nums.begin(),1); nums.push_back(1);
    int n=nums.size();
    vector<vector<int>> dp(n,vector<int>(n,0));
    for(int len=1;len<=n-2;len++)
        for(int i=1;i+len-1<=n-2;i++){
            int j=i+len-1;
            for(int k=i;k<=j;k++)
                dp[i][j]=max(dp[i][j],dp[i][k-1]+nums[i-1]*nums[k]*nums[j+1]+dp[k+1][j]);
        }
    return dp[1][n-2];
}`,
            java: `public int maxCoins(int[] n) {
    int[] nums=new int[n.length+2];
    nums[0]=nums[n.length+1]=1;
    for(int i=0;i<n.length;i++) nums[i+1]=n[i];
    int sz=nums.length;
    int[][] dp=new int[sz][sz];
    for(int len=1;len<=sz-2;len++)
        for(int i=1;i+len-1<=sz-2;i++){int j=i+len-1;
            for(int k=i;k<=j;k++)
                dp[i][j]=Math.max(dp[i][j],dp[i][k-1]+nums[i-1]*nums[k]*nums[j+1]+dp[k+1][j]);}
    return dp[1][sz-2];
}`
          }
        },
        keyInsight: "Interval DP key: enumerate LAST operation (not first). Fill by increasing interval length. Try all split points k for each [i,j].",
        template: {
          python: `# Interval DP template:
for length in range(1, n+1):         # increasing length
    for i in range(n-length+1):
        j = i + length - 1
        for k in range(i, j+1):      # try all split points
            dp[i][j] = max(dp[i][j], dp[i][k] + dp[k+1][j] + cost(i,k,j))`,
          cpp: `// for(int len=1;len<n;len++)
//   for(int i=0;i+len<n;i++){int j=i+len;
//     for(int k=i;k<j;k++) dp[i][j]=min/max(...)`,
          java: `// Same: length outer, i+j inner, k split`
        }
      },
      {
        day: "Fri — 2D Knapsack + Counting",
        where: "Ones and Zeroes (2D knapsack), number of ways to reach target, count distinct subsequences.",
        when: "When knapsack has two capacity dimensions. dp[i][j][k] but optimized to dp[j][k] — reverse both capacity dimensions.",
        what: "Count distinct subsequences: dp[i][j] = number of times s2[0..j-1] appears as subsequence in s1[0..i-1]. Match: dp[i-1][j-1]+dp[i-1][j]. No match: dp[i-1][j].",
        example: {
          title: "Ones and Zeroes (2D Knapsack)",
          explanation: "Two capacities: m zeros, n ones. dp[i][j] = max strings using at most i zeros, j ones. Reverse iterate both dimensions. For each string, count its 0s and 1s.",
          code: {
            python: `def findMaxForm(strs, m, n):
    dp = [[0]*(n+1) for _ in range(m+1)]
    for s in strs:
        zeros = s.count('0')
        ones = s.count('1')
        for i in range(m, zeros-1, -1):    # reverse both
            for j in range(n, ones-1, -1):
                dp[i][j] = max(dp[i][j], dp[i-zeros][j-ones] + 1)
    return dp[m][n]`,
            cpp: `int findMaxForm(vector<string>& strs, int m, int n) {
    vector<vector<int>> dp(m+1,vector<int>(n+1,0));
    for(auto& s:strs){
        int z=count(s.begin(),s.end(),'0'),o=s.size()-z;
        for(int i=m;i>=z;i--)
            for(int j=n;j>=o;j--)
                dp[i][j]=max(dp[i][j],dp[i-z][j-o]+1);
    }
    return dp[m][n];
}`,
            java: `public int findMaxForm(String[] strs, int m, int n) {
    int[][] dp=new int[m+1][n+1];
    for(String s:strs){
        int z=0; for(char c:s.toCharArray()) if(c=='0') z++;
        int o=s.length()-z;
        for(int i=m;i>=z;i--)
            for(int j=n;j>=o;j--)
                dp[i][j]=Math.max(dp[i][j],dp[i-z][j-o]+1);
    }
    return dp[m][n];
}`
          }
        },
        keyInsight: "2D knapsack = reverse iterate BOTH capacity dimensions (i and j). One dimension reversed = 0/1 on first, but you need both reversed for 2D 0/1.",
        template: {
          python: `# 2D Knapsack: reverse both dimensions
dp = [[0]*(n+1) for _ in range(m+1)]
for each_item:
    a, b = item's two costs
    for i in range(m, a-1, -1):    # reverse capacity 1
        for j in range(n, b-1, -1):  # reverse capacity 2
            dp[i][j] = max(dp[i][j], dp[i-a][j-b] + value)`,
          cpp: `// for(i=m;i>=a;i--) for(j=n;j>=b;j--)
//   dp[i][j]=max(dp[i][j],dp[i-a][j-b]+val)`,
          java: `// Same: reverse both dimensions`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review all 2D DP patterns: grid, LCS, edit distance, interval, 2D knapsack.",
        when: "2D DP: define dp[i][j] in one sentence. Draw the table. Identify which cells it depends on. Fill in that order.",
        what: "5 patterns: Grid (right/down), LCS (match=diagonal+1, no match=max adjacent), Edit Distance (3 directions), Interval (length outer, split k), 2D Knapsack (reverse both).",
        example: {
          title: "2D DP Decision Guide",
          explanation: "Grid movement? → dp[i][j] from dp[i-1][j] and dp[i][j-1]. Comparing 2 strings? → LCS or Edit Distance. Splitting intervals? → Interval DP by length. Two capacities? → 2D Knapsack.",
          code: {
            python: `# Grid DP → dp[i][j] = dp[i-1][j] + dp[i][j-1] (counts) or min/max
# LCS → match: diagonal+1; no match: max(left,up)
# Edit dist → match: diagonal; no match: 1+min(3 directions)
# Interval → len outer, i+j inner, k split point
# 2D KS → reverse both capacity dimensions`,
            cpp: `// Grid: init boundaries first
// LCS: (m+1)×(n+1) with 0-padding
// Edit: dp[i][0]=i, dp[0][j]=j base cases
// Interval: fill by increasing length`,
            java: `// Same patterns, same code structure`
          }
        },
        keyInsight: "LCS vs Edit Distance: both are 2-string DP but different recurrence. LCS = take max of skipping. Edit = take min of 3 operations. Know both cold.",
        template: {
          python: `# LCS recurrence:
if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]+1
else: dp[i][j]=max(dp[i-1][j], dp[i][j-1])

# Edit Distance recurrence:
if s1[i-1]==s2[j-1]: dp[i][j]=dp[i-1][j-1]
else: dp[i][j]=1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])`,
          cpp: `// LCS: match→diag+1, no match→max(up,left)
// Edit: match→diag, no match→1+min(diag,up,left)`,
          java: `// Same two recurrences`
        }
      },
      {
        day: "Sun — Mock + Assessment",
        where: "Apply 2D DP patterns under timed conditions. Google/Meta frequently test LCS and Edit Distance.",
        when: "Draw the DP table on paper for small inputs before coding. This reveals the pattern and catches indexing errors.",
        what: "For 2D DP interviews: draw a 3×3 or 4×4 table, fill manually, then generalize to code. Showing the table demonstrates systematic thinking.",
        example: {
          title: "2D DP Interview Strategy",
          explanation: "Say: 'Let me build the DP table for a small example.' Fill 3-4 rows and columns by hand. This catches off-by-one errors and shows you understand the recurrence deeply.",
          code: {
            python: `# Example: LCS("abc","ac") → draw table:
#   ""  a  c
# ""  0  0  0
# a   0  1  1
# b   0  1  1
# c   0  1  2  ← answer
# Then generalize this to code`,
            cpp: `// Edit("horse","ros") → draw table
// Fill manually, verify recurrence
// Then code exactly what table shows`,
            java: `// Drawing table = visual proof of algorithm
// Do this for every 2D DP in interviews`
          }
        },
        keyInsight: "Drawing the DP table on paper for a small example is the fastest way to debug 2D DP logic and impress interviewers simultaneously.",
        template: {
          python: `# Assessment checklist week 15:
# ✓ Grid DP: init boundaries + fill inner
# ✓ LCS: diagonal+1 on match
# ✓ Edit Distance: 3 operations mapped to 3 directions
# ✓ Interval DP: length outer, split k inner
# ✓ 2D Knapsack: reverse both capacities`,
          cpp: `// All 5 templates memorized
// Draw table before coding`,
          java: `// Table drawing → code translation`
        }
      }
    ]
  },

  16: {
    title: "DP — Stocks, Palindromes, Word Break, Bitmask",
    tagline: "Advanced DP patterns: state machines for stocks, palindrome expansion, and bitmask for subsets.",
    days: [
      {
        day: "Mon — All 6 Stock Problems",
        where: "Buy and sell stocks: single transaction, unlimited, cooldown, fee, at most 2, at most K transactions.",
        when: "Stock problems = state machine DP. States: holding/not holding stock. Transitions: buy (pay price), sell (gain price), rest.",
        what: "Universal state: dp[i][0] = max profit on day i not holding stock. dp[i][1] = max profit on day i holding stock. Transitions depend on the variant.",
        example: {
          title: "Stock Problems State Machine",
          explanation: "Not holding: came from not holding yesterday (rest) or selling today (dp[i-1][1]+price). Holding: came from holding yesterday (rest) or buying today (dp[i-1][0]-price). Space optimize to 2 variables.",
          code: {
            python: `# Best Time to Buy and Sell Stock II (unlimited transactions)
def maxProfit(prices):
    hold, cash = -prices[0], 0
    for price in prices[1:]:
        hold = max(hold, cash - price)  # buy or keep holding
        cash = max(cash, hold + price)  # sell or keep cash
    return cash

# With Cooldown (can't buy day after sell)
def maxProfitCooldown(prices):
    held, sold, rest = -prices[0], 0, 0
    for price in prices[1:]:
        held = max(held, rest - price)
        sold = held + price
        rest = max(rest, sold)
    return max(sold, rest)

# With Transaction Fee
def maxProfitFee(prices, fee):
    hold, cash = -prices[0], 0
    for price in prices[1:]:
        hold = max(hold, cash - price)
        cash = max(cash, hold + price - fee)
    return cash`,
            cpp: `// At most K transactions:
int maxProfit(int k, vector<int>& prices) {
    int n=prices.size();
    if(k>=n/2){int res=0;for(int i=1;i<n;i++)res+=max(0,prices[i]-prices[i-1]);return res;}
    vector<int> buy(k+1,INT_MIN), sell(k+1,0);
    for(int p:prices)
        for(int j=k;j>=1;j--){
            buy[j]=max(buy[j],sell[j-1]-p);
            sell[j]=max(sell[j],buy[j]+p);
        }
    return sell[k];
}`,
            java: `// Unlimited: hold/cash rolling variables
// Cooldown: held/sold/rest 3 states
// Fee: same as unlimited but subtract fee on sell
// K transactions: buy[]/sell[] arrays`
          }
        },
        keyInsight: "All stock problems reduce to 2 state variables: hold and cash (or not_hold). The variant changes only the transition equation — not the structure.",
        template: {
          python: `# State machine template:
hold = -prices[0]  # max profit while holding
cash = 0           # max profit while not holding
for price in prices[1:]:
    new_hold = max(hold, cash - price)  # keep or buy
    new_cash = max(cash, hold + price)  # keep or sell
    hold, cash = new_hold, new_cash
return cash`,
          cpp: `// hold=max(hold, cash-price)
// cash=max(cash, hold+price)
// Modify transitions for cooldown/fee/K`,
          java: `// Same 2-variable rolling state
// Adjust transitions per variant`
        }
      },
      {
        day: "Tue — Palindrome DP",
        where: "Longest palindromic subsequence, minimum cuts for palindrome partitioning, count palindromic substrings.",
        when: "Palindrome problems need 2D DP. dp[i][j] = is s[i..j] a palindrome? Build from length 1 up.",
        what: "Palindrome check DP: dp[i][j]=True if s[i]==s[j] and dp[i+1][j-1] is palindrome. Count substrings: sum all True. LPS: dp[i][j]=LCS of s and reverse(s).",
        example: {
          title: "Longest Palindromic Subsequence",
          explanation: "LPS of s = LCS of s and reverse(s). OR: dp[i][j] = length of LPS in s[i..j]. If s[i]==s[j]: dp[i-1][j+1]+2. Else: max(dp[i][j-1], dp[i+1][j]).",
          code: {
            python: `# LPS using LCS
def longestPalindromeSubseq(s):
    return lcs(s, s[::-1])

# LPS direct DP
def longestPalindromeSubseq2(s):
    n = len(s)
    dp = [[0]*n for _ in range(n)]
    for i in range(n): dp[i][i] = 1  # single chars
    for length in range(2, n+1):
        for i in range(n-length+1):
            j = i+length-1
            if s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    return dp[0][n-1]`,
            cpp: `int longestPalindromeSubseq(string s) {
    int n=s.size();
    vector<vector<int>> dp(n,vector<int>(n,0));
    for(int i=0;i<n;i++) dp[i][i]=1;
    for(int len=2;len<=n;len++)
        for(int i=0;i+len-1<n;i++){int j=i+len-1;
            dp[i][j]=s[i]==s[j]?dp[i+1][j-1]+2:max(dp[i+1][j],dp[i][j-1]);}
    return dp[0][n-1];
}`,
            java: `public int longestPalindromeSubseq(String s) {
    int n=s.length();
    int[][] dp=new int[n][n];
    for(int i=0;i<n;i++) dp[i][i]=1;
    for(int len=2;len<=n;len++)
        for(int i=0;i+len-1<n;i++){int j=i+len-1;
            dp[i][j]=s.charAt(i)==s.charAt(j)?dp[i+1][j-1]+2:Math.max(dp[i+1][j],dp[i][j-1]);}
    return dp[0][n-1];
}`
          }
        },
        keyInsight: "LPS = LCS(s, reverse(s)). Reuse your LCS code. OR use interval DP directly. Both work — LCS approach is simpler to implement.",
        template: {
          python: `# Palindrome substring check DP:
dp = [[False]*n for _ in range(n)]
for i in range(n): dp[i][i] = True
for length in range(2, n+1):
    for i in range(n-length+1):
        j = i+length-1
        if length==2: dp[i][j]=(s[i]==s[j])
        else: dp[i][j]=(s[i]==s[j] and dp[i+1][j-1])`,
          cpp: `// dp[i][i]=true; dp[i][i+1]=(s[i]==s[i+1])
// dp[i][j]=s[i]==s[j]&&dp[i+1][j-1]`,
          java: `// Same: fill by length, check s[i]==s[j]&&inner`
        }
      },
      {
        day: "Wed — Word Break DP",
        where: "Word Break I (can you break?), Word Break II (return all ways), concatenated words.",
        when: "Check if string can be segmented into dictionary words. DP with set lookup.",
        what: "dp[i] = True if s[0..i-1] can be segmented. For each i, check all j < i: if dp[j] is True and s[j..i-1] is in dictionary → dp[i] = True.",
        example: {
          title: "Word Break",
          explanation: "dp[0]=True (empty string). For each position i, try all j from 0 to i: if dp[j] and s[j:i] in word_set → dp[i]=True. Convert wordDict to set for O(1) lookup.",
          code: {
            python: `def wordBreak(s, wordDict):
    word_set = set(wordDict)
    n = len(s)
    dp = [False] * (n+1)
    dp[0] = True
    for i in range(1, n+1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    return dp[n]`,
            cpp: `bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> ws(wordDict.begin(),wordDict.end());
    int n=s.size();
    vector<bool> dp(n+1,false);
    dp[0]=true;
    for(int i=1;i<=n;i++)
        for(int j=0;j<i;j++)
            if(dp[j]&&ws.count(s.substr(j,i-j))){dp[i]=true;break;}
    return dp[n];
}`,
            java: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> ws=new HashSet<>(wordDict);
    int n=s.length();
    boolean[] dp=new boolean[n+1];
    dp[0]=true;
    for(int i=1;i<=n;i++)
        for(int j=0;j<i;j++)
            if(dp[j]&&ws.contains(s.substring(j,i))){dp[i]=true;break;}
    return dp[n];
}`
          }
        },
        keyInsight: "Convert wordDict to HashSet for O(1) lookup. dp[0]=True is the base case (empty prefix always works). Break inner loop early once dp[i] is True.",
        template: {
          python: `word_set = set(wordDict)
dp = [False]*(n+1); dp[0]=True
for i in range(1, n+1):
    for j in range(i):
        if dp[j] and s[j:i] in word_set:
            dp[i] = True; break
return dp[n]`,
          cpp: `unordered_set<string> ws(wD.begin(),wD.end());
vector<bool> dp(n+1,false); dp[0]=true;
for(int i=1;i<=n;i++) for(int j=0;j<i;j++)
    if(dp[j]&&ws.count(s.substr(j,i-j))){dp[i]=true;break;}`,
          java: `Set<String> ws=new HashSet<>(wordDict);
boolean[] dp=new boolean[n+1]; dp[0]=true;`
        }
      },
      {
        day: "Thu — DP on Trees",
        where: "House Robber III (on binary tree), diameter, max path sum — problems where subtree results feed parent.",
        when: "When the DP state depends on subtree structure. Postorder traversal: compute children's DP values, then combine at current node.",
        what: "House Robber III: at each node, two states: rob this node or skip. rob[node] = node.val + skip[left] + skip[right]. skip[node] = max(rob[left],skip[left]) + max(rob[right],skip[right]).",
        example: {
          title: "House Robber III (Tree DP)",
          explanation: "Return pair (rob, skip) from each node. rob = node.val + left.skip + right.skip. skip = max(left.rob, left.skip) + max(right.rob, right.skip). Root's max(rob, skip) = answer.",
          code: {
            python: `def rob(root):
    def dfs(node):
        if not node: return (0, 0)  # (rob, skip)
        l_rob, l_skip = dfs(node.left)
        r_rob, r_skip = dfs(node.right)
        rob_this = node.val + l_skip + r_skip
        skip_this = max(l_rob, l_skip) + max(r_rob, r_skip)
        return (rob_this, skip_this)
    return max(dfs(root))`,
            cpp: `pair<int,int> dfs(TreeNode* node){
    if(!node) return {0,0};
    auto[lr,ls]=dfs(node->left);
    auto[rr,rs]=dfs(node->right);
    return {node->val+ls+rs, max(lr,ls)+max(rr,rs)};
}
int rob(TreeNode* root){auto[r,s]=dfs(root);return max(r,s);}`,
            java: `int[] dfs(TreeNode node){
    if(node==null) return new int[]{0,0};
    int[] l=dfs(node.left), r=dfs(node.right);
    int rob=node.val+l[1]+r[1];
    int skip=Math.max(l[0],l[1])+Math.max(r[0],r[1]);
    return new int[]{rob,skip};
}
public int rob(TreeNode root){int[]res=dfs(root);return Math.max(res[0],res[1]);}`
          }
        },
        keyInsight: "Tree DP: return multiple values from DFS (rob, skip). Combine children's results at current node. Same postorder pattern as height/diameter.",
        template: {
          python: `def dfs(node):
    if not node: return base_case_pair
    left = dfs(node.left)
    right = dfs(node.right)
    # compute state0 and state1 using left/right results
    return (state0, state1)
return max(dfs(root))`,
          cpp: `pair<int,int> dfs(TreeNode* n){
    if(!n) return {0,0};
    auto[l0,l1]=dfs(n->left);auto[r0,r1]=dfs(n->right);
    return {combine0(...), combine1(...)};
}`,
          java: `int[] dfs(TreeNode n){
    if(n==null) return new int[]{0,0};
    int[] l=dfs(n.left),r=dfs(n.right);
    return new int[]{combine0,combine1};
}`
        }
      },
      {
        day: "Fri — Bitmask DP",
        where: "Traveling Salesman Problem, Shortest Path Visiting All Nodes, Assign Tasks to Workers.",
        when: "When n is small (≤20) and you need to track which elements have been chosen. Bitmask represents set membership in O(1).",
        what: "dp[mask] = optimal value when the set of elements represented by mask have been processed. Iterate over all 2^n masks. For each mask, try adding each unvisited element.",
        example: {
          title: "Shortest Path Visiting All Nodes",
          explanation: "BFS with state (node, visited_mask). visited_mask = bitmask of visited nodes. Start: all single-node states. End: mask = (1<<n)-1 (all visited). First time reaching full mask = answer.",
          code: {
            python: `from collections import deque

def shortestPathLength(graph):
    n = len(graph)
    full = (1 << n) - 1
    # BFS: state = (node, visited_mask)
    q = deque((node, 1<<node, 0) for node in range(n))
    visited = set((node, 1<<node) for node in range(n))
    
    while q:
        node, mask, dist = q.popleft()
        if mask == full: return dist
        for nb in graph[node]:
            new_mask = mask | (1 << nb)
            if (nb, new_mask) not in visited:
                visited.add((nb, new_mask))
                q.append((nb, new_mask, dist+1))
    return -1`,
            cpp: `int shortestPathLength(vector<vector<int>>& graph) {
    int n=graph.size(), full=(1<<n)-1;
    queue<tuple<int,int,int>> q;
    set<pair<int,int>> vis;
    for(int i=0;i<n;i++){q.push({i,1<<i,0});vis.insert({i,1<<i});}
    while(!q.empty()){
        auto[node,mask,dist]=q.front();q.pop();
        if(mask==full) return dist;
        for(int nb:graph[node]){int nm=mask|(1<<nb);
            if(!vis.count({nb,nm})){vis.insert({nb,nm});q.push({nb,nm,dist+1});}}
    }
    return -1;
}`,
            java: `public int shortestPathLength(int[][] graph) {
    int n=graph.length, full=(1<<n)-1;
    Queue<int[]> q=new LinkedList<>();
    Set<Long> vis=new HashSet<>();
    for(int i=0;i<n;i++){q.offer(new int[]{i,1<<i,0});vis.add((long)i*100+(1<<i));}
    while(!q.isEmpty()){int[]cur=q.poll();int node=cur[0],mask=cur[1],dist=cur[2];
        if(mask==full) return dist;
        for(int nb:graph[node]){int nm=mask|(1<<nb);long key=(long)nb*100+nm;
            if(!vis.contains(key)){vis.add(key);q.offer(new int[]{nb,nm,dist+1});}}}
    return -1;
}`
          }
        },
        keyInsight: "Bitmask DP: state includes (position, visited_set_as_bitmask). Full mask = (1<<n)-1. Set bit: mask|(1<<i). Check bit: mask&(1<<i). Clear bit: mask&~(1<<i).",
        template: {
          python: `# Bitmask operations:
full = (1<<n)-1          # all n bits set
mask|(1<<i)              # set bit i
mask&(1<<i)              # check if bit i set
mask&~(1<<i)             # clear bit i
bin(mask).count('1')     # count set bits

# DP template:
dp = [inf]*(1<<n)
dp[start_mask] = 0
for mask in range(1<<n):
    for i in range(n):
        if not (mask&(1<<i)): continue  # i not in mask
        for j in range(n):
            if mask&(1<<j): continue    # j already visited
            dp[mask|(1<<j)] = min(dp[mask|(1<<j)], dp[mask]+cost)`,
          cpp: `// full=(1<<n)-1; mask|(1<<i); mask&(1<<i); mask&~(1<<i)
// dp[mask|(1<<j)]=min(dp[mask|(1<<j)],dp[mask]+cost)`,
          java: `// Same bitmask ops in Java
// (1<<n)-1 for full mask`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review stock DP, palindrome DP, word break, tree DP, and bitmask DP.",
        when: "Stock = state machine (hold/cash). Palindrome = interval DP. Word Break = prefix DP. Tree = postorder pair-return. Bitmask = state includes visited set.",
        what: "5 patterns from this week — each with a unique DP formulation. Know them by problem type recognition.",
        example: {
          title: "Week 16 Pattern Summary",
          explanation: "Hear 'stocks' → hold/cash state machine. 'Palindrome subsequence' → LPS = LCS(s,rev(s)). 'Word break' → prefix DP with set. 'House Robber on tree' → pair-return postorder. 'Visit all nodes small n' → bitmask DP.",
          code: {
            python: `# Stocks → hold=max(hold,cash-price); cash=max(cash,hold+price)
# LPS → LCS(s, s[::-1]) or interval DP
# Word Break → dp[j] and s[j:i] in word_set
# Tree DP → return (rob,skip) from dfs
# Bitmask → dp[mask], full=(1<<n)-1`,
            cpp: `// State machine → 2 rolling variables
// Palindrome → length outer, s[i]==s[j] check
// Word Break → substr in unordered_set
// Tree DP → pair<int,int> return from dfs
// Bitmask → 1<<i, mask|bit, mask&bit`,
            java: `// Same patterns in Java`
          }
        },
        keyInsight: "Bitmask DP only works when n ≤ 20 (2^20 = 1M states). Always check n in the problem before deciding on bitmask.",
        template: {
          python: `# Quick reference:
# Stocks: hold/cash rolling; adjust for variants
# Palindrome: dp[i][j]=s[i]==s[j]&&inner; length outer
# Word Break: dp[0]=True; dp[i]=any(dp[j]&&word)
# Tree DP: return tuple from dfs
# Bitmask: (1<<n) states; full=(1<<n)-1`,
          cpp: `// Bitmask: only for n≤20
// Tree DP: pair<int,int> or int[2] return`,
          java: `// Bitmask: int[] dp = new int[1<<n]`
        }
      },
      {
        day: "Sun — Mock + Assessment",
        where: "Apply all week 16 DP patterns under timed conditions. Amazon tests stock problems; Google tests bitmask.",
        when: "Stock problems: clarify the variant (one transaction? unlimited? cooldown? K?). The transition changes — structure stays same.",
        what: "State machine approach for stocks impresses interviewers more than trying to derive from scratch. Say 'I'll model this as a state machine with hold/not-hold states.'",
        example: {
          title: "Interview Approach for Advanced DP",
          explanation: "For stock problems, say: 'This is a state machine. Two states: holding and not holding. Transitions: buy, sell, rest. Let me write the transitions for this variant.' Then derive the equations.",
          code: {
            python: `# Stock interview script:
# "Two states: hold = max profit while holding stock
#              cash = max profit while not holding
# Transition for unlimited transactions:
#   hold = max(hold, cash - price)  # keep or buy
#   cash = max(cash, hold + price)  # keep or sell
# For cooldown: add 'prev_cash' before selling
# For K transactions: hold[]/sell[] arrays"`,
            cpp: `// State machine framing works for all 6 variants
// Mention it upfront — shows pattern recognition`,
            java: `// Same: state machine framing
// Derive transitions for each variant`
          }
        },
        keyInsight: "State machine framing generalizes all 6 stock variants. Internalize hold/cash as your default mental model for any stock problem.",
        template: {
          python: `# Assessment checklist week 16:
# ✓ All 6 stock variants (state machine)
# ✓ LPS: LCS(s,rev(s)) or interval DP
# ✓ Min cuts: precompute palindrome + DP
# ✓ Word Break: dp[0]=True, prefix check
# ✓ Tree DP: return pair from dfs
# ✓ Bitmask: know the 4 bit operations`,
          cpp: `// All 6 patterns from memory`,
          java: `// Especially: bitmask operations`
        }
      }
    ]
  },

  17: {
    title: "Greedy + Tries + Final DP Patterns",
    tagline: "Greedy: prove local optimal = global optimal. Trie: prefix tree for O(L) string search.",
    days: [
      {
        day: "Mon — Greedy Intervals",
        where: "Activity selection, interval scheduling, meeting rooms, minimum arrows to burst balloons.",
        when: "Interval problems: sort by end time. Greedy always picks the interval that ends earliest — maximizes remaining space.",
        what: "Non-overlapping intervals: sort by end. Greedily pick intervals that don't overlap with last chosen. Count removed = n - kept. Two intervals overlap if start of next < end of current.",
        example: {
          title: "Non-overlapping Intervals + Meeting Rooms II",
          explanation: "Non-overlapping: sort by end time. Track 'last end'. If current start >= last end → keep interval, update last end. Else → remove it (count++). Meeting Rooms II: sort starts and ends separately, use two pointers.",
          code: {
            python: `# Non-overlapping intervals (min removals)
def eraseOverlapIntervals(intervals):
    intervals.sort(key=lambda x: x[1])  # sort by END
    count = 0
    last_end = float('-inf')
    for start, end in intervals:
        if start >= last_end:
            last_end = end   # keep this interval
        else:
            count += 1       # remove this interval
    return count

# Meeting Rooms II (min rooms needed)
def minMeetingRooms(intervals):
    starts = sorted(i[0] for i in intervals)
    ends   = sorted(i[1] for i in intervals)
    rooms = 0; end_ptr = 0
    for start in starts:
        if start < ends[end_ptr]:
            rooms += 1       # need new room
        else:
            end_ptr += 1     # reuse a room
    return rooms`,
            cpp: `int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    sort(intervals.begin(),intervals.end(),[](auto&a,auto&b){return a[1]<b[1];});
    int count=0,lastEnd=INT_MIN;
    for(auto& iv:intervals)
        if(iv[0]>=lastEnd) lastEnd=iv[1];
        else count++;
    return count;
}`,
            java: `public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals,(a,b)->a[1]-b[1]);
    int count=0,lastEnd=Integer.MIN_VALUE;
    for(int[] iv:intervals)
        if(iv[0]>=lastEnd) lastEnd=iv[1];
        else count++;
    return count;
}`
          }
        },
        keyInsight: "Sort by END time for interval scheduling (not start). The interval ending soonest leaves maximum room for future intervals — that's the greedy insight.",
        template: {
          python: `# Interval greedy template:
intervals.sort(key=lambda x: x[1])  # sort by end
last_end = float('-inf')
for start, end in intervals:
    if start >= last_end:
        last_end = end    # compatible → keep
    else:
        pass              # overlapping → remove/handle`,
          cpp: `// sort by end: sort(...,[](a,b){return a[1]<b[1];})
// track lastEnd; update on keep`,
          java: `// Arrays.sort(intervals,(a,b)->a[1]-b[1])
// sort by end time`
        }
      },
      {
        day: "Tue — Greedy Strings + Numbers",
        where: "Jump Game, Gas Station, Task Scheduler, Remove K Digits.",
        when: "Gas Station: greedy check — if total gas >= total cost, a solution exists. Start from any point where running sum goes negative, reset there.",
        what: "Remove K Digits: monotonic stack + greedy. Keep a stack of digits. If current digit < stack top and k > 0, pop (remove larger digit). Smallest number = keep smaller prefix.",
        example: {
          title: "Remove K Digits (Greedy + Monotonic Stack)",
          explanation: "Maintain increasing stack. For each digit, pop stack while stack top > current digit AND k > 0. Push current. If k > 0 after loop, remove from end. Strip leading zeros.",
          code: {
            python: `def removeKdigits(num, k):
    stack = []
    for digit in num:
        while k and stack and stack[-1] > digit:
            stack.pop()
            k -= 1
        stack.append(digit)
    # if k remaining, remove from end
    stack = stack[:-k] if k else stack
    # strip leading zeros
    return ''.join(stack).lstrip('0') or '0'`,
            cpp: `string removeKdigits(string num, int k) {
    string stack="";
    for(char d:num){
        while(k&&!stack.empty()&&stack.back()>d){stack.pop_back();k--;}
        stack+=d;
    }
    while(k--) stack.pop_back();
    int start=stack.find_first_not_of('0');
    return start==string::npos?"0":stack.substr(start);
}`,
            java: `public String removeKdigits(String num, int k) {
    Deque<Character> stack=new ArrayDeque<>();
    for(char d:num.toCharArray()){
        while(k>0&&!stack.isEmpty()&&stack.peek()>d){stack.pop();k--;}
        stack.push(d);
    }
    while(k-->0) stack.pop();
    StringBuilder sb=new StringBuilder();
    boolean leadZero=true;
    while(!stack.isEmpty()){
        Deque<Character> tmp=new ArrayDeque<>();
        while(!stack.isEmpty()) tmp.push(stack.pop());
        for(char c:tmp){if(leadZero&&c=='0') continue;leadZero=false;sb.append(c);}
        break;
    }
    return sb.length()==0?"0":sb.toString();
}`
          }
        },
        keyInsight: "Remove K Digits: greedy choice is to remove a digit if next digit is smaller (makes number smaller). Monotonic stack enforces this in O(n).",
        template: {
          python: `# Remove K digits greedy:
stack = []
for d in num:
    while k and stack and stack[-1] > d:
        stack.pop(); k -= 1
    stack.append(d)
if k: stack = stack[:-k]
return ''.join(stack).lstrip('0') or '0'`,
          cpp: `// Monotonic increasing stack
// pop when top > curr and k > 0`,
          java: `// Same: pop while top>curr and k>0`
        }
      },
      {
        day: "Wed — Trie Fundamentals",
        where: "Implement Trie, search with prefix, Longest Common Prefix, word dictionary with wildcard.",
        when: "Prefix-based string searches: O(L) per operation where L = word length. Faster than hashmap when prefix matching needed.",
        what: "Trie node: children[26] (or dict) + is_end flag. Insert: walk nodes, create if missing, mark end. Search: walk nodes, check is_end. StartsWith: walk nodes, return True if path exists.",
        example: {
          title: "Implement Trie",
          explanation: "Each node has array children[26] and boolean is_end. Insert: for each char, create child if needed, walk down, set is_end=True at last node. Search: walk down, return is_end at last node.",
          code: {
            python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True
    
    def search(self, word):
        node = self.root
        for c in word:
            if c not in node.children: return False
            node = node.children[c]
        return node.is_end
    
    def startsWith(self, prefix):
        node = self.root
        for c in prefix:
            if c not in node.children: return False
            node = node.children[c]
        return True`,
            cpp: `struct TrieNode {
    TrieNode* children[26]={};
    bool isEnd=false;
};
class Trie {
    TrieNode* root=new TrieNode();
public:
    void insert(string w){TrieNode* n=root;for(char c:w){if(!n->children[c-'a'])n->children[c-'a']=new TrieNode();n=n->children[c-'a'];}n->isEnd=true;}
    bool search(string w){TrieNode* n=root;for(char c:w){if(!n->children[c-'a'])return false;n=n->children[c-'a'];}return n->isEnd;}
    bool startsWith(string p){TrieNode* n=root;for(char c:p){if(!n->children[c-'a'])return false;n=n->children[c-'a'];}return true;}
};`,
            java: `class Trie {
    TrieNode root=new TrieNode();
    public void insert(String w){TrieNode n=root;for(char c:w.toCharArray()){int i=c-'a';if(n.children[i]==null)n.children[i]=new TrieNode();n=n.children[i];}n.isEnd=true;}
    public boolean search(String w){TrieNode n=root;for(char c:w.toCharArray()){int i=c-'a';if(n.children[i]==null)return false;n=n.children[i];}return n.isEnd;}
    public boolean startsWith(String p){TrieNode n=root;for(char c:p.toCharArray()){int i=c-'a';if(n.children[i]==null)return false;n=n.children[i];}return true;}
}
class TrieNode{TrieNode[] children=new TrieNode[26];boolean isEnd;}`
          }
        },
        keyInsight: "Trie insert/search/prefix all O(L) where L=word length. Space O(alphabet_size × total_chars). Use dict instead of array[26] for non-lowercase inputs.",
        template: {
          python: `class TrieNode:
    def __init__(self):
        self.children = {}  # or [None]*26
        self.is_end = False

# Insert:
node = root
for c in word:
    node = node.children.setdefault(c, TrieNode())
node.is_end = True

# Search / StartsWith:
node = root
for c in word:
    if c not in node.children: return False/None
    node = node.children[c]
return node.is_end  # search; True for startsWith`,
          cpp: `// children[26] array — c-'a' indexing
// insert: create if null; search: return null check`,
          java: `// TrieNode[] children=new TrieNode[26]
// children[c-'a']`
        }
      },
      {
        day: "Thu — Advanced Trie",
        where: "Word Search II (Trie + DFS), Replace Words, Map Sum Pairs, Maximum XOR.",
        when: "Word Search II: build Trie from word list, then DFS on board. Far more efficient than searching each word individually.",
        what: "Word Search II: insert all words into Trie. DFS from each cell — navigate Trie simultaneously. When is_end hit → found a word. Prune by removing found words from Trie.",
        example: {
          title: "Word Search II (Trie + Backtracking)",
          explanation: "Build Trie from words. DFS from each cell using board chars to navigate Trie. When trie_node.is_end: add to result, clear is_end (avoid duplicates). Prune when node has no children (dead end).",
          code: {
            python: `def findWords(board, words):
    root = TrieNode()
    for w in words:
        node = root
        for c in w:
            node = node.children.setdefault(c, TrieNode())
        node.is_end = w  # store word at end node
    
    rows, cols = len(board), len(board[0])
    result = []
    
    def dfs(node, r, c):
        if node.is_end:
            result.append(node.is_end)
            node.is_end = False  # avoid duplicate
        if r<0 or r>=rows or c<0 or c>=cols: return
        ch = board[r][c]
        if ch not in node.children: return
        board[r][c] = '#'  # mark visited
        next_node = node.children[ch]
        for dr,dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            dfs(next_node, r+dr, c+dc)
        board[r][c] = ch   # restore
        if not next_node.children:  # prune dead branch
            del node.children[ch]
    
    for r in range(rows):
        for c in range(cols):
            dfs(root, r, c)
    return result`,
            cpp: `// Build Trie from all words
// DFS with Trie navigation simultaneously
// Prune: delete node from parent if no children left`,
            java: `// Same: Trie + DFS backtracking
// Store word string at is_end node
// Delete empty nodes for pruning`
          }
        },
        keyInsight: "Store the word string at is_end (not just True). Prune empty Trie branches after finding words — this makes Word Search II feasible for large inputs.",
        template: {
          python: `# Trie + DFS template:
# 1. Build Trie from all words (is_end = word string)
# 2. DFS from each cell, navigate Trie simultaneously
# 3. When is_end: record word, clear is_end
# 4. Mark cell '#' to prevent revisit
# 5. Prune: delete child node if no children left`,
          cpp: `// Pruning is the key optimization
// delete node->children[c] when empty`,
          java: `// children[c-'a']=null for pruning`
        }
      },
      {
        day: "Fri — Greedy Mixed",
        where: "Task Scheduler, Candy, Partition Labels, Minimum Number of Arrows.",
        when: "Mixed greedy problems — each needs a different insight. Partition Labels: track rightmost position of each char.",
        what: "Partition Labels: for each position, track rightmost occurrence of its character. Partition ends when current index = rightmost boundary of everything seen so far.",
        example: {
          title: "Partition Labels",
          explanation: "Precompute last[c] = last occurrence index of char c. Scan left to right. Track 'end' = max last[char] seen so far. When i==end → partition ends here. New partition starts at i+1.",
          code: {
            python: `def partitionLabels(s):
    last = {c: i for i, c in enumerate(s)}  # last occurrence
    result = []
    start = end = 0
    for i, c in enumerate(s):
        end = max(end, last[c])  # extend partition if needed
        if i == end:             # partition complete
            result.append(end - start + 1)
            start = i + 1
    return result`,
            cpp: `vector<int> partitionLabels(string s) {
    int last[26]={};
    for(int i=0;i<(int)s.size();i++) last[s[i]-'a']=i;
    vector<int> res; int start=0,end=0;
    for(int i=0;i<(int)s.size();i++){
        end=max(end,last[s[i]-'a']);
        if(i==end){res.push_back(end-start+1);start=i+1;}
    }
    return res;
}`,
            java: `public List<Integer> partitionLabels(String s) {
    int[] last=new int[26];
    for(int i=0;i<s.length();i++) last[s.charAt(i)-'a']=i;
    List<Integer> res=new ArrayList<>();
    int start=0,end=0;
    for(int i=0;i<s.length();i++){
        end=Math.max(end,last[s.charAt(i)-'a']);
        if(i==end){res.add(end-start+1);start=i+1;}
    }
    return res;
}`
          }
        },
        keyInsight: "Partition Labels: precompute last occurrence in one pass. Then single scan: extend boundary, partition when i==end. O(n) total.",
        template: {
          python: `# Partition Labels:
last = {c: i for i, c in enumerate(s)}
start = end = 0
for i, c in enumerate(s):
    end = max(end, last[c])
    if i == end:
        result.append(end-start+1)
        start = i+1`,
          cpp: `// last[s[i]-'a']=i (last occurrence)
// if(i==end) → partition done, reset start`,
          java: `// last[s.charAt(i)-'a']=i
// if(i==end) → record partition length`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review greedy intervals, greedy strings, Trie, advanced Trie, partition greedy.",
        when: "Greedy: identify the local choice that leads to global optimum. Trie: use when prefix queries or multiple-word search needed.",
        what: "Greedy: sort by end (intervals), monotonic stack (remove K digits), last occurrence (partition). Trie: insert+search+startsWith all O(L). Prune in Word Search II.",
        example: {
          title: "Week 17 Pattern Summary",
          explanation: "Intervals → sort by end, track last_end. Remove K digits → monotonic stack. Trie → children[26]+is_end. Word Search II → Trie+DFS+prune. Partition Labels → last occurrence map.",
          code: {
            python: `# Interval greedy → sort by end, keep non-overlapping
# Remove K digits → monotonic increasing stack
# Task Scheduler → most frequent task + idle slots
# Trie → TrieNode(children={}, is_end=False)
# Word Search II → Trie+backtracking+pruning
# Partition Labels → last[c]+extend boundary`,
            cpp: `// Intervals: sort by end time
// Trie: TrieNode* children[26]={}
// Greedy: prove local=global before coding`,
            java: `// Same patterns
// Trie: TrieNode[] children=new TrieNode[26]`
          }
        },
        keyInsight: "For greedy, always ask: 'Why does local optimal equal global optimal?' If you can't answer this, reconsider whether greedy applies.",
        template: {
          python: `# Greedy checklist:
# 1. Sort by what? (end time, frequency, size...)
# 2. What's the greedy choice at each step?
# 3. Why is local=global? (exchange argument)
# 4. What's the invariant maintained?`,
          cpp: `// Trie operations all follow same pattern:
// walk nodes char by char, create/check/mark`,
          java: `// Same greedy + Trie checklists`
        }
      },
      {
        day: "Sun — Mock + Assessment",
        where: "Apply greedy and Trie patterns under timed conditions. Microsoft/Flipkart test Trie heavily.",
        when: "Greedy: state your greedy choice and WHY it works before coding. Trie: draw the tree structure for a small example.",
        what: "For interval problems: immediately sort by end time — this should be reflexive. For Trie: draw the tree to show the structure before coding the TrieNode class.",
        example: {
          title: "Interview Strategy for Greedy + Trie",
          explanation: "Greedy: say 'I'll sort by end time because picking the earliest-ending interval maximizes future choices — exchange argument.' Trie: draw tree for ['ace','acf','b'] before coding.",
          code: {
            python: `# Greedy interview script:
# "I'll sort by end time. The greedy choice is to
#  always pick the interval ending soonest —
#  this leaves maximum room for future intervals.
#  This is provable by exchange argument."

# Trie interview script:
# "I'll build a Trie. Each node has 26 children
#  and an is_end flag. Insert/search/prefix all O(L).
#  Let me draw the tree for the example first."`,
            cpp: `// Always draw Trie before coding
// Exchange argument for greedy proof`,
            java: `// Same: verbalize reasoning before coding
// Shows understanding not just memorization`
          }
        },
        keyInsight: "Saying 'exchange argument' for greedy or drawing the Trie first demonstrates real understanding, not just pattern matching.",
        template: {
          python: `# Week 17 assessment checklist:
# ✓ Non-overlapping intervals: sort by end
# ✓ Meeting rooms: sorted starts+ends two-pointer
# ✓ Remove K digits: monotonic stack
# ✓ Partition Labels: last occurrence + extend
# ✓ Trie: insert/search/startsWith O(L)
# ✓ Word Search II: Trie+DFS+prune`,
          cpp: `// All 6 patterns from memory`,
          java: `// Trie is the most tested — practice coding fast`
        }
      }
    ]
  },

  18: {
    title: "Bit Manipulation + Math + Number Theory",
    tagline: "Bits are the fastest operations in computing. XOR, AND, OR unlock O(1) tricks that look like magic.",
    days: [
      {
        day: "Mon — Bit Basics",
        where: "Check bit, set bit, clear bit, toggle bit, count set bits, check power of 2.",
        when: "Use bit manipulation when you need O(1) space for subset/flag tracking, or when arithmetic tricks eliminate loops.",
        what: "Core operations: n&(n-1) clears lowest set bit (use for popcount and power-of-2 check). n&(-n) isolates lowest set bit. n^n=0 (XOR self cancels). n^0=n (XOR zero identity).",
        example: {
          title: "Counting Bits + Power of Two",
          explanation: "Power of 2: n>0 and n&(n-1)==0 (exactly one bit set). Count bits 0 to n: dp[i] = dp[i>>1] + (i&1). Right shift removes last bit; add 1 if last bit was set.",
          code: {
            python: `def isPowerOfTwo(n):
    return n > 0 and (n & (n-1)) == 0

def countBits(n):
    dp = [0] * (n+1)
    for i in range(1, n+1):
        dp[i] = dp[i >> 1] + (i & 1)  # shift + check last bit
    return dp

def hammingWeight(n):
    count = 0
    while n:
        n &= (n-1)   # clear lowest set bit
        count += 1
    return count`,
            cpp: `bool isPowerOfTwo(int n){ return n>0&&(n&(n-1))==0; }

int hammingWeight(uint32_t n){
    int count=0;
    while(n){n&=(n-1);count++;}
    return count;
}

vector<int> countBits(int n){
    vector<int> dp(n+1);
    for(int i=1;i<=n;i++) dp[i]=dp[i>>1]+(i&1);
    return dp;
}`,
            java: `public boolean isPowerOfTwo(int n){ return n>0&&(n&(n-1))==0; }

public int hammingWeight(int n){
    int count=0;
    while(n!=0){n&=(n-1);count++;}
    return count;
}

public int[] countBits(int n){
    int[] dp=new int[n+1];
    for(int i=1;i<=n;i++) dp[i]=dp[i>>1]+(i&1);
    return dp;
}`
          }
        },
        keyInsight: "n&(n-1) removes the lowest set bit. Loop until n=0 while doing this = popcount in O(set bits) not O(32). For power of 2: exactly one bit set means n&(n-1)==0.",
        template: {
          python: `# Essential bit operations:
n & (n-1)    # clear lowest set bit (power-of-2 check, popcount)
n & (-n)     # isolate lowest set bit
n | (1<<i)   # set bit i
n & ~(1<<i)  # clear bit i
n ^ (1<<i)   # toggle bit i
(n >> i) & 1 # check bit i
n & 1        # check if odd

# Counting set bits:
while n: n &= n-1; count += 1

# Power of 2:
n > 0 and (n & (n-1)) == 0`,
          cpp: `// n&(n-1) clears lowest set bit
// n>0&&!(n&(n-1)) = power of 2
// __builtin_popcount(n) = count set bits (GCC)`,
          java: `// Integer.bitCount(n) = count set bits
// n>0&&(n&(n-1))==0 = power of 2`
        }
      },
      {
        day: "Tue — XOR Patterns",
        where: "Single Number, Missing Number, Find Two Non-Repeating Numbers, Maximum XOR.",
        when: "XOR cancels pairs: a^a=0, a^0=a. If all numbers appear twice except one → XOR all = the single number. Missing number: XOR all indices and all values.",
        what: "Find two non-repeating: XOR all → x^y. Find a set bit in x^y (use rightmost). Split array by that bit → two groups, each containing one of x or y.",
        example: {
          title: "Single Number I, II, III",
          explanation: "I: XOR all → pairs cancel, single remains. II: count each bit mod 3 → leftover bits = single number's bits. III: XOR all→x^y, split by rightmost set bit, XOR each group.",
          code: {
            python: `# Single Number I: one number appears once, rest twice
def singleNumber(nums):
    result = 0
    for n in nums: result ^= n
    return result

# Single Number III: two numbers appear once
def singleNumber3(nums):
    xor = 0
    for n in nums: xor ^= n      # xor = a ^ b
    diff = xor & (-xor)           # rightmost set bit
    a = 0
    for n in nums:
        if n & diff: a ^= n       # group with bit set
    return [a, xor ^ a]

# Missing Number:
def missingNumber(nums):
    return len(nums)*(len(nums)+1)//2 - sum(nums)
    # OR: reduce(xor, range(len+1)) ^ reduce(xor, nums)`,
            cpp: `int singleNumber(vector<int>& nums){
    int res=0; for(int n:nums) res^=n; return res;
}
vector<int> singleNumber3(vector<int>& nums){
    int xorAll=0; for(int n:nums) xorAll^=n;
    int diff=xorAll&(-xorAll); int a=0;
    for(int n:nums) if(n&diff) a^=n;
    return {a,xorAll^a};
}`,
            java: `public int singleNumber(int[] nums){
    int res=0; for(int n:nums) res^=n; return res;
}
public int[] singleNumber(int[] nums){ // III
    int xor=0; for(int n:nums) xor^=n;
    int diff=xor&(-xor); int a=0;
    for(int n:nums) if((n&diff)!=0) a^=n;
    return new int[]{a,xor^a};
}`
          }
        },
        keyInsight: "xor&(-xor) isolates the rightmost set bit. This bit MUST differ between a and b (since xor=a^b and that bit is set). Use it to split the array into two groups.",
        template: {
          python: `# XOR patterns:
# All pairs cancel: reduce(xor, nums) = single element
# Missing in 0..n: reduce(xor,range(n+1)) ^ reduce(xor,nums)
# Two singles: xor=a^b; bit=xor&(-xor); split by bit`,
          cpp: `// xorAll = a^b; diff = xorAll&(-xorAll)
// split: if(n&diff) → group1; else → group2
// XOR each group separately → a and b`,
          java: `// diff=xor&(-xor) = rightmost differing bit
// split array into two groups by this bit`
        }
      },
      {
        day: "Wed — Bit Manipulation Advanced",
        where: "Sum of Two Integers Without +, Reverse Bits, Number of 1 Bits, Subsets using bits.",
        when: "Sum without +: use XOR for sum bits, AND+shift for carry. Enumerate all subsets: iterate mask from 0 to (1<<n)-1.",
        what: "Add without + operators: a^b = sum without carry, (a&b)<<1 = carry. Repeat until no carry. Enumerate subsets: for mask in range(1<<n), bit i set = element i included.",
        example: {
          title: "Sum Without + / Enumerate Subsets",
          explanation: "Add: while b!=0: a,b = a^b, (a&b)<<1. XOR gives bitwise sum, AND+shift gives carry. Repeat until carry=0. Subsets: mask from 0 to 2^n-1, bit i set = include element i.",
          code: {
            python: `def getSum(a, b):
    mask = 0xFFFFFFFF  # 32-bit mask
    while b & mask:
        a, b = a ^ b, (a & b) << 1
    return a if b == 0 else a & mask  # handle negative

# Enumerate all subsets:
def allSubsets(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):
        subset = [nums[i] for i in range(n) if mask & (1<<i)]
        result.append(subset)
    return result`,
            cpp: `int getSum(int a, int b){
    while(b){
        int carry=(unsigned)(a&b)<<1;
        a=a^b; b=carry;
    }
    return a;
}
// Enumerate subsets:
for(int mask=0;mask<(1<<n);mask++){
    vector<int> subset;
    for(int i=0;i<n;i++) if(mask&(1<<i)) subset.push_back(nums[i]);
}`,
            java: `public int getSum(int a, int b){
    while(b!=0){int carry=(a&b)<<1;a=a^b;b=carry;}
    return a;
}
// Enumerate subsets:
for(int mask=0;mask<(1<<n);mask++){
    List<Integer> subset=new ArrayList<>();
    for(int i=0;i<n;i++) if((mask&(1<<i))!=0) subset.add(nums[i]);
}`
          }
        },
        keyInsight: "Add without +: XOR gives sum, AND+left-shift gives carry. Loop until carry=0. This simulates full adder logic in software.",
        template: {
          python: `# Add without +:
while b: a, b = a^b, (a&b)<<1

# Enumerate n-element subsets:
for mask in range(1<<n):
    subset = [nums[i] for i in range(n) if mask&(1<<i)]

# Enumerate subsets of a subset (mask):
sub = mask
while sub:
    # process sub
    sub = (sub-1) & mask  # next subset of mask`,
          cpp: `// Add: while(b){int c=(a&b)<<1;a^=b;b=c;}
// Subsets: for(int sub=mask;sub;sub=(sub-1)&mask)`,
          java: `// Add: while(b!=0){int c=(a&b)<<1;a^=b;b=c;}
// Subsets: for(int sub=mask;sub!=0;sub=(sub-1)&mask)`
        }
      },
      {
        day: "Thu — Number Theory",
        where: "GCD/LCM, prime sieve, modular arithmetic, fast exponentiation.",
        when: "GCD: Euclidean algorithm O(log n). Primes up to n: Sieve of Eratosthenes O(n log log n). Modular power: fast exponentiation O(log n).",
        what: "Fast power (a^b mod m): binary exponentiation. If b is odd → multiply result by a. Square a, halve b. Repeat. O(log b) instead of O(b).",
        example: {
          title: "Fast Power + Sieve of Eratosthenes",
          explanation: "Fast power: result=1, while b>0: if b odd → result*=a; a*=a; b//=2. Sieve: mark composites by starting from p² for each prime p up to sqrt(n).",
          code: {
            python: `# GCD - Euclidean
def gcd(a, b):
    while b: a, b = b, a%b
    return a

# Fast Power (modular exponentiation)
def fast_pow(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp & 1: result = result * base % mod
        base = base * base % mod
        exp >>= 1
    return result

# Sieve of Eratosthenes
def sieve(n):
    is_prime = [True] * (n+1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5)+1):
        if is_prime[i]:
            for j in range(i*i, n+1, i):
                is_prime[j] = False
    return [i for i in range(n+1) if is_prime[i]]`,
            cpp: `long long fast_pow(long long base,long long exp,long long mod){
    long long result=1; base%=mod;
    while(exp>0){
        if(exp&1) result=result*base%mod;
        base=base*base%mod; exp>>=1;
    }
    return result;
}
vector<bool> sieve(int n){
    vector<bool> isPrime(n+1,true);
    isPrime[0]=isPrime[1]=false;
    for(int i=2;(long long)i*i<=n;i++)
        if(isPrime[i]) for(int j=i*i;j<=n;j+=i) isPrime[j]=false;
    return isPrime;
}`,
            java: `long fastPow(long base,long exp,long mod){
    long result=1; base%=mod;
    while(exp>0){
        if((exp&1)==1) result=result*base%mod;
        base=base*base%mod; exp>>=1;
    }
    return result;
}`
          }
        },
        keyInsight: "Fast exponentiation: O(log n) by squaring. lcm(a,b) = a*b/gcd(a,b). Sieve starts from i*i (not 2*i) because smaller multiples already marked.",
        template: {
          python: `# GCD: while b: a,b=b,a%b; return a
# LCM: a*b//gcd(a,b)
# Fast pow: square base, halve exp, multiply if odd bit
# Sieve: mark j=i*i,i*i+i,... for each prime i`,
          cpp: `// __gcd(a,b) built-in GCC
// pow(base,exp,mod): loop with >>= and &1`,
          java: `// BigInteger.valueOf(a).gcd(BigInteger.valueOf(b))
// Manual: while(b!=0){int t=b;b=a%b;a=t;} return a;`
        }
      },
      {
        day: "Fri — Math MNC Style",
        where: "Excel column title, happy number, integer to Roman, sqrt without sqrt(), counting prime digits.",
        when: "Math problems test your ability to simulate mathematical operations precisely. Read the spec carefully — edge cases matter.",
        what: "Happy Number: detect cycle using fast-slow pointers (Floyd's). Sum of digit squares until 1 (happy) or cycle. 1 is always in the cycle for unhappy numbers.",
        example: {
          title: "Happy Number + Sqrt (Binary Search)",
          explanation: "Happy Number: compute sum of squared digits. Use slow/fast — fast computes two steps, slow one. If fast==1 → happy. If slow==fast → cycle → not happy. Sqrt: binary search on [1,x].",
          code: {
            python: `def isHappy(n):
    def next_num(n):
        return sum(int(d)**2 for d in str(n))
    slow = fast = n
    while True:
        slow = next_num(slow)
        fast = next_num(next_num(fast))
        if fast == 1: return True
        if slow == fast: return False

def mySqrt(x):
    if x < 2: return x
    lo, hi = 1, x // 2
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid == x: return mid
        elif mid * mid < x: lo = mid + 1
        else: hi = mid - 1
    return hi  # floor of sqrt`,
            cpp: `int mySqrt(int x){
    if(x<2) return x;
    long lo=1,hi=x/2;
    while(lo<=hi){long mid=lo+(hi-lo)/2;
        if(mid*mid==x) return mid;
        else if(mid*mid<x) lo=mid+1;
        else hi=mid-1;}
    return hi;
}`,
            java: `public int mySqrt(int x){
    if(x<2) return x;
    long lo=1,hi=x/2;
    while(lo<=hi){long mid=lo+(hi-lo)/2;
        if(mid*mid==x) return (int)mid;
        else if(mid*mid<x) lo=mid+1;
        else hi=mid-1;}
    return (int)hi;
}`
          }
        },
        keyInsight: "Happy Number cycle detection using Floyd's fast-slow pointer. The 'graph' of next_num() always cycles — use the same pointer technique as linked list cycle.",
        template: {
          python: `# Happy number with Floyd's:
slow=fast=n
while True:
    slow=next_num(slow)
    fast=next_num(next_num(fast))
    if fast==1: return True
    if slow==fast: return False

# Integer sqrt (binary search):
lo,hi=1,x//2
while lo<=hi:
    mid=(lo+hi)//2
    if mid*mid==x: return mid
    elif mid*mid<x: lo=mid+1
    else: hi=mid-1
return hi`,
          cpp: `// sqrt: binary search, use long for mid*mid overflow
// happy: Floyd's on digit-square-sum function`,
          java: `// sqrt: long mid to avoid int overflow
// happy: same Floyd's pattern`
        }
      },
      {
        day: "Sat — Revision",
        where: "Review all bit manipulation, number theory, and math patterns from week 18.",
        when: "Samsung OA frequently tests bit manipulation. Bit tricks = O(1) space magic that impresses interviewers.",
        what: "8 patterns: power of 2 (n&(n-1)), popcount (clear bits loop), XOR pairs cancel, single number, fast pow, sieve, Floyd's for happy, sqrt binary search.",
        example: {
          title: "Week 18 Pattern Summary",
          explanation: "Bit patterns: n&(n-1) clears lowest bit. XOR: pairs cancel. Number theory: GCD=Euclidean, primes=sieve, power=binary exponentiation. Math: Floyd's for cycles, binary search for sqrt.",
          code: {
            python: `# n>0 and n&(n-1)==0 → power of 2
# while n: n&=n-1; count++ → popcount
# XOR all → single number (pairs cancel)
# xor&(-xor) → isolate rightmost set bit
# fast_pow: square+halve O(log n)
# sieve: start from i*i not 2*i
# Happy: Floyd's fast-slow on next_num
# Sqrt: binary search, return hi (floor)`,
            cpp: `// n&(n-1)==0: power of 2
// __builtin_popcount(n): count set bits
// fast_pow: base*=base; exp>>=1; if odd: res*=base`,
            java: `// Integer.bitCount(n): count set bits
// n>0&&(n&(n-1))==0: power of 2`
          }
        },
        keyInsight: "Bit tricks appear simple but need practice to recall instantly. Run through all 8 patterns until they're reflexive — Samsung OA is timed.",
        template: {
          python: `# Quick reference card:
# n & (n-1)        → clear lowest bit
# n & (-n)         → isolate lowest bit
# n ^ n = 0        → XOR self cancels
# n ^ 0 = n        → XOR zero identity
# a*b = (a^b) + 2*(a&b) → add via bits
# fast_pow: while exp: if odd: res*=base; base*=base; exp//=2`,
          cpp: `// Same 6 operations memorized`,
          java: `// Same: practice until instant recall`
        }
      },
      {
        day: "Sun — Mock + Assessment",
        where: "Apply bit manipulation and math patterns under timed conditions. Samsung/Google test these.",
        when: "Bit manipulation problems: draw binary representations. Show the bit operation visually, then code it.",
        what: "For XOR problems: write out a small example in binary. Show that pairs cancel. For sieve: mention it's O(n log log n) — this specific complexity impresses interviewers.",
        example: {
          title: "Interview Strategy for Bit + Math",
          explanation: "For Single Number: say 'I'll use XOR. Any number XOR itself = 0, any number XOR 0 = itself. So XOR-ing all elements leaves only the unpaired one.' Show in binary for 3-4 elements.",
          code: {
            python: `# Interview script for XOR single number:
# "2 ^ 2 = 0, 3 ^ 3 = 0, 1 ^ 0 = 1
#  So XOR of [1,2,2,3,3] = 1^(2^2)^(3^3) = 1"
# Write this out explicitly in interview!

# For fast power:
# "I'll use binary exponentiation: O(log n)
#  Square base, halve exponent each iteration.
#  If exponent is odd, multiply result by base."`,
            cpp: `// Show binary representation when explaining XOR
// Mention O(log n) for fast power proactively`,
            java: `// Draw XOR table in interview
// State complexity before coding`
          }
        },
        keyInsight: "Writing out binary representations during the interview shows you actually understand bit operations — not just memorized the pattern.",
        template: {
          python: `# Assessment checklist week 18:
# ✓ Power of 2: n>0 and n&(n-1)==0
# ✓ Popcount: clear lowest bit loop
# ✓ Single Number: XOR all
# ✓ Two singles: xor&(-xor) split
# ✓ Add without +: XOR+carry loop
# ✓ Fast power: O(log n) binary exp
# ✓ Sieve: O(n log log n)
# ✓ Happy number: Floyd's cycle detection`,
          cpp: `// All 8 patterns from memory`,
          java: `// Especially: Integer.bitCount, isPowerOfTwo`
        }
      }
    ]
  },

  19: {
    title: "Weak Topic Revision + System Design Basics",
    tagline: "Identify your gaps, fix them fast. Then learn the 5 system design patterns every MNC asks.",
    days: [
      {
        day: "Mon — Weak Topic Sprint 1",
        where: "Revisit the patterns you struggled with most in weeks 6–12: linked lists, trees, graphs, backtracking.",
        when: "One week before interviews — time to fix weak spots, not learn new things. Be honest about what you got wrong in mocks.",
        what: "Sprint method: pick 3 weak patterns. For each: re-read the concept, solve 2 easy + 1 medium WITHOUT looking at solution. If you fail → note the exact step where you got stuck.",
        example: {
          title: "How to Sprint a Weak Topic",
          explanation: "Example: weak on LCA. Step 1: write the template from memory. Step 2: trace through an example. Step 3: solve LC#236 without hints. Step 4: compare with template. Repeat for 2 more problems.",
          code: {
            python: `# Weak topic sprint template:
# 1. Write the core template from memory:
def lca(root, p, q):
    if not root or root in (p,q): return root
    l = lca(root.left, p, q)
    r = lca(root.right, p, q)
    return root if (l and r) else (l or r)

# 2. Trace on example — write node values step by step
# 3. Solve a problem cold (no hints)
# 4. Check: where exactly did you fail?
# 5. Fix THAT specific gap, not the whole topic`,
            cpp: `// Sprint checklist:
// □ Write template from memory (no lookup)
// □ Trace on 4-5 node example manually
// □ Solve 1 easy + 1 medium cold
// □ Note exact failure point
// □ Fix only that failure point`,
            java: `// Common weak spots from weeks 6-12:
// - LCA (both-non-null logic)
// - Union-Find (path compression)
// - Backtracking (when to undo)
// - Monotonic stack (amortized O(n))
// - Fast-slow pointer (cycle start)`
          }
        },
        keyInsight: "Don't re-study entire topics. Find the EXACT step where you fail and fix only that. Targeted sprints beat broad review every time.",
        template: {
          python: `# Templates to re-verify from memory today:
# Tree LCA:
def lca(r,p,q): return r if(not r or r in(p,q)) else (lca(r.left,p,q) or lca(r.right,p,q)) if not(lca(r.left,p,q) and lca(r.right,p,q)) else r

# DSU:
def find(x): p[x]=find(p[x]) if p[x]!=x else x; return p[x]
def union(x,y): p[find(x)]=find(y)

# Backtracking:
def bt(state):
    if done: record(); return
    for choice in choices:
        make(choice); bt(state); undo(choice)`,
          cpp: `// Verify these cold — no looking:
// Monotonic stack for next greater
// Fast-slow pointer for cycle
// DSU with path compression`,
          java: `// Same 5 templates — write from memory`
        }
      },
      {
        day: "Tue — Sorting + Searching Review",
        where: "Merge sort, quick sort, counting sort, binary search variants — all the foundational algorithms.",
        when: "Sorting fundamentals appear in interviews as 'how would you sort X efficiently?' Know time/space for all major sorts.",
        what: "Merge sort: O(n log n) stable, O(n) space. Quick sort: O(n log n) average, O(n²) worst, O(log n) space. Counting/Radix: O(n+k), used when range is bounded.",
        example: {
          title: "Merge Sort + Quick Select",
          explanation: "Merge sort: divide in half, sort each half, merge. Quick select (Kth largest): partition like quicksort — only recurse into the side containing Kth element. O(n) average.",
          code: {
            python: `def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr)//2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(l, r):
    res = []; i = j = 0
    while i<len(l) and j<len(r):
        if l[i] <= r[j]: res.append(l[i]); i+=1
        else: res.append(r[j]); j+=1
    return res + l[i:] + r[j:]

# Quick Select — O(n) average for Kth largest
def findKthLargest(nums, k):
    def partition(lo, hi):
        pivot = nums[hi]; p = lo
        for i in range(lo, hi):
            if nums[i] >= pivot:
                nums[i],nums[p]=nums[p],nums[i]; p+=1
        nums[p],nums[hi]=nums[hi],nums[p]; return p
    lo,hi=0,len(nums)-1; target=k-1
    while lo<=hi:
        p=partition(lo,hi)
        if p==target: return nums[p]
        elif p<target: lo=p+1
        else: hi=p-1`,
            cpp: `void mergeSort(vector<int>& arr, int l, int r){
    if(l>=r) return;
    int mid=(l+r)/2;
    mergeSort(arr,l,mid); mergeSort(arr,mid+1,r);
    // merge arr[l..mid] and arr[mid+1..r]
    vector<int> tmp;
    int i=l,j=mid+1;
    while(i<=mid&&j<=r) arr[i]<=arr[j]?tmp.push_back(arr[i++]):tmp.push_back(arr[j++]);
    while(i<=mid) tmp.push_back(arr[i++]);
    while(j<=r) tmp.push_back(arr[j++]);
    for(int k=l;k<=r;k++) arr[k]=tmp[k-l];
}`,
            java: `// Sorting complexity reference:
// Merge sort: O(n log n), O(n) space, STABLE
// Quick sort: O(n log n) avg, O(n²) worst, O(log n) space
// Heap sort: O(n log n), O(1) space, NOT stable
// Counting: O(n+k), O(k) space, k=range
// Java Arrays.sort: Tim sort (merge+insertion)`
          }
        },
        keyInsight: "Quick Select is O(n) average for Kth element — faster than O(n log n) sorting. Partition selects the pivot position; only recurse into the relevant half.",
        template: {
          python: `# Sorting complexity cheatsheet:
# Merge: O(n logn), O(n), stable
# Quick: O(n logn) avg, O(n²) worst, in-place
# Heap:  O(n logn), O(1), not stable
# Count: O(n+k), bounded range only
# Tim:   O(n logn), used in Python/Java sort

# Quick Select for Kth:
# Partition → if pivot==k-1 → done
#            → if pivot<k-1 → go right
#            → if pivot>k-1 → go left`,
          cpp: `// std::sort: O(n logn) introsort
// std::stable_sort: O(n logn) merge-based
// nth_element: O(n) quick select built-in`,
          java: `// Arrays.sort (primitives): dual-pivot quicksort
// Arrays.sort (objects): TimSort (stable)
// Collections.sort: TimSort`
        }
      },
      {
        day: "Wed — System Design Basics",
        where: "High-level system design for SDE-1/SDE-2 interviews: URL shortener, rate limiter, cache design.",
        when: "MNC interviews (Google, Microsoft, Amazon) include 1 system design round even for SDE-1. Know the 5 core concepts cold.",
        what: "5 must-know concepts: 1) Horizontal scaling (add servers), 2) Load balancing (distribute requests), 3) Caching (Redis, LRU), 4) Database sharding (split by key), 5) Message queues (async processing).",
        example: {
          title: "Design a URL Shortener — Interview Walkthrough",
          explanation: "Requirements: shorten URL, redirect, handle 100M URLs. Components: API server → ID generator (base62 encode) → DB (short→long mapping) → Cache (Redis for hot URLs). Scale: CDN for static, read replicas for DB.",
          code: {
            python: `# URL Shortener core logic:
import string, random

BASE62 = string.ascii_letters + string.digits  # 62 chars

def encode(num):
    chars = []
    while num:
        chars.append(BASE62[num % 62])
        num //= 62
    return ''.join(reversed(chars)) or BASE62[0]

def decode(s):
    num = 0
    for c in s:
        num = num*62 + BASE62.index(c)
    return num

# Key decisions to discuss in interview:
# 1. ID generation: auto-increment vs UUID vs hash
# 2. Storage: SQL (consistent) vs NoSQL (scalable)
# 3. Cache: LRU cache for hot URLs (80/20 rule)
# 4. Scale: read >> write → use read replicas`,
            cpp: `// System Design Interview Framework:
// 1. Clarify requirements (5 min)
//    - Scale? (users, requests/sec, storage)
//    - Features? (core vs nice-to-have)
// 2. High-level design (10 min)
//    - Draw: Client → LB → Servers → DB/Cache
// 3. Deep dive (15 min)
//    - Data model, API design, bottlenecks
// 4. Scale discussion (10 min)
//    - Sharding, replication, caching strategy`,
            java: `// 5 Core System Design Patterns:
// 1. Cache-aside (load on demand, LRU eviction)
// 2. Write-through (write cache + DB together)
// 3. Event-driven (Kafka for async processing)
// 4. CQRS (separate read/write models)
// 5. Circuit breaker (fail fast, recover gracefully)`
          }
        },
        keyInsight: "For SDE-1 system design: always start with requirements, estimate scale, draw the simple architecture first. Don't over-engineer — explain trade-offs.",
        template: {
          python: `# System design answer template:
# 1. Functional requirements: "Users can X, Y, Z"
# 2. Non-functional: "100M users, 1000 req/sec, 99.9% uptime"
# 3. Estimates: "1000 req/sec → 86B req/day → 1TB/day storage"
# 4. Architecture: client → LB → app → cache → DB
# 5. Deep dive: DB schema, API endpoints, cache strategy
# 6. Bottlenecks + how to fix: "DB is bottleneck → sharding"`,
          cpp: `// Key numbers to remember:
// 1M requests/day = ~12 req/sec
// 1B requests/day = ~12K req/sec
// SSD: 100MB/s read; HDD: 100MB/s seq
// RAM: 100GB/s; Network: 1Gbps = 125MB/s`,
          java: `// Common SDE-1 system design topics:
// URL shortener, Rate limiter, LRU Cache
// News feed, Notification system, Pastebin`
        }
      },
      {
        day: "Thu — Weak Topic Sprint 2",
        where: "Revisit weak spots from weeks 13–18: DP transitions, Dijkstra, Trie, bit tricks.",
        when: "Second sprint — DP is usually the hardest weak area. Focus on writing the dp[i][j] definition before any code.",
        what: "DP sprint: for each DP problem type (1D, 2D, knapsack), write the dp definition + recurrence from memory. The definition IS the solution. If you can't write it → you don't understand it.",
        example: {
          title: "DP Weak Topic Sprint",
          explanation: "For each DP pattern: write dp[i] definition → recurrence → base cases → code. If stuck at definition: draw a small example table and work backwards from the answer.",
          code: {
            python: `# Verify these DP definitions from memory:

# House Robber: dp[i] = max money robbing first i houses
# Recurrence: dp[i] = max(dp[i-1], dp[i-2]+nums[i])

# Coin Change: dp[i] = min coins to make amount i
# Recurrence: dp[i] = min(dp[i], dp[i-c]+1) for c in coins

# LCS: dp[i][j] = LCS length of s1[:i] and s2[:j]
# Recurrence: dp[i-1][j-1]+1 if match, max(up,left) if not

# Edit Distance: dp[i][j] = min ops to convert s1[:i] to s2[:j]
# Recurrence: dp[i-1][j-1] if match, 1+min(3 directions)

# 0/1 Knapsack: dp[j] = max value with capacity j
# Recurrence (reverse): dp[j] = max(dp[j], dp[j-w]+v)`,
            cpp: `// Dijkstra sprint — write from memory:
// heap=[(0,src)]; dist[src]=0
// while heap: pop (d,u); if d>dist[u]: skip
// for (v,w) in adj[u]: relax dist[v]

// DSU sprint — write from memory:
// find(x): return x if root else path-compress to find(p[x])
// union(x,y): attach smaller rank to larger`,
            java: `// Trie sprint — write from memory:
// TrieNode: children[26], isEnd
// insert: walk, create if null, set isEnd
// search: walk, check isEnd at last node`
          }
        },
        keyInsight: "If you can write dp[i][j] meaning in one sentence AND the recurrence without looking → you'll solve the problem. That's the entire test.",
        template: {
          python: `# Sprint verification list for DP:
# □ Can write dp definition without looking?
# □ Can write recurrence without looking?
# □ Know base cases?
# □ Know loop direction (for 0/1 KS: reverse)?
# □ Can space-optimize (rolling array)?
# If NO to any → that's your gap to fix today`,
          cpp: `// Same checklist for graph algorithms:
// □ Dijkstra: stale check + heap order
// □ DSU: path compression one-liner
// □ Topo sort: in-degree array + BFS`,
          java: `// Write each template 3x from memory
// Speed matters in actual interviews`
        }
      },
      {
        day: "Fri — Pattern Review Marathon",
        where: "Speed run through ALL patterns from weeks 1–18. One problem per pattern, timed.",
        when: "7 days to interview — you should recognize patterns in under 30 seconds. This marathon tests that speed.",
        what: "Format: pick one random problem per week's topic. Set 20-minute timer. Solve or admit defeat. Track: which patterns are still slow? Those are tomorrow's focus.",
        example: {
          title: "Pattern Recognition Speed Drill",
          explanation: "For each problem, give yourself 30 seconds to identify: 1) which pattern, 2) time complexity, 3) key data structure. If you can't in 30s → flag it. Solve flagged problems after the marathon.",
          code: {
            python: `# Pattern recognition triggers — know these cold:
# "sorted array + pair sum" → Two Pointers
# "subarray sum = k" → Prefix Sum + HashMap
# "find in sorted" → Binary Search
# "group/count elements" → HashMap/Counter
# "longest/shortest subarray" → Sliding Window
# "2D grid connected" → DFS/BFS
# "reverse/middle of list" → Fast-Slow Pointer
# "next greater element" → Monotonic Stack
# "find all combinations" → Backtracking
# "bottom-up tree computation" → Postorder DFS
# "K largest/smallest" → Heap
# "minimum path weighted" → Dijkstra
# "max profit choices" → DP
# "prefix string match" → Trie
# "XOR pairs" → Bit Manipulation`,
            cpp: `// Time complexity should be automatic:
// Two Pointers → O(n)
// Binary Search → O(log n)
// Sliding Window → O(n)
// DFS/BFS → O(V+E)
// Dijkstra → O((V+E)logV)
// DP 1D → O(n) or O(n²)
// DP 2D → O(m*n)`,
            java: `// Data structure choice:
// Ordered iteration → TreeMap/TreeSet
// O(1) lookup → HashMap/HashSet
// Min/max efficiently → PriorityQueue
// LIFO → Stack/Deque
// FIFO → Queue/LinkedList`
          }
        },
        keyInsight: "Pattern recognition under 30 seconds is a skill built by volume. If you've solved 300+ problems, it should be reflexive by now.",
        template: {
          python: `# Marathon schedule (18 patterns × 20 min = 6 hours):
# 1. Two Pointers  2. Prefix Sum   3. Binary Search
# 4. Hashing       5. Sliding Win  6. Matrix
# 7. Linked List   8. Stack/Queue  9. Backtracking
# 10. Trees        11. BST/Heap   12. Graph BFS/DFS
# 13. Dijkstra/DSU 14. 1D DP      15. 2D DP
# 16. Adv DP      17. Greedy/Trie 18. Bits/Math`,
          cpp: `// Do 1 problem each, timed at 20 min
// Flag any that took >20 min or failed
// Fix flagged ones in second pass`,
          java: `// Same: 1 per pattern, timed
// Focus quality over quantity here`
        }
      },
      {
        day: "Sat — Full OA Simulation",
        where: "Simulate a real Online Assessment: 3 problems, 90 minutes, no hints, competitive platform.",
        when: "6 days before interview — this is your rehearsal. Same conditions as real OA: time pressure, no help, submit and see result.",
        what: "OA simulation rules: 3 problems (easy+medium+hard), 90-minute timer, no IDE autocomplete, write test cases manually. After: analyze every mistake without self-judgment.",
        example: {
          title: "OA Simulation Problem Set",
          explanation: "Problem set format: Problem 1 (25 min, easy), Problem 2 (35 min, medium), Problem 3 (30 min, hard). Prioritize: solve easy first completely, attempt medium, partial credit on hard.",
          code: {
            python: `# OA Strategy:
# First 5 min: READ ALL 3 problems
# - Identify difficulty of each
# - Plan time allocation

# Easy problem (25 min):
# - Solve completely, all edge cases
# - Test with provided examples
# - Add your own edge cases (empty, single, negative)

# Medium problem (35 min):
# - Brute force first if needed
# - Optimize if time allows
# - Must pass at least 60% test cases

# Hard problem (30 min):
# - Read carefully, identify pattern
# - Partial solution = partial marks
# - Write pseudocode first, code second`,
            cpp: `// Common OA edge cases to always test:
// - Empty array/string
// - Single element
// - All same elements
// - Negative numbers
// - Integer overflow (use long long)
// - n=1, n=2 for DP base cases`,
            java: `// OA platform tips:
// - Always test with given examples first
// - Don't submit without passing examples
// - Read constraints carefully (n up to 10^5?)
// - Handle edge cases before submitting`
          }
        },
        keyInsight: "In real OA: easy problems carry guaranteed marks. Never leave an easy problem unsolved chasing a hard one. Secure points first.",
        template: {
          python: `# Post-OA analysis template:
# Problem 1: What was the pattern? How fast did you identify it?
# Problem 2: Where did you get stuck? What would fix it?
# Problem 3: Did you attempt? What pattern was it?
# Overall: time management ok? Edge cases missed?
# Action: solve each problem you failed, fully, tomorrow`,
          cpp: `// Analyze mistakes — don't skip this
// Most improvement comes from error analysis`,
          java: `// Same: post-OA analysis is crucial`
        }
      },
      {
        day: "Sun — Mock + Assessment",
        where: "Full interview simulation with peer or platform. Replicate real conditions exactly.",
        when: "5 days before interview — final dress rehearsal. Solve 2 problems on video call, explain your thinking out loud.",
        what: "Mock interview format: 45 minutes, 2 problems, explain every step out loud. Interviewer scores: correctness, communication, time complexity analysis, code quality.",
        example: {
          title: "Week 19 Final Mock",
          explanation: "Rate yourself on 4 dimensions after mock: 1) Did you identify pattern correctly? 2) Did you communicate while coding? 3) Did you state complexity? 4) Did you test your code?",
          code: {
            python: `# Mock interview self-scoring rubric:
# Pattern identification: ___/10
# Communication while coding: ___/10
# Time/space complexity stated: ___/10
# Edge cases handled: ___/10
# Code quality (clean, named vars): ___/10
# TOTAL: ___/50

# Score < 35: more practice needed
# Score 35-45: good, polish weak areas
# Score > 45: confident, maintain this`,
            cpp: `// Mock interview checklist:
// □ Said problem understanding out loud?
// □ Drew example before coding?
// □ Stated approach before coding?
// □ Mentioned time/space complexity?
// □ Tested with examples after coding?
// □ Handled edge cases?`,
            java: `// Use Pramp, Interviewing.io, or a peer
// Real-time feedback is irreplaceable`
          }
        },
        keyInsight: "The mock interview IS the practice. Solving problems alone doesn't prepare you for verbalizing your thinking. Do at least 3 mocks before real interviews.",
        template: {
          python: `# Week 19 completion checklist:
# ✓ Identified top 3 weak patterns
# ✓ Sprinted each weak pattern twice
# ✓ Sorting algorithms reviewed
# ✓ System design basics learned
# ✓ Full OA simulation done
# ✓ Mock interview completed + scored`,
          cpp: `// If any item unchecked → do it now
// Week 20 assumes these are solid`,
          java: `// Last chance to fix gaps systematically`
        }
      }
    ]
  },

  20: {
    title: "Full Mock Interview Week",
    tagline: "This week IS the interview. Every day is a simulation. Treat each session like it's real.",
    days: [
      {
        day: "Mon — Amazon OA Simulation",
        where: "Amazon-specific OA patterns: leadership principles, OA problem types, time pressure.",
        when: "Amazon OA is 2 problems in 90 minutes + work simulation. Problem types: arrays, strings, graphs, DP. Heavy on sorting and greedy.",
        what: "Amazon OA patterns: 1) Sliding window on strings, 2) Matrix problems, 3) Graphs (BFS/DFS), 4) 1D DP. Leadership principles appear in behavioral section — prepare STAR stories.",
        example: {
          title: "Amazon OA Problem Types + Strategy",
          explanation: "Common Amazon OA: minimum window substring, rotate matrix, number of islands, coin change, trapping rain water. Know these cold. For behavioral: Customer Obsession, Ownership, Deliver Results stories ready.",
          code: {
            python: `# Amazon OA pattern frequency:
# 1. Sliding window (min window, anagrams) - VERY HIGH
# 2. Matrix traversal (rotate, spiral, islands) - HIGH  
# 3. Graph BFS/DFS (islands, course schedule) - HIGH
# 4. 1D DP (coin change, house robber) - MEDIUM
# 5. Two pointers (trapping rain water) - MEDIUM

# Amazon-specific OA tricks:
# - Always check n≤10^5 → O(n log n) acceptable
# - n≤10^3 → O(n²) acceptable
# - n≤20 → O(2^n) or bitmask acceptable

# STAR story template:
# Situation: "At my previous project..."
# Task: "I needed to..."
# Action: "I specifically did X, Y, Z..."
# Result: "This led to a measurable outcome..."`,
            cpp: `// Amazon OA technical checklist:
// □ Sliding window template memorized
// □ Matrix rotate (transpose+reverse)
// □ BFS template with visited set
// □ Coin change (dp[i-c]+1 recurrence)
// □ Two pointer for rain water`,
            java: `// Amazon OA behavioral checklist:
// □ Customer Obsession story ready
// □ Ownership story ready (took initiative)
// □ Deliver Results story ready
// □ Learn and Be Curious story ready
// □ Disagree and Commit story ready`
          }
        },
        keyInsight: "Amazon OA has standard patterns — they repeat across years. Practice these 5 specific types until automatic. Behavioral is 40% of interview — don't ignore it.",
        template: {
          python: `# Simulate exact Amazon OA:
# Problem 1 (45 min): pick one from
# - Minimum Window Substring
# - Trapping Rain Water
# - Rotate Image
# Problem 2 (45 min): pick one from
# - Number of Islands
# - Coin Change
# - Word Break
# Time yourself strictly. No hints. Submit.`,
          cpp: `// After OA: analyze each mistake
// Fix pattern gaps same day`,
          java: `// Do behavioral prep for 30 min after technical`
        }
      },
      {
        day: "Tue — Google/Microsoft Simulation",
        where: "Google/Microsoft interview patterns: harder algorithm problems, system design lite, focus on clarity.",
        when: "Google asks harder problems (medium-hard) but values communication and problem-solving process. Microsoft values clean code and working solution over optimization.",
        what: "Google patterns: BFS/DFS variants, DP (2D, interval), graphs (Dijkstra, topo sort). Microsoft patterns: Trees (LCA, diameter), strings, linked lists. Both test Big-O analysis.",
        example: {
          title: "Google/Microsoft Technical Patterns",
          explanation: "Google interview flow: understand → brute force → optimize → code → test. Microsoft: understand → clean implementation → test edge cases. Both: state complexity before coding.",
          code: {
            python: `# Google-style problem flow:
# 1. Repeat the problem (show understanding)
# 2. Brute force: "I can solve this in O(n²) by..."
# 3. Optimize: "I notice that... which lets me use..."
# 4. Code: clean, named variables, no magic numbers
# 5. Test: "Let me trace through example 1..."
# 6. Edge cases: "Empty input? Single element? Overflow?"

# Microsoft-style additions:
# - Write helper functions (show code organization)
# - Mention alternative approaches even if not coding them
# - Discuss what you'd improve with more time

# Common Google patterns (practice these):
# - BFS shortest path with states
# - Interval DP (burst balloons type)
# - Topological sort (dependency ordering)
# - Modified Dijkstra (minimax paths)`,
            cpp: `// Google green flags in interview:
// "I notice this is O(n²), can I do better?"
// "The key insight here is..."
// "This is essentially [known pattern]"
// "Let me verify: time O(n log n), space O(n)"

// Microsoft green flags:
// "I'll structure this with a helper function"
// "Here's how I'd test this: ..."
// "Edge case: what if input is empty?"`,
            java: `// Both companies: complexity analysis is mandatory
// Say it before coding, not after
// "This will be O(n log n) time, O(n) space"`
          }
        },
        keyInsight: "Google values the journey (how you think). Microsoft values the destination (working, clean code). Adjust your communication style per company.",
        template: {
          python: `# Simulate Google/Microsoft interview:
# 45 min, 1 hard problem (or 2 medium)
# Problems to use:
# - Swim in Rising Water (Google style)
# - Burst Balloons (Google style)
# - Word Search II (Microsoft style)
# - Serialize/Deserialize Binary Tree (Microsoft)
# Record yourself and watch back — painful but necessary`,
          cpp: `// Rate yourself: communication 1-10
// Did you explain your approach before coding?
// Did you mention complexity unprompted?`,
          java: `// Watch recording: are you silent while coding?
// Silence = bad in Google/MS interviews`
        }
      },
      {
        day: "Wed — Mixed Revision Sprint",
        where: "Target the problems you failed in Mon/Tue simulations. Focused error correction.",
        when: "Midweek revision — after 2 days of mocks you now know exactly what's weak. Fix those specific problems today.",
        what: "For each problem you failed in Mon/Tue: 1) Read editorial/solution. 2) Understand the KEY insight you missed. 3) Re-solve from scratch WITHOUT looking. 4) Solve a similar problem to cement.",
        example: {
          title: "Error Correction Protocol",
          explanation: "Don't just read solutions — re-derive them. Ask 'what was the one insight I needed?' For DP: was it the dp definition? For graphs: was it the traversal order? Pin down the EXACT gap.",
          code: {
            python: `# Error correction for each failed problem:

# Step 1: What was the pattern? (should know in <5 sec)
# Step 2: What was the KEY insight I missed?
# Examples of common missed insights:
# - "Oh, I should have sorted by END not START"
# - "I needed the PREVIOUS operator, not current"
# - "The cycle detection needs 3 states not 2"
# - "I need to COPY dist[] before Bellman-Ford round"

# Step 3: Write only the key insight (1-2 lines)
# Step 4: Re-solve from memory
# Step 5: Solve 1 similar problem (different input, same pattern)`,
            cpp: `// Common "aha moments" to internalize:
// Interval scheduling: sort by END (not start)
// Min window: have==len(need) not have==len(t)
// 0/1 knapsack: reverse inner loop
// Cycle detection: 3 states (0/1/2) not 2
// Dijkstra: skip stale (if d>dist[u]: continue)`,
            java: `// Error analysis beats more problem solving
// 1 hour of error analysis = 3 hours of new problems`
          }
        },
        keyInsight: "Error analysis is the highest-ROI activity in interview prep. Understanding WHY you failed is more valuable than solving 10 new problems.",
        template: {
          python: `# Mid-week revision checklist:
# □ List all problems failed Mon+Tue
# □ For each: identified the KEY insight missed
# □ Re-solved each from scratch
# □ Solved 1 similar problem for each
# □ Added insight to personal notes
# □ Will review these insights again Fri`,
          cpp: `// Personal insight notes format:
// Problem: X
// Pattern: Y
// Key insight I missed: Z
// Never forget: [one sentence]`,
          java: `// Build your personal cheat sheet
// 10 key insights = 10 problems auto-solved`
        }
      },
      {
        day: "Thu — Peer Mock / Pramp",
        where: "Real-time mock with another person — replicate interview conditions exactly.",
        when: "3 days before interview — live mock is essential. Being watched changes how you think and code. Practice this discomfort.",
        what: "Use Pramp, Interviewing.io, or a peer. 45 minutes, video on, no notes. You be the interviewee first, then switch. Give and receive honest feedback.",
        example: {
          title: "How to Run a Peer Mock",
          explanation: "Interviewee: think out loud, draw examples, state complexity. Interviewer: don't give hints, rate on rubric, note specific moments where candidate struggled. Debrief for 15 minutes after.",
          code: {
            python: `# Peer mock scoring rubric (interviewee):
# Communication (1-5):
#   5: Always thinking out loud, natural
#   3: Some silence, prompted to explain
#   1: Silent for >2 min while coding

# Problem solving (1-5):
#   5: Identified pattern fast, optimal solution
#   3: Correct solution, not optimal
#   1: Could not solve

# Code quality (1-5):
#   5: Clean, named, no bugs
#   3: Working but messy
#   1: Bugs, unclear variable names

# Edge cases (1-5):
#   5: Proactively handles all edge cases
#   3: Handles when reminded
#   1: Misses obvious edge cases`,
            cpp: `// Peer mock problem selection:
// Difficulty: 1 medium + 1 medium-hard
// Topics: mix (one algo + one data structure design)
// Good pairs:
// - Sliding window + LRU cache
// - BFS + Topo sort
// - DP + Trie`,
            java: `// After mock: ask interviewee
// "What would you do differently?"
// "When were you most stuck?"
// "Did you know the pattern going in?"`
          }
        },
        keyInsight: "Being watched causes stress that changes your performance. The only way to practice performing under stress is to practice being watched. One peer mock > ten solo practice sessions.",
        template: {
          python: `# Peer mock logistics:
# Duration: 45 min problem + 15 min debrief
# Platform: Google Meet + shared replit/coderpad
# Problem: interviewer picks from Leetcode
#          (medium-hard, not something interviewee has seen)
# Scoring: use rubric above, be honest
# Record: with permission, watch later`,
          cpp: `// Debrief questions:
// "What pattern did you see immediately?"
// "When did you realize your first approach was wrong?"
// "How would you improve your explanation?"`,
          java: `// Book 2 peer mocks this week minimum`
        }
      },
      {
        day: "Fri — Full Hard Mode OA",
        where: "Maximum difficulty OA simulation — harder than real OA to build confidence.",
        when: "2 days before interview — if you can solve hard problems under time pressure, real OA feels easy.",
        what: "Hard mode rules: 3 problems, 75 minutes (stricter than real OA), no IDE, pen and paper trace required before coding, must state complexity for every solution.",
        example: {
          title: "Hard Mode OA Problem Set",
          explanation: "Pick one hard problem each from: Graph (Dijkstra variant), DP (2D or bitmask), and String (hard sliding window or Trie). 25 minutes each. If you fail one → that pattern is your weak spot.",
          code: {
            python: `# Hard Mode Problem Set Options:

# Graph hard (choose one):
# - Swim in Rising Water (LC 778)
# - Word Ladder II (LC 126)
# - Shortest Path Visiting All Nodes (LC 847)

# DP hard (choose one):
# - Burst Balloons (LC 312)
# - Palindrome Partitioning II (LC 132)
# - Regular Expression Matching (LC 10)

# String hard (choose one):
# - Minimum Window Substring (LC 76) — must be clean
# - Word Search II (LC 212) — Trie + DFS
# - Wildcard Matching (LC 44)

# Hard mode rules:
# - 25 min per problem (strict)
# - Write time/space BEFORE coding
# - Draw example trace before code
# - No looking up anything`,
            cpp: `// Hard mode success = interview confidence
// If you solve 2/3 → you're ready
// If you solve 3/3 → you're very ready
// If you solve 1/3 → identify the weak pattern, sprint today`,
            java: `// Analysis after hard mode:
// Which problem was hardest? Why?
// What slowed you down?
// Which pattern was least practiced?`
          }
        },
        keyInsight: "Hard mode OA is intentionally harder than real interviews. If you can operate at this level, real interviews feel like medium difficulty. Calibrate up.",
        template: {
          python: `# Hard mode evaluation:
# 3/3 solved in time → Excellent, you're ready
# 2/3 solved in time → Good, review the 1 failed pattern
# 1/3 solved in time → Focus tomorrow on gaps
# 0/3 solved → Extend revision, practice 2 more days

# For each failed problem:
# Was it pattern recognition? (didn't know which pattern)
# Was it implementation? (knew pattern but couldn't code)
# Was it time? (knew what to do but ran out of time)`,
          cpp: `// Pattern recognition failure → more pattern drills
// Implementation failure → template practice
// Time failure → speed drills (solve easy/medium fast)`,
          java: `// Know your failure mode — it determines the fix`
        }
      },
      {
        day: "Sat — Speed + Polish",
        where: "Speed drills on known patterns. Write each template 3x from memory. Polish your communication.",
        when: "1 day before interview — DON'T learn new things today. Solidify what you know. Build confidence with known patterns.",
        what: "Speed drill: for each of 10 core templates, write from memory in under 3 minutes. Then review communication: record yourself explaining a problem for 5 minutes and watch it back.",
        example: {
          title: "Day-Before Interview Prep",
          explanation: "Write 10 templates from memory (no looking). Time each: target <3 min. Review your explanation for 1 problem on video. Sleep 8 hours. Tomorrow: you're ready.",
          code: {
            python: `# 10 templates to write from memory today:
# 1. Binary search (lo, hi, mid, lo=mid+1/hi=mid-1)
# 2. BFS (queue, visited, deque([start]))
# 3. DFS on graph (visited set, recurse neighbors)
# 4. Dijkstra (heap, dist[], stale check)
# 5. DSU (find with compression, union by rank)
# 6. Monotonic stack (while stack and condition: pop)
# 7. Sliding window (l=0, while shrink: l++, update best)
# 8. 1D DP (prev2, prev1, curr = recurrence)
# 9. LCS 2D DP (m+1 × n+1, match=diag+1, no=max)
# 10. Backtracking (path, choose, recurse, undo)`,
            cpp: `// Day before: NO new problems
// Only review + templates + communication
// Rest your brain for tomorrow`,
            java: `// Day before routine:
// Morning: 10 templates from memory
// Afternoon: 2 easy problems for confidence
// Evening: review your personal insight notes
// Night: sleep 8 hours minimum`
          }
        },
        keyInsight: "Day before interview: confidence building, not learning. Solve easy problems you know you can solve. Sleep is the most important preparation.",
        template: {
          python: `# Pre-interview confidence checklist:
# □ 10 templates written from memory
# □ Explained one solution out loud (recorded)
# □ Reviewed personal insight notes
# □ Know what time/where to log in tomorrow
# □ 8 hours sleep tonight`,
          cpp: `// Nothing new today — only known patterns
// Confidence comes from mastery, not cramming`,
          java: `// You've done the work. Trust the preparation.`
        }
      },
      {
        day: "Sun — Mega Final Mock",
        where: "Complete final simulation — closest to real interview conditions possible.",
        when: "1 day before interview — your last rehearsal. Make it count. Full conditions: timer, video on, code on shared screen.",
        what: "Mega mock: 2 problems, 80 minutes, peer as interviewer, full scoring rubric. Debrief for 30 minutes. Fix any final gaps. Rest tonight.",
        example: {
          title: "Mega Mock Format",
          explanation: "Problem 1 (35 min): medium problem, full explanation required. Problem 2 (35 min): medium-hard, optimize if time. 10 min buffer for edge cases and Q&A. Score on all 4 dimensions.",
          code: {
            python: `# Mega mock evaluation dimensions:
# 1. Problem identification (pattern recognition speed)
#    5: Under 30 seconds
#    3: Under 2 minutes
#    1: Over 5 minutes or wrong

# 2. Communication quality
#    5: Continuous narration, no prompting
#    3: Explains when asked
#    1: Silent for >2 min

# 3. Solution correctness
#    5: Optimal, all edge cases
#    3: Correct but non-optimal
#    1: Incorrect

# 4. Interview presence
#    5: Confident, composed, recovers from mistakes
#    3: Some nervousness but functional
#    1: Freezes or gives up

# Target: 16/20 minimum before real interview`,
            cpp: `// If score < 16/20:
// Identify lowest scoring dimension
// Do 30 min targeted practice on that dimension
// Then rest — no more coding tonight`,
            java: `// If score > 16/20:
// You're ready. Sleep. Trust your preparation.
// Tomorrow is just another mock — with higher stakes.`
          }
        },
        keyInsight: "A score of 16/20 on mock = you're ready. Don't aim for 20/20 — that's unrealistic and creates unnecessary stress. Good enough to pass IS good enough.",
        template: {
          python: `# Week 20 completion checklist:
# ✓ Amazon OA simulation done
# ✓ Google/Microsoft simulation done
# ✓ Error correction from mocks done
# ✓ Peer/Pramp mock completed
# ✓ Hard mode OA attempted
# ✓ Speed + polish day done
# ✓ Mega final mock scored 16/20+`,
          cpp: `// All 7 items checked? → You're ready.
// Interview tomorrow or soon → sleep well`,
          java: `// Trust the 20 weeks of preparation.`
        }
      }
    ]
  },

  21: {
    title: "Interview Week — Polish & Execute 🎯",
    tagline: "You've done the work. This week is about executing under pressure, not learning anything new.",
    days: [
      {
        day: "Mon — Favourite Problems Revisit",
        where: "Solve your top 10 favourite problems — the ones where you feel most confident and sharp.",
        when: "Start of interview week — warm up with known problems to build momentum and confidence. This is NOT revision — it's muscle memory activation.",
        what: "Pick 10 problems you've solved before and love. Solve them fast and clean. Goal: feel sharp, confident, in the zone. Avoid hard problems that might shake your confidence this week.",
        example: {
          title: "Warm-Up Problem Selection",
          explanation: "Choose problems across different patterns where you feel strongest. Solve each in under 15 minutes. Feel the fluency. This primes your brain for interview performance.",
          code: {
            python: `# Example favourite problem list:
# 1. Two Sum (HashMap - instant)
# 2. Longest Substring No Repeat (sliding window)
# 3. Valid Parentheses (stack)
# 4. Binary Search (classic - perfect execution)
# 5. Number of Islands (BFS/DFS - smooth)
# 6. House Robber (1D DP - clean)
# 7. Merge Two Sorted Lists (linked list - elegant)
# 8. Inorder Traversal (iterative - confident)
# 9. Course Schedule (topo sort - satisfying)
# 10. Group Anagrams (hashmap - fast)

# Goal: solve each in under 15 min, clean code
# Notice how good it feels — carry that into interviews`,
            cpp: `// Warm-up mindset:
// These aren't practice — they're confidence building
// Code clean. Name variables well. Test thoroughly.
// Feel the fluency you've built over 20 weeks.`,
            java: `// After warm-up:
// Review your personal insight notes one more time
// 10 insights that saved you the most
// Keep them in memory for this week`
          }
        },
        keyInsight: "Solving known problems FAST and CLEAN activates interview-mode thinking. It's like a athlete's warm-up — you don't try new moves, you practice the fundamentals perfectly.",
        template: {
          python: `# Monday schedule:
# Morning (2 hrs): 5 favourite problems, 15 min each
# Afternoon (2 hrs): 5 more, focus on clean code
# Evening (1 hr): review personal insight notes
# Night: light reading, no new problems

# Personal insight notes to review:
# - Pattern triggers (30 second recognition)
# - Key insights for each pattern (1-2 per pattern)
# - Edge cases that caught you before`,
          cpp: `// No new topics. No hard problems.
// Only known, loved problems today.`,
          java: `// Confidence > knowledge at this point
// You know enough. Execute what you know.`
        }
      },
      {
        day: "Tue — Light Mock + Review",
        where: "One light mock interview (45 min), then review communication and explanation quality.",
        when: "4 days before or during interview week — keep sharp but don't exhaust yourself. One mock is enough.",
        what: "Light mock: 1 medium problem, 30 minutes. Focus entirely on COMMUNICATION — narrate every thought. After: review on all 4 rubric dimensions. Fix only communication gaps, not algorithm gaps.",
        example: {
          title: "Communication-Focused Mock",
          explanation: "This mock is about HOW you say things, not WHAT you solve. Practice saying: 'I notice...', 'The key insight is...', 'Let me verify: time complexity...', 'Edge case: what if input is empty?'",
          code: {
            python: `# Communication phrases to practice using naturally:
# Before coding:
# "Let me restate the problem to confirm my understanding..."
# "I'll start with a brute force: O(n²) by..."
# "I notice that [observation] — this suggests [pattern]"
# "My approach: I'll use [data structure] because..."
# "Time: O(n log n), Space: O(n) — is that acceptable?"

# While coding:
# "I'm using a hashmap here for O(1) lookup..."
# "This variable tracks [purpose]..."
# "I'll handle the edge case here: if empty, return..."

# After coding:
# "Let me trace through example 1: ..."
# "Edge case: what if all elements are the same? ..."
# "I could optimize space by [rolling array]..."`,
            cpp: `// Common communication mistakes to fix:
// ✗ Coding silently for 3+ minutes
// ✗ Not explaining WHY you chose the approach
// ✗ Forgetting to state complexity
// ✗ Not testing with the given example
// ✗ Giving up and saying "I don't know"`,
            java: `// If you get stuck during interview:
// Say "Let me think out loud..."
// Explain what you DO know
// Ask "Can I have a small hint on direction?"
// Never go silent — partial credit for partial thinking`
          }
        },
        keyInsight: "Interviewers can't see inside your head. They score what they HEAR. Strong communication with a slightly suboptimal solution > optimal solution in silence.",
        template: {
          python: `# Light mock rubric focus: COMMUNICATION ONLY
# □ Said problem understanding out loud
# □ Stated approach BEFORE coding
# □ Explained choices while coding
# □ Stated time/space complexity
# □ Tested with example after coding
# □ Handled at least 1 edge case proactively`,
          cpp: `// If you score 5/6 on communication → ready
// If 3-4/6 → practice narrating while solving today`,
          java: `// Communication is coachable in one day
// Algorithm skills take weeks — they're already there`
        }
      },
      {
        day: "Wed — Mental Prep + Edge Cases",
        where: "Prepare mentally and review edge cases that have caught you before.",
        when: "2-3 days before key interview — mental preparation is as important as technical. Elite athletes visualize before competition.",
        what: "Visualize successful interview: you calmly read the problem, identify the pattern, explain your approach, code cleanly, test correctly. Your brain processes this as real experience.",
        example: {
          title: "Edge Case Master List + Mental Prep",
          explanation: "Review the 20 most common edge cases across all patterns. Then spend 15 minutes visualizing a successful interview run. Feel the confidence, not the anxiety.",
          code: {
            python: `# Universal edge cases checklist:
# Arrays:
# □ Empty array []
# □ Single element [x]
# □ All same elements [x,x,x]
# □ Already sorted / reverse sorted
# □ Integer overflow (use long/float where needed)
# □ Negative numbers

# Strings:
# □ Empty string ""
# □ Single character
# □ All same characters "aaaa"
# □ Case sensitivity (problem says lowercase?)

# Trees:
# □ null root
# □ Single node (no children)
# □ All left / all right (skewed tree)
# □ Even vs odd number of nodes

# Graphs:
# □ Disconnected graph (multiple components)
# □ Self-loop (u→u edge)
# □ Single node

# DP:
# □ n=0 or n=1 (base cases)
# □ target=0
# □ No valid answer exists`,
            cpp: `// Mental prep script (read aloud once):
// "I have prepared for 21 weeks.
//  I know the patterns.
//  I know how to communicate.
//  When I get stuck, I stay calm and think out loud.
//  I've solved harder problems than these.
//  I am ready."`,
            java: `// Anxiety management techniques:
// - Deep breaths before logging in (5 min)
// - Read ENTIRE problem before writing anything
// - If nervous: say "Let me think through this..."
//   (buys time and shows composure)`
          }
        },
        keyInsight: "Mental state determines 20-30% of interview performance. A confident, calm candidate with good communication often outscores a nervous expert who goes silent.",
        template: {
          python: `# Wednesday plan:
# Morning: review edge cases master list (1 hr)
# Afternoon: 2 easy problems for confidence (1 hr)
# Evening: mental prep visualization (15 min)
# Night: read something non-technical, sleep well

# Visualization script:
# Close eyes, imagine:
# - Calm login to interview platform
# - Reading problem clearly
# - Identifying pattern confidently
# - Explaining approach smoothly
# - Coding cleanly
# - Testing successfully
# - Interviewers nodding`,
          cpp: `// Don't solve hard problems today
// Mental energy conservation is real`,
          java: `// You're primed. Rest and trust the preparation.`
        }
      },
      {
        day: "Thu — Rest + Light Scan",
        where: "Mandatory rest day. Light scan of personal notes only. No problem solving.",
        when: "1-2 days before interview — overworking now hurts performance tomorrow. Rest IS preparation.",
        what: "Scan (not study): personal insight notes, pattern trigger list, complexity cheatsheet. 30 minutes max. Then completely disconnect from competitive programming. Do something you enjoy.",
        example: {
          title: "Rest Day Protocol",
          explanation: "Athletes rest before competition. Your brain consolidates learning during rest. Trying to cram now means you'll be mentally fatigued during the interview. Trust the 20 weeks.",
          code: {
            python: `# Thursday schedule:
# Morning (30 min): Read personal notes ONLY
#   - Pattern triggers (30-second recognition list)
#   - 10 key insights
#   - Edge cases checklist
# Then: STOP. Close all coding tabs.

# Afternoon: do something enjoyable
#   - Walk, music, movie, friends
#   - NO competitive programming
#   - NO "just one more problem"

# Evening: light meal, good sleep
#   - Target 8 hours minimum
#   - No screens 1 hour before bed

# Morning of interview:
#   - Light breakfast
#   - Read personal notes (15 min max)
#   - 5 min deep breathing
#   - Log in 10 min early`,
            cpp: `// What NOT to do today:
// ✗ "Just one hard problem"
// ✗ Learning new patterns (too late)
// ✗ Reading editorial threads
// ✗ Comparing yourself to others
// ✗ Staying up late coding`,
            java: `// What TO do today:
// ✓ Short walk or light exercise
// ✓ Good meal
// ✓ Talk to someone who supports you
// ✓ Sleep 8+ hours
// ✓ Trust your preparation`
          }
        },
        keyInsight: "Sleep before interview is more valuable than 2 hours of extra practice. A well-rested brain is 30% faster at pattern recognition. Rest is training.",
        template: {
          python: `# Personal notes to scan (30 min):
# Page 1: Pattern triggers
#   "sorted+pair" → two pointers
#   "find in sorted" → binary search
#   ... (your full list)
# Page 2: Key insights
#   "0/1 KS: reverse inner loop"
#   "Interval: sort by end time"
#   ... (your top 10)
# Page 3: Edge cases checklist
#   (the list from Wednesday)
# DONE. Close laptop.`,
          cpp: `// Final prep summary complete.
// The work is done.
// Now let the preparation activate.`,
          java: `// See you on the other side. You've got this.`
        }
      },
      {
        day: "Fri — Interview Day 🎯",
        where: "The real interview. All 21 weeks of preparation converge here.",
        when: "Game day. Every pattern, every template, every insight you've built — it's all available to you right now.",
        what: "Interview execution checklist: read fully → restate → brute force → optimize → code → test → edge cases → complexity. Communicate EVERY step. Stay calm if stuck.",
        example: {
          title: "Interview Day Execution Protocol",
          explanation: "You've practiced this exact sequence dozens of times. Trust your instincts. The pattern will come to you. When stuck: say 'Let me think out loud' and work through it systematically.",
          code: {
            python: `# Interview execution sequence (memorize this):
# 1. READ (2 min): read entire problem twice
# 2. RESTATE: "So the problem is asking me to..."
# 3. CLARIFY: "Can I assume...? What if...?"
# 4. EXAMPLES: "Let me trace through the given example..."
# 5. APPROACH: "I'll use [pattern] because [reason]"
# 6. COMPLEXITY: "This will be O(?) time, O(?) space"
# 7. CODE: clean variable names, comment complex parts
# 8. TEST: trace through example manually
# 9. EDGE CASES: "What if input is empty? Large? Negative?"
# 10. OPTIMIZE (if asked): "I could improve by..."`,
            cpp: `// When stuck (DON'T panic):
// 1. Say: "Let me think through what I know..."
// 2. Identify what you DO know about the problem
// 3. Try brute force out loud
// 4. Ask: "Can I get a hint on the direction?"
// Silence is the only wrong answer.`,
            java: `// Remember:
// Interviewers WANT you to succeed
// They're rooting for you
// They'd rather give you a hint than watch you freeze
// Ask for help — it's not weakness, it's communication`
          }
        },
        keyInsight: "The interview is just another mock — with higher stakes. You've done harder problems under harder conditions in practice. This is your moment.",
        template: {
          python: `# Interview day morning routine:
# 6:00 AM: wake up (don't sleep in)
# 6:30 AM: light breakfast
# 7:00 AM: scan personal notes (15 min MAX)
# 7:15 AM: 5 min visualization (successful interview)
# 7:20 AM: light warm-up (1 easy problem, 10 min)
# 7:30 AM: close coding, prepare login info
# 8:00 AM: log in 10 min early, test audio/video
# START: breathe, read carefully, execute

# Remember: You've prepared for 21 weeks.
# This is your time. 🎯`,
          cpp: `// During interview mantras:
// "I know this pattern."
// "Stay calm, think out loud."
// "One step at a time."`,
          java: `// You've solved hundreds of problems.
// This is just one more.
// GO. 🎯`
        }
      },
      {
        day: "Sat — Post Interview",
        where: "After the interview: reflect, record, and begin next steps regardless of outcome.",
        when: "Immediately after interview — memory fades fast. Write everything down while fresh.",
        what: "Post-interview protocol: 1) Write down every problem asked. 2) Note what you solved, what you struggled with, what you wish you'd said. 3) If rejected: these notes = next interview's preparation. If accepted: celebrate.",
        example: {
          title: "Post-Interview Analysis",
          explanation: "Whether you passed or failed, this analysis is gold. Every question asked, every moment you froze, every insight you missed — write it all. This turns the interview into your best teacher.",
          code: {
            python: `# Post-interview notes template:
# Write within 1 hour of finishing

# Problem 1:
# - What was the problem? (write it out)
# - Did you identify the pattern? (yes/no, how fast?)
# - What was your approach?
# - Did it work? (yes/no/partial)
# - What would you do differently?

# Problem 2: (same questions)

# Communication:
# - Did you explain before coding? (yes/no)
# - Did you state complexity? (yes/no)
# - Did you test your solution? (yes/no)

# Overall feeling:
# - What went well?
# - What was hardest?
# - What's the gap to fix for next time?`,
            cpp: `// If rejected: this analysis IS your prep for round 2
// Most offers come after 2-3 interview rounds
// First round teaches you what to improve

// If accepted: celebrate fully, you earned it!
// 21 weeks of consistent work pays off.`,
            java: `// Post-interview is not optional
// The patterns you were asked WILL appear again
// Document them NOW`
          }
        },
        keyInsight: "Every interview — pass or fail — is data. The companies that reject you are teaching you exactly what to fix. Your post-interview notes are worth more than any tutorial.",
        template: {
          python: `# Post-interview action plan:
# Rejected → Immediate actions:
#   1. Write all problems asked today
#   2. Solve each problem you failed (within 24 hrs)
#   3. Identify the pattern gap
#   4. Sprint that gap for 3 days
#   5. Apply to next company

# Accepted → Next steps:
#   1. Celebrate with people who supported you
#   2. Negotiate the offer (it's expected)
#   3. Rest for a week before starting
#   4. Share what worked with others`,
          cpp: `// Rejection is not failure
// It's targeted feedback
// Most successful engineers were rejected multiple times`,
          java: `// The roadmap ends here.
// Your career starts now.`
        }
      },
      {
        day: "Sun — Reflect & Plan Next",
        where: "Final reflection on the entire 21-week journey. Plan next steps.",
        when: "After your first interview cycle — whether you got the offer or not, this reflection shapes your next move.",
        what: "Reflect on the full 21-week journey. What patterns became strongest? What was hardest? What would you tell yourself at week 1? Then plan: next company, next skill, or onboarding prep.",
        example: {
          title: "21-Week Journey Reflection",
          explanation: "You've built a complete DSA skillset from zero to interview-ready in 21 weeks. That's 500+ problems, 18 core patterns, 21 weeks of consistent discipline. That discipline transfers to everything.",
          code: {
            python: `# 21-week journey stats to reflect on:
# Weeks completed: ___/21
# Problems solved: ___/500+
# Patterns mastered: ___/18
# Mocks completed: ___
# Companies applied: ___
# Offers received: ___

# What became your strongest pattern?
# What was hardest to learn?
# What would you tell Week-1-you?

# Patterns for next cycle (if needed):
# - System Design depth (HLD/LLD)
# - Competitive programming (Codeforces rating)
# - Open source contributions
# - Project portfolio for resume`,
            cpp: `// What you've built in 21 weeks:
// □ Two Pointers + Sliding Window (O(n) array problems)
// □ Binary Search (O(log n) search problems)
// □ Hashing (O(1) lookup problems)
// □ Stacks + Queues (monotonic patterns)
// □ Linked Lists (pointer manipulation)
// □ Trees + BST (recursive tree patterns)
// □ Heaps (K-way problems)
// □ Graphs (BFS/DFS/Dijkstra/Union-Find)
// □ Backtracking (combination/permutation)
// □ Dynamic Programming (1D/2D/bitmask)
// □ Greedy (interval/string patterns)
// □ Tries (prefix tree patterns)
// □ Bit Manipulation (XOR/bit tricks)
// □ Math + Number Theory`,
            java: `// You are not the same programmer you were at week 1.
// The patterns are in your muscle memory.
// The discipline of 21 weeks is now part of who you are.
//
// Whatever happens next — you have the skills.
// Keep building. Keep solving. Keep growing.
//
// CrackDSA — Built by a student, for students. 🎯`
          }
        },
        keyInsight: "The most valuable thing you built in 21 weeks isn't pattern knowledge — it's the discipline of consistent daily practice. That skill transfers to everything you do next.",
        template: {
          python: `# Next steps decision tree:
# Got the offer? → Celebrate, negotiate, prep for onboarding
# Not yet? → Analyze gaps, sprint weak patterns, apply again
# Multiple rejections? → System design depth, harder companies later
# Want more? → Competitive programming, open source, projects

# Resources for continuing:
# Competitive: Codeforces, AtCoder, ICPC
# System Design: Alex Xu "System Design Interview"
# Behavioral: STAR method, leadership principles
# Projects: GitHub portfolio, personal projects`,
          cpp: `// Final message:
// You built this skill set by showing up every day.
// That's the real achievement.
// The offer is the reward — the growth is the gift.`,
          java: `// Go get what you've worked for.
// You're ready. 🎯`
        }
      }
    ]
  }
};