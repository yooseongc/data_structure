
# STACK

---

- 스택 : 제한적으로 접근(선입후출)할 수 있는 나열 구조  
- 콜스택 : 컴퓨터 과학에서 실행할 컴퓨터 프로그램 코드 정보를 저장하는 스택 자료구조 구현체

---

## STACK의 특징

  리스트가 데이터를 자연스럽게 나열한 구조라면,  
  스택은 가장 윗 부분에서만 자료의 추가와 삭제가 일어남.
  실행 속도가 빠르고 구현이 쉽다(고 한다).

  스택은 element들의 list로 구성되며 `top`이라 불리는 리스트의 한 쪽 끝으로만  
  요소에 접근할 수 있다.  
  이를 보통 __LIFO__ (Last-In, First-Out) 이라 한다.  
  나중에 들어온 친구가 먼저 나간다.  

  스택이라는 자료구조는 프로세스를 구성하는 4개의 요소중 한 부분이며 함수의 호출에 관여한다.  
  어떤 함수든 호출되는 순간 스택에 그 함수를 위한 영역 (`스택 프레임 stack frame`) 이 할당된다.  

--

## STACK의 주요 기능

  - `top`에 요소를 집어 넣는 __PUSH__  
  - `top`에서 요소를 꺼내는 __POP__  
  - `top`의 요소를 확인하는 __PEEK__  

---

## STACK ADT

---

- STACK ADT는 데이터를 어떻게 저장할지는 정의하지 않는다.

| member            | type   | desc |  
| ---               | ---    | ---  |
| top               | prop   | 스택의 pos이자 listSize |
| __length__        | func   | 스택의 총 요소 수 반환 == top |
| __clear__         | func   | 스택의 모든 요소 삭제  |
| toString          | func   | 스택를 문자열로 표현해 반환 |
| __PUSH__          | func   | 스택의 top에 새 요소를 추가 |
| __POP__           | func   | 스택의 top에 있는 요소를 반환 및 제거 |
| __PEEK__          | func   | 스택의 top에 있는 요소를 반환 |

---

## 사용 사례

재귀 알고리즘
재귀적으로 함수를 호출해야 하는 경우에 임시 데이터를 스택에 넣어준다.  
재귀함수를 빠져 나와 `퇴각 검색(backtrack)`을 할 때는 스택에 넣어 두었던 임시 데이터를 빼 줘야 한다.  
스택은 이런 일련의 행위를 `직관적으로 가능하게` 해 준다.  
또한 스택은 재귀 알고리즘을 `반복적 형태(iterative)`를 통해서 구현할 수 있게 해준다.  

- 웹 브라우저 방문기록 (뒤로가기)
- 실행 취소 (undo)
- 역순 문자열 만들기
- 수식의 괄호 검사 (연산자 우선순위 표현을 위한 괄호 검사)
  - Ex) 올바른 괄호 문자열(VPS, Valid Parenthesis String) 판단하기
- 후위 표기법 계산
  
Ref) https://gmlwjd9405.github.io/2018/08/03/data-structure-stack.html

--

## 재귀 vs 꼬리재귀

Ref1) http://ledgku.tistory.com/37?category=669017  
Ref2) http://bozeury.tistory.com/entry/%EA%BC%AC%EB%A6%AC-%EC%9E%AC%EA%B7%80-%EC%B5%9C%EC%A0%81%ED%99%94Tail-Recursion  