
## LIST

---

- 리스트(목록) : 순서가 있는 일련의 데이터 집합.
- 요소(element) : 리스트의 각 항목

---

## LIST ADT

---

- LIST ADT는 데이터를 어떻게 저장할지는 정의하지 않는다.

| member            | type   | desc |  
| ---               | ---    | ---  |
| pos               | prop   | 현재 위치 |
| listSize          | prop   | 리스트의 총 요소 수 |
| __length__        | func   | 리스트의 총 요소 수 반환 |
| __clear__         | func   | 리스트의 모든 요소 삭제  |
| toString          | func   | 리스트를 문자열로 표현해 반환 |
| getElement        | func   | 현재 위치의 요소를 반환 |
| insert            | func   | 기존 요소 위로 새 요소를 추가 |
| __append__        | func   | 새 요소를 리스트 끝에 추가 |
| __remove__        | func   | 리스트의 요소 삭제 |
| front             | func   | 현재 위치를 리스트 첫 번째 요소로 설정 |
| end               | func   | 현재 위치를 리스트 마지막 요소로 설정 |
| prev              | func   | 현재 위치를 한 요소 뒤로 이동 |
| next              | func   | 현재 위치를 한 요소 앞으로 이동 |
| currPos           | func   | 리스트의 현재 위치 반환 |
| moveTo            | func   | 현재 위치를 지정된 위치로 이동 |



