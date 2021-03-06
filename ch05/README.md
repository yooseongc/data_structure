
# QUEUE

---

- Queue : 리스트의 일종. 끝부분(end)으로 데이터가 들어오고 앞부분(front)에서 데이터가 삭제되는 자료구조.  
-  input --> (end) [][][][][] (front) --> output  

---

## QUEUE의 특징

  리스트가 데이터를 자연스럽게 나열한 구조라면,  
  Queue는 가장 뒷 부분에서 자료의 입력이, 가장 앞 부분에서 자료의 출력이 일어남.
  
  Queue는 element들의 list로 구성되며 `end`이라 불리는 리스트의 한 쪽 끝으로 요소가 들어오며, 반대 쪽 끝인 `front`로부터 요소가 나간다.
  이를 보통 __FIFO__ (First-In, First-Out) 이라 한다.  
  먼저 들어온 친구가 먼저 나간다.  

  운영체제의 프로세스 처리 순서, 프린트 스풀러, 대기줄 등의 시뮬레이션 어플리케이션에서 주로 사용된다.  

  큐가 꽉 차서 더 이상 자료를 넣을 수 없는 경우(put 할 수 없는 경우)를 오버플로우(`Overflow`), 큐가 비어 있어 자료를 꺼낼 수 없는 경우(get 할 수 없는 경우)를 언더플로우(`Underflow`)라고 한다.  

  크게 `선형 큐`와 `환형 큐`로 구분한다.  

  `선형 큐` : 막대 모양으로 된 큐이다. 크기가 제한되어 있고 빈 공간을 사용하려면 모든 자료를 꺼내거나 자료를 한 칸씩 옮겨야 한다는 단점이 있다.

  `환형 큐` : 선형 큐의 문제점(배열로 큐를 선언할시 큐의 삭제와 생성이 계속 일어났을때, 마지막 배열에 도달후 실제로는 데이터공간이 남아있지만 오버플로가 발생)을 보완한 것이 환형 큐이다. `front가 큐의 끝에 닿으면 큐의 맨 앞으로 자료를 보내어 원형으로 연결 하는 방식`이다.
  원형 큐라고도 한다.  

  [ref] : http://slenderankle.tistory.com/305  

--

## QUEUE의 주요 기능

  - `end`에 요소를 집어 넣는 __ENQUEUE__  
  - `front`에서 요소를 꺼내는 __DEQUEUE__  
  - `front`에서 요소를 확인하는 __PEEK__  

---
