# ✏️ OUI: 너와 나의 공유일기
> #### OUI _는 **AI 감정분석을 제공하는 공유일기 웹 앱 서비스**입니다._

# 1. 주요 기능
### 일기 작성
> 텍스트, 손글씨, 이미지로 일기를 작성해보세요~📚

### 감정 분석
> ✏️ 작성한 텍스트를 기반으로 감정을 분석해드려요!

### 노래 추천
> 오늘의 감정과 유사한 가사의 노래를 추천해드려요~🎧♭

### 공유 일기
> 💁🏻 친구와 하루를 공유해보세요! 친구가 쓴 일기를 꾸밀수도 있답니다~ 🙆🏻

# 2. 서비스 구조도

### 회원가입
| <img src="./asset/회원가입.gif"> |
|------------|

### 일기
| <img src="./asset/일기작성.gif"> | <img src="./asset/동시편집.gif"> |
|:------------:|:------------:|
| <b>1. 일기작성</b>  | <b>2. 일기 꾸미기(동시편집)</b>  |

### 알림
| <img src="./asset/초대수락.gif"> |
|------------|


### 공유 다이어리 생성
| <img src="./asset/공유다이어리생성.gif"> |
|------------|

### 분석
| <img src="./asset/개인통계.gif"> | <img src="./asset/분석결과.gif"> |
|:------------:|:------------:|
| <b>1. 감정통계</b>  | <b>2. 분석결과</b> |

# 3. 핵심 기술
### AI 감정분석
* `KoBERT`를 전이학습시켜 감정분석을 진행했어요!
    * 사용한 데이터: AI hub의 '감성대화 말뭉치', '한국어 감정 정보가 포함된 단발성 대화 데이터 셋', '감정 분류를 위한 대화 음성 데이터 셋'
    * 전처리
       ![image](https://github.com/songahh/OUI/assets/77879519/025f9a60-7888-4ef0-891a-7be4f3d903ed)
    * 결과  
       ![image](https://github.com/songahh/OUI/assets/77879519/3437b1be-2ecd-43d1-a2eb-d4aa45aa778d)


# 4. 설계
### 아키텍처
![image](/uploads/d90f53ee0a218036db97b7a64132d359/image.png)

### ERD
![OUI_erd](/uploads/e7ba639b6634c0157a2b86e751a8103a/OUI_erd.png)

### 와이어 프레임
<img src="./asset/와이어프레임.png">

# 5. 기술 스택

### FE
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![styled components](https://img.shields.io/badge/styled%20components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

### BE
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Data JPA](https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)  
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white)
![Motor](https://img.shields.io/badge/Motor-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)  


### INFRA
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)
![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&logo=influxdb&logoColor=white)  
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=for-the-badge&logo=sonarqube&logoColor=white)


### AI
![Pytorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![OpenVINO](https://img.shields.io/badge/OpenVINO-0071C5?style=for-the-badge&logo=intel&logoColor=white)


## 🍎 팀원 🍎
| 권송아 | 권유경 | 김선영 | 정민지 | 조권호 | 현민수 |
| :--: | :--: | :--: | :--: | :--: | :--: |
| AI, BE | BE | FE | BE | Infra, BE, FE | BE, FE |

