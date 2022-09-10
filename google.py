'''

LOGIC:

# approach 1
* make dictinoary for frequency
* return top K
* TC (NlogN)
* Space: O(N)

# approach#2 use max heap


if key doestn exist -> it wont return error 
                but will return the default value

'''

def f(words_list, K):
     
    d = {}  #default value of dict = 0
    # popuate dictionary
    for word in words_list:
        if word in d:
            d[word] += 1
        else:
            d[word] = 1
     
    # map the indices to frequency
    index_to_freq = [0] * (len(d))
    j = 0
    for i in d:
        index_to_freq[j] = [i, d[i]]
        j += 1
    # sort by frequncy
    index_to_freq = sorted(index_to_freq, key=lambda x: x[1],
               reverse=True)
 
    # return the top k numbers
    top_k_words = []
    for i in range(K):
        top_k_words.append(index_to_freq[i][0])
    return top_k_words


import heapq
def g(words_list, k):
    d = dict()
    seen = set()  
    count = 0  
    for word in words_list:
        if word in seen:
            count += 1
        else:
            heapq.heappush(h, (count,word))
            count = 0
        if len(h)>k:
            heapq.heappop(h)
 
    h = []  # max heap
    for key, val in d.items():
        heapq.heappush(h, (key,val))
        if len(h)>k:
            heapq.heappop(h)
    top_k_words = []
    while h:
        freq, word = heapq.heappop(h)
        top_k_words.append(freq)
    return top_k_words

a = [3, 1, 4, 4, 5, 2, 6, 1]
print(g(a,2))

'''
[Connect with a Googler] 8Sep22

HR: Vidhi Shah
Googler: Ankur Gupta(L5), YOE- 12

# MOMs

* L5 ------------------------------------------- ====>
* dont compare lables b/w uber & google
* L5 is a senior level, not given w/o pretty good exp
* very less numbers of ppl with L5,6,7
* expectations:
    * good exp
    * can lead, mentor
* will take couple of years for me
* total 5 years is baseline
* less hands on work at senior levels. more time in meetings, less time in coding
* focus on getting offer with better pkg
* interviews:
    * dsa
    * system design (>= L5)
    * leadership
* India to US:
    * you cant change a team within a year
    * after 1 year, you can go anywhere

'''



 
