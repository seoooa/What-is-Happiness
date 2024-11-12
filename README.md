# 데이터 분석 & 시각화 프로젝트 : What is “Happiness”

## 프로젝트 소개

**일상의 다양한 데이터**를 활용하여 자유로운 주제로 직접 데이터를 **수집**/**분석**하고 **시각화**까지 이끄는 데이터 분석 및 시각화 프로젝트이다

### What is “Happiness”

행복이란 무엇이라고 생각하는가? 많은 돈을 갖는 것, 항상 맛있는 음식을 먹는 것, 편안한 삶을 사는 것, 아니면 일을 하지 않아도 되는 것인가? 모두가 행복에 대해 다르게 정의할 수 있으니, 과연 우리가 **행복을 정의할 수 있는지**에 대해 의문을 갖고 프로젝트를 시작한다.

쉽지 않은 일이지만, 우리는 데이터를 활용해 행복의 가치를 가장 잘 반영하는 것들, 그리고 행복하기 위해 먼저 추구해야 할 것들을 찾아보기로 한다. 본 프로젝트를 통해 각 나라의 삶의 질을 반영하는 지표와 사람들의 주관적인 평가를 분석하여 **행복과 가장 밀접하게 연관된 요소**들을 찾아내고, 감히 “행복”이란 무엇인지 정의하고자 한다.

## 과정

### 1. Clear Communication

**행복과 가장 밀접한 지표를 찾기 위해 명확한 수치 지표를 활용하여 분석을 진행한다** <br/>
 <img src="https://github.com/user-attachments/assets/d49e7b86-8641-4e6a-a19b-c1ba8ced1e02" width="800" height="500"/>

> **분석 요약**
> 

진행된 분석을 요약하자면, 행복을 세 가지 요소로 나눌 수 있다

1. **개인이 통제할 수 없는 외부 요인** (출생과 생활 조건)
2. **안정된 성격 특성과 관련된 요인** (타고난 행복 성향)
3. **개인의 성취와 관련된 요인** (목표 설정과 인간관계).

이들 요소의 균형을 찾는 것이 중요한데, 정답은 없기 때문에 여전히 논쟁의 대상이다.

데이터 시각화를 위해 Tableau 프로그램을 사용했으며, 행복과 관련된 여러 지표들을 비교했다. (위 분석은 2024년 세계 행복 보고서를 기반으로 했으며, 143개 국가를 비교)

> **주요 비교 결과**
> 
- **인간 개발 지수(HDI)와 행복**은 강한 상관관계를 보이고, 행복한 나라일수록 교육, 건강, 생활 수준이 높은 편이다.
- **GDP와 행복**의 상관관계는 상대적으로 낮다. 예를 들어, 아이슬란드는 행복 순위 3위지만 GDP는 108위이다.
- **환경 성과와 행복**도 높은 상관관계를 보인다. 상위 10개 행복 국가 중 대부분이 환경 성과 상위권에 있었으며 이는 환경이 행복에 미치는 영향을 시사한다.
- **자유와 행복**은 중요한 관련성을 보이며 자유 지수가 높은 국가들이 행복 순위에서도 상위에 있다.

> **결론**
> 

결론적으로, **인간 개발, 환경 질, 개인 자유**가 행복에 중요한 영향을 미친다는 것을 확인했다.

### 2. Unconventional Charting Type

![image](https://github.com/user-attachments/assets/4a80224c-e771-45f8-a14c-1cd516e4db22)

> **행복을 감지할 수 있을까?**
> 

행복을 정의하고 측정하는 것 모두 주관적인 일이지만, 만약 얼굴 표정을 통해 행복을 감지할 수 있다면, 더 객관적인 행복 측정 도구를 개발할 수 있을 것이라고 생각하였다. 

> **데이터 수집**
> 

인스타그램에서 #happiness, #laughter, #joy 등의 해시태그를 검색해 사진을 **크롤링**하고, 해당 사진에서 **얼굴 근육을 분석해 표정을 시각화**하는 과정을 진행하였다. 이를 위해 Google Chrome Webdriver와 BeautifulSoup, Selenium 등의 라이브러리를 사용하여 인스타그램에서 최대 30개의 이미지를 크롤링하는 코드를 구현하였다.

- **얼굴 근육 분석**
논문을 참고하여 **기쁨을 나타내는 얼굴 근육의 특징**을 분석하였다. 주요 특징은 **입꼬리의 위쪽으로 올라간 각도**와 **입술이 수평으로 퍼지는 정도**임을 알 수 있었다. P5js의 ml5 라이브러리를 사용해 사진을 입력받고 눈, 코, 입, 얼굴 모양 등을 분석해 입술 근육의 각도를 계산하는 코드를 구현하여, 아랫입술의 각도가 110도에 가까울수록, 윗입술의 각도가 180도에 가까울수록 웃는 표정에 가깝다는 결론을 얻을 수 있었다.
    - 참고 논문 (일부)
        
        ![image (1)](https://github.com/user-attachments/assets/f3625117-9a2b-4465-8294-08bf26727f73)
        

- **얼굴 전체 분석**
ML5 라이브러리를 통해 분석한 얼굴 근육의 좌표를 텍스트 파일로 저장하고, 이를 다시 불러와 도형으로 재현하는 코드를 작성하였다. 여러 얼굴의 근육 좌표 이미지를 투명하게 겹쳐 시각화한 결과, 입꼬리의 각도와 눈썹, 눈의 모양이 웃는 얼굴을 나타낸다는 것을 확인하였다.
    
  ![image (2)](https://github.com/user-attachments/assets/bde7ae74-94cb-48fd-845e-079b2130bfd1)

  
  [얼굴 주요 포인트 좌표 저장](https://editor.p5js.org/seoooa/sketches/sKZAOYIXa) <br/>
  [얼굴 주요 포인트 좌표 시각화](https://editor.p5js.org/seoooa/sketches/ef308H1Lb)
    

 결론적으로, 얼굴 근육을 통해 **행복을 객관적으로 감지**할 수 있다는 결론을 얻었으며, 이를 흥미로운 방식으로 시각화하는 것에 성공하였다.

### 3. Analog

![image (3)](https://github.com/user-attachments/assets/f62f62e6-f3b2-45c6-a33c-aab5ed486e65)

 

> **행복의 새로운 정의**
> 

우리는 무엇이 행복에 영향을 미치는지, 그리고 그 행복이 진정으로 느껴지고 다른 사람들에게 전달될 수 있는지를 탐구하였다. 우리 모두 행복할 때와 슬플 때가 있으며, 각자가 생각하는 행복의 정의는 다르다. 이를 분석하고 공통점과 차이점을 알아보기 위해, 각자가 생각하는 "행복에 필요한 가치"를 수집해 직관적으로 표현하고자 한다.

> **빛을 활용하여 시각화**
> 

우리는 빛의 속성을 이용해 이를 표현하고자 하였따. 각 빛은 다른 색을 나타내며, 빛이 겹쳐지면 새로운 색이 만들어지지만, 결국 모든 빛이 모이면 가장 밝은 색, **흰색**이 된다는 특성이 있다. 이러한 원리를 이용하여 셀로판지를 통해 사람들이 중요하게 생각하는 가치를 빨강, 파랑, 초록의 빛으로 표현하고, 플래시를 겹쳐 다양한 색과, 최종적으로는 가장 밝은 흰색을 만들어냈다.

이 작업을 통해, 사람마다 중요하게 여기는 가치가 다르므로, 특정 기준을 세우고 가장 중요한 가치를 정의하는 것은 불가능하다는 것을 보여주고 싶었다. 그러나 각자의 가치를 충족시키며 살아간다면 결국 우리는 모두 **행복**에 도달할 수 있음을, 마치 빛이 모여 가장 밝은 흰색 빛을 만들어내듯 표현하였다.

또한, 특정 빛의 강도를 조절하지 않고 특정 색에 가까워질수록, 더 균형 잡힌 빛이 아닌 특정 색의 빛이 나타남을 통해, **다양한 가치를 균형 있게 추구**함으로써 행복에 도달할 수 있다는 것을 보여주고자 하였다. 이것이 본 프로젝트에서 새롭게 정의한 행복이다.

## 성과 및 회고

이번 프로젝트를 통해 구조화된 데이터, 비구조화된 데이터들을 활용하여 다양한 방식으로 행복을 탐구하고 분석하였다. 무엇이 행복의 가치를 결정하는지, 이 주관적인 행복이라는 감정을 다른 사람들이 객관적으로 분석하고 감지할 수 있는지, 그리고 우리가 생각하는 행복이 무엇인지 알아보려고 노력하는 과정을 통해 행복에 대해 깊이 생각할 수 있는 좋은 기회를 얻을 수 있는 프로젝트였으며, 흥미롭고 다양한 결론을 얻을 수 있었다.
